import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FiArrowUpRight,
  FiBarChart2,
  FiCheckCircle,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import { getHomeServiceBySlug, homeServices } from '@/lib/homeServices';

type ServiceDetailsPageProps = {
  params: {
    slug: string;
  };
};

type ServiceSnapshot = {
  timeline: string;
  engagement: string;
  reporting: string;
  primaryFocus: string;
};

const serviceSnapshots: Record<string, ServiceSnapshot> = {
  'social-media-marketing': {
    timeline: '4-8 weeks setup',
    engagement: 'Monthly retainer',
    reporting: 'Weekly progress reports',
    primaryFocus: 'Brand visibility + engagement growth',
  },
  'meta-ads': {
    timeline: '7-14 days launch',
    engagement: 'Performance retainer',
    reporting: 'Weekly optimization reports',
    primaryFocus: 'Cost-efficient paid conversions',
  },
  'photoshoot-production': {
    timeline: '2-4 weeks delivery',
    engagement: 'Project-based',
    reporting: 'Milestone-based updates',
    primaryFocus: 'Premium brand asset production',
  },
  'content-creation': {
    timeline: '10-14 days setup',
    engagement: 'Monthly retainer',
    reporting: 'Content + performance reports',
    primaryFocus: 'Consistent high-impact content pipeline',
  },
  'web-development': {
    timeline: '3-8 weeks build',
    engagement: 'Project + support',
    reporting: 'Sprint-based updates',
    primaryFocus: 'Conversion-focused digital experience',
  },
  'seo-services': {
    timeline: '4-12 weeks momentum',
    engagement: 'Monthly retainer',
    reporting: 'Monthly ranking reports',
    primaryFocus: 'Sustainable organic traffic growth',
  },
  'ai-solutions': {
    timeline: '2-6 weeks integration',
    engagement: 'Project + optimization',
    reporting: 'Performance and automation reports',
    primaryFocus: 'Operational speed and smart automation',
  },
};

const defaultSnapshot = {
  timeline: 'Custom timeline',
  engagement: 'Flexible engagement',
  reporting: 'Structured reporting',
  primaryFocus: 'Business-aligned measurable outcomes',
};

const serviceValueDescriptions: Record<string, string> = {
  'social-media-marketing':
    'We align content, platform strategy, and performance tracking to convert attention into qualified business growth.',
  'meta-ads':
    'We build conversion-focused ad systems that reduce wasted spend and scale profitable customer acquisition.',
  'photoshoot-production':
    'We produce premium brand visuals that improve campaign quality, trust, and conversion performance.',
  'content-creation':
    'We create consistent, high-impact content pipelines that support awareness, engagement, and sales intent.',
  'web-development':
    'We deliver fast, conversion-ready websites built to turn traffic into qualified leads and paying clients.',
  'seo-services':
    'We combine technical SEO and content strategy to grow qualified organic traffic with long-term momentum.',
  'ai-solutions':
    'We integrate practical AI systems that automate execution and increase team output without operational overload.',
};

const processSteps = [
  {
    title: 'Discovery & Goals',
    description: 'We review your current setup, baseline metrics, and business targets.',
  },
  {
    title: 'Strategy & Plan',
    description: 'We define the execution roadmap, priorities, and success KPIs.',
  },
  {
    title: 'Launch & Optimize',
    description: 'We execute, test, and improve continuously based on live performance.',
  },
  {
    title: 'Report & Scale',
    description: 'You get clear reporting and next-step actions to scale what works.',
  },
];

const whyChooseUs = [
  {
    title: 'Strategy-First Approach',
    description: 'Every action is mapped to a clear objective, KPI, and growth outcome.',
    icon: FiTarget,
  },
  {
    title: 'Results-Driven Execution',
    description: 'We prioritize decisions that improve conversions, leads, and ROI.',
    icon: FiTrendingUp,
  },
  {
    title: 'In-House Expert Team',
    description: 'Planning, creative, and performance execution stay aligned in one team.',
    icon: FiUsers,
  },
  {
    title: 'Transparent Communication',
    description: 'You receive structured updates, insights, and clear next actions.',
    icon: FiShield,
  },
];

const getFaqItems = (serviceTitle: string, snapshot: ServiceSnapshot) => [
  {
    question: `How quickly can we expect results from ${serviceTitle}?`,
    answer: `Most projects begin showing measurable movement within ${snapshot.timeline}, depending on your baseline and market competition.`,
  },
  {
    question: 'What deliverables are included?',
    answer:
      'You receive a defined scope, execution plan, delivery timelines, and clear milestone outputs based on your selected package.',
  },
  {
    question: 'How do you report performance?',
    answer: `Reporting is shared through ${snapshot.reporting.toLowerCase()} with actionable insights and optimization priorities.`,
  },
  {
    question: 'Can you work with our internal team?',
    answer:
      'Yes. We can lead the full execution or collaborate directly with your internal marketing and sales team.',
  },
];

export function generateStaticParams() {
  return homeServices.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServiceDetailsPageProps): Metadata {
  const service = getHomeServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found | FTZ Digital',
    };
  }

  return {
    title: `${service.title} | FTZ Digital`,
    description: service.shortDescription,
  };
}

