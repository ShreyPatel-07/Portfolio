"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

type LenisLike = {
  scrollTo: (target: number | string | HTMLElement, options?: { duration?: number }) => void;
};

const chapters = [
  {
    id: "hero",
    label: "Opening",
    title: "A portfolio you can walk through",
    body: "Move through the profile, sectors, work, build process and contact in order — the real page, not a fake recording.",
  },
  {
    id: "intro",
    label: "Profile",
    title: "The short version",
    body: "Three years of building and rescuing web products, mostly the interface layer and the system beneath it.",
  },
  {
    id: "industries",
    label: "Sectors",
    title: "Where the work fits",
    body: "Ecommerce, property, healthcare, SaaS, fintech, manufacturing and local businesses — one discipline, different vocabulary.",
  },
  {
    id: "work",
    label: "Selected work",
    title: "Work that had to ship",
    body: "Seven public case studies, each with the problem, the build and the result stated exactly.",
  },
  {
    id: "factory",
    label: "The build",
    title: "How the thing gets made",
    body: "A nine-pass process from understanding the business to testing, sign-off and delivering the finished product.",
  },
  {
    id: "capabilities",
    label: "Toolkit",
    title: "The stack behind the surface",
    body: "React and Next.js on the front, TypeScript through the system, and Node or .NET where the product needs them.",
  },
  {
    id: "contact",
    label: "Next",
    title: "Tell me what you're building",
    body: "A new site, a rebuild, a product interface or a problem that does not have a category yet. A short brief is enough to start.",
  },
] as const;

function scrollToChapter(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - 72);
  const lenis = (window as unknown as { __spLenis?: LenisLike }).__spLenis;

  if (lenis) {
    lenis.scrollTo(id === "hero" ? 0 : top, { duration: 1.25 });
    return;
  }

  window.scrollTo({ top: id === "hero" ? 0 : top, behavior: "smooth" });
}

/**
 * A guided walkthrough of the portfolio — a docked chapter navigator, not a
 * fake screen recording. It scrolls the real page, keeps the work visible and
 * lets the visitor leave at any point.
 */
export function Walkthrough() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const goTo = useCallback((nextIndex: number) => {
    const bounded = Math.max(0, Math.min(chapters.length - 1, nextIndex));
    setIndex(bounded);
    scrollToChapter(chapters[bounded].id);
  }, []);

  useEffect(() => {
    const start = () => {
      setIndex(0);
      setOpen(true);
      requestAnimationFrame(() => scrollToChapter("hero"));
    };

    window.addEventListener("sp:walkthrough", start);
    return () => window.removeEventListener("sp:walkthrough", start);
  }, []);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => {
          const next = Math.min(chapters.length - 1, current + 1);
          scrollToChapter(chapters[next].id);
          return next;
        });
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => {
          const next = Math.max(0, current - 1);
          scrollToChapter(chapters[next].id);
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const chapter = chapters[index];
  const isLast = index === chapters.length - 1;

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] pb-[max(0px,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-auto md:right-8 md:top-56 md:w-[380px]">
      <div
        role="region"
        aria-label="Guided portfolio walkthrough"
        className="pointer-events-auto overflow-hidden border border-cream/25 bg-ink/95 text-cream shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-cream/12 px-4 py-3">
          <span className="label flex items-center gap-2 text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
            Guided walkthrough
          </span>
          <div className="flex items-center gap-3">
            <span className="label text-cream/50">
              {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close walkthrough"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-flame hover:text-flame focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="p-5 md:p-6" aria-live="polite">
          <span className="label text-flame">{chapter.label}</span>
          <h2 className="mt-2 font-display text-[1.55rem] leading-[1.05] tracking-[-0.02em] text-cream md:text-[1.8rem]">
            {chapter.title}
          </h2>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-cream/65">{chapter.body}</p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="label inline-flex items-center gap-2 text-cream/60 transition-colors hover:text-cream disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
              Back
            </button>

            <div className="flex items-center gap-1.5" aria-label="Tour progress">
              {chapters.map((item, chapterIndex) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(chapterIndex)}
                  aria-label={`Go to chapter ${chapterIndex + 1}: ${item.label}`}
                  aria-current={chapterIndex === index ? "step" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    chapterIndex === index
                      ? "w-6 bg-flame"
                      : "w-1.5 bg-cream/25 hover:bg-cream/50"
                  )}
                />
              ))}
            </div>

            {isLast ? (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="label inline-flex items-center gap-2 text-flame transition-colors hover:text-cream"
              >
                Done
                <X className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                className="label inline-flex items-center gap-2 text-cream transition-colors hover:text-flame"
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
