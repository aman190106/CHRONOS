import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Movement', href: '#movement-experience' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Calibre Details', href: '#calibre-details' },
    { label: 'The Timepiece', href: '#timepiece' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#08090B]/85 backdrop-blur-md border-b border-[#C9A276]/15 py-4 shadow-2xl shadow-black/60'
            : 'bg-transparent py-6 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Horological Insignia */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="CHRONOS Home"
          >
            <div className="w-8 h-8 rounded-full border border-[#C9A276]/40 flex items-center justify-center relative overflow-hidden group-hover:border-[#C9A276] group-hover:shadow-[0_0_15px_rgba(201,162,118,0.3)] transition-all duration-500">
              {/* Tourbillon / Watch Hand Graphic that spins on hover */}
              <div className="relative w-full h-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700 ease-out">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A276]"></div>
                <div className="absolute w-[1px] h-3 bg-[#C9A276]/80 -top-0.5"></div>
                <div className="absolute w-2.5 h-[1px] bg-[#C9A276]/60 left-1.5"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-['Cinzel'] tracking-[0.25em] text-lg sm:text-xl font-semibold text-[#F2EEE8] group-hover:text-[#C9A276] transition-colors">
                CHRONOS
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#C9A276]/70 -mt-0.5 group-hover:text-[#F2EEE8] transition-colors">
                Genève
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.22em] text-[#8E929A] hover:text-[#F2EEE8] transition-all duration-300 relative py-1 group hover:-translate-y-0.5"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#C9A276] to-[#DFC29E] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={onOpenInquiry}
              className="shimmer-hover text-xs uppercase tracking-[0.18em] px-5 py-2.5 rounded-none border border-[#C9A276]/40 text-[#F2EEE8] hover:text-[#08090B] hover:bg-[#C9A276] hover:border-[#C9A276] hover:shadow-[0_0_20px_rgba(201,162,118,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-1.5 cursor-pointer group"
            >
              <span>Private Viewing</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F2EEE8] p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A276]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08090B]/98 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden">
          <div className="flex flex-col space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C9A276]/60">Navigation</span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-['Cinzel'] text-2xl tracking-[0.15em] text-[#F2EEE8] hover:text-[#C9A276] transition-colors py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full text-xs uppercase tracking-[0.2em] py-4 border border-[#C9A276] text-[#C9A276] text-center hover:bg-[#C9A276] hover:text-[#08090B] transition-colors"
              >
                Request Private Viewing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

