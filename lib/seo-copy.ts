// Search snippets are separate from the longer, visible page headings.
// Keep these route-specific edits consistent across standard and service templates.
const searchCopy: Record<string, { title?: string; description?: string }> = {
  "/industries/oems-technology-vendors": { title: "OEM Field Support Nigeria | Ideal Solutions" },
  "/services/server-storage-hardware": {
    title: "Server & Storage Services Nigeria | Ideal Solutions",
    description: "Enterprise server and storage supply, repair, deployment and procurement support in Nigeria. Discuss your hardware requirements with Ideal Solutions.",
  },
  "/services/infrastructure-audit-optimisation": { title: "Data Centre Audits & Optimisation Nigeria | Ideal Solutions" },
  "/industries/system-integrators": {
    title: "System Integrator Support Nigeria | Ideal Solutions",
    description: "Local deployment, Smart Hands, network and hardware support for system integrators delivering infrastructure projects in Nigeria.",
  },
  "/industries/technology-companies": { title: "IT Infrastructure for Tech Companies Nigeria | Ideal Solutions" },
  "/services/audio-visual-services-livestreaming": { title: "AV & Livestreaming Services Lagos | Ideal Solutions" },
  "/blog/how-to-choose-a-data-centre-deployment-provider-in-nigeria": { title: "Choosing a Data Centre Provider in Nigeria | Ideal Solutions" },
  "/blog/how-much-does-data-centre-deployment-cost-nigeria": { title: "Data Centre Deployment Cost Nigeria: 7 Factors | Ideal Solutions" },
  "/industries/religious-organizations": { title: "IT for Religious Organisations Nigeria | Ideal Solutions" },
  "/industries/managed-service-providers": { title: "Local MSP Technical Support Nigeria | Ideal Solutions" },
  "/services/data-centre-security-safety": {
    title: "Data Centre Security Services Nigeria | Ideal Solutions",
    description: "Data centre access control, CCTV, mantraps, fire alarms and security deployment in Nigeria. Discuss your site's requirements with Ideal Solutions.",
  },
  "/services/network-infrastructure-connectivity": {
    title: "Network Infrastructure & Cabling Nigeria | Ideal Solutions",
    description: "Network installation, configuration, fibre and copper cabling, labelling and remediation for data centres and businesses in Nigeria.",
  },
  "/industries/financial-services": { title: "IT for Financial Services Nigeria | Ideal Solutions" },
  "/resources": { title: "IT Guides & Case Studies Nigeria | Ideal Solutions" },
  "/services/smart-hands-technical-support/planned-maintenance-support": { title: "Data Centre Maintenance Support Nigeria | Ideal Solutions" },
  "/services/smart-hands-technical-support": {
    description: "Onsite Smart Hands and data centre technical support in Nigeria for operators, enterprises and remote engineering teams. Discuss your project.",
  },
  "/services/server-sales-repair": {
    description: "Source, upgrade and repair enterprise servers in Nigeria with Ideal Solutions. Get help with hardware selection, replacement parts and onsite support.",
  },
  "/services/data-centre-deployment": {
    description: "Data centre deployment in Nigeria: rack-and-stack, equipment installation, server deployment, testing and verification. Discuss your project.",
  },
};

export function resolveSearchCopy(path: string, title: string, description: string) {
  const copy = searchCopy[path];
  return { title: copy?.title ?? title, description: copy?.description ?? description };
}
