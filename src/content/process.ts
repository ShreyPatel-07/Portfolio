export type ProcessStep = {
  id: string;
  index: string;
  title: string;
  /** What actually happens in this step. */
  body: string;
  /** Concrete evidence from real work — no invented process. */
  evidence: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    index: "01",
    title: "Understand the problem",
    body: "I start by reproducing what's broken and reading the code that caused it. Most of my work begins with a bug report or a product that has drifted from its own design language — so the first job is diagnosis, not decoration.",
    evidence:
      "250+ bugs investigated and resolved across authentication, validation and responsive layout on RetirewiseAI.",
  },
  {
    id: "research",
    index: "02",
    title: "Research & explore",
    body: "I map the existing patterns before proposing new ones, and look at how comparable products solve the same interaction. Anything I introduce has to survive the rest of the codebase, not just the screen I'm working on.",
    evidence:
      "Audited Growby's ASPX/CSHTML verticals before planning the migration that lifted Lighthouse from 68 to 92.",
  },
  {
    id: "plan",
    index: "03",
    title: "Plan the solution",
    body: "Decisions get written down: component boundaries, data shape, states, edge cases and what is explicitly out of scope. A plan that survives review saves a rewrite later.",
    evidence:
      "Structured the GeneSecure compliance-training experience as a modular design system so assessment modules stay consistent.",
  },
  {
    id: "build",
    index: "04",
    title: "Design & develop",
    body: "Design and build happen together — I prototype in the real stack so spacing, motion and data density are validated with actual content rather than in a mockup.",
    evidence:
      "Built advisor and individual dashboards, Chart.js visualisations and planning reports end to end on RetirewiseAI.",
  },
  {
    id: "refine",
    index: "05",
    title: "Test & refine",
    body: "Responsive checks, keyboard paths, empty and error states, then performance. I fix what I find instead of filing it, and re-test after every fix.",
    evidence:
      "Reworked Contact Management components and APIs on Growby, clearing 150+ defects in the module.",
  },
  {
    id: "deliver",
    index: "06",
    title: "Deliver & handover",
    body: "Ship the accepted product to production, then hand it over so the next developer can move without me: readable components, clear naming, credentials and — where a feature is non-obvious — a short walkthrough video.",
    evidence:
      "Produced ~3-minute module walkthroughs, AI-assisted product overviews and release activity logs at Genellipse.",
  },
];
