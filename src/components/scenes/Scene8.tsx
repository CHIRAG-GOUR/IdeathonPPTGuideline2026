"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene8() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, bounce: 0.5 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col items-center p-4 max-w-6xl mx-auto h-full justify-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 bg-gradient-to-b from-yellow-300 to-yellow-600 p-4 rounded-3xl shadow-2xl border-4 border-yellow-200 w-full relative overflow-hidden glow-gold shrink-0"
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-[shine_3s_infinite]"></div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest drop-shadow-md mb-1 relative z-10">
            {ideathonData.scene8.title}
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase tracking-widest relative z-10">
            {ideathonData.scene8.subtitle}
          </h3>
          <p className="mt-1 text-white font-bold bg-black/20 inline-block px-4 py-1 rounded-full text-xs relative z-10">
            {ideathonData.scene8.hostedAt}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 w-full items-stretch">
          
          <div className="flex-1 flex flex-col gap-4 w-full">
            {/* Experience List */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="glass-warm p-4 rounded-3xl flex-1 flex flex-col justify-center"
            >
              <h4 className="text-base font-black text-gray-500 uppercase tracking-wider mb-2 text-center border-b border-gray-200/50 pb-1">The Experience</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ideathonData.scene8.experience.map((exp, i) => (
                  <motion.div key={i} variants={item} className="flex items-center gap-2 glass-warm p-1.5 px-3 rounded-lg border border-yellow-100/30">
                    <span className="text-yellow-500 font-bold text-xs">✨</span>
                    <span className="text-xs font-bold text-gray-700">{exp}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-center mt-2 text-xs font-bold text-gray-500 italic glass-warm py-1 px-3 rounded-xl">
                {ideathonData.scene8.desc}
              </p>
            </motion.div>

            {/* Rewards List */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-3xl shadow-xl border border-yellow-500/30 glow-gold shrink-0"
            >
              <h4 className="text-base font-black text-yellow-400 uppercase tracking-wider mb-2 text-center border-b border-gray-700 pb-1">The Rewards</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ideathonData.scene8.rewards.map((reward, i) => (
                  <motion.div key={i} variants={item} className={`flex items-center gap-3 bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-yellow-500/10 ${i === 4 ? 'sm:col-span-2' : ''}`}>
                    <span className="text-xl">{reward.icon}</span>
                    <span className="text-sm font-bold text-white tracking-wide">{reward.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Realistic Image replacing mentor script */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex-1 w-full max-w-sm aspect-square md:aspect-auto rounded-[3rem] overflow-hidden shadow-2xl border-4 border-yellow-200/50 glow-gold relative"
          >
            <Image 
              src="/media/scene8.png" 
              alt="Grand Finale Championship Trophy" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>

      </div>
    </SceneWrapper>
  );
}
