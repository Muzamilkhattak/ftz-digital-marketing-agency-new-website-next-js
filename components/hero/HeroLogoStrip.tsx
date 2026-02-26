'use client';

import { motion } from 'framer-motion';

export default function HeroLogoStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mt-16 md:mt-24"
    >
      <p className="text-[#475569] text-xs md:text-sm font-heading font-bold uppercase tracking-wider mb-4">
        Trusted by
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[#475569] text-xs md:text-sm font-heading font-bold">
        <span>NIKE</span>
        <span className="text-[#475569]/40">·</span>
        <span>TESLA</span>
        <span className="text-[#475569]/40">·</span>
        <span>SPOTIFY</span>
        <span className="text-[#475569]/40">·</span>
        <span>ADIDAS</span>
        <span className="text-[#475569]/40">·</span>
        <span>AIRBNB</span>
      </div>
    </motion.div>
  );
}
