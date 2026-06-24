'use client';

import { Check, Lightbulb, ArrowRight } from 'lucide-react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealEyebrow, BannerDescription, ScrollRevealCard, SectionRevealRoot } from '@/components/animations/reveal';
import { CompetitiveAnalysisSection } from '@/components/CompetitiveAnalysisSection';
import { OUR_VCARDS_HERO_YOUTUBE_VIDEO_ID } from '@/lib/site-assets';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { YouTubeHeroBackground } from '@/components/ui/YouTubeHeroBackground';
import { OurVCardsFeatureGrid } from '@/components/our-vcards/OurVCardsFeatureGrid';
import { OurVCardsPillarCards } from '@/components/our-vcards/OurVCardsPillarCards';
import { OurVCardsWhyChoose } from '@/components/our-vcards/OurVCardsWhyChoose';

export default function OurVCards() {
  return (
    <div className="bg-brand-dark">
      {/* Hero Section */}
      <section
        aria-labelledby="our-vcards-hero-title"
        className="section-hero section-hero--video-bg relative pb-10 md:pb-12 flex flex-col items-center bg-brand-dark"
      >
        <YouTubeHeroBackground
          videoId={OUR_VCARDS_HERO_YOUTUBE_VIDEO_ID}
          title="Our vCards background video"
        />
        <PageHeroBackground overVideo />

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center w-full">
          <div className="page-hero-video-content text-center max-w-4xl mx-auto">
            <RevealEyebrow label="The Ultimate Digital Asset" variant="hero" className="mx-auto" />

            <RevealText
              id="our-vcards-hero-title"
              text="Our vCards"
              className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
              tag="h1"
              highlightedWords={['vCards']}
            />

            <BannerDescription
              text="At vBiz Me, we give you full creative control. Seamlessly integrate with Canva, Adobe Express, or upload custom music to create a truly unique, dynamic experience that represents your brand and captures attention instantly."
              className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto font-normal leading-relaxed mt-4"
            />
          </div>
        </div>
      </section>

      <OurVCardsFeatureGrid />

      <OurVCardsPillarCards />

      <OurVCardsWhyChoose />

      <section className="site-section site-section--reveal bg-neutral-900/20 relative pb-0">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionRevealRoot viewport="content">
            <ScrollRevealCard direction="up" distance="XL" delay={0} className="w-full">
              <div className="mt-12 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-brand-gold/10 to-transparent py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-brand-gold/20 relative overflow-hidden text-left shadow-[0_20px_60px_rgba(212,175,55,0.06)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.1),transparent)] pointer-events-none" />
                <div className="w-20 h-20 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 border border-brand-gold/30">
                  <Lightbulb className="text-brand-gold w-10 h-10" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-brand-gold uppercase font-semibold block mb-1 text-left">Innovative and Memorable</span>
                  <h3 className="text-white font-medium text-2xl mb-3 tracking-tight text-left">Create a Lasting Impression</h3>
                  <p className="text-neutral-400 font-light leading-relaxed text-left">
                    vCards are designed to captivate and engage. With dynamic intro videos personalized to your profession, you can make an unforgettable first impression. Whether you&apos;re a tech guru, a creative professional, or a business executive, our vCards showcase your unique brand and personality, making sure you stand out in every interaction.
                  </p>
                </div>
              </div>
            </ScrollRevealCard>
          </SectionRevealRoot>
        </div>
      </section>

      <CompetitiveAnalysisSection />

      {/* CTA Section */}
      <section className="site-section site-section--reveal bg-brand-dark relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-brand-gold/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-gold/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <SectionRevealRoot viewport="content">
            <ScrollRevealCard direction="up" distance="XL" delay={0} className="w-full">
              <GlowCard className="backdrop-blur-xl border border-white/10 rounded-[3rem] py-6 px-4 md:py-8 md:px-6 flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden bg-[#26342e]/85 group w-full">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-70" />

                <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent pointer-events-none" />
                <div className="absolute -bottom-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent pointer-events-none" />

                <RevealEyebrow label="Elevate Your Network" className="mb-8 mx-auto" delay={0.1} />

                <div className="max-w-2xl relative z-10 flex flex-col items-center mb-10 text-center">
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15] mb-5">
                    Transform Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-white">Digital Professional Identity</span>
                  </h2>
                  <p className="text-neutral-400 font-light text-base md:text-lg max-w-lg leading-relaxed mb-6">
                    Unlock automated pipelines, dynamic intro integrations, and seamless lead conversion. Contact us today to order your customized intelligent vCard!
                  </p>

                  <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-neutral-500 text-xs font-mono tracking-wide mt-2">
                    <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-gold" /> Automated AI Pipelines</span>
                    <span className="hidden sm:inline text-neutral-700">•</span>
                    <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-gold" /> High-Performance Video</span>
                    <span className="hidden sm:inline text-neutral-700">•</span>
                    <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-gold" /> One-Tap Direct Save</span>
                  </div>
                </div>

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
          </SectionRevealRoot>
        </div>
      </section>
    </div>
  );
}
