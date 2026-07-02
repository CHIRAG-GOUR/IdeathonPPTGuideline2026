"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene4() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-black text-blue-600 uppercase tracking-widest drop-shadow-sm">
            {ideathonData.scene4.title}
          </h2>
          <div className="mt-4 inline-block px-6 py-2 glass-warm rounded-full glow-blue">
            <span className="text-blue-700 font-bold uppercase tracking-wider">{ideathonData.scene4.teamInfo}</span>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full my-6 relative"
        >
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-gray-300 via-blue-300 to-blue-500 -z-10 -translate-y-1/2 rounded-full"></div>

          {ideathonData.scene4.steps.map((step, i) => (
            <motion.div 
              key={i} 
              variants={item} 
              className="flex flex-col items-center glass-warm p-4 pt-8 mt-6 rounded-2xl relative z-10 hover:glow-blue transition-all duration-300 hover:-translate-y-2 h-full"
            >
              <div className="absolute -top-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 text-white font-black flex items-center justify-center text-xl shadow-md border-2 border-white glow-blue z-20">
                {i + 1}
              </div>
              <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl overflow-hidden mb-4 border-2 border-blue-200/50 shadow-inner">
                <Image 
                  src={`/media/scene4_step${i + 1}.png`}
                  alt={step.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="text-sm text-gray-500 font-bold uppercase mb-1">{step.step}</h3>
              <h4 className="text-lg font-bold text-gray-800 text-center leading-tight mb-3">
                {step.name}
              </h4>
              {step.desc && (
                <p className="text-xs font-semibold text-gray-600 text-center bg-blue-50/50 p-2 rounded-lg w-full whitespace-pre-line mt-auto border border-blue-200/50">
                  {step.desc}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
