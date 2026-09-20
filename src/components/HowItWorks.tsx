import React from 'react';
import { Mic, Brain, Cpu, Zap, Volume2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'You Speak',
      subtitle: 'Natural voice input',
      description: 'Natural voice input, multilingual understanding, and hands-free wake word detection.',
      icon: Mic,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      number: '02',
      title: 'AIRA Understands',
      subtitle: 'Real-time semantic analysis',
      description: 'Real-time processing via Gemini Live API with instant intent recognition and context awareness.',
      icon: Brain,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      number: '03',
      title: 'AIRA Thinks & Plans',
      subtitle: 'Deterministic reasoning',
      description: 'Multi-step reasoning, tool selection, on-device memory lookup, and structured action planning.',
      icon: Cpu,
      color: 'from-indigo-500 to-violet-500'
    },
    {
      number: '04',
      title: 'AIRA Acts',
      subtitle: 'Native Android execution',
      description: 'Device actions, app integration, system setting toggles, and live information retrieval.',
      icon: Zap,
      color: 'from-violet-500 to-purple-500'
    },
    {
      number: '05',
      title: 'AIRA Responds',
      subtitle: 'Multimodal delivery',
      description: 'Natural voice output, dynamic visual feedback, and responsive on-screen cards.',
      icon: Volume2,
      color: 'from-purple-500 to-cyan-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#070913]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Processing Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            How AIRA Works
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            From your voice to intelligent action in milliseconds
          </p>
        </div>

        {/* 5-Step Connected Flow: Horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-500/20 via-violet-500/40 to-cyan-500/20 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center p-6 rounded-3xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Step Number Badge */}
                  <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all">
                    <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>

                  <span className="text-xs font-mono font-bold text-cyan-400 mb-1 tracking-widest">
                    STEP {step.number}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 font-['Syne',sans-serif] group-hover:text-cyan-200 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
