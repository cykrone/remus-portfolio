/* ------------------------------------------------------------------ *
 *  Single source of truth for site copy.
 *  Edit here to update the site — sections read from these objects.
 * ------------------------------------------------------------------ */

export const profile = {
  name: "Remus Chan",
  firstName: "Remus",
  role: "Technical Consultant",
  company: "Workato",
  location: "Singapore",
  email: "remusckh@gmail.com",
  linkedin: "https://www.linkedin.com/in/remuschan/",
  tagline:
    "I build the integrations and automation that keep enterprise systems in sync, plus the agentic workflows that increasingly sit on top of them.",
  available: true,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "Enterprise Automation",
  "iPaaS",
  "API Integration",
  "Agentic Workflows",
  "Workato",
  "MCP",
  "Data Orchestration",
];

export const about = {
  intro:
    "I help companies get their systems talking to each other, then automate the busywork in between.",
  paragraphs: [
    "At Workato, I work with companies to design and ship the integrations their operations actually run on. That ranges from master-data governance to the agentic, AI-driven workflows a lot of teams are sorting out right now. The best version of this work is invisible. Things just sync, and nobody has to think about it.",
    "Before iPaaS I worked across software, UX, and consulting, and that background still shows up in how I build. I care as much about whether someone can actually use an automation as whether it runs. I studied at Singapore Management University and graduated Magna Cum Laude.",
    "When I'm not building recipes, I'm usually demoing what's next. Right now that means MCP and agentic orchestration, which is easily the part of the job I'm most excited about.",
  ],
  facts: [
    { label: "Based in", value: "Singapore" },
    { label: "Focus", value: "iPaaS · Automation · Agentic AI" },
    { label: "Education", value: "SMU, Magna Cum Laude" },
    { label: "Recognition", value: "NA Commercial Top Performer" },
  ],
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  current?: boolean;
};

export const experiences: Experience[] = [
  {
    org: "Workato",
    role: "Technical Consultant",
    period: "Present",
    location: "Singapore",
    current: true,
    summary:
      "I handle enterprise integration and automation for North American commercial accounts. Lately the work has shifted toward the agentic and MCP-powered layer sitting on top.",
    highlights: [
      "Named NA Commercial Top Performer for delivery and customer impact.",
      "Built out the Enterprise Data Hub (EDH) accelerator for Gonzaga University and connected it to Workflow Apps, which gave their team a cleaner way to manage master data.",
      "Ran MCP and agentic-workflow demos for accounts like Gonzaga, Dutchie, and Cohesity, pitched to both technical and business audiences.",
      "Closed 34+ technical assistance requests in a year: connector debugging, recipe reviews, and task optimization.",
      "Earned AHQ and MCP certifications, then put them to work on Onboarding 2.0 and SOW projects for accounts like Agiloft, GeoTab, McKenney's, and Komodo Health.",
      "Ran an internal Workato IDE masterclass for 100+ people at WOW 2025, and represented Workato at the Agentic booth as a World of Workato ambassador.",
      "Mentored new consultants through their technical ramp-up and recipe reviews.",
    ],
  },
  {
    org: "Singapore Management University",
    role: "B.Sc., Magna Cum Laude",
    period: "Graduated",
    location: "Singapore",
    summary:
      "Studied information systems with a mix of software engineering, UX, and business. It's the foundation I still lean on.",
    highlights: [
      "Graduated Magna Cum Laude with a focus on technology and information systems.",
      "Got hands-on early with full-stack development, UX, and analytics.",
    ],
  },
  // To add prior roles, copy an entry above and fill it in.
];

export type Project = {
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  outcome: { metric: string; label: string };
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Enterprise Data Hub",
    client: "Gonzaga University",
    category: "Master Data Governance",
    year: "2025",
    summary:
      "Set up Workato's EDH accelerator and connected it to Workflow Apps, so Gonzaga had one governed source of truth instead of records scattered across systems. I worked with Workato's product team along the way to sharpen the underlying patterns.",
    outcome: { metric: "1", label: "governed source of truth" },
    tags: ["EDH Accelerator", "Workflow Apps", "Data Stewardship"],
  },
  {
    title: "Hypercare & Stabilization",
    client: "BlackLine",
    category: "Post-Implementation",
    year: "2025",
    summary:
      "Ran hypercare for a live integration setup, triaging and fixing the high-impact issues so the handoff from delivery to business-as-usual actually held. The renewal was at risk going in. It stayed.",
    outcome: { metric: "$73K", label: "ARR influenced" },
    tags: ["Hypercare", "Recipe Debugging", "Reliability"],
  },
  {
    title: "Agentic Workflows & MCP",
    client: "Gonzaga · Dutchie · Cohesity",
    category: "Agentic AI",
    year: "2025–26",
    summary:
      "Designed and demoed Model Context Protocol and agentic use cases, wiring LLM agents into real enterprise systems so customers could watch AI do something useful with their data instead of just talking about it.",
    outcome: { metric: "3+", label: "accounts piloting MCP" },
    tags: ["MCP", "Agentic AI", "AI Orchestration"],
  },
  {
    title: "Workato IDE Masterclass",
    client: "World of Workato 2025",
    category: "Technical Enablement",
    year: "2025",
    summary:
      "Designed and delivered an internal masterclass on the Workato IDE for Professional Services and nearby teams, and presented at the Integration Developer Essentials workshop.",
    outcome: { metric: "100+", label: "attendees trained" },
    tags: ["Enablement", "Workato IDE", "Public Speaking"],
  },
];

export type SkillGroup = {
  title: string;
  note: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Automation & iPaaS",
    note: "Where I spend most of my time",
    skills: [
      "Workato",
      "iPaaS Architecture",
      "API Integration",
      "MCP",
      "Agentic Workflows",
    ],
  },
  {
    title: "Engineering",
    note: "The languages behind the recipes",
    skills: ["Python", "JavaScript", "Java", "HTML / CSS"],
  },
  {
    title: "Craft & Insight",
    note: "Making it usable and measurable",
    skills: ["UX Design", "Google Analytics"],
  },
];

export type Post = {
  title: string;
  blurb: string;
  topic: string;
  readingTime: string;
};

export const posts: Post[] = [
  {
    title: "What MCP actually changes for enterprise automation",
    blurb:
      "Where the Model Context Protocol fits in a real integration stack, and the parts of the job it doesn't replace.",
    topic: "Agentic AI",
    readingTime: "Coming soon",
  },
  {
    title: "Designing recipes that survive production",
    blurb:
      "Idempotency, error handling, and the unglamorous bits that keep automations alive at 3am.",
    topic: "Integration Craft",
    readingTime: "Coming soon",
  },
  {
    title: "From iPaaS to agents: a consultant's field notes",
    blurb:
      "How my conversations with customers are changing, and the questions worth asking before you automate anything.",
    topic: "Field Notes",
    readingTime: "Coming soon",
  },
];

export const contact = {
  heading: "Let's get your systems talking.",
  blurb:
    "Got an integration that's gone sideways, or an automation you want to build? I'm happy to talk it through. Agentic ideas welcome too.",
};
