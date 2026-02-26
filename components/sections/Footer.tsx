'use client';

import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Link from 'next/link';

const footerLinks = {
  services: [
    { label: 'Social Media Marketing', href: '/services/social-media-marketing' },
    { label: 'Meta Ads', href: '/services/meta-ads' },
    { label: 'Photoshoot Production', href: '/services/photoshoot-production' },
    { label: 'Content Creation', href: '/services/content-creation' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'SEO Services', href: '/services/seo-services' },
    { label: 'AI Solutions', href: '/services/ai-solutions' },
  ],
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Process', href: '/#process' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              FTZ Digital
            </h3>
            <p className="text-text-secondary mb-6 max-w-md font-body leading-relaxed">
              Transforming brands through innovative digital solutions. We combine creativity,
              strategy, and technology to deliver exceptional results.
            </p>
            <div className="mb-6 space-y-2 font-body text-text-secondary">
              <div className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 shrink-0 text-accent-blue" />
                <span>Plot 37, Midway Commercial, Phase 7 Islamabad, 46000</span>
              </div>
              <a
                href="tel:0306389389"
                className="flex items-center gap-2 transition-colors hover:text-accent-blue"
              >
                <FiPhone className="shrink-0 text-accent-blue" />
                <span>0306 389389</span>
              </a>
              <a
                href="mailto:info@ftzdigital.com"
                className="flex items-center gap-2 transition-colors hover:text-accent-blue"
              >
                <FiMail className="shrink-0 text-accent-blue" />
                <span>info@ftzdigital.com</span>
              </a>
            </div>
            <div className="flex gap-4">
              {[
                { icon: FiFacebook, href: 'https://www.facebook.com/ftzdigitalagency' },
                { icon: FiInstagram, href: 'https://www.instagram.com/ftzdigital/' },
                { icon: FiLinkedin, href: 'https://www.linkedin.com/company/ftzdigital/posts/?feedView=all' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-lg hover:bg-accent-blue transition-all border border-white/10 hover:border-accent-blue"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="text-white" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading text-lg">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-heading text-lg">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-blue transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-white font-semibold mb-4 font-heading text-lg">Subscribe to Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors font-body"
              />
              <motion.button
                className="px-6 py-3 bg-accent-blue text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-text-secondary text-sm font-body">
          <p>© {new Date().getFullYear()} FTZ Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
