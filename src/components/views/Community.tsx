'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Search, Grid,
  Sparkles, Check,
  X, Compass, Sun, Moon, ArrowRight,
  LayoutList, ChevronLeft, ChevronRight, Loader2,
} from 'lucide-react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { useTheme } from '@/components/providers/theme-provider';
import { usePublicCardsDirectory } from '@/hooks/usePublicCardsDirectory';
import { getPublicCardProfileUrl } from '@/lib/publicCards/fetchPublicCards';
import type { PublicCardListItem } from '@/lib/publicCards/mapPublicCards';
import {
  PUBLIC_CARDS_SEARCH_DEBOUNCE_MS,
  PUBLIC_CARDS_SEARCH_MIN_CHARS,
} from '@/lib/publicCards/publicCardsSearch';

/** Portrait crop — slider uses centered framing; grid keeps top anchor for headshots. */
const CONNECTION_CARD_MEDIA_FIT = 'object-cover object-top origin-top';
const CONNECTION_CARD_MEDIA_FIT_CENTER = 'object-cover object-center origin-center';

/** Shared card proportions — ~72% of height is photo/video for face visibility. */
const COMMUNITY_CARD = {
  gridHeight: 'h-[480px] sm:h-[520px]',
  slider: {
    stageH: { mobile: 390, desktop: 520 },
    card: { w: { mobile: 228, desktop: 308 }, h: { mobile: 368, desktop: 488 } },
    mediaH: { mobile: 268, desktop: 352 },
    footerH: { mobile: 100, desktop: 136 },
  },
} as const;

const CARD_MEDIA_HOVER = 'grayscale-[10%] transition-all duration-700 group-hover/card:scale-[1.02] group-hover/card:grayscale-0';

/** Snappy 3D slide — cinematic but responsive. */
const SLIDER_SPRING = { type: 'spring' as const, damping: 30, stiffness: 420, mass: 0.72 };

