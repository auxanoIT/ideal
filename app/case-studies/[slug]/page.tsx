import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { getCaseStudyMedia } from "@/lib/case-study-media";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
  getCaseStudies,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { CaseStudy } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = false;

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return buildMetadata({
      title: "Case study not found",
      description: "The requested case study could not be found.",
      path: `/case-studies/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: caseStudy.title,
    description: buildCaseStudySeoDescription(caseStudy),
    path: `/case-studies/${caseStudy.slug}`,
    type: "article",
    keywords: [
      caseStudy.industry,
      caseStudy.location,
      ...(caseStudy.relatedServices ?? []),
    ].filter((keyword): keyword is string => Boolean(keyword)),
  });
}

function buildCaseStudySeoDescription(caseStudy: CaseStudy) {
  const serviceFocus = caseStudy.relatedServices?.slice(0, 2).join(" and ");
  const focus = serviceFocus
    ? serviceFocus.replaceAll("-", " ")
    : "IT and ELV infrastructure";

  return `See how Ideal Solutions delivered ${focus} for ${caseStudy.clientDisplayName ?? caseStudy.client ?? "an infrastructure environment"}${caseStudy.location ? ` in ${caseStudy.location}` : ""}, supporting clearer execution, verification, and handover.`;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [caseStudy, allCaseStudies] = await Promise.all([
    getCaseStudyBySlug(slug),
    getCaseStudies(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const related = allCaseStudies
    .filter((item) => item.slug !== caseStudy.slug)
    .slice(0, 2);
  const media = getCaseStudyMedia(caseStudy);
  const metrics = caseStudy.metrics ?? [];
  const solutionSteps = caseStudy.solution ?? [];
  const relatedServices = caseStudy.relatedServices ?? [];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: caseStudy.title,
            description: caseStudy.summary,
            url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
            about: caseStudy.industry,
            locationCreated: caseStudy.location,
            publisher: {
              "@type": "Organization",
              name: "Ideal Solutions",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Case Studies",
                item: absoluteUrl("/case-studies"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: caseStudy.title,
                item: absoluteUrl(`/case-studies/${caseStudy.slug}`),
              },
            ],
          },
        ]}
      />
      <section className="overflow-hidden bg-[var(--color-ink)] text-white">
        <Container className="grid min-h-[640px] items-center gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
          <div className="relative z-10">
            <h1 className="mt-5 text-5xl font-semibold leading-[1.04] sm:text-3xl">
              {caseStudy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/72 sm:text-lg">
              {caseStudy.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book-consultation">
                Discuss a similar project
              </ButtonLink>
              <ButtonLink href="/case-studies">
                View all case studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/8 shadow-[0_32px_90px_rgba(0,0,0,0.28)]">
            <div className="relative aspect-[16/10]">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                priority
                quality={56}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.04),rgba(11,18,32,0.72))]" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                Project Snapshot
              </p>
              <dl className="mt-6 grid gap-5">
                {[
                  ["Client", caseStudy.client],
                  ["Industry", caseStudy.industry],
                  ["Location", caseStudy.location],
                ].map(([label, value]) =>
                  value ? (
                    <div key={label}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                        {label}
                      </dt>
                      <dd className="mt-2 text-sm font-semibold text-[var(--color-ink)]">
                        {value}
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </div>
          </aside>

          <div className="grid gap-14">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                Challenge
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                The operating gap that needed attention
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                {caseStudy.challenge}
              </p>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                Ideal Solutions Response
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                A structured rollout from assessment to handover
              </h2>
              <div className="mt-7 grid gap-4">
                {solutionSteps.length ? (
                  solutionSteps.map((item, index) => (
                    <div
                      key={item}
                      className="grid gap-4 rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-5 shadow-[0_16px_42px_rgba(11,18,32,0.05)] sm:grid-cols-[auto_1fr]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-electric)] text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-[var(--color-ink)]">
                        {item}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[1.25rem] bg-[var(--color-cloud)] p-5 text-sm leading-7 text-[var(--color-muted)]">
                    Ideal Solutions begins with site context, confirms the
                    technical scope, coordinates delivery, verifies the
                    installed systems, and hands over documentation for ongoing
                    support.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-[1.5rem] bg-[var(--color-ink)] p-7 text-white sm:p-9">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[var(--color-cyan)]" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
                  Result
                </p>
              </div>
              <h2 className="mt-5 text-4xl font-semibold leading-tight">
                What changed after the project
              </h2>
              <p className="mt-5 text-base leading-8 text-white/72">
                {caseStudy.result}
              </p>
              {metrics.length ? (
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {metrics.slice(0, 3).map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[1.25rem] border border-white/10 bg-white/8 p-5"
                    >
                      <p className="text-3xl font-semibold text-white">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.13em] text-white/60">
                        {metric.label}
                      </p>
                      {metric.description ? (
                        <p className="mt-3 text-xs leading-6 text-white/60">
                          {metric.description}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                Related Capabilities
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                The service areas behind this outcome
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                These service areas show the practical delivery capabilities
                behind the project outcome.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(relatedServices.length
                ? relatedServices
                : ["Site assessment", "Project deployment", "Support handover"]
              ).map((service) => (
                <div
                  key={service}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-white bg-white p-5 shadow-[0_14px_35px_rgba(11,18,32,0.05)]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-success)]" />
                  <span className="text-sm font-semibold capitalize text-[var(--color-ink)]">
                    {service.replaceAll("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {related.length ? (
            <div className="mt-16">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                    More Proof
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                    Related case studies
                  </h2>
                </div>
                <ButtonLink href="/case-studies" variant="secondary">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {related.map((item) => (
                  <CaseStudyCard key={item.slug} caseStudy={item} />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
              Next Step
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)]">
              Need this kind of result in your own environment?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Share the site, system, or operational challenge and Ideal
              Solutions can shape the right assessment, rollout, and support
              plan.
            </p>
          </div>
          <ButtonLink href="/book-consultation">
            Book consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
