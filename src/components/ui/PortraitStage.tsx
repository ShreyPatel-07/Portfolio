"use client";

import Image from "next/image";
import { useRef } from "react";

import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * Editorial portrait stage.
 *
 * The source photograph already ships with a transparent background, so it is
 * composited as a cut-out — giant name behind, subject in front, real facts
 * floating as cards. The scene sits in a perspective, so pointer movement
 * rotates it a few degrees while each layer also moves on its own Z plane:
 * a real 3D parallax rather than three independently animated divs.
 * Touch and reduced-motion users get the flat, correct layout.
 */
export function PortraitStage({
  className,
  showMeta = true,
  src = profile.portrait.src,
  alt = profile.portrait.alt,
  width = profile.portrait.width,
  height = profile.portrait.height,
}: {
  className?: string;
  /** Hide the floating availability / location cards (used by the full-bleed poster). */
  showMeta?: boolean;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", x.toFixed(4));
    el.style.setProperty("--py", y.toFixed(4));
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <div
      ref={ref}
      data-surface="ember"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "group/stage relative isolate overflow-hidden bg-ink text-cream",
        "aspect-[4/5] sm:aspect-[16/11] lg:aspect-[21/9]",
        className
      )}
      style={{ perspective: "1400px", ["--px" as never]: "0", ["--py" as never]: "0" }}
    >
      {/* Ember field */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 130% at 68% 8%, #f4551d 0%, #c2411b 38%, #8f2f10 68%, #481708 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.18] rule-grid" />

      <div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{
          transform:
            "rotateX(calc(var(--py) * -4deg)) rotateY(calc(var(--px) * 6deg))",
          transition: "transform 240ms var(--ease-out-expo)",
        }}
      >
        {/* Giant name, furthest back */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[12%] select-none text-center sm:top-[6%]"
          style={{
            transform:
              "translate3d(calc(var(--px) * -26px), calc(var(--py) * -14px), -90px)",
          }}
        >
          <span className="block whitespace-nowrap font-display text-[clamp(5rem,22vw,19rem)] font-light leading-[0.8] tracking-[-0.055em] text-cream/12">
            {profile.nameLines[0]}
          </span>
        </div>

        {/* Subject */}
        <div
          className="absolute inset-x-0 bottom-0 top-[18%] flex items-end justify-center sm:top-[8%]"
          style={{
            transform:
              "translate3d(calc(var(--px) * 12px), calc(var(--py) * 8px), 0px)",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={92}
            sizes="(min-width: 1024px) 46vw, 82vw"
            className="h-full w-auto max-w-none object-contain object-bottom contrast-[1.02] saturate-[0.96] drop-shadow-[0_28px_60px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Depth layer — availability */}
        {showMeta ? (
        <div
          className="absolute left-[var(--gutter)] top-[8%] max-w-[15rem]"
          style={{
            transform:
              "translate3d(calc(var(--px) * 40px), calc(var(--py) * 24px), 60px)",
          }}
        >
          <span className="label flex items-center gap-2 text-cream/70">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cream" />
            {profile.availabilityShort}
          </span>
          <p className="mt-3 font-display text-[clamp(1.1rem,1.8vw,1.6rem)] font-light leading-[1.15] text-cream/95">
            {profile.role}
          </p>
        </div>
        ) : null}

        {/* Depth layer — facts, bottom right */}
        {showMeta ? (
        <div
          className="absolute bottom-[8%] right-[var(--gutter)] hidden w-[15.5rem] border border-cream/20 bg-ink/30 p-4 backdrop-blur-md sm:block"
          style={{
            transform:
              "translate3d(calc(var(--px) * 54px), calc(var(--py) * 30px), 90px)",
          }}
        >
          <span className="label text-[0.68rem] text-cream/45">Working from</span>
          <p className="mt-1.5 text-sm leading-snug text-cream/90">{profile.location}</p>
          <p className="mt-3 text-[0.72rem] leading-relaxed text-cream/60">{profile.workStyle}</p>
          <p className="label mt-3 text-[0.68rem] text-cream/40">{profile.timezone}</p>
        </div>
        ) : null}

        {/* Caption, front layer */}
        {showMeta ? (
          <div className="absolute bottom-[8%] left-[var(--gutter)] hidden sm:block">
            <p className="label text-[0.68rem] tracking-[0.2em] text-cream/55">
              {profile.name} — {profile.location.split(",")[0]}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
