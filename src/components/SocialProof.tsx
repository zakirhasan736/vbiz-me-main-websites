'use client';

import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { RevealText, RevealParagraph, RevealEyebrow, ScrollRevealCard, SectionRevealRoot, SectionRevealHeader, SectionRevealContent } from '@/components/animations/reveal';
import { SiteGlowCard } from '@/components/ui/SiteGlowCard';
import { SiteGlowIcon } from '@/components/ui/SiteGlowIcon';
import { GOOGLE_REVIEWS, type GoogleReview } from '@/lib/google-reviews';

type Review = GoogleReview;

function StarRow({ size = 12, muted = false }: { size?: number; muted?: boolean }) {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill="#D4AF37"
          className={muted ? 'opacity-50' : undefined}
          strokeWidth={0}
        />
      ))}
    </>
  );
}

function ReviewAuthor({
  review,
  size = 'sm',
}: {
  review: Review;
  size?: 'sm' | 'lg';
}) {
  return (
    <div className="social-proof-card__author">
      <div
        className={`social-proof-card__avatar bg-gradient-to-br ${review.color} ${
          size === 'lg' ? 'social-proof-card__avatar--lg' : 'social-proof-card__avatar--sm'
        }`}
      >
        {review.initial}
      </div>
      <div className="social-proof-card__meta">
        <span className="social-proof-card__name">{review.rater}</span>
        <span className="social-proof-card__role">{review.role}</span>
        <span className="social-proof-card__company">{review.comp}</span>
        <span className="social-proof-card__time text-[11px] text-brand-text-muted/80 font-light">{review.timeAgo}</span>
      </div>
    </div>
  );
}

function SideTestimonialCard({ review, onClick }: { review: Review; onClick: () => void }) {
  const Icon = review.icon;

  return (
    <div className="hidden md:block social-proof-side-card h-full cursor-pointer" onClick={onClick}>
      <SiteGlowCard radius={36} className="social-proof-card__inner h-full">
        <div className="social-proof-card__header">
          <div className="social-proof-card__badge social-proof-card__badge--muted">
            <StarRow size={11} muted />
            <span className="social-proof-card__badge-label">Google</span>
          </div>
          <SiteGlowIcon size={36} ariaLabel="Review industry">
            <Icon size={14} />
          </SiteGlowIcon>
        </div>

        <div className="social-proof-card__body">
          <blockquote className="social-proof-card__quote social-proof-card__quote--side">
            &ldquo;{review.quote}&rdquo;
          </blockquote>
        </div>

        <div className="social-proof-card__footer">
          <ReviewAuthor review={review} size="sm" />
        </div>
      </SiteGlowCard>
    </div>
  );
}

function ActiveTestimonialCard({ review }: { review: Review }) {
  const Icon = review.icon;

  return (
    <SiteGlowCard
      radius={40}
      glowColor="rgba(212, 175, 55, 0.24)"
      className="social-proof-card__inner social-proof-card__inner--active"
    >
      <div className="social-proof-card__accent" aria-hidden="true" />

      <div className="social-proof-card__header">
        <div className="social-proof-card__badge">
          <StarRow size={12} />
          <span className="social-proof-card__badge-label">{review.val}</span>
        </div>
        <SiteGlowIcon size={40} ariaLabel="Review category">
          <Icon size={18} />
        </SiteGlowIcon>
      </div>

      <div className="social-proof-card__body">
        <blockquote className="social-proof-card__quote social-proof-card__quote--active">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
      </div>

      <div className="social-proof-card__footer">
        <ReviewAuthor review={review} size="lg" />
      </div>
    </SiteGlowCard>
  );
}

export function SocialProof() {
  const reviews = GOOGLE_REVIEWS;
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
  const nextIdx = (currentIndex + 1) % reviews.length;

  return (
    <section className="site-section site-section--reveal bg-brand-dark border-b border-white/5 relative z-10 overflow-hidden text-center animate-fade-in">
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-brand-gold/[0.015] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionRevealRoot className="text-center max-w-2xl mx-auto mb-16">
          <SectionRevealHeader>
            <RevealEyebrow label="Social Proof & Impact" className="mb-4 mx-auto" delay={0} />
            <RevealText
            text="Real Results from Real Professionals"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text mb-4 tracking-tight leading-tight"
            tag="h2"
            delay={0.05}
          />
          <RevealParagraph
            text="Verified 5-star Google reviews from real clients who transformed their networking with vBiz Me."
            className="text-brand-text-muted font-light text-base sm:text-lg leading-relaxed"
            delay={0.1}
          />
          </SectionRevealHeader>
        </SectionRevealRoot>

        <SectionRevealRoot>
          <SectionRevealContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto text-left relative z-10">
          {[
            { value: '0%', label: 'Trash-Bin Waste Rate', direction: 'up' as const, delay: 0 },
            { value: '+47%', label: 'Average Referral Surge', direction: 'right' as const, delay: 0.12 },
            { value: '< 2s', label: 'Frictionless Load Time', direction: 'left' as const, delay: 0.24 },
          ].map((stat) => (
            <ScrollRevealCard
              key={stat.label}
              direction={stat.direction}
              distance="XL"
              delay={stat.delay}
              className="h-full"
            >
              <SiteGlowCard radius={22} className="py-6 px-4 md:py-8 md:px-6 text-left h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent pointer-events-none" />
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-gold block mb-1">{stat.value}</span>
                <span className="text-base text-brand-text-muted font-semibold uppercase tracking-wider block">
                  {stat.label}
                </span>
              </SiteGlowCard>
            </ScrollRevealCard>
          ))}
        </div>

        <div
          className="social-proof-carousel relative max-w-6xl mx-auto px-2 sm:px-4 md:px-12"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch justify-center relative min-h-0 md:min-h-[26rem] pointer-events-auto">
            <ScrollRevealCard direction="left" distance="XL" delay={0.05} className="hidden md:block h-full">
              <SideTestimonialCard review={reviews[prevIdx]} onClick={handlePrev} />
            </ScrollRevealCard>

            <ScrollRevealCard direction="up" distance="LG" delay={0.1} className="h-full" id="active-testimonial-card">
              <ActiveTestimonialCard review={reviews[currentIndex]} />
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" distance="XL" delay={0.15} className="hidden md:block h-full">
              <SideTestimonialCard review={reviews[nextIdx]} onClick={handleNext} />
            </ScrollRevealCard>
          </div>

          <div className="absolute -left-1 sm:-left-2 md:-left-6 lg:-left-20 top-[42%] md:top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <SiteGlowIcon size={48} ariaLabel="Previous Testimonial" onClick={handlePrev}>
              <ChevronLeft size={20} />
            </SiteGlowIcon>
          </div>

          <div className="absolute -right-1 sm:-right-2 md:-right-6 lg:-right-20 top-[42%] md:top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <SiteGlowIcon size={48} ariaLabel="Next Testimonial" onClick={handleNext}>
              <ChevronRight size={20} />
            </SiteGlowIcon>
          </div>

          <div className="social-proof-card__controls">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`social-proof-card__autoplay ${isPlaying ? 'social-proof-card__autoplay--live' : ''}`}
              id="autoplay-toggle-btn"
              aria-pressed={isPlaying}
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                {isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                    isPlaying ? 'bg-brand-gold' : 'bg-neutral-500'
                  }`}
                />
              </span>
              {isPlaying ? 'Auto-advancing' : 'Paused'}
            </button>

            <div className="flex justify-center items-center gap-1">
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
          </div>
        </div>
          </SectionRevealContent>
        </SectionRevealRoot>
      </div>
    </section>
  );
}
