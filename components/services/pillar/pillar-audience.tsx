import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import { audienceHref, type ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarAudience({ pillar }: { pillar: ServicePillar }) {
  return <section className={`${s.section} ${s.audience}`} aria-labelledby="audience-heading"><div className={s.wrap}>
    <header className={s.center}><h2 id="audience-heading">{pillar.audience.title}</h2></header>
    <div className={s.audienceGrid}>{pillar.audience.items.map(item=>{const href=audienceHref(item.title);return <article key={item.title}><Building2 size={23} strokeWidth={1.4} aria-hidden="true" /><h3>{href?<Link href={href}>{item.title}<ArrowUpRight size={17} aria-hidden="true" /></Link>:item.title}</h3>{item.body.map(t=><p key={t}>{t}</p>)}</article>;})}</div>
  </div></section>;
}
