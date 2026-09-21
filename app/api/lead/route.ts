import { NextResponse } from "next/server";

import {
  buildHubSpotConsentOptions,
  getRequestIpAddress,
  sendFallbackEmail,
  submitToHubSpot,
  verifyTurnstile,
} from "@/lib/integrations";
import { leadSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldIssue = parsed.error.issues.find(
      (issue) =>
        issue.path[0] === "email" || issue.path[0] === "marketingConsent",
    );

    return NextResponse.json(
      { error: fieldIssue?.message ?? "Invalid form submission." },
      { status: 400 },
    );
  }

  const isHuman = await verifyTurnstile(parsed.data.turnstileToken);

  if (!isHuman) {
    return NextResponse.json({ error: "Bot verification failed." }, { status: 400 });
  }

  const hubSpotSuccess = await submitToHubSpot({
    fields: [
      { name: "firstname", value: parsed.data.name },
      { name: "company", value: parsed.data.company },
      { name: "email", value: parsed.data.email },
      { name: "phone", value: parsed.data.phone },
      { name: "service_interest", value: parsed.data.serviceInterest },
      { name: "message", value: parsed.data.message },
      { name: "lead_source", value: parsed.data.context },
    ],
    pageUri: request.url,
    pageName: parsed.data.context === "consultation" ? "Book Consultation" : "Contact",
    hutk: parsed.data.hubspotTrackingCookie,
    ipAddress: getRequestIpAddress(request),
    legalConsentOptions: buildHubSpotConsentOptions(),
  });

  if (!hubSpotSuccess) {
    const delivered = await sendFallbackEmail("Ideal Solutions website lead", [
      `Context: ${parsed.data.context}`,
      `Name: ${parsed.data.name}`,
      `Company: ${parsed.data.company}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone}`,
      `Service: ${parsed.data.serviceInterest}`,
      "",
      parsed.data.message,
    ]);
    if (!delivered) {
      return NextResponse.json({error:"Your enquiry could not be delivered. Please try again or contact us directly."},{status:503});
    }
  }

  return NextResponse.json({ ok: true });
}
