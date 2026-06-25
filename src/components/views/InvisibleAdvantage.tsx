'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
  RevealGridItem,
  SectionRevealRoot,
  SectionRevealStaggerList,
  BANNER_REVEAL_STAGGER,
  getTwoColumnDirection,
} from '@/components/animations/reveal';
import { INVISIBLE_ADVANTAGE_VIDEO } from '@/lib/site-assets';
import { renderHighlightedText } from '@/lib/text-highlight';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionVideoPlayer } from '@/components/ui/SectionVideoPlayer';

export default function InvisibleAdvantage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const accordionItems = [
    {
      title: "What Is the Invisible Advantage?",
      content: "At vBiz Me, we believe that the most powerful benefits are often the ones you don't see at first glance. The \"Invisible Advantage\" is our term for the subtle yet game-changing edge that our platform provides. It's the layer of advantage that's not immediately visible but makes a profound impact on your networking and business growth."
    },
    {
      title: "How the Invisible Advantage Works",
      content: "The Invisible Advantage works seamlessly in the background. By optimizing the user journey, ensuring fast load times, and providing intuitive navigation, it removes friction. When a client scans your vCard, they experience a flawless transition from physical to digital, creating an immediate sense of professionalism."
    },
    {
      title: "Why It Matters",
      content: "In a competitive market, small details make a big difference. The Invisible Advantage ensures that your first impression is not just good, but exceptional. It builds trust, conveyed through high-quality design and flawless execution, leading to higher engagement and conversion rates."
    },
    {
      title: "What's Included in Your Invisible Advantage",
      content: "It includes advanced analytics to track engagement, SEO optimization for better visibility, instant load mechanisms, and a psychological design approach that aligns colors, typography, and layout to evoke the right emotions from your prospects."
    },
    {
      title: "Why Choose vBiz Me's Invisible Advantage?",
      content: "We don't just build vCards; we engineer digital experiences. Our Invisible Advantage is built on years of research into user behavior and digital psychology, giving you a proven edge that others simply can't replicate."
    }
  ];

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Banner — eyebrow, title, subtitle, video, caption in one reveal group */}
      <section className="section-hero site-section--reveal relative pt-32 pb-12 overflow-visible bg-brand-dark">
        <PageHeroBackground />

        <SectionRevealRoot
          viewport="header"
          simultaneous={false}
          replayOnNavigate
          className="w-full max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <SectionRevealStaggerList
            stagger={BANNER_REVEAL_STAGGER.ITEM}
            delayChildren={BANNER_REVEAL_STAGGER.DELAY_CHILDREN}
            className="flex flex-col items-center text-center"
          >
            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full flex justify-center mb-6">
              <SectionEyebrow label="The Secret Weapon" variant="hero" />
            </RevealGridItem>

            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-medium text-white tracking-tight leading-[1.1] text-center">
                {renderHighlightedText('Invisible Advantage', ['Advantage'])}
              </h1>
            </RevealGridItem>

            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full max-w-2xl mb-8 md:mb-10">
              <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed text-center">
                The Advantage You Can&apos;t See... But Your Clients Feel Immediately
              </p>
            </RevealGridItem>

            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full">
              <div className="relative w-full bg-brand-surface/80 rounded-[2rem] border border-emerald-500/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(16,185,129,0.08)]">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none z-20" />
                <div className="relative aspect-video bg-brand-deep min-h-[220px] sm:min-h-[280px]">
                  <SectionVideoPlayer
                    src={INVISIBLE_ADVANTAGE_VIDEO}
                    ariaLabel="The Invisible Advantage presentation video"
                    playWhenInView={false}
                    autoplayAfterLoad
                    autoplayOnSafari={false}
                    preloadOnSiteReady
                    objectFit="contain"
                    className="absolute inset-0 h-full w-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none z-10" />
                </div>
                <div className="px-4 sm:px-5 py-4 border-t border-emerald-500/10 bg-brand-elevated/90">
                  <p className="text-sm text-neutral-400 font-medium leading-relaxed text-left">
                    A quick walkthrough of the hidden psychology and technology powering every vBiz Me card.
                  </p>
                </div>
              </div>
            </RevealGridItem>

            <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full max-w-2xl mt-8">
              <p className="text-neutral-500 text-sm md:text-base font-light leading-relaxed text-center">
                See how strategy, psychology, and technology combine behind every vBiz Me card — turning a simple scan into trust, engagement, and real business momentum.
              </p>
            </RevealGridItem>
          </SectionRevealStaggerList>
        </SectionRevealRoot>
      </section>

      {/* Content Section */}
      <section className="site-section site-section--reveal bg-brand-dark relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <SectionRevealRoot viewport="content" simultaneous={false} replayOnNavigate>
            <SectionRevealStaggerList
              stagger={BANNER_REVEAL_STAGGER.ITEM}
              delayChildren={BANNER_REVEAL_STAGGER.DELAY_CHILDREN}
              className="flex flex-col gap-4"
            >
              <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="text-center mb-12">
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-light text-center">
                  The Invisible Advantage is the hidden force working behind every vBiz Me card. It&apos;s the strategy, psychology, and technology built into your digital presence that turns a simple scan into real interest — and real business.
                </p>
              </RevealGridItem>

              {accordionItems.map((item, index) => (
                <RevealGridItem
                  key={item.title}
                  direction={getTwoColumnDirection(index)}
                  distance="MD"
                  scaleOnUp={false}
                  className="w-full"
                >
                  <div className="bg-brand-surface rounded-2xl overflow-hidden border border-emerald-500/10 transition-colors hover:border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                    <button
                      type="button"
                      onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                      className="w-full flex items-center justify-between py-6 px-4 md:py-8 md:px-6 text-left focus:outline-none group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/5 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-0 group-hover:opacity-100" />
                      <span
                        className={`text-lg md:text-xl font-medium tracking-tight relative z-10 transition-colors duration-300 ${activeAccordion === index ? 'text-brand-gold' : 'text-white'}`}
                      >
                        {item.title}
                      </span>
                      <div
                        className={`shrink-0 ml-4 transition-transform duration-300 ${activeAccordion === index ? 'text-brand-gold rotate-180' : 'text-neutral-500'}`}
                      >
                        {activeAccordion === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </div>
                    </button>
                    {activeAccordion === index && (
                      <div className="overflow-hidden">
                        <div className="px-4 md:px-6 pb-8 text-neutral-400 text-base md:text-lg leading-relaxed font-light">
                          {item.content}
                        </div>
                      </div>
                    )}
                  </div>
                </RevealGridItem>
              ))}
            </SectionRevealStaggerList>
          </SectionRevealRoot>
        </div>
      </section>
    </div>
  );
}
