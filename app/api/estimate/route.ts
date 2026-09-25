import { NextResponse } from "next/server";

import { getEstimatorConfig } from "@/lib/content";
import { calculateEstimate } from "@/lib/estimator";
import {
  getRequestIpAddress,
  sendFallbackEmail,
  submitToHubSpot,
  verifyTurnstile,
} from "@/lib/integrations";
import { estimateSchema } from "@/lib/schemas";
import { formatCurrencyNGN } from "@/lib/utils";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = estimateSchema.safeParse(payload);

  if (!parsed.success) {
    const emailIssue = parsed.error.issues.find(
      (issue) => issue.path[0] === "email",
    );

    return NextResponse.json(
      { error: emailIssue?.message ?? "Invalid estimate request." },
      { status: 400 },
    );
  }

  const isHuman = await verifyTurnstile(parsed.data.turnstileToken);

  if (!isHuman) {
    return NextResponse.json({ error: "Bot verification failed." }, { status: 400 });
  }

  const config = await getEstimatorConfig();
  const result = calculateEstimate(config, parsed.data);

  const summary = `${formatCurrencyNGN(result.low)} - ${formatCurrencyNGN(result.high)}`;
  const hubSpotSuccess = await submitToHubSpot({
    formId: process.env.IDEALSOLUTIONS_HUBSPOT_ESTIMATE_FORM_ID ?? process.env.IDEALSOLUTIONS_HUBSPOT_FORM_ID,
    fields: [
      { name: "firstname", value: parsed.data.name },
      { name: "company", value: parsed.data.company },
      { name: "email", value: parsed.data.email },
      { name: "phone", value: parsed.data.phone },
      { name: "estimate_range", value: summary },
      { name: "service_interest", value: parsed.data.serviceMix.join(", ") },
      { name: "message", value: parsed.data.notes ?? "Generated through the estimator." },
      { name: "lead_source", value: "estimate" },
    ],
    pageUri: request.url,
    pageName: "Estimator",
    hutk: parsed.data.hubspotTrackingCookie,
    ipAddress: getRequestIpAddress(request),
  });

  if (!hubSpotSuccess) {
    await sendFallbackEmail("Ideal Solutions estimate request", [
      `Name: ${parsed.data.name}`,
      `Company: ${parsed.data.company}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone}`,
      `Estimated Range: ${summary}`,
      `Timeline: ${result.timeline}`,
      `Recommendation: ${result.recommendation}`,
      `Services: ${parsed.data.serviceMix.join(", ")}`,
      `Company Size: ${parsed.data.companySize}`,
      `Locations: ${parsed.data.locationBand}`,
      `Support Tier: ${parsed.data.supportTier}`,
      `Camera Band: ${parsed.data.cameraBand}`,
      `Network Scope: ${parsed.data.networkScope}`,
      `Compliance: ${parsed.data.complianceLevel}`,
      "",
      parsed.data.notes ?? "",
    ]);
  }

  return NextResponse.json({ result });
}
