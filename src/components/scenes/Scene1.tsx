"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene1() {
  return (
    <SceneWrapper>
      <div className="relative flex flex-col items-center justify-center w-full h-full gap-6 overflow-hidden">
        
        {/* Animated Medal Trio */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex gap-6 mb-2"
        >
          {/* Silver */}
          <motion.div 
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.3 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-200 via-white to-gray-400 border-4 border-white shadow-lg glow-silver flex items-center justify-center transform translate-y-4"
          >
            <span className="text-2xl text-gray-600 font-black drop-shadow-md">2</span>
          </motion.div>
          {/* Gold */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 border-4 border-yellow-100 shadow-xl glow-gold flex items-center justify-center z-10"
          >
            <span className="text-4xl text-white font-black drop-shadow-md">1</span>
          </motion.div>
          {/* Bronze */}
          <motion.div 
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.6 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-200 via-orange-400 to-amber-700 border-4 border-orange-100 shadow-lg glow-bronze flex items-center justify-center transform translate-y-4"
          >
            <span className="text-2xl text-white font-bold drop-shadow-md">3</span>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-blue-600 drop-shadow-sm text-center"
        >
          {ideathonData.scene1.title}
        </motion.h1>

        {/* Heading Words */}
        <motion.h2 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          className="text-xl md:text-3xl font-extrabold text-gray-700 text-center uppercase tracking-widest mt-2"
        >
          {ideathonData.scene1.heading}
        </motion.h2>

        {/* Realistic Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.2, type: "spring", bounce: 0.4 }}
          className="mt-6 rounded-3xl overflow-hidden shadow-2xl glow-blue border-4 border-blue-200/50"
        >
          <div className="relative w-72 h-48 md:w-[600px] md:h-[350px]">
            <Image 
              src="/media/scene1.png" 
              alt="Ideathon Championship Podium" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
          
      </div>
    </SceneWrapper>
  );
}
