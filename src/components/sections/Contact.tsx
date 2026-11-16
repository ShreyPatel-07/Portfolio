"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy as CopyIcon, Mail } from "lucide-react";

import { profile } from "@/content/profile";
import { ActionLink } from "@/components/ui/Button";

/** Section 08 — the closing scene. One obvious action, everything else secondary. */
export function Contact() {
  const [copied, setCopied] = useState(false);

  const mailto = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
    "Project enquiry — via portfolio"
  )}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard permissions can be unavailable; the mailto route still works.
    }
  };

  return (
    <section
      id="contact"
      data-surface="ember"
      className="grain relative overflow-hidden bg-ember text-cream"
      aria-labelledby="contact-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,178,122,0.45),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(90,25,5,0.55),transparent_60%)]"
      />

      <div className="shell relative z-10 py-20 md:py-28">
        <div className="flex flex-wrap items-start justify-between gap-4 border-t border-cream/25 pt-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-cream/80" />
            <span className="label text-cream/70">08 — Contact</span>
          </div>
          <span className="label max-w-[22rem] text-right text-cream/60">
            {profile.availability}
          </span>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <h2 id="contact-title" className="display-lg max-w-[16ch]">
              Have a product that needs to feel{" "}
              <em className="italic text-cream">right?</em>
            </h2>

            <p className="mt-6 max-w-[34rem] text-[clamp(1rem,1.7vw,1.2rem)] leading-relaxed text-cream/70">
              Tell me what you&apos;re building and where it&apos;s getting in the way.
              I&apos;ll tell you honestly whether I&apos;m the right person for it.
            </p>

            <a
              href={mailto}
              data-cursor="Email"
              className="group mt-8 inline-flex max-w-full items-baseline gap-3 border-b border-cream/40 pb-2 transition-colors hover:border-cream"
            >
              <Mail
                className="h-5 w-5 shrink-0 translate-y-0.5 text-cream/70"
                strokeWidth={1.4}
              />
              <span className="break-all font-display text-[clamp(1.05rem,3.4vw,2.6rem)] leading-none tracking-[-0.02em]">
                {profile.contact.email}
              </span>
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-cream/60 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                strokeWidth={1.4}
              />
            </a>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email address copied" : "Copy email address"}
                className="group inline-flex items-center gap-2 border border-cream/30 px-3 py-2 text-[0.75rem] text-cream/75 transition-colors hover:border-cream/70 hover:text-cream"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-cream" strokeWidth={1.8} />
                ) : (
                  <CopyIcon className="h-3.5 w-3.5 text-cream/55" strokeWidth={1.5} />
                )}
                <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
              </button>
              <span className="text-[0.75rem] text-cream/50">
                Usually a reply within one working day · {profile.timezone}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ActionLink
                href={mailto}
                className="bg-cream text-ink hover:bg-ink hover:text-cream"
              >
                Start a conversation
              </ActionLink>
              <ActionLink
                href={profile.contact.resume}
                variant="outline"
                className="border-cream/40 text-cream hover:border-cream hover:text-ink"
                download={profile.contact.resumeFileName}
                icon="download"
              >
                Résumé
              </ActionLink>
            </div>

            <div className="mt-12 grid gap-px border border-cream/20 bg-cream/20 sm:grid-cols-3">
              {[
                { step: "01", label: "You send a note", detail: "Brief, link, or a question." },
                { step: "02", label: "I reply", detail: "With an honest read, not a pitch." },
                { step: "03", label: "We scope it", detail: "Smallest useful version first." },
              ].map((item) => (
                <div key={item.step} className="bg-ember/95 p-4">
                  <span className="label text-[0.56rem] text-cream/35">Next / {item.step}</span>
                  <p className="mt-2 text-[0.88rem] leading-snug text-cream/85">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-cream/45">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <span className="label text-cream/60">Start with</span>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-cream/70">
              What you&apos;re building, what&apos;s slowing it down, and the deadline
              you&apos;re working to. A link is enough to begin.
            </p>

            <div className="mt-8 border-t border-cream/20 pt-4">
              <span className="label text-cream/50">Route your note</span>
              <ul className="mt-3 space-y-1">
                {[
                  {
                    label: "Project / freelance",
                    detail: "Scope, timeline, budget",
                    subject: "Project enquiry — via portfolio",
                  },
                  {
                    label: "Full-time / hiring",
                    detail: "Team, product, location",
                    subject: "Role / hiring — via portfolio",
                  },
                  {
                    label: "Quick hello",
                    detail: "No brief needed",
                    subject: "Hello — via portfolio",
                  },
                ].map((route) => (
                  <li key={route.label}>
                    <a
                      href={`mailto:${profile.contact.email}?subject=${encodeURIComponent(route.subject)}`}
                      className="group flex items-baseline justify-between gap-3 border-b border-cream/15 py-2.5 transition-colors hover:border-cream/40"
                    >
                      <span>
                        <span className="block text-[0.82rem] text-cream/85 transition-colors group-hover:text-cream">
                          {route.label}
                        </span>
                        <span className="label mt-0.5 block text-[0.5rem] text-cream/40">
                          {route.detail}
                        </span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-cream/35 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <span className="label mt-8 block text-cream/50">Elsewhere</span>
            <ul className="mt-3 space-y-1">
              {[
                { label: "LinkedIn", href: profile.contact.linkedin },
                { label: "GitHub", href: profile.contact.github },
                { label: "GitHub (alt)", href: profile.contact.githubSecondary },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between border-b border-cream/20 py-3 text-sm text-cream/85 transition-colors hover:text-cream"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-cream/50 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.6}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 text-[0.78rem] leading-relaxed text-cream/55">
              <p>{profile.location}</p>
              <p>{profile.timezone}</p>
              <p className="text-cream/75">{profile.workStyle}</p>
              {profile.contact.showPhone ? <p>{profile.contact.phone}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
