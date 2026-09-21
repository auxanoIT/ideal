export type OperationTeam = {
  id: string;
  label: string;
  audience: string;
  headline: string;
  paragraphs: string[];
  benefits: string[];
  cta: string;
  image: string;
  alt: string;
  cardTitle: string;
  statuses: string[];
  badge: string;
};

export const operationTeams: OperationTeam[] = [
  {
    id: "operators", label: "Data Centre Operators", audience: "Data Centre Operators",
    headline: "Keep the Environment Running While the Work Gets Done.",
    paragraphs: [
      "Your data centre cannot stop every time equipment needs to be installed, changed, tested or supported.",
      "Ideal Solutions works inside live environments to help operators execute infrastructure work with greater precision, visibility and control — without placing unnecessary pressure on internal operations teams.",
    ],
    benefits: ["Reduce operational disruption", "Extend your technical capacity", "Improve infrastructure control", "Move from reactive to planned support"],
    cta: "Support Your Data Centre",
    image: "data-centre-operations-nigeria.webp",
    alt: "Data centre operations engineer inspecting live server cabinets",
    cardTitle: "Live Environment", statuses: ["Operational", "Work in Progress"], badge: "Precision in every intervention",
  },
  {
    id: "remote", label: "International & Remote Teams", audience: "International & Remote Technology Teams",
    headline: "Your Infrastructure Is in Nigeria. Your Engineers Don't Have to Be.",
    paragraphs: [
      "When your equipment, customer or data centre is in Nigeria but your technical team is elsewhere, distance should not slow execution.",
      "Ideal Solutions becomes your trusted onsite technical extension — carrying out physical tasks, verification and infrastructure support under the direction of your remote engineering team.",
    ],
    benefits: ["Reduce engineer travel", "Gain trusted local execution", "Maintain remote visibility", "Respond faster"],
    cta: "Talk to Our Nigeria Team",
    image: "remote-team-onsite-support-nigeria.webp",
    alt: "Onsite technician using a headset and service laptop beside enterprise server equipment",
    cardTitle: "Connected Delivery", statuses: ["Remote Engineer — Connected", "Onsite Technician — Active"], badge: "Task Verified",
  },
  {
    id: "integrators", label: "System Integrators & OEMs", audience: "System Integrators & OEMs",
    headline: "Extend Your Delivery Capability Without Building a Local Field Team.",
    paragraphs: [
      "Your solution may already be designed, specified and approved. What you need is a technical partner capable of executing the onsite work professionally.",
      "Ideal Solutions supports system integrators, OEMs and technology vendors with local installation, deployment, testing, remediation and field support across Nigeria.",
    ],
    benefits: ["Local technical coverage", "Execution to your requirements", "Reduce project overhead", "Protect your customer relationship"],
    cta: "Discuss Local Technical Support",
    image: "system-integrator-field-delivery-nigeria.webp",
    alt: "Field engineer reviewing a tablet beside enterprise hardware on a staging bench",
    cardTitle: "Deployment Plan", statuses: ["Installation", "Site Verification", "Project Handover"], badge: "Your standards. Local execution.",
  },
  {
    id: "enterprise", label: "CIOs, CTOs & IT Teams", audience: "CIOs, CTOs & Enterprise IT Teams",
    headline: "Keep Infrastructure Projects Moving Without Pulling Your Core Team Off Strategy.",
    paragraphs: [
      "Your senior IT team should not spend valuable time coordinating every cable, rack change, hardware installation or physical intervention.",
      "Ideal Solutions provides the onsite execution needed to move infrastructure projects forward while your internal team keeps control of architecture, standards and technology decisions.",
    ],
    benefits: ["Protect engineering time", "Accelerate deployment", "Reduce infrastructure risk", "Improve accountability"],
    cta: "Discuss Your Infrastructure Project",
    image: "enterprise-it-infrastructure-oversight.webp",
    alt: "Enterprise IT director at a workstation with a technician and server racks behind glass",
    cardTitle: "Project On Track", statuses: ["Deployment Verified", "Infrastructure Ready"], badge: "Execution support. You stay in control.",
  },
  {
    id: "facilities", label: "Facilities & Infrastructure", audience: "Facilities & Infrastructure Teams",
    headline: "Turn Infrastructure Complexity into Something Your Team Can Control.",
    paragraphs: [
      "Racks accumulate changes. Cabling grows. Devices move. Documentation falls behind. Over time, infrastructure that still works can become increasingly difficult to understand, maintain and expand.",
      "Ideal Solutions helps facilities and infrastructure teams restore visibility, organisation and maintainability across physical IT environments.",
    ],
    benefits: ["See what you actually have", "Reduce disorder", "Make changes safer", "Prepare for growth"],
    cta: "Assess Your Infrastructure",
    image: "network-rack-remediation-comparison.webp",
    alt: "Illustrative comparison of tangled network cabling and an organised remediated rack",
    cardTitle: "After", statuses: ["Labelled", "Documented", "Maintainable"], badge: "From disorder to visibility",
  },
  {
    id: "procurement", label: "Procurement & Projects", audience: "Procurement & Project Teams",
    headline: "Make the Purchase Fit the Project — Not Just the Specification Sheet.",
    paragraphs: [
      "Critical infrastructure procurement carries risks beyond price. Compatibility, licensing, lifecycle, installation requirements and delivery timelines all affect whether the hardware actually works for the intended environment.",
      "Ideal Solutions brings technical understanding into the procurement process so equipment can move more confidently from selection to deployment.",
    ],
    benefits: ["Reduce specification mistakes", "Improve compatibility confidence", "Simplify sourcing", "Connect procurement to deployment"],
    cta: "Send Your Equipment Requirements",
    image: "enterprise-hardware-procurement-nigeria.webp",
    alt: "Procurement engineer inspecting rackmount servers, memory modules, rack rails and packaged accessories",
    cardTitle: "Equipment Readiness", statuses: ["Compatibility", "Accessories", "Deployment Ready"], badge: "From selection to deployment",
  },
];
