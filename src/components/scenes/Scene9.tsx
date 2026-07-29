"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import { Calendar } from "lucide-react";

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
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-flex p-4 bg-white rounded-xl shadow-sm mb-4 border border-blue-100 text-blue-600"
          >
            <Calendar size={40} />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-blue-700 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
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
          <div className="block absolute left-24 top-4 bottom-4 w-1 bg-gray-200/30 z-0 rounded-full overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              className="w-full bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 rounded-full"
            />
          </div>

          {ideathonData.scene9.dates.map((date, i) => (
            <motion.div 
              key={i} 
              variants={item} 
              className="flex flex-row items-center gap-6 relative z-10 w-full group"
            >
              {/* Week indicator */}
              <div className="w-48 shrink-0 flex justify-end transform transition-transform group-hover:-translate-x-1">
                <div className="bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-sm w-full text-right border border-blue-600 transition-all duration-300">
                  {date.week}
                </div>
              </div>

              {/* Event card */}
              <div className="flex-1 bg-white p-5 rounded-xl border-l-4 border-blue-500 w-full shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                <span className="text-xl font-bold text-gray-800 tracking-wide">{date.event}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-sm font-bold text-blue-800 italic text-center max-w-xl bg-blue-50/80 border border-blue-100 px-6 py-3 rounded-xl backdrop-blur-sm"
        >
          {ideathonData.scene9.disclaimer}
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
