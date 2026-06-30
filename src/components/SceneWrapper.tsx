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
      {children}
    </motion.div>
  );
}
