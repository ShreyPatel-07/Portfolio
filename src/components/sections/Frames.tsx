"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import ViewfinderFlipCarousel, {
  type ViewfinderFlipItem,
} from "@/components/ui/viewfinder-flip-carousel";
import { cn } from "@/lib/utils";

/**
 * Section 03B — the work, as a scroll-driven reel.
 *
 * On desktop the section is a pinned camera: each project zooms through the
 * next with a parallax inside the frame, while the index, caption and rail
 * follow the scroll. There is no clicking through slides. Touch users get a
 * native snap rail, and reduced-motion desktop users get the draggable contact
 * sheet instead of a 500vh scroll.
 */
type ProjectFrame = {
  title: string;
  slug: string;
  src: string;
  alt: string;
  caption: string;
};

const frames: ProjectFrame[] = [
  {
    title: "Mechengers — precision CNC",
    slug: "mechengers",
    src: "/work/mechengers.png",
    alt: "Mechengers home page — precision turned parts engineered to seal, thread and hold.",
    caption:
      "Mechengers · a CNC shop rebuilt as a product site. Twelve part families, eight process stages, one quote path.",
  },
  {
    title: "Growby — AI WhatsApp marketing",
    slug: "growby",
    src: "/work/growby.png",
    alt: "Growby home page — AI WhatsApp marketing platform.",
    caption:
      "Growby · UI migration to ASPX/CSHTML. Lighthouse 68 → 92, bounce rate down 11%.",
  },
  {
    title: "Cortex AI — agent workflows",
    slug: "cortex-ai",
    src: "/work/cortex.png",
    alt: "Cortex AI home page — the operating system for governed AI agents.",
    caption:
      "Cortex AI · user-facing workflows for configuring agents, permissions and reviewable outputs.",
  },
  {
    title: "AegisNow — insurance infrastructure",
    slug: "aegis-now",
    src: "/work/aegisnow.png",
    alt: "AegisNow home page — run insurance as a living, intelligent system.",
    caption:
      "AegisNow · a full AI-native insurance platform site, built solo across eight modules, six industries and four languages.",
  },
  {
    title: "GeneCRM — industry-aware CRM",
    slug: "genecrm",
    src: "/work/genecrm.png",
    alt: "GeneCRM home page — one CRM that speaks your industry's language.",
    caption:
      "GeneCRM · the public product site for an AI-native CRM with eight industry presets, GENE Copilot and database-level isolation.",
  },
  {
    title: "SendZen — WhatsApp API",
    slug: "sendzen",
    src: "/work/sendzen.png",
    alt: "SendZen home page — the WhatsApp API for developers.",
    caption:
      "SendZen · marketing site and user panel built end to end on one component-driven Next.js codebase.",
  },
  {
    title: "RetirewiseAI — planning",
    slug: "retirewise-ai",
    src: "/work/retirewise.png",
    alt: "Retirewise AI home page — AI-powered retirement planning.",
    caption:
      "RetirewiseAI · 250+ defects cleared, then the advisor and individual dashboards redesigned around readable data.",
  },
  {
    title: "Incredible Men — ecommerce",
    slug: "incredible-men",
    src: "/work/incredible-men.png",
    alt: "Incredible Men storefront — men's face wash hero and category navigation.",
    caption:
      "Incredible Men · production Flutter screens and a live responsive storefront.",
  },
  {
    title: "Chip — snack brand",
    slug: "chip-website",
    src: "/work/chip-website.png",
    alt: "Chip snack brand landing page — green hero with a crisp packet.",
    caption:
      "Chip · a brand landing page that keeps poster-scale type honest from desktop to phone.",
  },
  {
    title: "Amazon — marketplace study",
    slug: "amazon-clone",
    src: "/work/amazon-clone-live.png",
    alt: "Marketplace-style homepage reconstruction with search, category shelves and promotional grid.",
    caption:
      "Amazon clone · a front-end study in marketplace hierarchy, shelf systems and responsive density.",
  },
];

