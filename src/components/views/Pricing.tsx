'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import {
  SectionRevealRoot,
  SectionRevealGrid,
  SectionRevealStaggerList,
  RevealGridItem,
  getThreeColumnGridDirection,
  getTwoColumnDirection,
  getGridStaggerForColumns,
  BANNER_REVEAL_STAGGER,
} from '@/components/animations/reveal';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { YouTubeHeroBackground } from '@/components/ui/YouTubeHeroBackground';
import { PRICING_HERO_YOUTUBE_VIDEO_ID } from '@/lib/site-assets';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { renderHighlightedText } from '@/lib/text-highlight';

function PricingPopularBadge() {
  return (
    <div className="pricing-popular-badge" role="status" aria-label="Most popular plan">
      <span className="pricing-popular-badge__shine" aria-hidden="true" />
      <span className="pricing-popular-badge__label">
        <span className="pricing-popular-badge__dot" aria-hidden="true" />
        Most Popular
      </span>
    </div>
  );
}

export default function Pricing() {
  const plans = [
    {
      title: 'Essential',
      subtitle: '2-Year Contract • $10 Setup',
      priceParts: { currency: '$', amount: '9', cents: '95', period: 'Monthly*' },
      features: [
        '5 Professional Reviews',
        '5 Custom FAQs',
        '5 Service Listings',
        '4 Photos',
        '2 Videos',
        'Basic Content Edits',
        'Digital QR Code',
      ],
      description: 'Perfect for professionals establishing their digital presence with essential features',
      buttonText: 'Get Started',
      popular: false,
    },
    {
      title: 'Professional vCard',
      subtitle: '1-Year Contract • $129.00',
      priceParts: { currency: '$', amount: '8', cents: '', period: 'Monthly*' },
      features: [
        'Unlimited Content Edits',
        'Custom Golden Branding',
        'Advanced Performance Analytics',
        '10 Photos, 5 Videos',
        '7 Professional Reviews',
        '7 Custom FAQs and 7 Service Listings',
        'Priority Customer Support',
      ],
      description: 'The complete solution for established professionals who demand excellence and growth',
      buttonText: 'Get Started',
      popular: true,
    },
    {
      title: 'Corporate vCard',
      subtitle: 'Built for organizations needing customized features.',
      priceParts: { customText: 'Contact Sales' },
      features: [
        'Dedicated Account Manager',
        'Custom Brand Package',
        'Unlimited Media Uploads',
        'Team Management Dashboard',
        'Bulk User Onboarding',
        'Advanced Integration Options',
        'Bulk User Onboarding',
      ],
      description: 'The ultimate corporate solution for executives and teams requiring premium service',
      buttonText: 'Get Started',
      popular: false,
    },
  ];

  const planStagger = getGridStaggerForColumns(3);
  const infoStagger = getGridStaggerForColumns(2);
  const infoBoxesDelay = 3 * planStagger + 0.1;

  return (
    <div className="bg-brand-dark">
      {/* Video banner only */}
      <section
        aria-labelledby="pricing-hero-title"
        className="section-hero section-hero--video-bg site-section--reveal relative pt-32 pb-10 md:pb-12 overflow-hidden flex flex-col justify-center bg-brand-dark"
      >
        <YouTubeHeroBackground
          videoId={PRICING_HERO_YOUTUBE_VIDEO_ID}
          title="Pricing background video"
        />
        <PageHeroBackground overVideo />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-gold/10 blur-[150px] rounded-full z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <SectionRevealRoot viewport="header" simultaneous={false} replayOnNavigate>
            <div className="page-hero-video-content max-w-4xl mx-auto">
              <SectionRevealStaggerList
                stagger={BANNER_REVEAL_STAGGER.ITEM}
                delayChildren={BANNER_REVEAL_STAGGER.DELAY_CHILDREN}
                className="flex flex-col items-center text-center"
              >
                <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full flex justify-center mb-4">
                  <SectionEyebrow label="Transparent Pricing" variant="hero" />
                </RevealGridItem>

                <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full mb-4">
                  <h1
                    id="pricing-hero-title"
                    className="text-5xl md:text-7xl font-sans font-medium text-white tracking-tight leading-[1.1] text-center"
                  >
                    {renderHighlightedText('Find the Right Plan', ['Plan'])}
                  </h1>
                </RevealGridItem>

                <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full max-w-3xl">
                  <p
                    data-banner-description
                    className="text-lg md:text-xl text-neutral-200 font-normal leading-relaxed text-center"
                  >
                    Explore flexible plans for every budget, with discounts, expanded features, and dedicated support tailored to your needs.
                  </p>
                </RevealGridItem>
              </SectionRevealStaggerList>
            </div>
          </SectionRevealRoot>
        </div>
      </section>

      {/* Pricing cards — separate section below video banner */}
      <section className="site-section site-section--reveal relative pt-4 pb-12 md:pb-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionRevealRoot viewport="content" simultaneous={false} replayOnNavigate>
            <SectionRevealGrid
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch font-sans"
              stagger={planStagger}
              delayChildren={0.06}
            >
              {plans.map((plan, index) => {
                const glowColor = plan.popular
                  ? 'rgba(212,175,55,0.22)'
                  : index === 2
                    ? 'rgba(59,130,246,0.18)'
                    : 'rgba(255,255,255,0.12)';
                const direction = getThreeColumnGridDirection(index);

                return (
                  <RevealGridItem
                    key={plan.title}
                    direction={direction}
                    distance="MD"
                    scaleOnUp={false}
                    className={`h-full ${plan.popular ? 'pricing-card--popular' : ''}`}
                  >
                    <div className="relative h-full">
                      {plan.popular && <PricingPopularBadge />}
                      <GlowCard
                        glowColor={glowColor}
                        className={`pricing-card__surface relative flex flex-col rounded-[2.5rem] overflow-hidden border h-full ${
                          plan.popular
                            ? 'border-brand-gold/50 shadow-[0_20px_50px_rgba(212,175,55,0.15)] lg:-translate-y-4'
                            : 'border-white/10 hover:border-white/20'
                        } transition-all duration-300`}
                      >
                        <div
                          className={`py-6 px-4 md:py-8 md:px-6 border-b w-full text-left ${
                            plan.popular
                              ? 'border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 to-transparent pr-12 md:pr-14'
                              : 'border-white/5'
                          }`}
                        >
                          <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">{plan.title}</h3>
                          <p className="text-sm text-neutral-400 font-light">{plan.subtitle}</p>
                        </div>

                        <div className="py-6 px-4 md:py-8 md:px-6 w-full text-left">
                          {plan.priceParts.customText ? (
                            <div className="text-4xl font-medium text-white flex items-center justify-start h-[72px] tracking-tight">
                              <span>{plan.priceParts.customText}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-start justify-center">
                              <div className="flex items-start text-white font-medium tracking-tight">
                                <span className="text-2xl mt-2 text-neutral-400">{plan.priceParts.currency}</span>
                                <span className="text-7xl leading-none">{plan.priceParts.amount}</span>
                                {plan.priceParts.cents && (
                                  <span className="text-2xl mt-2 text-neutral-400">.{plan.priceParts.cents}</span>
                                )}
                              </div>
                              <p className="text-neutral-500 text-sm mt-2">{plan.priceParts.period}</p>
                            </div>
                          )}
                        </div>

                        <div className="px-10 flex-1 w-full text-left">
                          <ul className="space-y-4">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-4">
                                <div
                                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                                    plan.popular ? 'bg-brand-gold/20' : 'bg-white/10'
                                  }`}
                                >
                                  <CheckCircle2
                                    className={plan.popular ? 'text-brand-gold' : 'text-neutral-300'}
                                    size={12}
                                    strokeWidth={3}
                                  />
                                </div>
                                <span className="text-neutral-300 text-[14px] leading-relaxed font-light">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="py-6 px-4 md:py-8 md:px-6 flex flex-col items-center mt-auto w-full">
                          <MagneticButton
                            href="/contact"
                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 mb-6 h-14 ${
                              plan.popular
                                ? 'bg-brand-gold text-black hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]'
                                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {plan.buttonText}
                            <ArrowRight size={16} />
                          </MagneticButton>
                          <p className="text-neutral-500 text-xs leading-relaxed text-center font-light">
                            {plan.description}
                          </p>
                        </div>
                      </GlowCard>
                    </div>
                  </RevealGridItem>
                );
              })}
            </SectionRevealGrid>

            <SectionRevealGrid
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-16 md:mt-20"
              stagger={infoStagger}
              delayChildren={infoBoxesDelay}
            >
              <RevealGridItem direction={getTwoColumnDirection(0)} distance="MD" scaleOnUp={false} className="h-full">
                <GlowCard glowColor="rgba(212,175,55,0.18)" className="py-6 px-4 md:py-8 md:px-6 rounded-[2.2rem] h-full">
                  <p className="text-neutral-300 text-[16px] leading-relaxed font-light relative z-10 text-left">
                    At vBiz Me, every customer can create a unique vCard that perfectly represents their personality or business. Start customizing your vCard today and experience the future of digital networking!
                  </p>
                </GlowCard>
              </RevealGridItem>

              <RevealGridItem direction={getTwoColumnDirection(1)} distance="MD" scaleOnUp={false} className="h-full">
                <GlowCard glowColor="rgba(212,175,55,0.18)" className="py-6 px-4 md:py-8 md:px-6 rounded-[2.2rem] h-full">
                  <p className="text-neutral-300 text-[16px] leading-relaxed font-light relative z-10 text-left">
                    Our professional templates and flexible configurations offer limitless branding choices. Deliver a beautiful responsive mobile story that converts contacts into customers instantly.
                  </p>
                </GlowCard>
              </RevealGridItem>
            </SectionRevealGrid>
          </SectionRevealRoot>
        </div>
      </section>
    </div>
  );
}
