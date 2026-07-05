"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function WordReveal({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return (
    <motion.span style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
}

export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "start 0.28"],
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <WordReveal key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}
