import React from 'react';
import { geminiSetupSteps, productConfig } from '../config/airaConfig';
import { ExternalLink, Key, ShieldCheck, Sparkles, ArrowRight, Lock } from 'lucide-react';

export const GeminiSetup: React.FC = () => {
  return (
    <section id="gemini-setup" className="py-24 relative overflow-hidden bg-[#07080D]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-mono uppercase tracking-widest">
            AI Engine Integration
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Connect Your AI
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            AIRA harnesses Google Gemini models for natural reasoning and voice. Connect your own API key in seconds with zero hidden servers.
          </p>
        </div>

        {/* 4-Step Visual Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {geminiSetupSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between relative group hover:border-violet-500/40 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-300 text-sm font-mono font-bold mb-4">
                  0{step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-['Syne',sans-serif]">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < geminiSetupSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-violet-500/50 pointer-events-none">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Banner & Security Guarantees */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0D1020] via-slate-900/90 to-[#0D1020] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Direct On-Device Encryption
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white font-['Syne',sans-serif]">
              Your key stays strictly on your Android device.
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AIRA stores your personal key directly inside the Android Keystore encrypted preferences. The website and developers never see, log, or proxy your API credentials.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href={productConfig.geminiStudioUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-white shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-indigo-950" />
              <span>Get Your Gemini API Key</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-950 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
