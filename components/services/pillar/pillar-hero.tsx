"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import type { ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarHero({ pillar }: { pillar: Pick<ServicePillar, "title" | "hero" | "heroCopy" | "signals"> }) {
  const ref = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={s.hero} data-paused={paused || !visible} aria-labelledby="pillar-heading">
    <div className={s.heroImage}>
      <Image src={pillar.hero.src} alt={pillar.hero.alt} fill priority sizes="100vw" quality={75} />
      <div className={s.heroVeil} />
      <div className={s.scan} aria-hidden="true" />
    </div>
    <div className={s.wrap}>
      <div className={s.heroCopy}>
        <h1 id="pillar-heading">{pillar.heroCopy.title}</h1>
        {pillar.heroCopy.body.map(text => <p className={s.heroDescription} key={text}>{text}</p>)}
        <div className={s.actions}>
          <Link className={s.primary} href="/book-consultation">{pillar.heroCopy.primaryCta}<ArrowUpRight size={19} aria-hidden="true" /></Link>
          <a className={s.secondary} href="#capabilities">{pillar.heroCopy.secondaryCta}<ArrowDown size={18} aria-hidden="true" /></a>
        </div>
      </div>
      <div className={s.heroFoot}>
        <button type="button" className={s.motionButton} onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Play hero animation" : "Pause hero animation"}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
      </div>
    </div>
  </section>;
}
