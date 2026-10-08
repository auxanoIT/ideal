import { operationalAdvantageSection } from "@/data/operational-advantage";
import { homeProjectCta } from "@/data/home-project-cta";
import { servicePillars } from "@/data/service-pillars";
import { industryProfiles as footerIndustries } from "@/data/industry-catalog";
import type {
  BlogPost,
  EstimatorConfig,
  FAQItem,
  FooterColumn,
  MarketingPage,
  NavItem,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

export { services, solutionCategories } from "@/data/solution-catalog";
export { industryProfiles } from "@/data/industry-catalog";
export { resourceGroups, resourceLinks } from "@/data/resource-catalog";

export const siteSettings: SiteSettings = {
  name: "Ideal Solutions",
  shortName: "Ideal Solutions",
  description:
    "Technical execution, infrastructure support and local expertise for reliable, secure and growth-ready data centre environments in Nigeria.",
  phone: "+234 8062 218 546",
  email: "info@idealsolutions.com.ng",
  address:
    "21, Abeokuta Street, Off Obasa Street, Oba Akran Avenue, Ikeja, Lagos",
  city: "Lagos",
  country: "Nigeria",
  whatsappSales: process.env.NEXT_PUBLIC_SALES_WHATSAPP ?? "+2348062218546",
  whatsappSupport: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ?? "+2348062218546",
  hubspotMeetingUrl:
    process.env.IDEALSOLUTIONS_HUBSPOT_MEETINGS_URL ?? "",
};

export const navigation: NavItem[] = [
  { label: "Solutions", href: "/services", kind: "solutions" },
  { label: "Industries", href: "/industries", kind: "industries" },
  { label: "Case Studies", href: "/case-studies", kind: "link" },
  { label: "Resources", href: "/resources", kind: "resources" },
  { label: "About", href: "/about", kind: "link" },
];

export { idealCaseStudies as caseStudies } from "@/data/ideal-case-studies";

// Editorial content is published through the Ideal Solutions Sanity project.
export const blogPosts: BlogPost[] = [];

// Add testimonials only after the business has approved their attribution.
export const testimonials: Testimonial[] = [];

export const faqs: FAQItem[] = [
  {
    "id": "faq-1",
    "question": "Who does Ideal Solutions work with?",
    "answer": "Ideal Solutions supports data centre operators, enterprise IT teams, OEMs, managed service providers, system integrators and international teams that need onsite technical execution in Nigeria. We work to an agreed scope while the client's technical owners retain control of their environment."
  },
  {
    "id": "faq-2",
    "question": "What services does Ideal Solutions provide?",
    "answer": "Our seven service pillars cover data centre deployment; Smart Hands and technical support; servers, storage and hardware; network infrastructure and connectivity; security and safety systems; infrastructure audit and optimisation; and project and lifecycle management. Supply, installation, configuration and ongoing support are agreed separately where needed."
  },
  {
    "id": "faq-3",
    "question": "Are you a data centre operator or an onsite services provider?",
    "answer": "Ideal Solutions is an onsite infrastructure services business, not a colocation facility operator. We support work in the customer's approved data centre, server room or enterprise environment. Hosting, rack rental, internet transit and facility operations are not implied by our deployment services."
  },
  {
    "id": "faq-4",
    "question": "Can you work with our remote engineers or existing IT team?",
    "answer": "Yes. Your team can provide approved work instructions, rack layouts, equipment details and configuration requirements. We agree the onsite tasks, technical contacts, communication method and approval process before starting. Changes outside the agreed scope require approval."
  },
  {
    "id": "faq-5",
    "question": "Can you assess our existing infrastructure before recommending work?",
    "answer": "Yes. An agreed assessment can review racks, cabling, equipment identification, physical connections and available records. Findings can help define remediation, installation or expansion work. An infrastructure assessment is not automatically a cybersecurity penetration test or a regulatory certification."
  },
  {
    "id": "faq-6",
    "question": "Can work be carried out in a live environment?",
    "answer": "Work can be planned around operational environments, subject to site access rules, dependencies and approved change procedures. Tasks that could interrupt service need an agreed work window, responsible technical contact and recovery approach. Zero downtime should not be assumed."
  },
  {
    "id": "faq-7",
    "question": "Where is Ideal Solutions based, and can you support sites outside Lagos?",
    "answer": "Our address is 21, Abeokuta Street, Off Obasa Street, Oba Akran Avenue, Ikeja, Lagos. We support infrastructure projects across Nigeria, with travel, site access, scheduling and delivery arrangements confirmed for each location. International teams can engage us for work on infrastructure located in Nigeria."
  },
  {
    "id": "faq-8",
    "question": "Do you provide urgent, out-of-hours or recurring support?",
    "answer": "Planned maintenance and recurring onsite support can be scoped around your equipment and operating requirements. For urgent or out-of-hours work, share the site, affected equipment, symptoms and requested time. Availability, response arrangements and any service-level commitments must be confirmed; 24/7 coverage is not automatic."
  },
  {
    "id": "faq-9",
    "question": "What records will we receive after the work?",
    "answer": "Completion records are agreed before execution. Depending on the task, they may include equipment positions, connection or labelling updates, completed checks, permitted photographs and outstanding issues. Your technical owner reviews the evidence against the agreed acceptance criteria; completion of a physical task is not the same as full application or business acceptance."
  },
  {
    "id": "faq-10",
    "question": "What information do you need to quote and schedule a project?",
    "answer": "Share the site location, equipment models and quantities, required tasks, available drawings or records, access restrictions and preferred work window. Pricing and timing depend on the confirmed scope, parts, logistics and site readiness. Do not send passwords or sensitive infrastructure credentials in an initial enquiry."
  },
  {
    "id": "faq-11",
    "question": "How do I discuss a requirement with Ideal Solutions?",
    "answer": "Use the Book Consultation page or email info@idealsolutions.com.ng with a short project brief. Tell us whether you need deployment, support, hardware, networking, security, an assessment or lifecycle assistance. We can then clarify the scope and next steps before work is scheduled."
  }
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      ...servicePillars.map(pillar => ({ label: pillar.title, href: `/services/${pillar.slug}` })),
      { label: "Everything You Need Right Here", href: "/services" },
    ],
  },
  {
    title: "Industries",
    links: footerIndustries.map(industry => ({ label: industry.navLabel, href: industry.href })),
  },
  {
    title: "Explore",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Book Consultation", href: "/book-consultation" },
    ],
  },
];

