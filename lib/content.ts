import { draftMode } from "next/headers";

import {
  blogPosts,
  caseStudies,
  estimatorConfig,
  faqs,
  footerColumns,
  industryProfiles,
  marketingPages,
  navigation,
  resourceGroups,
  resourceLinks,
  services,
  siteSettings,
  solutionCategories,
  testimonials,
} from "@/data/site-content";
import type {
  BlogPost,
  CaseStudy,
  CareerOpening,
  EstimatorConfig,
  FAQItem,
  FooterColumn,
  IndustryProfile,
  MarketingPage,
  NavItem,
  ResourceGroup,
  ResourceGroupId,
  ResourceLinkItem,
  Service,
  SiteSettings,
  SolutionCategory,
  Testimonial,
} from "@/lib/types";
import {
  blogPostQuery,
  blogPostSlugsQuery,
  blogPostsQuery,
  caseStudiesQuery,
  caseStudyQuery,
  careerOpeningsQuery,
  estimatorConfigQuery,
  faqsQuery,
  footerQuery,
  marketingPageQuery,
  navigationQuery,
  serviceQuery,
  serviceSlugsQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/client";
import { applyHomeCloudinaryMedia } from "@/lib/cloudinary-media";

async function isPreviewEnabled() {
  const preview = await draftMode();
  return preview.isEnabled;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const content = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    preview: await isPreviewEnabled(),
    tags: ["siteSettings"],
  });

  return content ?? siteSettings;
}

export async function getNavigation(): Promise<NavItem[]> {
  const content = await sanityFetch<NavItem[]>({
    query: navigationQuery,
    preview: await isPreviewEnabled(),
    tags: ["navigation"],
  });

  if (!content?.length) {
    return navigation;
  }

  return navigation.map((fallbackItem) => {
    const matchedItem = content.find(
      (item) =>
        item.href === fallbackItem.href || item.label === fallbackItem.label,
    );

    return matchedItem
      ? {
          ...fallbackItem,
          ...matchedItem,
          kind: matchedItem.kind ?? fallbackItem.kind,
        }
      : fallbackItem;
  });
}

export async function getSolutionCategories(): Promise<SolutionCategory[]> {
  return solutionCategories;
}

export async function getIndustries(): Promise<IndustryProfile[]> {
  return industryProfiles;
}

export async function getIndustryBySlug(
  slug: string,
): Promise<IndustryProfile | null> {
  return industryProfiles.find((industry) => industry.slug === slug) ?? null;
}

export async function getResourceGroups(): Promise<ResourceGroup[]> {
  return resourceGroups;
}

export async function getResourceLinks(): Promise<ResourceLinkItem[]> {
  return resourceLinks;
}

export async function getResourceLinksByGroup(
  groupId: ResourceGroupId,
): Promise<ResourceLinkItem[]> {
  return resourceLinks.filter((link) => link.group === groupId);
}

export async function getFooterColumns(): Promise<FooterColumn[]> {
  const content = await sanityFetch<FooterColumn[]>({
    query: footerQuery,
    preview: await isPreviewEnabled(),
    tags: ["footer"],
  });

  if (!content?.length) {
    return footerColumns;
  }

  return footerColumns.map((fallbackColumn) => {
    const contentColumn = content.find(
      (column) => column.title === fallbackColumn.title,
    );

    if (!contentColumn) {
      return fallbackColumn;
    }

    const links = [...contentColumn.links];

    for (const fallbackLink of fallbackColumn.links) {
      const hasLink = links.some(
        (link) =>
          link.href === fallbackLink.href || link.label === fallbackLink.label,
      );

      if (!hasLink) {
        links.push(fallbackLink);
      }
    }

    return {
      ...fallbackColumn,
      ...contentColumn,
      links: links.filter((link) =>
        fallbackColumn.links.some(
          (fallbackLink) =>
            fallbackLink.href === link.href ||
            fallbackLink.label === link.label,
        ),
      ),
    };
  });
}

export async function getMarketingPage(
  slug: string,
): Promise<MarketingPage | null> {
  const content = await sanityFetch<MarketingPage>({
    query: marketingPageQuery,
    params: { slug },
    preview: await isPreviewEnabled(),
    tags: ["pages"],
  });

  const page =
    content ?? marketingPages.find((item) => item.slug === slug) ?? null;

  return page ? applyHomeCloudinaryMedia(page) : null;
}

