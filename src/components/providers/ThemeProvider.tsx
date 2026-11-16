"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  /** Pass the click event when available so the reveal can grow from the button. */
  toggle: (event?: React.MouseEvent<HTMLElement>) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "sp-theme";

/**
 * Theme is a token swap, not a second stylesheet.
 *
 * Every component talks in semantic names (`bg-ink` for a surface, `text-cream`
 * for text), so `html[data-theme="light"]` in globals.css can invert the whole
 * site without touching a single component. A tiny inline script in the layout
 * applies the stored value before first paint, so there is no flash.
 *
 * The switch itself is a view transition: a circle grows out of the control you
 * clicked and carries the new palette with it. Browsers without the API (or
 * anyone who prefers reduced motion) get an instant, correct swap instead.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Adopt whatever the pre-paint script already put on <html>.
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private mode: the theme still applies for this session.
    }
  }, [theme]);

  const toggle = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as Document & {
        startViewTransition?: (callback: () => void) => { finished: Promise<void> };
      };

      if (reduce || typeof doc.startViewTransition !== "function") {
        setTheme(next);
        return;
      }

      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      root.style.setProperty("--theme-x", `${x}px`);
      root.style.setProperty("--theme-y", `${y}px`);
      root.style.setProperty("--theme-r", `${radius}px`);

      doc.startViewTransition(() => {
        flushSync(() => setTheme(next));
      });
    },
    [theme]
  );

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context ?? { theme: "dark" as Theme, toggle: () => {} };
}
