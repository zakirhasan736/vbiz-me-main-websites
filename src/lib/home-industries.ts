import { vcardProfileUrl } from '@/lib/vcard-profile-url';

const vCard = vcardProfileUrl;

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
  {
    id: 'moving-services',
    name: 'Moving Services',
    company: 'Richard Kincaid · CEO',
    introTitle: 'Richard Kincaid — Rain or Shine Movers',
    videoPlaceholder:
      'https://app.vbizme.com/storage/ecard/profileimages/96/WhatsApp Image 2025-03-24 at 13.47.02.jpeg',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/96/WhatsApp Image 2025-03-24 at 13.47.02.jpeg',
    tagline: 'Turn every estimate handshake into a saved contact and instant booking follow-up.',
    services: ['Residential & Commercial Moves', 'Packing Services', 'One-Tap Save Contact'],
    bgColor: 'border-teal-500/20 bg-teal-500/5 hover:border-teal-400/40 text-teal-300',
    ctaText: 'View Moving Demo',
    demoUrl: vCard('richard-kincaid'),
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    company: 'Jessica Brito · Agent',
    introTitle: 'Jessica Brito — Real Estate Agent',
    videoPlaceholder:
      'https://app.vbizme.com/storage/ecard/profileimages/107/WhatsApp%20Image%202025-04-18%20at%2021.43.11.jpeg',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/107/WhatsApp%20Image%202025-04-18%20at%2021.43.11.jpeg',
    tagline: 'Turn every open house handshake into a saved contact and instant listing follow-up.',
    services: ['Listing Showcases', 'Mortgage Partner Links', 'One-Tap Save Contact'],
    bgColor: 'border-rose-500/20 bg-rose-500/5 hover:border-rose-400/40 text-rose-300',
    ctaText: 'Explore Agent Demo',
    demoUrl: vCard('jessica-brito'),
  },
  {
    id: 'fitness',
    name: 'Fitness',
    company: 'Mike Faienza · Trainer',
    introTitle: 'Mike Faienza — Fitness Trainer',
    videoPlaceholder:
      'https://app.vbizme.com/storage/ecard/profileimages/102/1000021308.jpg',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/102/1000021308.jpg',
    tagline: 'Book sessions, share transformation stories, and keep clients engaged between workouts.',
    services: ['Class Scheduling', 'Training Packages', 'Wellness Content Hub'],
    bgColor: 'border-orange-500/20 bg-orange-500/5 hover:border-orange-400/40 text-orange-300',
    ctaText: 'View Trainer Demo',
    demoUrl: vCard('mike-faienza'),
  },
  {
    id: 'legal',
    name: 'Legal',
    company: 'Wil Jacques · Attorney',
    introTitle: 'Wil Jacques — Patent Attorney',
    videoPlaceholder:
      'https://app.vbizme.com/storage/ecard/profileimages/77/Wil-Jacques-Pic.jpg',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/77/Wil-Jacques-Pic.jpg',
    tagline: 'Present credentials, consultation booking, and trust signals in a polished legal profile.',
    services: ['Consultation Booking', 'Credential Highlights', 'Secure Client Intake'],
    bgColor: 'border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-400/40 text-indigo-300',
    ctaText: 'View Legal Demo',
    demoUrl: vCard('wil-jacques'),
  },
];
