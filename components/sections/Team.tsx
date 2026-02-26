'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import ourTeamImage from '@/app/our team.png';

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="team"
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
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-primary-navy mb-6">
            Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-navy/70 max-w-3xl mx-auto font-body">
            Meet the talented individuals behind FTZ Digital.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-[#dbe6ff] bg-white p-2 shadow-[0_22px_55px_rgba(10,31,68,0.12)] md:p-3">
            <div className="relative aspect-[3120/1752] w-full overflow-hidden rounded-2xl">
              <Image
                src={ourTeamImage}
                alt="FTZ Digital team members standing in a row"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1200px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1f44]/10 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
