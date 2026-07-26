"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
  vx: number;
}

/**
 * Plain 2D canvas starfield — same spirit as the aurora shader
 * (GPU-friendly, mouse-reactive, slow ambient drift) but for the
 * ending's night sky, where a WebGL aurora would be the wrong mood.
 */
export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    const mouse = { x: 0, y: 0 };

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      const count = Math.floor((width * height) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.05,
      }));
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("mousemove", handleMouseMove);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId: number;
    let t = 0;
    function render() {
      if (!ctx || !canvas) return;
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      const parallaxX = mouse.x * 8;
      const parallaxY = mouse.y * 8;

      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.x += star.vx;
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
        }
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.speed + star.phase);
        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(218, 226, 253, ${0.25 + twinkle * 0.6})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />;
}
