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
  portalId?: string;
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
  portalId: configuredPortalId,
  formId,
  fields,
  pageUri,
  pageName,
  hutk,
  ipAddress,
  legalConsentOptions,
}: HubSpotSubmitOptions) {
  // Never fall back to the inherited site's destinations.
  const portalId = configuredPortalId ?? process.env.IDEALSOLUTIONS_HUBSPOT_PORTAL_ID;
  const finalFormId = formId ?? process.env.IDEALSOLUTIONS_HUBSPOT_FORM_ID;

  if (!portalId || !finalFormId) {
    return false;
  }

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${finalFormId}`,
      {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
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
  } catch {
    // Let callers use the delivery fallback without logging customer details.
    return false;
  }
}

export function buildHubSpotConsentOptions() {
  const configuredSubscriptionTypeId = Number(
    process.env.IDEALSOLUTIONS_HUBSPOT_SUBSCRIPTION_TYPE_ID,
  );
  const subscriptionTypeId = Number.isSafeInteger(configuredSubscriptionTypeId) &&
    configuredSubscriptionTypeId > 0 ? configuredSubscriptionTypeId : undefined;

  return {
    consent: {
      consentToProcess: true,
      text: "I agree that Ideal Solutions may store and process my personal data to respond to my request.",
      communications: subscriptionTypeId ? [
        {
          value: true,
          subscriptionTypeId,
          text: "I agree to receive email communication from Ideal Solutions about my request.",
        },
      ] : [],
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
  const to = process.env.IDEALSOLUTIONS_LEAD_FALLBACK_EMAIL;
  const from = process.env.IDEALSOLUTIONS_RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text: lines.join("\n"),
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
