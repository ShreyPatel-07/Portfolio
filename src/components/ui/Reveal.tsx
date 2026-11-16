"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

/**
 * Motion primitives.
 *
 * Every reveal is progressive enhancement: the markup renders fully visible and
 * GSAP only takes over once it is safe to animate. With JS off, reduced motion
 * on, or ScrollTrigger unavailable, content is simply there.
 */

gsap.registerPlugin(ScrollTrigger);

function useGsapScope<T extends HTMLElement = HTMLElement>(setup: (scope: HTMLElement) => void) {
  const ref = useRef<T | null>(null);
  // Keep the latest setup without making the effect depend on render identity.
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => setupRef.current(el), el);
    return () => ctx.revert();
  }, []);

  return ref;
}

type WordRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay in seconds before the stagger begins. */
  delay?: number;
  stagger?: number;
  /** Play immediately (hero) rather than on scroll. */
  immediate?: boolean;
  /**
   * Cinematic converge: words start beyond the frame edges, scaled up and
   * defocused, then fly inward to their line. Mask rise remains the default.
   */
  converge?: boolean;
};

/** Word-by-word mask rise — the core editorial headline reveal. */
export function WordReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
  converge = false,
}: WordRevealProps) {
  const setup = (scope: HTMLElement) => {
    const inners = scope.querySelectorAll<HTMLElement>("[data-word-inner]");
    if (!inners.length) return;

    const words = text.split(" ");

    if (converge) {
      // Alternating sides: the line assembles from outside the frame inward.
      gsap.set(inners, {
        xPercent: (index: number) => (index % 2 === 0 ? -215 : 215),
        scale: 1.32,
        opacity: 0,
        rotateY: (index: number) => (index % 2 === 0 ? 24 : -24),
        filter: "blur(16px)",
        transformPerspective: 1200,
        transformOrigin: "center center",
      });

      const animation = {
        xPercent: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out",
        stagger,
        delay,
      };

      if (immediate) {
        gsap.to(inners, animation);
        return;
      }

      ScrollTrigger.create({
        trigger: scope,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(inners, animation),
      });
      return;
    }

    gsap.set(inners, { yPercent: 118 });

    const animation = {
      yPercent: 0,
      duration: 1.05,
      ease: "expo.out",
      stagger,
      delay,
    };

    if (immediate) {
      gsap.to(inners, animation);
      return;
    }

    ScrollTrigger.create({
      trigger: scope,
      start: "top 88%",
      once: true,
      onEnter: () => gsap.to(inners, animation),
    });
  };

  const ref = useGsapScope(setup);
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={cn(converge && "[perspective:1200px] [transform-style:preserve-3d]", className)}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className={converge ? "inline-block" : "line-mask"}>
          <span data-word-inner className="inline-block will-change-transform">
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Word-by-word opacity scrub — used for the long intro statement. */
export function ScrubWords({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const setup = (scope: HTMLElement) => {
    const inners = scope.querySelectorAll<HTMLElement>("[data-scrub-word]");
    if (!inners.length) return;

    gsap.set(inners, { opacity: 0.16 });

    gsap.to(inners, {
      opacity: 1,
      stagger: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top 78%",
        end: "bottom 52%",
        scrub: 0.6,
      },
    });
  };

  const ref = useGsapScope(setup);
  const parts = text.split(" ");

  return (
    <Tag ref={ref} className={cn(className)}>
      {parts.map((word, index) => (
        <span key={`${word}-${index}`} data-scrub-word className="inline-block">
          {word}
          {index < parts.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled in px. */
  y?: number;
  as?: ElementType;
};

/** Generic scroll-in fade + rise for blocks, cards and images. */
export function FadeIn({ children, className, delay = 0, y = 32, as: Tag = "div" }: FadeInProps) {
  const setup = (scope: HTMLElement) => {
    gsap.fromTo(
      scope,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        delay,
        ease: "expo.out",
        scrollTrigger: { trigger: scope, start: "top 90%", once: true },
      }
    );
  };

  const ref = useGsapScope(setup);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}

/** Clip-path wipe used for imagery entering the page. */
export function ImageWipe({ children, className }: { children: ReactNode; className?: string }) {
  const setup = (scope: HTMLElement) => {
    gsap.fromTo(
      scope,
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: { trigger: scope, start: "top 88%", once: true },
      }
    );
  };

  const ref = useGsapScope<HTMLDivElement>(setup);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}

/** Parallax wrapper: moves its child as the section scrolls. */
export function Parallax({
  children,
  className,
  amount = 80,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const setup = (scope: HTMLElement) => {
    gsap.fromTo(
      scope,
      { y: amount * -0.5 },
      {
        y: amount * 0.5,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  };

  const ref = useGsapScope<HTMLDivElement>(setup);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
