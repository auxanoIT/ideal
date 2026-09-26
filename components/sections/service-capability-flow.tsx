"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Service, ServiceCapabilitySection } from "@/lib/types";
import { cn } from "@/lib/utils";

type ServiceCapabilityFlowProps = {
  service: Service;
  sections: ServiceCapabilitySection[];
};

export function ServiceCapabilityFlow({
  service,
  sections,
}: ServiceCapabilityFlowProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );

  useEffect(() => {
    if (!sectionIds.length) {
      return;
    }

    let animationFrame = 0;

    const getSectionNodes = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node));

    const syncFromScroll = () => {
      const sectionNodes = getSectionNodes();
      const activationOffset = 190;
      const currentSection =
        sectionNodes
          .filter(
            (node) => node.getBoundingClientRect().top <= activationOffset,
          )
          .at(-1) ?? sectionNodes[0];

      if (currentSection?.id) {
        setActiveSection(currentSection.id);
      }
    };

    const scheduleSync = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(syncFromScroll);
    };

    const syncFromHash = () => {
      const nextId = window.location.hash.replace("#", "");
      if (sectionIds.includes(nextId)) {
        setActiveSection(nextId);
      }
    };

    syncFromScroll();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [sectionIds]);

  return (
    <section className="bg-white">
      <div className="sticky top-20 z-30 border-y border-[#b69a60]/30 bg-[#102444]">
        <Container className="overflow-x-auto">
          <nav
            aria-label={`${service.title} capability navigation`}
            className="mx-auto flex w-max min-w-full items-center justify-center gap-12 py-4 text-sm font-semibold text-white sm:gap-16 lg:gap-20"
          >
            {sections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "border-b-2 pb-3 transition",
                    isActive
                      ? "border-[#f2a900] text-[#f4ca77]"
                      : "border-transparent text-white/78 hover:border-white/40 hover:text-white",
                  )}
                >
                  {section.navLabel}
                </a>
              );
            })}
          </nav>
        </Container>
      </div>

      <Container className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
        {sections.map((section, index) => {
          const reverse = index % 2 === 1;

          return (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-40 rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[#f8fbff] p-5 sm:p-7 lg:p-8"
            >
              <div
                className={cn(
                  "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center",
                  reverse && "lg:grid-cols-[1.05fr_0.95fr]",
                )}
              >
                <div
                  className={cn(
                    "relative min-h-[280px] overflow-hidden rounded-[1rem] bg-white shadow-[0_20px_70px_rgba(11,18,32,0.08)] sm:min-h-[360px]",
                    reverse && "lg:order-2",
                  )}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>

                <div className={cn(reverse && "lg:order-1")}>
                  <h2 className="text-balance text-3xl font-semibold tracking-[-0.045em] text-[var(--color-ink)] sm:text-4xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base font-semibold leading-8 text-[var(--color-ink)]">
                    {section.lead}
                  </p>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <ButtonLink href="/book-consultation" className="mt-7 min-h-11 bg-[#f2a900] bg-none text-[#102444] shadow-none hover:bg-[#ffd06b]">
                    Make an enquiry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </article>
          );
        })}
      </Container>

    </section>
  );
}
