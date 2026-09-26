import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { FooterColumn, SiteSettings } from "@/lib/types";

type SiteFooterProps = {
  columns: FooterColumn[];
  settings: SiteSettings;
};

export function SiteFooter({ columns, settings }: SiteFooterProps) {
  const visibleColumns = columns
    .map((column) => ({
      ...column,
      links: column.links.filter(
        (link) =>
          link.href !== "/privacy" &&
          link.label.toLowerCase() !== "privacy policy",
      ),
    }))
    .filter((column) => column.links.length > 0);

  return (
    <footer className="border-t border-white/6 bg-[var(--color-ink)] text-white">
      <Container className="grid gap-12 py-16">
        <div className="space-y-6">
          <Link href="/" aria-label="Ideal Solutions home" className="inline-flex items-center gap-3">
            <Image
              src="/idealsolutions-logo.svg"
              alt="Ideal Solutions"
              width={58}
              height={56}
              className="!h-14 !w-auto object-contain brightness-0 invert"
            />
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">Ideal Solutions</span>
          </Link>
          <p className="max-w-xl text-sm leading-7 text-white/68">
            Onsite technical execution and infrastructure support for teams
            deploying, changing and maintaining IT equipment in Nigeria.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation" className="rounded-none bg-[#F2A900] text-[#252B33] shadow-none">
              Discuss Your Requirements
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-[1.3fr_1.3fr_0.7fr_0.8fr]">
          {visibleColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                {column.title}
              </p>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-white/72 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {column.title === "Contact" && (
                <div className="mt-6 border-l-2 border-[#F2A900] pl-4">
                  <p className="text-sm font-semibold text-white">Our Office</p>
                  <address className="mt-2 text-sm not-italic leading-7 text-white/72">
                    {settings.address}
                  </address>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}
