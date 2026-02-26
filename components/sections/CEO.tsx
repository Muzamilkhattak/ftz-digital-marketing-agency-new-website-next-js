'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function CEO() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="ceo"
      ref={ref}
      className="py-32 bg-gradient-to-br from-primary-navy via-primary-navy to-[#0d2348] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-blue to-accent-blue/30 rounded-3xl blur-xl opacity-50"></div>
              
              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-accent-blue/30 shadow-2xl">
                <img
                  src="/sir-umair-ceo.jpg"
                  alt="Umair Rajput - Founder & CEO"
                  className="w-full h-[600px] object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-accent-blue text-white px-8 py-4 rounded-2xl shadow-2xl"
              >
                <div className="text-sm font-body uppercase tracking-wider">Founder & CEO</div>
                <div className="text-2xl font-heading font-bold">Umair Rajput</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-accent-blue font-body font-semibold uppercase tracking-wider text-sm">
                CEO Mission
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight"
            >
              Leading with{' '}
              <span className="gradient-text">Vision</span> and{' '}
              <span className="gradient-text">Innovation</span>
            </motion.h2>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-l-4 border-accent-blue pl-6 py-2"
            >
              <p className="text-white/90 text-xl font-body italic leading-relaxed">
                "I started this agency with one clear belief: marketing should actually help businesses grow. Not confuse them, not waste their budget, and not sell false promises."
              </p>
            </motion.div>

            {/* Mission text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-white/80 text-lg font-body leading-relaxed">
                My mission is to build a team and a culture that focuses on clear strategy, honest execution, and real results. We work closely with brands, understand their challenges, and create marketing that makes sense for their goals.
              </p>
              <p className="text-white/80 text-lg font-body leading-relaxed">
                Growth, trust, and long-term relationships matter more to us than quick wins.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { value: '200+', label: 'Brands Scaled' },
                { value: '50+', label: 'Team Members' },
                { value: '5+', label: 'Years Experience' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-accent-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm font-body uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8 border-t border-white/10"
            >
              <div className="text-2xl font-heading font-bold text-white mb-1">
                Umair Rajput
              </div>
              <div className="text-accent-blue font-body text-sm uppercase tracking-wider">
                Founder & CEO, FTZ Digital
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
