"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer-driven 3D tilt.
 *
 * Depth without a second WebGL canvas: the card rotates a few degrees around
 * its own centre and the browser composites it on the GPU. Deliberately off for
 * touch and reduced-motion users, where a hover state has no meaning anyway.
 */
export function Tilt3D({
  children,
  className,
  strength = 6,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTransform(
      `perspective(1200px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(
        x * strength
      ).toFixed(2)}deg) translateZ(0)`
    );
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTransform("")}
      className={cn("[transform-style:preserve-3d] will-change-transform", className)}
      style={{
        transform,
        transition: transform ? "transform 120ms linear" : "transform 500ms var(--ease-out-expo)",
      }}
    >
      {children}
    </div>
  );
}
