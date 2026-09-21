import type { MarketingPage, PageSection } from "@/lib/types";

const CLOUDINARY_CLOUD_NAME = "dnqn2cs4e";

export const cloudinaryVideos = {
  heroLogo: "auxano_logo_animation_imrmvo",
  softwareLicensing: "software_lincensing_rip8v4",
  networking: "networking_aftabv",
  itManagement: "it_management_wsufkd",
  itInfrastructure: "It_infrastructure_cl88uv",
  hardware: "hardware_o3gvnv",
} as const;

export function getCloudinaryVideoUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto:good/f_auto/vc_auto/${publicId}.mp4`;
}

export function applyHomeCloudinaryMedia(page: MarketingPage): MarketingPage {
  if (page.slug !== "home") {
    return page;
  }

  return {
    ...page,
    sections: page.sections.map(applyHomeSectionCloudinaryMedia),
  };
}

function applyHomeSectionCloudinaryMedia(section: PageSection): PageSection {
  if (section._type === "hero" && section.mode === "videoCarousel") {
    const slidePublicIds = [
      cloudinaryVideos.itInfrastructure,
      cloudinaryVideos.hardware,
      cloudinaryVideos.networking,
      cloudinaryVideos.itManagement,
    ];
    const contentSlides = section.slides ?? [];

    return {
      ...section,
      slides: [
        {
          id: "hero-logo-intro",
          videoPublicId: cloudinaryVideos.heroLogo,
          videoUrl: getCloudinaryVideoUrl(cloudinaryVideos.heroLogo),
          headline: "Auxano Solutions for critical IT environments.",
          description:
            "Integrated technology delivery for infrastructure, networks, hardware, software, and managed operations.",
          primaryCta: {
            label: "Book Consultation",
            href: "/book-consultation",
            variant: "primary",
          },
        },
        ...contentSlides.map((slide, index) => {
          const publicId = slidePublicIds[index] ?? slide.videoPublicId;

          return {
            ...slide,
            videoPublicId: publicId,
            videoUrl: getCloudinaryVideoUrl(publicId),
          };
        }),
      ],
    };
  }

  if (section._type === "categoryShowcase") {
    const mediaByItemId: Record<string, string> = {
      "installed-right": cloudinaryVideos.itInfrastructure,
      "connected-end-to-end": cloudinaryVideos.networking,
      "original-equipment": cloudinaryVideos.hardware,
      "licensed-configured": cloudinaryVideos.softwareLicensing,
      "support-that-stays": cloudinaryVideos.itManagement,
    };

    return {
      ...section,
      videoPublicId: cloudinaryVideos.itInfrastructure,
      videoUrl: getCloudinaryVideoUrl(cloudinaryVideos.itInfrastructure),
      items: section.items.map((item) => {
        const publicId = item.videoPublicId ?? mediaByItemId[item.id] ?? cloudinaryVideos.itInfrastructure;

        return {
          ...item,
          videoPublicId: publicId,
          videoUrl: getCloudinaryVideoUrl(publicId),
        };
      }),
    };
  }

  return section;
}
