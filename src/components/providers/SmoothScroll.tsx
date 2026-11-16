"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scroll built on Lenis, driven by GSAP's ticker so ScrollTrigger and
 * Lenis share one animation frame. Disabled entirely for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Next's client router can keep the old scroll offset when moving between
  // two long pages. Every route change starts at the top — unless the URL
  // carries a section hash, which still wins.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const timer = window.setTimeout(() => {
      const lenis = (window as unknown as { __spLenis?: Lenis }).__spLenis;
      const hash = window.location.hash;
      const target = hash ? document.querySelector(hash) : null;

      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 1.1 });
        return;
      }

      if (target) target.scrollIntoView({ block: "start" });
      else if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);

      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    document.documentElement.classList.add("lenis", "lenis-active");
    (window as unknown as { __spLenis?: Lenis }).__spLenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors move through Lenis so easing stays consistent.
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const element = document.querySelector(id);
      if (!element) return;
      event.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -24, duration: 1.2 });
      // The skip link must move focus as well as the viewport for keyboard users.
      if (element.getAttribute("tabindex") === "-1") {
        window.setTimeout(() => (element as HTMLElement).focus({ preventScroll: true }), 1200);
      }
    };

    document.addEventListener("click", onClick);

    // Deep links (e.g. /#work from a case study) must land correctly even
    // though pinned sections change the document height after first paint.
    const hash = window.location.hash;
    const hashTimer = hash
      ? window.setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 1.1 });
        }, 700)
      : undefined;

    // Late-loading imagery and fonts shift the page; re-measure the triggers.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      if (hashTimer) window.clearTimeout(hashTimer);
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-active");
      delete (window as unknown as { __spLenis?: Lenis }).__spLenis;
    };
  }, []);

  return <>{children}</>;
}
