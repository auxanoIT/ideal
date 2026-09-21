"use client";

import Link from "next/link";
import { useState } from "react";

import { IndustryIcon } from "@/components/ui/industry-icon";
import { Container } from "@/components/ui/container";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { IndustryGroup, IndustryProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

const groupOrder: IndustryGroup[] = [
  "critical-infrastructure-technology",
  "enterprise-public-sector",
  "commercial-operational",
];
const groupLabels: Record<IndustryGroup, string> = {
  "critical-infrastructure-technology": "Critical Infrastructure & Technology",
  "enterprise-public-sector": "Enterprise & Public Sector",
  "commercial-operational": "Commercial & Operational",
};

type IndustriesMegaMenuProps = {
  industries: IndustryProfile[];
  active?: boolean;
};

export function IndustriesMegaMenu({
  industries,
  active = false,
}: IndustriesMegaMenuProps) {
  const [activeGroup, setActiveGroup] = useState<IndustryGroup>(groupOrder[0]);
  const groupIndustries = industries.filter(
    (industry) => industry.group === activeGroup,
  );

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-[var(--color-muted)]",
          active &&
            "bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(11,18,32,0.08)]",
        )}
      >
        Industries
      </NavigationMenuTrigger>
      <NavigationMenuContent className="fixed inset-x-0 top-20 mt-0 w-full">
        <div className="border-t border-b border-[color:rgba(11,18,32,0.08)] bg-white">
          <Container className="grid min-h-[23.75rem] items-start gap-8 py-10 lg:grid-cols-[230px_minmax(0,1fr)]">
            <div className="border-r border-[color:rgba(11,18,32,0.12)] pr-7">
              <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                Industries
              </p>
              <div className="grid gap-1">
                {groupOrder.map((group) => (
                  <button
                    key={group}
                    type="button"
                    onMouseEnter={() => setActiveGroup(group)}
                    onFocus={() => setActiveGroup(group)}
                    onClick={() => setActiveGroup(group)}
                    className={cn(
                      "rounded-md px-3 py-3 text-left text-sm font-semibold leading-snug transition-colors",
                      activeGroup === group
                        ? "bg-[var(--color-cloud)] text-[var(--color-electric)]"
                        : "text-[var(--color-ink)] hover:bg-[color:rgba(247,249,252,0.92)]",
                    )}
                  >
                    {groupLabels[group]}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {groupIndustries.map((industry) => (
                <NavigationMenuLink
                  key={industry.slug}
                  asChild
                  className="group rounded-md bg-[color:rgba(247,249,252,0.92)] transition-colors hover:bg-[color:rgba(234,240,246,0.98)]"
                >
                  <Link
                    href={industry.href}
                    className="flex min-h-[6.5rem] min-w-0 flex-col justify-between gap-3 px-4 py-4"
                  >
                    <IndustryIcon
                      name={industry.icon}
                      className="h-7 w-7 text-[var(--color-ink)]"
                      strokeWidth={1.45}
                    />
                    <span className="min-w-0 text-[0.9rem] font-medium leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-electric)]">
                      {industry.navLabel}
                    </span>
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </Container>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
