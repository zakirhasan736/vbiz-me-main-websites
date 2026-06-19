'use client';

import { useEffect, useState } from 'react';
import {
  Award,
  Briefcase,
  Building,
  Car,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SiteGlowCard } from '@/components/ui/SiteGlowCard';
import { SiteGlowIcon } from '@/components/ui/SiteGlowIcon';

export function SocialProof() {
  const reviews = [
    {
      rater: 'Dave K.',
      role: 'Sales Executive',
      comp: 'Subaru of Hartford',
      quote:
        'Closed 3 extra vehicle sales in my first 10 days using vBiz Me. Prospects absolutely love watching a quick welcoming greeting before checking inventory.',
      val: '5-Star Experience',
      initial: 'D',
      icon: Car,
      color: 'from-brand-gold via-amber-400 to-orange-500',
    },
    {
      rater: 'Samantha L.',
      role: 'Sales Advisor',
      comp: 'Gallagher Buick/GMC',
      quote:
        'No one throws my card away anymore. It sits perfectly mapped in their active iPhone Wallet. My referral rate surged 47% in two months.',
      val: '5-Star Experience',
      initial: 'S',
      icon: TrendingUp,
      color: 'from-amber-400 via-brand-gold to-yellow-500',
    },
    {
      rater: 'Marcus Vance',
      role: 'CEO / Contractor',
      comp: 'Vance Custom Builders',
      quote:
        'Clients take a 9-second tour of my recent kitchen additions, tap direct to call, are highly impressed, and schedule estimates instantly without email delays.',
      val: '5-Star Experience',
      initial: 'M',
      icon: Building,
      color: 'from-orange-500 via-brand-gold to-amber-500',
    },
    {
      rater: 'Clarissa Thorne',
      role: 'Lead Broker',
      comp: 'Apex Luxury Properties',
      quote:
        'The brand integration is immaculate. Clients watch our high-production digital greetings, browse our latest listings directly on the card, and schedule viewings seamlessly.',
      val: '5-Star Experience',
      initial: 'C',
      icon: Award,
      color: 'from-yellow-400 via-amber-500 to-brand-gold',
    },
    {
      rater: 'Dr. Raymond Miller',
      role: 'Founder',
      comp: 'Align Chiropractic Clinic',
      quote:
        'Our missed appointments plummeted to zero. Clients scan our desk QR, save our smart contact entry directly, and can book real-time adjustments with one tap.',
      val: '5-Star Experience',
      initial: 'R',
      icon: Briefcase,
      color: 'from-brand-gold via-orange-400 to-yellow-500',
    },
    {
      rater: 'Sophie Dubois',
      role: 'Creative Director',
      comp: 'Atelier Design Co.',
      quote:
        "My digital card acts as an active, high-converting portfolio deck. We've secured multiple premium design retainers within active networking circles using this platform.",
      val: '5-Star Experience',
      initial: 'S',
      icon: Sparkles,
      color: 'from-amber-500 via-brand-gold to-orange-500',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const prevIdx = (currentIndex - 1 + reviews.length) % reviews.length;
  const currentIdx = currentIndex;
  const nextIdx = (currentIndex + 1) % reviews.length;

  return (
    <section className="site-section bg-brand-dark border-b border-white/5 relative z-10 overflow-hidden text-center animate-fade-in">
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-brand-gold/[0.015] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionEyebrow label="Social Proof & Impact" className="mb-4" />
          <RevealText
            text="Real Results from Real Professionals"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text mb-4 tracking-tight leading-tight"
            tag="h2"
          />
          <RevealParagraph
            text="Hear from leading sales representatives and small businesses who completely digitized their high-value client acquisitions."
            className="text-brand-text-muted text-sm font-light leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto text-left relative z-10">
          {[
            { value: '0%', label: 'Trash-Bin Waste Rate', direction: 'up' as const, delay: 0 },
            { value: '+47%', label: 'Average Referral Surge', direction: 'right' as const, delay: 0.12 },
            { value: '< 2s', label: 'Frictionless Load Time', direction: 'left' as const, delay: 0.24 },
          ].map((stat) => (
            <ScrollRevealCard key={stat.label} direction={stat.direction} delay={stat.delay} className="h-full">
              <SiteGlowCard radius={32} className="py-6 px-4 md:py-8 md:px-6 text-left h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent pointer-events-none" />
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-gold block mb-1">{stat.value}</span>
                <span className="text-xs text-brand-text-muted font-semibold uppercase tracking-wider block">
                  {stat.label}
                </span>
              </SiteGlowCard>
            </ScrollRevealCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-6xl mx-auto px-4 md:px-12"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center relative min-h-[440px] pointer-events-auto">
            <div
              className="hidden md:block social-proof-side-card h-full cursor-pointer"
              onClick={handlePrev}
            >
              <SiteGlowCard radius={36} className="py-6 px-4 md:py-8 md:px-6 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5 bg-brand-card py-1.5 px-3 rounded-full border border-white/10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="#D4AF37" className="opacity-50" strokeWidth={0} />
                    ))}
                    <span className="text-[9px] font-mono uppercase tracking-wider text-brand-text-muted ml-1.5">
                      Verified
                    </span>
                  </div>
                  {(() => {
                    const PrevIcon = reviews[prevIdx].icon;
                    return (
                      <SiteGlowIcon size={36} ariaLabel="Review industry">
                        <PrevIcon size={14} />
                      </SiteGlowIcon>
                    );
                  })()}
                </div>
                <p className="text-brand-text-muted font-light text-[12.5px] italic leading-relaxed line-clamp-5">
                  “{reviews[prevIdx].quote}”
                </p>
              </div>
              <div className="border-t border-white/10 pt-5 mt-6 flex gap-3.5 items-center">
                <div
                  className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${reviews[prevIdx].color} flex items-center justify-center text-black font-extrabold text-sm shadow-md`}
                >
                  {reviews[prevIdx].initial}
                </div>
                <div className="overflow-hidden">
                  <span className="text-brand-text font-semibold text-xs block truncate">
                    {reviews[prevIdx].rater}
                  </span>
                  <span className="text-brand-text-muted text-[10.5px] font-light block truncate mt-0.5">
                    {reviews[prevIdx].role} — {reviews[prevIdx].comp}
                  </span>
                </div>
              </div>
              </SiteGlowCard>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1.04, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="z-10 h-full"
                id="active-testimonial-card"
              >
                <SiteGlowCard
                  radius={40}
                  glowColor="rgba(212, 175, 55, 0.24)"
                  className="py-6 px-4 md:py-8 md:px-6 text-left h-full min-h-[440px] flex flex-col justify-between relative"
                >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent pointer-events-none" />
                <span className="social-proof-quote-mark absolute top-10 right-10 text-[190px] font-serif text-brand-gold/[0.035] select-none pointer-events-none leading-none font-extrabold">
                  ”
                </span>

                <div>
                  <div className="flex items-center justify-between mb-8 relative z-20">
                    <div className="flex items-center gap-2 bg-brand-gold/[0.08] py-1.5 px-3.5 rounded-full border border-brand-gold/25 backdrop-blur-md">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="#D4AF37" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="text-[9.5px] font-mono uppercase tracking-wider text-brand-gold font-bold ml-1">
                        {reviews[currentIdx].val}
                      </span>
                    </div>
                    {(() => {
                      const ActiveIcon = reviews[currentIdx].icon;
                      return (
                        <SiteGlowIcon size={40} ariaLabel="Review category">
                          <ActiveIcon size={18} />
                        </SiteGlowIcon>
                      );
                    })()}
                  </div>

                  <p className="text-base sm:text-lg md:text-[19px] text-brand-text font-light leading-relaxed tracking-wide italic mb-8 relative z-10 font-sans">
                    “{reviews[currentIdx].quote}”
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto relative z-10">
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${reviews[currentIdx].color} flex items-center justify-center text-black font-extrabold text-base shadow-[0_4px_20px_rgba(212,175,55,0.22)] relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-30 mix-blend-overlay" />
                      {reviews[currentIdx].initial}
                    </div>
                    <div>
                      <span className="text-brand-text font-bold text-base block tracking-tight">
                        {reviews[currentIdx].rater}
                      </span>
                      <span className="text-brand-text-muted text-xs font-light block mt-0.5">
                        {reviews[currentIdx].role} —{' '}
                        <strong className="text-brand-gold font-medium">{reviews[currentIdx].comp}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3.5 py-2 rounded-full bg-brand-card border border-white/10 text-[9px] font-mono text-brand-text-muted hover:text-brand-text transition-all flex items-center gap-2 shadow-sm hover:border-brand-gold/30 cursor-pointer active:scale-95"
                      id="autoplay-toggle-btn"
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        {isPlaying && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isPlaying ? 'bg-brand-gold' : 'bg-neutral-600'}`}
                        />
                      </span>
                      {isPlaying ? 'LIVE STREAM' : 'PAUSED'}
                    </button>
                  </div>
                </div>
                </SiteGlowCard>
              </motion.div>
            </AnimatePresence>

            <div
              className="hidden md:block social-proof-side-card h-full cursor-pointer"
              onClick={handleNext}
            >
              <SiteGlowCard radius={36} className="py-6 px-4 md:py-8 md:px-6 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5 bg-brand-card py-1.5 px-3 rounded-full border border-white/10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="#D4AF37" className="opacity-50" strokeWidth={0} />
                    ))}
                    <span className="text-[9px] font-mono uppercase tracking-wider text-brand-text-muted ml-1.5">
                      Verified
                    </span>
                  </div>
                  {(() => {
                    const NextIcon = reviews[nextIdx].icon;
                    return (
                      <SiteGlowIcon size={36} ariaLabel="Review industry">
                        <NextIcon size={14} />
                      </SiteGlowIcon>
                    );
                  })()}
                </div>
                <p className="text-brand-text-muted font-light text-[12.5px] italic leading-relaxed line-clamp-5">
                  “{reviews[nextIdx].quote}”
                </p>
              </div>
              <div className="border-t border-white/10 pt-5 mt-6 flex gap-3.5 items-center">
                <div
                  className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${reviews[nextIdx].color} flex items-center justify-center text-black font-extrabold text-sm shadow-md`}
                >
                  {reviews[nextIdx].initial}
                </div>
                <div className="overflow-hidden">
                  <span className="text-brand-text font-semibold text-xs block truncate">
                    {reviews[nextIdx].rater}
                  </span>
                  <span className="text-brand-text-muted text-[10.5px] font-light block truncate mt-0.5">
                    {reviews[nextIdx].role} — {reviews[nextIdx].comp}
                  </span>
                </div>
              </div>
              </SiteGlowCard>
            </div>
          </div>

          <div className="absolute -left-2 md:-left-6 lg:-left-20 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <SiteGlowIcon size={48} ariaLabel="Previous Testimonial" onClick={handlePrev}>
              <ChevronLeft size={20} />
            </SiteGlowIcon>
          </div>

          <div className="absolute -right-2 md:-right-6 lg:-right-20 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <SiteGlowIcon size={48} ariaLabel="Next Testimonial" onClick={handleNext}>
              <ChevronRight size={20} />
            </SiteGlowIcon>
          </div>

          <div className="flex justify-center items-center gap-1 mt-12">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full cursor-pointer"
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : undefined}
                id={`testimonial-dot-${idx}`}
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'h-2 w-10 bg-brand-gold' : 'h-2 w-2 bg-neutral-800 hover:bg-neutral-600'
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
