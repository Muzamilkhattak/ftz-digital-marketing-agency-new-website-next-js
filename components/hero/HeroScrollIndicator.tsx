'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroScrollIndicator() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      onClick={scrollToNext}
    >
      <span className="text-[#94a3b8] text-xs font-body uppercase tracking-widest">
        SCROLL
      </span>
      <div className="relative w-[1px] h-12 bg-[#94a3b8]/30 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[#94a3b8]"
          style={{ transformOrigin: 'top' }}
          animate={{
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
