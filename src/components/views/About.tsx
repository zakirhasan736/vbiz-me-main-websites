'use client';

import { Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import {
  RevealText,
  BannerDescription,
  SectionRevealRoot,
  SectionRevealGrid,
  RevealGridItem,
  ScrollRevealCard,
  getTwoColumnDirection,
  getGridStaggerForColumns,
} from '@/components/animations/reveal';
import { SocialProof } from '@/components/SocialProof';
import { SectionVideoPlayer } from '@/components/ui/SectionVideoPlayer';
import { ABOUT_HERO_YOUTUBE_VIDEO_ID, FOUNDER_INTRO_VIDEO } from '@/lib/site-assets';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { YouTubeHeroBackground } from '@/components/ui/YouTubeHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SiteGlowIcon } from '@/components/ui/SiteGlowIcon';
import { SiteGlowCard } from '@/components/ui/SiteGlowCard';

export default function About() {
  return (
    <div className="bg-brand-dark">
      <section
        aria-labelledby="about-hero-title"
        className="section-hero section-hero--video-bg relative pt-32 pb-10 md:pb-12 overflow-hidden flex flex-col justify-center items-center bg-brand-dark"
      >
        <YouTubeHeroBackground
          videoId={ABOUT_HERO_YOUTUBE_VIDEO_ID}
          title="About vBiz Me background video"
        />
        <PageHeroBackground overVideo />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
          <div className="page-hero-video-content text-center max-w-4xl mx-auto">
            <SectionEyebrow label="Our Story" variant="hero" />

            <RevealText
              id="about-hero-title"
              text="Redefining Connections."
              className="text-5xl md:text-7xl font-sans font-medium tracking-tight text-white mb-8 leading-[1.1]"
              tag="h1"
              highlightedWords={["Connections."]}
            />

            <BannerDescription
              text="At vBiz Me, we revolutionize networking with dynamic virtual business cards. Our platform helps you make an instant impact by combining engaging intro videos, customizable designs, and seamless sharing via QR codes or links."
              className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto font-normal leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="site-section bg-brand-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionRevealRoot viewport="content">
          <SectionRevealGrid
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            stagger={getGridStaggerForColumns(2)}
          >
            <RevealGridItem direction={getTwoColumnDirection(0)} distance="LG" scaleOnUp={false} className="h-full">
              <GlowCard className="py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] shadow-2xl h-full" glowColor="rgba(212,175,55,0.18)">
                <div className="relative z-10">
                  <h3 className="text-brand-text font-medium text-3xl mb-6 tracking-tight">Our Vision</h3>
                  <p className="text-brand-text-muted text-base leading-normal md:leading-relaxed font-light mb-6">
                    At vBiz Me, our vision is to revolutionize the way people connect by providing innovative and personalized virtual business cards. We aim to empower individuals and businesses to create lasting, indelible impressions in every interaction.
                  </p>
                  <p className="text-brand-text-muted text-base leading-normal md:leading-relaxed font-light">
                    At vBiz Me, we are dedicated to supporting you every step of the way, ensuring your success and satisfaction. Thank you for joining us on this journey to transform connections and create unforgettable impressions.
                  </p>
                </div>
              </GlowCard>
            </RevealGridItem>

            <RevealGridItem direction={getTwoColumnDirection(1)} distance="LG" scaleOnUp={false} className="h-full">
              <GlowCard className="py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] shadow-2xl h-full" glowColor="rgba(43,108,176,0.18)">
                <div className="relative z-10">
                  <h3 className="text-brand-text font-medium text-3xl mb-6 tracking-tight">Our Mission</h3>
                  <p className="text-brand-text-muted text-base leading-normal md:leading-relaxed font-light">
                    At vBiz Me, we're transforming the way people connect and exchange information with cutting-edge, customized virtual business cards. Our goal is to help individuals and businesses leave a lasting impression in every encounter. By leveraging the latest technology and offering full personalization, we make sure each connection you create is not only impactful but truly memorable. Your success drives us, and we're dedicated to being by your side at every stage, ensuring your satisfaction and helping you stand out.
                  </p>
                </div>
              </GlowCard>
            </RevealGridItem>
          </SectionRevealGrid>
          </SectionRevealRoot>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="site-section bg-brand-dark border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            <ScrollRevealCard direction="left" className="w-full lg:w-2/5 relative">
              <SiteGlowCard radius={40} className="aspect-[4/5] h-full overflow-hidden">
                <div className="relative w-full h-full min-h-[320px]">
                  <SectionVideoPlayer
                    src={FOUNDER_INTRO_VIDEO}
                    ariaLabel="Michaelangelo Casanova intro video"
                    playWhenInView
                    objectFit="cover"
                    className="absolute inset-0 h-full w-full"
                  >
                    <div className="founder-video-overlay absolute inset-0 z-10 pointer-events-none" />
                    <div className="absolute bottom-8 left-8 z-20 text-left pointer-events-none">
                      <h3 className="founder-video-caption text-2xl font-medium mb-1 tracking-tight">
                        Michaelangelo Casanova
                      </h3>
                      <p className="founder-video-caption-sub text-sm tracking-widest uppercase">CEO & Founder</p>
                    </div>
                  </SectionVideoPlayer>
                </div>
              </SiteGlowCard>
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-[3rem] -z-10 blur-xl opacity-50 pointer-events-none" />
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" className="w-full lg:w-3/5">
              <h2 className="text-4xl md:text-5xl font-medium text-brand-text mb-10 tracking-tight leading-[1.1] text-left">
                A Message from the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-text-muted">Founder</span>
              </h2>
              <div className="sspace-y-4 md:space-y-6 text-brand-text-muted text-lg leading-relaxed font-light text-left">
                <p>Hello and welcome to vBiz Me!</p>
                <p>
                  I'm Michaelangelo Casanova, and I want to personally thank you for choosing vBiz Me. Your support and trust mean everything to us. We are dedicated to helping you connect and share information in the most innovative and effective ways possible.
                </p>
                <p>
                  If you have any questions, comments, or concerns, please don't hesitate to contact us. We value your feedback and will respond immediately. Your satisfaction is our top priority, and we are here for you every step of the way.
                </p>
                <p>
                  Thank you for being part of our journey. We look forward to helping you stand out and succeed.
                </p>
                <p className="pt-4">Warm regards,</p>
              </div>

              <div className="mt-8 mb-10 text-left">
                <span className="font-[cursive] text-4xl text-brand-text font-light tracking-tighter opacity-90">MCasanova</span>
              </div>

              <div className="flex space-x-4">
                <SiteGlowIcon href="#" ariaLabel="Facebook">
                  <Facebook size={20} fill="currentColor" strokeWidth={0} />
                </SiteGlowIcon>
                <SiteGlowIcon href="#" ariaLabel="Twitter">
                  <Twitter size={20} fill="currentColor" strokeWidth={0} />
                </SiteGlowIcon>
                <SiteGlowIcon href="#" ariaLabel="YouTube">
                  <Youtube size={20} fill="currentColor" strokeWidth={0} />
                </SiteGlowIcon>
              </div>
            </ScrollRevealCard>

          </div>
        </div>
      </section>

      {/* 6-D Process */}

      <SocialProof />
      {/* CTA Section */}

    </div>
  );
}
