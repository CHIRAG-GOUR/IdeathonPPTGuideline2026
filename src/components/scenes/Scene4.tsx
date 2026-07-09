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
          <h2 className="text-4xl md:text-6xl font-black text-blue-600 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
            {ideathonData.scene4.title}
          </h2>
          <div className="mt-4 inline-block px-6 py-2 bg-blue-50 border border-blue-200 rounded-full">
            <span className="text-blue-700 font-bold uppercase tracking-wider">{ideathonData.scene4.teamInfo}</span>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-5xl relative"
        >
          {ideathonData.scene4.steps.map((step, i) => (
            <motion.div 
              key={i} 
              variants={item} 
              className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm relative z-10 hover:shadow-md transition-all duration-300 hover:-translate-y-1 w-full overflow-hidden group"
            >
              {/* Number Badge */}
              <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs shadow-md border-2 border-white z-20">
                {i + 1}
              </div>
              
              {/* Image Section */}
              <div className="relative w-full h-32 md:h-40 bg-gray-100 overflow-hidden border-b border-gray-100">
                <Image 
                  src={`/media/scene4_step${i + 1}.png`}
                  alt={step.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col p-4 flex-1 text-left">
                <h3 className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">{step.step}</h3>
                <h4 className="text-base font-black text-gray-800 leading-tight mb-2">
                  {step.name}
                </h4>
                {step.desc && (
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed mt-auto">
                    {step.desc}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
