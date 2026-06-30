"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";

export default function Scene9() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.25,
        delayChildren: 0.5 
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 50, scale: 0.9, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      filter: "blur(0px)", 
      transition: { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 } 
    }
  };

  const dotVariant = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring" as const, bounce: 0.6 } }
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
          {/* Vertical timeline line - animates drawing down */}
          <div className="hidden md:block absolute left-24 top-4 bottom-4 w-1 bg-gray-200/30 z-0 rounded-full overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              className="w-full bg-gradient-to-b from-yellow-300 via-yellow-500 to-orange-500 rounded-full"
            />
          </div>

          {ideathonData.scene9.dates.map((date, i) => (
            <motion.div 
              key={i} 
              variants={item} 
              className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full group"
            >
              {/* Week indicator */}
              <div className="w-20 md:w-48 shrink-0 flex justify-end transform transition-transform group-hover:-translate-x-2">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-black px-6 py-3 rounded-2xl shadow-lg w-full text-center md:text-right border border-yellow-500/40 glow-silver group-hover:glow-gold transition-all duration-300">
                  {date.week}
                </div>
              </div>
              {/* Removed Timeline dot as per request */}

              {/* Event card */}
              <div className="flex-1 glass-warm p-5 rounded-2xl border-l-8 border-yellow-400 w-full shadow-md group-hover:shadow-2xl group-hover:border-orange-500 group-hover:translate-x-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-200/20 to-yellow-200/0 -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></div>
                <span className="text-xl font-bold text-gray-800 tracking-wide">{date.event}</span>
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
