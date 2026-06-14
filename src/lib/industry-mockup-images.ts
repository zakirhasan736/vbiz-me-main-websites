/** Local industry mockup screenshots (WebP). */
export const INDUSTRY_MOCKUP_IMAGES = {
  contractor: '/industries/industry-11-casanova.webp',
  'real-estate': '/industries/industry-12-chago.webp',
  'auto-sales': '/industries/industry-15-walter.webp',
  barber: '/industries/industry-16-brian.webp',
  coach: '/industries/industry-17-sheldon.webp',
  restaurant: '/industries/industry-18-sabor.webp',
} as const;

export type IndustryMockupId = keyof typeof INDUSTRY_MOCKUP_IMAGES;

export function getIndustryMockupImage(id: string): string | undefined {
  if (id in INDUSTRY_MOCKUP_IMAGES) {
    return INDUSTRY_MOCKUP_IMAGES[id as IndustryMockupId];
  }
  return undefined;
}
