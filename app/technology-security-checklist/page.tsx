import { TechnologySecurityChecklist } from "@/components/checklist/technology-security-checklist";
import { JsonLd } from "@/components/ui/json-ld";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "2026 Business Technology & Security Checklist",
  description:
    "Take Ideal Solutions's free 2026 business technology and security checklist for Nigerian companies across IT, cybersecurity, fire safety, CCTV, and power.",
  path: "/technology-security-checklist",
  keywords: [
    "business technology checklist Nigeria",
    "IT health check Nigeria",
    "cybersecurity checklist for Nigerian companies",
    "CCTV and access control checklist",
    "fire alarm readiness checklist Nigeria",
    "business continuity checklist Nigeria",
    "IT audit checklist Lagos",
  ],
});

export default function TechnologySecurityChecklistPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "2026 Business Technology & Security Checklist",
            description:
              "A readiness assessment for Nigerian companies covering IT infrastructure, cybersecurity, physical security, fire safety, power, licensing, and disaster recovery.",
            url: absoluteUrl("/technology-security-checklist"),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            provider: {
              "@type": "Organization",
              "@id": `${absoluteUrl("/")}#organization`,
              name: "Ideal Solutions",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "NGN",
            },
          },
        ]}
      />
      <TechnologySecurityChecklist />
    </>
  );
}
