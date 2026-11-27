"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Lightbulb, Box, Palette, Mic } from "lucide-react";
import { deck } from "@/content/masterclass";
import { useScroller, usePager } from "../Scroll";

export default function Hero() {
  const d = deck.hero;
  const ref = useRef<HTMLElement>(null);
  const scroller = useScroller();
  const { goTo } = usePager();
  const { scrollYProgress } = useScroll({ target: ref, container: scroller, offset: ["start start", "end start"] });

  // Parallax layers: far hills move least, near hills most; title floats up and fades.
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const planeX = useTransform(scrollYProgress, [0, 1], ["0vw", "40vw"]);
  const planeY = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);

  return (
    <section
      ref={ref}
      id="start"
      data-section
      className="relative snap-start min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-5"
    >
      {/* Deeper dawn wash at the top so the white title reads well */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7f88f5]/70 via-[#a9a3ff]/30 to-transparent pointer-events-none" />

      {/* Title block */}
      <motion.div style={{ y: titleY, opacity: titleO }} className="relative z-10 text-center -mt-16">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.28em] text-white/90"
        >
          {d.eyebrow}
        </motion.p>

        <h1
          className="mt-5 font-display font-extrabold uppercase text-white leading-[0.92] tracking-tight"
          style={{ textShadow: "0 6px 40px rgba(70,60,170,0.35)" }}
        >
          {d.title.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 40, letterSpacing: "0.12em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "-0.01em" }}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${
                i === 1 ? "text-[clamp(34px,8.6vw,128px)]" : "text-[clamp(40px,7vw,104px)]"
              }`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {d.words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.12, type: "spring", bounce: 0.45 }}
              className="rounded-full bg-white/85 backdrop-blur px-4 py-1.5 font-display text-[13px] sm:text-[15px] font-semibold text-ink shadow-sm"
            >
              {w}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/70 backdrop-blur px-4 py-2 text-[15px] sm:text-[17px] font-semibold text-ink"
        >
          <Sparkles size={17} className="text-coral" /> {d.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="mt-8">
          <button
            onClick={() => goTo("agenda")}
            className="group inline-flex items-center gap-2 rounded-xl bg-coral px-7 py-3.5 font-display text-[13px] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_12px_30px_-10px_rgba(240,84,122,0.8)] hover:bg-coral-deep transition-colors cursor-pointer"
          >
            {d.cta}
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Floating badges: Think / Build / Brand / Pitch */}
      {[
        { Icon: Lightbulb, pos: "left-[9%] top-[22%]", tint: "#e5e3ff", d: 0 },
        { Icon: Box, pos: "right-[10%] top-[20%]", tint: "#d9efff", d: 0.6 },
        { Icon: Palette, pos: "left-[7%] top-[62%]", tint: "#dcf6ee", d: 1.2 },
        { Icon: Mic, pos: "right-[7%] top-[60%]", tint: "#ffe3ea", d: 1.8 },
      ].map(({ Icon, pos, tint, d }, k) => (
        <motion.div
          key={k}
          style={{ y: titleY }}
          className={`absolute ${pos} z-10 hidden lg:block pointer-events-none`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + d * 0.3, type: "spring", bounce: 0.5 }}
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 5 + k, ease: "easeInOut", delay: d }}
            className="w-16 h-16 rounded-[22px] bg-white/80 border border-white shadow-[0_18px_40px_-15px_rgba(60,50,160,0.55)] flex items-center justify-center"
          >
            <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-ink" style={{ background: tint }}>
              <Icon size={22} />
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Paper plane: AI as co-pilot */}
      <motion.div style={{ x: planeX, y: planeY }} className="absolute left-[12%] top-[58%] z-10 pointer-events-none" aria-hidden>
        <motion.div animate={{ y: [0, -10, 0], rotate: [-4, 2, -4] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
          <svg width="120" height="70" viewBox="0 0 120 70">
            <path d="M2 60 C 30 50, 50 66, 70 40" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 6" opacity="0.9" />
            <path d="M70 40 L118 14 L84 52 Z" fill="white" />
            <path d="M70 40 L118 14 L92 40 Z" fill="#ffe3ea" />
            <path d="M84 52 L88 42 L118 14 Z" fill="#f0547a" opacity="0.85" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Layered hills */}
      <div className="absolute inset-x-0 bottom-0 h-[42vh] pointer-events-none" aria-hidden>
        <motion.svg style={{ y: farY }} className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0 220 C 200 120, 380 160, 560 190 S 900 90, 1100 150 S 1360 200, 1440 160 V400 H0 Z" fill="#cfc8ff" opacity="0.9" />
        </motion.svg>
        <motion.svg style={{ y: midY }} className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0 280 C 240 210, 420 260, 640 250 S 1000 190, 1220 240 S 1400 270, 1440 250 V400 H0 Z" fill="#c4ecdf" />
        </motion.svg>
        <motion.svg style={{ y: nearY }} className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0 340 C 300 300, 520 350, 760 330 S 1180 290, 1440 320 V400 H0 Z" fill="#ffd9c8" />
          <path d="M0 370 C 360 350, 700 385, 1000 365 S 1300 360, 1440 372 V400 H0 Z" fill="#ffeee5" />
        </motion.svg>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-ink-soft"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
