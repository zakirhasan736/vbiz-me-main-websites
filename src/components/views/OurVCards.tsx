'use client';

import { Check, DollarSign, FileText, Leaf, Lightbulb, MinusCircle, PlusCircle, Play, Sparkles, Bot, Zap, Cpu, ArrowRight, Phone, Mail, MapPin, Heart, Calendar, Globe, Briefcase, Video, Share2 } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';

export default function OurVCards() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const accordionItems = [
    {
      title: "AI Agent Assistance (Your Digital Twin) 🌟 NEW",
      content: "Gain an automated business twin! Every smart vCard now integrates optional custom AI Agent Assistance. This smart trained helper answers visitor inquiries, details your services, captures potential lead contact information, and coordinates scheduler meetings 24/7."
    },
    {
      title: "Instant AI Card Creation & Auto-Filling ⚡ NEW",
      content: "Say goodbye to tedious copy-pasting. Simply slide in your resume, share your existing LinkedIn URL, or snap/upload a legacy image card. Our semantic parser instantly auto-extracts your coordinates, contacts, images, and color guidelines to pre-build a ready-to-publish virtual page in seconds."
    },
    {
      title: "Unique Intro Videos",
      content: "vBiz Me is the only company that offers dynamic intro videos featuring your company's logos. These captivating intros are designed to create a memorable first impression, setting your virtual business card apart from the competition."
    },
    {
      title: "Customizable vCards",
      content: "Personalize every aspect of your vCard from colors, fonts, to layout, ensuring it perfectly matches your brand identity."
    },
    {
      title: "Professional and Engaging Designs",
      content: "Choose from a wide variety of expertly crafted templates that give you a professional edge when connecting."
    },
    {
      title: "Seamless Integration",
      content: "Our vCards integrate effortlessly with top CRMs, email clients, and analytics tools to keep your networking flowing."
    },
    {
      title: "Exceptional Support and Service",
      content: "Our dedicated support team is available around the clock to help you with any setup or customization needs."
    }
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="section-hero relative pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center min-h-[60vh]">
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
             <span className="text-[10px] md:text-[12px] font-medium tracking-[0.15em] uppercase text-neutral-200">The Ultimate Digital Asset</span>
          </div>
          
          <RevealText 
            text="Our vCards"
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["vCards"]}
          />
          
          <RevealParagraph 
            text="At vBiz Me, we give you full creative control. Seamlessly integrate with Canva, Adobe Express, or upload custom music to create a truly unique, dynamic experience that represents your brand and captures attention instantly."
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-3xl mx-auto leading-relaxed block text-center"
          />
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="site-section bg-neutral-900/20 relative" id="features-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/[0.04] border border-brand-gold/15 backdrop-blur-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-brand-gold uppercase font-medium">Bespoke Intelligent Suite</span>
            </div>
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
              <div className="bg-[#090909]/60 border border-white/5 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-brand-gold/25 transition-all duration-300 flex-1 flex flex-col justify-between">
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
              <div className="bg-[#0A0500] border border-brand-gold/10 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-300 text-left">
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
            <ScrollRevealCard direction="up" className="lg:w-[36%] flex flex-col justify-between bg-[#080808]/90 border border-white/10 py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Decorative ambient radial reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.03] to-transparent pointer-events-none" />
              
              <div className="w-full">
                {/* Embedded Video Player */}
                <div className="w-full bg-[#030303] aspect-[16/9] rounded-2xl overflow-hidden relative border border-white/10 group mb-6 shadow-xl">
                  <div className="absolute inset-0 bg-brand-gold/5 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                  <video 
                    className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.02]" 
                    controls 
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://www.vbizme.com/wp-content/uploads/2024/08/vbizme-2d-explainer-1080p-240823.mp4"
                    id="vcard-explainer-video"
                  />
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
              <div className="bg-[#090909]/60 border border-white/5 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-brand-gold/15 transition-all duration-300 flex-1 flex flex-col justify-between text-left">
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
                      <div key={idx} className="flex items-center gap-3 p-2 bg-[#050505] border border-white/5 rounded-xl text-left">
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
              <div className="bg-gradient-to-br from-[#0f0c05] to-[#040404] border border-brand-gold/30 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.03)] text-left">
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

      {/* Transitional Cards Section */}
      <section className="site-section bg-black relative">
         <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              { icon: Lightbulb, title: "Innovative", desc: "Create a Lasting Impression", glow: "rgba(212,175,55,0.18)", dir: "left" },
              { icon: Leaf, title: "Eco-Friendly", desc: "Always Accessible, Always Green", glow: "rgba(34,197,94,0.18)", dir: "up" },
              { icon: DollarSign, title: "Cost-Effective", desc: "Save Money and Stay Current", glow: "rgba(59,130,246,0.18)", dir: "right" }
            ].map((card, idx) => (
              <ScrollRevealCard key={idx} direction={card.dir as any} delay={idx * 0.08} className="h-full">
                <GlowCard 
                  glowColor={card.glow}
                  className="py-6 px-4 md:py-8 md:px-6 rounded-[2.1rem] flex flex-col items-center justify-center text-center shadow-2xl group h-full"
                >
                  <div className="w-20 h-20 rounded-2xl bg-brand-gold/5 flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-500 relative z-10 mx-auto">
                    <card.icon size={36} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-medium text-white text-xl mb-2 tracking-tight relative z-10">{card.title}</h4>
                  <p className="text-neutral-400 font-light text-sm relative z-10">{card.desc}</p>
                </GlowCard>
              </ScrollRevealCard>
            ))}
         </div>
      </section>

      {/* Features List & Why Choose Us Section */}
      <section className="site-section bg-neutral-900/20 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Features List */}
            <ScrollRevealCard direction="left" className="lg:w-1/3">
              <div className="text-left">
                <h2 className="text-3xl font-medium text-white mb-10 tracking-tight">Core Features</h2>
                <ul className="space-y-4 text-neutral-300 text-left">
                  {[
                    "AI Agent Assistance", "Card Auto Data Filling", "Dynamic Intro Videos", 
                    "Background Music", "Customizable Design", "Real-Time Updates", 
                    "QR Code Sharing", "Direct Link Sharing", "Save to Contacts", 
                    "Engagement Analytics"
                  ].map((ft, i) => (
                    <li 
                      key={i} 
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                        <Check size={12} className="text-brand-gold" strokeWidth={3}/> 
                      </div>
                      <span className="font-light tracking-wide">{ft}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealCard>

            {/* Why Choose Us */}
            <ScrollRevealCard direction="right" className="lg:w-2/3">
              <div className="text-left">
                <h2 className="text-3xl font-medium text-white mb-6 tracking-tight">Why Choose Us?</h2>
                <p className="text-neutral-400 mb-10 font-light leading-relaxed max-w-2xl">
                  Choose vBiz Me for unique intro videos with your logo, customizable vCards, professional designs, seamless integration, and exceptional customer support to elevate your networking.
                </p>

                {/* Accordion */}
                <div className="space-y-4">
                  {accordionItems.map((item, index) => (
                    <div key={index} className="bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 transition-colors hover:border-white/10">
                      <button 
                        onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                        className="w-full flex items-center justify-between py-6 px-4 md:py-8 md:px-6 text-left focus:outline-none"
                      >
                        <span className={`font-medium tracking-wide ${activeAccordion === index ? 'text-brand-gold' : 'text-white'}`}>
                          {item.title}
                        </span>
                        <motion.div
                          animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                          className={`shrink-0 ${activeAccordion === index ? 'text-brand-gold' : 'text-neutral-400'}`}
                        >
                          {activeAccordion === index ? <MinusCircle size={20} /> : <PlusCircle size={20} />}
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {activeAccordion === index && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 md:px-6 pb-6 text-neutral-400 font-light leading-relaxed">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealCard>
            
          </div>

          <ScrollRevealCard direction="up" className="w-full">
            <div className="mt-24 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-brand-gold/10 to-transparent py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-brand-gold/20 relative overflow-hidden text-left">
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

      {/* Competitive Analysis Section */}
      <section className="site-section bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,transparent_80%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/[0.04] border border-brand-gold/15 backdrop-blur-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-brand-gold uppercase font-medium">Bespoke Advantage</span>
            </div>
            <RevealText 
              text="Competitive Analysis"
              className="text-3xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
            />
            <p className="text-neutral-400 font-light text-sm max-w-xl mx-auto mt-3 text-center">
              See how vBiz Me stacks up against traditional paper cards and basic digital options to deliver unmatched brand impressions.
            </p>
          </div>

          <ScrollRevealCard direction="up" className="w-full">
            <div className="max-w-4xl mx-auto bg-[#050505]/65 p-2 md:p-4 rounded-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <img 
                src="https://www.vbizme.com/wp-content/uploads/2026/04/vBizMeCompetativeAnalysis.webp" 
                alt="vBiz Me Competitive Analysis Chart" 
                className="w-full h-auto rounded-2xl opacity-95 hover:opacity-100 transition-opacity duration-500 shadow-inner"
                referrerPolicy="no-referrer"
                id="vbiz-competitive-analysis-img"
              />
            </div>
          </ScrollRevealCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-section bg-black relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-brand-gold/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-gold/[0.03] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <ScrollRevealCard direction="up" className="w-full">
            <GlowCard className="backdrop-blur-xl border border-white/10 rounded-[3rem] py-6 px-4 md:py-8 md:px-6 flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden bg-[#050505]/85 group">
              {/* Dynamic visual grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-70" />
              
              <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent pointer-events-none" />
              <div className="absolute -bottom-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent pointer-events-none" />

              {/* Custom high-tech badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/[0.04] border border-brand-gold/15 backdrop-blur-md mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[9px] font-mono tracking-[0.25em] text-brand-gold uppercase font-medium">Elevate Your Network</span>
              </div>

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
