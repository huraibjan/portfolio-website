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
} from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { WarpBackground } from "@/components/ui/warp-background";

// ─── Data ──────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    company: "Kodensoft",
    role: "AI / ML Engineer",
    period: "Jan 2025 — May 2026",
    location: "Saddle Brook, NJ, USA",
    type: "Full-Time",
    description:
      "Built scalable backend microservices for Flutter and web apps, ML models for classification and recommendation, RAG pipelines, multi-agent orchestration, and AI voice agent workflows integrated with Square, Toast, Clover, OpenTable, and Google Cloud. Developed real-time dashboards and automated document-heavy operational workflows.",
    highlights: ["RAG Pipelines", "Multi-Agent AI", "Voice AI (Vapi)", "ML Models", "Microservices", "Python"],
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
  },
  {
    company: "Koretechx Digital",
    role: "Web Developer",
    period: "Jun 2020 — Aug 2022",
    location: "Florida, USA (Remote)",
    type: "Full-Time",
    description:
      "Developed and maintained full-stack web applications using React.js and Node.js. Optimized cloud infrastructure and deployment pipelines, improving deployment efficiency by 30% through CI/CD workflows and modern web technologies.",
    highlights: ["React.js", "Node.js", "CI/CD", "Cloud Deployment", "UI/UX"],
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
      "Production AI agents, RAG pipelines, vector search, and voice automation. Full system design from model to deployment.",
    skills: ["RAG Pipelines", "PyTorch", "TensorFlow", "NLP", "Multi-Agent", "Vapi AI"],
    moreSkills: ["XGBoost", "BERT", "Scikit-learn", "Embeddings", "Computer Vision", "FastAPI", "Qdrant", "LangChain", "OpenAI API", "Model Training", "Hyperparameter Tuning", "Ensemble Methods", "Prompt Engineering", "Feature Engineering", "Deep Learning"],
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
  { label: "WORK", href: "#work-section" },
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
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 2000], [0, -1000]);

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
    <div className="h-screen w-full relative z-0">
      <motion.section
        id="hero-section"
        className="fixed top-0 left-0 w-full min-h-screen flex flex-col justify-between bg-light pt-24 md:pt-32 pb-12 overflow-hidden z-0 will-change-transform"
        style={{ y: yParallax }}
      >
        <TechBackground />

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

          {/* Right: Description */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-16 xl:pl-24 pb-8 lg:pb-24 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-secondary mb-4 block">
              (AVAILABLE FOR AI SYSTEMS ROLES)
            </span>
            <h2 className="text-dark font-display text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight font-semibold mb-4 max-w-lg">
              Hi, I&apos;m Huraib Jan.
            </h2>
            <p className="text-dark/70 font-display text-lg sm:text-xl md:text-2xl text-justify leading-snug tracking-tight font-medium max-w-lg">
              An AI Systems Engineer based in New Jersey. I ship production AI agents, RAG pipelines, voice automation, and full-stack products — end to end.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:huraibjansarhandi@gmail.com"
                className="font-mono text-xs tracking-widest uppercase text-dark/60 hover:text-accent transition-colors border-b border-dark/20 pb-0.5"
              >
                Email Me ↗
              </a>
              <a
                href="https://github.com/huraibjan"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase text-dark/60 hover:text-accent transition-colors border-b border-dark/20 pb-0.5"
              >
                GitHub ↗
              </a>
              <button
                onClick={onResumeOpen}
                className="font-mono text-xs tracking-widest uppercase font-bold px-4 py-1.5 rounded-full bg-dark text-accent border border-dark hover:bg-accent hover:text-dark transition-colors"
              >
                Resume ↗
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Giant name */}
        <motion.div
          className="w-full z-0 flex flex-col items-center justify-end overflow-hidden mt-4"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            className="font-display font-black text-accent leading-[0.8] tracking-tighter text-center whitespace-nowrap select-none w-full"
            style={{ fontSize: nameFontSize }}
          >
            HURAIB JAN
          </h1>
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
      {/* Screenshot */}
      <div className="flex-1 relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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
    tags: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "BERT", "LangChain", "RAG Pipelines", "NLP", "Multi-Agent", "Vapi AI", "OpenAI API", "Qdrant", "Embeddings", "Deep Learning"],
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
  "pytorch", "tensorflow", "vapi ai", "vapi", "voice ai", "multi-agent",
  "agents", "embeddings", "langchain", "qdrant", "rag pipelines", "deep learning",
]);

function isAITag(tag: string) {
  return AI_TAGS.has(tag.toLowerCase()) || /\b(ai|ml|rag|llm|bert|gpt|openai|xgboost|nlp|pytorch|tensorflow|vapi|agent|embed|voice ai)\b/i.test(tag);
}

