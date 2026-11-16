"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSound } from "@/components/providers/SoundProvider";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500 focus-visible:outline-offset-4 md:px-7";

const variants: Record<Variant, string> = {
  solid: "bg-flame text-ink hover:bg-cream",
  outline:
    "border border-cream/25 text-cream hover:border-flame hover:text-flame bg-transparent",
  ghost: "text-cream/70 hover:text-cream px-0 py-2",
};

export function ActionLink({
  href,
  children,
  variant = "solid",
  className,
  external,
  download,
  icon = "arrow",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean | string;
  icon?: "arrow" | "download" | "none";
  ariaLabel?: string;
}) {
  const { tick } = useSound();

  return (
    <Magnetic strength={0.22}>
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...(download ? { download: typeof download === "string" ? download : "" } : {})}
        onPointerEnter={() => tick("hover")}
        onClick={() => tick("click")}
        className={cn(base, variants[variant], className)}
        data-cursor={variant === "ghost" ? undefined : "Open"}
      >
        <span>{children}</span>
        {icon === "arrow" ? (
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.6}
          />
        ) : null}
        {icon === "download" ? (
          <Download
            className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-y-0.5"
            strokeWidth={1.6}
          />
        ) : null}
      </a>
    </Magnetic>
  );
}
