export type LegalPageVariant = 'terms' | 'privacy';

export type LegalHighlight = {
  label: string;
  value: string;
};

/** A paragraph or list item; `lead` renders as a bold run-in heading (e.g. "Initial term."). */
export type LegalParagraph = string | { lead: string; text: string };

export type LegalSection = {
  id: string;
  title: string;
  body: LegalParagraph[];
  bullets?: LegalParagraph[];
  /** Paragraphs shown after the bullet list. */
  afterBullets?: LegalParagraph[];
};

export type LegalPageContent = {
  variant: LegalPageVariant;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  highlights: LegalHighlight[];
  sections: LegalSection[];
};

export const LEGAL_LAST_UPDATED = 'October 7, 2026';

export const TERMS_LAST_UPDATED = 'October 12, 2026';

export const termsPageContent: LegalPageContent = {
  variant: 'terms',
  eyebrow: 'Legal Agreement',
  title: 'vBiz Me Terms and Conditions',
  description:
    'These Terms and Conditions govern your use of the websites, public vCards, Backoffice Administration dashboard, and related services operated by vBiz Me, LLC.',
  lastUpdated: TERMS_LAST_UPDATED,
  highlights: [
    {
      label: 'Applies to',
      value: 'Websites, public vCards, the Backoffice Administration dashboard, AI features, integrations, and related services.',
    },
    {
      label: 'Paid plans',
      value: 'Paid vCard plans have an initial 12-month commitment. Your order shows pricing, schedule, and renewal terms.',
    },
    {
      label: 'Questions',
      value: 'Contact vBiz Me, LLC at mcasanova@vbizme.com for billing, cancellation, or legal questions.',
    },
  ],
  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of These Terms',
      body: [
        'These Terms and Conditions govern your use of the websites, public vCards, Backoffice Administration dashboard, and related services operated by vBiz Me, LLC (“vBiz Me,” “we,” “us,” or “our”). Together, these are the “Services.”',
        'By accessing or using the Services, you agree to these Terms. Our Privacy Policy explains how we collect, use, and share personal information. Paid customers accept the applicable pricing, payment schedule, and service commitment when they affirmatively agree to the checkout terms, order form, or written service agreement.',
        'If you act for a business, team, or other organization, you confirm that you have authority to bind that organization. The person or organization identified as the customer on the order is responsible for the payment and other obligations under that order.',
      ],
    },
    {
      id: 'services',
      title: '2. Our Services',
      body: [
        'vBiz Me provides video-first digital business cards and back-office tools that help professionals and organizations create, publish, share, manage, and measure interactive vCards. Depending on your plan, the Services may include public profile pages, QR code and NFC sharing, media hosting, contact saving, lead capture, scheduling, analytics, notifications, support tickets, templates, AI-assisted content creation, and integrations such as Canva and social login.',
        'Your order identifies the features, limits, and services included in your plan.',
      ],
    },
    {
      id: 'accounts',
      title: '3. Accounts, Roles, and Security',
      body: [
        'You agree to provide accurate account information and keep it current. You are responsible for protecting your login credentials and for activity carried out by you and the users you authorize. Notify us promptly if you suspect unauthorized access to your account, connected login, or administrator credentials.',
        'Corporate owners, administrators, staff members, and card owners may use the Services only for authorized business purposes and within their assigned permissions. Organizations are responsible for managing user access and promptly removing access when a user is no longer authorized.',
      ],
    },
    {
      id: 'content',
      title: '4. Your vCard Content',
      body: [
        'You retain ownership of the content you provide or authorize us to publish. This may include profile information, names, logos, photographs, videos, audio, service descriptions, portfolios, reviews, menus, contact details, social links, and documents.',
        'You grant vBiz Me a worldwide, nonexclusive, royalty-free license to host, store, copy, format, display, publish, and transmit that content as reasonably needed to provide, secure, improve, and support the Services. We may allow service providers acting on our behalf to use the content for those purposes.',
        'You confirm that you have the rights and permissions needed to provide and publish the content. This includes permission to use third-party trademarks, testimonials, artwork, music, and the names, voices, images, and likenesses of other people.',
      ],
    },
    {
      id: 'marketing-permission',
      title: '5. Permission to Feature Your Business in vBiz Me Marketing',
      body: [
        'If you separately approve marketing use at checkout or in writing, you grant vBiz Me a worldwide, nonexclusive, royalty-free license to feature your approved public-facing materials to promote vBiz Me and demonstrate how its vCards work. The permission may cover your name, business name, logo, trademarks, professional headshot, likeness, voice, vCard link, public vCard screenshots, photos, videos, and other materials you approve.',
        'vBiz Me may use those materials on its websites, social media, emails, presentations, sales demonstrations, event materials, and paid advertisements. We may crop, resize, caption, or excerpt materials for the format while preserving their meaning. We will obtain separate approval before publishing a testimonial or a case study that attributes specific business results to you. This permission excludes private leads, private dashboard information, and customer contact lists.',
        'You confirm that you can authorize the approved use and have obtained any necessary third-party permissions. You may withdraw permission for future use by emailing mcasanova@vbizme.com. After receiving your request, we will stop new uses and remove materials from channels we control within a reasonable time. Previously distributed print materials and copies independently shared by others may remain in circulation.',
      ],
    },
    {
      id: 'public-cards',
      title: '6. Public vCards and Lead Handling',
      body: [
        'Published vCards may be accessible through a public link, QR code, NFC tap, search engine, directory, or shared profile. Visitors and third parties may copy, share, or index information you publish. Publish only information you intend to make public.',
        'When visitors save a contact, send a message, submit lead information, request a meeting, or otherwise interact with a vCard, the relevant information or activity may be shared with the card owner, corporate account owner, or authorized administrators, as applicable.',
        'If you collect, export, or use visitor information, you are responsible for providing the notices, obtaining the permissions, honoring opt-outs, safeguarding data, and meeting the privacy and marketing requirements that apply to your business. A visitor’s submission through a vCard authorizes only the uses allowed by applicable law and the notice or consent presented to that visitor.',
      ],
    },
    {
      id: 'ai',
      title: '7. AI-Assisted Features',
      body: [
        'AI-assisted features may use information you supply to draft profile copy, service descriptions, FAQs, portfolio entries, and other content. AI output can contain errors or unsuitable material. You are responsible for reviewing its accuracy, verifying rights and claims, and approving it before publication or use.',
        'Submit confidential, regulated, or third-party information only if you have permission to do so and its processing through the feature is lawful.',
      ],
    },
    {
      id: 'integrations',
      title: '8. Third-Party Services and Integrations',
      body: [
        'The Services may connect to third-party payment processors, social login providers, Canva, analytics providers, hosting providers, and communication tools. Their terms, privacy policies, and permissions apply to your use of those services.',
        'When you enable an integration, you authorize us to exchange the information reasonably needed to perform the action you request, such as retrieving designs, importing exported media, or confirming connection status. Third-party providers control the availability and operation of their own services.',
      ],
    },
    {
      id: 'payments',
      title: '9. Pricing, Payments, and the 12-Month Commitment',
      body: [
        {
          lead: 'Initial term.',
          text: 'Paid vBiz Me vCard plans have an initial commitment of 12 consecutive months unless an order signed or accepted by both parties expressly provides otherwise. The term starts on the date disclosed in your order. If you pay monthly, each payment is an installment of that 12-month commitment.',
        },
        {
          lead: 'Pricing and authorization.',
          text: 'Your order shows your billing amount and frequency, one-time fees, applicable taxes, and any discounts. If you receive a conditional discount, your order will show the standard price, the discounted price, and the amount subject to repayment if you cancel early. By affirmatively authorizing recurring payments, you authorize vBiz Me and its payment processor to charge your selected payment method according to the disclosed schedule.',
        },
        {
          lead: 'Refunds.',
          text: 'Fees already paid are nonrefundable except as stated in your order, expressly provided in these Terms, or required by law.',
        },
        {
          lead: 'Renewal.',
          text: 'Your order states whether service ends after the initial term, continues month to month, or renews for another fixed term. Automatic renewal applies only if its terms are disclosed and you affirmatively consent where required. We will provide any required notices and cancellation options. A request to stop renewal at the end of the current term does not trigger an early cancellation charge.',
        },
      ],
    },
    {
      id: 'cancellation',
      title: '10. Cancellation and Repayment of Discounts',
      body: [
        {
          lead: 'How to cancel.',
          text: 'You may request cancellation by emailing mcasanova@vbizme.com, through an available account cancellation option, or by any additional method required by law. Identify the account and tell us whether you want service to end early or continue through the end of the term without renewal. We will confirm the effective date and provide an itemized statement of amounts due, if any.',
        },
        {
          lead: 'Ending service before the initial 12 months are up.',
          text: 'To the extent permitted by law, if you choose to end service before the end of the initial term, you are responsible for:',
        },
      ],
      bullets: [
        {
          lead: 'The remaining subscription installments.',
          text: 'This is the unpaid balance of the agreed subscription price for the initial 12-month term, less any payments or credits already applied to that term.',
        },
        {
          lead: 'Any conditional vCard discount disclosed in your order.',
          text: 'For a discounted one-time vCard setup or purchase fee, this is the difference between the standard fee disclosed when you ordered and the discounted fee you agreed to pay. Any unpaid portion of the agreed discounted fee may also be due. A recurring discount is subject to repayment only if your order expressly identifies the amount and explains how it is calculated.',
        },
      ],
      afterBullets: [
        {
          lead: 'Example.',
          text: 'If your standard setup fee was $129, you paid $50, and you cancel with five $8 monthly installments remaining, the early cancellation balance is $119 before any applicable taxes or credits. That is $40 in remaining installments plus the $79 setup discount.',
        },
        'We will invoice the balance and credit amounts already paid. We may charge the payment method on file for that balance only when you have specifically authorized that charge and applicable law permits it. Stopping or revoking automatic payments does not remove amounts lawfully owed.',
        {
          lead: 'Exceptions.',
          text: 'The remaining-term charge and discount repayment do not apply if vBiz Me ends your service without cause, if you cancel because vBiz Me materially breaches the agreement and fails to correct the breach within 30 days after receiving written notice, or if applicable law gives you the right to cancel without those charges. Any refund rights under applicable law or your order still apply.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      title: '11. Acceptable Use',
      body: ['You agree to use the Services lawfully and within the access permissions granted to you. You may not:'],
      bullets: [
        'Publish deceptive, defamatory, harassing, hateful, unlawfully explicit, or otherwise unlawful content.',
        'Impersonate a person or organization, misrepresent your qualifications, or upload material you lack permission to use.',
        'Send spam, phishing messages, or communications that violate applicable consent or opt-out requirements.',
        'Upload malware, access accounts or systems without authorization, bypass security controls, interfere with platform operations, or scrape data at scale without permission.',
        'Use the Services to violate intellectual property, privacy, publicity, contractual, or other legal rights.',
      ],
    },
    {
      id: 'platform-rights',
      title: '12. vBiz Me Platform Rights',
      body: [
        'vBiz Me and its licensors retain ownership of the platform, including its software, code, dashboard, templates, designs, branding, workflows, and documentation. During your active service term, you may access and use the Services as permitted by these Terms and your order.',
      ],
    },
    {
      id: 'termination',
      title: '13. Availability, Suspension, and Termination',
      body: [
        'We may update features and make changes to keep the Services secure and operational. Service availability may depend on internet connectivity, compatible browsers and devices, third-party providers, and connected accounts.',
        'We may suspend or terminate access for nonpayment, material violations of these Terms, fraud, abuse, unauthorized access, or significant legal or security risks. When reasonably practicable, we will give notice and an opportunity to resolve the issue. We may act immediately when necessary to protect the Services or the people who use them.',
        'When service ends, we may disable public vCards, dashboard access, and related features. We may retain records as described in our Privacy Policy or as required for legal, billing, fraud prevention, security, or backup purposes. Payment obligations already incurred and provisions intended to operate after termination remain effective, subject to applicable law.',
      ],
    },
    {
      id: 'disclaimers',
      title: '14. Warranties and Limitation of Liability',
      body: [
        'To the fullest extent permitted by law, the Services are provided “as is” and “as available.” vBiz Me disclaims implied warranties of merchantability, fitness for a particular purpose, and noninfringement. We do not guarantee uninterrupted or error-free service, search indexing or ranking, lead volume, conversions, or business results.',
        'To the fullest extent permitted by law, vBiz Me is not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, revenue, opportunities, data, or goodwill. vBiz Me’s total liability arising out of or related to the Services will not exceed the fees you paid to vBiz Me for the affected Services during the 12 months before the event giving rise to the claim. These limits apply only where permitted by law and do not limit liability that the law makes nonwaivable.',
      ],
    },
    {
      id: 'third-party-claims',
      title: '15. Responsibility for Third-Party Claims',
      body: [
        'If you use the Services on behalf of a business, that business agrees, to the extent permitted by law, to indemnify vBiz Me for third-party claims and reasonable defense costs arising from content you supplied without the necessary rights, your unlawful handling of visitor information, or your material violation of the Acceptable Use section. This obligation applies only to the extent the claim arises from your conduct.',
      ],
    },
    {
      id: 'sms-terms',
      title: '16. SMS Terms',
      body: [
        'When you opt in, you agree to receive account-related text messages from vBiz Me, LLC at the mobile number you provide. Messages may include account notices, appointment confirmations and reminders, scheduling alerts, profile activity, saved-contact alerts, and related service communications.',
        'Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance. You can also reach us at mcasanova@vbizme.com. Consent to receive text messages is voluntary and is not a condition of purchase. Any promotional text messaging program will use a separate opt-in.',
      ],
    },
    {
      id: 'electronic-acceptance',
      title: '17. Electronic Acceptance, Notices, and Agreement Updates',
      body: [
        'When you check an acceptance box or otherwise affirmatively accept an order electronically, you agree that your action serves as your electronic signature for that transaction. We may send agreements, confirmations, invoices, and account notices electronically, subject to any additional requirements under applicable law. Keep your account email current.',
        'These Terms and your accepted order or signed service agreement form the agreement for the Services. If an accepted order or signed agreement expressly conflicts with these Terms, that document controls for the affected order. If a provision is found unenforceable, the remaining provisions continue to apply. A delay in enforcing a provision does not waive the right to enforce it later.',
        'We may revise these Terms and will post the date of the latest revision. We will provide notice of material changes and obtain fresh consent where required. Changes to the price, minimum term, or early cancellation obligations of an existing order require your agreement.',
      ],
    },
    {
      id: 'law',
      title: '18. Governing Law and Contact Information',
      body: [
        'Connecticut law governs these Terms, together with applicable federal law, without regard to conflict-of-law rules. Any court proceeding relating to these Terms may be brought in a state or federal court with jurisdiction in Connecticut, subject to mandatory rights under applicable law.',
        'vBiz Me, LLC',
      ],
    },
  ],
};

