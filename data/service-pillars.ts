import content from "./service-pillars-content.json";

export type PillarContent = (typeof content)[number];
export type PillarItem = { title: string; body: string[] };
export type PillarImage = { src: string; alt: string };
const img = (src: string, alt: string): PillarImage => ({ src: `/image/${src}.webp`, alt });

const visuals = [
  { hero: img("service-pillars/data-centre-rack-and-stack-deployment-nigeria", "Nigerian engineers installing rack-mounted equipment in a data centre"), live: img("service-pillars/ideal-solutions-live-data-centre-deployment-nigeria", "Ideal Solutions engineers checking a tablet and working beside active server racks"), signals: ["Position", "Connect", "Verify"] },
  { hero: img("operation-teams/remote-team-onsite-support-nigeria", "Onsite technician communicating with a remote engineering team beside data centre racks"), live: img("service-pillars/smart-hands-data-centre-technical-support-nigeria", "Technical support engineer inspecting infrastructure in a data centre"), signals: ["Remote direction", "Onsite action", "Confirmation"] },
  { hero: img("operation-teams/enterprise-hardware-procurement-nigeria", "Engineer reviewing enterprise server hardware at an equipment bench"), live: img("service-details/server-new-supply", "Enterprise server hardware prepared for deployment"), signals: ["Select", "Prepare", "Support"] },
  { hero: img("service-details/network-cabling-rack", "Organised blue and yellow network cabling in enterprise racks"), live: img("service-details/network-cabling-rack", "Structured patch leads routed through rack cable managers"), signals: ["Route", "Label", "Connect"] },
  { hero: img("service-pillars/data-centre-security-access-control-nigeria", "Engineer reviewing secure access to a data centre facility"), live: img("service-details/door-access-credentials", "Secure door access credentials and entry infrastructure"), signals: ["Access", "Protection", "Visibility"] },
  { hero: img("service-pillars/data-centre-infrastructure-audit-inspection-nigeria", "Engineer inspecting server racks and cable organisation during an infrastructure assessment"), live: img("operation-teams/network-rack-remediation-comparison", "Illustrative comparison of disorganised and structured rack cabling"), signals: ["Inspect", "Prioritise", "Improve"] },
  { hero: img("service-pillars/ideal-solutions-data-centre-project-coordination-nigeria", "Ideal Solutions project lead reviewing a checklist while technicians work on data centre racks"), live: img("service-pillars/ideal-solutions-data-centre-project-coordination-nigeria", "Project coordination and documented handover inside an active data centre"), signals: ["Plan", "Coordinate", "Hand over"] },
];

export const pillarCategoryIds = ["data-centre-deployment", "smart-hands", "server-storage-hardware", "network-infrastructure", "security-access", "assessment-optimisation", "projects-lifecycle"];
export const servicePillars = content.map((pillar, index) => ({ ...pillar, ...visuals[index], heroCopy: pillar.hero, hero: visuals[index].hero, liveCopy: pillar.live, live: visuals[index].live, categoryId: pillarCategoryIds[index] }));
export type ServicePillar = (typeof servicePillars)[number];
export const findPillar = (slug: string) => servicePillars.find(pillar => pillar.slug === slug);
export const pillarForCategory = (id: string) => servicePillars.find(pillar => pillar.categoryId === id);

// Existing, content-rich canonical pages are preserved. More specific tasks without
// a matching existing page receive one summary route, never a cloned parent page.
export const existingCapabilityRoutes: Record<string, string> = {
  "data-centre-technical-support": "it-technical-services",
  "server-sales-repair": "server-sales-repair",
  "storage-provisioning-deployment": "server-storage-provisioning-deployment",
  "data-centre-hardware-procurement": "sales-of-it-hardware",
  "rack-accessories-consumables": "sales-of-data-centre-consumables",
  "network-architecture-planning": "network-architecture-planning",
  "network-design-documentation": "network-design-with-diagram",
  "network-configuration": "network-configurations",
  "structured-copper-fibre-cabling": "structured-lan-cabling",
  "cable-routing-management": "network-cabling",
  "firewall-supply-installation-licensing": "firewall-sales-licenses",
  "door-access-control": "door-access-control",
  "cctv-surveillance": "surveillance-system-cctv",
  "automated-door-gate-systems": "automated-gates-sliding-doors",
  "fire-alarm-safety": "fire-alarm-safety-systems",
  "data-centre-infrastructure-audit": "it-consultancy-audit-services",
  "project-management": "it-project-management",
};

export function capabilityHref(href: string) {
  const leaf = href.split("/").at(-1)!;
  if (existingCapabilityRoutes[leaf]) return `/services/${existingCapabilityRoutes[leaf]}`;
  if (leaf === "rack-cabling-remediation") return "/services/network-infrastructure-connectivity/rack-cabling-remediation";
  return href;
}

const uniqueCapabilities = new Map<string, { pillar: ServicePillar; item: PillarContent["capabilities"]["items"][number] }>();
for (const pillar of servicePillars) for (const item of pillar.capabilities.items) {
  const href = capabilityHref(item.href);
  if (!uniqueCapabilities.has(href)) uniqueCapabilities.set(href, { pillar, item });
}
export const capabilityPages = [...uniqueCapabilities].map(([href, value]) => ({ href, ...value, isSummary: href.split("/").length === 4 }));
export const summaryCapabilityPages = capabilityPages.filter(page => page.isSummary);
export const parentForService = (slug: string) => capabilityPages.find(page => page.href === `/services/${slug}`)?.pillar;

const capabilityImages: Record<string, PillarImage> = {
  "equipment-installation": visuals[0].live,
  "server-installation-configuration": visuals[2].live,
  "equipment-testing-verification": visuals[5].hero,
  "moves-adds-changes": visuals[6].hero,
  "smart-hands": visuals[1].hero,
  "planned-maintenance-support": visuals[1].live,
  "rack-cabling-remediation": visuals[5].live,
  "installation-documentation-handover": visuals[6].live,
};
export const capabilityImage = (href: string, pillar: ServicePillar) => capabilityImages[href.split("/").at(-1)!] ?? pillar.hero;

// Only link to an industry when that exact audience page already exists.
export function audienceHref(title: string) {
  return /banks|fintech/i.test(title) ? "/industries/financial-services" : undefined;
}
