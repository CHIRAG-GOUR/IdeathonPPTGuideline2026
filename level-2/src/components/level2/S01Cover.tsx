"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { Rocket } from "lucide-react";

const chipColors = ["bg-blue-600", "bg-amber-500", "bg-rose-500", "bg-emerald-500"];

export default function S01Cover() {
  const d = level2Data.cover;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-12 px-10">
        <div className="flex-1 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="mb-5 w-16 h-16 rounded-2xl bg-white border-2 border-black shadow-md flex items-center justify-center text-blue-600"
          >
            <Rocket size={34} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl font-black uppercase tracking-[0.25em] text-gray-700"
          >
            {d.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="text-[120px] leading-none font-black uppercase tracking-tighter text-blue-600 drop-shadow-sm"
            style={{ WebkitTextStroke: "2.5px #111" }}
          >
            {d.level}
          </motion.h1>

          <div className="flex flex-wrap gap-3 mt-8">
            {d.tagline.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 + i * 0.2, type: "spring", bounce: 0.5 }}
                className={`${chipColors[i]} text-white text-2xl font-black uppercase tracking-wider px-5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0_#000]`}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-8 text-2xl font-bold text-gray-700"
          >
            {d.subline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1, type: "spring", bounce: 0.3 }}
          className="relative w-[560px] h-[420px] shrink-0 rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#1E63D0]"
        >
          <ImageSlot src={d.image} alt="Cover illustration" />
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
