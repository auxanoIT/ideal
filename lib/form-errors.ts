type Issue = { path: PropertyKey[]; message: string; code?: string };

const labels: Record<string, string> = {
  name: "full name", company: "company name", email: "email address",
  phone: "phone number", serviceInterest: "service focus", message: "project brief",
  companySize: "company size", locationBand: "location", supportTier: "support level",
  cameraBand: "camera range", networkScope: "network scope", complianceLevel: "compliance requirements",
  serviceMix: "services", marketingConsent: "email consent",
};

export function formErrors(issues: Issue[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const field = String(issue.path[0] ?? "form");
    if (fieldErrors[field]) continue;
    fieldErrors[field] = labels[field]
      ? issue.code === "invalid_type"
        ? `Please provide your ${labels[field]}.`
        : issue.message.startsWith("Please") ? issue.message : `Please check your ${labels[field]}. ${issue.message}`
      : "Some form details are missing or outdated. Please refresh the page and try again.";
  }
  return {error: Object.values(fieldErrors).join(" "), fieldErrors};
}