export default function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
  const service = getHomeServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const snapshot = serviceSnapshots[service.slug] ?? defaultSnapshot;
  const valueDescription = serviceValueDescriptions[service.slug] ?? defaultSnapshot.primaryFocus;
  const faqItems = getFaqItems(service.title, snapshot);
  const results = [
    {
      title: 'Higher ROI',
      description: 'Improve marketing return through focused strategy, testing, and budget efficiency.',
      icon: FiTrendingUp,
    },
    {
      title: 'More Qualified Leads',
      description: 'Generate stronger lead intent with clearer messaging and better conversion flow.',
      icon: FiUsers,
    },
    {
      title: 'Sustainable Growth',
      description: 'Scale with predictable execution cycles backed by structured reporting and optimization.',
      icon: FiBarChart2,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7faff]">
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/95 via-primary-navy/90 to-[#0d2348]/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Service Detail
            </span>
            <h1
              className="mt-6 font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight !text-white"
              style={{ color: '#FFFFFF' }}
            >
              {service.title}
            </h1>
            <p
              className="mt-6 max-w-3xl mx-auto font-body text-xl md:text-2xl leading-relaxed !text-white"
              style={{ color: '#FFFFFF' }}
            >
              {service.shortDescription}
            </p>
            <p
              className="mt-3 max-w-3xl mx-auto font-body text-base md:text-lg leading-relaxed !text-white"
              style={{ color: '#FFFFFF' }}
            >
              {valueDescription}
            </p>

            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-10 py-5 bg-accent-blue text-white rounded-lg font-body font-semibold text-lg hover:bg-opacity-90 transition-all shadow-2xl shadow-accent-blue/30 inline-flex items-center gap-2"
              >
                Get Consultation
                <FiArrowUpRight />
              </Link>
              <Link
                href="/services"
                className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-lg font-body font-semibold text-lg hover:bg-white/20 transition-all"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-14 md:pb-20 md:pt-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8 md:space-y-10">
            <article className="rounded-3xl border border-[#d9e7ff] bg-white p-6 shadow-[0_16px_40px_rgba(10,31,68,0.07)] md:p-9">
              <h2 className="font-heading text-3xl font-bold text-[#0A1F44] md:text-4xl">What We Do</h2>
              <p className="mt-4 max-w-4xl font-body text-base leading-relaxed text-[#2c4365] md:text-lg">
                {service.overview}
              </p>
              <ul className="mt-7 grid gap-3 md:grid-cols-2">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 rounded-xl border border-[#d9e7ff] bg-[#f8fbff] px-4 py-3"
                  >
                    <FiCheckCircle className="mt-0.5 shrink-0 text-accent-blue" />
                    <span className="font-body text-sm leading-relaxed text-[#274261]">{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-[#d9e7ff] bg-white p-6 shadow-[0_16px_40px_rgba(10,31,68,0.07)] md:p-9">
              <h2 className="font-heading text-3xl font-bold text-[#0A1F44] md:text-4xl">Our Process</h2>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-[#d9e7ff] bg-[#f8fbff] p-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-blue font-body text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-3 font-heading text-xl font-bold text-[#0A1F44]">{step.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-[#2c4365]">{step.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-[#d9e7ff] bg-white p-6 shadow-[0_16px_40px_rgba(10,31,68,0.07)] md:p-9">
              <h2 className="font-heading text-3xl font-bold text-[#0A1F44] md:text-4xl">Results / Benefits</h2>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {results.map((result) => {
                  const ResultIcon = result.icon;
                  return (
                    <div key={result.title} className="rounded-2xl border border-[#d9e7ff] bg-[#f8fbff] p-5">
                      <ResultIcon className="text-2xl text-accent-blue" />
                      <h3 className="mt-3 font-heading text-xl font-bold text-[#0A1F44]">{result.title}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-[#2c4365]">{result.description}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-3xl border border-[#d9e7ff] bg-white p-6 shadow-[0_16px_40px_rgba(10,31,68,0.07)] md:p-9">
              <h2 className="font-heading text-3xl font-bold text-[#0A1F44] md:text-4xl">Why Choose Us</h2>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {whyChooseUs.map((item) => {
                  const WhyIcon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-[#d9e7ff] bg-[#f8fbff] p-5">
                      <WhyIcon className="text-2xl text-accent-blue" />
                      <h3 className="mt-3 font-heading text-xl font-bold text-[#0A1F44]">{item.title}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-[#2c4365]">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-3xl border border-[#d9e7ff] bg-white p-6 shadow-[0_16px_40px_rgba(10,31,68,0.07)] md:p-9">
              <h2 className="font-heading text-3xl font-bold text-[#0A1F44] md:text-4xl">FAQ</h2>
              <div className="mt-7 space-y-3">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-xl border border-[#d9e7ff] bg-[#f8fbff] p-4 md:p-5">
                    <h3 className="font-heading text-lg font-bold text-[#0A1F44]">{item.question}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-[#2c4365]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl bg-primary-navy p-7 shadow-[0_18px_38px_rgba(10,31,68,0.2)] md:p-10">
              <div className="max-w-3xl">
                <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                  Ready to grow with {service.title}?
                </h2>
                <p className="mt-3 font-body text-base leading-relaxed text-white/85">
                  Book a focused consultation and get a clear action plan for your next growth phase.
                </p>
                <div className="mt-7">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-blue px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#1f71df]"
                  >
                    Book Consultation
                    <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
