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
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full items-center justify-center max-w-5xl shrink-0">
          
          {/* Left Card: Flow */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white/90 p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 w-full md:w-1/3 self-stretch justify-center"
          >
            <h4 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1 border-b border-gray-200 pb-2 text-center">The Flow</h4>
            <div className="flex flex-col gap-3">
              {ideathonData.scene7.flow.map((step, i) => (
                <motion.div 
                  key={i} 
                  variants={item} 
                  className="flex items-center gap-3 bg-gray-50 p-3 px-4 rounded-xl border border-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-black flex items-center justify-center shrink-0 text-sm border border-blue-200 shadow-sm">
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-800 leading-tight">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Card: Presentation Includes */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-gradient-to-b from-blue-50 to-white p-5 md:p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col w-full md:w-2/3 self-stretch justify-center"
          >
            <h4 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3 border-b border-blue-100 pb-2 text-center">Presentation Must Include</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ideathonData.scene7.presentationIncludes.map((req, i) => (
                <motion.li key={i} variants={item} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-1.5 rounded-lg shrink-0 text-blue-600">
                    <ChevronRight size={16} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-gray-700 leading-snug">{req}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </SceneWrapper>
  );
}
