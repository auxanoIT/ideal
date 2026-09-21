import { operationalAdvantageSection } from "@/data/operational-advantage";
import { homeProjectCta } from "@/data/home-project-cta";
import type {
  BlogPost,
  CaseStudy,
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
  email: "ask@auxanosolutions.net",
  address:
    "26A Adeshina Street, Off Oluwole Phillips, Obafemi Awolowo Way, Ikeja",
  city: "Lagos",
  country: "Nigeria",
  whatsappSales: process.env.NEXT_PUBLIC_SALES_WHATSAPP ?? "+2348062218546",
  whatsappSupport: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ?? "+2348062218546",
  hubspotMeetingUrl:
    process.env.HUBSPOT_MEETINGS_URL ??
    "https://meetings.hubspot.com/auxano-solutions",
};

export const navigation: NavItem[] = [
  { label: "Solutions", href: "/services", kind: "solutions" },
  { label: "Industries", href: "/industries", kind: "industries" },
  { label: "Case Studies", href: "/case-studies", kind: "link" },
  { label: "Resources", href: "/resources", kind: "resources" },
  { label: "About", href: "/about", kind: "link" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "cihp-headquarters-elv-infrastructure-abuja",
    title: "Standards-Compliant ELV Infrastructure for CIHP Headquarters",
    client: "Centre for Integrated Health Programs (CIHP)",
    industry: "Healthcare and Development Programs",
    location: "Abuja, Nigeria",
    summary:
      "Auxano delivered a complete Extra-Low Voltage infrastructure foundation covering structured LAN cabling, CCTV cabling, fiber backbone components, cable management, underground pathways, and FM200-ready fire suppression pipework.",
    challenge:
      "CIHP needed a durable, standards-compliant ELV backbone for its headquarters that could support current ICT operations, surveillance expansion, fiber connectivity, and future life-safety systems without creating fragmented installation risk.",
    solution: [
      "Supplied, delivered, installed, and commissioned structured LAN and CCTV cabling infrastructure across the facility.",
      "Implemented fiber backbone components for high-speed connectivity and long-term network scalability.",
      "Installed cable trays, baskets, management systems, and civil-work pathways for cleaner routing and maintainability.",
      "Prepared FM200 fire suppression pipework so the safety layer could integrate with the wider infrastructure plan.",
      "Completed labeling, installation labor, logistics, commissioning, and handover under a professional delivery model.",
    ],
    result:
      "CIHP received a structured and labeled ELV foundation that supports LAN, CCTV, fiber backbone, and FM200 readiness with better durability, operational efficiency, and maintainability for future ICT and safety upgrades.",
    metrics: [
      { value: "3 months", label: "March to May 2026 rollout" },
      { value: "4 systems", label: "LAN, CCTV, fiber, FM200 readiness" },
      { value: "1 year", label: "Professional warranty coverage" },
    ],
    relatedServices: [
      "network-cabling",
      "structured-lan-cabling",
      "surveillance-system-cctv",
      "data-centre-services",
      "fire-alarm-safety-systems",
    ],
    image: {
      src: "/image/case-studies/cihp-headquarters-elv-infrastructure-abuja-photo.webp",
      alt: "Structured network rack cabling for CIHP headquarters ELV infrastructure",
    },
  },
  {
    slug: "fringe-pci-dss-infrastructure-upgrade",
    title: "PCI DSS-Aligned ICT Infrastructure Upgrade for Fringe",
    client: "Fringe",
    industry: "Financial Services and Regulated Operations",
    location: "Nigeria",
    summary:
      "Auxano consolidated server virtualization, network redesign, firewall deployment, wireless expansion, endpoint upgrades, access control, surveillance enhancement, cloud backup, and IT support into one compliance-focused infrastructure program.",
    challenge:
      "Fringe needed to strengthen cybersecurity, improve network performance, modernize critical infrastructure, and align its operating environment with PCI DSS security expectations without treating each upgrade as a disconnected workstream.",
    solution: [
      "Redesigned the network environment around stronger segmentation, improved performance, and better operational visibility.",
      "Deployed firewall and security controls to support PCI DSS-aligned infrastructure hardening.",
      "Upgraded server virtualization, wireless coverage, endpoint devices, access control, and surveillance systems as one coordinated program.",
      "Added cloud-based data protection, improved email services, and structured IT support to stabilize operations through the transition.",
    ],
    result:
      "The project established a more secure, scalable, and standards-aligned technology foundation with stronger network performance, improved resilience, centralized security controls, and clearer compliance readiness.",
    metrics: [
      { value: "8", label: "Upgrade workstreams unified" },
      { value: "PCI DSS", label: "Security alignment objective" },
      { value: "2025-2026", label: "Program delivery window" },
    ],
    relatedServices: [
      "network-architecture-planning",
      "network-configurations",
      "firewall-sales-licenses",
      "cloud-services-licenses",
      "server-storage-provisioning-deployment",
      "it-managed-services-staff-outsourcing",
    ],
    image: {
      src: "/image/case-studies/fringe-pci-dss-infrastructure-upgrade-photo.webp",
      alt: "Compliance and security infrastructure environment for Fringe PCI DSS upgrade",
    },
  },
  {
    slug: "wiocc-34-floor-it-elv-deployment",
    title: "Two-Floor Enterprise IT and ELV Deployment for WIOCC",
    client: "WIOCC",
    industry: "Telecommunications",
    location: "Victoria Island, Lagos",
    summary:
      "Auxano delivered a full IT and ELV infrastructure deployment for WIOCC's 3rd and 4th floor expansion, integrating enterprise networking, fiber uplinks, wireless access, biometric access control, surveillance, grounding, rack organization, testing, and documentation.",
    challenge:
      "WIOCC needed a high-performance, secure, and scalable technology environment for mission-critical operations across two new office floors while maintaining clean integration with existing infrastructure.",
    solution: [
      "Installed structured LAN cabling, fiber uplinks, managed switches, wireless access points, rack power distribution, and full patching and labeling.",
      "Deployed multi-door biometric access control and surveillance systems to strengthen security across the expanded floors.",
      "Completed 4th-floor uplink cabling, civil works, rack organization, dedicated earthing and grounding, system testing, and documentation.",
      "Integrated the new environment with WIOCC's existing infrastructure to preserve operational continuity and future scalability.",
    ],
    result:
      "WIOCC gained a secure, scalable, and high-performance technology foundation across the 3rd and 4th floors, ready to support high-availability operations and long-term expansion.",
    metrics: [
      { value: "2 floors", label: "3rd and 4th floor expansion" },
      { value: "5 months", label: "July to November 2025 rollout" },
      { value: "6 layers", label: "Network, fiber, wireless, access, CCTV, grounding" },
    ],
    relatedServices: [
      "network-cabling",
      "network-design-with-diagram",
      "door-access-control",
      "surveillance-system-cctv",
      "data-centre-services",
    ],
    image: {
      src: "/image/case-studies/wiocc-34-floor-it-elv-deployment-photo.webp",
      alt: "Two-floor WIOCC IT and ELV deployment with network rack access control CCTV and safety systems",
    },
  },
  {
    slug: "cihp-stem-hub-relocation-ikeja",
    title: "Seamless IT Infrastructure Relocation for CIHP STEM Hub",
    client: "Centre for Integrated Health Programs (CIHP)",
    industry: "Education, Innovation, and Development Programs",
    location: "Ikeja, Lagos",
    summary:
      "Auxano relocated, reinstalled, upgraded, tested, labeled, and certified the CIHP STEM Hub infrastructure, including server rack systems, switching, wireless access points, IP telephony, UPS units, Synology storage, access control, CCTV, FM200, conference displays, and new cabling.",
    challenge:
      "CIHP needed to move the STEM Hub to a new Ikeja location without compromising performance, security, safety, or operational readiness for ongoing digital and STEM programs.",
    solution: [
      "Dismantled existing ICT, security, and safety systems, transported equipment, and reinstalled the environment at the new facility.",
      "Relocated server racks, switches, wireless access points, IP telephones, UPS units, Synology storage, temperature sensors, FM200, access control, CCTV, and conference displays.",
      "Supplied and installed new LAN and CCTV cabling, fiber interconnects, patch panels, access points, cable management systems, raised flooring, earthing infrastructure, and supporting civil works.",
      "Tested, labeled, and certified systems to confirm performance and operational readiness in the new location.",
    ],
    result:
      "The STEM Hub moved into a fully functional and modernized technology environment with continuity across networking, security, fire suppression, storage, collaboration, and support systems.",
    metrics: [
      { value: "2 months", label: "December 2024 to January 2025" },
      { value: "10+", label: "Systems relocated and recommissioned" },
      { value: "0 compromise", label: "Performance and readiness objective" },
    ],
    relatedServices: [
      "computer-installation-setup",
      "network-cabling",
      "office-telephone-system-ip-pbx",
      "surveillance-system-cctv",
      "door-access-control",
      "data-centre-services",
    ],
    image: {
      src: "/image/case-studies/cihp-stem-hub-relocation-ikeja-photo.webp",
      alt: "IT equipment relocation and data migration setup for CIHP STEM Hub",
    },
  },
  {
    slug: "wiocc-2nd-floor-elv-deployment",
    title: "Mission-Critical ELV Infrastructure for WIOCC 2nd Floor",
    client: "WIOCC",
    industry: "Telecommunications",
    location: "Victoria Island, Lagos",
    summary:
      "Auxano deployed a complete ELV environment for WIOCC's 2nd floor, covering surveillance, network and wireless infrastructure, biometric access control, addressable fire alarm, FM200 server room suppression, earthing, lightning protection, rack organization, patching, labeling, and documentation.",
    challenge:
      "WIOCC required a secure and high-performance ELV foundation for a mission-critical telecommunications office, with networking, physical security, fire protection, and electrical safety delivered as one maintainable infrastructure layer.",
    solution: [
      "Installed surveillance, network, wireless, and biometric access control systems using enterprise-grade equipment and structured cabling.",
      "Deployed an addressable fire alarm system and FM200 server room suppression capability for life-safety and equipment protection.",
      "Implemented earthing, lightning and thunder arrestor systems to protect infrastructure reliability.",
      "Completed rack organization, patching, labeling, civil works, commissioning, and documentation for long-term maintainability.",
    ],
    result:
      "WIOCC received an integrated ELV platform that strengthens operational efficiency, physical security, fire protection, electrical safety, and future scalability for a high-availability office environment.",
    metrics: [
      { value: "3 months", label: "September to November 2024 rollout" },
      { value: "6 systems", label: "Integrated ELV domains" },
      { value: "1 floor", label: "Mission-critical office environment" },
    ],
    relatedServices: [
      "surveillance-system-cctv",
      "network-cabling",
      "door-access-control",
      "fire-alarm-safety-systems",
      "data-centre-services",
    ],
    image: {
      src: "/image/case-studies/wiocc-2nd-floor-elv-deployment-photo.webp",
      alt: "Fire alarm and safety layer for WIOCC 2nd floor ELV deployment",
    },
  },
  {
    slug: "cihp-stem-hub-elv-installation-2024",
    title: "Integrated ELV Installation for CIHP STEM Hub",
    client: "Centre for Integrated Health Programs (CIHP)",
    industry: "Education, Innovation, and Development Programs",
    location: "Ikeja GRA, Lagos",
    summary:
      "Auxano delivered a complete ELV installation for CIHP STEM Hub, integrating structured LAN, IP telephony, CCTV surveillance, lightning protection, FM200 fire suppression, server room raised flooring, access control, rack power distribution, civil works, labeling, cable testing, and documentation.",
    challenge:
      "The STEM Hub needed a modern, secure, and high-performance technology environment to support digital learning, collaboration, daily operations, and future expansion.",
    solution: [
      "Installed a robust structured LAN network and IP telephone system for collaboration and day-to-day operations.",
      "Integrated CCTV surveillance, access control, lightning and thunder arrestor systems, and FM200 server room suppression.",
      "Built server room readiness with raised flooring, rack power distribution, cable testing, labeling, documentation, and supporting civil works.",
      "Configured, tested, and commissioned each ELV domain to support long-term reliability and maintainability.",
    ],
    result:
      "CIHP STEM Hub received a secure, scalable, and future-ready infrastructure platform that supports STEM education, digital development, safety, communication, and operational continuity.",
    metrics: [
      { value: "7 domains", label: "ELV systems delivered" },
      { value: "2024", label: "Completed installation year" },
      { value: "1 hub", label: "Unified technology foundation" },
    ],
    relatedServices: [
      "structured-lan-cabling",
      "office-telephone-system-ip-pbx",
      "surveillance-system-cctv",
      "door-access-control",
      "data-centre-services",
      "fire-alarm-safety-systems",
    ],
    image: {
      src: "/image/case-studies/cihp-stem-hub-elv-installation-2024-photo.webp",
      alt: "IP telephony and communication infrastructure for CIHP STEM Hub ELV installation",
    },
  },
  {
    slug: "cihp-stem-hub-it-infrastructure-2023",
    title: "Future-Ready IT Infrastructure Upgrade for CIHP STEM Hub",
    client: "Centre for Integrated Health Programs (CIHP)",
    industry: "Education, Innovation, and Development Programs",
    location: "Ikeja GRA, Lagos",
    summary:
      "Auxano delivered a full IT and ELV infrastructure upgrade for CIHP STEM Hub, covering structured LAN infrastructure, IP telephony, CCTV surveillance, lightning protection, FM200 fire suppression, server room raised flooring, and access control systems.",
    challenge:
      "CIHP needed to equip the STEM Hub with a stronger technology backbone capable of supporting advanced learning, digital innovation, safety systems, and efficient day-to-day operations.",
    solution: [
      "Designed and deployed seven major ELV domains from material supply through installation, configuration, testing, and commissioning.",
      "Implemented structured LAN, IP telephony, CCTV surveillance, access control, lightning protection, FM200, and server room raised flooring.",
      "Engineered each component for safety, reliability, maintainability, and scalability as the STEM Hub's digital needs grow.",
    ],
    result:
      "The facility now operates on a stronger digital infrastructure and safety platform designed to support education, innovation, secure access, surveillance, and efficient operations.",
    metrics: [
      { value: "7 domains", label: "Infrastructure and safety layers" },
      { value: "2023", label: "Project delivery period" },
      { value: "End-to-end", label: "Design to commissioning scope" },
    ],
    relatedServices: [
      "network-cabling",
      "office-telephone-system-ip-pbx",
      "surveillance-system-cctv",
      "door-access-control",
      "data-centre-services",
      "fire-alarm-safety-systems",
    ],
    image: {
      src: "/image/case-studies/cihp-stem-hub-it-infrastructure-2023-photo.webp",
      alt: "LAN certification testing for CIHP STEM Hub IT infrastructure upgrade",
    },
  },
  {
    slug: "seflam-sgl-engineering-office-elv",
    title: "Corporate ELV Infrastructure Deployment for SEFLAM SGL Engineering",
    client: "SEFLAM SGL Engineering Office",
    industry: "Engineering and Corporate Offices",
    location: "Victoria Island, Lagos",
    summary:
      "Auxano delivered a full ELV infrastructure upgrade for SEFLAM SGL Engineering Office, integrating structured LAN, IP telephony, CCTV surveillance, lightning protection, FM200 fire suppression, fire alarm, access control, server room raised flooring, and dedicated cooling.",
    challenge:
      "SEFLAM SGL needed a modern, secure, and high-performance office environment that could support engineering operations, collaboration, connectivity, fire protection, access control, and server room reliability.",
    solution: [
      "Installed structured LAN and IP telephony to strengthen office connectivity and communication.",
      "Deployed CCTV surveillance, access control, fire alarm, FM200 fire suppression, lightning protection, and server room systems.",
      "Added server room raised flooring and dedicated cooling to improve infrastructure resilience and equipment protection.",
      "Configured, tested, and commissioned each system to meet safety, reliability, and long-term performance expectations.",
    ],
    result:
      "SEFLAM SGL received a unified ELV ecosystem that improves connectivity, communication, security, fire protection, server room readiness, and operational efficiency across the engineering office.",
    metrics: [
      { value: "9 systems", label: "ELV and server room layers" },
      { value: "2025", label: "Victoria Island deployment" },
      { value: "1 office", label: "Unified corporate technology setup" },
    ],
    relatedServices: [
      "structured-lan-cabling",
      "office-telephone-system-ip-pbx",
      "surveillance-system-cctv",
      "door-access-control",
      "fire-alarm-safety-systems",
      "data-centre-services",
    ],
    image: {
      src: "/image/case-studies/seflam-sgl-engineering-office-elv-photo.webp",
      alt: "Server room cooling and ELV infrastructure for SEFLAM SGL Engineering office",
    },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "what-growing-businesses-miss-when-planning-cctv",
    title: "What Growing Businesses Miss When Planning CCTV Deployments",
    category: "Physical Security",
    publishedAt: "2026-03-10",
    readingTime: "6 min read",
    author: "Auxano Solutions Team",
    coverImage: {
      src: "/image/service-details/cctv-camera-coverage.webp",
      alt: "CCTV camera installed for commercial security coverage",
    },
    excerpt:
      "Coverage quality depends on network design, operator workflow, retention planning, and post-installation discipline.",
    takeaways: [
      "Coverage without a monitoring workflow creates expensive blind spots.",
      "Storage and retention should be sized before hardware is purchased.",
      "Your network topology shapes CCTV performance more than most teams expect.",
    ],
    body: [
      {
        _type: "blogHeading",
        text: "Plan coverage before counting cameras",
        anchor: "plan-coverage-before-counting-cameras",
      },
      {
        _type: "blogParagraph",
        text: "Most CCTV projects fail long before installation day. The failure starts when teams think in terms of camera count instead of operational coverage. Entrances, corridors, dispatch lanes, and sensitive areas all require different logic. When that logic is skipped, the final system looks busy but performs poorly during real incidents.",
      },
      {
        _type: "blogHeading",
        text: "Retention and retrieval shape the real value",
        anchor: "retention-and-retrieval",
      },
      {
        _type: "blogParagraph",
        text: "The second blind spot is retention and retrieval. Businesses often buy hardware first, then discover later that the footage archive is too short, too fragmented, or too hard to review quickly. A surveillance system is only useful when operators can trust what was recorded and retrieve it fast.",
      },
      {
        _type: "blogImageBlock",
        image: {
          src: "/image/service-details/cctv-storage-retention.webp",
          alt: "Network video recorder and storage planning for CCTV retention",
        },
        caption:
          "Storage planning should happen before installation, not after footage is already needed.",
      },
      {
        _type: "blogHeading",
        text: "CCTV performance depends on the network",
        anchor: "cctv-performance-depends-on-network",
      },
      {
        _type: "blogParagraph",
        text: "The third issue is networking. Cameras do not exist outside the network environment. Poor switching, weak uplinks, or unplanned wireless reliance can turn a security project into an ongoing reliability problem. CCTV planning should sit alongside network planning, not after it.",
      },
    ],
  },
  {
    slug: "how-to-budget-managed-it-support-in-nigeria",
    title: "How to Budget Managed IT Support Without Underbuying Reliability",
    category: "Managed Services",
    publishedAt: "2026-03-18",
    readingTime: "7 min read",
    author: "Auxano Solutions Team",
    coverImage: {
      src: "/image/service-details/managed-technical-help-desk.webp",
      alt: "Managed IT support desk for business users",
    },
    excerpt:
      "Support budgets fail when leadership only prices tickets and ignores visibility, onboarding, continuity, and user enablement.",
    takeaways: [
      "The cheapest support model often moves cost into downtime and escalation.",
      "Endpoint visibility and onboarding discipline matter as much as ticket response time.",
      "Managed support should be budgeted against business interruption, not only headcount.",
    ],
    body: [
      {
        _type: "blogHeading",
        text: "Do not price support like a call center",
        anchor: "do-not-price-support-like-call-center",
      },
      {
        _type: "blogParagraph",
        text: "A common budgeting mistake is treating IT support like a reactive call center. That model ignores the work required to keep devices healthy, users onboarded properly, and risk visible to leadership. Support quality is not only about response speed. It is also about how much operational friction is prevented before users feel it.",
      },
      {
        _type: "blogHeading",
        text: "Look for visibility and ownership",
        anchor: "look-for-visibility-and-ownership",
      },
      {
        _type: "blogParagraph",
        text: "Good managed support includes device standards, endpoint visibility, escalation ownership, and repeatable reporting. Without those pieces, your support bill may look smaller on paper while the business absorbs hidden cost through interruptions, shadow fixes, and poor accountability.",
      },
      {
        _type: "blogHeading",
        text: "Budget against interruption risk",
        anchor: "budget-against-interruption-risk",
      },
      {
        _type: "blogParagraph",
        text: "When planning budget, leadership should ask a more useful question: what level of interruption can the business tolerate? That answer usually determines whether support should stay basic, move to business-critical coverage, or include a stronger continuity posture.",
      },
    ],
  },
  {
    slug: "network-monitoring-for-multi-site-operations",
    title: "Why Network Monitoring Matters More Once You Have Multiple Sites",
    category: "Networking",
    publishedAt: "2026-03-24",
    readingTime: "5 min read",
    author: "Auxano Solutions Team",
    coverImage: {
      src: "/image/service-details/managed-services-monitoring.webp",
      alt: "Network monitoring dashboard for multi-site operations",
    },
    excerpt:
      "Once a business spreads across floors or sites, undocumented network issues become operational problems, not just technical ones.",
    takeaways: [
      "Visibility collapses quickly when branch networks grow without a shared model.",
      "Monitoring improves issue response because teams stop troubleshooting from guesswork.",
      "Documentation and alert tuning matter as much as the monitoring dashboard itself.",
    ],
    body: [
      {
        _type: "blogHeading",
        text: "Multi-site networks need shared visibility",
        anchor: "multi-site-networks-need-shared-visibility",
      },
      {
        _type: "blogParagraph",
        text: "Small networks can survive on memory and habit for a while. Multi-site environments cannot. The moment an organization adds floors, branches, or high-dependency endpoints like CCTV and access systems, network problems become harder to isolate and slower to resolve.",
      },
      {
        _type: "blogHeading",
        text: "Monitoring turns symptoms into evidence",
        anchor: "monitoring-turns-symptoms-into-evidence",
      },
      {
        _type: "blogParagraph",
        text: "Monitoring adds value because it turns symptoms into evidence. Instead of hearing that the internet is slow somewhere, teams can see device status, latency patterns, and repeated failure points. That changes both technical response and leadership confidence.",
      },
      {
        _type: "blogHeading",
        text: "Documentation keeps alerts useful",
        anchor: "documentation-keeps-alerts-useful",
      },
      {
        _type: "blogParagraph",
        text: "However, monitoring is not only a tool purchase. It works best when paired with network documentation, clear escalation paths, and realistic thresholds. Otherwise, the dashboard fills up while the team still struggles to act.",
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Auxano approached the environment like an operator, not just an installer. That changed the quality of the final result.",
    name: "Operations Lead",
    role: "Facilities and Operations",
    company: "Lagos Head Office Deployment",
  },
  {
    quote:
      "The difference was the clarity. We could see what was being fixed, why it mattered, and what would happen next.",
    name: "Admin Manager",
    role: "Administration",
    company: "Healthcare Network Refresh",
  },
  {
    quote:
      "Support readiness was part of the rollout, not an afterthought. That helped the site settle faster after launch.",
    name: "Site Director",
    role: "Operations",
    company: "Warehouse Expansion Program",
  },
];

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What types of businesses does Auxano work with?",
    answer:
      "Auxano works with businesses of all sizes — from small offices and startups to large enterprises, schools, healthcare providers, financial institutions, retail outlets, and industrial facilities. Whether you operate from one location or across multiple sites, we design and deliver IT solutions that fit your operational needs and business goals.",
  },
  {
    id: "faq-2",
    question:
      "Do you only sell IT equipment, or do you also handle installation?",
    answer:
      "We do both. Auxano supplies genuine IT hardware and software through authorised distributors, and our certified engineers handle the full installation, configuration, testing, and deployment process. That means you get a complete solution from one trusted partner instead of managing multiple vendors.",
  },
  {
    id: "faq-3",
    question:
      "Can you assess our current IT infrastructure before recommending upgrades?",
    answer:
      "Yes. Our IT assessment services are designed to evaluate your existing infrastructure, identify inefficiencies, security risks, performance gaps, and outdated systems. From there, we provide practical recommendations aligned with your business objectives and budget.",
  },
  {
    id: "faq-4",
    question: "Do you offer managed IT support after project delivery?",
    answer:
      "Absolutely. Our relationship doesn’t end after deployment. We provide ongoing managed IT support, including system monitoring, maintenance, troubleshooting, performance optimization, upgrades, and technical support to ensure your infrastructure continues to perform efficiently.",
  },
  {
    id: "faq-5",
    question:
      "Can Auxano help improve our network performance and reliability?",
    answer:
      "Yes. We design, install, configure, and monitor business networks to improve speed, security, and stability. This includes structured cabling, wireless networks, routing, switching, firewall setup, and network monitoring to reduce downtime and improve operational efficiency.",
  },
  {
    id: "faq-6",
    question: "Do you provide cybersecurity solutions?",
    answer:
      "Yes. Auxano offers cybersecurity solutions including firewall deployment, antivirus licensing, access control systems, governance, risk and compliance services, incident response planning, and security audits to strengthen your business against internal and external threats.",
  },
  {
    id: "faq-7",
    question: "How do you handle disaster recovery and business continuity?",
    answer:
      "We create customized backup and disaster recovery plans based on your business operations and risk exposure. Instead of relying on generic backup practices, we identify critical failure points and build recovery strategies that help restore systems quickly during disruptions.",
  },
  {
    id: "faq-8",
    question: "Do you provide IT audit and compliance services?",
    answer:
      "Yes. Our IT audit services evaluate your infrastructure controls, data security, system availability, access management, and disaster recovery readiness. We also help businesses align with industry best practices and regulatory requirements through governance, risk, and compliance services.",
  },
  {
    id: "faq-9",
    question: "Can you support our internal IT team?",
    answer:
      "Yes. Auxano can work alongside your internal IT team to fill skill gaps, support infrastructure upgrades, monitor systems, improve performance, and provide strategic technical support whenever needed. Think of us as an extension of your IT department.",
  },
  {
    id: "faq-10",
    question: "How quickly can you start a project?",
    answer:
      "Project timelines depend on the scope and complexity, but once requirements are confirmed, our team can begin planning and execution quickly. We prioritize proper planning, clear timelines, and efficient delivery to ensure projects are completed right the first time.",
  },
  {
    id: "faq-11",
    question: "Do you serve businesses outside Lagos?",
    answer:
      "Yes. While Auxano is based in Ikeja, Lagos, we provide IT solutions and support for businesses across Nigeria, depending on project requirements and operational scope.",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Infrastructure", href: "/services#infrastructure" },
      { label: "Fire Alarm & Safety", href: "/services#fire-alarm-safety" },
      { label: "Networking", href: "/services#networking" },
      { label: "Hardware Systems", href: "/services#hardware-systems" },
      { label: "Software & Licenses", href: "/services#software-licenses" },
      { label: "Managed & Advisory", href: "/services#managed-advisory" },
    ],
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
      "Auxano Solutions helps businesses design, deploy, and support infrastructure, networking, hardware, software, and managed operations with enterprise-grade clarity.",
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
              "Auxano connects IT, CCTV, networking, and support into one easier operating view.",
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
          "Explore the core service areas Auxano delivers for modern business environments.",
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
          "Auxano Solutions Technology Limited delivers specialized and cost-effective ICT services that empower businesses to streamline operations, secure assets, and scale efficiently.",
        imageSrc: "/image/left.png",
        imageAlt: "Auxano left-side section visual",
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
          "Interactive Auxano services environment showing integrated infrastructure, networking, hardware, software, and managed support touchpoints.",
        promptLabel: "Explore the stack",
        items: [
          {
            id: "software-hotspot",
            label: "Software & Licenses",
            title: "Licensed and configured software for the real environment.",
            description:
              "Auxano handles licensing, activation, security configuration, and cloud or business application setup so the software layer is compliant, usable, and supportable after deployment instead of becoming a separate cleanup project.",
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
              "Auxano delivers CCTV, access control, structured cabling, automation, and site readiness as one coordinated infrastructure layer so environments open with cleaner coverage, safer entry, and fewer technical gaps.",
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
              "Auxano supports users, devices, escalations, and continuity with a structured operating model that keeps the environment from slipping after rollout or daily support pressure increases.",
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
              "From survey-led topology planning to active configuration and final diagrams, Auxano builds networks that support CCTV, users, cloud apps, and business communications without leaving the client to coordinate separate vendors.",
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
        title: "Everything you need to know before getting started",
        description:
          "Find answers to common questions about our IT solutions, implementation process, support structure, and how we help businesses build secure, scalable technology systems.",
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
    title: "About Auxano Solutions",
    description:
      "Auxano combines infrastructure delivery, networking, hardware systems, software licensing, and managed advisory support for organizations that need serious operational execution.",
    sections: [
      {
        _type: "richContent",
        eyebrow: "About Auxano",
        title:
          "A technical delivery partner for organizations that need more than generic IT support.",
        content: [
          "Auxano Solutions Technology Limited works across infrastructure, networking, hardware systems, software licensing, and managed advisory support. The company is built around doing technical work properly from the beginning rather than treating quality as a later correction step.",
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
