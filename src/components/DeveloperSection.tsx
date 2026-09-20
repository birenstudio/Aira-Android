import React from 'react';
import { ExternalLink, Globe, MessageCircle } from 'lucide-react';
import { developerConfig, assetUrls } from '../config/airaConfig';

export const DeveloperSection: React.FC = () => {
  return (
    <section id="developer" className="py-24 relative overflow-hidden bg-[#060812]">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Behind the Project
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Meet the Creator
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A passionate solo endeavor to craft an AI assistant that is truly personal, privacy-first, and genuinely responsive.
          </p>
        </div>

        {/* Bento Developer Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0A0D1E]/95 to-[#050711] border border-cyan-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Developer Photo */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative group w-48 h-48 sm:w-56 sm:h-56">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50 bg-black shadow-xl">
                  <img
                    src={assetUrls.birenProfile}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = assetUrls.birenProfileLocal;
                    }}
                    alt={developerConfig.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white font-['Syne',sans-serif]">
                  {developerConfig.name}
                </h3>
                <p className="text-sm font-mono text-cyan-400 mt-0.5">
                  {developerConfig.title}
                </p>
              </div>
            </div>

            {/* Developer Vision & Story */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                  Personal Mission
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-['Syne',sans-serif] leading-snug">
                  Why I Created AIRA
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  “I built AIRA because existing voice assistants felt mechanical, closed, and detached from how we actually think and speak. AIRA is designed with continuous Gemini Live intelligence, on-device privacy, and direct device autonomy — so you always remain in full control of your AI.”
                </p>
              </div>

              {/* Direct Links and Socials */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* WhatsApp button */}
                <a
                  href={developerConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Bee Rain</span>
                </a>

                {/* Portfolio */}
                <a
                  href={developerConfig.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Portfolio</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                {/* Instagram */}
                <a
                  href={developerConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-white/10 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                {/* Facebook */}
                <a
                  href={developerConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-white/10 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.657 5H18V0h-3.808C10.597 0 9 1.582 9 4.615V8z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
