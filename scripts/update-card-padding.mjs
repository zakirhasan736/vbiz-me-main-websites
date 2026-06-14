import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsDir = path.join(__dirname, '../src/components/views');
const CARD = 'py-6 px-4 md:py-8 md:px-6';

const replacements = [
  [/p-12 md:p-16/g, CARD],
  [/p-10 md:p-14/g, CARD],
  [/p-8 md:p-12/g, CARD],
  [/p-8 md:p-10/g, CARD],
  [/p-8 sm:p-12/g, CARD],
  [/p-6 sm:p-8 pb-0/g, `${CARD} pb-0`],
  [/p-6 sm:p-8/g, CARD],
  [/p-6 md:p-8/g, CARD],
  [/p-10 pb-8/g, CARD],
  [/p-10 pt-8 pb-6/g, CARD],
  [/p-10 pt-12/g, CARD],
  [/className="p-12 rounded/g, `className="${CARD} rounded`],
  [/className={`p-12 rounded/g, `className={\`${CARD} rounded`],
  [/\bp-12\b/g, CARD],
  [/\bp-10\b/g, CARD],
  [/\bp-8\b/g, CARD],
  [/\bp-7\b/g, CARD],
  [/\bp-6\b/g, CARD],
];

const skipLine = (line) =>
  /fixed inset-0|justify-center p-4 bg-black|items-center justify-center p-4|p-4 rounded-xl border text-left text-xs|p-4 rounded-2xl border text-sm|gap-3 p-2 bg-|p-2 md:p-4 rounded-3xl|py-6 px-4 md:py-8 md:px-6/.test(
    line,
  );

const files = fs.readdirSync(viewsDir).filter((f) => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(viewsDir, file);
  const original = fs.readFileSync(filePath, 'utf8');
  const lines = original.split('\n');
  let changed = false;

  const updated = lines
    .map((line) => {
      if (skipLine(line)) return line;
      let next = line;
      for (const [pattern, replacement] of replacements) {
        next = next.replace(pattern, replacement);
      }
      if (next !== line) changed = true;
      return next;
    })
    .join('\n');

  if (changed) {
    fs.writeFileSync(filePath, updated);
    console.log('Updated:', file);
  }
}
