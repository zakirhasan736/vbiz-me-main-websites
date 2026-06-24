'use client';

import {
  Bot,
  Briefcase,
  Calendar,
  FileText,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  Zap,
} from 'lucide-react';
import { MagneticButton } from '@/components/InteractiveElements';
import {
  RevealGridItem,
  SectionRevealRoot,
  SectionRevealStaggerList,
  OUR_VCARD_FEATURE_STAGGER,
} from '@/components/animations/reveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionVideoPlayer } from '@/components/ui/SectionVideoPlayer';
import { OUR_VCARDS_2D_EXPLAINER_VIDEO } from '@/lib/site-assets';
import { renderHighlightedText } from '@/lib/text-highlight';

const CTA_BUTTONS = [
  { label: 'Call Now', icon: Phone, desc: 'Initiate a phone call with one tap.' },
  { label: 'Email Me', icon: Mail, desc: 'Open a pre-addressed draft message instantly.' },
  { label: 'Schedule a Meeting', icon: Calendar, desc: 'Direct route to custom booking & scheduling tools.' },
  { label: 'Visit Website', icon: Globe, desc: 'Launch direct hyperlinks to your online home.' },
] as const;

export function OurVCardsFeatureGrid() {
  return (
    <section className="site-section site-section--reveal bg-neutral-900/20 relative" id="features-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealRoot viewport="content" simultaneous={false}>
          {/* Header — eyebrow, title, description slide up from 600px */}
          <SectionRevealStaggerList
            stagger={OUR_VCARD_FEATURE_STAGGER.ITEM}
            delayChildren={OUR_VCARD_FEATURE_STAGGER.HEADER_DELAY}
            className="text-center mb-16 flex flex-col items-center"
          >
            <RevealGridItem direction="up" distance="XL" scaleOnUp={false} className="w-full flex justify-center mb-4">
              <SectionEyebrow label="Bespoke Intelligent Suite" />
            </RevealGridItem>

            <RevealGridItem direction="up" distance="XL" scaleOnUp={false} className="w-full mb-3">
              <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight text-center">
                {renderHighlightedText('Features of your vCard', ['vCard'])}
              </h2>
            </RevealGridItem>

            <RevealGridItem direction="up" distance="XL" scaleOnUp={false} className="w-full max-w-xl">
              <p className="text-neutral-400 font-light text-sm max-w-xl mx-auto text-center">
                Explore the advanced feature matrix configured into every custom smart vCard.
              </p>
            </RevealGridItem>
          </SectionRevealStaggerList>

          {/* Row 1 — left (600px left), center (600px bottom), right (600px right) ~50ms apart */}
          <SectionRevealStaggerList
            stagger={OUR_VCARD_FEATURE_STAGGER.ITEM}
            delayChildren={OUR_VCARD_FEATURE_STAGGER.ROW1_DELAY}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          >
            <RevealGridItem
              direction="left"
              distance="XL"
              scaleOnUp={false}
              className="lg:col-span-4 h-full"
            >
              <div className="bg-[#283630]/60 border border-white/5 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-brand-gold/25 transition-all duration-300 flex flex-col justify-between h-full text-left">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.01),transparent)] pointer-events-none" />

                <div>
                  <h3 className="text-brand-gold font-semibold uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    Contact Information
                  </h3>

                  <div className="space-y-5">
                    {[
                      {
                        icon: Briefcase,
                        title: 'Name and Title',
                        desc: 'Full name and professional title prominently displayed in bold, high-contrast typography.',
                      },
                      {
                        icon: Phone,
                        title: 'Click-to-Call Link',
                        desc: 'Phone Number is fully clickable to instantly initiate a phone call or SMS directly from the card deck.',
                      },
                      {
                        icon: Mail,
                        title: 'Clickable Email',
                        desc: 'One tab triggers a direct mail layout to open a new pre-addressed email message seamlessly.',
                      },
                      {
                        icon: MapPin,
                        title: 'Interactive Location Map',
                        desc: 'Clickable business address that instantly maps coordinates inside iOS or Google Maps applications.',
                      },
                      {
                        icon: Heart,
                        title: 'Relationship Status Display',
                        desc: 'Clearly display relationship status metrics (Married, Single, Divorced, or In a Relationship) adjusted to your profile.',
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-gold mt-0.5">
                          <item.icon size={14} />
                        </div>
                        <div>
                          <strong className="text-white text-xs block font-medium">{item.title}</strong>
                          <span className="text-neutral-400 font-light text-[11px] leading-relaxed block mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  <span>Standard Coordinates</span>
                  <span>Verified OK</span>
                </div>
              </div>
            </RevealGridItem>

            <RevealGridItem
              direction="up"
              distance="XL"
              scaleOnUp={false}
              className="lg:col-span-4 lg:col-start-5 h-full"
            >
              <div className="flex flex-col justify-between bg-[#2a3832]/90 border border-white/10 py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.03] to-transparent pointer-events-none" />

                <div className="w-full">
                  <div className="w-full bg-[#1e2a24] aspect-[16/9] rounded-2xl overflow-hidden relative border border-white/10 group mb-6 shadow-xl">
                    <SectionVideoPlayer
                      src={OUR_VCARDS_2D_EXPLAINER_VIDEO}
                      ariaLabel="vBiz Me 2D explainer video for vCard features"
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                      playWhenInView
                      autoplayAfterLoad
                      autoplayOnSafari={false}
                    />
                  </div>

                  <div className="text-left px-1 mb-6">
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.2em] font-semibold block mb-2">
                      ENGAGING MULTIMEDIA HUB
                    </span>
                    <h3 className="text-white font-medium text-lg mb-3 tracking-tight leading-snug">
                      Bring Your vCard to Life with 2D and Whiteboard Explainer Videos!
                    </h3>
                    <p className="text-neutral-400 font-light text-xs leading-relaxed mb-4">
                      At vBiz Me, we don&apos;t just offer customizable virtual business cards – we give you the tools to captivate your audience with dynamic 2D explainer and whiteboard videos. Whether you&apos;re looking to simplify complex ideas, showcase your brand story, or create a memorable first impression, these engaging video formats can be easily integrated into your vCard.
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
                    <FileText size={14} /> ORDER YOUR VCARD NOW!
                  </MagneticButton>
                </div>
              </div>
            </RevealGridItem>

            <RevealGridItem
              direction="right"
              distance="XL"
              scaleOnUp={false}
              className="lg:col-span-4 lg:col-start-9 h-full"
            >
              <div className="bg-[#283630]/60 border border-white/5 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-brand-gold/15 transition-all duration-300 flex flex-col justify-between text-left h-full">
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
                    {CTA_BUTTONS.map((btn) => (
                      <div
                        key={btn.label}
                        className="flex items-center gap-3 p-2 bg-[#26342e] border border-white/5 rounded-xl text-left"
                      >
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

                  <div className="mt-5 pt-5 border-t border-white/5 text-left">
                    <h4 className="text-white text-xs font-medium mb-1.5 flex items-center gap-1.5">
                      <Briefcase size={13} className="text-brand-gold" />
                      Dynamic Portfolios Included
                    </h4>
                    <p className="text-neutral-400 font-light text-[11px] leading-relaxed">
                      Showcase your work seamlessly, including projects, client case studies, professional certifications, corporate awards, verified reviews, and testimonials.
                    </p>
                  </div>

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
            </RevealGridItem>
          </SectionRevealStaggerList>

          {/* Row 2 — left & right bottom cards slide up 600px after row 1 */}
          <SectionRevealStaggerList
            stagger={OUR_VCARD_FEATURE_STAGGER.ITEM}
            delayChildren={OUR_VCARD_FEATURE_STAGGER.ROW2_DELAY}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mt-6 lg:mt-8"
          >
            <RevealGridItem direction="up" distance="XL" scaleOnUp={false} className="lg:col-span-4 h-full">
              <div className="bg-[#2a3020] border border-brand-gold/10 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-300 text-left h-full">
                <div className="absolute top-0 right-0 h-12 w-12 bg-gradient-to-bl from-brand-gold/10 to-transparent pointer-events-none" />
                <div className="flex items-center gap-2.5 mb-3 text-brand-gold">
                  <Zap size={16} className="animate-pulse" />
                  <h4 className="text-white font-medium text-sm tracking-tight">Card Auto Data Filling Feature</h4>
                </div>
                <p className="text-neutral-400 font-light text-xs leading-relaxed">
                  Avoid manual configuration! Provide a simple resume text, a previous paper business card picture, or your LinkedIn URL. Our smart parser instantly auto-extracts your coordinates and theme guidelines to pre-build a ready-vCard.
                </p>
              </div>
            </RevealGridItem>

            <RevealGridItem
              direction="up"
              distance="XL"
              scaleOnUp={false}
              className="lg:col-span-4 lg:col-start-9 h-full"
            >
              <div className="bg-gradient-to-br from-[#2a3528] to-[#222e28] border border-brand-gold/30 py-6 px-4 md:py-8 md:px-6 rounded-[2rem] relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.03)] text-left h-full">
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
            </RevealGridItem>
          </SectionRevealStaggerList>
        </SectionRevealRoot>
      </div>
    </section>
  );
}
