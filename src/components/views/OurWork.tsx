'use client';

import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import {
  ScrollRevealCard,
  SectionRevealRoot,
  SectionRevealGrid,
  SectionRevealStaggerList,
  RevealGridItem,
  getPortfolioCardDirection,
  getPortfolioCardDelay,
  BANNER_REVEAL_STAGGER,
} from '@/components/animations/reveal';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { renderHighlightedText } from '@/lib/text-highlight';
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
      {/* Banner + portfolio grid — one viewport group, tight stagger */}
      <section className="section-hero site-section--reveal relative pt-32 pb-12 overflow-visible bg-brand-dark">
        <PageHeroBackground />

        <SectionRevealRoot
          viewport="header"
          simultaneous={false}
          replayOnNavigate
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <SectionRevealStaggerList
            stagger={BANNER_REVEAL_STAGGER.ITEM}
            delayChildren={BANNER_REVEAL_STAGGER.DELAY_CHILDREN}
            className="flex flex-col items-center text-center mb-8 md:mb-10"
          >
            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full flex justify-center">
              <SectionEyebrow label="Portfolio" variant="hero" />
            </RevealGridItem>

            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full mb-4">
              <h1 className="text-5xl md:text-7xl font-sans font-medium text-white tracking-tight leading-[1.1] text-center">
                {renderHighlightedText('Portfolio', ['Portfolio'])}
              </h1>
            </RevealGridItem>

            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full max-w-2xl">
              <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed text-center">
                Explore real client vCards, branded QR codes, and live digital business card experiences built on vBiz Me.
              </p>
            </RevealGridItem>
          </SectionRevealStaggerList>

          <SectionRevealGrid
            id="work-cards-grid"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
            stagger={0}
            delayChildren={
              BANNER_REVEAL_STAGGER.DELAY_CHILDREN + 3 * BANNER_REVEAL_STAGGER.ITEM
            }
          >
            {qrCodes.map((qr, idx) => {
              const qrBgColor = 'ffffff';
              const qrUrl = getPortfolioQrImageSrc(qr);

              const shadowBase =
                qr.color === 'ffff00' || qr.name === 'boat'
                  ? 'rgba(234, 179, 8, 0.3)'
                  : qr.color === 'ff0000' || qr.name === 'vbizmered' || qr.name === 'mountain'
                    ? 'rgba(239, 68, 68, 0.3)'
                    : qr.color === '4f46e5'
                      ? 'rgba(79, 70, 229, 0.3)'
                      : 'rgba(255, 255, 255, 0.3)';

              return (
                <RevealGridItem
                  key={qr.id}
                  direction={getPortfolioCardDirection(idx)}
                  distance="MD"
                  delay={getPortfolioCardDelay(idx)}
                  scaleOnUp={false}
                  className="w-full h-full"
                >
                  <div
                    onClick={() => setSelectedQr(qr)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedQr(qr);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${qr.displayName} QR code`}
                    className="relative aspect-square w-full rounded-[2rem] overflow-hidden group border border-white/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark bg-brand-surface h-full hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.96] transition-all duration-300"
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
                          backgroundColor: `#${qrBgColor}`,
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
                  </div>
                </RevealGridItem>
              );
            })}
          </SectionRevealGrid>
        </SectionRevealRoot>
      </section>

      {/* Bottom CTA */}
      <section className="site-section site-section--reveal relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <SectionRevealRoot viewport="content" replayOnNavigate>
          <ScrollRevealCard direction="up" distance="MD" scaleOnUp={false} className="w-full">
            <GlowCard className="backdrop-blur-xl border border-brand-gold/20 rounded-[2.5rem] py-6 px-4 md:py-8 md:px-6 flex flex-col md:flex-row gap-10 items-center justify-between shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden">
              <div className="md:w-2/3 relative z-10 text-center md:text-left">
                <h2 className="text-white font-medium text-3xl md:text-4xl mb-4 tracking-tight leading-tight">
                  Let&apos;s Transform Your Digital Presence Together
                </h2>
                <p className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed">
                  Ready to elevate your digital presence? Contact us today to discuss how our services can help your business succeed in the digital world.
                </p>
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
        </SectionRevealRoot>
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
