import Link from "next/link";

import type { CaseStudy, IndustryProfile, Service } from "@/lib/types";

type CrawlableNavProps = {
  services: Service[];
  industries: IndustryProfile[];
  caseStudies: CaseStudy[];
  blogSlugs: string[];
};

/**
 * Visually-hidden navigation rendered in the initial HTML on every page.
 * Ensures Googlebot can discover all important internal pages regardless
 * of whether the interactive mega-menu links are reliably parsed.
 *
 * Uses `sr-only` positioning so the nav is invisible to sighted users
 * but fully accessible to screen readers and crawlers.
 */
export function CrawlableNav({
  services,
  industries,
  caseStudies,
  blogSlugs,
}: CrawlableNavProps) {
  return (
    <nav
      aria-label="Full site navigation"
      className="sr-only absolute -left-[9999px] -top-[9999px] h-px w-px overflow-hidden"
    >
      <ul>
        {/* ── Static pages ─────────────────────────────────── */}
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/services">Solutions</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/case-studies">Case Studies</Link>
        </li>
        <li>
          <Link href="/resources">Resources</Link>
        </li>
        <li>
          <Link href="/careers">Careers</Link>
        </li>
        <li>
          <Link href="/book-consultation">Book Consultation</Link>
        </li>
        <li>
          <Link href="/technology-security-checklist">
            Technology Security Checklist
          </Link>
        </li>
        <li>
          <Link href="/terms">Terms</Link>
        </li>

        {/* ── Service pages ────────────────────────────────── */}
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`}>{service.title}</Link>
          </li>
        ))}

        {/* ── Industry pages ───────────────────────────────── */}
        {industries.map((industry) => (
          <li key={industry.href}>
            <Link href={industry.href}>{industry.title}</Link>
          </li>
        ))}

        {/* ── Case study pages ─────────────────────────────── */}
        {caseStudies.map((cs) => (
          <li key={cs.slug}>
            <Link href={`/case-studies/${cs.slug}`}>{cs.title}</Link>
          </li>
        ))}

        {/* ── Blog post pages ──────────────────────────────── */}
        {blogSlugs.map((slug) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
