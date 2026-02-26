'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiQuote } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    text: 'FTZ Digital transformed our online presence. Their strategic approach and creative solutions resulted in a 300% increase in leads.',
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director, GrowthCo',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    text: 'Working with FTZ Digital has been exceptional. They understand our business and deliver results that exceed expectations.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, Creative Studio',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5,
    text: 'The team at FTZ Digital is professional, creative, and results-driven. Our brand has never looked better!',
  },
  {
    name: 'David Thompson',
    role: 'VP Sales, Enterprise Solutions',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 5,
    text: 'FTZ Digital helped us scale our marketing efforts efficiently. Their data-driven approach is impressive.',
  },
  {
    name: 'Lisa Wang',
    role: 'CMO, Innovation Labs',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    rating: 5,
    text: 'Outstanding service and results! FTZ Digital is our go-to partner for all digital marketing needs.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const StarIcon = FiStar ?? (() => null);
  const QuoteIcon = FiQuote ?? (() => null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!testimonials.length) return null;

  return (
    <section
      id="testimonials"
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
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-body">
            What our clients say about working with us
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -5 }}
            transition={{ duration: 0.9 }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="glass rounded-2xl p-8 md:p-12 border border-white/20">
              <QuoteIcon className="text-6xl text-accent-blue/30 mb-6" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <StarIcon key={i} className="text-accent-blue fill-accent-blue" />
                ))}
              </div>
              <p className="text-xl text-white mb-8 leading-relaxed font-body">
                "{testimonials[currentIndex].text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-semibold text-lg font-heading">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-text-secondary font-body">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-accent-blue w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6 border border-white/10 hover:border-accent-blue/40 transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="text-accent-blue fill-accent-blue text-sm" />
                ))}
              </div>
              <p className="text-text-secondary text-sm mb-4 line-clamp-3 font-body">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-semibold text-sm font-heading">{testimonial.name}</div>
                  <div className="text-text-secondary text-xs font-body">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
