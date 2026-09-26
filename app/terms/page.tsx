import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms",
  description:
    "Read Ideal Solutions website terms for consultation requests, service inquiries, project scoping, and business technology communications in Nigeria.",
  path: "/terms",
  noIndex: true, // Placeholder policy: index only after approved legal copy replaces it.
});

const termsPoints = [
  "Website content is provided for informational and commercial communication purposes only and does not create a binding service agreement by itself.",
  "Submitted consultation requests are starting points for scoping, not final quotations or procurement commitments.",
  "Project scope, schedule, and pricing remain subject to discovery, site review, and commercial approval.",
  "Website downtime, third-party tooling outages, or form delivery issues do not create liability beyond reasonable operational remediation.",
];

export default function TermsPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading
          as="h1"
          eyebrow="Terms"
          title="The launch site frames services, captures leads, and supports consultation-led sales."
          description="Replace this launch-safe summary with legal-approved terms when the client’s final operating policy is available."
        />
        <div className="mt-8 space-y-4">
          {termsPoints.map((point) => (
            <div
              key={point}
              className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-5 py-4 text-sm leading-7 text-[var(--color-ink)] shadow-[0_16px_40px_rgba(11,18,32,0.05)]"
            >
              {point}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
