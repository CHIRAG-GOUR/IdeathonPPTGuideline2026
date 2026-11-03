"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { level2Data } from "@/content/level2-data";
import { Chip, SlideTitle, stagger, rise } from "./Shared";
import {
  Star,
  Medal,
  Presentation,
  MessageSquareHeart,
  Briefcase,
  Rocket,
  Banknote,
  Trophy,
  ScrollText,
  Laptop,
  MapPin,
} from "lucide-react";

const icons = [Star, Medal, Presentation, MessageSquareHeart, Briefcase, Rocket];
const rewardIcons = [Banknote, Trophy, ScrollText, Laptop];

export default function S10Perks() {
  const d = level2Data.perks;
  const f = d.finale;
  return (
    <SceneWrapper>
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row items-center gap-10 px-6">
        {/* Left: Road to Level 3 card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-[400px] h-[580px] shrink-0 rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0_#F59E0B] bg-gradient-to-b from-gray-900 via-blue-950 to-blue-800 text-white flex flex-col items-center px-7 py-8"
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-yellow-400/25 blur-3xl" />

          <p className="relative text-sm font-black uppercase tracking-[0.25em] text-yellow-300">{f.eyebrow}</p>
          <h3
            className="relative mt-1 text-5xl font-black uppercase tracking-tight text-white"
            style={{ WebkitTextStroke: "1.5px #000" }}
          >
            {f.title}
          </h3>

          {/* Medal podium */}
          <div className="relative mt-7 flex items-end gap-4">
            {[
              { n: 2, size: "w-16 h-16", grad: "from-gray-200 via-white to-gray-400", text: "text-gray-600", delay: 0.3 },
              { n: 1, size: "w-24 h-24", grad: "from-yellow-200 via-yellow-400 to-yellow-600", text: "text-white", delay: 0 },
              { n: 3, size: "w-16 h-16", grad: "from-orange-200 via-orange-400 to-amber-700", text: "text-white", delay: 0.6 },
            ].map((m) => (
              <motion.div
                key={m.n}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: m.delay }}
                className={`${m.size} rounded-full bg-gradient-to-br ${m.grad} border-2 border-white shadow-lg flex items-center justify-center`}
              >
                <span className={`text-2xl font-black ${m.text} drop-shadow-sm`}>{m.n}</span>
              </motion.div>
            ))}
          </div>

          <p className="relative mt-6 text-xl font-black text-center leading-snug">{f.text}</p>

          <motion.div variants={stagger} initial="hidden" animate="show" className="relative mt-5 grid grid-cols-2 gap-2.5 w-full">
            {f.rewards.map((r, i) => {
              const Icon = rewardIcons[i];
              return (
                <motion.div
                  key={r}
                  variants={rise}
                  className="flex items-center gap-2 bg-white/10 border border-white/25 rounded-lg px-3 py-2.5"
                >
                  <Icon size={18} className="text-yellow-300 shrink-0" />
                  <span className="text-[14px] font-bold">{r}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <p className="relative mt-auto flex items-center gap-1.5 text-[13px] font-bold text-blue-100">
            <MapPin size={14} /> {f.hostedAt}
          </p>
        </motion.div>

        {/* Right: perks */}
        <div className="flex-1 flex flex-col">
          <Chip>{d.chip}</Chip>
          <SlideTitle className="mt-4">{d.title}</SlideTitle>

          <motion.div variants={stagger} initial="hidden" animate="show" className="mt-6 grid grid-cols-2 gap-4">
            {d.perks.map((p, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={p.title}
                  variants={rise}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 shadow-sm p-5"
                >
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-gray-900 leading-tight">{p.title}</p>
                    <p className="text-[15px] font-semibold text-gray-600 leading-snug mt-1">{p.desc}</p>
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
