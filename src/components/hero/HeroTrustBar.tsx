import { PartnerLogoMarqueeShell } from '@/components/hero/PartnerLogoMarqueeShell';
import { PartnerLogoMarqueeStatic } from '@/components/hero/PartnerLogoMarqueeStatic';
import { PARTNER_LOGOS } from '@/lib/partner-logos';

/** SSR partner trust strip — entrance animation is CSS-only (no motion bundle). */
export function HeroTrustBar() {
  return (
    <div className="hero-trust-bar hero-trust-bar--enter relative z-20 w-full mt-4 md:mt-8">
      <div className="hero-trust-bar__frame relative overflow-hidden">
        <div className="hero-trust-bar__inner relative z-10 py-8 md:py-10">
          <div className="hero-trust-bar__copy hero-trust-bar__copy--enter flex flex-col items-center text-center px-4 mb-7 md:mb-8">
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
          </div>

          <div className="hero-trust-bar__marquee-lane hero-trust-bar__marquee-lane--enter">
            <PartnerLogoMarqueeShell staticFallback={<PartnerLogoMarqueeStatic />} />
          </div>
        </div>
      </div>
    </div>
  );
}
