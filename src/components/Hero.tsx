import React from 'react';
import { Sparkles, Zap, Shield, Activity, Play } from 'lucide-react';
import { assetUrls } from '../config/airaConfig';

interface HeroProps {
  onExploreClick?: () => void;
  onDownloadClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onDownloadClick }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] pt-32 pb-24 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(56,189,248,0.06)_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide">
            <span className="text-cyan-400">✦</span>
            <span>Android • AI Assistant • Voice-First</span>
          </div>

          {/* Branding & Titles */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-tight font-['Syne',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                AIRA
              </h1>
              <div className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400/90 font-bold uppercase">
                AI RESPONSIVE ASSISTANT
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight font-['Syne',sans-serif]">
              Your AI. Your Assistant. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-400">
                Your Way.
              </span>
            </h2>
          </div>

          {/* Supporting Text */}
          <p className="max-w-xl text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal">
            AIRA is your intelligent personal assistant designed to understand, respond, create, and help you get things done.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
            <button
              id="hero-download-cta"
              onClick={() => {
                scrollToSection('download');
                if (onDownloadClick) onDownloadClick();
              }}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.45)] transition-all duration-300 active:scale-95"
            >
              <svg className="w-4 h-4 text-cyan-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9996.4482.9996.9993.0001.5511-.4486.9997-.9996.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9997.4482.9997.9993 0 .5511-.4486.9997-.9997.9997m11.4045-6.02l1.996-3.4572c.1556-.2696.0633-.6135-.2063-.7692-.2691-.1556-.6131-.0633-.7687.2063l-2.0224 3.5029c-1.4646-.6672-3.1118-1.0423-4.8801-1.0423s-3.4155.3751-4.8801 1.0423L5.1004 5.3022c-.1556-.2696-.4996-.3619-.7687-.2063-.2696.1557-.3619.4996-.2063.7692l1.996 3.4572C2.6888 11.2868.3444 15.0232 0 19.3905h24c-.3444-4.3673-2.6888-8.1037-6.1185-10.0691" />
              </svg>
              <span>Download AIRA</span>
            </button>

            <button
              id="hero-explore-cta"
              onClick={() => {
                scrollToSection('meet-aira');
                if (onExploreClick) onExploreClick();
              }}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-cyan-500/30 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-300 hover:text-white"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform fill-cyan-400/30" />
              <span>Explore AIRA</span>
            </button>
          </div>

          {/* Capability Waveform Bar: Talk • Create • Build • Explore */}
          <div className="pt-4 flex items-center gap-3 text-xs text-slate-400">
            {/* Visual Animated Waveform Bars */}
            <div className="flex items-center gap-0.5 h-5 px-2 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30">
              <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3.5 bg-cyan-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
              <span className="w-0.5 h-4.5 bg-cyan-200 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-[pulse_1.1s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 bg-cyan-300 rounded-full animate-[pulse_1.3s_ease-in-out_infinite]" />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <span className="hover:text-cyan-300 transition-colors">Talk</span>
              <span className="text-slate-600">•</span>
              <span className="hover:text-cyan-300 transition-colors">Create</span>
              <span className="text-slate-600">•</span>
              <span className="hover:text-cyan-300 transition-colors">Build</span>
              <span className="text-slate-600">•</span>
              <span className="hover:text-cyan-300 transition-colors">Explore</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AIRA AVATAR & SURROUNDING HOLOGRAPHIC AMBIENCE */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
          {/* Holographic Ambient Glow Rings */}
          <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full border border-cyan-500/20 pointer-events-none animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full border border-violet-500/25 pointer-events-none" />
          <div className="absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full bg-cyan-500/15 blur-[80px] pointer-events-none" />

          {/* Avatar Container */}
          <div className="relative z-10 w-full max-w-md sm:max-w-lg flex items-center justify-center">
            
            {/* Top Right Floating Handwritten Message */}
            <div className="absolute -top-3 right-2 sm:right-6 z-20 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-xl text-right animate-bounce-slow">
              <div className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-100 italic">
                Hi, I'm <span className="font-extrabold not-italic text-cyan-300">AIRA</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                Always here for you 💙
              </div>
            </div>

            {/* Vertical Stack of 4 Floating Pills on the right */}
            <div className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-cyan-500/30 backdrop-blur-md shadow-lg hover:border-cyan-400 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">Smart</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-violet-500/30 backdrop-blur-md shadow-lg hover:border-violet-400 transition-colors">
                <Zap className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-slate-200">Fast</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-emerald-500/30 backdrop-blur-md shadow-lg hover:border-emerald-400 transition-colors">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">Secure</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-sky-500/30 backdrop-blur-md shadow-lg hover:border-sky-400 transition-colors">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-xs font-semibold text-slate-200">Always On</span>
              </div>
            </div>

            {/* The Authentic Avatar Image Frame */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-cyan-950/20 via-slate-900/40 to-transparent p-2">
              <img
                src={assetUrls.airaAvatar}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = assetUrls.airaAvatarLocal;
                }}
                alt="AIRA AI Responsive Assistant Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,242,254,0.3)] transition-transform duration-700 hover:scale-[1.01]"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                loading="eager"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
