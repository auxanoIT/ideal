import { caseStudies as fallbackCaseStudies, faqs as fallbackFaqs, services as fallbackServices, testimonials as fallbackTestimonials } from "@/data/site-content";
import type { CaseStudy, FAQItem, PageSection, Service, Testimonial } from "@/lib/types";

import { CTABand } from "@/components/sections/cta-band";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { CaseStudyRail } from "@/components/sections/case-study-rail";
import { ContentSplit } from "@/components/sections/content-split";
import { FAQBlock } from "@/components/sections/faq-block";
import { HomeHero } from "@/components/sections/home-hero";
import { InteractiveServices } from "@/components/sections/interactive-services";
import { IdealStandard } from "@/components/sections/ideal-standard";
import { LogoStrip } from "@/components/sections/logo-strip";
import { MetricBand } from "@/components/sections/metric-band";
import { NetworkMap } from "@/components/sections/network-map";
import { OperationTeams } from "@/components/sections/operation-teams";
import { RichContent } from "@/components/sections/rich-content";
import { ServiceGrid } from "@/components/sections/service-grid";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { TestimonialRail } from "@/components/sections/testimonial-rail";
import { TrustBanner } from "@/components/sections/trust-banner";

type SectionRendererProps = {
  homeOperationTeams?: boolean;
  homeIdealStandard?: boolean;
  sections: PageSection[];
  services?: Service[];
  caseStudies?: CaseStudy[];
  testimonials?: Testimonial[];
  faqs?: FAQItem[];
};

export function SectionRenderer({
  homeOperationTeams = false,
  homeIdealStandard = false,
  sections,
  services = fallbackServices,
  caseStudies = fallbackCaseStudies,
  testimonials = fallbackTestimonials,
  faqs = fallbackFaqs,
}: SectionRendererProps) {
  const getFaqItems = (sectionIds?: string[]) => {
    if (!sectionIds?.length) {
      return faqs;
    }

    const itemsById = new Map(faqs.map((item) => [item.id, item]));
    const selectedItems = sectionIds
      .map((id) => itemsById.get(id))
      .filter((item): item is FAQItem => Boolean(item));

    return selectedItems.length ? selectedItems : faqs;
  };

  return sections.map((section, index) => {
    const key = `${section._type}-${index}`;

    switch (section._type) {
      case "hero":
        return <HomeHero key={key} section={section} />;
      case "logoStrip":
        return <LogoStrip key={key} section={section} />;
      case "metricBand":
        return <MetricBand key={key} section={section} />;
      case "serviceGrid":
        return (
          <ServiceGrid
            key={key}
            section={section}
            services={services.filter((service) => section.featuredSlugs.includes(service.slug))}
          />
        );
      case "contentSplit":
        return <ContentSplit key={key} section={section} />;
      case "serviceShowcase":
        return <ServiceShowcase key={key} section={section} />;
      case "categoryShowcase":
        return <CategoryShowcase key={key} section={section} />;
      case "interactiveServices":
        if (homeIdealStandard) return <IdealStandard key={key} />;
        return <InteractiveServices key={key} section={section} />;
      case "trustBanner":
        return <TrustBanner key={key} section={section} />;
      case "networkMapSection":
        if (homeOperationTeams) return <OperationTeams key={key} />;
        return <NetworkMap key={key} section={section} />;
      case "caseStudyRail":
        return (
          <CaseStudyRail
            key={key}
            section={section}
            caseStudies={caseStudies.filter((item) => section.slugs.includes(item.slug))}
          />
        );
      case "testimonialRail":
        return <TestimonialRail key={key} section={section} testimonials={testimonials} />;
      case "faqBlock":
        return (
          <FAQBlock
            key={key}
            section={section}
            items={getFaqItems(section.ids)}
          />
        );
      case "ctaBand":
        return <CTABand key={key} section={section} />;
      case "richContent":
        return <RichContent key={key} section={section} />;
      default:
        return null;
    }
  });
}
