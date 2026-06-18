type SectionEyebrowProps = {
  label: string;
  /** hero = larger pill for page banners; section = compact label above section titles */
  variant?: 'hero' | 'section';
  className?: string;
};

export function SectionEyebrow({ label, variant = 'section', className = '' }: SectionEyebrowProps) {
  return (
    <div
      className={`site-eyebrow ${variant === 'hero' ? 'site-eyebrow--hero' : 'site-eyebrow--section'} ${className}`}
    >
      <span className="site-eyebrow__dot-wrap relative flex h-2 w-2 shrink-0">
        <span className="site-eyebrow__dot-ping animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" />
        <span className="site-eyebrow__dot relative inline-flex rounded-full h-2 w-2" />
      </span>
      <span className="site-eyebrow__label">{label}</span>
    </div>
  );
}
