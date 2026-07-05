"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroNodes() {
  const nodes = [
    { x: "12%", y: "24%", label: "LLM" },
    { x: "82%", y: "18%", label: "API" },
    { x: "72%", y: "66%", label: "RAG" },
    { x: "24%", y: "74%", label: "DB" },
    { x: "52%", y: "42%", label: "AI" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-[-20%] top-[-24%] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_58%)] blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-50">
        <line x1="12%" y1="24%" x2="52%" y2="42%" stroke="rgba(125,211,252,.35)" />
        <line x1="82%" y1="18%" x2="52%" y2="42%" stroke="rgba(196,181,253,.32)" />
        <line x1="72%" y1="66%" x2="52%" y2="42%" stroke="rgba(45,212,191,.28)" />
        <line x1="24%" y1="74%" x2="52%" y2="42%" stroke="rgba(125,211,252,.28)" />
      </svg>
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute flex h-14 w-14 items-center justify-center rounded-full border border-sky-300/30 bg-slate-950/70 text-xs font-semibold text-sky-100 shadow-glow backdrop-blur"
          style={{ left: node.x, top: node.y }}
          animate={{ y: [0, -14, 0], opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          {node.label}
        </motion.div>
      ))}
    </div>
  );
}
