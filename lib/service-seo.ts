import type { Service } from "@/lib/types";
import { idealServiceContent, idealServiceText } from "@/lib/ideal-service-brand";

export type ServiceSeoFaq = {
  question: string;
  answer: string;
};

type ServiceSeoOverride = {
  title: string;
  description: string;
  searchTerms: string[];
  faqs: ServiceSeoFaq[];
};

const serviceSeoOverrides: Record<string, ServiceSeoOverride> = {
  "data-centre-services": {
    title: "Server Room & Data Centre Services Nigeria",
    description:
      "Auxano designs and builds reliable server rooms and data centres in Nigeria, covering racks, UPS power, cooling, monitoring, access control, testing, and handover.",
    searchTerms: [
      "server room company in Nigeria",
      "server room provider in Nigeria",
      "server room design Lagos",
      "data centre solutions Nigeria",
      "data centre company in Nigeria",
      "server room UPS and cooling Nigeria",
    ],
    faqs: [
      {
        question:
          "What does Auxano include in a server room or data centre project?",
        answer:
          "The scope can cover room layout, racks, power distribution, UPS and surge protection, cooling, environmental monitoring, controlled access, installation checks, and handover documentation. The final design is based on the site conditions, equipment load, uptime requirement, and growth plan.",
      },
      {
        question: "Can Auxano upgrade an existing server room in Nigeria?",
        answer:
          "Yes. Auxano can assess an operating server room, identify risks around layout, power, cooling, monitoring, access, and maintainability, then plan an upgrade that protects business continuity while improving reliability and supportability.",
      },
    ],
  },
  "it-managed-services-staff-outsourcing": {
    title: "Managed IT Services & Outsourcing Lagos",
    description:
      "Managed IT services and staff outsourcing in Lagos and across Nigeria, with SLA support, monitoring, cybersecurity, onsite engineers, and monthly reporting.",
    searchTerms: [
      "IT managed services in Lagos",
      "managed IT services Nigeria",
      "IT outsourcing company Nigeria",
      "outsourced IT support Lagos",
      "onsite IT engineer Lagos",
      "IT support SLA Nigeria",
    ],
    faqs: [
      {
        question: "What is included in Auxano's managed IT services?",
        answer:
          "The operating model can include user support, network and server monitoring, patch oversight, firewall and security administration, incident escalation, vendor coordination, monthly reporting, and scheduled service reviews. Coverage is agreed against the client's users, sites, systems, and response requirements.",
      },
      {
        question: "Can Auxano provide an onsite IT engineer in Lagos?",
        answer:
          "Yes. Auxano can place a dedicated engineer at the client location while providing escalation support from the wider technical team. This gives staff a consistent onsite contact without leaving complex incidents dependent on one person.",
      },
    ],
  },
  "office-telephone-system-ip-pbx": {
    title: "IP PBX & Office Telephone Systems Nigeria",
    description:
      "IP PBX and office telephone system installation in Nigeria, including SIP trunking, desk phones, softphones, call queues, recording, training, and support.",
    searchTerms: [
      "IP PBX in Nigeria",
      "IP PBX installation Lagos",
      "office telephone system Nigeria",
      "business phone system Lagos",
      "SIP trunk provider Nigeria",
      "cloud PBX Nigeria",
    ],
    faqs: [
      {
        question:
          "Can Auxano install both cloud and on-premises IP PBX systems?",
        answer:
          "Yes. Auxano can design an on-premises or cloud-hosted IP PBX around the organization's extensions, locations, internet reliability, call routing, management needs, and budget. The selected model is configured and tested before user handover.",
      },
      {
        question: "Which office telephone features can be configured?",
        answer:
          "Typical features include auto-attendant menus, extension dialing, call queues, hunt groups, voicemail-to-email, call recording, desk phones, mobile softphones, and PC calling. Features are configured around the way the business receives and manages calls.",
      },
    ],
  },
  "sales-of-it-hardware": {
    title: "IT Hardware Suppliers in Lagos, Nigeria",
    description:
      "Business IT hardware supply in Lagos and across Nigeria for genuine laptops, desktops, servers, UPS, storage, and peripherals with warranty-backed procurement.",
    searchTerms: [
      "IT hardware suppliers Nigeria",
      "IT equipment distributors Nigeria",
      "computer hardware suppliers Lagos",
      "business laptop supplier Nigeria",
      "server hardware supplier Nigeria",
      "bulk IT equipment procurement Nigeria",
    ],
    faqs: [
      {
        question: "Does Auxano supply genuine IT equipment with warranty?",
        answer:
          "Yes. Auxano sources business hardware through recognized supply channels and provides the available manufacturer or distributor warranty information at handover. Recommendations account for workload, supportability, budget, and expected device life.",
      },
      {
        question: "Can Auxano handle bulk IT equipment procurement?",
        answer:
          "Yes. Auxano can coordinate bulk procurement for offices, schools, healthcare teams, retail groups, and multi-site operations, including specification guidance, accessory planning, asset tagging, organized delivery, and warranty records.",
      },
    ],
  },
};

