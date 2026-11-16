import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 01, 02, 03 … used for editorial indices throughout the site. */
export function pad(index: number, length = 2) {
  return String(index).padStart(length, "0");
}

/** Splits a string into words, preserving the original spacing when re-joined. */
export function words(value: string) {
  return value.split(/\s+/).filter(Boolean);
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
