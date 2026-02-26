'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import * as THREE from 'three';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  image: string;
  tag?: string;
  href?: string;
}

type ParticleNetworkProps = {
  active: boolean;
  color: string;
};

const PARTICLE_COUNT = 34;
const MAX_TILT = 15;

function getAccentColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hue = 198 + (Math.abs(hash) % 48);
  return `hsl(${hue} 88% 62%)`;
}

function ParticleNetwork({ active, color }: ParticleNetworkProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const apiRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const pointPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const p = i * 3;
      pointPositions[p] = Math.random() * 2 - 1;
      pointPositions[p + 1] = Math.random() * 2 - 1;
      pointPositions[p + 2] = 0;
      velocities[i * 2] = (Math.random() - 0.5) * 0.008;
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.008;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.035,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const maxPairCount = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxPairCount * 6);
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    linesGeometry.setDrawRange(0, 0);
    scene.add(lines);

    const resize = () => {
      const { clientWidth, clientHeight } = host;
      renderer.setSize(clientWidth, clientHeight, false);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (!activeRef.current) return;

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const p = i * 3;
        const v = i * 2;

        pointPositions[p] += velocities[v];
        pointPositions[p + 1] += velocities[v + 1];

        if (pointPositions[p] > 1 || pointPositions[p] < -1) {
          velocities[v] *= -1;
          pointPositions[p] = Math.max(Math.min(pointPositions[p], 1), -1);
        }
        if (pointPositions[p + 1] > 1 || pointPositions[p + 1] < -1) {
          velocities[v + 1] *= -1;
          pointPositions[p + 1] = Math.max(Math.min(pointPositions[p + 1], 1), -1);
        }
      }

      let lineIndex = 0;
      const distanceThreshold = 0.34;
      const thresholdSq = distanceThreshold * distanceThreshold;

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const ia = i * 3;
        for (let j = i + 1; j < PARTICLE_COUNT; j += 1) {
          const ib = j * 3;
          const dx = pointPositions[ia] - pointPositions[ib];
          const dy = pointPositions[ia + 1] - pointPositions[ib + 1];
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < thresholdSq) {
            linePositions[lineIndex] = pointPositions[ia];
            linePositions[lineIndex + 1] = pointPositions[ia + 1];
            linePositions[lineIndex + 2] = 0;
            linePositions[lineIndex + 3] = pointPositions[ib];
            linePositions[lineIndex + 4] = pointPositions[ib + 1];
            linePositions[lineIndex + 5] = 0;
            lineIndex += 6;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineIndex / 3);
      (pointsGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (linesGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (activeRef.current) return;
      activeRef.current = true;
      animate();
    };

    const stop = () => {
      activeRef.current = false;
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    apiRef.current = { start, stop };
    if (active) {
      start();
    }

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [color]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    if (active) {
      api.start();
    } else {
      api.stop();
    }
  }, [active]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      <div
        ref={hostRef}
        className={`h-full w-full transition-opacity duration-300 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default function ServiceCard({ title, image, tag = 'FTZ Digital', href }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = useMemo(() => getAccentColor(title), [title]);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const rawLift = useMotionValue(0);
  const rawShadowX = useMotionValue(0);
  const rawShadowY = useMotionValue(26);
  const rawGlareX = useMotionValue(50);
  const rawGlareY = useMotionValue(50);
  const rawArrowX = useMotionValue(0);
  const rawArrowY = useMotionValue(0);
  const rawArrowZ = useMotionValue(0);

  const tiltX = useSpring(rawTiltX, { stiffness: 220, damping: 22, mass: 0.7 });
  const tiltY = useSpring(rawTiltY, { stiffness: 220, damping: 22, mass: 0.7 });
  const liftY = useSpring(rawLift, { stiffness: 260, damping: 24, mass: 0.7 });
  const shadowX = useSpring(rawShadowX, { stiffness: 220, damping: 26 });
  const shadowY = useSpring(rawShadowY, { stiffness: 220, damping: 26 });
  const glareX = useSpring(rawGlareX, { stiffness: 260, damping: 30 });
  const glareY = useSpring(rawGlareY, { stiffness: 260, damping: 30 });
  const arrowX = useSpring(rawArrowX, { stiffness: 260, damping: 24 });
  const arrowY = useSpring(rawArrowY, { stiffness: 260, damping: 24 });
  const arrowZ = useSpring(rawArrowZ, { stiffness: 260, damping: 24 });

  const cardTransform = useMotionTemplate`perspective(1100px) translateY(${liftY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  const cardShadow = useMotionTemplate`${shadowX}px ${shadowY}px 46px rgba(3, 14, 35, 0.52), ${shadowX}px ${shadowY}px 80px rgba(47, 128, 237, 0.2)`;
  const glareGradient = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.42), rgba(255,255,255,0.16) 18%, rgba(47,128,237,0.1) 42%, rgba(47,128,237,0) 62%)`;
  const arrowTransform = useMotionTemplate`translate3d(${arrowX}px, ${arrowY}px, ${arrowZ}px)`;

  const resetMotion = () => {
    rawTiltX.set(0);
    rawTiltY.set(0);
    rawLift.set(0);
    rawShadowX.set(0);
    rawShadowY.set(26);
    rawGlareX.set(50);
    rawGlareY.set(50);
    rawArrowX.set(0);
    rawArrowY.set(0);
    rawArrowZ.set(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const nx = (px - 0.5) * 2;
    const ny = (py - 0.5) * 2;

    rawTiltY.set(nx * MAX_TILT);
    rawTiltX.set(-ny * MAX_TILT);
    rawShadowX.set(nx * 18);
    rawShadowY.set(26 + ny * 16);
    rawGlareX.set(px * 100);
    rawGlareY.set(py * 100);
    rawArrowX.set(nx * 4);
    rawArrowY.set(ny * -4);
    rawArrowZ.set(30);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    rawLift.set(-10);
    rawArrowZ.set(30);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    resetMotion();
  };

  const card = (
    <motion.div
      ref={cardRef}
      data-hide-cursor-trail
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="service-card group relative h-full overflow-hidden rounded-3xl border border-white/15 bg-[#0d2348]/35 backdrop-blur-sm"
      style={{
        transformStyle: 'preserve-3d',
        transform: cardTransform,
        boxShadow: cardShadow,
      }}
      animate={{
        borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.15)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {isHovered ? <ParticleNetwork active={isHovered} color={accentColor} /> : null}

      <div className="relative h-64 md:h-72">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-3"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08162f] via-[#0a2044]/50 to-transparent" />
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundImage: glareGradient,
          }}
        />
      </div>

      <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between">
        <div className="rounded-full border border-white/20 bg-primary-navy/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
          {tag}
        </div>
        <motion.div
          className="rounded-full border border-white/20 bg-primary-navy/50 p-2 text-white/70 transition-colors duration-300"
          style={{
            transformStyle: 'preserve-3d',
            transform: arrowTransform,
            borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.2)',
            color: isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
          }}
        >
          <FiArrowUpRight className="h-4 w-4" />
        </motion.div>
      </div>

      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-primary-navy/75 p-5 backdrop-blur-xl transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <div
          className="mb-2 h-[2px] w-12 rounded-full transition-all duration-500 group-hover:w-24"
          style={{ backgroundColor: accentColor }}
        />
        <h3 className="text-xl font-heading font-bold leading-tight" style={{ color: '#FFFFFF' }}>
          {title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 group-hover:text-white">
          Explore Service
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">+</span>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full"
        style={{ backgroundColor: accentColor }}
        animate={{ x: isHovered ? '0%' : '-102%', opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
      />
    </motion.div>
  );

  if (!href) {
    return card;
  }

  return (
    <Link href={href} className="block h-full" aria-label={`Open ${title} service details`}>
      {card}
    </Link>
  );
}
