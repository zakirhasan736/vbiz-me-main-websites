'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Pause, Play, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { usePageTransition } from '@/components/providers/page-transition-context';
import { FOUNDER_INTRO_VIDEO } from '@/lib/site-assets';

/** CSR-only hero video showcase — does not block SSR banner / LCP. */
export default function HeroVideoShowcase() {
  const { revealReady } = usePageTransition();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = isMuted;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, isMuted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={revealReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-5 flex justify-center lg:justify-end relative md:pr-4 w-full min-h-[460px] sm:min-h-[540px] lg:min-h-[580px]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-brand-gold/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-[620px] h-[460px] sm:h-[540px] lg:h-[580px] bg-neutral-950/70 backdrop-blur-md rounded-2xl border border-white/10 hover:border-brand-gold/30 transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.05)] overflow-hidden z-10 flex flex-col">
        <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/80 to-transparent z-20 px-4 flex items-center justify-between text-[10px] text-white/60 font-mono tracking-widest uppercase">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Live Demo
          </span>
          <span className="text-brand-gold font-semibold">Widescreen Feature Presentation</span>
        </div>

        <video
          ref={videoRef}
          src={FOUNDER_INTRO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedMetadata={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          className={`absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-700 ${isPlaying ? 'opacity-95' : 'opacity-30'}`}
        />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-neutral-950/80 to-transparent pointer-events-none z-10" />

        <div className="absolute top-4 right-4 flex items-center gap-2 z-30 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:bg-black/90 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-black hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer shadow-lg"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
          </button>
        </div>

        <div className="absolute bottom-20 left-4 right-4 z-20">
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-xl transition-all duration-300 group-hover:border-brand-gold/30">
            <div className="flex items-center gap-1 text-[8px] uppercase tracking-wider text-brand-gold font-bold mb-1">
              <Sparkles size={8} aria-hidden="true" /> Elevated Networking
            </div>
            <p className="text-[11px] text-white/90 font-medium leading-normal italic">
              &ldquo;Watch a vCard capture immediate context, engaging connections instantly.&rdquo;
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 p-4 bg-neutral-950/90 backdrop-blur-xl border-t border-white/15 flex gap-2.5 items-center z-20"
          aria-hidden="true"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-gold/30 relative bg-neutral-800" />
          <div className="flex-grow min-w-0">
            <p className="text-[11px] font-semibold text-white truncate tracking-wide">Michael Casanova</p>
            <p className="text-[9px] text-neutral-400 font-light truncate">Hartford Motors Advisor</p>
          </div>
        </div>

        {!isPlaying && (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full bg-black/60 flex items-center justify-center z-20 transition-colors cursor-pointer border-none outline-none"
            aria-label="Play demo video"
          >
            <div className="w-14 h-14 rounded-full bg-brand-gold/95 flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
              <Play size={20} fill="currentColor" className="ml-1 text-black" />
            </div>
          </button>
        )}
      </div>
    </motion.div>
  );
}
