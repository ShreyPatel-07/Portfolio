/**
 * The sectors the portfolio can serve — grounded in the public case studies and
 * the adjacent work those builds translate into. No client names or outcomes
 * are claimed where they cannot be shown.
 */
export type Industry = {
  name: string;
  body: string;
};

export const industries: Industry[] = [
  {
    name: "E-commerce & Shopify",
    body: "Storefronts, product catalogues and the small interactions that decide whether someone checks out.",
  },
  {
    name: "Real estate",
    body: "Property presentation, agent credibility and a viewing-enquiry path that works on a phone.",
  },
  {
    name: "Healthcare",
    body: "Clear service pages, practitioner profiles, appointment paths and content people can trust.",
  },
  {
    name: "SaaS & AI products",
    body: "Product sites, dashboards, onboarding and documentation that make a complex product legible.",
  },
  {
    name: "Fintech & insurance",
    body: "Data-heavy interfaces and decision flows where clarity, validation and confidence matter.",
  },
  {
    name: "Manufacturing & industrial",
    body: "Catalogue sites, technical specifications and quote paths built for buyers who compare details.",
  },
  {
    name: "Hospitality & local business",
    body: "Restaurants, studios, hotels and service businesses that need a credible presence and a direct enquiry.",
  },
  {
    name: "Education & professional services",
    body: "Course, programme and service sites that explain the offer and make the next step straightforward.",
  },
];

/** The repeatable deliverables that sit underneath the sector-specific work. */
export const deliverables = [
  {
    index: "01",
    title: "Marketing websites",
    body: "Positioning, content structure, art direction and a responsive build — the public face of the business.",
  },
  {
    index: "02",
    title: "Ecommerce & conversion",
    body: "Storefronts, product pages, checkout-adjacent flows and enquiry paths that turn interest into an action.",
  },
  {
    index: "03",
    title: "Product interfaces",
    body: "Dashboards, onboarding, authentication and data views built as reusable systems, not one-off screens.",
  },
  {
    index: "04",
    title: "Redesign & rescue",
    body: "Performance, accessibility, responsive repair and motion direction for a site that works but does not feel right.",
  },
];
