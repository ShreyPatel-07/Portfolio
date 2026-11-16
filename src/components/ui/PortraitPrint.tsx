"use client";

import Image from "next/image";
import { useRef } from "react";

import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * A portrait as an object, not a background.
 *
 * The hero owns the full-bleed cut-out. The Intro gets a smaller, tactile
 * print: an ember-dark plate, a giant name behind the subject, corner marks and
 * a shallow pointer tilt. It is deliberately a different composition, so the
 * portrait does not read as a repeated asset.
 */
export function PortraitPrint({
  className,
  src = profile.introPortrait.src,
  alt = profile.introPortrait.alt,
  width = profile.introPortrait.width,
  height = profile.introPortrait.height,
}: {
  className?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--px", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(4));
    el.style.setProperty("--py", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(4));
  };

  const reset = () => {
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  };

  return (
    <figure
      ref={ref}
      data-surface="ember"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        "group relative isolate m-0 overflow-hidden border border-cream/15 bg-ink",
        "aspect-[4/5] w-full max-w-[520px]",
        className
      )}
      style={
        {
          perspective: "1300px",
          ["--px" as never]: "0",
          ["--py" as never]: "0",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 100% at 72% 6%, rgba(255,138,82,0.55), rgba(143,47,16,0.35) 42%, rgba(10,9,8,0.98) 76%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.16] rule-grid" />
      <div
        aria-hidden
        className="absolute -inset-x-6 bottom-[-18%] h-[52%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(10,9,8,0.9),transparent_70%)]"
      />

      <div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{
          transform:
            "rotateX(calc(var(--py) * -4deg)) rotateY(calc(var(--px) * 5deg))",
          transition: "transform 260ms var(--ease-out-expo)",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 top-5 select-none font-display text-[clamp(3.4rem,10vw,7rem)] font-light leading-[0.78] tracking-[-0.06em] text-cream/12"
          style={{ transform: "translate3d(calc(var(--px) * -12px), 0, -20px)" }}
        >
          {profile.nameLines[0]}
        </span>

        <div className="absolute inset-x-8 bottom-0 top-[12%] flex items-end justify-center">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={92}
            sizes="(min-width: 1024px) 36vw, 82vw"
            className="h-full w-auto max-w-none object-contain object-bottom contrast-[1.03] saturate-[0.92] drop-shadow-[0_32px_70px_rgba(0,0,0,0.55)]"
          />
        </div>

        <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4">
          <span className="label text-cream/70">Portrait / 01</span>
          <span className="label flex items-center gap-2 text-cream/50">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cream" />
            {profile.availabilityShort}
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 border-t border-cream/20 pt-4">
          <div>
            <p className="label text-[0.72rem] text-cream/45">{profile.name}</p>
            <p className="mt-1 font-display text-[clamp(1rem,1.8vw,1.5rem)] leading-none text-cream">
              {profile.location.split(",")[0]}
              <span className="text-flame">.</span>
            </p>
          </div>
          <span className="label max-w-[13ch] text-right text-[0.5rem] leading-relaxed text-cream/40">
            {profile.yearsExperience} years of shipped work
          </span>
        </div>

        <span aria-hidden className="absolute left-2 top-2 h-3 w-px bg-cream/55" />
        <span aria-hidden className="absolute left-2 top-2 h-px w-3 bg-cream/55" />
        <span aria-hidden className="absolute right-2 top-2 h-3 w-px bg-cream/55" />
        <span aria-hidden className="absolute right-2 top-2 h-px w-3 bg-cream/55" />
        <span aria-hidden className="absolute bottom-2 left-2 h-3 w-px bg-cream/55" />
        <span aria-hidden className="absolute bottom-2 left-2 h-px w-3 bg-cream/55" />
        <span aria-hidden className="absolute bottom-2 right-2 h-3 w-px bg-cream/55" />
        <span aria-hidden className="absolute bottom-2 right-2 h-px w-3 bg-cream/55" />
      </div>
    </figure>
  );
}
