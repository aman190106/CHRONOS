import React, { useState } from 'react';
import { ArrowDown, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const scrollToMovement = () => {
    const el = document.getElementById('movement-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCollection = () => {
    const el = document.getElementById('timepiece');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#08090B]"
    >
      {/* Subtle luxury ambient background glows reacting smoothly to mouse */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[700px] h-[700px] bg-gradient-to-tr from-[#101B2D]/40 to-[#C9A276]/10 rounded-full blur-[140px] opacity-70 transition-transform duration-1000 ease-out"
          style={{
            top: '25%',
            left: '50%',
            transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px))`,
          }}
        ></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#101B2D]/50 rounded-full blur-[120px] opacity-50"></div>
        {/* Subtle grid lines for horological blueprint feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,162,118,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,162,118,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Editorial & Brand Messaging */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#C9A276] transition-all duration-300 group-hover:w-12"></span>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C9A276] font-medium">
              THE ART OF MECHANICAL TIME
            </p>
          </div>

          {/* Large Headline */}
          <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl md:text-7xl lg:text-7.5xl font-light tracking-tight text-[#F2EEE8] leading-[1.05]">
            Time, Engineered <br />
            <span className="italic font-normal text-gold-gradient">to Perfection.</span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg text-[#8E929A] font-light leading-relaxed max-w-xl">
            A study in precision, where every component has a purpose and every second tells a story.
            Unveiling the 192-part skeleton calibre forged in 18-karat rose gold.
          </p>

          {/* Key Horological Markers with Hover Lift */}
          <div className="grid grid-cols-3 gap-6 pt-2 pb-4 border-y border-white/5 max-w-lg">
            <div className="group cursor-default transition-transform duration-300 hover:-translate-y-1">
              <span className="block font-['Cinzel'] text-xl text-[#F2EEE8] group-hover:text-[#C9A276] transition-colors tracking-wider">
                192
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E929A]">Components</span>
            </div>
            <div className="group cursor-default transition-transform duration-300 hover:-translate-y-1">
              <span className="block font-['Cinzel'] text-xl text-[#F2EEE8] group-hover:text-[#C9A276] transition-colors tracking-wider">
                42mm
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E929A]">Rose Gold</span>
            </div>
            <div className="group cursor-default transition-transform duration-300 hover:-translate-y-1">
              <span className="block font-['Cinzel'] text-xl text-[#F2EEE8] group-hover:text-[#C9A276] transition-colors tracking-wider">
                28,800
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E929A]">Vibrations/H</span>
            </div>
          </div>

          {/* Call to Actions with Shimmer & Scale Hover */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={scrollToMovement}
              className="shimmer-hover px-8 py-4 bg-[#C9A276] text-[#08090B] font-['Cinzel'] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#DFC29E] hover:shadow-[0_0_25px_rgba(201,162,118,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>EXPLORE THE MOVEMENT</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>

            <button
              onClick={scrollToCollection}
              className="shimmer-hover px-8 py-4 border border-[#C9A276]/30 text-[#F2EEE8] font-['Cinzel'] text-xs uppercase tracking-[0.22em] hover:border-[#C9A276] hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(201,162,118,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              DISCOVER THE COLLECTION
            </button>
          </div>
        </div>

        {/* Right Column: Hero Assembled Watch Visual with 3D Tilt Parallax */}
        <div className="lg:col-span-6 relative flex items-center justify-center [perspective:1000px]">
          {/* Subtle spinning horological ring */}
          <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#C9A276]/15 flex items-center justify-center spin-tourbillon">
            <div className="w-[85%] h-[85%] rounded-full border border-[#101B2D] border-dashed"></div>
          </div>

          {/* Compass / coordinates marker */}
          <div className="absolute top-4 right-6 hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C9A276]/60 transition-transform duration-500 hover:text-[#C9A276]">
            <Compass className="w-3.5 h-3.5 text-[#C9A276] animate-spin [animation-duration:15s]" />
            <span>46°12'N • GENÈVE</span>
          </div>

          {/* Hero Watch Image with Dynamic 3D Cursor Tilt & Mobile Floating Animation */}
          <div
            className={`relative z-10 w-full max-w-[500px] transition-transform duration-300 ease-out cursor-pointer group ${
              mousePos.x === 0 && mousePos.y === 0 ? 'animate-luxury-float' : ''
            }`}
            style={{
              transform:
                mousePos.x !== 0 || mousePos.y !== 0
                  ? `perspective(1000px) rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 12}deg) scale3d(1.02, 1.02, 1.02)`
                  : undefined,
            }}
          >
            <img
              src="/images/frame-0001.jpg"
              alt="CHRONOS Skeleton Luxury Watch Assembled"
              className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
            />

            {/* Spec Tag with Hover Ping (Compact & Responsive on Mobile) */}
            <div className="absolute bottom-2 sm:bottom-6 left-2 sm:-left-4 bg-[#08090B]/90 backdrop-blur-md border border-[#C9A276]/25 group-hover:border-[#C9A276] p-2.5 sm:p-4 rounded-none shadow-xl flex items-center gap-2.5 sm:gap-3 transition-all duration-300 group-hover:shadow-[0_10px_25px_rgba(201,162,118,0.2)]">
              <div className="relative w-2 sm:w-2.5 h-2 sm:h-2.5 shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#C9A276] animate-ping opacity-75"></div>
                <div className="relative w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#C9A276]"></div>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C9A276] font-medium">Status: Intact</p>
                <p className="font-['Cinzel'] text-[11px] sm:text-xs tracking-wider text-[#F2EEE8]">Configuration Assembled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt Indicator with Hover Glow */}
      <div
        onClick={scrollToMovement}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-[#8E929A] hover:text-[#C9A276] transition-all duration-300 z-20 group hover:scale-105"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-center group-hover:tracking-[0.35em] transition-all">
          Scroll to Disassemble
        </span>
        <div className="w-5 h-8 rounded-full border border-[#C9A276]/30 flex items-start justify-center p-1 group-hover:border-[#C9A276] group-hover:shadow-[0_0_15px_rgba(201,162,118,0.3)] transition-all">
          <div className="w-1 h-2 rounded-full bg-[#C9A276] animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};
