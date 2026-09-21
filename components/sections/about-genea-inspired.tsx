"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ClipboardCheck,
  DatabaseBackup,
  Handshake,
  KeyRound,
  LifeBuoy,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  Phone,
  Server,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { PartnerLogoMarquee } from "@/components/sections/partner-logo-marquee";
import { Container } from "@/components/ui/container";
import {
  StatMetricIcon,
  type StatMetricIconKind,
} from "@/components/ui/stat-metric-icon";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const metrics = [
  { value: "2012", label: "Founded", icon: "clipboard" },
  { value: "15+", label: "Years ICT delivery", icon: "award" },
  { value: "35%", label: "Client cost savings", icon: "savings" },
  { value: "24/7", label: "Dedicated support", icon: "headset" },
] satisfies Array<{
  value: string;
  label: string;
  icon: StatMetricIconKind;
}>;

const values = [
  {
    icon: UserCheck,
    title: "Execution with Care",
    description:
      "Work carefully around live infrastructure and existing operations.",
  },
  {
    icon: TrendingUp,
    title: "Operational Discipline",
    description:
      "Follow agreed scope, site procedures and structured delivery methods.",
  },
  {
    icon: Lightbulb,
    title: "Technical Accountability",
    description:
      "Leave completed work clearer, documented and easier to manage.",
  },
  {
    icon: Handshake,
    title: "Practical Problem Solving",
    description: "Focus on actions that help infrastructure move forward.",
  },
  {
    icon: ClipboardCheck,
    title: "Partnership Mindset",
    description: "Extend client teams without taking control away from them.",
  },
  {
    icon: Network,
    title: "Clarity & Communication",
    description: "Keep requirements, progress and handover easy to understand.",
  },
];

const services = [
  {
    icon: ShieldCheck,
    title: "Data Centre Deployment",
    description:
      "Rack-and-stack, equipment installation, server deployment, testing and infrastructure changes.",
  },
  {
    icon: Network,
    title: "Smart Hands & Technical Support",
    description:
      "Onsite execution for remote teams and infrastructure requiring physical attention.",
  },
  {
    icon: LifeBuoy,
    title: "Server, Storage & Hardware",
    description: "Server, storage, hardware procurement and lifecycle support.",
  },
  {
    icon: Server,
    title: "Network & Connectivity",
    description:
      "Network equipment, structured cabling, configuration, routing and documentation.",
  },
  {
    icon: KeyRound,
    title: "Security & Safety Systems",
    description:
      "Access control, CCTV, fire alarm, mantrap and automated entry systems.",
  },
  {
    icon: DatabaseBackup,
    title: "Assessment & Lifecycle Support",
    description:
      "Audits, remediation, project management, handover and ongoing support.",
  },
];

const leaders = [
  {
    name: "Olatunji Aduloju",
    role: "Managing Director",
    office: "Corporate Office, Lagos",
    contact: "olatunji@auxanosolutions.net",
    image: "/image/about/Olatunji Aduloju.jpeg",
  },
  {
    name: "Tosin Ayorinde",
    role: "IT Business & Technical Support Lead",
    office: "Corporate Office, Lagos",
    contact: "tosin@auxanosolutions.net",
    image: "/image/about/Tosin Ayorinde.jpeg",
  },
  {
    name: "Kayode Mejabi",
    role: "Regional Technical Support Lead",
    office: "Abuja Office",
    contact: "kayode@auxanosolutions.net",
    image: "/image/about/Kayode Mejabi.jpeg",
  },
  {
    name: "Mahmoud Khallaf",
    role: "Operations & Technical Lead, North Africa",
    office: "Cairo Office",
    contact: "mahmoudk@auxanosolutions.net",
    image: "/image/about/Mahmoud Khallaf.jpeg",
  },
];