export async function getCareerOpenings(): Promise<CareerOpening[]> {
  const content = await sanityFetch<CareerOpening[]>({
    query: careerOpeningsQuery,
    preview: await isPreviewEnabled(),
    tags: ["careerOpenings"],
  });

  return content ?? [];
}

export async function getServices(): Promise<Service[]> {
  const content = await sanityFetch<Partial<Service>[]>({
    query: servicesQuery,
    preview: await isPreviewEnabled(),
    tags: ["services"],
  });

  if (!content?.length) {
    return services;
  }

  return services.map((fallbackService) => {
    const matchedService = content.find(
      (service) => service.slug === fallbackService.slug,
    );

    return matchedService
      ? {
          ...fallbackService,
          ...matchedService,
          navDescription:
            matchedService.navDescription ?? fallbackService.navDescription,
          navImage: matchedService.navImage ?? fallbackService.navImage,
        }
      : fallbackService;
  });
}

export async function getServiceSlugs(): Promise<string[]> {
  const content = await sanityFetch<string[]>({
    query: serviceSlugsQuery,
    tags: ["services"],
  });

  if (!content?.length) {
    return services.map((service) => service.slug);
  }

  return Array.from(
    new Set([...services.map((service) => service.slug), ...content]),
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const content = await sanityFetch<Partial<Service>>({
    query: serviceQuery,
    params: { slug },
    preview: await isPreviewEnabled(),
    tags: ["services"],
  });

  const fallbackService = services.find((service) => service.slug === slug);

  if (!fallbackService && !content) {
    return null;
  }

  if (!fallbackService) {
    return content as Service;
  }

  if (!content) {
    return fallbackService;
  }

  return {
    ...fallbackService,
    ...content,
    navDescription: content.navDescription ?? fallbackService.navDescription,
    navImage: content.navImage ?? fallbackService.navImage,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const content = await sanityFetch<CaseStudy[]>({
    query: caseStudiesQuery,
    preview: await isPreviewEnabled(),
    tags: ["caseStudies"],
  });

  return (content ?? caseStudies).filter((item) => item.published === true);
}

export async function getCaseStudySlugs(): Promise<string[]> {
  return (await getCaseStudies()).map((item) => item.slug);
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  const fallbackCaseStudy = caseStudies.find(
    (item) => item.slug === slug && item.published === true,
  );

  if (fallbackCaseStudy) {
    return fallbackCaseStudy;
  }

  const content = await sanityFetch<CaseStudy>({
    query: caseStudyQuery,
    params: { slug },
    preview: await isPreviewEnabled(),
    tags: ["caseStudies"],
  });

  return content?.published === true ? content : null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const content = await sanityFetch<BlogPost[]>({
    query: blogPostsQuery,
    preview: await isPreviewEnabled(),
    tags: ["posts"],
  });

  return content ?? blogPosts;
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const content = await sanityFetch<string[]>({
    query: blogPostSlugsQuery,
    tags: ["posts"],
  });

  if (!content?.length) {
    return blogPosts.map((post) => post.slug);
  }

  return content;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const content = await sanityFetch<BlogPost>({
    query: blogPostQuery,
    params: { slug },
    preview: await isPreviewEnabled(),
    tags: ["posts"],
  });

  return content ?? blogPosts.find((post) => post.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const content = await sanityFetch<Testimonial[]>({
    query: testimonialsQuery,
    preview: await isPreviewEnabled(),
    tags: ["testimonials"],
  });

  return content ?? testimonials;
}

export async function getFaqs(): Promise<FAQItem[]> {
  const content = await sanityFetch<FAQItem[]>({
    query: faqsQuery,
    preview: await isPreviewEnabled(),
    tags: ["faqs"],
  });

  return content?.length ? content : faqs;
}

export async function getEstimatorConfig(): Promise<EstimatorConfig> {
  const content = await sanityFetch<EstimatorConfig>({
    query: estimatorConfigQuery,
    preview: await isPreviewEnabled(),
    tags: ["estimatorConfig"],
  });

  return content ?? estimatorConfig;
}
