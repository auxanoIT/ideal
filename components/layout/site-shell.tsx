"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { PageNavigationScroll } from "./page-navigation-scroll";

// Keep the editor outside the marketing header, footer and consent controls.
export function SiteShell({ children, studio }: { children: ReactNode; studio: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/sanity" || pathname.startsWith("/sanity/") || pathname === "/studio" || pathname.startsWith("/studio/")) {
    return studio;
  }
  return <><PageNavigationScroll />{children}</>;
}
