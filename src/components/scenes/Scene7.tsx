"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

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
          <h2 className="text-4xl md:text-6xl font-black text-blue-700 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
            {ideathonData.scene7.title}
          </h2>
          <h3 className="text-xl md:text-3xl font-bold text-gray-700 uppercase tracking-widest mt-2 border-b-4 border-blue-400 inline-block pb-1">
            {ideathonData.scene7.subtitle}
          </h3>
        </motion.div>

        {/* Medium Centered Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-2xl h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative mb-6 shrink-0"
        >
          <Image 
            src="/scene7_student.png" 
            alt="Indian student presenting PPT in class" 
            fill 
            className="object-cover object-center"
          />
        </motion.div>

        {/* Two Cards Row */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full items-stretch justify-center max-w-6xl shrink-0">
          
          {/* Left Card: Flow */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-gray-300 shadow-xl flex flex-col gap-6 w-full md:w-1/3 justify-center"
          >
            <h4 className="text-base md:text-lg font-black text-blue-800 uppercase tracking-widest mb-2 border-b-2 border-blue-200 pb-3 text-center drop-shadow-sm">The Flow</h4>
            <div className="flex flex-col gap-4">
              {ideathonData.scene7.flow.map((step, i) => (
                <motion.div 
                  key={i} 
                  variants={item} 
                  className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 group-hover:w-2 transition-all"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 rounded-full font-black flex items-center justify-center shrink-0 text-base md:text-lg border-2 border-white shadow-sm ring-1 ring-blue-100">
                    {i + 1}
                  </div>
                  <span className="text-sm md:text-base font-bold text-gray-800 leading-tight">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Card: Presentation Includes */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-gradient-to-br from-blue-600 to-blue-900 p-6 md:p-8 rounded-3xl border border-blue-500 shadow-xl flex flex-col w-full md:w-2/3 justify-center relative overflow-hidden"
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
            
            <h4 className="text-base md:text-lg font-black text-yellow-400 uppercase tracking-widest mb-4 border-b-2 border-blue-500/50 pb-3 text-center drop-shadow-md relative z-10">Presentation Must Include</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {ideathonData.scene7.presentationIncludes.map((req, i) => (
                <motion.li key={i} variants={item} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 transition-all group cursor-default">
                  <div className="bg-yellow-400 p-2 rounded-xl shrink-0 text-blue-900 shadow-inner group-hover:scale-110 transition-transform">
                    <ChevronRight size={20} strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base font-bold text-white leading-snug drop-shadow-sm">{req}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </SceneWrapper>
  );
}
