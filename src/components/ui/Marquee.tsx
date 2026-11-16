import { cn } from "@/lib/utils";

/**
 * Infinite marquee. Pure CSS (no JS, no layout thrash): the track holds two
 * identical runs and translates by exactly -50%. Pauses on hover, and the
 * duplicated run is hidden from assistive tech.
 */
export function Marquee({
  items,
  className,
  separator = "✦",
  duration = 38,
  reverse = false,
}: {
  items: string[];
  className?: string;
  separator?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const renderRun = (duplicate: boolean) => (
    <div
      key={duplicate ? "b" : "a"}
      className="flex shrink-0 items-center"
      aria-hidden={duplicate ? true : undefined}
    >
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap">
          <span className="px-6 md:px-8">{item}</span>
          <span className="text-flame/80">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-paused relative flex overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {renderRun(false)}
        {renderRun(true)}
      </div>
    </div>
  );
}

/** Simpler single-run marquee for text-only rails. */
export function TextMarquee({
  text,
  className,
  duration = 30,
  reverse = false,
}: {
  text: string;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("marquee-paused relative flex overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center whitespace-nowrap px-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
