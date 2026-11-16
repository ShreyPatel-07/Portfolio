"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  SiChartdotjs,
  SiClaude,
  SiDotnet,
  SiExpress,
  SiFigma,
  SiFlutter,
  SiGooglegemini,
  SiGoogle,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiStripe,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

/**
 * The stack as a real 3D scene.
 *
 * This is not a CSS ring: every mark has a world-space position, the whole
 * group is rotated in X (the disc tilt) and Y (pointer), and each mark is then
 * pushed through a perspective divide — so a mark at the back of the disc is
 * genuinely smaller, dimmer and painted behind one at the front, and the guide
 * rings are the projected path of the orbit rather than a drawn ellipse.
 *
 * The marks stay real buttons. A canvas would have meant re-implementing focus,
 * hover and screen readers, so the projection drives the DOM instead: the maths
 * is 3D, the interaction stays native. The stage is an isolated stacking
 * context and the projected z-index has a ceiling, so a near mark can never
 * paint over the fixed masthead as the section scrolls past it.
 */
type IconType = typeof SiReact;

type MarkSource = {
  Icon?: IconType;
  /** Letterform used where no brand mark exists in Simple Icons. */
  glyph?: string;
  label: string;
};

type Mark = MarkSource & {
  ring: 0 | 1 | 2;
  angle: number;
  lift: number;
  radius: number;
};

const OUTER: MarkSource[] = [
  { Icon: SiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiJavascript, label: "JavaScript" },
  { Icon: SiTailwindcss, label: "Tailwind CSS" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiDotnet, label: ".NET" },
  { Icon: SiFlutter, label: "Flutter" },
  { Icon: SiThreedotjs, label: "Three.js" },
  { Icon: SiFigma, label: "Figma" },
  { Icon: SiStripe, label: "Stripe" },
  { Icon: SiVercel, label: "Vercel" },
  { Icon: SiGreensock, label: "GSAP" },
  { Icon: SiHtml5, label: "HTML5" },
];

const MIDDLE: MarkSource[] = [
  { Icon: SiMongodb, label: "MongoDB" },
  { Icon: SiChartdotjs, label: "Chart.js" },
  { Icon: SiRedux, label: "Redux" },
  { Icon: SiExpress, label: "Express" },
  { glyph: "GPT", label: "ChatGPT" },
  { Icon: SiClaude, label: "Claude Code" },
  { Icon: SiGooglegemini, label: "Gemini" },
  { Icon: SiGoogle, label: "Google AI Studio" },
];

const INNER: MarkSource[] = [
  { glyph: "fb", label: "Freebuff" },
  { glyph: "sm", label: "Speechma" },
  { glyph: "cl", label: "Clueso" },
  { glyph: "hf", label: "Hyperframe" },
];

const total = OUTER.length + MIDDLE.length + INNER.length;

type OrbitLayer = "all" | "core" | "data" | "tools";

const LAYERS: { id: OrbitLayer; label: string; detail: string }[] = [
  { id: "all", label: "All layers", detail: "Every ring" },
  { id: "core", label: "Core stack", detail: "Outer ring" },
  { id: "data", label: "Data & AI", detail: "Middle ring" },
  { id: "tools", label: "AI tools", detail: "Inner ring" },
];

const ringForLayer: Record<Exclude<OrbitLayer, "all">, 0 | 1 | 2> = {
  core: 0,
  data: 1,
  tools: 2,
};

/** Three rings with small radius and height differences so the disc is a volume. */
const MARKS: Mark[] = [
  ...OUTER.map((mark, i) => ({
    ...mark,
    ring: 0 as const,
    angle: (i / OUTER.length) * Math.PI * 2,
    lift: ((i % 3) - 1) * 0.09,
    radius: 1.02 + ((i % 2) - 0.5) * 0.07,
  })),
  ...MIDDLE.map((mark, i) => ({
    ...mark,
    ring: 1 as const,
    angle: (i / MIDDLE.length) * Math.PI * 2 + 0.34,
    lift: ((i % 3) - 1) * 0.12,
    radius: 0.8 + ((i % 2) - 0.5) * 0.04,
  })),
  ...INNER.map((mark, i) => ({
    ...mark,
    ring: 2 as const,
    angle: (i / INNER.length) * Math.PI * 2 + 0.9,
    lift: ((i % 3) - 1) * 0.15,
    radius: 0.57 + ((i % 2) - 0.5) * 0.03,
  })),
];

const RING_RADII = [1.03, 0.8, 0.57];

