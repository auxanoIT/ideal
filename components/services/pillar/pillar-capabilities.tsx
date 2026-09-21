import { Layers } from "lucide-react";
import { PillarCarousel } from "./pillar-carousel";
import { capabilityHref, capabilityImage, findPillar, type ServicePillar } from "@/data/service-pillars";
import s from "./pillar.module.css";

export function PillarCapabilities({ pillar }: { pillar: ServicePillar }) {
  return <section id="capabilities" className={`${s.section} ${s.capabilities}`} aria-labelledby="capabilities-heading"><div className={s.wrap}>
    <div className={s.capabilityRule} aria-hidden="true"><span><Layers size={30} /></span><i /></div>
    <header className={s.carouselHeading}><h2 id="capabilities-heading">{pillar.capabilities.title}</h2></header>
    <PillarCarousel label={pillar.capabilities.title} items={pillar.capabilities.items.map(item=>({...item,href:capabilityHref(item.href),image:capabilityImage(item.href,pillar)}))} />
  </div></section>;
}

export function PillarRelatedCapabilities({ pillar }: { pillar: ServicePillar }) {
  return <section className={`${s.section} ${s.related}`} aria-labelledby="related-heading"><div className={s.wrap}>
    <header className={s.center}><h2 id="related-heading">{pillar.related.title}</h2></header>
    <PillarCarousel label={pillar.related.title} items={pillar.related.items.map(item=>({...item,image:findPillar(item.href.split("/").at(-1)!)?.hero ?? pillar.hero}))} />
  </div></section>;
}
