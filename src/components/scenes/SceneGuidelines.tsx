"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import { CheckCircle, Brain, HeartPulse, ShieldAlert, Store, Rocket, Image as ImageIcon, Users } from "lucide-react";

export default function SceneGuidelines() {
  const [activeTab, setActiveTab] = useState(0);
  const data = ideathonData.sceneGuidelines;

  // Auto-switch tabs every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev < 5 ? prev + 1 : 0));
    }, 10000);
    return () => clearInterval(timer);
  }, [activeTab]);

  // Intercept keyboard navigation to switch tabs first
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        if (activeTab < 5) {
          e.stopPropagation();
          setActiveTab((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeTab > 0) {
          e.stopPropagation();
          setActiveTab((prev) => prev - 1);
        }
      }
    };

    // Use capture phase to intercept before global page.tsx listener
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [activeTab]);

  const icons = [
    <Brain key={0} size={24} />,
    <HeartPulse key={1} size={24} />,
    <ShieldAlert key={2} size={24} />,
    <Store key={3} size={24} />,
    <Rocket key={4} size={24} />,
    <Users key={5} size={24} />
  ];

  const images = [
    "/media/genre_mental_health.png",
    "/media/genre_healthcare.png",
    "/media/genre_public_sector.png",
    "/media/genre_family_business.png",
    "/media/genre_startup.png",
    "/women_empowerment.png"
  ];

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col p-4 md:p-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 shrink-0"
        >
          <h2 className="text-3xl md:text-5xl font-black text-blue-600 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
            {data.title}
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-gray-700 uppercase tracking-widest mt-2">
            {data.subtitle}
          </h3>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 flex flex-row gap-6 overflow-hidden">
          
          {/* Left Column: Rules & Checklist */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-1/3 flex flex-col gap-4 overflow-y-auto pr-2"
          >
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm shrink-0">
              <p className="text-sm font-bold text-blue-900 leading-relaxed">
                {data.intro}
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm shrink-0">
              <h4 className="text-sm font-black text-gray-800 uppercase mb-3 border-b pb-2">How to Demo</h4>
              <ul className="flex flex-col gap-2">
                {data.demo.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm shrink-0">
              <h4 className="text-sm font-black text-gray-800 uppercase mb-3 border-b pb-2">Quick Checklist</h4>
              <ul className="flex flex-col gap-2">
                {data.checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-600">
                    <CheckCircle size={14} className="text-blue-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: The 5 Genres / Ideas */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-2/3 flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex w-full overflow-x-auto border-b border-gray-200 bg-gray-50 shrink-0" style={{ scrollbarWidth: 'none' }}>
              {data.genres.map((genre, i) => (
                <button
                  key={genre.id}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 flex flex-col items-center justify-center p-3 gap-1 min-w-[100px] transition-all border-b-2 ${
                    activeTab === i 
                      ? 'bg-white border-blue-600 text-blue-600 shadow-[inset_0_-2px_0_0_#2563eb]' 
                      : 'border-transparent text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <div className={activeTab === i ? 'text-blue-600' : 'text-gray-400'}>
                    {icons[i]}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-center line-clamp-2">{genre.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 h-full"
                >
                  {/* Generated Image for the idea */}
                  <div className="w-48 h-48 md:w-56 md:h-56 mx-auto bg-gray-100 border border-gray-200 rounded-xl overflow-hidden shrink-0 shadow-sm relative group">
                    <img 
                      src={images[activeTab]} 
                      alt={data.genres[activeTab].title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pb-4">
                    <div>
                      <h5 className="text-xs font-black uppercase text-red-500 mb-1 tracking-wider">Real Problem</h5>
                      <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                        {data.genres[activeTab].problem}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm">
                      <h5 className="text-xs font-black uppercase text-blue-600 mb-1 tracking-wider">Your Challenge</h5>
                      <p className="text-sm font-bold text-blue-900 leading-relaxed">
                        {data.genres[activeTab].challenge}
                      </p>
                    </div>

                    {(data.genres[activeTab] as any).tip && (
                      <div className="bg-amber-50 p-2 border-l-4 border-amber-400 rounded-r-md">
                        <h5 className="text-[10px] font-black uppercase text-amber-600 mb-0.5 tracking-wider">Tip</h5>
                        <p className="text-xs font-semibold text-amber-900">
                          {(data.genres[activeTab] as any).tip}
                        </p>
                      </div>
                    )}
                    
                    {(data.genres[activeTab] as any).business && (
                      <div className="bg-emerald-50 p-2 border-l-4 border-emerald-500 rounded-r-md">
                        <h5 className="text-[10px] font-black uppercase text-emerald-700 mb-0.5 tracking-wider">Business Idea</h5>
                        <p className="text-xs font-semibold text-emerald-900">
                          {(data.genres[activeTab] as any).business}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </SceneWrapper>
  );
}
