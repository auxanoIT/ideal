import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { IndustryChallengeTabs } from "@/components/sections/industry-challenge-tabs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getIndustryBySlug, getIndustries } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = false;

export async function generateStaticParams() {
  const industries = await getIndustries();

  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (slug === "multi-site-smes") {
    permanentRedirect("/industries/multi-site-businesses");
  }

  if (!industry) {
    return buildMetadata({
      title: "Industry not found",
      description: "The requested industry page could not be found.",
      path: `/industries/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: industry.seoTitle,
    description: industry.metaDescription,
    path: industry.href,
    imagePath: industry.heroImage.src,
    imageAlt: industry.heroImage.alt,
    keywords: [
      industry.primaryKeyword,
      ...industry.longTailKeywords,
      ...industry.environmentExamples,
      ...industry.primaryServiceSlugs,
    ],
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const featureItems = industry.whyReasons;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: industry.seoTitle,
            description: industry.heroDescription,
            url: absoluteUrl(industry.href),
            image: absoluteUrl(industry.heroImage.src),
            about: industry.environmentExamples,
            provider: {
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
                name: industry.title,
                item: absoluteUrl(industry.href),
              },
            ],
          },
        ]}
      />
      <section className="overflow-hidden bg-white">
        <h1 className="sr-only">Infrastructure for {industry.title}</h1>
        <div className="relative hidden min-h-[35rem] md:block">
          <Image
            src={industry.heroImage.src}
            alt={industry.heroImage.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.96)_30%,rgba(255,255,255,0.72)_48%,rgba(255,255,255,0.18)_68%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0)_22%,rgba(255,255,255,0)_78%,rgba(255,255,255,0.75)_100%)]" />

          <Container className="relative flex min-h-[35rem] items-center">
            <div className="max-w-[34rem]">
              <p className="max-w-[30rem] text-balance text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--color-ink)] lg:text-[3.2rem]">
                {industry.heroTitle}
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-muted)]">
                {industry.shortDescription}
              </p>
              <div className="mt-8 flex items-center gap-5">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold !text-white transition hover:-translate-y-0.5"
                >
                  Book Consultation
                </Link>
                <a
                  href="#industry-challenges"
                  aria-label="Scroll to industry challenges"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/18 bg-white/70 text-black backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <ArrowDown className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Container>
        </div>

        <div className="md:hidden">
          <div className="relative min-h-[19rem] bg-[var(--color-cloud)]">
            <Image
              src={industry.heroImage.src}
              alt={industry.heroImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.78)_100%)]" />
          </div>

          <Container className="bg-[#f4f6f8] py-10">
            <p className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-ink)]">
              {industry.heroTitle}
            </p>
            <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">
              {industry.shortDescription}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <Link
                href="/book-consultation"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold !text-white transition hover:-translate-y-0.5"
              >
                Book Consultation
              </Link>
              <a
                href="#industry-challenges"
                aria-label="Scroll to industry challenges"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/18 bg-white text-black"
              >
                <ArrowDown className="h-5 w-5" />
              </a>
            </div>
          </Container>
        </div>
      </section>

      <div id="industry-challenges">
        <IndustryChallengeTabs industry={industry} />
      </div>

      <section className="bg-[#f6f8fb] py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[24rem] overflow-hidden rounded-lg bg-white shadow-[0_22px_70px_rgba(11,18,32,0.08)]">
            <Image
              src={industry.heroImage.src}
              alt={industry.heroImage.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.2),rgba(8,17,31,0))]" />
          </div>

          <div>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl">
              {industry.whyTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              {industry.whyDescription}
            </p>

            <div className="mt-8 grid gap-6">
              {featureItems.map((item) => {
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--color-electric)] shadow-[0_12px_32px_rgba(11,18,32,0.07)]">
                      <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-ink)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            title={industry.solutionsTitle}
            description={industry.solutionsDescription}
            align="center"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {industry.solutions.map((service) => {
              return (
                <article
                  key={service.href}
                  className="overflow-hidden rounded-lg border border-[color:rgba(11,18,32,0.08)] bg-white shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
                >
                  <div className="relative min-h-[13.5rem] bg-[var(--color-cloud)]">
                    <Image
                      src={industry.heroImage.src}
                      alt={industry.heroImage.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 31vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-electric)]"
                    >
                      {service.linkLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#f6f8fb] py-16 sm:py-24">
        <Container>
          <LeadForm
            context="consultation"
            title={industry.formTitle}
            description={industry.formDescription}
            className="mx-auto max-w-5xl rounded-lg"
            headingAlign="center"
            showEyebrow={false}
            submitLabel={industry.formCta}
          />
        </Container>
      </section>
    </>
  );
}
