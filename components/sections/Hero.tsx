'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroCanvasBackground from '@/components/hero/HeroCanvasBackground';
import HeroHeadline from '@/components/hero/HeroHeadline';
import HeroScrollIndicator from '@/components/hero/HeroScrollIndicator';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Animated border glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"></div>
      </div>
      
      {/* Canvas Background with X-ray scan effect */}
      <HeroCanvasBackground />

      {/* Content */}
      <div className="relative z-10 h-full px-4">
        <div className="container mx-auto h-full flex items-center">
          <div className="w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            {/* Left: Core Messaging */}
            <div className="text-left max-w-[750px]">
              <div className="mb-8">
                <HeroHeadline />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-gray-700 text-base md:text-lg font-body leading-relaxed mb-10 max-w-[650px]"
              >
                FTZ Digital is a full-service marketing agency delivering 30+ solutions — from social media and paid ads to AI-powered tools — that drive real results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-5 items-start"
              >
                <motion.div
                  whileHover={{
                    y: -2,
                    boxShadow: '0 8px 30px rgba(47, 128, 237, 0.4)',
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <Link
                    href="/services"
                    className="px-8 py-4 bg-accent-blue text-white rounded-lg font-body font-semibold text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all btn-shine shadow-lg shadow-accent-blue/20 inline-flex"
                  >
                    Explore Services
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.35 }}>
                  <Link
                    href="/contact"
                    className="px-8 py-4 border-2 border-accent-blue text-primary-navy rounded-lg font-body font-semibold text-sm uppercase tracking-wider hover:bg-accent-blue hover:text-white transition-all relative overflow-hidden group inline-flex"
                  >
                    <span className="relative z-10">Contact Us</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Modern Stat/Proof Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="glass rounded-2xl p-8 border border-white/10 hover:border-accent-blue/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 text-xs font-body uppercase tracking-widest">
                    Live Impact
                  </span>
                  <span className="text-accent-blue text-xs font-body uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-pulse"></span>
                    Updated weekly
                  </span>
                </div>
                <div className="space-y-5">
                  {[
                    { label: 'Brands Scaled', value: '200+' },
                    { label: 'Avg. ROAS Lift', value: '3.8x' },
                    { label: 'Team Specialists', value: '50+' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between border-b border-white/10 pb-4 last:border-b-0 last:pb-0 group hover:border-accent-blue/20 transition-all"
                    >
                      <span className="text-gray-600 text-sm font-body group-hover:text-primary-navy transition-colors">{stat.label}</span>
                      <span className="text-primary-navy font-heading text-xl font-bold group-hover:text-accent-blue transition-colors">{stat.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-gray-600 text-xs font-body leading-relaxed">
                  Strategy, creative, and performance engineered for modern growth.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <HeroScrollIndicator />
    </section>
  );
}
