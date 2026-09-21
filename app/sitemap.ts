import type { MetadataRoute } from "next";

import {
  getBlogPosts,
  getCaseStudies,
  getIndustries,
  getServices,
} from "@/lib/content";
import { getCaseStudyMedia } from "@/lib/case-study-media";
import type { BlogBodyBlock, BlogPost, ServiceNavMedia } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";
import { servicePillars } from "@/data/service-pillars";
import { productionServices } from "@/data/subservice-production";

type SitemapEntryInput = {
  path: string;
  imagePaths?: string[];
  lastModified?: Date | string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

const siteLastModified = new Date("2026-06-05T00:00:00.000Z");

function getUniqueImagePaths(imagePaths: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      imagePaths.filter((imagePath): imagePath is string =>
        typeof imagePath === "string" && imagePath.length > 0
          ? !imagePath.startsWith("data:")
          : false,
      ),
    ),
  );
}

function hasSitemapImage(
  block: BlogBodyBlock,
): block is BlogBodyBlock & { image?: ServiceNavMedia } {
  return (
    typeof block === "object" &&
    block !== null &&
    (block._type === "image" || block._type === "blogImageBlock") &&
    "image" in block
  );
}

function getBlogBodyImagePaths(body: BlogPost["body"]) {
  return body.flatMap((block) => {
    if (hasSitemapImage(block)) {
      return block.image?.src ? [block.image.src] : [];
    }

    return [];
  });
}

const staticRoutes: SitemapEntryInput[] = [
  {
    path: "/",
    imagePaths: [
      "/image/IT%20Infrastructure.png",
      "/image/networking.png",
      "/image/servces.png",
    ],
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/services",
    imagePaths: [
      "/image/IT%20Infrastructure.png",
      "/image/service-details/fire-alarm-hero-call-point.webp",
      "/image/networking.png",
      "/image/computer_and_server.png",
      "/image/software_and_licenses.jpg",
      "/image/It_management.jpg",
    ],
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    path: "/book-consultation",
    imagePaths: ["/image/service-details/data-centre-buildout.webp"],
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    path: "/technology-security-checklist",
    imagePaths: ["/image/service_section/Operational_support.jpg"],
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/case-studies",
    changeFrequency: "monthly",
    priority: 0.74,
  },
  {
    path: "/resources",
    imagePaths: ["/image/service-details/cctv-camera-coverage.webp"],
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog",
    imagePaths: ["/image/service-details/cctv-camera-coverage.webp"],
    changeFrequency: "weekly",
    priority: 0.68,
  },
  {
    path: "/about",
    imagePaths: [
      "/image/It_management.jpg",
      "/image/IT%20Infrastructure.png",
      "/image/about/Olatunji%20Aduloju.jpeg",
      "/image/about/Tosin%20Ayorinde.jpeg",
      "/image/about/Kayode%20Mejabi.jpeg",
      "/image/about/Mahmoud%20Khallaf.jpeg",
    ],
    changeFrequency: "monthly",
    priority: 0.62,
  },
  {
    path: "/careers",
    imagePaths: [
      "/image/service-details/managed-services-monitoring.webp",
      "/image/service-details/managed-technical-onsite-engineer.webp",
      "/image/service-details/cctv-camera-coverage.webp",
      "/image/service-details/door-access-credentials.webp",
      "/image/service-details/network-cabling-rack.webp",
    ],
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

function toSitemapEntry({
  path,
  imagePaths = [],
  lastModified = siteLastModified,
  changeFrequency,
  priority,
}: SitemapEntryInput): MetadataRoute.Sitemap[number] {
  const uniqueImagePaths = getUniqueImagePaths(imagePaths);

  return {
    url: absoluteUrl(path),
    ...(uniqueImagePaths.length
      ? { images: uniqueImagePaths.map((imagePath) => absoluteUrl(imagePath)) }
      : {}),
    lastModified,
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, caseStudies, posts] = await Promise.all([
    getServices(),
    getIndustries(),
    getCaseStudies(),
    getBlogPosts(),
  ]);

  const dynamicRoutes: SitemapEntryInput[] = [
    ...productionServices
      .filter((page) => page.href.split("/").length === 4)
      .map((page) => ({
        path: page.href,
        imagePaths: [page.image.src],
        lastModified: "2026-09-16",
        changeFrequency: "monthly" as const,
        priority: 0.85,
      })),
    ...servicePillars.map((pillar) => ({
      path: `/services/${pillar.slug}`,
      imagePaths: [pillar.hero.src, pillar.live.src],
      lastModified: "2026-09-15",
      changeFrequency: "monthly" as const,
      priority: 0.95,
    })),
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      imagePaths: getUniqueImagePaths([
        service.heroImage?.src ?? service.navImage.src,
        ...(service.capabilitySections?.map((section) => section.image.src) ??
          []),
      ]),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...industries.map((industry) => ({
      path: industry.href,
      imagePaths: [industry.heroImage.src],
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((item) => ({
      path: `/case-studies/${item.slug}`,
      imagePaths: [getCaseStudyMedia(item).src],
      changeFrequency: "monthly" as const,
      priority: 0.66,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      imagePaths: getUniqueImagePaths([
        post.coverImage?.src,
        ...getBlogBodyImagePaths(post.body),
      ]),
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.64,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes]
    .map(toSitemapEntry)
    .sort((left, right) => left.url.localeCompare(right.url));
}