type LenisLike = { scrollTo: (target: number, options?: { duration?: number }) => void };

export function Frames() {
  const [compact, setCompact] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const reel = !compact && !reduced;

  return (
    <section id="frames" className="relative overflow-clip bg-ink py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[620px] bg-[radial-gradient(ellipse_at_50%_50%,rgba(244,85,29,0.10),transparent_62%)]"
      />

      <div className="shell relative z-10">
        <SectionHeader
          index="03 · B"
          label="Field notes"
          meta={
            reel
              ? `${frames.length} captures · scroll to travel`
              : compact
                ? `${frames.length} captures · swipe to travel`
                : `${frames.length} captures · drag or arrow keys`
          }
          title={
            <h2 id="frames-title" className="display-lg mt-4 text-cream">
              The work, <em className="italic text-flame">frame by frame</em>
            </h2>
          }
          lead={
            <p>
              {reel
                ? `Scroll to travel through ${frames.length} shipped products. Each frame zooms through the next while the detail inside it drifts — one continuous move, not a carousel of clicks.`
                : compact
                  ? `Swipe through ${frames.length} shipped products, one full frame at a time. No rotating stack, no cropped screenshots — just the work moving like the project rail.`
                  : `${frames.length} shipped products, one frame at a time. Drag the contact sheet or use the arrow keys to move between them.`}
            </p>
          }
        />
      </div>

      {reel ? (
        <ProjectReel />
      ) : compact ? (
        <MobileFramesRail />
      ) : (
        <div className="shell relative z-10">
          <ContactSheet />
        </div>
      )}
    </section>
  );
}

function MobileFramesRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = [...rail.querySelectorAll<HTMLElement>("[data-frame-card]")];
      if (!cards.length) return;

      const center = rail.scrollLeft + rail.clientWidth / 2;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const nextDistance = Math.abs(cardCenter - center);
        if (nextDistance < distance) {
          closest = index;
          distance = nextDistance;
        }
      });

      const max = rail.scrollWidth - rail.clientWidth;
      setActive(closest);
      setProgress(max > 0 ? Math.min(1, Math.max(0, rail.scrollLeft / max)) : 1);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (index: number) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(`[data-frame-card="${index}"]`);
    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft });
  };

  return (
    <div className="mt-8">
      <div className="shell flex items-center justify-between gap-4 border-t border-cream/12 pt-3">
        <span className="label text-cream/40">
          <span className="text-flame">{String(active + 1).padStart(2, "0")}</span> /{" "}
          {String(frames.length).padStart(2, "0")} — contact sheet
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous frame"
            className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 text-cream/50 transition-colors disabled:opacity-25"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(frames.length - 1, active + 1))}
            disabled={active === frames.length - 1}
            aria-label="Next frame"
            className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 text-cream/50 transition-colors disabled:opacity-25"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        aria-label="Field notes — project captures"
        className="no-scrollbar relative mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2"
      >
        {frames.map((frame, index) => (
          <Link
            key={frame.src}
            href={`/work/${frame.slug}`}
            data-frame-card={index}
            className="group w-[82vw] max-w-[430px] shrink-0 snap-start"
          >
            <div className="relative aspect-[16/10] overflow-hidden border border-cream/15 bg-ink-2">
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="82vw"
                priority={index === 0}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <span className="label absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-flame/50 bg-ink/70 px-3 py-2 text-flame backdrop-blur-md">
                Open case study <span aria-hidden>↗</span>
              </span>
            </div>
            <div className="mt-3 border-t border-cream/12 pt-3">
              <span className="label text-flame">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-1.5 font-display text-[clamp(1.3rem,5vw,1.7rem)] leading-tight text-cream">
                {frame.title.split(" — ")[0]}
              </h3>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-cream/50">{frame.caption}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="shell mt-2">
        <div className="h-px w-full bg-cream/10">
          <div
            className="h-px origin-left bg-flame transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(5, progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ProjectReel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(smooth, "change", (value) => {
    const next = Math.min(
      frames.length - 1,
      Math.max(0, Math.round(value * (frames.length - 1)))
    );
    setActive((current) => (current === next ? current : next));
  });

  const current = frames[active];
  const jump = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, el.offsetHeight - window.innerHeight);
    const target = top + (index / (frames.length - 1)) * distance;
    const lenis = (window as unknown as { __spLenis?: LenisLike }).__spLenis;
    if (lenis) lenis.scrollTo(target, { duration: 1.15 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      ref={trackRef}
      data-reel-track
      className="relative mt-10"
      style={{ height: `${frames.length * 64}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="shell w-full">
          <div
            className="grid items-center gap-8 lg:gap-10"
            style={{ gridTemplateColumns: "minmax(0, 1fr) 280px" }}
          >
            <div>
              <div className="group/frame relative aspect-[16/10] max-h-[58svh] w-full overflow-hidden border border-cream/15 bg-ink-2">
                {frames.map((frame, index) => (
                  <ReelSlide
                    key={frame.src}
                    frame={frame}
                    index={index}
                    total={frames.length}
                    progress={smooth}
                  />
                ))}

                {/* The active frame is the link: the reel stays a pure scroll
                    instrument, but the project in front of you is always one
                    click away from its case study. */}
                <Link
                  href={`/work/${current.slug}`}
                  data-cursor="Case study"
                  aria-label={`Open ${current.title} case study`}
                  className="absolute inset-0 z-20"
                >
                  <span className="label absolute bottom-16 right-5 flex items-center gap-2 rounded-full border border-flame/50 bg-ink/75 px-3.5 py-2.5 text-flame backdrop-blur-md transition-colors duration-300 group-hover/frame:bg-flame group-hover/frame:text-ink">
                    Open case study <span aria-hidden>↗</span>
                  </span>
                </Link>

                {/* Film gate */}
                <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
                  <span className="absolute left-0 top-0 h-5 w-px bg-cream/30" />
                  <span className="absolute left-0 top-0 h-px w-5 bg-cream/30" />
                  <span className="absolute right-0 top-0 h-5 w-px bg-cream/30" />
                  <span className="absolute right-0 top-0 h-px w-5 bg-cream/30" />
                  <span className="absolute bottom-0 left-0 h-5 w-px bg-cream/30" />
                  <span className="absolute bottom-0 left-0 h-px w-5 bg-cream/30" />
                  <span className="absolute bottom-0 right-0 h-5 w-px bg-cream/30" />
                  <span className="absolute bottom-0 right-0 h-px w-5 bg-cream/30" />
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 bg-gradient-to-b from-ink/55 to-transparent px-5 pb-10 pt-4">
                  <span className="label text-cream/65">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(frames.length).padStart(2, "0")}
                  </span>
                  <span className="label text-cream/45">scroll to travel</span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/60 to-transparent px-5 pb-4 pt-12">
                  <span className="label text-cream/55">Selected work · 2026</span>
                  <span className="label hidden text-cream/40 sm:block">
                    {String(active + 1).padStart(2, "0")} — {current.title}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-cream/12 pt-3">
                <span className="label text-cream/40">
                  <span className="text-flame">{String(active + 1).padStart(2, "0")}</span> /{" "}
                  {String(frames.length).padStart(2, "0")} — contact sheet
                </span>
                <span className="label hidden text-cream/30 sm:block">
                  scroll · click a name to jump
                </span>
              </div>
            </div>

            <aside>
              <span className="label text-flame">Now viewing</span>

              <div className="mt-3 flex items-end gap-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[clamp(3.2rem,6vw,5rem)] leading-none text-cream"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="label pb-2 text-cream/30">
                  / {String(frames.length).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="mt-5 font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.05] text-cream">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-cream/55">
                    {current.caption}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 h-px w-full bg-cream/10">
                <motion.div style={{ scaleX: smooth }} className="h-full origin-left bg-flame" />
              </div>

              <div className="mt-4">
                {frames.map((frame, index) => (
                  <button
                    key={frame.src}
                    type="button"
                    onClick={() => jump(index)}
                    aria-current={index === active ? "true" : undefined}
                    className={cn(
                      "group flex w-full items-center gap-3 py-1.5 text-left transition-colors duration-300",
                      index === active ? "text-cream" : "text-cream/35 hover:text-cream/70"
                    )}
                  >
                    <span className="label w-5 shrink-0 text-[0.68rem]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "h-px flex-1 transition-colors duration-300",
                        index === active ? "bg-flame" : "bg-current opacity-20"
                      )}
                    />
                    <span className="label max-w-[9.5rem] truncate text-[0.68rem]">
                      {frame.title.split(" — ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReelSlide({
  frame,
  index,
  total,
  progress,
}: {
  frame: ProjectFrame;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // distance = 0 while this frame is the subject, −1 before and +1 after.
  const distance = useTransform(progress, (value) => value * (total - 1) - index);
  const opacity = useTransform(distance, [-1, -0.55, 0, 0.55, 1], [0, 0.65, 1, 0.65, 0]);
  const scale = useTransform(distance, [-1, 0, 1], [1.22, 1, 1.14]);
  const y = useTransform(distance, [-1, 0, 1], [42, 0, -42]);
  const blur = useTransform(distance, [-1, 0, 1], ["blur(9px)", "blur(0px)", "blur(7px)"]);
  const imageY = useTransform(distance, [-1, 0, 1], ["-2.5%", "0%", "2.5%"]);
  const imageScale = useTransform(distance, [-1, 0, 1], [1.1, 1.04, 1.08]);

  return (
    <motion.div
      style={{ opacity, scale, y, filter: blur, zIndex: index }}
      className="absolute inset-0 will-change-transform"
    >
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Image
          src={frame.src}
          alt={frame.alt}
          fill
          sizes="(min-width: 1024px) 72vw, 100vw"
          priority={index === 0}
          className="object-cover object-top"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-ink/15" />
    </motion.div>
  );
}

function ContactSheet() {
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ open: 440, size: 380, height: 560 });
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const current = frames[active];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      const open = Math.max(268, Math.min(440, width - 56));
      const size = Math.max(224, Math.min(380, open - 52));
      setDims({ open, size, height: Math.max(430, size + 176) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="mt-10 flex items-baseline justify-between gap-4 border-t border-cream/12 pt-4">
        <span className="label text-cream/45">
          <span className="text-flame">{String(active + 1).padStart(2, "0")}</span> /{" "}
          {String(frames.length).padStart(2, "0")} — contact sheet
        </span>
        <span className="label hidden text-cream/30 sm:block">drag · ← → · click</span>
      </div>

      <div
        ref={wrapRef}
        className="relative mt-5 overflow-hidden rounded-[2px] border border-cream/12 bg-ink-2"
      >
        <ViewfinderFlipCarousel
          items={frames.map((frame) => ({ ...frame, href: `/work/${frame.slug}` }))}
          height={`${dims.height}px`}
          size={dims.size}
          openWidth={dims.open}
          foldedWidth={58}
          tilt={62}
          roll={90}
          radius={4}
          duration={0.78}
          bounce={0.18}
          titles
          controls
          color="#f4eee3"
          fontFamily="var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif"
          objectPosition="50% 14%"
          onIndexChange={setActive}
          ariaLabel="Field notes — project captures"
        />
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-12 md:items-baseline">
        <p className="max-w-[72ch] text-[0.9rem] leading-relaxed text-cream/55 md:col-span-9">
          {current.caption}
        </p>
        <div className="md:col-span-3 md:text-right">
          <p className="label text-cream/30">{current.title}</p>
          <Link
            href={`/work/${current.slug}`}
            className="label mt-2 inline-flex items-center gap-1.5 text-flame transition-colors hover:text-cream"
          >
            Open case study <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </>
  );
}
