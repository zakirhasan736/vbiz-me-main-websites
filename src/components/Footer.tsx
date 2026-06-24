'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Facebook,
  Mail,
  MapPin,
  Twitter,
  Youtube,
  Phone,
  ArrowRight,
  ArrowUp,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import {
  RevealGridItem,
  SectionRevealRoot,
  SectionRevealStaggerList,
  FOOTER_REVEAL_STAGGER,
} from '@/components/animations/reveal';
import { usePageTransition } from '@/components/providers/page-transition-context';
import { scrollToTop as scrollPageToTop } from '@/lib/scroll-utils';
import { VBIZ_LOGO } from '@/lib/site-assets';
import { renderHighlightedText } from '@/lib/text-highlight';
import { PREMIUM_EASE, prefersReducedMotion } from '@/lib/motion-animation-utils';

const PLATFORM_LINKS = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/our-card', 'vCards'],
  ['/portfolio', 'Portfolio'],
  ['/compare', 'Paper vs vBiz'],
  ['/navigation-bar', 'Nav Bar'],
  ['/advantage', 'Advantage'],
  ['/pricing', 'Pricing'],
] as const;

const CTA_DESCRIPTION =
  'Share your professional identity in one tap—built for founders, creators, and teams who move fast.';

function FooterSocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      data-footer-brand-item
      className="footer-social-icon w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-neutral-400 hover:text-brand-gold hover:bg-brand-gold/10 hover:border-brand-gold/40 hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all duration-300"
    >
      <span className="footer-social-icon__inner flex items-center justify-center">
        <Icon size={15} fill="currentColor" strokeWidth={0} />
      </span>
    </a>
  );
}

function FooterAmbientLayers({ shouldReveal }: { shouldReveal: boolean }) {
  const reduced = prefersReducedMotion();

  if (reduced) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="footer-ambient-dark absolute inset-0 bg-[radial-gradient(circle_at_top_center,#2f3f38_0%,#1e2a24_100%)] opacity-60" />
        <div className="footer-ambient-dark absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="footer-ambient-dark absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_100%)]" />
        <div className="footer-ambient-light absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
        <div className="footer-ambient-light absolute inset-0 opacity-0 bg-[linear-gradient(rgba(11,16,32,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,16,32,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" data-footer-ambient>
      <motion.div
        className="footer-ambient-dark absolute inset-0 bg-[radial-gradient(circle_at_top_center,#2f3f38_0%,#1e2a24_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReveal ? 0.6 : 0 }}
        transition={{ duration: 0.68, ease: PREMIUM_EASE }}
      />
      <motion.div
        className="footer-ambient-dark absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/20 blur-[150px] rounded-full mix-blend-screen footer-ambient-pulse"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{
          opacity: shouldReveal ? 1 : 0,
          scale: shouldReveal ? 1 : 0.82,
        }}
        transition={{ duration: 0.85, ease: PREMIUM_EASE }}
      />
      <motion.div
        className="footer-ambient-dark absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReveal ? 1 : 0 }}
        transition={{ duration: 0.75, ease: PREMIUM_EASE }}
      />
      <div className="footer-ambient-light absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
      <div className="footer-ambient-light absolute inset-0 opacity-0 bg-[linear-gradient(rgba(11,16,32,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,16,32,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}

