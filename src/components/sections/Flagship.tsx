"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { getProject } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import { FadeIn, ImageWipe } from "@/components/ui/Reveal";
import { ActionLink } from "@/components/ui/Button";
import { pad } from "@/lib/utils";

const project = getProject("mechengers");

const chapters = [
  { id: "mc-brief", label: "The brief" },
  { id: "mc-problem", label: "The problem" },
  { id: "mc-build", label: "What I built" },
  { id: "mc-process", label: "Process" },
  { id: "mc-decisions", label: "Decisions" },
  { id: "mc-result", label: "Result" },
];

/** Section 03 — the latest project delivered, told as a case study rather than a card. */
export function Flagship() {
  if (!project) return null;

  return (
    <section
      id="mechengers"
      className="grain relative overflow-clip bg-ink-2 py-20 md:py-28"
      aria-labelledby="mechengers-title"
    >
      <div className="shell relative z-10">
        <SectionHeader
          index="03"
          label="Latest delivery"
          meta="Live · mechengers.com"
          title={
            <h2 id="mechengers-title" className="display-lg mt-4 text-cream">
              Mechengers
              <span className="mt-2 block font-display text-[clamp(1rem,2.2vw,1.55rem)] italic leading-none text-flame">
                path to precision
              </span>
            </h2>
          }
          lead={
            <p>
              A precision CNC turning shop in Billimora, Gujarat — rebuilt as a product site
              where the specification <em className="italic">is</em> the interface.
            </p>
          }
        />

        <div className="mt-10 grid gap-6 border-y border-cream/12 py-5 md:grid-cols-4 md:gap-8">
          {[
            { key: "Role", value: project.role },
            { key: "Context", value: project.context },
            { key: "Stack", value: project.stack.slice(0, 3).join(" · ") },
            { key: "Status", value: "Live since 2026" },
          ].map((item) => (
            <div key={item.key}>
              <dt className="label text-[0.70rem] text-cream/35">{item.key}</dt>
              <dd className="mt-1.5 text-sm leading-snug text-cream/85">{item.value}</dd>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Sticky chapter index */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <ChapterIndex chapters={chapters} />

              <div className="mt-8 border border-cream/12 p-5">
                <span className="label text-[0.68rem] text-cream/35">Tolerance held</span>
                <p className="mt-2 font-display text-3xl leading-none text-cream">±0.01 mm</p>
                <p className="mt-2 text-xs leading-relaxed text-cream/45">
                  On critical diameters, batch after batch — the claim the whole site has to earn.
                </p>
              </div>
            </div>
          </aside>

          <div className="space-y-16 lg:col-span-8 lg:space-y-24">
            {/* Brief + real capture */}
            <div id="mc-brief" className="scroll-mt-28 grid gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <span className="label text-flame">01 — The brief</span>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-cream/70">
                  {project.overview}
                </p>

                <div className="mt-8">
                  <div className="flex items-baseline justify-between">
                    <span className="label text-cream/40">Twelve part families</span>
                    <span className="label text-[0.68rem] text-cream/25">Catalogue</span>
                  </div>
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 sm:grid-cols-3">
                    {project.catalogue?.map((part, index) => (
                      <li
                        key={part}
                        className="flex items-baseline gap-2 border-b border-cream/8 py-2 text-[0.72rem] leading-snug text-cream/55"
                      >
                        <span className="font-mono text-[0.68rem] text-flame/70">
                          {pad(index + 1)}
                        </span>
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-5">
                <ImageWipe className="rounded-[16px] border border-cream/12 bg-ink-3">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src="/work/mechengers-hero.png"
                      alt="Live capture of mechengers.com — precision CNC turning hero"
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover object-top"
                    />
                    <span className="label absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1.5 text-[0.68rem] text-cream/70 backdrop-blur">
                      Live capture — mechengers.com
                    </span>
                  </div>
                </ImageWipe>
                <p className="label mt-3 text-[0.68rem] leading-relaxed text-cream/30">
                  Mobile-width capture, on purpose: most industrial buyers shortlist from a phone.
                </p>
              </div>
            </div>

            {/* Problem */}
            <div id="mc-problem" className="scroll-mt-28">
              <span className="label text-flame">02 — The problem</span>
              <p className="mt-4 font-display text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-[1.25] tracking-[-0.02em] text-cream/90">
                {project.problem}
              </p>
            </div>

            {/* Build */}
            <div id="mc-build" className="scroll-mt-28">
              <span className="label text-flame">03 — What I built</span>
              <ul className="mt-5 divide-y divide-cream/10 border-y border-cream/10">
                {project.contribution.map((item, index) => (
                  <li key={index} className="flex gap-4 py-4">
                    <span className="label mt-1 shrink-0 text-[0.68rem] text-cream/25">
                      {pad(index + 1)}
                    </span>
                    <span className="text-[0.94rem] leading-relaxed text-cream/70">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature.title} className="border border-cream/10 bg-ink/40 p-5">
                    <h3 className="text-sm font-medium text-cream">{feature.title}</h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-cream/50">
                      {feature.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div id="mc-process" className="scroll-mt-28">
              <span className="label text-flame">04 — Process</span>
              <ol className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {project.process?.map((step, index) => (
                  <li key={step.title} className="border-t border-cream/12 pt-4">
                    <span className="label text-[0.68rem] text-cream/25">{pad(index + 1)}</span>
                    <h3 className="mt-2 text-sm font-medium text-cream">{step.title}</h3>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-cream/50">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Decisions */}
            <div id="mc-decisions" className="scroll-mt-28">
              <span className="label text-flame">05 — Decisions</span>
              <div className="mt-5 space-y-6">
                {project.challenges.map((challenge) => (
                  <div key={challenge.title} className="border-l border-cream/15 pl-5">
                    <h3 className="font-display text-xl leading-tight text-cream/90">
                      {challenge.title}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-cream/55">
                      {challenge.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Result */}
            <div id="mc-result" className="scroll-mt-28 border-t border-cream/15 pt-8">
              <span className="label text-flame">06 — Result</span>
              <ul className="mt-4 space-y-2.5">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-[0.92rem] text-cream/70">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-flame" strokeWidth={2.2} />
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ActionLink href={project.liveUrl ?? "https://mechengers.com"} external variant="solid">
                  Visit mechengers.com
                </ActionLink>
                <ActionLink href={`/work/${project.slug}`} variant="outline">
                  Full case study
                </ActionLink>
                <Link
                  href="#work"
                  className="editorial-link label text-cream/40 transition-colors hover:text-cream"
                >
                  Back to selected work
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
