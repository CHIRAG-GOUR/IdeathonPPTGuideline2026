"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen animated canvas background with flowing
 * gold / silver / bronze orbs and soft particle trails,
 * giving a championship-medal aesthetic.
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

    const palette = [
      "rgba(255,215,0,",   // Gold
      "rgba(218,165,32,",  // Dark-Gold
      "rgba(192,192,192,", // Silver
      "rgba(169,169,169,", // Dark-Silver
      "rgba(205,127,50,",  // Bronze
      "rgba(184,115,51,",  // Dark-Bronze
      "rgba(255,223,100,", // Light-Gold
      "rgba(230,230,230,", // Light-Silver
    ];

    const orbs: Orb[] = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 180 + Math.random() * 250,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: 0.12 + Math.random() * 0.12,
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

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      life: Math.random() * 200,
      maxLife: 200 + Math.random() * 300,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    // ---------- Draw loop ----------
    const draw = () => {
      // Soft cream / off-white base
      ctx.fillStyle = "#FFFDF7";
      ctx.fillRect(0, 0, width, height);

      // Draw flowing orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently
        if (orb.x - orb.r < -100 || orb.x + orb.r > width + 100) orb.vx *= -1;
        if (orb.y - orb.r < -100 || orb.y + orb.r > height + 100) orb.vy *= -1;

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

      // Draw sparkle particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        if (p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 300;
        }

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.5
          ? progress * 2 * 0.6
          : (1 - progress) * 2 * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + String(alpha) + ")";
        ctx.fill();
      }

      // Very subtle noise / grain overlay using transparent rectangles
      // (keeps it lightweight – no image decode)
      for (let i = 0; i < 40; i++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        ctx.fillStyle = `rgba(200,180,100,${Math.random() * 0.015})`;
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
