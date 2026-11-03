"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SceneWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 z-10"
      style={{ background: "transparent" }}
    >
      {/* Blurred Kids Math Equations (Moves with the slide) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none overflow-hidden mix-blend-multiply blur-[4px] font-black z-0"
        style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive" }}
      >
        <div className="absolute top-[10%] left-[15%] text-4xl transform -rotate-12 text-amber-800">2 + 2 = 4</div>
        <div className="absolute top-[25%] left-[80%] text-5xl transform rotate-6 text-yellow-800">x² + y² = z²</div>
        <div className="absolute top-[60%] left-[5%] text-3xl transform -rotate-6 text-orange-800">E = mc²</div>
        <div className="absolute top-[80%] left-[70%] text-6xl transform rotate-12 text-amber-900">1/2</div>
        <div className="absolute top-[40%] left-[45%] text-4xl transform -rotate-3 text-yellow-900">A = πr²</div>
        <div className="absolute top-[15%] left-[60%] text-5xl transform rotate-12 text-orange-900">f(x) = mx + c</div>
        <div className="absolute top-[75%] left-[30%] text-3xl transform -rotate-15 text-amber-800">3 × 4 = 12</div>
        <div className="absolute top-[50%] left-[20%] text-5xl transform rotate-6 text-yellow-800">∑ n</div>
        <div className="absolute top-[85%] left-[10%] text-4xl transform -rotate-12 text-amber-800">a² + b² = c²</div>
        <div className="absolute top-[5%] left-[40%] text-3xl transform rotate-12 text-yellow-700">y = mx+b</div>
      </div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}
