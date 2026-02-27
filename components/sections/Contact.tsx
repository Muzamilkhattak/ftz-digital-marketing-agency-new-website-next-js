'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import ourClientsImage from '@/app/our clients.jpg';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const fieldVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: 0.1 * i, type: 'spring', bounce: 0.4 },
    }),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 bg-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-blue/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mb-12 max-w-6xl"
        >
          <div className="relative aspect-[16/6] overflow-hidden rounded-2xl border border-white/10 shadow-xl">
            <Image
              src={ourClientsImage}
              alt="Our Clients"
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-body">
            Ready to transform your brand? Let&apos;s start a conversation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 font-heading">Contact Information</h3>
              <p className="text-text-secondary mb-8 font-body leading-relaxed">
                Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll
                respond as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-accent-blue/40 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-accent-blue rounded-lg">
                  <FiMail className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-text-secondary text-sm font-body">Email</div>
                  <div className="text-white font-semibold font-body">info@ftzdigital.com</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-accent-blue/40 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-accent-blue rounded-lg">
                  <FiPhone className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-text-secondary text-sm font-body">Phone</div>
                  <div className="text-white font-semibold font-body">0306 389389</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-accent-blue/40 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-accent-blue rounded-lg">
                  <FiMapPin className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-text-secondary text-sm font-body">Address</div>
                  <div className="text-white font-semibold font-body">Plot 37, Midway Commercial, Phase 7 Islamabad, 46000</div>
                </div>
              </motion.div>
            </div>
            <div className="h-64 overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="FTZ Digital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.1774431367344!2d73.1104137!3d33.522771899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed3e7fdb365d%3A0xc54ff8780d16f120!2sFTZ%20Digital!5e0!3m2!1sen!2s!4v1772103305204!5m2!1sen!2s"
                className="h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="space-y-6">
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="glass rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                <motion.div variants={fieldVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'} custom={1}>
                  <label htmlFor="name" className="block text-white mb-2 font-body font-semibold">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors font-body"
                    placeholder="Your Name"
                  />
                </motion.div>

                <motion.div variants={fieldVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'} custom={2}>
                  <label htmlFor="email" className="block text-white mb-2 font-body font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors font-body"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div variants={fieldVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'} custom={3}>
                  <label htmlFor="phone" className="block text-white mb-2 font-body font-semibold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors font-body"
                    placeholder="0306 389389"
                  />
                </motion.div>

                <motion.div variants={fieldVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'} custom={4}>
                  <label htmlFor="service" className="block text-white mb-2 font-body font-semibold">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-blue transition-colors font-body"
                  >
                    <option value="">Select a service</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="sem">SEM & PPC</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="web">Web Development</option>
                    <option value="branding">Branding & Design</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div variants={fieldVariants} initial="hidden" animate={isInView ? 'show' : 'hidden'} custom={5}>
                  <label htmlFor="message" className="block text-white mb-2 font-body font-semibold">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors resize-none font-body"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-accent-blue text-white rounded-lg font-semibold font-body hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <FiSend />
                    </>
                  )}
                </motion.button>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
