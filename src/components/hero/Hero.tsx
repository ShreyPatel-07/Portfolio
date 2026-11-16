"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

import { profile } from "@/content/profile";
import { WordReveal } from "@/components/ui/Reveal";
import { ActionLink } from "@/components/ui/Button";
import { PortraitStage } from "@/components/ui/PortraitStage";

const EmberScene = dynamic(
  () => import("@/components/hero/EmberScene").then((mod) => mod.EmberScene),
  { ssr: false }
);

/**
 * Cinematic opening.
 *
 * The first screen is the editorial hero. As you scroll, a full-bleed portrait
 * poster rises from below, clips open to the frame edges and holds while the
 * type recedes — one continuous camera-like move rather than a cut. The whole
 * sequence lives in a tall wrapper with a sticky stage, so the page is never
 * scroll-jacked: it is ordinary scrolling, just with a pinned frame.
 *
 * Reduced motion skips the pinning entirely and renders the flat hero.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobilePosterRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const cinematic = !reduced && !isMobile;

  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = mobileTrackRef.current;
    const poster = mobilePosterRef.current;
    if (!isMobile || reduced || !track || !poster) return;

    const update = () => {
      const distance = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / distance));
      poster.style.transform = `translateY(${(1 - progress) * 100}%)`;
    };

    type LenisLike = {
      on: (event: "scroll", callback: () => void) => void;
      off: (event: "scroll", callback: () => void) => void;
    };
    let lenis: LenisLike | undefined;
    const bindLenis = () => {
      const instance = (window as unknown as { __spLenis?: LenisLike }).__spLenis;
      if (!instance || lenis) return;
      lenis = instance;
      lenis.on("scroll", update);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    bindLenis();
    const lenisTimer = window.setTimeout(bindLenis, 250);
    return () => {
      window.clearTimeout(lenisTimer);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      lenis?.off("scroll", update);
    };
  }, [isMobile, reduced]);

  // The opening title owns the first two seconds. On a first visit the name
  // converges as that panel lifts; on a repeat visit it plays immediately.
  const [introDelay] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      return window.sessionStorage.getItem("sp-intro-played") ? 0 : 2.1;
    } catch {
      return 0;
    }
  });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const baseScale = useTransform(scrollYProgress, [0, 0.42], [1, cinematic ? 0.94 : 1]);
  const baseOpacity = useTransform(scrollYProgress, [0.02, 0.34], [1, cinematic ? 0 : 1]);
  const baseY = useTransform(scrollYProgress, [0, 1], ["0%", cinematic ? "-6%" : "0%"]);

  const posterY = useTransform(scrollYProgress, [0.04, 0.46], ["104%", "0%"]);
  const posterScale = useTransform(scrollYProgress, [0.6, 1], [1, cinematic ? 1.05 : 1]);
  const posterClip = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    ["inset(7% 4% 0% 4% round 26px)", "inset(0% 0% 0% 0% round 0px)"]
  );
  const barHeight = useTransform(scrollYProgress, [0.28, 0.52], [0, 18]);
  const posterCaption = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const emberScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const stage = (
    <section
      id="hero"
      className="hero-stage relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink pb-6 pt-[4.9rem] md:pb-8 md:pt-28"
      aria-labelledby="hero-name"
    >
      {/* Ember field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ambient-glow absolute -right-[18%] top-[-12%] h-[76vw] w-[76vw] max-w-[1050px] rounded-full bg-[radial-gradient(circle,rgba(244,85,29,0.30),rgba(191,66,27,0.10)_42%,transparent_68%)] blur-[10px] md:-right-[8%]" />
        <div className="absolute inset-0 rule-grid opacity-[0.18]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Ghost masthead — the reference's oversized word behind the reveal. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[7rem] z-0 select-none overflow-hidden md:top-[8rem]"
      >
        <p className="shell whitespace-nowrap font-display text-[clamp(6rem,20vw,20rem)] font-light leading-[0.72] tracking-[-0.055em] text-cream/[0.045] [-webkit-text-stroke:1px_rgba(244,238,227,0.08)]">
          Shrey Patel
        </p>
      </div>

      {/* Film gate: corner ticks and a hairline aperture. */}
      <div aria-hidden className="pointer-events-none absolute inset-4 z-10 md:inset-6">
        <span className="absolute left-0 top-0 h-4 w-px bg-cream/25" />
        <span className="absolute left-0 top-0 h-px w-4 bg-cream/25" />
        <span className="absolute right-0 top-0 h-4 w-px bg-cream/25" />
        <span className="absolute right-0 top-0 h-px w-4 bg-cream/25" />
        <span className="absolute bottom-0 left-0 h-4 w-px bg-cream/25" />
        <span className="absolute bottom-0 left-0 h-px w-4 bg-cream/25" />
        <span className="absolute bottom-0 right-0 h-4 w-px bg-cream/25" />
        <span className="absolute bottom-0 right-0 h-px w-4 bg-cream/25" />
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
      </div>

      <motion.div
        style={cinematic ? { scale: baseScale, opacity: baseOpacity, y: baseY } : undefined}
        className="shell relative z-10 origin-top"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-flame pulse-dot" />
            <span className="label text-cream/55">{profile.availabilityShort}</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span className="label text-cream/40">Portfolio — 2026</span>
            <span className="label text-cream/40">{profile.location}</span>
          </div>
        </div>

        <div className="hero-main mt-6 grid items-start gap-6 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label max-w-[34ch] text-cream/55 md:max-w-none">
              {profile.role} — interfaces, systems &amp; the stack beneath them
            </p>

            <h1 id="hero-name" className="hero-name display-xl mt-5 text-cream md:mt-7">
              <span className="block">
                <WordReveal
                  as="span"
                  text="Shrey"
                  immediate
                  converge
                  delay={introDelay}
                  stagger={0.11}
                />
              </span>
              <span className="mt-1 flex flex-wrap items-end gap-x-6 gap-y-2 md:mt-2">
                <WordReveal
                  as="span"
                  text="Patel"
                  immediate
                  converge
                  delay={0.16 + introDelay}
                  stagger={0.11}
                  className="text-flame"
                />
                <span className="mb-1 hidden items-center gap-3 md:mb-4 md:flex">
                  <span className="h-px w-12 bg-cream/30 lg:w-20" />
                  <span className="label leading-relaxed text-cream/50">
                    Building for
                    <br />
                    the web since 2023
                  </span>
                </span>
              </span>
            </h1>
          </div>

          <div className="relative hidden h-[42vw] w-full md:col-span-4 md:mt-0 md:block md:h-[34vw] md:max-h-[420px]">
            <motion.div style={{ scale: emberScale }} className="absolute inset-0">
              <EmberScene />
            </motion.div>
            <span className="label absolute -bottom-2 left-0 hidden text-cream/30 md:block">
              Fig. 01 — ember core
            </span>
          </div>
        </div>

        <div className="hero-bottom mt-6 grid gap-5 border-t border-cream/12 pt-5 md:mt-12 md:gap-8 md:pt-6 md:grid-cols-12 md:items-end">
          <p className="body-lg max-w-[34ch] text-cream/70 md:col-span-4 md:max-w-none">
            {profile.positioning}
          </p>

          <div className="flex flex-wrap items-center gap-3 md:col-span-6 md:col-start-5">
            <ActionLink href="#work" variant="solid" className="md:px-6">
              Explore my work
            </ActionLink>
            <ActionLink href="#contact" variant="outline" className="md:px-6">
              Start a project
            </ActionLink>
          </div>

          <div className="hidden justify-end md:col-span-2 md:col-start-11 md:flex">
            <a
              href="#intro"
              className="label group flex items-center gap-3 text-cream/40 transition-colors hover:text-cream"
            >
              Scroll
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors group-hover:border-flame">
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>
      </motion.div>

      <div className="hero-stats shell relative z-10 mt-6 md:mt-12">
        <dl className="grid grid-cols-2 border-t border-cream/12 md:grid-cols-4">
          {profile.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse border-cream/12 py-3.5 pr-4 md:py-5 ${
                index % 2 === 1 ? "border-l pl-4 md:pl-6" : ""
              } ${index > 1 ? "border-t md:border-t-0" : ""} ${
                index > 0 ? "md:border-l md:pl-6" : ""
              }`}
            >
              <dt className="label mt-1.5 text-[0.72rem] leading-relaxed text-cream/40 md:mt-2 md:text-[0.68rem]">
                {stat.label}
              </dt>
              <dd className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none text-cream">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The poster: the portrait, in full, arriving from below the frame. */}
      {cinematic ? (
        <motion.div
          aria-hidden
          data-surface="ember"
          style={{ y: posterY, clipPath: posterClip }}
          className="hero-poster pointer-events-none absolute inset-0 z-20 will-change-transform"
        >
          {/* Scale lives on an inner layer so the caption stays inside the frame
              instead of being pushed past the bottom edge with the photograph. */}
          <motion.div style={{ scale: posterScale }} className="absolute inset-0">
            <PortraitStage className="h-full w-full !aspect-auto" showMeta={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 bg-gradient-to-b from-ink/50 to-transparent px-6 pb-8 pt-24 md:px-10 md:pt-28">
              <span className="label text-cream/70">Portrait — 2026</span>
              <span className="label hidden text-cream/50 sm:block">
                {profile.role}
              </span>
            </div>
          </motion.div>
          <motion.div
            style={{ opacity: posterCaption }}
            className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 px-6 pb-6 md:px-10 md:pb-10"
          >
            <span className="label text-cream/70">
              {profile.name} — portrait, 2026
            </span>
            <span className="label hidden text-cream/50 sm:block">
              Scroll to continue
            </span>
          </motion.div>
        </motion.div>
      ) : null}

      {/* Letterbox bars close as the poster lands, then open again. */}
      {cinematic ? (
        <>
          <motion.div
            aria-hidden
            style={{ height: barHeight }}
            className="hero-letterbox pointer-events-none absolute inset-x-0 top-0 z-30 bg-ink"
          />
          <motion.div
            aria-hidden
            style={{ height: barHeight }}
            className="hero-letterbox pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-ink"
          />
        </>
      ) : null}
    </section>
  );

  const flatPortrait = (
    <div className="border-t border-cream/12 bg-ink md:hidden">
      <div className="shell py-10">
        <div className="overflow-hidden rounded-[22px] border border-cream/12">
          <PortraitStage className="w-full" showMeta={false} />
        </div>
      </div>
    </div>
  );

  const mobileReveal = (
    <div ref={mobileTrackRef} className="relative h-[165svh] md:hidden">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {stage}
        <div
          ref={mobilePosterRef}
          className="absolute inset-0 z-20 bg-ink will-change-transform"
          style={{ transform: "translateY(100%)" }}
        >
          <PortraitStage className="h-full w-full !aspect-auto" showMeta={false} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-6 pb-6">
            <span className="label text-cream/70">{profile.name} — portrait, 2026</span>
            <span className="label text-cream/45">Scroll to continue</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (reduced) {
    return (
      <div ref={ref}>
        {stage}
        {flatPortrait}
      </div>
    );
  }

  if (isMobile) return <div ref={ref}>{mobileReveal}</div>;

  return (
    <div ref={ref} className="hero-track relative h-[260vh]">
      <div className="hero-sticky sticky top-0 h-[100svh] overflow-hidden">{stage}</div>
    </div>
  );
}