export const privacyPolicyContent: LegalPageContent = {
  variant: 'privacy',
  eyebrow: 'Privacy Notice',
  title: 'Privacy Policy',
  description:
    'This Privacy Policy explains how vBiz Me LLC collects, uses, shares, and protects information across our website, public vCards, and vCard Backoffice Administration tools.',
  lastUpdated: LEGAL_LAST_UPDATED,
  highlights: [
    {
      label: 'Data covered',
      value: 'Account details, vCard content, visitor leads, analytics, support requests, billing metadata, and integrations.',
    },
    {
      label: 'Primary use',
      value: 'We use information to operate vCards, administer accounts, process leads, support users, secure the platform, and improve features.',
    },
    {
      label: 'Your choices',
      value: 'You can update profile content, manage notifications, disconnect integrations, or contact us about privacy requests.',
    },
  ],
  sections: [
    {
      id: 'scope',
      title: '1. Scope',
      body: [
        'vBiz Me LLC ("vBiz Me," "we," "us," or "our") operates the websites, public vCards, and administration tools described in this Policy.',
        'This Policy applies to vBiz Me LLC websites, public vCards, QR and NFC experiences, account dashboards, the vCard Backoffice Administration platform, support channels, AI-assisted tools, text messaging, and related services that link to this Policy.',
        'This Policy does not apply to third-party websites, apps, or services that we do not control, even when they are linked from a vCard or integrated with the Services.',
      ],
    },
    {
      id: 'information-we-collect',
      title: '2. Information We Collect',
      body: [
        'We collect information that users, administrators, card owners, corporate teams, and visitors provide directly, information generated by use of the Services, and information from connected third-party services.',
        'The information we collect depends on how you use vBiz Me LLC.',
      ],
      bullets: [
        'Account and login information, such as name, email address, password credentials, verification status, role, company name, OAuth provider, account status, and administrator permissions.',
        'vCard profile content, such as business name, title, profession, email, phone, website, address, biography, social links, images, videos, services, portfolios, posts, reviews, FAQs, menus, template choices, colors, and display settings.',
        'Lead and visitor information, such as contact save details, guest names, emails, phone numbers, messages, notes, meeting requests, social click events, profile views, QR activity, IP address, user agent, and related metadata.',
        'Billing and subscription information, such as package, subscription, transaction, invoice, payment provider, card type, last four digits, trial, renewal, and status metadata. Full payment card processing is handled by payment providers.',
        'Integration information, such as Canva connection status, encrypted OAuth tokens, design metadata, imported assets, Google or Facebook social login data, and data needed to operate connected services.',
        'Support and communications information, such as contact form messages, support tickets, announcements, replies, ratings, email delivery details, and other messages with vBiz Me LLC.',
        'SMS information, such as the mobile number you provide, your opt-in or opt-out status, and the account-related text messages we send when you consent.',
        'Device, usage, and analytics information, such as browser type, device type, pages visited, referrers, approximate location from network data, cookies, local storage, performance data, and interaction logs.',
      ],
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Information',
      body: ['We use information to operate, secure, support, and improve the Services, including to:'],
      bullets: [
        'Create accounts, authenticate users, verify email addresses, manage roles, and protect dashboards.',
        'Create, publish, customize, host, preview, and share public vCards and related QR or NFC experiences.',
        'Capture, route, export, and organize leads, contact saves, notes, meetings, support requests, and visitor interactions.',
        'Provide analytics, activity history, engagement reporting, dashboard metrics, and administrative oversight.',
        'Process subscriptions, packages, transactions, renewals, support, refunds where applicable, and account notices.',
        'Operate AI-assisted card creation, content drafting, document extraction, live-agent, and other intelligent features requested by users.',
        'Operate integrations, including Canva imports, social login, media storage, email delivery, push notifications, and analytics.',
        'Detect, prevent, investigate, and respond to fraud, abuse, security incidents, policy violations, and technical issues.',
        'Send account-related text messages you opt in to receive, and honor STOP and HELP requests.',
        'Comply with legal obligations and enforce agreements.',
      ],
    },
    {
      id: 'public-vcards',
      title: '4. Public vCards and Visitor Submissions',
      body: [
        'A published vCard is intended to be publicly shareable. Information placed on a public vCard, including business details, images, videos, social links, services, posts, reviews, and contact options, may be viewed by anyone with access to the link, QR code, NFC tap, or public profile route.',
        'When a visitor submits a contact form, saves a contact, leaves a note, requests a meeting, follows a card, enables notifications, or otherwise interacts with a public vCard, that information may be shared with the relevant card owner, corporate owner, or authorized administrator.',
      ],
    },
    {
      id: 'ai-processing',
      title: '5. AI Processing',
      body: [
        'When you use AI-assisted features, we may process the text, files, images, URLs, business descriptions, and existing profile data you provide to generate drafts, summaries, suggestions, or card content.',
        'AI features may rely on third-party AI service providers. We use these providers to perform requested processing and do not intend AI output to replace professional review, legal advice, financial advice, medical advice, or your own judgment.',
      ],
    },
    {
      id: 'cookies',
      title: '6. Cookies, Analytics, and Local Storage',
      body: [
        'We may use cookies, local storage, similar technologies, and analytics tools to keep the site functional, remember preferences, measure performance, understand traffic, protect the Services, and improve user experience.',
        'You can control cookies through your browser settings. Some features may not work correctly if cookies or local storage are disabled.',
      ],
    },
    {
      id: 'sharing',
      title: '7. How We Share Information',
      body: ['We may share information in the following ways:'],
      bullets: [
        'With card owners, corporate owners, administrators, or staff users when visitor or team activity relates to their cards, dashboards, or accounts.',
        'With service providers that host infrastructure, store media, process payments, deliver emails, provide analytics, run AI features, support security, or help operate the Services.',
        'With third-party integrations you connect or choose to use, such as Canva, Google, Facebook, payment providers, calendar tools, or external links from a vCard.',
        'When required by law, legal process, security investigation, fraud prevention, rights enforcement, or protection of vBiz Me LLC, users, visitors, or the public.',
        'In connection with a business transfer, such as a merger, acquisition, financing, reorganization, or sale of assets, subject to appropriate confidentiality protections.',
      ],
    },
    {
      id: 'sms',
      title: '8. SMS and Text Messages',
      body: [
        'If you opt in, vBiz Me LLC may send account-related text messages to the mobile number you provide. Those messages may include account notifications, appointments, scheduling alerts, contact activity, profile activity, saved-contact notifications, and other service-related communications.',
        'We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.',
        'Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe at any time. Reply HELP for assistance. Consent to receive SMS messages is not a condition of purchasing any product or service.',
      ],
    },
    {
      id: 'selling',
      title: '9. Sale, Sharing, and Targeted Advertising',
      body: [
        'We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.',
        'We do not sell personal information for money. If we use advertising, analytics, or similar partners in a way that is considered a "sale," "share," or targeted advertising under an applicable privacy law, we will provide the notices and choices required by that law.',
        'Where required, you may contact us to exercise available opt-out rights.',
      ],
    },
    {
      id: 'security',
      title: '10. Security',
      body: [
        'We use reasonable administrative, technical, and organizational safeguards designed to protect information. Examples include authenticated dashboards, role-based permissions, server-side secrets, encrypted Canva tokens, and security-focused backend controls.',
        'No website, app, database, or transmission method can be guaranteed to be completely secure. You are responsible for using strong passwords, protecting account access, and limiting administrator permissions to trusted users.',
      ],
    },
    {
      id: 'retention',
      title: '11. Data Retention',
      body: [
        'We keep information for as long as reasonably necessary to provide the Services, maintain accounts, support public vCards, process payments, resolve disputes, comply with legal obligations, prevent abuse, keep records, and operate backups.',
        'If you ask us to delete information, we will review and respond as required by applicable law. Some information may remain in backups, logs, billing records, security records, or legal archives for a limited period.',
      ],
    },
    {
      id: 'choices',
      title: '12. Your Choices and Privacy Rights',
      body: [
        'You may update many account and vCard details directly in the dashboard. You may also unpublish or edit card content, manage notification preferences, disconnect Canva, unsubscribe from push notifications, or contact us for support.',
        'Depending on where you live, you may have rights to request access, correction, deletion, portability, restriction, or opt out of certain processing. We will respond to verified privacy requests as required by applicable law.',
      ],
    },
    {
      id: 'children',
      title: '13. Children',
      body: [
        'The Services are intended for business and professional use and are not directed to children under 13. We do not knowingly collect personal information from children under 13.',
        'If you believe a child has provided personal information to vBiz Me LLC, contact us so we can review the request.',
      ],
    },
    {
      id: 'international',
      title: '14. International Use',
      body: [
        'vBiz Me LLC is operated from the United States. If you access the Services from outside the United States, your information may be processed and stored in the United States or other locations where we or our service providers operate.',
      ],
    },
    {
      id: 'changes',
      title: '15. Changes and Contact',
      body: [
        'We may update this Privacy Policy when our Services, practices, providers, or legal obligations change. The "Last updated" date shows when this page was most recently revised.',
        'For privacy questions or requests, contact vBiz Me LLC at info@vbizme.com or +1 (860) 770-9893.',
      ],
    },
  ],
};
