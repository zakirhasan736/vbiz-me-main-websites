'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { RevealText, BannerDescription } from '@/components/animations/reveal';
import { animateCinematicSlideList } from '@/lib/cinematic-animation';
import { usePageTransition } from '@/components/providers/page-transition-context';

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

const PANEL_EASE = [0.16, 1, 0.3, 1] as const;

export function OurVCardsWhyChoose() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const { revealReady, animationKey } = usePageTransition();

  useGSAP(
    () => {
      if (!revealReady || !featuresRef.current) return;
      animateCinematicSlideList(featuresRef.current, '[data-cinematic-feature]', 'left', {
        stagger: 0.09,
      });
    },
    { scope: featuresRef, dependencies: [revealReady, animationKey] },
  );

  useGSAP(
    () => {
      if (!revealReady || !accordionRef.current) return;
      animateCinematicSlideList(accordionRef.current, '[data-cinematic-accordion]', 'right', {
        stagger: 0.09,
      });
    },
    { scope: accordionRef, dependencies: [revealReady, animationKey] },
  );

  return (
    <section ref={sectionRef} className="site-section bg-neutral-900/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-gold/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-emerald-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Core Features */}
          <div ref={featuresRef} className="lg:w-1/3 text-left">
            <RevealText
              text="Core Features"
              tag="h2"
              className="text-3xl font-medium text-white mb-10 tracking-tight text-left"
              centered={false}
            />
            <ul className="space-y-3.5 text-neutral-300 text-left">
              {CORE_FEATURES.map((feature, i) => (
                <li
                  key={feature}
                  data-cinematic-feature
                  className="flex items-center gap-4 group opacity-0"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/25 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.08)]">
                    <Check size={13} className="text-brand-gold" strokeWidth={3} />
                  </div>
                  <span className="font-light tracking-wide group-hover:text-white transition-colors duration-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us + Accordion */}
          <div className="lg:w-2/3 text-left">
            <RevealText
              text="Why Choose Us?"
              tag="h2"
              className="text-3xl font-medium text-white mb-6 tracking-tight text-left"
              centered={false}
            />
            <BannerDescription
              text="Choose vBiz Me for unique intro videos with your logo, customizable vCards, professional designs, seamless integration, and exceptional customer support to elevate your networking."
              className="text-neutral-400 mb-10 font-light leading-relaxed max-w-2xl"
              centered={false}
            />

            <div ref={accordionRef} className="space-y-3">
              {ACCORDION_ITEMS.map((item, index) => {
                const isOpen = activeAccordion === index;

                return (
                  <motion.div
                    key={item.title}
                    data-cinematic-accordion
                    layout
                    className={`relative rounded-2xl overflow-hidden opacity-0 transition-shadow duration-500 ${
                      isOpen
                        ? 'border border-brand-gold/35 shadow-[0_0_40px_rgba(212,175,55,0.12)]'
                        : 'border border-white/5 hover:border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
                    }`}
                  >
                    {isOpen && (
                      <motion.div
                        layoutId="accordion-glow"
                        className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.08] via-transparent to-emerald-500/[0.04] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}

                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent opacity-0 group-hover:opacity-100" />

                    <button
                      type="button"
                      onClick={() => setActiveAccordion(isOpen ? null : index)}
                      className="relative w-full flex items-center justify-between gap-4 py-5 px-5 md:py-6 md:px-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 rounded-2xl bg-[#283630]/90 backdrop-blur-sm cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-start gap-3 min-w-0">
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.6, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            className="shrink-0 mt-0.5 text-brand-gold"
                          >
                            <Sparkles size={16} />
                          </motion.span>
                        )}
                        <span
                          className={`font-medium tracking-wide leading-snug transition-colors duration-300 ${
                            isOpen ? 'text-brand-gold' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </span>
                      </span>

                      <motion.div
                        animate={{
                          rotate: isOpen ? 180 : 0,
                          scale: isOpen ? 1.08 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                          isOpen
                            ? 'border-brand-gold/40 bg-brand-gold/10 text-brand-gold'
                            : 'border-white/10 bg-white/5 text-neutral-400'
                        }`}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: PANEL_EASE }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: 18, opacity: 0, filter: 'blur(10px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: 12, opacity: 0, filter: 'blur(8px)' }}
                            transition={{ duration: 0.5, ease: PANEL_EASE, delay: 0.06 }}
                            className="px-5 md:px-7 pb-6 md:pb-7 text-neutral-400 font-light leading-relaxed border-t border-white/5 pt-4"
                          >
                            {item.content}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