function PublicCardPhoto({
  card,
  className = '',
  imageClassName = '',
  onMediaReady,
  mediaFit = CONNECTION_CARD_MEDIA_FIT,
}: {
  card: PublicCardListItem;
  className?: string;
  imageClassName?: string;
  onMediaReady?: () => void;
  mediaFit?: string;
}) {
  useEffect(() => {
    if (!card.img) onMediaReady?.();
  }, [card.img, onMediaReady]);

  if (card.img && card.isVideo) {
    return (
      <video
        src={card.img}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={onMediaReady}
        onCanPlay={onMediaReady}
        className={`h-full w-full ${mediaFit} ${imageClassName} ${className}`}
        aria-label={card.name}
      />
    );
  }

  if (card.img) {
    return (
      <img
        src={card.img}
        alt={card.name}
        onLoad={onMediaReady}
        className={`h-full w-full ${mediaFit} ${imageClassName} ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 ${className}`}
      aria-hidden
    >
      <span className="text-3xl font-black tracking-tight text-brand-gold md:text-4xl">{card.initials}</span>
    </div>
  );
}

function connectionCardShell(isDarkMode: boolean) {
  return isDarkMode
    ? 'group/card relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#08080C] shadow-xl transition-colors duration-300 md:rounded-3xl hover:border-brand-gold/30'
    : 'group/card relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl transition-colors duration-300 md:rounded-3xl hover:border-brand-gold/45';
}

function ConnectionCardInner({
  card,
  isDarkMode,
  onViewProfile,
}: {
  card: PublicCardListItem;
  isDarkMode: boolean;
  onViewProfile: () => void;
}) {
  return (
    <>
      <div className="relative min-h-[68%] flex-1 overflow-hidden bg-neutral-950">
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[38%] bg-gradient-to-t ${
            isDarkMode ? 'from-[#08080C] via-[#08080C]/50' : 'from-white via-white/40'
          } to-transparent`}
        />
        <PublicCardPhoto card={card} imageClassName={CARD_MEDIA_HOVER} />
      </div>

      <div className={`relative z-20 flex shrink-0 flex-col items-center gap-2 px-4 pt-2.5 pb-4 text-center md:gap-2.5 md:px-5 md:pb-4 ${
        isDarkMode ? 'bg-[#08080C]' : 'bg-white'
      }`}>
        <div className="w-full">
          <h3 className={`w-full truncate text-base font-bold md:text-lg ${isDarkMode ? 'text-white' : 'text-neutral-900'}`} title={card.name}>
            {card.name}
          </h3>
          <div className={`mt-1.5 inline-flex max-w-full items-center gap-1.5 truncate rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
            isDarkMode
              ? 'border-white/10 bg-black/40 text-brand-gold'
              : 'border-brand-gold/25 bg-brand-gold/[0.06] text-amber-900'
          }`}>
            <Briefcase size={10} /> {card.profession ?? 'Professional'}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile();
          }}
          className={`flex w-full items-center justify-center rounded-xl border py-2.5 text-xs font-bold shadow-sm transition-all group-hover/card:bg-brand-gold group-hover/card:text-black active:scale-95 ${
            isDarkMode
              ? 'border-white/15 bg-neutral-800 text-white hover:bg-neutral-700'
              : 'border-neutral-200 bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
          }`}
        >
          View Profile
        </button>
      </div>
    </>
  );
}

export default function Community() {
  const {
    cards,
    dropdowns,
    draftFilters,
    isLoading,
    isSearching,
    isLoadingMore,
    isPrefetchingAll,
    error,
    hasMore,
    serverTotal,
    setDraftFilter,
    updateAndApplyFilter,
    clearFilters,
    loadMore,
    refetch,
  } = usePublicCardsDirectory();

  const serviceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Theme is driven by the global provider (keeps navbar in sync). The header
  // toggle below flips between the dark (midnight) and light themes.
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme !== 'light';
  const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'midnight');

  // View mode state (grid vs slider)
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('slider');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const loadedMediaRef = useRef<Set<string>>(new Set());
  const [, bumpMediaLoaded] = useState(0);

  const professions = dropdowns.professions ?? [];
  const states = dropdowns.states ?? [];
  const cities = dropdowns.cities ?? [];

  useEffect(() => {
    return () => {
      if (serviceDebounceRef.current) clearTimeout(serviceDebounceRef.current);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keep the slider index in range whenever the result set changes.
  useEffect(() => {
    if (activeIndex >= cards.length) {
      setActiveIndex(Math.max(0, cards.length - 1));
    }
  }, [cards, activeIndex]);

  const nextCard = useCallback(() => {
    if (cards.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevCard = useCallback(() => {
    if (cards.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const markMediaLoaded = useCallback((url: string) => {
    if (loadedMediaRef.current.has(url)) return;
    loadedMediaRef.current.add(url);
    bumpMediaLoaded((n) => n + 1);
  }, []);

  const isMediaReady = useCallback((url: string | null | undefined) => {
    return !url || loadedMediaRef.current.has(url);
  }, []);

  const handleServiceChange = useCallback(
    (value: string) => {
      setDraftFilter('service', value);
      if (serviceDebounceRef.current) clearTimeout(serviceDebounceRef.current);
      serviceDebounceRef.current = setTimeout(() => {
        const trimmed = value.trim();
        if (trimmed.length > 0 && trimmed.length < PUBLIC_CARDS_SEARCH_MIN_CHARS) return;
        updateAndApplyFilter('service', value);
        setActiveIndex(0);
      }, PUBLIC_CARDS_SEARCH_DEBOUNCE_MS);
    },
    [setDraftFilter, updateAndApplyFilter]
  );

  const handleStateChange = useCallback(
    (stateId: number | null) => {
      updateAndApplyFilter('stateId', stateId);
      setActiveIndex(0);
    },
    [updateAndApplyFilter]
  );

  const handleCityChange = useCallback(
    (cityId: number | null) => {
      updateAndApplyFilter('cityId', cityId);
      setActiveIndex(0);
    },
    [updateAndApplyFilter]
  );

  const handleProfessionChange = useCallback(
    (professionId: number | null) => {
      updateAndApplyFilter('professionId', professionId);
      setActiveIndex(0);
    },
    [updateAndApplyFilter]
  );

  const handleResetFilters = useCallback(() => {
    clearFilters();
    setActiveIndex(0);
  }, [clearFilters]);

  const openLiveCard = useCallback((card: PublicCardListItem) => {
    window.open(getPublicCardProfileUrl(card), '_blank', 'noopener,noreferrer');
  }, []);

  const sliderActiveIndex = cards.length === 0 ? 0 : Math.min(activeIndex, cards.length - 1);

  // Prefetch neighbor card photos so slides feel instant after the first view.
  useEffect(() => {
    if (viewMode !== 'slider' || cards.length === 0) return;

    [-1, 0, 1, 2].forEach((offset) => {
      const card = cards[sliderActiveIndex + offset];
      const url = card?.img;
      if (!url || card.isVideo || loadedMediaRef.current.has(url)) return;

      const img = new window.Image();
      img.referrerPolicy = 'no-referrer';
      img.onload = () => markMediaLoaded(url);
      img.onerror = () => markMediaLoaded(url);
      img.src = url;
    });
  }, [cards, markMediaLoaded, sliderActiveIndex, viewMode]);

  useEffect(() => {
    if (viewMode !== 'slider' || !hasMore || isLoadingMore || isPrefetchingAll) return;
    if (sliderActiveIndex >= cards.length - 2) {
      void loadMore();
    }
  }, [cards.length, hasMore, isLoadingMore, isPrefetchingAll, loadMore, sliderActiveIndex, viewMode]);

  const showInitialLoader = isLoading && cards.length === 0;
  const showEmptyState = !isLoading && !isPrefetchingAll && !error && cards.length === 0;
  const showError = !!error && cards.length === 0;

  return (
    <div className={`min-h-screen pt-26 pb-0 overflow-x-hidden relative transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-[#030303] text-white' : 'bg-[#FAF8F5] text-neutral-900'
    }`}>
      {/* Decorative Luxury Brand Spotlights */}
      {isDarkMode ? (
        <>
          <div className="absolute top-[-5%] left-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[160px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute top-[30%] right-1/4 w-[500px] h-[500px] bg-brand-gold/[0.03] blur-[180px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-[-5%] left-1/3 w-[600px] h-[600px] bg-brand-gold/[0.04] blur-[200px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
        </>
      ) : (
        <>
          <div className="absolute top-[-5%] left-1/4 w-[600px] h-[600px] bg-brand-gold/[0.05] blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-[30%] right-1/4 w-[500px] h-[500px] bg-brand-gold/[0.02] blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-5%] left-1/3 w-[600px] h-[600px] bg-brand-gold/[0.03] blur-[180px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
        </>
      )}

      {/* Main Spacious Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-4 md:gap-6 py-4 md:py-6">

        {/* Elite Premium Header Area */}
        <div className="flex flex-col items-center justify-center text-center gap-3 md:gap-4 relative pt-2 md:pt-4">
          <div className="absolute -top-10 w-96 h-96 bg-brand-gold/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="text-center flex flex-col items-center justify-center w-full relative z-10">
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-2 px-4.5 py-2 rounded-full border text-[9px] font-mono font-bold tracking-[0.25em] uppercase shadow-sm ${
                  isDarkMode
                    ? 'border-brand-gold/20 bg-brand-gold/[0.05] text-brand-gold'
                    : 'border-brand-gold/30 bg-brand-gold/[0.08] text-amber-900'
                }`}
              >
                <Sparkles size={11} className="text-brand-gold animate-pulse" />
                <span>Verified Elite Circle</span>
              </motion.div>

            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-4 max-w-4xl mx-auto leading-[1.15]">
              Discover Our Exclusive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-600 font-extrabold">vBiz Me Executive Network</span>
            </h1>

            <p className={`font-light text-sm sm:text-base max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              Connect seamlessly with luxury entrepreneurs, elite advisors, and executive coaches using our high-speed, immersive, interactive digital smart vCards.
            </p>
          </div>
        </div>

        {/* Smart Unified Control Center (Analytics + Filters) */}
        <div className={`p-2.5 md:p-5 rounded-2xl md:rounded-[2rem] border transition-all duration-300 max-w-4xl mx-auto w-full flex flex-col gap-2.5 md:gap-4 ${
          isDarkMode
            ? 'border-white/5 bg-[#09090C]/90 backdrop-blur-md shadow-2xl'
            : 'border-neutral-200/80 bg-white/95 backdrop-blur-md shadow-lg'
        }`}>
          {/* Top Row: Elite Network Analytics Tracker */}
          <div className={`hidden md:flex flex-wrap justify-between items-center gap-4 px-2 pb-3 md:pb-4 border-b ${
            isDarkMode ? 'border-white/5' : 'border-neutral-200/60'
          }`}>
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-bold tracking-tight text-brand-gold">{serverTotal > 0 ? `${serverTotal}+` : '—'}</span>
              <span className={`text-[8.5px] font-mono tracking-widest uppercase ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Verified Leaders</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-bold tracking-tight text-brand-gold">$42M+</span>
              <span className={`text-[8.5px] font-mono tracking-widest uppercase ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Advisory Sphere</span>
            </div>
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-lg font-bold tracking-tight text-brand-gold">12.5K+</span>
              <span className={`text-[8.5px] font-mono tracking-widest uppercase ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Connections Enabled</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-bold tracking-tight text-brand-gold">99.9%</span>
              <span className={`text-[8.5px] font-mono tracking-widest uppercase ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>vCard Uptime</span>
            </div>
          </div>

          {/* Middle Row: Search & Dropdowns */}
          <div className="flex flex-col md:flex-row gap-2.5 md:gap-3.5 items-stretch md:items-center">

            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className={`absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-4.5 md:h-4.5 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
              <input
                type="text"
                value={draftFilters.service}
                onChange={(e) => handleServiceChange(e.target.value)}
                placeholder={`Search name, profession, city, state (${PUBLIC_CARDS_SEARCH_MIN_CHARS}+ letters)…`}
                className={`w-full border rounded-xl py-2.5 md:py-3 pl-10 md:pl-12 pr-10 text-xs font-semibold focus:outline-none focus:border-brand-gold/40 focus:ring-1 focus:ring-brand-gold/40 transition-all ${
                  isDarkMode
                    ? 'bg-neutral-950 border-white/10 text-neutral-200 placeholder-neutral-500'
                    : 'bg-neutral-50 border-neutral-200/80 text-neutral-800 placeholder-neutral-400'
                }`}
              />
              {isSearching ? (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold animate-spin" />
              ) : draftFilters.service ? (
                <button
                  type="button"
                  onClick={() => handleServiceChange('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                >
                  <X size={15} />
                </button>
              ) : null}
            </div>

            {/* Dropdowns — compact grid on mobile to save vertical space */}
            <div className="grid grid-cols-3 gap-2 md:contents">
              {/* Profession Dropdown Selector */}
              <div className="relative w-full md:w-44">
                <select
                  value={draftFilters.professionId ?? ''}
                  onChange={(e) => handleProfessionChange(e.target.value ? Number(e.target.value) : null)}
                  className={`w-full border rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 pr-7 md:pr-10 text-[10px] md:text-[11px] font-bold uppercase tracking-wide md:tracking-wider focus:outline-none focus:border-brand-gold/40 appearance-none cursor-pointer ${
                    isDarkMode
                      ? 'bg-neutral-950 border-white/10 text-neutral-300'
                      : 'bg-neutral-50 border-neutral-200/80 text-neutral-700'
                  }`}
                >
                  <option value="">All Professions</option>
                  {professions.map((prof) => (
                    <option key={prof.id} value={prof.id}>{prof.name}</option>
                  ))}
                </select>
                <div className="absolute right-2.5 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[9px] md:text-[10px]">▼</div>
              </div>

              {/* State dropdown selector */}
              <div className="relative w-full md:w-40">
                <select
                  value={draftFilters.stateId ?? ''}
                  onChange={(e) => handleStateChange(e.target.value ? Number(e.target.value) : null)}
                  className={`w-full border rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 pr-7 md:pr-10 text-[10px] md:text-[11px] font-bold uppercase tracking-wide md:tracking-wider focus:outline-none focus:border-brand-gold/40 appearance-none cursor-pointer ${
                    isDarkMode
                      ? 'bg-neutral-950 border-white/10 text-neutral-300'
                      : 'bg-neutral-50 border-neutral-200/80 text-neutral-700'
                  }`}
                >
                  <option value="">All States</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
                <div className="absolute right-2.5 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[9px] md:text-[10px]">▼</div>
              </div>

              {/* City dropdown selector (enabled after a state is chosen) */}
              <div className="relative w-full md:w-40">
                <select
                  value={draftFilters.cityId ?? ''}
                  disabled={!draftFilters.stateId}
                  onChange={(e) => handleCityChange(e.target.value ? Number(e.target.value) : null)}
                  className={`w-full border rounded-xl py-2.5 md:py-3.5 px-3 md:px-4 pr-7 md:pr-10 text-[10px] md:text-[11px] font-bold uppercase tracking-wide md:tracking-wider focus:outline-none focus:border-brand-gold/40 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'bg-neutral-950 border-white/10 text-neutral-300'
                      : 'bg-neutral-50 border-neutral-200/80 text-neutral-700'
                  }`}
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                <div className="absolute right-2.5 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[9px] md:text-[10px]">▼</div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Load More & View Mode Toggle */}
          <div className="flex items-center justify-between gap-3 pt-0.5">
            <div className="min-w-0">
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => void loadMore()}
                  disabled={isLoadingMore || isPrefetchingAll}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                    isDarkMode
                      ? 'border-brand-gold/30 bg-brand-gold/10 text-brand-gold hover:border-brand-gold/50'
                      : 'border-brand-gold/40 bg-brand-gold/10 text-amber-900 hover:border-brand-gold/60'
                  }`}
                >
                  {isLoadingMore || isPrefetchingAll ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : null}
                  Load more
                </button>
              ) : null}
            </div>

            {/* Toggle Slider vs Grid View */}
            <div className={`flex items-center p-0.5 rounded-xl border shrink-0 ${
              isDarkMode ? 'bg-neutral-950 border-white/5' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[8.5px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-brand-gold text-black font-black shadow-xs'
                    : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Grid size={10} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[8.5px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-brand-gold text-black font-black shadow-xs'
                    : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <LayoutList size={10} />
                <span>Slider</span>
              </button>
            </div>
          </div>
        </div>

        {/* Executive Cards View Area */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            {showInitialLoader ? (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 flex flex-col items-center justify-center"
              >
                <Loader2 size={34} className="text-brand-gold animate-spin mb-5" />
                <p className={`text-xs font-mono uppercase tracking-widest ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Loading executive network...
                </p>
              </motion.div>
            ) : showError ? (
              <motion.div
                key="error-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center py-20 flex flex-col items-center justify-center max-w-lg mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center mb-5 text-red-400">
                  <X size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unable to Load Members</h3>
                <p className={`font-light text-xs leading-relaxed mb-6 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {error}
                </p>
                <button
                  onClick={() => refetch()}
                  className="bg-brand-gold text-black font-bold py-3.5 px-8 rounded-xl text-[10px] uppercase tracking-wider transition-all duration-300 hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  Try Again
                </button>
              </motion.div>
            ) : showEmptyState ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center py-20 flex flex-col items-center justify-center max-w-lg mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/15 border border-brand-gold/25 flex items-center justify-center mb-5 text-brand-gold">
                  <Compass size={28} className="animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Elite Members Found</h3>
                <p className={`font-light text-xs leading-relaxed mb-6 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  We couldn&apos;t locate active professionals matching your search query. Try clearing filters or searching for another executive branch.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-brand-gold text-black font-bold py-3.5 px-8 rounded-xl text-[10px] uppercase tracking-wider transition-all duration-300 hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </motion.div>
            ) : viewMode === 'grid' ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: (idx % 8) * 0.08, ease: 'easeOut' }}
                    onClick={() => openLiveCard(card)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLiveCard(card);
                      }
                    }}
                    className={`${connectionCardShell(isDarkMode)} ${COMMUNITY_CARD.gridHeight} cursor-pointer`}
                  >
                    <ConnectionCardInner
                      card={card}
                      isDarkMode={isDarkMode}
                      onViewProfile={() => openLiveCard(card)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="slider-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="community-slider-3d relative flex min-h-[400px] flex-1 flex-col items-center justify-center perspective-[1600px] md:min-h-[540px]"
              >
                {/* Desktop floating arrows */}
                <div className="pointer-events-none absolute top-1/2 z-40 hidden w-full max-w-[1080px] -translate-y-1/2 justify-between px-2 md:flex">
                  <button
                    type="button"
                    onClick={prevCard}
                    disabled={cards.length <= 1}
                    className={`group pointer-events-auto flex h-12 w-12 items-center justify-center rounded-xl border shadow-lg backdrop-blur-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDarkMode
                        ? 'border-white/10 bg-black/80 text-white hover:bg-brand-gold hover:text-black'
                        : 'border-neutral-200 bg-white/95 text-neutral-800 hover:bg-brand-gold hover:text-black'
                    }`}
                    aria-label="Previous profile"
                  >
                    <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextCard}
                    disabled={cards.length <= 1}
                    className={`group pointer-events-auto flex h-12 w-12 items-center justify-center rounded-xl border shadow-lg backdrop-blur-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDarkMode
                        ? 'border-white/10 bg-black/80 text-white hover:bg-brand-gold hover:text-black'
                        : 'border-neutral-200 bg-white/95 text-neutral-800 hover:bg-brand-gold hover:text-black'
                    }`}
                    aria-label="Next profile"
                  >
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Swipeable draggable 3D card stack */}
                <motion.div
                  drag={cards.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    const threshold = 55;
                    if (info.offset.x < -threshold) nextCard();
                    else if (info.offset.x > threshold) prevCard();
                  }}
                  className="transform-style-3d relative flex w-full max-w-[1000px] cursor-grab items-center justify-center select-none active:cursor-grabbing"
                  style={{ height: isMobile ? COMMUNITY_CARD.slider.stageH.mobile : COMMUNITY_CARD.slider.stageH.desktop }}
                >
                  <AnimatePresence initial={false}>
                    {cards.map((card, idx) => {
                      const offset = idx - sliderActiveIndex;
                      const absOffset = Math.abs(offset);
                      const direction = Math.sign(offset);

                      if (absOffset > 2) return null;

                      const cardWidth = isMobile ? COMMUNITY_CARD.slider.card.w.mobile : COMMUNITY_CARD.slider.card.w.desktop;
                      const cardHeight = isMobile ? COMMUNITY_CARD.slider.card.h.mobile : COMMUNITY_CARD.slider.card.h.desktop;
                      const mediaHeight = isMobile ? COMMUNITY_CARD.slider.mediaH.mobile : COMMUNITY_CARD.slider.mediaH.desktop;
                      const footerHeight = isMobile ? COMMUNITY_CARD.slider.footerH.mobile : COMMUNITY_CARD.slider.footerH.desktop;
                      const xTranslate =
                        offset === 0 ? 0 : direction * (absOffset * (isMobile ? 55 : 130) + (isMobile ? 30 : 80));
                      const zTranslate = offset === 0 ? (isMobile ? 40 : 80) : -absOffset * (isMobile ? 55 : 110);
                      const yRotate = offset === 0 ? 0 : direction * (isMobile ? -14 : -22);
                      const scale =
                        absOffset === 0 ? 1 : Math.max(isMobile ? 0.8 : 0.75, 1 - absOffset * (isMobile ? 0.08 : 0.12));
                      const zIndex = 50 - absOffset;
                      const opacity = absOffset === 2 ? 0.6 : 1;

                      return (
                        <motion.div
                          key={card.id}
                          onMouseMove={(e) => {
                            if (isMobile) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            e.currentTarget.style.setProperty('--mouse-x', `${(x / rect.width - 0.5) * -6}px`);
                            e.currentTarget.style.setProperty('--mouse-y', `${(y / rect.height - 0.5) * -4}px`);
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.setProperty('--mouse-x', '0px');
                            e.currentTarget.style.setProperty('--mouse-y', '0px');
                          }}
                          initial={false}
                          animate={{
                            x: xTranslate,
                            z: zTranslate,
                            rotateY: yRotate,
                            scale,
                            zIndex,
                            opacity,
                          }}
                          transition={SLIDER_SPRING}
                          onClick={() => {
                            if (absOffset !== 0) setActiveIndex(idx);
                          }}
                          className={`transform-style-3d group/card absolute cursor-pointer overflow-hidden rounded-[2rem] border shadow-2xl transition-colors duration-300 ${
                            isDarkMode
                              ? 'border-white/10 bg-[#18181A]'
                              : 'border-neutral-200 bg-white'
                          }`}
                          style={{
                            width: `${cardWidth}px`,
                            height: `${cardHeight}px`,
                          }}
                        >
                          <AnimatePresence>
                            {absOffset === 0 && card.img && !isMediaReady(card.img) && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.12 }}
                                className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-center bg-neutral-950/50 backdrop-blur-[1px]"
                                style={{ height: `${mediaHeight}px` }}
                              >
                                <Loader2 size={isMobile ? 22 : 28} className="animate-spin text-brand-gold" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <motion.div
                            animate={{ backgroundColor: absOffset === 0 ? 'rgba(0,0,0,0)' : isDarkMode ? 'rgba(24,24,27,0.72)' : 'rgba(255,255,255,0.72)' }}
                            className="pointer-events-none absolute inset-0 z-20 transition-colors duration-200"
                          />

                          <div
                            className="relative w-full overflow-hidden bg-neutral-950"
                            style={{ height: `${mediaHeight}px` }}
                          >
                            <div
                              className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[38%] bg-gradient-to-t ${
                                isDarkMode ? 'from-[#18181A] via-[#18181A]/45' : 'from-white via-white/40'
                              } to-transparent`}
                            />
                            <motion.div
                              className="absolute inset-0 h-full w-full overflow-hidden origin-center"
                              style={{
                                translate: 'var(--mouse-x, 0px) var(--mouse-y, 0px)',
                              }}
                              animate={{ scale: absOffset === 0 ? 1 : 1.02 }}
                              transition={{ duration: 0.22 }}
                            >
                              <PublicCardPhoto
                                card={card}
                                imageClassName={CARD_MEDIA_HOVER}
                                mediaFit={CONNECTION_CARD_MEDIA_FIT_CENTER}
                                onMediaReady={card.img ? () => markMediaLoaded(card.img!) : undefined}
                              />
                            </motion.div>
                          </div>

                          <div
                            className={`relative z-20 -mt-1 flex flex-col items-center justify-between border-t p-3.5 md:p-5 ${
                              isDarkMode ? 'border-white/10 bg-[#18181A]' : 'border-neutral-200 bg-white'
                            }`}
                            style={{ height: `${footerHeight}px` }}
                          >
                            <div className="w-full text-center">
                              <h4
                                className={`w-full truncate px-1 text-sm font-extrabold md:text-xl ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}
                                title={card.name}
                              >
                                {card.name}
                              </h4>
                              <p
                                className="mt-1 w-full truncate px-1 text-[9px] font-black tracking-wider text-brand-gold uppercase md:text-xs"
                                title={card.profession ?? undefined}
                              >
                                {card.profession ?? 'Professional'}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (absOffset !== 0) {
                                  setActiveIndex(idx);
                                  return;
                                }
                                openLiveCard(card);
                              }}
                              className={`mt-2 flex w-full items-center justify-center rounded-xl border py-2 text-[10px] font-black shadow-sm transition-all group-hover/card:bg-brand-gold group-hover/card:text-black active:scale-95 md:py-3.5 md:text-xs ${
                                isDarkMode
                                  ? 'border-white/15 bg-neutral-800 text-white hover:bg-neutral-700'
                                  : 'border-neutral-200 bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                              }`}
                            >
                              View Profile
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Dots + mobile prev/next */}
                {cards.length > 1 && (
                  <div className="order-first mb-4 flex w-full max-w-[420px] shrink-0 items-center justify-between px-4 select-none md:order-none md:mt-6 md:mb-0">
                    <button
                      type="button"
                      onClick={prevCard}
                      disabled={cards.length <= 1}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all active:scale-90 disabled:cursor-not-allowed disabled:opacity-20 ${
                        isDarkMode
                          ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                          : 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                      aria-label="Previous profile"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="community-slider-dots no-scrollbar flex max-w-[60%] items-center gap-1.5 overflow-x-auto scroll-smooth py-1.5">
                      {cards.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`h-1.5 shrink-0 rounded-full transition-all duration-300 ${
                            idx === sliderActiveIndex
                              ? 'w-5 bg-brand-gold'
                              : isDarkMode
                                ? 'w-1.5 bg-neutral-700 hover:bg-neutral-600'
                                : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={nextCard}
                      disabled={cards.length <= 1}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all active:scale-90 disabled:cursor-not-allowed disabled:opacity-20 ${
                        isDarkMode
                          ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                          : 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                      aria-label="Next profile"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Redesigned Premium Call To Action Section */}
        <div className="mt-14 md:mt-20 mb-12 w-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

          <GlowCard
            className="w-full text-center relative py-12 md:py-16 px-6 sm:px-12 md:px-20 overflow-hidden"
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent pointer-events-none" />

            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/[0.04] border border-brand-gold/15 backdrop-blur-md mb-6 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.2em] text-brand-gold uppercase font-semibold">Elevate Your Presence</span>
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.25] mb-4 text-center">
                Ready to Join the Elite <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-white font-extrabold">vBiz Me Executive Network?</span>
              </h3>

              <p className={`font-light text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-6 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Deploy custom interactive profiles, showcase immersive luxury services, and activate high-converting connection channels instantly.
              </p>

              {/* Polish bullet points with Check icon */}
              <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[10px] font-mono tracking-wide mb-8">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Check size={11} className="text-brand-gold" /> Personalized Setup
                </span>
                <span className="text-neutral-700 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Check size={11} className="text-brand-gold" /> Live Real-time Portfolios
                </span>
                <span className="text-neutral-700 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <Check size={11} className="text-brand-gold" /> Smart Instant Savings
                </span>
              </div>

              {/* Magnetic Action Button */}
              <div className="w-full flex justify-center">
                <MagneticButton
                  href="/contact"
                  className="bg-brand-gold text-black font-semibold py-3.5 px-10 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] text-center h-12 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-sans group cursor-pointer"
                >
                  <span className="font-semibold tracking-wider">Order Your Custom vCard</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </MagneticButton>
              </div>

              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-6 block">
                Zero commitment • Fully Customizable • Luxury Designs
              </span>
            </div>
          </GlowCard>
        </div>

      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .community-slider-3d.perspective-\\[1600px\\] {
              perspective: 1600px;
              transform-style: preserve-3d;
            }
            .community-slider-3d .transform-style-3d {
              transform-style: preserve-3d;
            }
            .community-slider-dots.no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .community-slider-dots.no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
    </div>
  );
}
