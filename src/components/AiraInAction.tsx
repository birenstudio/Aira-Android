import React, { useState } from 'react';
import { Mic, Zap, Brain, Sliders, Maximize2, X, Play, Camera, Settings } from 'lucide-react';
import { assetUrls } from '../config/airaConfig';

export const AiraInAction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Voice' | 'Actions' | 'Vision' | 'Memory'>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const tabs = ['All', 'Voice', 'Actions', 'Vision', 'Memory'] as const;

  return (
    <section id="screenshots" className="py-24 relative overflow-hidden bg-[#050711]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Visual Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            AIRA in Action
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            See AIRA's interface and capabilities
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Central Showcase Frame */}
        <div className="relative group max-w-4xl mx-auto mb-16">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/25 via-violet-600/25 to-sky-500/25 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

          <div className="relative rounded-3xl p-3 sm:p-4 bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl">
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative rounded-2xl overflow-hidden bg-black/80 cursor-zoom-in group/img"
            >
              <img
                src={assetUrls.airaDashboard}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = assetUrls.airaDashboardLocal;
                }}
                alt="AIRA Main Interface"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover/img:scale-[1.01]"
              />

              {/* Click to expand overlay */}
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md opacity-80 group-hover/img:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Click to Expand</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Showcase Cards around the interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card A: Live Voice Interaction */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Syne',sans-serif] mb-2">
              Live Voice Interaction
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Bidirectional audio streaming with Gemini Live for natural human conversation cadence.
            </p>
            {/* Visual Mini Waveform */}
            <div className="flex items-center gap-1 h-5 px-3 py-1 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
              <span className="w-1 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-cyan-300 rounded-full animate-pulse" />
              <span className="w-1 h-3 bg-cyan-200 rounded-full animate-pulse" />
              <span className="w-1 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Card B: Quick Actions */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-violet-500/40 backdrop-blur-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Syne',sans-serif] mb-2">
              Instant Quick Actions
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              One-tap or spoken access to YouTube, Camera, Settings, and custom automation recipes.
            </p>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-slate-800 border border-white/10 text-red-400"><Play className="w-3 h-3" /></span>
              <span className="p-1.5 rounded-lg bg-slate-800 border border-white/10 text-cyan-400"><Camera className="w-3 h-3" /></span>
              <span className="p-1.5 rounded-lg bg-slate-800 border border-white/10 text-slate-400"><Settings className="w-3 h-3" /></span>
            </div>
          </div>

          {/* Card C: Conversation History & Memory */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Syne',sans-serif] mb-2">
              Private On-Device Memory
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Encrypted local memory retains your personal context without cloud surveillance.
            </p>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              AES-256 Encrypted
            </span>
          </div>

          {/* Card D: Model Selection & Settings */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-sky-500/40 backdrop-blur-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Syne',sans-serif] mb-2">
              Model Control & BYOK
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Choose between Gemini 2.5 Flash, Thinking, and Pro with custom system prompts.
            </p>
            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-1 rounded border border-sky-500/20">
              Gemini 2.5 Flash / Pro
            </span>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900 border border-white/20 text-white hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[90vh] overflow-auto rounded-2xl p-2 bg-slate-950 border border-cyan-500/30">
            <img
              src={assetUrls.airaDashboard}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = assetUrls.airaDashboardLocal;
              }}
              alt="AIRA Dashboard Full View"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
