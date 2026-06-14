'use client';

import { 
  Award, Building, Briefcase, Calendar, Flame, 
  HelpCircle, Home, Image, LayoutGrid, List, MonitorPlay, 
  Newspaper, Puzzle, Rocket, Save, ScrollText, Share2, Smile, 
  Star, Store, Users, Video, VideoIcon, Play, Sparkles, Check, ArrowRight
} from 'lucide-react';
import React from 'react';
import { motion } from 'motion/react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';
import { usePageTransition } from '@/components/providers/page-transition-context';

export default function NavigationBar() {
  const { revealReady } = usePageTransition();
  const keyFeatures = [
    {
      icon: Flame,
      title: "Dynamic & Interactive",
      description: "Users can explore your services, portfolio, and testimonials in seconds."
    },
    {
      icon: Rocket,
      title: "Instant Contact",
      description: "One tap to call or email seamlessly."
    },
    {
      icon: Share2,
      title: "Social Media Ready",
      description: "Direct links to your LinkedIn, Instagram, Facebook, and more."
    },
    {
      icon: MonitorPlay,
      title: "Engaging Multimedia",
      description: "Supports videos, images, and background customization."
    },
    {
      icon: Save,
      title: "Save Contact Button",
      description: "No more lost business cards—clients can save your info instantly with your photo."
    },
    {
      icon: Puzzle,
      title: "Custom Design",
      description: "Fully control your designs, colors, fonts, music and much more."
    }
  ];

  const topics = [
    { icon: Home, title: "Home", subtitle: "Your Digital Hub" },
    { icon: Smile, title: "About Me", subtitle: "Your Story, Your Brand" },
    { icon: ScrollText, title: "Mission Statement", subtitle: "Define Your Purpose" },
    { icon: List, title: "Services", subtitle: "What You Offer" },
    { icon: VideoIcon, title: "Portfolio", subtitle: "Your Work In Action" },
    { icon: Award, title: "Certificates", subtitle: "Credentials Matter" },
    { icon: Star, title: "Consumer Protection", subtitle: "Stay Compliant" },
    { icon: Star, title: "Better Business Bureau", subtitle: "Verified & Trusted" },
    { icon: HelpCircle, title: "FAQ's", subtitle: "Answers at Fingertips" },
    { icon: Video, title: "2D Video Explainer", subtitle: "Visual Storytelling" },
    { icon: Newspaper, title: "Press/Media", subtitle: "In the Spotlight" },
    { icon: Calendar, title: "Events", subtitle: "Stay Updated" },
    { icon: Newspaper, title: "Blog", subtitle: "Share Your Knowledge" },
    { icon: Users, title: "Clients", subtitle: "Who You Work With" },
    { icon: Briefcase, title: "Experience", subtitle: "Professional Journey" },
    { icon: Building, title: "Education", subtitle: "Academic Background" },
    { icon: LayoutGrid, title: "Resume", subtitle: "Professional Profile" },
    { icon: Store, title: "Restaurant Menu", subtitle: "Tempt Taste Buds" },
    { icon: Store, title: "Property Listings", subtitle: "Showcase Real Estate" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: revealReady ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black min-h-screen"
    >
      {/* Hero Section */}
      <section className="section-hero relative pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,#1a1a1a_0%,black_100%)] opacity-80" />
          <motion.div 
            animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center w-full">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 shadow-[0_0_20px_rgba(212,175,55,0.15)] relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
             <Sparkles size={14} className="text-brand-gold" />
             <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-neutral-200">The Ultimate Tool</span>
          </div>
          
          <RevealText 
            text="Seamless. Smart."
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["Smart."]}
          />
          
          <RevealParagraph 
            text="The vBiz Me Navigation Bar is more than just links—it's a powerful tool that allows your potential clients to make an informed decision in seconds."
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-3xl mx-auto leading-relaxed block text-center"
          />
        </div>
      </section>

      {/* Overview Section */}
      <section className="site-section bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,175,55,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            <ScrollRevealCard direction="left" className="lg:w-1/2 text-left">
              <RevealText 
                text="What is the vBiz Me Navigation Bar?"
                className="text-4xl md:text-5xl font-medium text-white mb-8 leading-tight tracking-tight text-left"
                tag="h2"
                highlightedWords={["Navigation", "Bar?"]}
                centered={false}
              />
              
              <RevealParagraph 
                text="The vBiz Me scrolling navigation bar is a game-changer for digital business cards! Say goodbye to clunky, outdated menus—this sleek, interactive powerhouse keeps everything at your fingertips. Effortlessly glide through your vCard, instantly accessing contact info, social media links, portfolios, and scheduling options with zero hassle. Designed for maximum impact, the scrolling nav bar ensures smooth, intuitive navigation on any device, giving your audience a seamless and engaging experience. Plus, it’s fully customizable, so you can brand it your way and make a lasting impression. Whether you’re networking, showcasing your business, or closing deals, this cutting-edge feature makes sure your connections never miss a beat."
                className="text-neutral-400 text-base leading-relaxed mb-8 font-light text-left"
                centered={false}
              />
              
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-md">
                <Sparkles size={16} className="text-brand-gold" />
                <p className="text-white font-medium text-sm tracking-wide">
                  Welcome to the future of digital networking!
                </p>
              </div>
            </ScrollRevealCard>
            <ScrollRevealCard direction="right" className="lg:w-1/2 w-full">
              <div className="w-full bg-[#0A0A0A] aspect-[16/9] rounded-[2rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group">
                <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                <video 
                   className="w-full h-full object-cover opacity-80" 
                   controls 
                   autoPlay
                   loop
                   muted
                   playsInline
                   src="https://www.vbizme.com/wp-content/uploads/2025/02/scrolling-navigation-Bar-1.mp4"
                />
              </div>
            </ScrollRevealCard>

          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="site-section bg-neutral-900/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <RevealText 
              text="Our Key Features"
              className="text-4xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
              highlightedWords={["Features"]}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, idx) => (
              <ScrollRevealCard 
                key={idx}
                direction="up"
                delay={idx * 0.05}
                className="h-full"
              >
                <div className="bg-[#0A0A0A] py-6 px-4 md:py-8 md:px-6 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-500 group h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="w-16 h-16 rounded-full bg-brand-gold/5 flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-500 relative z-10">
                    <feature.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-medium text-xl mb-4 tracking-tight relative z-10">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light relative z-10">{feature.description}</p>
                </div>
              </ScrollRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Bar Topics */}
      <section className="site-section bg-black relative">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <RevealText 
              text="Explore Custom Navigation Topics"
              className="text-4xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
              highlightedWords={["Topics"]}
            />
            <p className="text-neutral-400 font-light text-sm max-w-xl mx-auto mt-3 text-center">
              A comprehensive directory of custom tabs and sections designed to highlight your complete brand in single taps.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topics.map((topic, idx) => (
              <ScrollRevealCard 
                key={idx}
                direction="up"
                delay={(idx % 5) * 0.04}
                className="h-full"
              >
                <div className="bg-[#0A0A0A] py-6 px-4 md:py-8 md:px-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center aspect-square group hover:border-brand-gold/40 transition-all duration-500 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <topic.icon size={40} strokeWidth={1.5} className="text-brand-gold mb-5 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                  <h3 className="text-white font-medium text-base md:text-lg mb-2 leading-tight tracking-tight relative z-10">{topic.title}</h3>
                  <p className="text-neutral-500 text-xs font-light relative z-10 group-hover:text-neutral-300 transition-colors duration-300">{topic.subtitle}</p>
                </div>
              </ScrollRevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Experience the Future of Networking CTA Section */}
      <section className="site-section bg-black relative">
        <div className="absolute inset-x-0 bottom-10 h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollRevealCard direction="up" className="w-full">
            <GlowCard 
              glowColor="rgba(212,175,55,0.25)"
              className="border border-brand-gold/30 rounded-[2.5rem] bg-[#070707]/90 py-6 px-4 md:py-8 md:px-6 shadow-[0_0_60px_rgba(212,175,55,0.08)] relative overflow-hidden"
            >
              {/* Decorative background grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-45" />

              {/* Top ambient highlight */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch justify-between">
                
                {/* Left part: Title and Description */}
                <div className="md:w-[48%] flex flex-col justify-between text-left">
                  <div className="text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 backdrop-blur-sm mb-4">
                      <Sparkles size={11} className="text-brand-gold animate-pulse" />
                      <span className="text-[9px] text-brand-gold font-mono uppercase tracking-[0.2em] font-semibold">Elevate Your Brand</span>
                    </div>
                    
                    <h3 className="text-brand-gold font-medium text-2xl md:text-3xl leading-tight tracking-tight mb-4 text-left">
                      Ready to Experience the Future of Networking?
                    </h3>
                    
                    <p className="text-neutral-300 text-xs md:text-sm font-light leading-relaxed mb-6 text-left">
                      Get Started with vBiz Me Today! Your vBiz Me virtual business card is more than just a digital contact—it’s your brand’s first impression, portfolio, and networking tool all in one. With seamless navigation and a fully customizable experience, your clients and prospects can instantly access everything they need about you with just one click.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <MagneticButton 
                      href="/contact" 
                      className="bg-brand-gold text-black font-semibold py-3.5 px-6 rounded-2xl hover:bg-white hover:text-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-300 w-full md:w-auto shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                      <span>ORDER YOUR VCARD</span>
                      <ArrowRight size={13} className="shrink-0" />
                    </MagneticButton>
                  </div>
                </div>

                {/* Right part: Modern Items Grid */}
                <div className="md:w-[48%] flex flex-col justify-center text-left">
                  <div className="space-y-4 text-left">
                    {[
                      {
                        title: "Stand Out",
                        desc: "A dynamic intro video that grabs attention.one click."
                      },
                      {
                        title: "Stay Updated",
                        desc: "We handle all updates for you. one click."
                      },
                      {
                        title: "Build Trust",
                        desc: "Showcase credentials, testimonials, and your portfolio."
                      },
                      {
                        title: "Make Connections",
                        desc: "Engage clients with an interactive, professional vCard. one click."
                      },
                      {
                        title: "Simple & Affordable",
                        desc: "Just $7 per month after a one-time setup fee! Don’t miss out! Elevate your digital presence now."
                      }
                    ].map((item, id) => (
                      <div 
                        key={id} 
                        className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-gold/20 hover:bg-white/[0.04] transition-all duration-300 group text-left"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/25 group-hover:border-emerald-500/55 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                          <Check size={11} className="text-emerald-400 font-bold" />
                        </div>
                        <div className="min-w-0 text-left">
                          <h4 className="text-white text-xs md:text-sm font-medium tracking-tight text-left">{item.title}</h4>
                          <p className="text-neutral-400 font-light text-[11px] leading-relaxed mt-0.5 group-hover:text-neutral-200 transition-colors duration-300 text-left">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </GlowCard>
          </ScrollRevealCard>
        </div>
      </section>
    </motion.div>
  );
}
