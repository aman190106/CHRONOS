import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WatchScrollExperience } from './components/WatchScrollExperience';
import { Craftsmanship } from './components/Craftsmanship';
import { MovementDetails } from './components/MovementDetails';
import { ProductShowcase } from './components/ProductShowcase';
import { ClosingStatement } from './components/ClosingStatement';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';

export function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#F2EEE8] font-['Plus_Jakarta_Sans'] selection:bg-[#C9A276]/30 selection:text-[#F2EEE8] overflow-x-hidden">
      {/* Navigation */}
      <Navbar onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Main Experience Flow */}
      <main>
        {/* Section 1: Cinematic Hero */}
        <Hero />

        {/* Section 2: Pinned 192-Frame Exploded View Scroll Experience */}
        <WatchScrollExperience />

        {/* Section 3: Craftsmanship Philosophy */}
        <Craftsmanship />

        {/* Section 4: Movement Calibre Details */}
        <MovementDetails />

        {/* Section 5: Product Showcase */}
        <ProductShowcase onOpenInquiry={() => setIsInquiryOpen(true)} />

        {/* Section 6: Closing Statement */}
        <ClosingStatement onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Luxury Private Client Consultation Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}

export default App;

