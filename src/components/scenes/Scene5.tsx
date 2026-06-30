"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

export default function Scene5() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, bounce: 0.4 } }
  };

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto h-full justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-black gold-shimmer-text uppercase tracking-widest drop-shadow-sm">
            {ideathonData.scene5.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-gray-600 uppercase tracking-widest mt-2">
            {ideathonData.scene5.subtitle}
          </h3>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl items-center">
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
          >
            {/* PPT Tools */}
            <motion.div variants={item} className="glass-warm p-4 rounded-3xl border-2 border-yellow-200/50 flex flex-col hover:glow-gold transition-all duration-300">
              <div className="text-3xl mb-2 float-animation">🖥️</div>
              <h4 className="text-lg font-black text-yellow-700 uppercase tracking-wider mb-2 border-b-2 border-yellow-200 pb-1">PPT AI</h4>
              <ul className="flex flex-col gap-2">
                {ideathonData.scene5.tools.ppt.map((tool, i) => (
                  <li key={i} className="glass-warm p-2 rounded-xl text-sm font-bold text-gray-700 break-words border border-yellow-100/50">
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Website Tools */}
            <motion.div variants={item} className="glass-warm p-4 rounded-3xl border-2 border-gray-200/50 flex flex-col hover:glow-silver transition-all duration-300">
              <div className="text-3xl mb-2 float-animation" style={{ animationDelay: "0.5s" }}>🌐</div>
              <h4 className="text-lg font-black text-gray-600 uppercase tracking-wider mb-2 border-b-2 border-gray-200 pb-1">Web AI</h4>
              <ul className="flex flex-col gap-2">
                {ideathonData.scene5.tools.website.map((tool, i) => (
                  <li key={i} className="glass-warm p-2 rounded-xl text-sm font-bold text-gray-700 break-words border border-gray-100/50">
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* App Tools */}
            <motion.div variants={item} className="glass-warm p-4 rounded-3xl border-2 border-orange-200/50 flex flex-col hover:glow-bronze transition-all duration-300">
              <div className="text-3xl mb-2 float-animation" style={{ animationDelay: "1s" }}>📱</div>
              <h4 className="text-lg font-black text-orange-700 uppercase tracking-wider mb-2 border-b-2 border-orange-200 pb-1">App AI</h4>
              <ul className="flex flex-col gap-2">
                {ideathonData.scene5.tools.app.map((tool, i) => (
                  <li key={i} className="glass-warm p-2 rounded-xl text-sm font-bold text-gray-700 break-words border border-orange-100/50">
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Hyper realistic image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-full md:w-[400px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-200/50 glow-gold relative shrink-0"
          >
            <Image 
              src="/media/scene5.png" 
              alt="AI Tools hologram" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>

      </div>
    </SceneWrapper>
  );
}
