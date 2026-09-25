"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAudienceIndustry, type ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarAudience({ pillar }: { pillar: ServicePillar }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const industries = pillar.audience.items
    .map(item => getAudienceIndustry(item.title))
    .filter((ind): ind is NonNullable<typeof ind> => Boolean(ind))
    // Different audience descriptions may point to the same industry page.
    .filter((industry, index, mapped) => mapped.findIndex(item => item.slug === industry.slug) === index);

  function center(index: number) {
    const node = track.current;
    const slide = node?.children[index] as HTMLElement | undefined;
    if (!node || !slide) return;
    const left = slide.offsetLeft - node.offsetLeft - (node.clientWidth - slide.offsetWidth) / 2;
    const isWrap = Math.abs(index - active) > 1;
    node.scrollTo({ left, behavior: isWrap ? "instant" : "smooth" });
  }

  // Sync active index on scroll
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const midpoint = node.getBoundingClientRect().left + node.clientWidth / 2;
        let closest = 0, distance = Infinity;
        Array.from(node.children).forEach((child, index) => {
          const rect = child.getBoundingClientRect();
          const d = Math.abs(rect.left + rect.width / 2 - midpoint);
          if (d < distance) { distance = d; closest = index; }
        });
        if (Math.abs(node.scrollWidth - node.clientWidth - node.scrollLeft) < 5) {
          closest = node.children.length - 1;
        }
        setActive(closest);
      });
    };
    node.addEventListener("scroll", sync, { passive: true });
    return () => { node.removeEventListener("scroll", sync); cancelAnimationFrame(frame); };
  }, []);

  if (industries.length === 0) return null;

  return <section className={`${s.section} ${s.audience}`} aria-labelledby="audience-heading"><div className={s.wrap}>
    <header className={s.center}><h2 id="audience-heading">{pillar.audience.title}</h2></header>
    
    <div className={s.audienceCarousel}>
      <button className={`${s.carouselArrow} ${s.carouselPrevious}`} type="button" aria-label="Previous industry" onClick={() => center((active - 1 + industries.length) % industries.length)}>
        <ChevronLeft aria-hidden="true" />
      </button>
      
      <div className={s.audienceTrack} ref={track}>
        {industries.map((ind, index) => (
          <article key={ind.slug} className={s.audienceCard} data-active={active === index}>
            <h3>{ind.navLabel}</h3>
            <Link href={ind.href} className={s.audienceLink}>Learn more &gt;</Link>
            <div className={s.audienceImage}>
              <Image src={ind.heroImage.src} alt={ind.heroImage.alt} fill sizes="(min-width: 900px) 350px, 80vw" quality={75} />
            </div>
          </article>
        ))}
      </div>
      
      <button className={`${s.carouselArrow} ${s.carouselNext}`} type="button" aria-label="Next industry" onClick={() => center((active + 1) % industries.length)}>
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  </div></section>;
}