function ProjectModal({ project, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const mobileShots = project.gallery?.filter((g) => g.kind === "mobile") ?? [];
  const hasWebShot  = project.gallery?.some((g) => g.kind === "website") ?? !!project.image;
  const showPhones  = mobileShots.length > 0 && !hasWebShot;
  const hasAI       = project.tech.some(isAITag);
  const liveLink    = project.links?.find((l) => !/github/i.test(l.label) && !/app store/i.test(l.label)) ?? project.links?.[0];
  const githubLink  = project.links?.find((l) => /github/i.test(l.label));
  const appLink     = project.links?.find((l) => /ios|app store/i.test(l.label));

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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

        {/* ── LEFT: Visual ── */}
        <div className="relative w-full lg:w-[52%] h-[38vh] lg:h-full flex-shrink-0 bg-white/[0.02] overflow-hidden flex items-center justify-center p-5 md:p-8">
          {/* Giant index watermark */}
          <span className="absolute inset-0 flex items-center justify-center font-display font-black text-[18rem] text-white/[0.025] select-none pointer-events-none leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>

          {showPhones ? (
            /* Phone mockups for mobile-only projects */
            <div className="flex items-center justify-center gap-3 h-full w-full">
              {mobileShots.slice(0, 3).map((shot, si) => (
                <div
                  key={si}
                  className="relative flex-shrink-0 h-[78%]"
                  style={{ aspectRatio: "393/852", transform: si === 1 ? "scale(1.07)" : "translateY(10px)", zIndex: si === 1 ? 2 : 1 }}
                >
                  <div className="absolute inset-0 rounded-[14%] bg-[#1c1c1e] shadow-[0_24px_60px_rgba(0,0,0,0.7),inset_0_0_0_1.5px_rgba(255,255,255,0.1)]">
                    <div className="absolute left-[-2px] top-[22%] w-[2px] h-[7%] rounded-l-full bg-[#2c2c2e]" />
                    <div className="absolute left-[-2px] top-[32%] w-[2px] h-[11%] rounded-l-full bg-[#2c2c2e]" />
                    <div className="absolute right-[-2px] top-[30%] w-[2px] h-[14%] rounded-r-full bg-[#2c2c2e]" />
                    <div className="absolute inset-[3.5%] rounded-[11%] overflow-hidden bg-black">
                      <Image src={shot.src} alt={shot.label} fill sizes="180px" className="object-cover object-top" />
                      <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[28%] h-[4%] rounded-full bg-black z-10" />
                      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[30%] h-[0.6%] rounded-full bg-white/35 z-10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Browser frame */
            <div className="w-full h-full">
              <BrowserFrame
                src={project.image}
                alt={project.name}
                url={liveLink?.href.replace(/^https?:\/\//, "")}
                isDark
              />
            </div>
          )}

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none lg:hidden" />
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
              {mobileShots.length > 0 && (
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

            {/* Links */}
            <motion.div
              className="flex flex-wrap gap-3 pt-4 border-t border-white/10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(6)}
            >
              {liveLink && (
                <a
                  href={liveLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full bg-accent text-dark hover:bg-accent/85 transition-colors"
                >
                  {liveLink.label} ↗
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full bg-white/7 border border-white/15 text-white/65 hover:bg-white/14 transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {appLink && (
                <a
                  href={appLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full bg-white/7 border border-white/15 text-white/65 hover:bg-white/14 transition-colors"
                >
                  App Store ↗
                </a>
              )}
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
  const liveLink = project.links?.[0];

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
        <div className="flex flex-col h-full w-full lg:w-5/12 justify-between z-10">
          <div>
            <span
              className="font-mono text-xs md:text-sm tracking-widest uppercase font-semibold block mb-8"
              style={{ color: colors.label }}
            >
              (WORK)
            </span>
            <h2
              className="font-display font-black tracking-tighter leading-[0.9] break-words"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 6.5rem)" }}
            >
              {project.name}
            </h2>
          </div>

          <div className="flex flex-col gap-12 lg:gap-24">
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
                  <span className="col-span-1 opacity-60">Source:</span>
                  <a
                    href={liveLink.href}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 font-medium underline underline-offset-4 hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {liveLink.label}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Image in macOS browser frame */}
        <div
          className="w-full lg:w-7/12 h-[38vh] lg:h-full mt-8 lg:mt-0 lg:ml-8 cursor-pointer group"
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
    <section id="work-section" className="w-full bg-transparent relative z-10">
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
  return (
    <WarpBackground
      id="about-section"
      className="py-24 md:py-32 lg:py-40 bg-light px-6 md:px-12"
      gridColor="rgba(10,10,10,0.06)"
      beamsPerSide={4}
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
                My work spans AI agents, RAG pipelines, voice automation, mobile apps, and full-stack systems. I build from architecture to deployment — backend, database, AI workflow, dashboard, and business-facing presentation all the way through.
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

          {/* Work entries */}
          <div>
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company + exp.period}
                className="border-t border-dark/10 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-6 lg:gap-10 group"
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Period + badge */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-secondary uppercase">0{i + 1}</span>
                  <span className="font-mono text-sm font-semibold text-dark group-hover:text-accent transition-colors duration-300 leading-snug">{exp.period}</span>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{
                        borderColor: exp.type === "Full-Time" ? "rgba(10,10,10,0.2)" : "rgba(10,10,10,0.15)",
                        color: exp.type === "Full-Time" ? "#0a0a0a" : "rgba(10,10,10,0.5)",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-secondary/70 uppercase tracking-wide">{exp.location}</span>
                </div>

                {/* Company + role */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <h3
                    className="font-display font-black tracking-tight text-dark leading-[1.05] group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
                  >
                    {exp.company}
                  </h3>
                  <p className="font-mono text-[11px] md:text-xs text-secondary uppercase tracking-wide">{exp.role}</p>
                </div>

                {/* Description + tags */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <p className="text-secondary text-sm md:text-[15px] leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-dark/5 border border-dark/10 text-dark/55 group-hover:border-dark/20 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-dark/10" />
          </div>
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
