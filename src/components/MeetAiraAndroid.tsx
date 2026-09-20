import React from 'react';
import { ArrowRight } from 'lucide-react';
import { assetUrls } from '../config/airaConfig';

export const MeetAiraAndroid: React.FC = () => {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="meet-aira" className="py-24 relative overflow-hidden">
      {/* Ambient background cyan-purple glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Syne',sans-serif] text-white">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">AIRA</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              AIRA is more than an app. It's your personal AI assistant, built to understand you, adapt to your needs, and work with you — anytime, anywhere.
            </p>

            <button
              onClick={scrollToFeatures}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 active:scale-95"
            >
              <span>Explore Features</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </button>
          </div>

          {/* Right Column: Authentic AIRA Dashboard Showcase */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative group w-full max-w-2xl">
              {/* Glowing back-light */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-violet-600/30 to-sky-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glass Frame */}
              <div className="relative rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-slate-800/90 via-slate-900/95 to-[#050711] border border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-black/90 flex items-center justify-center">
                  <img
                    src={assetUrls.airaDashboard}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = assetUrls.airaDashboardLocal;
                    }}
                    alt="AIRA AI Responsive Assistant Main Dashboard"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.01]"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
