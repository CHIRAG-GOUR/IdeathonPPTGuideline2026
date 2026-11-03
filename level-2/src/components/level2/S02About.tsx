"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { SlideTitle, stagger, rise } from "./Shared";
import { Search, Lightbulb, Wrench, Megaphone, Eye, Sparkles } from "lucide-react";

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-5 h-[210px] rounded-xl overflow-hidden border border-gray-200 shadow-md"
          >
            <ImageSlot src={d.image} alt="Students at an Ideathon" />
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
