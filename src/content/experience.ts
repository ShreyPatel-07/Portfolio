export type Role = {
  id: string;
  company: string;
  companyNote?: string;
  title: string;
  period: string;
  /** Representative year for the mobile career calendar. */
  calendarYear: string;
  location: string;
  /** Short framing line for the collapsed state. */
  summary: string;
  contributions: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "genellipse",
    company: "Genellipse Inc.",
    companyNote: "Canada-based",
    title: "Full Stack Developer",
    period: "Feb 2026 — Sep 2026",
    calendarYear: "2026",
    location: "Remote",
    summary:
      "Owned stabilisation and redesign across a portfolio of AI, fintech and compliance products.",
    contributions: [
      "Stabilised and improved RetirewiseAI, investigating and resolving 250+ bugs across login, form validation, authentication, OAuth, 2FA setup, responsive layouts and core platform interactions.",
      "Led a broad restructuring and redesign of RetirewiseAI for a polished, consistent experience; built detailed advisor and individual dashboards, interactive Chart.js visualisations, UI animations, sorting and filtering, and retirement-planning reports.",
      "Contributed to user-facing workflows for Cortex AI, an AI-agent platform, helping users configure agents, automate tasks and understand their outputs.",
      "Designed and implemented a reusable, modular design system for GeneSecure's compliance-training experience, keeping assessment modules visually consistent.",
      "Designed and built AegisNow, the AI-native insurance platform and its full public site — eight modules, six industry verticals, six solution journeys, Cortex AI and the interactive product demonstration — live at aegisnow.ai.",
      "Designed and built the public GeneCRM site — eight industry presets, GENE Copilot, platform, security, integrations and developer surfaces, plus the product film — live at crm.genellipse.ai.",
      "Delivered a private real-estate agency website for a Dubai-based client under confidentiality; the client identity, listings, captures and source remain private by request.",
      "Produced ~3-minute how-to videos for individual modules, AI-assisted product overviews, and release activity logs explaining new features to users.",
      "Redesigned the Genellipse corporate website with a consistent visual system, clear positioning and responsive layouts.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Chart.js", "Design Systems", "REST APIs"],
  },
  {
    id: "sprouto",
    company: "Sprouto InfoSolution Pvt. Ltd.",
    title: "Full Stack Developer",
    period: "Jul 2024 — Dec 2025",
    calendarYear: "2025",
    location: "India",
    summary:
      "Shipped UI across a large-scale SaaS platform and owned front-end delivery for two marketing products.",
    contributions: [
      "Contributed to Growby, a large-scale SaaS platform, across .NET, ASPX/CSHTML, JavaScript, React.js, Next.js and SQL.",
      "Executed a UI migration for Growby product verticals to ASPX/CSHTML — improving the Lighthouse performance score from 68 to 92 and reducing bounce rate by 11%.",
      "Improved the Contact Management module by reworking front-end components, integrating backend APIs and resolving 150+ bugs.",
      "Owned end-to-end front-end development for SendZen, a developer-focused WhatsApp marketing platform — website and user panel in Next.js with reusable, component-driven interfaces.",
      "Developed the ChatsUp marketing website and integrated payment gateways including Stripe, Razorpay and PayU.",
      "Built the front-end for an AI-driven chatbot flow builder, associated with a 12% increase in weekly active users.",
    ],
    stack: [".NET", "ASPX/CSHTML", "React.js", "Next.js", "SQL", "Stripe", "Razorpay", "PayU"],
  },
  {
    id: "ecare",
    company: "Ecare Infoway LLP",
    title: "Mobile Application Developer",
    period: "Jan 2024 — May 2024",
    calendarYear: "2024",
    location: "India",
    summary: "Delivered production Flutter screens and published a live ecommerce app.",
    contributions: [
      "Delivered three production-ready mobile screens using Flutter, focused on polished UI and state management with Provider and GetX.",
      "Developed and published the UI for the Incredible Men e-commerce app on the Google Play Store.",
    ],
    stack: ["Flutter", "Dart", "Provider", "GetX"],
  },
  {
    id: "cuvette",
    company: "Cuvette",
    title: "Full Stack Developer Intern",
    period: "Jul 2023 — Dec 2023",
    calendarYear: "2023",
    location: "Remote",
    summary: "Built a MERN capstone product end to end, from auth to dashboard.",
    contributions: [
      "Built a personalised movie discovery platform as a MERN-stack capstone project, including secure authentication with Node.js and Express.js and user data storage with MongoDB.",
      "Developed a React.js dashboard integrating third-party APIs for movie recommendations, news and local weather, plus browser Local Storage for note persistence.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    id: "spark",
    company: "Spark to Ideas",
    title: "Software Developer Intern",
    period: "Jan 2023 — Jun 2023",
    calendarYear: "2023",
    location: "India",
    summary: "First production codebase — responsive React interfaces and defect work.",
    contributions: [
      "Developed responsive React.js interfaces using Redux and React Hooks, and fixed defects to improve usability and page performance.",
      "Participated in code reviews and provided feedback to improve code quality and maintainability.",
    ],
    stack: ["React.js", "Redux", "Hooks"],
  },
];

export const education = [
  {
    id: "daiict",
    institution:
      "Dhirubhai Ambani Institute of Information and Communication Technology (DAIICT)",
    degree: "B.Tech. in Information and Communication Technology",
    period: "2019 — 2023",
    detail: "CGPA 7.0 / 10 · Gandhinagar, Gujarat",
  },
];
