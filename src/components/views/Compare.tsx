'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { MagneticButton } from '@/components/InteractiveElements';
import {
  RevealGridItem,
  ScrollRevealCard,
  SectionRevealRoot,
  SectionRevealStaggerList,
  BANNER_REVEAL_STAGGER,
} from '@/components/animations/reveal';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { CompetitiveAnalysisSection } from '@/components/CompetitiveAnalysisSection';
import { renderHighlightedText } from '@/lib/text-highlight';

interface ComparisonRow {
  feature: string;
  description: string;
  paper: React.ReactNode;
  basic: React.ReactNode;
  vbiz: React.ReactNode;
  important?: boolean;
}

export default function Compare() {
  const comparisonData: ComparisonRow[] = [
    {
      feature: 'Dynamic Intro Video',
      description: 'Stream a curated 9-second pitch automatically to your audience',
      paper: <X className="text-red-500 w-5 h-5 mx-auto" />,
      basic: <X className="text-red-500 w-5 h-5 mx-auto" />,
      vbiz: <Check className="text-green-500 w-5 h-5 mx-auto" />,
      important: true,
    },
    {
      feature: 'AI Assistant & Smart CTAs',
      description: 'Intelligent interactive call-to-actions tailored dynamically',
      paper: <X className="text-red-500 w-5 h-5 mx-auto" />,
      basic: <X className="text-red-500 w-5 h-5 mx-auto" />,
      vbiz: <Check className="text-green-500 w-5 h-5 mx-auto" />,
      important: true,
    },
    {
      feature: 'Real-Time Analytics',
      description: 'Get notified when, where, and how many times your card gets viewed',
      paper: <X className="text-red-500 w-5 h-5 mx-auto" />,
      basic: <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider block text-center">Limited</span>,
      vbiz: <Check className="text-green-500 w-5 h-5 mx-auto" />,
    },
    {
      feature: 'Updates After Sharing',
      description: 'Change telephone numbers, logos, or offers instantly for all past recipients',
      paper: <X className="text-red-500 w-5 h-5 mx-auto" />,
      basic: <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider block text-center">Sometimes</span>,
      vbiz: <Check className="text-green-500 w-5 h-5 mx-auto" />,
    },
    {
      feature: 'Apple & Google Wallet',
      description: 'One-tap saving directly to native smartphone wallets with push support',
      paper: <X className="text-red-500 w-5 h-5 mx-auto" />,
      basic: <span className="text-neutral-500 text-[10px] uppercase font-bold text-center block">Rare</span>,
      vbiz: <Check className="text-green-500 w-5 h-5 mx-auto" />,
    },
    {
      feature: 'First Impression Energy',
      description: 'The psychological impact and confidence when meeting a prospective lead',
      paper: <span className="text-red-400 text-xs text-center block">Weak</span>,
      basic: <span className="text-red-400 text-xs text-center block">Weak</span>,
      vbiz: <span className="text-brand-gold font-bold text-xs text-center block">Exceptional</span>,
      important: true,
    },
    {
      feature: 'Mini Custom Sales Page',
      description: 'Guides prospects through a proven psychological loop: Emotion → Identity → Proof → Action',
      paper: <X className="text-red-500 w-5 h-5 mx-auto" />,
      basic: <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider block text-center">Somewhat</span>,
      vbiz: <Check className="text-green-500 w-5 h-5 mx-auto" />,
      important: true,
    },
  ];

  const bannerEndDelay =
    BANNER_REVEAL_STAGGER.DELAY_CHILDREN + 3 * BANNER_REVEAL_STAGGER.ITEM;
  const tableRevealDelay = bannerEndDelay + 0.06;

  return (
    <div className="bg-brand-dark relative text-white overflow-hidden">
      {/* Banner + comparison table — one reveal group */}
      <section
        aria-labelledby="compare-hero-title"
        className="section-hero compare-page-hero site-section--reveal relative pt-40 pb-10 md:pb-14 bg-brand-dark"
      >
        <PageHeroBackground />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionRevealRoot viewport="header" simultaneous={false} replayOnNavigate>
            <SectionRevealStaggerList
              stagger={BANNER_REVEAL_STAGGER.ITEM}
              delayChildren={BANNER_REVEAL_STAGGER.DELAY_CHILDREN}
              className="page-hero-video-content text-center max-w-3xl mx-auto flex flex-col items-center"
            >
              <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full flex justify-center mb-4">
                <SectionEyebrow label="Head-to-Head Comparison" variant="hero" />
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full mb-4">
                <h1
                  id="compare-hero-title"
                  className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-center text-white"
                >
                  {renderHighlightedText('vBiz Me vs Paper vs legacy Digital', ['vs'])}
                </h1>
              </RevealGridItem>

              <RevealGridItem direction="up" distance="MD" scaleOnUp={false} className="w-full max-w-2xl">
                <p
                  data-banner-description
                  className="text-lg text-neutral-200 font-normal leading-relaxed text-center"
                >
                  We&apos;re not another simple link-in-bio or online directories list. We&apos;re the first impression that actually converts. Let&apos;s look at the cold facts.
                </p>
              </RevealGridItem>
            </SectionRevealStaggerList>

            <ScrollRevealCard
              direction="up"
              distance="LG"
              delay={tableRevealDelay}
              scaleOnUp={false}
              className="w-full mt-8 md:mt-10"
            >
              <div className="overflow-x-auto border border-emerald-500/10 bg-brand-surface/60 backdrop-blur-md rounded-3xl py-6 px-4 md:py-8 md:px-6 text-left">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/5 text-neutral-400 text-xs uppercase tracking-wider">
                      <th className="py-6 px-4 font-semibold w-1/3 text-left">Core Features</th>
                      <th className="py-6 px-4 text-center">Paper Cards</th>
                      <th className="py-6 px-4 text-center">Basic Digital Cards</th>
                      <th className="py-6 px-4 text-center text-brand-gold bg-brand-gold/5 rounded-t-2xl font-bold">
                        vBiz Me Solutions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-white/5 hover:bg-white/2 transition-colors duration-250 ${
                          row.important ? 'font-medium bg-neutral-900/10' : ''
                        }`}
                      >
                        <td className="py-6 px-4 text-left">
                          <span className="text-white block font-semibold text-sm">
                            {row.feature}
                            {row.important && (
                              <span className="ml-2 inline-block text-[9px] uppercase bg-brand-gold/20 text-brand-gold px-1.5 py-0.5 rounded font-bold tracking-wider">
                                Critical
                              </span>
                            )}
                          </span>
                          <span className="text-neutral-400 text-xs font-light mt-0.5 block line-clamp-2">
                            {row.description}
                          </span>
                        </td>
                        <td className="py-6 px-4 text-center">{row.paper}</td>
                        <td className="py-6 px-4 text-center">{row.basic}</td>
                        <td className="py-6 px-4 text-center bg-brand-gold/5 relative">
                          <div className="relative z-10">{row.vbiz}</div>
                          {index === comparisonData.length - 1 && (
                            <div className="absolute inset-x-0 bottom-0 h-4 bg-brand-gold/5 rounded-b-2xl pointer-events-none" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollRevealCard>
          </SectionRevealRoot>
        </div>
      </section>

      {/* Scroll buffer before chart + lower sections */}
      <div className="compare-scroll-buffer" aria-hidden="true" />

      <CompetitiveAnalysisSection />

      <section className="site-section site-section--reveal relative pb-24 pt-2 md:pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionRevealRoot viewport="compareBelow" simultaneous={false} replayOnNavigate>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <ScrollRevealCard direction="left" distance="LG" delay={0.04} className="h-full">
              <div className="bg-gradient-to-br from-brand-elevated to-brand-dark py-6 px-4 md:py-8 md:px-6 rounded-3xl border border-white/5 relative overflow-hidden h-full flex flex-col justify-between text-left">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none" />

                <div>
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-1">Our Hidden Strength</span>
                  <h2 className="text-3xl font-medium text-white mb-6">The Psychology Flow</h2>
                  <p className="text-neutral-300 font-light leading-relaxed mb-6">
                    Paper gets trashed. Links get put off. vBiz Me delivers a structured professional sequence that guides leads elegantly from an initial visual connection to a high-value relationship:
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs border border-orange-500/20 shrink-0">
                        01
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white text-sm">Emotion (Visual & Sound)</h4>
                        <p className="text-neutral-400 text-xs font-light">
                          A highly energetic 9-second video introduction humanizes physical meetings instantly.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/20 shrink-0">
                        02
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white text-sm">Identity & Credentials</h4>
                        <p className="text-neutral-400 text-xs font-light">
                          Displays high-quality professional badges, company details, and clean contact credentials.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-500/20 shrink-0">
                        03
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white text-sm">Social Proof</h4>
                        <p className="text-neutral-400 text-xs font-light">
                          Displays authentic, verified testimonials directly beneath credentials. No looking elsewhere.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/20 shrink-0">
                        04
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-white text-sm">Instant Action</h4>
                        <p className="text-neutral-400 text-xs font-light">
                          Highly visible and customized call-to-actions (estimates, booking widgets, or live scheduling link) at the bottom.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" distance="LG" delay={0.1} className="h-full">
              <div className="bg-neutral-900/40 border border-white/5 py-6 px-4 md:py-8 md:px-6 rounded-3xl relative flex flex-col justify-between h-full text-left min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 to-brand-gold/2 opacity-20 pointer-events-none" />
                <div>
                  <span className="text-brand-gold font-bold text-[10px] uppercase tracking-widest block mb-4">Total Value Protection</span>
                  <h3 className="text-white text-2xl font-bold tracking-tight mb-2">Stop Throwing Cash To Waste</h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed">
                    Most companies burn through hundreds of dollars on paper designs that literally end up tossed within seconds. vBiz Me updates in real-time, lasts indefinitely, and gives you actionable performance analytics on every interaction.
                  </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                  <div className="text-left">
                    <span className="text-[10px] text-neutral-500 block uppercase">Conversion Rate Lift</span>
                    <span className="text-2xl font-extrabold text-white tracking-tight text-left">+350% Average</span>
                  </div>
                  <MagneticButton
                    href="/pricing"
                    className="px-6 py-2.5 rounded-full bg-brand-gold text-black text-xs font-bold tracking-wide hover:bg-white h-10 w-44 flex items-center justify-center"
                  >
                    Check Packages
                  </MagneticButton>
                </div>
              </div>
            </ScrollRevealCard>
            </div>
          </SectionRevealRoot>
        </div>
      </section>
    </div>
  );
}
