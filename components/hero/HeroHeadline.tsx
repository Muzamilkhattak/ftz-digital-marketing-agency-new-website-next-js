'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function HeroHeadline() {
  return (
    <div className="max-w-[860px] mx-auto">
      {/* Line 1 */}
      <motion.h1
        initial={{ opacity: 0, y: '110%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-white font-heading font-bold text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.1] tracking-[-0.02em] mb-2 overflow-hidden"
      >
        We Build Brands
      </motion.h1>

      {/* Line 2 */}
      <motion.h1
        initial={{ opacity: 0, y: '110%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-white font-heading font-bold text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.1] tracking-[-0.02em] mb-4 overflow-hidden"
      >
        That Stand Out.
      </motion.h1>

      {/* Typewriter Line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <h2
          className="font-heading font-bold text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.1] tracking-[-0.02em] gradient-text"
        >
          <TypeAnimation
            sequence={[
              'Social Media Marketing.',
              1800,
              'Meta Ads & PPC.',
              1800,
              'Content Creation.',
              1800,
              'Web Development.',
              1800,
              'SEO & Growth.',
              1800,
              'AI Solutions.',
              1800,
            ]}
            speed={65}
            deletionSpeed={35}
            repeat={Infinity}
            cursor={true}
            wrapper="span"
            style={{
              display: 'inline-block',
            }}
            cursorStyle={{
              display: 'inline-block',
              width: '3px',
              height: '1em',
              background: '#2F80ED',
              marginLeft: '2px',
              animation: 'blink 0.85s infinite',
            }}
          />
        </h2>
      </motion.div>
    </div>
  );
}
