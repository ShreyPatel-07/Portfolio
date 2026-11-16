"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { profile } from "@/content/profile";

/**
 * A short opening title, not a loading gate.
 *
 * · Never blocks content: it is a fixed overlay that removes itself even if the
 *   animation fails (hard timeout) and it is skipped entirely for
 *   reduced-motion visitors.
 * · Plays once per tab session, and the flag is only written when the intro
 *   actually finishes — so StrictMode's double-mounted effects replay the
 *   animation instead of leaving a dead overlay on screen.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  // Decide before paint so there is no flash of the intro for people who
  // should not see it.
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("sp-intro-played");
    if (reduced || seen) {
      setVisible(false);
      return;
    }
    setShouldPlay(true);
  }, []);

  useEffect(() => {
    if (!shouldPlay) return;

    const finish = () => {
      window.sessionStorage.setItem("sp-intro-played", "1");
      setVisible(false);
    };

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: finish,
    });

    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 0.95,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
        }
      },
    });

    if (wordRef.current) {
      tl.fromTo(
        wordRef.current.querySelectorAll("[data-intro-line]"),
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.08 },
        0
      );
    }

    tl.to("[data-intro-rule]", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0)
      .to("[data-intro-content]", { opacity: 0, duration: 0.35 }, "+=0.05")
      .to(panelRef.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "-=0.12");

    const failsafe = window.setTimeout(finish, 3600);

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
    };
  }, [shouldPlay]);

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-[var(--gutter)] py-8"
    >
      {/* Film leader furniture: gate corners and grain, so the opening reads as
          a reel starting rather than a loading screen. */}
      <div aria-hidden className="intro-grain" />
      <span aria-hidden className="intro-corner intro-corner--tl" />
      <span aria-hidden className="intro-corner intro-corner--tr" />
      <span aria-hidden className="intro-corner intro-corner--bl" />
      <span aria-hidden className="intro-corner intro-corner--br" />

      <div data-intro-content className="relative flex items-start justify-between">
        <span className="label text-cream/45">{profile.name}</span>
        <span className="label text-cream/30">Reel 01 — 2026</span>
      </div>

      <div ref={wordRef} data-intro-content className="overflow-hidden">
        <p className="display-xl text-cream">
          <span data-intro-line className="line-mask">
            <span className="block">Shrey</span>
          </span>
        </p>
        <p className="display-xl text-cream">
          <span data-intro-line className="line-mask">
            <span className="block text-flame">Patel</span>
          </span>
        </p>
      </div>

      <div data-intro-content className="relative flex items-end justify-between">
        <div className="flex w-full max-w-[38vw] items-center gap-4">
          <span className="label text-cream/45">Interface engineer</span>
          <span
            data-intro-rule
            className="h-px flex-1 origin-left bg-cream/25"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span
          ref={counterRef}
          className="font-mono text-xs tabular-nums tracking-[0.2em] text-cream/60"
        >
          000
        </span>
      </div>
    </div>
  );
}
