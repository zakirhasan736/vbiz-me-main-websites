'use client';

import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';

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
    <div className="bg-black min-h-screen">
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
             <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-neutral-200">The Secret Weapon</span>
          </div>
          
          <RevealText 
            text="Invisible Advantage"
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["Advantage"]}
          />
          
          <RevealParagraph 
            text="The Advantage You Can't See... But Your Clients Feel Immediately"
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-2xl mx-auto leading-relaxed block text-center"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="site-section bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          
          <div className="text-center mb-16">
            <RevealParagraph 
              text="The Invisible Advantage is the hidden force working behind every vBiz Me card. It's the strategy, psychology, and technology built into your digital presence that turns a simple scan into real interest — and real business."
              className="text-neutral-300 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto font-light block"
            />
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-4">
            {accordionItems.map((item, index) => {
              const direction = index % 2 === 0 ? "left" : "right";
              const delay = index * 0.05;
              return (
                <ScrollRevealCard 
                  key={index}
                  direction={direction}
                  delay={delay}
                  className="w-full"
                >
                  <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 transition-colors hover:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                      className="w-full flex items-center justify-between py-6 px-4 md:py-8 md:px-6 text-left focus:outline-none group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/5 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-0 group-hover:opacity-100" />
                      <span className={`text-lg md:text-xl font-medium tracking-tight relative z-10 transition-colors duration-300 ${activeAccordion === index ? 'text-brand-gold' : 'text-white'}`}>
                        {item.title}
                      </span>
                      <motion.div
                        animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`shrink-0 ml-4 relative z-10 ${activeAccordion === index ? 'text-brand-gold' : 'text-neutral-500'}`}
                      >
                        {activeAccordion === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 md:px-6 pb-8 text-neutral-400 text-base leading-relaxed font-light">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollRevealCard>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
