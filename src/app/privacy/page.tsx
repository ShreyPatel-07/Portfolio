import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Nav } from "@/components/nav/Nav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Privacy & data",
  description:
    "How this portfolio handles personal data: no analytics, no advertising trackers, no marketing cookies, and only the local storage needed for theme and opening preferences.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "15 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink">
        <section className="shell pb-20 pt-28 md:pb-28 md:pt-36">
          <Link
            href="/#contact"
            className="label inline-flex items-center gap-2 text-cream/40 transition-colors hover:text-cream"
          >
            Contact
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="label text-flame">Privacy &amp; data</span>
              <h1 className="display-lg mt-5 max-w-[14ch] text-cream">
                Privacy, without the <em className="italic text-flame">theatre.</em>
              </h1>
            </div>
            <p className="max-w-[46ch] text-[1rem] leading-relaxed text-cream/60 md:col-span-4">
              This portfolio is built to need as little personal data as possible. No analytics,
              no advertising pixels, no marketing cookies — just the work and a way to get in
              touch.
            </p>
          </div>

          <div className="mt-14 grid gap-12 border-t border-cream/12 pt-10 md:mt-20 md:grid-cols-12 md:gap-10">
            <aside className="md:col-span-3">
              <p className="label text-cream/30">On this page</p>
              <nav aria-label="Privacy sections" className="mt-4 space-y-2">
                {[
                  ["short", "The short version"],
                  ["storage", "What this site stores"],
                  ["contact", "If you contact me"],
                  ["rights", "Your rights"],
                  ["projects", "Privacy in client work"],
                ].map(([id, label], index) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="label flex items-baseline gap-2 text-[0.66rem] text-cream/40 transition-colors hover:text-cream"
                  >
                    <span className="text-flame">{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                ))}
              </nav>
              <p className="label mt-8 text-cream/25">Updated {lastUpdated}</p>
            </aside>

            <div className="space-y-12 md:col-span-8 md:col-start-5 md:space-y-16">
              <section id="short" className="scroll-mt-28 border-t border-cream/15 pt-5">
                <span className="label text-flame">01</span>
                <h2 className="display-md mt-3 text-cream">The short version</h2>
                <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-cream/65">
                  <p>
                    I do not run an analytics dashboard on this site. There are no advertising
                    pixels, cross-site trackers, heatmaps or marketing cookies, and I do not sell
                    or share visitor data.
                  </p>
                  <p>
                    If you email me, I use your message and address to reply. If you are a client,
                    project communications stay within the project and are kept only for as long
                    as the work and the relationship require.
                  </p>
                </div>
              </section>

              <section id="storage" className="scroll-mt-28 border-t border-cream/15 pt-5">
                <span className="label text-flame">02</span>
                <h2 className="display-md mt-3 text-cream">What this site stores</h2>
                <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-cream/65">
                  <p>
                    The only browser storage is functional: a theme preference and a flag for the
                    short opening title. Neither is sent to a server or used to identify you.
                  </p>
                  <dl className="divide-y divide-cream/10 border-y border-cream/10">
                    <div className="grid gap-2 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-5">
                      <dt className="label text-cream/40">sp-theme</dt>
                      <dd>
                        Local storage. Remembers whether you chose light or dark mode on this
                        browser. Strictly functional; no consent banner is needed for it.
                      </dd>
                    </div>
                    <div className="grid gap-2 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-5">
                      <dt className="label text-cream/40">sp-intro-played</dt>
                      <dd>
                        Session storage. Stops the opening title replaying every time you move
                        between pages. Clears when the tab is closed.
                      </dd>
                    </div>
                  </dl>
                  <p>
                    This site does not set cookies. If that changes — for example, if I add
                    privacy-friendly analytics — this page and the consent behaviour will be
                    updated before anything is collected.
                  </p>
                </div>
              </section>

              <section id="contact" className="scroll-mt-28 border-t border-cream/15 pt-5">
                <span className="label text-flame">03</span>
                <h2 className="display-md mt-3 text-cream">If you contact me</h2>
                <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-cream/65">
                  <p>
                    Email is the main way to reach me. I receive your email address, your message
                    and anything you choose to attach. I use that information to answer you and,
                    if we work together, to deliver the project. I do not add you to a newsletter
                    or pass your details to a marketing list.
                  </p>
                  <p>
                    You can ask me to delete a conversation at any time. I keep ordinary
                    business correspondence only for as long as it is useful for the work, legal
                    obligations or a reasonable record of the engagement.
                  </p>
                </div>
              </section>

              <section id="rights" className="scroll-mt-28 border-t border-cream/15 pt-5">
                <span className="label text-flame">04</span>
                <h2 className="display-md mt-3 text-cream">Your rights</h2>
                <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-cream/65">
                  <p>
                    Depending on where you live, you may have rights to access, correct, delete,
                    restrict or object to the processing of your personal data, and to request a
                    portable copy. If you are in the EU or UK, these include your rights under the
                    GDPR and UK GDPR. If you are in India, the DPDP Act may also apply.
                  </p>
                  <p>
                    To make a request, email{" "}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="text-cream underline decoration-cream/30 underline-offset-4 transition-colors hover:text-flame"
                    >
                      {profile.contact.email}
                    </a>
                    . I aim to respond within 30 days. If you believe your data has been handled
                    incorrectly, you can also contact your local data-protection authority.
                  </p>
                </div>
              </section>

              <section id="projects" className="scroll-mt-28 border-t border-cream/15 pt-5">
                <span className="label text-flame">05</span>
                <h2 className="display-md mt-3 text-cream">Privacy in client work</h2>
                <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-cream/65">
                  <p>
                    Privacy is a product decision, not a footer link. The defaults I bring to
                    client work are: collect only the data the product actually needs, keep
                    authentication and authorisation on the server, keep personal data out of
                    URLs and logs, ask for consent where it is required, and define retention and
                    deletion instead of keeping everything forever.
                  </p>
                  <p>
                    I do not claim that a product is GDPR-compliant because its website says so.
                    Compliance depends on the organisation, its contracts, its vendors and how it
                    actually operates. I build with those obligations in mind and flag the gaps
                    that need a legal or security owner.
                  </p>
                </div>
              </section>

              <div className="border-t border-cream/15 pt-6">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-3 text-cream transition-colors hover:text-flame"
                >
                  <span className="font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-none">
                    Start a conversation
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors group-hover:border-flame">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
