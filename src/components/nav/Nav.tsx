"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight, Menu, Moon, Play, Sun, Volume2, VolumeX, X } from "lucide-react";

import { navItems } from "@/content/nav";
import { profile } from "@/content/profile";
import { useSound } from "@/components/providers/SoundProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

type LenisLike = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number | string | HTMLElement, options?: { duration?: number }) => void;
};

/** Fixed masthead: section index on desktop, full-screen editorial menu on mobile. */
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { enabled, toggle, tick } = useSound();
  const { theme, toggle: toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const hrefFor = (href: string) => (isHome ? href : `/${href}`);

  const onWordmarkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (!isHome) return;
    event.preventDefault();
    const lenis = (window as unknown as { __spLenis?: LenisLike }).__spLenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const lenis = (window as unknown as { __spLenis?: LenisLike }).__spLenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[65] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-cream/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Link
            href="/"
            onClick={onWordmarkClick}
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — home`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 transition-colors duration-500 group-hover:border-flame">
              <span className="font-display text-[0.95rem] leading-none tracking-tight">
                {profile.monogram}
              </span>
            </span>
            <span className="hidden sm:block">
              <span className="label block text-cream/85">{profile.name}</span>
              <span className="label block text-[0.70rem] tracking-[0.18em] text-cream/40">
                Interface engineer
              </span>
            </span>
          </Link>

          <nav aria-label="Sections" className="hidden items-center gap-1 min-[1360px]:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={hrefFor(item.href)}
                onPointerEnter={() => tick("hover")}
                className={cn(
                  "group relative rounded-full px-3 py-2 transition-colors duration-300",
                  active === item.id ? "text-cream" : "text-cream/55 hover:text-cream"
                )}
              >
                <span className="label">{item.label}</span>
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-flame transition-transform duration-500",
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isHome ? (
              <button
                type="button"
                onClick={() => {
                  tick("click");
                  window.dispatchEvent(new CustomEvent("sp:walkthrough"));
                }}
                aria-label="Start guided walkthrough"
                title="Guided walkthrough"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors duration-300 hover:border-flame hover:text-flame"
              >
                <Play className="h-3.5 w-3.5 fill-current" strokeWidth={1.5} />
              </button>
            ) : null}

            <button
              type="button"
              onClick={(event) => toggleTheme(event)}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Light theme" : "Dark theme"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors duration-300 hover:border-flame hover:text-flame"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" strokeWidth={1.6} />
              ) : (
                <Moon className="h-3.5 w-3.5" strokeWidth={1.6} />
              )}
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-pressed={enabled}
              aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
              title={
                enabled
                  ? "Sound on — ambient bed and UI ticks"
                  : "Sound off (default). Optional ambience and UI ticks."
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors duration-300 hover:border-flame hover:text-flame"
            >
              {enabled ? (
                <Volume2 className="h-3.5 w-3.5" strokeWidth={1.6} />
              ) : (
                <VolumeX className="h-3.5 w-3.5" strokeWidth={1.6} />
              )}
            </button>

            <a
              href={profile.contact.resume}
              download={profile.contact.resumeFileName}
              onPointerEnter={() => tick("hover")}
              className="label hidden items-center gap-2 rounded-full border border-cream/20 px-4 py-2.5 text-cream/80 transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-ink md:inline-flex"
            >
              Résumé
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream min-[1360px]:hidden"
            >
              {open ? (
                <X className="h-4 w-4" strokeWidth={1.6} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[64] flex flex-col justify-between bg-ink px-[var(--gutter)] pb-10 pt-28 transition-[opacity,visibility] duration-500 min-[1360px]:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav aria-label="Mobile sections" className="flex flex-col">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={hrefFor(item.href)}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b border-cream/10 py-4"
            >
              <span className="flex items-baseline gap-4">
                <span className="label text-cream/35">{item.index}</span>
                <span className="font-display text-[clamp(2rem,9vw,3rem)] leading-none text-cream transition-colors duration-300 group-hover:text-flame">
                  {item.label}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-cream/30" strokeWidth={1.6} />
              <span className="sr-only">{index + 1}</span>
            </a>
          ))}
        </nav>

        <div className="space-y-6">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.setTimeout(() => {
                window.dispatchEvent(new CustomEvent("sp:walkthrough"));
              }, 240);
            }}
            className="label flex items-center gap-2 text-cream/60"
          >
            <Play className="h-3.5 w-3.5 fill-current" strokeWidth={1.5} />
            Guided walkthrough
          </button>
          <a
            href={profile.contact.resume}
            download={profile.contact.resumeFileName}
            className="label inline-flex items-center gap-2 rounded-full bg-flame px-5 py-3 text-ink"
          >
            Download résumé
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${profile.contact.email}`} className="text-sm text-cream/70">
              {profile.contact.email}
            </a>
            <div className="flex gap-5">
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="label text-cream/45"
              >
                LinkedIn
              </a>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noreferrer noopener"
                className="label text-cream/45"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
