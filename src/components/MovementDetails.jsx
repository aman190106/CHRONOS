import React, { useState, useEffect, useRef } from 'react';
import { Cog, Activity, Sparkles, CheckCircle2, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MovementDetails = () => {
  const [activeHotspot, setActiveHotspot] = useState(1);
  const sectionRef = useRef(null);

  const hotspots = [
    {
      id: 1,
      x: '18%',
      y: '35%',
      align: 'left',
      label: 'Sapphire & Bezel Assembly',
      desc: 'Double-domed anti-reflective sapphire crystal seated in 18k rose gold bezel.',
    },
    {
      id: 2,
      x: '32%',
      y: '45%',
      align: 'left',
      label: 'Skeleton Dial Architecture',
      desc: 'Openworked chapter ring displaying hand-finished rose gold hour markers.',
    },
    {
      id: 3,
      x: '50%',
      y: '50%',
      align: 'center',
      label: 'Kinetic Gear Train & Rubies',
      desc: 'Deep navy PVD bridges with high-torque gear trains seated in synthetic ruby pivots.',
    },
    {
      id: 4,
      x: '68%',
      y: '38%',
      align: 'right',
      label: 'Regulating Organ (28,800 VPH)',
      desc: 'Free-sprung balance wheel oscillating with high-precision hairspring concentricity.',
    },
    {
      id: 5,
      x: '82%',
      y: '60%',
      align: 'right',
      label: '18k Rose Gold Case Chassis',
      desc: '42mm chassis with dual-finish hand brushing and exhibition sapphire back.',
    },
  ];

  // Auto-cycle through hotspots on mobile/idle so mobile users see the dynamic inspection
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHotspot((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // GSAP scroll-triggered reveals
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.movement-visual-box',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.movement-feat-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.movement-cards-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const movementFeatures = [
    {
      icon: Cog,
      title: 'Precision Gear Trains & Jeweled Pivots',
      description:
        'Calculated cycloidal gear tooth profiles ensure seamless torque transfer with microscopic friction across synthetic ruby endstones, preserving power reserve and amplitude.',
      metric: 'Kinetic Transfer',
      detail: 'Ultra-low friction',
    },
    {
      icon: Activity,
      title: 'Free-Sprung Balance Mechanism',
      description:
        'The regulating organ oscillates at a rapid 28,800 vibrations per hour (4Hz). The balance spring breathes with concentric rhythm, maintaining chronometric precision in all orientations.',
      metric: 'Frequency',
      detail: '28,800 VPH (4Hz)',
    },
    {
      icon: Sparkles,
      title: 'Haute Horlogerie Hand Finishing',
      description:
        'Deep-navy skeleton bridges treated with anti-corrosive PVD coatings, finished with mirror-polished anglage chamfers, satin-brushed flanks, and circular graining.',
      metric: 'Finishing Standard',
      detail: 'Hand-chamfered anglage',
    },
  ];

  const currentHotspot = hotspots.find((h) => h.id === activeHotspot) || hotspots[0];

  return (
    <section id="calibre-details" ref={sectionRef} className="relative py-28 sm:py-36 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute right-0 top-1/3 w-[600px] h-[600px] bg-[#101B2D]/40 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#101B2D]/60 border border-[#C9A276]/20 transition-all duration-300 hover:border-[#C9A276]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A276]"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A276]">
              CALIBRE SPECIFICATION
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-[#F2EEE8] tracking-tight leading-[1.1] mb-6">
            The Architecture of <br />
            <span className="italic font-normal text-gold-gradient">Perpetual Motion.</span>
          </h2>
          <p className="text-base text-[#8E929A] font-light leading-relaxed">
            A comprehensive study of micro-mechanical kinematics where balance, momentum, and
            artisanal decoration unite. Hover or tap pins below to inspect individual components.
          </p>
        </div>

        {/* Large Watch Movement Visual with Interactive Hotspots */}
        <div className="movement-visual-box relative mb-16 sm:mb-20 group">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden border-y sm:border border-[#C9A276]/20 bg-[#0E1015]/80 sm:shadow-2xl shadow-black transition-all duration-500 group-hover:border-[#C9A276]/40">
            <img
              src="/assets/exploded-watch.png"
              alt="CHRONOS Exploded Mechanical Movement Calibre Architecture"
              className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]/40 pointer-events-none"></div>

            {/* Interactive Component Hotspots */}
            {hotspots.map((h) => {
              const isActive = activeHotspot === h.id;
              return (
                <div
                  key={h.id}
                  className="absolute z-20"
                  style={{ top: h.y, left: h.x }}
                  onMouseEnter={() => setActiveHotspot(h.id)}
                  onClick={() => setActiveHotspot(h.id)}
                >
                  {/* Pulsing Pin Ring */}
                  <div className="relative cursor-pointer -translate-x-1/2 -translate-y-1/2 group/pin">
                    <div className="absolute -inset-2 rounded-full bg-[#C9A276]/20 animate-hotspot"></div>
                    <div
                      className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#C9A276] border-[#F2EEE8] scale-125 shadow-[0_0_15px_#C9A276]'
                          : 'bg-[#08090B]/80 border-[#C9A276] hover:bg-[#C9A276]/30'
                      }`}
                    >
                      <div
                        className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${
                          isActive ? 'bg-[#08090B]' : 'bg-[#C9A276]'
                        }`}
                      ></div>
                    </div>

                    {/* Desktop Floating Inspection Tooltip with Edge-Safe Alignment */}
                    <div
                      className={`hidden md:block absolute bottom-8 w-60 lg:w-64 p-3 bg-[#08090B]/95 backdrop-blur-md border border-[#C9A276]/40 shadow-2xl transition-all duration-300 pointer-events-none z-30 ${
                        h.align === 'left'
                          ? 'left-0 translate-x-2'
                          : h.align === 'right'
                          ? 'right-0 -translate-x-2'
                          : 'left-1/2 -translate-x-1/2'
                      } ${
                        isActive
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-2 scale-95'
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A276] font-medium mb-1 font-mono">
                        0{h.id} • {h.label}
                      </p>
                      <p className="text-xs text-[#8E929A] font-light leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Corner Horological Reticles */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#C9A276]/60 tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A276] animate-pulse"></span>
              <span>SECT. A-1 // 3D KINEMATICS</span>
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#C9A276]/60 tracking-widest uppercase hidden sm:block">
              192 TOTAL DISASSEMBLED ELEMENTS
            </div>
          </div>

          {/* Dedicated Mobile Component Inspector Card - 100% width, never cut off */}
          <div className="md:hidden mt-4 p-4 bg-[#0E1015]/95 border border-[#C9A276]/30 backdrop-blur-md shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A276] font-medium font-mono">
                COMPONENT 0{currentHotspot.id} / 05
              </span>
              <span className="text-[10px] text-[#8E929A] uppercase tracking-wider font-mono">
                CALIBRE CHR-192
              </span>
            </div>
            <h4 className="font-['Cinzel'] text-sm tracking-wider text-[#F2EEE8] font-semibold mb-1">
              {currentHotspot.label}
            </h4>
            <p className="text-xs text-[#8E929A] font-light leading-relaxed mb-3">
              {currentHotspot.desc}
            </p>
            {/* 5 Touch Selector Pills */}
            <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-white/10">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHotspot(h.id)}
                  className={`py-1.5 text-center text-[10px] font-mono tracking-wider transition-all border ${
                    activeHotspot === h.id
                      ? 'bg-[#C9A276] text-[#08090B] border-[#C9A276] font-bold'
                      : 'bg-white/5 text-[#8E929A] border-white/10'
                  }`}
                >
                  0{h.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Three Editorial Detail Blocks with Card Lift */}
        <div className="movement-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {movementFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="movement-feat-card card-luxury group relative bg-[#0E1015]/40 border border-white/5 p-8 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 border border-[#C9A276]/30 flex items-center justify-center mb-6 text-[#C9A276] group-hover:border-[#C9A276] group-hover:bg-[#C9A276]/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-[#F2EEE8] mb-3 group-hover:text-[#C9A276] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#8E929A] font-light leading-relaxed mb-6 group-hover:text-[#F2EEE8]/80 transition-colors">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#8E929A] uppercase tracking-wider">{feat.metric}</span>
                  <span className="text-[#C9A276] font-semibold group-hover:text-[#DFC29E] transition-colors">
                    {feat.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
