'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';

export default function Pricing() {
  const plans = [
    {
      title: "Essential",
      subtitle: "2-Year Contract • $10 Setup",
      priceParts: { currency: "$", amount: "9", cents: "95", period: "Monthly*" },
      features: [
        "5 Professional Reviews",
        "5 Custom FAQs",
        "5 Service Listings",
        "4 Photos",
        "2 Videos",
        "Basic Content Edits",
        "Digital QR Code",
      ],
      description: "Perfect for professionals establishing their digital presence with essential features",
      buttonText: "Get Started",
      popular: false,
    },
    {
      title: "Professional vCard",
      subtitle: "1-Year Contract • $129.00",
      priceParts: { currency: "$", amount: "8", cents: "", period: "Monthly*" },
      features: [
        "Unlimited Content Edits",
        "Custom Golden Branding",
        "Advanced Performance Analytics",
        "10 Photos, 5 Videos",
        "7 Professional Reviews",
        "7 Custom FAQs and 7 Service Listings",
        "Priority Customer Support",
      ],
      description: "The complete solution for established professionals who demand excellence and growth",
      buttonText: "Get Started",
      popular: true,
    },
    {
      title: "Corporate vCard",
      subtitle: "Built for organizations needing customized features.",
      priceParts: { customText: "Contact Sales" },
      features: [
        "Dedicated Account Manager",
        "Custom Brand Package",
        "Unlimited Media Uploads",
        "Team Management Dashboard",
        "Bulk User Onboarding",
        "Advanced Integration Options",
        "Bulk User Onboarding",
      ],
      description: "The ultimate corporate solution for executives and teams requiring premium service",
      buttonText: "Get Started",
      popular: false,
    }
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="section-hero relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex flex-col justify-center items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,#1a1a1a_0%,black_100%)] opacity-80" />
          <motion.div 
            animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center">
          <div className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 shadow-[0_0_20px_rgba(212,175,55,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,1)]" 
            />
            <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-neutral-200">Transparent Pricing</span>
          </div>
          
          <RevealText 
            text="Find the Right Plan"
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["Plan"]}
          />
          
          <RevealParagraph 
            text="Explore flexible plans for every budget, with discounts, expanded features, and dedicated support tailored to your needs."
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-3xl mx-auto leading-relaxed block"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="site-section bg-black relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-gold/10 blur-[150px] rounded-full z-0 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6 font-sans">
            {plans.map((plan, index) => {
              const glowColor = plan.popular ? 'rgba(212,175,55,0.22)' : index === 2 ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.12)';
              const direction = index === 0 ? "left" : index === 1 ? "up" : "right";
              const delay = index * 0.08;
              return (
                <ScrollRevealCard 
                  key={index}
                  direction={direction}
                  delay={delay}
                  className="h-full"
                >
                  <GlowCard 
                    glowColor={glowColor}
                    className={`relative flex flex-col rounded-[2.5rem] overflow-hidden border h-full ${
                      plan.popular ? 'border-brand-gold/50 shadow-[0_20px_50px_rgba(212,175,55,0.15)] lg:-translate-y-4' : 'border-white/10 hover:border-white/20'
                    } transition-all duration-300`}
                  >
                    {/* Popular Ribbon */}
                    {plan.popular && (
                      <div className="absolute top-0 right-0 z-10 overflow-hidden w-32 h-32">
                        <div className="absolute top-6 -right-6 bg-brand-gold text-black font-bold text-[10px] uppercase tracking-widest py-1.5 w-40 text-center transform rotate-45 shadow-lg">
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className={`py-6 px-4 md:py-8 md:px-6 border-b w-full text-left ${plan.popular ? 'border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 to-transparent' : 'border-white/5'}`}>
                      <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">{plan.title}</h3>
                      <p className="text-sm text-neutral-400 font-light">{plan.subtitle}</p>
                    </div>

                    {/* Price Display */}
                    <div className="py-6 px-4 md:py-8 md:px-6 w-full text-left">
                      {plan.priceParts.customText ? (
                        <div className="text-4xl font-medium text-white flex items-center justify-start h-[72px] tracking-tight">
                          <span>{plan.priceParts.customText}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start justify-center">
                          <div className="flex items-start text-white font-medium tracking-tight">
                            <span className="text-2xl mt-2 text-neutral-400">{plan.priceParts.currency}</span>
                            <span className="text-7xl leading-none">{plan.priceParts.amount}</span>
                            {plan.priceParts.cents && (
                              <span className="text-2xl mt-2 text-neutral-400">.{plan.priceParts.cents}</span>
                            )}
                          </div>
                          <p className="text-neutral-500 text-sm mt-2">{plan.priceParts.period}</p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="px-10 flex-1 w-full text-left">
                      <ul className="space-y-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-brand-gold/20' : 'bg-white/10'}`}>
                               <CheckCircle2 className={`${plan.popular ? 'text-brand-gold' : 'text-neutral-300'}`} size={12} strokeWidth={3} />
                            </div>
                            <span className="text-neutral-300 text-[14px] leading-relaxed font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer / CTA */}
                    <div className="py-6 px-4 md:py-8 md:px-6 flex flex-col items-center mt-auto w-full">
                      <MagneticButton 
                        href="/contact" 
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 mb-6 h-14 ${
                          plan.popular 
                            ? 'bg-brand-gold text-black hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]' 
                            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {plan.buttonText}
                        <ArrowRight size={16} />
                      </MagneticButton>
                      <p className="text-neutral-500 text-xs leading-relaxed text-center font-light">
                        {plan.description}
                      </p>
                    </div>
                  </GlowCard>
                </ScrollRevealCard>
              );
            })}
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-24">
            <ScrollRevealCard direction="left" className="h-full">
              <GlowCard 
                glowColor="rgba(212,175,55,0.18)"
                className="py-6 px-4 md:py-8 md:px-6 rounded-[2.2rem] h-full"
              >
                <p className="text-neutral-300 text-[16px] leading-relaxed font-light relative z-10 text-left">
                  At vBiz Me, every customer can create a unique vCard that perfectly represents their personality or business. Start customizing your vCard today and experience the future of digital networking!
                </p>
              </GlowCard>
            </ScrollRevealCard>
            
            <ScrollRevealCard direction="right" className="h-full">
              <GlowCard 
                glowColor="rgba(212,175,55,0.18)"
                className="py-6 px-4 md:py-8 md:px-6 rounded-[2.2rem] h-full"
              >
                <p className="text-neutral-300 text-[16px] leading-relaxed font-light relative z-10 text-left">
                  Our professional templates and flexible configurations offer limitless branding choices. Deliver a beautiful responsive mobile story that converts contacts into customers instantly.
                </p>
              </GlowCard>
            </ScrollRevealCard>
          </div>
        </div>
      </section>
    </div>
  );
}
