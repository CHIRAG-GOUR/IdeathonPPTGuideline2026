"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";

export default function Scene11() {
  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" as const, bounce: 0.5 }}
          className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter text-blue-700 drop-shadow-sm text-center uppercase"
         style={{ WebkitTextStroke: '1.5px #000' }}>
          Thank You
        </motion.h1>
      </div>
    </SceneWrapper>
  );
}
