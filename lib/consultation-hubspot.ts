// Public form identifiers, not credentials. This form belongs to Ideal Solutions
// within the connected HubSpot account. Publish it before deploying this change.
export function consultationHubSpotDestination() {
  return {
    portalId: process.env.IDEALSOLUTIONS_HUBSPOT_PORTAL_ID ?? "148498868",
    formId: process.env.IDEALSOLUTIONS_HUBSPOT_CONSULTATION_FORM_ID ??
      "1f691f5a-7ade-4a3a-b32c-87b531f0423d",
  };
}
