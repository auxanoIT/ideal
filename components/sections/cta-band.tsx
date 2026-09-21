import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CTABandSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type CTABandProps = {
  section: CTABandSection;
};

export function CTABand({ section }: CTABandProps) {
  return (
    <section className="bg-[#f7f9fc] py-20 sm:py-24">
      <Container>
        <div
          className={cn(
            "overflow-hidden rounded-[2.25rem] border p-8 sm:p-12",
            section.dark
              ? "border-[#b69a60]/40 bg-[linear-gradient(135deg,#252b33,#343a40)] text-[#faf7f0]"
              : "border-[#dfc998] bg-[linear-gradient(135deg,#fffdf8_0%,#faf0da_60%,#f3dfb0_100%)] shadow-[0_12px_35px_rgba(139,107,45,0.06)]",
          )}
        >
          <SectionHeading
            title={section.title}
            description={section.description}
            align="center"
            className={cn(
              "[&>h2]:text-2xl [&>h2]:font-normal [&>h2]:tracking-normal lg:[&>h2]:text-3xl [&>p]:mx-auto [&>p]:max-w-2xl [&>p]:text-sm [&>p]:leading-7 lg:[&>p]:text-base",
              section.dark
                ? "[&>h2]:text-[#faf7f0] [&>p]:text-[#d6d9de]"
                : "[&>h2]:text-[#252b33] [&>p]:text-[#50565e]",
            )}
          />
          <div className="mt-8 flex justify-center">
            <ButtonLink href={section.primaryCta.href} className="bg-none bg-[#f2a900] px-7 text-[#252b33] hover:bg-[#ffc139] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b6515]">{section.primaryCta.label}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
