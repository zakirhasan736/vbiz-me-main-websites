import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'portfolio');

/** Source filename in /public → vCard slug (output: portfolio/{slug}.webp) */
const FILES = [
  ['QR code Michaelangelo.jpeg', 'michaelangelo-casanova-2'],
  ['QR Code Weston & Hall.png', 'clinton-h-weston-jr'],
  ['QR code Walter.png', 'walter-jofre-jr'],
  ['QR Code SE3.png', 'sabor-ecuatoriano-3'],
  ['OM QR Code.png', 'o-m-autobody-supplies'],
  ['QR Code Audrey.png', 'audrey-garrison'],
  ['QR Code Cupcake.png', 'ronica-j-keith'],
  ['QR Code JDK Trucking.png', 'joseph-downer'],
  ['QR Code Jenniffer.png', 'jennifer-martinez'],
  ['QR Code Key To Life.png', 'essence-divine'],
  ['QR Code Orygn MC.png', 'michaelanglo-casanova'],
  ['QR Code Rain or Shine.png', 'richard-kincaid'],
  ['qr-code-Hector.png', 'hector-torres'],
  ['qr-code-6.png', 'wil-jacques'],
  ['quo vadis qr code.png', 'gregorz-bajek'],
];

fs.mkdirSync(outDir, { recursive: true });

for (const [sourceName, slug] of FILES) {
  const input = path.join(publicDir, sourceName);
  const output = path.join(outDir, `${slug}.webp`);

  if (!fs.existsSync(input)) {
    console.warn(`Skip missing: ${sourceName}`);
    continue;
  }

  await sharp(input)
    .webp({ quality: 88, effort: 4 })
    .toFile(output);

  console.log(`✓ ${slug}.webp`);
}
