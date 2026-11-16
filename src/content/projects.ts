/**
 * PROJECTS — the single place to add work.
 *
 * Adding a project = appending one object to `projects` below (and dropping any
 * real screenshots into /public/work). Every rail, card, archive row and case
 * study page is generated from this file — nothing is hardcoded in components.
 *
 * HONESTY RULES BAKED INTO THE DATA MODEL
 * · `outcomes` must stay qualitative unless a real, measured number exists.
 *   Measured figures from the résumé (Lighthouse 68→92, 250+ bugs, +12% WAU)
 *   are quoted exactly where they belong.
 * · Fields that could not be verified are listed in `placeholders` and rendered
 *   with a subtle "to confirm" marker instead of being presented as fact.
 * · `visual.hasScreenshot === false` means the artwork is a generated,
 *   art-directed plate — clearly captioned as a placeholder for real imagery.
 */

export type VisualPattern = "orbit" | "stack" | "grid" | "wave" | "prism";

export type ProjectPortrait = {
  /** Transparent portrait in /public/portraits. */
  src: string;
  alt: string;
  /** Small label above the headline; defaults to "Built by". */
  eyebrow?: string;
  title: string;
  body: string;
  caption: string;
  /** CSS object-position for the crop. */
  position?: string;
  /** `contain` preserves the full cut-out; `cover` fills a landscape frame. */
  fit?: "contain" | "cover";
};

export type ProjectVisual = {
  /** true = a real capture lives at `src`. false = generated plate. */
  hasScreenshot: boolean;
  src?: string;
  alt?: string;
  /** Portrait captures are shown contained rather than cropped. */
  portrait?: boolean;
  /** Optional short, silent clip recorded from the live site. */
  video?: string;
  /** Base hue for the generated plate. */
  accent: string;
  pattern: VisualPattern;
  /** Mono caption printed on the plate. */
  caption: string;
};

export type Project = {
  id: string;
  slug: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  context: string;
  liveUrl?: string;
  featured: boolean;
  /** Rail card size hint for the horizontal showcase. */
  size: "wide" | "tall" | "standard";
  summary: string;
  /** Case-study long form. */
  overview: string;
  problem: string;
  contribution: string[];
  features: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  outcomes: string[];
  stack: string[];
  /** Optional part/product families for manufacturing-style catalogues. */
  catalogue?: string[];
  process?: { title: string; body: string }[];
  visual: ProjectVisual;
  /** Product mark, shown on the case study and in the live-products strip. */
  logo?: { src: string; alt: string; surface: "light" | "dark" };
  /** Optional author portrait, rendered after the case-study body. */
  portrait?: ProjectPortrait;
  gallery?: { src: string; alt: string; caption: string; portrait?: boolean }[];
  /** Field names awaiting confirmation — rendered with a "to confirm" marker. */
  placeholders?: string[];
};

