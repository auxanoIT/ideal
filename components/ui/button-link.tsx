import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 max-w-full items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold leading-snug transition duration-200 motion-reduce:transition-none",
        variant === "primary" &&
          "bg-[#f2a900] text-[#252b33] shadow-[0_8px_24px_rgba(37,43,51,0.12)] hover:bg-[#ffc23d]",
        variant === "secondary" &&
          "border border-[color:rgba(37,43,51,0.18)] bg-white text-[var(--color-ink)] hover:border-[#b87900] hover:text-[var(--color-electric)]",
        variant === "ghost" &&
          "text-[var(--color-ink)] hover:bg-[color:rgba(11,18,32,0.04)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
