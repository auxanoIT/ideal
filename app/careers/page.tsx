import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CircleCheck,
  Clock3,
  MapPin,
  Network,
  Server,
  UploadCloud,
  UsersRound,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getCareerOpenings, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Ideal Solutions to work on IT infrastructure, networking, CCTV, support, and business technology projects for serious operational environments.",
  path: "/careers",
});

export const revalidate = false;

const heroStats = [
  {
    icon: BriefcaseBusiness,
    value: "200+",
    label: "Projects Delivered",
  },
  {
    icon: Building2,
    value: "Enterprise",
    label: "IT Solutions",
  },
  {
    icon: Clock3,
    value: "24/7",
    label: "Support Operations",
  },
  {
    icon: UsersRound,
    value: "Multi-Industry",
    label: "Experience",
  },
];

const reasons = [
  {
    icon: Server,
    title: "Work on Real Infrastructure",
    description:
      "Deploy systems that power businesses and keep operations running securely and reliably.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Grow Across IT Disciplines",
    description:
      "Work across networking, cybersecurity, surveillance, infrastructure, and support environments.",
  },
  {
    icon: UsersRound,
    title: "Collaborative Technical Team",
    description:
      "Join experienced professionals who collaborate, solve problems, and deliver excellent outcomes for clients.",
  },
  {
    icon: BadgeCheck,
    title: "Career Growth",
    description:
      "Access continuous learning, certifications, and opportunities to grow your career in technology.",
  },
];

const lifeBullets = [
  "Hands-on experience with enterprise technologies",
  "Work on meaningful projects that create impact",
  "A culture of learning, accountability, and teamwork",
  "Tools, training, and support to help you grow",
];

const hiringSteps = [
  {
    title: "Application Review",
    description:
      "We evaluate your experience, skills, and alignment with our team.",
  },
  {
    title: "Initial Conversation",
    description:
      "A short conversation to learn more about you and your career goals.",
  },
  {
    title: "Technical Evaluation",
    description:
      "Technical discussion or practical assessment based on real-world scenarios.",
  },
  {
    title: "Final Decision",
    description:
      "Successful candidates receive offer details and onboarding information.",
  },
];

