import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project, VisualPattern } from "@/content/projects";
import { LoopVideo } from "@/components/ui/LoopVideo";

/**
 * Renders a project's imagery.
 *
 * If a real capture exists it is used. Otherwise we draw an art-directed
 * placeholder plate in the house palette — never a fabricated screenshot — and
 * label it, so nobody mistakes invented artwork for evidence of the product.
 * Projects with a recorded clip get a still that becomes motion on hover.
 */
export function ProjectVisual({
  project,
  className,
  priority = false,
  showPlaceholderNote = false,
  playVideo = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  showPlaceholderNote?: boolean;
  playVideo?: boolean;
  sizes?: string;
}) {
  const { visual } = project;

  if (visual.hasScreenshot && visual.src) {
    return (
      <div className={cn("relative overflow-hidden bg-ink-2", className)}>
        {visual.video && playVideo ? (
          <LoopVideo
            src={visual.video}
            poster={visual.src}
            alt={visual.alt ?? `${project.name} interface`}
            sizes={sizes}
          />
        ) : (
          <Image
            src={visual.src}
            alt={visual.alt ?? `${project.name} interface`}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-top",
              // A portrait capture is shown whole, never cropped to fit a
              // landscape frame — a stretched screenshot would misrepresent it.
              visual.portrait ? "object-contain" : "object-cover"
            )}
          />
        )}
        {visual.portrait ? (
          <span className="label absolute bottom-3 left-3 z-10 rounded-full bg-ink/75 px-2.5 py-1 text-[0.66rem] text-cream/70 backdrop-blur">
            Mobile capture
          </span>
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-ink-2", className)}>
      <GeneratedPlate
        accent={visual.accent}
        pattern={visual.pattern}
        index={project.index}
        name={project.name}
        caption={visual.caption}
      />
      {showPlaceholderNote ? (
        <p className="label absolute inset-x-4 bottom-3 z-10 text-[0.70rem] text-cream/40">
          Placeholder artwork — add a real capture to /public/work
        </p>
      ) : null}
    </div>
  );
}

function GeneratedPlate({
  accent,
  pattern,
  index,
  name,
  caption,
}: {
  accent: string;
  pattern: VisualPattern;
  index: string;
  name: string;
  caption: string;
}) {
  const id = `plate-${index}`;
  return (
    <div data-surface="ember" className="plate absolute inset-0">
      <svg
        aria-hidden
        viewBox="0 0 800 560"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id={`${id}-glow`} cx="72%" cy="18%" r="85%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="45%" stopColor={accent} stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0a0908" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0908" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a0908" stopOpacity="0.92" />
          </linearGradient>
          <pattern id={`${id}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0H0V50" fill="none" stroke="#f4eee3" strokeOpacity="0.08" />
          </pattern>
        </defs>

        <rect width="800" height="560" fill="#0d0b0a" />
        <rect width="800" height="560" fill={`url(#${id}-grid)`} />
        <rect width="800" height="560" fill={`url(#${id}-glow)`} />

        <g stroke={accent} fill="none" strokeWidth="1">
          {pattern === "orbit" && (
            <>
              <circle cx="560" cy="200" r="64" strokeOpacity="0.9" />
              <circle cx="560" cy="200" r="112" strokeOpacity="0.5" />
              <circle cx="560" cy="200" r="164" strokeOpacity="0.28" />
              <circle cx="560" cy="200" r="218" strokeOpacity="0.14" />
              <path d="M340 200h444" strokeOpacity="0.25" />
              <path d="M560 -20v440" strokeOpacity="0.2" />
            </>
          )}
          {pattern === "wave" && (
            <>
              {[0, 1, 2, 3, 4, 5].map((line) => (
                <path
                  key={line}
                  d={`M-20 ${250 + line * 34} C 160 ${170 + line * 34}, 300 ${330 + line * 26}, 470 ${
                    250 + line * 34
                  } S 720 ${150 + line * 40}, 830 ${220 + line * 36}`}
                  strokeOpacity={0.5 - line * 0.06}
                />
              ))}
            </>
          )}
          {pattern === "grid" && (
            <>
              {[0, 1, 2, 3, 4, 5, 6].map((col) => (
                <rect
                  key={col}
                  x={420 + col * 44}
                  y={140 + (col % 3) * 40}
                  width="30"
                  height={200 - (col % 3) * 30}
                  fill={col % 2 ? accent : "#f4eee3"}
                  fillOpacity={0.08 + col * 0.045}
                  stroke="none"
                />
              ))}
              <path d="M380 380h400" strokeOpacity="0.35" />
            </>
          )}
          {pattern === "stack" && (
            <>
              {[0, 1, 2, 3].map((band) => (
                <rect
                  key={band}
                  x={410 + band * 26}
                  y={130 + band * 46}
                  width={300 - band * 26}
                  height="34"
                  rx="17"
                  fill={band === 0 ? accent : "#f4eee3"}
                  fillOpacity={0.16 + band * 0.05}
                  stroke="#f4eee3"
                  strokeOpacity="0.18"
                />
              ))}
            </>
          )}
          {pattern === "prism" && (
            <>
              <path d="M560 60 L700 300 L420 300 Z" fill={accent} fillOpacity="0.16" />
              <path d="M560 60 L700 300 L420 300 Z" strokeOpacity="0.7" />
              <path d="M560 130 L640 278 L480 278 Z" strokeOpacity="0.45" fill="none" />
              <path d="M420 300h280" strokeOpacity="0.3" />
            </>
          )}
        </g>

        <rect y="350" width="800" height="210" fill={`url(#${id}-fade)`} />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
        <div className="flex items-start justify-between">
          <span
            className="label shrink-0 rounded-full border px-3 py-1 text-[0.68rem]"
            style={{ borderColor: `${accent}66`, color: accent }}
          >
            {index}
          </span>
          <span className="label plate-caption text-[0.68rem] text-cream/40">{caption}</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <span
            className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.8] tracking-[-0.04em]"
            style={{ WebkitTextStroke: `1px ${accent}88`, color: "transparent" }}
          >
            {index}
          </span>
          <span className="label max-w-[16ch] text-right text-[0.68rem] leading-relaxed text-cream/35">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}
