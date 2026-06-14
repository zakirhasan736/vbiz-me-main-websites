'use client';

import dynamic from 'next/dynamic';

/** CSR ambient orbs — opacity-only CSS animation (no scale) to avoid CLS. */
function HeroAmbientEffects() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="hero-orb-gold absolute top-[-10%] left-1/3 w-[800px] h-[500px] bg-brand-gold/15 blur-[120px] rounded-full" />
      <div className="hero-orb-blue absolute bottom-1/4 left-5 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
    </div>
  );
}

const HeroAmbient = dynamic(() => Promise.resolve({ default: HeroAmbientEffects }), {
  ssr: false,
});

export function HeroAmbientLazy() {
  return <HeroAmbient />;
}
