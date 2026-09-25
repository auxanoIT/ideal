import type {
  IndustryChallengeTab,
  IndustryGroup,
  IndustryIconName,
  IndustryProfile,
  IndustryReason,
  IndustrySolution,
} from "@/lib/types";

const groups: Record<IndustryGroup, string> = {
  "critical-infrastructure-technology": "Critical Infrastructure & Technology",
  "enterprise-public-sector": "Enterprise & Public Sector",
  "commercial-operational": "Commercial & Operational",
};

// Hero references must resolve to existing WebP assets; validate with
// node scripts/check-industry-images.mjs before shipping image changes.
const industryHeroImages: Record<string, { src: string; alt: string }> = {
  "data-centres": {
    src: "/image/industries/data-centre-infrastructure-nigeria.webp",
    alt: "Nigerian data centre engineer carrying out rack-level infrastructure work in an active server aisle",
  },
  "telecommunications-isps": {
    src: "/image/industries/telecommunications-network-infrastructure-nigeria.webp",
    alt: "Nigerian network engineer patching fibre cables at an enterprise rack with NOC monitoring screens in the background",
  },
  "financial-services": {
    src: "/image/industries/financial-services-it-infrastructure-nigeria.webp",
    alt: "Nigerian female engineer inspecting server rack cabling in a secure financial institution server room",
  },
  "system-integrators": {
    src: "/image/industries/system-integrator-technical-deployment-nigeria.webp",
    alt: "Nigerian engineer installing network equipment into a server rack while collaborating remotely with a project team",
  },
  "managed-service-providers": {
    src: "/image/industries/managed-service-provider-onsite-support-nigeria.webp",
    alt: "Nigerian remote operations engineer on monitoring screens connected to a field engineer inspecting rack cabling in a data centre",
  },
  "oems-technology-vendors": {
    src: "/image/industries/oem-equipment-deployment-nigeria.webp",
    alt: "Nigerian engineer installing enterprise server hardware in a customer rack with deployment documentation and equipment packaging visible",
  },
  "technology-companies": {
    src: "/image/industries/technology-company-it-infrastructure-nigeria.webp",
    alt: "Nigerian engineer connecting network cables at a server rack adjacent to an open-plan technology operations workspace",
  },
  "enterprise-it": {
    src: "/image/industries/enterprise-it-infrastructure-support-nigeria.webp",
    alt: "Nigerian IT manager and engineer reviewing active rack infrastructure together in a corporate data room",
  },
  healthcare: {
    src: "/image/industries/healthcare-it-infrastructure-nigeria.webp",
    alt: "Nigerian IT engineer testing cable connections at a hospital network rack with clinical corridor visible in the background",
  },
  government: {
    src: "/image/industries/government-it-infrastructure-nigeria.webp",
    alt: "Two Nigerian technical professionals working on server rack equipment in a secure government IT room with CCTV and access control",
  },
  manufacturing: {
    src: "/image/industries/manufacturing-it-infrastructure-nigeria.webp",
    alt: "Nigerian engineer working on network cabinet cabling inside a manufacturing facility with production floor visible through glass",
  },
  "warehousing-logistics": {
    src: "/image/industries/warehouse-logistics-it-infrastructure-nigeria.webp",
    alt: "Nigerian technician patching network cables at a wall-mounted communications cabinet in an active warehouse",
  },
  "corporate-offices": {
    src: "/image/industries/corporate-office-it-infrastructure-nigeria.webp",
    alt: "Nigerian engineer testing structured cabling at a server rack in a corporate communications room with open-plan office visible behind glass",
  },
  education: {
    src: "/image/service-details/computer-setup-os-software.webp",
    alt: "Computer workstations and network equipment prepared for an IT learning environment",
  },
  retail: {
    src: "/image/service-details/network-config-small-business.webp",
    alt: "Back-office workstation, printer and network equipment supporting business operations",
  },
  hospitality: {
    src: "/image/service-details/ip-pbx-deployment.webp",
    alt: "Business telephones and rack-mounted network infrastructure for property communications",
  },
  "real-estate-property-management": {
    src: "/image/service-details/automated-gates-boom-barrier.webp",
    alt: "Automated vehicle access barrier at a managed commercial property",
  },
  "multi-site-businesses": {
    src: "/image/service-details/network-design-diagrams.webp",
    alt: "Technical team reviewing network diagrams and infrastructure plans",
  },
  "religious-organizations": {
    src: "/image/service-details/av-event-production.webp",
    alt: "Auditorium with audiovisual control equipment, stage lighting and display infrastructure",
  },
};

