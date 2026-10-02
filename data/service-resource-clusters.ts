import { capabilityPages } from './service-pillars';

// Canonical routes are also the persistent CMS keys; labels may change freely.
export const serviceResourceClusters = capabilityPages.map(({href,item,pillar}) => ({
  value: href.replace(/^\/services\//, ''),
  href,
  title: href === '/services/data-centre-deployment/rack-and-stack' ? 'Rack & Stack' : item.title,
  pillarTitle: pillar.title,
}));

export const resourceClusterForHref = (href: string) => serviceResourceClusters.find(cluster => cluster.href === href);
