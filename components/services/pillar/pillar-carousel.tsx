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
  const count = items.length;
  const slides = count > 1 ? [...items, ...items, ...items] : items;
  const [active, setActive] = useState(count > 1 ? count : 0);
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
    let settled: ReturnType<typeof setTimeout>;
    const normalize = () => {
      const index = activeRef.current;
      if (count > 1 && (index < count || index >= count * 2)) {
        const middle = count + index % count;
        // Equivalent repeated cards keep the viewport identical at the seam.
        const current = node.children[index] as HTMLElement;
        const target = node.children[middle] as HTMLElement;
        node.scrollTo({left:node.scrollLeft + target.offsetLeft - current.offsetLeft,behavior:'instant'});
        activeRef.current = middle;
        setActive(middle);
      }
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const midpoint = node.scrollLeft + node.clientWidth / 2;
        let closest = 0, distance = Infinity;
        Array.from(node.children).forEach((child, index) => {
          const slide = child as HTMLElement;
          const d = Math.abs(slide.offsetLeft - node.offsetLeft + slide.offsetWidth / 2 - midpoint);
          if (d < distance) { distance = d; closest = index; }
        });
        if (Math.abs(node.scrollWidth - node.clientWidth - node.scrollLeft) < 5) {
          closest = node.children.length - 1;
        }
        activeRef.current = closest;
        setActive(closest);
        clearTimeout(settled);
        settled = setTimeout(normalize, 180);
      });
    };
    const resize = () => center(activeRef.current, false);
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    node.addEventListener("scroll", sync, { passive: true });
    resize();
    return () => { observer.disconnect(); node.removeEventListener("scroll", sync); cancelAnimationFrame(frame); clearTimeout(settled); };
  }, [count]);
  if (!count) return null;
  return <div className={s.carousel} role="region" aria-roledescription="carousel" aria-label={label}>
    <button className={`${s.carouselArrow} ${s.carouselPrevious}`} type="button" aria-label="Previous service" disabled={count < 2} onClick={() => center(activeRef.current - 1)}><ChevronLeft aria-hidden="true" /></button>
    <div className={s.carouselTrack} ref={track} onKeyDown={event => {
      if (event.key === "ArrowRight") { event.preventDefault(); center(activeRef.current + 1); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); center(activeRef.current - 1); }
    }}>
      {slides.map((item, index) => <article key={`${item.href}-${index}`} className={s.carouselSlide} data-active={active % count === index % count} aria-hidden={count > 1 && (index < count || index >= count * 2) ? true : undefined} aria-roledescription="slide" aria-label={`${index % count + 1} of ${count}: ${item.title}`} onFocus={() => center(index)}>
        <div className={s.carouselCard}>
          <div className={s.carouselImage}><Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 900px) 350px, 80vw" quality={70} /></div>
          <h3>{item.title}</h3>
          <p>{item.lead ?? item.body[0]}</p>
          {item.lead && <details className={s.carouselDetails}><summary tabIndex={count > 1 && (index < count || index >= count * 2) ? -1 : 0}>Service scope</summary>{item.body.map(text => <p key={text}>{text}</p>)}</details>}
          <Link href={item.href} tabIndex={count > 1 && (index < count || index >= count * 2) ? -1 : 0} className={s.textLink}>{item.cta}</Link>
        </div>
      </article>)}
    </div>
    <button className={`${s.carouselArrow} ${s.carouselNext}`} type="button" aria-label="Next service" disabled={count < 2} onClick={() => center(activeRef.current + 1)}><ChevronRight aria-hidden="true" /></button>
    <p className={s.carouselPosition} aria-live="polite">{String(active % count + 1).padStart(2,"0")} / {String(count).padStart(2,"0")}</p>
  </div>;
}
