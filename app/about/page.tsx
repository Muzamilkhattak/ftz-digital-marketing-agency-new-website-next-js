'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import { FiTarget, FiTrendingUp, FiShield, FiUsers, FiCheckCircle, FiAward } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const whoWeAreRef = useRef(null);
  const approachRef = useRef(null);
  const whyChooseRef = useRef(null);
  const proofRef = useRef(null);

  const whoWeAreInView = useInView(whoWeAreRef, { once: true, margin: '-100px' });
  const approachInView = useInView(approachRef, { once: true, margin: '-100px' });
  const whyChooseInView = useInView(whyChooseRef, { once: true, margin: '-100px' });
  const proofInView = useInView(proofRef, { once: true, margin: '-100px' });

  const approach = [
    {
      number: '01',
      title: 'Strategy',
      description: 'Deep dive into your business goals, audience, and market to build a data-driven roadmap.',
    },
    {
      number: '02',
      title: 'Creative',
      description: 'Craft compelling campaigns and content that resonate with your target audience.',
    },
    {
      number: '03',
      title: 'Execution',
      description: 'Launch campaigns with precision across all channels, ensuring flawless delivery.',
    },
    {
      number: '04',
      title: 'Optimization',
      description: 'Continuously analyze, test, and refine to maximize ROI and drive growth.',
    },
  ];

  const whyChoose = [
    {
      icon: FiTrendingUp,
      title: 'Results-Driven',
      description: 'We focus on metrics that matter—revenue, conversions, and real business growth.',
    },
    {
      icon: FiShield,
      title: 'Full Transparency',
      description: 'Clear reporting, honest communication, and no hidden surprises. Ever.',
    },
    {
      icon: FiTarget,
      title: 'Proven Process',
      description: 'Battle-tested methodology refined over 200+ successful brand campaigns.',
    },
    {
      icon: FiUsers,
      title: 'Business-First Mindset',
      description: 'We understand your challenges because we think like business owners, not just marketers.',
    },
  ];

  const stats = [
    { value: '200+', label: 'Projects Delivered' },
    { value: '150+', label: 'Happy Clients' },
    { value: '300%', label: 'Avg. Growth' },
    { value: '98%', label: 'Client Retention' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&auto=format&fit=crop&q=80"
            alt="Marketing Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/95 via-primary-navy/90 to-[#0d2348]/95"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight"
              style={{ color: '#FFFFFF' }}
            >
              We Turn Marketing Into{' '}
              <span className="gradient-text">Revenue</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-body leading-relaxed mb-12"
            >
              No fluff. No false promises. Just clear strategy and real results that grow your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/contact" className="px-10 py-5 bg-accent-blue text-white rounded-lg font-body font-semibold text-lg hover:bg-opacity-90 transition-all btn-shine shadow-2xl shadow-accent-blue/30 inline-block">
                Get Your Proposal
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section ref={whoWeAreRef} className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={whoWeAreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format&fit=crop&q=80"
                alt="Team Strategy Session"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent-blue text-white px-8 py-6 rounded-2xl shadow-2xl">
                <div className="text-4xl font-heading font-bold">5+</div>
                <div className="text-sm font-body uppercase tracking-wider">Years Experience</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={whoWeAreInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-accent-blue font-body font-semibold uppercase tracking-wider text-sm">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-navy mt-4 mb-6">
                Marketing That Actually Works
              </h2>
              <div className="space-y-4 text-gray-700 font-body text-lg leading-relaxed">
                <p>
                  We're a full-service digital marketing agency that helps ambitious brands scale faster. From startups to established businesses, we create campaigns that drive measurable growth.
                </p>
                <p>
                  Our team combines creative thinking with data-driven strategy to deliver results that matter—more leads, higher conversions, and real revenue growth. We don't just run campaigns; we build marketing systems that work.
                </p>
                <p>
                  What sets us apart? We think like business owners. Every decision, every campaign, every dollar spent is focused on one thing: growing your bottom line.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section ref={approachRef} className="py-32 bg-gradient-to-br from-primary-navy via-[#0d2348] to-primary-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={approachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-accent-blue font-body font-semibold uppercase tracking-wider text-sm">
              Our Approach
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-6" style={{ color: '#FFFFFF' }}>
              How We Drive Results
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-body">
              A proven 4-step process that turns marketing spend into measurable growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {approach.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={approachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="text-6xl font-heading font-bold text-accent-blue/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3" style={{ color: '#FFFFFF' }}>
                    {step.title}
                  </h3>
                  <p className="text-white/70 font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < approach.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent-blue/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyChooseRef} className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={whyChooseInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent-blue font-body font-semibold uppercase tracking-wider text-sm">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-navy mt-4 mb-6">
                Your Growth Partner, Not Just Another Agency
              </h2>
              <p className="text-gray-700 font-body text-lg leading-relaxed mb-8">
                We're not here to sell you services you don't need. We're here to help you grow, period.
              </p>

              <div className="space-y-6">
                {whyChoose.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={whyChooseInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center">
                      <item.icon className="text-accent-blue text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-primary-navy mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-body leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={whyChooseInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80"
                alt="Team Collaboration"
                className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section ref={proofRef} className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-accent-blue font-body font-semibold uppercase tracking-wider text-sm">
              Proven Results
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-navy mt-4">
              Numbers That Speak
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={proofInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white border border-accent-blue/10 hover:border-accent-blue/30 transition-all shadow-lg hover:shadow-xl"
              >
                <FiAward className="text-accent-blue text-5xl mx-auto mb-4" />
                <div className="text-5xl font-heading font-bold text-primary-navy mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-body uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-primary-navy via-[#0d2348] to-primary-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-accent-blue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-blue rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Ready to Scale Your Business?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-body mb-12">
              Let's build a marketing strategy that drives real revenue. Book a free consultation today.
            </p>
            <Link href="/contact" className="px-10 py-5 bg-accent-blue text-white rounded-lg font-body font-semibold text-lg hover:bg-opacity-90 transition-all btn-shine shadow-2xl shadow-accent-blue/30 inline-block">
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
