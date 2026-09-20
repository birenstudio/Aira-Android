import React, { useState } from 'react';
import {
  Mic,
  Sparkles,
  Smartphone,
  Brain,
  Globe,
  UserCheck,
  Orbit,
  Code2,
  Compass,
  Check,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { featuresConfig, languagesConfig, livingStatesConfig } from '../config/airaConfig';
import { AiraState } from '../types';

interface FeaturesProps {
  onSelectState?: (state: AiraState) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onSelectState }) => {
  const [selectedState, setSelectedState] = useState<AiraState>('listening');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic':
        return <Mic className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-violet-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-pink-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-sky-400" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-amber-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-blue-400" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-indigo-400" />;
      case 'Orbit':
        return <Orbit className="w-6 h-6 text-fuchsia-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#07080D]">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-violet-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Key Features
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Key Features
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Everything you need in a modern AI assistant
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuresConfig.map((feat) => {
            return (
              <div
                key={feat.id}
                className="group relative p-7 rounded-3xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/[0.08] hover:border-cyan-500/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getFeatureIcon(feat.icon)}
                    </div>
                    {feat.badge && (
                      <span
                        className={`text-[11px] font-mono px-3 py-1 rounded-full border font-medium ${
                          feat.badge === 'Available Now'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-1">
                    {feat.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2.5 font-['Syne',sans-serif] group-hover:text-cyan-200 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-300/90 leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                {feat.details && (
                  <div className="pt-4 border-t border-white/[0.06] space-y-2">
                    {feat.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Deep Dive 1: Multilingual Language Matrix */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900/80 via-[#0B0E1B] to-slate-900/80 border border-white/10 backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono uppercase tracking-wider mb-2">
              Linguistic Diversity
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif]">
              Multilingual & Natural Code-Switching
            </h3>
            <p className="text-sm text-slate-400 mt-1.5">
              AIRA is tuned for real-world bilingual speaking habits, including Hindi-English (Hinglish) and Nepali-English (NeEnglish) transitions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {languagesConfig.map((lang) => {
              const isSelected = selectedLanguage === lang.name;
              return (
                <button
                  key={lang.name}
                  onClick={() => setSelectedLanguage(lang.name)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/40 hover:bg-slate-900/70 border-white/[0.06] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{lang.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400">✓ {lang.status}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium block truncate">
                    {lang.nativeName}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 mt-6 italic">
            * Note: Accuracy and vocabulary vary across regional dialects. AIRA continuously refines acoustic matching without overclaiming flawless perfection.
          </p>
        </div>

        {/* Deep Dive 2: Living AIRA Interface State Showcase */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#080B15] border border-cyan-500/20 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs font-mono uppercase tracking-wider mb-2">
              Visual Feedback Engine
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif]">
              Living AIRA Interface States
            </h3>
            <p className="text-sm text-slate-400 mt-1.5">
              To eliminate guesswork during spoken conversations, AIRA transitions between 9 clear interface states that reflect operational awareness.
            </p>
          </div>

          {/* State selector pills */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-6">
            {livingStatesConfig.map((state) => {
              const isSelected = selectedState === state.id;
              return (
                <button
                  key={state.id}
                  onClick={() => {
                    setSelectedState(state.id);
                    if (onSelectState) onSelectState(state.id);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 border flex flex-col items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 border-white/30 text-white shadow-lg'
                      : 'bg-slate-900/50 hover:bg-slate-900/90 border-white/[0.05] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: state.accentColor }}
                  />
                  <span className="capitalize text-[11px]">{state.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active State Detailed Bar */}
          {(() => {
            const activeStateObj = livingStatesConfig.find((s) => s.id === selectedState)!;
            return (
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full animate-pulse shrink-0"
                    style={{
                      backgroundColor: activeStateObj.accentColor,
                      boxShadow: `0 0 12px ${activeStateObj.accentColor}`
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      State: {activeStateObj.label}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {activeStateObj.description}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-500 shrink-0">
                  Presented purely as functional interface states
                </span>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
