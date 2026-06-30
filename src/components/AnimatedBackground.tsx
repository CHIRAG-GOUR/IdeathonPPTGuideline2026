"use client";

import { useEffect, useRef } from "react";

/**
 * Enhanced full-screen animated canvas background with flowing
 * gold / silver / bronze waves (smoke-like) and vibrant orbs,
 * giving a dynamic, premium championship-medal aesthetic.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const palette = [
      "rgba(255,215,0,",   // Gold
      "rgba(218,165,32,",  // Dark-Gold
      "rgba(192,192,192,", // Silver
      "rgba(205,127,50,",  // Bronze
      "rgba(255,235,150,", // Light-Gold
    ];

    // ---------- Orbs ----------
    interface Orb {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    }

    const orbs: Orb[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 200 + Math.random() * 350,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: 0.15 + Math.random() * 0.2, // increased opacity for more pop
    }));

    // ---------- Smoke Waves (Ribbons) ----------
    interface Wave {
      y: number;
      length: number;
      amplitude: number;
      speed: number;
      color: string;
      phase: number;
      alpha: number;
    }

    const waves: Wave[] = Array.from({ length: 5 }, (_, i) => ({
      y: (height / 6) * (i + 1) + (Math.random() * 200 - 100),
      length: 0.001 + Math.random() * 0.002,
      amplitude: 50 + Math.random() * 150,
      speed: 0.005 + Math.random() * 0.01,
      color: palette[Math.floor(Math.random() * palette.length)],
      phase: Math.random() * Math.PI * 2,
      alpha: 0.1 + Math.random() * 0.2,
    }));

    // ---------- Particles ----------
    interface Particle {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      life: Math.random() * 300,
      maxLife: 300 + Math.random() * 300,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    let time = 0;

    // ---------- Draw loop ----------
    const draw = () => {
      time += 1;

      // Soft cream / off-white base
      ctx.fillStyle = "#FFFDF7";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw flowing orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently
        if (orb.x - orb.r < -200 || orb.x + orb.r > width + 200) orb.vx *= -1;
        if (orb.y - orb.r < -200 || orb.y + orb.r > height + 200) orb.vy *= -1;

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r
        );
        grad.addColorStop(0, orb.color + String(orb.alpha) + ")");
        grad.addColorStop(1, orb.color + "0)");

        ctx.fillStyle = grad;
        ctx.fillRect(orb.x - orb.r, orb.y - orb.r, orb.r * 2, orb.r * 2);
      }

      // 2. Draw Smoke Waves
      for (const wave of waves) {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x < width; x += 10) {
          // Complex sine wave for a flowing smoke-like effect
          const y =
            wave.y +
            Math.sin(x * wave.length + wave.phase + time * wave.speed) * wave.amplitude * 0.5 +
            Math.cos(x * wave.length * 0.5 - wave.phase - time * wave.speed * 1.5) * wave.amplitude * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const waveGrad = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height);
        waveGrad.addColorStop(0, wave.color + String(wave.alpha) + ")");
        waveGrad.addColorStop(1, wave.color + "0)");
        
        ctx.fillStyle = waveGrad;
        ctx.fill();
      }

      // 3. Draw sparkle particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        if (p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 0;
          p.maxLife = 300 + Math.random() * 300;
        }

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.5
          ? progress * 2 * 0.8
          : (1 - progress) * 2 * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + String(alpha) + ")";
        ctx.fill();
      }

      // 4. Subtle animated noise / grain overlay
      for (let i = 0; i < 60; i++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        ctx.fillStyle = `rgba(200,180,100,${Math.random() * 0.03})`;
        ctx.fillRect(gx, gy, 2, 2);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
