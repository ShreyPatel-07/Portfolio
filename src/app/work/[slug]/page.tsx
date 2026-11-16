import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { getNextProject, getProject, projects } from "@/content/projects";
import { Nav } from "@/components/nav/Nav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { BehindTheWork } from "@/components/sections/BehindTheWork";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { ActionLink } from "@/components/ui/Button";
import { FadeIn, ImageWipe } from "@/components/ui/Reveal";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { pad } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name} — ${project.category}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      ...(project.visual.hasScreenshot && project.visual.src
        ? { images: [{ url: project.visual.src, alt: project.visual.alt ?? project.name }] }
        : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const chapters = [
    { id: "cs-overview", label: "Overview" },
    { id: "cs-problem", label: "The problem" },
    { id: "cs-contribution", label: "My contribution" },
    { id: "cs-features", label: "Key features" },
    ...(project.process ? [{ id: "cs-process", label: "Process" }] : []),
    { id: "cs-decisions", label: "Decisions & constraints" },
    { id: "cs-outcome", label: "Outcome" },
    ...(project.gallery && project.gallery.length > 1
      ? [{ id: "cs-gallery", label: "Gallery" }]
      : []),
  ];
  const chapterNumber = (id: string) => pad(chapters.findIndex((chapter) => chapter.id === id) + 1);

  return (
    <>
      <Nav />
      <main className="bg-ink">
        <section className="shell relative overflow-hidden pb-10 pt-28 md:pb-14 md:pt-36">
          <Link
            href="/#work"
            className="label inline-flex items-center gap-2 text-cream/40 transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.8} />
            All work
          </Link>

          {/* The project's own accent tints the page, so every case study keeps
              the colour identity of the product it describes. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-60"
            style={{
              background: `radial-gradient(90% 120% at 82% 0%, ${project.visual.accent}33, transparent 68%)`,
            }}
          />

          <div className="relative mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div className="label flex flex-wrap items-center gap-3 text-cream/40">
                <span className="text-flame">{project.index}</span>
                <span className="h-1 w-1 rounded-full bg-cream/25" />
                <span>{project.category}</span>
                <span className="h-1 w-1 rounded-full bg-cream/25" />
                <span>{project.year}</span>
              </div>

              <h1 className="display-lg mt-5 text-cream">{project.name}</h1>

              {project.logo ? (
                <span
                  className={`mt-6 inline-flex items-center rounded-[3px] border px-3 py-2 ${
                    project.logo.surface === "dark"
                      ? "border-cream/15 bg-[#1b1714]"
                      : "border-black/10 bg-[#f8f4ec]"
                  }`}
                >
                  <Image
                    src={project.logo.src}
                    alt={project.logo.alt}
                    width={150}
                    height={34}
                    unoptimized
                    className="h-6 w-auto"
                  />
                </span>
              ) : null}
              <p className="mt-5 max-w-[50ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-cream/60">
                {project.tagline}
              </p>
            </div>

            <div className="md:col-span-4">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cream/12 pt-5">
                <div>
                  <dt className="label text-[0.68rem] text-cream/30">Role</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-cream/80">{project.role}</dd>
                </div>
                <div>
                  <dt className="label text-[0.68rem] text-cream/30">Context</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-cream/80">{project.context}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="label text-[0.68rem] text-cream/30">Stack</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-cream/80">
                    {project.stack.join(" · ")}
                  </dd>
                </div>
              </dl>

              {project.liveUrl ? (
                <ActionLink href={project.liveUrl} external className="mt-5" variant="solid">
                  View live site
                </ActionLink>
              ) : (
                <p className="label mt-5 text-[0.5rem] leading-relaxed text-cream/30">
                  Private engagement — walkthrough available on request.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* A real capture is the primary evidence. If the project has no image,
            skip the visual block entirely rather than rendering an empty frame. */}
        {project.visual.hasScreenshot && project.visual.src ? (
          <section className="shell">
            <>
              <div className={project.visual.portrait ? "mx-auto w-full max-w-[430px]" : undefined}>
                <ImageWipe>
                  <Tilt3D strength={3.5}>
                    <BrowserFrame url={(project.liveUrl ?? "shreypatel.dev").replace(/^https?:\/\//, "")}>
                      <ProjectVisual
                        project={project}
                        className={project.visual.portrait ? "aspect-[3/4]" : "aspect-[16/10]"}
                        priority
                        sizes={project.visual.portrait ? "430px" : "100vw"}
                      />
                    </BrowserFrame>
                  </Tilt3D>
                </ImageWipe>
              </div>
              <p
                className={`label mt-3 text-[0.72rem] text-cream/35 ${
                  project.visual.portrait ? "mx-auto max-w-[430px]" : ""
                }`}
              >
                Live capture of the shipped interface.
              </p>
            </>
          </section>
        ) : null}

        {project.visual.video ? (
          <section className="shell mt-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] border border-cream/12">
              <LoopVideo
                src={project.visual.video}
                poster={project.visual.src ?? ""}
                alt={`${project.name} — the live site in motion`}
                sizes="100vw"
              />
            </div>
            <p className="label mt-3 text-[0.68rem] text-cream/30">
              Six-second capture of the live site, recorded today — scroll included.
            </p>
          </section>
        ) : null}

        <section className="shell grid gap-12 py-16 md:grid-cols-12 md:gap-10 md:py-24">
          <aside className="md:col-span-3">
            <div className="space-y-8 md:sticky md:top-28">
              <ChapterIndex chapters={chapters} ariaLabel={`${project.name} case study sections`} />

              <div className="border-t border-cream/12 pt-5">
                <span className="label text-cream/30">Year</span>
                <p className="mt-1.5 text-sm text-cream/70">{project.year}</p>
              </div>
            </div>
          </aside>

          <div className="space-y-14 md:col-span-8 md:col-start-5 md:space-y-20">
            <Block id="cs-overview" index={chapterNumber("cs-overview")} title="Overview">
              <p className="text-[1.02rem] leading-relaxed text-cream/70">{project.overview}</p>
            </Block>

            <Block id="cs-problem" index={chapterNumber("cs-problem")} title="The problem">
              <p className="font-display text-[clamp(1.25rem,2.2vw,1.8rem)] font-light leading-snug tracking-[-0.02em] text-cream/85">
                {project.problem}
              </p>
            </Block>

            <Block
              id="cs-contribution"
              index={chapterNumber("cs-contribution")}
              title="My contribution"
            >
              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                {project.contribution.map((item, index) => (
                  <li key={index} className="flex gap-4 py-3.5">
                    <span className="label mt-1 shrink-0 text-[0.66rem] text-cream/25">
                      {pad(index + 1)}
                    </span>
                    <span className="text-[0.92rem] leading-relaxed text-cream/65">{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="cs-features" index={chapterNumber("cs-features")} title="Key features">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature.title} className="border border-cream/10 bg-ink-2 p-5">
                    <h3 className="text-sm font-medium text-cream">{feature.title}</h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-cream/50">
                      {feature.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            {project.process ? (
              <Block id="cs-process" index={chapterNumber("cs-process")} title="Process">
                <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {project.process.map((step, index) => (
                    <li key={step.title} className="border-t border-cream/12 pt-4">
                      <span className="label text-[0.66rem] text-cream/25">{pad(index + 1)}</span>
                      <h3 className="mt-2 text-sm font-medium text-cream">{step.title}</h3>
                      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-cream/50">
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </Block>
            ) : null}

            <Block
              id="cs-decisions"
              index={chapterNumber("cs-decisions")}
              title="Decisions & constraints"
            >
              <div className="space-y-6">
                {project.challenges.map((challenge) => (
                  <div key={challenge.title} className="border-l border-cream/15 pl-5">
                    <h3 className="font-display text-xl leading-tight text-cream/90">
                      {challenge.title}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-cream/55">
                      {challenge.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            <Block id="cs-outcome" index={chapterNumber("cs-outcome")} title="Outcome">
              <ul className="space-y-2.5">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-[0.92rem] text-cream/70">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-flame" strokeWidth={2.2} />
                    {outcome}
                  </li>
                ))}
              </ul>
              <p className="label mt-6 max-w-[52ch] text-[0.68rem] leading-relaxed text-cream/25">
                No invented metrics: every figure above is either measured, as quoted, or stated
                qualitatively. Placeholder content is marked in the project data file.
              </p>
            </Block>

            {project.gallery && project.gallery.length > 1 ? (
              <Block id="cs-gallery" index={chapterNumber("cs-gallery")} title="Gallery">
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((shot) => (
                    <FadeIn
                      key={shot.src + shot.caption}
                      className={shot.portrait ? "sm:col-span-2" : undefined}
                    >
                      <figure className="group/figure">
                        <div
                          className={`relative overflow-hidden rounded-md border border-cream/12 ${
                            shot.portrait
                              ? "mx-auto aspect-[390/844] w-full max-w-[390px]"
                              : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes={shot.portrait ? "390px" : "40vw"}
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover/figure:scale-[1.04]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/figure:opacity-100" />
                        </div>
                        <figcaption className="label mt-2 text-[0.68rem] text-cream/35 transition-colors duration-300 group-hover/figure:text-cream/70">
                          {shot.caption}
                        </figcaption>
                      </figure>
                    </FadeIn>
                  ))}
                </div>
              </Block>
            ) : null}
          </div>
        </section>

        {project.portrait ? (
          <section className="border-y border-cream/12 bg-ink-2">
            <div className="shell grid md:grid-cols-12">
              <div
                data-surface="ember"
                className="relative min-h-[320px] overflow-hidden border border-cream/12 md:col-span-5 md:min-h-[500px] md:border-r-0"
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(110% 100% at 68% 6%, rgba(244,85,29,0.42), rgba(88,32,14,0.25) 46%, rgba(10,9,8,0.98) 78%)",
                  }}
                />
                <div aria-hidden className="absolute inset-0 opacity-[0.18] rule-grid" />
                <Image
                  src={project.portrait.src}
                  alt={project.portrait.alt}
                  fill
                  quality={92}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className={
                    project.portrait.fit === "cover"
                      ? "object-cover contrast-[1.02] saturate-[0.95]"
                      : "object-contain p-6 contrast-[1.02] saturate-[0.95] md:p-10"
                  }
                  style={{ objectPosition: project.portrait.position ?? "50% 50%" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/85 to-transparent"
                />
                <span className="label absolute bottom-4 left-4 bg-ink/45 px-2 py-1 text-[0.5rem] text-cream/60 backdrop-blur-sm">
                  {project.portrait.caption}
                </span>
              </div>

              <div className="flex flex-col justify-center border border-t-0 border-cream/12 p-7 md:col-span-7 md:border-l-0 md:border-t md:p-12">
                <span className="label text-flame">
                  {project.portrait.eyebrow ?? "Built by"}
                </span>
                <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.04] tracking-[-0.03em] text-cream">
                  {project.portrait.title}
                </h2>
                <p className="mt-5 max-w-[54ch] text-[0.95rem] leading-relaxed text-cream/60">
                  {project.portrait.body}
                </p>
                <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3 border-t border-cream/12 pt-4">
                  <span className="label text-[0.68rem] text-cream/35">
                    Portrait — {project.year}
                  </span>
                  <span className="label text-[0.68rem] text-cream/35">
                    {project.role}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <BehindTheWork
          index={project.index}
          projectName={project.name}
          accent={project.visual.accent}
        />

        {next ? (
          <section className="border-t border-cream/12">
            <Link
              href={`/work/${next.slug}`}
              data-cursor="Next project"
              className="shell group flex flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-20"
            >
              <div>
                <span className="label text-cream/35">Next project — {next.index}</span>
                <p className="display-lg mt-3 text-cream transition-colors duration-500 group-hover:text-flame">
                  {next.name}
                </p>
                <p className="mt-2 max-w-[46ch] text-sm text-cream/45">{next.tagline}</p>
              </div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-all duration-500 group-hover:border-flame group-hover:text-flame">
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.4} />
              </span>
            </Link>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}

function Block({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-3 border-t border-cream/15 pt-4">
        <span className="label text-flame">{index}</span>
        <h2 className="label text-cream/60">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
