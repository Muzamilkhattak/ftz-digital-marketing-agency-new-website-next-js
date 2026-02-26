'use client';

import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: Base Deep Navy Gradient */}
      <div
        className="absolute inset-0 bg-primary-navy"
        style={{
          background: 'radial-gradient(ellipse at top, #0A1F44 0%, #050F24 100%)',
        }}
      />

      {/* Layer 1.5: Animated Overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-blue/5" />
      </motion.div>

      {/* Layer 2: Animated Gradient Mesh - Electric Blue Theme */}
      <div className="absolute inset-0">
        {/* Top-left Electric Blue orb */}
        <motion.div
          className="absolute"
          style={{
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(47, 128, 237, 0.25) 0%, rgba(47, 128, 237, 0.05) 50%, transparent 100%)',
            filter: 'blur(100px)',
            top: '-250px',
            left: '-250px',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Top-right Electric Blue orb */}
        <motion.div
          className="absolute"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(47, 128, 237, 0.2) 0%, rgba(47, 128, 237, 0.03) 50%, transparent 100%)',
            filter: 'blur(100px)',
            top: '-200px',
            right: '-200px',
          }}
          animate={{
            x: [0, -35, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Bottom-center Electric Blue orb */}
        <motion.div
          className="absolute"
          style={{
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(47, 128, 237, 0.18) 0%, rgba(47, 128, 237, 0.04) 50%, transparent 100%)',
            filter: 'blur(100px)',
            bottom: '-250px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -35, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Mid-right accent orb */}
        <motion.div
          className="absolute"
          style={{
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(86, 204, 242, 0.15) 0%, rgba(86, 204, 242, 0.02) 50%, transparent 100%)',
            filter: 'blur(100px)',
            top: '40%',
            right: '5%',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      {/* Layer 3: Enhanced Grid Pattern */}
      <div
        className="absolute inset-0 opacity-0 md:opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(47, 128, 237, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47, 128, 237, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 85% 65% at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at center, black 30%, transparent 75%)',
        }}
      />

      {/* Layer 4: Floating 3D Orbs - Electric Blue Theme */}
      {/* Large Electric Blue orb */}
      <motion.div
        className="absolute hidden md:block"
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(47, 128, 237, 0.5), rgba(47, 128, 237, 0.15), transparent)',
          boxShadow: '0 0 100px rgba(47, 128, 237, 0.4), inset 0 0 60px rgba(47, 128, 237, 0.2)',
          top: '12%',
          left: '8%',
        }}
        animate={{
          y: [0, -35, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Medium Electric Blue orb */}
      <motion.div
        className="absolute hidden md:block"
        style={{
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(47, 128, 237, 0.45), rgba(47, 128, 237, 0.12), transparent)',
          boxShadow: '0 0 80px rgba(47, 128, 237, 0.35), inset 0 0 50px rgba(47, 128, 237, 0.15)',
          top: '55%',
          right: '10%',
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [360, 0],
        }}
        transition={{
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Small accent orb */}
      <motion.div
        className="absolute hidden md:block"
        style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(86, 204, 242, 0.5), rgba(86, 204, 242, 0.15), transparent)',
          boxShadow: '0 0 60px rgba(86, 204, 242, 0.4), inset 0 0 40px rgba(86, 204, 242, 0.2)',
          bottom: '25%',
          left: '18%',
        }}
        animate={{
          y: [0, -25, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Large accent orb */}
      <motion.div
        className="absolute hidden lg:block"
        style={{
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(47, 128, 237, 0.35), rgba(47, 128, 237, 0.1), transparent)',
          boxShadow: '0 0 120px rgba(47, 128, 237, 0.3), inset 0 0 70px rgba(47, 128, 237, 0.15)',
          bottom: '18%',
          right: '15%',
        }}
        animate={{
          y: [0, -40, 0],
          rotate: [360, 0],
        }}
        transition={{
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 },
          rotate: { duration: 35, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Medium accent orb */}
      <motion.div
        className="absolute hidden lg:block"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(86, 204, 242, 0.4), rgba(86, 204, 242, 0.12), transparent)',
          boxShadow: '0 0 70px rgba(86, 204, 242, 0.35), inset 0 0 45px rgba(86, 204, 242, 0.18)',
          top: '35%',
          left: '25%',
        }}
        animate={{
          y: [0, -28, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3.5 },
          rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
