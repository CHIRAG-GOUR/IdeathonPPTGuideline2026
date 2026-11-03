"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle, stagger, rise } from "./Shared";
import { Star, Medal, Presentation, MessageSquareHeart, Briefcase, Rocket, Gift } from "lucide-react";

const icons = [Star, Medal, Presentation, MessageSquareHeart, Briefcase, Rocket];

export default function S10Perks() {
  const d = level2Data.perks;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-10 px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[400px] h-[560px] shrink-0 rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#F59E0B]"
        >
          <ImageSlot src={d.image} alt="Medals, certificates and prizes" />
        </motion.div>

        <div className="flex-1 flex flex-col">
          <Chip>{d.chip}</Chip>
          <SlideTitle className="mt-4">{d.title}</SlideTitle>

          <motion.div variants={stagger} initial="hidden" animate="show" className="mt-6 grid grid-cols-2 gap-3">
            {d.perks.map((p, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={p.title}
                  variants={rise}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 shadow-sm p-4"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-gray-900 leading-tight">{p.title}</p>
                    <p className="text-[15px] font-semibold text-gray-600 leading-snug mt-0.5">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: "spring", bounce: 0.45 }}
            className="mt-4 flex items-center gap-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 rounded-xl border-2 border-black shadow-[4px_4px_0_#000] px-5 py-4"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-black flex items-center justify-center text-amber-600"
            >
              <Gift size={24} />
            </motion.div>
            <p className="text-2xl font-black text-gray-900">{d.bigPerk}</p>
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}
