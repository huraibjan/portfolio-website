"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { gsap } from "gsap";
import { projects, type Project } from "@/lib/projects";
import { MobileScreensComposition } from "@/components/MobileScreensComposition";
import { WarpBackground } from "@/components/ui/warp-background";

// ─── Mobile detection hook ────────────────────────────────────────────────────
function useIsMobile() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const check = () => setIs(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return is;
}

// ─── Terminal typing animation data ───────────────────────────────────────────

const TERM_CMD = "cat biography.txt";

const TERM_BODY_SEGMENTS: { text: string; cls: string }[] = [
  { text: "> ", cls: "text-white/35" },
  { text: "An ", cls: "text-white/60" },
  { text: "AI Systems Engineer", cls: "text-[#c8f135]" },
  { text: " based in New Jersey. I ship production ", cls: "text-white/60" },
  { text: "AI agents", cls: "text-[#c8f135]" },
  { text: ", ", cls: "text-white/60" },
  { text: "full-stack applications", cls: "text-[#c8f135]" },
  { text: ", ", cls: "text-white/60" },
  { text: "automations", cls: "text-[#c8f135]" },
  { text: ", and ", cls: "text-white/60" },
  { text: "secure data pipelines", cls: "text-[#c8f135]" },
  { text: " - end to end.", cls: "text-white/60" },
];

const TERM_BODY_TOTAL = TERM_BODY_SEGMENTS.reduce((n, s) => n + s.text.length, 0);

// Flat per-character array for per-char opacity control (keeps box size constant)
const TERM_BODY_CHARS: { char: string; cls: string }[] = [];
for (const seg of TERM_BODY_SEGMENTS) {
  for (const char of seg.text) {
    TERM_BODY_CHARS.push({ char, cls: seg.cls });
  }
}

const TERM_CMD_CHARS = TERM_CMD.split("").map((char, i) => ({
  char,
  cls: i < 3 ? "text-[#89dceb]" : "text-white/80",
}));

// ─── Data ──────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    company: "Kodensoft",
    role: "AI / ML Engineer",
    period: "Jan 2025 — May 2026",
    location: "Saddle Brook, NJ, USA",
    type: "Full-Time",
    description:
      "Built scalable backend microservices, ML models, RAG pipelines, multi-agent orchestration, voice agent automation, scheduling systems, n8n automations, and dashboard workflows across restaurant, healthcare, and operations products.",
    highlights: ["Voice Agent Automation", "n8n Automations", "Microservices", "Scheduling", "Ollama", "Fine-Tuning"],
    impact: "Scaled AI workflows from demos into production systems: automated call handling, document-heavy operations, scheduling, POS integrations, and internal dashboards that reduced manual work for operators.",
  },
  {
    company: "Kore Digital",
    role: "Data Engineer · Full Stack Developer",
    period: "Sep 2022 — Aug 2024",
    location: "Karachi, Pakistan",
    type: "Full-Time",
    description:
      "Progressed from Full Stack Developer (Sep 2022–Oct 2023) to Data Engineer (Oct 2023–Aug 2024). Built ETL data pipelines, BI dashboards in Tableau and Python (Plotly, Seaborn), EDA on large-scale datasets, and production web apps in React.js/Next.js + Node.js with POS system integrations. Improved development cycle time by 30%.",
    highlights: ["ETL Pipelines", "Tableau / Plotly", "React.js / Next.js", "Node.js", "PostgreSQL", "EDA"],
    impact: "Grew from full-stack delivery into data engineering ownership: shipped dashboards, cleaned reporting workflows, built ETL pipelines, and helped improve delivery speed by 30%.",
  },
  {
    company: "Koretechx LLC",
    role: "Web Developer",
    period: "Jun 2020 — Aug 2022",
    location: "Florida, USA (Remote)",
    type: "Full-Time",
    description:
      "Developed and maintained full-stack web applications using React.js and Node.js. Optimized cloud infrastructure and deployment pipelines, improving deployment efficiency by 30% through CI/CD workflows and modern web technologies.",
    highlights: ["React.js", "Node.js", "CI/CD", "Cloud Deployment", "UI/UX"],
    impact: "Delivered client-facing web systems, improved deployment reliability, tightened UI execution, and helped teams move faster through cleaner frontend and backend implementation.",
  },
  {
    company: "Rockstar Games",
    role: "Game Developer · Freelance",
    period: "Jun 2010 — Dec 2014",
    location: "Pakistan (Remote)",
    type: "Freelance",
    description:
      "Developed server-side game logic and scripting systems on the SA-MP multiplayer platform — auth, RBAC, progression systems, subscription management, and real-time player state persistence. Architected and managed end-to-end multiplayer server infrastructure scaling to 100+ concurrent daily active users.",
    highlights: ["Server Architecture", "RBAC Systems", "Real-time Logic", "Linux Hosting", "Game Scripting"],
    impact: "Built and operated multiplayer systems with persistent player state, permissions, progression, subscriptions, and real-time logic for 100+ daily concurrent users.",
  },
];

const EDUCATION = [
  {
    school: "Montclair State University",
    degree: "M.S. Data Science",
    period: "Aug 2024 — May 2026",
    location: "Montclair, NJ, USA",
    gpa: "3.7 / 4.0",
    courses: ["Machine Learning", "Deep Learning", "NLP", "EDA", "Big Data", "Advanced Statistics"],
  },
  {
    school: "SZABIST Institute of Science & Technology",
    degree: "B.S. Computer Science",
    period: "Aug 2019 — May 2023",
    location: "Karachi, Pakistan",
    gpa: "3.5 / 4.0",
    courses: ["Software Engineering", "AI", "Data Science", "Database Systems", "Data Structures", "Networking"],
  },
];

const CARD_COLORS = [
  { bg: "#c8f135", text: "#0a0a0a", label: "#0a0a0a" },
  { bg: "#0a0a0a", text: "#f5f5f5", label: "#c8f135" },
];

