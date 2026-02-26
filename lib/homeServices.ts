export type HomeServiceDetail = {
  slug: string;
  title: string;
  image: string;
  shortDescription: string;
  overview: string;
  highlights: string[];
  idealFor: string[];
};

export const homeServices: HomeServiceDetail[] = [
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&auto=format&fit=crop&q=80',
    shortDescription: 'Build brand visibility and meaningful audience engagement across platforms.',
    overview:
      'We create platform-specific social strategies that combine creative direction, posting consistency, and performance tracking to turn followers into customers.',
    highlights: [
      'Monthly content planning and calendar management',
      'Profile optimization and brand consistency',
      'Audience growth and engagement strategy',
      'Performance reporting with actionable insights',
    ],
    idealFor: ['New and growing brands', 'Businesses with low social engagement', 'Brands launching new products'],
  },
  {
    slug: 'meta-ads',
    title: 'Meta Ads',
    image:
      'https://images.unsplash.com/photo-1557838923-2985c318be48?w=1400&auto=format&fit=crop&q=80',
    shortDescription: 'Run high-converting Facebook and Instagram campaigns focused on ROI.',
    overview:
      'From audience research to creative testing, we build and optimize Meta ad funnels that improve lead quality, reduce cost per acquisition, and scale profitably.',
    highlights: [
      'Campaign setup and audience targeting',
      'Creative testing for ads and copy',
      'Retargeting and funnel optimization',
      'Weekly optimization and reporting',
    ],
    idealFor: ['Lead generation brands', 'Ecommerce stores', 'Businesses scaling paid traffic'],
  },
  {
    slug: 'photoshoot-production',
    title: 'Photoshoot Production',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&auto=format&fit=crop&q=80',
    shortDescription: 'Premium visual production for products, teams, and campaigns.',
    overview:
      'We handle planning, art direction, and production for photoshoots that strengthen your brand identity and improve campaign performance across digital channels.',
    highlights: [
      'Concept and moodboard development',
      'On-site or studio shoot execution',
      'Product, lifestyle, and brand imagery',
      'Post-production and final asset delivery',
    ],
    idealFor: ['Fashion and lifestyle brands', 'Product-based businesses', 'Corporate branding campaigns'],
  },
  {
    slug: 'content-creation',
    title: 'Content Creation',
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1400&auto=format&fit=crop&q=80',
    shortDescription: 'Consistent, high-quality content that keeps your audience engaged.',
    overview:
      'We produce content tailored to your brand voice and buyer journey, ensuring every post, video, and creative asset supports growth and conversion goals.',
    highlights: [
      'Reels, short videos, and static creatives',
      'Caption and copywriting support',
      'Content pillars and format strategy',
      'Batch creation for consistent publishing',
    ],
    idealFor: ['Brands with inconsistent posting', 'Teams without in-house content support', 'Businesses building authority'],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    image:
      'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1400&auto=format&fit=crop&q=80',
    shortDescription: 'Fast, modern websites designed for trust, usability, and conversions.',
    overview:
      'We design and build conversion-focused websites with clean user experience, responsive layouts, and technical performance that supports SEO and paid traffic.',
    highlights: [
      'Responsive UI/UX design',
      'Performance-focused development',
      'Conversion-oriented landing pages',
      'Analytics and form integration',
    ],
    idealFor: ['Service businesses', 'Brands rebranding online presence', 'Businesses running paid ads'],
  },
  {
    slug: 'seo-services',
    title: 'SEO Services',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
    shortDescription: 'Improve organic visibility, traffic quality, and long-term growth.',
    overview:
      'We combine technical SEO, content strategy, and on-page optimization to help your site rank for high-intent search terms and attract qualified traffic.',
    highlights: [
      'Technical SEO audit and fixes',
      'Keyword and content strategy',
      'On-page and internal linking optimization',
      'Monthly tracking and ranking reports',
    ],
    idealFor: ['Brands needing steady inbound traffic', 'Sites with low rankings', 'Businesses targeting local or niche markets'],
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&auto=format&fit=crop&q=80',
    shortDescription: 'Automate workflows and improve speed with practical AI integration.',
    overview:
      'We identify repetitive tasks and implement AI-driven systems that streamline operations, support marketing execution, and improve response time and efficiency.',
    highlights: [
      'Workflow mapping and automation opportunities',
      'AI chatbot and support flow setup',
      'Content and process automation',
      'Team onboarding and optimization support',
    ],
    idealFor: ['Operations-heavy teams', 'Service businesses needing faster response cycles', 'Brands scaling internal processes'],
  },
];

export const getHomeServiceBySlug = (slug: string) =>
  homeServices.find((service) => service.slug === slug);
