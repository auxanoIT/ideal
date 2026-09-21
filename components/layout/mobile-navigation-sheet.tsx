"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { IndustryIcon } from "@/components/ui/industry-icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type {
  IndustryGroup,
  IndustryProfile,
  NavItem,
  ResourceGroup,
  Service,
  SolutionCategory,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { getSolutionMenuServices } from "@/data/solution-menu";
type MobileNavigationSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navigation: NavItem[];
  categories: SolutionCategory[];
  industries: IndustryProfile[];
  resourceGroups: ResourceGroup[];
  services: Service[];
  trigger: ReactNode;
};

type MobileView = "root" | "solutions" | "industries" | "resources";

const industryGroups: Array<{ id: IndustryGroup; label: string }> = [
  {
    id: "critical-infrastructure-technology",
    label: "Critical Infrastructure & Technology",
  },
  { id: "enterprise-public-sector", label: "Enterprise & Public Sector" },
  { id: "commercial-operational", label: "Commercial & Operational" },
];

function getCategoryServices(category: SolutionCategory, services: Service[]) {
  return getSolutionMenuServices(category, services);
}

function getServiceMenuImage(service: Service) {
  return service.capabilitySections?.[0]?.image ?? service.navImage;
}

function getCategoryMenuImage(
  activeServices: Service[],
  activeCategory: SolutionCategory,
) {
  return (
    activeServices[0]?.capabilitySections?.[0]?.image ??
    activeCategory.featuredImage
  );
}

function PanelHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="grid grid-cols-[40px_1fr_40px] items-center border-b border-[color:rgba(11,18,32,0.08)] px-4 pb-4 pt-5">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <p className="text-center text-sm font-semibold text-[var(--color-ink)]">
        {title}
      </p>
      <SheetClose asChild>
        <button
          type="button"
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
        >
          <X className="h-4 w-4" />
        </button>
      </SheetClose>
    </div>
  );
}

