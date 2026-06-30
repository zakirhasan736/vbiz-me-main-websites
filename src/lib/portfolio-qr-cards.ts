/** Portfolio vCard QR cards — only entries with a branded image in `/public/portfolio`. */
export type PortfolioQrCard = {
  id: string;
  name: string;
  qrImage: string;
  color: string;
  icon: string;
  displayName: string;
  tag: string;
  desc: string;
  demoUrl: string;
};

import { vcardProfileUrl } from '@/lib/vcard-profile-url';

const vCard = vcardProfileUrl;

/** WebP QR assets in `/public/portfolio/{slug}.webp` */
export const portfolioQrImage = (slug: string) => `/portfolio/${slug}.webp`;

/** Every card must have a file in `/public/portfolio` — no API-generated QR codes. */
export const PORTFOLIO_QR_CARDS: PortfolioQrCard[] = [
  {
    id: 'michaelangelo',
    name: 'michaelangelo-casanova-2',
    qrImage: portfolioQrImage('michaelangelo-casanova-2'),
    color: 'ffffff',
    icon: 'MAC',
    displayName: 'Michaelangelo Casanova',
    tag: 'Art & Luxury',
    desc: 'Luxury business representation and high-caliber portfolio design customized for exclusive creative directors.',
    demoUrl: vCard('michaelangelo-casanova-2'),
  },
  {
    id: 'clinton',
    name: 'clinton-h-weston-jr',
    qrImage: portfolioQrImage('clinton-h-weston-jr'),
    color: 'ffffff',
    icon: 'CW',
    displayName: 'Clinton H. Weston Jr',
    tag: 'Logistics Expert',
    desc: 'Sovereign global supply chain architecture, port clearing diagnostics, and rapid freight pathways.',
    demoUrl: vCard('clinton-h-weston-jr'),
  },
  {
    id: 'walter',
    name: 'walter-jofre-jr',
    qrImage: portfolioQrImage('walter-jofre-jr'),
    color: 'ffffff',
    icon: 'WJ',
    displayName: 'Walter Jofre Jr',
    tag: 'Automotive Executive',
    desc: 'Showroom stocks cataloguing, bespoke wholesale transactions, and fleet financial optimization.',
    demoUrl: vCard('walter-jofre-jr'),
  },
  {
    id: 'sabor',
    name: 'sabor-ecuatoriano-3',
    qrImage: portfolioQrImage('sabor-ecuatoriano-3'),
    color: 'ff0000',
    icon: 'SE',
    displayName: 'Sabor Ecuatoriano',
    tag: 'Gastronomy Boutique',
    desc: 'Signature gourmet catering, fine dining events, and exclusive menus designed with heritage.',
    demoUrl: vCard('sabor-ecuatoriano-3'),
  },
  {
    id: 'om-autobody',
    name: 'o-m-autobody-supplies',
    qrImage: portfolioQrImage('o-m-autobody-supplies'),
    color: '4f46e5',
    icon: 'OM',
    displayName: 'O&M Autobody Supplies',
    tag: 'Automotive Supplies',
    desc: 'Wholesale autobody products and supplier relationships with bold branded QR sharing.',
    demoUrl: vCard('o-m-autobody-supplies'),
  },
  {
    id: 'audrey',
    name: 'audrey-garrison',
    qrImage: portfolioQrImage('audrey-garrison'),
    color: 'ffffff',
    icon: 'AG',
    displayName: 'Audrey Garrison',
    tag: 'AddingValue',
    desc: 'Live long, live well, live young — wellness and value-driven personal branding.',
    demoUrl: vCard('audrey-garrison'),
  },
  {
    id: 'cupcake-factory',
    name: 'ronica-j-keith',
    qrImage: portfolioQrImage('ronica-j-keith'),
    color: 'ffffff',
    icon: 'TCF',
    displayName: 'The Cupcake Factory',
    tag: 'Artisan Bakery',
    desc: 'Steampunk-inspired artisan cupcakes with memorable visual brand identity.',
    demoUrl: vCard('ronica-j-keith'),
  },
  {
    id: 'joseph-downer',
    name: 'joseph-downer',
    qrImage: portfolioQrImage('joseph-downer'),
    color: 'ffffff',
    icon: 'JDK',
    displayName: 'JD&K Trucking',
    tag: 'Logistics',
    desc: 'Professional freight and trucking services with instant scan-to-connect outreach.',
    demoUrl: vCard('joseph-downer'),
  },
  {
    id: 'dominican-chamber',
    name: 'jennifer-martinez',
    qrImage: portfolioQrImage('jennifer-martinez'),
    color: 'ffffff',
    icon: 'DCC',
    displayName: 'Dominican Chamber of Commerce',
    tag: 'Long Island',
    desc: 'Chamber networking, community commerce, and regional business advocacy.',
    demoUrl: vCard('jennifer-martinez'),
  },
  {
    id: 'key-to-life',
    name: 'essence-divine',
    qrImage: portfolioQrImage('essence-divine'),
    color: '4f46e5',
    icon: 'KTL',
    displayName: 'Key To Life',
    tag: 'Wellness',
    desc: 'Empowerment-focused wellness branding with distinctive purple QR identity.',
    demoUrl: vCard('essence-divine'),
  },
  {
    id: 'orygn',
    name: 'michaelanglo-casanova',
    qrImage: portfolioQrImage('michaelanglo-casanova'),
    color: 'ffffff',
    icon: 'OR',
    displayName: 'ORYGN',
    tag: 'Natural Delivery',
    desc: 'Pharma results with natural delivery — premium health and wellness positioning.',
    demoUrl: vCard('michaelanglo-casanova'),
  },
  {
    id: 'richard-kincaid',
    name: 'richard-kincaid',
    qrImage: portfolioQrImage('richard-kincaid'),
    color: 'ffffff',
    icon: 'ROS',
    displayName: 'Rain or Shine Movers',
    tag: 'Moving Services',
    desc: 'Reliable residential and commercial moving with bold branded QR outreach.',
    demoUrl: vCard('richard-kincaid'),
  },
  {
    id: 'lp-insurance',
    name: 'hector-torres',
    qrImage: portfolioQrImage('hector-torres'),
    color: 'ffffff',
    icon: 'LP',
    displayName: 'LP Insurance Marketing Group',
    tag: 'Insurance',
    desc: 'Integrity partner office delivering insurance marketing and client acquisition.',
    demoUrl: vCard('hector-torres'),
  },
  {
    id: 'wil-jacques',
    name: 'wil-jacques',
    qrImage: portfolioQrImage('wil-jacques'),
    color: 'ffffff',
    icon: 'EM',
    displayName: 'WILL JACQUES',
    tag: 'Professional Brand',
    desc: 'Clean modern identity with custom blue geometric QR styling.',
    demoUrl: vCard('wil-jacques'),
  },
  {
    id: 'gregorz',
    name: 'gregorz-bajek',
    qrImage: portfolioQrImage('gregorz-bajek'),
    color: 'ff0000',
    icon: 'QV',
    displayName: 'GREGORZ',
    tag: 'Corporate Brand',
    desc: 'Distinctive red QR branding with premium monogram-centered design.',
    demoUrl: vCard('gregorz-bajek'),
  },
];

/** @deprecated Use PORTFOLIO_QR_CARDS */
export const PORTFOLIO_QR_SLIDER_ITEMS = PORTFOLIO_QR_CARDS;

export function getPortfolioQrImageSrc(card: PortfolioQrCard): string {
  return card.qrImage;
}
