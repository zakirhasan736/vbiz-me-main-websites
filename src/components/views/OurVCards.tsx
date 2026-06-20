'use client';

import { Check, FileText, Lightbulb, Bot, Zap, ArrowRight, Phone, Mail, MapPin, Heart, Calendar, Globe, Briefcase, Share2 } from 'lucide-react';
import React from 'react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, BannerDescription, ScrollRevealCard } from '@/components/animations/reveal';
import { CompetitiveAnalysisSection } from '@/components/CompetitiveAnalysisSection';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { OurVCardsPillarCards } from '@/components/our-vcards/OurVCardsPillarCards';
import { OurVCardsWhyChoose } from '@/components/our-vcards/OurVCardsWhyChoose';

export default function OurVCards() {
  return (
    <div className="bg-brand-dark">
      {/* Hero Section */}
      <section className="section-hero relative pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center min-h-[60vh] bg-brand-dark">
        <PageHeroBackground />

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center w-full">
          <SectionEyebrow label="The Ultimate Digital Asset" variant="hero" />
          
          <RevealText 
            text="Our vCards"
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["vCards"]}
          />
          
          <BannerDescription 
            text="At vBiz Me, we give you full creative control. Seamlessly integrate with Canva, Adobe Express, or upload custom music to create a truly unique, dynamic experience that represents your brand and captures attention instantly."
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-3xl leading-relaxed"
          />
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="site-section bg-neutral-900/20 relative" id="features-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <SectionEyebrow label="Bespoke Intelligent Suite" className="mb-4" />
            <RevealText 
              text="Features of your vCard"
              className="text-4xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
            />
            <p className="text-neutral-400 font-light text-sm max-w-xl mx-auto mt-3 text-center">
              Explore the advanced feature matrix configured into every custom smart vCard.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
            
            {/* Left Column: Contact Information & Auto-Data Filling */}
            <ScrollRevealCard direction="left" className="lg:w-[32%] flex flex-col gap-6">
              {/* Contact Information Card */}
              <div className="bg-[#283630]/60 border border-white/5 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-brand-gold/25 transition-all duration-300 flex-1 flex flex-col justify-between">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.01),transparent)] pointer-events-none" />
                
                <div className="text-left">
                  <h3 className="text-brand-gold font-semibold uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    Contact Information
                  </h3>
                  
                  <div className="space-y-5">
                    {/* Name and Title */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold mt-0.5">
                        <Briefcase size={14} />
                      </div>
                      <div>
                        <strong className="text-white text-xs block font-medium">Name and Title</strong>
                        <span className="text-neutral-400 font-light text-[11px] leading-relaxed block mt-0.5">
                          Full name and professional title prominently displayed in bold, high-contrast typography.
                        </span>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold mt-0.5">
                        <Phone size={14} />
                      </div>
                      <div>
                        <strong className="text-white text-xs block font-medium">Click-to-Call Link</strong>
                        <span className="text-neutral-400 font-light text-[11px] leading-relaxed block mt-0.5">
                          Phone Number is fully clickable to instantly initiate a phone call or SMS directly from the card deck.
                        </span>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold mt-0.5">
                        <Mail size={14} />
                      </div>
                      <div>
                        <strong className="text-white text-xs block font-medium">Clickable Email</strong>
                        <span className="text-neutral-400 font-light text-[11px] leading-relaxed block mt-0.5">
                          One tab triggers a direct mail layout to open a new pre-addressed email message seamlessly.
                        </span>
                      </div>
                    </div>

                    {/* Business Address */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold mt-0.5">
                        <MapPin size={14} />
                      </div>
                      <div>
                        <strong className="text-white text-xs block font-medium">Interactive Location Map</strong>
                        <span className="text-neutral-400 font-light text-[11px] leading-relaxed block mt-0.5">
                          Clickable business address that instantly maps coordinates inside iOS or Google Maps applications.
                        </span>
                      </div>
                    </div>

                    {/* Relationship Status */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold mt-0.5">
                        <Heart size={14} />
                      </div>
                      <div>
                        <strong className="text-white text-xs block font-medium">Relationship Status Display</strong>
                        <span className="text-neutral-400 font-light text-[11px] leading-relaxed block mt-0.5">
                          Clearly display relationship status metrics (Married, Single, Divorced, or In a Relationship) adjusted to your profile.
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  <span>Standard Coordinates</span>
                  <span>Verified OK</span>
                </div>
              </div>

              {/* Card Auto Data Filling Feature */}
              <div className="bg-[#2a3020] border border-brand-gold/10 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-300 text-left">
                <div className="absolute top-0 right-0 h-12 w-12 bg-gradient-to-bl from-brand-gold/10 to-transparent pointer-events-none" />
                <div className="flex items-center gap-2.5 mb-3 text-brand-gold">
                  <Zap size={16} className="animate-pulse" />
                  <h4 className="text-white font-medium text-sm tracking-tight">Card Auto Data Filling Feature</h4>
                </div>
                <p className="text-neutral-400 font-light text-xs leading-relaxed">
                  Avoid manual configuration! Provide a simple resume text, a previous paper business card picture, or your LinkedIn URL. Our smart parser instantly auto-extracts your coordinates and theme guidelines to pre-build a ready-vCard.
                </p>
              </div>
            </ScrollRevealCard>

            {/* Center Column: Video & Explainer */}
            <ScrollRevealCard direction="up" className="lg:w-[36%] flex flex-col justify-between bg-[#2a3832]/90 border border-white/10 py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Decorative ambient radial reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.03] to-transparent pointer-events-none" />
              
              <div className="w-full">
                {/* Embedded Video Player */}
                <div className="w-full bg-[#1e2a24] aspect-[16/9] rounded-2xl overflow-hidden relative border border-white/10 group mb-6 shadow-xl">
                  <div className="absolute inset-0 bg-brand-gold/5 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                  <video 
                    className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.02]" 
                    controls 
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    id="vcard-explainer-video"
                  >
                    {/* type hint helps Safari pick the right decoder immediately */}
                    <source
                      src="https://www.vbizme.com/wp-content/uploads/2024/08/vbizme-2d-explainer-1080p-240823.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>

                <div className="text-left px-1 mb-6">
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.2em] font-semibold block mb-2">ENGAGING MULTIMEDIA HUB</span>
                  <h3 className="text-white font-medium text-lg mb-3 tracking-tight leading-snug">
                    Bring Your vCard to Life with 2D and Whiteboard Explainer Videos!
                  </h3>
                  <p className="text-neutral-400 font-light text-xs leading-relaxed mb-4">
                    At vBiz Me, we don’t just offer customizable virtual business cards – we give you the tools to captivate your audience with dynamic 2D explainer and whiteboard videos. Whether you’re looking to simplify complex ideas, showcase your brand story, or create a memorable first impression, these engaging video formats can be easily integrated into your vCard.
                  </p>
                  <p className="text-neutral-400 font-light text-xs leading-relaxed italic">
                    Stand out from the crowd by adding a personal touch to your vCard with a professional explainer video that tells your unique story. Let your clients see the passion behind your business – right from the palm of their hand.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 w-full">
                <MagneticButton 
                  href="/contact" 
                  className="bg-brand-gold text-black font-semibold py-3.5 px-6 rounded-2xl hover:bg-white hover:text-black uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] w-full"
                  id="features-order-vcard-btn"
                >
                  <FileText size={14}/> ORDER YOUR VCARD NOW!
                </MagneticButton>
              </div>
            </ScrollRevealCard>

            {/* Right Column: Call-to-actions, Portfolios, Socials & AI Agent twin */}
            <ScrollRevealCard direction="right" className="lg:w-[32%] flex flex-col gap-6">
              {/* Call to Actions & Engagement Card */}
              <div className="bg-[#283630]/60 border border-white/5 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-brand-gold/15 transition-all duration-300 flex-1 flex flex-col justify-between text-left">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.01),transparent)] pointer-events-none" />
                
                <div>
                  <h3 className="text-brand-gold font-semibold uppercase tracking-[0.2em] text-xs mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    Call-to-Action Buttons
                  </h3>
                  
                  <p className="text-neutral-400 font-light text-xs leading-relaxed mb-5">
                    <strong>Engagement Features:</strong> Include targeted call-to-action buttons, such as “Schedule a Meeting” or “Request a Quote,” to drive immediate user conversions.
                  </p>

                  <div className="space-y-3.5 text-left">
                    {[
                      { label: "Call Now", icon: Phone, desc: "Initiate a phone call with one tap." },
                      { label: "Email Me", icon: Mail, desc: "Open a pre-addressed draft message instantly." },
                      { label: "Schedule a Meeting", icon: Calendar, desc: "Direct route to custom booking & scheduling tools." },
                      { label: "Visit Website", icon: Globe, desc: "Launch direct hyperlinks to your online home." }
                    ].map((btn, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-[#26342e] border border-white/5 rounded-xl text-left">
                        <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-brand-gold shrink-0">
                          <btn.icon size={12} />
                        </div>
                        <div className="min-w-0 text-left">
                          <span className="text-white text-xs font-medium block leading-none">{btn.label}</span>
                          <span className="text-neutral-500 font-light text-[10px] block mt-0.5 truncate">{btn.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Portfolio addition */}
                  <div className="mt-5 pt-5 border-t border-white/5 text-left">
                    <h4 className="text-white text-xs font-medium mb-1.5 flex items-center gap-1.5">
                      <Briefcase size={13} className="text-brand-gold" />
                      Dynamic Portfolios Included
                    </h4>
                    <p className="text-neutral-400 font-light text-[11px] leading-relaxed">
                      Showcase your work seamlessly, including projects, client case studies, professional certifications, corporate awards, verified reviews, and testimonials.
                    </p>
                  </div>

                  {/* Social links details */}
                  <div className="mt-4 pt-4 border-t border-white/5 text-left">
                    <h4 className="text-white text-xs font-medium mb-1.5 flex items-center gap-1.5">
                      <Share2 size={13} className="text-brand-gold" />
                      Social Media Links
                    </h4>
                    <p className="text-neutral-400 font-light text-[11px] leading-relaxed">
                      Clickable links with high-contrast styled social media icons leading visitors straight to LinkedIn, Twitter, Facebook, or custom developer indexes.
                    </p>
                  </div>

                </div>

                <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  <span>Action Interfaces</span>
                  <span>Active Live</span>
                </div>
              </div>

              {/* AI Agent Assistance Card */}
              <div className="bg-gradient-to-br from-[#2a3528] to-[#222e28] border border-brand-gold/30 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.03)] text-left">
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/25 backdrop-blur-sm">
                  <span className="w-1 h-1 rounded-full bg-brand-gold animate-ping" />
                  <span className="text-[8px] text-brand-gold font-mono uppercase tracking-wider">AI AGENT TWIN</span>
                </div>

                <div className="flex items-center gap-2.5 mb-3 text-brand-gold">
                  <Bot size={16} />
                  <h4 className="text-white font-semibold text-sm tracking-tight">AI Agent Assistance</h4>
                </div>
                <p className="text-neutral-400 font-light text-xs leading-relaxed">
                  Equip your card with an active smart digital duplicate! This trained model automatically answers direct visitor queries, details core packages, logs inquiries, and books custom times onto your calendar 24/7.
                </p>
              </div>
            </ScrollRevealCard>
            
          </div>
        </div>
      </section>

      <OurVCardsPillarCards />

      <OurVCardsWhyChoose />

      <section className="site-section bg-neutral-900/20 relative pb-0">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollRevealCard direction="up" className="w-full">
            <div className="mt-12 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-brand-gold/10 to-transparent py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-brand-gold/20 relative overflow-hidden text-left shadow-[0_20px_60px_rgba(212,175,55,0.06)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.1),transparent)] pointer-events-none" />
              <div className="w-20 h-20 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 border border-brand-gold/30">
                 <Lightbulb className="text-brand-gold w-10 h-10" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-[0.2em] text-brand-gold uppercase font-semibold block mb-1 text-left">Innovative and Memorable</span>
                <h3 className="text-white font-medium text-2xl mb-3 tracking-tight text-left">Create a Lasting Impression</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-left">
                  vCards are designed to captivate and engage. With dynamic intro videos personalized to your profession, you can make an unforgettable first impression. Whether you’re a tech guru, a creative professional, or a business executive, our vCards showcase your unique brand and personality, making sure you stand out in every interaction.
                </p>
              </div>
            </div>
          </ScrollRevealCard>
        </div>
      </section>

      <CompetitiveAnalysisSection />

      {/* CTA Section */}
      <section className="site-section bg-brand-dark relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-brand-gold/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-gold/[0.03] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <ScrollRevealCard direction="up" className="w-full">
            <GlowCard className="backdrop-blur-xl border border-white/10 rounded-[3rem] py-6 px-4 md:py-8 md:px-6 flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden bg-[#26342e]/85 group">
              {/* Dynamic visual grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-70" />
              
              <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent pointer-events-none" />
              <div className="absolute -bottom-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent pointer-events-none" />

              {/* Custom high-tech badge */}
              <SectionEyebrow label="Elevate Your Network" className="mb-8" />

              <div className="max-w-2xl relative z-10 flex flex-col items-center mb-10 text-center">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15] mb-5">
                  Transform Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-white">Digital Professional Identity</span>
                </h2>
                <p className="text-neutral-400 font-light text-base md:text-lg max-w-lg leading-relaxed mb-6">
                  Unlock automated pipelines, dynamic intro integrations, and seamless lead conversion. Contact us today to order your customized intelligent vCard!
                </p>

                {/* Added polished, centered mini benefits list */}
                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-neutral-500 text-xs font-mono tracking-wide mt-2">
                  <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-gold" /> Automated AI Pipelines</span>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-gold" /> High-Performance Video</span>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-gold" /> One-Tap Direct Save</span>
                </div>
              </div>

              {/* Centered button container with absolute alignment */}
              <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
                <div className="w-full max-w-xs sm:max-w-sm flex justify-center">
                  <MagneticButton 
                    href="/contact" 
                    className="bg-brand-gold text-black font-semibold py-4 px-12 rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] text-center h-14 w-full flex items-center justify-center gap-2 text-sm uppercase tracking-wider group/btn"
                  >
                    <span className="font-semibold tracking-wider">Get Started Now</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </MagneticButton>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-6 block">
                  Zero commitment • Dynamic layouts • Fast setup
                </span>
              </div>
            </GlowCard>
          </ScrollRevealCard>
        </div>
      </section>
    </div>
  );
}
