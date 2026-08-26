const HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  apos: "'",
  copy: '©',
  gt: '>',
  hellip: '…',
  laquo: '«',
  lt: '<',
  mdash: '—',
  ndash: '–',
  nbsp: ' ',
  quot: '"',
  raquo: '»',
  rsquo: '’',
}

export function decodeHtmlText(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
      if (entity[0] === '#') {
        const code = entity[1] === 'x' || entity[1] === 'X' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1))
        return Number.isFinite(code) ? String.fromCodePoint(code) : match
      }
      return HTML_ENTITIES[entity.toLowerCase()] ?? match
    })
    .trim()
}
