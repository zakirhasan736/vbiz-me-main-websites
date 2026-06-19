import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'partner-logo');
const OUT_DIR = path.join(ROOT, 'public', 'partner-logo-optimized');

/** Match marquee display cell — avoids overserving pixels */
const MAX_WIDTH = 140;
const MAX_HEIGHT = 56;
const DEFAULT_QUALITY = 48;
/** Logos flagged by Lighthouse — compress a bit harder */
const HEAVY_QUALITY = 38;
const HEAVY_LOGO_IDS = new Set(['5', '10']);

async function optimizeOne(filename) {
  const match = filename.match(/^partner-logo-(\d+)\.(png|jpe?g)$/i);
  if (!match) return;

  const id = match[1];
  const input = path.join(SRC_DIR, filename);
  const output = path.join(OUT_DIR, `partner-logo-${id}.webp`);
  const quality = HEAVY_LOGO_IDS.has(id) ? HEAVY_QUALITY : DEFAULT_QUALITY;

  await sharp(input)
    .resize(MAX_WIDTH, MAX_HEIGHT, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 6, smartSubsample: true, alphaQuality: quality })
    .toFile(output);

  const { size } = await fs.stat(output);
  console.log(`✓ partner-logo-${id}.webp (${size} bytes, q${quality})`);
}

const entries = await fs.readdir(SRC_DIR);
await fs.mkdir(OUT_DIR, { recursive: true });

for (const entry of entries.sort()) {
  await optimizeOne(entry);
}
