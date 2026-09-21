import { IdealSolutionsHome } from "@/components/pages/ideal-solutions-home";
import { homeServicePillars } from "@/data/home-service-pillars";
import { operationalAdvantage } from "@/data/operational-advantage";
import { homeProjectCta } from "@/data/home-project-cta";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { HeroMetricStrip } from "@/components/sections/hero-metric-strip";
import { PartnerLogoMarquee } from "@/components/sections/partner-logo-marquee";
import { getMarketingPage, getServices, getCaseStudies, getTestimonials, getFaqs } from "@/lib/content";
import { JsonLd } from "@/components/ui/json-ld";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = false;

export const metadata = buildMetadata({
  title: "Data Centre Infrastructure Services in Nigeria",
  description:
    "Ideal Solutions provides data centre deployment, Smart Hands, structured cabling, infrastructure audits, security and lifecycle support across Nigeria.",
  path: "/",
  keywords: [
    "data centre infrastructure services Nigeria",
    "data centre technical support Nigeria",
    "Smart Hands services Nigeria",
    "data centre installation services",
    "data centre engineers Lagos",
  ],
});

export default async function HomePage() {
  const [page, services, caseStudies, testimonials, faqs] = await Promise.all([
    getMarketingPage("home"), getServices(), getCaseStudies(), getTestimonials(), getFaqs(),
  ]);
  if (!page) notFound();
  const originalHero = page.sections.find((section) => section._type === "hero");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": absoluteUrl("/"),
            name: "Ideal Solutions",
            url: absoluteUrl("/"),
            description:
              "Data centre infrastructure deployment, Smart Hands, networking, security, assessment and lifecycle support across Nigeria.",
            about: [
              "Data Centre Deployment",
              "Smart Hands Services",
              "Structured Copper and Fibre Cabling",
              "Server and Storage Deployment",
              "Data Centre Security",
              "Infrastructure Audits",
            ],
            provider: {
              "@id": `${absoluteUrl("/")}#organization`,
            },
          },
        ]}
      />
      <IdealSolutionsHome />
      {originalHero?.metrics.length ? <HeroMetricStrip metrics={originalHero.metrics} /> : null}
      <PartnerLogoMarquee />
      <SectionRenderer
        homeOperationTeams
        homeIdealStandard
        sections={page.sections
          .filter((section) => section._type !== "hero")
          .map((section) => section._type === "serviceShowcase" ? homeServicePillars : section._type === "categoryShowcase" ? operationalAdvantage(section) : section._type === "ctaBand" ? homeProjectCta : section)}
        services={services}
        caseStudies={caseStudies}
        testimonials={testimonials}
        faqs={faqs}
      />
    </>
  );
}
