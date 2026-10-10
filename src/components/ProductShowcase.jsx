import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Sparkles, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProductShowcase = ({ onOpenInquiry }) => {
  const [selectedView, setSelectedView] = useState('assembled'); // 'assembled' or 'exploded'
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.product-left-col', {
        x: -35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      });

      gsap.from('.product-right-col', {
        x: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const specifications = [
    { label: 'Timepiece Model', value: 'CHRONOS Skeleton' },
    { label: 'Case Dimensions', value: '42 mm Diameter • 9.8 mm Profile' },
    { label: 'Case Metal', value: '18-Karat Rose Gold (Hand Satin-Brushed)' },
    { label: 'Movement Architecture', value: 'Openworked Skeleton in Deep Navy' },
    { label: 'Total Components', value: '192 Hand-Finished Elements' },
    { label: 'Crystal', value: 'Double Anti-Reflective Curved Sapphire' },
    { label: 'Caseback', value: 'Full Exhibition Sapphire Crystal' },
    { label: 'Strap', value: 'Hand-Stitched Navy Alligator Leather' },
  ];

  return (
    <section id="timepiece" ref={sectionRef} className="relative py-28 sm:py-36 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#101B2D]/30 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Product Image & View Switcher */}
          <div className="product-left-col lg:col-span-6 flex flex-col items-center">
            {/* View Switcher Pills */}
            <div className="flex items-center gap-2 mb-8 bg-[#0E1015] border border-white/10 p-1">
              <button
                onClick={() => setSelectedView('assembled')}
                className={`text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all cursor-pointer ${
                  selectedView === 'assembled'
                    ? 'bg-[#C9A276] text-[#08090B] font-semibold'
                    : 'text-[#8E929A] hover:text-[#F2EEE8]'
                }`}
              >
                Assembled Profile
              </button>
              <button
                onClick={() => setSelectedView('exploded')}
                className={`text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all cursor-pointer ${
                  selectedView === 'exploded'
                    ? 'bg-[#C9A276] text-[#08090B] font-semibold'
                    : 'text-[#8E929A] hover:text-[#F2EEE8]'
                }`}
              >
                Disassembled View
              </button>
            </div>

            {/* Watch Showcase Display Container - Unboxed & Floating */}
            <div className="relative w-full max-w-[480px] aspect-[4/5] sm:aspect-square flex items-center justify-center p-4 sm:p-8 bg-transparent group cursor-pointer">
              {/* Subtle circular horological dial background */}
              <div className="absolute w-[88%] h-[88%] rounded-full border border-[#C9A276]/15 group-hover:border-[#C9A276]/40 transition-colors duration-500"></div>

              <img
                src={
                  selectedView === 'assembled'
                    ? '/images/frame-0001.jpg'
                    : '/images/frame-0192.jpg'
                }
                alt="CHRONOS Skeleton Luxury Timepiece"
                className="w-full h-full object-contain relative z-10 animate-luxury-float transition-all duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 font-mono text-[9px] sm:text-[10px] text-[#C9A276]/70 uppercase tracking-widest group-hover:text-[#C9A276] transition-colors">
                REF. CHR-SK-192
              </div>
            </div>
          </div>

          {/* Right Column: Information & Specifications Table */}
          <div className="product-right-col lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#C9A276]"></span>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A276] font-medium">
                THE TIMEPIECE
              </span>
            </div>

            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-6xl font-light text-[#F2EEE8] leading-tight mb-4">
              CHRONOS <span className="italic font-normal text-gold-gradient">Skeleton.</span>
            </h2>

            <p className="text-base text-[#8E929A] font-light leading-relaxed mb-8">
              A singular union of architectural skeletonization and noble metal horology, crafted for
              connoisseurs of pure mechanical art. Every dimension is proportioned for ergonomic
              presence and enduring horological distinction.
            </p>

            {/* Verified Technical Specifications Table with Interactive Rows */}
            <div className="border-t border-b border-white/10 divide-y divide-white/5 mb-8">
              {specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="group/row py-3 sm:py-3.5 px-2 flex items-center justify-between text-xs sm:text-sm hover:bg-[#101B2D]/40 transition-all duration-200 cursor-default"
                >
                  <span className="text-[#8E929A] font-light group-hover/row:text-[#F2EEE8] group-hover/row:translate-x-1 transition-all">
                    {spec.label}
                  </span>
                  <span className="text-[#F2EEE8] font-mono font-normal text-right group-hover/row:text-[#C9A276] transition-colors">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenInquiry}
                className="shimmer-hover px-8 py-4 bg-[#C9A276] text-[#08090B] font-['Cinzel'] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#DFC29E] hover:shadow-[0_0_25px_rgba(201,162,118,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>DISCOVER THE WATCH</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('movement-experience');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="shimmer-hover px-8 py-4 border border-[#C9A276]/30 text-[#F2EEE8] font-['Cinzel'] text-xs uppercase tracking-[0.22em] hover:border-[#C9A276] hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                VIEW DISASSEMBLY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

