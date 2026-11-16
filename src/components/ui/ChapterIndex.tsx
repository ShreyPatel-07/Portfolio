"use client";

import { useEffect, useState } from "react";

import { pad } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Sticky chapter index for long-form case studies.
 * Tracks which chapter is in the reading position and fills a progress rail,
 * so the left column keeps reporting where you are instead of going quiet.
 */
export function ChapterIndex({
  chapters,
  ariaLabel = "Case study chapters",
}: {
  chapters: { id: string; label: string }[];
  ariaLabel?: string;
}) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const [progress, setProgress] = useState(1 / Math.max(chapters.length, 1));

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.42;
      let current = sections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id;
      }

      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  useEffect(() => {
    const onScroll = () => {
      const index = chapters.findIndex((chapter) => chapter.id === active);
      setProgress(Math.max((index + 1) / chapters.length, 0.08));
    };
    onScroll();
  }, [active, chapters]);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label text-cream/35">Case study</span>
        <span className="label text-[0.68rem] text-cream/25">
          {pad(chapters.findIndex((chapter) => chapter.id === active) + 1)} / {pad(chapters.length)}
        </span>
      </div>

      <nav aria-label={ariaLabel} className="mt-5">
        <ul className="space-y-1">
          {chapters.map((chapter, index) => {
            const isActive = active === chapter.id;
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-baseline gap-3 border-b border-cream/8 py-2.5 transition-colors",
                    isActive ? "text-cream" : "text-cream/45 hover:text-cream"
                  )}
                >
                  <span
                    className={cn(
                      "label text-[0.68rem] transition-colors",
                      isActive ? "text-flame" : "text-cream/25 group-hover:text-flame"
                    )}
                  >
                    {pad(index + 1)}
                  </span>
                  <span className="text-sm">{chapter.label}</span>
                  <span
                    className={cn(
                      "ml-auto h-px w-4 shrink-0 origin-right bg-flame transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-cream/12">
          <div
            className="h-px origin-left bg-flame transition-transform duration-700 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        <span className="label text-[0.67rem] text-cream/30">Reading</span>
      </div>
    </div>
  );
}
