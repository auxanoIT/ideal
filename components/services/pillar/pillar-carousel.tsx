"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PillarImage } from "@/data/service-pillars";
import s from "./pillar.module.css";

export type PillarSlide = { title: string; lead?: string; body: string[]; href: string; cta: string; image: PillarImage };

export function PillarCarousel({ items, label }: { items: PillarSlide[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(items.length > 2 ? 1 : 0);
  const activeRef = useRef(active);
  function center(index: number, smooth = true) {
    const node = track.current;
    const slide = node?.children[index] as HTMLElement | undefined;
    if (!node || !slide) return;
    const left = slide.offsetLeft - node.offsetLeft - (node.clientWidth - slide.offsetWidth) / 2;
    node.scrollTo({ left, behavior: smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant" });
  }
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
        activeRef.current = closest;
        setActive(closest);
      });
    };
    const resize = () => center(activeRef.current, false);
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    node.addEventListener("scroll", sync, { passive: true });
    resize();
    return () => { observer.disconnect(); node.removeEventListener("scroll", sync); cancelAnimationFrame(frame); };
  }, []);
  return <div className={s.carousel} role="region" aria-roledescription="carousel" aria-label={label}>
    <button className={`${s.carouselArrow} ${s.carouselPrevious}`} type="button" aria-label="Previous service" disabled={active === 0} onClick={() => center(active - 1)}><ChevronLeft aria-hidden="true" /></button>
    <div className={s.carouselTrack} ref={track} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); center(Math.max(0, Math.min(items.length - 1, active + (event.key === "ArrowRight" ? 1 : -1)))); }
    }}>
      {items.map((item, index) => <article key={item.href} className={s.carouselSlide} data-active={active === index} aria-roledescription="slide" aria-label={`${index + 1} of ${items.length}: ${item.title}`} onFocus={() => center(index)}>
        <div className={s.carouselCard}>
          <div className={s.carouselImage}><Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 900px) 350px, 80vw" quality={70} /></div>
          <h3>{item.title}</h3>
          <p>{item.lead ?? item.body[0]}</p>
          {item.lead && <details className={s.carouselDetails}><summary>Service scope</summary>{item.body.map(text => <p key={text}>{text}</p>)}</details>}
          <Link href={item.href} className={s.textLink}>{item.cta}</Link>
        </div>
      </article>)}
    </div>
    <button className={`${s.carouselArrow} ${s.carouselNext}`} type="button" aria-label="Next service" disabled={active === items.length - 1} onClick={() => center(active + 1)}><ChevronRight aria-hidden="true" /></button>
    <p className={s.carouselPosition} aria-live="polite">{String(active + 1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</p>
  </div>;
}
