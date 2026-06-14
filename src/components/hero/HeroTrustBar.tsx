'use client';

import { motion } from 'motion/react';

export function HeroTrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className="w-full border-t border-b border-white/5 bg-neutral-950/40 backdrop-blur-md py-6 z-10 relative"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
          Trusted by top professionals at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-neutral-400 text-sm font-medium">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> Kia of East Hartford
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> Subaru of Hartford
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> Gallagher Buick/GMC
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors hidden sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> and growing businesses across
            Connecticut
          </div>
        </div>
      </div>
    </motion.div>
  );
}