const coreLocations = [
  "Nigeria",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ikeja",
  "Victoria Island",
];

const categorySearchTerms: Record<Service["category"], string[]> = {
  Infrastructure: [
    "ELV contractor in Nigeria",
    "security systems installation Lagos",
    "access control and CCTV company Nigeria",
  ],
  "Fire Alarm & Safety": [
    "fire alarm installation Nigeria",
    "fire alarm system company Lagos",
    "fire safety system maintenance Nigeria",
  ],
  Networking: [
    "network cabling company Nigeria",
    "structured cabling Lagos",
    "enterprise network design Nigeria",
  ],
  "Hardware Systems": [
    "IT hardware supplier Nigeria",
    "server and laptop sales Lagos",
    "business computer installation Nigeria",
  ],
  "Software & Licenses": [
    "software license reseller Nigeria",
    "firewall license Nigeria",
    "Microsoft and cloud licenses Lagos",
  ],
  "Managed & Advisory": [
    "managed IT services Nigeria",
    "IT support company Lagos",
    "IT audit and consultancy Nigeria",
  ],
};

export function buildServiceSeoTitle(service: Service) {
  const override = serviceSeoOverrides[service.slug];

  if (override) {
    return override.title;
  }

  const locationFocus =
    service.category === "Fire Alarm & Safety" ? "Nigeria" : "Lagos, Nigeria";

  return `${service.title} in ${locationFocus}`;
}

export function buildServiceSeoDescription(service: Service) {
  const override = serviceSeoOverrides[service.slug];

  if (override) {
    return idealServiceText(override.description);
  }

  const serviceName = service.title.toLowerCase();
  const audience = service.industries.slice(0, 3).join(", ").toLowerCase();

  return `Ideal Solutions delivers ${serviceName} in Lagos and across Nigeria for ${audience || "businesses"}, with scoping, installation, testing, and support.`;
}

export function buildServiceSeoKeywords(service: Service) {
  const serviceName = service.title.toLowerCase();
  const slugPhrase = service.slug.replaceAll("-", " ");
  const override = serviceSeoOverrides[service.slug];

  return [
    service.title,
    `${service.title} Nigeria`,
    `${service.title} Lagos`,
    `${serviceName} company in Nigeria`,
    `${serviceName} company in Lagos`,
    `${slugPhrase} Nigeria`,
    `${slugPhrase} Lagos`,
    ...(override?.searchTerms ?? []),
    ...categorySearchTerms[service.category],
    ...coreLocations.map((location) => `${serviceName} ${location}`),
    ...service.industries.map((industry) => `${serviceName} for ${industry}`),
    ...service.capabilities.slice(0, 6),
    ...service.deliverables.slice(0, 5),
  ];
}

export function buildServiceSeoFaqs(service: Service): ServiceSeoFaq[] {
  const serviceName = service.title.toLowerCase();
  const firstIndustries = service.industries.slice(0, 4).join(", ");
  const primaryCapabilities = service.capabilities.slice(0, 4).join(", ");
  const primaryDeliverables = service.deliverables.slice(0, 4).join(", ");
  const override = serviceSeoOverrides[service.slug];

  const standardFaqs: ServiceSeoFaq[] = [
    {
      question: `How does Auxano deliver ${serviceName}?`,
      answer: `Auxano begins with the operating environment, confirms the technical scope, then handles planning, supply, installation, testing, commissioning, documentation, and support handover as one coordinated delivery process.`,
    },
    {
      question: `What is included in the project scope?`,
      answer: `Each scope is shaped around the site, risk level, users, devices, and long-term support needs. Core delivery areas include ${primaryCapabilities || service.summary}.`,
    },
    {
      question: `Can Auxano support multiple Nigerian locations?`,
      answer: `Yes. Auxano supports single-site and multi-site environments in Lagos, Abuja, Port Harcourt, and other Nigerian locations, with planning and documentation that keep deployment and future support consistent.`,
    },
    {
      question: `Which environments is this service suited for?`,
      answer: `This service is suited for ${firstIndustries || "corporate offices, healthcare, education, financial services, and multi-site operations"}, with the final design adapted to each site's uptime, security, compliance, and support requirements.`,
    },
    {
      question: `What happens at handover?`,
      answer: `Handover is treated as part of the work, not an afterthought. Typical handover items include ${primaryDeliverables || "configuration records, test results, user guidance, support notes, and warranty or renewal information"}.`,
    },
  ];

  return idealServiceContent([...(override?.faqs ?? []), ...standardFaqs].slice(0, 5));
}

export function buildServiceSeoQuestions(service: Service) {
  const serviceName = service.title.toLowerCase();

  return [
    `Can Auxano deliver ${serviceName} for business sites in Nigeria?`,
    `What is included in ${serviceName}?`,
    `How does Auxano scope and hand over ${serviceName}?`,
    `Can ${serviceName} support offices in Lagos, Abuja, and Port Harcourt?`,
    `How do I book a consultation for ${serviceName}?`,
  ];
}
