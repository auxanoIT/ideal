import type { CategoryShowcaseSection } from "@/lib/types";
import { cloudinaryVideos, getCloudinaryVideoUrl } from "@/lib/cloudinary-media";

// Brand-specific replacements for tabs 1, 2 and 4; tab 3 keeps its existing video.
export function operationalAdvantage(
  section: CategoryShowcaseSection,
): CategoryShowcaseSection {
  const content = [
    {
      label: "01 — Extend Your Team",
      title: "More Technical Capacity Without More Permanent Overhead.",
      description:
        "Infrastructure work does not always justify adding another permanent engineer — but it still has to be done properly.\n\nIdeal Solutions gives your team access to experienced onsite technical support when projects, maintenance activities or infrastructure changes demand additional hands.\n\nYour internal team keeps ownership of the environment.\nWe add the execution capacity.",

      ctaLabel: "Extend Your Technical Capacity",
    },
    {
      label: "02 — Move Work Forward",
      title: "Keep Infrastructure Work from Becoming a Project Bottleneck.",
      description:
        "Equipment can be available, approvals can be complete and designs can be ready — yet projects still stall when physical execution is delayed.\n\nIdeal Solutions helps close the gap between what has been approved and what has actually been completed on the data centre floor.",

      ctaLabel: "Move Your Project Forward",
    },
    {
      label: "03 — Keep Control",
      title: "Add Outside Expertise Without Giving Up Control.",
      description:
        "Bringing in a technical partner should not mean losing visibility over your infrastructure.\n\nYour team defines the standards, requirements and priorities. Ideal Solutions provides the onsite execution needed to carry them through.\n\nThe result is additional capability without creating another layer of operational uncertainty.",

      ctaLabel: "Discuss Your Requirements",
    },
    {
      label: "04 — Stay Visible",
      title: "Know What Changed — and What You Are Working With.",
      description:
        "Infrastructure becomes harder to manage when physical changes happen faster than the information surrounding them.\n\nIdeal Solutions helps preserve visibility through structured execution, verification and relevant infrastructure records — giving your team a clearer picture after the work is complete.",

      ctaLabel: "Improve Infrastructure Visibility",
    },
  ];
  return {
    ...section,
    title: "Add Technical Capacity. Keep Operational Control.",
    description:
      "Ideal Solutions adds the local technical capacity to keep infrastructure work moving while your team stays in control.",
    items: content.map((item, index) => ({
      videoPublicId: replacementVideos[index]?.publicId ?? section.items[index]?.videoPublicId ?? retainedVideos[index],
      videoUrl: replacementVideos[index]?.url ?? (section.items[index]?.videoUrl || getCloudinaryVideoUrl(retainedVideos[index])),
      bullets: [],
      ...item,
      id: `operational-advantage-${index + 1}`,
      ctaHref: "/contact",
    })),
  };
}

const retainedVideos = [cloudinaryVideos.itInfrastructure, cloudinaryVideos.networking, cloudinaryVideos.hardware, cloudinaryVideos.softwareLicensing];

const replacementVideos = [
  { publicId: "idealsolution_1_hj84zo", url: "https://res.cloudinary.com/dnqn2cs4e/video/upload/v1789406987/idealsolution_1_hj84zo.mp4" },
  { publicId: "idealsolution2_aztxq2", url: "https://res.cloudinary.com/dnqn2cs4e/video/upload/v1789407493/idealsolution2_aztxq2.mp4" },
  null,
  { publicId: "idealsolution_4_yipfcz", url: "https://res.cloudinary.com/dnqn2cs4e/video/upload/v1789411020/idealsolution_4_yipfcz.mp4" },
];

export const operationalAdvantageSection = operationalAdvantage({
  _type: "categoryShowcase",
  eyebrow: "",
  title: "",
  description: "",
  videoPublicId: retainedVideos[0],
  videoUrl: getCloudinaryVideoUrl(retainedVideos[0]),
  items: [],
});
