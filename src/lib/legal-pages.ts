export type LegalPageVariant = 'terms' | 'privacy';

export type LegalHighlight = {
  label: string;
  value: string;
};

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
  bullets?: string[];
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

export const LEGAL_LAST_UPDATED = 'August 12, 2026';

export const termsPageContent: LegalPageContent = {
  variant: 'terms',
  eyebrow: 'Legal Agreement',
  title: 'Terms and Conditions',
  description:
    'These Terms explain how customers, teams, administrators, and visitors may use vBiz Me, public vCards, and the vCard Backoffice Administration platform.',
  lastUpdated: LEGAL_LAST_UPDATED,
  highlights: [
    {
      label: 'Applies to',
      value: 'Landing pages, public vCards, dashboards, admin tools, AI features, support, and integrations.',
    },
    {
      label: 'Account use',
      value: 'You are responsible for authorized users, accurate profile content, and secure account access.',
    },
    {
      label: 'Questions',
      value: 'Contact vBiz Me at info@vbizme.com for billing, account, or legal questions.',
    },
  ],
  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of These Terms',
      body: [
        'By visiting vbizme.com, using a vBiz Me public vCard, creating an account, accessing the vCard Backoffice Administration dashboard, or using any related feature, you agree to these Terms and our Privacy Policy.',
        'If you use the Services on behalf of a company, team, or other organization, you confirm that you have authority to bind that organization to these Terms.',
      ],
    },
    {
      id: 'services',
      title: '2. Our Services',
      body: [
        'vBiz Me provides digital business card and backoffice tools that help professionals and organizations create, publish, share, manage, and measure interactive vCards.',
        'The Services may include profile pages, QR code sharing, media hosting, contact save and lead capture tools, meetings, analytics, support tickets, notifications, templates, AI-assisted card creation, and third-party integrations such as Canva and social login providers.',
      ],
    },
    {
      id: 'accounts',
      title: '3. Accounts, Roles, and Security',
      body: [
        'You must provide accurate account information and keep it current. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.',
        'Corporate owners, administrators, super administrators, staff members, and card owners must use their access only for legitimate business purposes and only within the permissions assigned to them.',
        'You must tell us promptly if you believe your account, password, OAuth login, or administrator access has been compromised.',
      ],
    },
    {
      id: 'content',
      title: '4. Your vCard Content',
      body: [
        'You are responsible for the profile information, images, videos, services, portfolios, posts, reviews, menus, social links, contact details, documents, and other content you upload, import, publish, or ask us to create for you.',
        'You keep ownership of your content. You grant vBiz Me a worldwide, non-exclusive, royalty-free license to host, store, reproduce, adapt for display, transmit, publish, and use your content as needed to provide, secure, improve, and support the Services.',
        'You represent that you have all rights and permissions needed for the content you provide, including rights for names, images, likenesses, testimonials, logos, trademarks, audio, video, and third-party materials.',
      ],
    },
    {
      id: 'public-cards',
      title: '5. Public vCards and Lead Handling',
      body: [
        'Published vCards may be visible to anyone with the public link, QR code, NFC tap, or shared profile route. Information that you place on a public vCard may be indexed, copied, or shared by visitors.',
        'When visitors save a contact, leave a message, submit lead details, click social links, request meetings, or interact with a vCard, that activity may be routed to the relevant card owner, corporate owner, or authorized administrator.',
        'If you collect or use visitor leads through vBiz Me, you are responsible for honoring applicable privacy, marketing, consent, recordkeeping, and communication laws that apply to your own business.',
      ],
    },
    {
      id: 'ai',
      title: '6. AI-Assisted Features',
      body: [
        'The Services may offer AI-assisted tools that analyze user-provided text, websites, files, images, or business descriptions to draft vCard sections, content ideas, FAQs, services, portfolio entries, or other profile material.',
        'AI output may be incomplete, inaccurate, or unsuitable for your industry. You are responsible for reviewing and approving AI-generated content before publishing or relying on it.',
        'Do not submit confidential, regulated, or third-party information to AI features unless you have permission and are comfortable with that information being processed to provide the requested feature.',
      ],
    },
    {
      id: 'integrations',
      title: '7. Third-Party Integrations',
      body: [
        'Some features connect to third-party services, including payment processors, Google or Facebook social login, Canva, analytics providers, email services, hosting providers, and communication tools.',
        'Your use of third-party services is also governed by their own terms, privacy policies, permissions, and account settings. vBiz Me is not responsible for third-party services that we do not control.',
        'If you connect Canva or another integration, you authorize us to exchange data with that service as needed to provide the requested integration, such as listing designs, importing exported media, or confirming connection status.',
      ],
    },
    {
      id: 'payments',
      title: '8. Plans, Payments, and Subscriptions',
      body: [
        'Paid plans, setup fees, recurring charges, trials, renewals, taxes, limits, and included features are described on the pricing page, checkout flow, invoice, order form, or written agreement that applies to your account.',
        'Payments may be processed by third-party payment providers. You authorize vBiz Me and its payment providers to charge the payment method associated with your account for applicable fees.',
        'Unless a separate written agreement says otherwise, fees are non-refundable except where required by law or expressly stated in the applicable checkout or order terms.',
      ],
    },
    {
      id: 'acceptable-use',
      title: '9. Acceptable Use',
      body: ['You agree not to use the Services to:'],
      bullets: [
        'Violate any law, regulation, contract, privacy right, publicity right, intellectual property right, or platform rule.',
        'Publish false, misleading, deceptive, defamatory, hateful, harassing, explicit, or harmful content.',
        'Upload malware, attempt unauthorized access, interfere with service operations, scrape data at scale, or bypass security controls.',
        'Send spam, unsolicited marketing, phishing messages, or communications that do not follow applicable consent requirements.',
        'Impersonate another person or organization, misrepresent qualifications, or publish content you are not authorized to use.',
      ],
    },
    {
      id: 'platform-rights',
      title: '10. vBiz Me Platform Rights',
      body: [
        'The Services, software, dashboard interfaces, templates, designs, logos, code, workflows, documentation, and platform branding are owned by vBiz Me or its licensors.',
        'These Terms do not transfer ownership of the platform to you. You may use the Services only as allowed by these Terms, your plan, and any written agreement with vBiz Me.',
      ],
    },
    {
      id: 'availability',
      title: '11. Service Changes and Availability',
      body: [
        'We may update, improve, suspend, restrict, or discontinue features from time to time. We aim to keep the Services reliable, but we do not guarantee uninterrupted access or error-free operation.',
        'Certain features may depend on internet access, browser support, mobile device capabilities, third-party providers, hosting services, payment processors, or connected accounts.',
      ],
    },
    {
      id: 'termination',
      title: '12. Suspension and Termination',
      body: [
        'We may suspend or terminate access if we believe an account violates these Terms, creates security or legal risk, abuses the Services, fails to pay required fees, or harms vBiz Me, users, visitors, or third parties.',
        'You may stop using the Services at any time. Some data may be retained as described in the Privacy Policy or as required for legal, billing, security, backup, fraud prevention, or legitimate business purposes.',
      ],
    },
    {
      id: 'disclaimers',
      title: '13. Disclaimers and Limitation of Liability',
      body: [
        'The Services are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, vBiz Me disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, and uninterrupted availability.',
        'To the fullest extent permitted by law, vBiz Me will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost revenue, lost business opportunities, lost data, or reputational harm.',
      ],
    },
    {
      id: 'law',
      title: '14. Governing Law and Updates',
      body: [
        'These Terms are governed by the laws of the United States and, where applicable, the State of Connecticut, without regard to conflict-of-law rules, unless another written agreement requires a different governing law.',
        'We may update these Terms when our Services, business, or legal obligations change. The "Last updated" date shows when the page was most recently revised. Continued use of the Services after an update means you accept the updated Terms.',
      ],
    },
  ],
};

