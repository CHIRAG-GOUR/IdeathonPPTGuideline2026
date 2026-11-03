"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import SceneWrapper from "../SceneWrapper";
import { level2Data } from "@/content/level2-data";
import { Trophy, BadgeCheck } from "lucide-react";

const confettiColors = ["#1E63D0", "#F59E0B", "#F43F5E", "#10B981", "#8B5CF6", "#FACC15"];

// Deterministic pseudo-random so server and client render the same pieces.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function S03Congrats() {
  const d = level2Data.congrats;
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        left: rand(i) * 100,
        delay: rand(i + 100) * 3,
        duration: 3 + rand(i + 200) * 3,
        size: 8 + rand(i + 300) * 10,
        color: confettiColors[i % confettiColors.length],
        rotate: rand(i + 400) * 360,
      })),
    []
  );

  return (
    <SceneWrapper>
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {pieces.map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: -40, rotate: p.rotate, opacity: 0 }}
            animate={{ y: 860, rotate: p.rotate + 540, opacity: [0, 1, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 rounded-sm"
            style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.5, background: p.color }}
          />
        ))}
      </div>

      <div className="relative w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-12 px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="relative w-[500px] h-[460px] shrink-0 rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#F59E0B] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex flex-col items-center justify-center text-white"
        >
          {/* Rotating light rays */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute w-[900px] h-[900px] opacity-25"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, #fde68a 0deg 8deg, transparent 8deg 24deg)",
            }}
          />
          <div className="absolute w-72 h-72 rounded-full bg-yellow-300/30 blur-3xl" />

          {/* Trophy */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative w-40 h-40 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600 border-4 border-white shadow-2xl flex items-center justify-center"
          >
            <Trophy size={84} className="text-white drop-shadow-md" strokeWidth={1.8} />
          </motion.div>

          {/* Stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 2.2, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ delay: 1, type: "spring", bounce: 0.45 }}
            className="relative mt-7 flex items-center gap-2 px-5 py-2 rounded-xl border-[3px] border-yellow-300 text-yellow-300 text-2xl font-black uppercase tracking-[0.15em] bg-black/20"
          >
            <BadgeCheck size={26} /> {d.stamp}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="relative mt-6 text-center px-8"
          >
            <p className="text-4xl font-black text-white drop-shadow-sm">{d.stat}</p>
            <p className="text-lg font-bold text-blue-100 mt-1">{d.statNote}</p>
          </motion.div>
        </motion.div>

        <div className="flex-1 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-gray-900 px-5 py-2 rounded-full border-2 border-black shadow-[3px_3px_0_#000]"
          >
            <motion.span animate={{ rotate: [0, -12, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Trophy size={22} />
            </motion.span>
            <span className="text-lg font-black uppercase tracking-[0.2em]">{d.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mt-6 text-6xl font-black uppercase tracking-tight text-blue-600 leading-[1.05] drop-shadow-sm"
            style={{ WebkitTextStroke: "2px #000" }}
          >
            {d.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-6 text-2xl font-bold text-gray-800 leading-relaxed"
          >
            {d.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-6 p-5 bg-gray-900 text-white rounded-xl border border-gray-800 shadow-md"
          >
            <p className="text-xl font-bold leading-relaxed">{d.highlight}</p>
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}