export const marketingPages: MarketingPage[] = [
  {
    slug: "home",
    title:
      "Infrastructure, Networking, and Managed IT Solutions for Critical Teams",
    description:
      "Ideal Solutions helps businesses design, deploy, and support infrastructure, networking, hardware, software, and managed operations with enterprise-grade clarity.",
    sections: [
      {
        _type: "hero",
        eyebrow: "Enterprise IT And Infrastructure",
        title: "One command view for IT, CCTV, and network infrastructure.",
        description:
          "Design, deployment, and support for business-critical environments.",
        mode: "videoCarousel",
        tags: [
          "Infrastructure",
          "Networking",
          "Hardware Systems",
          "Software & Licenses",
        ],
        metrics: [
          { value: "15+", label: "Years in Business" },
          { value: "500+", label: "Projects delivered" },
          { value: "200+", label: "Clients served" },
          { value: "24/7", label: "Support available" },
        ],
        primaryCta: {
          label: "Book Consultation",
          href: "/book-consultation",
          variant: "primary",
        },
        secondaryCta: {
          label: "Book Consultation",
          href: "/book-consultation",
          variant: "secondary",
        },
        slides: [
          {
            id: "hero-slide-1",
            videoPublicId: "placeholder",
            videoUrl: "",
            headline:
              "One command view for IT, CCTV, and network infrastructure.",
            description:
              "Ideal Solutions connects IT, CCTV, networking, and support into one easier operating view.",
            primaryCta: {
              label: "Book Consultation",
              href: "/book-consultation",
              variant: "primary",
            },
          },
          {
            id: "hero-slide-2",
            videoPublicId: "placeholder",
            videoUrl: "",
            headline: "Physical security installed with network discipline.",
            description:
              "CCTV, access, cabling, storage, and handover are planned together for reliable coverage from day one.",
            primaryCta: {
              label: "Explore Security Solutions",
              href: "/services/door-access-control",
              variant: "primary",
            },
          },
          {
            id: "hero-slide-3",
            videoPublicId: "placeholder",
            videoUrl: "",
            headline:
              "Networks built for the devices and teams that rely on them.",
            description:
              "Structured cabling, switching, wireless, firewalls, and documentation built for easier daily management.",
            primaryCta: {
              label: "Explore Network Infrastructure",
              href: "/services#networking",
              variant: "primary",
            },
          },
          {
            id: "hero-slide-4",
            videoPublicId: "placeholder",
            videoUrl: "",
            headline: "Managed IT support with clearer ownership.",
            description:
              "Users, devices, monitoring, and escalation stay under one support model leadership can track.",
            primaryCta: {
              label: "Explore Managed IT",
              href: "/services/it-managed-services-staff-outsourcing",
              variant: "primary",
            },
          },
        ],
      },
      {
        _type: "serviceShowcase",
        eyebrow: "Our Services",
        title: "Everything your business needs under one roof.",
        description:
          "Explore the core service areas Ideal Solutions delivers for modern business environments.",
        items: [
          {
            id: "it-infrastructure",
            title: "IT Infrastructure",
            description:
              "Reliable IT infrastructure built for performance, scalability, and long-term business growth.",
            imageSrc: "/image/IT%20Infrastructure.png",
            imageAlt: "IT infrastructure systems for reliable business operations",
            ctaLabel: "Learn more",
            ctaHref: "/services#infrastructure",
          },
          {
            id: "fire-alarm-safety",
            title: "Fire Alarm & Safety",
            description:
              "Fire alarm systems designed, installed, tested, maintained, integrated, and aligned with safety compliance requirements.",
            imageSrc: "/image/service-details/fire-alarm-hero-call-point.webp",
            imageAlt: "Red manual fire alarm call point mounted on a clean commercial wall",
            ctaLabel: "Learn more",
            ctaHref: "/services#fire-alarm-safety",
          },
          {
            id: "networking",
            title: "Networking",
            description:
              "Fast, secure networks that keep your business connected and operating without interruption.",
            imageSrc: "/image/networking.png",
            imageAlt: "Business networking infrastructure connecting teams and devices",
            ctaLabel: "Learn more",
            ctaHref: "/services#networking",
          },
          {
            id: "computers-and-servers",
            title: "Computers & Servers",
            description:
              "Business-grade computers and servers for speed, reliability, and storage.",
            imageSrc: "/image/computer_and_server.png",
            imageAlt: "Business computers and servers prepared for workplace use",
            ctaLabel: "Learn more",
            ctaHref: "/services#hardware-systems",
          },
          {
            id: "software-and-licenses",
            title: "Software & Licenses",
            description:
              "Licensed software that keeps your business secure, compliant, and productive.",
            imageSrc: "/image/software_and_licenses.jpg",
            imageAlt: "Licensed business software and security applications",
            ctaLabel: "Learn more",
            ctaHref: "/services#software-licenses",
          },
          {
            id: "it-management",
            title: "IT Management",
            description:
              "End-to-end IT support to keep your systems stable, secure, and optimized daily.",
            imageSrc: "/image/It_management.jpg",
            imageAlt: "Managed IT support environment with operational monitoring",
            ctaLabel: "Learn more",
            ctaHref: "/services/it-managed-services-staff-outsourcing",
          },
        ],
      },
      {
        _type: "networkMapSection",
        eyebrow: "",
        title: "Ready to get it right the first time?",
        description:
          "Ideal Solutions Technology Limited delivers specialized and cost-effective ICT services that empower businesses to streamline operations, secure assets, and scale efficiently.",
        imageSrc: "/image/left.png",
        imageAlt: "Ideal Solutions left-side section visual",
        bullets: [],
        nodes: [
          {
            label: "Core Network",
            detail: "Switching, design, and monitoring",
            x: 50,
            y: 18,
          },
          {
            label: "CCTV",
            detail: "Coverage, storage, retrieval",
            x: 80,
            y: 40,
          },
          {
            label: "Access",
            detail: "Entry, permissions, audit",
            x: 72,
            y: 72,
          },
          {
            label: "Support",
            detail: "Users, devices, continuity",
            x: 28,
            y: 72,
          },
          {
            label: "Hardware",
            detail: "Servers, printers, endpoints",
            x: 18,
            y: 40,
          },
        ],
      },
      {
        _type: "trustBanner",
        title: "More than 500 organizations trust IdealSolutions",
        description: "From growing businesses to multi-site operations",
        cta: {
          label: "Explore our services",
          href: "/services",
          variant: "primary",
        },
      },
      operationalAdvantageSection,
      {
        _type: "interactiveServices",
        eyebrow: "Service Ecosystem",
        title: "Full-Service IT Solutions Built Right. Every Time.",
        description:
          "Select any point in the scene to explore how infrastructure, networking, hardware, software, and managed support connect in a live business setup.",
        imageSrc: "/image/servces.png",
        imageAlt:
          "Interactive Ideal Solutions services environment showing integrated infrastructure, networking, hardware, software, and managed support touchpoints.",
        promptLabel: "Explore the stack",
        items: [
          {
            id: "software-hotspot",
            label: "Software & Licenses",
            title: "Licensed and configured software for the real environment.",
            description:
              "Ideal Solutions handles licensing, activation, security configuration, and cloud or business application setup so the software layer is compliant, usable, and supportable after deployment instead of becoming a separate cleanup project.",
            ctaLabel: "Explore Software",
            ctaHref: "/services#software-licenses",
            x: 24.1,
            y: 14.0,
            size: 66,
            glowFrom: "rgba(191,219,254,0.30)",
            glowTo: "rgba(59,130,246,0.10)",
            panelPlacement: "bottom",
            targetSize: 127,
            targetOffsetY: 72,
          },
          {
            id: "security-hotspot",
            label: "Physical Security & Access",
            title:
              "Security and access systems deployed as one controlled layer.",
            description:
              "Ideal Solutions delivers CCTV, access control, structured cabling, automation, and site readiness as one coordinated infrastructure layer so environments open with cleaner coverage, safer entry, and fewer technical gaps.",
            ctaLabel: "Explore Infrastructure",
            ctaHref: "/services#infrastructure",
            x: 50,
            y: 8,
            size: 66,
            glowFrom: "rgba(34,211,238,0.38)",
            glowTo: "rgba(59,130,246,0.12)",
            panelPlacement: "bottom",
            targetSize: 127,
            targetOffsetY: 72,
          },
          {
            id: "infrastructure-hotspot",
            label: "Infrastructure",
            title:
              "Infrastructure planned, installed, and handed over properly.",
            description:
              "Structured cabling, site readiness, data-centre support, and operational installation standards are coordinated together so the physical environment stays stable, supportable, and ready for growth.",
            ctaLabel: "Explore Infrastructure",
            ctaHref: "/services#infrastructure",
            x: 76,
            y: 14.5,
            size: 10,
            glowFrom: "rgba(125,211,252,0.34)",
            glowTo: "rgba(96,165,250,0.14)",
            panelPlacement: "bottom",
            targetSize: 127,
            targetOffsetY: 72,
          },
          {
            id: "it-management-hotspot",
            label: "IT Management",
            title:
              "Managed IT support with clearer ownership and follow-through.",
            description:
              "Ideal Solutions supports users, devices, escalations, and continuity with a structured operating model that keeps the environment from slipping after rollout or daily support pressure increases.",
            ctaLabel: "Explore Managed Services",
            ctaHref: "/services#managed-advisory",
            x: 13.8,
            y: 41.8,
            size: 66,
            glowFrom: "rgba(165,243,252,0.34)",
            glowTo: "rgba(147,197,253,0.12)",
            panelPlacement: "right",
            targetSize: 128,
            targetOffsetY: 72,
          },
          {
            id: "networking-hotspot",
            label: "Networking",
            title: "Networks designed, configured, and documented properly.",
            description:
              "From survey-led topology planning to active configuration and final diagrams, Ideal Solutions builds networks that support CCTV, users, cloud apps, and business communications without leaving the client to coordinate separate vendors.",
            ctaLabel: "Explore Networking",
            ctaHref: "/services#networking",
            x: 14.8,
            y: 68.9,
            size: 66,
            glowFrom: "rgba(125,211,252,0.34)",
            glowTo: "rgba(96,165,250,0.14)",
            panelPlacement: "right",
            targetSize: 127,
            targetOffsetY: 72,
          },
          {
            id: "hardware-support-hotspot",
            label: "Hardware & Support",
            title: "Hardware delivery tied to support readiness from day one.",
            description:
              "Original endpoints, peripherals, support setup, and deployment preparation are handled together so the business receives devices that are easier to operate, maintain, and replace without friction.",
            ctaLabel: "Explore Hardware",
            ctaHref: "/services#hardware-systems",
            x: 83.9,
            y: 41.9,
            size: 66,
            glowFrom: "rgba(165,243,252,0.34)",
            glowTo: "rgba(147,197,253,0.12)",
            panelPlacement: "left",
            targetSize: 125,
            targetOffsetY: 72,
          },
          {
            id: "hardware-hotspot",
            label: "Computers & Servers",
            title: "Original hardware supplied and prepared for immediate use.",
            description:
              "Computers, servers, storage, printers, and supporting endpoints are sourced, deployed, and configured against the environment they will serve, making replacement, support, and future growth more predictable.",
            ctaLabel: "Explore Hardware",
            ctaHref: "/services#hardware-systems",
            x: 83.5,
            y: 69.3,
            size: 66,
            glowFrom: "rgba(103,232,249,0.32)",
            glowTo: "rgba(96,165,250,0.12)",
            panelPlacement: "left",
            targetSize: 128,
            targetOffsetY: 72,
          },
          {
            id: "data-centre-hotspot",
            label: "Data Centre",
            title: "Data-centre readiness built into the wider environment.",
            description:
              "Server-room power, racks, cooling, monitoring, and supporting infrastructure are planned as part of the broader deployment, not left as an isolated technical afterthought.",
            ctaLabel: "Explore Data Centre Services",
            ctaHref: "/services#infrastructure",
            x: 50,
            y: 90,
            size: 54,
            glowFrom: "rgba(56,189,248,0.30)",
            glowTo: "rgba(59,130,246,0.10)",
            panelPlacement: "bottom",
            targetSize: 122,
            targetOffsetY: 72,
          },
        ],
      },
      homeProjectCta,
      {
        _type: "faqBlock",
        eyebrow: "FAQs",
        title: "Working with Ideal Solutions: Your Questions, Answered",
        description:
          "Practical answers about onsite execution, service scope, site access, scheduling and handover for infrastructure projects in Nigeria.",
        ids: [
          "faq-1",
          "faq-2",
          "faq-3",
          "faq-4",
          "faq-5",
          "faq-6",
          "faq-7",
          "faq-8",
          "faq-9",
          "faq-10",
          "faq-11",
        ],
      },
    ],
  },
  {
    slug: "about",
    title: "About Ideal Solutions",
    description:
      "Ideal Solutions combines infrastructure delivery, networking, hardware systems, software licensing, and managed advisory support for organizations that need serious operational execution.",
    sections: [
      {
        _type: "richContent",
        eyebrow: "About Ideal Solutions",
        title:
          "A technical delivery partner for organizations that need more than generic IT support.",
        content: [
          "Ideal Solutions Technology Limited works across infrastructure, networking, hardware systems, software licensing, and managed advisory support. The company is built around doing technical work properly from the beginning rather than treating quality as a later correction step.",
          "That operating view matters because surveillance depends on the network, devices depend on clean setup, licensing depends on compliance discipline, and support quality shapes what happens after deployment.",
          "Clients get a serious technical partner with clear scoping, structured execution, and commercially credible handover.",
        ],
      },
    ],
  },
];

