import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FAQBlockSection, FAQItem } from "@/lib/types";

type FAQBlockProps = {
  section: FAQBlockSection;
  items: FAQItem[];
};

export function FAQBlock({ section, items }: FAQBlockProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {items.map((item) => (
            <details
              key={item.id}
              className="group rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-6 py-5 shadow-[0_16px_40px_rgba(11,18,32,0.06)]"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b87900] sm:text-lg">
                <span>{item.question}</span>
                <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--color-electric)] transition group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
