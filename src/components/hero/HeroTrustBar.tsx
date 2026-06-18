'use client';

import { motion } from 'motion/react';
import { PartnerLogoMarquee } from '@/components/hero/PartnerLogoMarquee';
import { PARTNER_LOGOS } from '@/lib/partner-logos';

export function HeroTrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="hero-trust-bar relative z-20 w-full mt-4 md:mt-8"
    >
      <div className="hero-trust-bar__frame relative overflow-hidden">
        <div className="hero-trust-bar__ambient" aria-hidden="true" />
        <div className="hero-trust-bar__sweep" aria-hidden="true" />
        <div className="hero-trust-bar__grain" aria-hidden="true" />

        <div className="hero-trust-bar__inner relative z-10 py-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center px-4 mb-7 md:mb-8"
          >
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
              at
            </h2>

            <p className="hero-trust-bar__subline">
              {PARTNER_LOGOS.length}+ industry-leading brands power their digital presence with vBiz Me
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="hero-trust-bar__marquee-lane"
          >
            <div className="hero-trust-bar__lane-glow hero-trust-bar__lane-glow--top" aria-hidden="true" />
            <div className="hero-trust-bar__lane-glow hero-trust-bar__lane-glow--bottom" aria-hidden="true" />
            <PartnerLogoMarquee />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
