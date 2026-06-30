type VCardShortPhoneLoaderProps = {
  label?: string;
  urlLine?: string;
  className?: string;
  roundedClassName?: string;
};

/** Compact spinner overlay for mobile vCard phone frames. */
export function VCardShortPhoneLoader({
  label = 'Loading vCard…',
  urlLine,
  className = '',
  roundedClassName = 'rounded-[44px]',
}: VCardShortPhoneLoaderProps) {
  return (
    <div
      className={`vcard-phone-loader absolute inset-0 z-[80] flex flex-col items-center justify-center border border-brand-gold/25 bg-[#080808] px-4 text-center shadow-[inset_0_0_32px_rgba(212,175,55,0.05)] ${roundedClassName} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="mb-2.5 h-9 w-9 animate-spin rounded-full border-2 border-brand-gold/25 border-t-brand-gold shadow-[0_0_14px_rgba(212,175,55,0.35)]" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white">{label}</span>
      {urlLine ? (
        <span className="mt-2 max-w-[240px] break-all font-mono text-[10px] leading-snug text-brand-gold/90">
          {urlLine}
        </span>
      ) : null}
    </div>
  );
}