const SERVICES = [
  {
    number: "01",
    title: "AI Systems & Agents",
    description:
      "Production AI agents, RAG pipelines, vector search, voice agent automation, local LLM workflows, and model deployment.",
    skills: ["RAG Pipelines", "PyTorch", "TensorFlow", "NLP", "Multi-Agent", "Voice Agent Automation"],
    moreSkills: ["XGBoost", "BERT", "Scikit-learn", "Embeddings", "Computer Vision", "FastAPI", "Qdrant", "LangChain", "OpenAI API", "Ollama", "Fine-Tuning", "Model Training", "Hyperparameter Tuning", "Ensemble Methods", "Prompt Engineering", "Feature Engineering", "Deep Learning"],
  },
  {
    number: "02",
    title: "Full-Stack Development",
    description:
      "End-to-end product engineering — APIs, dashboards, databases, authentication, and frontend systems shipped to production.",
    skills: ["React.js", "Next.js", "Node.js", "Django", "REST APIs", "PostgreSQL"],
    moreSkills: ["GraphQL", "Microservices", "MongoDB", "MySQL", "Redis", "Docker", "AWS", "GCP", "Kubernetes", "CI/CD", "OAuth / JWT", "TypeScript", "Python", "Cassandra", "Firebase", "Serverless", "System Design"],
  },
  {
    number: "03",
    title: "Mobile & Product",
    description:
      "Native-quality mobile apps for iOS and Android, app store releases, and end-to-end product thinking across the stack.",
    skills: ["Flutter", "iOS", "Android", "Kotlin", "Firebase", "Java"],
    moreSkills: ["App Store", "Push Notifications", "Cross-Platform", "In-App Purchases", "UX Design", "React Native", "Figma", "Offline UX", "Video UX"],
  },
  {
    number: "04",
    title: "AI Automation",
    description:
      "Workflow automation, intelligent agent pipelines, and business process automation that cut manual work and scale operations.",
    skills: ["Python Scripting", "API Integration", "ETL Pipelines", "LLM Workflows", "Apache Spark"],
    moreSkills: ["n8n", "Zapier", "Make", "Webhooks", "CRM Automation", "Data Preprocessing", "Data Modeling", "Data Quality", "Cloud Functions", "Orchestration Layers", "Document Automation"],
  },
  {
    number: "05",
    title: "Digital Marketing",
    description:
      "Performance marketing, analytics, BI dashboards, and conversion-focused funnels designed to grow and convert.",
    skills: ["Meta Ads", "Google Ads", "SEO", "Lead Gen", "Tableau"],
    moreSkills: ["Power BI", "Google Analytics", "Funnels", "Email Marketing", "Content Strategy", "Plotly", "Matplotlib", "Seaborn", "EDA", "Statistical Analysis", "A/B Testing", "Conversion Copywriting"],
  },
];

const NAV_LINKS = [
  { label: "PROJECTS", href: "#work-section" },
  { label: "ABOUT", href: "#about-section" },
  { label: "EXPERIENCE", href: "#experience-section" },
  { label: "SERVICES", href: "#services-section" },
  { label: "CONTACT", href: "#footer-section" },
];

const STATS = [
  { value: "12+", label: "Products Shipped" },
  { value: "8+", label: "AI Systems Built" },
  { value: "15+", label: "Tech Stacks" },
  { value: "2021", label: "Started Coding" },
];

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ value }: { value: string }) {
  const numMatch = value.match(/[\d.]+/);
  const target = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = value.replace(/[\d.]+/g, "").trim();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        const controls = animate(count, target, {
          duration: 2.2,
          ease: "easeOut",
          onUpdate: (v) => setDisplay(Math.round(v) + suffix),
        });
        return controls.stop;
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [inView, target, suffix, count]);

  return <span ref={ref}>{display}</span>;
}

// ─── Tech Background SVG ──────────────────────────────────────────────────────
const STROKE = "rgba(0,0,0,0.14)";
const SW = 1.2;
const UNIT = 40;
const GSCALE = 50;

function gp(x: number, y: number, z = 0) {
  return { cx: 920 + (x - y) * GSCALE, cy: 400 + (x + y) * (GSCALE / 2) - z };
}
function fp(x: number, y: number) {
  const { cx, cy } = gp(x, y);
  return `${cx},${cy}`;
}

function IsoBlock({ x, y, z = 0, h = 40, delay = 0, icon }: { x: number; y: number; z?: number; h?: number; delay?: number; icon: React.ReactNode }) {
  const { cx, cy } = gp(x, y, z);
  const w = UNIT;
  const top = `M ${cx} ${cy - h} L ${cx + w} ${cy - h - w / 2} L ${cx} ${cy - h - w} L ${cx - w} ${cy - h - w / 2} Z`;
  const left = `M ${cx} ${cy - h} L ${cx - w} ${cy - h - w / 2} L ${cx - w} ${cy - w / 2} L ${cx} ${cy} Z`;
  const right = `M ${cx} ${cy - h} L ${cx + w} ${cy - h - w / 2} L ${cx + w} ${cy - w / 2} L ${cx} ${cy} Z`;
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { pathLength: { delay, duration: 1.4, ease: "easeInOut" as const }, opacity: { delay, duration: 0.1 } } },
  };
  return (
    <g>
      <motion.path d={left} fill="rgba(242,242,242,0.8)" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" variants={draw} initial="hidden" animate="visible" />
      <motion.path d={right} fill="rgba(242,242,242,0.8)" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" variants={draw} initial="hidden" animate="visible" />
      <motion.path d={top} fill="rgba(242,242,242,0.8)" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" variants={draw} initial="hidden" animate="visible" />
      {icon && (
        <g transform={`translate(${cx}, ${cy - h - w / 2}) scale(1, 0.5) rotate(-45)`}>
          <motion.g variants={draw} initial="hidden" animate="visible">{icon}</motion.g>
        </g>
      )}
    </g>
  );
}

function IsoLine({ path, delay = 0 }: { path: string; delay?: number }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { pathLength: { delay, duration: 2, ease: "easeInOut" as const }, opacity: { delay, duration: 0.1 } } },
  };
  return <motion.path d={path} fill="none" stroke={STROKE} strokeWidth={SW} markerEnd="url(#arrow)" variants={draw} initial="hidden" animate="visible" />;
}