export function MobileNavigationSheet({
  open,
  setOpen,
  navigation,
  categories,
  industries,
  resourceGroups,
  services,
  trigger,
}: MobileNavigationSheetProps) {
  const defaultCategoryId = categories[0]?.id ?? "";
  const defaultResourceGroupId = resourceGroups[0]?.id ?? "";
  const [view, setView] = useState<MobileView>("root");
  const [activeCategoryId, setActiveCategoryId] =
    useState<string>(defaultCategoryId);
  const [activeResourceGroupId, setActiveResourceGroupId] = useState<string>(
    defaultResourceGroupId,
  );

  const [openIndustryGroup, setOpenIndustryGroup] = useState<IndustryGroup>(
    industryGroups[0].id,
  );
  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ??
    categories[0];
  const activeServices = activeCategory
    ? getCategoryServices(activeCategory, services)
    : [];
  const activeCategoryImage = activeCategory
    ? getCategoryMenuImage(activeServices, activeCategory)
    : null;

  const activeResourceGroup =
    resourceGroups.find((group) => group.id === activeResourceGroupId) ??
    resourceGroups[0];

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setView("root");
      setActiveCategoryId(defaultCategoryId);
      setActiveResourceGroupId(defaultResourceGroupId);
    }
  }

  function openSolutionsView() {
    setActiveCategoryId(defaultCategoryId);
    setView("solutions");
  }

  function openIndustriesView() {
    setView("industries");
  }

  function openResourcesView() {
    setActiveResourceGroupId(defaultResourceGroupId);
    setView("resources");
  }

  function goBackToRoot() {
    setView("root");
  }

  const viewOffset = {
    root: "0%",
    solutions: "25%",
    industries: "50%",
    resources: "75%",
  } satisfies Record<MobileView, string>;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="max-sm:max-w-full overflow-hidden p-0 sm:max-w-[24rem]"
      >
        <div className="relative h-full overflow-hidden">
          <div
            className="flex h-full w-[400%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${viewOffset[view]})` }}
          >
            <section className="flex h-full w-1/4 shrink-0 flex-col bg-white">
              <div className="flex items-center justify-between px-5 pb-4 pt-5">
                <div className="flex items-center">
                  <Image
                    src="/idealsolutions-logo.svg"
                    alt="Ideal Solutions"
                    width={48}
                    height={46}
                    loading="eager"
                    className="!h-10 !w-auto object-contain"
                  />
                </div>

                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(11,18,32,0.08)] text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-5">
                <div className="border-y border-[color:rgba(11,18,32,0.08)]">
                  {navigation.map((item, index) => {
                    const rowClassName = cn(
                      "flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[var(--color-ink)]",
                      index > 0 &&
                        "border-t border-[color:rgba(11,18,32,0.08)]",
                    );

                    if (item.kind === "solutions") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={openSolutionsView}
                          className={rowClassName}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                        </button>
                      );
                    }

                    if (item.kind === "industries") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={openIndustriesView}
                          className={rowClassName}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                        </button>
                      );
                    }

                    if (item.kind === "resources") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={openResourcesView}
                          className={rowClassName}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                        </button>
                      );
                    }

                    return (
                      <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={rowClassName}>
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                <div className="mt-auto grid gap-3 pt-8 text-white">
                  <SheetClose asChild>
                    <ButtonLink
                      href="/book-consultation"
                      className="w-full rounded-none bg-[#F2A900] text-[#252B33] shadow-none"
                    >
                      Discuss Your Requirements
                    </ButtonLink>
                  </SheetClose>
                </div>
              </div>
            </section>

            <section className="flex h-full w-1/4 shrink-0 flex-col bg-white">
              <PanelHeader title="Solutions" onBack={goBackToRoot} />

              <div className="flex-1 overflow-y-auto px-4 pb-5 pt-5">
                <p className="text-[0.68rem] font-semibold text-[var(--color-muted)]">
                  Solution groups
                </p>

                <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
                  {categories.map((category) => {
                    const isActive = category.id === activeCategory?.id;

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategoryId(category.id)}
                        className={cn(
                          "shrink-0 rounded-md px-3 py-2 text-left text-[0.9rem] font-semibold leading-tight transition-colors",
                          isActive
                            ? "bg-[var(--color-cloud)] text-[var(--color-electric)]"
                            : "bg-[color:rgba(247,249,252,0.92)] text-[var(--color-ink)]",
                        )}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>

                {activeCategory && activeCategoryImage ? (
                  <div className="mt-4 grid gap-3">
                    <SheetClose asChild>
                      <Link
                        href={activeCategory.href}
                        className="group flex flex-col overflow-hidden rounded-md border border-[#e6dfd1] bg-[#faf0da] transition-colors hover:bg-[#f3dfb0]"
                      >
                        <span className="px-4 pt-4 text-[0.95rem] font-medium text-[var(--color-ink)]">
                          Overview
                        </span>
                        <span className="relative mt-4 block h-[10.5rem] w-full overflow-hidden">
                          <Image
                            src={activeCategoryImage.src}
                            alt={activeCategoryImage.alt}
                            fill
                            sizes="360px"
                            className="object-cover transition duration-300 group-hover:scale-[1.03]"
                          />
                        </span>
                      </Link>
                    </SheetClose>

                    <div className="grid gap-3">
                      {activeServices.map((service) => {
                        const serviceImage = getServiceMenuImage(service);

                        return (
                          <SheetClose asChild key={service.title}>
                            <Link
                              href={service.menuHref}
                              className="group flex min-h-16 min-w-0 items-center justify-between gap-4 rounded-md border border-[#eee8dc] bg-[#faf7f0] px-4 py-3 transition-colors hover:bg-[#f4e8cb]"
                            >
                              <span className="min-w-0 text-[0.95rem] font-medium leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-electric)]">
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
                          </SheetClose>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="flex h-full w-1/4 shrink-0 flex-col bg-white">
              <PanelHeader title="Industries" onBack={goBackToRoot} />

              <div className="flex-1 overflow-y-auto px-4 pb-5 pt-5">
                <p className="text-[0.95rem] font-semibold leading-tight text-[var(--color-electric)]">
                  Industries
                </p>

                <div className="mt-4 grid gap-2">
                  {industryGroups.map((group) => {
                    const isOpen = openIndustryGroup === group.id;

                    return (
                      <div
                        key={group.id}
                        className="border-b border-[color:rgba(11,18,32,0.08)] pb-2"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenIndustryGroup(group.id)}
                          className="flex w-full items-center justify-between gap-3 px-2 py-3 text-left text-sm font-semibold text-[var(--color-ink)]"
                        >
                          {group.label}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>
                        {isOpen ? (
                          <div className="grid gap-2 pb-2">
                            {industries
                              .filter((industry) => industry.group === group.id)
                              .map((industry) => (
                                <SheetClose asChild key={industry.slug}>
                                  <Link
                                    href={industry.href}
                                    className="group flex min-h-14 min-w-0 items-center gap-3 rounded-md bg-[color:rgba(247,249,252,0.92)] px-3 py-3 transition-colors hover:bg-[color:rgba(234,240,246,0.98)]"
                                  >
                                    <IndustryIcon
                                      name={industry.icon}
                                      className="h-6 w-6 shrink-0 text-[var(--color-ink)]"
                                      strokeWidth={1.45}
                                    />
                                    <span className="min-w-0 text-sm font-medium leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-electric)]">
                                      {industry.navLabel}
                                    </span>
                                  </Link>
                                </SheetClose>
                              ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="flex h-full w-1/4 shrink-0 flex-col bg-white">
              <PanelHeader title="Resources" onBack={goBackToRoot} />

              <div className="flex-1 overflow-y-auto px-4 pb-5 pt-5">
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
                  {resourceGroups.map((group) => {
                    const isActive = group.id === activeResourceGroup?.id;

                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveResourceGroupId(group.id)}
                        className={cn(
                          "shrink-0 rounded-md px-3 py-2 text-left text-[0.9rem] font-semibold leading-tight transition-colors",
                          isActive
                            ? "bg-[var(--color-cloud)] text-[var(--color-electric)]"
                            : "bg-[color:rgba(247,249,252,0.92)] text-[var(--color-ink)]",
                        )}
                      >
                        {group.label}
                      </button>
                    );
                  })}
                </div>

                {activeResourceGroup ? (
                  <div className="mt-4 grid gap-3">
                    {activeResourceGroup.links.map((link) => (
                      <SheetClose asChild key={link.id}>
                        <Link
                          href={link.href}
                          className="group flex min-h-14 min-w-0 items-center rounded-md bg-[color:rgba(247,249,252,0.92)] px-4 py-3 text-[0.95rem] font-medium leading-snug text-[var(--color-ink)] transition-colors duration-100 hover:bg-[color:rgba(234,240,246,0.98)] hover:text-[var(--color-electric)]"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