const fallbackHeroImage = {
  src: "/image/IT%20Infrastructure.png",
  alt: "Ideal Solutions engineer working with IT infrastructure in Nigeria",
};

const serviceTargets = {
  deployment: "/services/data-centre-deployment",
  smartHands: "/services/smart-hands-technical-support",
  network: "/services/network-infrastructure-connectivity",
  hardware: "/services/server-storage-hardware",
  security: "/services/data-centre-security-safety",
  assessment: "/services/infrastructure-audit-optimisation",
  lifecycle: "/services/data-centre-project-lifecycle-management",
} as const;

function solution(
  title: string,
  description: string,
  href: string,
): IndustrySolution {
  return { title, description, href, linkLabel: `Explore ${title}` };
}

function challenge(
  id: string,
  label: string,
  title: string,
  description: string,
  ctaLabel: string,
): IndustryChallengeTab {
  return {
    id,
    label,
    title,
    description,
    points: [
      {
        title: "Structured Infrastructure",
        description: "Keep physical systems easier to understand and maintain.",
      },
      {
        title: "Controlled Technical Spaces",
        description:
          "Improve visibility and access around important infrastructure.",
      },
      {
        title: "Onsite Technical Support",
        description:
          "Add local execution when infrastructure needs physical attention.",
      },
    ],
    ctaLabel,
    ctaHref: "/contact",
    visual:
      "Technical infrastructure being inspected and supported in an operating environment.",
  };
}

function reasons(titles: string[]): IndustryReason[] {
  return titles.map((title) => ({
    title,
    description:
      "Connect practical deployment, infrastructure and support requirements around the way the environment operates.",
  }));
}

type Seed = {
  slug: string;
  title: string;
  group: IndustryGroup;
  icon: IndustryIconName;
  heroTitle: string;
  heroDescription: string;
  shortDescription: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  challengesTitle: string;
  challengeTabs: IndustryChallengeTab[];
  whyTitle: string;
  whyReasons: IndustryReason[];
  solutionsTitle: string;
  solutionsDescription: string;
  solutions: IndustrySolution[];
  formTitle: string;
  formDescription: string;
  formCta: string;
};

function buildIndustry(seed: Seed): IndustryProfile {
  return {
    ...seed,
    href: `/industries/${seed.slug}`,
    navLabel: seed.title,
    heroImage: industryHeroImages[seed.slug] ?? fallbackHeroImage,
    longTailKeywords: [],
    primaryServiceSlugs: [],
    challengePoints: seed.challengeTabs.map((item) => item.description),
    environmentExamples: [],
    challengesDescription: seed.challengeTabs[0]?.description ?? "",
    whyDescription: seed.whyReasons[0]?.description ?? "",
    ctaLabel: seed.formCta,
  };
}

const sharedSolutions = {
  deployment: solution(
    "Data Centre Deployment & Infrastructure Services",
    "Rack-and-stack, equipment installation, server deployment, verification and controlled infrastructure changes.",
    serviceTargets.deployment,
  ),
  smartHands: solution(
    "Smart Hands & Technical Support",
    "Onsite technical intervention and remote-team support when infrastructure needs physical attention.",
    serviceTargets.smartHands,
  ),
  network: solution(
    "Network Infrastructure & Connectivity",
    "Structured cabling, network equipment installation, configuration and connectivity organisation.",
    serviceTargets.network,
  ),
  hardware: solution(
    "Server, Storage & Hardware Lifecycle Services",
    "Source, deploy and support enterprise servers, storage and infrastructure hardware.",
    serviceTargets.hardware,
  ),
  security: solution(
    "Data Centre Security & Safety Systems",
    "Access control, surveillance, firewall and protected-environment infrastructure.",
    serviceTargets.security,
  ),
  assessment: solution(
    "Infrastructure Assessment & Optimisation",
    "Assess racks, cabling and infrastructure conditions before remediation or expansion.",
    serviceTargets.assessment,
  ),
  lifecycle: solution(
    "Data Centre Project & Lifecycle Management",
    "Coordinate infrastructure projects, documentation, handover and ongoing technical continuity.",
    serviceTargets.lifecycle,
  ),
};

