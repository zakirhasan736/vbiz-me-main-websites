'use client';

import { 
  ArrowRight, BarChart, Lightbulb, Play, Scan, Send, 
  ChevronLeft, ChevronRight, VolumeX, Volume2, Sparkles, Check, 
  Building, Car, Award, Scissors, Utensils, Star, Smartphone, Calendar, 
  MapPin, ThumbsUp, HelpCircle, FileText, Pause, Briefcase, X,
  QrCode, TrendingUp, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';
import { LazyQRCodeImage } from '@/components/LazyQRCodeImage';
import { DeferredPhoneMockupFrame } from '@/components/DeferredPhoneMockupFrame';
import { PortfolioVCardModal } from '@/components/PortfolioVCardModal';
import {
  PORTFOLIO_QR_CARDS,
  getPortfolioQrImageSrc,
  type PortfolioQrCard,
} from '@/lib/portfolio-qr-cards';
import { VCardInteractiveLane } from '@/components/VCardInteractiveLane';
import {
  RevealText,
  RevealParagraph,
  ScrollRevealCard,
  SectionReveal,
} from '@/components/animations/reveal';
import { CapabilityCard } from '@/components/ui/CapabilityCard';
import { CapabilityIcon } from '@/components/ui/CapabilityIcon';
import type { CapabilityIconName } from '@/lib/capability-icons';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SiteGlowCard } from '@/components/ui/SiteGlowCard';
gsap.registerPlugin(ScrollTrigger);

const qrSliderItems = PORTFOLIO_QR_CARDS;

