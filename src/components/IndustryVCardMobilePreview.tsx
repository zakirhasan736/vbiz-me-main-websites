'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Hand, Smartphone, X } from 'lucide-react';
import { PhoneMockupFrame } from '@/components/PhoneMockupFrame';
import { VCardInteractiveLane } from '@/components/VCardInteractiveLane';
import { lockDocumentScroll, unlockDocumentScroll } from '@/lib/scroll-utils';
import { VCARD_MOBILE_FRAME_LOADER } from '@/lib/vcard-mobile-loader';

type IndustryVCardMobilePreviewProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  src: string;
  title: string;
  industryName: string;
  company: string;
  previewImage: string;
  previewIsVideo?: boolean;
  highlighted?: boolean;
  iframeEnabled?: boolean;
};

export function IndustryVCardMobilePreview({
  isOpen,
  onOpen,
  onClose,
  src,
  title,
  industryName,
  company,
  previewImage,
  previewIsVideo = false,
  highlighted = false,
  iframeEnabled = true,
}: IndustryVCardMobilePreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('vcard-demo-modal-open');
    lockDocumentScroll();
    return () => {
      document.body.classList.remove('vcard-demo-modal-open');
      unlockDocumentScroll();
    };
  }, [isOpen]);

  const modal = !isOpen || !iframeEnabled || !src ? null : (
    <div
      onClick={onClose}
      className="vcard-mobile-bottom-modal industry-vcard-mobile-modal site-modal-backdrop fixed inset-0 flex items-end justify-center bg-black/92 backdrop-blur-xl"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${industryName} live vCard preview`}
        onClick={(e) => e.stopPropagation()}
        className="site-modal-panel site-modal-panel--sheet relative flex w-full max-w-[460px] max-h-[min(98dvh,900px)] flex-col overflow-hidden rounded-t-[1.75rem] border border-white/10 border-b-0 bg-brand-surface shadow-[0_-12px_40px_rgba(0,0,0,0.65)] pointer-events-auto"
      >
        <div className="shrink-0 flex justify-center pt-3 pb-1" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <div className="shrink-0 flex items-center justify-between gap-3 px-4 pb-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-neutral-300 transition-colors hover:text-white active:scale-95"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <VCardInteractiveLane className="w-full h-full flex flex-col items-center">
            <div className="relative w-full max-w-[407px] mx-auto h-full">
              <PhoneMockupFrame
                key={src}
                src={src}
                title={title}
                size="modal"
                iframeLoading="eager"
                {...VCARD_MOBILE_FRAME_LOADER}
              />
            </div>
          </VCardInteractiveLane>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Open live ${industryName} vCard preview`}
        className={`industry-vcard-mobile-launch group relative w-full max-w-[407px] mx-auto rounded-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark transition-shadow duration-500 ${
          highlighted ? 'ring-2 ring-brand-gold/70 shadow-[0_0_0_6px_rgba(212,175,55,0.15)]' : ''
        }`}
      >
        <PhoneMockupFrame
          src=""
          title={title}
          previewImage={previewImage}
          previewIsVideo={previewIsVideo}
          live={false}
          size="hero"
          className="pointer-events-none select-none"
        />

        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 rounded-[48px] bg-brand-dark/55 backdrop-blur-[2px] border border-brand-gold/25 transition-colors group-hover:bg-brand-dark/45 group-active:scale-[0.99]"
          aria-hidden="true"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/15 border border-brand-gold/35 text-brand-gold shadow-[0_0_24px_rgba(212,175,55,0.2)] animate-pulse">
            <Smartphone size={26} strokeWidth={1.75} />
          </span>
          <span className="text-sm font-semibold text-white tracking-wide">Tap to open live preview</span>
          <span className="text-[11px] text-brand-text-muted font-light px-6 text-center leading-snug">
            Brief loader while your selected vCard connects
          </span>
        </div>

        <span className="absolute top-5 left-5 z-20 rounded-full border border-brand-gold/30 bg-brand-dark/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-gold pointer-events-none">
          {industryName}
        </span>
      </button>

      <div className="mt-4 flex items-start gap-2.5 max-w-[407px] mx-auto rounded-xl border border-brand-gold/20 bg-brand-gold/[0.04] px-3.5 py-3 text-left">
        <Hand size={16} className="text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-[11px] text-brand-text-muted font-light leading-relaxed">
          <span className="text-brand-text font-medium">Tip:</span> choose an industry tile first, then tap the phone
          to open the live frame with a short preloader.
        </p>
      </div>

      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
