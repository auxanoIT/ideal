"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { InteractiveServicesSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type InteractiveServicesProps = {
  section: InteractiveServicesSection;
};

const serviceCardImages: Record<string, { src: string; alt: string }> = {
  "software-hotspot": {
    src: "/image/service-details/software-cloud-microsoft-365.webp",
    alt: "Cloud software and productivity tools configured for business teams",
  },
  "security-hotspot": {
    src: "/image/service-details/cctv-camera-coverage.webp",
    alt: "Commercial CCTV camera coverage for physical security",
  },
  "infrastructure-hotspot": {
    src: "/image/service-details/network-cabling-rack.webp",
    alt: "Structured cabling and rack infrastructure installation",
  },
  "it-management-hotspot": {
    src: "/image/service-details/managed-technical-help-desk.webp",
    alt: "Managed IT help desk support for business users",
  },
  "networking-hotspot": {
    src: "/image/service-details/network-design-diagrams.webp",
    alt: "Network design diagrams for infrastructure planning",
  },
  "hardware-support-hotspot": {
    src: "/image/service-details/hardware-bulk-procurement.webp",
    alt: "Hardware procurement and deployment preparation",
  },
  "hardware-hotspot": {
    src: "/image/service-details/hardware-desktop-laptop-devices.webp",
    alt: "Business desktops and laptops prepared for deployment",
  },
  "data-centre-hotspot": {
    src: "/image/service-details/data-centre-buildout.webp",
    alt: "Data centre build-out and server-room readiness",
  },
};

function getServiceCardImage(itemId: string) {
  return serviceCardImages[itemId] ?? {
    src: "/image/servces.png",
    alt: "Integrated Ideal Solutions service environment",
  };
}

