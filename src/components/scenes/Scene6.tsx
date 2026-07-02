"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene6() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, bounce: 0.3 } }
  };

  const weekColors = [
    "border-l-blue-500",
    "border-l-gray-400",
    "border-l-blue-400"
  ];

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-between p-4 md:p-8 max-w-6xl mx-auto h-full">
        
        {/* Left Side */}
        <div className="flex-1 w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative inline-block"
          >
            <h2 className="relative z-10 text-4xl md:text-6xl font-black text-gray-800 uppercase tracking-widest drop-shadow-sm border-l-8 border-blue-500 pl-4">
              {ideathonData.scene6.title}
            </h2>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {ideathonData.scene6.weeks.map((week, i) => (
              <motion.div 
                key={i} 
                variants={item} 
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-l-8 ${weekColors[i]} p-6 flex flex-col md:flex-row gap-4 md:items-start relative overflow-hidden hover:scale-[1.02] transition-transform`}
              >
                <div className="min-w-[160px] shrink-0 flex flex-col items-start md:border-r-2 md:border-gray-200/50 md:pr-4 relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{week.week}</span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{week.date}</span>
                  </div>
                  <span className="text-xl font-black text-gray-800 leading-tight">{week.name}</span>
                </div>
                
                <div className="flex-1 relative z-10 mt-2 md:mt-0">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {week.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-bold text-gray-600">
                        <span className="text-blue-500 mt-0.5">▶</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Winner Banner replaced with Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8, type: "spring" as const, bounce: 0.6 }}
          className="w-full md:w-1/3 flex flex-col justify-center items-center mt-8 md:mt-0 gap-6"
        >
          <div className="w-full max-w-sm aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-blue-200/50 glow-blue relative">
            <Image 
              src="/media/scene6_class_competition.png" 
              alt="Indian students presenting in a classroom competition" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl text-center border border-blue-300/30 w-full shadow-lg">
            <h3 className="text-2xl font-black text-gray-800 uppercase leading-tight">
              {ideathonData.scene6.winnersInfo.split(":")[0]}
            </h3>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {ideathonData.scene6.winnersInfo.split(":")[1]}
            </p>
          </div>
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
