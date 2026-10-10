import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFrameSequence } from '../hooks/useFrameSequence';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: 1,
    tag: 'STAGE 01 / ARCHITECTURE',
    title: 'ONE MASTERPIECE.',
    description:
      'Forged in 18-karat rose gold, the case embraces a fully skeletonized heart where centuries of Swiss watchmaking tradition converge.',
    spec: 'Assembled Calibre CHR-192 • 42mm Chassis',
    range: [0, 0.18],
  },
  {
    id: 2,
    tag: 'STAGE 02 / EXTERIOR CHASSIS',
    title: 'EVERY DETAIL MATTERS.',
    description:
      'The anti-reflective curved sapphire crystal departs, revealing hand-finished skeletonized hands, faceted hour batons, and open-worked chapter rings.',
    spec: 'Double Anti-Reflective Sapphire • Rose Gold Bezel',
    range: [0.22, 0.38],
  },
  {
    id: 3,
    tag: 'STAGE 03 / MECHANICAL HEART',
    title: 'PRECISION IN MOTION.',
    description:
      'Intricate deep-navy bridges, hand-chamfered anglage, gear trains, and synthetic ruby bearings decouple in three-dimensional symmetry.',
    spec: 'Openworked Navy Bridges • Jeweled Escapement',
    range: [0.42, 0.58],
  },
  {
    id: 4,
    tag: 'STAGE 04 / CHRONOMETRIC CORE',
    title: 'ENGINEERED FROM WITHIN.',
    description:
      'The free-sprung balance wheel, hairspring, winding stem, and micro-screws separate to reveal the foundational micro-engineering.',
    spec: 'Oscillating Balance • Micron-Machined Screws',
    range: [0.62, 0.78],
  },
  {
    id: 5,
    tag: 'STAGE 05 / EXPANDED HARMONY',
    title: 'PERFECTION, DISSECTED.',
    description:
      '192 individual hand-finished components suspended in three-dimensional space — proof that true luxury hides nothing.',
    spec: 'Fully Exploded Matrix • 192 Precision Components',
    range: [0.82, 1.0],
  },
];

