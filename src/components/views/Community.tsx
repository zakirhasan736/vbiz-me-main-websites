'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Search, Grid,
  Sparkles, Check, ExternalLink,
  X, Compass, Sun, Moon, ArrowRight,
  LayoutList, ChevronLeft, ChevronRight, Loader2,
} from 'lucide-react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { useTheme } from '@/components/providers/theme-provider';
import { usePublicCardsDirectory } from '@/hooks/usePublicCardsDirectory';
import { getPublicCardProfileUrl } from '@/lib/publicCards/fetchPublicCards';
import type { PublicCard } from '@/lib/publicCards/types';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Community() {
  const {
    cards,
    dropdowns,
    draftFilters,
    isLoading,
    isSearching,
    isLoadingMore,
    error,
    hasMore,
    total,
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const professions = dropdowns.professions ?? [];
  const states = dropdowns.states ?? [];
  const cities = dropdowns.cities ?? [];

  useEffect(() => {
    return () => {
      if (serviceDebounceRef.current) clearTimeout(serviceDebounceRef.current);
    };
  }, []);

  // Keep the slider index in range whenever the result set changes.
  useEffect(() => {
    if (activeIndex >= cards.length) {
      setActiveIndex(Math.max(0, cards.length - 1));
    }
  }, [cards, activeIndex]);

  // Auto-slide effect for slider mode
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (viewMode === 'slider' && isAutoPlaying && cards.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [viewMode, isAutoPlaying, cards.length, activeIndex]);

  const handleServiceChange = useCallback(
    (value: string) => {
      setDraftFilter('service', value);
      if (serviceDebounceRef.current) clearTimeout(serviceDebounceRef.current);
      serviceDebounceRef.current = setTimeout(() => {
        updateAndApplyFilter('service', value);
        setActiveIndex(0);
      }, 400);
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

  const openLiveCard = useCallback((card: PublicCard) => {
    window.open(getPublicCardProfileUrl(card), '_blank', 'noopener,noreferrer');
  }, []);

  const showInitialLoader = isLoading && cards.length === 0;
  const showEmptyState = !isLoading && !error && cards.length === 0;
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
              <span className="text-lg font-bold tracking-tight text-brand-gold">{total > 0 ? `${total}+` : '128+'}</span>
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
                placeholder="Search name, profession, or service..."
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
                  <option value="">All Pro</option>
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

          {/* Bottom Row: Catalogue Info & View Mode Toggle */}
          <div className="flex flex-row items-center justify-between gap-3 pt-0.5">
            <div className="flex flex-col items-start text-left min-w-0">
              <span className={`hidden sm:block text-[9px] font-mono uppercase tracking-widest font-bold ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Executive Catalogue
              </span>
              <h3 className="text-[10px] sm:text-xs font-semibold tracking-tight truncate">
                {total} verified member{total !== 1 ? 's' : ''}
              </h3>
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
                className="flex flex-col gap-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                  {cards.map((card, idx) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.25), ease: 'easeOut' }}
                      onClick={() => openLiveCard(card)}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLiveCard(card);
                        }
                      }}
                      className={`rounded-[2.25rem] border p-5 flex flex-col justify-between relative transition-all duration-500 group overflow-hidden h-[460px] cursor-pointer ${
                        isDarkMode
                          ? 'bg-[#08080C] border-white/5 hover:border-brand-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)]'
                          : 'bg-white border-neutral-200 hover:border-brand-gold/45 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {/* ID & Profession Badges */}
                      <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5 items-start">
                        <span className="text-[7.5px] font-mono font-bold tracking-widest text-neutral-300 bg-black/80 px-2.5 py-1 rounded border border-white/5 uppercase">
                          Sphere #{idx + 101}
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/75 border border-white/5 backdrop-blur-md">
                          <Briefcase size={9} className="text-brand-gold" />
                          <span className="text-[8.5px] font-mono text-neutral-200 font-bold uppercase tracking-wider truncate max-w-[120px]">
                            {card.profession ?? 'Professional'}
                          </span>
                        </div>
                      </div>

                      {/* Image Frame */}
                      <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-4 shadow-sm">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${
                          isDarkMode ? 'from-[#08080C] via-[#08080C]/20 to-transparent' : 'from-black/60 via-black/15 to-transparent'
                        }`} />

                        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-white bg-black/95 px-2 py-1 rounded border border-white/10">
                            Active Now
                          </span>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="text-center flex-1 flex flex-col justify-between mb-4">
                        <div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-md border text-[8px] font-mono font-bold tracking-widest uppercase mb-2 ${
                            isDarkMode
                              ? 'border-brand-gold/20 bg-brand-gold/[0.04] text-brand-gold'
                              : 'border-brand-gold/30 bg-brand-gold/[0.06] text-amber-900'
                          }`}>
                            <Briefcase size={11} className="inline mr-1" />
                            <span className="ml-1.5">{card.profession ?? 'Professional'}</span>
                          </div>

                          <h4 className={`text-base font-bold tracking-tight mb-1 ${
                            isDarkMode ? 'text-white' : 'text-neutral-900'
                          }`}>
                            {card.name}
                          </h4>

                          <p className={`text-[9px] font-mono tracking-wider font-semibold block mb-2 ${
                            isDarkMode ? 'text-neutral-500' : 'text-brand-gold'
                          }`}>
                            vBiz Me Verified Member
                          </p>
                        </div>

                        <p className={`font-light text-[11px] leading-relaxed line-clamp-2 px-1 ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          Explore their interactive digital vCard — services, gallery, and contact details in one link.
                        </p>
                      </div>

                      {/* Action button */}
                      <div className="pt-3 border-t border-neutral-200/10 flex items-center">
                        <span className="w-full bg-brand-gold text-black group-hover:bg-yellow-500 font-extrabold py-3.5 px-4 rounded-xl text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm pointer-events-none">
                          <ExternalLink size={12} />
                          <span>Launch Card</span>
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More (pagination) */}
                {hasMore && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => void loadMore()}
                      disabled={isLoadingMore}
                      className={`flex items-center gap-2 py-3 px-8 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer disabled:opacity-50 ${
                        isDarkMode
                          ? 'bg-neutral-950 border-white/10 text-neutral-200 hover:border-brand-gold/40'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:border-brand-gold/40'
                      }`}
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <span>Load More Members</span>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="slider-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-[510px] md:h-[600px] flex flex-col items-center justify-center overflow-visible px-2 sm:px-4 py-4 md:py-8"
              >
                {/* Always-visible Prev / Next arrows (overlay — essential on mobile) */}
                {cards.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1))}
                      className={`absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-md ${
                        isDarkMode
                          ? 'bg-black/70 text-white hover:bg-black/90 border border-white/10'
                          : 'bg-white/90 text-neutral-800 hover:bg-white shadow-md border border-neutral-200'
                      }`}
                      aria-label="Previous profile"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0))}
                      className={`absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-md ${
                        isDarkMode
                          ? 'bg-black/70 text-white hover:bg-black/90 border border-white/10'
                          : 'bg-white/90 text-neutral-800 hover:bg-white shadow-md border border-neutral-200'
                      }`}
                      aria-label="Next profile"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                {/* 3D Stack Container */}
                <div
                  className="relative w-full max-w-[320px] h-[460px] flex items-center justify-center my-2 md:my-0 md:mb-8 order-last md:order-first"
                  style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
                >
                  {cards.map((card, idx) => {
                    const offset = idx - activeIndex;
                    const absOffset = Math.abs(offset);

                    if (absOffset > 2) return null;

                    let xTranslation = 0;
                    let scale = 1;
                    let rotateY = 0;
                    let zIndex = 10 - absOffset;
                    let zTranslation = 0;

                    if (offset < 0) {
                      xTranslation = offset * 160;
                      zTranslation = -absOffset * 100;
                      rotateY = 30;
                    } else if (offset > 0) {
                      xTranslation = offset * 160;
                      zTranslation = -absOffset * 100;
                      rotateY = -30;
                    } else {
                      xTranslation = 0;
                      scale = 1;
                      rotateY = 0;
                      zIndex = 20;
                      zTranslation = 0;
                    }

                    return (
                      <motion.div
                        key={card.id}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragStart={() => setIsAutoPlaying(false)}
                        onDragEnd={(e, { offset: dragOffset, velocity }) => {
                          const swipe = swipePower(dragOffset.x, velocity.x);
                          if (swipe < -swipeConfidenceThreshold) {
                            setActiveIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
                          } else if (swipe > swipeConfidenceThreshold) {
                            setActiveIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
                          }
                          setIsAutoPlaying(true);
                        }}
                        onClick={() => {
                          if (idx === activeIndex) {
                            openLiveCard(card);
                          } else {
                            setActiveIndex(idx);
                          }
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{
                          x: xTranslation,
                          z: zTranslation,
                          scale: scale,
                          rotateY: rotateY,
                          zIndex: zIndex,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`absolute w-[320px] h-[460px] rounded-[1.75rem] flex flex-col justify-between transition-all duration-500 overflow-hidden select-none cursor-grab active:cursor-grabbing ${
                          isDarkMode
                            ? 'bg-[#18181A] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]'
                            : 'bg-white shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12)] border border-neutral-200'
                        }`}
                      >
                        {/* Upper image block */}
                        <div className="relative w-full h-[55%] overflow-hidden bg-neutral-800">
                          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-md">
                            <Briefcase size={10} className="text-[#FFD700]" />
                            <span className="text-[9px] font-mono text-neutral-300 font-extrabold uppercase tracking-wider truncate max-w-[150px]">
                              {(card.profession ?? 'Professional').toUpperCase()}
                            </span>
                          </div>

                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-cover object-top select-none pointer-events-none"
                            referrerPolicy="no-referrer"
                          />

                          <div className={`absolute inset-0 bg-gradient-to-t ${
                            isDarkMode
                              ? 'from-[#18181A] via-[#18181A]/40 to-transparent'
                              : 'from-white via-white/50 to-transparent'
                          }`} />
                        </div>

                        {/* Card Info Details */}
                        <div className="px-6 pb-6 pt-0 text-center flex-1 flex flex-col justify-between items-center relative z-10 bg-transparent">
                          <div className="flex-1 flex flex-col justify-center gap-1.5 mt-2">
                            <h4 className={`text-2xl font-bold tracking-tight ${
                              isDarkMode ? 'text-white' : 'text-neutral-900'
                            }`}>
                              {card.name}
                            </h4>

                            <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold text-[#FFD700]">
                              {(card.profession ?? 'Professional').toUpperCase()}
                            </span>
                          </div>

                          {/* Profile action button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (offset !== 0) {
                                setActiveIndex(idx);
                                return;
                              }
                              openLiveCard(card);
                            }}
                            className={`w-full font-bold py-3.5 px-4 rounded-xl text-[12px] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                              isDarkMode
                                ? 'bg-[#2A2A2D] text-white hover:bg-[#323235]'
                                : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200'
                            }`}
                          >
                            <span>View Profile</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Slider Pagination Dots */}
                {cards.length > 1 && (
                  <div className="flex items-center justify-center gap-2 z-40 mt-4 md:mt-2 w-full order-first md:order-last pb-8  md:pb-0 md:mb-0">
                    {cards.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === activeIndex
                            ? 'bg-brand-gold w-4'
                            : `w-2 ${isDarkMode ? 'bg-white/20 hover:bg-white/40' : 'bg-neutral-300 hover:bg-neutral-400'}`
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
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

    </div>
  );
}
