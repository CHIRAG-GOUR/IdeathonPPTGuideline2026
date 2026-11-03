"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle } from "./Shared";
import { Scale, Clapperboard } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};
const row = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.3 } },
};

export default function S09Judging() {
  const d = level2Data.judging;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl shadow-sm border border-blue-100 text-blue-600">
                <Scale size={26} />
              </div>
              <Chip>{d.chip}</Chip>
            </div>
            <SlideTitle className="mt-4">{d.title}</SlideTitle>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
            className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-2xl border-2 border-black shadow-[4px_4px_0_#000] text-2xl font-black uppercase"
          >
            {d.total}
          </motion.div>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-2xl overflow-hidden border-2 border-black shadow-[6px_6px_0_#1E63D0] bg-white">
          <div className="grid grid-cols-[70px_260px_1fr_200px] bg-blue-700 text-white text-sm font-black uppercase tracking-[0.15em]">
            <div className="px-4 py-3">#</div>
            <div className="px-4 py-3">Criteria</div>
            <div className="px-4 py-3">What the judges look for</div>
            <div className="px-4 py-3 text-right">Marks</div>
          </div>
          <motion.div variants={container} initial="hidden" animate="show">
            {d.criteria.map((c, i) => {
              const isReel = c.name === "Branding Reel";
              return (
                <motion.div
                  key={c.no}
                  variants={row}
                  className={`grid grid-cols-[70px_260px_1fr_200px] items-center border-t border-gray-200 ${
                    isReel ? "bg-rose-50" : i % 2 ? "bg-blue-50/50" : "bg-white"
                  }`}
                >
                  <div className={`px-4 py-3 text-2xl font-black ${isReel ? "text-rose-600" : "text-blue-600"}`}>{c.no}</div>
                  <div className="px-4 py-3 text-lg font-black text-gray-900 flex items-center gap-2">
                    {c.name}
                    {isReel && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-full">
                        <Clapperboard size={11} /> New
                      </span>
                    )}
                  </div>
                  <div className="px-4 py-3 text-[16px] font-semibold text-gray-700 leading-snug">{c.desc}</div>
                  <div className="px-4 py-3 flex items-center gap-3 justify-end">
                    <div className="w-24 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.marks / 20) * 100}%` }}
                        transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
                        className={`h-full rounded-full ${isReel ? "bg-rose-500" : "bg-blue-600"}`}
                      />
                    </div>
                    <span className="text-2xl font-black text-gray-900 w-14 text-right">/{c.marks}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}
