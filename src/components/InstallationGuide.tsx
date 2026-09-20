import React from 'react';
import { installationSteps } from '../config/airaConfig';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export const InstallationGuide: React.FC = () => {
  return (
    <section id="installation-guide" className="py-20 relative overflow-hidden bg-[#05060B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Step-by-Step
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Installation Guide
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Follow these eight steps to install, configure permissions, and launch AIRA on your Android smartphone.
          </p>
        </div>

        {/* 8-Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {installationSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-3xl bg-slate-900/50 border border-white/[0.08] backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center justify-center text-xs font-mono font-bold">
                    0{step.step}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-['Syne',sans-serif]">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-slate-500">
                Step {step.step} of 8
              </div>
            </div>
          ))}
        </div>

        {/* Notice on Android Permissions & Variations */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-4">
          <Info className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
          <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white block">Permission Advisory:</span>
            <p>
              Permission prompts will appear only when specific capabilities are invoked (e.g., Microphone for speech, Notifications for status, Bluetooth for device toggles). AIRA never asks for unnecessary system permissions beyond what is required by its active features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
