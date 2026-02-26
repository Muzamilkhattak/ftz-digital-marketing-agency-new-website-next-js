'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

import websitedevelopment from "../../app/website development.jpg";
import contentmarketing  from "../../app/content marketing strategy.jpg";
import healthpoint  from "../../app/healthpoint pakistan eccomrece.jpg";
import socialmedia  from "../../app/social media desigm.jpg";
import ads  from "../../app/meta ads results.jpg";
const getBackgroundImageUrl = (src: string) => `url("${encodeURI(src)}")`;

const projects = [
  {
    id: 1,
    title: 'E-commerce Transformation',
    category: 'Web Development',
    description: 'Complete e-commerce platform with 300% increase in sales',
    image: healthpoint.src,
    results: '300% Sales Increase',
  },
  {
    id: 2,
    title: 'Brand Identity Redesign',
    category: 'Branding',
    description: 'Complete brand overhaul resulting in 250% brand recognition',
    image: socialmedia.src,
    results: '250% Brand Recognition',
  },
  {
    id: 3,
    title: 'ADS  RESULTS',
    category: 'meta  and google ads',
    description: 'Viral campaign reaching 5M+ impressions',
    image: ads.src,
   
  },
  {
    id: 4,
    title: 'SEO Optimization',
    category: 'SEO',
    description: 'Ranked #1 for 15+ high-value keywords',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    results: '#1 Rankings',
  },
  {
    id: 5,
    title: 'Website Development',
    category: 'Website Development',
    description: '120+ clients websites developed ',
    image: websitedevelopment.src,
    results: 'lead genearted websites',
  },
  {
    id: 6,
    title: 'Content Marketing Strategy',
    category: 'Content',
    description: '500% increase in organic traffic',
    image:  contentmarketing.src,
    results: '500% Traffic Increase',
  },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-body">
            Success stories from our amazing clients
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative h-[600px] max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300, rotateY: -45, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, rotateY: 45, scale: 0.8 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden glass border border-white/20">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: getBackgroundImageUrl(projects[currentIndex].image) }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/80 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-accent-blue text-sm font-semibold mb-2 font-body uppercase tracking-wider">
                    {projects[currentIndex].category}
                  </div>
                  <h3 className="portfolio-project-title text-4xl font-bold mb-3 font-heading" style={{ color: '#FFFFFF' }}>
                    {projects[currentIndex].title}
                  </h3>
                  <p className="mb-6 font-body text-lg" style={{ color: '#FFFFFF' }}>
                    {projects[currentIndex].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold gradient-text font-heading">
                      {projects[currentIndex].results}
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link
                        href="/contact"
                        className="p-3 bg-accent-blue rounded-full hover:bg-opacity-90 transition-all inline-flex"
                        aria-label="Contact us about this project"
                      >
                        <FiExternalLink className="text-white text-xl" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <FiArrowLeft className="text-white text-xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <FiArrowRight className="text-white text-xl" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {projects.map((_, index) => (
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

        {/* Project Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12"
        >
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: getBackgroundImageUrl(project.image) }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h4 className="portfolio-project-title font-bold">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
