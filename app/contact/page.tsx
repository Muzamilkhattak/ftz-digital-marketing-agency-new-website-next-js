'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thanks for reaching out. We'll contact you shortly.");
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <Navigation />

      <section className="relative overflow-hidden py-24 md:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute -top-20 -left-12 h-72 w-72 rounded-full bg-[#2F80ED]/12 blur-[88px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
            className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#2F80ED]/10 blur-[95px]"
          />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto max-w-[720px]"
          >
            <motion.div variants={fieldVariants} className="mb-14 text-center md:mb-16">
              <h1 className="font-heading text-4xl font-bold leading-tight text-primary-navy md:text-6xl">
                Let&apos;s Work Together
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-body text-base text-primary-navy/70 md:text-lg">
                Share your goals and we&apos;ll craft a strategy built for measurable growth.
              </p>
            </motion.div>

            <motion.form
              variants={fieldVariants}
              onSubmit={handleSubmit}
              className="space-y-8 rounded-3xl bg-white px-6 py-8 shadow-[0_20px_50px_rgba(10,31,68,0.08)] md:px-10 md:py-10"
            >
              <motion.div variants={fieldVariants}>
                <label htmlFor="name" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary-navy/70">
                  Full Name
                </label>
                <motion.input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="contact-underline-field w-full font-body text-base text-primary-navy placeholder:text-primary-navy/35"
                  whileFocus={{ y: -1 }}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label htmlFor="email" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary-navy/70">
                  Email Address
                </label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="contact-underline-field w-full font-body text-base text-primary-navy placeholder:text-primary-navy/35"
                  whileFocus={{ y: -1 }}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label htmlFor="company" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary-navy/70">
                  Company Name
                </label>
                <motion.input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company (optional)"
                  className="contact-underline-field w-full font-body text-base text-primary-navy placeholder:text-primary-navy/35"
                  whileFocus={{ y: -1 }}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label htmlFor="message" className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary-navy/70">
                  Project Details
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you want to build"
                  className="contact-underline-field contact-underline-textarea w-full resize-none font-body text-base leading-relaxed text-primary-navy placeholder:text-primary-navy/35"
                  whileFocus={{ y: -1 }}
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-accent-blue px-8 py-3 font-body text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#1f71df] hover:shadow-[0_12px_28px_rgba(47,128,237,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={isSubmitting ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                  transition={isSubmitting ? { repeat: Infinity, duration: 0.9 } : { duration: 0.2 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
