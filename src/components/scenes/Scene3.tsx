"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene3() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, type: "spring" as const, bounce: 0.4 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 p-4 md:p-8 max-w-6xl mx-auto">
        
        {/* Left Side */}
        <div className="flex-1 w-full text-left flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 uppercase tracking-wider">
              {ideathonData.scene3.title}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold gold-shimmer-text uppercase tracking-widest mt-2">
              {ideathonData.scene3.subtitle}
            </h3>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4 w-full"
          >
            <p className="text-lg md:text-xl font-bold text-gray-700 mb-2">Your mission is simple:</p>
            {ideathonData.scene3.mission.map((point, i) => (
              <motion.div 
                key={i} 
                variants={item} 
                className="flex items-center gap-4 glass-warm p-4 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shrink-0 glow-gold">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div className="text-lg md:text-xl font-semibold text-gray-800">
                  {point}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl text-white shadow-xl border border-yellow-500/30"
          >
            <p className="text-sm uppercase tracking-widest text-yellow-400 font-bold mb-2">Remember</p>
            <p className="text-lg font-bold leading-relaxed whitespace-pre-line">
              {ideathonData.scene3.remember}
            </p>
          </motion.div>
        </div>

        {/* Right Side: Image replacing mentor script */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 w-full flex justify-center items-center mt-8 md:mt-0"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-200/50 glow-gold w-full max-w-lg">
            <div className="relative w-full aspect-square">
              <img 
                src="/media/Thinking Crop.gif" 
                alt="Students brainstorming and thinking" 
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
