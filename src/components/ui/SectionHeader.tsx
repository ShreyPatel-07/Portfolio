import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The masthead used by every section: hairline, mono index, label, oversized
 * title on the left, supporting meta on the right. Consistency here is what
 * makes the long page read as one publication.
 */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  meta,
  invert = false,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <header className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center justify-between gap-6 border-t pt-4",
          invert ? "border-ink/15 text-ink" : "border-cream/15 text-cream"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          <span className="label opacity-70">{index}</span>
          <span className="label">{label}</span>
        </div>
        {meta ? <div className="label hidden text-right opacity-55 md:block">{meta}</div> : null}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
        <div className="md:col-span-7">{title}</div>
        {lead ? (
          <div
            className={cn(
              "body-lg md:col-span-4 md:col-start-9",
              invert ? "text-ink/70" : "text-cream/65"
            )}
          >
            {lead}
          </div>
        ) : null}
      </div>
    </header>
  );
}
