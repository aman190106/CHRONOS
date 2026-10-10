import React, { useEffect, useRef } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ClosingStatement = ({ onOpenInquiry }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.closing-content', {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToMovement = () => {
    const el = document.getElementById('movement-experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative py-32 sm:py-44 bg-[#08090B] border-t border-white/5 overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-90 pointer-events-none"></div>

      <div className="closing-content max-w-4xl mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center">
        {/* Insignia Emblem with Continuous Pulse & Hover Glow */}
        <div className="group w-14 h-14 rounded-full border border-[#C9A276]/30 flex items-center justify-center mb-8 bg-[#0E1015]/60 hover:border-[#C9A276] hover:shadow-[0_0_25px_rgba(201,162,118,0.35)] transition-all duration-500 cursor-pointer animate-pulse">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C9A276] group-hover:scale-125 transition-transform duration-300"></div>
        </div>

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.35em] text-[#C9A276] font-medium mb-6">
          THE HOROLOGICAL CONCLUSION
        </p>

        {/* Large Headline */}
        <h2 className="font-['Cormorant_Garamond'] text-5xl sm:text-7xl lg:text-8xl font-light text-[#F2EEE8] tracking-tight leading-none mb-6">
          TIME IS <span className="italic font-normal text-gold-gradient">AN ART.</span>
        </h2>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl text-[#8E929A] font-light max-w-xl mb-12 leading-relaxed">
          Designed to be examined. Engineered to be remembered.
        </p>

        {/* CTA Buttons with Shimmer & Glow */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={scrollToMovement}
            className="shimmer-hover px-10 py-4 bg-[#C9A276] text-[#08090B] font-['Cinzel'] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#DFC29E] hover:shadow-[0_0_30px_rgba(201,162,118,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#C9A276]/15 cursor-pointer"
          >
            EXPLORE CHRONOS
          </button>

          <button
            onClick={onOpenInquiry}
            className="shimmer-hover px-8 py-4 border border-[#C9A276]/40 text-[#F2EEE8] font-['Cinzel'] text-xs uppercase tracking-[0.22em] hover:bg-white/[0.05] hover:border-[#C9A276] hover:shadow-[0_0_20px_rgba(201,162,118,0.2)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            REQUEST CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};

