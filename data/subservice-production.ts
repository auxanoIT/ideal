import copy from './subservice-production.json';
import { capabilityHref, capabilityImage, capabilityPages } from './service-pillars';
import { services } from './solution-catalog';
import type { ServiceNavMedia } from '@/lib/types';

const fireInspection = {src:'/image/service-details/ideal-solutions-fire-alarm-inspection.webp',alt:'Technician reviewing a wall-mounted fire alarm control panel'};
const fireDetection = {src:'/image/service-details/ideal-solutions-fire-detection-devices.webp',alt:'Ceiling-mounted smoke detector and wall-mounted alarm sounder'};

export const productionServices = copy.map(page => {
  // Retain the established canonical routes, including the existing fire page.
  const href = capabilityHref(page.proposedHref);
  const capability = capabilityPages.find(item => item.href === href);
  if (!capability) throw new Error(`Unmapped production service: ${page.proposedHref}`);
  const existing = services.find(service => `/services/${service.slug}` === href);
  const media = href === '/services/fire-alarm-safety-systems' ? fireInspection : existing?.heroImage ?? existing?.capabilitySections?.[0]?.image ?? capabilityImage(capability.item.href,capability.pillar);
  return {...page,href,image:{...media,alt:media.alt.replace(/Auxano(?: Solutions)?/g,'Ideal Solutions')},pillar:capability.pillar};
});
export type ProductionService = (typeof productionServices)[number];
export function productionSectionImages(page: ProductionService, images: ServiceNavMedia[] = []) {
  if (page.href === '/services/fire-alarm-safety-systems') return [fireDetection, fireInspection, fireDetection, fireInspection];
  return images.length ? images : [page.pillar.live,page.image,page.pillar.hero,page.pillar.live];
}
export const productionServiceAt = (href: string) => productionServices.find(page => page.href === href);
export const enquiryHref = (title: string, section?: string) => `/book-consultation?${new URLSearchParams({service:title,...(section ? {section} : {})}).toString()}#project-enquiry`;

// Exact service-name references become contextual anchors; unrelated prose is
// never keyword-linked. Shared capabilities always resolve to one destination.
const aliases: Record<string,string> = {
  'Data Centre Deployment Services':'/services/data-centre-deployment',
  'Data Centre Deployment':'/services/data-centre-deployment',
  'Rack-and-Stack Services':'/services/data-centre-deployment/rack-and-stack',
  'Equipment Testing & Verification':'/services/data-centre-deployment/equipment-testing-verification',
  'Moves, Adds & Changes Services':'/services/data-centre-deployment/moves-adds-changes',
  'Planned Maintenance':'/services/smart-hands-technical-support/planned-maintenance-support',
  'Server Sales & Repair':'/services/server-sales-repair',
  'Infrastructure Assessment & Optimisation':'/services/infrastructure-audit-optimisation',
};
for (const page of productionServices) {
  aliases[page.hero.title] = page.href;
  aliases[page.hero.title.replace(/^Enterprise /,'')] = page.href;
  aliases[page.hero.title.replace(/ Services$/,'')+' Services'] = page.href;
  aliases[page.parentTitle] = page.parentHref;
  aliases[page.parentTitle+' Services'] = page.parentHref;
}
export const contextualLinks = Object.entries(aliases).sort((a,b)=>b[0].length-a[0].length);
