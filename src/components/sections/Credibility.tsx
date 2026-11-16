"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, BadgeCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { achievements, certifications } from "@/content/credentials";
import { education } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 07 — a credential archive.
 *
 * The old grid let the Microsoft record span two columns, which made the rest
 * of the certificates read as secondary. Every record now gets the same card
 * in a scroll-snap rail, with real controls and a progress line: the archive
 * stays a showcase without hiding the smaller certificates.
 */
export function Credibility() {
  const railRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateRail = () => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const next = max > 0 ? (rail.scrollLeft / max) * 100 : 100;
    if (progressRef.current) progressRef.current.style.width = `${Math.max(4, next)}%`;
    setAtStart(rail.scrollLeft <= 2);
    setAtEnd(rail.scrollLeft >= max - 2);
  };

  useEffect(() => {
    updateRail();
    const onResize = () => updateRail();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Desktop mirrors the selected-work rail: the archive pins and advances
  // horizontally as the page scrolls. Phones keep the native swipe rail.
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => Math.max(track.scrollWidth - wrap.clientWidth, 0);
      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `+=${distance() + window.innerHeight * 0.25}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -distance() * self.progress });
          if (progressRef.current) {
            progressRef.current.style.width = `${Math.max(4, self.progress * 100)}%`;
          }
          setAtEnd(self.progress >= 0.995);
        },
      });

      return () => {
        trigger.kill();
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

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-cert-card]");
    const step = card ? card.offsetWidth + 16 : rail.clientWidth * 0.85;
    const max = rail.scrollWidth - rail.clientWidth;
    const target = Math.max(0, Math.min(max, rail.scrollLeft + direction * step));
    // Native smooth horizontal scrolling is unreliable inside the Lenis page,
    // so step the rail directly; scroll-snap keeps the card aligned.
    rail.scrollTo({ left: target, behavior: "auto" });
    if (progressRef.current) {
      progressRef.current.style.width = `${Math.max(4, max > 0 ? (target / max) * 100 : 100)}%`;
    }
    setAtStart(target <= 2);
    setAtEnd(target >= max - 2);
    requestAnimationFrame(updateRail);
    window.setTimeout(updateRail, 180);
  };

  return (
    <section
      id="credibility"
      className="relative bg-ink-2 py-20 md:py-28"
      aria-labelledby="credibility-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(244,85,29,0.08),transparent_50%)]"
      />
      <div className="shell relative z-10">
        <SectionHeader
          index="07"
          label="Credentials"
          meta="7 verified records · 2021—2025"
          title={
            <h2 id="credibility-title" className="display-lg mt-4 text-cream">
              Proof, not <em className="italic text-flame">promises</em>
            </h2>
          }
          lead={
            <p>
              Seven certificates with the original document one click away — plus the
              recognition and education behind the work.
            </p>
          }
        />

        <div className="mt-12 md:mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-cream/15 py-4">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-flame" />
              <span className="label text-cream/55">Credential archive</span>
              <span className="label text-cream/25">07 records</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-2 text-cream/35 sm:flex">
                <BadgeCheck className="h-3.5 w-3.5 text-flame/80" strokeWidth={1.7} />
                <span className="label text-[0.62rem]">Every card opens the source document</span>
              </span>
              <span className="label hidden text-[0.58rem] text-cream/30 lg:inline">
                Scroll to advance
              </span>
              <div className="cert-controls flex items-center gap-1.5 lg:hidden">
                <button
                  type="button"
                  onClick={() => moveRail(-1)}
                  disabled={atStart}
                  aria-label="Previous certificate"
                  className="grid h-8 w-8 place-items-center rounded-full border border-cream/20 text-cream/55 transition-colors hover:border-cream/50 hover:text-cream disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={() => moveRail(1)}
                  disabled={atEnd}
                  aria-label="Next certificate"
                  className="grid h-8 w-8 place-items-center rounded-full border border-cream/20 text-cream/55 transition-colors hover:border-cream/50 hover:text-cream disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>

          <div ref={wrapRef} className="relative mt-4">
            <div className="lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden">
              <div className="w-full">
                <div
                  ref={railRef}
                  onScroll={updateRail}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      moveRail(1);
                    }
                    if (event.key === "ArrowLeft") {
                      event.preventDefault();
                      moveRail(-1);
                    }
                  }}
                  tabIndex={0}
                  aria-label="Certificate archive, scroll horizontally"
                  className="cert-rail no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 focus-visible:outline-offset-4 lg:overflow-visible"
                >
                  <div ref={trackRef} className="flex w-max gap-4">
                    {certifications.map((cert, index) => (
                      <div
                        key={cert.id}
                        className="w-[82vw] shrink-0 snap-start sm:w-[44vw] lg:w-[340px] xl:w-[300px]"
                      >
                <a
                  data-cert-card
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="View certificate"
                  className="group flex h-full flex-col border border-cream/10 bg-ink-2 p-3 transition-colors duration-500 hover:border-cream/25 hover:bg-ink md:p-4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-cream/10 bg-[#f4eee3]">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} certificate from ${cert.issuer}`}
                      fill
                      quality={82}
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, (max-width: 1280px) 340px, 300px"
                      className="object-contain p-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-70"
                    />
                    <span className="label absolute left-3 top-3 text-[0.58rem] text-ink/55">
                      {String(index + 1).padStart(2, "0")} / 07
                    </span>
                    {cert.featured ? (
                      <span className="label absolute right-3 top-3 border border-ink/15 bg-cream/80 px-2 py-1 text-[0.54rem] text-ink/65 backdrop-blur-sm">
                        Featured record
                      </span>
                    ) : null}
                    <span className="label absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-ink/75 px-2 py-1 text-[0.55rem] text-cream/80 backdrop-blur-sm">
                      Open
                      <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={1.8} />
                    </span>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col px-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="label text-[0.62rem] text-flame/80">{cert.focus}</span>
                      <span className="label text-[0.58rem] text-cream/30">{cert.date}</span>
                    </div>
                    <h3 className="mt-2 font-display text-[clamp(1.05rem,1.7vw,1.4rem)] leading-[1.08] tracking-[-0.02em] text-cream/90">
                      {cert.title}
                    </h3>
                    <p className="label mt-2 text-[0.62rem] text-cream/35">{cert.issuer}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-cream/10 pt-3">
                      <span className="text-[0.72rem] text-cream/40 transition-colors group-hover:text-cream/65">
                        View original
                      </span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-cream/35 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <div className="h-px flex-1 bg-cream/10">
                    <div
                      ref={progressRef}
                      className="h-px bg-flame transition-[width] duration-200 ease-out"
                      style={{ width: "4%" }}
                    />
                  </div>
                  <span className="label shrink-0 text-[0.56rem] text-cream/30">
                    {atEnd ? "End of archive" : "Scroll / swipe the archive"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-[62ch] text-[0.78rem] leading-relaxed text-cream/35">
            Every record links to the document the issuer supplied. No stock badges, no
            invented awards — just the paper trail.
          </p>
        </div>

        <div className="mt-14 grid gap-10 border-t border-cream/12 pt-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-cream/35">Recognition</span>
              <span className="label text-cream/20">03 marks</span>
            </div>
            <ul className="mt-5 border-t border-cream/12">
              {achievements.map((achievement, index) => (
                <FadeIn
                  as="li"
                  key={achievement.id}
                  delay={index * 0.04}
                  className="grid grid-cols-[2rem_1fr] gap-3 border-b border-cream/12 py-4"
                >
                  <Award className="mt-0.5 h-3.5 w-3.5 text-flame/80" strokeWidth={1.6} />
                  <div>
                    <p className="text-[0.94rem] leading-snug text-cream/85">
                      {achievement.title}
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-cream/40">
                      {achievement.detail}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <span className="label text-cream/35">Education</span>
            <div className="mt-5 border border-cream/12 bg-ink/35 p-5">
              <p className="font-display text-[1.25rem] leading-snug text-cream/90">
                {education[0].degree}
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-cream/45">
                {education[0].institution}
              </p>
              <p className="label mt-4 border-t border-cream/10 pt-3 text-[0.62rem] text-cream/30">
                {education[0].period} · {education[0].detail}
              </p>
            </div>

            <div className="mt-4 border border-cream/10 p-4">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-3.5 w-3.5 text-flame/75" strokeWidth={1.7} />
                <span className="label text-[0.6rem] text-cream/35">Verification</span>
              </div>
              <p className="mt-2 text-[0.76rem] leading-relaxed text-cream/40">
                Each record links to the certificate issued by the organisation. Nothing here
                is reworded to sound larger than it is.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
