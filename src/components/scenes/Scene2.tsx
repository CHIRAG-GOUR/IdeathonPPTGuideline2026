"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";
import { Medal, Trophy } from "lucide-react";

export default function Scene2() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.6 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } }
  };

  const levelStyles = [
    "from-gray-100 to-gray-200 border-gray-300",
    "from-orange-50 to-orange-100 border-orange-200",
    "from-blue-50 to-blue-100 border-blue-200"
  ];

  const levelIcons = [
    <Medal key="silver" className="w-8 h-8 text-gray-500" />, 
    <Medal key="bronze" className="w-8 h-8 text-orange-500" />, 
    <Trophy key="gold" className="w-8 h-8 text-blue-600" />
  ];

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-blue-600 uppercase tracking-wide text-center mb-8 drop-shadow-sm"
         style={{ WebkitTextStroke: '1.5px #000' }}>
          {ideathonData.scene2.title}
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-5xl px-4 relative mb-10"
        >
          {ideathonData.scene2.levels.map((lvl, i) => (
            <motion.div 
              key={i} 
              variants={item} 
              className="relative w-full md:w-1/3 flex flex-col items-center"
            >
              <div className={`w-full p-6 rounded-xl shadow-md border bg-gradient-to-br flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative z-10 ${levelStyles[i]}`}>
                <div className="mb-3 p-3 bg-white rounded-full shadow-sm">{levelIcons[i]}</div>
                <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{lvl.level}</span>
                <span className="text-xl md:text-2xl font-black text-gray-800 leading-tight mb-4">{lvl.name}</span>
                
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-inner mt-2 border border-white/50 bg-gray-100">
                  <Image 
                    src={`/media/scene2_level${i + 1}.png`} 
                    alt={lvl.name} 
                    fill 
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Desktop connector */}
              {i < ideathonData.scene2.levels.length - 1 && (
                <div className="hidden md:flex absolute top-1/3 -right-8 w-12 h-1 bg-gradient-to-r from-blue-300 to-blue-500 z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-500 border-b-[8px] border-b-transparent translate-x-full"></div>
                </div>
              )}
              {/* Mobile connector */}
              {i < ideathonData.scene2.levels.length - 1 && (
                <div className="md:hidden w-1 h-8 bg-gradient-to-b from-blue-300 to-blue-500 my-2 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-l-[8px] border-l-transparent border-t-[12px] border-t-blue-500 border-r-[8px] border-r-transparent translate-y-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
