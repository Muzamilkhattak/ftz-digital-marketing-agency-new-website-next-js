'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Navigation from '@/components/Navigation';
import ThemeToggle from '@/components/ThemeToggle';

// Lazy load sections below the fold for better initial load performance
const About = dynamic(() => import('@/components/sections/About'), { ssr: true });
const Services = dynamic(() => import('@/components/sections/Services'), { ssr: true });
const Portfolio = dynamic(() => import('@/components/sections/Portfolio'), { ssr: true });
const Process = dynamic(() => import('@/components/sections/Process'), { ssr: true });
const CEO = dynamic(() => import('@/components/sections/CEO'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true });
const Team = dynamic(() => import('@/components/sections/Team'), { ssr: true });
const Technology = dynamic(() => import('@/components/sections/Technology'), { ssr: true });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: true });
const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: true });
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen">
      <Navigation />
      <ThemeToggle />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <CEO />
      <Testimonials />
      <Team />
      <Technology />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
