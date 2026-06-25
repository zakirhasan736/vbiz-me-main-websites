'use client';

import { PartnerLogoMarquee } from '@/components/hero/PartnerLogoMarquee';

/** ~20KB total — mount the animated marquee immediately (no deferred load or placeholders). */
export function PartnerLogoMarqueeShell() {
  return (
    <div className="partner-logo-marquee-shell relative w-full">
      <PartnerLogoMarquee />
    </div>
  );
}
