import { NextResponse } from "next/server";

import {
  buildHubSpotConsentOptions,
  getRequestIpAddress,
  sendFallbackEmail,
  submitToHubSpot,
} from "@/lib/integrations";
import { checklistLeadSchema } from "@/lib/schemas";

function formatScore(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = checklistLeadSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldIssue = parsed.error.issues.find(
      (issue) =>
        issue.path[0] === "email" || issue.path[0] === "marketingConsent",
    );

    return NextResponse.json(
      { error: fieldIssue?.message ?? "Invalid checklist submission." },
      { status: 400 },
    );
  }

  const categorySummary = parsed.data.categoryScores
    .map(
      (category) =>
        `${category.category}: ${formatScore(category.score)}/${category.maxScore}`,
    )
    .join("\n");
  const scoreSummary = `${formatScore(parsed.data.score)}/${parsed.data.maxScore} (${parsed.data.scorePercent}%) - ${parsed.data.scoreBandLabel}`;
  const message = [
    "2026 Business Technology & Security Readiness Checklist completed.",
    "",
    `Score: ${scoreSummary}`,
    "",
    "Category scores:",
    categorySummary,
  ].join("\n");

  const fields = [
    { name: "firstname", value: parsed.data.name },
    { name: "company", value: parsed.data.company },
    { name: "email", value: parsed.data.email },
    ...(parsed.data.phone
      ? [{ name: "phone", value: parsed.data.phone }]
      : []),
    {
      name: "service_interest",
      value: "2026 Business Technology & Security Readiness Checklist",
    },
    { name: "message", value: message },
    { name: "lead_source", value: "checklist-lead-magnet" },
  ];

  const hubSpotSuccess = await submitToHubSpot({
    formId: process.env.IDEALSOLUTIONS_HUBSPOT_CHECKLIST_FORM_ID ?? process.env.IDEALSOLUTIONS_HUBSPOT_FORM_ID,
    fields,
    pageUri: request.url,
    pageName: "2026 Business Technology & Security Readiness Checklist",
    hutk: parsed.data.hubspotTrackingCookie,
    ipAddress: getRequestIpAddress(request),
    legalConsentOptions: buildHubSpotConsentOptions(),
  });

  if (!hubSpotSuccess) {
    const fallbackSuccess = await sendFallbackEmail(
      "Ideal Solutions checklist lead magnet result",
      [
        `Name: ${parsed.data.name}`,
        `Company: ${parsed.data.company}`,
        `Email: ${parsed.data.email}`,
        `Phone: ${parsed.data.phone ?? ""}`,
        `Score: ${scoreSummary}`,
        "",
        "Category scores:",
        categorySummary,
      ],
    );

    if (!fallbackSuccess) {
      return NextResponse.json(
        { error: "Unable to save checklist result." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true, hubSpotSuccess });
}
