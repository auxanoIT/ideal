import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ContentSplitSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type ContentSplitProps = {
  section: ContentSplitSection;
};

export function ContentSplit({ section }: ContentSplitProps) {
  return (
    <section className={cn("py-12 sm:py-24", section.dark && "bg-[var(--color-ink)] text-white")}>
      <Container
        className={cn(
          "grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr]",
          section.reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div>
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            className={section.dark ? "[&>h2]:text-white [&>p]:text-white/70" : undefined}
          />
          <div className={cn("mt-6 space-y-5 text-base leading-8", section.dark ? "text-white/70" : "text-[var(--color-muted)]")}>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={cn("rounded-[2rem] border p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]", section.dark ? "border-white/10 bg-white/6" : "border-[color:rgba(11,18,32,0.08)] bg-white")}>
          <ul className="space-y-4">
            {section.points.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckCircle2 className={cn("mt-1 h-5 w-5 shrink-0", section.dark ? "text-[var(--color-cyan)]" : "text-[var(--color-electric)]")} />
                <span className={cn("text-sm leading-7", section.dark ? "text-white/78" : "text-[var(--color-ink)]")}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
