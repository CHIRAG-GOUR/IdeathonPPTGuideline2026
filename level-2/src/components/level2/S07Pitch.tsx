"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle, stagger, rise } from "./Shared";
import { Plus, Equal, Zap } from "lucide-react";

export default function S07Pitch() {
  const d = level2Data.pitch;
  return (
    <SceneWrapper>
      {/* Emerald tint so this slide reads differently from the Reel slide */}
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-100/70 via-transparent to-teal-100/60 pointer-events-none" />

      <div className="relative w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-6 gap-6">
        <div className="flex flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[440px] h-[420px] shrink-0 rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#059669]"
          >
            <ImageSlot src={d.image} alt="Student pitching to a panel" />
          </motion.div>

          <div className="flex-1">
            <Chip accent="emerald">{d.chip}</Chip>
            <SlideTitle accent="emerald" className="mt-4 text-[46px]">
              {d.title}
            </SlideTitle>
            <p className="mt-4 text-base font-black uppercase tracking-[0.2em] text-emerald-700">{d.prepared}</p>
            <motion.div variants={stagger} initial="hidden" animate="show" className="mt-3 grid grid-cols-2 gap-3">
              {d.questions.map((q, i) => (
                <motion.div
                  key={q}
                  variants={rise}
                  className="flex items-start gap-3 bg-white rounded-xl border border-emerald-200 shadow-sm px-4 py-3"
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm border-2 border-black">
                    Q{i + 1}
                  </span>
                  <span className="text-[17px] font-bold text-gray-800 leading-snug">{q}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Formula banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, type: "spring", bounce: 0.3 }}
          className="flex items-center justify-center gap-4 bg-gray-900 rounded-2xl px-6 py-4 border-2 border-black shadow-[6px_6px_0_#059669]"
        >
          <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-400 mr-2">Remember</span>
          {d.formula.map((word, i) => (
            <div key={word} className="flex items-center gap-4">
              <span className="px-4 py-1.5 rounded-lg bg-emerald-500 text-white text-xl font-black uppercase tracking-wider border-2 border-black">
                {word}
              </span>
              {i < d.formula.length - 1 ? (
                <Plus className="text-white" size={22} strokeWidth={3} />
              ) : (
                <Equal className="text-white" size={22} strokeWidth={3} />
              )}
            </div>
          ))}
          <span className="flex items-center gap-2 text-2xl font-black text-yellow-300 uppercase">
            <Zap size={24} fill="currentColor" /> {d.formulaResult}
          </span>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
