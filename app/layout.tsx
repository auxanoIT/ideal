import type { Metadata } from "next";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";

import { CookieConsentManager } from "@/components/layout/cookie-consent-manager";
import { CrawlableNav } from "@/components/layout/crawlable-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/ui/json-ld";
import {
  getBlogPostSlugs,
  getCaseStudies,
  getFooterColumns,
  getIndustries,
  getNavigation,
  getResourceGroups,
  getServices,
  getSiteSettings,
  getSolutionCategories,
} from "@/lib/content";
import type { Service, SiteSettings } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default:
      "Ideal Solutions | Data Centre Infrastructure Services Nigeria",
    template: "%s | Ideal Solutions",
  },
  description:
    "Ideal Solutions provides technical execution, Smart Hands, deployment, connectivity, security and lifecycle support for data centres across Nigeria.",
  applicationName: "Ideal Solutions",
  authors: [{ name: "Ideal Solutions" }],
  creator: "Ideal Solutions",
  publisher: "Ideal Solutions",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Ideal Solutions | Data Centre Infrastructure Services Nigeria",
    description:
      "Technical execution, Smart Hands, deployment, connectivity, security and lifecycle support for data centres across Nigeria.",
    url: absoluteUrl("/"),
    siteName: "Ideal Solutions",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Ideal Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Solutions | Data Centre Infrastructure Services Nigeria",
    description:
      "Data centre infrastructure services and local technical support across Nigeria.",
    images: [{ url: absoluteUrl("/opengraph-image"), alt: "Ideal Solutions" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const fallbackOfferNames = [
  "IT infrastructure services",
  "CCTV installation",
  "Door access control",
  "Fire alarm and safety systems",
  "Network cabling and configuration",
  "Managed IT services",
  "IT consultancy and audit services",
];

function buildOfferCatalog(services: Service[]) {
  const offers = services.length
    ? services.map((service) => ({
        name: service.title,
        description: service.summary,
        url: absoluteUrl(`/services/${service.slug}`),
        category: service.category,
      }))
    : fallbackOfferNames.map((name) => ({
        name,
        description: `${name} in Lagos and across Nigeria.`,
        url: absoluteUrl("/services"),
        category: "Technology services",
      }));

  return {
    "@type": "OfferCatalog",
    name: "Ideal Solutions Data Centre Infrastructure Services",
    itemListElement: offers.map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        areaServed: {
          "@type": "Country",
          name: "Nigeria",
        },
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.description,
          category: offer.category,
          url: offer.url,
          areaServed: {
            "@type": "Country",
            name: "Nigeria",
          },
        },
      },
    })),
  };
}

function buildSiteJsonLd(settings: SiteSettings, services: Service[]) {
  const organizationId = `${absoluteUrl("/")}#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: settings.name,
        alternateName: settings.shortName,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/idealsolutions-logo.svg"),
        image: absoluteUrl("/opengraph-image"),
        description: settings.description,
        knowsAbout: [
          "Managed IT support",
          "CCTV installation",
          "Access control installation",
          "Fire alarm system installation",
          "Fire safety systems",
          "Structured LAN cabling",
          "Network infrastructure",
          "Access control systems",
          "ELV systems",
          "Server and storage deployment",
          "Software licensing",
          "Firewall licenses",
          "IT audit and compliance",
          "Business continuity",
        ],
        hasOfferCatalog: buildOfferCatalog(services),
      },
      {
        "@type": "LocalBusiness",
        "@id": `${absoluteUrl("/")}#local-business`,
        name: settings.name,
        url: absoluteUrl("/"),
        image: absoluteUrl("/opengraph-image"),
        logo: absoluteUrl("/idealsolutions-logo.svg"),
        description: settings.description,
        parentOrganization: {
          "@id": organizationId,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Nigeria",
          },
          {
            "@type": "City",
            name: "Lagos",
          },
          {
            "@type": "City",
            name: "Abuja",
          },
          {
            "@type": "City",
            name: "Port Harcourt",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: settings.shortName,
        url: absoluteUrl("/"),
        publisher: {
          "@id": organizationId,
        },
        inLanguage: "en-NG",
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getNavigation();
  const needsSolutions = navigation.some((item) => item.kind === "solutions");
  const needsIndustries = navigation.some((item) => item.kind === "industries");
  const needsResources = navigation.some((item) => item.kind === "resources");

  const [
    solutionCategories,
    industries,
    resourceGroups,
    services,
    footerColumns,
    siteSettings,
    caseStudies,
    blogSlugs,
  ] = await Promise.all([
    needsSolutions ? getSolutionCategories() : Promise.resolve([]),
    needsIndustries ? getIndustries() : Promise.resolve([]),
    needsResources ? getResourceGroups() : Promise.resolve([]),
    needsSolutions ? getServices() : Promise.resolve([]),
    getFooterColumns(),
    getSiteSettings(),
    getCaseStudies(),
    getBlogPostSlugs(),
  ]);

  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <SiteShell studio={children}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            navigation={navigation}
            solutionCategories={solutionCategories}
            industries={industries}
            resourceGroups={resourceGroups}
            services={services}
          />
          <main className="flex-1">{children}</main>
          <CrawlableNav
            services={services}
            industries={industries}
            caseStudies={caseStudies}
            blogSlugs={blogSlugs}
          />
          <SiteFooter columns={footerColumns} settings={siteSettings} />
        </div>
        <JsonLd data={buildSiteJsonLd(siteSettings, services)} />
        <CookieConsentManager />
        </SiteShell>
      </body>
    </html>
  );
}
