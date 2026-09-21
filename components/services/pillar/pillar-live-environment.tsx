import Image from "next/image";
import { ShieldCheck, Users, Zap, Layers } from "lucide-react";
import type { ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarLiveEnvironment({ pillar }: { pillar: ServicePillar }) {
  const icons = [ShieldCheck, Users, Zap, Layers];
  return <section className={`${s.section} ${s.live}`} aria-labelledby="live-heading"><div className={s.wrap}>
    <header className={s.center}><h2 id="live-heading">{pillar.liveCopy.title}</h2></header>
    <div className={s.liveLayout}>
      <figure className={s.liveImage}><Image src={pillar.live.src} alt={pillar.live.alt} fill sizes="(min-width: 900px) 47vw, 100vw" quality={75} /><figcaption><strong>{pillar.liveCopy.overlay || pillar.intro.title}</strong><span>{pillar.intro.body[0]}</span></figcaption></figure>
      <div className={s.liveBenefits}>{pillar.liveCopy.items.map((item,index)=>{const Icon=icons[index];return <article key={item.title}><Icon aria-hidden="true" size={36} strokeWidth={2} /><div><h3>{item.title}</h3>{item.body.map(t=><p key={t}>{t}</p>)}</div></article>;})}</div>
    </div>
  </div></section>;
}
