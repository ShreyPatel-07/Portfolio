"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";

const HEIGHT = "clamp(520px, 72svh, 760px)";

type ProcessLayer = "all" | "frame" | "build" | "verify" | "deliver";

type ProcessStage = {
  id: string;
  index: string;
  title: string;
  body: string;
  artifact: string;
  layer: Exclude<ProcessLayer, "all">;
};

const processStages: ProcessStage[] = [
  {
    id: "task",
    index: "01",
    title: "Task",
    body: "Start with the actual job — not the ticket wording. What is broken, who feels it, and what does done look like?",
    artifact: "one-line task statement",
    layer: "frame",
  },
  {
    id: "requirements",
    index: "02",
    title: "Requirement document",
    body: "Write the contract before the code: scope, constraints, edge cases, acceptance checks and what is explicitly out of scope.",
    artifact: "scope + acceptance checks",
    layer: "frame",
  },
  {
    id: "discussion",
    index: "03",
    title: "Discussion",
    body: "Talk through the trade-offs with the people who own the work. Surface the open questions early, then record the decisions.",
    artifact: "decision log + open questions",
    layer: "frame",
  },
  {
    id: "implementation",
    index: "04",
    title: "Implementation",
    body: "Build the smallest coherent version first, then the real one — components, states, data and the responsive behaviour.",
    artifact: "working build",
    layer: "build",
  },
  {
    id: "agents",
    index: "05",
    title: "Agent connectivity",
    body: "Connect the tools, context and permissions the work needs. Define what an agent can read, what it can change and where a human signs off.",
    artifact: "agent map + guardrails",
    layer: "build",
  },
  {
    id: "testing",
    index: "06",
    title: "Testing",
    body: "Test the happy path, the empty state, the failure state and the phone. A flow is not done because it works once on a desktop.",
    artifact: "QA matrix + build",
    layer: "verify",
  },
  {
    id: "reconfirmation",
    index: "07",
    title: "Reconfirmation",
    body: "Re-read the requirement, not just the ticket. Confirm the result with the person who asked and compare it with the accepted scope.",
    artifact: "sign-off + diff review",
    layer: "verify",
  },
  {
    id: "bugs",
    index: "08",
    title: "Bug fixing",
    body: "Fix the cause, not the symptom. Re-run the affected check, keep the record and leave the next person a clearer system.",
    artifact: "fix log + regression pass",
    layer: "verify",
  },
  {
    id: "delivery",
    index: "09",
    title: "Delivery & handover",
    body: "Ship the finished product to production, confirm it against the accepted scope, and hand over the code, credentials and decisions without leaving the next person guessing.",
    artifact: "live build + handover",
    layer: "deliver",
  },
];

const processLayers: { id: ProcessLayer; label: string }[] = [
  { id: "all", label: "All 9" },
  { id: "frame", label: "Frame" },
  { id: "build", label: "Build" },
  { id: "verify", label: "Verify" },
  { id: "deliver", label: "Deliver" },
];

/**
 * Section 03C — the machine.
 *
 * A nine-station build line, adapted from the Agentic Factory template in
 * `agentic-factory-3d.tsx`: one station for each pass, from task to delivery. It is
 * mounted only when the section approaches the viewport so the WebGL bundle
 * never delays the top of the page, and it keeps the page's wheel scroll by
 * disabling the scene's zoom (drag and the camera rail still explore it).
 */
const AgenticFactory3D = dynamic(() => import("@/components/ui/agentic-factory-3d"), {
  ssr: false,
  loading: () => <FactoryFallback />,
});

function FactoryFallback() {
  return (
    <div
      className="relative grid place-items-center overflow-hidden bg-black"
      style={{ height: HEIGHT }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(244,238,227,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,238,227,0.07)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div className="relative flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border border-flame/30 border-t-flame" />
        <span className="label text-cream/45">Assembling the machine</span>
      </div>
    </div>
  );
}

export function Factory() {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [layer, setLayer] = useState<ProcessLayer>("all");
  const visibleStages =
    layer === "all" ? processStages : processStages.filter((stage) => stage.layer === layer);

  useEffect(() => {
    const el = holderRef.current;
    if (!el || mounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(el);
    // A time-based fallback keeps the requested 3D model from being gated by
    // an observer that a jump-link or a restored scroll position can miss.
    const fallback = window.setTimeout(() => setMounted(true), 1600);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [mounted]);

  return (
    <section
      id="factory"
      data-surface="ember"
      className="relative overflow-hidden bg-ink py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[620px] bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,122,26,0.10),transparent_64%)]"
      />
      <div className="shell relative z-10">
        <SectionHeader
          index="03 · C"
          label="The build"
          meta="9 passes · 9-station floor"
          title={
            <h2 id="factory-title" className="display-lg mt-4 text-cream">
              A product, built like a <em className="italic text-flame">machine</em>
            </h2>
          }
          lead={
            <p>
              Task, requirement document, discussion, implementation, agent connectivity, testing,
              reconfirmation, bug fixing and delivery. Nine passes — filter them by layer, then
              orbit the 3D factory floor that carries them.
            </p>
          }
        />

        <div className="mt-10 border-y border-cream/15">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-flame" />
              <span className="label text-cream/55">The process, layer by layer</span>
            </div>
            <div
              className="grid w-full gap-1 pb-1 sm:flex sm:w-auto sm:flex-wrap sm:gap-1.5"
              style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
              role="group"
              aria-label="Build process layer"
            >
              {processLayers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={layer === item.id}
                  onClick={() => setLayer(item.id)}
                  className={`label rounded-full border px-2 py-1.5 text-[0.62rem] transition-colors duration-300 sm:px-3 sm:text-[0.66rem] ${
                    layer === item.id
                      ? "border-flame bg-flame text-ink"
                      : "border-cream/15 text-cream/45 hover:border-cream/35 hover:text-cream"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <ol className="grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2 md:grid-cols-3">
            {visibleStages.map((stage) => (
              <li
                key={stage.id}
                className="bg-ink p-5 sm:last:col-span-2 md:last:col-span-1 md:p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl leading-none text-flame">{stage.index}</span>
                  <span className="label text-[0.68rem] text-cream/50">{stage.layer}</span>
                </div>
                <h3 className="mt-5 font-display text-[1.2rem] leading-tight text-cream">
                  {stage.title}
                </h3>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-cream/55">{stage.body}</p>
                <p className="mt-4 border-t border-cream/10 pt-3 text-[0.74rem] leading-relaxed text-cream/55">
                  <span className="text-cream/70">Artifact</span> — {stage.artifact}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 border border-cream/15 bg-black">
          <div ref={holderRef} style={{ height: HEIGHT }}>
            {mounted ? <AgenticFactory3D height={HEIGHT} /> : <FactoryFallback />}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
          <p className="max-w-[72ch] text-[0.9rem] leading-relaxed text-cream/55">
            The floor below is the same process in 3D: nine stations, one for each pass. Drag
            to rotate, use Layers to cut the shell open, Stations to label the floor,
            or One build to follow a single pass. The wheel still scrolls the page.
          </p>
          <span className="label text-cream/35">THREE.JS · PROCEDURAL</span>
        </div>
      </div>
    </section>
  );
}
