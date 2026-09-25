import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <h2 className="text-balance text-[clamp(1.65rem,7vw,1.875rem)] font-semibold leading-tight tracking-[-0.04em] text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
