import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { getCaseStudyMedia } from "@/lib/case-study-media";
import type { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
  featured?: boolean;
};

export function CaseStudyCard({
  caseStudy,
  featured = false,
}: CaseStudyCardProps) {
  const media = getCaseStudyMedia(caseStudy);

  return (
    <article className="group grid h-full overflow-hidden rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white shadow-[0_20px_55px_rgba(11,18,32,0.07)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-cloud)]">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          quality={56}
          sizes={
            featured
              ? "(min-width: 1280px) 42vw, 100vw"
              : "(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
          }
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex h-full flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ED6B37]">
          {caseStudy.clientDisplayName ||
            caseStudy.client ||
            caseStudy.industry ||
            "Infrastructure project"}
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--color-ink)]">
          {caseStudy.title}
        </h2>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--color-muted)]">
          {caseStudy.summary}
        </p>
        <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-2">
            <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0 text-[var(--color-electric)]" />
            {caseStudy.industry || "Case Study"}
          </span>
          {caseStudy.location ? (
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--color-electric)]" />
              {caseStudy.location}
            </span>
          ) : null}
        </div>
        <ButtonLink
          href={`/case-studies/${caseStudy.slug}`}
          variant="ghost"
          className="mt-auto justify-start px-0 pt-8 text-[var(--color-electric)] hover:bg-transparent"
        >
          View Case Study
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </ButtonLink>
      </div>
    </article>
  );
}