export const projects: Project[] = [
  {
    id: "mechengers",
    slug: "mechengers",
    index: "01",
    name: "Mechengers",
    tagline: "Path to precision — a CNC machine shop turned into a product.",
    category: "Manufacturing · Design & build",
    year: "2026",
    role: "Website design & development",
    context: "Mechengers · Billimora, Gujarat",
    liveUrl: "https://mechengers.com",
    featured: true,
    size: "wide",
    summary:
      "A precision CNC turning shop needed a site with the same discipline as its parts: twelve part families, eight process stages, three verifiable credentials and a quote path a buyer can complete from a phone in a workshop.",
    overview:
      "MECHENGERS is a proprietor-led precision machining business in Antaliya, Billimora, Gujarat. Since 2022 it has produced ball valve components, stud bolts and custom turned parts in mild steel and SS316, held to ±0.01 mm and inspected in-house before dispatch. The website is not a brochure for a machine shop — it is the shop's sales floor: a twelve-part catalogue, material and tolerance data, credentials a buyer can verify, and a quote request that works where buyers actually are.",
    problem:
      "Precision manufacturing is sold on proof, not adjectives. Buyers compare suppliers on tolerances, material grades, inspection discipline and verifiable registration — and they shortlist from a phone. A generic brochure page flattens twelve distinct part families into one gallery, buries ±0.01 mm inside a paragraph, and leaves the buyer guessing which credentials are real.",
    contribution: [
      "Designed and developed mechengers.com end to end — art direction, page architecture, front-end implementation and delivery.",
      "Built the twelve-part catalogue as structured content across three ranges (valve components, studs & fasteners, precision machined components), so parts are comparable rather than decorative.",
      "Turned the shop's actual process into an eight-stage manufacturing narrative — raw material, CNC machining, threading & rolling, heat treatment, surface finishing, inspection, packaging, dispatch — so quality reads as a system.",
      "Surfaced verifiable credentials (CIPET-certified CNC operation, Udyam/MSME registration, GST) as buying evidence, with the issuing authority named.",
      "Built the quote path around the buyer's real input — a drawing, a sample or a worn part — with Request a Quote, Call and WhatsApp repeated at every decision point.",
      "Wrote the capability and product copy in the shop's own language: bore diameters, thread standards (metric, BSW, UNC), SS316/SS304 and EN8/EN9, ±0.01 mm — rather than generic marketing.",
      "Delivered a responsive build that holds up at phone width, where most B2B enquiries start.",
    ],
    features: [
      {
        title: "Twelve-part catalogue",
        body: "Three product families, twelve part types, each with material grade, bore, thread or application detail — one comparable card and detail grammar.",
      },
      {
        title: "Eight-stage process",
        body: "A numbered manufacturing route that shows exactly where inspection sits, why the tolerance holds batch after batch.",
      },
      {
        title: "Verifiable credentials",
        body: "CIPET certification, Udyam/MSME registration and GST verification presented as evidence, with the issuing body named.",
      },
      {
        title: "Quote-first conversion",
        body: "Request a Quote, Call and WhatsApp available from every decision point — plus a drawing- or sample-led enquiry brief.",
      },
      {
        title: "Part-level detail",
        body: "Individual product pages carry bore, material and application: the three things a buyer needs to shortlist a supplier.",
      },
      {
        title: "Industry routing",
        body: "Pumps & fluid handling, plumbing & water, elevators & lifts, cranes & hoists, valve OEMs and general engineering each get an entry point.",
      },
    ],
    challenges: [
      {
        title: "Engineering copy, commercial clarity",
        body: "The subject is genuinely technical — thread standards, bore diameters, hardness. The copy had to stay exact while still telling a buyer in thirty seconds why this shop deserves a drawing.",
      },
      {
        title: "Twelve parts, one system",
        body: "Every family has different dimensions and applications. They share one card and detail grammar so the catalogue stays comparable as it grows.",
      },
      {
        title: "Credibility without invention",
        body: "Trust had to come from things a buyer can check — certification issuer, MSME registration, GSTIN — not invented client logos or fabricated metrics.",
      },
    ],
    outcomes: [
      "Twelve part families documented as structured, comparable product content.",
      "The eight-stage process and three credentials presented as buying evidence rather than footer decoration.",
      "A quote path — form, phone, WhatsApp — reachable from every section of the site.",
      "Live at mechengers.com, built on Astro with a client-side motion layer.",
    ],
    stack: ["Astro", "TypeScript", "Tailwind CSS", "Responsive UI", "Cloudflare"],
    catalogue: [
      "65 Dia Ball Valve",
      "41 Dia Ball Valve",
      "65 Dia Valve Lid",
      "Spoon Valve",
      "Flange Stud Bolt",
      "MS Threaded Stud",
      "5 TPI Stud · 50 mm",
      "165 Dia Collar",
      "Yoke Ring",
      "Trolley End Cap",
      "Bucket Holder",
      "Brake Drum",
    ],
    process: [
      {
        title: "Read the shop",
        body: "Started from the floor, not the brief: which parts actually ship, which tolerances are held, which materials are stocked, which credentials a buyer can verify.",
      },
      {
        title: "Structure the catalogue",
        body: "Grouped twelve part families into three ranges, then wrote each part's material, bore and application so the catalogue can be compared, not just browsed.",
      },
      {
        title: "Art-direct precision",
        body: "A near-black, high-contrast system with machined typography and restrained motion — the interface should feel as exact as the parts.",
      },
      {
        title: "Build the quote path",
        body: "Made the enquiry the spine of the page: quote, call and WhatsApp CTAs at every decision point, with a drawing/sample-led brief.",
      },
      {
        title: "Harden on mobile",
        body: "Tested the specification-heavy layout at phone width, where most industrial buyers actually start their search.",
      },
    ],
    visual: {
      hasScreenshot: true,
      src: "/work/mechengers.png",
      alt: "Mechengers home page — precision turned parts, engineered to seal, thread and hold.",
      video: "/work/video/mechengers.mp4",
      accent: "#f4551d",
      pattern: "orbit",
      caption: "Live capture — mechengers.com",
    },
    gallery: [
      {
        src: "/work/mechengers-hero.png",
        alt: "Mechengers homepage at mobile width",
        caption: "Mobile-width capture: most industrial buyers shortlist from a phone.",
      },
      {
        src: "/work/mechengers.png",
        alt: "Mechengers desktop home page with part specification callouts",
        caption: "Desktop: material grade, bore diameter and tolerance are attached to the part.",
      },
    ],
    portrait: {
      src: "/portraits/shrey-suit-pocket.webp",
      alt: "Shrey Patel in a formal suit, designer and developer of the Mechengers site.",
      eyebrow: "Built from the shop floor",
      title: "A website that starts with the parts, not the template.",
      body: "Mechengers is a proprietor-led machine shop in Billimora. I built the catalogue and quote path from the floor up — part families, materials, tolerances and the credentials a buyer checks — so the site sounds like the shop, not like software.",
      caption: "Portrait — Mechengers build, 2026.",
      position: "50% 0%",
      fit: "cover",
    },
    placeholders: [],
  },
  {
    id: "retirewise",
    slug: "retirewise-ai",
    index: "02",
    name: "RetirewiseAI",
    tagline: "Rescuing a retirement-planning platform — 250+ defects and a full redesign.",
    category: "Fintech SaaS · Dashboard & redesign",
    year: "2026",
    role: "Full Stack Developer",
    context: "Genellipse Inc. (Canada-based)",
    liveUrl: "https://retirewise.ai",
    featured: true,
    size: "tall",
    summary:
      "A retirement-planning product with a broken front door. I cleared 250+ defects across authentication, validation and layout, then rebuilt the advisor and individual experiences around readable data.",
    overview:
      "RetirewiseAI is an AI-driven retirement-planning platform for households in Canada and the United States — country-aware accounts and tax rules (CPP/OAS, RRSP/TFSA/RRIF and provincial tax including Quebec; Social Security, Traditional/Roth IRA, 401(k)/403(b)/457(b) and HSA), household and spousal modelling, scenario analysis and 19 planning surfaces served to both advisors and individuals. It carries serious responsibility: authentication, 2FA, planning inputs, projections and reporting that people make financial decisions with. When I joined, the product worked in the demo and broke in the details.",
    problem:
      "Defects were concentrated exactly where trust is built — login, OAuth, 2FA setup, form validation and responsive layout. On top of that, the interface presented retirement data as dense tables with no visual hierarchy, so advisors could not read a plan at a glance.",
    contribution: [
      "Investigated and resolved 250+ bugs spanning login, form validation, authentication, OAuth, 2FA setup, responsive layouts and core platform interactions.",
      "Led a broad restructuring and redesign to deliver a polished, consistent user experience across the product.",
      "Built detailed advisor and individual dashboards, including the data views each audience actually needs.",
      "Implemented interactive Chart.js visualisations and retirement-planning reports to support analysis and decision-making.",
      "Added sorting, filtering and UI animations to make large data sets navigable without feeling heavy.",
    ],
    features: [
      {
        title: "Advisor dashboard",
        body: "A consolidated view for advisors managing multiple plans — the data density an advisor needs, organised so the eye lands on what changed.",
      },
      {
        title: "Individual dashboard",
        body: "The same underlying data, re-presented for a single person planning their own retirement without an advisor translating it.",
      },
      {
        title: "Interactive visualisations",
        body: "Chart.js charts for projections and comparisons, wired to the same data as the reports so the two never disagree.",
      },
      {
        title: "Planning reports",
        body: "Structured reports that turn planning inputs into something a person can read, keep and act on — including exports that keep the user's theme.",
      },
      {
        title: "Scenario & what-if analysis",
        body: "Compare retirement dates, savings rates and assumptions side by side, with the probability and tax impact of each scenario visible at once.",
      },
      {
        title: "Tax-aware surfacing",
        body: "Country and region drive what the plan shows — Canadian provincial treatment including Quebec, or U.S. federal and state rules — never a generic calculator.",
      },
      {
        title: "Hardened auth flows",
        body: "OAuth and 2FA setup paths reworked end to end, including the validation and error states that were failing silently.",
      },
    ],
    challenges: [
      {
        title: "Fixing without destabilising",
        body: "250+ defects in a live product meant the discipline was reproduce → fix → re-verify, never batch-guess. Each fix had to be provably not a new regression.",
      },
      {
        title: "Two audiences, one product",
        body: "Advisors and individuals need the same numbers at very different densities. The redesign separated the two experiences without forking the data layer.",
      },
      {
        title: "Financial data must be readable",
        body: "Chart colour, axis labelling and number formatting were treated as product decisions, not styling — a misread chart is a wrong decision.",
      },
    ],
    outcomes: [
      "250+ defects resolved across authentication, validation, layout and core interactions.",
      "A consistent, polished experience replacing an interface that had drifted section by section.",
      "Retirement data presented visually, so plans can be assessed rather than decoded.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Chart.js", "REST APIs", "OAuth / 2FA"],
    visual: {
      hasScreenshot: true,
      src: "/work/retirewise.png",
      alt: "Retirewise AI home page — AI-powered retirement planning for Canada and the U.S.",
      video: "/work/video/retirewise.mp4",
      accent: "#f4551d",
      pattern: "wave",
      caption: "Live capture — retirewise.ai",
    },
    logo: { src: "/work/logos/retirewise.png", alt: "Retirewise AI", surface: "dark" },
    placeholders: ["year"],
  },
  {
    id: "growby",
    slug: "growby",
    index: "03",
    name: "Growby",
    tagline: "A UI migration that took Lighthouse from 68 to 92.",
    category: "Large-scale SaaS · Performance & migration",
    year: "2025",
    role: "Full Stack Developer",
    context: "Sprouto InfoSolution",
    liveUrl: "https://growby.net",
    featured: true,
    size: "standard",
    summary:
      "Migrating product verticals onto ASPX/CSHTML while raising measured page performance from 68 to 92 and cutting bounce rate by 11%.",
    overview:
      "Growby is an AI WhatsApp marketing platform built on the official WhatsApp Business API: bulk campaigns, automations, an AI chatbot trained from a business's own website and documents, a shared inbox, a flow builder and a white-label reseller programme. Underneath it is a large-scale SaaS platform spanning .NET, ASPX/CSHTML, JavaScript, React.js, Next.js and SQL. My work covered the Contact Management module and a UI migration that moved product verticals onto a consistent ASPX/CSHTML foundation.",
    problem:
      "Vertical by vertical, the platform had accumulated inconsistent interfaces and slow pages. Performance was measurable and poor — a Lighthouse score of 68 — and the Contact Management module carried 150+ defects that made day-to-day use frustrating.",
    contribution: [
      "Executed a UI migration for Growby product verticals to ASPX/CSHTML, improving the Lighthouse performance score from 68 to 92 and reducing bounce rate by 11%.",
      "Improved the Contact Management module by reworking front-end components, integrating backend APIs and resolving 150+ bugs.",
      "Contributed across the stack — .NET, ASPX/CSHTML, JavaScript, React.js, Next.js and SQL — rather than staying in one layer.",
    ],
    features: [
      {
        title: "Vertical-by-vertical migration",
        body: "Each product vertical moved onto the shared ASPX/CSHTML foundation, so the platform converged on one interface language instead of drifting further.",
      },
      {
        title: "Contact Management rebuild",
        body: "Front-end components reworked and reconnected to backend APIs, then cleared of 150+ defects.",
      },
      {
        title: "Measured performance work",
        body: "The migration was judged on the Lighthouse score and bounce rate — before and after, not by feel.",
      },
      {
        title: "Campaign & contact surfaces",
        body: "Contacts, campaigns and automation sit on the same UI foundation, so a customer record and a broadcast are driven by one component language.",
      },
    ],
    challenges: [
      {
        title: "Migrating a live platform",
        body: "Large-scale SaaS does not pause for a rewrite. Work had to land incrementally, vertical by vertical, without breaking existing users.",
      },
      {
        title: "Legacy rendering model",
        body: "ASPX/CSHTML constrains what the front end can do, so the design had to be honest about the platform rather than fighting it.",
      },
    ],
    outcomes: [
      "Lighthouse performance score improved from 68 to 92.",
      "Bounce rate reduced by 11%.",
      "150+ defects resolved in the Contact Management module.",
    ],
    stack: [".NET", "ASPX / CSHTML", "JavaScript", "React.js", "Next.js", "SQL", "WhatsApp Business API"],
    visual: {
      hasScreenshot: true,
      src: "/work/growby.png",
      alt: "Growby home page — AI WhatsApp marketing platform for sales and engagement.",
      video: "/work/video/growby.mp4",
      accent: "#d8cbb6",
      pattern: "grid",
      caption: "Live capture — growby.net",
    },
    logo: { src: "/work/logos/growby.png", alt: "Growby", surface: "light" },
  },
  {
    id: "sendzen",
    slug: "sendzen",
    index: "04",
    name: "SendZen",
    tagline: "The WhatsApp API for developers — built front to back.",
    category: "Developer tooling · Marketing site & user panel",
    year: "2025",
    role: "End-to-end front-end owner",
    context: "Sprouto InfoSolution",
    liveUrl: "https://sendzen.io",
    featured: true,
    size: "wide",
    summary:
      "Owned the entire front end for a developer-focused WhatsApp marketing platform — marketing site and the user panel behind it — in Next.js.",
    overview:
      "SendZen is the WhatsApp API for developers — an official Meta Business Partner product for sending utility, marketing and authentication messages, with embedded signup, a voice API and webhooks for incoming messages and delivery reports. I owned its front end end to end: the public marketing site that has to explain an API-adjacent product, and the user panel where customers actually run campaigns.",
    problem:
      "Marketing pages and product panels for developer tools tend to be built twice by two teams and end up inconsistent. The brief was a single component-driven system that could serve both without a redesign every time a feature shipped.",
    contribution: [
      "Built the marketing website and user panel in Next.js from the ground up.",
      "Established reusable, component-driven interfaces with a maintainable code structure so new screens compose from existing primitives.",
      "Focused on performance, consistency and usability across both surfaces.",
    ],
    features: [
      {
        title: "Marketing site",
        body: "Responsive pages that explain the platform's value before the technical detail, built for a fast first paint.",
      },
      {
        title: "User panel",
        body: "The operational interface where customers manage campaigns — built from the same component library as the marketing site.",
      },
      {
        title: "Shared component layer",
        body: "One set of primitives serving two very different surfaces, which is what keeps the product coherent as it grows.",
      },
      {
        title: "Developer-facing clarity",
        body: "Message types, webhooks and embedded signup presented in the order a developer needs them — what it sends, how it connects, what comes back.",
      },
      {
        title: "Language switching",
        body: "The interface carries a locale switch alongside the marketing narrative, so the same components serve readers in more than one language.",
      },
    ],
    challenges: [
      {
        title: "Two products, one system",
        body: "A marketing page and an authenticated panel have different density and motion needs. The component API had to absorb both.",
      },
      {
        title: "Developer audience",
        body: "This audience notices latency and inconsistency immediately — performance and naming discipline were not optional.",
      },
    ],
    outcomes: [
      "Marketing site and user panel delivered end to end on one maintainable Next.js codebase.",
      "Live at sendzen.io as the platform's public front door.",
      "Reusable component structure that keeps new screens cheap to add.",
    ],
    stack: ["Next.js", "React.js", "JavaScript", "REST APIs", "Component systems"],
    visual: {
      hasScreenshot: true,
      src: "/work/sendzen.png",
      alt: "SendZen home page — the WhatsApp API for developers, official Meta Business Partner.",
      video: "/work/video/sendzen.mp4",
      accent: "#f4551d",
      pattern: "prism",
      caption: "Live capture — sendzen.io",
    },
    logo: { src: "/work/logos/sendzen.png", alt: "SendZen", surface: "dark" },
  },
  {
    id: "cortex",
    slug: "cortex-ai",
    index: "05",
    name: "Cortex AI",
    tagline: "Making an AI-agent platform legible to the people configuring it.",
    category: "AI platform · User workflows",
    year: "2026",
    role: "Full Stack Developer",
    context: "Genellipse Inc.",
    liveUrl: "https://www.cortexrizi.com",
    featured: true,
    size: "standard",
    summary:
      "User-facing workflows for a governed AI-agent platform — helping people configure agents, connect knowledge and tools, automate tasks and actually understand what the agent did.",
    overview:
      "Cortex AI is a governed agent platform: teams connect knowledge and tools, set permissions and approval rules, then run agents against real work with evaluation, cost controls and an auditable record of what each one did. The hard problem is not the model — it is comprehension and control: a user has to be able to trust an agent they cannot read.",
    problem:
      "Agent platforms expose configuration, tools, permissions and outputs that are conceptually dense. Without careful interface work, users configure an agent, get an outcome, and have no idea why — so they stop trusting it, or they never turn it on in the first place.",
    contribution: [
      "Contributed to the user-facing workflows for Cortex AI, an AI-agent platform.",
      "Helped users configure agents, connect the knowledge and tools they are allowed to use, automate tasks, and understand the outputs.",
      "Worked on the surfaces that make a governed run reviewable — what the agent had access to, what it did, and what it cost.",
    ],
    features: [
      {
        title: "Agent configuration",
        body: "Workflows that walk a user through setting up an agent without requiring them to think in the platform's internal model.",
      },
      {
        title: "Knowledge & tools",
        body: "Connecting the sources and tools an agent is allowed to use, so its reach is defined before it runs rather than discovered afterwards.",
      },
      {
        title: "Output legibility",
        body: "Surfacing what an agent did and why, so its output can be reviewed instead of taken on faith.",
      },
      {
        title: "Oversight surfaces",
        body: "Human approval steps, activity and cost presented so an operator can see a run end to end — the interface side of a governance model.",
      },
    ],
    challenges: [
      {
        title: "Explaining a system that is not deterministic",
        body: "Agent output varies. The interface has to set expectations honestly and still feel controlled.",
      },
      {
        title: "Configuration without intimidation",
        body: "Every control needed a plain-language consequence, not just a label.",
      },
    ],
    outcomes: [
      "User-facing workflows for agent configuration and task automation shipped on the platform.",
      "Clearer presentation of agent outputs for non-technical users.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "REST APIs", "AI-agent workflows", "Governance UI"],
    visual: {
      hasScreenshot: true,
      src: "/work/cortex.png",
      alt: "Cortex AI OS home page — the operating system for governed AI agents.",
      video: "/work/video/cortex.mp4",
      accent: "#8f2f10",
      pattern: "orbit",
      caption: "Live capture — cortexrizi.com",
    },
    logo: { src: "/work/logos/cortex-ai.png", alt: "Cortex AI", surface: "light" },
  },
  {
    id: "gene-secure",
    slug: "gene-secure",
    index: "06",
    name: "GeneSecure",
    tagline: "A compliance-training design system that keeps every module consistent.",
    category: "Compliance SaaS · Design system",
    year: "2026",
    role: "Full Stack Developer",
    context: "Genellipse Inc.",
    featured: false,
    size: "standard",
    summary:
      "Designed and implemented a reusable, modular design system for compliance-training modules so organisations can prepare for reviews without visual drift.",
    overview:
      "GeneSecure's compliance-training experience is a set of assessment modules that organisations run their people through. When every module is designed in isolation, the experience fragments — and in a compliance context, inconsistency reads as carelessness.",
    problem:
      "Assessment modules had no shared visual or component foundation. Each addition meant new decisions, which meant drift, and drift in compliance training undermines the credibility the product exists to provide.",
    contribution: [
      "Designed and implemented a reusable, modular design system for the compliance-training experience.",
      "Kept assessment modules visually consistent as new ones were added.",
      "Built for the review context — organisations preparing for compliance reviews need output that looks as rigorous as the process.",
    ],
    features: [
      {
        title: "Modular component set",
        body: "Assessment primitives that compose into new modules without new design decisions.",
      },
      {
        title: "Consistent assessment language",
        body: "Progress, questions, results and completion share one visual grammar.",
      },
    ],
    challenges: [
      {
        title: "Compliance has no room for ambiguity",
        body: "Every state — unanswered, correct, incorrect, complete — had to be unmistakable.",
      },
      {
        title: "Design system as a product",
        body: "The system had to be documented and predictable enough for other developers to extend.",
      },
    ],
    outcomes: [
      "Assessment modules share one reusable, modular design system.",
      "New compliance modules can be added without redesigning the experience.",
    ],
    stack: ["React.js", "TypeScript", "Design systems", "Component architecture"],
    visual: {
      hasScreenshot: false,
      accent: "#d8cbb6",
      pattern: "stack",
      caption: "Product work — screenshots available on request",
    },
  },
  {
    id: "aegis-now",
    slug: "aegis-now",
    index: "07",
    name: "AegisNow",
    tagline: "An AI-native insurance platform — eight modules on one governed core.",
    category: "Insurance infrastructure · AI product",
    year: "2026",
    role: "Designer & Full Stack Developer",
    context: "Genellipse Inc. · Live at aegisnow.ai",
    liveUrl: "https://aegisnow.ai/",
    featured: true,
    size: "standard",
    summary:
      "Designed and built the entire AegisNow platform website and interactive product demonstration solo — eight insurance modules, six industry verticals, six solution journeys, the Cortex AI layer and a 53-route English site across four locales — live at aegisnow.ai.",
    overview:
      "AegisNow is an AI-native insurance platform for Life and P&C carriers, MGAs and reinsurers. It unifies underwriting, claims, policy administration, billing, reinsurance, distribution and customer 360 on one shared data fabric, with Cortex AI proposing work inside human-controlled guardrails. I designed and built the entire public product — information architecture, visual system, every module and industry page, the dashboard and demo surfaces, responsive behaviour and localisation — as a solo build. It is a working product demonstration: every capability explains how it works and names its limits rather than hiding them.",
    problem:
      "Insurance software is sold on depth, but depth is hard to show. AegisNow had to make eight dense modules, six buyer segments and a governed-AI story legible as one coherent system — without flattening the domain into generic SaaS copy or presenting illustrative numbers as fact. Each page had to stand on its own as a credible product surface while sharing one visual and interaction language.",
    contribution: [
      "Designed and built the whole AegisNow site solo — information architecture, art direction, design system, responsive components, page templates and the live front end.",
      "Built all eight module surfaces: Underwriting Workbench, Smart Claims, Policy Administration, Billing & Collections, Reinsurance, Distribution & Agency, Customer 360 and the Actuarial Platform, plus the Cortex AI control-plane story.",
      "Built the six industry verticals — Life & Annuities, P&C, Health & Group Benefits, MGAs & Program Administrators, Reinsurers and Bancassurance — and six solution journeys, then extended the system across pricing, interactive demos, six customer stories, the resource center (blog, glossary, ROI calculator), trust, company, contact, auth and legal pages.",
      "Built the product UI: command-center dashboards, charts, tables, queues, tabs, state-machine views, AI run and agent panels, and the responsive states behind them.",
      "Wrote and structured the product narrative and capability copy — including the explicit limits of the demonstration and the labels on illustrative data.",
      "Shipped 53 English routes and 212 localised URLs across English, Spanish, French and Japanese from one reusable system.",
    ],
    features: [
      {
        title: "Underwriting Workbench",
        body: "Submission extraction with per-field confidence, versioned rate books, a deterministic factor waterfall, and a three-valued authority verdict — within, refer or decline — with the breached rule named.",
      },
      {
        title: "Smart Claims",
        body: "FNOL to adjudication, reserving, payment and recovery. Coverage is checked against the policy in force on the loss date; reserves, payments and statutory deadlines reconcile to the record.",
      },
      {
        title: "Policy Administration",
        body: "A ten-status, eleven-action policy state machine; endorsements, renewals, cancellations and reinstatements; MGA binding authority; bordereaux; product editions and rate books.",
      },
      {
        title: "Billing & Collections",
        body: "Direct, agency and list billing; computed instalment schedules; AR aging derived from due dates; payments reversed by reference; commission accrual and settlement; claim disbursements on the same ledger.",
      },
      {
        title: "Reinsurance",
        body: "Programs, treaties, layers and participations; quota share, per-claim excess of loss and aggregate stop loss; risk-transfer testing; recoveries; counterparty exposure; bordereaux with a lifecycle.",
      },
      {
        title: "Distribution & Agency",
        body: "A regulatory-grain licence and appointment register — state, lines of authority, resident status, expiry, continuing education — attached to a producer master with NPN and agency hierarchy.",
      },
      {
        title: "Customer 360",
        body: "A policyholder and conduct record: complaints with fairness outcomes and redress, vulnerability/KYC/AML fields, interaction history with channel and sentiment, and household and producer grouping.",
      },
      {
        title: "Actuarial Platform",
        body: "Chain ladder, Bornhuetter-Ferguson, Cape Cod and ELR on one triangle; Mack and seeded bootstrap ranges; IFRS 17 GMM/VFA/PAA; Solvency II SCR and NAIC RBC; versioned assumptions and sealed evidence packs.",
      },
      {
        title: "Cortex AI",
        body: "A governed agent layer: agent registry with champion/challenger roles, runs with citations and cost, a write-back gate, capability-matched human review for adverse decisions, model routing and rate limits.",
      },
    ],
    challenges: [
      {
        title: "Eight modules, one grammar",
        body: "Each module carries a different domain model, but the navigation, typography, tables, charts and dashboard language had to stay consistent enough that the platform read as one product rather than eight microsites.",
      },
      {
        title: "Governed AI, not AI theatre",
        body: "Cortex needed to show the agent registry, cited runs, human review and write-back gate — and also state what is not built, including no RAG and no hash-chained AI ledger. That honesty is harder than a generic copilot claim.",
      },
      {
        title: "Depth without a wall of copy",
        body: "Fifty-three English pages of dense insurance concepts had to stay scannable for a buyer and deep enough for an evaluator — handled through progressive disclosure, command-center views, capability sections and FAQs.",
      },
      {
        title: "Honest by construction",
        body: "Some pages disclose missing capabilities — no dunning engine, no customer identity resolution, no producer-to-policy link. Keeping that honesty consistent across product copy and UI was a deliberate design constraint.",
      },
      {
        title: "Solo build at site scale",
        body: "One design system and a small set of templates had to hold across 212 localised URLs, responsive layouts and accessible navigation, with no team to absorb inconsistencies.",
      },
    ],
    outcomes: [
      "Live at aegisnow.ai as a complete AI-native insurance platform demonstration.",
      "53 English routes and 212 localised URLs across four languages, shipped from one design system.",
      "Eight modules, six industry verticals, six solution journeys and Cortex AI, all represented with real capability detail.",
      "Every page, dashboard, component and interaction designed and built solo.",
      "Illustrative metrics and the demonstration's limits are labelled in the product rather than presented as verified outcomes.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Design systems", "Data-heavy UI", "Internationalisation"],
    visual: {
      hasScreenshot: true,
      src: "/work/aegisnow.png",
      alt: "AegisNow home page — run insurance as a living, intelligent system.",
      accent: "#1f8a70",
      pattern: "grid",
      caption: "Live capture — aegisnow.ai",
    },
    logo: { src: "/work/logos/aegisnow.svg", alt: "AegisNow", surface: "dark" },
    gallery: [
      {
        src: "/work/aegisnow-mobile.png",
        alt: "AegisNow at 390 px — the mobile hero and live insurance command center.",
        caption: "390 px mobile — the live platform, not a separate app capture.",
        portrait: true,
      },
      {
        src: "/work/aegisnow-platform.png",
        alt: "AegisNow platform page — intelligent insurance infrastructure with the insurance command center.",
        caption: "Platform — eight composable modules on one governed core.",
      },
      {
        src: "/work/aegisnow-underwriting.png",
        alt: "AegisNow Underwriting Workbench page with the underwriting command center.",
        caption: "Underwriting Workbench — versioned rate books and a reproducible premium.",
      },
      {
        src: "/work/aegisnow-actuarial.png",
        alt: "AegisNow Actuarial Platform page with the actuarial workspace.",
        caption: "Actuarial Platform — reserving methods, seeded ranges and evidence packs.",
      },
      {
        src: "/work/aegisnow-cortex.png",
        alt: "AegisNow Cortex AI page with the Cortex Control Plane.",
        caption: "Cortex AI — agent registry, cited runs and a write-back gate.",
      },
      {
        src: "/work/aegisnow-industries.png",
        alt: "AegisNow industries page with the claims command center.",
        caption: "Industry solutions — six segments, one governed platform.",
      },
    ],
    portrait: {
      src: "/portraits/shrey-suit-standing.webp",
      alt: "Shrey Patel in a formal suit, designer and developer of AegisNow.",
      eyebrow: "Solo build",
      title: "One person, the whole surface.",
      body: "AegisNow was designed and built solo: the information architecture, the art direction, eight module surfaces, the demo system and 212 localised URLs. The portrait is part of the argument — there was no team to absorb the inconsistencies.",
      caption: "Portrait — AegisNow build, 2026.",
      position: "50% 0%",
      fit: "cover",
    },
  },
  {
    id: "genecrm",
    slug: "genecrm",
    index: "08",
    name: "GeneCRM",
    tagline: "One CRM engine that reshapes itself to eight industries.",
    category: "CRM SaaS · Design & full-stack website",
    year: "2026",
    role: "Design & full-stack development",
    context: "Genellipse Inc. · Live at crm.genellipse.ai",
    liveUrl: "https://crm.genellipse.ai/",
    featured: true,
    size: "wide",
    summary:
      "Designed and built the public GeneCRM product site — an AI-native, multi-tenant CRM whose vocabulary, pipeline and playbooks adapt to eight industries, with GENE Copilot, database-level tenant isolation, a developer API and a live product film.",
    overview:
      "GeneCRM is an AI-native CRM built around a simple but unusual premise: the product should speak the customer's industry, not force the customer to learn a generic CRM's language. Pick wealth, insurance, banking, nonprofit, education, faith, field service or a custom preset and the labels, stages, playbooks and pipeline reshape around that business. Underneath sits one engine for contacts, pipeline, automation, campaigns and service, a GENE copilot grounded in live data, tenant isolation enforced in Postgres with row-level security, and web, mobile and API clients sharing one backend. I designed and built the public site that has to make all of that legible — the product story, industry pages, platform and capability surfaces, pricing, security, developer docs, integrations and the 4K product film section.",
    problem:
      "Horizontal SaaS usually explains itself by listing features and hoping the buyer translates. GeneCRM's advantage is the opposite: it changes shape for each industry. The site had to make that adaptation tangible before a visitor signs up, prove that tenant isolation is real rather than a line in a security page, and explain a copilot without turning it into AI theatre — while still serving eight very different buyers from one coherent product narrative.",
    contribution: [
      "Designed and built the public GeneCRM website end to end — information architecture, art direction, design system, responsive components and the interactive product-demo surfaces.",
      "Built the story around the real differentiator: a domain-neutral CRM that adapts its vocabulary, stages and playbooks to eight industry presets instead of asking teams to rebuild it.",
      "Created the site's page families: platform, capabilities, industries, pricing, security, integrations, partners, developers, company, contact, legal and localised routes.",
      "Designed the GENE Copilot surfaces — natural-language search, grounded answers, draft follow-ups, deal health and next-action recommendations — so the AI reads as a working layer rather than a chat ornament.",
      "Made tenant isolation a first-class product story: per-tenant Postgres row-level security with FORCE and WITH CHECK, explained in plain language on the security and platform pages.",
      "Built the product-film section, live dashboard previews, API examples and responsive states that carry the same system from desktop to 390 px.",
      "Localised the public experience across English, French, Spanish and Japanese.",
    ],
    features: [
      {
        title: "Eight industry presets",
        body: "Wealth, insurance, banking, nonprofit, education, faith, field service and custom — each with its own vocabulary, stages and playbooks, switchable without losing entered data.",
      },
      {
        title: "GENE Copilot",
        body: "Natural-language search and answers grounded in live workspace data, with one-click follow-up drafts, deal health, risk and a recommended next action.",
      },
      {
        title: "Isolation by design",
        body: "Tenant separation enforced in Postgres row-level security rather than only in the application layer, with FORCE and WITH CHECK on every tenant-scoped table.",
      },
      {
        title: "One engine, three clients",
        body: "Web app, native mobile clients in private beta and an API-as-a-service surface share one login, data model, permission set and backend.",
      },
      {
        title: "Today and pipeline",
        body: "A triage view that gathers open tasks, highest-scoring leads and quiet deals, alongside a pipeline where every new lead lands with an owner and a first follow-up already set.",
      },
      {
        title: "Relationship records",
        body: "Households, applicants, co-applicants, guarantors and the people around a client are visible together instead of fragmented across duplicate contacts.",
      },
      {
        title: "Client-facing surfaces",
        body: "A shareable client portal, knowledge base, quotes and landing pages extend the same record to the customer without a second system.",
      },
      {
        title: "Developer platform",
        body: "Self-service API keys, OAuth clients, webhooks, REST and GraphQL endpoints, plus docs written for the developer who has to ship against them.",
      },
      {
        title: "Security and roles",
        body: "Owner, admin, manager, member and viewer permissions, TOTP two-factor, email verification and audit trails presented as product controls, not fine print.",
      },
    ],
    challenges: [
      {
        title: "Horizontal product, specific story",
        body: "A CRM for everyone can sound like a CRM for no one. The site leads with the industry shift — the moment the vocabulary changes — rather than a feature list that could belong to any competitor.",
      },
      {
        title: "Explaining database isolation",
        body: "Every SaaS claims security. The page had to name the mechanism — Postgres RLS with FORCE and WITH CHECK — and show why database-level isolation is materially different from an application-layer promise.",
      },
      {
        title: "AI without overclaiming",
        body: "GENE is presented as grounded, deterministic-safe and useful out of the box, with the limits of a private-beta mobile app and the optional provider key stated plainly.",
      },
      {
        title: "Three clients, one backend",
        body: "Web, mobile and API are not three products with three stories; the site had to show they are three views of the same engine without flattening their different jobs.",
      },
      {
        title: "A site that ships with the product",
        body: "The public site had to stay coherent as capabilities, pricing, security details and developer surfaces changed — a design system and page grammar, not a one-off landing page.",
      },
    ],
    outcomes: [
      "Live at crm.genellipse.ai as the public face of the GeneCRM platform.",
      "Eight industry presets and four languages presented through one product narrative and one design system.",
      "Platform, capabilities, pricing, security, integrations, partner and developer surfaces shipped as a coherent set.",
      "GENE Copilot and database-level tenant isolation explained in product language a buyer can evaluate.",
      "A product-film section and live dashboard previews make the platform inspectable before signup.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Design systems", "Responsive UI", "Localisation"],
    visual: {
      hasScreenshot: true,
      src: "/work/genecrm.png",
      alt: "GeneCRM home page — one CRM that speaks your industry's language, with the pipeline dashboard and GENE copilot.",
      accent: "#8e7cff",
      pattern: "orbit",
      caption: "Live capture — crm.genellipse.ai",
    },
    logo: { src: "/work/logos/genecrm.svg", alt: "GeneCRM", surface: "dark" },
    gallery: [
      {
        src: "/work/genecrm-platform.png",
        alt: "GeneCRM platform page — every part of the business wired to the same engine, with the API console.",
        caption: "Platform — one engine behind the web app, mobile clients and API.",
      },
      {
        src: "/work/genecrm-developers.png",
        alt: "GeneCRM developer platform page — API-first from day one, with an API request example.",
        caption: "Developer platform — API keys, OAuth, webhooks and REST/GraphQL.",
      },
      {
        src: "/work/genecrm-mobile.png",
        alt: "GeneCRM at 390 px — mobile hero and the pipeline dashboard.",
        caption: "390 px mobile — the same product story and live pipeline preview.",
        portrait: true,
      },
    ],
    portrait: {
      src: "/portraits/shrey-suit-wide.webp",
      alt: "Shrey Patel in a formal suit, designer and developer of the GeneCRM site.",
      eyebrow: "Design & full-stack",
      title: "One system, one author.",
      body: "The public GeneCRM site was designed and built end to end — eight industry presets, GENE copilot surfaces, security, developer docs and the product film — from a single design system.",
      caption: "Portrait — GeneCRM build, 2026.",
      position: "50% 50%",
      fit: "cover",
    },
  },
  {
    id: "dubai-confidential",
    slug: "dubai-confidential",
    index: "09",
    name: "Dubai Property Client — Confidential",
    tagline: "A private real-estate agency website, documented without exposing the client.",
    category: "Real estate · Website design & build",
    year: "2026",
    role: "Design & front-end development",
    context: "Dubai, UAE · Real-estate agency · Client withheld",
    featured: false,
    size: "standard",
    summary:
      "A privately commissioned website for a Dubai-based real-estate agency. The agency's name, listings, screenshots and source are withheld at the client's request; this page records the engagement and the work that can be discussed without exposing identifiable material.",
    overview:
      "Not every project can become a public case study. This was a private real-estate agency website for a Dubai-based client, delivered under a confidentiality-first arrangement: no public URL, no client name, no listings, no screenshots and no code in the portfolio. What can be documented is the shape of the work — property presentation, agent credibility, a clear viewing-enquiry path, a responsive structure and a careful handover — without turning someone else's business into portfolio content they did not agree to publish.",
    problem:
      "Property buyers shortlist on presentation and trust before they ever call. The agency needed a site that made its listings legible, gave individual agents credibility, and made it easy to request a viewing or a valuation from a phone — while keeping the engagement private. That creates a second design problem for the portfolio: how do you show the work without the artefacts that normally prove it? The answer here is to be explicit about the boundary rather than fabricate a screenshot or a client logo.",
    contribution: [
      "Worked directly with the client from brief, content structure and property-listing hierarchy through design direction and the responsive front-end build.",
      "Structured the site around the buyer's path: understand the agency, browse property types and locations, read the local market, then request a viewing or valuation.",
      "Built reusable listing, agent and enquiry patterns so new properties and team details could be added without redesigning pages.",
      "Built and tested the responsive experience, then handed the work over privately with no public deployment or source included here.",
      "Kept the engagement confidential: the client's identity, listings, copy, imagery and code are intentionally absent from this portfolio.",
    ],
    features: [
      {
        title: "Property-first presentation",
        body: "Listings organised around location, property type and buyer intent, with the details a buyer needs before requesting a viewing.",
      },
      {
        title: "Agent credibility",
        body: "A clear agency and agent presence — local knowledge, specialisms and contact routes — so the first conversation starts with trust.",
      },
      {
        title: "Viewing & enquiry path",
        body: "Call, WhatsApp, enquiry and viewing-request actions placed at the points where a buyer is ready to act.",
      },
      {
        title: "Responsive browsing",
        body: "Property cards and detail pages designed to stay readable and easy to act on from a phone, where most property searches begin.",
      },
      {
        title: "Private handover",
        body: "Delivery, documentation and source handled privately at the client's request; no public URL or capture is published.",
      },
    ],
    challenges: [
      {
        title: "Privacy by default",
        body: "The engagement cannot be used as public proof. The portfolio has to represent it honestly without exposing the client's identity, listings or work.",
      },
      {
        title: "Trust at first glance",
        body: "Property is a high-consideration purchase. The site had to signal local credibility and make the next step obvious without becoming a hard-sell page.",
      },
      {
        title: "A different kind of proof",
        body: "For private work, the proof is the discipline of the process and the willingness to say what cannot be shown — not a manufactured browser frame.",
      },
    ],
    outcomes: [
      "Private real-estate agency website delivered to a Dubai-based client.",
      "Reusable property, agent and viewing-enquiry patterns built for future listings.",
      "Client identity, listings, screenshots and source withheld by request.",
      "Engagement documented without fabricated metrics or public artefacts.",
    ],
    stack: ["Web design", "Responsive front end", "Content structure", "Real-estate UX"],
    visual: {
      hasScreenshot: false,
      accent: "#b98b5e",
      pattern: "stack",
      caption: "Private real-estate client — details withheld",
    },
    portrait: {
      src: "/portraits/shrey-suit-formal.webp",
      alt: "Shrey Patel in a formal suit, photographed for the private Dubai engagement.",
      eyebrow: "Private real-estate engagement",
      title: "A property site built around the viewing, not the brochure.",
      body: "The agency name, listings, screenshots and source stay out of this portfolio at the client's request. What remains is the discipline: property hierarchy, agent credibility, a viewing-enquiry path, responsive build and a private handover — documented without turning someone else's business into portfolio content.",
      caption: "Dubai, UAE — 2026.",
      position: "50% 5%",
      fit: "cover",
    },
  },
  {
    id: "chatsup",
    slug: "chatsup",
    index: "10",
    name: "ChatsUp",
    tagline: "Marketing site plus real payment rails.",
    category: "Marketing site · Payments",
    year: "2025",
    role: "Full Stack Developer",
    context: "Sprouto InfoSolution",
    featured: false,
    size: "standard",
    summary:
      "Developed the ChatsUp marketing website and integrated Stripe, Razorpay and PayU so the product could actually take money.",
    overview:
      "ChatsUp's marketing website had to do the standard job — explain the product and convert — with one difference: it also had to take payments through three different gateways serving different regions.",
    problem:
      "A marketing site that cannot complete a transaction is a brochure. The site needed a conversion path that ended in a real payment, through multiple providers, without a fragile hand-rolled flow.",
    contribution: [
      "Developed the ChatsUp marketing website.",
      "Integrated payment gateways including Stripe, Razorpay and PayU.",
    ],
    features: [
      {
        title: "Multi-gateway payments",
        body: "Stripe, Razorpay and PayU integrated so customers can pay through the provider that fits their region.",
      },
      {
        title: "Conversion-focused pages",
        body: "Marketing structure built around the path to checkout rather than around sections.",
      },
    ],
    challenges: [
      {
        title: "Three gateways, one experience",
        body: "Each provider has different flows, callbacks and failure modes. The user should never be able to tell which one they hit.",
      },
      {
        title: "Payment failure is a design problem",
        body: "Failed and abandoned payments needed honest, recoverable states rather than a dead end.",
      },
    ],
    outcomes: ["Marketing site shipped with working payment integrations across three providers."],
    stack: ["React.js", "Stripe", "Razorpay", "PayU", "REST APIs"],
    visual: {
      hasScreenshot: false,
      accent: "#f4551d",
      pattern: "wave",
      caption: "Product work — screenshots available on request",
    },
  },
  {
    id: "chatbot-flow",
    slug: "chatbot-flow-builder",
    index: "11",
    name: "Chatbot Flow Builder",
    tagline: "A visual builder where non-technical users compose AI flows.",
    category: "AI tooling · Front-end",
    year: "2025",
    role: "Front-end Developer",
    context: "Sprouto InfoSolution",
    featured: false,
    size: "standard",
    summary:
      "Built the front end for an AI-driven chatbot flow builder — associated with a 12% increase in weekly active users.",
    overview:
      "The chatbot flow builder lets users assemble conversational AI flows visually. The interface is the product: if composing a flow is not obvious, nothing else matters.",
    problem:
      "Building conversational flows requires holding branching logic, states and outcomes in your head. The interface had to externalise that structure so a non-engineer could build something that actually works.",
    contribution: [
      "Built the front-end for an AI-driven chatbot flow builder, creating a dynamic interface associated with a 12% increase in weekly active users.",
      "Focused on making flow composition legible for users without an engineering background.",
    ],
    features: [
      {
        title: "Visual flow composition",
        body: "A dynamic builder interface where flows are assembled and edited rather than scripted.",
      },
      {
        title: "Legible branching",
        body: "Branches, states and outcomes presented so the shape of a conversation is visible at a glance.",
      },
    ],
    challenges: [
      {
        title: "State you can see",
        body: "Canvas-style interfaces fail when users lose track of where they are. Structure and focus states carried that weight.",
      },
      {
        title: "Measured adoption",
        body: "The work was tied to a 12% increase in weekly active users — usability was the metric, not visual novelty.",
      },
    ],
    outcomes: [
      "Front-end shipped for the AI chatbot flow builder.",
      "Associated with a 12% increase in weekly active users.",
    ],
    stack: ["React.js", "Next.js", "JavaScript", "REST APIs"],
    visual: {
      hasScreenshot: false,
      accent: "#bf421b",
      pattern: "prism",
      caption: "Product work — screenshots available on request",
    },
  },
  {
    id: "incredible-men",
    slug: "incredible-men",
    index: "12",
    name: "Incredible Men",
    tagline: "An ecommerce app published to the Play Store — and a live web storefront.",
    category: "Ecommerce · Mobile & web",
    year: "2024",
    role: "Mobile Application Developer",
    context: "Ecare Infoway LLP",
    liveUrl: "https://shreypatel-07.github.io/Incredible_Man/",
    featured: false,
    size: "standard",
    summary:
      "Delivered three production-ready Flutter screens and shipped the UI for the Incredible Men e-commerce app to the Google Play Store — with a web storefront build deployed live.",
    overview:
      "A production Flutter build: three screens taken from design to store, with state management handled properly rather than patched around. The brand's storefront also exists as a live web build — category navigation, product shelves, concern-based shopping and editorial content.",
    problem:
      "Mobile UI has nowhere to hide — frame drops, inconsistent spacing and unclear state are visible in the hand. The screens needed to be production-ready, not demo-ready, and the storefront had to carry the same brand weight on the web.",
    contribution: [
      "Delivered three production-ready mobile screens using Flutter, focused on polished UI and state management with Provider and GetX.",
      "Developed and published the UI for the Incredible Men e-commerce app on the Google Play Store.",
      "Built and deployed the responsive web storefront — category navigation, featured products, concern-based shopping and editorial sections.",
    ],
    features: [
      {
        title: "Production Flutter screens",
        body: "Polished, responsive mobile UI built with Flutter and Dart.",
      },
      {
        title: "Managed state",
        body: "Provider and GetX used to keep state predictable across screens.",
      },
      {
        title: "Live storefront",
        body: "A responsive web build with category routing, featured products and a concern-based shopping entry point.",
      },
    ],
    challenges: [
      {
        title: "Shipping to a store",
        body: "Publishing adds constraints — assets, sizing, edge devices — that a local build never surfaces.",
      },
      {
        title: "Ecommerce detail",
        body: "Product presentation and cart interactions had to feel native, not web-ported.",
      },
    ],
    outcomes: [
      "Three production-ready screens delivered.",
      "UI published on the Google Play Store as Incredible Men.",
      "Responsive web storefront live and inspectable.",
    ],
    stack: ["Flutter", "Dart", "Provider", "GetX", "HTML / CSS"],
    portrait: {
      src: "/portraits/shrey-closeup.webp",
      alt: "Close portrait of Shrey Patel, mobile and web developer for Incredible Men.",
      eyebrow: "Ecommerce, mobile & web",
      title: "Ship it like it is going into someone's hand.",
      body: "A storefront is judged on the phone, at speed, with a thumb. The Flutter screens had to survive real devices and store review, and the web build had to keep the same product hierarchy without feeling like a port. That is the standard I bring to ecommerce work: make the next tap obvious and the brand feel present.",
      caption: "Portrait — Incredible Men build, 2024.",
      position: "50% 28%",
      fit: "cover",
    },
    visual: {
      hasScreenshot: true,
      src: "/work/incredible-men.png",
      alt: "Incredible Men storefront home page — men's face wash hero and category navigation.",
      video: "/work/video/incredible-men.mp4",
      accent: "#d8cbb6",
      pattern: "stack",
      caption: "Live capture — GitHub Pages",
    },
  },
  {
    id: "media-dashboard",
    slug: "personalised-media-dashboard",
    index: "13",
    name: "Personalised Media Dashboard",
    tagline: "A MERN capstone: auth, third-party APIs, persistence.",
    category: "Full stack · MERN",
    year: "2023",
    role: "Full Stack Developer Intern",
    context: "Cuvette",
    featured: false,
    size: "standard",
    summary:
      "A MERN application with real authentication, a personalised dashboard pulling movie, news and weather data, and client-side note persistence.",
    overview:
      "The capstone that covered the whole MERN loop: secure authentication, a personalised dashboard, third-party API integration and persistence — built end to end rather than assembled from tutorials.",
    problem:
      "Integrating three unrelated third-party APIs behind one personalised view means handling three shapes of data, three failure modes and one coherent interface.",
    contribution: [
      "Built a personalised movie discovery platform as a MERN-stack capstone project.",
      "Implemented secure authentication with Node.js and Express.js and user data storage with MongoDB.",
      "Developed a React.js dashboard integrating third-party APIs for movie recommendations, news and local weather, plus browser Local Storage for note persistence.",
    ],
    features: [
      {
        title: "Secure authentication",
        body: "Node.js and Express.js auth with user records stored in MongoDB.",
      },
      {
        title: "Multi-source dashboard",
        body: "Movie recommendations, news and local weather unified in one personalised view.",
      },
      {
        title: "Client-side persistence",
        body: "Notes persisted in browser Local Storage so they survive a session.",
      },
    ],
    challenges: [
      {
        title: "Three APIs, one interface",
        body: "Normalising unrelated payloads into a single readable dashboard.",
      },
      {
        title: "Personalisation without a backend rewrite",
        body: "Delivering a personalised experience while keeping the API layer simple.",
      },
    ],
    outcomes: ["Full MERN application delivered end to end, from authentication to dashboard."],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    visual: {
      hasScreenshot: false,
      accent: "#bf421b",
      pattern: "grid",
      caption: "Capstone project — screenshots available on request",
    },
  },
  {
    id: "amazon-clone",
    slug: "amazon-clone",
    index: "14",
    name: "Amazon Clone",
    tagline: "An ecommerce interface rebuilt from the original's own logic.",
    category: "Ecommerce · Front-end build",
    year: "2024",
    role: "Front-end Developer",
    context: "Personal build · Live on GitHub Pages",
    liveUrl: "https://shreypatel-07.github.io/Amazon_Clone/",
    featured: false,
    size: "standard",
    summary:
      "An independent rebuild of Amazon's browsing experience — the deliver-to bar, category rail, deal shelves and product carousels — built from scratch to understand how an ecommerce interface holds together at scale.",
    overview:
      "A front-end study rather than a product: the brief was to reproduce the density of a marketplace homepage without copying its source. Amazon's interface is a masterclass in commercial hierarchy — navigation, delivery context, category routing and promotional shelves all competing for one screen — and rebuilding it is the fastest way to learn how each layer earns its space.",
    problem:
      "Marketplace home pages carry more competing priorities than almost any other interface: a location-aware delivery promise, a dozen category entries, deals, and product shelves that must read at a glance. Rebuilt carelessly it becomes noise; the exercise was to preserve the hierarchy while writing every line myself.",
    contribution: [
      "Built the page structure from scratch: deliver-to bar, search region, account and cart affordances, category navigation and the secondary deals row.",
      "Rebuilt the promotional shelf pattern — oversized category cards with a see-more affordance — and repeated it across seven departments without the layout drifting.",
      "Implemented responsive behaviour so the shelves reflow from a desktop grid to a single column on phones.",
      "Deployed the build to GitHub Pages so the result is inspectable in a browser, not just described.",
    ],
    features: [
      {
        title: "Marketplace chrome",
        body: "The unglamorous parts that make a store feel real: delivery context, account menu, returns, cart and the department rail.",
      },
      {
        title: "Shelf system",
        body: "One reusable promotional shelf — heading, see-more link, image-led card grid — repeated across departments.",
      },
      {
        title: "Responsive shelves",
        body: "Product rows and department grids that stay legible from desktop down to phone width.",
      },
    ],
    challenges: [
      {
        title: "Density without chaos",
        body: "Every element on a marketplace page is competing for attention. The work was keeping the hierarchy intact while adding nothing decorative.",
      },
      {
        title: "Honest scope",
        body: "It is a front-end reconstruction for practice, not a store — no checkout, no accounts, and no claim to be affiliated with Amazon.",
      },
    ],
    outcomes: [
      "A complete marketplace-style homepage built from scratch.",
      "Live and inspectable on GitHub Pages.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    visual: {
      hasScreenshot: true,
      src: "/work/amazon-clone-live.png",
      alt: "Marketplace-style homepage reconstruction — hero banner, search bar and category grid.",
      video: "/work/video/amazon-clone.mp4",
      accent: "#f4551d",
      pattern: "grid",
      caption: "Live demo — GitHub Pages",
    },
  },
  {
    id: "chip-website",
    slug: "chip-website",
    index: "15",
    name: "Chip — Snack Brand Site",
    tagline: "A snack brand that has to look edible on a phone.",
    category: "Responsive web · Brand landing",
    year: "2024",
    role: "Design & front-end",
    context: "Personal build · Live on GitHub Pages",
    liveUrl: "https://shreypatel-07.github.io/Chip-Website/",
    featured: false,
    size: "standard",
    summary:
      "A responsive brand landing page for a chip company: an oversized hero, a flavour wall, an ingredient-and-health story and a contact block — designed to hold together from desktop to phone.",
    overview:
      "A food brand page is judged in the first screen: does it look appetising, and does it look like a brand rather than a template? This build leans on scale and crop — a hero headline that fills the viewport, a flavour grid with room to breathe, and product cards that lead with price.",
    problem:
      "Snack brands sell appetite. A small, cautious layout reads as a generic template and kills the impulse the product depends on, while a wall of large imagery can fall apart on a phone or cost seconds of load time. The page had to stay bold without becoming heavy.",
    contribution: [
      "Designed and built the landing page end to end: hero, flavour discovery wall, ingredient story, best-selling product row and contact block.",
      "Worked the type scale so the hero headline stays a hero at both desktop and phone widths.",
      "Built the flavour grid to reflow cleanly rather than overflow, and gave the product cards a consistent price-led card.",
      "Published the build to GitHub Pages.",
    ],
    features: [
      {
        title: "Full-bleed hero",
        body: "A headline set at poster scale with the primary action above the fold — the brand's whole argument in one screen.",
      },
      {
        title: "Flavour wall",
        body: "A dense but calm grid of flavour artwork that keeps a rhythm instead of collapsing into a gallery.",
      },
      {
        title: "Product cards",
        body: "Best-sellers presented as price-first cards, so the row can be scanned rather than read.",
      },
    ],
    challenges: [
      {
        title: "Bold type, small screens",
        body: "Poster-scale headlines either wrap badly or shrink into nothing. The scale had to be worked per breakpoint, not once.",
      },
      {
        title: "Appetite over decoration",
        body: "Imagery earns its place here; ornament does not. Everything else stayed quiet so the product leads.",
      },
    ],
    outcomes: [
      "A complete, responsive brand landing page.",
      "Live and inspectable on GitHub Pages.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    visual: {
      hasScreenshot: true,
      src: "/work/chip-website.png",
      alt: "Chip snack brand landing page — green hero with a crisp packet and poster-scale type.",
      video: "/work/video/chip-website.mp4",
      accent: "#d8cbb6",
      pattern: "wave",
      caption: "Live demo — GitHub Pages",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const archiveProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
