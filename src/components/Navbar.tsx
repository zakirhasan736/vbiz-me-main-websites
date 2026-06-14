'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, Moon, Sparkles } from 'lucide-react';
import { MagneticButton } from './InteractiveElements';
import { useTheme } from '@/components/providers/theme-provider';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'vCards', path: '/our-card' },
    { name: 'Our Work', path: '/our-work' },
    { name: 'Navigationbar', path: '/navigation-bar' },
    { name: 'Advantage', path: '/advantage' },
    { name: 'vBiz vs Paper', path: '/compare' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => {
    const current = pathname ?? '/';
    return path === '/' ? current === '/' : current.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-999  flex justify-center transition-all duration-700 ${
          scrolled ? 'pt-4 md:pt-5' : 'pt-6'
        }`}
      >
        <div
          className={`w-full transition-all duration-700 ${scrolled ? 'max-w-6xl px-4' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}
        >
          <div
            className={`relative flex items-center justify-between rounded-full transition-all duration-700 border ${
              scrolled
                ? 'bg-[#0A0A0A]/80 backdrop-blur-3xl border-brand-gold/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] px-4 py-2'
                : 'bg-transparent border-transparent px-2 py-2'
            }`}
          >
            {scrolled && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-gold/0 via-brand-gold/5 to-brand-gold/0 opacity-50 pointer-events-none" />
            )}
            <Link href="/" className="relative z-10 flex-shrink-0 flex items-center pl-2 group">
              <img
                src="https://www.vbizme.com/wp-content/uploads/2025/02/logo-vbizme.webp"
                alt="vBiz Me Logo"
                referrerPolicy="no-referrer"
                className="h-[45px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="relative z-10 hidden lg:flex items-center space-x-0.5 xl:space-x-1 pl-4">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative px-1.5 py-1 text-[11px] xl:px-3 xl:py-1.5 xl:text-[12.5px] font-medium tracking-wide transition-colors duration-300 rounded-full group outline-none whitespace-nowrap ${
                      active ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-full scale-95 group-hover:scale-100" />
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 border border-brand-gold/20 bg-brand-gold/5 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        <div className="absolute -bottom-[1px] inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-[#FFDF65] to-transparent opacity-100 shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="relative z-10 hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme(theme === 'midnight' ? 'ocean' : 'midnight')}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all shadow-lg outline-none focus:ring-2 focus:ring-brand-gold relative overflow-hidden group cursor-pointer"
                title={`Switch to ${theme === 'midnight' ? 'Deep Ocean Blue' : 'Midnight Dark'}`}
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
                </div>
              </button>

              <MagneticButton
                href="/contact"
                className="ml-2 px-6 whitespace-nowrap py-2.5 rounded-full bg-brand-gold text-black text-[13px] font-semibold tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 h-10"
              >
                Contact →
              </MagneticButton>
            </div>

            <div className="lg:hidden flex items-center gap-2 relative z-10">
              <button
                type="button"
                onClick={() => setTheme(theme === 'midnight' ? 'ocean' : 'midnight')}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all outline-none"
                title={`Switch to ${theme === 'midnight' ? 'Deep Ocean Blue' : 'Midnight Dark'}`}
                aria-label="Toggle Theme"
              >
                {theme === 'midnight' ? (
                  <Moon size={15} className="text-brand-gold" fill="currentColor" fillOpacity={0.1} />
                ) : (
                  <Sparkles size={15} className="text-[#38bdf8]" fill="currentColor" fillOpacity={0.2} />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-[280px] z-40 bg-[#0A0A0A] border-r border-white/5 pt-28 px-8 lg:hidden shadow-2xl flex flex-col"
          >
            <div className="flex flex-col gap-5 items-start">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-light tracking-tight w-full pb-2 border-b border-white/5 transition-colors ${
                      active
                        ? 'text-brand-gold border-brand-gold/30 font-medium'
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
