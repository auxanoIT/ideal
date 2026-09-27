// Public form identifiers, not credentials. This form belongs to Ideal Solutions
// within the connected HubSpot account. Publish it before deploying this change.
export function consultationHubSpotDestination() {
  return {
    portalId: process.env.IDEALSOLUTIONS_HUBSPOT_PORTAL_ID ?? "148498868",
    formId: process.env.IDEALSOLUTIONS_HUBSPOT_CONSULTATION_FORM_ID ??
      "1f691f5a-7ade-4a3a-b32c-87b531f0423d",
  };
}

export function consultationHubSpotSubscriptionTypeId() {
  const destination = consultationHubSpotDestination();
  // Verified from this form's Marketing Information consent checkbox in HubSpot.
  // Never carry an account-specific subscription into a different destination.
  return destination.portalId === "148498868" &&
    destination.formId === "1f691f5a-7ade-4a3a-b32c-87b531f0423d"
    ? 2710261669 : undefined;
}
