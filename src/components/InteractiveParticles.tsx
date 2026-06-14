'use client';

import React, { useEffect, useRef } from 'react';

export const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface ParticleType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      update: () => void;
      draw: () => void;
    }

    const particles: ParticleType[] = [];
    const maxParticles = 55; // Highly optimized particle count

    // Tracker for subtle mouse attraction
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150, // Connection threshold
    };

    class Particle implements ParticleType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Subtle drift movement speeds
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.5 + 0.6;
        
        // Brand Identity color selection (vBiz Me gold & premium neutral whites)
        const rand = Math.random();
        if (rand > 0.8) {
          this.color = 'rgba(214, 175, 55, 0.45)'; // Soft gold
        } else if (rand > 0.5) {
          this.color = 'rgba(255, 255, 255, 0.25)'; // Soft white
        } else {
          this.color = 'rgba(255, 255, 255, 0.12)'; // Faint grid point white
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundary logic
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst interactive spark impact particles
      for (let i = 0; i < 10; i++) {
        const p = new Particle();
        p.x = clickX;
        p.y = clickY;
        p.vx = (Math.random() - 0.5) * 2.2;
        p.vy = (Math.random() - 0.5) * 2.2;
        p.size = Math.random() * 2 + 1;
        p.color = 'rgba(214, 175, 55, 0.7)'; // High-visibility gold splash
        particles.push(p);

        // Limit maximum splash particles to preserve CPU 
        if (particles.length > maxParticles + 15) {
          particles.shift();
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    canvas.addEventListener('click', handleClick, { passive: true });

    init();

    const drawLines = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw interactive connection line with mouse pointer
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(214, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connection lines to neighbor particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.52;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="hero-particles"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto mix-blend-screen opacity-65 select-none"
    />
  );
};
