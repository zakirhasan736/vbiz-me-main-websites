import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** SSR primary hero CTA — HTML on first paint; revealed with banner GSAP timeline. */
export function HeroPrimaryCta() {  return (
    <Link
      href="/contact"
      className="hero-primary-cta bg-brand-gold whitespace-nowrap hover:bg-yellow-400 text-black font-semibold h-14 px-8 rounded-full inline-flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.25)] w-full sm:w-auto"
    >
      Create My Free vCard <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
