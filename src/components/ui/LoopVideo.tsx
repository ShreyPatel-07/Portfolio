"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A still that becomes a short, silent, looping capture when it is active.
 *
 * The still is always painted first, so there is never an empty frame while the
 * video loads. The clip is muted, inline and paused the moment it loses focus —
 * nothing autoplays at a reduced-motion user, and nothing keeps decoding off
 * screen. Parent elements must be positioned; the poster fills them.
 */
export function LoopVideo({
  src,
  poster,
  alt,
  active = true,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  active?: boolean;
  sizes?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active && motionOk) {
      video.play().catch(() => {
        // Autoplay blocked: the poster stays, which is the intended fallback.
      });
    } else {
      video.pause();
    }
  }, [active, motionOk]);

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover object-top", className)}
      />
      {motionOk ? (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700",
            active ? "opacity-100" : "opacity-0",
            className
          )}
        />
      ) : null}
    </>
  );
}
