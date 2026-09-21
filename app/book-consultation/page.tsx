import Image from "next/image";
import {
  BriefcaseBusiness,
  Headphones,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { PartnerLogoMarquee } from "@/components/sections/partner-logo-marquee";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Book a Data Centre Infrastructure Consultation | Ideal Solutions",
  description:
    "Discuss your data centre, network, Smart Hands, hardware, security or infrastructure support requirements with Ideal Solutions in Nigeria.",
  path: "/book-consultation",
  keywords: [
    "Data Centre Infrastructure Consultation Nigeria",
    "IT infrastructure consultation Nigeria",
    "data centre project consultation",
    "Smart Hands consultation Nigeria",
    "network infrastructure consultation",
    "server deployment consultation Nigeria",
  ],
});

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "Onsite",
    label: "Onsite Execution",
  },
  {
    icon: Headphones,
    value: "Technical",
    label: "Technical Support",
  },
  {
    icon: ShieldCheck,
    value: "End-to-End",
    label: "End-to-End Coordination",
  },
];

export default function BookConsultationPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Book a Data Centre Infrastructure Consultation | Ideal Solutions",
            url: absoluteUrl("/book-consultation"),
            description:
              "Discuss your data centre, network, Smart Hands, hardware, security or infrastructure support requirements with Ideal Solutions in Nigeria.",
            about: [
              "IT infrastructure consultation",
              "Smart Hands consultation",
              "Network infrastructure consultation",
              "Server deployment consultation",
            ],
            provider: {
              "@type": "Organization",
              "@id": `${absoluteUrl("/")}#organization`,
              name: "Ideal Solutions",
            },
            potentialAction: {
              "@type": "CommunicateAction",
              target: absoluteUrl("/book-consultation"),
              name: "Request a technical consultation",
            },
          },
        ]}
      />
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)] py-12 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute left-0 top-0 hidden h-56 w-56 opacity-55 [background-image:radial-gradient(#90b7f8_1.3px,transparent_1.3px)] [background-size:15px_15px] lg:block" />

        <Container className="relative grid gap-10 xl:grid-cols-[0.96fr_1.04fr] xl:items-center">
          <div className="relative min-h-[42rem] overflow-hidden rounded-lg lg:min-h-[45rem] xl:rounded-none">
            <Image
              src="/image/service-details/data-centre-buildout.webp"
              alt="Data centre infrastructure corridor for Ideal Solutions consultation planning"
              fill
              priority
              className="object-cover object-left"
              sizes="(min-width: 1280px) 46vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,0.08)_0%,rgba(248,251,255,0.9)_42%,#f8fbff_72%,#f8fbff_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,255,0.96)_0%,rgba(248,251,255,0.7)_22%,rgba(248,251,255,0.72)_72%,#f8fbff_100%)]" />

            <div className="relative flex min-h-[42rem] flex-col justify-center px-5 py-10 sm:px-8 lg:min-h-[45rem] lg:px-12">
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-[-0.055em] text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
                Let&apos;s Plan the Right Infrastructure Support for Your
                Environment.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#34435c] sm:text-lg">
                Whether you are planning a deployment, expanding network
                infrastructure, supporting a remote engineering team or
                improving an existing environment, Ideal Solutions helps you
                define the right execution path.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <article
                      key={stat.value}
                      className="rounded-lg border border-[color:rgba(11,18,32,0.1)] bg-white/84 p-5 shadow-[0_18px_55px_rgba(11,18,32,0.06)] backdrop-blur"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#175be8,#053fae)] text-white shadow-[0_14px_35px_rgba(23,91,232,0.28)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-base font-medium leading-6 text-[var(--color-ink)]">
                        {stat.label}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-5 rounded-lg border border-white/72 bg-white/55 p-5 shadow-[0_18px_50px_rgba(47,107,255,0.08)] backdrop-blur">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d8e7ff] text-[#175be8]">
                  <UsersRound className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                    The right infrastructure project starts with a clear
                    requirement.
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/80 bg-white/92 p-5 shadow-[0_30px_90px_rgba(11,18,32,0.11)] backdrop-blur sm:p-7 lg:p-8">
            <LeadForm
              context="consultation"
              title="Talk to an Ideal Solutions Infrastructure Specialist"
              description="Tell us about the environment, required work, location, timeline and any technical constraints. Our team will review the requirement and help identify the appropriate next step."
              className="border-0 bg-transparent p-0 shadow-none"
              showEyebrow={false}
              submitLabel="Discuss Your Requirements"
              serviceOptions={[
                "Select the service you need",
                "Data Centre Deployment & Infrastructure",
                "Smart Hands & Technical Support",
                "Server, Storage & Hardware",
                "Network Infrastructure & Connectivity",
                "Data Centre Security & Safety",
                "Infrastructure Assessment & Optimisation",
                "Data Centre Project & Lifecycle Management",
                "Multiple Services / Not Sure Yet",
              ]}
              fullWidthSubmit
            />
          </div>
        </Container>
      </section>

      <PartnerLogoMarquee />
    </>
  );
}
