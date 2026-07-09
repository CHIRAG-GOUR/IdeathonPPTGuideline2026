"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { ideathonData } from "@/content/ideathon-data";
import { Suspense, useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ErrorBoundary } from "../ErrorBoundary";
import * as THREE from "three";
import { Sparkles, Banknote, Trophy as TrophyIcon, ScrollText, Laptop } from "lucide-react";
import Image from "next/image";

function Confetti() {
  const count = 150;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 6,
          Math.random() * 8,
          (Math.random() - 0.5) * 4
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        speed: Math.random() * 0.05 + 0.02,
        color: new THREE.Color().setHSL(Math.random(), 1, 0.6)
      });
    }
    return temp;
  }, []);

  useLayoutEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        meshRef.current.setColorAt(i, particles[i].color);
      }
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [particles]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.position[1] -= p.speed;
      p.rotation[0] += 0.05;
      p.rotation[1] += 0.05;
      
      if (p.position[1] < -3) {
        p.position[1] = 5 + Math.random() * 3;
        p.position[0] = (Math.random() - 0.5) * 6;
      }
      
      dummy.position.set(p.position[0], p.position[1], p.position[2]);
      dummy.rotation.set(p.rotation[0], p.rotation[1], p.rotation[2]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.15, 0.15]} />
      <meshBasicMaterial side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

export default function Scene8() {
  const itemLeft = {
    hidden: { opacity: 0, x: -100 },
    show: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring" as const, bounce: 0.5, delay: 0.5 + i * 0.4 } 
    })
  };

  const itemRight = {
    hidden: { opacity: 0, x: 100 },
    show: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring" as const, bounce: 0.5, delay: 0.7 + i * 0.4 } 
    })
  };

  return (
    <SceneWrapper>
      <div className="w-full flex flex-col items-center p-4 max-w-7xl mx-auto h-full justify-start pt-10">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 bg-gradient-to-b from-blue-600 to-blue-800 p-4 rounded-xl shadow-lg border border-blue-400 w-full max-w-5xl relative overflow-hidden shrink-0 z-20"
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-[shine_3s_infinite]"></div>
          
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-widest drop-shadow-md mb-1 relative z-10" style={{ WebkitTextStroke: '1.5px #000' }}>
            {ideathonData.scene8.title}
          </h2>
          <h3 className="text-base md:text-lg font-bold text-blue-100 uppercase tracking-widest relative z-10">
            {ideathonData.scene8.subtitle}
          </h3>
          <p className="mt-1 text-white font-bold bg-black/20 inline-block px-4 py-0.5 rounded-full text-[10px] md:text-xs relative z-10">
            {ideathonData.scene8.hostedAt}
          </p>
        </motion.div>

        <div className="relative w-full flex-1 flex mt-6">
          
          {/* Middle Layer - 3D Trophy perfectly centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* Proper glowing back */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-yellow-400/40 rounded-full blur-[80px] pointer-events-none mix-blend-screen z-0 mt-8"
            />
            
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 1.15 }}
              animate={{ opacity: 1, y: -40, scale: 1.15 }}
              transition={{ duration: 1.5 }}
              className="w-[500px] h-[500px] relative z-10 flex flex-col items-center justify-center"
            >
              {/* Spinning Trophy Image overlay */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mt-10">
                <Image src="/Trophy.gif" alt="Trophy" width={200} height={200} className="object-contain" unoptimized />
              </div>
              
              <ErrorBoundary fallback={<div />}>
                <Canvas camera={{ position: [0, 1, 5], fov: 45 }} className="w-full h-full absolute inset-0 z-10" style={{ background: 'transparent' }}>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 5]} intensity={2} />
                  <Confetti />
                </Canvas>
              </ErrorBoundary>
            </motion.div>
          </div>

          {/* Foreground Layer - Pointers Grid */}
          <div className="relative z-10 grid grid-cols-2 w-full h-full pointer-events-none">
            
            {/* Left Column - The Experience */}
            <div className="flex flex-col justify-center px-4 md:px-12 items-start pointer-events-auto mt-[-40px]">
              <motion.h4 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-lg md:text-2xl font-black text-gray-800 uppercase tracking-widest mb-3 drop-shadow-sm border-b-4 border-blue-500 pb-1 inline-block bg-white/50 px-4 rounded-t-xl"
              >
                The Experience
              </motion.h4>
              <div className="flex flex-col gap-2 md:gap-3 w-full">
                {ideathonData.scene8.experience.map((exp, i) => (
                  <motion.div key={i} custom={i} variants={itemLeft} initial="hidden" animate="show" className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-3 px-4 rounded-xl shadow-md border border-gray-200 w-full max-w-[320px]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Sparkles size={16} className="text-blue-600" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-gray-800 leading-tight">{exp}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                className="mt-3 text-xs md:text-sm font-bold text-gray-600 italic bg-white/60 px-4 py-2 rounded-xl border border-white/50 max-w-[320px]"
              >
                {ideathonData.scene8.desc}
              </motion.p>
            </div>

            {/* Right Column - The Rewards */}
            <div className="flex flex-col justify-center px-4 md:px-12 items-end text-right pointer-events-auto mt-[-40px]">
              <motion.h4 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-lg md:text-2xl font-black text-yellow-400 uppercase tracking-widest mb-3 drop-shadow-sm border-b-4 border-yellow-500 pb-1 inline-block bg-gray-800 px-4 rounded-t-xl"
              >
                The Rewards
              </motion.h4>
              <div className="flex flex-col gap-2 md:gap-3 items-end w-full">
                {ideathonData.scene8.rewards.map((reward, i) => {
                  let Icon = Sparkles;
                  if (reward.text.toLowerCase().includes('cash')) Icon = Banknote;
                  else if (reward.text.toLowerCase().includes('trophy')) Icon = TrophyIcon;
                  else if (reward.text.toLowerCase().includes('certificate')) Icon = ScrollText;
                  else if (reward.text.toLowerCase().includes('device')) Icon = Laptop;
                  
                  return (
                    <motion.div key={i} custom={i} variants={itemRight} initial="hidden" animate="show" className="flex items-center justify-end gap-3 bg-gray-800 p-3 px-4 rounded-xl shadow-md border border-gray-700 w-full max-w-[320px]">
                      <span className="text-xs md:text-sm font-bold text-white leading-tight">{reward.text}</span>
                      <div className="w-8 h-8 rounded-full bg-yellow-100/10 flex items-center justify-center shadow-inner shrink-0 border border-yellow-500/30">
                        <Icon size={16} className="text-yellow-400" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </SceneWrapper>
  );
}
