"use client";

import { motion, Variants } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";

export default function Scene4() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  // Precise pixel coordinates from a central (0,0) point
  const positions = [
    { x: 0, y: -230 }, // 1. Top
    { x: 370, y: -80 }, // 2. Top Right
    { x: 230, y: 200 }, // 3. Bottom Right
    { x: -230, y: 200 }, // 4. Bottom Left
    { x: -370, y: -80 }, // 5. Top Left
  ];

  // Precise rotations and lengths for the SVG arrows from center to the cards
  const arrows = [
    { rot: -90, len: 20 },
    { rot: -12, len: 115 },
    { rot: 41, len: 55 },
    { rot: 139, len: 55 },
    { rot: 192, len: 115 },
  ];

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center p-4 max-w-6xl mx-auto overflow-hidden">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 z-20 shrink-0"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-blue-600 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
            {ideathonData.scene4.title}
          </h2>
          <div className="mt-2 inline-block px-5 py-1.5 bg-blue-50 border border-blue-200 rounded-full shadow-sm">
            <span className="text-blue-700 font-bold uppercase tracking-wider text-xs md:text-sm">{ideathonData.scene4.teamInfo}</span>
          </div>
        </motion.div>

        {/* Circular Layout Container */}
        <div className="flex-1 w-full flex items-center justify-center mt-10">
          {/* This 0x0 div acts as our absolute center point. Perfect 1:1 desktop scale! */}
          <div className="relative w-0 h-0 scale-[0.95]">

            {/* Central Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring", delay: 0.2 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full shadow-2xl flex flex-col items-center justify-center z-20 border-[5px] border-white ring-4 ring-blue-200"
            >
              <Zap className="text-yellow-400 mb-1 drop-shadow-md" size={36} fill="currentColor" />
              <span className="text-white font-black text-sm uppercase tracking-widest text-center leading-tight">The<br />Process</span>
            </motion.div>

            {/* SVG Arrows pointing from center to cards */}
            <motion.div variants={container} initial="hidden" animate="show" className="absolute z-0">
              {arrows.map((arrow, i) => (
                <div
                  key={i}
                  className="absolute origin-left"
                  style={{
                    left: 0,
                    top: -12, // vertically center the 24px tall SVG exactly on 0
                    transform: `rotate(${arrow.rot}deg)`
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      show: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.3 } }
                    }}
                    className="origin-left"
                  >
                    <svg
                      style={{ width: arrow.len + 20, height: 24, marginLeft: 80, overflow: 'visible' }}
                      className="drop-shadow-md"
                    >
                      {/* Main stem of the arrow */}
                      <line x1="0" y1="12" x2={arrow.len} y2="12" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                      {/* The arrowhead */}
                      <polyline points={`${arrow.len - 8},4 ${arrow.len + 4},12 ${arrow.len - 8},20`} fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Cards */}
            <motion.div variants={container} initial="hidden" animate="show" className="absolute z-10">
              {ideathonData.scene4.steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-[260px] flex flex-col bg-white border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group"
                  style={{
                    left: positions[i].x,
                    top: positions[i].y
                  }}
                >
                  {/* Number Badge */}
                  <div className="absolute -top-1 -left-1 w-10 h-10 rounded-br-2xl rounded-tl-2xl bg-blue-600 text-white font-black flex items-center justify-center text-base shadow-md z-20 border-r-2 border-b-2 border-white/20">
                    {i + 1}
                  </div>

                  {/* Image Section */}
                  <div className="relative w-full h-[120px] bg-gray-100 overflow-hidden border-b border-gray-100">
                    <Image
                      src={`/media/scene4_step${i + 1}.png`}
                      alt={step.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Text Section */}
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1">{step.step}</h4>
                    <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-2">{step.name}</h3>
                    {step.desc && (
                      <div className="mt-1 bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold px-3 py-2 rounded-lg shadow-sm leading-snug">
                        {step.desc}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

      </div>
    </SceneWrapper>
  );
}
