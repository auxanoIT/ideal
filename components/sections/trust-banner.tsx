import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { TrustBannerSection } from "@/lib/types";
import styles from "./trust-banner.module.css";

type TrustBannerProps = {
  section: TrustBannerSection;
};

export function TrustBanner({ section }: TrustBannerProps) {
  return (
    <section className="bg-[#f3f7fa] py-20 sm:py-24 lg:py-28">
      <Container className="max-w-6xl text-center">
        <h2 className="mx-auto max-w-5xl text-balance text-2xl font-semibold leading-[1.08] tracking-normal text-[var(--color-ink)] sm:text-2xl lg:text-4xl">
          {section.title}
        </h2>
        <p className="mx-auto max-w-4xl text-balance text-xl font-semibold leading-8 text-[var(--color-ink)] sm:text-2xl lg:text-4xl">
          {section.description}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink
            href={section.cta.href}
            className={`${styles.cta} min-h-14 px-8 text-base shadow-none sm:min-w-64`}
          >
            {section.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
