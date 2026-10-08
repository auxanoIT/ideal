import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial, TestimonialRailSection } from "@/lib/types";

type TestimonialRailProps = {
  section: TestimonialRailSection;
  testimonials: Testimonial[];
};

export function TestimonialRail({ section, testimonials }: TestimonialRailProps) {
  if (!testimonials.length) return null;
  return (
    <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={`${testimonial.name}-${testimonial.company}`}
              className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.08)]"
            >
              <p className="text-lg leading-8 text-[var(--color-ink)]">“{testimonial.quote}”</p>
              <footer className="mt-8">
                <p className="text-sm font-semibold text-[var(--color-ink)]">{testimonial.name}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {testimonial.role} · {testimonial.company}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
