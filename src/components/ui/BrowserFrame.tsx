import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A restrained browser chrome — the product is the picture, not the frame. */
export function BrowserFrame({
  url,
  children,
  className,
  invert = false,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border shadow-[0_40px_120px_-40px_rgba(0,0,0,0.65)]",
        invert ? "border-ink/15 bg-[#f4eee3]" : "border-cream/12 bg-ink-2",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-2.5",
          invert ? "border-b border-ink/10 bg-[#e9dfd0]" : "border-b border-cream/10 bg-ink-3"
        )}
      >
        <div className="flex items-center gap-1.5">
          {["#c8503a", "#c9a227", "#7d9b63"].map((color) => (
            <span
              key={color}
              className="h-2 w-2 rounded-full opacity-80"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div
          className={cn(
            "label flex-1 truncate rounded-full px-3 py-1 text-[0.67rem] tracking-[0.12em] lowercase",
            invert ? "bg-ink/6 text-ink/50" : "bg-cream/6 text-cream/45"
          )}
        >
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}
