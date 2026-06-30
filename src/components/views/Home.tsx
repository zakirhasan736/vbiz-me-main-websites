'use client';

import { 
  ArrowRight, 
  ChevronLeft, ChevronRight, Sparkles, 
  Car, Award, Utensils, Briefcase, X, Zap, Landmark,
  QrCode, TrendingUp, ExternalLink, Truck, Home as HomeIcon, Dumbbell, Scale,
  MousePointerClick, Smartphone, ScrollText, Lightbulb, Loader2,
} from 'lucide-react';
import type { ReactNode } from 'react';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { scrollElementIntoView } from '@/lib/scroll-utils';
import { DeferredPhoneMockupFrame } from '@/components/DeferredPhoneMockupFrame';
import { PortfolioVCardModal } from '@/components/PortfolioVCardModal';
import { IndustryVCardMobilePreview } from '@/components/IndustryVCardMobilePreview';
import { VCARD_MOBILE_FRAME_LOADER } from '@/lib/vcard-mobile-loader';
import {
  PORTFOLIO_QR_CARDS,
  getPortfolioQrImageSrc,
  type PortfolioQrCard,
} from '@/lib/portfolio-qr-cards';
import { VCardInteractiveLane } from '@/components/VCardInteractiveLane';
import {
  RevealText,
  RevealParagraph,
  RevealEyebrow,
  ScrollRevealCard,
  SectionRevealRoot,
  SectionRevealHeader,
  SectionRevealContent,
  SectionRevealGrid,
  RevealGridItem,
  getFourCardDirection,
  getThreeColumnGridDirection,
  getGridStaggerForColumns,
} from '@/components/animations/reveal';
import { CapabilityCard } from '@/components/ui/CapabilityCard';
import { CapabilityIcon } from '@/components/ui/CapabilityIcon';
import type { CapabilityIconName } from '@/lib/capability-icons';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SiteGlowCard } from '@/components/ui/SiteGlowCard';
import { HOME_INDUSTRIES } from '@/lib/home-industries';
import { vcardProfileUrl } from '@/lib/vcard-profile-url';

const qrSliderItems = PORTFOLIO_QR_CARDS;

const HOME_INDUSTRY_ICONS: Record<string, ReactNode> = {
  executive: <Briefcase className="w-4 h-4" />,
  electrician: <Zap className="w-4 h-4" />,
  'finance-wealth': <Landmark className="w-4 h-4" />,
  'auto-sales': <Car className="w-4 h-4" />,
  'financial-coach': <Award className="w-4 h-4" />,
  restaurant: <Utensils className="w-4 h-4" />,
  'moving-services': <Truck className="w-4 h-4" />,
  'real-estate': <HomeIcon className="w-4 h-4" />,
  fitness: <Dumbbell className="w-4 h-4" />,
  legal: <Scale className="w-4 h-4" />,
};

const INDUSTRY_DEMO_STEPS = [
  {
    icon: MousePointerClick,
    title: 'Pick a profile',
    hint: 'Tap any industry tile — each is a verified live vCard.',
  },
  {
    icon: Smartphone,
    title: 'Preview live',
    hint: 'Desktop switches instantly; mobile opens the live phone frame.',
  },
  {
    icon: ScrollText,
    title: 'Scroll & explore',
    hint: 'Swipe inside — video, services, and save-contact all work.',
  },
] as const;

const INDUSTRY_SWITCH_LOADER_MS = 200;
const INDUSTRY_SWITCH_LOADER_CACHED_MS = 90;

function slugFromDemoUrl(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/^\//, '');
    return path || url;
  } catch {
    return url;
  }
}

