'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X, Moon, Sparkles, Sun } from 'lucide-react';
import { MagneticButton, MagneticNavLink } from './InteractiveElements';
import { useTheme } from '@/components/providers/theme-provider';
import { VBIZ_LOGO } from '@/lib/site-assets';

const NAVBAR_SLIDE_EASE = [0.16, 1, 0.3, 1] as const;

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    setScrolled(latest > 50);

    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    // Notify other UI (e.g., LiveAgent) when mobile nav opens or closes
    try {
      if (mobileMenuOpen) {
        window.dispatchEvent(new CustomEvent('site:nav-open'));
      } else {
        window.dispatchEvent(new CustomEvent('site:nav-close'));
      }
    } catch (e) {
      /* ignore for non-browser environments */
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) setHidden(false);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'vCards', path: '/our-card' },
    { name: 'Navigation Bar', path: '/navigation-bar' },
    { name: 'Advantage', path: '/advantage' },
    { name: 'vBiz vs Paper', path: '/compare' },
    { name: 'Community', path: '/community' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => {
    const current = pathname ?? '/';
    return path === '/' ? current === '/' : current.startsWith(path);
  };

  const cycleTheme = () => {
    setTheme(theme === 'midnight' ? 'light' : theme === 'light' ? 'ocean' : 'midnight');
  };

  const themeLabel =
    theme === 'midnight' ? 'Light Mode' : theme === 'light' ? 'Deep Ocean Blue' : 'Midnight Dark';

  return (
    <>
      <motion.nav
        data-site-navbar
        data-scrolled={scrolled ? 'true' : undefined}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.45, ease: NAVBAR_SLIDE_EASE }}
        style={
          {
            '--navbar-base-pt': scrolled ? '1rem' : '1.5rem',
          } as React.CSSProperties
        }
        className={`fixed top-0 inset-x-0 z-99 flex justify-center ${
          scrolled ? 'pt-4 md:pt-5' : 'pt-6'
        }`}
      >
        <div className={`w-full ${scrolled ? 'max-w-6xl px-4' : 'max-w-[1344px] px-4 sm:px-6 lg:px-8'}`}>
          <div
            data-navbar-shell
            className="relative flex items-center justify-between rounded-full border transition-all duration-700 bg-brand-surface/95 backdrop-blur-3xl border-brand-gold/10 shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] pl-1.5 pr-3 py-2"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-gold/0 via-brand-gold/5 to-brand-gold/0 opacity-40 pointer-events-none" />
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="relative z-10 flex-shrink-0 flex items-center pl-1 group"
            >
              <span
                className={`navbar-logo-shell inline-flex items-center justify-center rounded-full px-1 py-1 transition-transform duration-500 group-hover:scale-[1.03] ${
                  theme === 'light' ? 'bg-black shadow-[0_4px_20px_rgba(0,0,0,0.18)]' : ''
                }`}
              >
                <Image
                  src={VBIZ_LOGO.src}
                  alt={VBIZ_LOGO.alt}
                  width={VBIZ_LOGO.navbar.width}
                  height={VBIZ_LOGO.navbar.height}
                  sizes="(min-width: 768px) 52px, 32px"
                  priority
                  className={`${VBIZ_LOGO.navbar.className} transition-transform duration-500`}
                />
              </span>
            </Link>

            <div className="relative z-10 hidden lg:flex items-center gap-0.5 xl:gap-1 pl-3 xl:pl-4">
              {navLinks.map((link) => (
                <MagneticNavLink key={link.name} href={link.path} active={isActive(link.path)}>
                  {link.name}
                </MagneticNavLink>
              ))}
            </div>

            <div className="relative z-10 hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={cycleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all shadow-lg outline-none focus:ring-2 focus:ring-brand-gold relative overflow-hidden group cursor-pointer"
                title={`Switch to ${themeLabel}`}
                aria-label="Toggle Theme"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div
                    className={`absolute transition-all duration-500 transform ${
                      theme === 'midnight'
                        ? 'opacity-100 scale-100 rotate-0'
                        : 'opacity-0 scale-50 -rotate-90'
                    }`}
                  >
                    <Moon size={18} className="text-brand-gold" fill="currentColor" fillOpacity={0.1} />
                  </div>
                  <div
                    className={`absolute transition-all duration-500 transform ${
                      theme === 'ocean'
                        ? 'opacity-100 scale-100 rotate-0'
                        : 'opacity-0 scale-50 rotate-90'
                    }`}
                  >
                    <Sparkles size={18} className="text-[#38bdf8]" fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <div
                    className={`absolute transition-all duration-500 transform ${
                      theme === 'light'
                        ? 'opacity-100 scale-100 rotate-0'
                        : 'opacity-0 scale-50 rotate-90'
                    }`}
                  >
                    <Sun size={18} className="text-brand-gold" fill="currentColor" fillOpacity={0.15} />
                  </div>
                </div>
              </button>

              <MagneticButton
                href="/contact"
                className="ml-2 px-6 whitespace-nowrap py-2.5 rounded-full bg-brand-gold text-black text-[14px] font-bold tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 h-11"
              >
                Contact →
              </MagneticButton>
            </div>

            <div className="lg:hidden flex items-center gap-2 relative z-10">
              <button
                type="button"
                onClick={cycleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all outline-none"
                title={`Switch to ${themeLabel}`}
                aria-label="Toggle Theme"
              >
                {theme === 'midnight' ? (
                  <Moon size={15} className="text-brand-gold" fill="currentColor" fillOpacity={0.1} />
                ) : theme === 'ocean' ? (
                  <Sparkles size={15} className="text-[#38bdf8]" fill="currentColor" fillOpacity={0.2} />
                ) : (
                  <Sun size={15} className="text-brand-gold" fill="currentColor" fillOpacity={0.15} />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:text-brand-gold transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="site-nav-mobile-overlay site-modal-backdrop fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden={false}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="nav-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.32, ease: NAVBAR_SLIDE_EASE }}
            className="fixed inset-y-0 left-0 w-[280px] z-40 bg-brand-surface border-r border-emerald-500/10 pt-28 px-8 lg:hidden shadow-2xl flex flex-col"
          >
            <div className="flex flex-col gap-5 items-start">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-bold tracking-tight w-full pb-2 border-b border-white/5 transition-colors ${
                      active
                        ? 'text-brand-gold border-brand-gold/30'
                        : 'text-white hover:text-brand-gold/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="mt-6 w-full flex justify-center">
                <MagneticButton
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-8 py-3.5 rounded-full bg-brand-gold text-black text-sm font-semibold tracking-wide hover:bg-white h-12"
                >
                  Contact Us
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
