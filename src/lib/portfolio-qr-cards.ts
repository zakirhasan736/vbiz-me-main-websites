/** Portfolio vCard QR cards — only entries with a branded image in `/public`. */
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

const vCard = (slug: string) => `https://app.vbizme.com/vCard/${slug}#home`;

/** Every card must have a file in `/public` — no API-generated QR codes. */
export const PORTFOLIO_QR_CARDS: PortfolioQrCard[] = [
  {
    id: 'michaelangelo',
    name: 'michaelangelo-casanova-2',
    qrImage: '/QR code Michaelangelo.jpeg',
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
    qrImage: '/QR Code Weston & Hall.png',
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
    qrImage: '/QR code Walter.png',
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
    qrImage: '/QR Code SE3.png',
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
    qrImage: '/OM QR Code.png',
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
    qrImage: '/QR Code Audrey.png',
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
    qrImage: '/QR Code Cupcake.png',
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
    qrImage: '/QR Code JDK Trucking.png',
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
    qrImage: '/QR Code Jenniffer.png',
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
    qrImage: '/QR Code Key To Life.png',
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
    qrImage: '/QR Code Orygn MC.png',
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
    qrImage: '/QR Code Rain or Shine.png',
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
    qrImage: '/qr-code-Hector.png',
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
    qrImage: '/qr-code-6.png',
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
    qrImage: '/quo vadis qr code.png',
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
