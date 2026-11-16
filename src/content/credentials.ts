/**
 * CREDIBILITY — only verifiable items from the résumé are rendered.
 */

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  /** Public certificate file, where one was supplied. */
  url?: string;
  /** Rendered first page of the certificate, used by the archive cards. */
  image: string;
  /** Short discipline label shown on the archive card. */
  focus: string;
  featured?: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  detail: string;
};

export const certifications: Certification[] = [
  {
    id: "mcts-dotnet",
    title: "Microsoft Certified Technology Specialist — .NET Framework 3.5, ASP.NET Applications",
    issuer: "Microsoft",
    date: "Nov 2025",
    url: "https://drive.google.com/file/d/1_n6xdEPD85tOWuq6mFQECnE-uNOYRu7e/view?usp=sharing",
    image: "/certificates/microsoft-mcts.webp",
    focus: "Platform · .NET",
    featured: true,
  },
  {
    id: "ecare-flutter",
    title: "Certificate of Training — Dart & Flutter Development",
    issuer: "eCare Upskill",
    date: "Apr 2024",
    url: "https://drive.google.com/file/d/1_0zOv1tpbL9No6Vf-AxR5-bsC7opQi6O/view?usp=sharing",
    image: "/certificates/ecare-flutter.webp",
    focus: "Mobile · Flutter",
  },
  {
    id: "be10x-ai-tools",
    title: "Certificate of Completion — AI Tools Workshop",
    issuer: "be10x",
    date: "Jan 2024",
    url: "https://drive.google.com/file/d/1Ps-TjIBtF2lL8TfcThSd8ziXytJk9Vwi/view?usp=sharing",
    image: "/certificates/be10x-ai-tools.webp",
    focus: "AI · Workshop",
  },
  {
    id: "cuvette-frontend",
    title: "Certificate of Frontend Development",
    issuer: "Cuvette Tech",
    date: "Dec 2023",
    url: "https://drive.google.com/file/d/1kGrSSpkJCLKt2Wou6FF6TlIyLfSrY8My/view?usp=sharing",
    image: "/certificates/cuvette-frontend.webp",
    focus: "Frontend · Training",
  },
  {
    id: "spark-internship",
    title: "Internship Completion Certificate — Software Development",
    issuer: "Sparks To Ideas",
    date: "Jun 2023",
    url: "https://drive.google.com/file/d/1jsQTxd0IYCk0ZB9oLD9qTES__RSIl8aJ/view?usp=sharing",
    image: "/certificates/spark-internship.webp",
    focus: "Industry · Internship",
  },
  {
    id: "codewithrandom-react",
    title: "Master HTML to React.js in 45 Days",
    issuer: "Codewithrandom",
    date: "No date shown",
    url: "https://drive.google.com/file/d/11Kgp9GAVchgh9O3cp0tEqr41usm80j62/view?usp=sharing",
    image: "/certificates/codewithrandom-react.webp",
    focus: "Frontend · Program",
  },
  {
    id: "bit-c-cpp",
    title: "Certification in Programming in C & C++ — Grade A",
    issuer: "BIT Online Learn",
    date: "Oct 2021",
    url: "https://drive.google.com/file/d/1jgtYP2D7B6l08lblCx4LeuVUtG7nHehp/view?usp=sharing",
    image: "/certificates/bit-c-cpp.webp",
    focus: "Foundations · C/C++",
  },
];

export const achievements: Achievement[] = [
  {
    id: "best-frontend",
    title: "Commended as Best Frontend Developer",
    detail: "For delivering a project ahead of schedule and exceeding client expectations.",
  },
  {
    id: "leadership",
    title: "Guided project teams toward delivery goals",
    detail: "With a consistent focus on quality and efficiency across releases.",
  },
  {
    id: "hackathon",
    title: "Participant — Code-Mutants Hackathon",
    detail: "DAIICT, 2022.",
  },
];

