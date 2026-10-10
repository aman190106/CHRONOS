import React, { useEffect, useRef } from 'react';
import { Eye, Shield, Cpu, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Craftsmanship = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.craft-pillar-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      number: '01',
      title: 'Precision-Engineered Movement',
      subtitle: 'Kinetic Geometry in Equilibrium',
      description:
        'Every bridge, pinion, and escapement tooth is crafted to microscopic tolerances. The interplay of gear trains delivers unwavering kinetic transmission without surplus friction.',
      image: '/images/frame-0110.jpg',
      alt: 'CHRONOS Precision Engineered Movement Closeup',
    },
    {
      number: '02',
      title: 'Sculpted Rose-Gold Architecture',
      subtitle: 'Warm Noble Metal Artistry',
      description:
        'Forged in solid 18-karat rose gold, the multi-tiered bezel and lugs exhibit hand-satinized brushing contrasted against hand-polished chamfers.',
      image: '/images/frame-0050.jpg',
      alt: 'Sculpted Rose-Gold Bezel Architecture',
    },
    {
      number: '03',
      title: 'Skeletonized Dial Construction',
      subtitle: 'Transparent Mechanical Depth',
      description:
        'A masterwork of openwork horology. By removing all superfluous material, the multi-layered sapphire and deep navy bridges expose the pulsing organ of time.',
      image: '/images/frame-0080.jpg',
      alt: 'Skeletonized Dial Construction Geometry',
    },
  ];

  return (
    <section id="craftsmanship" ref={sectionRef} className="relative py-28 sm:py-36 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#101B2D]/30 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#C9A276]"></span>
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9A276] font-medium">
                HAUTE HORLOGERIE PHILOSOPHY
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-[#F2EEE8] leading-[1.1]">
              Beauty Beneath <br />
              <span className="italic font-normal text-gold-gradient">the Surface.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#8E929A] font-light leading-relaxed">
            An intricate mechanical architecture transforms hundreds of precisely engineered
            components into a single expression of time.
          </p>
        </div>

        {/* Craftsmanship Three Pillars Grid - Strict Equal Alignment & Sizing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="craft-pillar-card card-luxury group relative bg-[#0E1015]/60 border border-white/5 p-6 sm:p-8 flex flex-col justify-between cursor-pointer overflow-hidden h-full"
            >
              {/* Subtle gold top border that expands on hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#C9A276] via-[#DFC29E] to-transparent group-hover:w-full transition-all duration-700"></div>

              <div className="flex-1 flex flex-col">
                {/* Image Crop Showcase with Ambient Breathing & Dynamic Hover Zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 bg-black/80 rounded-none border border-white/5 group-hover:border-[#C9A276]/30 transition-colors duration-500">
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    className="w-full h-full object-cover animate-ambient-breathe transition-transform duration-700 ease-out group-hover:scale-115 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                  {/* Subtle Light Glare Sheen Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                </div>

                {/* Pillar Index & Subtitle */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-['Cinzel'] text-xs text-[#C9A276] tracking-[0.25em] group-hover:scale-110 transition-transform origin-left">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E929A] group-hover:text-[#F2EEE8] transition-colors">
                    {pillar.subtitle}
                  </span>
                </div>

                {/* Title with Uniform Min-Height for Consistent Grid Alignment */}
                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-light text-[#F2EEE8] mb-4 min-h-[3.5rem] flex items-center group-hover:text-[#C9A276] transition-colors duration-300">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#8E929A] font-light leading-relaxed flex-1 group-hover:text-[#F2EEE8]/80 transition-colors">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Hairline & Animated Arrow */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#C9A276]/60 font-mono group-hover:text-[#C9A276] transition-colors">
                <span>MANUFACTURE GENÈVE</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
