import React, { useState } from 'react';
import { Mic, Play, FileText, Sparkles, Smartphone, Volume2 } from 'lucide-react';
import { assetUrls } from '../config/airaConfig';

export const AiraDemo: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [airaMessage, setAiraMessage] = useState<string>(
    "Hi, I'm AIRA. How can I help you today?"
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  const demoChips = [
    {
      id: 'youtube',
      label: 'Open YouTube',
      icon: Play,
      response: 'Opening YouTube right now for you.'
    },
    {
      id: 'remember',
      label: 'Remember this',
      icon: FileText,
      response: 'Saved to your private on-device memory store. What else should I keep in mind?'
    },
    {
      id: 'plan',
      label: 'Create a plan',
      icon: Sparkles,
      response: 'Let’s outline your goals, timeline, and execution steps. What are we building?'
    },
    {
      id: 'phone',
      label: "What's on my phone?",
      icon: Smartphone,
      response: 'You have 3 unread messages, a calendar reminder at 3 PM, and 82% battery remaining.'
    }
  ];

  const handleChipClick = (chip: typeof demoChips[0]) => {
    setActiveQuery(chip.label);
    setIsSpeaking(true);
    setAiraMessage(chip.response);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 4000);
  };

  const handleMicToggle = () => {
    if (isListening) {
      setIsListening(false);
      setIsSpeaking(true);
      setAiraMessage("I heard you loud and clear. Processing your request now.");
      setTimeout(() => setIsSpeaking(false), 3500);
    } else {
      setIsListening(true);
      setActiveQuery('Listening to your voice...');
      setAiraMessage('Listening... Speak naturally.');
    }
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-left sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-['Syne',sans-serif]">
            Try AIRA — Live Demo
          </h2>
          <p className="mt-2 text-base sm:text-lg text-slate-400">
            Experience the power of AIRA. <span className="text-cyan-400 font-medium">Talk to your AI assistant right now.</span>
          </p>
        </div>

        {/* 3-Column Interactive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Live Voice Demo (Col 6) */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0A0E1F]/90 to-[#070913] border border-cyan-500/30 p-6 sm:p-7 shadow-[0_0_35px_rgba(0,242,254,0.15)] backdrop-blur-xl relative flex flex-col justify-between overflow-hidden">
            {/* Top Right Demo Mode Badge */}
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono font-semibold text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>✦ Demo Mode</span>
            </div>

            {/* Avatar and Bubble */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-black/60 border border-cyan-500/40 p-1 shrink-0 shadow-md">
                <img
                  src={assetUrls.airaAvatar}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = assetUrls.airaAvatarLocal;
                  }}
                  alt="AIRA Avatar"
                  className="w-full h-full object-cover object-top rounded-xl"
                />
              </div>

              <div className="flex-1 pr-16 sm:pr-24">
                {activeQuery && (
                  <div className="text-[11px] font-mono text-cyan-400 mb-1">
                    You: “{activeQuery}”
                  </div>
                )}
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-cyan-950/40 border border-cyan-500/25 text-sm sm:text-base text-slate-100 font-medium shadow-inner leading-relaxed">
                  {airaMessage}
                </div>
              </div>
            </div>

            {/* Audio Waveform visualization */}
            <div className="py-4 my-2 flex items-center justify-center gap-1 sm:gap-1.5 h-16">
              {Array.from({ length: 32 }).map((_, i) => {
                const height = isSpeaking || isListening
                  ? Math.sin((i / 32) * Math.PI) * (18 + (i % 5) * 8) + 8
                  : Math.sin((i / 32) * Math.PI) * 12 + 4;
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-cyan-500 to-sky-300 transition-all duration-150"
                    style={{
                      height: `${height}px`,
                      opacity: isSpeaking || isListening ? 0.9 : 0.4
                    }}
                  />
                );
              })}
            </div>

            {/* Center Glowing Mic Button */}
            <div className="flex flex-col items-center justify-center gap-2 pt-2">
              <button
                onClick={handleMicToggle}
                className={`relative group w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.6)] animate-pulse'
                    : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.6)] active:scale-95'
                }`}
                aria-label="Toggle voice mic demo"
              >
                <Mic className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>{isListening ? 'Tap to finish speaking' : 'Press & hold to talk'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Try These Chips (Col 3) */}
          <div className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#080B18] border border-white/10 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono mb-4">
                Try These
              </h3>

              <div className="flex flex-col gap-3">
                {demoChips.map((chip) => {
                  const Icon = chip.icon;
                  const isSelected = activeQuery === chip.label;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => handleChipClick(chip)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide border transition-all text-left ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                          : 'bg-slate-950/60 border-cyan-500/20 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="truncate">{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.06] text-[11px] text-slate-400">
              Interactive preview. Click any action to test AIRA's responsive comprehension.
            </div>
          </div>

          {/* Card 3: Feature Callout (Col 3) */}
          <div className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#080B18] border border-white/10 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-cyan-400" />
              </div>

              <h3 className="text-xl font-bold text-white font-['Syne',sans-serif] leading-snug">
                Natural conversations with real voice
              </h3>

              <p className="text-sm text-slate-300/90 leading-relaxed">
                Just talk. AIRA listens, understands and responds naturally.
              </p>
            </div>

            <div className="pt-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>Real-Time Interaction</span>
                <span>→</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
