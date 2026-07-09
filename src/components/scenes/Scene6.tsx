"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

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

  const cardStyles = [
    { bg: "bg-blue-50", border: "border-blue-400", title: "text-blue-800", dateBg: "bg-blue-100", dateText: "text-blue-700", icon: "text-blue-500" },
    { bg: "bg-indigo-50", border: "border-indigo-400", title: "text-indigo-800", dateBg: "bg-indigo-100", dateText: "text-indigo-700", icon: "text-indigo-500" },
    { bg: "bg-purple-50", border: "border-purple-400", title: "text-purple-800", dateBg: "bg-purple-100", dateText: "text-purple-700", icon: "text-purple-500" }
  ];

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col gap-6 md:gap-8 items-center justify-center p-4 md:p-8 max-w-6xl mx-auto h-full">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 relative inline-block w-full"
        >
          <h2 className="relative z-10 text-4xl md:text-5xl font-black text-gray-800 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
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
              className={`${cardStyles[i].bg} rounded-xl shadow-md border-t-4 ${cardStyles[i].border} p-6 flex flex-col relative overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full border-x border-b border-gray-200/50`}
            >
              <div className={`w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 relative shadow-sm border border-white`}>
                <Image 
                  src={`/media/scene6_week${i + 1}.png`} 
                  alt={week.name} 
                  fill 
                  className="object-cover"
                />
              </div>

              <div className={`flex flex-col items-center border-b border-black/5 pb-3 mb-3 text-center`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{week.week}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${cardStyles[i].dateBg} ${cardStyles[i].dateText}`}>{week.date}</span>
                </div>
                <span className={`text-xl font-black leading-tight ${cardStyles[i].title}`}>{week.name}</span>
              </div>
              
              <div className="flex-1">
                <ul className="flex flex-col gap-2">
                  {week.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-bold text-gray-700">
                      <ChevronRight size={16} className={`${cardStyles[i].icon} mt-0.5 shrink-0`} />
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
          className="bg-blue-700 text-white px-8 py-3 rounded-xl shadow-md mt-8 border border-blue-600"
        >
          <h3 className="text-xl font-black uppercase tracking-wider">
            {ideathonData.scene6.winnersInfo}
          </h3>
        </motion.div>

      </div>
    </SceneWrapper>
  );
}
