"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

import { navItems } from "@/content/nav";
import { profile } from "@/content/profile";

type LenisLike = { scrollTo: (target: number | string, options?: { duration?: number }) => void };

/** Section 09 — closing footer: wordmark, index, back-to-top. */
export function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (href: string) => (isHome ? href : `/${href}`);

  const toTop = () => {
    const lenis = (window as unknown as { __spLenis?: LenisLike }).__spLenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-ink pb-10 pt-16 md:pt-20">
      <div className="shell">
        <div className="grid gap-12 border-b border-cream/12 pb-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link
              href="/"
              onClick={(event) => {
                if (window.location.pathname === "/") {
                  event.preventDefault();
                  toTop();
                }
              }}
              className="inline-flex items-baseline gap-2"
            >
              <span className="font-display text-xl tracking-tight text-cream">{profile.name}</span>
              <span className="label text-[0.67rem] text-cream/35">®</span>
            </Link>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-cream/45">
              {profile.role}. Building interfaces that hold up in production — and the systems
              that keep them consistent.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-flame pulse-dot" />
              <span className="label text-[0.68rem] text-cream/40">{profile.availabilityShort}</span>
            </div>
          </div>

          <nav aria-label="Footer sections" className="md:col-span-3">
            <span className="label text-cream/30">Index</span>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.href)}
                    className="group flex items-baseline gap-2 text-sm text-cream/55 transition-colors hover:text-cream"
                  >
                    <span className="label text-[0.66rem] text-cream/25 group-hover:text-flame">
                      {item.index}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <span className="label text-cream/30">Elsewhere</span>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="editorial-link text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  {profile.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="editorial-link text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="editorial-link text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.resume}
                  download={profile.contact.resumeFileName}
                  className="editorial-link text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  Résumé (PDF)
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="editorial-link text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  Privacy &amp; data
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label text-[0.67rem] text-cream/30">
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span className="label text-[0.67rem] text-cream/25">
              Designed &amp; built from {profile.location.split(",")[0]}
            </span>
            <span className="label text-[0.67rem] text-cream/20">
              Next.js · TypeScript · GSAP · R3F
            </span>
          </div>

          <button
            type="button"
            onClick={toTop}
            className="group flex items-center gap-3 rounded-full border border-cream/20 px-4 py-2.5 transition-colors hover:border-flame hover:text-flame"
            aria-label="Back to top"
          >
            <span className="label text-[0.68rem]">Back to top</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cream/20 transition-transform duration-500 group-hover:-translate-y-0.5">
              <ArrowUp className="h-3 w-3" strokeWidth={1.8} />
            </span>
          </button>
        </div>
      </div>

      {/* Closing wordmark — decorative, clipped at the baseline. */}
      <div aria-hidden className="pointer-events-none mt-10 select-none overflow-hidden">
        <p className="shell whitespace-nowrap font-display text-[clamp(4rem,17.5vw,17rem)] leading-[0.78] tracking-[-0.05em] text-cream/15 [-webkit-text-stroke:1px_currentColor]">
          Shrey Patel
        </p>
      </div>
    </footer>
  );
}
