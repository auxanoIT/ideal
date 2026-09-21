import type { ServicePillar } from "@/data/service-pillars";
import { PillarHero } from "./pillar-hero";
import { PillarIntro, PillarBenefits } from "./pillar-foundations";
import { PillarCapabilities, PillarRelatedCapabilities } from "./pillar-capabilities";
import { PillarLiveEnvironment } from "./pillar-live-environment";
import { PillarAudience } from "./pillar-audience";
import { PillarScenarios } from "./pillar-scenarios";
import { PillarFAQ } from "./pillar-faq";
import { PillarSchema } from "./pillar-seo";
import s from "./pillar.module.css";

export function PillarPage({ pillar }: { pillar: ServicePillar }) {
  return <div className={s.page}>
    <PillarSchema pillar={pillar} />
    <PillarHero pillar={{ title: pillar.title, hero: pillar.hero, heroCopy: pillar.heroCopy, signals: pillar.signals }} />
    <PillarIntro pillar={pillar} />
    <PillarBenefits pillar={pillar} />
    <PillarCapabilities pillar={pillar} />
    <PillarLiveEnvironment pillar={pillar} />
    <PillarAudience pillar={pillar} />
    <PillarScenarios scenarios={pillar.scenarios} />
    <PillarRelatedCapabilities pillar={pillar} />
    <PillarFAQ pillar={pillar} />
  </div>;
}
