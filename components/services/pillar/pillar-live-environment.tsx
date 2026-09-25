import Image from "next/image";

import type { ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarLiveEnvironment({ pillar }: { pillar: ServicePillar }) {
  return <section className={`${s.section} ${s.live}`} aria-labelledby="live-heading"><div className={s.wrap}>
    <header className={s.center}><h2 id="live-heading">{pillar.liveCopy.title}</h2></header>
    <div className={s.liveLayout}>
      <figure className={s.liveImage}><Image src={pillar.live.src} alt={pillar.live.alt} fill sizes="(min-width: 900px) 47vw, 100vw" quality={75} /></figure>
      <div className={s.liveBenefits}>{pillar.liveCopy.items.map((item)=><article key={item.title}><div><h3>{item.title}</h3>{item.body.map(t=><p key={t}>{t}</p>)}</div></article>)}</div>
    </div>
  </div></section>;
}