export const privacyPolicyContent: LegalPageContent = {
  variant: 'privacy',
  eyebrow: 'Privacy Notice',
  title: 'Privacy Policy',
  description:
    'This Privacy Policy explains how vBiz Me collects, uses, shares, and protects information across our website, public vCards, and vCard Backoffice Administration tools.',
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
        'This Policy applies to vBiz Me websites, public vCards, QR and NFC experiences, account dashboards, the vCard Backoffice Administration platform, support channels, AI-assisted tools, and related services that link to this Policy.',
        'This Policy does not apply to third-party websites, apps, or services that we do not control, even when they are linked from a vCard or integrated with the Services.',
      ],
    },
    {
      id: 'information-we-collect',
      title: '2. Information We Collect',
      body: [
        'We collect information that users, administrators, card owners, corporate teams, and visitors provide directly, information generated by use of the Services, and information from connected third-party services.',
        'The information we collect depends on how you use vBiz Me.',
      ],
      bullets: [
        'Account and login information, such as name, email address, password credentials, verification status, role, company name, OAuth provider, account status, and administrator permissions.',
        'vCard profile content, such as business name, title, profession, email, phone, website, address, biography, social links, images, videos, services, portfolios, posts, reviews, FAQs, menus, template choices, colors, and display settings.',
        'Lead and visitor information, such as contact save details, guest names, emails, phone numbers, messages, notes, meeting requests, social click events, profile views, QR activity, IP address, user agent, and related metadata.',
        'Billing and subscription information, such as package, subscription, transaction, invoice, payment provider, card type, last four digits, trial, renewal, and status metadata. Full payment card processing is handled by payment providers.',
        'Integration information, such as Canva connection status, encrypted OAuth tokens, design metadata, imported assets, Google or Facebook social login data, and data needed to operate connected services.',
        'Support and communications information, such as contact form messages, support tickets, announcements, replies, ratings, email delivery details, and other messages with vBiz Me.',
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
        'When required by law, legal process, security investigation, fraud prevention, rights enforcement, or protection of vBiz Me, users, visitors, or the public.',
        'In connection with a business transfer, such as a merger, acquisition, financing, reorganization, or sale of assets, subject to appropriate confidentiality protections.',
      ],
    },
    {
      id: 'selling',
      title: '8. Sale, Sharing, and Targeted Advertising',
      body: [
        'We do not sell personal information for money. If we use advertising, analytics, or similar partners in a way that is considered a "sale," "share," or targeted advertising under an applicable privacy law, we will provide the notices and choices required by that law.',
        'Where required, you may contact us to exercise available opt-out rights.',
      ],
    },
    {
      id: 'security',
      title: '9. Security',
      body: [
        'We use reasonable administrative, technical, and organizational safeguards designed to protect information. Examples include authenticated dashboards, role-based permissions, server-side secrets, encrypted Canva tokens, and security-focused backend controls.',
        'No website, app, database, or transmission method can be guaranteed to be completely secure. You are responsible for using strong passwords, protecting account access, and limiting administrator permissions to trusted users.',
      ],
    },
    {
      id: 'retention',
      title: '10. Data Retention',
      body: [
        'We keep information for as long as reasonably necessary to provide the Services, maintain accounts, support public vCards, process payments, resolve disputes, comply with legal obligations, prevent abuse, keep records, and operate backups.',
        'If you ask us to delete information, we will review and respond as required by applicable law. Some information may remain in backups, logs, billing records, security records, or legal archives for a limited period.',
      ],
    },
    {
      id: 'choices',
      title: '11. Your Choices and Privacy Rights',
      body: [
        'You may update many account and vCard details directly in the dashboard. You may also unpublish or edit card content, manage notification preferences, disconnect Canva, unsubscribe from push notifications, or contact us for support.',
        'Depending on where you live, you may have rights to request access, correction, deletion, portability, restriction, or opt out of certain processing. We will respond to verified privacy requests as required by applicable law.',
      ],
    },
    {
      id: 'children',
      title: '12. Children',
      body: [
        'The Services are intended for business and professional use and are not directed to children under 13. We do not knowingly collect personal information from children under 13.',
        'If you believe a child has provided personal information to vBiz Me, contact us so we can review the request.',
      ],
    },
    {
      id: 'international',
      title: '13. International Use',
      body: [
        'vBiz Me is operated from the United States. If you access the Services from outside the United States, your information may be processed and stored in the United States or other locations where we or our service providers operate.',
      ],
    },
    {
      id: 'changes',
      title: '14. Changes and Contact',
      body: [
        'We may update this Privacy Policy when our Services, practices, providers, or legal obligations change. The "Last updated" date shows when this page was most recently revised.',
        'For privacy questions or requests, contact vBiz Me at info@vbizme.com or +1 (860) 770-9893.',
      ],
    },
  ],
};
