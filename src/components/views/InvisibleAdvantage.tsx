'use client';

import { ChevronDown, ChevronUp, Pause, Play, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealText, RevealParagraph, BannerDescription, ScrollRevealCard } from '@/components/animations/reveal';
import { INVISIBLE_ADVANTAGE_VIDEO } from '@/lib/site-assets';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

export default function InvisibleAdvantage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const accordionItems = [
    {
      title: "What Is the Invisible Advantage?",
      content: "At vBiz Me, we believe that the most powerful benefits are often the ones you don't see at first glance. The \"Invisible Advantage\" is our term for the subtle yet game-changing edge that our platform provides. It's the layer of advantage that's not immediately visible but makes a profound impact on your networking and business growth."
    },
    {
      title: "How the Invisible Advantage Works",
      content: "The Invisible Advantage works seamlessly in the background. By optimizing the user journey, ensuring fast load times, and providing intuitive navigation, it removes friction. When a client scans your vCard, they experience a flawless transition from physical to digital, creating an immediate sense of professionalism."
    },
    {
      title: "Why It Matters",
      content: "In a competitive market, small details make a big difference. The Invisible Advantage ensures that your first impression is not just good, but exceptional. It builds trust, conveyed through high-quality design and flawless execution, leading to higher engagement and conversion rates."
    },
    {
      title: "What's Included in Your Invisible Advantage",
      content: "It includes advanced analytics to track engagement, SEO optimization for better visibility, instant load mechanisms, and a psychological design approach that aligns colors, typography, and layout to evoke the right emotions from your prospects."
    },
    {
      title: "Why Choose vBiz Me's Invisible Advantage?",
      content: "We don't just build vCards; we engineer digital experiences. Our Invisible Advantage is built on years of research into user behavior and digital psychology, giving you a proven edge that others simply can't replicate."
    }
  ];

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero + featured video — single column, video first interaction */}
      <section className="section-hero relative pt-32 pb-16 overflow-hidden bg-brand-dark">
        <PageHeroBackground />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-8 md:mb-10">
            <SectionEyebrow label="The Secret Weapon" variant="hero" className="mb-6" />

            <RevealText
              text="Invisible Advantage"
              className="text-4xl sm:text-5xl md:text-6xl font-sans font-medium text-white mb-4 tracking-tight leading-[1.1] text-center"
              tag="h1"
              highlightedWords={['Advantage']}
            />

            <BannerDescription
              text="The Advantage You Can't See... But Your Clients Feel Immediately"
              className="text-neutral-400 text-base md:text-lg font-light max-w-2xl leading-relaxed"
            />
          </div>

          <ScrollRevealCard direction="up" className="w-full">
            <AdvantageVideoPlayer />
          </ScrollRevealCard>

          <BannerDescription
            text="See how strategy, psychology, and technology combine behind every vBiz Me card — turning a simple scan into trust, engagement, and real business momentum."
            className="text-neutral-500 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-8"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="site-section bg-brand-dark relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          
          <div className="text-center mb-16">
            <RevealParagraph 
              text="The Invisible Advantage is the hidden force working behind every vBiz Me card. It's the strategy, psychology, and technology built into your digital presence that turns a simple scan into real interest — and real business."
              className="text-neutral-300 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto font-light block"
            />
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-4">
            {accordionItems.map((item, index) => {
              const direction = index % 2 === 0 ? "left" : "right";
              const delay = index * 0.05;
              return (
                <ScrollRevealCard 
                  key={index}
                  direction={direction}
                  delay={delay}
                  className="w-full"
                >
                  <div className="bg-brand-surface rounded-2xl overflow-hidden border border-emerald-500/10 transition-colors hover:border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                      className="w-full flex items-center justify-between py-6 px-4 md:py-8 md:px-6 text-left focus:outline-none group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/5 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-0 group-hover:opacity-100" />
                      <span className={`text-lg md:text-xl font-medium tracking-tight relative z-10 transition-colors duration-300 ${activeAccordion === index ? 'text-brand-gold' : 'text-white'}`}>
                        {item.title}
                      </span>
                      <motion.div
                        animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`shrink-0 ml-4 relative z-10 ${activeAccordion === index ? 'text-brand-gold' : 'text-neutral-500'}`}
                      >
                        {activeAccordion === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-8 text-neutral-400 text-base leading-relaxed font-light">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollRevealCard>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}

function AdvantageVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isMuted, isPlaying]);

  const tryPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.play().catch(() => setIsPlaying(false));
  };

  return (
    <div className="relative w-full bg-brand-surface/80 rounded-[2rem] border border-emerald-500/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(16,185,129,0.08)] group hover:border-brand-gold/25 transition-colors duration-500">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.04),transparent_55%)] pointer-events-none" />

      <div className="relative aspect-video bg-brand-deep">
        <div className="absolute top-0 inset-x-0 h-11 bg-gradient-to-b from-black/80 to-transparent z-20 px-4 flex items-center justify-between text-[10px] text-white/60 font-mono tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <Sparkles size={10} className="text-brand-gold" />
            Invisible Advantage
          </span>
          <span className="text-brand-gold/80 hidden sm:inline">Full Breakdown</span>
        </div>

        <video
          ref={videoRef}
          src={INVISIBLE_ADVANTAGE_VIDEO}
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          controls={isPlaying}
          onLoadedMetadata={tryPlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className={`absolute inset-0 w-full h-full object-contain bg-brand-deep transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-80'}`}
          aria-label="The Invisible Advantage presentation video"
        />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none z-10" />

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-30">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:bg-black/90 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-black hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer shadow-lg"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>

        {!isPlaying && (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full bg-black/45 flex flex-col items-center justify-center z-20 transition-colors cursor-pointer border-none outline-none group/play"
            aria-label="Play The Invisible Advantage video"
          >
            <div className="w-16 h-16 rounded-full bg-brand-gold/95 flex items-center justify-center text-black shadow-[0_0_35px_rgba(212,175,55,0.35)] group-hover/play:scale-110 transition-transform mb-4">
              <Play size={24} fill="currentColor" className="ml-1 text-black" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70">
              Play Presentation
            </span>
          </button>
        )}
      </div>

      <div className="px-4 sm:px-5 py-4 border-t border-emerald-500/10 bg-brand-elevated/90 flex items-center justify-between gap-4">
        <p className="text-[11px] text-neutral-400 font-light leading-relaxed text-left">
          A quick walkthrough of the hidden psychology and technology powering every vBiz Me card.
        </p>
        <span className="text-[9px] font-mono uppercase tracking-widest text-brand-gold/70 shrink-0 hidden sm:inline">
          HD • Tap to unmute
        </span>
      </div>
    </div>
  );
}
