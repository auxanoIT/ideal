"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ClipboardCheck, X } from "lucide-react";

const storageKey = "idealsolutions-checklist-lead-magnet-dismissed-at";
const dismissWindowMs = 1000 * 60 * 60 * 24 * 7;

function hasRecentDismissal() {
  if (typeof window === "undefined") {
    return true;
  }

  const value = window.localStorage.getItem(storageKey);
  const dismissedAt = value ? Number(value) : 0;

  return Boolean(dismissedAt && Date.now() - dismissedAt < dismissWindowMs);
}

function rememberDismissal() {
  window.localStorage.setItem(storageKey, String(Date.now()));
}

export function ChecklistLeadMagnetPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 4000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (pathname === "/technology-security-checklist" || !ready) {
      return;
    }

    if (hasRecentDismissal()) {
      return;
    }

    function showPopup() {
      if (!hasRecentDismissal()) {
        setVisible(true);
      }
    }

    function handleMouseOut(event: MouseEvent) {
      if (window.innerWidth < 1024) {
        return;
      }

      if (event.clientY <= 0) {
        showPopup();
      }
    }

    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 720) {
        showPopup();
      }
    }

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, ready]);

  if (!visible || pathname === "/technology-security-checklist") {
    return null;
  }

  function closePopup() {
    rememberDismissal();
    setVisible(false);
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(11,18,32,0.48)] px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checklist-lead-magnet-title"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-[var(--color-ink)] text-white shadow-[0_28px_100px_rgba(11,18,32,0.35)]"
      >
        <div className="flex items-start gap-4 p-5 sm:p-7">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--color-cyan)]">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-cyan)]">
              Trusted by Businesses Across Nigeria
            </p>
            <h2
              id="checklist-lead-magnet-title"
              className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl"
            >
              The Business Technology Health Check&trade;
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/74 sm:text-base">
              The same assessment principles used by technology professionals
              to identify security, infrastructure, and operational risks before
              they become costly problems.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/technology-security-checklist"
                onClick={closePopup}
                className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(47,107,255,0.24)] transition hover:-translate-y-0.5"
              >
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={closePopup}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 px-5 text-sm font-semibold text-white/78 transition hover:border-white/28 hover:text-white"
              >
                Maybe later
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={closePopup}
            aria-label="Close checklist popup"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/58 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
