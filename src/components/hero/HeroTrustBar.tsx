'use client';

import { PartnerLogoMarqueeShell } from '@/components/hero/PartnerLogoMarqueeShell';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import {
  PREMIUM_EASE,
  SLIDE_DISTANCE,
  SLIDE_VISIBLE_STATE,
  getSlideDuration,
  getSlideHiddenState,
  prefersReducedMotion,
} from '@/lib/motion-animation-utils';
import { motion } from 'framer-motion';

export function HeroTrustBar() {
  const { animateReady } = useHeroAnimateReady();
  const distance = SLIDE_DISTANCE.MD;
  const hidden = getSlideHiddenState('up', distance, true);
  const transition = { duration: getSlideDuration(distance), ease: PREMIUM_EASE, delay: 0.15 };

  const content = (
    <div className="hero-trust-bar relative z-20 w-full mt-4 md:mt-8">
      <div className="hero-trust-bar__frame relative overflow-hidden">
        <div className="hero-trust-bar__inner relative z-10 py-8 md:py-10">
          <div className="hero-trust-bar__copy flex flex-col items-center text-center px-4 mb-7 md:mb-8">
            <div className="hero-trust-bar__title-row">
              <span className="hero-trust-bar__line" aria-hidden="true" />
              <div className="hero-trust-bar__badge">
                <span className="hero-trust-bar__badge-dot" aria-hidden="true" />
                <span className="hero-trust-bar__badge-label">Trusted Network</span>
              </div>
              <span className="hero-trust-bar__line" aria-hidden="true" />
            </div>

            <h2 className="hero-trust-bar__headline">
              Trusted by{' '}
              <span className="hero-trust-bar__headline-accent">top professionals</span>{' '}
              at corporations
            </h2>
          </div>

          <div className="hero-trust-bar__marquee-container">
            <div className="hero-trust-bar__marquee-lane hero-trust-bar__marquee-lane--enter">
              <PartnerLogoMarqueeShell />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (prefersReducedMotion()) {
    return <div data-reveal-card>{content}</div>;
  }

  return (
    <motion.div
      data-reveal-card
      initial={hidden}
      animate={animateReady ? SLIDE_VISIBLE_STATE : hidden}
      transition={transition}
    >
      {content}
    </motion.div>
  );
}
