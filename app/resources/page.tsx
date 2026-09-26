import Link from "next/link";
import { ArrowRight, BookOpen, FileText, LifeBuoy, Wrench } from "lucide-react";

import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { getResourceGroups } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

const groupIcons = {
  "insights-learning": BookOpen,
  "proof-planning": FileText,
  support: LifeBuoy,
  "commercial-tools": Wrench,
};

export const metadata = buildMetadata({
  title: "IT Resources, Case Studies, and Service Guides in Nigeria",
  description:
    "Explore Ideal Solutions IT resources, service guides, case studies, CCTV, fire alarm, network cabling, and managed support insights for Nigeria.",
  path: "/resources",
  keywords: [
    "IT resources Nigeria",
    "CCTV installation guide Nigeria",
    "fire alarm system guide Lagos",
    "network cabling resources Nigeria",
    "managed IT support resources Lagos",
    "IT case studies Nigeria",
  ],
});

export const revalidate = false;

export default async function ResourcesPage() {
  const groups = await getResourceGroups();
  const links = groups.flatMap((group) =>
    group.links.map((link) => ({
      ...link,
      groupLabel: group.label,
    })),
  );

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Ideal Solutions IT Resources",
            description:
              "Resource hub for Ideal Solutions IT infrastructure, CCTV, access control, fire alarm, network cabling, managed IT support, case studies, and consultation planning.",
            url: absoluteUrl("/resources"),
            inLanguage: "en-NG",
            provider: {
              "@type": "Organization",
              "@id": `${absoluteUrl("/")}#organization`,
              name: "Ideal Solutions",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Ideal Solutions resource links",
            itemListElement: links.map((link, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: link.label,
              url: absoluteUrl(link.href),
              item: {
                "@type": "WebPage",
                name: link.label,
                url: absoluteUrl(link.href),
                about: link.groupLabel,
              },
            })),
          },
        ]}
      />

      <section className="overflow-hidden bg-[var(--color-ink)] py-20 text-white sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
            Resources
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[1.04] sm:text-6xl">
            IT, ELV, CCTV, fire alarm, and managed support resources for Nigeria.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
            Explore service guides, delivery proof, planning pages, and direct
            consultation routes for IT infrastructure, physical security, fire
            safety, networking, and managed support projects in Nigeria.
          </p>
        </Container>
      </section>

      <section className="bg-[#f6f8fb] py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {groups.map((group) => {
              const Icon = groupIcons[group.id];

              return (
                <section
                  key={group.id}
                  id={group.id}
                  className="scroll-mt-28 rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)] sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-[var(--color-ink)]">
                    {group.label}
                  </h2>
                  <div className="mt-6 grid gap-3">
                    {group.links.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        className="group flex items-center justify-between gap-4 rounded-[1rem] border border-[color:rgba(11,18,32,0.08)] bg-[#f8fbff] px-4 py-4 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:border-[var(--color-electric)]"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-electric)] transition group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
