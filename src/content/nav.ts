export type NavItem = {
  id: string;
  label: string;
  href: string;
  index: string;
};

export const navItems: NavItem[] = [
  { id: "intro", label: "Profile", href: "#intro", index: "01" },
  { id: "industries", label: "Sectors", href: "#industries", index: "01B" },
  { id: "work", label: "Work", href: "#work", index: "02" },
  { id: "factory", label: "The build", href: "#factory", index: "03C" },
  { id: "capabilities", label: "Capabilities", href: "#capabilities", index: "04" },
  { id: "experience", label: "Experience", href: "#experience", index: "05" },
  { id: "approach", label: "Approach", href: "#approach", index: "06" },
  { id: "contact", label: "Contact", href: "#contact", index: "07" },
];

/** Capability rail text — the horizontal marquee under the hero. */
export const marqueeSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript ES6+",
  "Redux",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  ".NET MVC",
  "REST APIs",
  "Apidog",
  "Docker",
  "AWS S3",
  "SQL",
  "MongoDB",
  "Chart.js",
  "Design Systems",
  "Figma",
  "Flutter",
  "Three.js",
  "GSAP",
  "Multilingual UI",
  "ChatGPT",
  "Claude Code",
  "Gemini",
  "Freebuff",
  "Hyperframe",
  "AI Video",
  "Stripe",
  "Vercel",
];
