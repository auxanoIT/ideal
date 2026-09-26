"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/** New pages start above the hero, not at Next's first visible page element.
 * Leave hash targets and browser history restoration to the router/browser.
 */
export function PageNavigationScroll() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const historyNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => { historyNavigation.current = true; };
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (link && (!link.target || link.target === "_self") && !link.hasAttribute("download")) {
        const destination = new URL(link.href, location.href);
        if (destination.origin === location.origin) {
          historyNavigation.current = false;
          if (destination.pathname === location.pathname && !destination.hash) {
            requestAnimationFrame(() => window.scrollTo({top:0,left:0,behavior:'instant'}));
          }
        }
      }
    };
    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (historyNavigation.current) { historyNavigation.current = false; return; }
    if (location.hash || /^\/(sanity|studio)(\/|$)/.test(pathname)) return;
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    // Run after the router's layout effects and mobile menu dismissal.
    const frame = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