// Interactive Demo Component ("See It In Action")
const InteractiveDemoSection = () => {
  const industries = HOME_INDUSTRIES.map((ind) => ({
    ...ind,
    icon: HOME_INDUSTRY_ICONS[ind.id],
  }));

  const [activeIndId, setActiveIndId] = useState('executive');
  const [mobileDemoOpen, setMobileDemoOpen] = useState(false);
  const [previewHighlighted, setPreviewHighlighted] = useState(false);
  const [demoIframeReady, setDemoIframeReady] = useState(false);
  const [activeIframeLoading, setActiveIframeLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);
  const activeIndIdRef = useRef(activeIndId);
  const iframeLoadingRef = useRef<Record<string, boolean>>({});
  const loadedDemoUrlsRef = useRef<Set<string>>(new Set());
  const switchTimeRef = useRef(Date.now());
  const loaderHideTimerRef = useRef<number | null>(null);
  const activeObj = industries.find((ind) => ind.id === activeIndId) || industries[0];

  activeIndIdRef.current = activeIndId;

  const clearLoaderHideTimer = useCallback(() => {
    if (loaderHideTimerRef.current !== null) {
      window.clearTimeout(loaderHideTimerRef.current);
      loaderHideTimerRef.current = null;
    }
  }, []);

  const scheduleHideActiveLoader = useCallback(
    (industryId: string, cached = false) => {
      clearLoaderHideTimer();
      const elapsed = Date.now() - switchTimeRef.current;
      const minMs = cached ? INDUSTRY_SWITCH_LOADER_CACHED_MS : INDUSTRY_SWITCH_LOADER_MS;
      const delay = Math.max(0, minMs - elapsed);
      loaderHideTimerRef.current = window.setTimeout(() => {
        if (activeIndIdRef.current === industryId) {
          setActiveIframeLoading(false);
        }
        loaderHideTimerRef.current = null;
      }, delay);
    },
    [clearLoaderHideTimer],
  );

  const handleActiveIframeLoading = useCallback(
    (loading: boolean) => {
      const industryId = activeIndIdRef.current;
      const demoUrl = HOME_INDUSTRIES.find((ind) => ind.id === industryId)?.demoUrl;

      iframeLoadingRef.current[industryId] = loading;

      if (loading) {
        setActiveIframeLoading(true);
        return;
      }

      if (demoUrl) {
        loadedDemoUrlsRef.current.add(demoUrl);
      }
      scheduleHideActiveLoader(industryId);
    },
    [scheduleHideActiveLoader],
  );

  useEffect(() => () => clearLoaderHideTimer(), [clearLoaderHideTimer]);

  useEffect(() => {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://vcard.vbizme.com';
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);

    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://vcard.vbizme.com';
    document.head.appendChild(dnsPrefetch);

    return () => {
      preconnect.remove();
      dnsPrefetch.remove();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setDemoIframeReady(inView);
        if (!inView) {
          setMobileDemoOpen(false);
        }
      },
      { rootMargin: '700px 0px', threshold: 0.01 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!demoIframeReady) return;

    const prefetchLinks = HOME_INDUSTRIES.map((ind) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = ind.demoUrl;
      link.as = 'document';
      document.head.appendChild(link);
      return link;
    });

    return () => {
      prefetchLinks.forEach((link) => link.remove());
    };
  }, [demoIframeReady]);

  const selectIndustry = (id: string) => {
    if (id === activeIndIdRef.current) return;

    const targetUrl = HOME_INDUSTRIES.find((ind) => ind.id === id)?.demoUrl;
    const cached = targetUrl ? loadedDemoUrlsRef.current.has(targetUrl) : false;

    switchTimeRef.current = Date.now();
    clearLoaderHideTimer();
    setActiveIndId(id);
    setActiveIframeLoading(true);

    if (cached) {
      scheduleHideActiveLoader(id, true);
    }

    if (typeof window === 'undefined' || !window.matchMedia('(max-width: 1279px)').matches) {
      return;
    }

    window.setTimeout(() => {
      const target = mobilePreviewRef.current;
      if (!target) return;

      scrollElementIntoView(target, 'center');

      setPreviewHighlighted(true);
      window.setTimeout(() => setPreviewHighlighted(false), 1400);
    }, 80);
  };

  useEffect(() => {
    setMobileDemoOpen(false);
  }, [activeIndId]);

  return (
    <section
      ref={sectionRef}
      id="see-in-action"
      className="site-section site-section--reveal bg-brand-dark border-b border-white/5 relative z-12"
    >
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionRevealRoot className="text-center max-w-3xl mx-auto mb-16">
          <SectionRevealHeader>
            <RevealEyebrow label="See It In Action" className="mb-4 mx-auto" delay={0} />
            <RevealText
              text="See Exactly What Your Customers Will Experience"
              className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white"
              tag="h2"
              delay={0.05}
            />
            <RevealParagraph
              text="Browse ten real member profiles from our public network. Each tile loads an actual vBiz Me vCard — the same experience your clients get after they scan your QR code."
              className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed"
              delay={0.1}
            />
          </SectionRevealHeader>
        </SectionRevealRoot>

        <SectionRevealRoot>
          <SectionRevealContent>
            <ScrollRevealCard
              direction="up"
              distance="MD"
              className="mb-8 lg:mb-10"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.04] via-transparent to-brand-gold/[0.03]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

                <div className="relative flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-stretch lg:gap-5">
                  <div className="lg:w-[34%] xl:w-[32%] shrink-0 flex flex-col justify-center border-b border-white/[0.06] pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-brand-gold font-bold">
                        Interactive demo guide
                      </span>
                    </div>
                    <p className="text-sm sm:text-[15px] font-semibold text-white leading-snug">
                      Try real member vCards in three quick steps
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1.5 leading-relaxed">
                      Live profiles from our public network — the same link clients open after scanning your QR code.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="inline-flex items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-gold">
                        {industries.length} live demos
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-mono text-neutral-400">
                        vcard.vbizme.com
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    {INDUSTRY_DEMO_STEPS.map((step, idx) => (
                      <div
                        key={step.title}
                        className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2.5 sm:py-3"
                      >
                        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                          <step.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[9px] font-black text-black">
                            {idx + 1}
                          </span>
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-xs sm:text-[13px] font-semibold text-white leading-tight">{step.title}</p>
                          <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-snug mt-0.5">
                            {step.hint}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollRevealCard>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls column — below phone on mobile, left on xl */}
          <ScrollRevealCard
            direction="left"
            distance="XL"
            className="order-2 xl:order-1 lg:col-span-12 xl:col-span-5 flex flex-col gap-5"
          >
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-[#0a0a0c]/70 backdrop-blur-md shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent" />
              <div className="absolute -left-20 -top-20 h-36 w-36 rounded-full bg-brand-gold/[0.05] blur-3xl pointer-events-none" />

              <div className="relative flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-4 sm:px-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold font-bold block mb-1">
                    Live profile picker
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    Select an industry
                  </span>
                </div>
                <span className="shrink-0 inline-flex flex-col items-end rounded-xl border border-brand-gold/20 bg-brand-gold/[0.06] px-3 py-2">
                  <span className="text-lg font-bold tabular-nums leading-none text-brand-gold">{industries.length}</span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 mt-0.5">Profiles</span>
                </span>
              </div>

              <div className="home-industry-toggle-grid relative p-2 sm:p-2.5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-1">
                {industries.map((ind, index) => {
                  const isActive = activeIndId === ind.id;
                  const isSwitching = isActive && activeIframeLoading;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => selectIndustry(ind.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group relative flex items-center gap-3 rounded-[0.9rem] px-3 py-2.5 text-left transition-all duration-200 overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-gold/[0.16] via-brand-gold/[0.07] to-transparent ring-1 ring-brand-gold/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                          : 'hover:bg-white/[0.04] ring-1 ring-transparent hover:ring-white/[0.08]'
                      }`}
                    >
                      {isActive ? (
                        <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-brand-gold shadow-[0_0_12px_rgba(212,175,55,0.65)]" aria-hidden />
                      ) : null}

                      <span className="relative shrink-0">
                        <span
                          className={`block h-11 w-11 overflow-hidden rounded-full ring-2 transition-all ${
                            isActive
                              ? 'ring-brand-gold/50 shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                              : 'ring-white/10 group-hover:ring-brand-gold/25'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={ind.avatar}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                          />
                        </span>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border text-brand-gold ${
                            isActive
                              ? 'border-brand-gold/40 bg-[#14110a]'
                              : 'border-white/15 bg-[#111] group-hover:border-brand-gold/30'
                          }`}
                        >
                          {ind.icon}
                        </span>
                      </span>

                      <div className="relative min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold tracking-tight truncate ${
                              isActive ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                            }`}
                          >
                            {ind.name}
                          </span>
                          {isActive ? (
                            <span className="shrink-0 rounded-full bg-brand-gold/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-brand-gold">
                              Live
                            </span>
                          ) : null}
                        </div>
                        <span className="text-[11px] text-neutral-500 font-light block truncate mt-0.5">
                          {ind.company}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-600 block truncate mt-0.5">
                          /{slugFromDemoUrl(ind.demoUrl)}
                        </span>
                      </div>

                      <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center">
                        {isSwitching ? (
                          <Loader2 className="h-4 w-4 animate-spin text-brand-gold" aria-label={`Loading ${ind.name}`} />
                        ) : isActive ? (
                          <ChevronRight className="h-4 w-4 text-brand-gold" aria-hidden />
                        ) : (
                          <span className="text-[10px] font-mono tabular-nums text-neutral-700 group-hover:text-neutral-500">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href="/community"
              className="group inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white transition-all hover:border-brand-gold/30 hover:bg-brand-gold/[0.05]"
            >
              <span className="text-sm font-semibold">Browse full industry library</span>
              <ChevronRight size={16} className="text-brand-gold transition-transform group-hover:translate-x-0.5" />
            </a>
          </ScrollRevealCard>

          {/* Interactive Screen Mockup — popup on mobile, inline on xl+ */}
          <ScrollRevealCard
            direction="right"
            distance="XL"
            className="order-1 xl:order-2 lg:col-span-12 xl:col-span-7 flex flex-col items-center justify-center relative gap-5 pointer-events-auto z-10 home-industry-mockup"
          >
            <div className="flex flex-col items-center gap-3 w-full max-w-[407px] mx-auto relative z-10">
              <div
                className={`w-full px-4 py-3 rounded-2xl border text-center hero-industry-demo-url transition-colors duration-300 ${
                  activeIframeLoading
                    ? 'border-brand-gold/20 bg-gradient-to-r from-brand-gold/[0.04] to-brand-card shadow-none'
                    : 'border-brand-gold/30 bg-gradient-to-r from-brand-gold/[0.08] to-brand-card shadow-[0_4px_24px_rgba(212,175,55,0.08)]'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">
                    Live vCard URL
                  </span>
                  {activeIframeLoading ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-gold">
                      <Loader2 className="h-2.5 w-2.5 animate-spin" aria-hidden />
                      Loading
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                      Ready
                    </span>
                  )}
                </div>
                <a
                  href={activeObj.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[11px] font-mono text-brand-gold hover:underline break-all leading-snug hero-industry-demo-url__link transition-opacity ${
                    activeIframeLoading ? 'opacity-60 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  {activeObj.demoUrl}
                </a>
                <p className="text-[10px] text-brand-text-muted font-light mt-2 leading-relaxed">
                  {activeIframeLoading
                    ? `Fetching vcard.vbizme.com/${slugFromDemoUrl(activeObj.demoUrl)}…`
                    : 'Opens the same production link your clients receive — hosted on vcard.vbizme.com'}
                </p>
              </div>

              <div className="hidden xl:block w-full">
                <VCardInteractiveLane className="w-full" id="industries-vcard-lane">
                  <div className="relative w-full">
                    {demoIframeReady ? (
                      <div
                        className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
                        aria-hidden
                      >
                        {industries
                          .filter((ind) => ind.id !== activeIndId)
                          .map((ind) => (
                            <iframe
                              key={ind.id}
                              src={ind.demoUrl}
                              title=""
                              loading="eager"
                              tabIndex={-1}
                              onLoad={() => {
                                loadedDemoUrlsRef.current.add(ind.demoUrl);
                              }}
                            />
                          ))}
                      </div>
                    ) : null}

                    <DeferredPhoneMockupFrame
                      enabled={demoIframeReady}
                      src={activeObj.demoUrl}
                      title={`${activeObj.name} Demo`}
                      size="hero"
                      requireInView={false}
                      skipSiteLoadDefer
                      iframeLoading="eager"
                      fetchPriority="high"
                      {...VCARD_MOBILE_FRAME_LOADER}
                      showUrlInLoader
                      onLoadingChange={handleActiveIframeLoading}
                    />
                  </div>
                </VCardInteractiveLane>
                <div className="mt-4 w-full rounded-2xl border border-brand-gold/20 bg-gradient-to-r from-brand-gold/[0.06] via-white/[0.03] to-transparent px-4 py-4 sm:px-5 sm:py-4">
                  <p className="text-sm sm:text-base text-neutral-200 font-medium text-center leading-relaxed flex items-center justify-center gap-2.5 flex-wrap">
                    <ScrollText className="w-5 h-5 sm:w-[1.35rem] sm:h-[1.35rem] text-brand-gold shrink-0" />
                    <span>
                      Scroll inside the phone — loader clears when the vCard is ready
                    </span>
                  </p>
                </div>
              </div>

              <div
                id="industries-mobile-preview"
                ref={mobilePreviewRef}
                className="xl:hidden w-full scroll-mt-28"
              >
                <IndustryVCardMobilePreview
                  isOpen={mobileDemoOpen}
                  onOpen={() => setMobileDemoOpen(true)}
                  onClose={() => setMobileDemoOpen(false)}
                  src={demoIframeReady ? activeObj.demoUrl : ''}
                  title={`${activeObj.name} Demo`}
                  industryName={activeObj.name}
                  company={activeObj.company}
                  previewImage={activeObj.videoPlaceholder}
                  highlighted={previewHighlighted}
                  iframeEnabled={demoIframeReady}
                />
              </div>
            </div>
          </ScrollRevealCard>

        </div>
          </SectionRevealContent>
        </SectionRevealRoot>

      </div>
    </section>
  );
};

// ==========================================
// PORTFOLIO SECTION (Interactive vCards & Tech Bento)
// ==========================================
const PortfolioSection = () => {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: loading, 1: video pitch, 2: full card
  const [selectedQrCard, setSelectedQrCard] = useState<PortfolioQrCard | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSliderIdx, setActiveSliderIdx] = useState(0);

  const handleSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const clientWidth = el.clientWidth;
    const children = Array.from(el.children) as HTMLElement[];
    if (children.length === 0) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (isDesktop) {
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const distance = Math.abs(child.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveSliderIdx(closestIndex);
      return;
    }

    const containerCenter = scrollLeft + clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(childCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSliderIdx(closestIndex);
  };

  const getSliderStep = () => {
    const el = sliderRef.current;
    if (!el) return 340;
    const card = el.querySelector('.portfolio-qr-slider-card') as HTMLElement | null;
    if (!card) return 340;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 24;
    return card.offsetWidth + gap;
  };

  const scrollToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children[index]) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    children[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: isDesktop ? 'start' : 'center',
    });
    setActiveSliderIdx(index);
  };

  const [isMuted, setIsMuted] = useState(true);
  const [videoPlay, setVideoPlay] = useState(true);
  const [contactSaved, setContactSaved] = useState(false);

  // States for Analytics Bento widget
  const [views, setViews] = useState(1485);
  const [saves, setSaves] = useState(642);
  const [trackedEvent, setTrackedEvent] = useState(false);
  const [chartData, setChartData] = useState([35, 48, 65, 42, 58, 80, 95]);

  // States for QR Code generator
  const [qrInput, setQrInput] = useState('nextcreavo.com');
  const [isMorphing, setIsMorphing] = useState(false);



  // Simulate Views Increase on Analytics widget
  const triggerSimulation = () => {
    if (trackedEvent) return;
    setTrackedEvent(true);
    setViews(v => v + 1);
    setChartData(prev => [...prev.slice(1), prev[prev.length - 1] + Math.floor(Math.random() * 20) + 5]);
    
    setTimeout(() => {
      setSaves(s => s + 1);
    }, 800);

    setTimeout(() => {
      setTrackedEvent(false);
    }, 3000);
  };

  // QR string morph callback
  const handleQrInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrInput(e.target.value);
    setIsMorphing(true);
    setTimeout(() => setIsMorphing(false), 250);
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollAmount = getSliderStep();
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="portfolio-section" className="site-section site-section--reveal bg-brand-dark border-b border-white/5 relative z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-3/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-8 relative">

        <SectionRevealRoot id="portfolio-header" className="text-center max-w-4xl mx-auto mb-16">
          <SectionRevealHeader>
            <RevealEyebrow label="Live Showcases" className="mb-4 mx-auto" delay={0} />
            <RevealText
              text="Portfolio"
              className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-white text-center"
              tag="h2"
              delay={0.05}
            />
            <RevealParagraph
              text="Share your vCard effortlessly with a QR code or URL link. Scanning or clicking triggers a dynamic intro video, followed by your full vCard, to reflect your unique brand. Our vCards are more than contact information—they are powerful marketing tools that stand out making an instant and lasting impression."
              className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
              delay={0.1}
            />

            <ScrollRevealCard direction="up" distance="MD" delay={0.16} className="mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  href="/portfolio"
                  className="h-12 px-7 bg-brand-gold text-black text-sm font-bold tracking-wide shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_28px_rgba(212,175,55,0.4)]"
                >
                  View Full Portfolio <ArrowRight size={16} aria-hidden="true" />
                </MagneticButton>
                <span className="text-neutral-500 text-base text-base font-light">
                  {qrSliderItems.length} live client showcases — tap any card below or open the gallery
                </span>
              </div>
            </ScrollRevealCard>
          </SectionRevealHeader>
        </SectionRevealRoot>

        {/* TWO INTERACTIVE BENTO GRID TECH FEATURES */}
        <div className="grid hidden grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          
          {/* FEATURE 1: Analytics & Tracking Bento Widget */}
          <ScrollRevealCard
            direction="right"
            distance="XL"
            id="portfolio-bento-analytics"
            className="py-6 px-4 md:py-8 md:px-6 bg-neutral-950 border border-white/5 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-brand-gold/30 group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px]" />
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base tracking-wide">Analytics & Tracking</h3>
                  <p className="text-[11px] text-neutral-500 font-light">Ecosystem performance monitor</p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded">
                Live Data
              </span>
            </div>

            <p className="text-neutral-400 text-base font-light leading-relaxed mb-6">
              Monitor how often your vCard is viewed or shared, providing valuable insights into your networking efforts.
            </p>

            {/* Simulated Live Analytics Graph Block */}
            <div className="bg-brand-surface p-5 rounded-2xl border border-white/5 relative mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-widest text-neutral-500 font-medium">Link Views</span>
                    <span className="text-lg font-bold text-white font-mono animate-[pulse_2s_infinite]">{views}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-widest text-neutral-500 font-medium">Saves Rate</span>
                    <span className="text-lg font-bold text-brand-gold font-mono">{saves}</span>
                  </div>
                </div>
                <div className="text-sm text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                  +34.2% Growth
                </div>
              </div>

              {/* Sparklines vector mockup */}
              <div className="h-16 flex items-end gap-1.5 pt-2">
                {chartData.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        idx === chartData.length - 1 ? 'bg-brand-gold shadow-[0_0_12px_rgba(212,175,55,0.4)]' : 'bg-white/10'
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive incrementor button */}
            <button 
              type="button"
              onClick={triggerSimulation}
              disabled={trackedEvent}
              className={`w-full py-3 px-4 rounded-xl text-base font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                trackedEvent 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {trackedEvent ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  View & Save Event Trailing...
                </>
              ) : (
                <>Simulate Share View</>
              )}
            </button>

            {/* Floating pop notification toast */}
            {trackedEvent && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-neutral-900 border border-brand-gold/30 text-white font-mono text-sm px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 z-20">
                <Sparkles size={10} className="text-brand-gold" />
                Real-time analytics incremented!
              </div>
            )}
          </ScrollRevealCard>
          <ScrollRevealCard
            direction="left"
            distance="XL"
            delay={0.12}
            id="portfolio-bento-qrcode"
            className="py-6 px-4 md:py-8 md:px-6 bg-neutral-950 border border-white/5 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-brand-gold/30 group flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[60px]" />

            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base tracking-wide">QR Code Sharing</h3>
                    <p className="text-[11px] text-neutral-500 font-light">Custom High-Response distribution</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-[#151515] text-neutral-400 px-2 py-0.5 rounded">
                  Dynamic Vector
                </span>
              </div>

              <p className="text-neutral-400 text-base font-light leading-relaxed mb-6">
                Share your vCard instantly via a custom QR code that can be scanned with any smartphone.
              </p>

              {/* Real-time reactive simulator */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-brand-surface py-6 px-4 md:py-8 md:px-6 rounded-2xl border border-white/5 mb-6">
                
                {/* Dynamically Jittering QR grid to look simulated */}
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex-shrink-0 flex items-center justify-center border border-brand-gold/30 shadow-[0_0_20px_rgba(211,175,55,0.08)] relative overflow-hidden">
                  <div
                    className={`qr-sim-matrix transition-all duration-200 ${isMorphing ? 'scale-90 opacity-40 blur-[0.5px]' : 'scale-100 opacity-90'}`}
                    aria-hidden="true"
                  />
                  {isMorphing && (
                    <span className="absolute text-[6px] font-mono uppercase bg-brand-gold text-black rounded px-1 py-0.5 tracking-tight font-extrabold animate-pulse">
                      Updating
                    </span>
                  )}
                </div>

                {/* Input helper to play with */}
                <div className="flex-grow w-full">
                  <label htmlFor="qr-input" className="block text-[8.5px] uppercase tracking-widest text-[#777] font-bold mb-1.5">
                    1. Set Destination Target
                  </label>
                  <input 
                    id="qr-input"
                    type="text"
                    value={qrInput}
                    onChange={handleQrInputChange}
                    placeholder="Enter link, phone, or website..."
                    className="w-full bg-[#131313] border border-white/10 p-3 rounded-lg text-base leading-normal text-white placeholder-neutral-600 focus:outline-none focus:border-brand-gold/50"
                  />
                  <span className="text-sm text-[#666] font-light mt-1.5 block leading-tight">
                    Mock destination: <span className="text-brand-gold block font-mono overflow-ellipsis text-[8px]">{qrInput || 'empty'}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-neutral-500 italic font-light text-center">
              *Try modifying any input above to watch the vector matrix adapt instantly.
            </div>

          </ScrollRevealCard>
        </div>
        {/* Dynamic Responsive Carousel Slider for QR Showcase */}
        <SectionRevealRoot>
          <SectionRevealContent>
        <ScrollRevealCard
          id="portfolio-slider-container"
          direction="up"
          distance="XL"
          delay={0}
          className="relative group/slider mt-12 max-w-[1344px] mx-auto px-1"
        >
          {/* Navigation Arrows (Visible on hover on desktop) */}
          <button
            onClick={() => scrollSlider('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-950/95 hover:bg-neutral-900 border border-white/10 text-brand-gold flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-25 active:scale-90 shadow-[0_4px_24px_rgba(0,0,0,0.8)] cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollSlider('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-950/95 hover:bg-neutral-900 border border-white/10 text-brand-gold flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-25 active:scale-90 shadow-[0_4px_24px_rgba(0,0,0,0.8)] cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Swipeable Scroll Container */}
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            className="portfolio-qr-slider-lane flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {qrSliderItems.map((item, idx) => {
              const qrBgColor = 'ffffff';

              const isYellow = item.color === 'ffff00' || item.name === 'boat';
              const isRed = item.color === 'ff0000';
              const isIndigo = item.color === '4f46e5';

              const cardStyle = isYellow ? {
                borderColor: 'border-yellow-500/20 hover:border-yellow-500/40',
                glowColor: 'shadow-[0_0_40px_rgba(234,179,8,0.12)]',
                hoverGlow: 'hover:shadow-[0_0_50px_rgba(234,179,8,0.22)]',
              } : isRed ? {
                borderColor: 'border-red-500/20 hover:border-red-500/40',
                glowColor: 'shadow-[0_0_40px_rgba(239,68,68,0.12)]',
                hoverGlow: 'hover:shadow-[0_0_50px_rgba(239,68,68,0.22)]',
              } : isIndigo ? {
                borderColor: 'border-indigo-500/20 hover:border-indigo-500/40',
                glowColor: 'shadow-[0_0_40px_rgba(79,70,229,0.12)]',
                hoverGlow: 'hover:shadow-[0_0_50px_rgba(79,70,229,0.22)]',
              } : {
                borderColor: 'border-white/5 hover:border-brand-gold/30',
                glowColor: 'shadow-[0_0_40px_rgba(255,255,255,0.03)]',
                hoverGlow: 'hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]',
              };

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedQrCard(item);
                    setIsQrModalOpen(true);
                  }}
                  className={`portfolio-qr-slider-card snap-center lg:snap-start shrink-0 w-[280px] sm:w-[300px] lg:w-auto bg-[#2c3a34] border ${cardStyle.borderColor} ${cardStyle.glowColor} ${cardStyle.hoverGlow} rounded-[2rem] py-4 px-3 sm:py-5 sm:px-4 lg:py-4 lg:px-3 flex flex-col items-center gap-4 transition-all duration-500 hover:-translate-y-2 group cursor-pointer`}
                  id={`qr-slider-card-${item.id}`}
                >
                  {/* Branded QR from /public */}
                  <div className="portfolio-qr-slider-card__qr-well w-full aspect-square bg-white p-2.5 sm:p-3 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_12px_rgba(0,0,0,0.05),0_10px_25px_rgba(0,0,0,0.85)] group-hover:scale-[1.02] transition-transform duration-500">
                    <div 
                      className="w-full h-full rounded-xl overflow-hidden relative bg-white"
                      style={{
                        backgroundColor: '#' + qrBgColor
                      }}
                    >
                      <img
                        src={getPortfolioQrImageSrc(item)}
                        alt={`QR Code — ${item.displayName}`}
                        width={220}
                        height={220}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Name label below QR (matches branded vCard QR layout) */}
                  <div className="flex flex-col items-center px-1 w-full">
                    <span className="portfolio-qr-slider-card__label inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-[10.5px] sm:text-[11px] font-medium tracking-wide text-center leading-snug shadow-xl group-hover:border-brand-gold/40 transition-colors max-w-full">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-gold animate-pulse" />
                      <span className="line-clamp-2">{item.displayName}</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Custom Infinite Carousel Explore/Add Card Callout */}
            <div
              className="portfolio-qr-slider-card snap-center lg:snap-start shrink-0 w-[280px] sm:w-[300px] lg:w-auto bg-gradient-to-br from-[#2c3a34] to-brand-dark border border-white/5 rounded-[2rem] py-4 px-3 sm:py-5 sm:px-4 lg:py-4 lg:px-3 flex flex-col gap-4"
              id="qr-slider-explore-card"
            >
              <div className="relative z-10 text-left">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-brand-gold flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="portfolio-qr-explore-card__title font-semibold text-base sm:text-lg mb-2">Full Portfolio Gallery</h3>
                <p className="portfolio-qr-explore-card__copy text-sm sm:text-base font-light leading-relaxed">
                  Browse every live vCard showcase, QR design, and branded client demo in one dedicated portfolio view.
                </p>
              </div>

              <a
                href="/portfolio"
                className="relative z-10 w-full py-3 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-bold text-xs sm:text-sm text-center uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.35)]"
              >
                View Full Portfolio <ChevronRight size={14} />
              </a>
            </div>
          </div>
          
          {/* Responsive scroll indicators at bottom of slider */}
          <div className="flex justify-center items-center gap-1 mt-4" role="tablist" aria-label="Portfolio carousel">
            {Array.from({ length: qrSliderItems.length + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                role="tab"
                onClick={() => scrollToSlide(dotIdx)}
                className={`portfolio-slider-dot${activeSliderIdx === dotIdx ? ' portfolio-slider-dot--active' : ''}`}
                aria-label={`Go to slide ${dotIdx + 1}`}
                aria-selected={activeSliderIdx === dotIdx}
              />
            ))}
          </div>

          <ScrollRevealCard
            direction="up"
            distance="MD"
            delay={0.12}
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border border-brand-gold/25 bg-gradient-to-r from-brand-card via-brand-surface to-brand-card py-5 px-5 md:py-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-gold/5 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-white font-semibold text-base md:text-lg mb-1">
                  Explore the complete portfolio gallery
                </p>
                <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-md">
                  Every branded QR, live vCard demo, and client showcase in one browsable grid.
                </p>
              </div>
              <MagneticButton
                href="/portfolio"
                className="relative z-10 shrink-0 h-11 px-6 border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-base font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-black transition-colors"
              >
                Open Portfolio Page <ExternalLink size={14} aria-hidden="true" />
              </MagneticButton>
            </div>
          </ScrollRevealCard>
        </ScrollRevealCard>
          </SectionRevealContent>
        </SectionRevealRoot>

      </div>

      <PortfolioVCardModal
        card={selectedQrCard}
        isOpen={isQrModalOpen}
        onClose={() => {
          setIsQrModalOpen(false);
          setSelectedQrCard(null);
        }}
        modalId="qr-popup"
      />

      {/* IMMERSIVE LIVE CARD SCAN SIMULATOR POPUP HANDLER */}
      {isScanning && selectedCard && (
        <div className="site-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="site-modal-panel relative w-full max-w-sm bg-neutral-950 border border-white/10 rounded-[44px] shadow-2xl p-4 overflow-hidden my-8"
          >
              
              {/* Floating top closing X button */}
              <button 
                onClick={() => {
                  setIsScanning(false);
                  setSelectedCard(null);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform z-50"
                title="Close Simulation"
              >
                <X size={14} />
              </button>

              {/* LIVE CARDS IFRAME SIMULATION WITH ELEGANT LOADING SCREEN OVERLAY */}
              <div className="flex flex-col items-center justify-center pt-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#777] font-bold block mb-1">
                  NFC Connection Active
                </span>
                <h3 className="text-white font-bold text-center text-base mb-1 tracking-tight font-sans">
                  {selectedCard.name}
                </h3>
                <p className="text-neutral-500 font-light text-[10px] mb-4 text-center max-w-[240px]">
                  {selectedCard.role} • {selectedCard.company}
                </p>
                
                <DeferredPhoneMockupFrame
                  src={selectedCard.demoUrl || vcardProfileUrl('michaelangelo-casanova-2')}
                  title={`${selectedCard.name} Live Card Interface`}
                  size="modal"
                  requireInView={false}
                  {...VCARD_MOBILE_FRAME_LOADER}
                />
              </div>

              {/* Close helper bottom footer button */}
              <div className="mt-4 text-center">
                <button 
                  onClick={() => {
                    setIsScanning(false);
                    setSelectedCard(null);
                  }}
                  className="text-[10px] font-semibold text-neutral-400 hover:text-brand-gold transition-colors underline cursor-pointer"
                >
                  Exit Scanned Portal
                </button>
              </div>

          </div>
        </div>
      )}

    </section>
  );
};


// How It Works (4 Simple Steps)
const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Create',
      desc: 'Design your custom card with logo, corporate colors, and tailored personal intro videos (DIY tool or we compile it for you).'
    },
    {
      num: '02',
      title: 'Share',
      desc: 'Send custom links or display QR codes on text messages, emails, or native corporate business cards. No application downloads needed.'
    },
    {
      num: '03',
      title: 'Impress',
      desc: 'Recipients scan and watch your dynamic 9-second introductory message, establishing high professional trust instantly.'
    },
    {
      num: '04',
      title: 'Convert',
      desc: 'Prospects easily tap to secure instant appointments, call, request free estimates, and save credentials direct to Apple/Google Wallet.'
    }
  ];

  return (
    <section className="site-section site-section--reveal bg-brand-dark border-b border-white/5 relative z-10 text-center">
      <div className="max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-8">

        <SectionRevealRoot viewport="content">
          <SectionRevealHeader className="text-center max-w-2xl mx-auto mb-16">
            <RevealEyebrow label="Four Simple Stages" className="mb-4 mx-auto" />
            <RevealText
              text="How vBiz Me Works"
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text mb-4"
              tag="h2"
            />
            <RevealParagraph
              text="Revolutionizing physical relationships is frictionless. We made sure setup, sharing, and capturing deals takes seconds."
              className="text-brand-text-muted font-light text-base sm:text-lg leading-relaxed"
            />
          </SectionRevealHeader>

          <SectionRevealGrid
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            stagger={getGridStaggerForColumns(4)}
          >
          {steps.map((step, index) => {
            const direction = getFourCardDirection(index);
            return (
              <RevealGridItem
                key={index}
                direction={direction}
                distance="LG"
                scaleOnUp={false}
                className="h-full"
              >
                <SiteGlowCard
                  radius={16}
                  className="py-6 px-4 md:py-8 md:px-6 text-left h-full"
                >
                  <div className="text-brand-gold font-mono font-extrabold text-3xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-brand-text mb-2">{step.title}</h3>
                  <p className="text-brand-text-muted text-base font-light leading-relaxed">{step.desc}</p>
                </SiteGlowCard>
              </RevealGridItem>
            );
          })}
          </SectionRevealGrid>
        </SectionRevealRoot>

      </div>
    </section>
  );
};

// Big bold final call to action at the bottom


// ==========================================
// HOW CAN WE HELP YOU FEATURE CLINIC
// ==========================================
const HowCanWeHelp = () => {
  const features: {
    title: string;
    desc: string;
    icon: CapabilityIconName;
    index: string;
  }[] = [
    {
      title: 'Customizable Design',
      desc: 'Include your logo, brand colors, and unique design elements to reflect your professional identity.',
      icon: 'edit',
      index: '01',
    },
    {
      title: 'Dynamic Intro Videos',
      desc: 'Personalized videos that introduce you and your business, tailored to your profession or brand.',
      icon: 'video',
      index: '02',
    },
    {
      title: 'Engagement Features',
      desc: 'Include call-to-action buttons, such as “Book Now” to drive immediate engagement.',
      icon: 'sparkles',
      index: '03',
    },
    {
      title: 'Social Media',
      desc: 'Clickable icons leading to your social media profiles (e.g., LinkedIn, Twitter, Facebook).',
      icon: 'layers',
      index: '04',
    },
    {
      title: 'Analytics and Tracking',
      desc: 'Monitor how often your vCard is viewed or shared, providing valuable insights into your networking efforts.',
      icon: 'trending-up',
      index: '05',
    },
    {
      title: 'QR Code Sharing',
      desc: 'Share your vCard instantly via a custom QR code that can be scanned with any smartphone.',
      icon: 'qr-code',
      index: '06',
    },
    {
      title: 'AI Assistance Integration',
      desc: 'Unleash intelligent smart greetings, speech-to-text notes transcription, and automated AI lead scoring pipelines.',
      icon: 'bot',
      index: '07',
    },
    {
      title: 'Customized Notifications',
      desc: 'Get real-time push reminders, system activity alerts, and automatic SMS updates directly on contact saves.',
      icon: 'bell',
      index: '08',
    },
    {
      title: 'Digital Wallet Feature',
      desc: 'Allow prospects to save your beautiful, verified touchless card straight into Apple Wallet and Google Pay.',
      icon: 'wallet',
      index: '09',
    },
  ];

  return (
    <section id="how-we-help" className="site-section site-section-band site-section--reveal border-b relative z-10">
      {/* Decorative cyber grid lines and soft gradient ambient back-glows */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionRevealRoot viewport="content">
          <SectionRevealHeader className="text-center max-w-4xl mx-auto mb-20">
            <RevealEyebrow label="Platform Capabilities" className="mx-auto" />

            <RevealText
              text="Created to Convert & Captivate"
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6"
              tag="h2"
              highlightedWords={["Convert", "&", "Captivate"]}
            />

            <RevealParagraph
              text="With hyper-focused features that unite dynamic engagement, physical proximity, and digital ease, our smart vCards transform simple introductions into automated, high-converting pipelines."
              className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
            />
          </SectionRevealHeader>

        <SectionRevealGrid
          id="platform-capability-cards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1344px] mx-auto capability-card-grid overflow-visible"
          stagger={getGridStaggerForColumns(3)}
        >
          {features.map((feat, idx) => {
            const direction = getThreeColumnGridDirection(idx);
            return (
              <RevealGridItem
                key={feat.index}
                direction={direction}
                distance="XL"
                className="h-full"
                scaleOnUp={direction === 'up'}
              >
                <CapabilityCard
                  index={idx}
                  className="py-6 px-4 md:py-8 md:px-6 flex flex-col items-start text-left h-full"
                >
                  <span className="capability-card__index" aria-hidden="true">
                    // CAP.{feat.index}
                  </span>
                  <CapabilityIcon name={feat.icon} />
                  <h3 className="text-brand-text font-medium text-lg tracking-wide mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <p className="text-brand-text-muted text-base font-light leading-relaxed">{feat.desc}</p>
                </CapabilityCard>
              </RevealGridItem>
            );
          })}
        </SectionRevealGrid>
        </SectionRevealRoot>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="bg-brand-dark">
      <HowCanWeHelp />
      <InteractiveDemoSection />
      <HowItWorks />
      <PortfolioSection />
    </div>
  );
}
