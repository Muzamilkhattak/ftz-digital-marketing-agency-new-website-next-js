'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ServiceCard from '@/components/ServiceCard';
import { homeServices } from '@/lib/homeServices';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [typedWord, setTypedWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const headingWord = 'Services';

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedWord === headingWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && typedWord === '') {
      timeoutId = setTimeout(() => setIsDeleting(false), 250);
    } else {
      const nextLength = typedWord.length + (isDeleting ? -1 : 1);
      const typingSpeed = isDeleting ? 65 : 110;
      timeoutId = setTimeout(() => {
        setTypedWord(headingWord.slice(0, nextLength));
      }, typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [typedWord, isDeleting]);

  const cardVariants = (index: number) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.1 * (index % homeServices.length) },
    },
  });

  return (
    <section
      id="services"
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
            Signature{' '}
            <span className="gradient-text inline-block min-w-[8.5ch] text-left">
              {typedWord}
              <span className="text-primary-navy/80 animate-pulse">|</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-body">
            Seven high-impact solutions tailored for modern brands
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: false }}
          className="pb-12"
        >
          {homeServices.map((service, index) => (
            <SwiperSlide key={service.title} className="h-full">
              <motion.div
                variants={cardVariants(index)}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                className="h-full"
              >
                <ServiceCard
                  title={service.title}
                  image={service.image}
                  tag="ftz services"
                  href={`/services/${service.slug}`}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
