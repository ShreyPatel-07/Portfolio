/**
 * Generates public/Shrey-Patel-Resume.pdf from the same facts as the site.
 *
 * Run: npm run resume
 * Re-run after editing résumé content. The PDF is a build artifact committed to
 * /public so the download link always works without a server.
 */
import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";

const OUT = "public/Shrey-Patel-Resume.pdf";
const INK = "#14110f";
const MUTED = "#6d6357";
const ACCENT = "#bf421b";
const RULE = "#d8cbb6";

const M = 48;
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 44, bottom: 46, left: M, right: M },
  info: {
    Title: "Shrey Patel — Full Stack Developer (Front-End Focus)",
    Author: "Shrey Patel",
    Subject: "Résumé",
    Keywords: "React, Next.js, TypeScript, Full Stack Developer",
  },
});
mkdirSync("public", { recursive: true });
doc.pipe(createWriteStream(OUT));

const W = doc.page.width - M * 2;

const rule = (gap = 10, color = RULE) => {
  doc.moveDown(gap / 14);
  doc
    .strokeColor(color)
    .lineWidth(0.7)
    .moveTo(M, doc.y)
    .lineTo(M + W, doc.y)
    .stroke();
  doc.moveDown(gap / 14);
};

const section = (title) => {
  doc.moveDown(0.9);
  doc.font("Helvetica-Bold").fontSize(7.6).fillColor(ACCENT).text(title.toUpperCase(), {
    characterSpacing: 1.6,
  });
  rule(6);
  doc.moveDown(0.15);
};

const bullets = (items, options = {}) => {
  doc.font("Helvetica").fontSize(8.9).fillColor(INK).list(items, {
    bulletRadius: 1.3,
    textIndent: 11,
    bulletIndent: 1,
    lineGap: 2.2,
    paragraphGap: 1.4,
    ...options,
  });
};

const roleRow = (company, role, period, note) => {
  const startY = doc.y;
  doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(company, { width: W * 0.66 });
  doc
    .font("Helvetica")
    .fontSize(8.6)
    .fillColor(MUTED)
    .text(period, M, startY, { width: W, align: "right" });
  const lineY = startY + 13;
  doc
    .font("Helvetica-Oblique")
    .fontSize(9)
    .fillColor(ACCENT)
    .text(`${role}${note ? ` · ${note}` : ""}`, { width: W });
  void lineY;
  doc.moveDown(0.28);
};

/* ----------------------------------------------------------------- header */
doc
  .font("Helvetica-Bold")
  .fontSize(25)
  .fillColor(INK)
  .text("Shrey Patel", { characterSpacing: -0.6 });
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor(ACCENT)
  .text("Full Stack Developer · Front-End Focus", { characterSpacing: 0.4 });
doc
  .font("Helvetica")
  .fontSize(8.4)
  .fillColor(MUTED)
  .text(
    "+91 93288 78554  ·  shreypatel2468642@gmail.com  ·  linkedin.com/in/shrey-patel-887b2b22a  ·  github.com/ShreyPatel-07"
  );

/* ---------------------------------------------------------------- profile */
section("Professional summary");
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(INK)
  .text(
    "Front-end-focused Full Stack Developer with 3+ years of experience building, modernizing and supporting web and SaaS applications. Strong in React.js, Next.js, JavaScript, TypeScript, responsive UI engineering, dashboards, interactive data visualizations and API integration, with additional experience across the MERN stack and .NET MVC. Experienced in product redesigns, bug resolution, authentication flows, reporting, reusable design systems, and user-focused documentation and walkthrough videos.",
    { lineGap: 2.4, align: "justify" }
  );

