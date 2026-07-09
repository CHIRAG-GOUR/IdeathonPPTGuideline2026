"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import { Check } from "lucide-react";

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
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 uppercase tracking-wider" style={{ WebkitTextStroke: '1.5px #000' }}>
              {ideathonData.scene3.title}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 uppercase tracking-widest mt-2">
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
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
                  <Check size={18} className="text-blue-600 font-bold" />
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
            className="mt-8 p-6 bg-gray-900 rounded-xl text-white shadow-md border border-gray-800"
          >
            <p className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-2">Remember</p>
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
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative w-full max-w-lg">
            <div className="relative w-full aspect-square bg-white">
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
