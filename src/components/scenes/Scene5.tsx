"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import Image from "next/image";

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-black text-blue-600 uppercase tracking-widest drop-shadow-sm">
            {ideathonData.scene5.title}
          </h2>
          <h3 className="text-base md:text-xl font-bold text-gray-600 uppercase tracking-widest mt-2">
            {ideathonData.scene5.subtitle}
          </h3>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-center justify-between">
          
          {/* Tools Grid (Left) */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {/* PPT Tools */}
            <motion.div variants={item} className="bg-white/80 backdrop-blur-md p-4 lg:p-5 rounded-3xl border border-blue-200 shadow-xl flex flex-col hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-2xl lg:text-3xl mb-2 float-animation text-center">🖥️</div>
              <h4 className="text-sm lg:text-base font-black text-blue-700 uppercase tracking-wider mb-3 border-b-2 border-blue-100 pb-1 text-center">PPT AI</h4>
              <ul className="flex flex-col gap-2.5">
                {ideathonData.scene5.tools.ppt.map((tool, i) => (
                  <li key={i} className="bg-gray-50/80 p-2 lg:p-2.5 rounded-xl text-xs lg:text-sm font-bold text-gray-700 border border-gray-200 flex items-center justify-between gap-2 shadow-sm hover:bg-white transition-colors cursor-pointer group" onClick={() => tool.yt && setActiveVideo(tool.yt)}>
                    <div className="flex items-center gap-2 truncate">
                      <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${tool.url}&sz=64`} alt={tool.name} className="w-5 h-5 lg:w-6 lg:h-6 rounded-md bg-white p-0.5 border border-gray-100 shrink-0" />
                      <span className="truncate">{tool.name}</span>
                    </div>
                    {tool.yt && (
                      <div className="text-red-600 group-hover:text-red-700 group-hover:scale-110 transition-transform shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385-8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Website Tools */}
            <motion.div variants={item} className="bg-white/80 backdrop-blur-md p-4 lg:p-5 rounded-3xl border border-blue-200 shadow-xl flex flex-col hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-2xl lg:text-3xl mb-2 float-animation text-center" style={{ animationDelay: "0.5s" }}>🌐</div>
              <h4 className="text-sm lg:text-base font-black text-blue-700 uppercase tracking-wider mb-3 border-b-2 border-blue-100 pb-1 text-center">Web AI</h4>
              <ul className="flex flex-col gap-2.5">
                {ideathonData.scene5.tools.website.map((tool, i) => (
                  <li key={i} className="bg-gray-50/80 p-2 lg:p-2.5 rounded-xl text-xs lg:text-sm font-bold text-gray-700 border border-gray-200 flex items-center justify-between gap-2 shadow-sm hover:bg-white transition-colors cursor-pointer group" onClick={() => tool.yt && setActiveVideo(tool.yt)}>
                    <div className="flex items-center gap-2 truncate">
                      <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${tool.url}&sz=64`} alt={tool.name} className="w-5 h-5 lg:w-6 lg:h-6 rounded-md bg-white p-0.5 border border-gray-100 shrink-0" />
                      <span className="truncate">{tool.name}</span>
                    </div>
                    {tool.yt && (
                      <div className="text-red-600 group-hover:text-red-700 group-hover:scale-110 transition-transform shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385-8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* App Tools */}
            <motion.div variants={item} className="bg-white/80 backdrop-blur-md p-4 lg:p-5 rounded-3xl border border-blue-200 shadow-xl flex flex-col hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-2xl lg:text-3xl mb-2 float-animation text-center" style={{ animationDelay: "1s" }}>📱</div>
              <h4 className="text-sm lg:text-base font-black text-blue-700 uppercase tracking-wider mb-3 border-b-2 border-blue-100 pb-1 text-center">App AI</h4>
              <ul className="flex flex-col gap-2.5">
                {ideathonData.scene5.tools.app.map((tool, i) => (
                  <li key={i} className="bg-gray-50/80 p-2 lg:p-2.5 rounded-xl text-xs lg:text-sm font-bold text-gray-700 border border-gray-200 flex items-center justify-between gap-2 shadow-sm hover:bg-white transition-colors cursor-pointer group" onClick={() => tool.yt && setActiveVideo(tool.yt)}>
                    <div className="flex items-center gap-2 truncate">
                      <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${tool.url}&sz=64`} alt={tool.name} className="w-5 h-5 lg:w-6 lg:h-6 rounded-md bg-white p-0.5 border border-gray-100 shrink-0" />
                      <span className="truncate">{tool.name}</span>
                    </div>
                    {tool.yt && (
                      <div className="text-red-600 group-hover:text-red-700 group-hover:scale-110 transition-transform shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385-8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Media Container (Image or Video) (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-sm lg:max-w-md xl:max-w-lg aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-200/50 glow-blue relative shrink-0 bg-gray-900"
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
                className="object-contain bg-white"
              />
            )}
          </motion.div>
          
        </div>
      </div>
    </SceneWrapper>
  );
}
