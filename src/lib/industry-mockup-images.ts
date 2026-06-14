/** Static mobile vCard previews for Toggle Industries (screenshots 11–18). */
export const INDUSTRY_MOCKUP_IMAGES = {
  contractor: '/industries/industry-11-casanova.png',
  'real-estate': '/industries/industry-12-chago.png',
  'auto-sales': '/industries/industry-15-walter.png',
  barber: '/industries/industry-16-brian.png',
  coach: '/industries/industry-17-sheldon.png',
  restaurant: '/industries/industry-18-sabor.png',
} as const;

export type IndustryMockupId = keyof typeof INDUSTRY_MOCKUP_IMAGES;

export function getIndustryMockupImage(id: string): string | undefined {
  if (id in INDUSTRY_MOCKUP_IMAGES) {
    return INDUSTRY_MOCKUP_IMAGES[id as IndustryMockupId];
  }
  return undefined;
}
