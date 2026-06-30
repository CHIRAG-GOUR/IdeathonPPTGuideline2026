"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene10() {
  const callToActionVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const wordItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.5 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 overflow-hidden">
        
        {/* Realistic Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" as const, bounce: 0.5 }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-8 border-yellow-400 glow-gold"
        >
          <Image 
            src="/media/scene10.png" 
            alt="Confident student holding lightbulb" 
            fill 
            className="object-cover"
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 drop-shadow-xl text-center"
        >
          {ideathonData.scene10.title}
        </motion.h1>

        {/* Call to action words */}
        <motion.div 
          variants={callToActionVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl"
        >
          {ideathonData.scene10.callToAction.map((phrase, i) => (
            <motion.div 
              key={i} 
              variants={wordItem} 
              className="px-6 py-3 glass-warm rounded-2xl glow-gold flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
            >
              <span className="text-xl md:text-3xl font-black text-gray-800 uppercase tracking-wider">{phrase}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Remember */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-3xl mt-2 p-6 rounded-3xl bg-gray-900 shadow-2xl relative text-center border border-yellow-500/30 glow-gold"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-1 rounded-full font-bold text-sm tracking-widest uppercase shadow-md">
            Remember
          </div>
          <p className="text-lg md:text-xl text-white font-bold leading-relaxed whitespace-pre-line">
            {ideathonData.scene10.remember}
          </p>
        </motion.div>
          
      </div>
    </SceneWrapper>
  );
}