// Interactive Demo Component ("See It In Action")
const InteractiveDemoSection = () => {
  const industries = [
    {
      id: 'contractor',
      name: 'Contractor',
      icon: <Briefcase className="w-4 h-4" />,
      company: 'Casanova Carpentry',
      introTitle: 'Michaelangelo Casanova — Master Remodeler',
      videoPlaceholder: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      tagline: 'See our high-end luxury carpentry portfolios and custom remodels.',
      services: ['Custom Fine Carpentry', 'Luxury Home Remodeling', 'High-End Timber Decks'],
      bgColor: 'border-orange-500/20 bg-orange-500/5 hover:border-orange-500/40 text-orange-400',
      ctaText: 'Get Free Estimate',
      demoUrl: 'https://app.vbizme.com/vCard/michaelangelo-casanova-2#home'
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: <Building className="w-4 h-4" />,
      company: 'Vargas Exclusive',
      introTitle: 'Chago Vargas — Elite Realtor',
      videoPlaceholder: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      tagline: 'Tour Connecticut\'s most exclusive residential listings instantly.',
      services: ['Exclusive Luxury Portfolios', 'Targeted Listing Strategy', 'Waterfront Estate Showcase'],
      bgColor: 'border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40 text-cyan-400',
      ctaText: 'Book Private Showing',
      demoUrl: 'https://app.vbizme.com/vCard/chago-vargas#home'
    },
    {
      id: 'auto-sales',
      name: 'Auto Sales',
      icon: <Car className="w-4 h-4" />,
      company: 'Premier Luxury Motors',
      introTitle: 'Walter Jofre Jr — VIP Client Advisor',
      videoPlaceholder: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
      tagline: 'Skip dealership runarounds. Instant showroom inventory VIP access.',
      services: ['Specialist Sourcing', 'Trade Appraisals', 'Fast-Track Credit Advisory'],
      bgColor: 'border-amber-400/20 bg-amber-400/5 hover:border-amber-400/40 text-amber-300',
      ctaText: 'Browse VIP Inventory',
      demoUrl: 'https://app.vbizme.com/vCard/walter-jofre-jr#home'
    },
    {
      id: 'barber',
      name: 'Master Barber',
      icon: <Scissors className="w-4 h-4" />,
      company: 'Dennis Signature Grooming',
      introTitle: 'Brian Dennis — Master Grooming Expert',
      videoPlaceholder: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      tagline: 'Book a premium barber session or straight-razor trim with ease.',
      services: ['Razor Beard Contouring', 'Premium Fades & Designs', 'Hot Towel Therapy'],
      bgColor: 'border-red-500/20 bg-red-500/5 hover:border-red-500/40 text-red-400',
      ctaText: 'Book Hair Styling',
      demoUrl: 'https://app.vbizme.com/vCard/brian-dennis#home'
    },
    {
      id: 'coach',
      name: 'Executive Coach',
      icon: <Award className="w-4 h-4" />,
      company: 'Singleton Advisory',
      introTitle: 'Sheldon Singleton — Growth Coach',
      videoPlaceholder: 'https://images.unsplash.com/photo-1552581230-c015914626ed?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      tagline: 'Transform operations and scale your company from 10M to 100M.',
      services: ['C-Suite Diagnostics', 'Scaling Blueprint Design', 'Leader Mastermind Access'],
      bgColor: 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 text-purple-400',
      ctaText: 'Schedule Advisory Briefing',
      demoUrl: 'https://app.vbizme.com/vCard/sheldon-singleton#home'
    },
    {
      id: 'restaurant',
      name: 'Restaurant',
      icon: <Utensils className="w-4 h-4" />,
      company: 'Sabor Ecuatoriano',
      introTitle: 'Sabor Ecuatoriano Kitchen — Elegant Dining',
      videoPlaceholder: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      tagline: 'Secure immediate online reservation. Experience authentic culinary flair.',
      services: ['Artisan Platters & Drinks', 'Interactive Mobile Dining Menu', 'Gourmet Catering Options'],
      bgColor: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 text-emerald-400',
      ctaText: 'Reserve Lounge Table',
      demoUrl: 'https://app.vbizme.com/vCard/sabor-ecuatoriano-3#home'
    }
  ];

  const [activeIndId, setActiveIndId] = useState('contractor');

  const activeObj = industries.find(ind => ind.id === activeIndId) || industries[2];

  return (
    <section id="see-in-action" className="site-section bg-brand-dark border-b border-white/5 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionEyebrow label="See It In Action" className="mb-4" />
          <RevealText 
            text="See Exactly What Your Customers Will Experience"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white"
            tag="h2"
          />
          <RevealParagraph 
            text="Pick your industry of interest below, then watch how a live, conversion-focused vBiz Me card operates right from the smartphone mockup."
            className="text-neutral-400 font-light text-base leading-relaxed"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls column — below phone on mobile, left on xl */}
          <ScrollRevealCard 
            direction="right"
            className="order-2 xl:order-1 lg:col-span-12 xl:col-span-5 flex flex-col gap-3"
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2 block">
              1. Toggle Industries
            </span>
            <div className="home-industry-toggle-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2.5">
              {industries.map((ind) => {
                const isActive = activeIndId === ind.id;
                return (
                  <motion.button
                    key={ind.id}
                    type="button"
                    layout
                    onClick={() => setActiveIndId(ind.id)}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-3 p-4 rounded-xl border text-left text-xs uppercase font-bold tracking-wider transition-colors duration-300 overflow-hidden ${
                      isActive
                        ? 'border-brand-gold/50 text-brand-text shadow-[0_4px_20px_rgba(212,175,55,0.12)]'
                        : 'bg-brand-card border-white/10 text-brand-text-muted hover:border-brand-gold/25 hover:bg-brand-gold/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="home-industry-active"
                        className="absolute inset-0 bg-brand-gold/15 border border-brand-gold/30 rounded-xl"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={`relative z-10 shrink-0 ${isActive ? 'text-brand-gold' : 'text-brand-text-muted'}`}>
                      {ind.icon}
                    </span>
                    <div className="relative z-10 min-w-0">
                      <span className={isActive ? 'text-brand-text' : ''}>{ind.name}</span>
                      <span className="text-[9px] text-brand-text-muted font-light block normal-case mt-0.5 truncate">
                        {ind.company}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6">
              <a 
                href="/examples"
                className="text-white hover:text-brand-gold text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                Browse Full Industry Mockup Library <ChevronRight size={14} />
              </a>
            </div>
          </ScrollRevealCard>

          {/* Interactive Screen Mockup — first on mobile, right on xl */}
          <div
            className="order-1 xl:order-2 lg:col-span-12 xl:col-span-7 flex flex-col items-center justify-center relative gap-5 pointer-events-auto z-10 home-industry-mockup"
            data-lenis-prevent-touch
          >
            <div
              key={activeObj.id}
              className="flex flex-col items-center gap-3 w-full max-w-[407px] mx-auto relative z-10"
            >
              <div className="w-full px-4 py-2.5 rounded-xl border border-brand-gold/25 bg-brand-card text-center hero-industry-demo-url">
                <span className="text-[9px] uppercase tracking-widest text-brand-text-muted font-semibold block mb-1">
                  Live Demo URL
                </span>
                <a
                  href={activeObj.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-brand-gold hover:underline break-all leading-snug hero-industry-demo-url__link"
                >
                  {activeObj.demoUrl}
                </a>
              </div>

              <VCardInteractiveLane className="w-full" id="industries-vcard-lane">
                <DeferredPhoneMockupFrame
                  key={activeObj.demoUrl}
                  src={activeObj.demoUrl}
                  title={`${activeObj.name} Demo`}
                  size="hero"
                />
              </VCardInteractiveLane>

              <p className="text-[11px] text-brand-text-muted text-center font-light">
                Tap and scroll inside the phone to explore the live vCard.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

// ==========================================
// PORTFOLIO SECTION (Interactive vCards & Tech Bento)
// ==========================================
const PortfolioSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 44, scale: 0.96, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 110,
        damping: 22,
        mass: 0.85,
      },
    },
  };

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

  const scrollToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (children[index]) {
      children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      setActiveSliderIdx(index);
    }
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
    if (el) {
      const scrollAmount = 340;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="portfolio-section" className="site-section bg-brand-dark border-b border-white/5 relative z-99 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-3/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* SECTION HEADER BLOCK */}
        <SectionReveal id="portfolio-header" className="text-center max-w-4xl mx-auto mb-16">
          <SectionEyebrow label="Live Showcases" className="mb-4" />
          <RevealText 
            text="Portfolio"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-white text-center"
            tag="h2"
          />
          <RevealParagraph 
            text="Share your vCard effortlessly with a QR code or URL link. Scanning or clicking triggers a dynamic intro video, followed by your full vCard, to reflect your unique brand. Our vCards are more than contact information—they are powerful marketing tools that stand out making an instant and lasting impression."
            className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
          />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="/portfolio"
              className="h-12 px-7 bg-brand-gold text-black text-sm font-bold tracking-wide shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_28px_rgba(212,175,55,0.4)]"
            >
              View Full Portfolio <ArrowRight size={16} aria-hidden="true" />
            </MagneticButton>
            <span className="text-neutral-500 text-xs sm:text-sm font-light">
              {qrSliderItems.length} live client showcases — tap any card below or open the gallery
            </span>
          </div>
        </SectionReveal>

        {/* TWO INTERACTIVE BENTO GRID TECH FEATURES */}
        <div className="grid hidden grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          
          {/* FEATURE 1: Analytics & Tracking Bento Widget */}
          <ScrollRevealCard 
            direction="right"
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

            <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
              Monitor how often your vCard is viewed or shared, providing valuable insights into your networking efforts.
            </p>

            {/* Simulated Live Analytics Graph Block */}
            <div className="bg-brand-surface p-5 rounded-2xl border border-white/5 relative mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Link Views</span>
                    <span className="text-lg font-bold text-white font-mono animate-[pulse_2s_infinite]">{views}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">Saves Rate</span>
                    <span className="text-lg font-bold text-brand-gold font-mono">{saves}</span>
                  </div>
                </div>
                <div className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                  +34.2% Growth
                </div>
              </div>

              {/* Sparklines vector mockup */}
              <div className="h-16 flex items-end gap-1.5 pt-2">
                {chartData.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                    <motion.div 
                      initial={{ height: '20%' }}
                      animate={{ height: `${val}%` }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        idx === chartData.length - 1 ? 'bg-brand-gold shadow-[0_0_12px_rgba(212,175,55,0.4)]' : 'bg-white/10'
                      }`}
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
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
            <AnimatePresence>
              {trackedEvent && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-neutral-900 border border-brand-gold/30 text-white font-mono text-[9px] px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 z-20"
                >
                  <Sparkles size={10} className="text-brand-gold" />
                  Real-time analytics incremented!
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollRevealCard>
          <ScrollRevealCard 
            direction="left"
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

              <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
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
                    className="w-full bg-[#131313] border border-white/10 p-3 rounded-lg text-xs leading-normal text-white placeholder-neutral-600 focus:outline-none focus:border-brand-gold/50"
                  />
                  <span className="text-[9px] text-[#666] font-light mt-1.5 block leading-tight">
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
        <div id="portfolio-slider-container" className="relative group/slider mt-12 max-w-7xl mx-auto px-1">
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
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => {
                    setSelectedQrCard(item);
                    setIsQrModalOpen(true);
                  }}
                  className={`portfolio-qr-slider-card snap-center shrink-0 w-[280px] sm:w-[300px] bg-[#2c3a34] border ${cardStyle.borderColor} ${cardStyle.glowColor} ${cardStyle.hoverGlow} rounded-[2rem] py-6 px-4 md:py-8 md:px-6 flex flex-col items-center justify-between transition-all duration-500 hover:-translate-y-2 group cursor-pointer`}
                  id={`qr-slider-card-${item.id}`}
                >
                  {/* Branded QR from /public */}
                  <div className="w-full aspect-square bg-white p-3 sm:p-4 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_12px_rgba(0,0,0,0.05),0_10px_25px_rgba(0,0,0,0.85)] group-hover:scale-[1.02] transition-transform duration-500">
                    <div 
                      className="w-full h-full rounded-xl overflow-hidden relative bg-white"
                      style={{
                        backgroundColor: '#' + qrBgColor
                      }}
                    >
                      <LazyQRCodeImage
                        src={getPortfolioQrImageSrc(item)}
                        alt={`QR Code — ${item.displayName}`}
                        className="w-full h-full object-contain"
                        bgcolor={qrBgColor}
                      />
                    </div>
                  </div>

                  {/* Name label below QR (matches branded vCard QR layout) */}
                  <div className="mt-5 flex flex-col items-center px-1">
                    <span className="portfolio-qr-slider-card__label inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[10.5px] sm:text-[11px] font-medium tracking-wide text-center leading-snug shadow-xl group-hover:border-brand-gold/40 transition-colors max-w-full">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-gold animate-pulse" />
                      <span className="line-clamp-2">{item.displayName}</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Custom Infinite Carousel Explore/Add Card Callout */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: qrSliderItems.length * 0.1 }}
              className="portfolio-qr-slider-card snap-center shrink-0 w-[280px] sm:w-[300px] bg-gradient-to-br from-[#2c3a34] to-brand-dark border border-white/5 rounded-[2rem] py-6 px-4 md:py-8 md:px-6 flex flex-col justify-between"
              id="qr-slider-explore-card"
            >
              <div className="relative z-10 pt-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-brand-gold flex items-center justify-center mb-6">
                  <Sparkles size={20} />
                </div>
                <h3 className="portfolio-qr-explore-card__title font-semibold text-lg mb-2">Full Portfolio Gallery</h3>
                <p className="portfolio-qr-explore-card__copy text-xs font-light leading-relaxed mb-4">
                  Browse every live vCard showcase, QR design, and branded client demo in one dedicated portfolio view.
                </p>
              </div>

              <a
                href="/portfolio"
                className="relative z-10 w-full mt-auto py-3.5 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-bold text-xs text-center uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.35)]"
              >
                View Full Portfolio <ChevronRight size={14} />
              </a>
            </motion.div>
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
            trigger="#portfolio-slider-container"
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border border-brand-gold/25 bg-gradient-to-r from-brand-card via-brand-surface to-brand-card py-5 px-5 md:py-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-gold/5 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-white font-semibold text-base md:text-lg mb-1">
                  Explore the complete portfolio gallery
                </p>
                <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed max-w-md">
                  Every branded QR, live vCard demo, and client showcase in one browsable grid.
                </p>
              </div>
              <MagneticButton
                href="/portfolio"
                className="relative z-10 shrink-0 h-11 px-6 border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-black transition-colors"
              >
                Open Portfolio Page <ExternalLink size={14} aria-hidden="true" />
              </MagneticButton>
            </div>
          </ScrollRevealCard>
        </div>

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
      <AnimatePresence>
        {isScanning && selectedCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
              data-lenis-prevent
          >
            {/* Modal outer element wrapper */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-neutral-950 border border-white/10 rounded-[44px] shadow-2xl p-4 overflow-hidden my-8"
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
                  src={selectedCard.demoUrl || 'https://app.vbizme.com/vCard/michaelangelo-casanova-2#home'}
                  title={`${selectedCard.name} Live Card Interface`}
                  size="modal"
                  requireInView={false}
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

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

// "The Invisible Advantage" Section (Positioning Element)

const InvisibleAdvantageTeaser = () => {
  return (
    <section className="site-section hidden bg-neutral-950 border-b border-white/5 relative z-10 overflow-hidden text-center sm:text-left">
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionEyebrow label="Strategic Advantage" className="mb-4" />
            
            <RevealText 
              text="Most digital cards are just links vBiz Me is a sales sequence."
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-6 tracking-tight leading-tight text-left"
              tag="h2"
              highlightedWords={["sales", "sequence."]}
            />
            
            <RevealParagraph 
              text="We do not just dump messy contact details. We guide prospect buyers through a proven, psychometric customer sequence:"
              className="text-neutral-400 font-light text-base leading-relaxed mb-6 block text-left"
            />

            <div className="grid grid-cols-2 gap-4 mb-8">
              <ScrollRevealCard direction="up" className="h-full">
                <SiteGlowCard radius={12} className="py-6 px-4 md:py-8 md:px-6 text-left h-full">
                  <span className="text-brand-gold text-lg font-bold block mb-1">✓ Emotion</span>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                    Humanize the initial handshake with a 9s looping intro video.
                  </p>
                </SiteGlowCard>
              </ScrollRevealCard>
              
              <ScrollRevealCard direction="right" delay={0.1} className="h-full">
                <SiteGlowCard radius={12} className="py-6 px-4 md:py-8 md:px-6 text-left h-full">
                  <span className="text-brand-gold text-lg font-bold block mb-1">✓ Identity</span>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                    Displays official corporate role, badges, and background seamlessly.
                  </p>
                </SiteGlowCard>
              </ScrollRevealCard>
              
              <ScrollRevealCard direction="left" delay={0.2} className="h-full">
                <SiteGlowCard radius={12} className="py-6 px-4 md:py-8 md:px-6 text-left h-full">
                  <span className="text-brand-gold text-lg font-bold block mb-1">✓ Proof</span>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                    Verified customer experience reviews loaded direct onto the card.
                  </p>
                </SiteGlowCard>
              </ScrollRevealCard>
              
              <ScrollRevealCard direction="down" delay={0.3} className="h-full">
                <SiteGlowCard radius={12} className="py-6 px-4 md:py-8 md:px-6 text-left h-full">
                  <span className="text-brand-gold text-lg font-bold block mb-1">✓ Action</span>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                    Smart call-to-actions (Book Now, Call Now) configured dynamically.
                  </p>
                </SiteGlowCard>
              </ScrollRevealCard>
            </div>

            <a 
              href="/advantage"
              className="text-white hover:text-brand-gold text-sm font-semibold transition-colors inline-flex items-center gap-1.5 group border-b border-white/10 hover:border-brand-gold pb-1"
            >
              Learn the full psychology <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Visual comparative diagram/infographic */}
          <ScrollRevealCard 
            direction="left"
            className="bg-brand-elevated/90 py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-emerald-500/15 relative overflow-hidden flex flex-col justify-center text-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[50px]" />
            <h3 className="text-white font-semibold text-lg mb-4 tracking-tight">Structured Direct Comparison</h3>
            <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
              Why settle for simple link-trees when your professional status deserves an elite high-converting introduction layout?
            </p>

            <div className="space-y-3 font-medium text-xs">
              <div className="flex items-center justify-between p-3.5 bg-neutral-900/40 rounded-xl">
                <span className="text-neutral-400">Paper Card Conversion</span>
                <span className="text-red-400 font-bold">&lt; 1% (Gets Thrown Away)</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-neutral-900/40 rounded-xl">
                <span className="text-neutral-400">Basic Link-in-Bio Profile</span>
                <span className="text-amber-500 font-bold">~ 4% Engagement Lift</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-white">
                <span className="text-brand-gold font-bold">vBiz Me Sequence Conversion</span>
                <span className="text-green-400 font-bold">+350% Average Lift</span>
              </div>
            </div>
          </ScrollRevealCard>

        </div>
      </div>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="site-section bg-brand-dark border-b border-white/5 relative z-10 overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionEyebrow label="Four Simple Stages" className="mb-4 mx-auto" />
          <RevealText 
            text="How vBiz Me Works"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-brand-text mb-4"
            tag="h2"
          />
          <RevealParagraph 
            text="Revolutionizing physical relationships is frictionless. We made sure setup, sharing, and capturing deals takes seconds."
            className="text-brand-text-muted text-sm font-light leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const direction = index === 0 ? "up" : index === 1 ? "right" : index === 2 ? "left" : "down";
            const delay = index * 0.12;
            return (
              <ScrollRevealCard 
                key={index}
                direction={direction}
                delay={delay}
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
                  <p className="text-brand-text-muted text-xs font-light leading-relaxed">{step.desc}</p>
                </SiteGlowCard>
              </ScrollRevealCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// Big bold final call to action at the bottom
const FinalCTA = () => {
  return (
    <section className="site-section  hidden bg-gradient-to-b from-neutral-950 to-black relative z-10 overflow-hidden text-center">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 relative z-10"
      >
        <RevealText 
          text="Stop Handing Out Cards That Get Thrown Away"
          className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight leading-tight text-center"
          tag="h2"
          highlightedWords={["Thrown", "Away"]}
        />
        <RevealParagraph 
          text="Start making every single introduction count — starting today."
          className="text-neutral-400 font-light text-base leading-relaxed mb-8 max-w-2xl mx-auto text-center block"
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/contact" 
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-brand-gold hover:bg-yellow-400 text-black font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            Create My Free vCard
          </a>
          <a 
            href="/contact" 
            className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/10 hover:border-brand-gold/40 text-white font-semibold text-sm tracking-wide bg-white/5 hover:bg-white/10 transition-all"
          >
            Book a Strategy Call
          </a>
        </div>
      </motion.div>
    </section>
  );
};

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16
      }
    }
  };

  return (
    <section id="how-we-help" className="site-section site-section-band border-b relative z-10 overflow-visible">
      {/* Decorative cyber grid lines and soft gradient ambient back-glows */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto mb-20">
          {/* Executive pre-header badge */}
          <SectionEyebrow label="Platform Capabilities" />

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto capability-card-grid">
          {features.map((feat, idx) => {
            const direction = idx % 4 === 0 ? "up" : idx % 4 === 1 ? "right" : idx % 4 === 2 ? "left" : "down";
            const delay = (idx % 3) * 0.08;
            return (
              <ScrollRevealCard 
                key={idx}
                direction={direction}
                delay={delay}
                className="h-full"
              >
                <CapabilityCard index={idx} className="py-6 px-4 md:py-8 md:px-6 flex flex-col items-start text-left h-full">
                <div className="bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-[31px]" />

                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/[0.015] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[31px]" />
                
                <span className="font-mono text-[10px] text-brand-gold/30 tracking-wider absolute top-8 right-8 group-hover:text-brand-gold/70 transition-colors duration-300">
                  // CAP.{feat.index}
                </span>

                <div className="h-[2px] w-8 bg-brand-gold/25 group-hover:w-16 group-hover:bg-brand-gold/60 transition-all duration-500 mb-6" />

                <div className="capability-card__icon p-3.5 rounded-2xl bg-brand-gold/[0.06] border border-brand-gold/20 text-brand-gold mb-6 group-hover:bg-brand-gold/[0.12] inline-block">
                  <CapabilityIcon name={feat.icon} />
                </div>
                
                <h3 className="text-brand-text font-medium text-lg tracking-wide mb-3 group-hover:text-brand-gold transition-colors duration-300">{feat.title}</h3>
                <p className="text-brand-text-muted text-sm font-light leading-relaxed">{feat.desc}</p>
                </CapabilityCard>
              </ScrollRevealCard>
            );
          })}
        </div>
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
      {/* <InvisibleAdvantageTeaser /> */}
      {/* <SocialProof /> */}
      {/* <FinalCTA /> */}
    </div>
  );
}
