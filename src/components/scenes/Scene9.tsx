"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

export default function Scene9() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -50, filter: "blur(5px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring" as const, bounce: 0.4 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="inline-block p-4 glass-warm rounded-full glow-silver mb-4"
          >
            <span className="text-4xl">📅</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black silver-shimmer-text uppercase tracking-widest drop-shadow-sm">
            {ideathonData.scene9.title}
          </h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col gap-4 relative"
        >
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-24 top-4 bottom-4 w-1 bg-gradient-to-b from-yellow-300 via-gray-300 to-orange-300 z-0 rounded-full"></div>

          {ideathonData.scene9.dates.map((date, i) => (
            <motion.div 
              key={i} 
              variants={item} 
              className="flex flex-col md:flex-row items-start md:items-center gap-4 relative z-10 w-full"
            >
              {/* Week indicator */}
              <div className="w-20 md:w-48 shrink-0 flex justify-end">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold px-4 py-2 rounded-xl shadow-md w-full text-center md:text-right border border-yellow-500/30">
                  {date.week}
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="hidden md:flex w-8 h-8 rounded-full glass-warm border-4 border-yellow-400 items-center justify-center shadow-sm shrink-0 z-10 glow-gold">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>

              {/* Event card */}
              <div className="flex-1 glass-warm p-4 rounded-xl border-l-4 border-yellow-400 w-full hover:glow-gold transition-all duration-300">
                <span className="text-lg font-bold text-gray-700">{date.event}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-sm font-bold text-gray-400 italic text-center max-w-xl glass-warm px-6 py-3 rounded-xl"
        >
          {ideathonData.scene9.disclaimer}
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