const exact: Seed[] = [
  {
    slug: "data-centres",
    title: "Data Centres",
    group: "critical-infrastructure-technology",
    icon: "data-centre",
    heroTitle: "Infrastructure Support for Data Centre Operations",
    heroDescription:
      "Deploy, maintain and improve critical data centre infrastructure with local technical execution built around live operational environments.",
    shortDescription:
      "Infrastructure deployment, Smart Hands, networking and lifecycle support for live data centre environments.",
    seoTitle: "Data Centre Infrastructure Services Nigeria | Ideal Solutions",
    metaDescription:
      "Ideal Solutions supports data centre operators in Nigeria with deployment, Smart Hands, network infrastructure, hardware support, audits and lifecycle technical services.",
    primaryKeyword: "Data Centre Infrastructure Services Nigeria",
    challengesTitle:
      "Keep Infrastructure Work Moving Without Compromising Operations.",
    challengeTabs: [
      challenge(
        "live",
        "Execute in Live Environments",
        "Carry Out Infrastructure Work Around Systems That Cannot Simply Stop.",
        "Data centre teams regularly need to install equipment, replace devices, change connectivity and expand capacity inside active environments. Ideal Solutions provides onsite execution around approved procedures and existing infrastructure.",
        "Discuss Onsite Data Centre Support",
      ),
      challenge(
        "visibility",
        "Maintain Infrastructure Visibility",
        "Know What Is Installed, Connected and Changing.",
        "Structured installation, labelling, documentation, assessment and remediation help technical teams understand the physical environment after changes.",
        "Improve Infrastructure Visibility",
      ),
      challenge(
        "lifecycle",
        "Support the Infrastructure Lifecycle",
        "Keep Technical Capability Available Beyond Individual Projects.",
        "Smart Hands, technical support, audits, changes and maintenance keep infrastructure supportable after deployment.",
        "Explore Lifecycle Support",
      ),
    ],
    whyTitle: "Technical Execution Built Around Data Centre Operations.",
    whyReasons: reasons([
      "Onsite Expertise Where the Work Happens",
      "Built Around Live Infrastructure",
      "Connected Capabilities",
      "Local Technical Capacity",
    ]),
    solutionsTitle:
      "Technical Capabilities Across the Infrastructure Lifecycle.",
    solutionsDescription:
      "Infrastructure services for live data centre environments.",
    solutions: [
      sharedSolutions.deployment,
      sharedSolutions.smartHands,
      sharedSolutions.assessment,
    ],
    formTitle: "Plan Your Next Infrastructure Requirement",
    formDescription:
      "Share the project, issue or infrastructure requirement. Ideal Solutions will review the technical need and help determine the appropriate next step.",
    formCta: "Discuss Your Requirements",
  },
  {
    slug: "telecommunications-isps",
    title: "Telecommunications & ISPs",
    group: "critical-infrastructure-technology",
    icon: "telecommunications",
    heroTitle: "Infrastructure for Telecommunications & ISPs",
    heroDescription:
      "Build and support the network, data centre and physical infrastructure behind connectivity services with skilled local technical execution.",
    shortDescription:
      "Network, data centre and physical infrastructure support for connectivity providers.",
    seoTitle: "Telecom & ISP Infrastructure Services Nigeria | Ideal Solutions",
    metaDescription:
      "Ideal Solutions supports telecommunications companies and ISPs with network infrastructure, data centre deployment, cabling, hardware and onsite technical support in Nigeria.",
    primaryKeyword: "Telecommunications Infrastructure Services Nigeria",
    challengesTitle:
      "Keep Connectivity Infrastructure Ready for Constant Demand.",
    challengeTabs: [
      challenge(
        "capacity",
        "Expand Network Capacity",
        "Add Infrastructure Without Adding Unnecessary Complexity.",
        "Growth may require switches, routers, servers, fibre connectivity or rack capacity. Ideal Solutions supports physical deployment around what already exists.",
        "Discuss Network Expansion",
      ),
      challenge(
        "traceable",
        "Keep Connectivity Traceable",
        "Make Physical Network Infrastructure Easier to Support.",
        "Structured cable paths, port identification and network records reduce troubleshooting effort as environments grow.",
        "Improve Network Visibility",
      ),
      challenge(
        "reach",
        "Extend Technical Reach",
        "Put Skilled Hands at the Equipment When Remote Teams Need Support.",
        "Ideal Solutions provides local support for approved rack-level tasks and infrastructure intervention.",
        "Request Onsite Technical Support",
      ),
    ],
    whyTitle: "Technical Support for the Infrastructure Behind Connectivity.",
    whyReasons: reasons([
      "Network-Focused Technical Execution",
      "Local Hands for Remote Specialists",
      "Structured Infrastructure Growth",
      "Support Across Project Stages",
    ]),
    solutionsTitle: "Infrastructure Services Built Around Connectivity.",
    solutionsDescription:
      "Network, support and hardware services for telecom environments.",
    solutions: [
      sharedSolutions.network,
      sharedSolutions.smartHands,
      sharedSolutions.hardware,
    ],
    formTitle: "Strengthen the Infrastructure Behind Your Network",
    formDescription:
      "Share the network, deployment or onsite technical requirement and we’ll help identify the right execution path.",
    formCta: "Discuss Your Infrastructure",
  },
];

