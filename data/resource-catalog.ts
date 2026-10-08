import type {
  ResourceGroup,
  ResourceGroupId,
  ResourceLinkItem,
} from "@/lib/types";

type ResourceLinkSeed = Omit<ResourceLinkItem, "group">;

function buildGroup(
  id: ResourceGroupId,
  label: string,
  links: ResourceLinkSeed[],
): ResourceGroup {
  return {
    id,
    label,
    href: `/resources#${id}`,
    links: links.map((link) => ({
      ...link,
      group: id,
    })),
  };
}

export const resourceGroups: ResourceGroup[] = [
  buildGroup("insights-learning", "Insights & Learning", [
    { id: "blog", label: "Blog", href: "/blog" },
  ]),
  buildGroup("proof-planning", "Proof & Planning", [
    { id: "case-studies", label: "Case Studies", href: "/case-studies" },
    {
      id: "solutions-overview",
      label: "Solutions Overview",
      href: "/services",
    },
    { id: "about-ideal-solutions", label: "About Ideal Solutions", href: "/about" },
  ]),
  buildGroup("support", "Support", [
    { id: "contact", label: "Book Consultation", href: "/book-consultation" },
  ]),
  buildGroup("commercial-tools", "Commercial Tools", [
    {
      id: "book-consultation",
      label: "Book Consultation",
      href: "/book-consultation",
    },
  ]),
];

export const resourceLinks: ResourceLinkItem[] = resourceGroups.flatMap(
  (group) => group.links,
);
