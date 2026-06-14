'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Mail,
  MapPin,
  Twitter,
  Youtube,
  Phone,
  ArrowRight,
  ArrowUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLenis } from '@/components/providers/lenis-context';
import { VBIZ_LOGO } from '@/lib/site-assets';

const PLATFORM_LINKS = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/our-card', 'vCards'],
  ['/our-work', 'Our Work'],
  ['/compare', 'Paper vs vBiz'],
  ['/navigation-bar', 'Nav Bar'],
  ['/advantage', 'Advantage'],
  ['/pricing', 'Pricing'],
] as const;

export const Footer = () => {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-12 md:pt-20 pb-6 md:pb-8 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,#1a1a1a_0%,black_100%)] opacity-80" />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/20 blur-[150px] rounded-full mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 md:pt-10">
        {/* CTA strip */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-24 pb-10 md:pb-20 border-b border-white/5 gsap-reveal">
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                '0 0 20px rgba(212,175,55,0.1)',
                '0 0 50px rgba(255,223,101,0.3)',
                '0 0 20px rgba(212,175,55,0.1)',
              ],
              borderColor: [
                'rgba(255,255,255,0.1)',
                'rgba(212,175,55,0.4)',
                'rgba(255,255,255,0.1)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-5 md:mb-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <motion.span
              animate={{
                opacity: [1, 0.6, 1],
                scale: [1, 1.5, 1],
                boxShadow: [
                  '0 0 15px rgba(212,175,55,0.8)',
                  '0 0 35px rgba(255,223,101,1)',
                  '0 0 15px rgba(212,175,55,0.8)',
                ],
                backgroundColor: ['#D4AF37', '#FFDF65', '#D4AF37'],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
            />
            <span className="text-[10px] md:text-[12px] font-medium tracking-[0.15em] uppercase text-neutral-200">
              Start Connecting
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-white mb-5 md:mb-8 leading-snug md:leading-[1.1] max-w-md md:max-w-none mx-auto">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold/80 to-white">
              digitize
            </span>{' '}
            your network?
          </h2>

          <Link
            href="/contact"
            className="relative group bg-white text-black h-11 md:h-12 px-7 md:px-8 rounded-full font-semibold text-sm tracking-wide transition-all overflow-hidden inline-flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] gap-2 md:gap-3 hover:scale-105 w-full max-w-xs sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Get Your vCard
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Main footer grid — compact 2-col on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 lg:gap-8 mb-10 md:mb-20 text-left gsap-reveal">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b border-white/5 pb-8 md:border-0 md:pb-0">
            <Link href="/" className="group flex items-center mb-4 md:mb-8">
              <Image
                src={VBIZ_LOGO.src}
                alt="vBiz Me Logo"
                width={VBIZ_LOGO.footer.width}
                height={VBIZ_LOGO.footer.height}
                sizes={VBIZ_LOGO.footer.sizes}
                className={`${VBIZ_LOGO.footer.className} transition-transform duration-500 group-hover:scale-105`}
              />
            </Link>
            <p className="text-neutral-400 text-xs md:text-sm font-light max-w-sm leading-relaxed mb-5 md:mb-8 mx-auto md:mx-0">
              Elevate your professional identity with the most advanced digital business card platform engineered for visionaries.
            </p>
            <div className="flex space-x-3 md:space-x-4 justify-center md:justify-start">
              <a href="#" aria-label="Facebook" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-neutral-400 hover:text-brand-gold hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-all duration-300">
                <Facebook size={15} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-neutral-400 hover:text-brand-gold hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-all duration-300">
                <Twitter size={15} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-neutral-400 hover:text-brand-gold hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-all duration-300">
                <Youtube size={15} fill="currentColor" strokeWidth={0} />
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div className="col-span-1 md:col-span-3 md:col-start-6">
            <h4 className="text-white font-medium text-[10px] md:text-xs tracking-widest uppercase mb-4 md:mb-8 flex items-center gap-2 opacity-80">
              <span className="w-3 h-px bg-brand-gold hidden md:block" />
              Platform
            </h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-neutral-400 font-light">
              {PLATFORM_LINKS.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group hover:text-brand-gold transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 h-px rounded-full bg-brand-gold hidden md:inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch + back to top */}
          <div className="col-span-1 md:col-span-4 flex flex-col">
            <h4 className="text-white font-medium text-[10px] md:text-xs tracking-widest uppercase mb-4 md:mb-8 flex items-center gap-2 opacity-80">
              <span className="w-3 h-px bg-brand-gold hidden md:block" />
              Get in Touch
            </h4>
            <ul className="space-y-3 md:space-y-5 text-xs md:text-sm text-neutral-400 font-light">
              <li>
                <a
                  href="mailto:mcasanova@vbizme.com"
                  className="flex items-start gap-2.5 group hover:text-brand-gold transition-colors"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-neutral-500 group-hover:text-brand-gold" />
                  <span className="break-all leading-snug">mcasanova@vbizme.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+18607709893"
                  className="flex items-center gap-2.5 group hover:text-brand-gold transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-neutral-500 group-hover:text-brand-gold" />
                  <span>+1 (860) 770-9893</span>
                </a>
              </li>
              <li className="hidden sm:flex items-start gap-2.5 group hover:text-brand-gold transition-colors">
                <MapPin size={14} className="mt-0.5 shrink-0 text-neutral-500 group-hover:text-brand-gold" />
                <span className="leading-snug">Connecticut, United States</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-5 md:mt-8 inline-flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs md:text-sm font-medium hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/10 transition-all duration-300 group"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              Back to Top
            </button>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/5 pt-5 md:pt-8 text-center px-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 md:gap-4 relative z-10 mx-auto max-w-7xl">
        <p className="text-[11px] md:text-[13px] text-neutral-600 font-light tracking-wide">
          © {new Date().getFullYear()} vBiz Me. All rights reserved.
        </p>
        <p className="text-[11px] md:text-[13px] text-neutral-600 font-light tracking-wide">
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
    </footer>
  );
};