export const WatchScrollExperience = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const activeStageRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);

  const { totalFrames, loadedCount, isInitialReady, getNearestFrame } =
    useFrameSequence();

  // Draw current frame to canvas with responsive edge-to-edge scaling
  const renderFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = getNearestFrame(index);
      if (!img) return;

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      // Cap DPR at 2 for performance and razor sharpness
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const cw = rect.width;
      const ch = rect.height;
      const imgRatio = 1280 / 720; // 1.7778
      const canvasRatio = cw / ch;

      let dw, dh, dx, dy;

      if (cw < 768 || canvasRatio < 1.1) {
        // MOBILE / PORTRAIT TABLET:
        // Edge-to-edge portrait scaling: watch fills upper portion prominently
        dh = Math.max(ch * 0.62, cw * 1.12);
        dw = dh * imgRatio;
        dx = Math.round((cw - dw) / 2);
        dy = Math.round((ch * 0.38) - (dh * 0.5));
      } else {
        // DESKTOP / PC / LANDSCAPE:
        // TRUE FULL-BLEED COVER SCALING (ZERO LETTERBOX BARS, ZERO "IN A BOX" FEEL)
        // Overscans slightly by 3% so any frame-edge component cuts dissolve cleanly beyond viewport edges
        const scale = Math.max(cw / 1280, ch / 720) * 1.03;
        dw = Math.ceil(1280 * scale);
        dh = Math.ceil(720 * scale);
        dx = Math.round((cw - dw) / 2);
        dy = Math.round((ch - dh) / 2);
      }

      // Seamless background clear
      ctx.fillStyle = '#08090B';
      ctx.fillRect(0, 0, cw, ch);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    },
    [getNearestFrame]
  );

  const renderFrameRef = useRef(renderFrame);
  useEffect(() => {
    renderFrameRef.current = renderFrame;
  }, [renderFrame]);

  // Initial draw once ready
  useEffect(() => {
    if (isInitialReady) {
      renderFrameRef.current(currentFrameRef.current);
    }
  }, [isInitialReady]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderFrameRef.current(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger setup: mounted once for rock-solid stability
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frameObj = { frame: currentFrameRef.current };

    const ctx = gsap.context(() => {
      gsap.to(frameObj, {
        frame: totalFrames - 1,
        ease: 'none',
        scrollTrigger: {
          id: 'watch-scroll-trigger',
          trigger: container,
          start: 'top top',
          end: '+=420%', // deliberate luxury scroll length
          pin: true,
          scrub: prefersReducedMotion ? false : 0.6, // silky physics-based momentum
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // Update active editorial stage only on stage change
            for (let i = 0; i < STAGES.length; i++) {
              if (p >= STAGES[i].range[0] && p <= STAGES[i].range[1]) {
                if (activeStageRef.current !== i) {
                  activeStageRef.current = i;
                  setActiveStage(i);
                }
                break;
              }
            }
          },
        },
        onUpdate: () => {
          const targetFrame = Math.round(frameObj.frame);
          currentFrameRef.current = targetFrame;
          renderFrameRef.current(targetFrame);
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  // Jump smoothly to a specific stage
  const jumpToStage = (index) => {
    const targetProgress = STAGES[index].range[0] + 0.05;
    const st = ScrollTrigger.getById('watch-scroll-trigger');
    if (st) {
      window.scrollTo({
        top: st.start + targetProgress * (st.end - st.start),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      id="movement-experience"
      ref={containerRef}
      className="relative w-full h-screen bg-[#08090B] overflow-hidden select-none"
    >
      {/* Background Ambience - pure soft atmospheric glow without geometric stroke borders */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-glow opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[850px] max-h-[850px] bg-[#101B2D]/25 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Interactive HTML Canvas: Edge-to-Edge, Borderless & Seamless */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>

      {/* Seamless Edge Feathering & Vignette Dissolves (Completely eliminates any hard video frame lines) */}
      <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-[#08090B] via-[#08090B]/60 to-transparent pointer-events-none z-15"></div>
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent pointer-events-none z-15"></div>
      <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#08090B]/80 to-transparent pointer-events-none z-15 hidden lg:block"></div>
      <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#08090B]/80 to-transparent pointer-events-none z-15 hidden lg:block"></div>

      {/* Top Floating Editorial HUD Header - Pure minimalist typography without boxed borders */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C9A276] shadow-[0_0_10px_#C9A276]"></span>
          <span className="font-['Cinzel'] text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F2EEE8] font-medium">
            CALIBRE CHR-192 EXPLODED STUDY
          </span>
        </div>

        {/* Minimal Floating Stage Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#8E929A] text-[10px] uppercase tracking-[0.25em]">STAGE</span>
          <span className="font-['Cinzel'] text-sm tracking-wider text-[#C9A276] font-semibold">
            0{activeStage + 1}
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#8E929A] text-[11px]">05</span>
        </div>
      </div>

      {/* Synchronized Editorial Text - Completely Unboxed, Floating Luxury Typography */}
      <div className="absolute inset-x-6 sm:inset-x-12 bottom-6 sm:bottom-12 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-16 xl:left-24 lg:right-auto z-20 pointer-events-none flex flex-col justify-end lg:justify-center">
        <div className="relative w-full max-w-lg lg:max-w-xl min-h-[160px] sm:min-h-[190px] lg:min-h-[220px]">
          {STAGES.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={stage.id}
                className={`absolute inset-0 transition-all duration-700 ease-out flex flex-col justify-between ${
                  isActive
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                    : 'opacity-0 translate-y-4 pointer-events-none scale-[0.98]'
                }`}
              >
                {/* Organic feathered light shield behind text for effortless readability with NO box container */}
                <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-[#08090B]/90 via-[#08090B]/50 to-transparent blur-2xl pointer-events-none -z-10"></div>

                <div>
                  {/* Stage Tag */}
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <span className="w-8 h-[1px] bg-[#C9A276]"></span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C9A276] font-medium font-mono">
                      {stage.tag}
                    </span>
                  </div>

                  {/* Stage Headline */}
                  <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl font-light text-[#F2EEE8] tracking-tight leading-[1.08] mb-2 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                    {stage.title}
                  </h2>

                  {/* Stage Description */}
                  <p className="text-xs sm:text-sm lg:text-base text-[#C0C3CB] font-light leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                    {stage.description}
                  </p>
                </div>

                {/* Micro spec note */}
                <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-[#C9A276] font-mono tracking-wider max-w-lg">
                  <div className="flex items-center gap-2 truncate pr-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A276] shrink-0"></span>
                    <span className="truncate">{stage.spec}</span>
                  </div>
                  <span className="text-white/40 text-[10px] sm:text-[11px] shrink-0">CALIBRE CHR-192</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Stage Progress Dash Pills */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 mt-4 pointer-events-auto">
          {STAGES.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => jumpToStage(idx)}
              className="py-1 px-1 focus:outline-none cursor-pointer"
              aria-label={`Jump to stage ${stage.id}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeStage === idx
                    ? 'w-6 bg-[#C9A276]'
                    : 'w-2 bg-white/20'
                }`}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Stage Navigation Dots on Right (Desktop) */}
      <div className="hidden lg:flex flex-col gap-4 absolute right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        {STAGES.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => jumpToStage(idx)}
            className="group flex items-center gap-3 text-right focus:outline-none cursor-pointer"
            aria-label={`Jump to ${stage.title}`}
          >
            <span
              className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                activeStage === idx
                  ? 'text-[#C9A276] opacity-100 font-semibold'
                  : 'text-[#8E929A] opacity-0 group-hover:opacity-100'
              }`}
            >
              0{stage.id}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                activeStage === idx
                  ? 'bg-[#C9A276] border-[#C9A276] scale-125 shadow-lg shadow-[#C9A276]/50'
                  : 'bg-transparent border-[#8E929A]/40 group-hover:border-[#C9A276]'
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};
