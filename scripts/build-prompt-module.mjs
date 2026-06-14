import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const bodyPath = path.join(root, 'src/lib/_master-prompt-body.txt');
const outPath = path.join(root, 'src/lib/live-agent-prompt.ts');

const promptBody = fs.readFileSync(bodyPath, 'utf8');

const cardDataPlaceholder = '${JSON.stringify(cardData)}';
const platformPlaceholder = '${JSON.stringify(vbizPlatformData)}';

if (!promptBody.includes(cardDataPlaceholder)) {
  throw new Error('Missing cardData placeholder in prompt body');
}
if (!promptBody.includes(platformPlaceholder)) {
  throw new Error('Missing vbizPlatformData placeholder in prompt body');
}

const [beforeCard, afterCard] = promptBody.split(cardDataPlaceholder);
const [middle, afterPlatform] = afterCard.split(platformPlaceholder);

const ts = `export interface LiveAgentCardData {
  ownerName: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  [key: string]: unknown;
}

export const DEFAULT_CARD_DATA: LiveAgentCardData = {
  ownerName: 'Michaelangelo Casanova',
  title: 'CEO & Founder',
  company: 'vBiz Me',
  email: 'mcasanova@vbizme.com',
  phone: '(860) 770-9893',
  website: 'https://vbizme.com',
  location: 'New Britain, CT',
};

export const VBIZ_PLATFORM_DATA = {
  plans: [
    {
      name: 'Essential Plan',
      price: '$9.95 Monthly',
      contract: '2-Year Contract',
      setup: '$10 Setup',
      includes: [
        '5 Reviews',
        '5 Service Listings',
        '5 FAQs',
        '4 Photos',
        '2 Videos',
        'Basic Content Edits',
        'Digital QR code',
      ],
    },
    {
      name: 'Professional vCard Plan',
      price: '$8.00 Monthly',
      contract: '1-Year Contract',
      setup: '$129 Setup',
      includes: [
        'Unlimited Content Edits',
        'Custom Golden Branding',
        'Advanced Performance Analytics',
        '10 Photos',
        '5 Videos',
        '7 Professional Reviews',
        '7 FAQs',
        '7 Service Listings',
        'Priority Customer Support',
      ],
    },
    {
      name: 'Corporate vCard Plan',
      price: 'Contact Sales',
      subtitle: 'Built for organizations needing customized features',
      includes: [
        'Dedicated Account Manager',
        'Custom Brand Package',
        'Unlimited Media Uploads',
        'Team Management Dashboard',
        'Bulk User Onboarding',
        'Advanced integration options',
      ],
    },
  ],
};

export const LIVE_AGENT_GREETING_TURN = {
  turns: [
    {
      role: 'user' as const,
      parts: [
        {
          text: 'The user has just opened the site...',
        },
      ],
    },
  ],
  turnComplete: true,
};

const PROMPT_PART_1 = ${JSON.stringify(beforeCard)};
const PROMPT_PART_2 = ${JSON.stringify(middle)};
const PROMPT_PART_3 = ${JSON.stringify(afterPlatform)};

export function buildLiveAgentSystemPrompt(
  cardData: LiveAgentCardData = DEFAULT_CARD_DATA,
  vbizPlatformData: typeof VBIZ_PLATFORM_DATA = VBIZ_PLATFORM_DATA,
): string {
  return (
    PROMPT_PART_1 +
    JSON.stringify(cardData) +
    PROMPT_PART_2 +
    JSON.stringify(vbizPlatformData) +
    PROMPT_PART_3
  );
}
`;

fs.writeFileSync(outPath, ts, 'utf8');
console.log('Wrote', outPath, 'length', ts.length);
