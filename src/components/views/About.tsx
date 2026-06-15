'use client';

import { Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { GlowCard, MagneticButton } from '@/components/InteractiveElements';
import { RevealText, RevealParagraph, ScrollRevealCard } from '@/components/animations/reveal';
import { FOUNDER_INTRO_VIDEO } from '@/lib/site-assets';

export default function About() {
  return (
    <div className="bg-black">
      <section className="section-hero relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex flex-col justify-center items-center">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,#1a1a1a_0%,black_100%)] opacity-80" />
          <motion.div
            animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"
          />
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,1)]"
              />
              <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-neutral-200">Our Story</span>
            </div>

            <RevealText
              text="Redefining Connections."
              className="text-5xl md:text-7xl font-sans font-medium tracking-tight text-white mb-8 leading-[1.1]"
              tag="h1"
              highlightedWords={["Connections."]}
            />

            <RevealParagraph
              text="At vBiz Me, we revolutionize networking with dynamic virtual business cards. Our platform helps you make an instant impact by combining engaging intro videos, customizable designs, and seamless sharing via QR codes or links."
              className="text-xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed block"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="site-section bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollRevealCard direction="left" className="h-full">
              <GlowCard className="py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] shadow-2xl h-full" glowColor="rgba(212,175,55,0.18)">
                <div className="relative z-10">
                  <h3 className="text-white font-medium text-3xl mb-6 tracking-tight">Our Vision</h3>
                  <p className="text-neutral-400 text-base leading-normal md:leading-relaxed font-light mb-6">
                    At vBiz Me, our vision is to revolutionize the way people connect by providing innovative and personalized virtual business cards. We aim to empower individuals and businesses to create lasting, indelible impressions in every interaction.
                  </p>
                  <p className="text-neutral-400 text-base leading-normal md:leading-relaxed font-light">
                    At vBiz Me, we are dedicated to supporting you every step of the way, ensuring your success and satisfaction. Thank you for joining us on this journey to transform connections and create unforgettable impressions.
                  </p>
                </div>
              </GlowCard>
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" className="h-full">
              <GlowCard className="py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] shadow-2xl h-full" glowColor="rgba(43,108,176,0.18)">
                <div className="relative z-10">
                  <h3 className="text-white font-medium text-3xl mb-6 tracking-tight">Our Mission</h3>
                  <p className="text-neutral-400 text-base  leading-normal md:leading-relaxed font-light">
                    At vBiz Me, we're transforming the way people connect and exchange information with cutting-edge, customized virtual business cards. Our goal is to help individuals and businesses leave a lasting impression in every encounter. By leveraging the latest technology and offering full personalization, we make sure each connection you create is not only impactful but truly memorable. Your success drives us, and we're dedicated to being by your side at every stage, ensuring your satisfaction and helping you stand out.
                  </p>
                </div>
              </GlowCard>
            </ScrollRevealCard>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="site-section bg-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            <ScrollRevealCard direction="left" className="w-full lg:w-2/5 relative">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />
                <video
                  src={FOUNDER_INTRO_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.muted = true;
                    e.currentTarget.play().catch(() => { });
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label="Michaelangelo Casanova intro video"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-2xl font-medium text-white mb-1 tracking-tight">Michaelangelo Casanova</h3>
                  <p className="text-brand-gold text-sm tracking-widest uppercase">CEO & Founder</p>
                </div>
              </div>
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-[3rem] -z-10 blur-xl opacity-50" />
            </ScrollRevealCard>

            <ScrollRevealCard direction="right" className="w-full lg:w-3/5">
              <h2 className="text-4xl md:text-5xl font-medium text-white mb-10 tracking-tight leading-[1.1] text-left">
                A Message from the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Founder</span>
              </h2>
              <div className="sspace-y-4 md:space-y-6 text-neutral-400 text-lg leading-relaxed font-light text-left">
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
                <span className="font-[cursive] text-4xl text-white font-light tracking-tighter opacity-80">MCasanova</span>
              </div>

              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300">
                  <Facebook size={20} fill="currentColor" strokeWidth={0} />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300">
                  <Twitter size={20} fill="currentColor" strokeWidth={0} />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-white/10 transition-all duration-300">
                  <Youtube size={20} fill="currentColor" strokeWidth={0} />
                </a>
              </div>
            </ScrollRevealCard>

          </div>
        </div>
      </section>

      {/* 6-D Process */}
      <section className="site-section bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-[#111] mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-md"></div>
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-brand-gold relative z-10">Methodology</span>
            </div>
            <RevealText
              text="Our 6-D Process"
              className="text-4xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              { num: "01", title: "Discover", bg: "bg-[#0A0A0A]", border: "border-white/10", glow: "rgba(212,175,55,0.18)", desc: "We begin by immersing ourselves in your business to fully understand your goals, audience, and vision. This phase includes:", list: ["Conducting comprehensive research and analysis.", "Identifying core objectives and potential challenges.", "Grasping the essence of your brand and its personality."] },
              { num: "02", title: "Define", bg: "bg-[#0A0A0A]", border: "border-white/10", glow: "rgba(59,130,246,0.18)", desc: "Next, we turn insights into a strategic plan. In this stage, we:", list: ["Set clear, measurable objectives.", "Define the project scope and key deliverables.", "Establish timelines and critical milestones."] },
              { num: "03", title: "Design", bg: "bg-[#0A0A0A]", border: "border-white/10", glow: "rgba(168,85,247,0.18)", desc: "Our creative process takes center stage as we craft your unique virtual business card. This phase involves:", list: ["Developing initial design concepts and prototypes.", "Integrating your brand elements—logos, colors, and themes.", "Ensuring the design resonates with your brand identity and goals."] },
              { num: "04", title: "Develop", bg: "bg-[#0A0A0A]", border: "border-white/10", glow: "rgba(34,197,94,0.18)", desc: "Here, our technical team brings the design to life, transforming it into a fully functional digital product. This step includes:", list: ["Writing efficient, high-quality code.", "Incorporating necessary features and functionalities.", "Conducting thorough testing to guarantee performance and quality."] },
              { num: "05", title: "Deploy", bg: "bg-[#0A0A0A]", border: "border-white/10", glow: "rgba(239,68,68,0.18)", desc: "We prepare everything for a flawless launch. In this phase, we:", list: ["Finalize the product and get it ready for release.", "Handle hosting and domain configurations.", "Optimize all elements to ensure a smooth launch."] },
              { num: "06", title: "Deliver", bg: "bg-[#0A0A0A]", border: "border-white/10", glow: "rgba(212,175,55,0.18)", desc: "Finally, we hand over the complete product, ready for you to use and impress. This phase covers:", list: ["Providing comprehensive training and support.", "Delivering all necessary documentation and access.", "Offering continued maintenance and updates."] }
            ].map((step, idx) => {
              const direction = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right";
              const delay = (idx % 3) * 0.08;
              return (
                <ScrollRevealCard
                  key={idx}
                  direction={direction}
                  delay={delay}
                  className="h-full"
                >
                  <GlowCard
                    glowColor={step.glow}
                    className="py-6 px-4 md:py-8 md:px-6 rounded-3xl text-left h-full"
                  >
                    <div className="absolute -top-4 -right-4 text-8xl font-bold text-white/[0.03] select-none z-0 group-hover:text-white/[0.05] transition-colors">
                      {step.num}
                    </div>
                    <div className="relative z-10 flex flex-col h-full font-sans">
                      <div className="text-sm font-bold text-neutral-500 tracking-widest mb-2 font-mono">{step.num}.</div>
                      <h3 className="text-white font-medium text-2xl mb-4 group-hover:text-brand-gold transition-colors">{step.title}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                        {step.desc}
                      </p>
                      <ul className="text-neutral-400 text-sm space-y-3 font-light mt-auto">
                        {step.list.map((item, i) => (
                          <li key={i} className="flex gap-3 font-sans">
                            <span className="text-brand-gold/50 mt-1.5 w-1 h-1 rounded-full bg-brand-gold/50 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlowCard>
                </ScrollRevealCard>
              );
            })}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-section hidden bg-brand-gold text-black text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealText
            text="Ready to start your journey?"
            className="text-4xl md:text-5xl;kjkkp;;;lk'x
            
            ;'.]\font-medium tracking-tight mb-8 text-black"
            tag="h2"
            centered={true}
          />
          <p className="text-xl opacity-80 font-light mb-10 max-w-2xl mx-auto font-sans text-black">
            Join thousands of professionals completely changing the way they share the';

            '//'/".';'
            '
            ]
            '
            ;..ir digital presence.
          </p>
          <div className="flex justify-center font-sans">
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform h-14"
            >
              Contact Us Today
              <ArrowRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