function TechBackground() {
  const blocks = [
    { x: -1, y: -4, icon: <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth={2}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg> },
    { x: -1.5, y: -1.5, icon: <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth={2}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 4.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 .33 1.65 1.65 0 0 0 10-1.51V-3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
    { x: 0, y: 0, icon: <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth={2}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19C3 20.66 7.03 22 12 22s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></svg> },
    { x: 2, y: -1.5, icon: <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth={2}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
    { x: 1, y: 3, icon: <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
    { x: 4, y: 2, icon: <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={STROKE} strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg> },
  ].sort((a, b) => (a.x + a.y) - (b.x + b.y));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40 mix-blend-multiply">
      <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 8 5 L 0 9 z" fill={STROKE} />
          </marker>
        </defs>
        <IsoLine delay={0.5} path={`M ${fp(-1, -4)} L ${fp(-1.5, -4)} L ${fp(-1.5, -1.5)}`} />
        <IsoLine delay={1.0} path={`M ${fp(-1.5, -1.5)} L ${fp(-1.5, 0)} L ${fp(0, 0)}`} />
        <IsoLine delay={2.0} path={`M ${fp(0, 0)} L ${fp(2, 0)} L ${fp(2, -1.5)}`} />
        <IsoLine delay={2.5} path={`M ${fp(2, -1.5)} L ${fp(4, -1.5)} L ${fp(4, 2)}`} />
        <IsoLine delay={2.0} path={`M ${fp(1, 3)} L ${fp(1, 0)} L ${fp(0, 0)}`} />
        {blocks.map((b, i) => (
          <IsoBlock key={`${b.x}-${b.y}`} x={b.x} y={b.y} icon={b.icon} delay={0.2 * i} />
        ))}
      </svg>
    </div>
  );
}

// ─── Preloader ────────────────────────────────────────────────────────────────
function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-dark overflow-hidden pointer-events-none"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative overflow-hidden">
        <motion.h1
          className="font-display font-black text-accent text-5xl md:text-7xl lg:text-9xl tracking-tighter"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          HURAIB JAN
        </motion.h1>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-dark" />
      </div>
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onResumeOpen }: { onResumeOpen: () => void }) {
  const [showControls, setShowControls] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      setShowControls(past);
      if (!past && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Top-left name — always visible on hero */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 md:p-10 pointer-events-none">
        <div className="flex justify-between items-start max-w-[1800px] mx-auto">
          <a
            href="#hero-section"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-display font-bold text-base text-dark hover:text-accent transition-colors duration-300 pointer-events-auto"
          >
            HURAIB®
          </a>
          <span className="font-mono text-[10px] tracking-widest uppercase text-dark/50 pointer-events-none">
            AI Systems Engineer
          </span>
        </div>
      </header>

      {/* Scroll-triggered controls */}
      <AnimatePresence>
        {showControls && (
          <>
            <motion.button
              key="home-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] w-14 h-14 bg-white text-dark rounded-full shadow-lg hover:bg-dark hover:text-white transition-colors border border-black/5 flex items-center justify-center"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </motion.button>

            <motion.button
              key="menu-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen((v) => !v)}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] w-14 h-14 bg-white text-dark rounded-full shadow-lg hover:bg-dark hover:text-white transition-colors border border-black/5 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8h16M4 16h16" />
                }
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && showControls && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-4 md:inset-8 bg-light rounded-[32px] md:rounded-[48px] shadow-2xl z-[90] flex flex-col justify-center items-center border border-dark/10 overflow-hidden"
          >
            <nav className="flex flex-col gap-3 md:gap-6 items-center">
              {NAV_LINKS.map((link, i) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="relative group inline-block font-display font-black text-6xl md:text-8xl lg:text-[7rem] tracking-tighter text-dark hover:text-accent transition-colors uppercase leading-[0.88]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-0 w-full h-2 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.a>
                </div>
              ))}
              {/* Resume entry */}
              <div className="overflow-hidden">
                <motion.button
                  onClick={() => { setMenuOpen(false); onResumeOpen(); }}
                  className="relative group inline-block font-display font-black text-6xl md:text-8xl lg:text-[7rem] tracking-tighter text-accent uppercase leading-[0.88]"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.45, delay: NAV_LINKS.length * 0.08, ease: [0.33, 1, 0.68, 1] }}
                >
                  RESUME
                  <span className="absolute left-0 bottom-0 w-full h-2 bg-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.button>
              </div>
            </nav>
            <motion.div
              className="absolute bottom-10 left-10 right-10 md:flex hidden justify-between items-center font-mono text-[10px] tracking-widest uppercase text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <span>(MENU)</span>
              <span>HURAIB JAN — AI SYSTEMS ENGINEER</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ onResumeOpen }: { onResumeOpen: () => void }) {
  const [nameFontSize, setNameFontSize] = useState("20vw");
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const disableAnimation = isMobile || !!prefersReduced;

  // Terminal typing animation (starts after preloader finishes at ~2000ms)
  const [termPhase, setTermPhase] = useState(0); // 0=idle 1=typing-cmd 2=badge 3=heading 4=typing-body 5=done
  const [termCmdChars, setTermCmdChars] = useState(0);
  const [termBodyChars, setTermBodyChars] = useState(0);

  useEffect(() => {
    let iv: ReturnType<typeof setInterval>;
    let to: ReturnType<typeof setTimeout>;
    const cleanup = () => { clearInterval(iv); clearTimeout(to); };

    to = setTimeout(() => {
      setTermPhase(1);
      let c = 0;
      iv = setInterval(() => {
        c++;
        setTermCmdChars(c);
        if (c >= TERM_CMD.length) {
          clearInterval(iv);
          to = setTimeout(() => {
            setTermPhase(2);
            to = setTimeout(() => {
              setTermPhase(3);
              to = setTimeout(() => {
                setTermPhase(4);
                let b = 0;
                iv = setInterval(() => {
                  b++;
                  setTermBodyChars(b);
                  if (b >= TERM_BODY_TOTAL) {
                    clearInterval(iv);
                    setTermPhase(5);
                  }
                }, 10);
              }, 100);
            }, 80);
          }, 150);
        }
      }, 28);
    }, 2100); // 2000ms preloader + 100ms buffer

    return cleanup;
  }, []);

  const { scrollY } = useScroll();
  const yParallaxFull = useTransform(scrollY, [0, 2000], [0, -1000]);
  const yParallax = isMobile ? 0 : yParallaxFull;

  useEffect(() => {
    const calc = () => {
      const size = Math.max(56, Math.min(window.screen.width * 0.18, 280));
      setNameFontSize(`${size}px`);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
  };

  return (
    /* On mobile: normal flow so sections below sit on top of hero naturally.
       On desktop: fixed behind content so sections scroll over it. */
    <div className={isMobile ? "w-full relative z-10 bg-light" : "h-screen w-full relative z-0"}>
      <motion.section
        id="hero-section"
        className={`w-full min-h-screen flex flex-col justify-between bg-light pt-24 md:pt-32 pb-12 overflow-hidden ${isMobile ? "relative z-10" : "fixed top-0 left-0 z-0 will-change-transform"}`}
        style={{ y: yParallax }}
      >
        {!isMobile && <TechBackground />}

        {/* Lime glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent rounded-full opacity-20 blur-[120px] pointer-events-none -z-10 -translate-x-1/3 -translate-y-1/3" />

        <div className="flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 z-10 flex-1 lg:mt-12 xl:mt-16 relative">
          {/* Left: Giant nav links */}
          <nav className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0 justify-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="group relative flex items-center justify-between w-full font-display font-black text-[12vw] sm:text-[10vw] md:text-7xl lg:text-8xl xl:text-8xl tracking-tighter text-dark leading-[0.92] cursor-pointer uppercase overflow-hidden"
                variants={linkVariants}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                <span className="absolute inset-0 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                <span className="relative z-10 group-hover:text-dark transition-colors duration-300 px-2 md:px-0">
                  {link.label}
                </span>
                <span className="relative z-10 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 group-hover:text-dark px-4 md:px-8">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </nav>

          {/* Right: Terminal biography */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-16 xl:pl-24 pb-8 lg:pb-24 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            {/* Terminal window */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/10 max-w-lg w-full">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e2e]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-2 font-mono text-[11px] text-white/30 tracking-wide">biography.txt — zsh</span>
              </div>

              {/* Terminal body — all content always rendered so box never resizes */}
              <div className="bg-[#13131f] px-5 py-5 font-mono text-sm leading-7">
                {/* Command line */}
                <p>
                  <span className="text-[#c8f135]">huraib</span>
                  <span className="text-white/40">@macbook</span>
                  <span className="text-white/25"> ~ % </span>
                  {TERM_CMD_CHARS.map((item, i) => (
                    <span key={i} className={item.cls} style={{ opacity: termCmdChars > i ? 1 : 0 }}>
                      {item.char}
                    </span>
                  ))}
                  {(termPhase === 0 || termPhase === 1) && (
                    <span className="inline-block w-[7px] h-[1em] bg-white/60 ml-px align-middle animate-[blink_1.1s_step-end_infinite]" />
                  )}
                </p>

                {/* Badge — always in DOM, fades in */}
                <p
                  className="text-white/40 text-xs tracking-widest mt-1 transition-opacity duration-300"
                  style={{ opacity: termPhase >= 2 ? 1 : 0 }}
                >
                  (AVAILABLE FOR AI SYSTEMS ROLES)
                </p>

                {/* Heading — always in DOM, fades in */}
                <p
                  className="mt-3 transition-opacity duration-300"
                  style={{ opacity: termPhase >= 3 ? 1 : 0 }}
                >
                  <span className="text-white/30"># </span>
                  <span className="text-white/90 font-semibold">Hi, I&apos;m Huraib Jan.</span>
                </p>

                {/* Body — all chars always rendered, opacity per-char for typewriter effect */}
                <p className="mt-3">
                  {TERM_BODY_CHARS.map((item, i) => (
                    <span key={i} className={item.cls} style={{ opacity: termBodyChars > i ? 1 : 0 }}>
                      {item.char}
                    </span>
                  ))}
                  {termPhase >= 5 && (
                    <span className="inline-block w-[9px] h-[1.1em] bg-white/70 ml-0.5 align-middle animate-[blink_1.1s_step-end_infinite]" />
                  )}
                </p>
              </div>
            </div>

            {/* Icon buttons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="mailto:huraibjansarhandi@gmail.com"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-dark/8 border border-dark/12 hover:bg-dark hover:border-dark transition-all duration-300"
                aria-label="Email Me"
              >
                <svg className="w-4 h-4 text-dark/60 group-hover:text-accent transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase text-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">Email</span>
              </a>
              <a
                href="https://github.com/huraibjan"
                target="_blank" rel="noreferrer"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-dark/8 border border-dark/12 hover:bg-dark hover:border-dark transition-all duration-300"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 text-dark/60 group-hover:text-accent transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase text-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/huraibjan"
                target="_blank" rel="noreferrer"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-dark/8 border border-dark/12 hover:bg-dark hover:border-dark transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 text-dark/60 group-hover:text-accent transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase text-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">LinkedIn</span>
              </a>
              <button
                onClick={onResumeOpen}
                className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-dark border border-dark hover:bg-accent transition-all duration-300"
                aria-label="Resume"
              >
                <svg className="w-4 h-4 text-accent group-hover:text-dark transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase text-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">Resume</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Giant waving name */}
        <motion.div
          className="w-full z-0 flex flex-col items-center justify-end overflow-hidden mt-4"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ perspective: "800px" }}
        >
          <div
            className="flex items-end justify-center w-full select-none"
            style={{ fontSize: nameFontSize, lineHeight: 0.85 }}
            aria-label="HURAIB JAN"
          >
            {"HURAIB JAN".split("").map((char, i) => (
              <motion.span
                key={i}
                className="font-display font-black text-accent tracking-tighter inline-block"
                style={{ transformOrigin: "50% 100%", willChange: disableAnimation ? "auto" : "transform" }}
                animate={disableAnimation ? {} : {
                  y:       [0, -20, 0, -10, 0],
                  rotateX: [0,  8,  0,   4, 0],
                  rotateZ: [0,  1.5, 0, -1, 0],
                  scaleY:  [1, 1.04, 1, 1.02, 1],
                }}
                transition={{
                  duration: 3.2,
                  delay: i * 0.1,
                  repeat: disableAnimation ? 0 : 2,
                  repeatDelay: 5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char === " " ? "\u00a0" : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

// ─── macOS Browser Frame ─────────────────────────────────────────────────────
function BrowserFrame({
  src,
  alt,
  url,
  isDark,
}: {
  src: string;
  alt: string;
  url?: string;
  isDark: boolean;
}) {
  const barBg    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.10)";
  const urlBg    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const urlColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const border   = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden rounded-[24px] lg:rounded-[32px]"
      style={{ border: `1px solid ${border}` }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-3 px-4 py-[10px] flex-shrink-0"
        style={{ background: barBg }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[6px]">
          <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
        </div>
        {/* URL bar */}
        <div
          className="flex-1 rounded-md py-[5px] px-3 text-center"
          style={{ background: urlBg }}
        >
          <span
            className="font-mono text-[10px] leading-none truncate block"
            style={{ color: urlColor }}
          >
            {url ?? "—"}
          </span>
        </div>
        {/* Spacer to balance traffic lights */}
        <div className="w-[52px]" />
      </div>
      {/* Screenshot — fixed 16:9 so landscape screenshots fill without cropping or bars */}
      <div
        className={`relative w-full ${isDark ? "bg-[#111]" : "bg-white"}`}
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      </div>
    </div>
  );
}

// ─── Resume Modal ─────────────────────────────────────────────────────────────
const RESUME_SKILLS = [
  {
    category: "AI & Machine Learning",
    tags: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "BERT", "LangChain", "RAG Pipelines", "NLP", "Multi-Agent", "Voice Agent Automation", "OpenAI API", "Qdrant", "Embeddings", "Ollama", "Fine-Tuning", "Deep Learning"],
    accent: true,
  },
  {
    category: "Full-Stack & Cloud",
    tags: ["React.js", "Next.js", "Node.js", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "GCP", "TypeScript", "REST APIs", "Microservices"],
    accent: false,
  },
  {
    category: "Mobile & Product",
    tags: ["Flutter", "iOS", "Android", "Firebase", "Kotlin", "Java", "App Store"],
    accent: false,
  },
  {
    category: "Data & Analytics",
    tags: ["Apache Spark", "ETL Pipelines", "Tableau", "Power BI", "Plotly", "Seaborn", "EDA", "SQL", "Statistical Analysis"],
    accent: false,
  },
];

function ResumeModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-3 md:inset-6 lg:inset-10 z-[201] flex flex-col rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
        initial={{ opacity: 0, scale: 0.95, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0a0a0a] border-b border-white/[0.08] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-[11px] tracking-widest uppercase text-white/40 ml-2">
              Huraib Jan — Resume
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/Resume-HuraibJan.pdf"
              download="Huraib-Jan-Resume.pdf"
              className="font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-accent text-dark hover:bg-accent/85 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Download PDF ↓
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors ml-1"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div className="flex-1 overflow-y-auto bg-[#0f0f0f]">
          <div className="max-w-[900px] mx-auto px-6 md:px-10 py-10 md:py-14">

            {/* Header */}
            <div className="mb-10 pb-8 border-b border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <h1 className="font-display font-black text-4xl md:text-5xl text-white tracking-tighter leading-none mb-2">
                    HURAIB JAN
                  </h1>
                  <p className="font-mono text-sm text-accent tracking-widest uppercase">AI Systems Engineer</p>
                </div>
                <div className="flex flex-col gap-1.5 sm:items-end">
                  <a href="mailto:huraibjansarhandi@gmail.com" className="font-mono text-[11px] text-white/50 hover:text-accent transition-colors tracking-wide">
                    huraibjansarhandi@gmail.com
                  </a>
                  <span className="font-mono text-[11px] text-white/40 tracking-wide">Montclair, NJ, USA</span>
                  <div className="flex gap-3">
                    <a href="https://github.com/huraibjan" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-white/40 hover:text-accent transition-colors tracking-wide">
                      github.com/huraibjan
                    </a>
                    <a href="https://linkedin.com/in/huraibjan" target="_blank" rel="noreferrer" className="font-mono text-[11px] text-white/40 hover:text-accent transition-colors tracking-wide">
                      linkedin.com/in/huraibjan
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-12 items-start">

              {/* Left: Experience + Education */}
              <div className="space-y-10">

                {/* Experience */}
                <div>
                  <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-6">Experience</h2>
                  <div className="space-y-8">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} className="relative pl-4 border-l border-white/[0.08] hover:border-accent/50 transition-colors group">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                          <div>
                            <h3 className="font-display font-bold text-white text-base leading-tight">{exp.role}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-xs text-accent/80 font-bold">{exp.company}</span>
                              <span className="font-mono text-[10px] text-white/30 border border-white/[0.1] rounded-full px-2 py-0.5">{exp.type}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-[10px] text-white/40 block">{exp.period}</span>
                            <span className="font-mono text-[10px] text-white/25 block">{exp.location}</span>
                          </div>
                        </div>
                        <p className="text-white/50 text-[13px] leading-relaxed mb-3">{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.highlights.map((tag) => (
                            <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50 group-hover:bg-accent/10 group-hover:text-accent/70 transition-colors border border-white/[0.06]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-6">Education</h2>
                  <div className="space-y-6">
                    {EDUCATION.map((edu, i) => (
                      <div key={i} className="relative pl-4 border-l border-white/[0.08] hover:border-accent/50 transition-colors group">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                          <div>
                            <h3 className="font-display font-bold text-white text-base leading-tight">{edu.degree}</h3>
                            <span className="font-mono text-xs text-accent/80 font-bold">{edu.school}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-[10px] text-white/40 block">{edu.period}</span>
                            <span className="font-mono text-[10px] text-white/25 block">{edu.location}</span>
                            <span className="font-mono text-[10px] text-accent/60 block">GPA {edu.gpa}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {edu.courses.map((c) => (
                            <span key={c} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40 border border-white/[0.06]">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Skills */}
              <div className="space-y-7 lg:pt-0">
                <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-6">Skills</h2>
                {RESUME_SKILLS.map((group) => (
                  <div key={group.category}>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white/30 block mb-2">{group.category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-mono text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                            group.accent
                              ? "bg-accent/10 text-accent/80 border-accent/20"
                              : "bg-white/[0.05] text-white/45 border-white/[0.08]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#0a0a0a] px-5 py-2.5 border-t border-white/[0.08] flex-shrink-0 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Press ESC to close</span>
          <a
            href="/Resume-HuraibJan.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[9px] uppercase tracking-widest text-white/30 hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Open PDF ↗
          </a>
        </div>
      </motion.div>
    </>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
const AI_TAGS = new Set([
  "ai", "ml", "rag", "llm", "bert", "gpt", "openai", "xgboost", "nlp",
  "pytorch", "tensorflow", "voice agent automation", "voice ai", "multi-agent",
  "agents", "embeddings", "langchain", "qdrant", "rag pipelines", "deep learning",
]);

function isAITag(tag: string) {
  return AI_TAGS.has(tag.toLowerCase()) || /\b(ai|ml|rag|llm|bert|gpt|openai|xgboost|nlp|pytorch|tensorflow|agent|embed|voice ai|voice agent)\b/i.test(tag);
}

function ProjectModal({ project, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const hasAI      = project.tech.some(isAITag);
  const liveLink   = project.links?.find((l) => !/github/i.test(l.label) && !/ios|app store/i.test(l.label));
  const githubLink = project.links?.find((l) => /github/i.test(l.label));
  const appLink    = project.links?.find((l) => /ios|app store/i.test(l.label));

  const allSlides = project.gallery?.length
    ? project.gallery
    : [{ label: project.name, src: project.image, kind: "website" as const }];

  const [slide, setSlide] = useState(0);
  const [dir, setDir]     = useState(1);

  const goTo = (next: number, d: number) => { setDir(d); setSlide(next); };
  const goPrev = () => goTo((slide - 1 + allSlides.length) % allSlides.length, -1);
  const goNext = () => goTo((slide + 1) % allSlides.length, 1);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") { setDir(1);  setSlide(s => (s + 1) % allSlides.length); }
      if (e.key === "ArrowLeft")  { setDir(-1); setSlide(s => (s - 1 + allSlides.length) % allSlides.length); }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, allSlides.length]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const renderSlide = (s: NonNullable<Project["gallery"]>[0]) => {
    if (s.kind === "mobile-group") {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full max-w-5xl">
            <MobileScreensComposition screens={s.screens ?? [{ label: s.label, src: s.src }]} />
          </div>
        </div>
      );
    }

    if (s.kind === "mobile") {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="relative h-[86%] flex-shrink-0" style={{ aspectRatio: "393/852" }}>
            <div className="absolute inset-0 rounded-[14%] bg-[#1c1c1e] shadow-[0_24px_60px_rgba(0,0,0,0.7),inset_0_0_0_1.5px_rgba(255,255,255,0.1)]">
              <div className="absolute left-[-2px] top-[22%] w-[2px] h-[7%] rounded-l-full bg-[#2c2c2e]" />
              <div className="absolute left-[-2px] top-[32%] w-[2px] h-[11%] rounded-l-full bg-[#2c2c2e]" />
              <div className="absolute right-[-2px] top-[30%] w-[2px] h-[14%] rounded-r-full bg-[#2c2c2e]" />
              <div className="absolute inset-[3.5%] rounded-[11%] overflow-hidden bg-black">
                <Image src={s.src} alt={s.label} fill sizes="320px" className="object-contain" />
                <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[28%] h-[4%] rounded-full bg-black z-10" />
                <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[30%] h-[0.6%] rounded-full bg-white/35 z-10" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (s.kind === "website") {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full">
            <BrowserFrame src={s.src} alt={s.label} url={liveLink?.href.replace(/^https?:\/\//, "")} isDark />
          </div>
        </div>
      );
    }
    // desktop — 16:9 container, full image visible
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#111]" style={{ aspectRatio: "16/9" }}>
          <div className="relative w-full h-full">
            <Image src={s.src} alt={s.label} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-contain" />
          </div>
        </div>
      </div>
    );
  };

  const stagger = (i: number) => ({ duration: 0.45, delay: 0.15 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] });

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="fixed inset-3 md:inset-6 lg:inset-10 z-[201] flex flex-col lg:flex-row overflow-hidden rounded-[28px] md:rounded-[36px] bg-[#0a0a0a] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
        initial={{ opacity: 0, scale: 0.94, y: 48 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Lime grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.022] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(200,241,53,1) 1px,transparent 1px),linear-gradient(90deg,rgba(200,241,53,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/8 hover:bg-white/16 border border-white/12 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 1l11 11M12 1L1 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── LEFT: Gallery Slider ── */}
        <div className="relative w-full lg:w-[52%] h-[42vh] lg:h-full flex-shrink-0 bg-white/[0.02] flex flex-col overflow-hidden">
          {/* Watermark */}
          <span className="absolute inset-0 flex items-center justify-center font-display font-black text-[18rem] text-white/[0.025] select-none pointer-events-none leading-none z-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Slide counter */}
          {allSlides.length > 1 && (
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-white/50 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              {slide + 1} / {allSlides.length}
            </div>
          )}

          {/* Slide area */}
          <div className="flex-1 relative overflow-hidden p-4 md:p-7 z-10">
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.div
                key={slide}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-4 md:inset-7"
              >
                {renderSlide(allSlides[slide])}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {allSlides.length > 1 && (
            <div className="flex-shrink-0 flex items-center justify-between px-5 pb-4 z-10">
              <button
                onClick={goPrev}
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="flex gap-2 items-center">
                {allSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDir(i > slide ? 1 : -1); setSlide(i); }}
                    className={`rounded-full transition-all duration-200 ${i === slide ? "w-5 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/45"}`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          )}

          {/* Mobile fade */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none lg:hidden z-20" />
        </div>

        {/* ── RIGHT: Details (scrollable) ── */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="flex flex-col gap-7 p-6 md:p-8 lg:p-10 pb-10">

            {/* Category + badges */}
            <motion.div className="flex flex-wrap items-center gap-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={stagger(0)}>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">{project.category}</span>
              {hasAI && (
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/12 border border-accent/30 text-accent">
                  AI / ML
                </span>
              )}
              {allSlides.some(s => s.kind === "mobile" || s.kind === "mobile-group") && (
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/6 border border-white/15 text-white/50">
                  Mobile App
                </span>
              )}
            </motion.div>

            {/* Name */}
            <motion.h2
              className="font-display font-black text-white tracking-tight leading-[0.92]"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(1)}
            >
              {project.name}
            </motion.h2>

            {/* Links — shown right below the title */}
            {(liveLink || githubLink || appLink) && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(2)}
              >
                {liveLink && (
                  <a
                    href={liveLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-accent text-dark hover:bg-accent/85 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    {liveLink.label}
                  </a>
                )}
                {githubLink && (
                  <a
                    href={githubLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/75 hover:bg-white/14 hover:text-white transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
                {appLink && (
                  <a
                    href={appLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/75 hover:bg-white/14 hover:text-white transition-colors"
                  >
                    <svg viewBox="0 0 814 1000" width="11" height="11" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 537.8 37.5 339.9 37.5 337.7v-10.6c0-127.4 83.1-194 164.3-194 44.4 0 81.1 29.3 108.7 29.3 26.3 0 67.4-31.5 118.7-31.5 19.2 0 108.2 1.9 163.7 93.3zm-202.6-333.8c24.9-29.3 42.2-70.1 42.2-110.9 0-5.8-.6-11.6-1.3-16.8-40.2 1.3-88.2 26.3-116.5 58.1-22.4 25.7-43.7 66.4-43.7 107.9 0 6.4.6 12.8 1.3 18.9 4.5.6 9 1.3 13.5 1.3 36.4.1 79.4-23.6 104.5-58.5z"/></svg>
                    App Store
                  </a>
                )}
              </motion.div>
            )}

            {/* Description */}
            <motion.p className="text-white/60 text-sm md:text-[15px] leading-relaxed" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={stagger(2)}>
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={stagger(3)}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
                      isAITag(t)
                        ? "bg-accent/10 border-accent/35 text-accent"
                        : "bg-white/[0.05] border-white/12 text-white/55"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Impact */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={stagger(4)}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">Key Impact</p>
              <div className="flex flex-col gap-2.5">
                {project.impact.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-white/65 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Role */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={stagger(5)}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">My Role</p>
              <p className="text-white/50 text-sm leading-relaxed">{project.role}</p>
            </motion.div>

            {/* ESC hint */}
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/18 text-right mt-auto">Press ESC to close</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Project Card (Sticky Stack) ─────────────────────────────────────────────
function ProjectCard({
  project,
  i,
  colors,
  total,
  onOpen,
}: {
  project: (typeof projects)[number];
  i: number;
  colors: (typeof CARD_COLORS)[number];
  total: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const liveLink = project.links?.find((l) => !/github/i.test(l.label) && !/ios|app store/i.test(l.label));
  const appLink  = project.links?.find((l) => /ios|app store/i.test(l.label));

  // Final "view all" card
  if (i === total) {
    return (
      <div
        ref={ref}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: i + 1,
          width: "100%",
          overflow: "hidden",
          willChange: "transform",
          // bg-light covers whatever's behind at the edges
          backgroundColor: "#F2F2F2",
        }}
        className="flex items-center justify-center p-2 md:p-4"
      >
        <motion.div style={{ scale }} className="w-full h-full">
          <Link
            href="/projects"
            className="flex items-center justify-center w-full h-full rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer"
            style={{ backgroundColor: "#c8f135" }}
          >
            <div className="relative overflow-hidden text-center group px-8">
              <p className="font-display font-black text-5xl sm:text-7xl md:text-[8rem] lg:text-[9rem] tracking-tighter text-dark text-center uppercase transition-all duration-500 ease-out group-hover:-translate-y-[150%] group-hover:opacity-0">
                MORE PROJECTS (...)
              </p>
              <p className="absolute inset-x-0 top-0 font-display font-black text-5xl sm:text-7xl md:text-[8rem] lg:text-[9rem] tracking-tighter text-dark text-center uppercase translate-y-[150%] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                VIEW ALL →
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: i + 1,
        width: "100%",
        overflow: "hidden",
        willChange: "transform",
        // First card covers the hero edges; others are transparent so previous cards show
        backgroundColor: i === 0 ? "#F2F2F2" : "transparent",
      }}
      className="flex items-center justify-center p-2 md:p-4"
    >
      <motion.div
        style={{ scale, backgroundColor: colors.bg, color: colors.text }}
        className="relative flex flex-col lg:flex-row w-full h-full rounded-[32px] md:rounded-[48px] overflow-hidden px-8 md:px-16 lg:px-20 pt-28 md:pt-36 pb-8 md:pb-16"
      >
        {/* Left column */}
        <div className="flex flex-col w-full lg:w-5/12 gap-8 lg:gap-0 lg:h-full lg:justify-between z-10">
          <div>
            <span
              className="font-mono text-xs md:text-sm tracking-widest uppercase font-semibold block mb-4 md:mb-8"
              style={{ color: colors.label }}
            >
              (PROJECTS)
            </span>
            <h2
              className="font-display font-black tracking-tighter leading-[0.9] break-words"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 6.5rem)" }}
            >
              {project.name}
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:gap-24">
            <div className="flex items-center justify-between w-full lg:w-4/5">
              <div className="w-8 h-8 rotate-45 ml-1 shrink-0" style={{ backgroundColor: colors.text }} />
              <button
                onClick={() => onOpen(project)}
                className="font-semibold text-sm tracking-wide font-mono uppercase hover:opacity-60 transition-opacity"
              >
                View Project
              </button>
            </div>

            <div className="flex flex-col gap-4 font-mono text-[10px] lg:text-xs uppercase tracking-wide opacity-80">
              <div className="grid grid-cols-3 gap-4">
                <span className="col-span-1 opacity-60">Category:</span>
                <span className="col-span-2 font-medium">{project.category}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="col-span-1 opacity-60">Tech Stack:</span>
                <span className="col-span-2 font-medium">{project.tech.slice(0, 4).join(", ")}</span>
              </div>
              {liveLink && (
                <div className="grid grid-cols-3 gap-4">
                  <span className="col-span-1 opacity-60">Website:</span>
                  <a
                    href={liveLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 font-medium underline underline-offset-4 hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {liveLink.label} ↗
                  </a>
                </div>
              )}
              {appLink && (
                <div className="grid grid-cols-3 gap-4 items-center">
                  <span className="col-span-1 opacity-60">iOS App:</span>
                  <a
                    href={appLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 inline-flex items-center gap-2 bg-white text-black rounded-xl px-3 py-1.5 hover:bg-white/85 transition-colors w-fit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Apple logo */}
                    <svg viewBox="0 0 814 1000" className="w-4 h-4 shrink-0 fill-black">
                      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.8-49.1 189.2-49.1 30.8 0 108.2 2.6 168.6 71.3zm-457.4-187.8c3.2-22.4 14.1-51.3 33.5-75.2 21.1-26.3 58.1-45.8 92.2-47.4 3.8 26.9-6.7 53.8-26.3 72.6-19.6 18.8-54.5 32.6-99.4 50z"/>
                    </svg>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[8px] font-normal tracking-wide">Download on the</span>
                      <span className="text-[12px] font-semibold tracking-tight">App Store</span>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Image in macOS browser frame */}
        <div
          className="w-full lg:w-7/12 mt-8 lg:mt-0 lg:ml-8 lg:self-center cursor-pointer group"
          onClick={() => onOpen(project)}
        >
          <BrowserFrame
            src={project.image}
            alt={project.name}
            url={liveLink?.href.replace(/^https?:\/\//, "")}
            isDark={colors.bg === "#0a0a0a"}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Work Section ─────────────────────────────────────────────────────────────
function WorkSection({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  return (
    <section id="work-section" className="w-full bg-light relative z-10">
      <div className="w-full flex flex-col items-center relative">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            i={i}
            colors={CARD_COLORS[i % CARD_COLORS.length]}
            total={projects.length}
            onOpen={onSelectProject}
          />
        ))}
        {/* View All card */}
        <ProjectCard
          key="view-all"
          project={projects[0]}
          i={projects.length}
          colors={CARD_COLORS[0]}
          total={projects.length}
          onOpen={onSelectProject}
        />
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const isMobile = useIsMobile();
  return (
    <WarpBackground
      id="about-section"
      className="py-24 md:py-32 lg:py-40 bg-light px-6 md:px-12"
      gridColor="rgba(10,10,10,0.06)"
      beamsPerSide={isMobile ? 0 : 4}
      beamSize={5}
      beamDuration={6}
      beamDelayMax={4}
      perspective={120}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-mono text-xs tracking-widest uppercase text-secondary">(ABOUT)</span>
            <div className="w-full max-w-[240px] aspect-[4/5] overflow-hidden rounded-2xl relative">
              <Image
                src="/profile.jpg"
                alt="Huraib Jan"
                fill
                className="object-cover object-top"
                sizes="240px"
                priority
              />
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="lg:col-span-9"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark leading-[1.15] mb-12">
              I&apos;m an AI Systems Engineer with an M.S. in Data Science from Montclair State University — building production-grade AI systems, full-stack platforms, and mobile apps.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-secondary text-base md:text-lg leading-relaxed">
              <p>
                My work spans AI agents, RAG pipelines, voice agent automation, mobile apps, and full-stack systems. I build from architecture to deployment — backend, database, AI workflow, dashboard, and business-facing presentation all the way through.
              </p>
              <p>
                Strongest in product execution: every system I ship is designed to run in production, not just demo well. Currently open to AI Systems and full-stack roles in the U.S.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-28 pt-12 border-t border-dark/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="font-display text-4xl md:text-5xl font-bold text-dark mb-2">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="font-mono text-xs tracking-widest uppercase text-secondary">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </WarpBackground>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
function FlowingExperienceMenu() {
  return (
    <motion.div
      className="experience-flow-wrap"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="experience-flow-menu" aria-label="Work experience">
        {EXPERIENCE.map((exp, index) => (
          <FlowingExperienceItem key={exp.company + exp.period} exp={exp} index={index} />
        ))}
      </nav>
    </motion.div>
  );
}

function FlowingExperienceItem({ exp, index }: { exp: (typeof EXPERIENCE)[number]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const repetitions = 5;

  const findClosestEdge = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const item = itemRef.current;
    if (!item) return "top";

    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const topEdge = (x - rect.width / 2) ** 2 + y ** 2;
    const bottomEdge = (x - rect.width / 2) ** 2 + (y - rect.height) ** 2;

    return topEdge < bottomEdge ? "top" : "bottom";
  }, []);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!marqueeRef.current || !marqueeInnerRef.current) return;

      const edge = findClosestEdge(event);
      gsap
        .timeline({ defaults: { duration: 0.62, ease: "expo.out" } })
        .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
        .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
    },
    [findClosestEdge]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!marqueeRef.current || !marqueeInnerRef.current) return;

      const edge = findClosestEdge(event);
      gsap
        .timeline({ defaults: { duration: 0.62, ease: "expo.out" } })
        .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
        .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
    },
    [findClosestEdge]
  );

  return (
    <div ref={itemRef} className="experience-flow-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="experience-flow-link">
        <span className="experience-flow-number">0{index + 1}</span>
        <div className="experience-flow-title">
          <h3>{exp.company}</h3>
          <p>{exp.role}</p>
        </div>
        <div className="experience-flow-meta">
          <strong>{exp.period}</strong>
          <span>{exp.location}</span>
          <small>{exp.type}</small>
        </div>
      </div>

      <div ref={marqueeRef} className="experience-flow-marquee" aria-hidden="true">
        <div className="experience-flow-marquee-wrap">
          <div ref={marqueeInnerRef} className="experience-flow-marquee-inner">
            {[...Array(repetitions)].map((_, repeatedIndex) => (
              <div className="experience-flow-part" key={repeatedIndex}>
                <span>{exp.company}</span>
                <strong>{exp.impact}</strong>
                <small>{exp.highlights.join(" / ")}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <>
      {/* ── Work Experience — light bg (matches About) ── */}
      <section id="experience-section" className="py-24 md:py-32 lg:py-40 bg-light px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
            <motion.div
              className="lg:col-span-9"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="font-mono text-xs tracking-widest uppercase text-secondary block mb-6">(EXPERIENCE)</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-dark">
                Where I&apos;ve Worked
              </h2>
            </motion.div>
            <motion.div
              className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col items-start lg:items-end gap-1">
                <span className="font-display font-black text-5xl md:text-6xl text-dark tracking-tighter leading-none">10+</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-secondary">Years of Experience</span>
              </div>
              <span className="font-mono text-[10px] text-secondary/60 tracking-widest">{EXPERIENCE.length} positions</span>
            </motion.div>
          </div>

          <FlowingExperienceMenu />
        </div>
      </section>

      {/* ── Education — dark bg ── */}
      <section className="py-20 md:py-28 bg-dark px-6 md:px-12 relative overflow-hidden">
        {/* Subtle lime grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,241,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,241,53,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-7xl mx-auto w-full relative">
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-widest uppercase text-white/60">(EDUCATION)</span>
          </motion.div>

          <div>
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.school}
                className="border-t border-white/15 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-6 lg:gap-10 group"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Period + badge */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                  <span className="font-mono text-sm font-semibold text-white group-hover:text-accent transition-colors duration-300">{edu.period}</span>
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border w-fit"
                    style={{ borderColor: "rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.75)" }}
                  >
                    Education
                  </span>
                  <span className="text-[10px] font-mono text-white/55 uppercase tracking-wide">{edu.location}</span>
                </div>

                {/* School + degree + GPA */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <h3
                    className="font-display font-black tracking-tight text-white leading-[1.05] group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(1.3rem, 2.4vw, 2rem)" }}
                  >
                    {edu.school}
                  </h3>
                  <p className="font-mono text-[11px] text-white/70 uppercase tracking-wide">{edu.degree}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wide">GPA</span>
                    <span className="text-[11px] font-mono font-bold text-white group-hover:text-accent transition-colors duration-300">{edu.gpa}</span>
                  </div>
                </div>

                {/* Coursework */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/55">Relevant Coursework</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-white/15" />
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const activeService = SERVICES.find((s) => s.number === openModal);

  return (
    <section id="services-section" className="py-24 md:py-32 lg:py-40 bg-light px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28">
          <div className="lg:col-span-9">
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-dark"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What I Build
            </motion.h2>
          </div>
          <motion.div
            className="lg:col-span-3 flex justify-start lg:justify-end items-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-xs tracking-widest uppercase text-secondary">(SERVICES)</span>
          </motion.div>
        </div>

        <div className="space-y-0">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 md:py-16 border-t border-dark/10 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="lg:col-span-2 flex items-start">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: -12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-lg">
                    <span className="font-display text-xl md:text-2xl font-bold text-dark rotate-6 group-hover:rotate-0 transition-transform duration-500">
                      {service.number}
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-4 flex items-center">
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-dark">
                  {service.title}
                </h3>
              </div>

              <div className="lg:col-span-6">
                <p className="text-secondary text-base md:text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono text-dark/70 bg-dark/5 border border-dark/10 px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {service.moreSkills.length > 0 && (
                    <button
                      onClick={() => setOpenModal(service.number)}
                      className="text-xs font-mono font-bold text-dark bg-accent border border-accent/60 px-3 py-1.5 rounded-full hover:bg-dark hover:text-accent hover:border-dark transition-all duration-200 cursor-pointer"
                    >
                      +{service.moreSkills.length} More
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-dark/10" />
        </div>
      </div>

      {/* ── Skills Modal ── */}
      <AnimatePresence>
        {openModal && activeService && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-dark/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpenModal(null)}
            />
            {/* Panel */}
            <motion.div
              className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-full md:max-w-2xl"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="bg-dark rounded-t-[32px] md:rounded-[32px] p-8 md:p-10 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/35 block mb-2">
                      {activeService.number} · All Skills
                    </span>
                    <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
                      {activeService.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setOpenModal(null)}
                    className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors shrink-0 ml-4"
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Core skills */}
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">Core</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeService.skills.map((s) => (
                    <span key={s} className="text-xs font-mono font-bold text-dark bg-accent px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Extended skills */}
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">Extended</p>
                <div className="flex flex-wrap gap-2">
                  {activeService.moreSkills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono text-white/60 bg-white/[0.06] border border-white/10 px-3 py-1.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="footer-section" className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
      <div className="fixed bottom-0 left-0 w-full h-[85vh] md:h-[90vh] bg-dark px-6 md:px-12 pt-16 md:pt-24 pb-8 flex flex-col justify-between z-0 will-change-transform [backface-visibility:hidden]">
        {/* Top */}
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-between gap-16">
          <div className="flex flex-col w-full lg:w-1/2">
            <span className="font-mono text-xs tracking-widest uppercase text-white/50 mb-8 md:mb-12">
              (LET&apos;S CONNECT)
            </span>
            <a
              href="mailto:huraibjansarhandi@gmail.com"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight hover:text-accent transition-colors duration-300 break-all mb-4"
            >
              huraibjansarhandi
              <br />@gmail.com
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-32 w-full lg:w-1/2 justify-start lg:justify-end">
            <div className="flex flex-col">
              <span className="font-mono text-xs tracking-widest uppercase text-white/50 mb-6 md:mb-8">(FOLLOW)</span>
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { label: "GITHUB", href: "https://github.com/huraibjan" },
                  { label: "LINKEDIN", href: "https://linkedin.com/in/huraibjan" },
                  { label: "EMAIL", href: "mailto:huraibjansarhandi@gmail.com" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-white text-xs md:text-sm font-semibold hover:text-accent transition-colors uppercase tracking-wide"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-xs tracking-widest uppercase text-white/50 mb-6 md:mb-8">(NAVIGATE)</span>
              <div className="flex flex-col gap-3 md:gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
                    className="text-white text-xs md:text-sm font-semibold hover:text-accent transition-colors uppercase tracking-wide cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Giant branding */}
        <div className="w-full max-w-[1800px] mx-auto flex flex-col items-center justify-end relative mt-12 md:mt-0">
          <div className="w-full flex justify-end px-4 mb-2">
            <span className="text-white text-[10px] md:text-xs font-mono opacity-70">
              © {new Date().getFullYear()} by{" "}
              <span className="text-accent">HURAIB JAN</span>
              <span className="opacity-50 mx-2">·</span>
              AI Systems Engineer
            </span>
          </div>
          <div className="w-full overflow-hidden flex justify-center items-end">
            <h1
              className="font-display font-black text-accent leading-[0.75] tracking-tighter text-center whitespace-nowrap select-none w-full"
              style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
            >
              HURAIB JAN
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function PortfolioHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ project: Project; index: number } | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.project.slug}
            project={selectedProject.project}
            index={selectedProject.index}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal key="resume-modal" onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-dark text-dark selection:bg-accent selection:text-dark">
        <Navbar onResumeOpen={() => setResumeOpen(true)} />
        <main className="relative z-10 bg-light rounded-b-[48px] md:rounded-b-[80px] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
          <HeroSection onResumeOpen={() => setResumeOpen(true)} />
          <WorkSection
            onSelectProject={(p) =>
              setSelectedProject({ project: p, index: projects.indexOf(p) })
            }
          />
          <AboutSection />
          <ExperienceSection />
          <ServicesSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
