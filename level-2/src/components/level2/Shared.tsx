"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/** Colour accents. Blue = deck default. Rose = Reel slide. Emerald = Shark Tank slide. */
export type Accent = "blue" | "rose" | "emerald";

const chipStyles: Record<Accent, string> = {
  blue: "bg-blue-600 text-white border-blue-800",
  rose: "bg-rose-600 text-white border-rose-800",
  emerald: "bg-emerald-600 text-white border-emerald-800",
};

const titleStyles: Record<Accent, string> = {
  blue: "text-blue-700",
  rose: "text-rose-600",
  emerald: "text-emerald-600",
};

export function Chip({ children, accent = "blue" }: { children: ReactNode; accent?: Accent }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`inline-block px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-[0.2em] border-2 shadow-sm ${chipStyles[accent]}`}
    >
      {children}
    </motion.span>
  );
}

export function SlideTitle({
  children,
  accent = "blue",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`text-5xl font-black uppercase tracking-wide drop-shadow-sm leading-tight ${titleStyles[accent]} ${className}`}
      style={{ WebkitTextStroke: "1.5px #000" }}
    >
      {children}
    </motion.h2>
  );
}

export const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

export const rise = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, bounce: 0.35, duration: 0.6 } },
};

export const slideIn = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, bounce: 0.3, duration: 0.6 } },
};
