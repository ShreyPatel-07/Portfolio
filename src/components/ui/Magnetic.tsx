"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Magnetic interaction wrapper.
 * Adapted from "Magnetic Button" by Mohammad Shehadeh (MIT) on 21st.dev —
 * rewritten to wrap arbitrary children and to respect reduced motion.
 */
const SPRING = { stiffness: 190, damping: 16, mass: 0.12 };

export function Magnetic({
  children,
  className,
  strength = 0.32,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}) {
  const reduced = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = as === "span" ? motion.span : motion.div;

  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </Comp>
  );
}
