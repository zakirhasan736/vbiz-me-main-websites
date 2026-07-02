import { vcardProfileUrl } from '@/lib/vcard-profile-url';

const vCard = vcardProfileUrl;

export type HomeIndustry = {
  id: string;
  name: string;
  company: string;
  introTitle: string;
  videoPlaceholder: string;
  avatar: string;
  /** When true, avatar / placeholder are looping profile videos (not static images). */
  mediaIsVideo?: boolean;
  tagline: string;
  services: string[];
  bgColor: string;
  ctaText: string;
  demoUrl: string;
};

/** Homepage industry demo list — order is intentional. */
export const HOME_INDUSTRIES: HomeIndustry[] = [
  {
    id: 'executive',
    name: 'Executive',
    company: 'CEO/Founder',
    introTitle: 'Michaelangelo Casanova — CEO & Founder',
    videoPlaceholder:
      'https://app.vbizme.com/storage/ecard/profileimages/91/mc%20vbizme.mp4',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/91/mc%20vbizme.mp4',
    mediaIsVideo: true,
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
      'https://app.vbizme.com/storage/ecard/profileimages/68/%5BUnknown%5D.jpg',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/68/%5BUnknown%5D.jpg',
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
      'https://app.vbizme.com/storage/ecard/profileimages/146/Hector_Social%20Media%20Photo.jpg',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/146/Hector_Social%20Media%20Photo.jpg',
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
      'https://app.vbizme.com/storage/ecard/profileimages/194/Walter%20Profile.jpg',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/194/Walter%20Profile.jpg',
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
      'https://app.vbizme.com/storage/ecard/profileimages/155/Untitled%20design-60.mp4',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/155/Untitled%20design-60.mp4',
    mediaIsVideo: true,
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
      'https://app.vbizme.com/storage/ecard/profileimages/205/SE3%20Animated%20logo.mp4',
    avatar:
      'https://app.vbizme.com/storage/ecard/profileimages/205/SE3%20Animated%20logo.mp4',
    mediaIsVideo: true,
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
