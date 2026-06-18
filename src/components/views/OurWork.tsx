'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, BannerDescription, ScrollRevealCard } from '@/components/animations/reveal';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { GSAP_CONSTANTS, GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';
import { LazyQRCodeImage } from '@/components/LazyQRCodeImage';
import { PortfolioVCardModal } from '@/components/PortfolioVCardModal';
import {
  PORTFOLIO_QR_CARDS,
  getPortfolioQrImageSrc,
  type PortfolioQrCard,
} from '@/lib/portfolio-qr-cards';

export default function OurWork() {
  const [selectedQr, setSelectedQr] = useState<PortfolioQrCard | null>(null);

  const closeWorkModal = () => {
    setSelectedQr(null);
  };

  const qrCodes = PORTFOLIO_QR_CARDS;

  return (
    <div className="bg-brand-dark min-h-screen pb-32">
      {/* Hero Section */}
      <section className="section-hero relative pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center min-h-[50vh] bg-brand-dark">
        <PageHeroBackground />

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center w-full">
          <SectionEyebrow label="Portfolio" variant="hero" />
          
          <RevealText 
            text="Portfolio"
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["Portfolio"]}
          />
          
          <BannerDescription 
            text="Explore real client vCards, branded QR codes, and live digital business card experiences built on vBiz Me."
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-2xl leading-relaxed"
          />
        </div>
      </section>

      {/* QR Code Grid */}
      <section className="site-section relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="work-cards-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {qrCodes.map((qr, idx) => {
            const qrBgColor = 'ffffff';
            const qrUrl = getPortfolioQrImageSrc(qr);
            
            const shadowBase = qr.color === 'ffff00' || qr.name === 'boat' ? 'rgba(234, 179, 8, 0.3)' : 
                               qr.color === 'ff0000' || qr.name === 'vbizmered' || qr.name === 'mountain' ? 'rgba(239, 68, 68, 0.3)' : 
                               qr.color === '4f46e5' ? 'rgba(79, 70, 229, 0.3)' : 'rgba(255, 255, 255, 0.3)';
            
            const shadowHover = qr.color === 'ffff00' || qr.name === 'boat' ? 'rgba(234, 179, 8, 0.7)' : 
                                qr.color === 'ff0000' || qr.name === 'vbizmered' || qr.name === 'mountain' ? 'rgba(239, 68, 68, 0.7)' : 
                                qr.color === '4f46e5' ? 'rgba(79, 70, 229, 0.7)' : 'rgba(255, 255, 255, 0.5)';

            const direction = idx % 4 === 0 ? "left" : idx % 4 === 1 ? "up" : idx % 4 === 2 ? "up" : "right";
            const delay = (idx % 4) * GSAP_CONSTANTS.STAGGER + Math.floor(idx / 4) * GSAP_CONSTANTS.ROW_STAGGER;

            return (
              <ScrollRevealCard 
                key={qr.id}
                direction={direction}
                delay={delay}
                trigger="#work-cards-grid"
                start={GSAP_DEFAULT_START}
                className="w-full h-full"
              >
                <motion.div
                  onClick={() => {
                    setSelectedQr(qr);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedQr(qr);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${qr.displayName} QR code`}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    boxShadow: `0 0 40px ${shadowHover}`
                  }}
                  whileTap={{
                    scale: 0.96,
                    boxShadow: `0 0 60px ${shadowHover}`,
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square w-full rounded-[2rem] overflow-hidden group border border-white/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark bg-brand-surface h-full"
                  style={{ 
                    boxShadow: `0 0 20px ${shadowBase}`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-15 pointer-events-none flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <div className="flex items-center gap-2 text-white/90 font-medium text-sm bg-black/50 backdrop-blur-md py-2 px-4 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20">
                       <Sparkles size={14} className="text-brand-gold" />
                       <span>{qr.displayName}</span>
                     </div>
                  </div>

                  <div className="absolute inset-0 py-6 px-4 md:py-8 md:px-6 flex items-center justify-center transition-transform duration-700 group-hover:scale-[0.95]">
                     <div 
                       className="w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 relative"
                       style={{
                         backgroundColor: '#' + qrBgColor
                       }}
                     >
                       <LazyQRCodeImage
                         src={qrUrl}
                         alt={`QR Code — ${qr.displayName}`}
                         className="w-full h-full object-contain"
                         bgcolor={qrBgColor}
                       />
                     </div>
                  </div>
                </motion.div>
              </ScrollRevealCard>
            )
          })}
        </div>
      </section>

      {/* Modernized Bottom CTA Section */}
      <section className="site-section relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ScrollRevealCard direction="up" className="w-full">
          <GlowCard className="backdrop-blur-xl border border-brand-gold/20 rounded-[2.5rem] py-6 px-4 md:py-8 md:px-6 flex flex-col md:flex-row gap-10 items-center justify-between shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden">
            <div className="md:w-2/3 relative z-10 text-center md:text-left">
              <h2 className="text-white font-medium text-3xl md:text-4xl mb-4 tracking-tight leading-tight">Let's Transform Your Digital Presence Together</h2>
              <p className="text-neutral-400 font-light text-lg leading-relaxed">Ready to elevate your digital presence? Contact us today to discuss how our services can help your business succeed in the digital world.</p>
            </div>
            <div className="shrink-0 mt-6 relative z-10 w-full md:w-auto flex justify-center">
              <MagneticButton 
                href="/contact" 
                className="bg-brand-gold hover:bg-yellow-400 text-black font-semibold py-4 px-8 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] h-14 w-full md:w-auto"
              >
                Order Now
              </MagneticButton>
            </div>
          </GlowCard>
        </ScrollRevealCard>
      </section>

      <PortfolioVCardModal
        card={selectedQr}
        isOpen={!!selectedQr}
        onClose={closeWorkModal}
        modalId="work-qr-popup"
      />
    </div>
  );
}
