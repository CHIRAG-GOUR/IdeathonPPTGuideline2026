"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import ImageSlot from "../ImageSlot";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle, stagger, slideIn } from "./Shared";
import { ClipboardCheck, Users, BadgeCheck, MessagesSquare, ShieldCheck, AlarmClock } from "lucide-react";

const icons = [ClipboardCheck, Users, BadgeCheck, MessagesSquare, ShieldCheck];

export default function S04Rules() {
  const d = level2Data.rules;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-12 px-6">
        <div className="flex-[1.3] flex flex-col">
          <div>
            <Chip>{d.subtitle}</Chip>
          </div>
          <SlideTitle className="mt-4">{d.title}</SlideTitle>

          <motion.div variants={stagger} initial="hidden" animate="show" className="mt-6 flex flex-col gap-3">
            {d.rules.map((rule, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={rule}
                  variants={slideIn}
                  className="flex items-center gap-4 bg-white px-5 py-3.5 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="text-xl font-semibold text-gray-800">{rule}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.6, type: "spring", bounce: 0.4 }}
            className="mt-5 flex items-center gap-4 bg-red-50 border-2 border-red-500 rounded-xl px-5 py-4 shadow-[4px_4px_0_#ef4444]"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, repeatDelay: 1.5 }}
              className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0"
            >
              <AlarmClock size={24} />
            </motion.div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">{d.latePolicyTitle}</p>
              <p className="text-xl font-black text-gray-900">{d.latePolicy}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 h-[520px] rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#1E63D0]"
        >
          <ImageSlot src={d.image} alt="Team following the rules" />
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
