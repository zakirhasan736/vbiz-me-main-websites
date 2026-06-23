'use client';

import { useState } from 'react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import {
  RevealText,
  RevealParagraph,
  RevealGridItem,
  SectionRevealRoot,
  SectionRevealHeader,
  SectionRevealStaggerList,
  GRID_REVEAL_STAGGER,
} from '@/components/animations/reveal';

const CORE_FEATURES = [
  'AI Agent Assistance',
  'Card Auto Data Filling',
  'Dynamic Intro Videos',
  'Background Music',
  'Customizable Design',
  'Real-Time Updates',
  'QR Code Sharing',
  'Direct Link Sharing',
  'Save to Contacts',
  'Engagement Analytics',
] as const;

const ACCORDION_ITEMS = [
  {
    title: 'AI Agent Assistance (Your Digital Twin) 🌟 NEW',
    content:
      'Gain an automated business twin! Every smart vCard now integrates optional custom AI Agent Assistance. This smart trained helper answers visitor inquiries, details your services, captures potential lead contact information, and coordinates scheduler meetings 24/7.',
  },
  {
    title: 'Instant AI Card Creation & Auto-Filling ⚡ NEW',
    content:
      'Say goodbye to tedious copy-pasting. Simply slide in your resume, share your existing LinkedIn URL, or snap/upload a legacy image card. Our semantic parser instantly auto-extracts your coordinates, contacts, images, and color guidelines to pre-build a ready-to-publish virtual page in seconds.',
  },
  {
    title: 'Unique Intro Videos',
    content:
      'vBiz Me is the only company that offers dynamic intro videos featuring your company logos. These captivating intros are designed to create a memorable first impression, setting your virtual business card apart from the competition.',
  },
  {
    title: 'Customizable vCards',
    content:
      'Personalize every aspect of your vCard from colors, fonts, to layout, ensuring it perfectly matches your brand identity.',
  },
  {
    title: 'Professional and Engaging Designs',
    content:
      'Choose from a wide variety of expertly crafted templates that give you a professional edge when connecting.',
  },
  {
    title: 'Seamless Integration',
    content:
      'Our vCards integrate effortlessly with top CRMs, email clients, and analytics tools to keep your networking flowing.',
  },
  {
    title: 'Exceptional Support and Service',
    content:
      'Our dedicated support team is available around the clock to help you with any setup or customization needs.',
  },
] as const;

export function OurVCardsWhyChoose() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  return (
    <section className="site-section site-section--reveal bg-neutral-900/20 relative">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-gold/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-emerald-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionRevealRoot viewport="content">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            <div className="lg:w-1/3 text-left">
              <SectionRevealHeader>
                <RevealText
                  text="Core Features"
                  tag="h2"
                  className="text-3xl font-medium text-white mb-10 tracking-tight text-left"
                  centered={false}
                  direction="up"
                  distance="MD"
                  delay={0}
                />
              </SectionRevealHeader>

              <SectionRevealStaggerList
                className="space-y-3.5"
                stagger={GRID_REVEAL_STAGGER.LIST}
                delayChildren={GRID_REVEAL_STAGGER.DELAY_CHILDREN}
              >
                {CORE_FEATURES.map((feature) => (
                  <RevealGridItem key={feature} direction="up" distance={150} scaleOnUp={false}>
                    <div className="flex items-center gap-4 group text-left">
                      <div className="w-7 h-7 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/25 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.08)]">
                        <Check size={13} className="text-brand-gold" strokeWidth={3} />
                      </div>
                      <span className="font-light tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  </RevealGridItem>
                ))}
              </SectionRevealStaggerList>
            </div>

            <div className="lg:w-2/3 text-left">
              <SectionRevealHeader>
                <RevealText
                  text="Why Choose Us?"
                  tag="h2"
                  className="text-3xl font-medium text-white mb-6 tracking-tight text-left"
                  centered={false}
                  direction="up"
                  distance="MD"
                  delay={0}
                />
                <RevealParagraph
                  text="Choose vBiz Me for unique intro videos with your logo, customizable vCards, professional designs, seamless integration, and exceptional customer support to elevate your networking."
                  className="text-neutral-400 mb-10 font-light leading-relaxed max-w-2xl text-left"
                  centered={false}
                  distance="MD"
                  delay={0.08}
                />
              </SectionRevealHeader>

              <SectionRevealStaggerList
                className="space-y-3"
                stagger={GRID_REVEAL_STAGGER.LIST}
                delayChildren={GRID_REVEAL_STAGGER.DELAY_CHILDREN}
              >
                {ACCORDION_ITEMS.map((item, index) => {
                  const isOpen = activeAccordion === index;

                  return (
                    <RevealGridItem
                      key={item.title}
                      direction="right"
                      distance="MD"
                      scaleOnUp={false}
                    >
                      <div
                        className={`relative rounded-2xl overflow-hidden transition-shadow duration-500 ${
                          isOpen
                            ? 'border border-brand-gold/35 shadow-[0_0_40px_rgba(212,175,55,0.12)]'
                            : 'border border-white/5 hover:border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
                        }`}
                      >
                        {isOpen && (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.08] via-transparent to-emerald-500/[0.04] pointer-events-none" />
                        )}

                        <button
                          type="button"
                          onClick={() => setActiveAccordion(isOpen ? null : index)}
                          className="relative w-full flex items-center justify-between gap-4 py-5 px-5 md:py-6 md:px-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 rounded-2xl bg-[#283630]/90 backdrop-blur-sm cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-start gap-3 min-w-0">
                            {isOpen && (
                              <span className="shrink-0 mt-0.5 text-brand-gold">
                                <Sparkles size={16} />
                              </span>
                            )}
                            <span
                              className={`font-medium tracking-wide leading-snug transition-colors duration-300 ${
                                isOpen ? 'text-brand-gold' : 'text-white'
                              }`}
                            >
                              {item.title}
                            </span>
                          </span>

                          <div
                            className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                              isOpen
                                ? 'border-brand-gold/40 bg-brand-gold/10 text-brand-gold rotate-180 scale-105'
                                : 'border-white/10 bg-white/5 text-neutral-400'
                            }`}
                          >
                            <ChevronDown size={18} />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="overflow-hidden accordion-panel-open">
                            <div className="px-5 md:px-7 pb-6 md:pb-7 text-neutral-400 font-light leading-relaxed border-t border-white/5 pt-4">
                              {item.content}
                            </div>
                          </div>
                        )}
                      </div>
                    </RevealGridItem>
                  );
                })}
              </SectionRevealStaggerList>
            </div>
          </div>
        </SectionRevealRoot>
      </div>
    </section>
  );
}
