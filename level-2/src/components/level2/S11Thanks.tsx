"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { Sparkles } from "lucide-react";

const lineColors = ["text-blue-600", "text-amber-500", "text-emerald-500"];

export default function S11Thanks() {
  const d = level2Data.thanks;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-12 px-6">
        <div className="flex-1 flex flex-col">
          {d.lines.map((line, i) => (
            <motion.h1
              key={line}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.35, duration: 0.8, type: "spring", bounce: 0.35 }}
              className={`text-[76px] leading-[1.02] font-black uppercase tracking-tighter drop-shadow-sm ${lineColors[i]}`}
              style={{ WebkitTextStroke: "2px #000" }}
            >
              {line}
            </motion.h1>
          ))}

          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-6 text-2xl font-bold text-gray-700 leading-relaxed"
          >
            {d.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, type: "spring", bounce: 0.5 }}
            className="mt-7 self-start flex items-center gap-3 px-7 py-4 bg-blue-700 text-white rounded-xl border-2 border-black shadow-[5px_5px_0_#000]"
          >
            <Sparkles size={26} className="text-yellow-300" />
            <span className="text-2xl font-black uppercase tracking-wide">{d.cta}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="mt-6 text-base font-black uppercase tracking-[0.3em] text-gray-500"
          >
            {d.footer}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 1, type: "spring", bounce: 0.35 }}
          className="w-[480px] h-[520px] shrink-0 rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#1E63D0]"
        >
          <ImageSlot src={d.image} alt="Young innovators launching their idea" />
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
