"use client";

import { profile } from "@/content/profile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn, ScrubWords } from "@/components/ui/Reveal";
import { ActionLink } from "@/components/ui/Button";
import { PortraitPrint } from "@/components/ui/PortraitPrint";

const statement =
  "A product earns trust in the first second — how it loads, how it reads, how it recovers when something breaks.";

/** Section 01 — who I am, in plain language, before any project. */
export function Intro() {
  return (
    <section
      id="intro"
      className="grain relative overflow-hidden bg-cream py-20 text-ink md:py-28"
      aria-labelledby="intro-title"
    >
      <div className="shell relative z-10">
        <SectionHeader
          invert
          index="01"
          label="Profile"
          meta={`${profile.location} · ${profile.timezone}`}
          title={
            <h2 id="intro-title" className="display-lg mt-4 text-ink">
              The short <em className="italic text-ember">version</em>
            </h2>
          }
          lead={
            <p>
              Not a list of technologies — a description of the problem I&apos;m usually
              brought in to solve.
            </p>
          }
        />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end md:gap-12">
          <FadeIn className="md:col-span-5">
            <PortraitPrint />
          </FadeIn>

          <div className="md:col-span-7">
            <ScrubWords
              as="p"
              text={statement}
              className="max-w-[19ch] font-display text-[clamp(1.9rem,4.6vw,4rem)] font-light leading-[1.04] tracking-[-0.03em] text-ink md:max-w-[30ch]"
            />
            <p className="label mt-8 max-w-[36ch] text-[0.66rem] leading-relaxed text-ink/40">
              The portrait is a working print, not a persona. The work below is the argument.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 border-t border-ink/12 pt-12 md:mt-20 md:grid-cols-12 md:gap-10">
          <FadeIn className="md:col-span-4">
            <span className="label text-ink/40">Specification</span>
            <dl className="mt-6 border-y border-ink/12">
              {profile.facts.map((fact) => (
                <div
                  key={fact.key}
                  className="flex items-baseline justify-between gap-6 border-b border-ink/8 py-3 last:border-b-0"
                >
                  <dt className="label text-[0.67rem] text-ink/40">{fact.key}</dt>
                  <dd className="text-right text-sm text-ink/80">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <ActionLink
              href="#work"
              variant="outline"
              className="mt-8 border-ink/20 text-ink hover:border-ember hover:bg-ember hover:text-cream"
            >
              Selected work
            </ActionLink>
          </FadeIn>

          <FadeIn className="md:col-span-7 md:col-start-6" delay={0.08}>
            <div className="space-y-6">
              {profile.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "body-lg text-ink/85"
                      : "body-lg text-ink/65"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <figure className="mt-10 flex flex-col gap-4 border-l-2 border-ember pl-5 sm:flex-row sm:items-baseline sm:gap-6">
              <blockquote className="font-display text-[clamp(1.2rem,2vw,1.7rem)] italic leading-snug text-ember">
                “{profile.pullQuote}”
              </blockquote>
              <figcaption className="label shrink-0 text-[0.70rem] text-ink/35">
                Working principle
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
