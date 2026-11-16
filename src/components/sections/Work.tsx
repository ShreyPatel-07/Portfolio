"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { featuredProjects, projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { Archive } from "@/components/sections/Archive";
import { ProductMarks } from "@/components/sections/ProductMarks";
import { cn, pad } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const widthFor = {
  wide: "lg:w-[52vw]",
  tall: "lg:w-[40vw]",
  standard: "lg:w-[44vw]",
} as const;

/**
 * Section 02 — selected work.
 * Desktop: the rail is pinned and translated horizontally by ScrollTrigger.
 * Mobile/tablet: the same rail is a native, snap-scrolling carousel — no pin,
 * no hijacked scroll, no horizontal page overflow.
 */
export function Work() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [motionOk, setMotionOk] = useState(false);
  const lastIndex = useRef(-1);

  // Hover previews only ever run for people who have not asked for less motion.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.15}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${Math.max(self.progress, 0.02)})`;
            }
            if (countRef.current) {
              const index = Math.min(
                featuredProjects.length,
                Math.floor(self.progress * featuredProjects.length) + 1
              );
              countRef.current.textContent = pad(index);
            }

            const focus = Math.min(
              featuredProjects.length - 1,
              Math.floor(self.progress * featuredProjects.length)
            );
            if (focus !== lastIndex.current) {
              lastIndex.current = focus;
              setActive(focus);
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
      };
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, []);

  return (
    <section id="work" className="relative bg-ink py-20 md:py-28" aria-labelledby="work-title">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Selected work"
          meta={`${featuredProjects.length} of ${projects.length} projects · 2023—2026`}
          title={
            <h2 id="work-title" className="display-lg mt-4 text-cream">
              Work that had to <em className="italic text-flame">ship</em>
            </h2>
          }
          lead={
            <p>
              Production products, not concepts. Each one names the problem, what I actually
              built, and what changed — with the measurable results quoted exactly.
            </p>
          }
        />
      </div>

      <div ref={wrapRef} className="relative mt-12 md:mt-16">
        <div className="lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 lg:gap-10 lg:overflow-visible lg:pb-0"
          >
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                data-cursor="Case study"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() =>
                  setHoveredId((current) => (current === project.id ? null : current))
                }
                onFocus={() => setHoveredId(project.id)}
                onBlur={() =>
                  setHoveredId((current) => (current === project.id ? null : current))
                }
                className={cn(
                  "group w-[84vw] flex-none snap-start transition-[opacity,transform] duration-700 ease-out sm:w-[64vw]",
                  "lg:origin-bottom",
                  featuredProjects[active]?.id === project.id
                    ? "lg:scale-100 lg:opacity-100"
                    : "lg:scale-[0.95] lg:opacity-60",
                  widthFor[project.size]
                )}
              >
                <Tilt3D className="block">
                <BrowserFrame
                  url={(project.liveUrl ?? "https://shreypatel.dev").replace(/^https?:\/\//, "")}
                  className="transition-transform duration-700 ease-out group-hover:-translate-y-1.5"
                >
                  <div className="relative overflow-hidden">
                    <ProjectVisual
                      project={project}
                      playVideo={motionOk && hoveredId === project.id}
                      className="aspect-[16/11] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 52vw, 84vw"
                    />
                    <span
                      className={cn(
                        "label pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full bg-cream px-3.5 py-2 text-[0.68rem] text-ink transition-all duration-500",
                        featuredProjects[active]?.id === project.id
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      )}
                    >
                      Open case study
                      <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                    </span>
                  </div>
                </BrowserFrame>
                </Tilt3D>

                <div className="mt-5 flex items-start justify-between gap-6 border-t border-cream/12 pt-4">
                  <div className="max-w-[42ch]">
                    <div className="flex items-center gap-2">
                      <span className="label text-flame">{project.index}</span>
                      <span className="h-1 w-1 rounded-full bg-cream/25" />
                      <span className="label text-cream/40">{project.category}</span>
                    </div>
                    <h3 className="display-md mt-2 text-cream transition-colors duration-300 group-hover:text-flame">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/50">{project.tagline}</p>
                    <div
                      className={cn(
                        "overflow-hidden transition-[max-height,opacity] duration-500 ease-out",
                        featuredProjects[active]?.id === project.id
                          ? "lg:max-h-24 lg:opacity-100"
                          : "lg:max-h-0 lg:opacity-0"
                      )}
                    >
                      <p className="mt-3 hidden border-l border-flame/60 pl-3 text-[0.78rem] leading-snug text-cream/45 lg:block">
                        {project.outcomes[0]}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <span className="label block text-[0.67rem] text-cream/35">{project.year}</span>
                    <span className="label mt-1 block text-[0.67rem] text-cream/35">
                      {project.context}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <div aria-hidden className="hidden w-[10vw] flex-none lg:block" />
          </div>
        </div>

        <div className="mt-8 hidden items-center gap-6 px-[var(--gutter)] lg:flex">
          <span className="label text-cream/35">Scroll to advance</span>
          <div className="relative h-px flex-1 bg-cream/12">
            <div ref={progressRef} className="h-px w-full origin-left bg-flame" style={{ transform: "scaleX(0.02)" }} />
          </div>
          <span className="label text-cream/35">
            <span ref={countRef} className="text-cream">01</span> / {pad(featuredProjects.length)}
          </span>
        </div>
      </div>

      <ProductMarks />

      <div className="shell mt-16 md:mt-20">
        <Archive />
      </div>
    </section>
  );
}
