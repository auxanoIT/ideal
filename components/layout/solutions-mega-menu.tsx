"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Container } from "@/components/ui/container";
import type { Service, SolutionCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getSolutionMenuServices } from "@/data/solution-menu";

type SolutionsMegaMenuProps = {
  categories: SolutionCategory[];
  services: Service[];
  active?: boolean;
};

function orderedServices(activeCategory: SolutionCategory, services: Service[]) {
  return getSolutionMenuServices(activeCategory, services);
}

function getServiceMenuImage(service: Service) {
  return service.capabilitySections?.[0]?.image ?? service.navImage;
}

function getCategoryMenuImage(activeServices: Service[], activeCategory: SolutionCategory) {
  return activeServices[0]?.capabilitySections?.[0]?.image ?? activeCategory.featuredImage;
}

export function SolutionsMegaMenu({
  categories,
  services,
  active = false,
}: SolutionsMegaMenuProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "");

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  const activeServices = useMemo(
    () => (activeCategory ? orderedServices(activeCategory, services) : []),
    [activeCategory, services],
  );

  if (!activeCategory) {
    return null;
  }

  const activeCategoryImage = getCategoryMenuImage(activeServices, activeCategory);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-[var(--color-muted)]",
          active && "bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(11,18,32,0.08)]",
        )}
        onMouseEnter={() => setActiveCategoryId(categories[0]?.id ?? "")}
        onFocus={() => setActiveCategoryId(categories[0]?.id ?? "")}
      >
        Solutions
      </NavigationMenuTrigger>
      <NavigationMenuContent className="fixed inset-x-0 top-20 mt-0 w-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-b border-[#e6dfd1] bg-[#fffdf9]"
        >
          <Container className="grid min-h-[23.75rem] gap-8 py-10 lg:grid-cols-[185px_minmax(0,1fr)]">
            <div className="border-r border-[color:rgba(11,18,32,0.12)] pr-7">
              <p className="text-[0.68rem] font-semibold text-[var(--color-muted)]">
                Solution groups
              </p>
              <div className="mt-4 space-y-2">
                {categories.map((category) => {
                  const isActive = category.id === activeCategory.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onMouseEnter={() => setActiveCategoryId(category.id)}
                      onFocus={() => setActiveCategoryId(category.id)}
                      onClick={() => setActiveCategoryId(category.id)}
                      className={cn(
                        "block w-full text-left text-[0.95rem] font-semibold leading-tight transition-colors",
                        isActive
                          ? "text-[var(--color-electric)]"
                          : "text-[var(--color-ink)] hover:text-[var(--color-electric)]",
                      )}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="grid auto-rows-[minmax(4.5rem,auto)] grid-cols-4 content-start gap-3"
              >
                <NavigationMenuLink
                  asChild
                  className="group row-span-3 flex flex-col self-start overflow-hidden rounded-md border border-[#e6dfd1] bg-[#faf0da] transition-colors hover:bg-[#f3dfb0]"
                >
                  <Link href={activeCategory.href}>
                    <span className="px-4 pt-4 text-[0.95rem] font-medium text-[var(--color-ink)]">
                      Overview
                    </span>
                    <span className="relative mt-4 block h-[9.5rem] w-full overflow-hidden">
                      <Image
                        src={activeCategoryImage.src}
                        alt={activeCategoryImage.alt}
                        fill
                        sizes="255px"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    </span>
                  </Link>
                </NavigationMenuLink>

                {activeServices.map((service) => {
                  const serviceImage = getServiceMenuImage(service);

                  return (
                    <NavigationMenuLink
                      key={service.title}
                      asChild
                      className="group rounded-md border border-[#eee8dc] bg-[#faf7f0] transition-colors hover:border-[#d5b773] hover:bg-[#f4e8cb]"
                    >
                      <Link
                        href={service.menuHref}
                        className="flex min-w-0 items-center justify-between gap-3 px-4 py-2"
                      >
                        <span className="min-w-0 text-[0.85rem] font-medium leading-snug text-[#252b33] transition-colors group-hover:text-[#806019]">
                          {service.title}
                        </span>
                        <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md bg-white/80">
                          <Image
                            src={serviceImage.src}
                            alt={serviceImage.alt}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </Container>
        </motion.div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
