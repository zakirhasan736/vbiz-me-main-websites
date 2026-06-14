import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { HeroHeading } from '@/components/hero/HeroHeading';
import { HeroBannerActions } from '@/components/hero/HeroBannerActions';

/** Server-rendered hero copy and CTAs — paints immediately for LCP. */
export function HeroBanner() {
  return (
    <div className="lg:col-span-7 flex flex-col items-start text-left">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-6">
        <Sparkles size={12} aria-hidden="true" /> Real-time Video Introductions
      </div>

      <HeroHeading />

      <p className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed mb-8 max-w-2xl text-left">
        Discover the vBiz Me virtual business card (vCard)—an innovative leap in digital networking
        designed to make a powerful emotional impact.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-10 relative">
        <Link
          href="/contact"
          className="bg-brand-gold hover:bg-yellow-400 text-black font-semibold h-14 px-8 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.25)] w-full sm:w-auto"
        >
          Create My Free vCard <ArrowRight size={16} aria-hidden="true" />
        </Link>

        <HeroBannerActions />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6 text-neutral-500 text-xs">
        <div className="flex items-center gap-1.5">
          <Check size={14} className="text-brand-gold" aria-hidden="true" /> No Application Required
        </div>
        <div className="flex items-center gap-1.5">
          <Check size={14} className="text-brand-gold" aria-hidden="true" /> Instant Smartphone Saving
        </div>
        <div className="flex items-center gap-1.5">
          <Check size={14} className="text-brand-gold" aria-hidden="true" /> Unlimited Sharing Limits
        </div>
      </div>
    </div>
  );
}