export default async function CareersPage() {
  const [openings, siteSettings] = await Promise.all([
    getCareerOpenings(),
    getSiteSettings(),
  ]);
  const careersEmail = siteSettings.email || "ask@auxanosolutions.net";
  const careerMailto = `mailto:${careersEmail}?subject=${encodeURIComponent(
    "Career Application - Ideal Solutions",
  )}&body=${encodeURIComponent(
    "Hello Ideal Solutions,\n\nI would like to apply for an open position. Please find my CV attached.\n\nName:\nRole of interest:\nPhone:\n\nThank you.",
  )}`;

  return (
    <div className="overflow-hidden bg-white text-[var(--color-ink)]">
      <section className="relative overflow-hidden bg-[#252b33] text-white">
        <div className="absolute inset-0">
          <Image
            src="/image/service-details/managed-services-monitoring.webp"
            alt="Ideal Solutions technical operations team monitoring enterprise infrastructure"
            fill
            priority
            className="object-cover object-center opacity-[0.78]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#252b33_0%,rgba(37,43,51,0.95)_28%,rgba(37,43,51,0.68)_52%,rgba(37,43,51,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,43,51,0.1)_0%,#252b33_100%)]" />
        </div>

        <Container className="relative pb-8 pt-20 sm:pt-24 lg:pt-28">
          <div className="max-w-2xl">
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Build technology environments businesses{" "}
              <span className="text-[#f2a900]">depend on.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/[0.82]">
              Join a team delivering infrastructure, security, networking,
              surveillance systems, managed IT support, and enterprise
              technology solutions across modern business environments.
            </p>
            <div className="mt-8">
              <ButtonLink href="#open-positions" className="gap-2 px-7">
                Open Positions
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 grid gap-3 rounded-lg border border-white/[0.12] bg-white/[0.08] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:grid-cols-4 md:divide-x md:divide-white/[0.12]">
            {heroStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-[#f2a900]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold leading-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-white/[0.72]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
              Why join Ideal Solutions?
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <article
                  key={reason.title}
                  className="h-full rounded-lg border border-[color:rgba(11,18,32,0.1)] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[color:rgba(242,169,0,0.14)] text-[#956600]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-6">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {reason.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-16 sm:pb-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
              Life at Ideal Solutions
            </h2>
            <p className="mt-4 text-base font-semibold text-[#956600]">
              Built around operational excellence.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              We believe reliable technology comes from structured execution,
              continuous learning, and teams that understand business
              environments deeply.
            </p>
            <div className="mt-6 space-y-3">
              {lifeBullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex gap-3 text-sm text-[var(--color-ink)]"
                >
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#956600]" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid h-[34rem] grid-cols-6 grid-rows-6 gap-3 max-sm:h-auto max-sm:grid-cols-1 max-sm:grid-rows-none">
            <div className="relative col-span-3 row-span-6 overflow-hidden rounded-lg bg-[#faf7f0] max-sm:col-span-1 max-sm:h-72">
              <Image
                src="/image/service-details/managed-technical-onsite-engineer.webp"
                alt="Ideal Solutions engineer supporting network infrastructure"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>
            <div className="relative col-span-3 row-span-3 overflow-hidden rounded-lg bg-[#faf7f0] max-sm:col-span-1 max-sm:h-56">
              <Image
                src="/image/service-details/managed-services-monitoring.webp"
                alt="Technical operations workspace with monitoring dashboards"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-lg bg-[#faf7f0] max-sm:col-span-1 max-sm:h-56">
              <Image
                src="/image/service-details/cctv-camera-coverage.webp"
                alt="Commercial CCTV system installed for business security"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 22vw, 100vw"
              />
            </div>
            <div className="relative col-span-1 row-span-3 overflow-hidden rounded-lg bg-[#faf7f0] max-sm:col-span-1 max-sm:h-56">
              <Image
                src="/image/service-details/door-access-credentials.webp"
                alt="Door access control system in a commercial building"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 16vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        id="open-positions"
        className="bg-[linear-gradient(180deg,#faf7f0_0%,#ffffff_100%)] py-16 sm:py-20"
      >
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                Open Positions
              </h2>
            </div>
          </div>

          {openings.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {openings.map((opening, index) => (
                <article
                  key={`${opening.title}-${index}`}
                  className="flex min-h-72 flex-col rounded-lg border border-[color:rgba(11,18,32,0.1)] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]"
                >
                  {opening.department ? (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-[#956600]">
                      {opening.department}
                    </p>
                  ) : null}
                  <h3 className="text-xl font-semibold leading-7 text-[var(--color-ink)]">
                    {opening.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
                    {opening.location ? (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#956600]" />
                        {opening.location}
                      </span>
                    ) : null}
                    {opening.employmentType ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#956600]" />
                        {opening.employmentType}
                      </span>
                    ) : null}
                  </div>
                  {opening.summary ? (
                    <p className="mt-5 text-sm leading-7 text-[var(--color-ink)]">
                      {opening.summary}
                    </p>
                  ) : null}
                  <div className="mt-auto pt-6">
                    <ButtonLink href={careerMailto} className="gap-2">
                      Submit Your CV
                      <UploadCloud className="h-4 w-4" />
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-dashed border-[color:rgba(11,18,32,0.16)] bg-white p-10 text-center shadow-[0_20px_55px_rgba(15,23,42,0.04)]">
              <Network className="mx-auto h-10 w-10 text-[#956600]" />
              <p className="mt-4 text-xl font-semibold text-[var(--color-ink)]">
                No open position.
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Please try checking again later.
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white pb-16 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
              Our Hiring Process
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step, index) => (
              <article key={step.title} className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#252b33] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-16 sm:pb-20">
        <Container>
          <div className="relative overflow-hidden rounded-lg bg-[#252b33] p-8 text-white sm:p-10 lg:p-12">
            <div className="absolute inset-y-0 right-0 w-1/2 opacity-[0.35]">
              <Image
                src="/image/service-details/network-cabling-rack.webp"
                alt="Structured network cabling inside a server rack"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#252b33_0%,rgba(37,43,51,0.5)_55%,rgba(37,43,51,0.18)_100%)]" />
            </div>
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white">
                  <BriefcaseBusiness className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-normal sm:text-3xl">
                  Ready to build meaningful IT solutions?
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/[0.72] sm:text-base">
                  Join Ideal Solutions and help businesses operate with more security,
                  reliability, and confidence.
                </p>
              </div>
              <ButtonLink href="#open-positions" className="gap-2 px-8">
                Explore Careers
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