type GenericConfig = [
  string,
  string,
  IndustryIconName,
  IndustryGroup,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  IndustrySolution[],
];

const genericConfigs: GenericConfig[] = [
  [
    "financial-services",
    "Financial Services",
    "finance",
    "enterprise-public-sector",
    "Infrastructure for Financial Services",
    "Support banking and financial operations with secure, organised and dependable data centre, network and physical IT infrastructure.",
    "IT & Data Centre Infrastructure for Financial Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports banks, fintechs and financial institutions with data centre infrastructure, network security, server hardware and onsite technical services in Nigeria.",
    "Financial Services IT Infrastructure Nigeria",
    "Infrastructure Built Around the Demands of Financial Operations.",
    "Infrastructure Support Built Around Financial Operations.",
    "Strengthen Your Financial Infrastructure",
    [
      sharedSolutions.security,
      sharedSolutions.network,
      sharedSolutions.hardware,
    ],
  ],
  [
    "system-integrators",
    "System Integrators",
    "integrator",
    "critical-infrastructure-technology",
    "Local Technical Execution for System Integrators",
    "Extend your delivery capability in Nigeria with onsite technical support for infrastructure deployment, networking, hardware and project execution.",
    "Local Technical Support for System Integrators Nigeria | Ideal Solutions",
    "Ideal Solutions helps system integrators deliver infrastructure projects in Nigeria with local deployment, Smart Hands, network, hardware and onsite technical support.",
    "Technical Support for System Integrators Nigeria",
    "Extend Project Delivery Without Building Every Capability In-House.",
    "Extend Your Capability Without Diluting Your Customer Relationship.",
    "Extend Your Technical Delivery in Nigeria",
    [
      sharedSolutions.deployment,
      sharedSolutions.smartHands,
      sharedSolutions.lifecycle,
    ],
  ],
  [
    "managed-service-providers",
    "Managed Service Providers",
    "msp",
    "critical-infrastructure-technology",
    "Local Technical Support for Managed Service Providers",
    "Extend your managed services into physical infrastructure environments with onsite technical support, Smart Hands and local execution in Nigeria.",
    "Local Technical Support for Managed Service Providers Nigeria | Ideal Solutions",
    "Ideal Solutions helps managed service providers support customer infrastructure in Nigeria with Smart Hands, onsite troubleshooting, deployment and lifecycle technical services.",
    "Technical Support for Managed Service Providers Nigeria",
    "Remote Management Still Needs Someone at the Infrastructure.",
    "Add Physical Execution Behind Your Remote Service Model.",
    "Extend Your Managed Services with Local Technical Execution",
    [
      sharedSolutions.smartHands,
      sharedSolutions.deployment,
      sharedSolutions.lifecycle,
    ],
  ],
  [
    "oems-technology-vendors",
    "OEMs & Equipment Vendors",
    "oem",
    "critical-infrastructure-technology",
    "Local Technical Execution for OEMs & Equipment Vendors",
    "Support equipment deployments, customer installations and field requirements in Nigeria without building a permanent technical team around every project.",
    "Local Field Support for OEMs & Technology Vendors Nigeria | Ideal Solutions",
    "Ideal Solutions supports OEMs and technology vendors in Nigeria with local installation, Smart Hands, equipment deployment, verification and technical field services.",
    "Local Technical Support for OEMs Nigeria",
    "Get Equipment from Delivery to Customer Readiness.",
    "Extend Your Customer Delivery Without Building Another Field Organisation.",
    "Extend Your Field Capability in Nigeria",
    [
      sharedSolutions.deployment,
      sharedSolutions.smartHands,
      sharedSolutions.hardware,
    ],
  ],
  [
    "technology-companies",
    "Technology Companies",
    "technology",
    "critical-infrastructure-technology",
    "Infrastructure That Keeps Technology Businesses Moving",
    "Build and support the servers, networks, data centre infrastructure and onsite technical capability behind digital products and growing technology operations.",
    "IT Infrastructure Services for Technology Companies Nigeria | Ideal Solutions",
    "Ideal Solutions supports technology companies with data centre deployment, network infrastructure, servers, Smart Hands and onsite technical services in Nigeria.",
    "IT Infrastructure for Technology Companies Nigeria",
    "Scale the Technology Without Letting Infrastructure Become the Bottleneck.",
    "Technical Infrastructure Support Without Slowing Product Teams Down.",
    "Build the Infrastructure Behind Your Next Stage of Growth",
    [
      sharedSolutions.hardware,
      sharedSolutions.network,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "enterprise-it",
    "Enterprise IT Teams",
    "technology",
    "enterprise-public-sector",
    "Technical Infrastructure Support for Enterprise IT Teams",
    "Extend your internal IT capability with onsite execution across data centre deployment, networking, servers, infrastructure support and lifecycle change.",
    "Enterprise IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports enterprise IT teams with data centre deployment, servers, networking, Smart Hands, audits and infrastructure lifecycle services in Nigeria.",
    "Enterprise IT Infrastructure Services Nigeria",
    "Keep Infrastructure Work Moving Without Pulling Your Core Team Everywhere.",
    "Add Execution Capacity While Your Team Keeps Technical Control.",
    "Give Your IT Team More Capacity for the Work That Has to Happen Onsite",
    [
      sharedSolutions.deployment,
      sharedSolutions.network,
      sharedSolutions.assessment,
    ],
  ],
  [
    "healthcare",
    "Healthcare",
    "healthcare",
    "enterprise-public-sector",
    "Infrastructure That Supports Connected Healthcare Operations",
    "Build and maintain the network, server, security and technical infrastructure behind healthcare environments that depend on reliable access to systems and information.",
    "Healthcare IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports hospitals, clinics and healthcare organisations with secure network infrastructure, servers, access control and onsite technical support in Nigeria.",
    "Healthcare IT Infrastructure Nigeria",
    "Keep Clinical and Operational Systems Connected to the Infrastructure Behind Them.",
    "Technical Infrastructure Support Built Around Operational Environments.",
    "Strengthen the Infrastructure Behind Healthcare Operations",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "government",
    "Government",
    "government",
    "enterprise-public-sector",
    "Infrastructure Support for Government & Public-Sector Operations",
    "Build, secure and support the technical infrastructure behind public-sector systems with structured onsite execution and clearer operational visibility.",
    "Government IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports government and public-sector organisations with secure networks, data centre infrastructure, access control, audits and technical support in Nigeria.",
    "Government IT Infrastructure Nigeria",
    "Keep Public-Sector Infrastructure Secure, Structured and Supportable.",
    "Structured Technical Execution for Complex Public-Sector Environments.",
    "Plan Your Next Public-Sector Infrastructure Requirement",
    [
      sharedSolutions.assessment,
      sharedSolutions.security,
      sharedSolutions.lifecycle,
    ],
  ],
  [
    "manufacturing",
    "Manufacturing",
    "manufacturing",
    "commercial-operational",
    "Infrastructure That Keeps Manufacturing Operations Connected",
    "Build and support the networks, servers, security systems and technical infrastructure behind modern production environments.",
    "Manufacturing IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports manufacturers with industrial network infrastructure, servers, structured cabling, surveillance and onsite technical support in Nigeria.",
    "Manufacturing IT Infrastructure Nigeria",
    "Keep Infrastructure Ready for Production Environments That Cannot Afford Disorder.",
    "Technical Infrastructure Support Built Around Operational Sites.",
    "Build Infrastructure Around the Way Your Facility Operates",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "warehousing-logistics",
    "Warehousing & Logistics",
    "warehouse",
    "commercial-operational",
    "Infrastructure for Connected Warehousing & Logistics Operations",
    "Support warehouses, distribution centres and logistics facilities with structured connectivity, site security and technical infrastructure built around daily operations.",
    "Warehousing & Logistics IT Infrastructure Nigeria | Ideal Solutions",
    "Ideal Solutions supports warehouses and logistics facilities with network infrastructure, CCTV, access control, gate automation and onsite IT support in Nigeria.",
    "Warehousing and Logistics IT Infrastructure Nigeria",
    "Keep Sites Connected, Visible and Easier to Control.",
    "Infrastructure Support Built Around Active Operational Sites.",
    "Build a More Connected and Visible Logistics Environment",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "corporate-offices",
    "Corporate Offices",
    "corporate",
    "enterprise-public-sector",
    "IT Infrastructure for Modern Corporate Offices",
    "Build and support the network, security and technical infrastructure that keeps employees, systems and office operations connected.",
    "Corporate Office IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports corporate offices with network infrastructure, access control, CCTV, server systems and onsite technical support across Nigeria.",
    "Corporate Office IT Infrastructure Nigeria",
    "Keep Office Technology Reliable Behind the Scenes.",
    "Technical Infrastructure Support That Stays Out of the Way of Business.",
    "Build Office Infrastructure That Can Grow with the Business",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "education",
    "Education",
    "education",
    "enterprise-public-sector",
    "IT Infrastructure for Schools, Universities & Learning Environments",
    "Build connected, secure and supportable technology infrastructure across classrooms, offices, campuses and technical environments.",
    "Education IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports schools, universities and education institutions with networks, cabling, server infrastructure, security systems and onsite IT support in Nigeria.",
    "Education IT Infrastructure Nigeria",
    "Support Learning with Infrastructure That Works Across the Campus.",
    "Technical Infrastructure Support Across Complex Learning Environments.",
    "Build Infrastructure Around the Way Your Institution Operates",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.hardware,
    ],
  ],
  [
    "retail",
    "Retail",
    "retail",
    "commercial-operational",
    "IT Infrastructure for Retail & Branch Operations",
    "Support stores, showrooms and branch locations with structured networks, security systems and technical infrastructure that can be repeated across multiple sites.",
    "Retail IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports retailers with network infrastructure, CCTV, access control, server hardware and multi-site technical support across Nigeria.",
    "Retail IT Infrastructure Nigeria",
    "Keep Every Location Connected, Visible and Easier to Support.",
    "Technical Infrastructure Support Built for Repeatable Multi-Site Operations.",
    "Build a More Consistent Infrastructure Standard Across Your Locations",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "hospitality",
    "Hospitality",
    "hospitality",
    "commercial-operational",
    "IT Infrastructure for Hotels & Hospitality Operations",
    "Build and support the connectivity, security and technical infrastructure behind guest services, staff operations and property systems.",
    "Hospitality IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions supports hotels and hospitality businesses with network infrastructure, CCTV, access control, server systems and onsite technical support in Nigeria.",
    "Hospitality IT Infrastructure Nigeria",
    "Keep Guest-Facing Services Connected to Reliable Infrastructure Behind the Scenes.",
    "Technical Infrastructure Support That Works Behind the Guest Experience.",
    "Build Infrastructure Around the Way Your Property Operates",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "real-estate-property-management",
    "Real Estate & Property Management",
    "property",
    "commercial-operational",
    "IT Infrastructure for Properties, Estates & Managed Facilities",
    "Support residential estates, commercial properties and mixed-use environments with connected, secure and maintainable technical infrastructure.",
    "Real Estate & Property IT Infrastructure Nigeria | Ideal Solutions",
    "Ideal Solutions supports estates, commercial properties and managed facilities with network infrastructure, CCTV, access control, automated entry and technical support in Nigeria.",
    "Property Management IT Infrastructure Nigeria",
    "Keep Properties Connected, Secure and Easier to Manage.",
    "Technical Infrastructure Support Across the Property Lifecycle.",
    "Build More Connected and Secure Property Infrastructure",
    [
      sharedSolutions.security,
      sharedSolutions.network,
      sharedSolutions.smartHands,
    ],
  ],
  [
    "multi-site-businesses",
    "Multi-site Businesses",
    "multisite",
    "commercial-operational",
    "IT Infrastructure for Multi-Site Businesses",
    "Standardise connectivity, security and technical support across branches, offices and distributed locations without treating every site as a separate project.",
    "Multi-Site IT Infrastructure Services Nigeria | Ideal Solutions",
    "Ideal Solutions helps multi-site businesses standardise network infrastructure, security systems, hardware and onsite technical support across multiple locations in Nigeria.",
    "Multi-Site IT Infrastructure Nigeria",
    "Keep Multiple Locations Working to One Infrastructure Standard.",
    "One Technical Approach Across Multiple Locations.",
    "Build a More Consistent Infrastructure Standard Across Your Locations",
    [
      sharedSolutions.network,
      sharedSolutions.smartHands,
      sharedSolutions.lifecycle,
    ],
  ],
  [
    "religious-organizations",
    "Religious Organisations",
    "religious",
    "commercial-operational",
    "IT Infrastructure for Churches & Religious Organisations",
    "Build and support the network, security and technical infrastructure behind worship venues, administrative offices and growing organisational operations.",
    "IT Infrastructure for Religious Organisations Nigeria | Ideal Solutions",
    "Ideal Solutions supports churches, worship centres and religious organisations with networks, CCTV, access control, server infrastructure and technical support in Nigeria.",
    "Church IT Infrastructure Nigeria",
    "Keep Growing Facilities Connected, Secure and Supportable.",
    "Technical Infrastructure Support for Growing Facilities.",
    "Build Infrastructure Around the Way Your Organisation Operates",
    [
      sharedSolutions.network,
      sharedSolutions.security,
      sharedSolutions.smartHands,
    ],
  ],
];