export function TechOrbit({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [layer, setLayer] = useState<OrbitLayer>("all");

  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const guides = useRef<(SVGPathElement | null)[]>([]);
  const pausedRef = useRef(false);
  const hoveredRef = useRef<string | null>(null);
  const layerRef = useRef<OrbitLayer>("all");
  const pointer = useRef({ x: 0, y: 0 });

  pausedRef.current = paused || hovered !== null;
  hoveredRef.current = hovered;
  layerRef.current = layer;

  const visibleRings =
    layer === "all" ? [0, 1, 2] : [ringForLayer[layer]];
  const visibleMarks = MARKS.filter((mark) => visibleRings.includes(mark.ring));

  useEffect(() => {
    if (reduced) return;
    const el = stage.current;
    if (!el) return;

    let frame = 0;
    let spin = 0;
    let tilt = 0.82;
    let yaw = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;

      const width = el.clientWidth;
      const height = el.clientHeight;
      if (width && height) {
        if (!pausedRef.current) spin += delta * 0.22;

        // The camera leans toward the pointer; the disc itself keeps turning.
        tilt += (0.82 + pointer.current.y * 0.14 - tilt) * 0.06;
        yaw += (pointer.current.x * 0.34 - yaw) * 0.06;

        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        // Separate focal lengths: a wide, cinematic disc that uses the section's
        // width, while the vertical squash keeps the near marks inside the frame.
        const unitX = width * 0.3;
        const unitY = height * 0.37;
        const cx = width / 2;
        const cy = height * 0.52;
        const cam = 4.4;
        // Marks are clamped inside the stage so the focus ring is never clipped.
        const insetX = 34;
        const insetY = 30;

        const project = (x: number, y: number, z: number) => {
          const yTilted = y * cosT - z * sinT;
          const zTilted = y * sinT + z * cosT;
          const xYawed = x * cosY + zTilted * sinY;
          const zYawed = -x * sinY + zTilted * cosY;
          const perspective = cam / (cam + zYawed);
          return {
            left: cx + xYawed * perspective * unitX,
            top: cy + yTilted * perspective * unitY,
            perspective,
            depth: zYawed,
          };
        };

        MARKS.forEach((mark, index) => {
          const node = nodes.current[index];
          if (!node) return;
          const activeLayer = layerRef.current;
          const shown =
            activeLayer === "all" ||
            ringForLayer[activeLayer] === mark.ring;
          if (!shown) {
            node.style.opacity = "0";
            node.style.pointerEvents = "none";
            return;
          }
          node.style.pointerEvents = "";
          const angle = mark.angle + spin * (mark.ring === 2 ? -1.7 : mark.ring === 1 ? -1.15 : 1);
          const point = project(
            Math.cos(angle) * mark.radius,
            mark.lift,
            Math.sin(angle) * mark.radius
          );

          const focus = hoveredRef.current === mark.label;
          const scale = point.perspective * (focus ? 1.2 : 1);
          const near = (1.15 - point.depth) / 2.3;
          const left = Math.min(width - insetX, Math.max(insetX, point.left));
          const top = Math.min(height - insetY, Math.max(insetY, point.top));

          node.style.transform = `translate3d(${left.toFixed(2)}px, ${top.toFixed(
            2
          )}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
          node.style.opacity = (0.56 + near * 0.44).toFixed(3);
          // A bounded z-index inside an isolated stage: near marks paint above
          // far ones, but nothing can escape over the masthead.
          node.style.zIndex = String(Math.min(40, Math.max(1, Math.round((cam - point.depth) * 8))));
          node.style.boxShadow = `0 ${(10 + near * 16).toFixed(1)}px ${(
            18 + near * 26
          ).toFixed(1)}px -18px rgba(0,0,0,${(0.28 + near * 0.3).toFixed(2)})`;
        });

        RING_RADII.forEach((radius, ringIndex) => {
          const path = guides.current[ringIndex];
          if (!path) return;
          let d = "";
          for (let step = 0; step <= 110; step += 1) {
            const angle = (step / 110) * Math.PI * 2;
            const point = project(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
            d += `${step === 0 ? "M" : "L"}${point.left.toFixed(1)} ${point.top.toFixed(1)}`;
          }
          path.setAttribute("d", `${d}Z`);
        });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = (event.clientX - rect.left) / rect.width - 0.5;
    pointer.current.y = (event.clientY - rect.top) / rect.height - 0.5;
  };

  const markClass =
    "orbit-mark absolute left-0 top-0 grid h-11 w-11 cursor-pointer appearance-none place-items-center rounded-full border border-ink/25 bg-cream text-ink/80 transition-colors duration-300 hover:border-flame hover:text-flame focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-flame";

  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/12 pt-5">
        <span className="label flex items-center gap-2 text-ink/50">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          The stack, in orbit
        </span>
        <span className="label text-ink/35">{total} technologies</span>
      </div>

      <div
        className="mt-4 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Technology orbit layer"
      >
        <span className="label mr-1 text-[0.67rem] text-ink/35">Layer</span>
        {LAYERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={layer === item.id}
            onClick={() => {
              setLayer(item.id);
              setHovered(null);
            }}
            className={`label rounded-full border px-3 py-1.5 text-[0.67rem] transition-colors duration-300 ${
              layer === item.id
                ? "border-ember bg-ember text-cream"
                : "border-ink/15 text-ink/55 hover:border-ink/35 hover:text-ink"
            }`}
          >
            {item.label}
            <span className="ml-1.5 opacity-55">{item.detail}</span>
          </button>
        ))}
      </div>

      {reduced ? (
        <ul className="mt-6 flex flex-wrap gap-3" aria-label="Technologies">
          {visibleMarks.map(({ Icon, glyph, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 border border-ink/12 px-3 py-2 text-ink/70"
            >
              {Icon ? (
                <Icon aria-hidden className="h-4 w-4" />
              ) : (
                <span aria-hidden className="font-display text-[0.68rem] uppercase tracking-wide">
                  {glyph}
                </span>
              )}
              <span className="label text-[0.68rem] text-ink/60">{label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {/* Below md the camera has no room: phones get the same set as named
              chips instead of an unreadable pile. */}
          <ul className="mt-6 flex flex-wrap gap-2 md:hidden" aria-label="Technologies">
            {visibleMarks.map(({ Icon, glyph, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-ink/12 bg-cream/60 px-3 py-1.5 text-ink/70"
              >
                {Icon ? (
                  <Icon aria-hidden className="h-4 w-4" />
                ) : (
                  <span aria-hidden className="font-display text-[0.68rem] uppercase tracking-wide">
                    {glyph}
                  </span>
                )}
                <span className="label text-[0.6rem] text-ink/60">{label}</span>
              </li>
            ))}
          </ul>

          <div
            ref={stage}
            className="relative isolate mt-8 hidden h-[clamp(380px,40vw,570px)] overflow-hidden md:block"
            data-paused={paused}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHovered(null);
              pointer.current = { x: 0, y: 0 };
            }}
            onPointerMove={onPointerMove}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false);
                setHovered(null);
              }
            }}
            aria-label="Technology orbit"
            role="group"
          >
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              {RING_RADII.map((radius, index) =>
                visibleRings.includes(index) ? (
                <path
                  key={radius}
                  ref={(node) => {
                    guides.current[index] = node;
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={index === 0 ? 0.14 : index === 1 ? 0.18 : 0.22}
                  strokeWidth={1}
                  strokeDasharray={index === 0 ? "3 7" : index === 1 ? "2 6" : "1 5"}
                  className="text-ink"
                />
                ) : null
              )}
            </svg>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-20 w-20 place-content-center place-items-center rounded-full border border-dashed border-ink/20 bg-[radial-gradient(circle,rgba(191,66,27,0.10),transparent_70%)] text-center">
                {hovered ? (
                  <span
                    key={hovered}
                    className="orbit-readout font-display text-[0.92rem] leading-[1.1] tracking-[-0.01em] text-ember"
                  >
                    {hovered}
                  </span>
                ) : (
                  <>
                    <span className="label text-[0.5rem] tracking-[0.18em] text-ink/40">
                      {visibleMarks.length} tools
                    </span>
                    <span className="label mt-0.5 text-[0.5rem] text-ink/30">
                      {layer === "all" ? "in orbit" : LAYERS.find((item) => item.id === layer)?.label}
                    </span>
                  </>
                )}
              </div>
            </div>

            {MARKS.map(({ Icon, glyph, label, ring }, index) => {
              const shown = visibleRings.includes(ring);
              return (
              <button
                key={label}
                ref={(node) => {
                  nodes.current[index] = node;
                }}
                type="button"
                aria-label={label}
                aria-hidden={!shown}
                tabIndex={shown ? 0 : -1}
                className={markClass}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(label)}
                onBlur={() => setHovered(null)}
              >
                {Icon ? (
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                ) : (
                  <span
                    aria-hidden
                    className="font-display text-[0.78rem] font-medium tracking-[-0.02em]"
                  >
                    {glyph}
                  </span>
                )}
              </button>
              );
            })}
          </div>

          <p aria-live="polite" className="mt-2 hidden text-[0.78rem] text-ink/40 md:block">
            {hovered
              ? `${hovered} — one of ${visibleMarks.length} technologies in this layer.`
              : "Choose a layer, then hover or tab to a mark — the orbit pauses while you read."}
          </p>
        </>
      )}
    </div>
  );
}
