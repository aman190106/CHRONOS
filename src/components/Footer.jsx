import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050608] border-t border-[#C9A276]/15 pt-20 pb-12 text-[#8E929A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-[#C9A276]/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A276]"></div>
              </div>
              <span className="font-['Cinzel'] tracking-[0.25em] text-xl font-semibold text-[#F2EEE8]">
                CHRONOS
              </span>
            </div>
            <p className="text-xs text-[#8E929A] font-light max-w-sm leading-relaxed">
              Excellence in Swiss Haute Horlogerie. An uncompromising devotion to mechanical
              transparency, micro-engineering precision, and hand-finished noble metals.
            </p>
            <div className="text-[11px] font-mono text-[#C9A276]/70 uppercase tracking-widest">
              Manufacture Genève • Suisse
            </div>
          </div>

          {/* Timepieces Column */}
          <div>
            <h4 className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#F2EEE8] mb-4">
              Timepieces
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#timepiece" className="hover:text-[#C9A276] transition-colors">
                  CHRONOS Skeleton
                </a>
              </li>
              <li>
                <a href="#movement-experience" className="hover:text-[#C9A276] transition-colors">
                  Calibre CHR-192
                </a>
              </li>
              <li>
                <span className="text-[#8E929A]/50 cursor-not-allowed">
                  Bespoke Commissions (Private)
                </span>
              </li>
              <li>
                <span className="text-[#8E929A]/50 cursor-not-allowed">
                  Historical Archives
                </span>
              </li>
            </ul>
          </div>

          {/* Manufacture Column */}
          <div>
            <h4 className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#F2EEE8] mb-4">
              The Manufacture
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#craftsmanship" className="hover:text-[#C9A276] transition-colors">
                  Artisanal Anglage
                </a>
              </li>
              <li>
                <a href="#calibre-details" className="hover:text-[#C9A276] transition-colors">
                  Chronometric Regulation
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[#C9A276] transition-colors">
                  18k Rose Gold Metallurgy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C9A276] transition-colors">
                  Swiss Seal Verification
                </a>
              </li>
            </ul>
          </div>

          {/* Client Concierge Column */}
          <div>
            <h4 className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-[#F2EEE8] mb-4">
              Private Concierge
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <span className="text-[#8E929A]">Geneva Salons</span>
              </li>
              <li>
                <span className="text-[#8E929A]">Private Allocation</span>
              </li>
              <li>
                <span className="text-[#8E929A]">Maintenance & Service</span>
              </li>
              <li>
                <span className="text-[#8E929A]">Authentication Registry</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light">
          <p className="text-[11px] text-[#8E929A]/70">
            © {new Date().getFullYear()} CHRONOS Haute Horlogerie SA. All rights reserved. Made in Switzerland.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A276] hover:text-[#F2EEE8] transition-colors cursor-pointer group"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

