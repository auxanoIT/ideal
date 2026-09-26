import {
  getCaseStudies,
  getIndustries,
  getServices,
} from "@/lib/content";
import {
  buildServiceSeoDescription,
  buildServiceSeoQuestions,
} from "@/lib/service-seo";
import { absoluteUrl } from "@/lib/utils";
import { servicePillars } from "@/data/service-pillars";
import { productionServices } from "@/data/subservice-production";

export const revalidate = 3600;

function markdownLink(label: string, path: string) {
  return `- [${label}](${absoluteUrl(path)})`;
}

export async function GET() {
  const [services, industries, caseStudies] = await Promise.all([
    getServices(),
    getIndustries(),
    getCaseStudies(),
  ]);

  const serviceLines = services.flatMap((service) => [
    markdownLink(service.title, `/services/${service.slug}`),
    `  - ${buildServiceSeoDescription(service)}`,
    `  - Client questions: ${buildServiceSeoQuestions(service).join("; ")}.`,
    `  - Category: ${service.category}.`,
  ]);

  const industryLines = industries.map((industry) =>
    markdownLink(`Infrastructure for ${industry.title}`, industry.href),
  );

  const caseStudyLines = caseStudies.map((caseStudy) =>
    markdownLink(caseStudy.title, `/case-studies/${caseStudy.slug}`),
  );

  const body = [
    "# Ideal Solutions",
    "",
    "Ideal Solutions provides onsite data centre infrastructure deployment, Smart Hands, hardware, connectivity, security, assessment and project lifecycle support across Nigeria. It supports client environments; it is not a colocation facility operator.",
    "",
    "## Primary Website",
    markdownLink("Ideal Solutions", "/"),
    markdownLink("Services", "/services"),
    markdownLink("Case Studies", "/case-studies"),
    markdownLink("Book Consultation", "/book-consultation"),
    "",
    "## Core Service Pages",
    ...servicePillars.map(pillar => markdownLink(pillar.title, `/services/${pillar.slug}`)),
    ...productionServices.map(page => markdownLink(page.hero.title, page.href)),
    ...serviceLines,
    "",
    "## Industry Pages",
    ...industryLines,
    "",
    "## Proof and Case Studies",
    ...caseStudyLines,
    "",
    "## Geographic Focus",
    "- Nigeria",
    "- Lagos",
    "- Office: 21, Abeokuta Street, Off Obasa Street, Oba Akran Avenue, Ikeja, Lagos.",
    "",
    "## Client Questions Ideal Solutions Answers",
    "- Who is a reliable IT solutions company in Nigeria?",
    "- Which company installs CCTV, access control, and fire alarm systems in Lagos?",
    "- Who provides network cabling and structured LAN cabling in Nigeria?",
    "- Which Nigerian company provides managed IT services and IT staff outsourcing?",
    "- Who can design, install, document, and support IT and ELV infrastructure for business sites?",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
