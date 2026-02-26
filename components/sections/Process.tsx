'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiTarget, FiZap, FiTrendingUp, FiAward } from 'react-icons/fi';

const steps = [
  {
    icon: FiSearch,
    title: 'Discovery',
    description: 'We analyze your business, goals, and target audience to understand your unique needs.',
    color: '#0066FF',
  },
  {
    icon: FiTarget,
    title: 'Strategy',
    description: 'We develop a comprehensive strategy tailored to your objectives and market position.',
    color: '#6B4CE6',
  },
  {
    icon: FiZap,
    title: 'Execution',
    description: 'Our team implements the strategy with precision, creativity, and attention to detail.',
    color: '#00D4AA',
  },
  {
    icon: FiTrendingUp,
    title: 'Optimization',
    description: 'We continuously monitor, analyze, and optimize campaigns for maximum performance.',
    color: '#FF3E9D',
  },
  {
    icon: FiAward,
    title: 'Results',
    description: 'We deliver measurable results that drive growth and exceed your expectations.',
    color: '#FFB800',
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stepVariants = (index: number) => ({
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.15 * index },
    },
  });

  return (
    <section
      id="process"
      ref={ref}
      className="py-32 bg-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-blue/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-body">
            A proven 5-step process that delivers exceptional results
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <motion.div
            className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-accent-blue to-accent-blue origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={stepVariants(index)}
                  initial="hidden"
                  animate={isInView ? 'show' : 'hidden'}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="flex flex-col items-center">
                    {/* Icon Circle */}
                    <motion.div
                      className="relative w-24 h-24 rounded-full glass border-2 flex items-center justify-center mb-4"
                      style={{ borderColor: step.color }}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="text-3xl" style={{ color: step.color }} />
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-50"
                        style={{ backgroundColor: step.color }}
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-heading">{step.title}</h3>
                    <p className="text-text-secondary text-sm md:text-base text-center leading-relaxed font-body">
                      {step.description}
                    </p>

                    {/* Step Number Badge */}
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
