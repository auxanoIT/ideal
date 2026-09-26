import type { PortableTextBlock } from "@portabletext/types";

export type LinkItem = {
  label: string;
  href: string;
  description?: string;
};

export type CTA = LinkItem & {
  variant?: "primary" | "secondary" | "ghost";
};

export type NavItem = LinkItem & {
  kind?: "link" | "solutions" | "industries" | "resources";
  children?: LinkItem[];
};

export type Metric = {
  value: string;
  label: string;
  description?: string;
};

export type PartnerLogo = {
  name: string;
  tone?: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type CareerOpening = {
  title: string;
  location?: string;
  employmentType?: string;
  department?: string;
  summary?: string;
};

export type ServiceCategory =
  | "Infrastructure"
  | "Fire Alarm & Safety"
  | "Networking"
  | "Hardware Systems"
  | "Software & Licenses"
  | "Managed & Advisory";

export type ServiceNavMedia = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ServiceCapabilitySection = {
  id: string;
  navLabel: string;
  title: string;
  lead: string;
  body: string[];
  image: ServiceNavMedia;
};

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string;
  positioning: string;
  outcome: string;
  heroLabel: string;
  highlights: string[];
  capabilities: string[];
  deliverables: string[];
  industries: string[];
  serviceMixId: string;
  navDescription: string;
  navImage: ServiceNavMedia;
  heroImage?: ServiceNavMedia;
  detailEyebrow?: string;
  detailTitle?: string;
  detailDescription?: string;
  capabilitySections?: ServiceCapabilitySection[];
};

export type SolutionCategory = {
  id: string;
  label: string;
  formalTitle: string;
  description: string;
  anchorId: string;
  href: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredImage: ServiceNavMedia;
  serviceSlugs: string[];
};

export type IndustryIconName =
  | "data-centre"
  | "telecommunications"
  | "technology"
  | "integrator"
  | "msp"
  | "oem"
  | "corporate"
  | "healthcare"
  | "education"
  | "government"
  | "finance"
  | "warehouse"
  | "manufacturing"
  | "retail"
  | "hospitality"
  | "property"
  | "religious"
  | "multisite";

export type IndustryGroup =
  | "critical-infrastructure-technology"
  | "enterprise-public-sector"
  | "commercial-operational";

export type IndustryChallengeTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  points: Array<{ title: string; description: string }>;
  ctaLabel: string;
  ctaHref: string;
  visual: string;
};

export type IndustrySolution = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type IndustryReason = {
  title: string;
  description: string;
};

export type IndustryProfile = {
  slug: string;
  href: string;
  title: string;
  navLabel: string;
  group: IndustryGroup;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: ServiceNavMedia;
  icon: IndustryIconName;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  challengesTitle: string;
  challengesDescription: string;
  challengeTabs: IndustryChallengeTab[];
  whyTitle: string;
  whyDescription: string;
  whyReasons: IndustryReason[];
  solutionsTitle: string;
  solutionsDescription: string;
  solutions: IndustrySolution[];
  formTitle: string;
  formDescription: string;
  formCta: string;
  primaryServiceSlugs: string[];
  challengePoints: string[];
  environmentExamples: string[];
  relatedCaseStudySlug?: string;
  ctaLabel: string;
};

export type ResourceGroupId =
  | "insights-learning"
  | "proof-planning"
  | "support"
  | "commercial-tools";

export type ResourceLinkItem = LinkItem & {
  id: string;
  group: ResourceGroupId;
};

export type ResourceGroup = {
  id: ResourceGroupId;
  label: string;
  href: string;
  links: ResourceLinkItem[];
};

export type CaseStudy = {
  updatedAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
  slug: string;
  title: string;
  client?: string;
  clientDisplayName?: string;
  anonymous?: boolean;
  industry: string;
  location?: string;
  summary: string;
  challenge?: string;
  solution?: string[];
  result?: string;
  outcome?: string;
  metrics?: Metric[];
  relatedServices?: string[];
  image?: ServiceNavMedia;
  cardImage?: ServiceNavMedia;
  featured?: boolean;
  published?: boolean;
  projectDate?: string;
  quote?: {
    text: string;
    author?: string;
    role?: string;
  };
};

export type BlogPost = {
  seo?: { metaTitle?: string; metaDescription?: string };
  updatedAt?: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  author?: string;
  excerpt: string;
  coverImage?: ServiceNavMedia;
  takeaways: string[];
  body: BlogBodyBlock[];
};

export type BlogBodyBlock =
  | string
  | PortableTextBlock
  | {
      _type: "blogPlainText";
      text: string;
    }
  | {
      _type: "blogHeading";
      text: string;
      level?: 2 | 3;
      anchor?: string;
    }
  | {
      _type: "blogParagraph";
      text: string;
    }
  | {
      _type: "blogList";
      style?: "bullet" | "number";
      items: string[];
    }
  | {
      _type: "blogCallout";
      tone?: "important" | "warning" | "note" | "tip";
      title?: string;
      text: string;
    }
  | {
      _type: "blogQuote";
      quote: string;
      attribution?: string;
    }
  | {
      _type: "blogTable";
      caption?: string;
      columns: string[];
      rows: Array<{
        cells: string[];
      }>;
    }
  | {
      _type: "image";
      image?: ServiceNavMedia;
      caption?: string;
    }
  | {
      _type: "blogImageBlock";
      image: ServiceNavMedia;
      caption?: string;
    };

