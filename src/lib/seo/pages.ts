import { buildPageMetadata } from './metadata';

/** Primary marketing pages included in sitemap + SEO. */
export const SEO_PAGES = [
  {
    key: 'home',
    name: 'Home',
    path: '/',
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
  {
    key: 'about',
    name: 'About Us',
    path: '/about',
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    key: 'vcards',
    name: 'vCards',
    path: '/our-card',
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    key: 'portfolio',
    name: 'Portfolio',
    path: '/portfolio',
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  },
  {
    key: 'compare',
    name: 'Paper vs vBiz',
    path: '/compare',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    key: 'navigationBar',
    name: 'Nav Bar',
    path: '/navigation-bar',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    key: 'advantage',
    name: 'Advantage',
    path: '/advantage',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    key: 'community',
    name: 'Community',
    path: '/community',
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  },
  {
    key: 'pricing',
    name: 'Pricing',
    path: '/pricing',
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
] as const;

export type SeoPageKey = (typeof SEO_PAGES)[number]['key'];

export const pageContent = {
  home: {
    title: 'Create Interactive Virtual Business Cards',
    description:
      'Stand out with vBiz Me digital business cards — featuring video intros, QR codes, and custom designs. Share in seconds, no printing needed.',
    keywords: [
      'virtual business cards',
      'digital business cards',
      'QR code business card',
      'share contact instantly',
    ],
    path: '/',
  },
  about: {
    title: 'About Us — Digital Networking Reinvented',
    description:
      'Learn about vBiz Me — the team building interactive virtual business cards that help professionals network faster with video, QR, and smart sharing.',
    keywords: ['about vBiz Me', 'digital networking company', 'smart vCard company'],
    path: '/about',
  },
  vcards: {
    title: 'vCards — Interactive Virtual Business Cards',
    description:
      'Explore vBiz Me vCards — interactive virtual business cards with video intros, clickable links, QR sharing, and custom branding for every professional.',
    keywords: ['vCards', 'interactive vCard', 'custom digital business card', 'video business card'],
    path: '/our-card',
  },
  portfolio: {
    title: 'Portfolio — Real Client vCards & Results',
    description:
      'Browse the vBiz Me portfolio of real client virtual business cards across industries — see how professionals use smart vCards to win more conversations.',
    keywords: ['vBiz Me portfolio', 'digital business card examples', 'client vCards'],
    path: '/portfolio',
  },
  compare: {
    title: 'Paper vs vBiz — Why Digital Cards Win',
    description:
      'Compare paper business cards vs vBiz Me. See why interactive digital cards with video, analytics, and instant sharing outperform print.',
    keywords: [
      'paper vs digital business card',
      'digital vs paper card',
      'why digital business cards',
    ],
    path: '/compare',
  },
  navigationBar: {
    title: 'Nav Bar — Smart Scrolling Navigation for vCards',
    description:
      'Discover the vBiz Me navigation bar — a smart scrolling menu that helps visitors explore your digital business card services, links, and media instantly.',
    keywords: ['vCard navigation bar', 'digital card menu', 'smart scrolling navigation'],
    path: '/navigation-bar',
  },
  advantage: {
    title: 'Advantage — The Invisible Edge of Digital Cards',
    description:
      'See the vBiz Me advantage — stand out in every intro with video, QR codes, always-updated contact details, and measurable networking results.',
    keywords: ['digital business card advantages', 'vBiz Me advantage', 'networking edge'],
    path: '/advantage',
  },
  community: {
    title: 'Community — Network of Verified Professionals',
    description:
      'Join the vBiz Me community — entrepreneurs, coaches, and advisors sharing high-speed digital smart vCards across a growing professional network.',
    keywords: ['vBiz Me community', 'digital networking community', 'professional vCard network'],
    path: '/community',
  },
  pricing: {
    title: 'Pricing — Plans for Every Professional',
    description:
      'View vBiz Me pricing plans for interactive virtual business cards. Choose the right package for individuals, teams, and growing brands.',
    keywords: ['vBiz Me pricing', 'digital business card cost', 'vCard plans', 'smart card pricing'],
    path: '/pricing',
  },
} as const satisfies Record<
  SeoPageKey,
  { title: string; description: string; keywords: readonly string[]; path: string }
>;

export const pagesSeo = {
  home: buildPageMetadata({ ...pageContent.home, keywords: [...pageContent.home.keywords] }),
  about: buildPageMetadata({ ...pageContent.about, keywords: [...pageContent.about.keywords] }),
  vcards: buildPageMetadata({ ...pageContent.vcards, keywords: [...pageContent.vcards.keywords] }),
  portfolio: buildPageMetadata({
    ...pageContent.portfolio,
    keywords: [...pageContent.portfolio.keywords],
  }),
  compare: buildPageMetadata({ ...pageContent.compare, keywords: [...pageContent.compare.keywords] }),
  navigationBar: buildPageMetadata({
    ...pageContent.navigationBar,
    keywords: [...pageContent.navigationBar.keywords],
  }),
  advantage: buildPageMetadata({
    ...pageContent.advantage,
    keywords: [...pageContent.advantage.keywords],
  }),
  community: buildPageMetadata({
    ...pageContent.community,
    keywords: [...pageContent.community.keywords],
  }),
  pricing: buildPageMetadata({ ...pageContent.pricing, keywords: [...pageContent.pricing.keywords] }),
} as const;
