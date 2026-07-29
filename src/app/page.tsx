"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Scene1 from "@/components/scenes/Scene1";
import Scene2 from "@/components/scenes/Scene2";
import Scene3 from "@/components/scenes/Scene3";
import Scene4 from "@/components/scenes/Scene4";
import Scene5 from "@/components/scenes/Scene5";
import Scene6 from "@/components/scenes/Scene6";
import Scene7 from "@/components/scenes/Scene7";
import Scene8 from "@/components/scenes/Scene8";
import Scene9 from "@/components/scenes/Scene9";
import Scene10 from "@/components/scenes/Scene10";
import Scene11 from "@/components/scenes/Scene11";
import SceneGuidelines from "@/components/scenes/SceneGuidelines";
import SceneJuniorProblems from "@/components/scenes/SceneJuniorProblems";
import SceneVideo from "@/components/scenes/SceneVideo";
import { Trophy, Maximize, Minimize, RotateCw, ChevronLeft, ChevronRight, Smartphone } from "lucide-react";

const TOTAL_SCENES = 14;
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
    if (activeScene < TOTAL_SCENES - 1) {
      setActiveScene((prev) => prev + 1);
    }
  }, [activeScene]);

  const prevAction = useCallback(() => {
    if (activeScene > 0) {
      setActiveScene((prev) => prev - 1);
    }
  }, [activeScene]);

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
      if (activeScene === 8) return;

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
      if (activeScene === 8) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        nextAction();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        prevAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScene, nextAction, prevAction]);

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
      if (activeScene === 8) return; // Block swipe on video slide
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
      case 0: return <Scene1 key="scene1" />;
      case 1: return <Scene2 key="scene2" />;
      case 2: return <Scene3 key="scene3" />;
      case 3: return <Scene4 key="scene4" />;
      case 4: return <SceneJuniorProblems key="sceneJuniorProblems" />;
      case 5: return <SceneGuidelines key="sceneGuidelines" />;
      case 6: return <Scene5 key="scene5" />;
      case 7: return <Scene6 key="scene6" />;
      case 8: return <SceneVideo key="sceneVideo" />;
      case 9: return <Scene7 key="scene7" />;
      case 10: return <Scene8 key="scene8" />;
      case 11: return <Scene9 key="scene9" />;
      case 12: return <Scene10 key="scene10" />;
      case 13: return <Scene11 key="scene11" />;
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

      {/* Top Left: Combined Landscape + Fullscreen Toggle Button */}
      <button
        onClick={toggleLandscapeFullscreen}
        aria-label="Toggle Landscape & Fullscreen"
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 px-3.5 py-2 md:px-5 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm rounded-full shadow-lg border border-blue-400/40 transition-all duration-300 active:scale-95 group cursor-pointer"
      >
        <Smartphone size={16} className="group-hover:rotate-90 transition-transform duration-300" />
        <Maximize size={16} />
        <span className="hidden sm:inline">Landscape & Fullscreen</span>
        <span className="sm:hidden">Full Landscape</span>
      </button>

      {/* Mobile Portrait Mode Rotation Guidance Prompt with 1-Tap Auto-Rotate */}
      {isPortraitMobile && (
        <div
          onClick={toggleLandscapeFullscreen}
          className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-blue-600/95 text-white backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-blue-300/40 flex items-center gap-2.5 text-xs font-bold animate-pulse cursor-pointer hover:bg-blue-700 transition-colors"
        >
          <RotateCw size={16} className="animate-spin" />
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
          <div
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
            onClick={handleStart}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center px-6"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="mb-8 drop-shadow-sm text-yellow-500"
              >
                <Trophy size={80} strokeWidth={1.5} />
              </motion.div>

              <h1
                className="text-6xl lg:text-7xl font-black uppercase tracking-tight mb-4 leading-tight text-gray-900"
                style={{ WebkitTextStroke: "2px #111111", color: "transparent" }}
              >
                SkilliZee Ideathon 2026
              </h1>
              <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-gray-600 mb-10">
                PPT Guidelines
              </h2>

              <div className="bg-white border border-gray-200 px-8 py-4 rounded-full shadow-md">
                <span className="text-base text-gray-600 uppercase tracking-[0.2em] font-bold animate-pulse">
                  Click anywhere to begin
                </span>
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


