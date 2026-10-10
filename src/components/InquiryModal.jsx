import React, { useState } from 'react';
import { X, CheckCircle, Shield, Clock } from 'lucide-react';

export const InquiryModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: 'Geneva Salon',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0E1015] border border-[#C9A276]/30 shadow-2xl p-6 sm:p-10 text-[#F2EEE8]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8E929A] hover:text-[#C9A276] transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A276]"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A276]">
                PRIVATE CLIENT SERVICES
              </span>
            </div>

            <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#F2EEE8] mb-2">
              Request Private Viewing
            </h3>

            <p className="text-xs text-[#8E929A] font-light leading-relaxed mb-6">
              Due to the limited hand-finishing of each Calibre CHR-192, allocations are coordinated
              personally via our Geneva salon or bespoke regional exhibitions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8E929A] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady / Collector"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#08090B] border border-white/10 px-4 py-2.5 text-xs text-[#F2EEE8] focus:border-[#C9A276] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8E929A] mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="concierge@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#08090B] border border-white/10 px-4 py-2.5 text-xs text-[#F2EEE8] focus:border-[#C9A276] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8E929A] mb-1.5">
                  Preferred Salon
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#08090B] border border-white/10 px-4 py-2.5 text-xs text-[#F2EEE8] focus:border-[#C9A276] focus:outline-none transition-colors"
                >
                  <option value="Geneva Salon">Geneva Salon (Rue du Rhône)</option>
                  <option value="Zurich Suite">Zurich Private Suite</option>
                  <option value="London Salon">London (Mayfair)</option>
                  <option value="Dubai Salon">Dubai (DIFC)</option>
                  <option value="New York Salon">New York (Madison Avenue)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8E929A] mb-1.5">
                  Special Notes / Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Inquire regarding movement details, wrist sizing, or delivery windows..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#08090B] border border-white/10 px-4 py-2.5 text-xs text-[#F2EEE8] focus:border-[#C9A276] focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C9A276] text-[#08090B] font-['Cinzel'] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#DFC29E] transition-all cursor-pointer"
                >
                  Submit Allocation Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-[#C9A276] mb-4" />
            <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#F2EEE8] mb-2">
              Inquiry Received
            </h3>
            <p className="text-xs text-[#8E929A] max-w-xs leading-relaxed mb-6">
              Our Geneva Client Concierge will contact you within 24 hours regarding private
              scheduling and piece allocation.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 border border-[#C9A276]/40 text-[#C9A276] text-xs uppercase tracking-[0.2em] hover:bg-[#C9A276] hover:text-[#08090B] transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

