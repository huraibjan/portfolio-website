export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  role: string;
  tech: string[];
  links?: { label: string; href: string }[];
  image: string;
  gallery?: {
    label: string;
    src: string;
    kind: "website" | "mobile" | "desktop" | "mobile-group";
    screens?: { label: string; src: string }[];
  }[];
  impact: string[];
};

export const projects: Project[] = [
  {
    slug: "kallin-ai",
    name: "Kallin AI",
    category: "Voice Agent Automation / Restaurant Operations",
    description:
      "AI-powered restaurant voice ordering and operations platform with mobile app, dashboard, menu workflows, notifications, order handling, Redis-backed workflow state, and automated call flows.",
    role:
      "AI system architecture, backend workflows, Redis caching and workflow state, mobile app flow, dashboard logic, voice agent automation, restaurant operations, product execution.",
    tech: ["Flutter", "FastAPI", "Voice Agent Automation", "Scheduling", "Redis", "MySQL", "REST APIs", "Push Notifications", "Dashboard UI"],
    links: [
      { label: "Website", href: "https://kallin.ai/" },
      { label: "Dashboard", href: "https://dashboard.kallin.ai/" },
      { label: "iOS App", href: "https://apps.apple.com/us/app/kallin-ai/id6778423391" },
    ],
    image: "/projects/kallin/website.png",
    gallery: [
      { label: "Website landing page", src: "/projects/kallin/website.png", kind: "website" },
      { label: "Kallin dashboard overview", src: "/projects/kallin/dashboard-01.png", kind: "desktop" },
      { label: "Kallin dashboard analytics", src: "/projects/kallin/dashboard-02.png", kind: "desktop" },
      { label: "Kallin order workflow", src: "/projects/kallin/dashboard-03.png", kind: "desktop" },
      { label: "Kallin menu management", src: "/projects/kallin/dashboard-04.png", kind: "desktop" },
      { label: "Kallin settings workflow", src: "/projects/kallin/dashboard-05.png", kind: "desktop" },
      { label: "Kallin voice ordering dashboard", src: "/projects/kallin/dashboard-06.png", kind: "desktop" },
      { label: "Kallin product dashboard", src: "/projects/kallin/dashboard-07.png", kind: "desktop" },
      {
        label: "Kallin mobile app screens",
        src: "/projects/kallin/app-01.webp",
        kind: "mobile-group",
        screens: [
          { label: "Kallin mobile app screen 01", src: "/projects/kallin/app-01.webp" },
          { label: "Kallin mobile app screen 02", src: "/projects/kallin/app-02.webp" },
          { label: "Kallin mobile app screen 03", src: "/projects/kallin/app-03.webp" },
          { label: "Kallin mobile app screen 04", src: "/projects/kallin/app-04.webp" },
          { label: "Kallin mobile app screen 05", src: "/projects/kallin/app-05.webp" },
          { label: "Kallin mobile app screen 06", src: "/projects/kallin/app-06.webp" },
        ],
      },
    ],
    impact: ["AI call intake", "Restaurant operations", "Mobile ordering"],
  },
  {
    slug: "vulntriage",
    name: "VulnTriage",
    category: "Cybersecurity / AI Research",
    description:
      "AI-driven vulnerability triage platform for exploitability prediction, CVE intelligence, RAG-based analysis, and SSVC-style decision support.",
    role: "Research, ML architecture, RAG pipeline, backend system, dashboard, cybersecurity intelligence workflow.",
    tech: ["Python", "FastAPI", "React", "XGBoost", "Qdrant", "PostgreSQL", "Docker", "RAG"],
    links: [{ label: "GitHub", href: "https://github.com/huraibjan/vulntriage" }],
    image: "/projects/vulntriage/dashboard.png",
    gallery: [
      { label: "VulnTriage dashboard", src: "/projects/vulntriage/dashboard.png", kind: "desktop" },
      { label: "Vulnerability intelligence table", src: "/projects/vulntriage/vulnerabilities.png", kind: "desktop" },
      { label: "AI briefing workspace", src: "/projects/vulntriage/ai-briefing.png", kind: "desktop" },
      { label: "AI pipeline view", src: "/projects/vulntriage/ai-pipeline.png", kind: "desktop" },
      { label: "Evidence references view", src: "/projects/vulntriage/references.png", kind: "desktop" },
    ],
    impact: ["Exploitability prediction", "CVE intelligence", "Decision support"],
  },
  {
    slug: "mymoveadvisor",
    name: "My Move Advisor",
    category: "Marketplace / Lead Generation Platform",
    description:
      "Moving marketplace and lead generation platform designed to help users request quotes and connect with moving service providers.",
    role: "Product strategy, landing page, quote flow, lead system, conversion UX, marketing system.",
    tech: ["Next.js", "React", "Lead Forms", "SEO", "Meta Ads", "Analytics", "Automation"],
    links: [{ label: "Website", href: "https://www.mymoveadvisor.com/" }],
    image: "/projects/mymoveadvisor/dashboard.jpeg",
    gallery: [
      { label: "MyMoveAdvisor website", src: "/projects/mymoveadvisor/website.png", kind: "website" },
      { label: "MyMoveAdvisor dashboard", src: "/projects/mymoveadvisor/dashboard.jpeg", kind: "desktop" },
    ],
    impact: ["Quote flow", "Lead routing", "Conversion UX"],
  },
  {
    slug: "medimade-hms",
    name: "MediMade HMS",
    category: "Hospital Management System / Healthcare Platform",
    description:
      "Production-grade multi-role hospital management system built for US-based healthcare operations. Covers the full patient lifecycle — registration, appointments, admissions, clinical encounters, vitals, diagnoses, prescriptions, lab orders, pharmacy inventory, billing, and analytics — with enterprise-grade RBAC, audit logging, and tenant isolation.",
    role: "Full-stack architecture, database schema design, multi-role RBAC system, server actions, API route guards, Supabase RLS policies, clinical workflows, pharmacy and lab modules, billing engine, analytics dashboard, and Vercel deployment.",
    tech: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "React Server Components", "TanStack Table", "Recharts", "Zod", "React Hook Form", "Tailwind CSS", "Vercel"],
    links: [
      { label: "Website", href: "https://medimade-hms.vercel.app/" },
      { label: "GitHub", href: "https://github.com/huraibjan/medimade-hms" },
    ],
    image: "/projects/healthcare/screen-01.png",
    gallery: [
      { label: "MediMade HMS dashboard overview", src: "/projects/healthcare/screen-01.png", kind: "desktop" },
      { label: "Patient management & profiles", src: "/projects/healthcare/screen-02.png", kind: "desktop" },
      { label: "Appointment scheduling", src: "/projects/healthcare/screen-03.png", kind: "desktop" },
      { label: "Clinical encounters & vitals", src: "/projects/healthcare/screen-04.png", kind: "desktop" },
      { label: "Pharmacy inventory & dispensing", src: "/projects/healthcare/screen-05.png", kind: "desktop" },
      { label: "Lab orders & results", src: "/projects/healthcare/screen-06.png", kind: "desktop" },
      { label: "Billing, invoices & analytics", src: "/projects/healthcare/screen-07.png", kind: "desktop" },
    ],
    impact: ["Multi-role RBAC across 8 user types", "End-to-end hospital operations", "Production analytics & audit logging"],
  },
  {
    slug: "medical-receptionist",
    name: "Medical Receptionist",
    category: "Healthcare Voice Agent Automation",
    description:
      "AI-powered voice agent backend that acts as a 24/7 medical receptionist. It connects a Retell AI voice assistant to a FastAPI backend so incoming patient calls are triaged automatically, summarized into structured data, and escalated to clinic staff through urgency-based email notifications — reducing response delays and routing emergencies to the right people fast.",
    role: "Backend architecture, event-driven webhook processing, Retell AI voice-agent integration, urgency classification logic, structured patient-data extraction, email notification system, and secure signature-verified webhook handling.",
    tech: ["Python", "FastAPI", "Pipecat", "Retell AI", "Redis", "Uvicorn", "Pydantic", "Jinja2", "HTTPX", "SendGrid / SMTP", "Webhooks"],
    links: [{ label: "GitHub", href: "https://github.com/huraibjan/medical-receptionist" }],
    image: "/projects/medical-receptionist/Laptop_with_healthcare_AI_202607071910.jpeg",
    gallery: [
      { label: "Medical Receptionist AI", src: "/projects/medical-receptionist/Laptop_with_healthcare_AI_202607071910.jpeg", kind: "desktop" },
    ],
    impact: [
      "Real-time Retell AI webhook processing",
      "Automatic call-urgency classification (emergency / urgent / routine)",
      "Structured patient intake extraction (name, DOB, callback, insurance, reason)",
      "Tailored email escalation to clinic staff",
    ],
  },
  {
    slug: "quantixx-ai",
    name: "Quantixx AI",
    category: "AI Automation Agency / Business AI Systems",
    description:
      "AI automation company platform focused on workflow automation, intelligent agents, AI-powered marketing, business operations, and scalable digital systems.",
    role: "Founder-level product strategy, AI automation systems, website, content systems, client-facing architecture.",
    tech: ["AI Agents", "Automation", "Next.js", "Workflows", "Marketing Systems", "Analytics"],
    links: [{ label: "Website", href: "https://quantixx.ai/" }],
    image: "/projects/quantixx-ai/website.png",
    gallery: [
      { label: "Quantixx AI website", src: "/projects/quantixx-ai/website.png", kind: "website" },
      { label: "Quantixx AI platform", src: "/projects/quantixx-ai/screen-01.png", kind: "desktop" },
      { label: "Quantixx AI workflows", src: "/projects/quantixx-ai/screen-02.png", kind: "desktop" },
      { label: "Quantixx AI automation", src: "/projects/quantixx-ai/screen-03.png", kind: "desktop" },
    ],
    impact: ["Business agents", "Workflow automation", "Client systems"],
  },
  {
    slug: "kodensoft",
    name: "Kodensoft",
    category: "Software House / AI Solutions Brand",
    description:
      "Software and AI solutions brand offering custom applications, automation, mobile apps, e-commerce, UI/UX, and digital systems.",
    role: "Website, service positioning, software product strategy, automation offering.",
    tech: ["Web Apps", "Mobile Apps", "AI Automation", "UI/UX", "Digital Marketing"],
    links: [{ label: "Website", href: "https://www.kodensoft.com/" }],
    image: "/projects/kodensoft/website.png",
    gallery: [{ label: "Kodensoft website", src: "/projects/kodensoft/website.png", kind: "website" }],
    impact: ["Service positioning", "Solution packaging", "Digital systems"],
  },
  {
    slug: "oakland-diner",
    name: "Oakland Diner",
    category: "Restaurant Website / Mobile Ordering App",
    description:
      "Restaurant digital ordering experience with website and iOS app for menu browsing, food ordering, secure checkout, and rewards.",
    role: "Mobile app workflow, ordering UX, restaurant commerce, product flow.",
    tech: ["Flutter", "iOS", "Food Ordering", "Payments", "Rewards", "Restaurant UX"],
    links: [
      { label: "Website", href: "https://www.oaklanddinernj.com/" },
      { label: "iOS App", href: "https://apps.apple.com/us/app/oakland-diner/id6763606063" },
    ],
    image: "/projects/oakland-diner/website.png",
    gallery: [
      { label: "Oakland Diner website", src: "/projects/oakland-diner/website.png", kind: "website" },
      { label: "Oakland Diner admin panel", src: "/projects/oakland-diner/admin-panel.png", kind: "desktop" },
      { label: "Oakland Diner app screen 01", src: "/projects/oakland-diner/app-01.webp", kind: "mobile" },
      { label: "Oakland Diner app screen 02", src: "/projects/oakland-diner/app-02.webp", kind: "mobile" },
      { label: "Oakland Diner app screen 03", src: "/projects/oakland-diner/app-03.webp", kind: "mobile" },
      { label: "Oakland Diner app screen 04", src: "/projects/oakland-diner/app-04.webp", kind: "mobile" },
    ],
    impact: ["Menu commerce", "Rewards", "Mobile checkout"],
  },
  {
    slug: "caselens",
    name: "CaseLens",
    category: "Legal AI / Case Intelligence Platform",
    description:
      "Multi-tenant legal workspace that uses AI to analyze case documents for law firms. Lawyers upload case PDFs and the platform automatically extracts structured case data — suspects, defendants, key dates, veracity scores, and contradictions between witness statements — answers natural-language questions with page-level source citations, predicts case outcomes, and drafts grounded legal correspondence, all with mandatory human-review flags and audit trails.",
    role: "Full-stack architecture, citation-grounded RAG pipeline, hybrid full-text + vector retrieval, self-healing multi-provider AI gateway with automatic failover and circuit breakers, document extraction and chunking pipeline, multi-tenant RBAC, and legal-grade AI safeguards.",
    tech: ["Next.js 16", "React 19", "TypeScript", "FastAPI", "PostgreSQL", "pgvector", "SQLAlchemy", "Pydantic", "RAG", "PyMuPDF", "JWT / OAuth", "Tailwind CSS"],
    links: [
      { label: "Website", href: "https://caselens-web.vercel.app" },
      { label: "GitHub", href: "https://github.com/huraibjan/caselens" },
    ],
    image: "/projects/caselens/login.jpg",
    gallery: [
      { label: "CaseLens sign-in", src: "/projects/caselens/login.jpg", kind: "website" },
      { label: "Workspace dashboard", src: "/projects/caselens/dashboard.png", kind: "desktop" },
      { label: "Matter detail & AI-extracted allegations", src: "/projects/caselens/matter-detail.png", kind: "desktop" },
      { label: "Case overview with veracity score & risk radar", src: "/projects/caselens/case-overview.png", kind: "desktop" },
      { label: "AI judgment & risk factors", src: "/projects/caselens/judgment.png", kind: "desktop" },
      { label: "Statistical evidence scoring & contradiction findings", src: "/projects/caselens/evidence.png", kind: "desktop" },
      { label: "AI Legal Counsel chat", src: "/projects/caselens/ai-counsel.png", kind: "desktop" },
      { label: "Calendar & deadline tracking", src: "/projects/caselens/calendar.png", kind: "desktop" },
      { label: "AI letter generator", src: "/projects/caselens/letter-generator.png", kind: "desktop" },
      { label: "Cross-matter analytics", src: "/projects/caselens/analytics.png", kind: "desktop" },
    ],
    impact: [
      "Citation-grounded RAG that abstains instead of hallucinating",
      "Automatic case-fact & contradiction extraction",
      "Self-healing AI gateway across five providers with failover",
      "AI-drafted legal letters grounded in real case facts",
    ],
  },
  {
    slug: "n8n-ai-automations",
    name: "n8n AI Automations",
    category: "Workflow Automation / AI Agents",
    description:
      "A growing collection of production-ready n8n workflows that wire AI agents into real business processes — marketing and lead capture, content repurposing, outreach, research, and industry-specific voice/chat agents. Each workflow connects services like Gmail, Google Sheets, Twilio, Mailchimp, CRMs, and web-scraping APIs to LLMs so tasks that used to be manual (lead routing, content drafting, customer replies, research summaries) run automatically, and every automation is independently importable and configurable with its own credentials.",
    role: "Workflow design, n8n automation architecture, AI agent orchestration, third-party API integration, and Coolify deployment.",
    tech: ["n8n", "AI Agents", "Coolify", "Webhooks", "LLM Integration", "Gmail API", "Google Sheets", "Twilio", "Web Scraping"],
    links: [{ label: "GitHub", href: "https://github.com/huraibjan/huraib-n8n-ai-automations" }],
    image: "/projects/n8n-ai-automations/marketing-leads-workflow.jpeg",
    gallery: [
      { label: "Marketing & lead-capture automation workflow", src: "/projects/n8n-ai-automations/marketing-leads-workflow.jpeg", kind: "desktop" },
    ],
    impact: [
      "Dozens of independently importable automation workflows",
      "AI agents for outreach, support replies, and lead generation",
      "Content repurposing across newsletters, social, and video scripts",
      "Industry-specific voice & chat agents (dental, auto repair, legal leads)",
    ],
  },
];

export const featuredProjects = projects.slice(0, 6);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