const offices = [
  {
    title: "Corporate Office",
    location: "Lagos, Nigeria",
    address:
      "26, Adeshina Street, Off Oluwole Philips, Obafemi Awolowo Way, Ikeja, Lagos.",
    phone: "08034247062",
    email: "ask@auxanosolutions.net",
  },
  {
    title: "Abuja Office",
    location: "FCT, Nigeria",
    address:
      "4th Floor, ChurchGate Tower C, Constitution Avenue, Central Business District, FCT, Nigeria.",
    phone: "0702-639-3446",
    email: "kayode@auxanosolutions.net",
  },
  {
    title: "Cairo Office",
    location: "Cairo, Egypt",
    address:
      "53, Capital Mall, behind the Court, Fifth Settlement, New Cairo, Egypt.",
    phone: "+20 101 639 7193",
    email: "mahmoudk@auxanosolutions.net",
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : fadeUp}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  center = false,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  inverse?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}>
      <p
        className={
          inverse
            ? "text-sm font-semibold uppercase tracking-normal text-white/70"
            : "text-sm font-semibold uppercase tracking-normal text-[#ed6a39]"
        }
      >
        {eyebrow}
      </p>
      <h2
        className={
          inverse
            ? "mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl"
            : "mt-4 text-balance text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl"
        }
      >
        {title}
      </h2>
      {description ? (
        <p
          className={
            inverse
              ? "mt-5 text-pretty text-base leading-8 text-white/72 sm:text-lg"
              : "mt-5 text-pretty text-base leading-8 text-[var(--color-muted)] sm:text-lg"
          }
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      style={variant === "secondary" ? { color: "#0b1220" } : undefined}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-full bg-[#f97316] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ea580c]"
          : "inline-flex items-center gap-2 rounded-full border border-[color:rgba(10,48,71,0.16)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:border-[color:rgba(47,107,255,0.4)]"
      }
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function AboutGeneaInspired() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden bg-[#f7faff] text-[var(--color-ink)]">
      <section className="overflow-hidden bg-white">
        <h1 className="sr-only">
          Reliable Data Centre Infrastructure Support for Critical Environments.
        </h1>
        <div className="relative hidden min-h-[35rem] md:block">
          <Image
            src="/image/It_management.jpg"
            alt="Ideal Solutions technical specialist reviewing an infrastructure work order"
            fill
            priority
            className="object-cover object-[center_36%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.96)_30%,rgba(255,255,255,0.72)_48%,rgba(255,255,255,0.18)_68%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0)_22%,rgba(255,255,255,0)_78%,rgba(255,255,255,0.75)_100%)]" />

          <Container className="relative flex min-h-[35rem] items-center">
            <motion.div
              className="max-w-[34rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mt-4 max-w-[30rem] text-balance text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--color-ink)] lg:text-[3.2rem]">
                Reliable Data Centre Infrastructure Support for Critical
                Environments.
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-muted)]">
                Ideal Solutions provides onsite technical execution and
                infrastructure support for data centres, enterprise IT
                environments and organisations that need dependable hands on the
                ground in Nigeria.
              </p>
              <div className="mt-8 flex items-center gap-5">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold !text-white transition hover:-translate-y-0.5"
                >
                  Book Consultation
                </Link>
                <a
                  href="#about-purpose"
                  aria-label="Scroll to about purpose"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/18 bg-white/70 text-black backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <ArrowDown className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </Container>
        </div>

        <div className="md:hidden">
          <div className="relative min-h-[19rem] bg-[var(--color-cloud)]">
            <Image
              src="/image/It_management.jpg"
              alt="Ideal Solutions technical specialist reviewing an infrastructure work order"
              fill
              priority
              className="object-cover object-[center_32%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.78)_100%)]" />
          </div>

          <Container className="overflow-hidden bg-[#f4f6f8] py-10">
            <p className="mt-4 max-w-[20rem] text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[var(--color-ink)]">
              Reliable Data Centre Infrastructure Support for Critical
              Environments.
            </p>
            <p className="mt-5 max-w-[20rem] text-sm leading-7 text-[var(--color-muted)]">
              Ideal Solutions provides onsite technical execution and
              infrastructure support for data centres, enterprise IT
              environments and organisations that need dependable hands on the
              ground in Nigeria.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <Link
                href="/book-consultation"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold !text-white transition hover:-translate-y-0.5"
              >
                Book Consultation
              </Link>
              <a
                href="#about-purpose"
                aria-label="Scroll to about purpose"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/18 bg-white text-black"
              >
                <ArrowDown className="h-5 w-5" />
              </a>
            </div>
          </Container>
        </div>
      </section>

      <section className="bg-white pb-14 pt-4 sm:pb-18">
        <Container>
          <div className="overflow-hidden rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white">
            <div className="grid divide-y divide-[color:rgba(53,92,154,0.18)] md:grid-cols-4 md:divide-x md:divide-y-0">
              {metrics.map((metric) => {
                return (
                  <article
                    key={metric.label}
                    className="relative flex min-h-[16rem] flex-col items-center justify-center px-6 py-9 text-center"
                  >
                    <StatMetricIcon kind={metric.icon} />
                    <p className="mt-8 text-[3.5rem] font-semibold leading-none tracking-normal text-[#123f91] sm:text-[4rem]">
                      {metric.value}
                    </p>
                    <span className="mt-6 h-1 w-16 rounded-full bg-[#f97316]" />
                    <p className="mt-6 text-lg font-semibold text-[#1f2937]">
                      {metric.label}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section id="about-purpose" className="bg-white py-16 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em]  text-[#ed6a39]">
              Our Purpose
            </p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
              Helping organisations operate with more reliable, supportable
              infrastructure.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              We close the gap between infrastructure planning and onsite
              execution — helping teams deploy, support and maintain critical
              environments with greater confidence.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#eef4ff] py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative h-96 overflow-hidden rounded-lg bg-[#0A3047]">
              <Image
                src="/image/IT Infrastructure.png"
                alt="Ideal Solutions engineer working with enterprise IT infrastructure"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0A3047]">
                Enterprise-grade delivery
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ed6a39]">
              Local Execution. Enterprise Standards.
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
              Specialised data centre and IT infrastructure support in Nigeria.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              <p>
                Ideal Solutions supports data centre operators, enterprise IT
                teams, system integrators, OEMs and managed service providers
                that need skilled onsite execution.
              </p>
              <p>
                Our capabilities span deployment, Smart Hands, networking,
                servers and hardware, security systems, infrastructure audits
                and lifecycle support.
              </p>
              <p>
                We help clients move projects forward while keeping operational
                control.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <PartnerLogoMarquee />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="How We Work"
            title="The standards behind every Ideal Solutions engagement."
            description="How we plan, execute and hand over infrastructure work."
            center
          />
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.04}>
                  <article className="group h-full rounded-lg border border-[color:rgba(10,48,71,0.1)] bg-white p-5 shadow-[0_18px_48px_rgba(10,48,71,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#ed6a39]/40">
                    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#ed6a39]/15 bg-[#ed6a39]/10 text-[#ed6a39] shadow-[0_14px_30px_rgba(237,106,57,0.14)] transition duration-300 group-hover:border-[#ed6a39] group-hover:bg-[#ed6a39] group-hover:text-white">
                      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ed6a39] transition group-hover:bg-white/85" />
                      <span className="absolute -bottom-3 -left-3 h-9 w-9 rounded-full border border-[#ed6a39]/20 transition group-hover:border-white/30" />
                      <Icon className="relative h-6 w-6 stroke-[2.2]" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(135deg,#355C9A_100%,#4E73B8_50%,#6C8FD6_100%)] py-16 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionIntro
              eyebrow="What We Deliver"
              title="Technical execution across the infrastructure lifecycle."
              description="From deployment and connectivity to support, optimisation and future change."
              inverse
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.title} delay={index * 0.04}>
                  <article className="min-h-52 rounded-lg border border-white/12 bg-white/[0.07] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#0A3047]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">
                      {service.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#eef4ff] py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Our Team"
            title="The people behind Ideal Solutions execution."
            description="Technical, operational and leadership professionals helping clients move infrastructure projects forward."
            center
          />
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader, index) => (
              <Reveal key={leader.name} delay={index * 0.05}>
                <article className="group overflow-hidden rounded-lg border border-[color:rgba(10,48,71,0.1)] bg-white shadow-[0_20px_55px_rgba(10,48,71,0.08)]">
                  <div className="relative aspect-[4/4.6] overflow-hidden bg-[#0A3047]">
                    <Image
                      src={leader.image}
                      alt={`${leader.name}, ${leader.role}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-[#f97316]">
                      {leader.role}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
                      {leader.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {leader.office}
                    </p>
                    <a
                      href={`mailto:${leader.contact}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-electric)]"
                    >
                      Contact
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Our Presence"
            title="Local presence for onsite infrastructure support."
            description="Our teams support infrastructure projects, technical interventions and ongoing requirements across Nigeria."
            center
          />
          <div className="mt-11 grid gap-5 lg:grid-cols-3">
            {offices.map((office, index) => (
              <Reveal key={office.title} delay={index * 0.06}>
                <article className="h-full rounded-lg border border-[color:rgba(10,48,71,0.1)] bg-[#f7faff] p-6 shadow-[0_18px_50px_rgba(10,48,71,0.06)]">
                  <h3 className="mt-5 text-2xl font-semibold text-[var(--color-ink)]">
                    {office.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-electric)]">
                    {office.location}
                  </p>
                  <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                    <p className="flex gap-3">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#f97316]" />
                      <span>{office.address}</span>
                    </p>
                    <p className="flex gap-3">
                      <Phone className="mt-1 h-4 w-4 shrink-0 text-[#f97316]" />
                      <span>{office.phone}</span>
                    </p>
                    <p className="flex gap-3">
                      <Mail className="mt-1 h-4 w-4 shrink-0 text-[#f97316]" />
                      <span>{office.email}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(135deg,#355C9A_100%,#4E73B8_50%,#6C8FD6_100%)] py-16 text-white sm:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-5xl">
              Let&apos;s discuss the right infrastructure support for your
              environment.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              From deployment and Smart Hands to networking, hardware, security
              and lifecycle support, bring us the requirement.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-wrap gap-3 lg:justify-end">
            <CtaLink href="/book-consultation">Book Consultation</CtaLink>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