export type FooterColumn = {
  title: string;
  links: LinkItem[];
};

export type NetworkNode = {
  label: string;
  detail: string;
  x: number;
  y: number;
};

export type HeroSection = {
  _type: "hero";
  eyebrow: string;
  title: string;
  description: string;
  mode?: "default" | "videoCarousel";
  tags: string[];
  metrics: Metric[];
  primaryCta: CTA;
  secondaryCta: CTA;
  slides?: HeroVideoSlide[];
};

export type HeroVideoSlide = {
  id: string;
  videoPublicId: string;
  videoUrl: string;
  headline: string;
  description: string;
  hideContent?: boolean;
  primaryCta: CTA;
};

export type LogoStripSection = {
  _type: "logoStrip";
  title: string;
  logos: PartnerLogo[];
};

export type MetricBandSection = {
  _type: "metricBand";
  eyebrow: string;
  title: string;
  description: string;
  metrics: Metric[];
};

export type ServiceGridSection = {
  _type: "serviceGrid";
  eyebrow: string;
  title: string;
  description: string;
  featuredSlugs: string[];
};

export type ContentSplitSection = {
  _type: "contentSplit";
  eyebrow: string;
  title: string;
  body: string[];
  points: string[];
  reverse?: boolean;
  dark?: boolean;
};

export type ServiceShowcaseItem = {
  id: string;
  title: string;
  lead?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ServiceShowcaseSection = {
  _type: "serviceShowcase";
  eyebrow: string;
  title: string;
  description?: string;
  items: ServiceShowcaseItem[];
};

export type CategoryShowcaseItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  videoPublicId?: string;
  videoUrl?: string;
};

export type CategoryShowcaseSection = {
  _type: "categoryShowcase";
  eyebrow: string;
  title: string;
  description: string;
  videoPublicId: string;
  videoUrl: string;
  items: CategoryShowcaseItem[];
};

export type InteractiveServicesItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  x: number;
  y: number;
  size?: number;
  glowFrom?: string;
  glowTo?: string;
  panelPlacement?: "right" | "left" | "bottom";
  targetSize?: number;
  targetOffsetX?: number;
  targetOffsetY?: number;
};

export type InteractiveServicesSection = {
  _type: "interactiveServices";
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  promptLabel: string;
  items: InteractiveServicesItem[];
};

export type TrustBannerSection = {
  _type: "trustBanner";
  title: string;
  description: string;
  cta: CTA;
};

export type NetworkMapSection = {
  _type: "networkMapSection";
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  bullets: string[];
  nodes: NetworkNode[];
};

export type CaseStudyRailSection = {
  _type: "caseStudyRail";
  eyebrow: string;
  title: string;
  description: string;
  slugs: string[];
};

export type TestimonialRailSection = {
  _type: "testimonialRail";
  eyebrow: string;
  title: string;
  description: string;
};

export type FAQBlockSection = {
  _type: "faqBlock";
  eyebrow: string;
  title: string;
  description: string;
  ids: string[];
};

export type CTABandSection = {
  _type: "ctaBand";
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  dark?: boolean;
};

export type RichContentSection = {
  _type: "richContent";
  eyebrow: string;
  title: string;
  content: string[];
};

export type PageSection =
  | HeroSection
  | LogoStripSection
  | MetricBandSection
  | ServiceGridSection
  | ContentSplitSection
  | ServiceShowcaseSection
  | CategoryShowcaseSection
  | InteractiveServicesSection
  | TrustBannerSection
  | NetworkMapSection
  | CaseStudyRailSection
  | TestimonialRailSection
  | FAQBlockSection
  | CTABandSection
  | RichContentSection;

export type MarketingPage = {
  slug: string;
  title: string;
  description: string;
  sections: PageSection[];
};

export type SiteSettings = {
  name: string;
  shortName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  whatsappSales: string;
  whatsappSupport: string;
  hubspotMeetingUrl: string;
};

export type EstimatorBand = {
  id: string;
  label: string;
  low: number;
  high: number;
  note?: string;
};

export type EstimatorMultiplier = {
  id: string;
  label: string;
  multiplierLow: number;
  multiplierHigh: number;
  note?: string;
};

export type EstimatorService = {
  id: string;
  label: string;
  baseLow: number;
  baseHigh: number;
  description: string;
};

export type EstimatorConfig = {
  companySizes: EstimatorMultiplier[];
  locationBands: EstimatorMultiplier[];
  supportTiers: EstimatorMultiplier[];
  cameraBands: EstimatorBand[];
  networkScopes: EstimatorBand[];
  complianceLevels: EstimatorBand[];
  services: EstimatorService[];
  contingencyLow: number;
  contingencyHigh: number;
};

export type EstimateAnswers = {
  name: string;
  company: string;
  email: string;
  phone: string;
  companySize: string;
  locationBand: string;
  supportTier: string;
  cameraBand: string;
  networkScope: string;
  complianceLevel: string;
  serviceMix: string[];
  notes?: string;
};

export type EstimateLineItem = {
  id: string;
  label: string;
  low: number;
  high: number;
  description: string;
};

export type EstimateResult = {
  low: number;
  high: number;
  timeline: string;
  recommendation: string;
  lineItems: EstimateLineItem[];
};
