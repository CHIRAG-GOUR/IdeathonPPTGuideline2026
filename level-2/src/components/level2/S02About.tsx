"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { SlideTitle, stagger, rise } from "./Shared";
import { Search, Lightbulb, Wrench, Megaphone, Eye, Sparkles, Route, CheckCircle2, Lock, ChevronRight } from "lucide-react";

const stepIcons = [Search, Lightbulb, Wrench, Megaphone];

export default function S02About() {
  const d = level2Data.about;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row items-stretch gap-10 px-6 py-10">
        {/* Left: What is an Ideathon */}
        <div className="flex-[1.2] flex flex-col justify-center">
          <SlideTitle className="text-[44px]">{d.title}</SlideTitle>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-xl font-semibold text-gray-700 leading-relaxed"
          >
            {d.description}
          </motion.p>

          {/* Journey track: Level 1 → 2 → 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-5 rounded-2xl border-2 border-black bg-gradient-to-br from-blue-600 to-blue-800 shadow-[5px_5px_0_#000] p-5 text-white"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-200 flex items-center gap-2">
              <Route size={16} /> {d.journeyTitle}
            </p>
            <div className="mt-4 flex items-stretch gap-2">
              {d.journey.map((j, i) => (
                <div key={j.level} className="flex items-center gap-2 flex-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: j.status === "current" ? [1, 1.05, 1] : 1 }}
                    transition={
                      j.status === "current"
                        ? { delay: 0.9 + i * 0.2, repeat: Infinity, duration: 2 }
                        : { delay: 0.9 + i * 0.2 }
                    }
                    className={`relative flex-1 rounded-xl px-3 py-3 border-2 ${
                      j.status === "current"
                        ? "bg-yellow-300 text-gray-900 border-black shadow-[3px_3px_0_#000]"
                        : j.status === "cleared"
                        ? "bg-white/15 border-white/40"
                        : "bg-white/5 border-dashed border-white/40"
                    }`}
                  >
                    {j.status === "current" && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-black">
                        You are here
                      </span>
                    )}
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 flex items-center gap-1">
                      {j.status === "cleared" && <CheckCircle2 size={13} />}
                      {j.status === "next" && <Lock size={12} />}
                      {j.level}
                    </p>
                    <p className="text-[15px] font-black leading-tight mt-0.5">{j.name}</p>
                  </motion.div>
                  {i < d.journey.length - 1 && <ChevronRight size={20} className="shrink-0 text-blue-200" />}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="mt-5 grid grid-cols-4 gap-3">
            {d.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={step}
                  variants={rise}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col items-center text-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Icon size={20} />
                  </div>
                  <span className="text-[15px] font-bold text-gray-800 leading-snug">{step}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right: Powered by SkilliZee */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 flex flex-col justify-center gap-4"
        >
          <div className="bg-white rounded-2xl border-2 border-black shadow-[6px_6px_0_#1E63D0] p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
              <Sparkles size={16} /> {d.poweredBy}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-[3px] border-blue-600 shrink-0 shadow-md">
                <ImageSlot src={d.founderImage} alt="Founder photo" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">{d.founder}</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Founder, SkilliZee</p>
              </div>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-700 leading-relaxed">{d.skillizee}</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-md border border-gray-800">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2">
              <Eye size={16} /> {d.visionTitle}
            </p>
            <p className="mt-2 text-xl font-bold leading-relaxed">{d.vision}</p>
          </div>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
