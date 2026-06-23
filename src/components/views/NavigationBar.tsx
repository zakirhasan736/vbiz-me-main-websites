'use client';

import { 
  Award, Building, Briefcase, Calendar, Flame, 
  HelpCircle, Home, LayoutGrid, List, MonitorPlay, 
  Newspaper, Puzzle, Rocket, Save, ScrollText, Share2, Smile, 
  Star, Store, Users, Video, VideoIcon, Sparkles, Check, ArrowRight
} from 'lucide-react';
import React from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import {
  RevealText,
  RevealParagraph,
  BannerDescription,
  ScrollRevealCard,
  SectionRevealRoot,
  SectionRevealHeader,
  SectionRevealContent,
  SectionRevealGrid,
  RevealGridItem,
  RevealEyebrow,
  getThreeColumnGridDirection,
  getGridStaggerForColumns,
} from '@/components/animations/reveal';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { YouTubeHeroBackground } from '@/components/ui/YouTubeHeroBackground';
import { NAVIGATION_BAR_HERO_YOUTUBE_VIDEO_ID } from '@/lib/site-assets';
import { NavigationBarVideoDemo } from '@/components/navigation-bar/NavigationBarVideoDemo';

export default function NavigationBar() {
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
    <div className="bg-brand-dark min-h-screen">
      {/* Hero Section */}
      <section
        aria-labelledby="navigation-bar-hero-title"
        className="section-hero section-hero--video-bg relative pt-32 pb-10 md:pb-12 overflow-hidden flex flex-col justify-center items-center bg-brand-dark"
      >
        <YouTubeHeroBackground
          videoId={NAVIGATION_BAR_HERO_YOUTUBE_VIDEO_ID}
          title="Navigation Bar background video"
        />
        <PageHeroBackground overVideo />

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center w-full">
          <div className="page-hero-video-content text-center max-w-4xl mx-auto">
            <RevealEyebrow label="The Ultimate Tool" variant="hero" />

            <RevealText
              id="navigation-bar-hero-title"
              text="Seamless. Smart."
              className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
              tag="h1"
              highlightedWords={['Smart.']}
            />

            <BannerDescription
              text="The vBiz Me Navigation Bar is more than just links—it's a powerful tool that allows your potential clients to make an informed decision in seconds."
              className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto font-normal leading-relaxed mt-4"
            />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="site-section site-section--reveal bg-brand-dark relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,175,55,0.03)_0%,transparent_50%)] pointer-events-none" />
        <SectionRevealRoot viewport="content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionRevealContent className="flex flex-col lg:flex-row gap-20 items-center">
            <ScrollRevealCard direction="left" distance="LG" className="lg:w-1/2 text-left">
              <RevealText 
                text="What is the vBiz Me Navigation Bar?"
                className="text-4xl md:text-5xl font-medium text-white mb-8 leading-tight tracking-tight text-left"
                tag="h2"
                highlightedWords={["Navigation", "Bar?"]}
                centered={false}
              />
              
              <RevealParagraph 
                text="The vBiz Me scrolling navigation bar is a game-changer for digital business cards! Say goodbye to clunky, outdated menus—this sleek, interactive powerhouse keeps everything at your fingertips. Effortlessly glide through your vCard, instantly accessing contact info, social media links, portfolios, and scheduling options with zero hassle. Designed for maximum impact, the scrolling nav bar ensures smooth, intuitive navigation on any device, giving your audience a seamless and engaging experience. Plus, it's fully customizable, so you can brand it your way and make a lasting impression. Whether you're networking, showcasing your business, or closing deals, this cutting-edge feature makes sure your connections never miss a beat."
                className="text-neutral-400 text-base leading-relaxed mb-8 font-light text-left"
                centered={false}
                distance="MD"
              />
              
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-md">
                <Sparkles size={16} className="text-brand-gold" />
                <p className="text-white font-medium text-sm tracking-wide">
                  Welcome to the future of digital networking!
                </p>
              </div>
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" distance="LG" className="lg:w-1/2 w-full">
              <NavigationBarVideoDemo />
            </ScrollRevealCard>
          </SectionRevealContent>
        </SectionRevealRoot>
      </section>

      {/* Key Features */}
      <section className="site-section hidden bg-neutral-900/20 relative overflow-hidden">
        <SectionRevealRoot viewport="content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionRevealHeader className="text-center mb-16">
            <RevealText 
              text="Our Key Features"
              className="text-4xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
              highlightedWords={["Features"]}
            />
          </SectionRevealHeader>

          <SectionRevealGrid
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="navigation-key-features"
            stagger={getGridStaggerForColumns(3)}
          >
            {keyFeatures.map((feature, idx) => (
              <RevealGridItem
                key={idx}
                direction={getThreeColumnGridDirection(idx)}
                distance="LG"
                scaleOnUp={false}
                className="h-full"
              >
                <div className="bg-brand-surface py-6 px-4 md:py-8 md:px-6 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-500 group h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="w-16 h-16 rounded-full bg-brand-gold/5 flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-500 relative z-10">
                    <feature.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-medium text-xl mb-4 tracking-tight relative z-10">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light relative z-10">{feature.description}</p>
                </div>
              </RevealGridItem>
            ))}
          </SectionRevealGrid>
        </SectionRevealRoot>
      </section>

      {/* Navigation Bar Topics */}
      <section className="site-section site-section--reveal bg-brand-dark relative">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <SectionRevealRoot viewport="content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionRevealHeader className="text-center mb-16">
            <RevealEyebrow label="Custom Navigation" className="mb-4 mx-auto" />
            <RevealText 
              text="Explore Custom Navigation Topics"
              className="text-4xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
              highlightedWords={["Topics"]}
            />
            <RevealParagraph
              text="A comprehensive directory of custom tabs and sections designed to highlight your complete brand in single taps."
              className="text-neutral-400 font-light text-sm max-w-xl mx-auto mt-3 text-center"
              distance="MD"
            />
          </SectionRevealHeader>

          <SectionRevealGrid
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            id="navigation-topics-grid"
            stagger={getGridStaggerForColumns(5)}
          >
            {topics.map((topic, idx) => (
              <RevealGridItem
                key={idx}
                direction={getThreeColumnGridDirection(idx)}
                distance="LG"
                scaleOnUp={false}
                className="h-full"
              >
                <div className="bg-brand-surface py-6 px-4 md:py-8 md:px-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center aspect-square group hover:border-brand-gold/40 transition-all duration-500 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <topic.icon size={40} strokeWidth={1.5} className="text-brand-gold mb-5 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                  <h3 className="text-white font-medium text-base md:text-lg mb-2 leading-tight tracking-tight relative z-10">{topic.title}</h3>
                  <p className="text-neutral-500 text-xs font-light relative z-10 group-hover:text-neutral-300 transition-colors duration-300">{topic.subtitle}</p>
                </div>
              </RevealGridItem>
            ))}
          </SectionRevealGrid>
        </SectionRevealRoot>
      </section>

      {/* Ready to Experience the Future of Networking CTA Section */}
      <section className="site-section site-section--reveal bg-brand-dark relative">
        <div className="absolute inset-x-0 bottom-10 h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <SectionRevealRoot viewport="content" className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollRevealCard direction="up" distance="LG" className="w-full">
            <GlowCard 
              glowColor="rgba(212,175,55,0.25)"
              className="border border-brand-gold/30 rounded-[2.5rem] bg-brand-surface/90 py-6 px-4 md:py-8 md:px-6 shadow-[0_0_60px_rgba(212,175,55,0.08)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-45" />
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch justify-between">
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
                      Get Started with vBiz Me Today! Your vBiz Me virtual business card is more than just a digital contact—it's your brand's first impression, portfolio, and networking tool all in one. With seamless navigation and a fully customizable experience, your clients and prospects can instantly access everything they need about you with just one click.
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
                        desc: "Just $7 per month after a one-time setup fee! Don't miss out! Elevate your digital presence now."
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
        </SectionRevealRoot>
      </section>
    </div>
  );
}
