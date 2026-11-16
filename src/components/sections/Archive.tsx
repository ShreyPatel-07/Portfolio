"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { archiveProjects } from "@/content/projects";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { FadeIn } from "@/components/ui/Reveal";

/**
 * Further work — the projects that aren't the headline. Presented as an
 * editorial index on desktop (cursor-following preview) but every row also
 * carries its own plate on touch, where a hover preview would never appear.
 * Nothing here is decoration for a product claim: plates without a capture
 * stay clearly labelled artwork.
 */
export function Archive() {
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!previewRef.current) return;
    // Keep the plate inside the viewport instead of letting it hang off an
    // edge when the pointer is near one.
    const width = 260;
    const height = 232;
    const x = Math.min(Math.max(event.clientX + 28, 16), window.innerWidth - width - 16);
    const y = Math.min(Math.max(event.clientY - 110, 84), window.innerHeight - height - 16);
    previewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const active = hovered !== null ? archiveProjects[hovered] : null;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-cream/15 pt-5">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          <span className="label text-cream/50">Further work</span>
        </div>
        <span className="label text-cream/35">
          {archiveProjects.length} more products · 2023—2026
        </span>
      </div>

      <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-cream/45">
        Internal panels and earlier builds, kept in the record for range. Where a
        product is private, the plate is artwork — not a screenshot.
      </p>

      <div onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
        <ul className="mt-7">
          {archiveProjects.map((project, index) => (
            <li key={project.id}>
              <FadeIn delay={(index % 5) * 0.06} y={18}>
                <Link
                  href={`/work/${project.slug}`}
                  onPointerEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className="group relative block border-b border-cream/10 py-5 transition-colors duration-500 md:py-6"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -inset-x-3 bg-gradient-to-r from-cream/[0.05] via-cream/[0.025] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-flame/70 transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />

                  <span className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[3rem_1.5fr_1fr_auto_2rem] md:gap-8">
                    <span className="label text-cream/30 transition-colors duration-500 group-hover:text-flame">
                      {project.index}
                    </span>

                    <span className="min-w-0">
                      <span className="flex items-center gap-2.5">
                        {project.logo ? (
                          <span
                            className={`flex h-7 w-11 shrink-0 items-center justify-center rounded-[3px] border ${
                              project.logo.surface === "dark"
                                ? "border-cream/15 bg-[#1b1714]"
                                : "border-black/10 bg-[#f8f4ec]"
                            }`}
                          >
                            <Image
                              src={project.logo.src}
                              alt=""
                              width={140}
                              height={32}
                              unoptimized
                              className="h-3 w-auto max-w-[2.25rem] object-contain"
                            />
                          </span>
                        ) : null}
                        <span className="block min-w-0 truncate font-display text-[clamp(1.25rem,2.4vw,2rem)] leading-tight text-cream transition-transform duration-500 group-hover:translate-x-1.5">
                          {project.name}
                        </span>
                      </span>
                      <span className="label mt-1 block text-[0.70rem] text-cream/35 md:hidden">
                        {project.category}
                      </span>
                    </span>

                    <span className="hidden truncate text-sm text-cream/45 md:block">
                      {project.category}
                    </span>

                    <span className="label hidden items-center gap-3 text-cream/35 md:flex">
                      {project.liveUrl ? (
                        <span className="flex items-center gap-1.5 text-flame/90">
                          <span className="h-1 w-1 rounded-full bg-flame" />
                          Live
                        </span>
                      ) : null}
                      {project.year}
                    </span>

                    <ArrowUpRight
                      className="h-4 w-4 justify-self-end text-cream/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame"
                      strokeWidth={1.4}
                    />
                  </span>
                </Link>
              </FadeIn>

              {/* Touch and small screens get the plate inline — the index reads as
                  work, not as a list of names. */}
              <div className="mb-6 mt-1 md:hidden">
                <Link
                  href={`/work/${project.slug}`}
                  aria-hidden
                  tabIndex={-1}
                  className="block overflow-hidden rounded-sm border border-cream/10"
                >
                  <ProjectVisual
                    project={project}
                    className="aspect-[16/10]"
                    sizes="90vw"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[55] hidden w-[260px] transition-opacity duration-200 md:block"
        style={{ opacity: active ? 1 : 0 }}
      >
        {active ? (
          <div
            key={active.id}
            className="archive-preview overflow-hidden rounded-md border border-cream/15 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <ProjectVisual
              project={active}
              className="aspect-[4/3]"
              sizes="260px"
              playVideo
            />
            <div className="flex items-center justify-between gap-3 border-t border-cream/10 px-3 py-2.5">
              <span className="label truncate text-[0.70rem] text-cream/70">
                {active.index} · {active.name}
              </span>
              <span className="label shrink-0 text-[0.68rem] text-cream/40">
                {active.year}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
