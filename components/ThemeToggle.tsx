'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-50 p-4 bg-secondary-charcoal rounded-full shadow-lg hover:bg-primary-purple transition-colors"
      onClick={() => setIsDark(!isDark)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="text-white text-xl" />
      ) : (
        <FiMoon className="text-white text-xl" />
      )}
    </motion.button>
  );
}
