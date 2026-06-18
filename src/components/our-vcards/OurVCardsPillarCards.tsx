'use client';

import { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { DollarSign, Leaf, Lightbulb } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { GlowCard } from '@/components/InteractiveElements';
import { animateCinematicBurst } from '@/lib/cinematic-animation';
import { usePageTransition } from '@/components/providers/page-transition-context';

const PILLARS = [
  {
    icon: Lightbulb,
    title: 'Innovative',
    desc: 'Create a Lasting Impression',
    glow: 'rgba(212,175,55,0.22)',
    direction: 'left' as const,
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    desc: 'Always Accessible, Always Green',
    glow: 'rgba(34,197,94,0.22)',
    direction: 'up' as const,
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective',
    desc: 'Save Money and Stay Current',
    glow: 'rgba(59,130,246,0.22)',
    direction: 'right' as const,
  },
];

function PillarCard({
  icon: Icon,
  title,
  desc,
  glow,
  direction,
  delay,
}: (typeof PILLARS)[number] & { delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { revealReady, animationKey } = usePageTransition();

  useGSAP(
    () => {
      if (!revealReady || !cardRef.current) return;
      animateCinematicBurst(cardRef.current, direction === 'up' ? 'up' : direction, delay);
    },
    { scope: cardRef, dependencies: [revealReady, animationKey, direction, delay] },
  );

  return (
    <div ref={cardRef} className="h-full opacity-0" data-cinematic-pillar>
      <GlowCard
        glowColor={glow}
        className="py-6 px-4 md:py-8 md:px-6 rounded-[2.1rem] flex flex-col items-center justify-center text-center shadow-2xl group h-full border border-white/5 hover:border-white/15 transition-colors duration-500"
      >
        <div className="absolute inset-0 rounded-[2.1rem] bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="w-20 h-20 rounded-2xl bg-brand-gold/5 flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/15 transition-all duration-500 relative z-10 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.08)]">
          <Icon size={36} strokeWidth={1.5} />
        </div>
        <h4 className="font-semibold text-white text-xl mb-2 tracking-tight relative z-10">{title}</h4>
        <p className="text-neutral-400 font-light text-sm relative z-10">{desc}</p>
      </GlowCard>
    </div>
  );
}

export function OurVCardsPillarCards() {
  return (
    <section className="site-section bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_65%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {PILLARS.map((pillar, idx) => (
          <PillarCard key={pillar.title} {...pillar} delay={idx * 0.12} />
        ))}
      </div>
    </section>
  );
}
