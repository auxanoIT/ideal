import type { Service, SolutionCategory } from "@/lib/types";
import pillarNavigation from "@/data/service-pillar-navigation.json";

// Navigation taxonomy is independent of legacy service-page titles.
// Reuse relevant published pages until dedicated sub-service pages are available.
type MenuEntry = { title: string; slug: string; overview?: boolean };
const entry = (title: string, slug: string, overview = false): MenuEntry => ({ title, slug, overview });
const verification = entry("Equipment Testing and Deployment Verification", "data-centre-services");
const changes = entry("Equipment Moves, Adds and Changes", "it-project-management");
const maintenance = entry("Planned Maintenance and Ongoing Technical Support", "it-managed-services-staff-outsourcing");
const remediation = entry("Rack and Cabling Remediation", "network-cabling");

export const solutionMenu: Record<string, MenuEntry[]> = {
  "data-centre-deployment": [
    entry("Data Centre Rack-and-Stack Services", "data-centre-services"),
    entry("Data Centre Equipment Installation", "data-centre-services"),
    entry("Server Installation and Configuration", "server-sales-repair"),
    verification,
    changes,
  ],
  "smart-hands": [
    entry("Data Centre Technical Support", "it-technical-services"),
    entry("Smart Hands and Remote-Team Support", "it-technical-services"),
    maintenance,
  ],
  "server-storage-hardware": [
    entry("Server Sales and Repair", "server-sales-repair"),
    entry("Server Storage Provisioning and Deployment", "server-storage-provisioning-deployment"),
    entry("Data Centre Hardware Procurement", "sales-of-it-hardware"),
    entry("Rack Accessories and Consumables Supply", "sales-of-data-centre-consumables"),
  ],
  "network-infrastructure": [
    entry("Network Equipment Installation", "sales-of-network-equipment"),
    entry("Network Architecture Planning", "network-architecture-planning"),
    entry("Network Design and Documentation", "network-design-with-diagram"),
    entry("Network Configuration", "network-configurations"),
    entry("Structured Copper and Fibre Cabling", "structured-lan-cabling"),
    entry("Cable Routing and Management", "network-cabling"),
    entry("Cable Labelling and Port Mapping", "structured-lan-cabling"),
    remediation,
  ],
  "security-access": [
    entry("Firewall Supply, Installation and Licensing", "firewall-sales-licenses"),
    entry("Data Centre Door Access Control", "door-access-control"),
    entry("CCTV and Surveillance Systems", "surveillance-system-cctv"),
    entry("Mantrap Door Installation and Servicing", "door-access-control", true),
    entry("Automated Door and Gate Systems", "automated-gates-sliding-doors"),
    entry("Fire Alarm and Safety Systems", "fire-alarm-safety-systems"),
  ],
  "assessment-optimisation": [
    entry("Data Centre Infrastructure Audit and Assessment", "it-consultancy-audit-services"),
    remediation,
    verification,
  ],
  "projects-lifecycle": [
    entry("Data Centre Project Management", "it-project-management"),
    entry("Installation Documentation and Project Handover", "it-project-management"),
    changes,
    maintenance,
  ],
};

export type SolutionMenuService = Service & { menuHref: string };

export function getSolutionMenuServices(category: SolutionCategory, services: Service[]): SolutionMenuService[] {
  const pillar = pillarNavigation[category.id as keyof typeof pillarNavigation];
  if (pillar) return pillar.flatMap((item, index) => {
    const fallback = services.find(service => service.slug === solutionMenu[category.id]?.[index]?.slug) ?? services[0];
    return fallback ? [{ ...fallback, slug: item.href.split("/").at(-1)!, title: item.title, navImage: item.image, menuHref: item.href }] : [];
  });
  const entries = solutionMenu[category.id];
  if (!entries) return category.serviceSlugs.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service ? [{ ...service, menuHref: `/services/${slug}` }] : [];
  });
  return entries.flatMap((item) => {
    const service = services.find((candidate) => candidate.slug === item.slug);
    return service ? [{ ...service, title: item.title, menuHref: item.overview ? category.href : `/services/${item.slug}` }] : [];
  });
}
