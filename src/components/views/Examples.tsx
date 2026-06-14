'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Briefcase, Car, Award, Scissors, Utensils, 
  Sparkles, Check, ChevronRight, Phone, MessageSquare, 
  Calendar, Star, User, Smartphone, Play, Pause, Volume2, VolumeX, Mail
} from 'lucide-react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';
import { PhoneMockupFrame } from '@/components/PhoneMockupFrame';
import { INDUSTRY_MOCKUP_IMAGES } from '@/lib/industry-mockup-images';
import { InteractiveReveal } from '@/components/InteractiveReveal';

interface IndustryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  videoPlaceholder: string;
  avatar: string;
  primaryColor: string;
  role: string;
  bioName: string;
  company: string;
  videoTitle: string;
  services: string[];
  reviews: { rater: string; text: string; location: string }[];
  ctaText: string;
  demoUrl: string;
}

export default function Examples() {
  const industries: IndustryData[] = [
    {
      id: 'contractor',
      name: 'Contractor & Construction',
      icon: <Briefcase className="w-4 h-4" />,
      videoPlaceholder: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
      primaryColor: 'from-orange-500 to-amber-600',
      role: 'Master Remodeler / Builder',
      bioName: 'Michaelangelo Casanova',
      company: 'Casanova Carpentry',
      videoTitle: 'See our high-end luxury carpentry portfolios and custom remodels.',
      services: ['Custom Fine Carpentry', 'Luxury Home Remodeling', 'High-End Timber Decks', 'Master Suite Carpentry'],
      reviews: [
        { rater: 'Michael K.', text: 'Outstanding craftsmanship. Michaelangelo took our rough ideas and turned them into stunning master carpentry.', location: 'Hartford, CT' },
        { rater: 'Elena G.', text: 'Professional, pristine attention to detail, and a true artist with premium timber structures.', location: 'West Hartford, CT' }
      ],
      ctaText: 'Get Free Estimate',
      demoUrl: 'https://app.vbizme.com/vCard/michaelangelo-casanova-2#home'
    },
    {
      id: 'real-estate',
      name: 'Real Estate Agent',
      icon: <Building className="w-4 h-4" />,
      videoPlaceholder: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      primaryColor: 'from-cyan-500 to-blue-600',
      role: 'Elite MLS Listing Realtor',
      bioName: 'Chago Vargas',
      company: 'Vargas Exclusive Brokerage',
      videoTitle: 'Welcome to Connecticut Luxury Living. Let me show you how we secure top dollar for our properties.',
      services: ['Exclusive Luxury Listings', 'Comprehensive Market Assessment', 'Professional Staging Advice', 'Waterfront Estate Showcase'],
      reviews: [
        { rater: 'Robert S.', text: 'Chago got us $45k over asking in 4 days! Shes amazing.', location: 'Greenwich, CT' },
        { rater: 'The Millers', text: 'Professional, sharp negotiator, and extremely responsive. Absolute pleasure.', location: 'Simsbury, CT' }
      ],
      ctaText: 'Book Private Showing',
      demoUrl: 'https://app.vbizme.com/vCard/chago-vargas#home'
    },
    {
      id: 'auto-sales',
      name: 'Auto Dealership Sales',
      icon: <Car className="w-4 h-4" />,
      videoPlaceholder: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
      primaryColor: 'from-amber-400 to-brand-gold',
      role: 'VIP Automotive Client Advisor',
      bioName: 'Walter Jofre Jr',
      company: 'Premier Luxury Motors',
      videoTitle: 'Buying a car should feel premium, not hard. Browse VIP inventory on the spot without typing emails!',
      services: ['VIP Custom Vehicle Sourcing', 'Fast-Track Advisory Process', 'Premium Trade-In Evaluations', 'Flexible Finance Direct-Link'],
      reviews: [
        { rater: 'Marcus G.', text: 'Easiest purchase of my life. Walter had the SUV prepped & papers ready in 15 mins.', location: 'East Hartford, CT' },
        { rater: 'Kelly T.', text: 'Walter knows his luxury cars. Guided me step-by-step with zero sales pressure.', location: 'Glastonbury, CT' }
      ],
      ctaText: 'Browse VIP Inventory',
      demoUrl: 'https://app.vbizme.com/vCard/walter-jofre-jr#home'
    },
    {
      id: 'barber',
      name: 'Barber & Styling Pros',
      icon: <Scissors className="w-4 h-4" />,
      videoPlaceholder: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      primaryColor: 'from-rose-500 to-red-700',
      role: 'Master Barber & Styling Artist',
      bioName: 'Brian Dennis',
      company: 'Dennis Signature Grooming',
      videoTitle: 'Look sharp. Feel confident. Watch how we style a premium bald fade and clean beard lineup.',
      services: ['Aesthetic Razor Shaves', 'Premium Fade & Hair Design', 'Beard Styling & Conditioning', 'Hot Towel Revival Treatment'],
      reviews: [
        { rater: 'Carlos V.', text: 'Brian is hands down the best in New England. Sharp lines, absolute craftsman.', location: 'Manchester, CT' },
        { rater: 'Brandon H.', text: 'The atmosphere is premium and the hair styling is incredible.', location: 'South Windsor, CT' }
      ],
      ctaText: 'Book Fresh Cut',
      demoUrl: 'https://app.vbizme.com/vCard/brian-dennis#home'
    },
    {
      id: 'coach',
      name: 'Coach & Corporate Advisor',
      icon: <Award className="w-4 h-4" />,
      videoPlaceholder: 'https://images.unsplash.com/photo-1552581230-c015914626ed?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      primaryColor: 'from-purple-500 to-pink-600',
      role: 'Executive Operational Coach',
      bioName: 'Sheldon Singleton',
      company: 'Singleton Scaling Advisory',
      videoTitle: 'Scale your enterprise operations from $10M to $100M without burning out.',
      services: ['C-Suite Operational Mapping', 'Business Performance Diagnostics', 'Strategic Leadership Audits', 'CEO Breakthrough Masterminds'],
      reviews: [
        { rater: 'Arthur J. (CEO)', text: 'Sheldons frameworks helped us double our annual output while scaling leadership.', location: 'Stamford, CT' },
        { rater: 'Helen R.', text: 'Performance coaching worth every cent. I found hours of pure weekly focus.', location: 'New Haven, CT' }
      ],
      ctaText: 'Apply For Briefing',
      demoUrl: 'https://app.vbizme.com/vCard/sheldon-singleton#home'
    },
    {
      id: 'restaurant',
      name: 'Restaurant & Fine Dining',
      icon: <Utensils className="w-4 h-4" />,
      videoPlaceholder: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      primaryColor: 'from-emerald-500 to-teal-600',
      role: 'Culinary Team / Chef Owners',
      bioName: 'Sabor Ecuatoriano Kitchen',
      company: 'Sabor Ecuatoriano',
      videoTitle: 'Savor the authentic taste on video. Book your premium table reservation or explore our catering menu.',
      services: ['Authentic Culinary Platters', 'Bespoke Premium Drinks', 'Interactive Live Digital Menu', 'Gourmet Event Catering'],
      reviews: [
        { rater: 'Grace & Paul', text: 'The organic flavors are unbelievable. Authentic taste and wonderful environment.', location: 'Glastonbury, CT' },
        { rater: 'Mark D.', text: 'Elite hosting, incredible traditional tastes. The best Ecuadorian parlor in New England!', location: 'Avon, CT' }
      ],
      ctaText: 'Reserve Prime Table',
      demoUrl: 'https://app.vbizme.com/vCard/sabor-ecuatoriano-3#home'
    }
  ];

  const [selectedIndId, setSelectedIndId] = useState<string>('contractor');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const activeInd = industries.find(i => i.id === selectedIndId) || industries[0];

  return (
    <div className="section-hero pt-32 pb-24 bg-black relative min-h-screen text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
            <Sparkles size={14} /> Industry Demo Library
          </div>
          
          <RevealText 
            text="See Exactly What Your Customers Will Experience"
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium tracking-tight mb-6 text-center"
            tag="h1"
            highlightedWords={["Customers"]}
          />
          
          <RevealParagraph 
            text="vBiz Me isn’t a standard static profile page — it is an elegant, structured sequence that turns simple phone scans into high-value relationships. Toggle through real industries below."
            className="text-neutral-400 font-light text-lg leading-relaxed block text-center"
          />
        </div>

        {/* Interactive Selector and Phone Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Left Column: Industry Cards */}
          <ScrollRevealCard direction="left" className="lg:col-span-5 space-y-4 flex flex-col text-left">
            <div className="hidden lg:block mb-3">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Select An Industry</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {industries.map((ind) => {
                const isActive = ind.id === selectedIndId;
                return (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedIndId(ind.id);
                      setIsPlaying(true);
                    }}
                    className={`flex items-center gap-3 text-left p-4 rounded-2xl border text-sm transition-all duration-300 relative overflow-hidden group ${
                      isActive 
                        ? 'bg-neutral-900 border-brand-gold/30 text-white shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                        : 'bg-neutral-950/40 border-white/5 text-neutral-400 hover:text-white hover:border-white/10 hover:bg-neutral-900/30'
                    }`}
                  >
                    {/* Side highlight line */}
                    {isActive && (
                      <div className="absolute left-0 inset-y-0 w-1 bg-brand-gold" />
                    )}
                    
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      isActive ? 'bg-brand-gold/15 text-brand-gold' : 'bg-white/5 text-neutral-400 group-hover:text-white'
                    }`}>
                      {ind.icon}
                    </div>
                    
                    <div className="truncate">
                      <span className="font-semibold block text-xs tracking-wide uppercase">{ind.name}</span>
                      <span className="text-xs text-neutral-500 font-light truncate block">{ind.company}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Extra CTA Information Block */}
            <div className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl py-6 px-4 md:py-8 md:px-6 border border-white/5 mt-6 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-[50px] rounded-full pointer-events-none" />
              <h3 className="text-brand-gold font-semibold text-sm mb-2 flex items-center gap-2">
                <Sparkles size={16} /> Every Card Is Optimized
              </h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed mb-4">
                We custom-build or assist in crafting highly converting 9-second introductory videos, professional reviews, easy CTA interfaces, and frictionless Apple/Google Wallet integration.
              </p>
              <a href="/contact" className="text-xs font-semibold text-white hover:text-brand-gold transition-colors flex items-center gap-1.5 self-start">
                Request a Custom Industry Mockup <ChevronRight size={14} />
              </a>
            </div>
          </ScrollRevealCard>

          {/* Right Column: Stunning Realistic iPhone Mockup */}
          <InteractiveReveal className="lg:col-span-7 flex flex-col items-center justify-center relative">
            {/* Phone Container Backdrop Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-brand-gold/10 to-transparent blur-[80px] rounded-full pointer-events-none" />

            <PhoneMockupFrame
              src={activeInd.demoUrl || 'https://app.vbizme.com/vCard/michaelangelo-casanova-2#home'}
              previewImage={INDUSTRY_MOCKUP_IMAGES[activeInd.id as keyof typeof INDUSTRY_MOCKUP_IMAGES]}
              title={`${activeInd.name} Live View`}
              size="hero"
              className="shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)]"
            />

            {/* Simulated QR Code Scan */}
            <div className="mt-8 flex items-center gap-4 bg-neutral-900/60 backdrop-blur-md py-6 px-4 md:py-8 md:px-6 rounded-2xl border border-white/5 relative max-w-sm text-left">
              <div className="w-14 h-14 bg-white p-1 rounded-xl flex-shrink-0 flex items-center justify-center border border-brand-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {/* Visual representation of a QR Code */}
                <div className="grid grid-cols-4 gap-0.5 w-full h-full opacity-85">
                  {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xs ${
                        i % 5 === 0 || i === 1 || i === 3 || i === 10 || i === 12 || i === 15 
                          ? 'bg-black' 
                          : 'bg-transparent'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              <div className="text-left">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block mb-0.5">Quick Scan Demo</span>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  Hover your phone camera over the code to experience vBiz Me. Handheld networking done absolutely right.
                </p>
              </div>
            </div>
          </InteractiveReveal>

        </div>

        {/* Detailed Industry Demo Grid Cards (Industry Demo Library) */}
        <div className="mt-24 border-t border-white/10 pt-16">
          <RevealText 
            text="Comprehensive Client Success Templates"
            className="text-3xl font-medium text-white mb-4 text-center"
            tag="h2"
          />
          <p className="text-neutral-400 font-light text-center mb-12 max-w-2xl mx-auto block leading-relaxed">
            These are customized layout structures tailored to solve specific business problems rather than just dump links in a bio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollRevealCard direction="left" className="h-full">
              <div className="bg-neutral-950 py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-white/5 hover:border-brand-gold/30 transition-all duration-300 h-full text-left flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/20">
                    <Building />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Real Estate Professionals</h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-4">
                    Let your clients take single-tap video tours of listings, review active client video reviews, and schedule private showings instantly from your vCard.
                  </p>
                </div>
                <div className="text-xs text-brand-gold font-semibold flex items-center gap-1 pointer-events-none mt-auto">
                  Featured Template • Sells Instantly <ChevronRight size={14} />
                </div>
              </div>
            </ScrollRevealCard>

            <ScrollRevealCard direction="up" className="h-full">
              <div className="bg-neutral-950 py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-white/5 hover:border-brand-gold/30 transition-all duration-300 h-full text-left flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20">
                    <Car />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Automotive Advisors</h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-4">
                    Let buyers browse VIP stock on-the-spot without complex login systems. Build direct customer confidence on the retail floor within seconds.
                  </p>
                </div>
                <div className="text-xs text-brand-gold font-semibold flex items-center gap-1 pointer-events-none mt-auto">
                  Dealership Favorite • One-Tap Save <ChevronRight size={14} />
                </div>
              </div>
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" className="h-full">
              <div className="bg-neutral-950 py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-white/5 hover:border-brand-gold/30 transition-all duration-300 h-full text-left flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5 border border-emerald-500/20">
                    <Utensils />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Restaurants & Chefs</h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-4">
                    Skip bulky paper menus. Showcase Chef specials on video, link reservation engines, and gather positive reviews organically before dessert is served.
                  </p>
                </div>
                <div className="text-xs text-brand-gold font-semibold flex items-center gap-1 pointer-events-none mt-auto">
                  Organic Signups • Quick Bookings <ChevronRight size={14} />
                </div>
              </div>
            </ScrollRevealCard>
          </div>
        </div>

      </div>
    </div>
  );
}
