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
import { servicePillars, capabilityImage, findPillar, getAudienceIndustry } from "@/data/service-pillars";
import { productionServices, productionSectionImages } from "@/data/subservice-production";
import { industryEditorialImage, industrySolutionImage } from "@/data/industry-section-images";
import { homeServicePillars } from "@/data/home-service-pillars";
import { operationTeams } from "@/data/operation-teams";

type SitemapEntryInput = {
  path: string;
  imagePaths?: string[];
  lastModified?: Date | string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

// Omit modification dates unless the source supplies a real editorial date.

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
  return (body ?? []).flatMap((block) => {
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
      ...homeServicePillars.items.map((item) => item.imageSrc),
      ...operationTeams.map((team) => `/image/operation-teams/${team.image}`),
      "/image/ideal-standard/ideal-solutions-isometric-data-centre-execution-method.webp",
    ],
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/services",
    imagePaths: [
      "/image/ideal-standard/ideal-solutions-isometric-data-centre-execution-method.webp",
      ...servicePillars.map((pillar) => pillar.hero.src),
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
    path: "/case-studies",
    changeFrequency: "monthly",
    priority: 0.74,
  },
  {
    path: "/resources",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog",
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
];

function toSitemapEntry({
  path,
  imagePaths = [],
  lastModified,
  changeFrequency,
  priority,
}: SitemapEntryInput): MetadataRoute.Sitemap[number] {
  const uniqueImagePaths = getUniqueImagePaths(imagePaths);

  return {
    url: absoluteUrl(path),
    ...(uniqueImagePaths.length
      ? { images: uniqueImagePaths.map((imagePath) => absoluteUrl(imagePath)) }
      : {}),
    ...(lastModified && !Number.isNaN(new Date(lastModified).getTime()) ? { lastModified } : {}),
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
      .map((page) => ({
        path: page.href,
        imagePaths: [page.image.src, ...productionSectionImages(page, services.find(service => `/services/${service.slug}` === page.href)?.capabilitySections?.map(section => section.image)).map(image => image.src)],
        changeFrequency: "monthly" as const,
        priority: 0.85,
      })),
    ...servicePillars.map((pillar) => ({
      path: `/services/${pillar.slug}`,
      imagePaths: getUniqueImagePaths([
        pillar.hero.src, pillar.live.src,
        ...pillar.capabilities.items.map(item => capabilityImage(item.href, pillar).src),
        ...pillar.related.items.map(item => (findPillar(item.href.split("/").at(-1)!)?.hero ?? pillar.hero).src),
        ...pillar.audience.items.map(item => getAudienceIndustry(item.title)?.heroImage.src),
      ]),
      changeFrequency: "monthly" as const,
      priority: 0.95,
    })),
    ...services.filter(service => !productionServices.some(page => page.href === `/services/${service.slug}`) && !servicePillars.some(pillar => pillar.slug === service.slug)).map((service) => ({
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
      imagePaths: [industry.heroImage.src,
        industryEditorialImage(industry.slug, "challenge").src,
        industryEditorialImage(industry.slug, "why").src,
        ...industry.solutions.map(solution => industrySolutionImage(solution.href).src),
      ],
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((item) => ({
      path: `/case-studies/${item.slug}`,
      imagePaths: [getCaseStudyMedia(item).src],
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.66,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      imagePaths: getUniqueImagePaths([
        post.coverImage?.src,
        ...getBlogBodyImagePaths(post.body),
      ]),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.64,
    })),
  ];

  const collectionRoutes = staticRoutes.map(route => ({
    ...route,
    imagePaths: route.path === "/blog" ? getUniqueImagePaths(posts.map(post => post.coverImage?.src))
      : route.path === "/case-studies" ? caseStudies.map(item => getCaseStudyMedia(item).src)
      : route.imagePaths,
  }));
  return [...collectionRoutes, ...dynamicRoutes]
    .map(toSitemapEntry)
    .sort((left, right) => left.url.localeCompare(right.url));
}
