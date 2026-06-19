/** SSR secondary hero CTA — visible on first paint for LCP; entrance animation is transform-only. */
export function HeroSecondaryCta() {
  return (
    <button
      type="button"
      className="hero-secondary-cta border border-white/10 bg-white/5 text-white font-medium h-14 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-colors w-full sm:w-auto text-sm shrink-0 cursor-pointer"
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3 w-3 text-brand-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="M8 17V9" />
          <path d="M13 17V5" />
          <path d="M18 17v-6" />
        </svg>
      </span>
      See How We Beat The Competition
    </button>
  );
}
