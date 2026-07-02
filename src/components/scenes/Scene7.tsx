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
          <h2 className="text-4xl md:text-6xl font-black text-blue-700 uppercase tracking-widest drop-shadow-sm">
            {ideathonData.scene7.title}
          </h2>
          <h3 className="text-xl md:text-3xl font-bold text-gray-700 uppercase tracking-widest mt-2 border-b-4 border-blue-400 inline-block pb-1">
            {ideathonData.scene7.subtitle}
          </h3>
        </motion.div>

        <div className="flex flex-col gap-6 lg:gap-8 w-full items-center max-w-5xl">
          
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
                  className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-blue-200/50 flex items-center justify-center md:justify-start gap-4 relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full font-bold flex items-center justify-center shrink-0 shadow-md">
                    {i + 1}
                  </div>
                  <span className="text-lg font-bold text-gray-800">{step}</span>
                  {i < ideathonData.scene7.flow.length - 1 && (
                    <div className="absolute -bottom-3 left-8 md:left-8 w-0.5 h-3 bg-blue-300"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Presentation Includes */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="flex-1 flex flex-col gap-2"
            >
              <h4 className="text-xl font-black text-gray-500 uppercase tracking-wider mb-2 text-center md:text-left">Presentation Must Include</h4>
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-blue-200/50 h-full flex flex-col justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <ul className="flex flex-col gap-3">
                  {ideathonData.scene7.presentationIncludes.map((req, i) => (
                    <motion.li key={i} variants={item} className="flex items-center gap-3">
                      <span className="text-blue-500 text-xl font-bold">»</span>
                      <span className="text-base font-semibold text-gray-700">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Centered Image Below Text Boxes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-full max-w-4xl h-48 md:h-64 lg:h-[320px] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-300/50 relative mt-2"
          >
            <Image 
              src="/scene7_student.png" 
              alt="Indian student presenting PPT in class" 
              fill 
              className="object-cover object-center"
            />
          </motion.div>

        </div>

      </div>
    </SceneWrapper>
  );
}
