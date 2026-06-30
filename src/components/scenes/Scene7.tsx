"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene7() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-black bronze-shimmer-text uppercase tracking-widest drop-shadow-sm">
            {ideathonData.scene7.title}
          </h2>
          <h3 className="text-xl md:text-3xl font-bold text-gray-700 uppercase tracking-widest mt-2 border-b-4 border-orange-400 inline-block pb-1">
            {ideathonData.scene7.subtitle}
          </h3>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Flow Steps */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 flex flex-col gap-3"
          >
            <h4 className="text-xl font-black text-gray-500 uppercase tracking-wider mb-2 text-center md:text-left">The Flow</h4>
            {ideathonData.scene7.flow.map((step, i) => (
              <motion.div 
                key={i} 
                variants={item} 
                className="glass-warm p-4 rounded-xl border border-orange-200/50 flex items-center justify-center md:justify-start gap-4 relative hover:glow-bronze transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-600 text-white rounded-full font-bold flex items-center justify-center shrink-0 glow-bronze">
                  {i + 1}
                </div>
                <span className="text-lg font-bold text-gray-800">{step}</span>
                {i < ideathonData.scene7.flow.length - 1 && (
                  <div className="absolute -bottom-3 left-8 md:left-8 w-0.5 h-3 bg-orange-300"></div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Presentation Includes & Image */}
          <div className="flex-1 flex flex-col gap-6">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="flex-1 flex flex-col gap-2"
            >
              <h4 className="text-xl font-black text-gray-500 uppercase tracking-wider mb-2 text-center md:text-left">Presentation Must Include</h4>
              <div className="glass-warm p-4 rounded-2xl border-2 border-orange-200/50 h-full flex flex-col justify-center">
                <ul className="flex flex-col gap-2">
                  {ideathonData.scene7.presentationIncludes.map((req, i) => (
                    <motion.li key={i} variants={item} className="flex items-center gap-3">
                      <span className="text-orange-500 text-xl font-bold">»</span>
                      <span className="text-base font-semibold text-gray-700">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full h-40 md:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-orange-300/50 glow-bronze relative"
            >
              <Image 
                src="/media/scene7.png" 
                alt="Grand stage presentation" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full max-w-3xl mt-6 bg-gradient-to-r from-yellow-300 to-yellow-500 p-4 rounded-2xl shadow-md border-2 border-yellow-200 flex items-center justify-center text-center glow-gold"
        >
          <span className="text-xl font-black text-white uppercase tracking-wider drop-shadow-sm">{ideathonData.scene7.bonus}</span>
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
