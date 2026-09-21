import Image from "next/image";
import {
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { CaseStudyCard } from "@/components/sections/case-study-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Data Centre Infrastructure Case Studies Nigeria | Ideal Solutions",
  description:
    "Explore Ideal Solutions data centre and IT infrastructure project case studies across deployment, networking, Smart Hands, hardware, security and lifecycle support in Nigeria.",
  path: "/case-studies",
  keywords: [
    "Data Centre Infrastructure Case Studies Nigeria",
    "data centre projects Nigeria",
    "data centre deployment case studies",
    "IT infrastructure projects Nigeria",
    "rack and stack project Nigeria",
    "network infrastructure case study Nigeria",
    "Smart Hands projects Nigeria",
    "server deployment projects Nigeria",
    "data centre implementation Nigeria",
    "enterprise IT infrastructure projects",
  ],
});

export const revalidate = false;

const processSteps = [
  ["Plan", "Define the scope, environment and execution requirements."],
  ["Execute", "Carry out the approved technical work onsite."],
  ["Verify", "Review completed work before handover."],
] as const;

const proofCards = [
  {
    icon: ShieldCheck,
    title: "Controlled Execution",
    body: "Infrastructure work is carried out around the approved scope, site conditions and existing environment.",
  },
  {
    icon: Workflow,
    title: "Operational Readiness",
    body: "Installation is not treated as complete simply because equipment has been mounted or connected.",
  },
  {
    icon: ClipboardCheck,
    title: "Clear Handover",
    body: "Completed work, outstanding actions and relevant project information are brought into a clearer handover.",
  },
];

export default async function CaseStudiesPage() {
  const publishedProjects = await getCaseStudies();
  const featured =
    publishedProjects.find((project) => project.featured) ??
    publishedProjects[0];
  const remaining = publishedProjects.filter(
    (project) => project.slug !== featured?.slug,
  );

  return (
    <>
      <section className="overflow-hidden bg-[var(--color-ink)] text-white">
        <Container className="grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#19d5ff]">
              Case Studies
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] sm:text-6xl">
              Infrastructure Projects Built Around Operational Readiness.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              From deployment and network infrastructure to Smart Hands,
              hardware and security systems, explore how technical requirements
              become structured onsite execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book-consultation">
                Discuss a Similar Requirement
              </ButtonLink>
              <ButtonLink href="/services" className="text-black">
                Explore Our Capabilities
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/8 shadow-[0_32px_90px_rgba(0,0,0,0.26)]">
            <div className="relative aspect-[16/10]">
              <Image
                src="/image/IT%20Infrastructure.png"
                alt="Technical infrastructure environment prepared for onsite execution"
                fill
                priority
                quality={56}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.18),rgba(11,18,32,0.68))]" />
            </div>
            <div className="grid gap-3 border-t border-white/10 bg-[rgba(11,18,32,0.78)] p-5 backdrop-blur sm:p-6 md:grid-cols-3 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 lg:rounded-[1.25rem] lg:border lg:bg-[rgba(11,18,32,0.7)]">
              {processSteps.map(([label, body]) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 text-xs leading-6 text-white/68">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {proofCards.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
                >
                  <Icon className="h-6 w-6 text-[var(--color-electric)]" />
                  <h2 className="mt-5 text-2xl font-semibold text-[var(--color-ink)]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
              See How Infrastructure Requirements Become Onsite Execution.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Every infrastructure project begins with a different requirement.
              Some involve deploying new equipment. Others require network
              changes, onsite technical support, remediation or better
              visibility into an existing environment.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Our case studies show how Ideal Solutions approaches those
              requirements — from understanding the environment and planning the
              work to execution, verification and handover.
            </p>
          </div>

          {featured ? (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                Featured Project
              </p>
              <CaseStudyCard caseStudy={featured} featured />
            </div>
          ) : null}

          {remaining.length ? (
            <div className="mt-16">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
                  More Infrastructure Projects
                </h2>
                <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                  Explore deployment, network, hardware, security and
                  technical-support projects delivered across different
                  infrastructure requirements.
                </p>
              </div>
              <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                {remaining.map((caseStudy) => (
                  <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)]">
              Have an Infrastructure Requirement of Your Own?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Whether you are planning a deployment, supporting a remote
              technical team or improving an existing environment, bring us the
              requirement and we’ll help determine the right execution path.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation">
              Discuss Your Requirements
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore Our Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
