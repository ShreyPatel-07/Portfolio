/**
 * CAPABILITIES — grouped by what the skill is *for*, never as percentage bars.
 * tier: "core" = daily driver · "working" = shipped production work · "familiar" = used on real projects.
 */

export type SkillTier = "core" | "working" | "familiar";

export type SkillItem = {
  name: string;
  tier: SkillTier;
  note?: string;
};

export type SkillGroup = {
  id: string;
  index: string;
  title: string;
  /** One editorial line explaining the intent of this group. */
  intent: string;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "interface",
    index: "01",
    title: "Interface engineering",
    intent:
      "The layer I'm hired for — component-driven interfaces that stay consistent as a product grows.",
    items: [
      { name: "React.js", tier: "core" },
      { name: "Next.js", tier: "core" },
      { name: "TypeScript", tier: "core" },
      { name: "JavaScript (ES6+)", tier: "core" },
      { name: "Redux", tier: "working" },
      { name: "Tailwind CSS", tier: "core" },
      { name: "HTML5 & CSS3", tier: "core" },
      { name: "Bootstrap", tier: "working" },
      { name: "Multilingual UI (i18n)", tier: "working", note: "Language switching and locale-aware formatting" },
      { name: "ASPX / CSHTML", tier: "working" },
    ],
  },
  {
    id: "data",
    index: "02",
    title: "Data & visualisation",
    intent:
      "Turning dense financial and planning data into dashboards people can actually read and act on.",
    items: [
      { name: "Chart.js dashboards", tier: "core" },
      { name: "Data visualisation", tier: "core" },
      { name: "Sorting & filtering", tier: "core" },
      { name: "Form validation", tier: "core" },
      { name: "Reporting views", tier: "working" },
      { name: "Retirement-planning reports", tier: "working" },
    ],
  },
  {
    id: "backend",
    index: "03",
    title: "Backend & data",
    intent:
      "Enough server-side depth to own a feature end to end and to debug it when it breaks.",
    items: [
      { name: "Node.js", tier: "working" },
      { name: "Express.js", tier: "working" },
      { name: ".NET MVC", tier: "working" },
      { name: "REST APIs", tier: "core" },
      { name: "SQL", tier: "working" },
      { name: "MongoDB", tier: "working" },
      { name: "Java", tier: "familiar" },
      { name: "Python", tier: "familiar" },
      { name: "C++", tier: "familiar" },
      { name: "AWS", tier: "familiar" },
    ],
  },
  {
    id: "product",
    index: "04",
    title: "Product engineering",
    intent:
      "The work that surrounds the code — decisions, systems and documentation that outlive a sprint.",
    items: [
      { name: "Reusable design systems", tier: "core" },
      { name: "Component-driven development", tier: "core" },
      { name: "State management", tier: "core" },
      { name: "UI/UX redesign", tier: "core" },
      { name: "OAuth & 2FA flows", tier: "working" },
      { name: "Requirement definition & scoping", tier: "core" },
      { name: "QA & regression testing", tier: "core" },
      { name: "Bug triage & root-cause fixing", tier: "core" },
      { name: "Reconfirmation & handover", tier: "core" },
      { name: "Agent connectivity & tool orchestration", tier: "working" },
      { name: "Technical documentation", tier: "working" },
      { name: "AI-agent user workflows", tier: "working" },
      { name: "Payment gateway integration", tier: "working" },
      { name: "Walkthrough & release videos", tier: "working" },
      { name: "Three.js / WebGL scenes", tier: "working" },
      { name: "Prompt-driven workflows", tier: "working" },
    ],
  },
  {
    id: "tools",
    index: "05",
    title: "Tools & platforms",
    intent: "The daily kit — version control, delivery, design hand-off and ecommerce.",
    items: [
      { name: "Git & GitHub", tier: "core" },
      { name: "CI/CD", tier: "working" },
      { name: "Figma", tier: "core" },
      { name: "Apidog", tier: "working", note: "API documentation, mocking & testing" },
      { name: "Vercel", tier: "working" },
      { name: "Docker", tier: "working", note: "Containerised development" },
      { name: "AWS S3", tier: "working", note: "Object storage & static assets" },
      { name: "Stripe", tier: "working" },
      { name: "Razorpay", tier: "working" },
      { name: "PayU", tier: "working" },
    ],
  },
  {
    id: "ai-motion",
    index: "06",
    title: "AI & motion",
    intent:
      "The newer half of the toolkit — AI-assisted video and motion, shipped rather than experimented with.",
    items: [
      { name: "ChatGPT", tier: "core" },
      { name: "Claude Code", tier: "core" },
      { name: "Gemini", tier: "working" },
      { name: "Google AI Studio", tier: "working" },
      { name: "Freebuff", tier: "core" },
      { name: "Speechma", tier: "working" },
      { name: "Clueso", tier: "working" },
      { name: "Hyperframe", tier: "working" },
      { name: "AI video generation", tier: "working" },
      { name: "AI image & video tooling", tier: "working" },
      { name: "Motion & edit", tier: "working" },
      { name: "Generative UI prototyping", tier: "working" },
      { name: "Rapid technology adoption", tier: "core" },
      { name: "Self-directed learning", tier: "core" },
    ],
  },
  {
    id: "mobile",
    index: "07",
    title: "Mobile",
    intent: "Cross-platform screens shipped to production stores.",
    items: [
      { name: "Flutter", tier: "working" },
      { name: "Dart", tier: "working" },
      { name: "Provider & GetX", tier: "working" },
    ],
  },
];

export const tierLabels: Record<SkillTier, string> = {
  core: "Core",
  working: "Production",
  familiar: "Familiar",
};
