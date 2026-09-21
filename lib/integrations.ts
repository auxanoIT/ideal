type HubSpotField = {
  name: string;
  value: string;
};

type HubSpotLegalConsentOptions = {
  consent: {
    consentToProcess: boolean;
    text: string;
    communications: Array<{
      value: boolean;
      subscriptionTypeId: number;
      text: string;
    }>;
  };
};

type HubSpotSubmitOptions = {
  formId?: string;
  fields: HubSpotField[];
  pageUri: string;
  pageName: string;
  hutk?: string;
  ipAddress?: string;
  legalConsentOptions?: HubSpotLegalConsentOptions;
};

export async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return true;
  }

  if (!token) {
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

export async function submitToHubSpot({
  formId,
  fields,
  pageUri,
  pageName,
  hutk,
  ipAddress,
  legalConsentOptions,
}: HubSpotSubmitOptions) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const finalFormId = formId ?? process.env.HUBSPOT_FORM_ID;

  if (!portalId || !finalFormId) {
    return false;
  }

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${finalFormId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields,
        context: {
          ...(hutk ? { hutk } : {}),
          ...(ipAddress ? { ipAddress } : {}),
          pageUri,
          pageName,
        },
        ...(legalConsentOptions ? { legalConsentOptions } : {}),
      }),
    },
  );

  return response.ok;
}

export function buildHubSpotConsentOptions() {
  const configuredSubscriptionTypeId = Number(
    process.env.HUBSPOT_SUBSCRIPTION_TYPE_ID ?? "999",
  );
  const subscriptionTypeId = Number.isFinite(configuredSubscriptionTypeId)
    ? configuredSubscriptionTypeId
    : 999;

  return {
    consent: {
      consentToProcess: true,
      text: "I agree that Ideal Solutions may store and process my personal data to respond to my request.",
      communications: [
        {
          value: true,
          subscriptionTypeId,
          text: "I agree to receive email communication from Ideal Solutions about my request.",
        },
      ],
    },
  };
}

export function getRequestIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    firstForwardedIp ??
    undefined
  );
}

export async function sendFallbackEmail(subject: string, lines: string[]) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_FALLBACK_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "Auxano Website <leads@auxanosolutions.net>";

  if (!apiKey || !to) {
    return false;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>${subject}</h2>
      <pre style="white-space:pre-wrap;font-family:Arial,sans-serif">${lines.join("\n")}</pre>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  return response.ok;
}
