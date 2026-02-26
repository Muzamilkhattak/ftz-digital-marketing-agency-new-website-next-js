'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number; dx: number; dy: number }>>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const params = {
      pointsNumber: 30,
      spring: 0.4,
      friction: 0.5,
      baseWidth: 1.2,
    };

    // Setup canvas size
    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setupCanvas();

    // Initialize trail
    const initTrail = () => {
      trailRef.current = [];
      for (let i = 0; i < params.pointsNumber; i++) {
        trailRef.current.push({
          x: pointerRef.current.x,
          y: pointerRef.current.y,
          dx: 0,
          dy: 0,
        });
      }
    };

    // Set initial pointer position to center
    pointerRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    initTrail();

    // Update mouse position
    const updateMousePosition = (x: number, y: number) => {
      pointerRef.current.x = x;
      pointerRef.current.y = y;
    };

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleResize = () => {
      setupCanvas();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade for trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;
      const pointer = pointerRef.current;

      // Update trail points
      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;

        // Apply spring physics with velocity accumulation
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;

        // Apply friction
        p.dx *= params.friction;
        p.dy *= params.friction;

        // Update position
        p.x += p.dx;
        p.y += p.dy;
      });

      // Draw smooth curved line
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);

        // Draw quadratic curves for smoothness
        for (let i = 1; i < trail.length - 1; i++) {
          const xc = 0.5 * (trail[i].x + trail[i + 1].x);
          const yc = 0.5 * (trail[i].y + trail[i + 1].y);
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);

          // Decrease line width along the trail
          ctx.lineWidth = params.baseWidth * (params.pointsNumber - i);
        }

        // Style the line
        ctx.strokeStyle = '#2F80ED';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Add glow effect
        ctx.shadowColor = '#2F80ED';
        ctx.shadowBlur = 20;
        ctx.globalAlpha = 0.7;

        ctx.stroke();

        // Draw additional glow layer
        ctx.shadowBlur = 35;
        ctx.globalAlpha = 0.3;
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
