'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, ArrowLeft } from 'lucide-react';
import { VCardInteractiveLane } from '@/components/VCardInteractiveLane';
import { PhoneMockupFrame } from '@/components/PhoneMockupFrame';
import { LazyQRCodeImage } from '@/components/LazyQRCodeImage';
import { getPortfolioQrImageSrc, type PortfolioQrCard } from '@/lib/portfolio-qr-cards';
import { VCARD_MOBILE_FRAME_LOADER, VCARD_SILENT_PRELOAD } from '@/lib/vcard-mobile-loader';
import { VCardShortPhoneLoader } from '@/components/VCardShortPhoneLoader';
import { lockDocumentScroll, unlockDocumentScroll } from '@/lib/scroll-utils';
import { useMobileViewport } from '@/lib/use-mobile-viewport';

type ModalView = 'qr' | 'live';

interface PortfolioVCardModalProps {
  card: PortfolioQrCard | null;
  isOpen: boolean;
  onClose: () => void;
  modalId?: string;
}

export function PortfolioVCardModal({
  card,
  isOpen,
  onClose,
  modalId = 'portfolio-vcard',
}: PortfolioVCardModalProps) {
  const [view, setView] = useState<ModalView>('qr');
  const [mounted, setMounted] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const isMobileSheet = useMobileViewport();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) setView('qr');
  }, [isOpen]);

  useEffect(() => {
    setView('qr');
    setIframeReady(false);
  }, [card?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (view === 'live' && !isMobileSheet) setView('qr');
      else onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, view, onClose, isMobileSheet]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('vcard-demo-modal-open');
    lockDocumentScroll();
    return () => {
      document.body.classList.remove('vcard-demo-modal-open');
      unlockDocumentScroll();
    };
  }, [isOpen]);

  if (!card || !mounted) return null;

  const qrBgColor = 'ffffff';

  const livePhone = (
    <VCardInteractiveLane className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-[407px] mx-auto">
        {view === 'live' && !iframeReady ? <VCardShortPhoneLoader /> : null}
        <PhoneMockupFrame
          src={card.demoUrl}
          title={`${card.displayName} Live View`}
          size="modal"
          iframeLoading="eager"
          {...(view === 'live' ? VCARD_MOBILE_FRAME_LOADER : VCARD_SILENT_PRELOAD)}
          onLoadingChange={(loading) => {
            if (!loading) setIframeReady(true);
          }}
        />
      </div>
    </VCardInteractiveLane>
  );

  const liveDemoPanel = (
    <div
      className={
        view === 'live'
          ? `flex flex-col items-center w-full ${isMobileSheet ? 'items-stretch pt-1' : 'pt-2'}`
          : 'fixed left-[-9999px] top-0 h-[640px] w-[407px] overflow-hidden opacity-0 pointer-events-none'
      }
      aria-hidden={view !== 'live'}
    >
      {view === 'live' && isMobileSheet ? (
        <button
          type="button"
          onClick={() => setView('qr')}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          id={`${modalId}-back-btn`}
        >
          <ArrowLeft size={16} />
          Back to QR
        </button>
      ) : null}

      {view === 'live' ? (
        <>
          <h3
            id={view === 'live' ? `${modalId}-title` : undefined}
            className={`text-white font-bold tracking-tight ${isMobileSheet ? 'text-lg mb-1' : 'text-xl mb-2 mt-6'}`}
          >
            {card.displayName} Live View
          </h3>
          <p className="text-neutral-400 font-light text-base leading-relaxed px-2 max-w-sm mb-5">
            Scroll inside the phone to explore the live vCard.
          </p>
        </>
      ) : null}

      {livePhone}
    </div>
  );

  const qrContent = (
    <>
      <div className="w-full aspect-square bg-white p-3 sm:p-4 rounded-3xl relative overflow-hidden flex items-center justify-center mx-auto mb-5 max-w-[220px] border border-neutral-100 shadow-[0_15px_35px_rgba(0,0,0,0.15)] mt-2">
        <div
          className="w-full h-full rounded-2xl overflow-hidden relative bg-white"
          style={{ backgroundColor: `#${qrBgColor}` }}
        >
          <LazyQRCodeImage
            src={getPortfolioQrImageSrc(card)}
            alt={`QR Code — ${card.displayName}`}
            className="w-full h-full object-contain"
            bgcolor={qrBgColor}
          />
        </div>
      </div>

      <h3 id={view === 'qr' ? `${modalId}-title` : undefined} className="text-white font-bold text-xl mb-2 tracking-tight">
        {card.displayName}
      </h3>
      <p className="text-neutral-400 font-light text-base leading-relaxed px-4 mb-6">
        Scan this QR code or tap below to open the live vCard preview.
      </p>

      <button
        type="button"
        onClick={() => setView('live')}
        className="bg-brand-gold hover:bg-yellow-400 text-black font-semibold text-sm py-3.5 px-8 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] active:scale-95 duration-300 mx-auto w-full max-w-[280px] cursor-pointer"
        id={`${modalId}-visit-btn`}
      >
        <ExternalLink size={16} />
        View Demo Card
      </button>
    </>
  );

  const mobileBottomClose = (
    <div className="shrink-0 border-t border-white/10 bg-brand-surface px-4 pt-1.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold py-2.5 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-transform active:scale-[0.98]"
      >
        <X size={16} aria-hidden="true" />
        Close preview
      </button>
    </div>
  );

  const modal = isOpen ? (
    <div
      onClick={onClose}
      className={
        isMobileSheet
          ? 'vcard-mobile-bottom-modal portfolio-vcard-modal-backdrop site-modal-backdrop fixed inset-0 flex items-end justify-center bg-black/92 backdrop-blur-xl'
          : 'portfolio-vcard-modal-backdrop site-modal-backdrop fixed inset-0 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl'
      }
      id={`${modalId}-backdrop`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${modalId}-title`}
        onClick={(e) => e.stopPropagation()}
        className={
          isMobileSheet
            ? `portfolio-vcard-modal site-modal-panel site-modal-panel--sheet relative flex w-full max-w-[460px] max-h-[min(95dvh,820px)] flex-col overflow-hidden rounded-t-[1.75rem] border border-white/10 border-b-0 bg-brand-surface shadow-[0_-12px_40px_rgba(0,0,0,0.65)] pointer-events-auto ${
                view === 'live' ? '' : 'text-center'
              }`
            : `portfolio-vcard-modal site-modal-panel relative w-full max-h-[95vh] overflow-y-auto rounded-[2.5rem] border border-white/10 bg-brand-surface px-4 py-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto md:px-6 md:py-8 ${
                view === 'live' ? 'max-w-[460px]' : 'max-w-[400px]'
              }`
        }
        id={`${modalId}-modal`}
        data-lenis-prevent
        data-lenis-prevent-touch
      >
        {!isMobileSheet && (
          <>
            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 bg-brand-gold/5 blur-[50px]" />
            {view === 'live' && (
              <button
                type="button"
                onClick={() => setView('qr')}
                className="absolute top-5 left-5 z-50 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                id={`${modalId}-back-btn`}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-neutral-400 transition-transform hover:text-white active:scale-90"
              id={`${modalId}-close-btn`}
            >
              <X size={14} />
            </button>
          </>
        )}

        {isMobileSheet && (
          <div className="flex shrink-0 justify-center pb-1 pt-3" aria-hidden="true">
            <span className="h-1 w-10 rounded-full bg-white/20" />
          </div>
        )}

        <div
          className={
            isMobileSheet
              ? `min-h-0 flex-1 overflow-y-auto px-4 pb-3 ${view === 'live' ? 'text-left' : 'text-center'}`
              : 'flex flex-col items-center'
          }
        >
          {liveDemoPanel}
          {view === 'qr' ? <div className="flex flex-col items-center">{qrContent}</div> : null}
        </div>

        {isMobileSheet ? mobileBottomClose : null}
      </div>
    </div>
  ) : null;

  return createPortal(modal, document.body);
}
