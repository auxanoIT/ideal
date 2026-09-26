import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The requested Ideal Solutions page could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(46,196,182,0.12),_transparent_55%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
            Not Found
          </p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-start">
            <div>
              <h1 className="text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl">
                The requested page does not exist.
              </h1>
              <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">
                Use the core navigation to return to the service platform, the
                estimator, or the consultation flow
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/">Return home</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore services
                </ButtonLink>
                <ButtonLink href="/estimate" variant="secondary">
                  Start an estimate
                </ButtonLink>
              </div>
            </div>
            <aside className="rounded-2xl border border-white/10 bg-white/70 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.6)] backdrop-blur">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]">
                Popular destinations
              </h2>
              <ul className="mt-5 space-y-3 text-sm text-[var(--color-muted)]">
                <li>
                  <ButtonLink href="/case-studies" variant="ghost">
                    View case studies
                  </ButtonLink>
                </li>
                <li>
                  <ButtonLink href="/book-consultation" variant="ghost">
                    Book a consultation
                  </ButtonLink>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