const generic = genericConfigs.map(
  ([
    slug,
    title,
    icon,
    group,
    heroTitle,
    heroDescription,
    seoTitle,
    metaDescription,
    primaryKeyword,
    challengesTitle,
    whyTitle,
    formTitle,
    solutions,
  ]) =>
    buildIndustry({
      slug,
      title,
      group,
      icon,
      heroTitle,
      heroDescription,
      shortDescription: metaDescription,
      seoTitle,
      metaDescription,
      primaryKeyword,
      challengesTitle,
      challengeTabs: [
        challenge(
          "connect",
          "Connect the Environment",
          "Build Infrastructure Around Daily Operations.",
          "Physical infrastructure must connect the places where people, systems and daily operations depend on technology.",
          "Improve Infrastructure Connectivity",
        ),
        challenge(
          "secure",
          "Improve Security & Visibility",
          "Protect Critical Technical Spaces.",
          "Access, surveillance and network-security infrastructure should be considered around the operating environment.",
          "Strengthen Infrastructure Security",
        ),
        challenge(
          "support",
          "Maintain Technical Support Capacity",
          "Keep Skilled Onsite Support Available When Infrastructure Needs Attention.",
          "Ideal Solutions provides additional onsite technical capacity for physical infrastructure work, changes and maintenance.",
          "Discuss Ongoing Technical Support",
        ),
      ],
      whyTitle,
      whyReasons: reasons([
        "Support the Physical Infrastructure",
        "Add Capacity Without Overloading Internal Teams",
        "Improve Infrastructure Visibility",
        "Connect Security with Infrastructure",
      ]),
      solutionsTitle:
        "Infrastructure Services for Modern Operating Environments.",
      solutionsDescription:
        "Relevant technical capabilities across the infrastructure lifecycle.",
      solutions,
      formTitle,
      formDescription:
        "Share the site, project or technical requirement and Ideal Solutions can help define the appropriate next step.",
      formCta: "Discuss Your Requirements",
    }),
);

export const industryProfiles: IndustryProfile[] = [
  ...exact.map(buildIndustry),
  ...generic,
];
export const industryGroupOptions = (
  Object.keys(groups) as IndustryGroup[]
).map((id) => ({ id, label: groups[id] }));
