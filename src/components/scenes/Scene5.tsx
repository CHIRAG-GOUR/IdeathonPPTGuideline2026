"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";
import { Monitor, Globe, Smartphone, Play } from "lucide-react";

export default function Scene5() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
      <div className="w-full flex flex-col items-center p-4 md:p-8 max-w-7xl mx-auto h-full justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl md:text-4xl font-black text-blue-600 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
            {ideathonData.scene5.title}
          </h2>
          <h3 className="text-sm md:text-lg font-bold text-gray-600 uppercase tracking-widest mt-1">
            {ideathonData.scene5.subtitle}
          </h3>
        </motion.div>

        <div className="flex flex-col gap-4 w-full items-center justify-center max-w-4xl">
          
          {/* Media Container (Image or Video) (Top) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 relative shrink-0 bg-gray-900"
          >
            {activeVideo ? (
              <iframe 
                src={activeVideo} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <Image 
                src="/Ai.png" 
                alt="AI Tools banner" 
                fill 
                className="object-cover bg-white"
              />
            )}
          </motion.div>

          <p className="text-gray-500 font-bold tracking-widest uppercase text-xs animate-pulse">
            Click any tool to see the tutorial
          </p>
          
          {/* Tools Grid (Bottom) */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* PPT Tools */}
            <motion.div variants={item} className="bg-white/90 p-3 lg:p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-all duration-300">
              <div className="mb-2 flex justify-center text-blue-600"><Monitor size={24} /></div>
              <h4 className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1 text-center">PPT AI</h4>
              <ul className="flex flex-col gap-2">
                {ideathonData.scene5.tools.ppt.map((tool, i) => (
                  <li key={i} className="bg-gray-50/80 p-1.5 lg:p-2 rounded-lg text-xs font-bold text-gray-700 border border-gray-200 flex items-center justify-between gap-2 shadow-sm hover:bg-white transition-colors cursor-pointer group" onClick={() => tool.yt && setActiveVideo(tool.yt)}>
                    <div className="flex items-center gap-2 truncate">
                      <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${tool.url}&sz=64`} alt={tool.name} className="w-4 h-4 rounded bg-white p-px border border-gray-100 shrink-0" />
                      <span className="truncate">{tool.name}</span>
                    </div>
                    {tool.yt && (
                      <div className="text-red-600 group-hover:text-red-700 transition-colors shrink-0">
                        <Play size={14} fill="currentColor" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Website Tools */}
            <motion.div variants={item} className="bg-white/90 p-3 lg:p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-all duration-300">
              <div className="mb-2 flex justify-center text-blue-600"><Globe size={24} /></div>
              <h4 className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1 text-center">Web AI</h4>
              <ul className="flex flex-col gap-2">
                {ideathonData.scene5.tools.website.map((tool, i) => (
                  <li key={i} className="bg-gray-50/80 p-1.5 lg:p-2 rounded-lg text-xs font-bold text-gray-700 border border-gray-200 flex items-center justify-between gap-2 shadow-sm hover:bg-white transition-colors cursor-pointer group" onClick={() => tool.yt && setActiveVideo(tool.yt)}>
                    <div className="flex items-center gap-2 truncate">
                      <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${tool.url}&sz=64`} alt={tool.name} className="w-4 h-4 rounded bg-white p-px border border-gray-100 shrink-0" />
                      <span className="truncate">{tool.name}</span>
                    </div>
                    {tool.yt && (
                      <div className="text-red-600 group-hover:text-red-700 transition-colors shrink-0">
                        <Play size={14} fill="currentColor" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* App Tools */}
            <motion.div variants={item} className="bg-white/90 p-3 lg:p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:shadow-md transition-all duration-300">
              <div className="mb-2 flex justify-center text-blue-600"><Smartphone size={24} /></div>
              <h4 className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1 text-center">App AI</h4>
              <ul className="flex flex-col gap-2">
                {ideathonData.scene5.tools.app.map((tool, i) => (
                  <li key={i} className="bg-gray-50/80 p-1.5 lg:p-2 rounded-lg text-xs font-bold text-gray-700 border border-gray-200 flex items-center justify-between gap-2 shadow-sm hover:bg-white transition-colors cursor-pointer group" onClick={() => tool.yt && setActiveVideo(tool.yt)}>
                    <div className="flex items-center gap-2 truncate">
                      <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${tool.url}&sz=64`} alt={tool.name} className="w-4 h-4 rounded bg-white p-px border border-gray-100 shrink-0" />
                      <span className="truncate">{tool.name}</span>
                    </div>
                    {tool.yt && (
                      <div className="text-red-600 group-hover:text-red-700 transition-colors shrink-0">
                        <Play size={14} fill="currentColor" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </SceneWrapper>
  );
}
