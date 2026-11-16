"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Bespoke cursor: a small ember dot with a lagging ring that grows and labels
 * itself over interactive elements. Desktop + fine pointer only, and disabled
 * for reduced-motion and touch users, where the native cursor stays intact.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("cursor-custom");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pointer.x, y: pointer.y };
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      }

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, select, textarea, [role='button']"
      );
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursor ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const loop = () => {
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    const onLeave = () => setActive(false);
    window.addEventListener("pointerout", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={dotRef}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-flame"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="absolute flex items-center justify-center rounded-full border border-flame/60 transition-[width,height,background-color,opacity] duration-500 ease-out"
        style={{
          width: active ? (label ? 92 : 54) : 30,
          height: active ? (label ? 92 : 54) : 30,
          marginLeft: active ? (label ? -46 : -27) : -15,
          marginTop: active ? (label ? -46 : -27) : -15,
          backgroundColor: active ? "rgba(244,85,29,0.10)" : "transparent",
          willChange: "transform",
        }}
      >
        {label ? (
          <span className="label text-[0.67rem] text-cream mix-blend-difference">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
