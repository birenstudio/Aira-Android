import React, { useState } from 'react';
import { interactionSteps, actionLoopPhases } from '../config/airaConfig';
import { Eye, Compass, Zap, CheckCircle2, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import { ActionLoopPhase } from '../types';

export const AiraExperience: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedPhase, setSelectedPhase] = useState<ActionLoopPhase>(actionLoopPhases[0]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'OBSERVE':
        return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'PLAN':
        return <Compass className="w-5 h-5 text-indigo-400" />;
      case 'ACT':
        return <Zap className="w-5 h-5 text-violet-400" />;
      case 'VERIFY':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'RECOVER':
        return <RefreshCw className="w-5 h-5 text-amber-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#07080D]">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-violet-600/10 via-cyan-500/10 to-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Interaction Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            The AIRA Interaction Flow
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            From the moment you speak, AIRA coordinates a structured sequence engineered for deterministic, transparent device actions.
          </p>
        </div>

        {/* 1. Visual Interaction Sequence: Listen -> Understand -> Plan -> Act -> Verify -> Respond */}
        <div className="mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 text-center mb-8">
            Continuous Conversational Pipeline
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {interactionSteps.map((step, idx) => {
              const isActive = activeStep === step.step;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[160px] ${
                    isActive
                      ? 'bg-slate-900/95 border-cyan-500/50 shadow-[0_0_25px_-5px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/30'
                      : 'bg-slate-900/50 hover:bg-slate-900/80 border-white/[0.08] hover:border-white/20'
                  } border backdrop-blur-md`}
                >
                  {/* Step index & connector indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_#00F2FE]'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/90 font-medium px-2 py-0.5 rounded bg-cyan-500/10">
                      {step.tag}
                    </span>
                  </div>

                  {/* Step title & description */}
                  <div>
                    <h3 className={`text-base font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {step.label}
                    </h3>
                    <p className="text-xs text-slate-400 leading-snug line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Flow Arrow for non-final steps on desktop */}
                  {idx < interactionSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-cyan-500/40 pointer-events-none">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Differentiating Core Concept: OBSERVE → PLAN → ACT → VERIFY → RECOVER */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B0D18] to-[#07080F] border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          {/* Subtle accent light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-mono uppercase tracking-wider mb-3">
              Core Architectural Differentiator
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Syne',sans-serif]">
              OBSERVE → PLAN → ACT → VERIFY → RECOVER
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Unlike generic conversational chatbots that merely describe solutions in text, AIRA is architected around a closed-loop execution pattern designed specifically for mobile operating systems.
            </p>
          </div>

          {/* Action Loop Interactive Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
            {actionLoopPhases.map((phase) => {
              const isSelected = selectedPhase.phase === phase.phase;
              return (
                <button
                  key={phase.phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/40 hover:bg-slate-900/70 border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold tracking-wider">{phase.phase}</span>
                    {getPhaseIcon(phase.phase)}
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">{phase.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Phase Details Card */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedPhase.phase}
                </span>
                <h4 className="text-lg font-bold text-white">{selectedPhase.title}</h4>
                <span className="text-xs text-slate-400 hidden sm:inline">• {selectedPhase.subtitle}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedPhase.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-300">Deterministic Safety</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
