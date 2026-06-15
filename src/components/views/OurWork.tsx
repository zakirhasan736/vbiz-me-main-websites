'use client';

import { ArrowRight, Sparkles, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';
import { GSAP_CONSTANTS, GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';
import { LazyQRCodeImage } from '@/components/LazyQRCodeImage';
import { PhoneMockupFrame } from '@/components/PhoneMockupFrame';
import {
  PORTFOLIO_QR_CARDS,
  getPortfolioQrImageSrc,
  type PortfolioQrCard,
} from '@/lib/portfolio-qr-cards';

export default function OurWork() {
  const [selectedQr, setSelectedQr] = useState<PortfolioQrCard | null>(null);
  const [showWorkModalPhone, setShowWorkModalPhone] = useState(false);

  const closeWorkModal = () => {
    setSelectedQr(null);
    setShowWorkModalPhone(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeWorkModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedQr) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedQr]);

  const qrCodes = PORTFOLIO_QR_CARDS;

  return (
    <div className="bg-black min-h-screen pb-32">
      {/* Hero Section */}
      <section className="section-hero relative pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,#1a1a1a_0%,black_100%)] opacity-80" />
          <motion.div 
            animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center w-full">
          <div className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 shadow-[0_0_20px_rgba(212,175,55,0.15)] relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
             <Sparkles size={14} className="text-brand-gold" />
             <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-neutral-200">Portfolio</span>
          </div>
          
          <RevealText 
            text="Our Work"
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["Work"]}
          />
          
          <RevealParagraph 
            text="At vBiz Me, we give you full creative control to design your vCard like never before."
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-2xl mx-auto leading-relaxed block text-center"
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
                    setShowWorkModalPhone(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedQr(qr);
                      setShowWorkModalPhone(false);
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
                  className="relative aspect-square w-full rounded-[2rem] overflow-hidden group border border-white/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black bg-[#0A0A0A] h-full"
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

      {/* Modal */}
      <AnimatePresence>
        {selectedQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={closeWorkModal}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            id="work-qr-popup-backdrop"
            data-lenis-prevent
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`portfolio-vcard-modal relative w-full ${showWorkModalPhone ? 'max-w-[380px]' : 'max-w-lg'} bg-[#0c0d10] border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.9)] py-6 px-4 md:py-8 md:px-6 overflow-hidden flex flex-col text-center transition-all duration-300 pointer-events-auto`}
              id="work-qr-popup-modal"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[50px] pointer-events-none" />

              {/* Back button */}
              {showWorkModalPhone && (
                <button 
                  type="button"
                  onClick={() => setShowWorkModalPhone(false)}
                  className="absolute top-5 left-5 text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors z-50 font-sans text-xs font-semibold"
                >
                  ← Back
                </button>
              )}

              <button
                type="button"
                onClick={closeWorkModal}
                aria-label="Close modal"
                className="absolute top-5 right-5 z-50 w-8 h-8 rounded-full bg-black/60 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
              >
                <X size={14} />
              </button>

              {showWorkModalPhone ? (
                <div
                  className="flex flex-col items-center justify-center mt-6 pointer-events-auto relative z-10 vcard-iframe-zone"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 id="modal-title" className="text-white font-bold text-lg mb-1 tracking-tight">
                    {selectedQr.displayName} Live View
                  </h3>
                  <p className="text-neutral-400 font-light text-[11px] mb-4 px-2">
                    Tap and scroll inside the phone preview to explore the live vCard.
                  </p>
                  
                  <PhoneMockupFrame
                    src={selectedQr.demoUrl}
                    title={`${selectedQr.displayName} Live Card Interface`}
                    size="modal"
                  />
                </div>
              ) : (
                <>
                  <div className="py-6 px-4 md:py-8 md:px-6 pb-0">
                    <div 
                      className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white py-6 px-4 md:py-8 md:px-6 shadow-[0_0_50px_rgba(255,255,255,0.2)] border border-white/20"
                      style={{ 
                        backgroundColor: 'white'
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.2)] border-[3px] border-gray-100"
                        style={{
                          backgroundColor: '#ffffff'
                        }}
                      >
                         <LazyQRCodeImage 
                           src={getPortfolioQrImageSrc(selectedQr)} 
                           alt={`QR Code — ${selectedQr.displayName}`} 
                           className="w-full h-full object-contain" 
                           bgcolor="ffffff"
                         />
                      </div>
                    </div>
                  </div>

                  <div className="py-6 px-4 md:py-8 md:px-6 text-center flex flex-col items-center">
                    <h3 id="modal-title" className="text-white text-2xl font-bold mb-2">{selectedQr.displayName}</h3>
                    <p className="text-neutral-400 text-sm mb-6">{selectedQr.desc || "Scan this QR code or click the button below to view the responsive vCard experience on your mobile device."}</p>
                    <button
                      type="button"
                      onClick={() => setShowWorkModalPhone(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-black font-semibold rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
                    >
                      <ExternalLink size={18} />
                      Visit Demo Card
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
