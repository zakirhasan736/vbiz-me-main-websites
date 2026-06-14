'use client';

import { 
  ArrowRight, BarChart, Edit, Lightbulb, Play, Scan, Send, Video, 
  ChevronLeft, ChevronRight, VolumeX, Volume2, Sparkles, Check, 
  Building, Car, Award, Scissors, Utensils, Star, Smartphone, Calendar, 
  MapPin, ThumbsUp, HelpCircle, FileText, Pause, Briefcase, X,
  QrCode, TrendingUp, Layers, Bot, Bell, Wallet, ExternalLink
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { InteractiveParticles } from '@/components/InteractiveParticles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';
import { LazyQRCodeImage } from '@/components/LazyQRCodeImage';
import { PhoneMockupFrame } from '@/components/PhoneMockupFrame';
import { INDUSTRY_MOCKUP_IMAGES } from '@/lib/industry-mockup-images';
import { InteractiveReveal } from '@/components/InteractiveReveal';
import {
  RevealText,
  RevealParagraph,
  ScrollRevealCard,
  SectionReveal,
} from '@/components/animations/reveal';
import { usePageTransition } from '@/components/providers/page-transition-context';

gsap.registerPlugin(ScrollTrigger);

// Trusted dealer logos / labels
const TrustBar = () => {
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
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> and growing businesses across Connecticut
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Custom high-contrast realistic SVG-based QR code mockup component
const QRCodeMockup = ({ isBitcoin, isRedQr, isGoldQr, centerText }: { isBitcoin?: boolean; isRedQr?: boolean; isGoldQr?: boolean; centerText?: string }) => {
  const color = isRedQr ? '#E53E3E' : (isGoldQr ? '#D4AF37' : '#000000');
  
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-2 text-inherit select-none pointer-events-none">
      {/* Background container wrapper inside the mockup for clear separation */}
      <rect x="0" y="0" width="100" height="100" rx="14" fill="#FFFFFF" />

      {/* Finder Patterns */}
      {/* Bottom Left */}
      <rect x="7" y="7" width="22" height="22" rx="3.5" fill="none" stroke={color} strokeWidth="4.2" />
      <rect x="13" y="13" width="10" height="10" rx="1.5" fill={color} />
      
      {/* Top Right */}
      <rect x="71" y="7" width="22" height="22" rx="3.5" fill="none" stroke={color} strokeWidth="4.2" />
      <rect x="77" y="13" width="10" height="10" rx="1.5" fill={color} />
      
      {/* Bottom Left */}
      <rect x="7" y="71" width="22" height="22" rx="3.5" fill="none" stroke={color} strokeWidth="4.2" />
      <rect x="13" y="77" width="10" height="10" rx="1.5" fill={color} />
      
      {/* Alignment / Positioning pattern bottom right */}
      <rect x="73" y="73" width="10" height="10" rx="2" fill="none" stroke={color} strokeWidth="2.5" />
      <rect x="76" y="76" width="4" height="4" rx="0.5" fill={color} />

      {/* Realistic QR Data and Matrix block trails */}
      <path d="M 36,7 H 42 M 48,7 H 65 M 36,13 H 40 M 48,13 H 53 M 57,13 H 67 M 36,18 H 45 M 50,18 H 56 M 36,23 H 40 M 44,23 H 54 M 58,23 H 67" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 7,37 V 43 M 7,49 V 59 M 7,65 V 67" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 93,37 V 43 M 93,49 V 59 M 93,65 V 67" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M 37,93 H 43 M 49,93 H 67" stroke={color} strokeWidth="3" strokeLinecap="round" />
      
      {/* Center cutout area for custom logos/emblems */}
      <rect x="30" y="30" width="40" height="40" fill="white" rx="10" />
      
      {/* Central branding item custom rendering */}
      {isBitcoin ? (
        <g transform="translate(50, 50) scale(1.15)">
          {/* Circular solid orange brand badge with a white drop shadow indicator */}
          <circle cx="0" cy="0" r="11" fill="#F7931A" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="white" strokeWidth="1" />
          <text 
            x="0" 
            y="4" 
            textAnchor="middle" 
            fill="white" 
            fontSize="12.5" 
            fontFamily="sans-serif" 
            fontWeight="900"
            className="italic text-center font-serif select-none"
          >
            ₿
          </text>
        </g>
      ) : (
        <g transform="translate(50, 50)">
          {/* Pill badge with a soft border frame */}
          <rect x="-19" y="-8.5" width="38" height="17" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <text 
            x="0" 
            y="2.5" 
            textAnchor="middle" 
            fill={color === '#000000' ? '#111827' : color} 
            fontSize="6.5" 
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
            fontWeight="bold"
            className="tracking-tighter select-none font-semibold text-center"
          >
            {centerText}
          </text>
        </g>
      )}

      {/* Scattered matrix data blocks in alignment bounds */}
      <path d="M 33,30 H 37 M 63,30 H 67 M 33,70 H 37 M 63,70 H 67 M 30,33 V 37 M 30,63 V 67 M 70,33 V 37 M 70,63 V 67" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 36,40 H 42 M 58,40 H 64 M 36,60 H 42 M 58,60 H 64" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
};

// Premium mock showcase items specifically for responsive slider matching the attachments
const qrSliderItems = [
  {
    id: "michaelangelo",
    name: "michaelangelo-casanova-2",
    color: "ffffff",
    icon: "MAC",
    displayName: "Michaelangelo Casanova",
    tag: "Art & Luxury",
    desc: "Luxury business representation and high-caliber portfolio design customized for exclusive creative directors.",
    demoUrl: "https://app.vbizme.com/vCard/michaelangelo-casanova-2#home"
  },
  {
    id: "chago",
    name: "chago-vargas",
    color: "ff0000",
    icon: "CV",
    displayName: "Chago Vargas",
    tag: "Real Estate Broker",
    desc: "Elite boutique real estate representation and visual walk-through showcasing with instant scheduling pipelines.",
    demoUrl: "https://app.vbizme.com/vCard/chago-vargas#home"
  },
  {
    id: "alexander",
    name: "c-alexander-forrest",
    color: "ffffff",
    icon: "CAF",
    displayName: "C. Alexander Forrest",
    tag: "Financial Advisory",
    desc: "Prestige wealth preservation and commercial investment strategies mapping for ultra-high-net-worth creators.",
    demoUrl: "https://app.vbizme.com/vCard/c-alexander-forrest#home"
  },
  {
    id: "melissa",
    name: "melissa-masse",
    color: "ffffff",
    icon: "MM",
    displayName: "Melissa Masse",
    tag: "Corporate Law",
    desc: "Bespoke corporate litigation, strategic counsel, and contract drafting optimized with dynamic contact pathways.",
    demoUrl: "https://app.vbizme.com/vCard/melissa-masse#home"
  },
  {
    id: "glen",
    name: "glen-richards",
    color: "ffffff",
    icon: "GR",
    displayName: "Glen Richards",
    tag: "Asset Management",
    desc: "Premium sovereign wealth strategies, asset custody diagnostics, and portfolio distribution frameworks.",
    demoUrl: "https://app.vbizme.com/vCard/glen-richards#home"
  },
  {
    id: "brian",
    name: "brian-dennis",
    color: "4f46e5",
    icon: "BD",
    displayName: "Brian Dennis",
    tag: "Enterprise Sales",
    desc: "High-velocity B2B enterprise pipelines, revenue growth audits, and modern scale consulting.",
    demoUrl: "https://app.vbizme.com/vCard/brian-dennis#home"
  },
  {
    id: "thomas",
    name: "thomas-pethigal",
    color: "ffffff",
    icon: "TP",
    displayName: "Thomas Pethigal",
    tag: "Strategic Consulting",
    desc: "Dynamic change management, operational alignment, and scaling protocols for technical companies.",
    demoUrl: "https://app.vbizme.com/vCard/thomas-pethigal#home"
  },
  {
    id: "jessica",
    name: "jessica-brito",
    color: "ffffff",
    icon: "JB",
    displayName: "Jessica Brito",
    tag: "Visual Design",
    desc: "Expert branding overhauls, typography pairing, and luxury physical card representation frameworks.",
    demoUrl: "https://app.vbizme.com/vCard/jessica-brito#home"
  },
  {
    id: "tony",
    name: "tony-mint",
    color: "ffffff",
    icon: "TM",
    displayName: "Tony Mint",
    tag: "Creative Direction",
    desc: "High-end product design, interactive vector animation, and immersive digital branding systems.",
    demoUrl: "https://app.vbizme.com/vCard/tony-mint#home"
  },
  {
    id: "matheno",
    name: "matheno-bey",
    color: "ffffff",
    icon: "MB",
    displayName: "Matheno Bey",
    tag: "Consulting",
    desc: "Professional elite coaching, public relations representation, and high-impact partnership design.",
    demoUrl: "https://app.vbizme.com/vCard/matheno-bey#home"
  },
  {
    id: "sheldon",
    name: "sheldon-singleton",
    color: "ffffff",
    icon: "SS",
    displayName: "Sheldon Singleton",
    tag: "Leadership Advisory",
    desc: "Founders and CEOs growth consulting, systemic team productivity mapping, and global alignment.",
    demoUrl: "https://app.vbizme.com/vCard/sheldon-singleton#home"
  },
  {
    id: "clinton",
    name: "clinton-h-weston-jr",
    color: "ffffff",
    icon: "CW",
    displayName: "Clinton H. Weston Jr",
    tag: "Logistics Expert",
    desc: "Sovereign global supply chain architecture, port clearing diagnostics, and rapid freight pathways.",
    demoUrl: "https://app.vbizme.com/vCard/clinton-h-weston-jr#home"
  },
  {
    id: "lisa",
    name: "lisa-mh-williams",
    color: "ffffff",
    icon: "LW",
    displayName: "Lisa MH Williams",
    tag: "Sovereign Law",
    desc: "Bespoke legal advisory, family trust security, and corporate legal risk mitigation structures.",
    demoUrl: "https://app.vbizme.com/vCard/lisa-mh-williams#home"
  },
  {
    id: "stephan",
    name: "stephan-brewer",
    color: "ffffff",
    icon: "SB",
    displayName: "Stephan Brewer",
    tag: "Growth Marketing",
    desc: "Performance marketing, conversion-focused paid acquisition audits, and scale advisory.",
    demoUrl: "https://app.vbizme.com/vCard/stephan-brewer#home"
  },
  {
    id: "kenneth",
    name: "kenneth-pierce",
    color: "ffffff",
    icon: "KP",
    displayName: "Kenneth Pierce",
    tag: "Corporate Strategy",
    desc: "Executive recruitment systems, operational performance mapping, and digital transformation.",
    demoUrl: "https://app.vbizme.com/vCard/kenneth-pierce#home"
  },
  {
    id: "mayan",
    name: "mayan-botanicals",
    color: "4f46e5",
    icon: "MB",
    displayName: "Mayan Botanicals",
    tag: "Wellness Boutique",
    desc: "Custom formulas, specialized raw botanical supply, and premium direct-to-consumer organic lines.",
    demoUrl: "https://app.vbizme.com/vCard/mayan-botanicals#home"
  },
  {
    id: "walter",
    name: "walter-jofre-jr",
    color: "ffffff",
    icon: "WJ",
    displayName: "Walter Jofre Jr",
    tag: "Automotive Executive",
    desc: "Showroom stocks cataloguing, bespoke wholesale transactions, and fleet financial optimization.",
    demoUrl: "https://app.vbizme.com/vCard/walter-jofre-jr#home"
  },
  {
    id: "sabor",
    name: "sabor-ecuatoriano-3",
    color: "ff0000",
    icon: "SE",
    displayName: "Sabor Ecuatoriano",
    tag: "Gastronomy Boutique",
    desc: "Signature gourmet catering, fine dining events, and exclusive menus designed with heritage.",
    demoUrl: "https://app.vbizme.com/vCard/sabor-ecuatoriano-3#home"
  }
];

// Hero section with video on mockup on the right
const Hero = ({ heroHeading }: { heroHeading?: React.ReactNode }) => {
  const { revealReady } = usePageTransition();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 250]);
  const yGrid = useTransform(scrollY, [0, 1000], [0, 75]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll to demo helper
  const scrollToDemo = () => {
    const demoElement = document.getElementById('see-in-action');
    if (demoElement) {
      window.scrollTo({
        top: demoElement.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = isMuted;
      
      const firePlay = () => {
        if (isPlaying) {
          video.play().catch(err => {
            console.log("Auto-play blocked or failed", err);
          });
        } else {
          video.pause();
        }
      };

      firePlay();

      const handleUserGesture = () => {
        if (isPlaying && video.paused) {
          video.play().catch(() => {});
        }
      };

      window.addEventListener('click', handleUserGesture, { once: true });
      window.addEventListener('touchstart', handleUserGesture, { once: true });

      return () => {
        window.removeEventListener('click', handleUserGesture);
        window.removeEventListener('touchstart', handleUserGesture);
      };
    }
  }, [isPlaying, isMuted]);

  return (
    <section className="section-hero relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-black">
      {/* Background Orbs and Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,#111111_0%,black_100%)] opacity-85" />
        <motion.div 
          style={{ y: y1 }}
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-1/3 w-[800px] h-[500px] bg-brand-gold/15 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div 
          style={{ y: y2 }}
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-5 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"
        />
        <motion.div 
          style={{ y: yGrid }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" 
        />
        {/* Subtle, interactive particle background */}
        <InteractiveParticles />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* Left column: Compelling pitch — static wrapper so LCP h1 is not gated by motion */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles size={12} /> Real-time Video Introductions
          </div>

          {heroHeading ?? (
            <RevealText
              text="The Virtual Business Card That Sells Before You Even Speak"
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight text-white text-left"
              tag="h1"
              highlightedWords={['Sells']}
              centered={false}
              priority
            />
          )}
          
          <RevealParagraph 
            text="Discover the vBiz Me virtual business card (vCard)—an innovative leap in digital networking designed to make a powerful emotional impact."
            className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed mb-8 max-w-2xl text-left"
            delay={0.2}
            centered={false}
          />

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-10 relative">
            <MagneticButton 
              href="/contact"
              className="bg-brand-gold hover:bg-yellow-400 text-black font-semibold h-14 px-8 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.25)] w-full sm:w-auto"
            >
              Create My Free vCard <ArrowRight size={16} />
            </MagneticButton>
            
            <MagneticButton 
              onClick={() => setIsPopupOpen(true)}
              className="border border-white/10 bg-white/5 text-white font-medium h-14 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-colors w-full sm:w-auto text-sm shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <BarChart size={12} className="text-brand-gold" />
              </div>
              See How We Beat The Competition
            </MagneticButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-neutral-500 text-xs">
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-brand-gold" /> No Application Required
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-brand-gold" /> Instant Smartphone Saving
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-brand-gold" /> Unlimited Sharing Limits
            </div>
          </div>
        </div>

        {/* Right column: Ultra-modern premium floating showcase card design with ambient styling */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={revealReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: revealReady ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative md:pr-4 w-full"
        >
          {/* Ambient Glow Backgrounds */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-brand-gold/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

          {/* Core Widescreen Showcase Container */}
          <div className="relative w-full max-w-[620px] h-[460px] sm:h-[540px] lg:h-[580px] bg-neutral-950/70 backdrop-blur-md rounded-2xl border border-white/10 hover:border-brand-gold/30 transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.05)] overflow-hidden z-10 flex flex-col">
            
            {/* Elegant Top Status Overlay */}
            <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/80 to-transparent z-20 px-4 flex items-center justify-between text-[10px] text-white/60 font-mono tracking-widest uppercase">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Demo
              </span>
              <span className="text-brand-gold font-semibold">Widescreen Feature Presentation</span>
            </div>

            {/* Video component with object-cover so we view in full heightened presentation */}
            <video
              ref={videoRef}
              src="https://www.vbizme.com/wp-content/uploads/2024/08/vBizMe_080624_IT002.mp4"
              autoPlay
              loop
              muted={true}
              playsInline
              onLoadedMetadata={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
              className={`absolute inset-0 w-full h-full object-cover bg-black transition-all duration-700 ${isPlaying ? 'opacity-95 scale-100' : 'opacity-30 scale-95'}`}
            />

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-neutral-950/80 to-transparent pointer-events-none z-10" />

            {/* High-Contrast Interactive Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-30 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
              <button 
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:bg-black/90 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </button>
              <button 
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-black hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer shadow-lg"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
              </button>
            </div>

            {/* Audio Indicator (Glow Bar visualizer) */}
            {isPlaying && !isMuted ? (
              <div className="absolute bottom-28 right-4 flex items-end gap-0.5 h-6 z-20 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                <span className="w-0.5 bg-brand-gold rounded-full animate-[pulse_0.8s_infinite] h-2" />
                <span className="w-0.5 bg-brand-gold rounded-full animate-[pulse_0.6s_infinite] h-4" />
                <span className="w-0.5 bg-brand-gold rounded-full animate-[pulse_0.7s_infinite] h-3" />
                <span className="w-0.5 bg-brand-gold rounded-full animate-[pulse_0.5s_infinite] h-5" />
              </div>
            ) : null}

            {/* Micro Audio warning overlay when playing muted */}
            {isPlaying && isMuted && (
              <div className="absolute bottom-28 left-4 z-20">
                <button 
                  onClick={() => setIsMuted(false)} 
                  className="flex items-center gap-1 px-2 py-1 bg-black/60 hover:bg-black/80 border border-white/10 rounded-md text-[9px] text-brand-gold font-mono uppercase tracking-wider animate-bounce cursor-pointer border-none outline-none"
                >
                  <VolumeX size={10} /> Tap for Sound
                </button>
              </div>
            )}

            {/* Overlay content: Elegant Identity Box */}
            <div className="absolute bottom-20 left-4 right-4 z-20">
              <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-xl transition-all duration-300 group-hover:border-brand-gold/30">
                <div className="flex items-center gap-1 text-[8px] uppercase tracking-wider text-brand-gold font-bold mb-1">
                  <Sparkles size={8} /> Elevated Networking
                </div>
                <p className="text-[11px] text-white/90 font-medium leading-normal italic">
                  "Watch a vCard capture immediate context, engaging connections instantly."
                </p>
              </div>
            </div>

            {/* Bottom Profile Anchor (decorative demo UI — not page structure) */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 bg-neutral-950/90 backdrop-blur-xl border-t border-white/15 flex gap-2.5 items-center z-20"
              aria-hidden="true"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-gold/30 relative">
                <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80" alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[11px] font-semibold text-white truncate tracking-wide">Michael Casanova</p>
                <p className="text-[9px] text-neutral-400 font-light truncate">Hartford Motors Advisor</p>
              </div>
              <button className="h-7 px-3.5 rounded-full bg-brand-gold text-black font-semibold text-[9px] tracking-wider uppercase shrink-0 hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_2px_10px_rgba(212,175,55,0.25)]">
                Save Contact
              </button>
            </div>

            {/* Play overlay for touch screens or when paused */}
            {!isPlaying && (
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full bg-black/60 flex items-center justify-center z-20 transition-colors cursor-pointer group border-none outline-none"
              >
                <div className="w-14 h-14 rounded-full bg-brand-gold/95 flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
                  <Play size={20} fill="currentColor" className="ml-1 text-black" />
                </div>
              </button>
            )}

          </div>

          {/* MODERN FLOATING DECORATIONS (Dashboard Widget Overlays) */}
          {/* Widget 1: Live Analytics Counter (Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20, y: 30 }}
            animate={revealReady ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -20, y: 30 }}
            transition={{ delay: revealReady ? 0.3 : 0, duration: 0.6 }}
            className="absolute bottom-8 -left-12 bg-neutral-950/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl z-20 flex flex-col gap-1 w-32 hidden md:flex"
          >
            <div className="flex items-center justify-between text-[9px] text-neutral-400">
              <span>Saved Rate</span>
              <span className="text-emerald-500 font-bold font-mono">+140%</span>
            </div>
            <div className="text-lg font-bold text-white font-mono">92.4%</div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-brand-gold h-full rounded-full w-[92.4%]" />
            </div>
          </motion.div>

          {/* Widget 2: Micro Heatmap Spark Widget (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={revealReady ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: -20 }}
            transition={{ delay: revealReady ? 0.5 : 0, duration: 0.6 }}
            className="absolute top-12 -right-10 bg-neutral-950/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl z-20 flex items-center gap-3 w-36 hidden md:flex"
          >
            <div className="p-1 px-1.5 rounded-lg bg-brand-gold/15 text-brand-gold">
              <Sparkles size={12} />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-neutral-400 uppercase tracking-widest">Speed Dial</span>
              <span className="text-xs font-bold text-white leading-tight">Instant Lead</span>
            </div>
          </motion.div>
        </motion.div>

      </div>

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
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-6 px-4 md:py-8 md:px-6"
            >
              {/* Header */}
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

              {/* Image content */}
              <div className="relative aspect-[16/9] w-full bg-black/30 rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                <img
                  src="https://www.vbizme.com/wp-content/uploads/2026/04/vBiz-Me-Competative-Analysis.png"
                  alt="vBiz-Me Competitive Analysis Layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              {/* Footer details */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <p className="text-neutral-500 font-light text-center sm:text-left">
                  Designed to transform standard handshakes into premium sales opportunities.
                </p>
                <div className="flex items-center gap-3">
                  <button
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

      <TrustBar />
    </section>
  );
};

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
    <section id="see-in-action" className="site-section bg-black border-b border-white/5 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} /> See It In Action
          </motion.div>
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
          
          {/* Controls column */}
          <ScrollRevealCard 
            direction="right"
            className="lg:col-span-12 xl:col-span-5 flex flex-col gap-3"
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2 block">
              1. Toggle Industries
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-1 gap-2.5">
              {industries.map((ind) => {
                const isActive = activeIndId === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndId(ind.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left text-xs uppercase font-bold tracking-wider transition-all duration-300 relative ${
                      isActive 
                        ? 'bg-neutral-900 border-brand-gold/30 text-white shadow-xl' 
                        : 'bg-neutral-950/40 border-white/5 text-neutral-500 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 inset-y-0 w-1 bg-brand-gold" />
                    )}
                    <span className={isActive ? 'text-brand-gold' : 'text-neutral-600'}>
                      {ind.icon}
                    </span>
                    <div>
                      <span>{ind.name}</span>
                      <span className="text-[9px] text-neutral-500 font-light block normal-case mt-0.5">
                        {ind.company}
                      </span>
                    </div>
                  </button>
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

          {/* Interactive Screen Mockup column */}
          <InteractiveReveal className="lg:col-span-12 xl:col-span-7 flex justify-center relative">
            <PhoneMockupFrame
              src={activeObj.demoUrl}
              previewImage={INDUSTRY_MOCKUP_IMAGES[activeObj.id as keyof typeof INDUSTRY_MOCKUP_IMAGES]}
              title={`${activeObj.name} Demo`}
              size="hero"
            />
          </InteractiveReveal>

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
  const [selectedQrCard, setSelectedQrCard] = useState<any>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [showModalPhoneFrame, setShowModalPhoneFrame] = useState(false);

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


  // Starts the interactive Scanning flow
  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setIsScanning(true);
    setContactSaved(false);
  };

  // Skip video straight to digital card layout
  const skipToCard = () => {
    setScanStep(2);
  };

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
    <section id="portfolio-section" className="site-section bg-black border-b border-white/5 relative z-99 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-3/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* SECTION HEADER BLOCK */}
        <SectionReveal id="portfolio-header" className="text-center max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Layers size={14} /> Live Showcases
          </motion.div>
          <RevealText 
            text="Portfolio"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-white text-center"
            tag="h2"
          />
          <RevealParagraph 
            text="Share your vCard effortlessly with a QR code or URL link. Scanning or clicking triggers a dynamic intro video, followed by your full vCard, to reflect your unique brand. Our vCards are more than contact information—they are powerful marketing tools that stand out making an instant and lasting impression."
            className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
          />
        </SectionReveal>

        {/* TWO INTERACTIVE BENTO GRID TECH FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          
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
            <div className="bg-[#090909] p-5 rounded-2xl border border-white/5 relative mb-6">
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
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#090909] py-6 px-4 md:py-8 md:px-6 rounded-2xl border border-white/5 mb-6">
                
                {/* Dynamically Jittering QR grid to look simulated */}
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex-shrink-0 flex items-center justify-center border border-brand-gold/30 shadow-[0_0_20px_rgba(211,175,55,0.08)] relative overflow-hidden">
                  <div className={`grid grid-cols-6 gap-0.5 w-full h-full transition-all duration-200 ${isMorphing ? 'scale-90 opacity-40 blur-[0.5px]' : 'scale-100 opacity-90'}`}>
                    {[...Array(36)].map((_, i) => {
                      // Make certain fields solid like standard QR markers
                      const isCornerMarker = 
                        (i >= 0 && i <= 1) || (i >= 4 && i <= 5) || 
                        (i % 6 === 0 && i <= 7) || 
                        (i >= 30 && i <= 31) || (i >= 34 && i <= 35);
                      // Generate pseudorandom layout toggled by inputted string
                      const triggerVal = (qrInput.length * i * 7) % 3 === 0;
                      return (
                        <div 
                          key={i} 
                          className={`rounded-xs transition-colors duration-150 ${
                            isCornerMarker || triggerVal ? 'bg-neutral-950' : 'bg-transparent'
                          }`}
                        />
                      );
                    })}
                  </div>
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
              const qrFgColor = item.color === 'ff0000' ? 'e50000' : (item.color === '4f46e5' ? '4f46e5' : '000000');
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(item.demoUrl)}&color=${qrFgColor}&bgcolor=${qrBgColor}`;

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
                    setShowModalPhoneFrame(false);
                  }}
                  className={`snap-center shrink-0 w-[280px] sm:w-[300px] bg-[#0c0d10] border ${cardStyle.borderColor} ${cardStyle.glowColor} ${cardStyle.hoverGlow} rounded-[2rem] py-6 px-4 md:py-8 md:px-6 flex flex-col items-center justify-between transition-all duration-500 hover:-translate-y-2 group cursor-pointer`}
                  id={`qr-slider-card-${item.id}`}
                >
                  {/* Embedded custom high-resolution white QR Container with glowing drop-shadow */}
                  <div className="w-full aspect-square bg-white p-5 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_12px_rgba(0,0,0,0.05),0_10px_25px_rgba(0,0,0,0.85)] group-hover:scale-[1.02] transition-transform duration-500">
                    <div 
                      className="w-full h-full rounded-xl overflow-hidden relative shadow-inner bg-white"
                      style={{
                        backgroundColor: '#' + qrBgColor
                      }}
                    >
                      <LazyQRCodeImage
                        src={qrUrl}
                        alt={item.displayName}
                        className="w-full h-full object-cover mix-blend-multiply"
                        bgcolor={qrBgColor}
                      />
                      
                      {/* Center Brand icon simulation matching our-work page */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {item.name !== 'bitcoin' && (
                           <div className="w-[18%] h-[18%] max-w-[50px] max-h-[50px] bg-white rounded-lg flex items-center justify-center shadow-md border border-gray-100 overflow-hidden transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                             <div className="text-[7.5px] sm:text-[9.5px] font-bold text-center text-black px-0.5 uppercase w-full break-words leading-tight">{item.icon}</div>
                           </div>
                        )}
                        {item.name === 'bitcoin' && (
                           <div className="w-[18%] h-[18%] max-w-[50px] max-h-[50px] bg-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 -rotate-12 transition-transform duration-500">
                              <span className="text-white text-sm sm:text-base font-bold -ml-[1.5px] mt-[0.5px]">₿</span>
                           </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Styled Badge Pill below the QR */}
                  <div className="mt-5 flex flex-col items-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900/95 border border-white/10 text-white text-[11px] font-medium tracking-wide shadow-xl group-hover:border-brand-gold/40 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      {item.tag}
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
              className="snap-center shrink-0 w-[280px] sm:w-[300px] bg-gradient-to-br from-[#0c0d10] to-black border border-white/5 rounded-[2rem] py-6 px-4 md:py-8 md:px-6 flex flex-col justify-between"
              id="qr-slider-explore-card"
            >
              <div className="relative z-10 pt-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-brand-gold flex items-center justify-center mb-6">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Build Yours Now</h3>
                <p className="text-neutral-400 text-xs font-light leading-relaxed mb-4">
                  Access our interactive vCard simulator matrix featuring contractor builders, real estate listings, sales executives, and custom branding integrations.
                </p>
              </div>

              <a
                href="/examples"
                className="relative z-10 w-full mt-auto py-3.5 px-4 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-semibold text-xs text-center uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-300"
              >
                Explore Template Library <ChevronRight size={14} />
              </a>
            </motion.div>
          </div>
          
          {/* Responsive scroll indicators at bottom of slider */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {Array.from({ length: qrSliderItems.length + 1 }).map((_, dotIdx) => {
              const isActive = activeSliderIdx === dotIdx;
              return (
                <button
                  key={dotIdx}
                  onClick={() => scrollToSlide(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'w-6 bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]' 
                      : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              );
            })}
          </div>
        </div>

      </div>

      {/* EXCLUSIVE CUSTOM QR CARD POPUP MODAL (MINIC CARD 2 MATCH) */}
      <AnimatePresence>
        {isQrModalOpen && selectedQrCard && (() => {
          const qrBgColor = 'ffffff';
          const qrFgColor = selectedQrCard.color === 'ff0000' ? 'e50000' : (selectedQrCard.color === '4f46e5' ? '4f46e5' : '000000');
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(selectedQrCard.demoUrl)}&color=${qrFgColor}&bgcolor=${qrBgColor}`;

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsQrModalOpen(false);
                setSelectedQrCard(null);
              }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
              id="qr-popup-backdrop"
              data-lenis-prevent
            >
              {/* Modal outer element wrapper */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full ${showModalPhoneFrame ? 'max-w-[380px]' : 'max-w-[360px]'} bg-[#0c0d10] border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.9)] py-6 px-4 md:py-8 md:px-6 overflow-hidden flex flex-col text-center transition-all duration-300`}
                id="qr-popup-modal"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[50px] pointer-events-none" />

                {/* Back button */}
                {showModalPhoneFrame && (
                  <button 
                    onClick={() => setShowModalPhoneFrame(false)}
                    className="absolute top-5 left-5 text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors z-50 font-sans text-xs font-semibold"
                  >
                    ← Back
                  </button>
                )}

                {/* Top closing rounded button */}
                <button 
                  onClick={() => {
                    setIsQrModalOpen(false);
                    setSelectedQrCard(null);
                  }}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/60 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform z-50"
                  title="Close"
                  id="qr-popup-close-btn"
                >
                  <X size={14} />
                </button>

                {showModalPhoneFrame ? (
                  <div className="flex flex-col items-center justify-center mt-6">
                    <h3 className="text-white font-bold text-lg mb-1 tracking-tight">
                      {selectedQrCard.displayName} Live View
                    </h3>
                    <p className="text-neutral-400 font-light text-[11px] mb-4">
                      Interact with the live digital business card mockup below inside this secure preview frame.
                    </p>
                    
                    <PhoneMockupFrame
                      src={selectedQrCard.demoUrl || 'https://app.vbizme.com/vCard/michaelangelo-casanova-2#home'}
                      title={`${selectedQrCard.displayName} Live Card Interface`}
                      size="modal"
                    />
                  </div>
                ) : (
                  <>
                    {/* Massive White Card containing QR */}
                    <div className="w-full aspect-square bg-white py-6 px-4 md:py-8 md:px-6 rounded-3xl relative overflow-hidden flex items-center justify-center mx-auto mb-6 max-w-[270px] border border-neutral-100 shadow-[0_15px_35px_rgba(0,0,0,0.65)] mt-4">
                      <div 
                        className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner bg-white"
                        style={{
                          backgroundColor: '#' + qrBgColor
                        }}
                      >
                        <LazyQRCodeImage
                          src={qrUrl}
                          alt={selectedQrCard.displayName}
                          className="w-full h-full object-cover mix-blend-multiply"
                          bgcolor={qrBgColor}
                        />
                        
                        {/* Center Brand icon simulation matching our-work page */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          {selectedQrCard.name !== 'bitcoin' && (
                             <div className="w-[18%] h-[18%] max-w-[65px] max-h-[65px] bg-white rounded-xl flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.15)] border-2 border-white overflow-hidden">
                               <div className="text-[9px] sm:text-[11px] font-bold text-center text-black px-0.5 uppercase w-full break-words leading-tight">{selectedQrCard.icon}</div>
                             </div>
                          )}
                          {selectedQrCard.name === 'bitcoin' && (
                             <div className="w-[18%] h-[18%] max-w-[65px] max-h-[65px] bg-orange-500 rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(249,115,22,0.35)] border-4 border-white">
                                <span className="text-white text-lg sm:text-xl font-bold -ml-[2px] mt-[0.5px]">₿</span>
                             </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Selected QR Card Info details */}
                    <h3 className="text-white font-bold text-xl mb-1 tracking-tight">
                      {selectedQrCard.displayName}
                    </h3>
                    <p className="text-neutral-400 font-light text-[12.5px] leading-relaxed px-3">
                      {selectedQrCard.desc}
                    </p>

                    {/* Golden button exactly matching Attachment mockup */}
                    <button 
                      onClick={() => setShowModalPhoneFrame(true)}
                      className="bg-brand-gold hover:bg-yellow-400 text-black font-semibold text-xs uppercase tracking-wider py-3.5 px-8 rounded-full flex items-center justify-center gap-2 transition-all mt-6 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] active:scale-95 duration-300 mx-auto w-[220px] cursor-pointer"
                      id="qr-popup-visit-btn"
                    >
                      <ExternalLink size={13} /> Visit Demo Card
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

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
                
                <PhoneMockupFrame
                  src={selectedCard.demoUrl || 'https://app.vbizme.com/vCard/michaelangelo-casanova-2#home'}
                  title={`${selectedCard.name} Live Card Interface`}
                  size="modal"
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
    <section className="site-section bg-neutral-950 border-b border-white/5 relative z-10 overflow-hidden text-center sm:text-left">
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-brand-gold mb-4">
              <Award size={12} /> Strategic Advantage
            </div>
            
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
              <ScrollRevealCard direction="up" className="py-6 px-4 md:py-8 md:px-6 rounded-xl bg-black border border-white/5 text-left">
                <span className="text-brand-gold text-lg font-bold block mb-1">✓ Emotion</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  Humanize the initial handshake with a 9s looping intro video.
                </p>
              </ScrollRevealCard>
              
              <ScrollRevealCard direction="right" delay={0.1} className="py-6 px-4 md:py-8 md:px-6 rounded-xl bg-black border border-white/5 text-left">
                <span className="text-brand-gold text-lg font-bold block mb-1">✓ Identity</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  Displays official corporate role, badges, and background seamlessly.
                </p>
              </ScrollRevealCard>
              
              <ScrollRevealCard direction="left" delay={0.2} className="py-6 px-4 md:py-8 md:px-6 rounded-xl bg-black border border-white/5 text-left">
                <span className="text-brand-gold text-lg font-bold block mb-1">✓ Proof</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  Verified customer experience reviews loaded direct onto the card.
                </p>
              </ScrollRevealCard>
              
              <ScrollRevealCard direction="down" delay={0.3} className="py-6 px-4 md:py-8 md:px-6 rounded-xl bg-black border border-white/5 text-left">
                <span className="text-brand-gold text-lg font-bold block mb-1">✓ Action</span>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  Smart call-to-actions (Book Now, Call Now) configured dynamically.
                </p>
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
            className="bg-black/90 py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-center text-center"
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
    <section className="site-section bg-black border-b border-white/5 relative z-10 overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[#777] font-bold block mb-2"
          >
            Four Simple Stages
          </motion.span>
          <RevealText 
            text="How vBiz Me Works"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4"
            tag="h2"
          />
          <RevealParagraph 
            text="Revolutionizing physical relationships is frictionless. We made sure setup, sharing, and capturing deals takes seconds."
            className="text-neutral-400 text-sm font-light leading-relaxed"
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
                className="bg-neutral-950 py-6 px-4 md:py-8 md:px-6 rounded-2xl border border-white/5 relative group hover:border-brand-gold/30 transition-all duration-300 text-left h-full"
              >
                {/* Giant number indicator */}
                <div className="text-brand-gold font-mono font-extrabold text-3xl mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-xs font-light leading-relaxed">{step.desc}</p>
              </ScrollRevealCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// Social Proof & Results (Direct from Redesign brief context)
const SocialProof = () => {
  const reviews = [
    {
      rater: "Dave K.",
      role: "Sales Executive",
      comp: "Subaru of Hartford",
      quote: "Closed 3 extra vehicle sales in my first 10 days using vBiz Me. Prospects absolutely love watching a quick welcoming greeting before checking inventory.",
      val: "5-Star Experience",
      initial: "D",
      icon: Car,
      color: "from-brand-gold via-amber-400 to-orange-500"
    },
    {
      rater: "Samantha L.",
      role: "Sales Advisor",
      comp: "Gallagher Buick/GMC",
      quote: "No one throws my card away anymore. It sits perfectly mapped in their active iPhone Wallet. My referral rate surged 47% in two months.",
      val: "5-Star Experience",
      initial: "S",
      icon: TrendingUp,
      color: "from-amber-400 via-brand-gold to-yellow-500"
    },
    {
      rater: "Marcus Vance",
      role: "CEO / Contractor",
      comp: "Vance Custom Builders",
      quote: "Clients take a 9-second tour of my recent kitchen additions, tap direct to call, are highly impressed, and schedule estimates instantly without email delays.",
      val: "5-Star Experience",
      initial: "M",
      icon: Building,
      color: "from-orange-500 via-brand-gold to-amber-500"
    },
    {
      rater: "Clarissa Thorne",
      role: "Lead Broker",
      comp: "Apex Luxury Properties",
      quote: "The brand integration is immaculate. Clients watch our high-production digital greetings, browse our latest listings directly on the card, and schedule viewings seamlessly.",
      val: "5-Star Experience",
      initial: "C",
      icon: Award,
      color: "from-yellow-400 via-amber-500 to-brand-gold"
    },
    {
      rater: "Dr. Raymond Miller",
      role: "Founder",
      comp: "Align Chiropractic Clinic",
      quote: "Our missed appointments plummeted to zero. Clients scan our desk QR, save our smart contact entry directly, and can book real-time adjustments with one tap.",
      val: "5-Star Experience",
      initial: "R",
      icon: Briefcase,
      color: "from-brand-gold via-orange-400 to-yellow-500"
    },
    {
      rater: "Sophie Dubois",
      role: "Creative Director",
      comp: "Atelier Design Co.",
      quote: "My digital card acts as an active, high-converting portfolio deck. We've secured multiple premium design retainers within active networking circles using this platform.",
      val: "5-Star Experience",
      initial: "S",
      icon: Sparkles,
      color: "from-amber-500 via-brand-gold to-orange-500"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Indices for three visible cards
  const prevIdx = (currentIndex - 1 + reviews.length) % reviews.length;
  const currentIdx = currentIndex;
  const nextIdx = (currentIndex + 1) % reviews.length;

  return (
    <section className="site-section bg-black border-b border-white/5 relative z-10 overflow-hidden text-center animate-fade-in">
      {/* Background ambient halos */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-brand-gold/[0.015] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/[0.04] border border-brand-gold/15 backdrop-blur-md mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.25em] text-brand-gold uppercase font-semibold">Social Proof & Impact</span>
          </motion.div>
          <RevealText 
            text="Real Results from Real Professionals"
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight leading-tight"
            tag="h2"
          />
          <RevealParagraph 
            text="Hear from leading sales representatives and small businesses who completely digitized their high-value client acquisitions."
            className="text-neutral-400 text-sm font-light leading-relaxed"
          />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto text-left relative z-10">
          <ScrollRevealCard direction="up" className="py-6 px-4 md:py-8 md:px-6 rounded-[2rem] bg-gradient-to-br from-[#0c0d10] to-[#040405] border border-white/5 relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
            <span className="text-4xl sm:text-5xl font-extrabold text-brand-gold block mb-1">0%</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">Trash-Bin Waste Rate</span>
          </ScrollRevealCard>
          
          <ScrollRevealCard direction="right" delay={0.12} className="py-6 px-4 md:py-8 md:px-6 rounded-[2rem] bg-gradient-to-br from-[#0c0d10] to-[#040405] border border-white/5 relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
            <span className="text-4xl sm:text-5xl font-extrabold text-brand-gold block mb-1">+47%</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">Average Referral Surge</span>
          </ScrollRevealCard>
          
          <ScrollRevealCard direction="left" delay={0.24} className="py-6 px-4 md:py-8 md:px-6 rounded-[2rem] bg-gradient-to-br from-[#0c0d10] to-[#040405] border border-white/5 relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.02] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
            <span className="text-4xl sm:text-5xl font-extrabold text-brand-gold block mb-1">&lt; 2s</span>
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">Frictionless Load Time</span>
          </ScrollRevealCard>
        </div>

        {/* Testimonials 3-Card Carousel Area */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-6xl mx-auto px-4 md:px-12"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main layout row holding the 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center relative min-h-[440px] pointer-events-auto">
            
            {/* Left flank card (prior card on deck) */}
            <div 
              className="hidden md:flex flex-col justify-between py-6 px-4 md:py-8 md:px-6 rounded-[2.25rem] bg-gradient-to-br from-[#0a0a0d] to-[#040405] border border-white/5 opacity-35 hover:opacity-70 scale-[0.93] blur-[0.5px] cursor-pointer hover:scale-[0.96] transition-all duration-500 text-left hover:border-brand-gold/25 relative overflow-hidden" 
              onClick={handlePrev}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.02),transparent)] pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5 bg-neutral-900/60 py-1.5 px-3 rounded-full border border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="#D4AF37" className="opacity-50" strokeWidth={0} />
                    ))}
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 ml-1.5">
                      Verified
                    </span>
                  </div>
                  {(() => {
                    const PrevIcon = reviews[prevIdx].icon;
                    return (
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-neutral-500 flex items-center justify-center">
                        <PrevIcon size={14} />
                      </div>
                    );
                  })()}
                </div>
                <p className="text-neutral-400 font-light text-[12.5px] italic leading-relaxed line-clamp-5">
                  “{reviews[prevIdx].quote}”
                </p>
              </div>
              <div className="border-t border-white/5 pt-5 mt-6 flex gap-3.5 items-center">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${reviews[prevIdx].color} flex items-center justify-center text-black font-extrabold text-sm shadow-md`}>
                  {reviews[prevIdx].initial}
                </div>
                <div className="overflow-hidden">
                  <span className="text-neutral-300 font-semibold text-xs block truncate">{reviews[prevIdx].rater}</span>
                  <span className="text-neutral-500 text-[10.5px] font-light block truncate mt-0.5">{reviews[prevIdx].role} — {reviews[prevIdx].comp}</span>
                </div>
              </div>
            </div>

            {/* Active focused center card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1.04, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-br from-[#0f1014] to-[#040405] border border-brand-gold/25 py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] relative shadow-[0_25px_60px_-15px_rgba(212,175,55,0.12),0_15px_30px_rgba(0,0,0,0.85)] overflow-hidden text-left flex flex-col justify-between group z-10 hover:border-brand-gold/40 transition-colors"
                id="active-testimonial-card"
              >
                {/* Micro gold borders and styling */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.034),transparent)] pointer-events-none" />
                
                {/* Elegant giant background quotation mark */}
                <span className="absolute top-10 right-10 text-[190px] font-serif text-brand-gold/[0.035] select-none pointer-events-none leading-none font-extrabold">
                  ”
                </span>

                <div>
                  <div className="flex items-center justify-between mb-8 relative z-20">
                    <div className="flex items-center gap-2 bg-brand-gold/[0.04] py-1.5 px-3.5 rounded-full border border-brand-gold/20 backdrop-blur-md">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="#D4AF37" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="text-[9.5px] font-mono uppercase tracking-wider text-brand-gold font-bold ml-1">
                        {reviews[currentIdx].val}
                      </span>
                    </div>
                    {(() => {
                      const ActiveIcon = reviews[currentIdx].icon;
                      return (
                        <div className="w-10 h-10 rounded-2xl bg-brand-gold/10 border border-brand-gold/25 text-brand-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.12)]">
                          <ActiveIcon size={18} />
                        </div>
                      );
                    })()}
                  </div>

                  <p className="text-base sm:text-lg md:text-[19px] text-white font-light leading-relaxed tracking-wide italic mb-8 relative z-10 font-sans">
                    “{reviews[currentIdx].quote}”
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto relative z-10">
                  <div className="flex gap-4 items-center">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${reviews[currentIdx].color} flex items-center justify-center text-black font-extrabold text-base shadow-[0_4px_20px_rgba(212,175,55,0.22)] relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                      <div className="absolute inset-0 bg-white/10 opacity-30 mix-blend-overlay" />
                      {reviews[currentIdx].initial}
                    </div>
                    <div>
                      <span className="text-white font-bold text-base block tracking-tight">{reviews[currentIdx].rater}</span>
                      <span className="text-neutral-400 text-xs font-light block mt-0.5">
                        {reviews[currentIdx].role} — <strong className="text-brand-gold/90 font-medium">{reviews[currentIdx].comp}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3.5 py-2 rounded-full bg-neutral-900 border border-white/10 text-[9px] font-mono text-neutral-400 hover:text-white transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-brand-gold/30 cursor-pointer active:scale-95"
                      id="autoplay-toggle-btn"
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        {isPlaying && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isPlaying ? 'bg-brand-gold' : 'bg-neutral-600'}`}></span>
                      </span>
                      {isPlaying ? 'LIVE STREAM' : 'PAUSED'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right flank card (next card on deck) */}
            <div 
              className="hidden md:flex flex-col justify-between py-6 px-4 md:py-8 md:px-6 rounded-[2.25rem] bg-gradient-to-br from-[#0a0a0d] to-[#040405] border border-white/5 opacity-35 hover:opacity-70 scale-[0.93] blur-[0.5px] cursor-pointer hover:scale-[0.96] transition-all duration-500 text-left hover:border-brand-gold/25 relative overflow-hidden" 
              onClick={handleNext}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.02),transparent)] pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5 bg-neutral-900/60 py-1.5 px-3 rounded-full border border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="#D4AF37" className="opacity-50" strokeWidth={0} />
                    ))}
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 ml-1.5">
                      Verified
                    </span>
                  </div>
                  {(() => {
                    const NextIcon = reviews[nextIdx].icon;
                    return (
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-neutral-500 flex items-center justify-center">
                        <NextIcon size={14} />
                      </div>
                    );
                  })()}
                </div>
                <p className="text-neutral-400 font-light text-[12.5px] italic leading-relaxed line-clamp-5">
                  “{reviews[nextIdx].quote}”
                </p>
              </div>
              <div className="border-t border-white/5 pt-5 mt-6 flex gap-3.5 items-center">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${reviews[nextIdx].color} flex items-center justify-center text-black font-extrabold text-sm shadow-md`}>
                  {reviews[nextIdx].initial}
                </div>
                <div className="overflow-hidden">
                  <span className="text-neutral-300 font-semibold text-xs block truncate">{reviews[nextIdx].rater}</span>
                  <span className="text-neutral-500 text-[10.5px] font-light block truncate mt-0.5">{reviews[nextIdx].role} — {reviews[nextIdx].comp}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Slider Floating Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute -left-2 md:-left-6 lg:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-950/90 border border-white/10 hover:border-brand-gold/40 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-md shadow-2xl z-20 group cursor-pointer"
            aria-label="Previous Testimonial"
            id="prev-testimonial-btn"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button 
            onClick={handleNext}
            className="absolute -right-2 md:-right-6 lg:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-950/90 border border-white/10 hover:border-brand-gold/40 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-md shadow-2xl z-20 group cursor-pointer"
            aria-label="Next Testimonial"
            id="next-testimonial-btn"
          >
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Active indicator indicators / Page Selectors */}
          <div className="flex justify-center items-center gap-2.5 mt-12">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${idx === currentIndex ? 'w-10 bg-brand-gold' : 'w-2 bg-neutral-800 hover:bg-neutral-600'}`}
                aria-label={`Go to slide ${idx + 1}`}
                id={`testimonial-dot-${idx}`}
              />
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

// Big bold final call to action at the bottom
const FinalCTA = () => {
  return (
    <section className="site-section bg-gradient-to-b from-neutral-950 to-black relative z-10 overflow-hidden text-center">
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
  const features = [
    {
      title: "Customizable Design",
      desc: "Include your logo, brand colors, and unique design elements to reflect your professional identity.",
      icon: <Edit size={22} />,
      index: "01"
    },
    {
      title: "Dynamic Intro Videos",
      desc: "Personalized videos that introduce you and your business, tailored to your profession or brand.",
      icon: <Video size={22} />,
      index: "02"
    },
    {
      title: "Engagement Features",
      desc: "Include call-to-action buttons, such as “Book Now” to drive immediate engagement.",
      icon: <Sparkles size={22} />,
      index: "03"
    },
    {
      title: "Social Media",
      desc: "Clickable icons leading to your social media profiles (e.g., LinkedIn, Twitter, Facebook).",
      icon: <Layers size={22} />,
      index: "04"
    },
    {
      title: "Analytics and Tracking",
      desc: "Monitor how often your vCard is viewed or shared, providing valuable insights into your networking efforts.",
      icon: <TrendingUp size={22} />,
      index: "05"
    },
    {
      title: "QR Code Sharing",
      desc: "Share your vCard instantly via a custom QR code that can be scanned with any smartphone.",
      icon: <QrCode size={22} />,
      index: "06"
    },
    {
      title: "AI Assistance Integration",
      desc: "Unleash intelligent smart greetings, speech-to-text notes transcription, and automated AI lead scoring pipelines.",
      icon: <Bot size={22} />,
      index: "07"
    },
    {
      title: "Customized Notifications",
      desc: "Get real-time push reminders, system activity alerts, and automatic SMS updates directly on contact saves.",
      icon: <Bell size={22} />,
      index: "08"
    },
    {
      title: "Digital Wallet Feature",
      desc: "Allow prospects to save your beautiful, verified touchless card straight into Apple Wallet and Google Pay.",
      icon: <Wallet size={22} />,
      index: "09"
    }
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
    <section id="how-we-help" className="site-section bg-neutral-950/40 border-b border-white/5 relative z-10 overflow-hidden">
      {/* Decorative cyber grid lines and soft gradient ambient back-glows */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto mb-20">
          {/* Executive pre-header badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/[0.04] border border-brand-gold/20 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gold uppercase font-medium">Platform Capabilities</span>
          </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feat, idx) => {
            const direction = idx % 4 === 0 ? "up" : idx % 4 === 1 ? "right" : idx % 4 === 2 ? "left" : "down";
            const delay = (idx % 3) * 0.08;
            return (
              <ScrollRevealCard 
                key={idx}
                direction={direction}
                delay={delay}
                className="py-6 px-4 md:py-8 md:px-6 bg-[#070707]/90 border border-white/5 rounded-[32px] relative overflow-hidden transition-all duration-300 flex flex-col items-start text-left group shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-lg h-full hover:border-brand-gold/40 hover:-translate-y-1.5"
              >
                {/* Luxury dot matrix texture for high tech premium look */}
                <div className="bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Radial card corner highlight glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/[0.015] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Elegant Index Counter */}
                <span className="font-mono text-[10px] text-brand-gold/20 tracking-wider absolute top-8 right-8 group-hover:text-brand-gold/60 transition-colors duration-300">
                  // CAP.{feat.index}
                </span>

                {/* Visual Anchor Indicator bar */}
                <div className="h-[2px] w-8 bg-brand-gold/20 group-hover:w-16 group-hover:bg-brand-gold/50 transition-all duration-500 mb-6" />

                {/* Icon component with custom interactive frame */}
                <div className="p-3.5 rounded-2xl bg-brand-gold/[0.04] border border-brand-gold/15 text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold/[0.12] group-hover:rotate-3 transition-all duration-300 inline-block">
                  {feat.icon}
                </div>
                
                <h3 className="text-white font-medium text-lg tracking-wide mb-3 group-hover:text-brand-gold transition-colors duration-300">{feat.title}</h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">{feat.desc}</p>
              </ScrollRevealCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default function Home({ heroHeading }: { heroHeading?: React.ReactNode }) {
  return (
    <div className="bg-black">
      <Hero heroHeading={heroHeading} />
      <HowCanWeHelp />
      <InteractiveDemoSection />
      <PortfolioSection />
      <HowItWorks />
      <InvisibleAdvantageTeaser />
      <SocialProof />
      <FinalCTA />
    </div>
  );
}