export const Footer = () => {
  const { theme } = useTheme();
  const footerRef = useRef<HTMLElement>(null);
  const { revealReady } = usePageTransition();
  const footerInView = useInView(footerRef, {
    once: true,
    amount: 0.12,
    margin: '0px 0px -22% 0px',
  });
  const ambientActive = revealReady && footerInView;

  const scrollToTop = () => {
    scrollPageToTop();
  };

  return (
    <footer
      ref={footerRef}
      className="bg-brand-dark border-t border-emerald-500/10 pt-12 md:pt-20 pb-6 md:pb-8 relative overflow-hidden flex flex-col items-center site-section--reveal"
    >
      <FooterAmbientLayers shouldReveal={ambientActive} />

      {/* CTA strip — own scroll trigger when footer top enters view */}
      <SectionRevealRoot
        viewport="footer"
        id="footer-cta-reveal"
        simultaneous={false}
        replayOnNavigate
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 md:pt-10"
      >
        <SectionRevealStaggerList
          stagger={FOOTER_REVEAL_STAGGER.CTA}
          delayChildren={FOOTER_REVEAL_STAGGER.DELAY_CHILDREN}
          className="flex flex-col items-center text-center mb-10 md:mb-24 pb-10 md:pb-20 border-b border-white/5"
          id="footer-cta"
        >
          <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="mb-5 md:mb-8 w-full flex justify-center">
            <div
              data-footer-cta
              className="site-eyebrow site-eyebrow--hero relative overflow-hidden group footer-cta-eyebrow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-brand-gold footer-cta-dot" />
              <span className="text-[10px] md:text-[12px] font-medium tracking-[0.15em] uppercase site-eyebrow__label">
                Start Connecting
              </span>
            </div>
          </RevealGridItem>

          <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full max-w-3xl mx-auto mb-4 md:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white leading-snug md:leading-[1.1] text-center">
              {renderHighlightedText('Ready to digitize your network?', ['digitize'])}
            </h2>
          </RevealGridItem>

          <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full max-w-xl mx-auto mb-5 md:mb-8">
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed text-center">
              {CTA_DESCRIPTION}
            </p>
          </RevealGridItem>

          <RevealGridItem direction="up" distance="MD" scaleOnUp={false}>
            <Link
              href="/contact"
              data-footer-cta-item
              className="relative group bg-brand-gold text-[#0b1020] h-11 md:h-12 px-7 md:px-8 rounded-full font-semibold text-sm tracking-wide transition-all overflow-hidden inline-flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.25)] gap-2 md:gap-3 hover:scale-105 w-full max-w-xs sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeca53] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Get Your vCard
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </RevealGridItem>
        </SectionRevealStaggerList>
      </SectionRevealRoot>

      {/* Main footer — brand, platform nav, get in touch */}
      <SectionRevealRoot
        viewport="footer"
        id="footer-main-reveal"
        simultaneous={false}
        replayOnNavigate
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 lg:gap-8 mb-10 md:mb-20 text-left">
          <div
            data-footer-brand
            className="col-span-2 md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b border-white/5 pb-8 md:border-0 md:pb-0"
          >
            <SectionRevealStaggerList
              stagger={FOOTER_REVEAL_STAGGER.MAIN}
              delayChildren={FOOTER_REVEAL_STAGGER.DELAY_CHILDREN}
              className="flex flex-col items-center md:items-start w-full"
            >
              <RevealGridItem direction="left" distance="LG" scaleOnUp={false} className="mb-4 md:mb-8">
                <Link href="/" data-footer-brand-item className="group flex items-center">
                  <span
                    className={`navbar-logo-shell inline-flex items-center justify-center rounded-full px-1 py-1 transition-transform duration-500 group-hover:scale-[1.03] ${
                      theme === 'light' ? 'bg-black shadow-[0_4px_20px_rgba(0,0,0,0.18)]' : ''
                    }`}
                  >
                    <Image
                      src={VBIZ_LOGO.src}
                      alt={VBIZ_LOGO.alt}
                      width={VBIZ_LOGO.footer.width}
                      height={VBIZ_LOGO.footer.height}
                      sizes={VBIZ_LOGO.footer.sizes}
                      className={`${VBIZ_LOGO.footer.className} transition-transform duration-500 group-hover:scale-105`}
                    />
                  </span>
                </Link>
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full">
                <p
                  data-footer-brand-item
                  className="text-neutral-400 text-sm md:text-base font-light max-w-sm leading-relaxed mb-5 md:mb-8 mx-auto md:mx-0"
                >
                  Elevate your professional identity with the most advanced digital business card
                  platform engineered for visionaries.
                </p>
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false}>
                <div className="flex space-x-3 md:space-x-4 justify-center md:justify-start">
                  <FooterSocialLink href="#" label="Facebook" icon={Facebook} />
                  <FooterSocialLink href="#" label="Twitter" icon={Twitter} />
                  <FooterSocialLink href="#" label="YouTube" icon={Youtube} />
                </div>
              </RevealGridItem>
            </SectionRevealStaggerList>
          </div>

          <div data-footer-platform className="col-span-1 md:col-span-3 md:col-start-6">
            <SectionRevealStaggerList
              stagger={FOOTER_REVEAL_STAGGER.LIST_ITEM}
              delayChildren={FOOTER_REVEAL_STAGGER.DELAY_CHILDREN}
              className="space-y-2 md:space-y-3"
            >
              <RevealGridItem direction="up" distance="MD" scaleOnUp={false}>
                <h3
                  data-footer-nav-item
                  className="text-white font-medium text-[10px] md:text-xs tracking-widest uppercase mb-2 md:mb-5 flex items-center gap-2 opacity-80"
                >
                  <span className="w-3 h-px bg-brand-gold hidden md:block" />
                  Platform
                </h3>
              </RevealGridItem>

              {PLATFORM_LINKS.map(([href, label]) => (
                <RevealGridItem key={href} direction="up" distance="MD" scaleOnUp={false}>
                  <Link
                    href={href}
                    data-footer-nav-item
                    className="group hover:text-brand-gold transition-colors duration-300 inline-flex items-center gap-2 text-xs md:text-sm text-neutral-400 font-light"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 h-px rounded-full bg-brand-gold hidden md:inline-block" />
                    {label}
                  </Link>
                </RevealGridItem>
              ))}
            </SectionRevealStaggerList>
          </div>

          <div data-footer-contact className="col-span-1 md:col-span-4 flex flex-col">
            <SectionRevealStaggerList
              stagger={FOOTER_REVEAL_STAGGER.LIST_ITEM}
              delayChildren={FOOTER_REVEAL_STAGGER.DELAY_CHILDREN}
              className="space-y-3 md:space-y-4"
            >
              <RevealGridItem direction="up" distance="MD" scaleOnUp={false}>
                <h3
                  data-footer-contact-item
                  className="text-white font-medium text-[10px] md:text-xs tracking-widest uppercase mb-1 md:mb-3 flex items-center gap-2 opacity-80"
                >
                  <span className="w-3 h-px bg-brand-gold hidden md:block" />
                  Get in Touch
                </h3>
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false}>
                <a
                  href="mailto:mcasanova@vbizme.com"
                  data-footer-contact-item
                  className="flex items-start gap-2.5 group hover:text-brand-gold transition-colors text-xs md:text-sm text-neutral-400 font-light"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-neutral-500 group-hover:text-brand-gold" />
                  <span className="break-all leading-snug">mcasanova@vbizme.com</span>
                </a>
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false}>
                <a
                  href="tel:+18607709893"
                  data-footer-contact-item
                  className="flex items-center gap-2.5 group hover:text-brand-gold transition-colors text-xs md:text-sm text-neutral-400 font-light"
                >
                  <Phone size={14} className="shrink-0 text-neutral-500 group-hover:text-brand-gold" />
                  <span>+1 (860) 770-9893</span>
                </a>
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="hidden sm:block">
                <div
                  data-footer-contact-item
                  className="flex items-start gap-2.5 group hover:text-brand-gold transition-colors text-xs md:text-sm text-neutral-400 font-light"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-neutral-500 group-hover:text-brand-gold" />
                  <span className="leading-snug">Connecticut, United States</span>
                </div>
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="pt-2 md:pt-4">
                <button
                  type="button"
                  data-footer-contact-item
                  onClick={scrollToTop}
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs md:text-sm font-medium hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/10 transition-all duration-300 group"
                  aria-label="Back to top"
                >
                  <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  Back to Top
                </button>
              </RevealGridItem>
            </SectionRevealStaggerList>
          </div>
        </div>
      </SectionRevealRoot>

      {/* Copyright bar — tied to footer in-view (always readable when scrolled to footer) */}
      <div
        id="footer-bottom-reveal"
        className={`footer-bottom-bar w-full relative z-10 ${ambientActive ? 'footer-bottom-bar--revealed' : ''}`}
      >
        <div
          id="footer-bottom"
          className="w-full border-t border-white/5 pt-5 md:pt-8 text-center px-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 md:gap-4 relative z-10 mx-auto max-w-7xl"
        >
          <p
            data-footer-bottom-item
            className="text-[11px] md:text-[13px] text-neutral-500 font-light tracking-wide"
          >
            © {new Date().getFullYear()} vBiz Me. All rights reserved.
          </p>
          <p
            data-footer-bottom-item
            className="text-[11px] md:text-[13px] text-neutral-500 font-light tracking-wide"
          >
            Designed & Developed by{' '}
            <a
              href="https://nextcreavo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-brand-gold transition-colors font-medium"
            >
              nextcreavo.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
