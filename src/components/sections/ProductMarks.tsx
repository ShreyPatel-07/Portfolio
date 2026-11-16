import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/content/projects";

/**
 * The products that are actually live, shown by their own marks.
 *
 * Only projects with both a real logo asset and a live URL appear here, and
 * each tile links straight to the shipped site — no invented client list, no
 * decorative logos. Marks sit on the surface they were designed for, so a
 * dark wordmark never disappears into the page background.
 */
export function ProductMarks() {
  // Brand marks where they exist, real captures where they do not. A project is
  // included only if it is genuinely live, so nothing here is decorative.
  const marks = projects.filter(
    (project) => project.liveUrl && (project.logo || project.visual.hasScreenshot)
  );
  if (!marks.length) return null;

  return (
    <div className="shell mt-16 md:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-cream/12 pt-5">
        <span className="label flex items-center gap-2 text-cream/50">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-flame" />
          Live in production
        </span>
        <span className="label text-cream/30">{marks.length} shipped products</span>
      </div>

      <ul className="mt-6 grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
        {marks.map((project) => (
          <li key={project.id} className="bg-ink">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col justify-between gap-8 p-5 transition-colors duration-500 hover:bg-ink-2 md:p-7"
            >
              {project.logo ? (
                <span
                  className={`flex h-14 w-full items-center justify-center rounded-[3px] border ${
                    project.logo.surface === "dark"
                      ? "border-cream/15 bg-[#1b1714]"
                      : "border-black/10 bg-[#f8f4ec]"
                  }`}
                >
                  <Image
                    src={project.logo.src}
                    alt={project.logo.alt ?? project.name}
                    width={220}
                    height={52}
                    unoptimized
                    className="h-6 w-auto max-w-[62%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </span>
              ) : (
                <span className="relative block h-14 w-full overflow-hidden rounded-[3px] border border-cream/15">
                  <Image
                    src={project.visual.src ?? ""}
                    alt={`${project.name} — live site`}
                    fill
                    sizes="220px"
                    className="object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
                  />
                </span>
              )}

              <span className="flex items-end justify-between gap-4">
                <span>
                  <span className="label block text-cream/30">{project.index}</span>
                  <span className="mt-1 block font-display text-xl leading-tight text-cream transition-colors duration-300 group-hover:text-flame">
                    {project.name}
                  </span>
                  <span className="mt-1 block text-[0.72rem] leading-snug text-cream/40">
                    {(project.liveUrl ?? "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-cream/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame"
                  strokeWidth={1.4}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
