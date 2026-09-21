"use client";

import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useId, useState } from "react";
import { subserviceHeroCopy } from "@/data/subservice-hero-copy";
import styles from "./subservice-hero.module.css";

type Props = {
  title: string;
  description: string;
  image: { src: string; alt: string };
  parent: { title: string; href: string };
  href: string;
  copy?: { title: string; description: string; cta: string };
  introduction?: { title: string; cards: { title: string; body: string }[] };
  enquiryUrl?: string;
};

// Provisional editorial highlights, not numerical performance claims.
const highlights = [
  { title: "Clear scope", body: "Define the equipment, site requirements and work to be completed." },
  { title: "Onsite execution", body: "Bring technical hands to the environment where the work happens." },
  { title: "Your control", body: "Keep technical decisions and approvals with your team." },
  { title: "Agreed checks", body: "Establish how completed work will be reviewed before handover." },
  { title: "Next steps", body: "Identify outstanding items and the information needed to move forward." },
];

export function SubserviceHero({ title, description, image, parent, href, copy: overrideCopy, introduction, enquiryUrl = '/contact' }: Props) {
  const [paused, setPaused] = useState(false);
  const gradientId = useId();
  const suppliedCopy = overrideCopy ?? subserviceHeroCopy[href.split("/").at(-1)!];
  const words = (suppliedCopy?.title ?? title).split(" ");
  const split = Math.ceil(words.length / 2);
  return <div className={styles.wrapper}>
    <section className={styles.hero} aria-labelledby="subservice-title">
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" quality={85} className={styles.image} />
      <div className={styles.shade} />
      <svg className={styles.ribbon} viewBox="0 0 1600 760" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#30291b" /><stop offset=".65" stopColor="#ad7c12" /><stop offset="1" stopColor="#f2a900" /></linearGradient></defs>
        <path d="M-80 620 H950 C1360 620 1590 450 1670 25" fill="none" stroke={`url(#${gradientId})`} strokeWidth="82" />
      </svg>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol>
        <li><Link href="/">Home</Link></li><li><Link href="/services">Solutions</Link></li>
        <li><Link href={parent.href}>{parent.title}</Link></li><li><Link href={href} aria-current="page">{title}</Link></li>
      </ol></nav>
      <div className={styles.copy}>
        <h1 id="subservice-title"><span>{words.slice(0, split).join(" ")}</span><strong>{words.slice(split).join(" ")}</strong></h1>
        <p>{suppliedCopy?.description ?? description}</p>
      </div>
      <div className={styles.action}><Link href={enquiryUrl} className={styles.cta}>{suppliedCopy?.cta ?? "Discuss Your Project"} <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className={styles.highlights} aria-labelledby="subservice-highlights-title">
      <h2 id="subservice-highlights-title">{introduction?.title ?? 'Move your infrastructure work forward with Ideal Solutions'}</h2>
      <div className={styles.viewport}>
        <div className={styles.track} data-paused={paused}>
          {[0, 1].map(copy => <div key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
            {(introduction?.cards ?? highlights).map(item => <article key={item.title} className={styles.card}><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>)}
        </div>
      </div>
      <button type="button" className={styles.pause} onClick={() => setPaused(value => !value)} aria-label={paused ? "Play highlights animation" : "Pause highlights animation"}>{paused ? <Play size={15} /> : <Pause size={15} />}<span>{paused ? "Play" : "Pause"}</span></button>
    </section>
  </div>;
}
