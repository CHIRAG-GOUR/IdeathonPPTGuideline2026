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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" as const, bounce: 0.3 }}
          className="relative w-full max-w-3xl aspect-[16/9] max-h-[350px] rounded-2xl overflow-hidden shadow-md border border-gray-200 shrink-0"
        >
          <Image 
            src="/media/scene10_new.png" 
            alt="Confident students holding lightbulb" 
            fill 
            className="object-cover object-center"
          />
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 drop-shadow-xl text-center"
         style={{ WebkitTextStroke: '1.5px #000' }}>
          {ideathonData.scene10.title}
        </motion.h1>

        {/* Call to action words */}
        <motion.div 
          variants={callToActionVariants}
          initial="hidden"
          animate="show"
          className="flex flex-row flex-nowrap justify-center items-center gap-2 md:gap-4 max-w-6xl w-full"
        >
          {ideathonData.scene10.callToAction.map((phrase, i) => (
            <motion.div 
              key={i} 
              variants={wordItem} 
              className="px-4 py-3 flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center transform hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <span className="text-sm md:text-xl lg:text-2xl font-black text-blue-700 uppercase tracking-widest text-center">{phrase}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Remember */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-3xl mt-2 p-6 rounded-xl bg-gray-900 shadow-lg relative text-center border border-gray-800"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-6 py-1 rounded-full font-bold text-sm tracking-widest uppercase shadow-sm">
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
