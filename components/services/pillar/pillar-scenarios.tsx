"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarScenarios({ scenarios }: { scenarios: ServicePillar["scenarios"] }) {
  const [active,setActive]=useState<number | null>(null);
  return <section className={`${s.section} ${s.scenarios}`} aria-labelledby="scenarios-heading"><div className={s.wrap}>
    <header className={s.center}><h2 id="scenarios-heading">{scenarios.title}</h2></header>
    <div className={s.scenarioGrid} onMouseLeave={()=>setActive(null)} onKeyDown={event=>{if(event.key==="Escape") setActive(null);}}>{scenarios.items.map((item,index)=><article key={item.title} className={s.scenarioCard} data-active={active===index} onMouseEnter={()=>setActive(index)}>
      <h3><button type="button" aria-expanded={active===index} aria-controls={`scenario-detail-${index}`} onFocus={event=>{if(event.currentTarget.matches(":focus-visible"))setActive(index);}} onClick={()=>setActive(index)}><span>{item.title}</span><ArrowUpRight size={20} aria-hidden="true" /></button></h3>
      <div id={`scenario-detail-${index}`} className={s.scenarioDetail} aria-hidden={active!==index}><div>{item.body.map(t=><p key={t}>{t}</p>)}</div></div>
    </article>)}</div>
  </div></section>;
}
