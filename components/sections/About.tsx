'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheck, FiPhone } from 'react-icons/fi';
import Link from 'next/link';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    'Strategic Brand Positioning & Identity',
    'Responsive Website & UI Design',
    'Meta Ads Campaign Management',
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image container */}
            <div className="relative">
              {/* Decorative blob background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 rounded-[3rem] -rotate-6"></div>
              
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Floating play button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="/about"
                    className="w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center shadow-2xl shadow-accent-blue/50"
                  >
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Decorative wave shape */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
                    fill="#2F80ED"
                    opacity="0.8"
                  />
                </svg>
              </div>
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
                About US
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl font-heading font-bold text-primary-navy leading-tight"
            >
         Trusted Digital Marketing Agency in Islamabad
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-600 text-lg font-body leading-relaxed"
            >
             FTZ Digital is a growth-focused agency that helps businesses scale through strategic marketing and innovative digital solutions. We combine creativity, technology, and data-driven execution to build brands that perform and deliver measurable results.
            </motion.p>

            {/* Features list */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-accent-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiCheck className="text-accent-blue text-sm" />
                  </div>
                  <span className="text-gray-700 font-body">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4"
            >
              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(47, 128, 237, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="px-8 py-4 bg-accent-blue text-white rounded-lg font-body font-semibold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  Discover More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>

              {/* Stats card */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-primary-navy">
                    4,561+
                  </div>
                  <div className="text-sm text-gray-600 font-body">
                    Satisfied Clients
                  </div>
                </div>
              </div>

              {/* Phone contact */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-accent-blue rounded-full flex items-center justify-center">
                  <FiPhone className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-body">
                    Quick Call Us:
                  </div>
                  <div className="text-sm font-heading font-bold text-primary-navy">
                    +123-456-7890
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
