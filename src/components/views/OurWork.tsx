'use client';

import { ArrowRight, Sparkles, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';
import { GSAP_CONSTANTS, GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';
import { LazyQRCodeImage } from '@/components/LazyQRCodeImage';
import { PhoneMockupFrame } from '@/components/PhoneMockupFrame';

export default function OurWork() {
  const [selectedQr, setSelectedQr] = useState<any>(null);
  const [showWorkModalPhone, setShowWorkModalPhone] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedQr(null);
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

  const qrCodes = [
    {
      name: "michaelangelo-casanova-2",
      color: "ffffff",
      icon: "MAC",
      displayName: "Michaelangelo Casanova",
      demoUrl: "https://app.vbizme.com/vCard/michaelangelo-casanova-2#home",
      tag: "Art & Luxury",
      desc: "Luxury business representation and high-caliber portfolio design customized for exclusive creative directors."
    },
    {
      name: "chago-vargas",
      color: "ff0000",
      icon: "CV",
      displayName: "Chago Vargas",
      demoUrl: "https://app.vbizme.com/vCard/chago-vargas#home",
      tag: "Real Estate Broker",
      desc: "Elite boutique real estate representation and visual walk-through showcasing with instant scheduling pipelines."
    },
    {
      name: "c-alexander-forrest",
      color: "ffffff",
      icon: "CAF",
      displayName: "C. Alexander Forrest",
      demoUrl: "https://app.vbizme.com/vCard/c-alexander-forrest#home",
      tag: "Financial Advisory",
      desc: "Prestige wealth preservation and commercial investment strategies mapping for ultra-high-net-worth creators."
    },
    {
      name: "melissa-masse",
      color: "ffffff",
      icon: "MM",
      displayName: "Melissa Masse",
      demoUrl: "https://app.vbizme.com/vCard/melissa-masse#home",
      tag: "Corporate Law",
      desc: "Bespoke corporate litigation, strategic counsel, and contract drafting optimized with dynamic contact pathways."
    },
    {
      name: "glen-richards",
      color: "ffffff",
      icon: "GR",
      displayName: "Glen Richards",
      demoUrl: "https://app.vbizme.com/vCard/glen-richards#home",
      tag: "Asset Management",
      desc: "Premium sovereign wealth strategies, asset custody diagnostics, and portfolio distribution frameworks."
    },
    {
      name: "brian-dennis",
      color: "4f46e5",
      icon: "BD",
      displayName: "Brian Dennis",
      demoUrl: "https://app.vbizme.com/vCard/brian-dennis#home",
      tag: "Enterprise Sales",
      desc: "High-velocity B2B enterprise pipelines, revenue growth audits, and modern scale consulting."
    },
    {
      name: "thomas-pethigal",
      color: "ffffff",
      icon: "TP",
      displayName: "Thomas Pethigal",
      demoUrl: "https://app.vbizme.com/vCard/thomas-pethigal#home",
      tag: "Strategic Consulting",
      desc: "Dynamic change management, operational alignment, and scaling protocols for technical companies."
    },
    {
      name: "jessica-brito",
      color: "ffffff",
      icon: "JB",
      displayName: "Jessica Brito",
      demoUrl: "https://app.vbizme.com/vCard/jessica-brito#home",
      tag: "Visual Design",
      desc: "Expert branding overhauls, typography pairing, and luxury physical card representation frameworks."
    },
    {
      name: "tony-mint",
      color: "ffffff",
      icon: "TM",
      displayName: "Tony Mint",
      demoUrl: "https://app.vbizme.com/vCard/tony-mint#home",
      tag: "Creative Direction",
      desc: "High-end product design, interactive vector animation, and immersive digital branding systems."
    },
    {
      name: "matheno-bey",
      color: "ffffff",
      icon: "MB",
      displayName: "Matheno Bey",
      demoUrl: "https://app.vbizme.com/vCard/matheno-bey#home",
      tag: "Consulting",
      desc: "Professional elite coaching, public relations representation, and high-impact partnership design."
    },
    {
      name: "sheldon-singleton",
      color: "ffffff",
      icon: "SS",
      displayName: "Sheldon Singleton",
      demoUrl: "https://app.vbizme.com/vCard/sheldon-singleton#home",
      tag: "Leadership Advisory",
      desc: "Founders and CEOs growth consulting, systemic team productivity mapping, and global alignment."
    },
    {
      name: "clinton-h-weston-jr",
      color: "ffffff",
      icon: "CW",
      displayName: "Clinton H. Weston Jr",
      demoUrl: "https://app.vbizme.com/vCard/clinton-h-weston-jr#home",
      tag: "Logistics Expert",
      desc: "Sovereign global supply chain architecture, port clearing diagnostics, and rapid freight pathways."
    },
    {
      name: "lisa-mh-williams",
      color: "ffffff",
      icon: "LW",
      displayName: "Lisa MH Williams",
      demoUrl: "https://app.vbizme.com/vCard/lisa-mh-williams#home",
      tag: "Sovereign Law",
      desc: "Bespoke legal advisory, family trust security, and corporate legal risk mitigation structures."
    },
    {
      name: "stephan-brewer",
      color: "ffffff",
      icon: "SB",
      displayName: "Stephan Brewer",
      demoUrl: "https://app.vbizme.com/vCard/stephan-brewer#home",
      tag: "Growth Marketing",
      desc: "Performance marketing, conversion-focused paid acquisition audits, and scale advisory."
    },
    {
      name: "kenneth-pierce",
      color: "ffffff",
      icon: "KP",
      displayName: "Kenneth Pierce",
      demoUrl: "https://app.vbizme.com/vCard/kenneth-pierce#home",
      tag: "Corporate Strategy",
      desc: "Executive recruitment systems, operational performance mapping, and digital transformation."
    },
    {
      name: "mayan-botanicals",
      color: "4f46e5",
      icon: "MB",
      displayName: "Mayan Botanicals",
      demoUrl: "https://app.vbizme.com/vCard/mayan-botanicals#home",
      tag: "Wellness Boutique",
      desc: "Custom formulas, specialized raw botanical supply, and premium direct-to-consumer organic lines."
    },
    {
      name: "walter-jofre-jr",
      color: "ffffff",
      icon: "WJ",
      displayName: "Walter Jofre Jr",
      demoUrl: "https://app.vbizme.com/vCard/walter-jofre-jr#home",
      tag: "Automotive Executive",
      desc: "Showroom stocks cataloguing, bespoke wholesale transactions, and fleet financial optimization."
    },
    {
      name: "sabor-ecuatoriano-3",
      color: "ff0000",
      icon: "SE",
      displayName: "Sabor Ecuatoriano",
      demoUrl: "https://app.vbizme.com/vCard/sabor-ecuatoriano-3#home",
      tag: "Gastronomy Boutique",
      desc: "Signature gourmet catering, fine dining events, and exclusive menus designed with heritage."
    }
  ];

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
            const qrFgColor = qr.color === 'ff0000' ? 'e50000' : (qr.color === '4f46e5' ? '4f46e5' : '000000');
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qr.demoUrl)}&color=${qrFgColor}&bgcolor=${qrBgColor}`;
            
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
                key={idx}
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
                  aria-label={`View details for ${qr.name} QR code`}
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
                       <span className="capitalize">{qr.name}</span>
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
                         alt={`QR Code ${idx + 1}`}
                         className="w-full h-full object-cover mix-blend-multiply"
                         bgcolor={qrBgColor}
                       />
                       
                       {/* Center Badge Simulation */}
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         {qr.name !== 'bitcoin' && (
                            <div className="w-[20%] h-[20%] max-w-[80px] max-h-[80px] bg-white rounded-lg flex items-center justify-center shadow-xl border border-gray-100 overflow-hidden transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                              <div className="text-[10px] sm:text-xs font-bold text-center text-black px-1 uppercase w-full break-words leading-tight">{qr.icon}</div>
                            </div>
                         )}
                         {qr.name === 'bitcoin' && (
                           <div className="w-[20%] h-[20%] max-w-[80px] max-h-[80px] bg-orange-500 rounded-full flex items-center justify-center shadow-2xl border-[3px] border-white transform transition-transform duration-700 group-hover:scale-110 -rotate-6 group-hover:-rotate-12 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                              <span className="text-white text-3xl font-bold -ml-[2px] mt-[1px]">₿</span>
                           </div>
                         )}
                       </div>
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
            onClick={() => setSelectedQr(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
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
              className={`relative w-full ${showWorkModalPhone ? 'max-w-[380px]' : 'max-w-lg'} bg-[#0A0A0A] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300`}
            >
              {/* Back button */}
              {showWorkModalPhone && (
                <button 
                  onClick={() => setShowWorkModalPhone(false)}
                  className="absolute top-5 left-5 text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors z-50 font-sans text-xs font-semibold"
                >
                  ← Back
                </button>
              )}

              <button
                autoFocus
                onClick={() => setSelectedQr(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white border border-white/10 hover:text-black hover:scale-110 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <X size={20} />
              </button>

              {showWorkModalPhone ? (
                <div className="py-6 px-4 md:py-8 md:px-6 flex flex-col items-center justify-center text-center">
                  <h3 id="modal-title" className="text-white text-xl font-bold mb-1">{selectedQr.displayName || selectedQr.name} Live View</h3>
                  <p className="text-neutral-400 text-xs mb-4">Interact with the live digital business card mockup below inside this secure preview frame.</p>
                  
                  <PhoneMockupFrame
                    src={selectedQr.demoUrl || 'https://app.vbizme.com/vCard/michaelangelo-casanova-2#home'}
                    title={`${selectedQr.displayName || selectedQr.name} Live Card Interface`}
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
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(selectedQr.demoUrl)}&color=${selectedQr.color === 'ff0000' ? 'e50000' : (selectedQr.color === '4f46e5' ? '4f46e5' : '000000')}&bgcolor=ffffff`} 
                           alt={`${selectedQr.displayName || selectedQr.name} QR Code`} 
                           className="w-full h-full object-cover mix-blend-multiply" 
                           bgcolor="ffffff"
                         />
                      </div>
                      
                      {/* Center Badge Simulation */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <div className="w-[20%] h-[20%] max-w-[100px] max-h-[100px] bg-white rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] border-2 border-white overflow-hidden">
                           <div className="text-xs sm:text-sm font-bold text-center text-black px-1 uppercase w-full break-words leading-tight">{selectedQr.icon}</div>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-6 px-4 md:py-8 md:px-6 text-center flex flex-col items-center">
                    <h3 id="modal-title" className="text-white text-2xl font-bold mb-2">{selectedQr.displayName || selectedQr.name}</h3>
                    <p className="text-neutral-400 text-sm mb-6">{selectedQr.desc || "Scan this QR code or click the button below to view the responsive vCard experience on your mobile device."}</p>
                    <button 
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
      </ AnimatePresence>
    </div>
  );
}
