import Image from "next/image";

/**
 * One candid frame and one working principle per case study.
 *
 * The old four-image strip turned a personal note into a contact sheet. A
 * single portrait gives the quote room to land; the pairing is chosen from the
 * project's index so different case studies surface different photographs and
 * different principles, while staying deterministic across builds.
 */
type BehindTheWorkNote = {
  src: string;
  alt: string;
  quote: string;
  note: string;
  position: string;
  aspect?: string;
};

const notes: BehindTheWorkNote[] = [
  {
    src: "/portraits/shrey-white-shirt.webp",
    alt: "Shrey Patel in a white shirt, smiling off camera.",
    quote:
      "The quiet work compounds. Fix the small thing properly, and a hundred people stop tripping over it.",
    note: "Precision is a form of respect for the person on the other side of the interface.",
    position: "50% 22%",
  },
  {
    src: "/portraits/shrey-blue-sweater.webp",
    alt: "Shrey Patel in a blue sweater, relaxed and looking away from the camera.",
    quote:
      "Stay curious one question longer. That's usually where the useful answer is hiding.",
    note: "Curiosity keeps the work from becoming repetitive — and repetition is where quality slips.",
    position: "50% 35%",
  },
  {
    src: "/portraits/shrey-lean.webp",
    alt: "Shrey Patel leaning in a relaxed three-quarter pose.",
    quote:
      "Leave every product clearer than you found it — for the person using it, and the person who inherits it.",
    note: "Clear systems outlast clever ones. Build for the next person who has to hold the work.",
    position: "50% 24%",
  },
  {
    src: "/portraits/shrey-sherwani.webp",
    alt: "Shrey Patel in a sherwani, photographed at a celebration.",
    quote:
      "Craft is a habit, not a performance. Ship work you'd be happy to sign.",
    note: "Take the work seriously, not yourself. Let the result carry the confidence.",
    position: "50% 18%",
    aspect: "aspect-[4/3]",
  },
];

export function BehindTheWork({
  index,
  projectName,
  accent,
}: {
  index: string;
  projectName: string;
  accent: string;
}) {
  const projectNumber = Number.parseInt(index.replace(/\D/g, ""), 10) || 0;
  const note = notes[projectNumber % notes.length];

  return (
    <section className="relative overflow-hidden border-t border-cream/12 bg-ink-2">
      <div className="shell relative z-10 grid gap-8 py-12 md:grid-cols-12 md:items-center md:gap-12 md:py-16">
        <figure className="relative md:col-span-5 lg:col-span-4">
          <div
            className={`relative overflow-hidden border border-cream/12 ${
              note.aspect ?? "aspect-[4/5]"
            }`}
            style={{
              background: `radial-gradient(120% 100% at 70% 0%, ${accent}52, rgba(18,16,14,0.96) 58%, #0d0c0b 100%)`,
            }}
          >
            <div aria-hidden className="absolute inset-0 rule-grid opacity-[0.14]" />
            <Image
              src={note.src}
              alt={note.alt}
              fill
              quality={92}
              sizes="(max-width: 768px) 100vw, 36vw"
              className="object-contain p-5 contrast-[1.02] saturate-[0.96] md:p-7"
              style={{ objectPosition: note.position }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/80 to-transparent"
            />
            <figcaption className="label absolute bottom-4 left-4 flex items-center gap-2 text-[0.56rem] text-cream/55">
              <span className="h-1.5 w-1.5 rounded-full bg-flame" />
              Behind the work / {String(projectNumber).padStart(2, "0")}
            </figcaption>
          </div>
        </figure>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <span className="label text-flame/80">Working principle</span>
          <blockquote className="mt-5 max-w-[24ch] font-display text-[clamp(1.75rem,3.2vw,3.1rem)] font-light italic leading-[1.06] tracking-[-0.03em] text-cream/90">
            “{note.quote}”
          </blockquote>
          <p className="mt-6 max-w-[50ch] border-l border-flame/40 pl-4 text-[0.9rem] leading-relaxed text-cream/50">
            {note.note}
          </p>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3 border-t border-cream/12 pt-4">
            <span className="label text-[0.62rem] text-cream/35">
              {projectName} · how the work gets made
            </span>
            <span className="label text-[0.62rem] text-cream/30">Shrey Patel</span>
          </div>
        </div>
      </div>
    </section>
  );
}
