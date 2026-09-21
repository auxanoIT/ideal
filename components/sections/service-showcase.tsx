"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import type { ServiceShowcaseSection } from "@/lib/types";
import styles from "./service-showcase.module.css";

export function ServiceShowcase({ section }: { section: ServiceShowcaseSection }) {
  const headingId = useId();
  const railId = useId();
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; scroll: number; pointerId: number } | null>(null);
  const didDragRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ index: 0, previous: false, next: true });

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-service-card]"));
    const first = cards[0];
    const step = cards[1] && first ? cards[1].offsetLeft - first.offsetLeft : rail.clientWidth;
    setPosition({
      index: Math.min(Math.max(0, Math.round(rail.scrollLeft / step)), Math.max(0, cards.length - 1)),
      previous: rail.scrollLeft > 2,
      next: rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 2,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(rail);
    rail.addEventListener("scroll", sync, { passive: true });
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", sync);
    };
  }, [sync, section.items.length]);

  function goTo(index: number) {
    const rail = railRef.current;
    const cards = rail?.querySelectorAll<HTMLElement>("[data-service-card]");
    if (!rail || !cards?.length) return;
    const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
    rail.scrollTo({
      left: card.offsetLeft - cards[0].offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || !railRef.current) return;
    didDragRef.current = false;
    dragRef.current = { x: event.clientX, scroll: railRef.current.scrollLeft, pointerId: event.pointerId };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    const drag = dragRef.current;
    if (!rail || !drag) return;
    const delta = event.clientX - drag.x;
    if (!didDragRef.current && Math.abs(delta) < 6) return;
    didDragRef.current = true;
    if (!rail.hasPointerCapture(event.pointerId)) rail.setPointerCapture(event.pointerId);
    setDragging(true);
    rail.scrollLeft = drag.scroll - delta;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    dragRef.current = null;
    setDragging(false);
    if (rail?.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
  }

  if (!section.items.length) return null;

  return (
    <section id="data-centre-infrastructure-services" className={styles.section} aria-labelledby={headingId}>
      <Container>
        <div className={styles.header}>
          <div className={styles.heading}>
            <h2 id={headingId}>{section.title}</h2>
            {section.description && <p className={styles.intro}>{section.description}</p>}
          </div>
          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button type="button" aria-label="Previous service pillars" aria-controls={railId}
                disabled={!position.previous} onClick={() => goTo(position.index - 1)}>
                <ArrowLeft aria-hidden="true" size={22} />
              </button>
              <button type="button" aria-label="Next service pillars" aria-controls={railId}
                disabled={!position.next} onClick={() => goTo(position.index + 1)}>
                <ArrowRight aria-hidden="true" size={22} />
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div
        ref={railRef} id={railId} className={styles.rail} data-dragging={dragging || undefined}
        role="region" aria-roledescription="carousel" aria-label="Data centre service pillars"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight") { event.preventDefault(); goTo(position.index + 1); }
          else if (event.key === "ArrowLeft") { event.preventDefault(); goTo(position.index - 1); }
          else if (event.key === "Home") { event.preventDefault(); goTo(0); }
          else if (event.key === "End") { event.preventDefault(); goTo(section.items.length - 1); }
        }}
        onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag}
        onPointerCancel={endDrag} onLostPointerCapture={() => { dragRef.current = null; setDragging(false); }}
        onPointerLeave={(event) => { if (!dragging) endDrag(event); }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (didDragRef.current) {
            event.preventDefault(); event.stopPropagation(); didDragRef.current = false;
          }
        }}
      >
        {section.items.map((item, index) => (
          <article key={item.id} data-service-card className={styles.card}
            aria-label={`${index + 1} of ${section.items.length}: ${item.title}`}>
            <Link href={item.ctaHref} className={styles.link} draggable={false}>
              <div className={styles.visual}>
                <div className={styles.imageClip}>
                  <Image src={item.imageSrc} alt={item.imageAlt} fill
                    sizes="(min-width: 1500px) 600px, (min-width: 768px) 40vw, 84vw"
                    className={styles.image} draggable={false}
                    style={item.id === "smart-hands" ? { objectPosition: "75% center" } : undefined} />
                  <span className={styles.shade} aria-hidden="true" />
                </div>
                <span className={styles.cta}>
                  <span>{item.ctaLabel}</span>
                  <ArrowRight size={21} aria-hidden="true" />
                </span>
              </div>
              <div className={styles.content}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                {item.lead && <p className={styles.lead}>{item.lead}</p>}
                <p className={styles.description}>{item.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
     
    </section>
  );
}
