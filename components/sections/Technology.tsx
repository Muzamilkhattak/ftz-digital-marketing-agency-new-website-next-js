'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FiStar } from 'react-icons/fi';
import {
  SiAdobe,
  SiGoogleanalytics,
  SiWordpress,
  SiReact,
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiLinkedin,
  SiShopify,
  SiFigma,
} from 'react-icons/si';

const technologies = [
  { name: 'Adobe Creative Suite', icon: SiAdobe, color: '#FF0000' },
  { name: 'Google Analytics', icon: SiGoogleanalytics, color: '#FFC107' },
  { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Facebook', icon: SiFacebook, color: '#1877F2' },
  { name: 'Instagram', icon: SiInstagram, color: '#E4405F' },
  { name: 'Twitter', icon: SiTwitter, color: '#1DA1F2' },
  { name: 'LinkedIn', icon: SiLinkedin, color: '#0077B5' },
  { name: 'Shopify', icon: SiShopify, color: '#96BF48' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
];

export default function Technology() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const FallbackIcon: IconType = FiStar;

  if (!technologies.length) return null;

  return (
    <section
      id="technology"
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
            Technologies & <span className="gradient-text">Tools</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-body">
            The cutting-edge tools we use to deliver exceptional results
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {technologies.map((tech, index) => {
            const Icon = (tech.icon ?? FallbackIcon) as IconType;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 glass rounded-xl border border-white/10 hover:border-accent-blue transition-all group"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Icon
                  className="text-5xl mb-4 transition-colors"
                  style={{ color: tech.color }}
                />
                <div className="text-white text-sm font-semibold text-center font-body">
                  {tech.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
