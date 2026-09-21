import { Plus } from "lucide-react";
import type { ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarFAQ({ pillar }: { pillar: ServicePillar }) {
  return <section className={`${s.section} ${s.faq}`} aria-labelledby="faq-heading"><div className={s.faqWrap}>
    <header className={s.center}><h2 id="faq-heading">{pillar.faq.title}</h2></header>
    <div>{pillar.faq.items.map(item=><details key={item.title}><summary><h3>{item.title}</h3><Plus size={20} aria-hidden="true" /></summary><div>{item.body.map(t=><p key={t}>{t}</p>)}</div></details>)}</div>
  </div></section>;
}
