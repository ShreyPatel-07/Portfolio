"use client";

import { processSteps } from "@/content/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/Reveal";

/** Section 06 — how I work, evidenced by real work rather than a generic six-step diagram. */
export function Approach() {
  return (
    <section
      id="approach"
      className="grain relative overflow-hidden bg-cream py-20 text-ink md:py-28"
      aria-labelledby="approach-title"
    >
      <div className="shell relative z-10">
        <SectionHeader
          invert
          index="06"
          label="Approach"
          meta="Diagnose → deliver"
          title={
            <h2 id="approach-title" className="display-lg mt-4 text-ink">
              How I get from <em className="italic text-ember">broken</em> to shipped
            </h2>
          }
          lead={
            <p>
              The same six moves on every engagement. Each one carries evidence from a real
              project, not a stock diagram.
            </p>
          }
        />

        <ol className="mt-12 border-t border-ink/15 md:mt-16">
          {processSteps.map((step) => (
            <FadeIn as="li" key={step.id} className="border-b border-ink/12">
              <div className="grid gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <div className="md:col-span-2">
                  <span className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none tracking-[-0.04em] text-ember/25 transition-colors duration-500 hover:text-ember">
                    {step.index}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight tracking-[-0.02em] text-ink">
                    {step.title}
                  </h3>
                </div>

                <div className="md:col-span-4">
                  <p className="text-[0.92rem] leading-relaxed text-ink/65">{step.body}</p>
                </div>

                <div className="md:col-span-2">
                  <span className="label text-[0.67rem] text-ink/35">Evidence</span>
                  <p className="mt-2 text-[0.76rem] leading-relaxed text-ink/50">
                    {step.evidence}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
