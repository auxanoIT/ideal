import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
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
import styles from "./case-study.module.css";
import { absoluteUrl } from "@/lib/utils";
import { findPillar } from "@/data/service-pillars";

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
    title: caseStudy.seo?.metaTitle || caseStudy.title,
    description:
      caseStudy.seo?.metaDescription || buildCaseStudySeoDescription(caseStudy),
    imagePath: caseStudy.textOnly
      ? "/opengraph-image"
      : getCaseStudyMedia(caseStudy).src,
    imageAlt: caseStudy.textOnly
      ? "Ideal Solutions"
      : getCaseStudyMedia(caseStudy).alt,
    modifiedTime: caseStudy.updatedAt,
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
            "@type": "Article",
            headline: caseStudy.title,
            description: caseStudy.summary,
            url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
            about: caseStudy.industry,
            image: caseStudy.textOnly ? undefined : absoluteUrl(media.src),
            contentLocation: caseStudy.location
              ? { "@type": "Place", name: caseStudy.location }
              : undefined,
            author: {
              "@type": "Organization",
              "@id": `${absoluteUrl("/")}#organization`,
              name: "Ideal Solutions",
            },
            publisher: {
              "@type": "Organization",
              "@id": `${absoluteUrl("/")}#organization`,
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
        <Container
          className={`grid items-center gap-12 py-16 lg:py-20 ${caseStudy.textOnly ? "" : "min-h-[640px] lg:grid-cols-[0.92fr_1.08fr]"}`}
        >
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2a900]">
              {caseStudy.client} · Case Study
            </p>
            <h1 className="mt-5 max-w-5xl text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
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
          {!caseStudy.textOnly && (
            <figure className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/8 shadow-[0_32px_90px_rgba(0,0,0,0.28)]">
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
              </div>
            </figure>
          )}
        </Container>
      </section>

      <article className={styles.story}>
        <Container>
          <div className={styles.facts}>
            {[
              ["Client", caseStudy.clientDisplayName ?? caseStudy.client],
              ["Sector", caseStudy.industry],
              ["Location", caseStudy.location],
            ].map(([label, value]) =>
              value ? (
                <div key={label}>
                  <p className={styles.factLabel}>{label}</p>
                  <p className={styles.factValue}>{value}</p>
                </div>
              ) : null,
            )}
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className={styles.metric}>{metric.value}</p>
                <p className={styles.factLabel}>{metric.label}</p>
                {metric.description && (
                  <p className={styles.metricDescription}>
                    {metric.description}
                  </p>
                )}
              </div>
            ))}
          </div>
          <section className={styles.summary} aria-labelledby="project-summary">
            <h2 id="project-summary">Summary</h2>
            <p>{caseStudy.summary}</p>
          </section>
          {caseStudy.challenge && (
            <section
              className={styles.chapter}
              aria-labelledby="project-challenge"
            >
              <h2 id="project-challenge">The Challenge</h2>
              <p>{caseStudy.challenge}</p>
            </section>
          )}
          <section
            className={styles.chapter}
            aria-labelledby="project-solution"
          >
            <h2 id="project-solution">Our Solution</h2>
            {!caseStudy.textOnly && (
              <figure className={styles.storyImage}>
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  quality={80}
                  className={styles.image}
                />
              </figure>
            )}
            {solutionSteps.length > 0 && (
              <>
                <p>
                  The project scope for{" "}
                  {caseStudy.clientDisplayName ??
                    caseStudy.client ??
                    "this client"}{" "}
                  covered the following work.
                </p>
                <ul className={styles.scope}>
                  {solutionSteps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
          {(caseStudy.result || caseStudy.outcome) && (
            <section
              className={styles.chapter}
              aria-labelledby="project-result"
            >
              <h2 id="project-result">The Result</h2>
              <p>{caseStudy.result || caseStudy.outcome}</p>
            </section>
          )}
          {caseStudy.quote?.text && (
            <figure className={styles.quote}>
              <blockquote>{caseStudy.quote.text}</blockquote>
              {(caseStudy.quote.author || caseStudy.quote.role) && (
                <figcaption>
                  {[caseStudy.quote.author, caseStudy.quote.role]
                    .filter(Boolean)
                    .join(" · ")}
                </figcaption>
              )}
            </figure>
          )}
        </Container>
      </article>
      <section className={styles.enquiry}>
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2>Let’s talk about your next infrastructure project.</h2>
            <p>
              Tell us about your site and requirements. Our team can help you
              plan the next step.
            </p>
          </div>
          <ButtonLink href="/book-consultation">
            Make an enquiry
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          {relatedServices.length > 0 && (
            <div className={styles.services}>
              <h2>Explore the services behind this project</h2>
              <div className="flex flex-wrap gap-3">
                {relatedServices.map((service) => {
                  const pillar = findPillar(service);
                  return pillar ? (
                    <ButtonLink
                      key={service}
                      href={`/services/${service}`}
                      variant="secondary"
                    >
                      {pillar.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </ButtonLink>
                  ) : null;
                })}
              </div>
            </div>
          )}

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
    </>
  );
}
