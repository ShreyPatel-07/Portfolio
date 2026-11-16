/**
 * SINGLE SOURCE OF TRUTH — professional identity.
 * Everything on the site that talks about *who* Shrey is reads from here.
 */

export const profile = {
  name: "Shrey Patel",
  monogram: "SP",
  /** Rendered as two stacked display lines in the hero. */
  nameLines: ["Shrey", "Patel"],
  role: "Front-End Focused Full Stack Developer",
  roleShort: "Full Stack Developer",
  /** One-line positioning statement (hero). */
  positioning:
    "I build fast, precise websites and product interfaces for ecommerce, healthcare, property and SaaS — and the businesses in between.",
  location: "Vadodara, Gujarat, India",
  timezone: "IST · UTC+5:30",
  /** Remote-first: I've shipped for Canada-based teams from India, so location is not a constraint. */
  workStyle: "Remote-first · teams across Canada, the U.S. and India",
  availability: "Open to full-time, contract & freelance — remote, worldwide",
  availabilityShort: "Available — remote worldwide",
  yearsExperience: "3+",
  /** Long-form intro copy (Section 02). Split into paragraphs deliberately. */
  intro: [
    "I'm a front-end–focused full stack developer with 3+ years of experience building, modernising and supporting web and SaaS products. I care about the details most people scroll past: how a form validates, how a dashboard reads at a glance, how a page feels in the first second it loads.",
    "Most of my work has been rescue and elevation work — taking a product that works but doesn't feel right, and rebuilding the interface, the design system and the data presentation around it. That means dashboards, data visualisation, authentication flows, reporting, and reusable component libraries that keep a team fast after I've moved on.",
    "The rest is newer: AI-assisted video and motion for launch and walkthrough content, real-time 3D on the web, and a working habit of learning whatever the next build actually needs. I'd rather learn the right tool in a week than defend the wrong one for a year.",
  ],
  pullQuote:
    "A product should feel inevitable — nothing missing, nothing extra, nothing slow.",
  /** Summary lifted from the résumé — used for metadata + case-study context. */
  summary:
    "Front-End-focused Full Stack Developer with 3+ years of experience building, modernizing, and supporting web and SaaS applications. Strong in React.js, Next.js, JavaScript, TypeScript, responsive UI engineering, dashboards, interactive data visualizations, and API integration, with additional experience across the MERN stack and .NET MVC — plus AI-assisted video, motion and 3D on the web.",
  /** Facts strip under the hero — every number is traceable to the résumé. */
  stats: [
    { value: "3+", label: "Years shipping products" },
    { value: "15", label: "Documented case studies" },
    { value: "250+", label: "Bugs resolved on RetirewiseAI" },
    { value: "68→92", label: "Lighthouse score, Growby migration" },
  ],
  /** Metadata table used in the intro + contact sections. */
  facts: [
    { key: "Based in", value: "Vadodara, India" },
    { key: "Working", value: "Remote-first — Canada, U.S. & India" },
    { key: "Focus", value: "React · Next.js · TypeScript" },
    { key: "Also works in", value: ".NET MVC · MERN · Flutter" },
    { key: "Beyond code", value: "AI video · motion · 3D" },
    { key: "Studied at", value: "DAIICT — B.Tech, ICT" },
    { key: "Languages", value: "English, Hindi, Gujarati" },
  ],
  contact: {
    email: "shreypatel2468642@gmail.com",
    phone: "+91 93288 78554",
    /** Phone is intentionally not rendered publicly — flip to true to show it. */
    showPhone: false,
    linkedin: "https://linkedin.com/in/shrey-patel-887b2b22a",
    linkedinLabel: "linkedin.com/in/shrey-patel-887b2b22a",
    github: "https://github.com/ShreyPatel-07",
    githubLabel: "github.com/ShreyPatel-07",
    githubSecondary: "https://github.com/Shrey-hub7",
    githubSecondaryLabel: "github.com/Shrey-hub7",
    /** Résumé file served from /public. Replace the file to update the download. */
    resume: "/Shrey-Patel-Resume.pdf",
    resumeFileName: "Shrey-Patel-Resume.pdf",
  },
  /**
   * Background-removed portraits. The hero and Intro use the formal suit
   * portraits; project pages reuse the set through `projects[].portrait`.
   */
  portrait: {
    hasPortrait: true,
    /** 1600 × 2400 transparent WebP. */
    src: "/portraits/shrey-suit-standing.webp",
    alt: "Shrey Patel in a formal mauve suit, looking to the side with a hand in his pocket.",
    width: 1600,
    height: 2400,
  },
  introPortrait: {
    hasPortrait: true,
    /** 1600 × 2400 transparent WebP. */
    src: "/portraits/shrey-suit-formal.webp",
    alt: "Shrey Patel in a formal mauve suit, hands clasped.",
    width: 1600,
    height: 2400,
  },
} as const;

export type Profile = typeof profile;
