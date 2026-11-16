import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { profile } from "@/content/profile";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SoundProvider } from "@/components/providers/SoundProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-jb",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description:
    "Front-end focused full stack developer with 3+ years building React, Next.js and TypeScript products — dashboards, design systems and data-heavy SaaS interfaces. Currently open to full-time roles.",
  keywords: [
    "Shrey Patel",
    "Full Stack Developer",
    "Front-End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Design Systems",
    "Dashboard Developer",
    "Mechengers",
    "Three.js",
    "AI Video",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description:
      "Front-end focused full stack developer: React, Next.js, TypeScript, dashboards, design systems and performance work across SaaS and fintech products.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "Front-end focused full stack developer: React, Next.js, TypeScript, dashboards and design systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0908" },
    { media: "(prefers-color-scheme: light)", color: "#f4eee3" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.contact.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressCountry: "IN" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dhirubhai Ambani Institute of Information and Communication Technology (DAIICT)",
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Design Systems",
    "Data Visualisation",
    ".NET MVC",
  ],
  sameAs: [profile.contact.linkedin, profile.contact.github, profile.contact.githubSecondary],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      // The pre-paint theme script intentionally writes data-theme and
      // color-scheme before React hydrates; the server cannot know the stored
      // preference. This is the documented escape hatch for that one element.
      suppressHydrationWarning
    >
      <body className="grain-fixed relative bg-ink text-cream antialiased">
        {/* Apply the stored theme before paint so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('sp-theme')==='light'){document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light'}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          // Structured data for professional discoverability.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-flame focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SmoothScroll>
            <SoundProvider>
              <ScrollProgress />
              <Cursor />
              {/* tabIndex lets the skip link move focus here, not just scroll. */}
              <div id="main" tabIndex={-1} className="outline-none">
                {children}
              </div>
            </SoundProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
