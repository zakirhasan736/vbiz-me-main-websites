'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { RevealText, BannerDescription, ScrollRevealCard } from '@/components/animations/reveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call to /api/contact
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // We assume it's successful for this demo
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* Hero Section */}
      <section className="section-hero relative pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center min-h-[50vh] bg-brand-dark">
        <PageHeroBackground />

        <div className="max-w-4xl mx-auto px-4 relative z-10 pt-10 text-center w-full">
          <SectionEyebrow label="Connect With Us" variant="hero" />
          
          <RevealText 
            text="Get in Touch"
            className="text-5xl md:text-7xl font-sans font-medium text-white mb-6 tracking-tight leading-[1.1] text-center"
            tag="h1"
            highlightedWords={["Touch"]}
          />
          
          <BannerDescription 
            text="Ready to elevate your professional presence? Connect with us for premium digital networking solutions."
            className="text-neutral-400 text-lg md:text-xl font-light mt-4 max-w-2xl leading-relaxed"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="site-section relative">
        <div className="absolute top-1/2 right-[10%] w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Contact Info & Details */}
            <ScrollRevealCard direction="left" className="w-full">
              <div className="flex flex-col gap-12 text-left">
                <div>
                  <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 tracking-tight leading-tight">Let's talk about your needs.</h2>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    Whether you're looking for an enterprise solution or a personalized vCard, our team is here to help you make an unforgettable impression.
                  </p>
                </div>

                <div className="space-y-8 bg-neutral-900/30 border border-white/5 rounded-3xl py-6 px-4 md:py-8 md:px-6 backdrop-blur-md">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-white/10 bg-brand-surface flex items-center justify-center shrink-0 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/5 transition-colors">
                      <MapPin className="text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">Office Location</h3>
                      <p className="text-neutral-400 font-light">Connecticut, United States</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-white/10 bg-brand-surface flex items-center justify-center shrink-0 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/5 transition-colors">
                      <Phone className="text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">Direct Line</h3>
                      <p className="text-neutral-400 font-light">(860) 770-9893</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-white/10 bg-brand-surface flex items-center justify-center shrink-0 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/5 transition-colors">
                      <Mail className="text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">Email Support</h3>
                      <p className="text-neutral-400 font-light">mcasanova@vbizme.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollRevealCard>

            {/* Contact Form */}
            <ScrollRevealCard direction="right" className="w-full">
              <div className="bg-brand-surface/80 backdrop-blur-xl py-6 px-4 md:py-8 md:px-6 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-brand-gold/30 transition-colors duration-500 text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h3 className="text-3xl font-medium text-white mb-8 tracking-tight relative z-10">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name" 
                        className={`w-full bg-[#111] border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-gold/50'} px-5 py-4 rounded-xl focus:outline-none focus:bg-[#151515] hover:bg-[#1a1a1a] hover:border-white/20 text-white placeholder-neutral-600 font-light transition-all`}
                        disabled={isSubmitting}
                      />
                      {errors.name && <span className="text-red-400 text-xs mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</span>}
                    </div>
                    <div className="flex flex-col">
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number" 
                        className="w-full bg-[#111] border border-white/10 px-5 py-4 rounded-xl focus:outline-none focus:border-brand-gold/50 focus:bg-[#151515] hover:bg-[#1a1a1a] hover:border-white/20 text-white placeholder-neutral-600 font-light transition-all"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <input 
                      type="text" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address" 
                      className={`w-full bg-[#111] border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-gold/50'} px-5 py-4 rounded-xl focus:outline-none focus:bg-[#151515] hover:bg-[#1a1a1a] hover:border-white/20 text-white placeholder-neutral-600 font-light transition-all`}
                      disabled={isSubmitting}
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</span>}
                  </div>
                  
                  <div className="flex flex-col">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about what you need" 
                      rows={5}
                      className={`w-full bg-[#111] border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-gold/50'} px-5 py-4 rounded-xl focus:outline-none focus:bg-[#151515] hover:bg-[#1a1a1a] hover:border-white/20 text-white placeholder-neutral-600 font-light transition-all resize-none`}
                      disabled={isSubmitting}
                    />
                    {errors.message && <span className="text-red-400 text-xs mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</span>}
                  </div>

                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm"
                    >
                      <CheckCircle2 size={16} /> Message sent successfully! We will get in touch shortly.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-400/10 border border-red-500/25 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
                    >
                      <AlertCircle size={16} /> Something went wrong. Please try again later.
                    </motion.div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full bg-brand-gold hover:bg-yellow-400 text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transform transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.15)] h-14"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-black animate-ping" /> Sending...
                      </span>
                    ) : (
                      <>Send Message <ArrowRight size={16} /></>
                    )}
                  </button>
                </form>
              </div>
            </ScrollRevealCard>
            
          </div>
        </div>
      </section>
    </div>
  );
}
