/** SSR ambient orbs — pinned to hero viewport height so trust-bar growth does not shift positions. */
export function HeroAmbientLazy() {
  return (
    <div
      className="absolute inset-x-0 top-0 h-svh pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <div className="hero-orb-gold absolute top-[-10%] left-1/3 w-[800px] h-[500px] bg-brand-gold/12 blur-[120px] rounded-full" />
      <div className="hero-orb-blue absolute top-[58vh] left-5 w-[min(100vw,400px)] h-[400px] bg-emerald-500/12 blur-[100px] rounded-full" />
      <div className="hero-orb-blue absolute top-[28vh] right-0 w-[min(100vw,320px)] h-[320px] bg-emerald-400/8 blur-[90px] rounded-full" />
      <div className="hero-ambient-grid absolute inset-0" />
    </div>
  );
}
