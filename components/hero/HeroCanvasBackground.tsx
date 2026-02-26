'use client';

import { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function HeroCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 180 });
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Create nodes (glowing dots) - reduced for better performance
    const nodes: Node[] = [];
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 3 + 1.5,
      });
    }
    nodesRef.current = nodes;

    let resizeTimeout: NodeJS.Timeout;
    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }, 150);
    };
    window.addEventListener('resize', resize);

    let mouseMoveTimeout: NodeJS.Timeout;
    const handleMouse = (e: MouseEvent) => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }, 16); // Throttle to ~60fps
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    let frame: number;
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime < interval) {
        frame = requestAnimationFrame(draw);
        return;
      }
      
      lastTime = currentTime - (deltaTime % interval);

      // Clear canvas (transparent background)
      ctx.clearRect(0, 0, w, h);

      // Connection lines (circuit lines) - Electric Blue
      ctx.strokeStyle = '#2F80ED';
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.globalAlpha = ((200 - dist) / 200) * 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();

            // Mouse highlight (lines glow brighter near cursor)
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const distToMouse = Math.hypot(node.x - mx, node.y - my);
            if (distToMouse < mouseRef.current.radius) {
              ctx.strokeStyle = '#60A5FA';
              ctx.lineWidth = 2;
              ctx.globalAlpha = ((200 - dist) / 200) * 0.7;
              ctx.stroke();
              ctx.strokeStyle = '#2F80ED';
              ctx.lineWidth = 1.5;
            }
          }
        }
      }
      ctx.globalAlpha = 1;

      // Moving nodes (glowing dots) - Electric Blue
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        // Draw glowing node
        ctx.shadowColor = '#2F80ED';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 6;
        ctx.fillStyle = '#2F80ED';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimeout);
      clearTimeout(mouseMoveTimeout);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
}
