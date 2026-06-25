const vCard = (slug: string) => `https://app.vbizme.com/vCard/${slug}#home`;

export type HomeIndustry = {
  id: string;
  name: string;
  company: string;
  introTitle: string;
  videoPlaceholder: string;
  avatar: string;
  tagline: string;
  services: string[];
  bgColor: string;
  ctaText: string;
  demoUrl: string;
};

/** Homepage “Toggle Industries” list — order is intentional. */
export const HOME_INDUSTRIES: HomeIndustry[] = [
  {
    id: 'executive',
    name: 'Executive',
    company: 'CEO/Founder',
    introTitle: 'Michaelangelo Casanova — CEO & Founder',
    videoPlaceholder:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    tagline: 'Lead with a polished executive presence and a memorable digital first impression.',
    services: ['Executive Brand Positioning', 'Investor-Ready Intro Videos', 'Leadership Networking'],
    bgColor: 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 text-purple-400',
    ctaText: 'View Executive Demo',
    demoUrl: vCard('michaelangelo-casanova-2'),
  },
  {
    id: 'electrician',
    name: 'Electrician',
    company: 'Owner/Operator',
    introTitle: 'Chago Vargas — Licensed Electrician',
    videoPlaceholder:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    tagline: 'Win more service calls with instant estimates, reviews, and one-tap contact saves.',
    services: ['Residential Wiring', 'Panel Upgrades', 'Emergency Service Calls'],
    bgColor: 'border-amber-400/20 bg-amber-400/5 hover:border-amber-400/40 text-amber-300',
    ctaText: 'Request Service Quote',
    demoUrl: vCard('chago-vargas'),
  },
  {
    id: 'finance-wealth',
    name: 'Finance & Wealth',
    company: 'Certified Wealth Educator',
    introTitle: 'Hector Torres — Wealth & Insurance Educator',
    videoPlaceholder:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
    tagline: 'Educate prospects on protection, planning, and wealth strategies in one shareable card.',
    services: ['Wealth Education Sessions', 'Insurance Planning', 'Client Portfolio Reviews'],
    bgColor: 'border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40 text-cyan-400',
    ctaText: 'Book Consultation',
    demoUrl: vCard('hector-torres'),
  },
  {
    id: 'auto-sales',
    name: 'Auto Sales',
    company: 'Senior Sales Consultant',
    introTitle: 'Walter Jofre Jr — Senior Sales Consultant',
    videoPlaceholder:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
    tagline: 'Skip dealership runarounds. Instant showroom inventory VIP access.',
    services: ['Specialist Sourcing', 'Trade Appraisals', 'Fast-Track Credit Advisory'],
    bgColor: 'border-amber-400/20 bg-amber-400/5 hover:border-amber-400/40 text-amber-300',
    ctaText: 'Browse VIP Inventory',
    demoUrl: vCard('walter-jofre-jr'),
  },
  {
    id: 'financial-coach',
    name: 'Financial Coach',
    company: 'Wealth Advisor',
    introTitle: 'Sheldon Singleton — Wealth Advisor',
    videoPlaceholder:
      'https://images.unsplash.com/photo-1552581230-c015914626ed?auto=format&fit=crop&q=80&w=400',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    tagline: 'Guide clients toward confident financial decisions with a trusted advisor experience.',
    services: ['Wealth Strategy Planning', 'Retirement Roadmaps', 'Executive Advisory Briefings'],
    bgColor: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 text-emerald-400',
    ctaText: 'Schedule Advisory Briefing',
    demoUrl: vCard('sheldon-singleton'),
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    company: 'Sabor Ecuatoriano',
    introTitle: 'Sabor Ecuatoriano Kitchen — Elegant Dining',
    videoPlaceholder:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    tagline: 'Secure immediate online reservation. Experience authentic culinary flair.',
    services: ['Artisan Platters & Drinks', 'Interactive Mobile Dining Menu', 'Gourmet Catering Options'],
    bgColor: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 text-emerald-400',
    ctaText: 'Reserve Lounge Table',
    demoUrl: vCard('sabor-ecuatoriano-3'),
  },
];
