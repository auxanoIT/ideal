"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

type Heading = { id: string; text: string };

export function MobileArticleContents({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-20 z-40 border-b border-[#252B33]/10 bg-[var(--color-background)]/95 backdrop-blur-xl lg:hidden">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-2 text-left text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-cloud)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-electric)]"
        >
          Contents
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <div
            id={panelId}
            ref={panelRef}
            className="absolute inset-x-0 top-full border-b border-[#252B33]/10 bg-[var(--color-background)] px-4 pb-4 shadow-[0_18px_30px_rgba(11,18,32,0.12)] sm:px-6"
          >
            <div className="mx-auto max-w-7xl rounded-xl border border-[#252B33]/10 bg-white p-3">
              <div className="flex items-center justify-between border-b border-[#252B33]/10 px-2 pb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-electric)]">In this article</span>
                <button
                  type="button"
                  aria-label="Close contents"
                  onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
                  className="rounded-lg p-2 hover:bg-[var(--color-cloud)] focus-visible:outline-2 focus-visible:outline-[var(--color-electric)]"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <nav aria-label="Article contents" className="max-h-[min(50dvh,calc(100dvh-17rem))] overflow-y-auto overscroll-contain pt-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setOpen(false);
                      const target = document.getElementById(heading.id);
                      if (!target) return;
                      window.history.pushState(null, "", `#${heading.id}`);
                      requestAnimationFrame(() => {
                        target.scrollIntoView({ block: "start" });
                        target.focus({ preventScroll: true });
                      });
                    }}
                    className="block rounded-lg px-3 py-2 text-sm leading-6 text-[var(--color-muted)] hover:bg-[var(--color-cloud)] hover:text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-[var(--color-electric)]"
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
