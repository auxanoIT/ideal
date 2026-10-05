import records from './ideal-case-studies.json';
import type { CaseStudy } from '@/lib/types';

// Client-supplied project record dated 5 October 2026. No project photos or
// completion dates were supplied; never substitute other clients' photography.
export const idealCaseStudies: CaseStudy[] = records.map(record => ({
  ...record,
  textOnly: false,
}));

// A matching Sanity record takes editorial precedence, including Published=false.
export function mergeIdealCaseStudies(cmsRecords: CaseStudy[] = []): CaseStudy[] {
  const bySlug = new Map(idealCaseStudies.map(record => [record.slug, record]));
  for (const record of cmsRecords) bySlug.set(record.slug, record);
  return [...bySlug.values()].filter(record => record.published === true);
}