export function InteractiveServices({ section }: InteractiveServicesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSceneInView, setIsSceneInView] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const activeItem = section.items.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSceneInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.32 },
    );

    observer.observe(scene);

    return () => {
      observer.disconnect();
    };
  }, []);

  function getPanelPositionClass(
    placement: NonNullable<
      InteractiveServicesSection["items"][number]["panelPlacement"]
    > = "right",
  ) {
    switch (placement) {
      case "left":
        return "left-auto right-[calc(100%+1rem)] top-1/2 -translate-y-1/2";
      case "bottom":
        return "left-1/2 top-[calc(100%+1rem)] -translate-x-1/2";
      case "right":
      default:
        return "left-[calc(100%+1rem)] top-1/2 -translate-y-1/2";
    }
  }

  return (
    <section className="bg-[linear-gradient(180deg,#eef3f8_0%,#f7fafc_100%)] py-18 sm:py-22">
      <Container>
        <div className="mx-auto max-w-4xl text-left lg:text-center">
          <h2 className="mx-auto max-w-3xl text-balance text-[2.15rem] font-semibold leading-[1.02] tracking-normal text-[var(--color-ink)] sm:text-[2.6rem] lg:text-[3rem]">
            {section.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)] lg:hidden">
            {section.description}
          </p>
        </div>

        <div className="-mx-4 mt-8 snap-x snap-mandatory overflow-x-auto px-4 pb-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-5">
            {section.items.map((item) => {
              const image = getServiceCardImage(item.id);

              return (
                <article
                  key={item.id}
                  className="w-[20rem] snap-start overflow-hidden rounded-[0.45rem] bg-white text-[var(--color-ink)]"
                >
                  <div className="relative aspect-[1.34] bg-[var(--color-cloud)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="320px"
                      quality={56}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold tracking-normal text-[var(--color-ink)]">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                      {item.description}
                    </p>
                    <Link
                      href={item.ctaHref}
                      className="mt-6 inline-flex min-w-[8.5rem] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#06131f] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-[#0A3047]"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div ref={sceneRef} className="mt-10 hidden lg:block">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:rgba(17,24,39,0.08)] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
            <div className="relative aspect-[16/10] min-h-[28rem] w-full sm:min-h-[34rem] lg:min-h-[46rem]">
              <Image
                src={section.imageSrc}
                alt={section.imageAlt}
                fill
                priority={false}
                sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 92vw, 100vw"
                className={cn(
                  "object-cover transition duration-500",
                  activeItem && "scale-[1.01]",
                )}
              />

              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-[rgba(4,12,24,0)] transition duration-300",
                  activeItem && "bg-[rgba(4,12,24,0.20)]",
                )}
              />

              {section.items.map((item, index) => {
                const isActive = item.id === activeId;
                const isDimmed = activeItem && !isActive;
                const size = item.size ?? 72;
                const panelPlacement = item.panelPlacement ?? "right";
                const targetSize = item.targetSize ?? Math.round(size * 0.38);
                const targetOffsetX = item.targetOffsetX ?? 50;
                const targetOffsetY = item.targetOffsetY ?? 72;

                return (
                  <motion.div
                    key={item.id}
                    className={cn(
                      "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition duration-500",
                      isDimmed && "opacity-42",
                    )}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                  >
                    <motion.button
                      type="button"
                      aria-pressed={isActive}
                      aria-label={item.label}
                      onClick={() => {
                        setActiveId((current) =>
                          current === item.id ? null : item.id,
                        );
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 20,
                      }}
                      className={cn(
                        "group relative h-full w-full rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric)] focus-visible:ring-offset-4 focus-visible:ring-offset-white",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute rounded-full blur-md transition duration-500",
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100",
                        )}
                        style={{
                          left: `${targetOffsetX}%`,
                          top: `${targetOffsetY}%`,
                          width: `${targetSize}px`,
                          height: `${targetSize}px`,
                          transform: "translate(-50%, -50%)",
                          background: `radial-gradient(circle, ${item.glowFrom ?? "rgba(56,189,248,0.42)"} 0%, ${item.glowTo ?? "rgba(59,130,246,0.16)"} 56%, transparent 76%)`,
                        }}
                      />
                      <span
                        className={cn(
                          "absolute rounded-full border transition duration-500",
                          isActive
                            ? "border-white/90 shadow-[0_0_0_3px_rgba(255,255,255,0.12),0_0_24px_rgba(56,189,248,0.28)]"
                            : "border-white/8 group-hover:border-white/65 group-hover:shadow-[0_0_0_3px_rgba(56,189,248,0.12),0_0_22px_rgba(56,189,248,0.2)]",
                        )}
                        style={{
                          left: `${targetOffsetX}%`,
                          top: `${targetOffsetY}%`,
                          width: `${targetSize}px`,
                          height: `${targetSize}px`,
                          transform: "translate(-50%, -50%)",
                          background: isActive
                            ? `linear-gradient(135deg, ${item.glowFrom ?? "rgba(56,189,248,0.14)"}, ${item.glowTo ?? "rgba(59,130,246,0.06)"})`
                            : "transparent",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute rounded-full border border-white/60"
                        style={{
                          left: `${targetOffsetX}%`,
                          top: `${targetOffsetY}%`,
                          width: `${targetSize}px`,
                          height: `${targetSize}px`,
                          transform: "translate(-50%, -50%)",
                          opacity: 0,
                          animation: isSceneInView
                            ? `service-hotspot-shine 2.4s ease-out ${index * 0.16}s infinite`
                            : "none",
                        }}
                      />
                      <span className="sr-only">{item.label}</span>
                    </motion.button>

                    <AnimatePresence>
                      {isActive ? (
                        <motion.div
                          key={`${item.id}-panel`}
                          initial={{
                            opacity: 0,
                            y: panelPlacement === "bottom" ? -8 : 0,
                            x:
                              panelPlacement === "right"
                                ? -10
                                : panelPlacement === "left"
                                  ? 10
                                  : 0,
                            scale: 0.97,
                          }}
                          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                          exit={{
                            opacity: 0,
                            y: panelPlacement === "bottom" ? -6 : 0,
                            x:
                              panelPlacement === "right"
                                ? -8
                                : panelPlacement === "left"
                                  ? 8
                                  : 0,
                            scale: 0.985,
                          }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={cn(
                            "absolute z-40 w-[16rem] sm:w-[18rem]",
                            getPanelPositionClass(panelPlacement),
                          )}
                        >
                          <article className="relative rounded-[1.25rem] border border-white/82 bg-white/92 p-4 shadow-[0_22px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-5">
                            <button
                              type="button"
                              aria-label="Close service details"
                              onClick={() => setActiveId(null)}
                              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:rgba(148,163,184,0.22)] bg-[rgba(241,245,249,0.9)] text-[var(--color-muted)] transition duration-300 hover:text-[var(--color-ink)]"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>

                            

                            <h3 className="max-w-[13rem] pr-8 text-[1rem] font-semibold leading-[1.25] tracking-normal text-[var(--color-ink)] sm:text-[1.08rem]">
                              {item.title}
                            </h3>
                            <p className="mt-2.5 text-[0.8rem] leading-6 text-[var(--color-muted)]">
                              {item.description}
                            </p>
                            <div className="mt-4">
                              <ButtonLink
                                href={item.ctaHref}
                                variant="secondary"
                                className="!rounded-full !border-[color:rgba(15,23,42,0.12)] !bg-white !px-4 !py-2 !text-[0.75rem] !font-semibold"
                              >
                                {item.ctaLabel}
                              </ButtonLink>
                            </div>
                          </article>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <style jsx global>{`
        @keyframes service-hotspot-shine {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.82);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.48);
          }

          35% {
            opacity: 0.85;
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.38);
            box-shadow: 0 0 34px 10px rgba(56, 189, 248, 0.18);
          }
        }
      `}</style>
    </section>
  );
}
