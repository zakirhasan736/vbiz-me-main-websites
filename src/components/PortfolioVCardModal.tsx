'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ArrowLeft } from 'lucide-react';
import { VCardInteractiveLane } from '@/components/VCardInteractiveLane';
import { DeferredPhoneMockupFrame } from '@/components/DeferredPhoneMockupFrame';
import { LazyQRCodeImage } from '@/components/LazyQRCodeImage';
import { getPortfolioQrImageSrc, type PortfolioQrCard } from '@/lib/portfolio-qr-cards';

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

  useEffect(() => {
    if (!isOpen) setView('qr');
  }, [isOpen]);

  useEffect(() => {
    setView('qr');
  }, [card?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (view === 'live') setView('qr');
      else onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, view, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!card) return null;

  const qrBgColor = 'ffffff';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          id={`${modalId}-backdrop`}
          data-lenis-prevent
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${modalId}-title`}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`portfolio-vcard-modal relative w-full bg-brand-surface border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.9)] py-6 px-4 md:py-8 md:px-6 overflow-hidden flex flex-col text-center transition-all duration-300 pointer-events-auto max-h-[95vh] overflow-y-auto ${
              view === 'live' ? 'max-w-[460px]' : 'max-w-[400px]'
            }`}
            id={`${modalId}-modal`}
            data-lenis-prevent
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[50px] pointer-events-none" />

            {view === 'live' && (
              <button
                type="button"
                onClick={() => setView('qr')}
                className="absolute top-5 left-5 z-50 inline-flex items-center gap-1.5 text-neutral-400 hover:text-white text-sm font-medium transition-colors cursor-pointer"
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
              className="absolute top-5 right-5 z-50 w-8 h-8 rounded-full bg-black/60 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
              id={`${modalId}-close-btn`}
            >
              <X size={14} />
            </button>

            <AnimatePresence mode="wait">
              {view === 'qr' ? (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center"
                >
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

                  <h3
                    id={`${modalId}-title`}
                    className="text-white font-bold text-xl mb-2 tracking-tight"
                  >
                    {card.displayName}
                  </h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed px-4 mb-6">
                    Scan this QR code or click the button below to view the responsive vCard
                    experience on your mobile device.
                  </p>

                  <button
                    type="button"
                    onClick={() => setView('live')}
                    className="bg-brand-gold hover:bg-yellow-400 text-black font-semibold text-sm py-3.5 px-8 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] active:scale-95 duration-300 mx-auto w-full max-w-[280px] cursor-pointer"
                    id={`${modalId}-visit-btn`}
                  >
                    <ExternalLink size={16} />
                    Visit Demo Card
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center pt-2"
                >
                  <h3
                    id={`${modalId}-title`}
                    className="text-white font-bold text-xl mb-2 tracking-tight mt-6"
                  >
                    {card.displayName} Live View
                  </h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed px-2 mb-5 max-w-sm">
                    Interact with the live digital business card mockup below inside this secure
                    preview frame.
                  </p>

                  <VCardInteractiveLane className="w-full flex flex-col items-center">
                    <DeferredPhoneMockupFrame
                      src={card.demoUrl}
                      title={`${card.displayName} Live View`}
                      size="modal"
                      requireInView={false}
                    />
                  </VCardInteractiveLane>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