/* ----------------------------------------------------------------- skills */
section("Technical skills");
const skills = [
  ["Front-end", "HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js, Next.js, Redux, Tailwind CSS, Bootstrap, Chart.js, ASPX, CSHTML"],
  ["Back-end & data", "Node.js, Express.js, .NET MVC, REST APIs, SQL, MongoDB, Java, Python, C++, AWS"],
  ["Product engineering", "Code architecture, reusable design systems, component-driven development, state management, responsive design, UI/UX redesign, dashboards, data visualization, form validation, sorting & filtering, OAuth/2FA, AI-agent workflows, reporting, payment gateway integration"],
  ["Tools & platforms", "Git, GitHub, CI/CD, Figma, Vercel, Stripe, Razorpay, PayU"],
  ["Mobile", "Flutter, Dart"],
];
skills.forEach(([label, value]) => {
  doc.font("Helvetica-Bold").fontSize(8.6).fillColor(INK).text(`${label}: `, { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(value, { lineGap: 2 });
  doc.moveDown(0.25);
});

/* ------------------------------------------------------------- experience */
section("Experience");

roleRow("Genellipse Inc.", "Full Stack Developer", "Feb 2026 — Sep 2026", "Canada-based, remote");
bullets([
  "Stabilized and improved RetirewiseAI, investigating and resolving 250+ bugs across login, form validation, authentication, OAuth, 2FA setup, responsive layouts and core platform interactions.",
  "Led a broad restructuring and redesign of RetirewiseAI; built advisor and individual dashboards, interactive Chart.js visualizations, UI animations, sorting/filtering and retirement-planning reports.",
  "Contributed to user-facing workflows for Cortex AI, an AI-agent platform, helping users configure agents and understand their outputs.",
  "Designed and implemented a reusable, modular design system for GeneSecure's compliance-training experience.",
  "Redesigned AegiesNow, a financial management platform covering insurance, actuarial and reinsurance workflows.",
  "Created ~3-minute module walkthrough videos, AI-assisted product overviews and release activity logs.",
  "Redesigned the Genellipse corporate website with a consistent visual system and responsive layouts.",
]);

roleRow("Sprouto InfoSolution Pvt. Ltd.", "Full Stack Developer", "Jul 2024 — Dec 2025");
bullets([
  "Contributed to Growby, a large-scale SaaS platform, across .NET, ASPX/CSHTML, JavaScript, React.js, Next.js and SQL.",
  "Executed a UI migration for Growby product verticals to ASPX/CSHTML, improving Lighthouse performance from 68 to 92 and reducing bounce rate by 11%.",
  "Improved the Contact Management module — reworked front-end components, integrated backend APIs and resolved 150+ bugs.",
  "Owned end-to-end front-end development for SendZen, a developer-focused WhatsApp marketing platform, in Next.js.",
  "Developed the ChatsUp marketing website and integrated Stripe, Razorpay and PayU.",
  "Built the front-end for an AI-driven chatbot flow builder, associated with a 12% increase in weekly active users.",
]);

roleRow("Ecare Infoway LLP", "Mobile Application Developer", "Jan 2024 — May 2024");
bullets([
  "Delivered three production-ready Flutter screens with polished UI and state management using Provider and GetX.",
  "Developed and published the UI for the Incredible Men e-commerce app on the Google Play Store.",
]);

roleRow("Cuvette", "Full Stack Developer Intern", "Jul 2023 — Dec 2023");
bullets([
  "Built a personalized movie discovery platform as a MERN-stack capstone project, with secure authentication (Node.js, Express.js) and MongoDB storage.",
  "Developed a React.js dashboard integrating movie, news and weather APIs, plus Local Storage note persistence.",
]);

roleRow("Spark to Ideas", "Software Developer Intern", "Jan 2023 — Jun 2023");
bullets([
  "Developed responsive React.js interfaces using Redux and React Hooks; fixed defects to improve usability and page performance.",
  "Participated in code reviews and provided feedback to improve code quality and maintainability.",
]);

/* ---------------------------------------------------------------- projects */
section("Selected projects");

doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text("Mechengers — mechengers.com", { continued: true });
doc.font("Helvetica-Oblique").fontSize(8.6).fillColor(ACCENT).text("   Astro, TypeScript, Tailwind CSS");
doc
  .font("Helvetica")
  .fontSize(8.7)
  .fillColor(MUTED)
  .text(
    "Designed and developed the full product site for a precision CNC turning manufacturer: a twelve-part catalogue across three product families, an eight-stage manufacturing process narrative, verifiable CIPET/MSME/GST credentials and a quote request path built for mobile.",
    { lineGap: 2 }
  );

doc.moveDown(0.5);
doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text("SendZen — marketing website & user panel", { continued: true });
doc.font("Helvetica-Oblique").fontSize(8.6).fillColor(ACCENT).text("   Next.js, React.js");
doc
  .font("Helvetica")
  .fontSize(8.7)
  .fillColor(MUTED)
  .text(
    "Owned end-to-end front-end development for a developer-focused WhatsApp marketing platform, including responsive marketing pages, the user panel, and a reusable component-driven structure.",
    { lineGap: 2 }
  );

doc.moveDown(0.5);
doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text("Growby & ChatsUp — SaaS platforms", { continued: true });
doc.font("Helvetica-Oblique").fontSize(8.6).fillColor(ACCENT).text("   .NET, ASPX/CSHTML, SQL, Payment APIs");
doc
  .font("Helvetica")
  .fontSize(8.7)
  .fillColor(MUTED)
  .text(
    "Contributed platform UI and backend integrations, migrated key interfaces (Lighthouse 68 → 92, bounce rate −11%), improved stability through extensive bug fixing, and integrated Stripe, Razorpay and PayU.",
    { lineGap: 2 }
  );

/* --------------------------------------------------------------- education */
section("Education");
doc.font("Helvetica-Bold").fontSize(9.4).fillColor(INK).text("B.Tech. in Information and Communication Technology", {
  continued: true,
});
doc.font("Helvetica").fontSize(8.6).fillColor(MUTED).text("   2019 — 2023");
doc
  .font("Helvetica")
  .fontSize(8.7)
  .fillColor(MUTED)
  .text("Dhirubhai Ambani Institute of Information and Communication Technology (DAIICT), Gandhinagar · CGPA 7.0/10");

/* ---------------------------------------------------------- certifications */
section("Certifications");
doc
  .font("Helvetica")
  .fontSize(8.7)
  .fillColor(INK)
  .list(
    [
      "Full Stack Developer Program — Kodnest (Oct 2025 — Present)",
      "Microsoft ASP.NET MVC Core — Microsoft Certified (Nov 2025)",
      "Front-End Development (MERN Stack) — Cuvette (Dec 2023)",
      "Mobile App Development (Dart and Flutter) — Ecare Infoway (Apr 2024)",
    ],
    { bulletRadius: 1.3, textIndent: 11, lineGap: 2.2 }
  );

/* ------------------------------------------------------------ achievements */
section("Achievements & leadership");
bullets([
  "Commended as Best Frontend Developer for delivering a project ahead of schedule and exceeding client expectations.",
  "Guided project teams toward delivery goals with a focus on quality and efficiency.",
  "Participant, Code-Mutants Hackathon, DAIICT (2022).",
]);

/* ------------------------------------------------------------------- close */
doc.end();
console.log(`Résumé written to ${OUT}`);
