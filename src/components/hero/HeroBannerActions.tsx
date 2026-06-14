'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, X } from 'lucide-react';

/** Client island — competitive analysis popup only (banner text stays SSR). */
export function HeroBannerActions() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="border border-white/10 bg-white/5 text-white font-medium h-14 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-colors w-full sm:w-auto text-sm shrink-0"
      >
        <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <BarChart size={12} className="text-brand-gold" aria-hidden="true" />
        </span>
        See How We Beat The Competition
      </button>

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPopupOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-6 px-4 md:py-8 md:px-6"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2.5 rounded bg-brand-gold/15 text-brand-gold text-[10px] font-bold uppercase tracking-wider">
                    Competitive Analysis
                  </span>
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    vBiz Me vs. Legacy Cards
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full bg-black/30 rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                <img
                  src="https://www.vbizme.com/wp-content/uploads/2026/04/vBiz-Me-Competative-Analysis.png"
                  alt="vBiz-Me Competitive Analysis Layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <p className="text-neutral-500 font-light text-center sm:text-left">
                  Designed to transform standard handshakes into premium sales opportunities.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPopupOpen(false)}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href="/contact"
                    className="px-5 py-2 rounded-full bg-brand-gold text-black font-semibold hover:bg-yellow-400 transition-colors"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    Take Action Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
