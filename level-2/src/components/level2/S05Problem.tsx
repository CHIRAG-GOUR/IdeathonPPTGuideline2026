"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle, stagger, rise } from "./Shared";
import { Cpu, Calculator, Palette, Mic, Clapperboard } from "lucide-react";

const cards = [
  { Icon: Cpu, color: "bg-blue-600" },
  { Icon: Calculator, color: "bg-amber-500" },
  { Icon: Palette, color: "bg-violet-500" },
  { Icon: Mic, color: "bg-emerald-500" },
  { Icon: Clapperboard, color: "bg-rose-500" },
];

export default function S05Problem() {
  const d = level2Data.problem;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-6 gap-7">
        <div className="flex flex-row items-center gap-10">
          <div className="flex-[1.3]">
            <Chip>{d.chip}</Chip>
            <SlideTitle className="mt-4 text-[54px]">{d.title}</SlideTitle>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-black uppercase tracking-[0.15em] text-gray-700 mt-1"
            >
              {d.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-5 text-xl font-semibold text-gray-800 leading-relaxed bg-white/80 border-l-4 border-blue-600 rounded-r-xl px-5 py-3 shadow-sm"
            >
              {d.intro}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-1 h-[300px] rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#1E63D0]"
          >
            <ImageSlot src={d.image} alt="Project becoming a startup product" />
          </motion.div>
        </div>

        <div>
          <p className="text-lg font-black uppercase tracking-[0.2em] text-blue-700 mb-3">{d.mustInclude}</p>
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-5 gap-4">
            {d.deliverables.map((item, i) => {
              const { Icon, color } = cards[i];
              return (
                <motion.div
                  key={item.title}
                  variants={rise}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0_#000] p-4 flex flex-col gap-2"
                >
                  <div className={`w-11 h-11 rounded-lg ${color} text-white flex items-center justify-center border-2 border-black`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-lg font-black text-gray-900 leading-tight">{item.title}</p>
                  <p className="text-[15px] font-semibold text-gray-600 leading-snug">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}
