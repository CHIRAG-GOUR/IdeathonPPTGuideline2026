"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import S01Cover from "@/components/level2/S01Cover";
import S02About from "@/components/level2/S02About";
import S03Congrats from "@/components/level2/S03Congrats";
import S04Rules from "@/components/level2/S04Rules";
import S05Problem from "@/components/level2/S05Problem";
import S06Reel from "@/components/level2/S06Reel";
import S07Pitch from "@/components/level2/S07Pitch";
import S08Dates from "@/components/level2/S08Dates";
import S09Judging from "@/components/level2/S09Judging";
import S10Perks from "@/components/level2/S10Perks";
import S11Thanks from "@/components/level2/S11Thanks";
import { Trophy, Maximize, Minimize, RotateCw, ChevronLeft, ChevronRight, Presentation as PresentationIcon, GraduationCap, ExternalLink, ArrowRight, Sparkles } from "lucide-react";

const TOTAL_SCENES = 11;
const STAGE_WIDTH = 1440;
const STAGE_HEIGHT = 810;

export default function Presentation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stageScale, setStageScale] = useState(1);
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  const isScrolling = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Responsive stage scaling logic
  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Fit stage 100% within viewport while preserving 16:9 laptop layout
      const scaleX = vw / STAGE_WIDTH;
      const scaleY = vh / STAGE_HEIGHT;
      const computedScale = Math.min(scaleX, scaleY);

      setStageScale(computedScale);

      // Check if held in portrait mode on mobile screen
      if (vw < 768 && vh > vw) {
        setIsPortraitMobile(true);
      } else {
        setIsPortraitMobile(false);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("orientationchange", updateDimensions);
    };
  }, []);

  const handleStart = () => {
    setHasStarted(true);
  };

  const nextAction = useCallback(() => {
    if (!hasStarted) return;
    if (activeScene < TOTAL_SCENES - 1) {
      setActiveScene((prev) => prev + 1);
    }
  }, [hasStarted, activeScene]);

  const prevAction = useCallback(() => {
    if (!hasStarted) return;
    if (activeScene > 0) {
      setActiveScene((prev) => prev - 1);
    }
  }, [hasStarted, activeScene]);

  // Combined Landscape + Fullscreen Mode
  const toggleLandscapeFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
        if (typeof window !== "undefined" && screen.orientation && "lock" in screen.orientation) {
          // @ts-expect-error lock method exists in standard ScreenOrientation
          await screen.orientation.lock("landscape").catch(() => {});
        }
      } else {
        if (typeof window !== "undefined" && screen.orientation && "unlock" in screen.orientation) {
          screen.orientation.unlock();
        }
        await document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log("Landscape Fullscreen toggle error:", err);
    }
  };

  // Handle Wheel Events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      if (e.deltaY > 50) {
        nextAction();
      } else if (e.deltaY < -50) {
        prevAction();
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeScene, nextAction, prevAction]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted) {
        if (e.key === "Enter") {
          handleStart();
        }
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        nextAction();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        prevAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted, activeScene, nextAction, prevAction]);

  // Handle Touch Swipe Events for Mobile Navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold (50px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextAction();
      } else {
        prevAction();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const renderScene = () => {
    switch (activeScene) {
      case 0: return <S01Cover key="s01" />;
      case 1: return <S02About key="s02" />;
      case 2: return <S03Congrats key="s03" />;
      case 3: return <S04Rules key="s04" />;
      case 4: return <S05Problem key="s05" />;
      case 5: return <S06Reel key="s06" />;
      case 6: return <S07Pitch key="s07" />;
      case 7: return <S08Dates key="s08" />;
      case 8: return <S09Judging key="s09" />;
      case 9: return <S10Perks key="s10" />;
      case 10: return <S11Thanks key="s11" />;
      default: return null;
    }
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-[#FFFDF7] flex items-center justify-center font-sans select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Global Background */}
      <AnimatedBackground />

      {/* Extreme Left & Right Navigation Arrow Buttons (Positioned on main viewport so they NEVER overlap PPT data) */}
      {hasStarted && (
        <>
          <button
            onClick={prevAction}
            disabled={activeScene === 0}
            aria-label="Previous Slide"
            className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-blue-600 text-gray-700 hover:text-white shadow-xl border border-gray-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
              activeScene === 0 ? "opacity-30 cursor-not-allowed hover:bg-white/90 hover:text-gray-700" : "hover:scale-105"
            }`}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          </button>

          <button
            onClick={nextAction}
            disabled={activeScene === TOTAL_SCENES - 1}
            aria-label="Next Slide"
            className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-blue-600 text-gray-700 hover:text-white shadow-xl border border-gray-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
              activeScene === TOTAL_SCENES - 1 ? "opacity-30 cursor-not-allowed hover:bg-white/90 hover:text-gray-700" : "hover:scale-105"
            }`}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Top Left: Rotate & Fullscreen Icon Button (White Circle, Icon-Only) */}
      <button
        onClick={toggleLandscapeFullscreen}
        aria-label="Rotate to Landscape & Fullscreen"
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 p-3 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-600 hover:text-blue-600 rounded-full transition-all duration-300 group cursor-pointer active:scale-95 flex items-center justify-center"
      >
        <RotateCw size={20} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Mobile Portrait Mode Rotation Guidance Prompt with 1-Tap Auto-Rotate */}
      {isPortraitMobile && (
        <div
          onClick={toggleLandscapeFullscreen}
          className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-white/95 text-blue-700 backdrop-blur-md px-5 py-2 rounded-full shadow-md border border-blue-200 flex items-center gap-2 text-xs font-bold animate-pulse cursor-pointer hover:bg-white transition-colors"
        >
          <RotateCw size={16} className="animate-spin text-blue-600" />
          <span>Tap to enter Landscape & Fullscreen 📱</span>
        </div>
      )}

      {/* Stage Scaler Container - Enforces Laptop 16:9 Presentation Format Everywhere */}
      <div
        className="relative shrink-0 flex items-center justify-center z-10 transition-transform duration-150 ease-out overflow-hidden"
        style={{
          width: `${STAGE_WIDTH}px`,
          height: `${STAGE_HEIGHT}px`,
          transform: `scale(${stageScale})`,
          transformOrigin: "center center",
        }}
      >
        {!hasStarted ? (
          <div className="w-full h-full flex flex-col items-center justify-center select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="mb-6 drop-shadow-sm text-yellow-500"
              >
                <Trophy size={72} strokeWidth={1.5} />
              </motion.div>

              <h1
                className="text-6xl lg:text-7xl font-black uppercase tracking-tight mb-3 leading-tight text-gray-900"
                style={{ WebkitTextStroke: "2px #111111", color: "transparent" }}
              >
                SkilliZee Ideathon
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-[0.15em] text-gray-600 mb-8">
                Level 2 · Think. Build. Brand. Pitch.
              </h2>

              {/* 2 Separate Clickable Sections: PPT & Student Portal */}
              <div className="flex flex-row items-stretch justify-center gap-5 w-full max-w-5xl">
                {/* 1. Level 2 PPT Presentation */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStart}
                  className="flex-1 bg-white hover:bg-blue-50/40 border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_#1E63D0] hover:shadow-[8px_8px_0px_#111] transition-all text-left flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <PresentationIcon size={26} strokeWidth={2.2} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
                        Slide Deck
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Level 2 PPT
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 leading-relaxed">
                      Interactive slide presentation for mentors & students
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-sm font-black uppercase tracking-wider text-blue-600">
                    <span>Continue to PPT</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.button>

                {/* 2. Student Portal */}
                <motion.a
                  href="https://skillizee.io/ccws/student"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white hover:bg-emerald-50/40 border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_#10B981] hover:shadow-[8px_8px_0px_#111] transition-all text-left flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <GraduationCap size={26} strokeWidth={2.2} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <span>Portal</span>
                        <ExternalLink size={12} />
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                      Student Portal
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 leading-relaxed">
                      Access student workspace, track progress & submit work
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-sm font-black uppercase tracking-wider text-emerald-600">
                    <span>Open Portal</span>
                    <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.a>

                {/* 3. AI Masterclass (scrolling explainer at /ai-masterclass) */}
                <motion.a
                  href="/ai-masterclass"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white hover:bg-rose-50/40 border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_#F0547A] hover:shadow-[8px_8px_0px_#111] transition-all text-left flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F0547A] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Sparkles size={26} strokeWidth={2.2} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                        Masterclass
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-[#F0547A] transition-colors">
                      AI Masterclass
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 leading-relaxed">
                      2-hour AI masterclass: think, build, brand and pitch with AI
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-sm font-black uppercase tracking-wider text-[#F0547A]">
                    <span>Open Masterclass</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Scene Content */}
            <AnimatePresence mode="wait">{renderScene()}</AnimatePresence>

            {/* Slide Navigation Indicators */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 bg-white/90 shadow-md border border-gray-200 px-2.5 py-4 rounded-full">
              {Array.from({ length: TOTAL_SCENES }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScene(idx)}
                  className={`w-3.5 rounded-full transition-all duration-300 ${
                    idx === activeScene
                      ? "bg-blue-600 h-8 shadow-sm"
                      : "bg-gray-300 h-3.5 hover:bg-blue-400"
                  }`}
                />
              ))}
            </div>

            {/* Top Right Fullscreen Toggle Button */}
            <button
              onClick={toggleLandscapeFullscreen}
              className="absolute top-6 right-6 z-50 p-3 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-600 hover:text-blue-600 rounded-full transition-all duration-300"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}


