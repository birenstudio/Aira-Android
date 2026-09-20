import React, { useState, useEffect } from 'react';
import { Mic, Cpu, Zap, Volume2, Sparkles, Check, Play, Pause } from 'lucide-react';

export const VoiceExperience: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'listening' | 'thinking' | 'acting' | 'speaking'>('listening');
  const [isPlayingSimulation, setIsPlayingSimulation] = useState(true);

  const stages = [
    {
      id: 'listening' as const,
      label: 'Listening',
      icon: <Mic className="w-5 h-5 text-cyan-400" />,
      color: '#00F2FE',
      query: '“Hey AIRA, can you remember that my flight departs tomorrow at 6:30 PM?”',
      description: 'Dynamic voice activity detection captures spoken words in continuous audio stream without needing a send button.'
    },
    {
      id: 'thinking' as const,
      label: 'Thinking',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      color: '#818CF8',
      query: 'Parsing flight entity: Departure = Tomorrow, Time = 18:30, Action = SaveMemory',
      description: 'Understands temporal references, names, and parameters through natural language reasoning.'
    },
    {
      id: 'acting' as const,
      label: 'Acting',
      icon: <Zap className="w-5 h-5 text-violet-400" />,
      color: '#C084FC',
      query: 'Writing entry to on-device Room memory store [ID: mem_flight_dep_0918]',
      description: 'Executes verified Android intents or persists structured memory items locally with explicit confirmation.'
    },
    {
      id: 'speaking' as const,
      label: 'Speaking',
      icon: <Volume2 className="w-5 h-5 text-emerald-400" />,
      color: '#34D399',
      query: '“I have remembered your flight departure for tomorrow at 6:30 PM.”',
      description: 'Streams back a natural, clear voice response while updating the living avatar visual state.'
    }
  ];

  // Auto-cycle through the 4 stages to illustrate the real-time loop
  useEffect(() => {
    if (!isPlayingSimulation) return;
    const stageIds: ('listening' | 'thinking' | 'acting' | 'speaking')[] = [
      'listening',
      'thinking',
      'acting',
      'speaking'
    ];
    const timer = setInterval(() => {
      setActiveStage((prev) => {
        const nextIndex = (stageIds.indexOf(prev) + 1) % stageIds.length;
        return stageIds[nextIndex];
      });
    }, 3600);
    return () => clearInterval(timer);
  }, [isPlayingSimulation]);

  const currentStageInfo = stages.find((s) => s.id === activeStage)!;

  return (
    <section id="voice-experience" className="py-24 relative overflow-hidden bg-[#05060A]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Voice-First Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Just talk to AIRA.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Engineered for a natural voice-to-voice experience. No repetitive tapping, no rigid keyword syntax — simply speak, pause, and continue.
          </p>
        </div>

        {/* Live Cinematic Voice Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Stage Controls & Waveform */}
          <div className="lg:col-span-12 p-8 sm:p-12 rounded-3xl bg-[#090C16]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: currentStageInfo.color }}
                />
                <span className="text-sm font-mono text-slate-300">
                  Active Voice State: <strong className="text-white capitalize">{currentStageInfo.label}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors"
                >
                  {isPlayingSimulation ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  <span>{isPlayingSimulation ? 'Pause Simulation' : 'Resume Simulation'}</span>
                </button>
              </div>
            </div>

            {/* 4-Step Linear Pipeline Visualizer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
              {stages.map((stage, idx) => {
                const isCurrent = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setIsPlayingSimulation(false);
                      setActiveStage(stage.id);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                        : 'bg-slate-900/40 hover:bg-slate-900/70 border-white/5 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                      {stage.icon}
                    </div>
                    <span className={`text-sm font-bold block ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Waveform Spectrum Visualizer */}
            <div className="my-8 py-8 px-6 rounded-2xl bg-[#04060C] border border-cyan-500/20 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Radial glow */}
              <div
                className="absolute inset-0 opacity-20 transition-colors duration-500 blur-2xl"
                style={{ background: currentStageInfo.color }}
              />

              {/* Waveform Bars */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 h-24 sm:h-32 w-full max-w-xl z-10">
                {[
                  12, 28, 45, 78, 92, 60, 85, 110, 75, 95, 120, 80, 65, 98, 115, 70, 88, 55, 34, 18
                ].map((val, i) => {
                  const isModulated = activeStage === 'listening' || activeStage === 'speaking';
                  const heightPercent = isModulated ? Math.min(100, Math.max(15, val + (i % 3) * 10)) : 10;
                  return (
                    <div
                      key={i}
                      className="w-1.5 sm:w-2 rounded-full transition-all duration-300 ease-out"
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: currentStageInfo.color,
                        boxShadow: isModulated ? `0 0 10px ${currentStageInfo.color}` : 'none'
                      }}
                    />
                  );
                })}
              </div>

              {/* Contextual Transcript / Action Bubble */}
              <div className="mt-6 z-10 px-5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-center max-w-lg shadow-lg">
                <span className="text-xs font-mono text-cyan-400 block mb-1">
                  {activeStage === 'listening' && 'User Speech Stream:'}
                  {activeStage === 'thinking' && 'Internal Semantic Reasoning:'}
                  {activeStage === 'acting' && 'Android OS Action Dispatch:'}
                  {activeStage === 'speaking' && 'Spoken Audio Synthesis:'}
                </span>
                <p className="text-sm font-medium text-slate-100 italic">
                  {currentStageInfo.query}
                </p>
              </div>
            </div>

            {/* Explanation card */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
              <p className="max-w-2xl text-slate-300 leading-relaxed">
                {currentStageInfo.description}
              </p>
              <div className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 font-mono text-[11px] text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Push-to-Talk Friction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
