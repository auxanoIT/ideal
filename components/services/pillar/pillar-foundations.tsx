import { Check, Layers, Network, ClipboardCheck, ShieldCheck } from "lucide-react";
import type { ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarIntro({ pillar }: { pillar: ServicePillar }) {
  const icons = [Layers, Network, ClipboardCheck, ShieldCheck];
  const words = pillar.intro.title.split(" ");
  const split = Math.ceil(words.length / 2);
  return <section className={`${s.section} ${s.intro}`} aria-labelledby="readiness-heading"><div className={s.wrap}>
    <header className={s.center}><p className={s.eyebrow}>{pillar.intro.eyebrow}</p><h2 id="readiness-heading">{words.slice(0,split).join(" ")} <span>{words.slice(split).join(" ")}</span></h2>{pillar.intro.body.map(t => <p key={t}>{t}</p>)}</header>
    <div className={s.readinessGrid}>{pillar.intro.items.map((item, index) => { const Icon=icons[index]; return <article key={item.title}><span className={s.readinessIcon}><Icon size={32} strokeWidth={1.7} aria-hidden="true" /></span><div><h3>{item.title}</h3>{item.body.map(t=><p key={t}>{t}</p>)}</div></article>; })}</div>
  </div></section>;
}

export function PillarBenefits({ pillar }: { pillar: ServicePillar }) {
  return <section className={`${s.section} ${s.benefits}`} aria-labelledby="benefits-heading"><div className={`${s.wrap} ${s.benefitLayout}`}>
    <header className={s.stickyIntro}><h2 id="benefits-heading">{pillar.benefits.title}</h2>{pillar.benefits.body.map(t=><p key={t}>{t}</p>)}</header>
    <div className={s.benefitList}>{pillar.benefits.items.map(item=><article key={item.title}><h3>{item.title}</h3><div>{item.body.map(t=><p key={t}><Check size={22} strokeWidth={1.6} aria-hidden="true" /><span>{t}</span></p>)}</div></article>)}</div>
  </div></section>;
}
