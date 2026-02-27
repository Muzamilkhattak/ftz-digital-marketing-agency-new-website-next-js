'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import strategyImage from '@/app/strategy.webp';
import resultsDrivenExecutionImage from '@/app/Results-Driven Execution.jpg';
import inHouseExpertTeamImage from '@/app/In-House Expert Team.jpg';
import dataBasedDecisionsImage from '@/app/Data-Based Decisions.jpg';
import transparentCommunicationImage from '@/app/Transparent Communication.webp';
import performanceFocusedMarketingImage from '@/app/Performance-Focused Marketing.webp';
import { 
  FiTrendingUp, 
  FiVideo, 
  FiSearch,
  FiGlobe,
  FiCpu,
  FiEdit3,
  FiAward
} from 'react-icons/fi';

export default function ServicesPage() {
  const servicesRef = useRef(null);
  const howWeWorkRef = useRef(null);
  const whyChooseRef = useRef(null);
  const resultsRef = useRef(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const howWeWorkInView = useInView(howWeWorkRef, { once: true, margin: '-100px' });
  const whyChooseInView = useInView(whyChooseRef, { once: true, margin: '-100px' });
  const resultsInView = useInView(resultsRef, { once: true, margin: '-100px' });

  const coreServices = [
    {
      icon: FiTrendingUp,
      title: 'Digital Marketing Services',
      focus: 'Sales, Leads, ROI',
      description: 'Performance campaigns and analytics focused on qualified leads and measurable revenue growth.',
      image:
        'https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&auto=format&fit=crop&q=80',
      href: '/services/social-media-marketing',
    },
    {
      icon: FiEdit3,
      title: 'Graphic & Animation',
      focus: 'Visual Impact + Engagement',
      description: 'Premium brand visuals and motion content that increase attention across social and ads.',
      image:
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&auto=format&fit=crop&q=80',
      href: '/services/photoshoot-production',
    },
    {
      icon: FiCpu,
      title: 'AI Solutions',
      focus: 'Efficiency + Smart Scaling',
      description: 'AI automation, chat workflows, and smart optimization to scale operations efficiently.',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
      href: '/services/ai-solutions',
    },
    {
      icon: FiVideo,
      title: 'Content Creation',
      focus: 'Attention + Engagement',
      description: 'Video-first storytelling and social content systems designed to keep audiences engaged.',
      image:
        'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&auto=format&fit=crop&q=80',
      href: '/services/content-creation',
    },
    {
      icon: FiGlobe,
      title: 'Website Development',
      focus: 'Speed + Conversion',
      description: 'Modern, high-performance websites designed for conversion, SEO, and seamless user experience across devices.',
      image:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&auto=format&fit=crop&q=80',
      href: '/services/web-development',
    },
    {
      icon: FiSearch,
      title: 'SEO Optimization',
      focus: 'Organic Growth + Long-term Traffic',
      description: 'Technical and content SEO built for sustainable rankings, traffic, and compounding growth.',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
      href: '/services/seo-services',
    },
  ];

  const howWeWork = [
    {
      number: '01',
      title: 'Understand Your Business',
      description: 'Deep dive into your goals, audience, and challenges.',
    },
    {
      number: '02',
      title: 'Build a Tailored Strategy',
      description: 'Custom roadmap designed for your specific needs.',
    },
    {
      number: '03',
      title: 'Execute with Creative + Data',
      description: 'Launch campaigns that combine creativity with analytics.',
    },
    {
      number: '04',
      title: 'Optimize for Continuous Growth',
      description: 'Monitor, test, and refine for maximum results.',
    },
  ];

  const whyChoose = [
    {
      title: 'Strategy-First Approach',
      description: 'Every campaign starts with your business goals, not guesswork.',
      image: strategyImage,
    },
    {
      title: 'Results-Driven Execution',
      description: 'We prioritize measurable growth through focused delivery.',
      image: resultsDrivenExecutionImage,
    },
    {
      title: 'In-House Expert Team',
      description: 'Specialists in creative, media, and technical implementation.',
      image: inHouseExpertTeamImage,
    },
    {
      title: 'Data-Based Decisions',
      description: 'Optimization is guided by real-time data and performance signals.',
      image: dataBasedDecisionsImage,
    },
    {
      title: 'Transparent Communication',
      description: 'Clear reporting, honest updates, and visible progress at every step.',
      image: transparentCommunicationImage,
    },
    {
      title: 'Performance-Focused Marketing',
      description: 'Designed to improve ROI, efficiency, and long-term scalability.',
      image: performanceFocusedMarketingImage,
    },
  ];

  const results = [
    { value: '500%', label: 'Avg. ROI Increase' },
    { value: '10K+', label: 'Leads Generated' },
    { value: '50M+', label: 'Total Reach' },
    { value: '200+', label: 'Successful Campaigns' },
  ];

  const totalServices = coreServices.length;
  const getWrappedIndex = (index: number) => (index + totalServices) % totalServices;

  const getDirectionToIndex = (targetIndex: number) => {
    if (targetIndex === activeServiceIndex) return 1;
    if (activeServiceIndex === totalServices - 1 && targetIndex === 0) return 1;
    if (activeServiceIndex === 0 && targetIndex === totalServices - 1) return -1;
    return targetIndex > activeServiceIndex ? 1 : -1;
  };

  const paginateServices = (direction: number) => {
    const normalizedDirection = direction >= 0 ? 1 : -1;
    setSlideDirection(normalizedDirection);
    setActiveServiceIndex((prevIndex) => getWrappedIndex(prevIndex + normalizedDirection));
  };

  const goToService = (targetIndex: number) => {
    if (targetIndex === activeServiceIndex) return;
    setSlideDirection(getDirectionToIndex(targetIndex));
    setActiveServiceIndex(targetIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection(1);
      setActiveServiceIndex((prevIndex) => (prevIndex + 1) % totalServices);
    }, 3200);

    return () => clearInterval(interval);
  }, [totalServices]);

  const leftServiceIndex = getWrappedIndex(activeServiceIndex - 1);
  const rightServiceIndex = getWrappedIndex(activeServiceIndex + 1);
  const leftService = coreServices[leftServiceIndex];
  const centerService = coreServices[activeServiceIndex];
  const rightService = coreServices[rightServiceIndex];
  const LeftIcon = leftService.icon;
  const CenterIcon = centerService.icon;
  const RightIcon = rightService.icon;

  const leftCardVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -70 : -30,
      scale: 0.94,
    }),
    center: {
      opacity: 0.84,
      x: 0,
      scale: 0.97,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -30 : -70,
      scale: 0.94,
    }),
  };

  const centerCardVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 90 : -90,
      scale: 0.94,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1.03,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -90 : 90,
      scale: 0.94,
    }),
  };

  const rightCardVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 70 : 30,
      scale: 0.94,
    }),
    center: {
      opacity: 0.84,
      x: 0,
      scale: 0.97,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 30 : 70,
      scale: 0.94,
    }),
  };

  const renderServiceCard = (
    service: (typeof coreServices)[number],
    Icon: (typeof coreServices)[number]['icon'],
    isActive: boolean
  ) => (
    <div
      className={`group relative overflow-hidden h-full min-h-0 flex flex-col rounded-[20px] bg-white border transition-all duration-300 ease-in-out ${
        isActive ? 'border-[#2F80ED]/45' : 'border-[#d7e5ff]'
      }`}
      style={{
        boxShadow: isActive
          ? '0 24px 46px rgba(10,31,68,0.18), 0 0 0 1px rgba(47,128,237,0.22)'
          : '0 14px 30px rgba(10,31,68,0.12)',
      }}
    >
      <div className="relative h-[52%] min-h-[220px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/0"></div>

        <span
          className="absolute left-4 top-4 inline-flex w-fit px-3 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-white/30 font-body text-[10px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: '#FFFFFF' }}
        >
          {service.focus}
        </span>

        <div className="absolute top-4 right-4">
          <div className="w-10 h-10 rounded-full bg-white/95 border border-[#2F80ED]/30 flex items-center justify-center shadow-md">
            <Icon className="text-lg" style={{ color: '#2F80ED' }} />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-5 lg:p-6 flex flex-col">
        <h3 className={`font-heading font-bold leading-tight mb-3 ${isActive ? 'text-[1.9rem]' : 'text-[1.7rem]'}`} style={{ color: '#FFFFFF' }}>
          {service.title}
        </h3>

        <p
          className="font-body text-[15px] leading-relaxed mb-4"
          style={{
            color: '#5F6B7A',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {service.description}
        </p>

        <Link
          href={service.href}
          className="mt-auto w-fit px-5 py-2.5 rounded-full bg-[#2F80ED] text-white text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-[#1f71df] hover:shadow-[0_10px_22px_rgba(47,128,237,0.35)]"
        >
          Learn More
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&auto=format&fit=crop&q=80"
            alt="Digital Marketing Services"
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
              Smart Marketing & Digital Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto font-body leading-relaxed mb-12"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              From strategy to execution, we help brands grow faster with creative, data-driven solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/contact" className="px-10 py-5 bg-accent-blue text-white rounded-lg font-body font-semibold text-lg hover:bg-opacity-90 transition-all btn-shine shadow-2xl shadow-accent-blue/30">
                Get a Proposal
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-lg font-body font-semibold text-lg hover:bg-white/20 transition-all">
                Book a Call
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Services Section - 3D Carousel */}
      <section
        ref={servicesRef}
        className="py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 55%, #eef5ff 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[#2F80ED]/12 blur-[80px]"></div>
          <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-[#2F80ED]/10 blur-[95px]"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[26rem] h-[26rem] rounded-full bg-white/60 blur-[110px]"></div>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(47,128,237,0.12) 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="text-accent-blue font-body font-semibold uppercase tracking-[0.18em] text-xs">
              Premium Solutions
            </span>
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-primary-navy">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="max-w-2xl mx-auto font-body text-lg text-primary-navy/75">
              Strategy-led services designed for measurable growth, crafted with modern execution.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-white/85 border border-[#2F80ED]/20 text-xs font-semibold tracking-[0.12em] uppercase text-primary-navy/70">
                Data Driven
              </span>
              <span className="px-4 py-2 rounded-full bg-white/85 border border-[#2F80ED]/20 text-xs font-semibold tracking-[0.12em] uppercase text-primary-navy/70">
                Creative First
              </span>
              <span className="px-4 py-2 rounded-full bg-white/85 border border-[#2F80ED]/20 text-xs font-semibold tracking-[0.12em] uppercase text-primary-navy/70">
                ROI Focused
              </span>
            </div>
          </motion.div>

          <div className="relative max-w-7xl mx-auto lg:px-14">
            {/* Mobile Slider */}
            <div className="lg:hidden overflow-hidden px-1">
              <motion.div
                className="flex"
                animate={{ x: `-${activeServiceIndex * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {coreServices.map((service, index) => {
                  const MobileIcon = service.icon;
                  return (
                    <div key={`mobile-${service.title}`} className="w-full flex-shrink-0 px-2">
                      <motion.div
                        animate={{
                          opacity: index === activeServiceIndex ? 1 : 0.8,
                          scale: index === activeServiceIndex ? 1 : 0.97,
                        }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="h-[470px]"
                      >
                        {renderServiceCard(service, MobileIcon, index === activeServiceIndex)}
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Desktop Slider */}
            <div className="hidden lg:grid grid-cols-3 gap-6 px-2 items-stretch">
              <div className="relative">
                <AnimatePresence mode="wait" custom={slideDirection} initial={false}>
                  <motion.div
                    key={`left-${leftServiceIndex}`}
                    custom={slideDirection}
                    variants={leftCardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    whileHover={{ y: -5 }}
                    className="h-[500px]"
                  >
                    {renderServiceCard(leftService, LeftIcon, false)}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                className="relative"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <AnimatePresence mode="wait" custom={slideDirection} initial={false}>
                  <motion.div
                    key={`center-${activeServiceIndex}`}
                    custom={slideDirection}
                    variants={centerCardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) paginateServices(-1);
                      if (info.offset.x < -80) paginateServices(1);
                    }}
                    whileHover={{ y: -5 }}
                    className="h-[540px] cursor-grab active:cursor-grabbing"
                  >
                    {renderServiceCard(centerService, CenterIcon, true)}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="relative">
                <AnimatePresence mode="wait" custom={slideDirection} initial={false}>
                  <motion.div
                    key={`right-${rightServiceIndex}`}
                    custom={slideDirection}
                    variants={rightCardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    whileHover={{ y: -5 }}
                    className="h-[500px]"
                  >
                    {renderServiceCard(rightService, RightIcon, false)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => paginateServices(-1)}
              aria-label="Previous service"
              className="absolute left-1 lg:left-4 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 bg-white/85 backdrop-blur-md border border-accent-blue/25 rounded-full flex items-center justify-center hover:bg-accent-blue/10 transition-all duration-300 ease-in-out shadow-[0_10px_24px_rgba(10,31,68,0.12)] hover:shadow-[0_16px_30px_rgba(47,128,237,0.3)]"
            >
              <svg className="w-6 h-6 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => paginateServices(1)}
              aria-label="Next service"
              className="absolute right-1 lg:right-4 top-1/2 -translate-y-1/2 w-11 h-11 lg:w-12 lg:h-12 bg-white/85 backdrop-blur-md border border-accent-blue/25 rounded-full flex items-center justify-center hover:bg-accent-blue/10 transition-all duration-300 ease-in-out shadow-[0_10px_24px_rgba(10,31,68,0.12)] hover:shadow-[0_16px_30px_rgba(47,128,237,0.3)]"
            >
              <svg className="w-6 h-6 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pagination dots */}
            <div className="flex justify-center gap-3 mt-12">
              {coreServices.map((_, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0 }}
                  animate={servicesInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  onClick={() => goToService(index)}
                  aria-label={`Go to service ${index + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    index === activeServiceIndex
                      ? 'bg-accent-blue w-10 h-3 shadow-[0_0_16px_rgba(47,128,237,0.55)]'
                      : 'bg-accent-blue/30 hover:bg-accent-blue/55 w-3 h-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section ref={howWeWorkRef} className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={howWeWorkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-accent-blue font-body font-semibold uppercase tracking-wider text-sm">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-navy mt-4 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-body">
              A proven process that delivers consistent results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {howWeWork.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={howWeWorkInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-accent-blue/30 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-6xl font-heading font-bold text-accent-blue/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < howWeWork.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent-blue/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseRef} className="relative overflow-hidden py-24 lg:py-32 bg-[#0b1f40]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#2F80ED]/35 blur-[90px]"></div>
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#1b4f99]/45 blur-[95px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={whyChooseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 max-w-3xl text-center lg:mb-14"
          >
            <span className="font-body text-xs font-semibold uppercase tracking-[0.16em] !text-white md:text-sm">
              Why Choose Us
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold leading-tight !text-white md:text-6xl">
              What Makes Us Different
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 45 }}
                animate={whyChooseInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-2xl border border-white/22 bg-white/12 p-5 md:p-6 text-left backdrop-blur-md shadow-[0_12px_28px_rgba(5,15,35,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/16"
              >
                <div className="mb-5 h-36 w-full overflow-hidden rounded-xl border border-white/30 bg-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.2)] md:h-40">
                  <img
                    src={item.image.src}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="font-heading text-lg font-bold leading-snug !text-white">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-[#dbe8ff]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section ref={resultsRef} className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-accent-blue font-body font-semibold uppercase tracking-wider text-sm">
              Proven Results
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-navy mt-4 mb-6">
              Client Wins That Matter
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-body">
              Real numbers from real campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {results.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={resultsInView ? { opacity: 1, scale: 1 } : {}}
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
              Let&apos;s Turn Your Ideas Into Measurable Growth
            </h2>
            <p className="text-xl max-w-2xl mx-auto font-body mb-12" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Ready to scale your business with smart marketing solutions?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="px-10 py-5 bg-accent-blue text-white rounded-lg font-body font-semibold text-lg hover:bg-opacity-90 transition-all btn-shine shadow-2xl shadow-accent-blue/30">
                Get Proposal
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-lg font-body font-semibold text-lg hover:bg-white/20 transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
