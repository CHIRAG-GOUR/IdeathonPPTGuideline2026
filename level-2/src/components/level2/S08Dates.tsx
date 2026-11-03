"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle } from "./Shared";
import { GraduationCap, Upload, Presentation, Megaphone, Calendar } from "lucide-react";

const icons = [GraduationCap, Upload, Presentation, Megaphone];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.5 } },
};
const item = {
  hidden: { opacity: 0, x: 50, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

export default function S08Dates() {
  const d = level2Data.dates;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-12 px-6">
        <div className="flex-[1.4] flex flex-col">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="p-2.5 bg-white rounded-xl shadow-sm border border-blue-100 text-blue-600"
            >
              <Calendar size={28} />
            </motion.div>
            <Chip>{d.chip}</Chip>
          </div>
          <SlideTitle className="mt-4">{d.title}</SlideTitle>

          {/* Column headers */}
          <div className="mt-6 flex flex-row gap-6 px-1 text-sm font-black uppercase tracking-[0.2em] text-gray-500">
            <span className="flex-1 pl-16">Activity</span>
            <span className="w-64 text-center">Date & Time</span>
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="relative mt-2 flex flex-col gap-4">
            <div className="absolute left-[27px] top-6 bottom-6 w-1 bg-gray-200/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                className="w-full bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700"
              />
            </div>
            {d.rows.map((row, i) => {
              const Icon = icons[i];
              return (
                <motion.div key={row.activity} variants={item} className="relative z-10 flex flex-row items-center gap-6 group">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-blue-700 text-white flex items-center justify-center border-2 border-black shadow-md">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 bg-white px-5 py-4 rounded-xl border-l-4 border-blue-500 shadow-sm group-hover:shadow-md transition-shadow">
                      <span className="text-2xl font-black text-gray-800">{row.activity}</span>
                    </div>
                  </div>
                  <div
                    className={`w-64 shrink-0 text-center px-4 py-4 rounded-xl font-black text-lg border-2 border-black ${
                      row.pending
                        ? "bg-amber-100 text-amber-800 shadow-[3px_3px_0_#f59e0b]"
                        : "bg-blue-600 text-white shadow-[3px_3px_0_#000]"
                    }`}
                  >
                    {row.date}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex-1 h-[440px] rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#1E63D0]"
        >
          <ImageSlot src={d.image} alt="Calendar with key dates" />
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
