"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { skillGroups, tierLabels, type SkillTier } from "@/content/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechOrbit } from "@/components/ui/TechOrbit";
import { cn } from "@/lib/utils";

const tierDot: Record<SkillTier, string> = {
  core: "bg-ember",
  working: "bg-ember/45",
  familiar: "bg-ink/20",
};

/**
 * Section 04 — capabilities, one group at a time.
 *
 * The list is pinned and the open group is derived from scroll progress through
 * a fixed-height track: floor(progress × 7). That mapping is monotonic, so it
 * cannot skip a group on a fast scroll and cannot stick between two, and every
 * group gets exactly the same share of the track regardless of how much content
 * it has. Clicking a title jumps the page to that group's slice.
 */
export function Capabilities() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const active = skillGroups[index];

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      skillGroups.length - 1,
      Math.max(0, Math.floor(value * skillGroups.length))
    );
    setIndex((prev) => (prev === next ? prev : next));
  });

  const jump = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (i / skillGroups.length) * range + 6,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="capabilities"
      className="relative bg-cream py-20 text-ink md:py-28"
      aria-labelledby="capabilities-title"
    >
      <div className="shell">
        <SectionHeader
          invert
          index="04"
          label="Capabilities"
          meta="Core · Production · Familiar"
          title={
            <h2 id="capabilities-title" className="display-lg mt-4 text-ink">
              What I&apos;m actually <em className="italic text-ember">good at</em>
            </h2>
          }
          lead={
            <p>
              Grouped by what the skill is for, with an honest tier on each. &ldquo;Core&rdquo;
              means daily driver — not a logo on a wall.
            </p>
          }
        />

        <TechOrbit className="mt-12 md:mt-16" />
      </div>

      {reduced ? (
        // Reduced motion: the same information, stacked and fully readable.
        <div className="shell mt-12 space-y-10">
          {skillGroups.map((group) => (
            <div key={group.id} className="border-t border-ink/12 pt-5">
              <div className="flex items-baseline gap-3">
                <span className="label text-[0.6rem] text-ember">{group.index}</span>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-none">
                  {group.title}
                </h3>
              </div>
              <p className="mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-ink/65">
                {group.intent}
              </p>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-4 border-b border-ink/10 py-2.5 text-[0.95rem] text-ink/85"
                  >
                    {item.name}
                    <span className="label flex shrink-0 items-center gap-2 text-[0.67rem] text-ink/40">
                      {tierLabels[item.tier]}
                      <span className={cn("h-1 w-1 rounded-full", tierDot[item.tier])} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="relative mt-6 h-[380vh] md:h-[440vh]">
          <div className="sticky top-[4.5rem] md:top-[5rem]">
            <div className="shell">
              <div className="border-t border-ink/12 pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="label text-ink/45">
                    <span className="text-ember">{active.index}</span> / 07
                  </span>
                  <span className="label hidden text-ink/30 md:block">
                    Scroll to advance · click to jump
                  </span>
                </div>

                {/* Mobile: all seven titles, wrapped, so nothing is clipped by a
                    horizontal scroll edge. Desktop: the vertical rail. */}
                <div className="mt-4 grid grid-cols-2 gap-1.5 md:hidden">
                  {skillGroups.map((group, i) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={i === index}
                      className={cn(
                        "flex items-baseline gap-1.5 rounded-[2px] border px-2 py-1.5 text-left transition-colors",
                        i === index
                          ? "border-ember bg-ember text-cream"
                          : "border-ink/15 text-ink/50"
                      )}
                    >
                      <span className="label shrink-0 text-[0.5rem] opacity-60">
                        {group.index}
                      </span>
                      <span className="label text-[0.72rem] leading-[1.3] tracking-[0.08em]">
                        {group.title}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid gap-8 md:mt-6 md:grid-cols-12 md:gap-12">
                  <div className="hidden md:col-span-5 md:block">
                    {skillGroups.map((group, i) => {
                      const selected = i === index;
                      return (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => jump(i)}
                          aria-current={selected}
                          className="group relative flex w-full items-baseline gap-4 border-b border-ink/12 py-3.5 text-left"
                        >
                          <motion.span
                            aria-hidden
                            className="absolute inset-x-0 bottom-0 h-px origin-left bg-ember"
                            animate={{ scaleX: selected ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          />
                          <span
                            className={cn(
                              "label text-[0.6rem] transition-colors",
                              selected ? "text-ember" : "text-ink/30"
                            )}
                          >
                            {group.index}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[clamp(1.35rem,2.4vw,2.1rem)] leading-none tracking-[-0.02em] transition-colors duration-400",
                              selected
                                ? "text-ink"
                                : "text-ink/40 group-hover:text-ink/70"
                            )}
                          >
                            {group.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="md:col-span-7">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="max-w-[44ch] text-[0.98rem] leading-relaxed text-ink/70 md:text-[1.02rem]">
                          {active.intent}
                        </p>
                        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                          {active.items.map((item, i) => (
                            <motion.li
                              key={item.name}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.05 + i * 0.03 }}
                              className="flex items-center justify-between gap-3 border-b border-ink/10 py-2 md:gap-4 md:py-2.5"
                            >
                              <span className="text-[0.98rem] text-ink/85">{item.name}</span>
                              <span className="label flex shrink-0 items-center gap-2 text-[0.67rem] text-ink/40">
                                {tierLabels[item.tier]}
                                <span className={cn("h-1 w-1 rounded-full", tierDot[item.tier])} />
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-5 hidden flex-wrap gap-5 md:flex">
                  {(Object.keys(tierLabels) as SkillTier[]).map((tier) => (
                    <span
                      key={tier}
                      className="label flex items-center gap-2 text-[0.70rem] text-ink/45"
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", tierDot[tier])} />
                      {tierLabels[tier]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
