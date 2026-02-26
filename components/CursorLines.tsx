'use client';

import { useEffect, useRef } from 'react';

export default function CursorLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || typeof window === 'undefined') return;

    const svg = svgRef.current;
    const ease = 0.75;
    const total = 50; // Reduced for better performance

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    interface LineData {
      element: SVGLineElement;
      x: number;
      y: number;
    }

    const lines: LineData[] = [];
    let leader = pointer;

    // Create lines
    for (let i = 0; i < total; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      svg.appendChild(line);

      const lineData: LineData = {
        element: line,
        x: pointer.x,
        y: pointer.y,
      };

      // Set initial attributes
      line.setAttribute('x1', String(pointer.x));
      line.setAttribute('y1', String(pointer.y));
      line.setAttribute('x2', String(pointer.x));
      line.setAttribute('y2', String(pointer.y));
      line.setAttribute('stroke', '#2F80ED');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('opacity', String((total - i) / total));

      lines.push(lineData);
    }

    // Animation loop
    function animate() {
      // Update each line to follow the previous one
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const target = i === 0 ? pointer : lines[i - 1];

        // Smooth following with easing
        line.x += (target.x - line.x) * ease;
        line.y += (target.y - line.y) * ease;

        // Update line attributes
        line.element.setAttribute('x1', String(line.x));
        line.element.setAttribute('y1', String(line.y));
        line.element.setAttribute('x2', String(target.x));
        line.element.setAttribute('y2', String(target.y));
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Clean up lines
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
