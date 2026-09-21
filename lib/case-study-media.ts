import type { CaseStudy, ServiceNavMedia } from "@/lib/types";

const defaultCaseStudyMedia: ServiceNavMedia = {
  src: "/image/service-details/door-access-dashboard.webp",
  alt: "Access control dashboard and security operations interface",
};

const caseStudyMediaBySlug: Record<string, ServiceNavMedia> = {
  "cihp-headquarters-elv-infrastructure-abuja": {
    src: "/image/case-studies/cihp-headquarters-elv-infrastructure-abuja-photo.webp",
    alt: "Structured ELV cabling and fire suppression ready infrastructure for CIHP headquarters",
  },
  "fringe-pci-dss-infrastructure-upgrade": {
    src: "/image/case-studies/fringe-pci-dss-infrastructure-upgrade-photo.webp",
    alt: "PCI DSS aligned infrastructure upgrade with network security and access control systems",
  },
  "wiocc-34-floor-it-elv-deployment": {
    src: "/image/case-studies/wiocc-34-floor-it-elv-deployment-photo.webp",
    alt: "Two-floor WIOCC IT and ELV deployment with network rack access control CCTV and safety systems",
  },
  "cihp-stem-hub-relocation-ikeja": {
    src: "/image/case-studies/cihp-stem-hub-relocation-ikeja-photo.webp",
    alt: "Relocated STEM hub IT infrastructure with rack network storage and access systems",
  },
  "wiocc-2nd-floor-elv-deployment": {
    src: "/image/case-studies/wiocc-2nd-floor-elv-deployment-photo.webp",
    alt: "Integrated ELV infrastructure with surveillance access control fire alarm and network systems",
  },
  "cihp-stem-hub-elv-installation-2024": {
    src: "/image/case-studies/cihp-stem-hub-elv-installation-2024-photo.webp",
    alt: "Education STEM hub ELV installation with network communication surveillance and safety systems",
  },
  "cihp-stem-hub-it-infrastructure-2023": {
    src: "/image/case-studies/cihp-stem-hub-it-infrastructure-2023-photo.webp",
    alt: "Future ready STEM hub IT infrastructure with structured network and security systems",
  },
  "seflam-sgl-engineering-office-elv": {
    src: "/image/case-studies/seflam-sgl-engineering-office-elv-photo.webp",
    alt: "Corporate engineering office ELV infrastructure with network access control CCTV and fire safety systems",
  },
};

const caseStudyMediaByIndustry: Record<string, ServiceNavMedia> = {
  "healthcare and development programs": {
    src: "/image/case-studies/cihp-headquarters-elv-infrastructure-abuja-photo.webp",
    alt: "Healthcare program headquarters ELV infrastructure environment",
  },
  "financial services and regulated operations": {
    src: "/image/case-studies/fringe-pci-dss-infrastructure-upgrade-photo.webp",
    alt: "Financial services infrastructure and compliance upgrade environment",
  },
  telecommunications: {
    src: "/image/case-studies/wiocc-34-floor-it-elv-deployment-photo.webp",
    alt: "Telecommunications office IT and ELV infrastructure environment",
  },
  "education, innovation, and development programs": {
    src: "/image/case-studies/cihp-stem-hub-elv-installation-2024-photo.webp",
    alt: "STEM hub education technology and ELV infrastructure environment",
  },
  "engineering and corporate offices": {
    src: "/image/case-studies/seflam-sgl-engineering-office-elv-photo.webp",
    alt: "Engineering office ELV infrastructure environment",
  },
};

export function getCaseStudyMedia(caseStudy: CaseStudy): ServiceNavMedia {
  if (caseStudy.cardImage?.src) {
    return {
      src: caseStudy.cardImage.src,
      alt: caseStudy.cardImage.alt || `${caseStudy.title} case study image`,
    };
  }

  if (caseStudy.image?.src) {
    return {
      src: caseStudy.image.src,
      alt: caseStudy.image.alt || `${caseStudy.title} case study image`,
    };
  }

  const industryKey = caseStudy.industry?.toLowerCase();

  return (
    caseStudyMediaBySlug[caseStudy.slug] ??
    (industryKey ? caseStudyMediaByIndustry[industryKey] : undefined) ??
    defaultCaseStudyMedia
  );
}
