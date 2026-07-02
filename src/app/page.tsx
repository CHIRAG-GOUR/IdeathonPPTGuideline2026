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
import Scene10 from "@/components/scenes/Scene10";

const TOTAL_SCENES = 9;

export default function Presentation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isScrolling = useRef(false);

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
  }, [nextAction, prevAction]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        nextAction();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        prevAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextAction, prevAction]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const renderScene = () => {
    switch (activeScene) {
      case 0: return <Scene1 key="scene1" />;
      case 1: return <Scene2 key="scene2" />;
      case 2: return <Scene3 key="scene3" />;
      case 3: return <Scene4 key="scene4" />;
      case 4: return <Scene5 key="scene5" />;
      case 5: return <Scene6 key="scene6" />;
      case 6: return <Scene7 key="scene7" />;
      case 7: return <Scene8 key="scene8" />;
      case 8: return <Scene10 key="scene10" />;
      default: return null;
    }
  };

  if (!hasStarted) {
    return (
      <main
        className="relative w-full h-screen flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={handleStart}
      >
        {/* Flowing background visible on start screen */}
        <AnimatedBackground />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          {/* Trophy icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-6xl md:text-8xl mb-8 drop-shadow-lg"
          >
            🏆
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight gold-shimmer-text mb-4 leading-tight" style={{ WebkitTextStroke: '2px #111111' }}>
            SkilliZee Ideathon 2026
          </h1>
          <h2 className="text-xl md:text-3xl font-bold uppercase tracking-[0.15em] silver-shimmer-text mb-10">
            PPT Guidelines
          </h2>

          <div className="glass-warm px-8 py-4 rounded-full glow-gold">
            <span className="text-sm md:text-base text-gray-600 uppercase tracking-[0.2em] font-bold animate-pulse">
              Click anywhere to begin
            </span>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen overflow-hidden font-sans">
      {/* Animated flowing background behind everything */}
      <AnimatedBackground />

      {/* Scene content */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {renderScene()}
        </AnimatePresence>
      </div>

      {/* Navigation Indicators – glass pill */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 glass-warm px-2 py-4 rounded-full">
        {Array.from({ length: TOTAL_SCENES }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveScene(idx)}
            className={`w-3 rounded-full transition-all duration-300 ${
              idx === activeScene
                ? "bg-gradient-to-b from-yellow-400 to-yellow-600 h-8 glow-gold"
                : "bg-gray-300/60 h-3 hover:bg-yellow-300/60"
            }`}
          />
        ))}
      </div>

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-6 right-6 z-50 p-3 glass-warm hover:glow-gold text-gray-600 hover:text-yellow-600 rounded-full transition-all duration-300"
      >
        <span className="text-xl leading-none">{isFullscreen ? "🗗" : "⛶"}</span>
      </button>
    </main>
  );
}
