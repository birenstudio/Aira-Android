import React from 'react';
import { permissionsData } from '../config/airaConfig';
import { ShieldCheck, Lock, EyeOff, KeyRound, Database, Sliders } from 'lucide-react';

interface PermissionsPrivacyProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const PermissionsPrivacy: React.FC<PermissionsPrivacyProps> = ({
  onOpenPrivacy,
  onOpenTerms
}) => {
  const pillars = [
    {
      title: 'BYOK Architecture',
      description: 'Your Gemini API key stays strictly on your device, encrypted with Android Keystore. No middleman servers ever see your key.',
      icon: KeyRound,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      title: 'Zero Data Collection',
      description: 'AIRA does not collect, store, sell, or analyze your personal conversations or audio feeds. Your dialogue is completely yours.',
      icon: EyeOff,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      title: 'On-Device Memory',
      description: 'Context and memories are stored locally in an encrypted database. You have full transparency to view, edit, or purge anything anytime.',
      icon: Database,
      color: 'text-violet-400',
      border: 'border-violet-500/30'
    },
    {
      title: 'Transparent Permissions',
      description: 'Microphone, Camera, and Accessibility are only used when you explicitly trigger them with full runtime permission control.',
      icon: Sliders,
      color: 'text-sky-400',
      border: 'border-sky-500/30'
    }
  ];

  return (
    <section id="privacy" className="py-24 relative overflow-hidden bg-[#05060A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-widest">
            Privacy First
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Privacy & Security
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Built with privacy as a foundational principle, not an afterthought
          </p>
        </div>

        {/* 4 Key Privacy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-7 rounded-3xl bg-slate-900/40 border border-white/[0.08] hover:border-cyan-500/30 backdrop-blur-md space-y-3 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/[0.04] border ${pillar.border} flex items-center justify-center ${pillar.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-['Syne',sans-serif]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Permissions Breakdown Table */}
        <div className="rounded-3xl bg-slate-900/70 border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-6 font-['Syne',sans-serif]">
            Required & Optional Android Permissions
          </h3>

          <div className="divide-y divide-white/10">
            {permissionsData.map((perm) => (
              <div key={perm.category} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-white">
                      {perm.category}
                    </span>
                    {perm.required ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Essential
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-white/10">
                        Optional / On-Demand
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300/90 leading-relaxed max-w-2xl">
                    {perm.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span>Read our complete legal documents:</span>
          <button
            onClick={onOpenPrivacy}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            Privacy Policy
          </button>
          <span className="text-slate-600">•</span>
          <button
            onClick={onOpenTerms}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            Terms of Use
          </button>
        </div>
      </div>
    </section>
  );
};
