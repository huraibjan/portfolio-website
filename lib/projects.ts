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
    kind: "website" | "mobile" | "desktop";
  }[];
  impact: string[];
};

export const projects: Project[] = [
  {
    slug: "kallin-ai",
    name: "Kallin AI",
    category: "AI Voice Ordering / Restaurant Automation",
    description:
      "AI-powered restaurant voice ordering and operations platform with mobile app, dashboard, menu workflows, notifications, order handling, and AI call automation.",
    role:
      "AI system architecture, backend workflows, mobile app flow, dashboard logic, voice automation, restaurant operations, product execution.",
    tech: ["Flutter", "FastAPI", "Vapi AI", "Twilio", "MySQL", "REST APIs", "Push Notifications", "Dashboard UI"],
    links: [
      { label: "Website", href: "https://kallin.ai/" },
      { label: "Dashboard", href: "https://dashboard.kallin.ai/" },
      { label: "iOS App", href: "https://apps.apple.com/us/app/kallin-ai/id6778423391" },
    ],
    image: "/projects/kallin/website.png",
    gallery: [
      { label: "Website landing page", src: "/projects/kallin/website.png", kind: "website" },
      { label: "Mobile app screen 01", src: "/projects/kallin/app-01.webp", kind: "mobile" },
      { label: "Mobile app screen 02", src: "/projects/kallin/app-02.webp", kind: "mobile" },
      { label: "Mobile app screen 03", src: "/projects/kallin/app-03.webp", kind: "mobile" },
      { label: "Mobile app screen 04", src: "/projects/kallin/app-04.webp", kind: "mobile" },
      { label: "Mobile app screen 05", src: "/projects/kallin/app-05.webp", kind: "mobile" },
      { label: "Mobile app screen 06", src: "/projects/kallin/app-06.webp", kind: "mobile" },
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
    slug: "quantixx-ai",
    name: "Quantixx AI",
    category: "AI Automation Agency / Business AI Systems",
    description:
      "AI automation company platform focused on workflow automation, intelligent agents, AI-powered marketing, business operations, and scalable digital systems.",
    role: "Founder-level product strategy, AI automation systems, website, content systems, client-facing architecture.",
    tech: ["AI Agents", "Automation", "Next.js", "Workflows", "Marketing Systems", "Analytics"],
    links: [{ label: "Website", href: "https://quantixx.ai/" }],
    image: "/projects/quantixx-ai.svg",
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
    slug: "oh-crema",
    name: "Oh! Crema",
    category: "E-Commerce Brand",
    description:
      "Premium dessert and pistachio cream e-commerce experience focused on product storytelling, visual trust, and conversion.",
    role: "E-commerce UX, product storytelling, brand presentation, conversion-focused structure.",
    tech: ["E-Commerce", "Product UX", "Brand Design", "SEO", "Conversion Copy"],
    links: [{ label: "Website", href: "https://ohcrema.com/" }],
    image: "/projects/oh-crema.svg",
    impact: ["Product storytelling", "Visual trust", "Checkout intent"],
  },
  {
    slug: "inventory-management-system",
    name: "Inventory Management System",
    category: "Warehouse Operations",
    description: "Warehouse inventory platform for managing stock, items, movement, and operational visibility.",
    role: "Full-stack system design, inventory logic, dashboard, database structure.",
    tech: ["React", "Node.js", "SQL", "Dashboards", "Inventory Logic"],
    image: "/projects/inventory-management-system.svg",
    impact: ["Stock visibility", "Movement tracking", "Operational dashboard"],
  },
  {
    slug: "emergency-sos-mobile-app",
    name: "Emergency SOS Mobile App",
    category: "Mobile Safety App",
    description:
      "Mobile safety app designed to send emergency messages with current GPS coordinates through mobile networks when internet is unavailable.",
    role: "Mobile app concept, GPS workflow, emergency messaging, offline-first user flow.",
    tech: ["Flutter", "GPS", "SMS", "Mobile Networks", "Offline UX"],
    image: "/projects/emergency-sos-mobile-app.svg",
    impact: ["Offline emergency flow", "GPS messaging", "Mobile safety"],
  },
  {
    slug: "jobswatch",
    name: "JobsWatch",
    category: "Recruitment Video CV Mobile App",
    description:
      "Mobile app concept where candidates present short video CV reels to help recruitment teams reduce the time spent reviewing long resumes.",
    role: "Mobile app design, recruitment workflow, video-first UX, product idea execution.",
    tech: ["Android", "Java/Kotlin", "Video UX", "Recruitment Tech"],
    image: "/projects/jobswatch.svg",
    impact: ["Video CV reels", "Recruiter review flow", "Candidate screening"],
  },
  {
    slug: "ai-voice-agent-healthcare",
    name: "AI Voice Agent for Healthcare",
    category: "Healthcare Voice AI",
    description:
      "AI voice agent for healthcare workflows such as appointment handling, patient intake support, patient routing, and automated call assistance.",
    role: "Voice AI architecture, workflow design, conversation logic, automation planning.",
    tech: ["Voice AI", "Vapi AI", "Twilio", "LLM Workflows", "Call Routing"],
    image: "/projects/ai-voice-agent-healthcare.svg",
    impact: ["Patient intake", "Appointment handling", "Call routing"],
  },
  {
    slug: "e-commerce-flower-shop",
    name: "E-Commerce Flower Shop",
    category: "E-Commerce",
    description:
      "Online flower shop experience focused on product browsing, checkout flow, visual design, and customer-friendly shopping experience.",
    role: "E-commerce structure, frontend design, checkout flow, product UX.",
    tech: ["E-Commerce", "Web Development", "Product UX", "Checkout Flow"],
    image: "/projects/e-commerce-flower-shop.svg",
    impact: ["Product browsing", "Friendly checkout", "Visual commerce"],
  },
];

export const featuredProjects = projects.slice(0, 6);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
