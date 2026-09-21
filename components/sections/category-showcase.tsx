"use client";

import { useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { CategoryShowcaseSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryShowcaseProps = {
  section: CategoryShowcaseSection;
};

export function CategoryShowcase({ section }: CategoryShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasSelectedTabRef = useRef(false);
  const tabsId = useId();
  const activeItem = section.items[activeIndex] ?? section.items[0] ?? null;
  const activeVideoPublicId = activeItem?.videoPublicId ?? section.videoPublicId;
  const activeVideoUrl = activeItem?.videoUrl ?? section.videoUrl;

  useEffect(() => {
    if (!hasSelectedTabRef.current) {
      return;
    }

    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, shouldReduceMotion]);

  function handleSelect(index: number) {
    if (index === activeIndex) {
      return;
    }

    hasSelectedTabRef.current = true;
    setActiveIndex(index);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % section.items.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + section.items.length) % section.items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = section.items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    tabRefs.current[nextIndex]?.focus();
    handleSelect(nextIndex);
  }

  function handleVideoReady(event: SyntheticEvent<HTMLVideoElement>) {
    event.currentTarget.muted = true;
    void event.currentTarget.play().catch(() => {
      // Browsers can still block autoplay in some contexts; muted playback props remain the fallback.
    });
  }

  if (!activeItem) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-t border-[#e8e3d9] bg-[#faf7f0] py-16 text-[#252b33] sm:py-20">
      <Container>
        {section.eyebrow && <p className="relative mb-4 text-center text-xs font-semibold uppercase tracking-[.2em] text-[#806019]">{section.eyebrow}</p>}
        <h2 className="relative mx-auto max-w-4xl text-balance text-center text-3xl font-semibold leading-[1.12] tracking-tight text-[#102444] lg:text-[2.5rem]">
          {section.title}
        </h2>
        {section.description && <div className="relative mx-auto mt-6 max-w-3xl space-y-3 text-center text-sm leading-7 text-[#555b62] sm:text-base">{section.description.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}

        <div className="relative -mx-4 mt-8 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label={section.title}
            className={cn("flex min-w-max gap-3 lg:grid lg:min-w-0", section.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5")}
          >
            {section.items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  id={`${tabsId}-tab-${index}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tabsId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelect(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "min-w-[13rem] flex-1 rounded-full border px-5 py-3 text-center text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#235ba6] motion-reduce:transition-none lg:min-w-0 lg:w-full",
                    isActive
                      ? "border-[#f2a900] bg-[#f2a900] text-[#252b33] shadow-[0_4px_14px_rgba(139,107,45,0.12)]"
                      : "border-[#dcd7cc] bg-[#fffdf9] text-[#424b57] hover:border-[#b69a60] hover:bg-[#f4e8cb] hover:text-[#102444]",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${tabsId}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-${activeIndex}`}
          tabIndex={0}
          className="mt-8 rounded-[1.5rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#235ba6]"
        >
          <div
            key={activeItem.id}
            className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-[#dfc998] bg-[#fffaf0] shadow-[0_16px_45px_rgba(139,107,45,0.10)]"
          >
            <div className="grid min-h-[20rem] lg:min-h-[30rem] lg:grid-cols-2">
              <article className="relative flex flex-col justify-start overflow-hidden border-t-2 border-[#f2a900] bg-[linear-gradient(135deg,#fffdf8_0%,#faf0da_58%,#f3dfb0_100%)] p-6 sm:p-8 lg:p-9">
                <div>
                  <h3 className="relative max-w-xl text-balance text-xl font-semibold leading-[1.15] tracking-tight text-[#252b33] sm:text-2xl lg:text-[1.9rem]">
                    {activeItem.title}
                  </h3>
                  <div className="relative mt-6 max-w-xl space-y-4 text-sm leading-7 text-[#50565e] sm:text-[.95rem]">
                    {activeItem.description.split("\n\n").map((paragraph) => <p key={paragraph} className="whitespace-pre-line">{paragraph}</p>)}
                  </div>
                  {activeItem.bullets.length > 0 && <ul className="relative mt-6 space-y-3">{activeItem.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-[#50565e]"><Check size={17} className="mt-1 shrink-0 text-[#8b6515]" aria-hidden="true" /><span>{bullet}</span></li>)}</ul>}
                </div>

                <div className="relative mt-8">
                  <ButtonLink
                    href={activeItem.ctaHref}
                    variant="secondary"
                    className="gap-2 !border-transparent !bg-[#f2a900] !px-6 !py-3 !text-sm !font-semibold !text-[#252b33] shadow-none hover:!border-transparent hover:!bg-[#ffc139] hover:!text-[#252b33] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2a900] motion-reduce:transition-none"
                  >
                    {activeItem.ctaLabel}
                    <ArrowRight size={17} aria-hidden="true" />
                  </ButtonLink>
                </div>
              </article>

              <div className="relative min-h-[18rem] bg-[#e6e4df] lg:min-h-[30rem]">
                <div className="relative h-full min-h-[18rem]">
                  <video
                    key={activeVideoPublicId}
                    src={activeVideoUrl}
                    autoPlay
                    disablePictureInPicture
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onEnded={handleVideoReady}
                    onCanPlay={handleVideoReady}
                    onLoadedData={handleVideoReady}
                    onLoadedMetadata={handleVideoReady}
                    className="pointer-events-none absolute inset-0 block h-full w-full"
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center center",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
