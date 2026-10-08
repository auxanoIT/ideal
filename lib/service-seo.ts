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
      "Ideal Solutions designs and builds reliable server rooms and data centres in Nigeria, covering racks, UPS power, cooling, monitoring, access control, testing, and handover.",
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
          "What does Ideal Solutions include in a server room or data centre project?",
        answer:
          "The scope can cover room layout, racks, power distribution, UPS and surge protection, cooling, environmental monitoring, controlled access, installation checks, and handover documentation. The final design is based on the site conditions, equipment load, uptime requirement, and growth plan.",
      },
      {
        question: "Can Ideal Solutions upgrade an existing server room in Nigeria?",
        answer:
          "Existing server rooms can be reviewed against the agreed scope. Work in a live environment requires site approval, dependency checks and an appropriate work window. Specialist power or cooling responsibilities must be confirmed separately; uninterrupted operation is not guaranteed.",
      },
    ],
  },
  "it-managed-services-staff-outsourcing": {
    title: "Managed IT Services & Outsourcing Lagos",
    description:
      "Discuss managed IT and onsite support in Nigeria with Ideal Solutions. Equipment, visit schedules, reporting and response arrangements are scoped together.",
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
        question: "What is included in Ideal Solutions' managed IT services?",
        answer:
          "The operating model can include user support, network and server monitoring, patch oversight, firewall and security administration, incident escalation, vendor coordination, monthly reporting, and scheduled service reviews. Coverage is agreed against the client's users, sites, systems, and response requirements.",
      },
      {
        question: "Can Ideal Solutions provide an onsite IT engineer in Lagos?",
        answer:
          "Onsite staffing can be discussed against the required skills, location, schedule and supervision arrangements. Availability, responsibilities and escalation coverage must be confirmed before an engagement begins.",
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
          "Can Ideal Solutions install both cloud and on-premises IP PBX systems?",
        answer:
          "The platform, extensions, locations, connectivity, licences and call-routing requirements should be reviewed first. Installation and configuration can be discussed for a supported system. Hosting, carrier services and subscriptions must be explicitly included where required.",
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
      "Ideal Solutions supports business hardware procurement in Nigeria, with specifications, availability, delivery and applicable warranty terms confirmed per order.",
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
        question: "Does Ideal Solutions supply genuine IT equipment with warranty?",
        answer:
          "The quotation should identify the selected equipment, supply arrangements and applicable manufacturer or supplier warranty terms. Confirm coverage, exclusions and the claims process before ordering. No standard warranty period applies automatically to every product.",
      },
      {
        question: "Can Ideal Solutions handle bulk IT equipment procurement?",
        answer:
          "Bulk procurement can be scoped from an approved equipment list, quantities, delivery locations and required dates. Availability, accessories, substitutions, asset records and installation requirements should be confirmed before ordering.",
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
  const serviceName = idealServiceText(service.title);
  const override = serviceSeoOverrides[service.slug];
  const standardFaqs: ServiceSeoFaq[] = [
    {
      question: `How is ${serviceName} scoped?`,
      answer: "We review the site, existing equipment, intended outcome and customer responsibilities before agreeing the work. Supply, installation, configuration, testing and support are separate activities and are included only where specified in the agreed scope.",
    },
    {
      question: "Can you support a site outside Lagos?",
      answer: "Ideal Solutions is based in Ikeja, Lagos and supports infrastructure projects across Nigeria. Site access, travel, scheduling and technical resources must be confirmed for each location; local offices or immediate attendance should not be assumed.",
    },
    {
      question: "What records are provided at handover?",
      answer: "The completion record is agreed for the task. It can include equipment, connection or configuration changes, agreed checks, permitted photographs and unresolved issues. The customer's technical owner reviews the evidence against the acceptance criteria.",
    },
    {
      question: `How do I request a quotation for ${serviceName}?`,
      answer: "Use Book Consultation or email info@idealsolutions.com.ng with the site, equipment details, required tasks and preferred work window. Scope, availability, pricing and delivery arrangements are confirmed before scheduling. Do not include passwords in an initial enquiry.",
    },
  ];
  return idealServiceContent([...(override?.faqs ?? []), ...standardFaqs]);
}

export function buildServiceSeoQuestions(service: Service) {
  return buildServiceSeoFaqs(service).map(item => item.question);
}
