'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

type HotspotAlign = 'left' | 'center' | 'right';

export type TeamInteractiveMember = {
  id: number;
  name: string;
  role: string;
  left: string;
  top: string;
  width: string;
  height: string;
  align?: HotspotAlign;
};

type TeamInteractiveProps = {
  imageSrc: string | StaticImageData;
  imageAlt: string;
  members: TeamInteractiveMember[];
};

const getTooltipAlignClass = (align?: HotspotAlign) => {
  if (align === 'left') return 'left-0';
  if (align === 'right') return 'right-0';
  return 'left-1/2 -translate-x-1/2';
};

export default function TeamInteractive({ imageSrc, imageAlt, members }: TeamInteractiveProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');

    const updateDeviceType = () => {
      setIsTouchDevice(mediaQuery.matches);
    };

    updateDeviceType();
    mediaQuery.addEventListener('change', updateDeviceType);

    return () => {
      mediaQuery.removeEventListener('change', updateDeviceType);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveMemberId(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const handleMouseEnter = (memberId: number) => {
    if (!isTouchDevice) setActiveMemberId(memberId);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setActiveMemberId(null);
  };

  const handleHotspotClick = (memberId: number) => {
    if (!isTouchDevice) return;
    setActiveMemberId((prevId) => (prevId === memberId ? null : memberId));
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-7xl overflow-visible rounded-3xl border border-[#dbe6ff] bg-white p-2 shadow-[0_22px_55px_rgba(10,31,68,0.12)] md:p-3">
      <div className="relative aspect-[3120/1752] w-full overflow-hidden rounded-2xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1200px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1f44]/10 via-transparent to-transparent" />

        {members.map((member) => {
          const isActive = activeMemberId === member.id;

          return (
            <motion.button
              key={member.id}
              type="button"
              style={{
                left: member.left,
                top: member.top,
                width: member.width,
                height: member.height,
              }}
              onMouseEnter={() => handleMouseEnter(member.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleHotspotClick(member.id)}
              onFocus={() => setActiveMemberId(member.id)}
              onBlur={() => !isTouchDevice && setActiveMemberId(null)}
              aria-label={`${member.name} - ${member.role}`}
              className={`absolute z-20 rounded-xl border border-transparent bg-transparent transition-all duration-300 ease-in-out ${
                isActive ? 'border-white/70 bg-white/10' : 'hover:border-white/60 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`pointer-events-none absolute bottom-full mb-3 min-w-[160px] rounded-[12px] border border-white/70 bg-white/[0.96] px-4 py-3 text-left shadow-[0_14px_30px_rgba(10,31,68,0.24)] ${getTooltipAlignClass(member.align)}`}
                  >
                    <p className="font-heading text-sm font-bold text-[#0A1F44]">
                      {member.name}
                    </p>
                    <p className="mt-1 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f7397]">
                      {member.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
