'use client';

import { motion } from 'framer-motion';

export default function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 backdrop-blur-sm"
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-accent-blue"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-accent-blue text-xs font-body font-medium uppercase tracking-wider">
        Trusted by 200+ Brands
      </span>
    </motion.div>
  );
}
