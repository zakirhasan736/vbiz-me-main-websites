'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Pause, Play, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { FOUNDER_INTRO_VIDEO } from '@/lib/site-assets';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import { buildHeroVideoTimeline, prefersReducedMotion } from '@/lib/hero-gsap-animation';

function isVideoReadyToPlay(video: HTMLVideoElement) {
  return video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

/** CSR hero video — slides in from the right, then autoplays once entrance + buffer are ready. */
export default function HeroVideoShowcase() {
  const { animateReady, animationKey } = useHeroAnimateReady();
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [entranceDone, setEntranceDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const showVideo = entranceDone && videoReady;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !animateReady) return;

    setVideoReady(isVideoReadyToPlay(video));

    const markReady = () => setVideoReady(true);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);

    video.preload = 'auto';
    video.load();

    return () => {
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
    };
  }, [animateReady, animationKey]);

  useGSAP(
    () => {
      if (!animateReady || !rootRef.current) return;

      setEntranceDone(false);
      setIsPlaying(false);
      timelineRef.current?.kill();

      const reduced = prefersReducedMotion();
      timelineRef.current = buildHeroVideoTimeline(rootRef.current, reduced);

      if (reduced) {
        setEntranceDone(true);
      } else {
        timelineRef.current.eventCallback('onComplete', () => {
          setEntranceDone(true);
        });
      }

      return () => {
        timelineRef.current?.kill();
        timelineRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [animateReady, animationKey] },
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    video.defaultMuted = true;
    video.muted = isMuted;
    setIsPlaying(true);

    video.play().catch(() => {
      setIsPlaying(false);
    });
  }, [showVideo, isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [showVideo, isPlaying, isMuted]);

  return (
    <div
      ref={rootRef}
      className="hero-banner-right lg:col-span-6 flex justify-center lg:justify-end relative md:pr-4 w-full"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,380px)] aspect-square bg-brand-gold/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[min(100%,250px)] aspect-square bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="hero-video-enter hero-video-await relative w-full max-w-[620px] bg-brand-surface/75 rounded-2xl border border-emerald-500/15 group shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(16,185,129,0.08)] overflow-hidden z-10 will-change-transform">
        <div className="relative w-full aspect-video bg-brand-deep">
          <div className="absolute top-0 inset-x-0 h-10 sm:h-12 bg-gradient-to-b from-black/80 to-transparent z-20 px-3 sm:px-4 flex items-center justify-between text-[9px] sm:text-[10px] text-white/60 font-mono tracking-widest uppercase">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Demo
            </span>
            <span className="text-brand-gold font-semibold hidden sm:inline">Widescreen Feature Presentation</span>
          </div>

          <video
            ref={videoRef}
            src={FOUNDER_INTRO_VIDEO}
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden={!showVideo}
            aria-label={showVideo ? 'Founder introduction demo video' : undefined}
            className={`absolute inset-0 w-full h-full object-contain bg-brand-deep transition-opacity duration-500 ${
              showVideo ? (isPlaying ? 'opacity-100' : 'opacity-30') : 'opacity-0 invisible'
            }`}
          >
            <track kind="captions" srcLang="en" label="English" src="/captions/hero-demo.vtt" />
          </video>

          {!showVideo && (
            <div className="absolute inset-0 bg-brand-deep z-[1]" aria-hidden="true" />
          )}

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-30 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              disabled={!showVideo}
              className="w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:bg-black/90 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-sm disabled:opacity-40"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
            <button
              type="button"
              onClick={() => showVideo && setIsPlaying(!isPlaying)}
              disabled={!showVideo}
              className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-black hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer shadow-lg disabled:opacity-40"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
            </button>
          </div>

          <div className="absolute hidden bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-xl transition-all duration-300 group-hover:border-brand-gold/30">
              <div className="flex items-center gap-1 text-[8px] uppercase tracking-wider text-brand-gold font-bold mb-1">
                <Sparkles size={8} aria-hidden="true" /> Elevated Networking
              </div>
              <p className="text-[11px] text-white/90 font-medium leading-normal italic">
                &ldquo;Watch a vCard capture immediate context, engaging connections instantly.&rdquo;
              </p>
            </div>
          </div>

          {showVideo && !isPlaying && (
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

        <div
          className="hero-video-chrome p-3 sm:p-4 bg-neutral-950/90 backdrop-blur-xl border-t border-white/15 flex gap-2.5 items-center"
          aria-hidden="true"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-gold/30 relative bg-neutral-800 shrink-0" />
          <div className="flex-grow min-w-0">
            <p className="hero-video-chrome__name text-[11px] font-semibold text-white truncate tracking-wide">
              Michael Casanova
            </p>
            <p className="hero-video-chrome__role text-[9px] text-neutral-300 font-light truncate">
              Hartford Motors Advisor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
