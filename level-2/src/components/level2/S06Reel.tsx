"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ReelPlayer from "./ReelPlayer";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle, stagger, slideIn } from "./Shared";
import { Clapperboard, CheckCircle2, Sparkles, Scissors, MessagesSquare } from "lucide-react";

const headingIcons = [Scissors, MessagesSquare];

export default function S06Reel() {
  const d = level2Data.reel;
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <SceneWrapper>
      {/* Rose spotlight tint so this slide reads differently from the rest */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/70 via-transparent to-pink-100/60 pointer-events-none" />

      <div className="relative w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-10 px-4">
        {/* Left: brief */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, repeatDelay: 2 }}
              className="w-12 h-12 shrink-0 rounded-xl bg-rose-600 text-white flex items-center justify-center border-2 border-black origin-bottom-left"
            >
              <Clapperboard size={24} />
            </motion.div>
            <Chip accent="rose">{d.chip}</Chip>
          </div>
          <SlideTitle accent="rose" className="mt-4 text-[44px]">
            {d.title}
          </SlideTitle>
          <p className="mt-2 text-xl font-bold text-gray-700">{d.intro}</p>

          <p className="mt-5 text-base font-black uppercase tracking-[0.2em] text-rose-600">{d.mustInclude}</p>
          <motion.div variants={stagger} initial="hidden" animate="show" className="mt-2 flex flex-col gap-2">
            {d.items.map((item) => (
              <motion.div
                key={item}
                variants={slideIn}
                className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-rose-200 shadow-sm"
              >
                <CheckCircle2 size={20} className="text-rose-500 shrink-0" />
                <span className="text-[16px] font-semibold text-gray-800 leading-snug">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-4 flex items-center gap-2 text-lg font-black text-gray-900"
          >
            <Sparkles size={20} className="text-rose-500 shrink-0" /> {d.inspiration}
          </motion.div>
        </div>

        {/* Right: two playable reels */}
        <div className="shrink-0 flex gap-7">
          {d.videos.map((v, i) => {
            const Icon = headingIcons[i];
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.25, type: "spring", bounce: 0.35 }}
                className="flex flex-col items-center"
              >
                <div className="mb-3 flex items-center gap-2.5 self-start">
                  <span className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center border-2 border-black shrink-0">
                    <Icon size={18} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-lg font-black uppercase tracking-wide text-gray-900">
                      0{i + 1}. {v.heading}
                    </p>
                    <p className="text-[13px] font-bold text-rose-600">{v.subheading}</p>
                  </div>
                </div>
                <ReelPlayer reel={v} activeId={activeId} onPlay={setActiveId} width={276} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
}
