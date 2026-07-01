export function vcardProfileUrl(slug: string): string {
  const trimmed = slug.trim();
  const base = `https://vcard.vbizme.com/${trimmed}`;
  const url = new URL(base);
  url.searchParams.set('embed', '1');
  return url.toString();
}
