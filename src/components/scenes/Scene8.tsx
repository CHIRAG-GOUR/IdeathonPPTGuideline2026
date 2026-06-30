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
      <div className="w-full h-full flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 bg-gradient-to-b from-yellow-300 to-yellow-600 p-6 rounded-3xl shadow-2xl border-4 border-yellow-200 w-full relative overflow-hidden glow-gold"
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-[shine_3s_infinite]"></div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest drop-shadow-md mb-2 relative z-10">
            {ideathonData.scene8.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-yellow-900 uppercase tracking-widest relative z-10">
            {ideathonData.scene8.subtitle}
          </h3>
          <p className="mt-2 text-white font-bold bg-black/20 inline-block px-4 py-1 rounded-full text-sm relative z-10">
            {ideathonData.scene8.hostedAt}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 w-full items-center">
          
          <div className="flex-1 flex flex-col gap-6 w-full">
            {/* Experience List */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="glass-warm p-6 rounded-3xl"
            >
              <h4 className="text-lg font-black text-gray-500 uppercase tracking-wider mb-4 text-center border-b border-gray-200/50 pb-2">The Experience</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ideathonData.scene8.experience.map((exp, i) => (
                  <motion.div key={i} variants={item} className="flex items-center gap-2 glass-warm p-2 rounded-lg border border-yellow-100/30">
                    <span className="text-yellow-500 font-bold">✨</span>
                    <span className="text-sm font-bold text-gray-700">{exp}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-center mt-4 text-sm font-bold text-gray-500 italic glass-warm py-2 px-4 rounded-xl">
                {ideathonData.scene8.desc}
              </p>
            </motion.div>

            {/* Rewards List */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-xl border border-yellow-500/30 glow-gold"
            >
              <h4 className="text-lg font-black text-yellow-400 uppercase tracking-wider mb-4 text-center border-b border-gray-700 pb-2">The Rewards</h4>
              <div className="flex flex-col gap-3">
                {ideathonData.scene8.rewards.map((reward, i) => (
                  <motion.div key={i} variants={item} className="flex items-center gap-4 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-yellow-500/10">
                    <span className="text-2xl">{reward.icon}</span>
                    <span className="text-lg font-bold text-white tracking-wide">{reward.text}</span>
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
            className="flex-1 w-full max-w-md aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-yellow-200/50 glow-gold relative"
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