export const estimatorConfig: EstimatorConfig = {
  companySizes: [
    {
      id: "small",
      label: "10-25 staff",
      multiplierLow: 1,
      multiplierHigh: 1.1,
    },
    {
      id: "mid",
      label: "26-75 staff",
      multiplierLow: 1.2,
      multiplierHigh: 1.35,
    },
    {
      id: "large",
      label: "76-150 staff",
      multiplierLow: 1.45,
      multiplierHigh: 1.65,
    },
    {
      id: "enterprise",
      label: "150+ staff",
      multiplierLow: 1.7,
      multiplierHigh: 2,
    },
  ],
  locationBands: [
    {
      id: "single-site",
      label: "Single site",
      multiplierLow: 1,
      multiplierHigh: 1.05,
    },
    {
      id: "two-to-four",
      label: "2-4 locations",
      multiplierLow: 1.18,
      multiplierHigh: 1.3,
    },
    {
      id: "multi-site",
      label: "5+ locations",
      multiplierLow: 1.38,
      multiplierHigh: 1.55,
    },
  ],
  supportTiers: [
    {
      id: "standard",
      label: "Standard support coverage",
      multiplierLow: 1,
      multiplierHigh: 1.08,
    },
    {
      id: "business-critical",
      label: "Business-critical coverage",
      multiplierLow: 1.18,
      multiplierHigh: 1.28,
    },
    {
      id: "24-7",
      label: "24/7 support expectation",
      multiplierLow: 1.35,
      multiplierHigh: 1.5,
    },
  ],
  cameraBands: [
    { id: "none", label: "No camera scope", low: 0, high: 0 },
    { id: "1-8", label: "1-8 cameras", low: 900000, high: 1600000 },
    { id: "9-24", label: "9-24 cameras", low: 1800000, high: 3600000 },
    { id: "25-60", label: "25-60 cameras", low: 3800000, high: 7200000 },
    { id: "60-plus", label: "60+ cameras", low: 7600000, high: 12800000 },
  ],
  networkScopes: [
    { id: "light", label: "Office refresh", low: 750000, high: 1500000 },
    {
      id: "medium",
      label: "Multi-floor or dense endpoint rollout",
      low: 1800000,
      high: 3600000,
    },
    {
      id: "heavy",
      label: "Multi-site or complex infrastructure scope",
      low: 4200000,
      high: 7800000,
    },
  ],
  complianceLevels: [
    { id: "none", label: "No compliance uplift", low: 0, high: 0 },
    { id: "basic", label: "Basic audit review", low: 650000, high: 1200000 },
    {
      id: "regulated",
      label: "Regulated or board-level review",
      low: 1450000,
      high: 2800000,
    },
  ],
  services: [
    {
      id: "managed-it",
      label: "Managed IT Support",
      baseLow: 1500000,
      baseHigh: 3200000,
      description:
        "Support model, endpoint visibility, onboarding, reporting, and response structure.",
    },
    {
      id: "cctv",
      label: "CCTV & Surveillance",
      baseLow: 1800000,
      baseHigh: 3400000,
      description:
        "Coverage planning, deployment, recording, and control-room readiness.",
    },
    {
      id: "network",
      label: "Network Infrastructure",
      baseLow: 1600000,
      baseHigh: 3000000,
      description:
        "Structured network rollout, switching, wireless, and monitoring setup.",
    },
    {
      id: "audit",
      label: "IT Audit & Compliance",
      baseLow: 900000,
      baseHigh: 1850000,
      description:
        "Controls review, gap assessment, reporting, and remediation planning.",
    },
    {
      id: "access-control",
      label: "Access Control",
      baseLow: 1250000,
      baseHigh: 2600000,
      description:
        "Entry management design, hardware planning, and access policy structure.",
    },
    {
      id: "disaster-recovery",
      label: "Business Continuity & DR",
      baseLow: 850000,
      baseHigh: 1750000,
      description:
        "Critical dependency mapping, recovery planning, and resilience recommendations.",
    },
  ],
  contingencyLow: 1.04,
  contingencyHigh: 1.12,
};
