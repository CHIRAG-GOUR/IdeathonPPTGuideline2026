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
      <div className="w-full flex flex-col gap-6 md:gap-8 items-center justify-center p-4 md:p-8 max-w-6xl mx-auto h-full">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 relative inline-block w-full"
        >
          <h2 className="relative z-10 text-4xl md:text-5xl font-black text-gray-800 uppercase tracking-widest drop-shadow-sm">
            {ideathonData.scene6.title}
          </h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {ideathonData.scene6.weeks.map((week, i) => (
            <motion.div 
              key={i} 
              variants={item} 
              className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-t-8 ${weekColors[i].replace('border-l', 'border-t')} p-6 flex flex-col relative overflow-hidden hover:-translate-y-2 transition-all duration-300 h-full`}
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative shadow-md">
                <Image 
                  src={`/media/scene6_week${i + 1}.png`} 
                  alt={week.name} 
                  fill 
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col items-center border-b-2 border-gray-100 pb-3 mb-3 text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{week.week}</span>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{week.date}</span>
                </div>
                <span className="text-xl font-black text-gray-800 leading-tight">{week.name}</span>
              </div>
              
              <div className="flex-1">
                <ul className="flex flex-col gap-2">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-center shadow-lg mt-8"
        >
          <h3 className="text-xl font-black uppercase tracking-wider">
            {ideathonData.scene6.winnersInfo}
          </h3>
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
