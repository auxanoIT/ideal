import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/json-ld";
import { absoluteUrl } from "@/lib/utils";
import type { ServicePillar } from "@/data/service-pillars";

export function pillarMetadata(pillar: ServicePillar): Metadata {
  const url = absoluteUrl(`/services/${pillar.slug}`);
  const image = { url: absoluteUrl(pillar.hero.src), alt: pillar.hero.alt };
  return {
    title: { absolute: pillar.seoTitle }, description: pillar.description,
    keywords: pillar.keywords, alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: pillar.seoTitle, description: pillar.description, url, siteName: "Ideal Solutions", locale: "en_NG", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: pillar.seoTitle, description: pillar.description, images: [image] },
  };
}

export function PillarSchema({ pillar }: { pillar: ServicePillar }) {
  const url = absoluteUrl(`/services/${pillar.slug}`);
  return <JsonLd data={[
    { "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: pillar.title, serviceType: pillar.title, description: pillar.description, url, image: absoluteUrl(pillar.hero.src), provider: { "@id": `${absoluteUrl("/")}#organization` }, areaServed: { "@type": "Country", name: "Nigeria" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: pillar.title, item: url },
    ] },
  ]} />;
}
