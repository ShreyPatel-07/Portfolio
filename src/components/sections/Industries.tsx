"use client";

import { ActionLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { deliverables, industries } from "@/content/industries";

/**
 * Section 01B — the breadth of the practice.
 *
 * The case studies prove depth in a handful of products. This section makes the
 * wider range explicit without inventing clients: sector cards describe the
 * problems the same skill set solves, and the deliverables strip says what can
 * actually be commissioned.
 */
export function Industries() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden border-t border-cream/10 bg-ink-2 py-16 text-cream md:py-24"
      aria-labelledby="industries-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ambient-glow absolute -right-[20%] top-[-20%] h-[60vw] w-[60vw] max-w-[820px] rounded-full bg-[radial-gradient(circle,rgba(244,85,29,0.14),transparent_66%)]" />
        <div className="absolute inset-0 rule-grid opacity-[0.12]" />
      </div>

      <div className="shell relative z-10">
        <SectionHeader
          index="01B"
          label="Sectors"
          meta="Websites · Ecommerce · Product interfaces"
          title={
            <h2 id="industries-title" className="display-lg mt-4 max-w-[18ch] text-cream">
              Built for the businesses people <em className="italic text-flame">actually run</em>
            </h2>
          }
          lead={
            <p>
              The public work spans ecommerce, fintech, insurance, manufacturing and SaaS.
              The same discipline applies anywhere a clear interface has to carry trust and
              a next step — a property agency, a clinic, a Shopify store or a product team.
            </p>
          }
        />

        <div className="mt-10 grid gap-px border border-cream/12 bg-cream/10 sm:grid-cols-2 xl:grid-cols-4 md:mt-14">
          {industries.map((industry, index) => (
            <FadeIn
              key={industry.name}
              delay={index * 0.04}
              className="group relative bg-ink-2 p-5 transition-colors duration-500 hover:bg-ink md:p-6"
            >
              <div>
                <span className="label text-cream/45">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 font-display text-[1.35rem] leading-[1.08] tracking-[-0.02em] text-cream md:text-[1.5rem]">
                {industry.name}
              </h3>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-cream/65">{industry.body}</p>
            </FadeIn>
          ))}
        </div>

        <div className="mt-14 md:mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-cream/12 pt-5">
            <h3 className="display-md max-w-[22ch] text-cream">
              What I can <em className="italic text-flame">take on</em>
            </h3>
            <p className="max-w-[40ch] text-[0.92rem] leading-relaxed text-cream/60">
              A new build, a stubborn redesign, or the interface layer of an existing product.
              One person, accountable end to end.
            </p>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {deliverables.map((item) => (
              <div key={item.index} className="border-t border-cream/20 pt-4">
                <span className="label text-flame">{item.index}</span>
                <h4 className="mt-3 font-display text-[1.2rem] leading-tight text-cream">
                  {item.title}
                </h4>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-cream/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-cream/12 pt-6">
          <ActionLink href="#contact" variant="solid">
            Tell me what you&apos;re building
          </ActionLink>
          <span className="max-w-[42ch] text-[0.84rem] leading-relaxed text-cream/55">
            Not sure which category fits? Describe the problem — the sector label is the least
            important part.
          </span>
        </div>
      </div>
    </section>
  );
}
