import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

const defaultKeywords = [
  "Ideal Solutions",
  "data centre infrastructure services Nigeria",
  "data centre technical support Nigeria",
  "Smart Hands services Nigeria",
  "data centre installation services",
  "structured fibre cabling Nigeria",
  "data centre security Nigeria",
];

const maxMetaDescriptionLength = 158;

function normalizeMetaDescription(description: string) {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxMetaDescriptionLength) {
    return normalized;
  }

  const clipped = normalized.slice(0, maxMetaDescriptionLength + 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const trimmed =
    lastSpace > 120 ? clipped.slice(0, lastSpace) : clipped.slice(0, maxMetaDescriptionLength);

  return `${trimmed.replace(/[,.!?;:]+$/, "")}...`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  imagePath = "/opengraph-image",
  imageAlt = title,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: MetadataOptions): Metadata {
  const pageUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(imagePath);
  const metaDescription = normalizeMetaDescription(description);
  const mergedKeywords = Array.from(
    new Set([...defaultKeywords, ...keywords].filter(Boolean)),
  );

  return {
    title,
    description: metaDescription,
    keywords: mergedKeywords,
    applicationName: "Ideal Solutions",
    authors: [{ name: "Ideal Solutions" }],
    category: "Data centre infrastructure services",
    classification: "Business",
    creator: "Ideal Solutions",
    publisher: "Ideal Solutions",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description: metaDescription,
      url: pageUrl,
      siteName: "Ideal Solutions",
      type,
      locale: "en_NG",
      countryName: "Nigeria",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}
