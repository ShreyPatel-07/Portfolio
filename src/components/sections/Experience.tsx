"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { education, experience, type Role } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

/**
 * Section 05 — a pinned career dossier.
 *
 * The old accordion grew taller than the sticky viewport, so the opened role
 * could sit below the fold. This version keeps the panel a fixed height and
 * swaps one role at a time: scroll progress through the track selects the
 * index (floor(progress × roles)), so the sequence advances by itself, cannot
 * skip, and gives every role the same slice. Clicking a rail row scrolls to
 * that role's slice. The card enters on a real perspective transform rather
 * than a fade, and the pointer tips it a few degrees while reading.
 *
 * Reduced motion gets the full content as a stacked list. Phones get a compact
 * sticky deck: scroll advances one role at a time, the year rail updates with
 * it, and the desktop dossier keeps every contribution.
 */
export function Experience() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const [openId, setOpenId] = useState<string | null>(experience[0].id);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const openIndex = Math.max(
    0,
    experience.findIndex((role) => role.id === openId)
  );
  const active = experience[openIndex];

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduced) return;
    const next = Math.min(
      experience.length - 1,
      Math.max(0, Math.floor(value * experience.length))
    );
    const id = experience[next].id;
    setOpenId((current) => (current === id ? current : id));
  });

  const jump = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      // Land in the middle of the slice so the scroll listener settles there.
      top: top + ((i + 0.5) / experience.length) * range,
      behavior: "smooth",
    });
  };

  const onPanelMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--px", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(4));
    el.style.setProperty("--py", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(4));
  };

  const resetPanel = () => {
    panelRef.current?.style.setProperty("--px", "0");
    panelRef.current?.style.setProperty("--py", "0");
  };

  // Let the dossier consume wheel input while its copy still has somewhere to
  // go. Once the reader reaches the end, the wheel returns to the pinned page
  // and the career deck advances to the next role.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      const detail = detailRef.current;
      if (!detail) return;

      const canScroll = detail.scrollHeight > detail.clientHeight + 1;
      if (!canScroll) return;

      const atTop = detail.scrollTop <= 0;
      const atBottom = detail.scrollTop + detail.clientHeight >= detail.scrollHeight - 1;
      const movingDown = event.deltaY > 0;

      if ((movingDown && !atBottom) || (!movingDown && !atTop)) {
        event.preventDefault();
        event.stopPropagation();
        detail.scrollTop += event.deltaY;
      }
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    return () => panel.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      id="experience"
      className="relative overflow-clip bg-ink py-20 md:py-28"
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <SectionHeader
          index="05"
          label="Experience"
          meta="2023 — 2026 · 5 roles"
          title={
            <h2 id="experience-title" className="display-lg mt-4 text-cream">
              Where the work <em className="italic text-flame">happened</em>
            </h2>
          }
          lead={
            <p>
              Three years across SaaS, fintech, compliance and mobile — mostly modernising
              products that were already in customers&apos; hands.{" "}
              <span className="md:hidden">Swipe the career deck.</span>
              <span className="hidden md:inline">Scroll to walk the career.</span>
            </p>
          }
        />
      </div>

      {reduced ? (
        <div className="shell mt-12 md:mt-16">
          {experience.map((role, index) => (
            <article
              key={role.id}
              className="border-t border-cream/12 py-8 last:border-b md:grid md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-3">
                <span className="label text-[0.6rem] text-cream/35">
                  {String(index + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
                </span>
                <p className="label mt-3 text-[0.68rem] text-cream/40">{role.period}</p>
                <p className="label mt-1 text-[0.68rem] text-cream/30">{role.location}</p>
              </div>
              <div className="mt-5 md:col-span-9 md:mt-0">
                <RoleContent role={role} index={index} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <>
          {/* Desktop: the pinned dossier. */}
          <div ref={trackRef} className="relative mt-12 hidden h-[420vh] md:block">
            <div className="sticky top-[4.5rem] md:top-[5rem]">
              <div className="shell">
                <div className="flex items-baseline justify-between border-t border-cream/12 pt-5">
                  <span className="label text-cream/45">
                    <span className="text-flame">
                      {String(openIndex + 1).padStart(2, "0")}
                    </span>{" "}
                    / {String(experience.length).padStart(2, "0")}
                  </span>
                  <span className="label hidden text-cream/30 lg:block">
                    Scroll to advance · click to jump
                  </span>
                </div>

                <div className="mt-5 grid gap-8 md:grid-cols-12 md:gap-10">
                  {/* Timeline rail */}
                  <div className="relative md:col-span-4">
                    <ol className="relative">
                      <span
                        aria-hidden
                        className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-cream/10"
                      />
                      <motion.span
                        aria-hidden
                        className="absolute left-4 top-0 w-px -translate-x-1/2 bg-flame"
                        initial={false}
                        animate={{
                          height: `${((openIndex + 1) / experience.length) * 100}%`,
                        }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                      {experience.map((role, index) => {
                        const selected = index === openIndex;
                        return (
                          <li key={role.id}>
                            <button
                              type="button"
                              onClick={() => jump(index)}
                              aria-current={selected}
                              aria-controls="experience-panel"
                              className="group relative flex w-full items-start gap-4 py-2.5 text-left"
                            >
                              <span
                                className={cn(
                                  "relative z-10 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[0.70rem] transition-all duration-500",
                                  selected
                                    ? "border-flame bg-flame text-ink"
                                    : "border-cream/20 bg-ink text-cream/35 group-hover:border-cream/45 group-hover:text-cream/70"
                                )}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span
                                  className={cn(
                                    "block font-display text-[clamp(1.05rem,1.7vw,1.55rem)] leading-tight tracking-[-0.02em] transition-all duration-500",
                                    selected
                                      ? "text-cream"
                                      : "text-cream/45 group-hover:translate-x-1 group-hover:text-cream/80"
                                  )}
                                >
                                  {role.title}
                                </span>
                                <span
                                  className={cn(
                                    "mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8rem] transition-colors duration-500",
                                    selected ? "text-cream/70" : "text-cream/40"
                                  )}
                                >
                                  {role.company}
                                  <span className="label text-[0.5rem] text-cream/25">
                                    {role.period}
                                  </span>
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* The card */}
                  <div
                    ref={panelRef}
                    onPointerMove={onPanelMove}
                    onPointerLeave={resetPanel}
                    style={
                      {
                        perspective: "1500px",
                        ["--px" as never]: "0",
                        ["--py" as never]: "0",
                      } as React.CSSProperties
                    }
                    className="md:col-span-8"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.article
                        key={active.id}
                        id="experience-panel"
                        initial={{
                          opacity: 0,
                          rotateX: 9,
                          y: 34,
                          scale: 0.975,
                          filter: "blur(7px)",
                        }}
                        animate={{
                          opacity: 1,
                          rotateX: 0,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          rotateX: -7,
                          y: -26,
                          scale: 0.985,
                          filter: "blur(7px)",
                        }}
                        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          transformPerspective: 1500,
                          transformOrigin: "50% 35%",
                          // A stable dossier height: long roles scroll inside,
                          // short roles keep the same premium footprint.
                          height: "clamp(500px, calc(100svh - 10rem), 720px)",
                        }}
                        className="relative flex flex-col overflow-hidden border border-cream/12 bg-ink-2"
                      >
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_0%,rgba(244,85,29,0.14),transparent_58%)]"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(9rem,17vw,15rem)] font-light leading-none tracking-[-0.06em] text-cream/[0.035]"
                        >
                          {String(openIndex + 1).padStart(2, "0")}
                        </div>

                        <div className="relative flex min-h-0 flex-1 flex-col p-6 md:p-8">
                          <div
                            ref={detailRef}
                            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pr-1"
                            style={{
                              transform:
                                "rotateX(calc(var(--py) * -3deg)) rotateY(calc(var(--px) * 4deg))",
                              transition: "transform 500ms var(--ease-out-expo)",
                            }}
                          >
                            <RoleContent role={active} index={openIndex} />
                          </div>
                        </div>
                      </motion.article>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MobileExperienceRail />
        </>
      )}

      <div className="shell mt-14 grid gap-6 border-t border-cream/12 pt-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="label text-[0.70rem] text-cream/40">Education</span>
        </div>
        {education.map((item) => (
          <div key={item.id} className="md:col-span-9">
            <p className="font-display text-xl leading-snug text-cream/90">{item.degree}</p>
            <p className="mt-1 text-[0.95rem] text-cream/55">{item.institution}</p>
            <p className="label mt-2 text-[0.66rem] text-cream/35">
              {item.period} · {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoleContent({ role, index }: { role: Role; index: number }) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="label flex items-center gap-2 text-flame/80">
          <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          Role {String(index + 1).padStart(2, "0")}
        </span>
        <span className="label text-[0.67rem] text-cream/35">
          {role.period} · {role.location}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.9rem)] font-light leading-[0.98] tracking-[-0.035em] text-cream">
        {role.title}
      </h3>
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] text-cream/65">
        {role.company}
        {role.companyNote ? (
          <span className="label text-[0.72rem] text-cream/30">{role.companyNote}</span>
        ) : null}
      </p>

      <p className="mt-5 max-w-[58ch] border-l border-flame/50 pl-4 text-[0.95rem] leading-relaxed text-cream/70">
        {role.summary}
      </p>

      <ul className="mt-5 space-y-3">
        {role.contributions.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 + i * 0.035 }}
            className="flex gap-3 text-[0.88rem] leading-relaxed text-cream/62"
          >
            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-flame/80" />
            {item}
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto border-t border-cream/10 pt-4">
        <span className="label text-[0.72rem] text-cream/30">Stack</span>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {role.stack.map((tech) => (
            <li
              key={tech}
              className="label rounded-full border border-cream/12 px-2.5 py-1 text-[0.68rem] text-cream/50"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function MobileExperienceRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const current = experience[active];
  const calendarYears = Array.from(new Set(experience.map((role) => role.calendarYear))).sort();

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = [...rail.querySelectorAll<HTMLElement>("[data-career-card]")];
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
    const card = rail?.querySelector<HTMLElement>(`[data-career-card="${index}"]`);
    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft });
  };

  return (
    <div className="mt-8 md:hidden">
      <div className="shell border-t border-cream/12 pt-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="label text-cream/40">Career timeline</span>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-display text-[clamp(2.8rem,13vw,4rem)] font-light leading-[0.8] tracking-[-0.05em] text-flame">
                {current.calendarYear}
              </span>
              <span className="label text-[0.62rem] text-cream/35">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(experience.length).padStart(2, "0")}
              </span>
            </div>
          </div>
          <span className="label max-w-[10rem] text-right text-[0.62rem] leading-relaxed text-cream/35">
            {current.period}
          </span>
        </div>

        <div className="relative mt-3">
          <div aria-hidden className="absolute inset-x-0 top-4 h-px bg-cream/12" />
          <div
            aria-hidden
            className="absolute left-0 top-4 h-px bg-flame transition-[width] duration-500 ease-out"
            style={{ width: `${((active + 1) / experience.length) * 100}%` }}
          />
          <div className="relative grid grid-cols-4">
            {calendarYears.map((year) => {
              const target = experience.findIndex((role) => role.calendarYear === year);
              const selected = year === current.calendarYear;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => goTo(Math.max(0, target))}
                  aria-pressed={selected}
                  className={cn(
                    "label pb-1 pt-0 text-[0.6rem] transition-colors duration-300",
                    selected ? "text-flame" : "text-cream/30 hover:text-cream/70"
                  )}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        aria-label="Experience roles"
        className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2"
      >
        {experience.map((role, index) => (
          <article
            key={role.id}
            data-career-card={index}
            className="relative w-[86vw] max-w-[430px] shrink-0 snap-start overflow-hidden border border-cream/12 bg-ink-2"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_90%_0%,rgba(244,85,29,0.16),transparent_58%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-2 top-8 select-none font-display text-[7rem] font-light leading-none tracking-[-0.06em] text-cream/[0.035]"
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <MobileRoleCard role={role} index={index} />
          </article>
        ))}
      </div>

      <div className="shell mt-2">
        <div className="h-px w-full bg-cream/10">
          <div
            className="h-px origin-left bg-flame transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(5, progress * 100)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="label text-[0.6rem] text-cream/30">Swipe to advance</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Previous role"
              className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 text-cream/50 transition-colors disabled:opacity-25"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(experience.length - 1, active + 1))}
              disabled={active === experience.length - 1}
              aria-label="Next role"
              className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 text-cream/50 transition-colors disabled:opacity-25"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The phone card keeps the role's shape without turning the page into a long
 * document: summary, two selected contributions and the stack. The desktop
 * dossier retains the full record.
 */
function MobileRoleCard({ role, index }: { role: Role; index: number }) {
  const highlights = role.contributions.slice(0, 2);

  return (
    <div className="relative flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="label flex items-center gap-2 text-flame/80">
          <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          Role {String(index + 1).padStart(2, "0")}
        </span>
        <span className="label text-[0.62rem] text-cream/35">{role.location}</span>
      </div>

      <h3 className="mt-4 font-display text-[clamp(1.9rem,8.8vw,2.7rem)] font-light leading-[0.98] tracking-[-0.035em] text-cream">
        {role.title}
      </h3>
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9rem] text-cream/65">
        {role.company}
        {role.companyNote ? (
          <span className="label text-[0.66rem] text-cream/30">{role.companyNote}</span>
        ) : null}
      </p>

      <p className="mt-4 border-l border-flame/50 pl-3 text-[0.85rem] leading-relaxed text-cream/70">
        {role.summary}
      </p>

      <div className="mt-4">
        <span className="label text-[0.62rem] text-cream/30">
          Selected contributions · {highlights.length} of {role.contributions.length}
        </span>
        <ul className="mt-2.5 space-y-2.5">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[0.82rem] leading-relaxed text-cream/62"
            >
              <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-flame/80" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto border-t border-cream/10 pt-4">
        <span className="label text-[0.66rem] text-cream/30">Stack</span>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {role.stack.map((tech) => (
            <li
              key={tech}
              className="label rounded-full border border-cream/12 px-2.5 py-1 text-[0.62rem] text-cream/50"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
