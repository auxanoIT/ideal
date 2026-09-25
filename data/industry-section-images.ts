import type { ServiceNavMedia } from '@/lib/types';
import editorialImages from './industry-editorial-images.json';

const media = (name: string, alt: string): ServiceNavMedia => ({src: `/image/industry-solutions/${name}.webp`, alt});
export const industrySectionImages = {
  deployment: media('deployment','Technicians positioning a server beside an equipment rack'),
  support: media('support','Onsite technician inspecting equipment in a server aisle'),
  hardware: media('hardware','Technician reviewing server hardware at an equipment bench'),
  network: media('network','Organised blue and yellow patch leads in network racks'),
  security: media('security','Controlled access entrance to a technical facility'),
  assessment: media('assessment','Technician inspecting a rack with a handheld testing device'),
  lifecycle: media('lifecycle','Technical team reviewing deployment information beside server racks'),
  execution: media('execution','Engineer using a diagnostic workstation beside installed servers'),
  visibility: media('visibility','Technician reviewing infrastructure monitoring displays'),
  remote: media('remote','Onsite technician communicating by headset beside server equipment'),
  connectivity: media('connectivity','Copper and fibre patch cables prepared for infrastructure connections'),
  access: media('access','Access credential presented to a secure door reader'),
  partnership: media('partnership','Technician checking rack-mounted equipment using a laptop'),
};

const solutionImages: Record<string, ServiceNavMedia> = {
  'data-centre-deployment': industrySectionImages.deployment,
  'smart-hands-technical-support': industrySectionImages.support,
  'server-storage-hardware': industrySectionImages.hardware,
  'network-infrastructure-connectivity': industrySectionImages.network,
  'data-centre-security-safety': industrySectionImages.security,
  'infrastructure-audit-optimisation': industrySectionImages.assessment,
  'data-centre-project-lifecycle-management': industrySectionImages.lifecycle,
};

export function industrySolutionImage(href: string) {
  return solutionImages[href.replace(/\/$/,'').split('/').at(-1)!] ?? industrySectionImages.deployment;
}

export function industryEditorialImage(slug: string, section: 'challenge' | 'why'): ServiceNavMedia {
  const entry = editorialImages[slug as keyof typeof editorialImages]?.[section];
  if (!entry) return section === 'challenge' ? industrySectionImages.execution : industrySectionImages.partnership;
  return {src: `/image/industry-solutions/editorial/${slug}-${section}.webp`, alt: entry.alt};
}
