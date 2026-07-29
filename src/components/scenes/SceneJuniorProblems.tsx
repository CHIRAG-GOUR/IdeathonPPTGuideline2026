"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import { Wallet, Recycle } from "lucide-react";

export default function SceneJuniorProblems() {
  const [activeTab, setActiveTab] = useState(0);
  const data = ideathonData.sceneJuniorProblems;
  const isScrolling = useRef(false);

  // Auto-switch tabs every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev < 1 ? prev + 1 : 0));
    }, 15000);
    return () => clearInterval(timer);
  }, [activeTab]);

  // Intercept wheel navigation to switch tabs first
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.stopPropagation();
        return;
      }
      if (e.deltaY > 50) {
        if (activeTab < 1) {
          e.stopPropagation();
          isScrolling.current = true;
          setActiveTab((prev) => prev + 1);
          setTimeout(() => { isScrolling.current = false; }, 800);
        }
      } else if (e.deltaY < -50) {
        if (activeTab > 0) {
          e.stopPropagation();
          isScrolling.current = true;
          setActiveTab((prev) => prev - 1);
          setTimeout(() => { isScrolling.current = false; }, 800);
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { capture: true });
    return () => window.removeEventListener("wheel", handleWheel, { capture: true });
  }, [activeTab]);

  // Intercept keyboard navigation to switch tabs first
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        if (activeTab < 1) {
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

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [activeTab]);

  const icons = [
    <Wallet key={0} size={24} />,
    <Recycle key={1} size={24} />
  ];

  const images = [
    "/media/pocket_money_junior.png",
    "/media/sustainability_junior.png"
  ];

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col p-3 md:p-6 max-w-7xl mx-auto overflow-hidden">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 shrink-0"
        >
          <h2 className="text-3xl md:text-4xl font-black text-blue-600 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1px #000' }}>
            {data.title}
          </h2>
          <h3 className="text-base md:text-lg font-bold text-gray-700 uppercase tracking-widest mt-1">
            {data.subtitle}
          </h3>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 flex flex-row gap-4 overflow-hidden max-w-5xl mx-auto w-full">

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex w-full overflow-x-auto border-b border-gray-200 bg-gray-50 shrink-0">
              {data.problems.map((problem, i) => (
                <button
                  key={problem.id}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 flex items-center justify-center p-3 gap-2 transition-all border-b-2 ${activeTab === i
                      ? 'bg-white border-blue-600 text-blue-600 shadow-[inset_0_-2px_0_0_#2563eb]'
                      : 'border-transparent text-gray-500 hover:bg-gray-100'
                    }`}
                >
                  <div className={activeTab === i ? 'text-blue-600' : 'text-gray-400'}>
                    {icons[i]}
                  </div>
                  <span className="text-sm uppercase font-bold tracking-wider">{problem.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-5 overflow-hidden relative flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-row gap-4 h-full items-stretch"
                >
                  {/* Generated Image for the idea */}
                  <div className="w-[35%] bg-gray-100 border border-gray-200 rounded-xl overflow-hidden shrink-0 shadow-sm relative group min-h-[200px]">
                    <img
                      src={images[activeTab]}
                      alt={data.problems[activeTab].title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="w-[65%] flex flex-col gap-3 pb-1 h-full overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
                    <div>
                      <h5 className="text-[11px] font-black uppercase text-red-500 mb-1 tracking-wider">Real Problem</h5>
                      <p className="text-xs md:text-sm font-semibold text-gray-700 leading-snug whitespace-pre-line">
                        {data.problems[activeTab].problem}
                      </p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 shadow-sm">
                      <h5 className="text-[11px] font-black uppercase text-blue-600 mb-1 tracking-wider">Your Challenge</h5>
                      <p className="text-xs md:text-sm font-bold text-blue-900 leading-snug">
                        {data.problems[activeTab].challenge}
                      </p>
                    </div>

                    {(data.problems[activeTab] as Record<string, string | undefined>).business && (
                      <div className="bg-emerald-50 p-3 border-l-4 border-emerald-500 rounded-r-xl shadow-sm">
                        <h5 className="text-[11px] font-black uppercase text-emerald-700 mb-1 tracking-wider">Business Idea</h5>
                        <p className="text-xs font-semibold text-emerald-900 leading-snug whitespace-pre-line">
                          {(data.problems[activeTab] as Record<string, string | undefined>).business}
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
