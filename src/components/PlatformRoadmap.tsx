import React from 'react';
import { Smartphone, Watch, Monitor, Globe, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { AIRA_DOWNLOAD_URL } from '../config/airaConfig';

export const PlatformRoadmap: React.FC = () => {
  const platforms = [
    {
      name: 'Android',
      version: 'v1.0.0 (Stable)',
      os: 'Android 10.0+',
      status: 'Available Now',
      isAvailable: true,
      icon: Smartphone,
      description: 'Full-featured APK direct distribution with Gemini Live real-time audio and native intents.',
      link: '#download'
    },
    {
      name: 'Wear OS',
      version: 'v1.1 (Target)',
      os: 'Wear OS 3+',
      status: 'Planned',
      isAvailable: false,
      icon: Watch,
      description: 'Quick wrist voice capture, haptic notifications, and rapid routine triggers on your watch.',
      link: null
    },
    {
      name: 'Windows & Desktop',
      version: 'v2.0 (Target)',
      os: 'Windows 11 / macOS',
      status: 'Planned',
      isAvailable: false,
      icon: Monitor,
      description: 'System-wide hotkey assistant, screen perception, and desktop workspace integration.',
      link: null
    },
    {
      name: 'Web Companion',
      version: 'v2.0 (Target)',
      os: 'Modern Web Browsers',
      status: 'Planned',
      isAvailable: false,
      icon: Globe,
      description: 'Web dashboard for memory management, routine creation, and cross-platform access.',
      link: null
    }
  ];

  const roadmapPhases = [
    {
      phase: 'Phase 1',
      timing: 'Current Release (v1.0.0)',
      title: 'Voice-First Core & Device Agency',
      status: 'Live & Available',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      items: [
        'Gemini Live bidirectional real-time audio streaming',
        'Multimodal camera frame vision analysis',
        'Direct Android device actions & app launching',
        'AES-encrypted on-device local memory store',
        'Direct BYOK (Bring Your Own Key) architecture'
      ]
    },
    {
      phase: 'Phase 2',
      timing: 'Upcoming (Q2 2026)',
      title: 'Advanced Automation & Edge Audio',
      status: 'In Active Development',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      items: [
        'Multi-step automation routines & spoken shortcuts',
        'Offline edge command processing for basic phone tasks',
        'Android home screen interactive assistant widget',
        'Expanded voice persona tuning & custom wake phrases'
      ]
    },
    {
      phase: 'Phase 3',
      timing: 'Future Horizon (2026-2027)',
      title: 'Wearable & Ecosystem Expansion',
      status: 'Planned Roadmap',
      badgeColor: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
      items: [
        'Wear OS wrist assistant companion app',
        'Cross-device encrypted memory synchronization',
        'Community skill plugins & developer extensions'
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[#04060E]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* PLATFORM SECTION */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              Device Support
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
              Platform Availability
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Built natively for Android, with wearable and desktop companions on the horizon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className={`p-6 rounded-3xl border backdrop-blur-xl transition-all flex flex-col justify-between ${
                    p.isAvailable
                      ? 'bg-slate-900/80 border-cyan-500/40 shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-cyan-400'
                      : 'bg-slate-900/40 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        p.isAvailable
                          ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                          : 'bg-slate-800 border border-white/10 text-slate-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border font-semibold ${
                        p.isAvailable
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-white/10'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-['Syne',sans-serif]">
                      {p.name}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5 mb-3">
                      {p.version} • {p.os}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {p.isAvailable && (
                    <div className="mt-6 pt-4 border-t border-cyan-500/20">
                      <a
                        href={AIRA_DOWNLOAD_URL}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors"
                      >
                        <span>Download APK</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ROADMAP SECTION */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-mono uppercase tracking-widest">
              Development Roadmap
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
              The Evolution of AIRA
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Honest transparency into what is live today and what is being built next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {roadmapPhases.map((phase, idx) => (
              <div
                key={phase.phase}
                className="relative p-7 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      {phase.phase}
                    </span>
                    <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-semibold ${phase.badgeColor}`}>
                      {phase.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-mono mb-1">
                    {phase.timing}
                  </div>
                  <h3 className="text-xl font-bold text-white font-['Syne',sans-serif] mb-5">
                    {phase.title}
                  </h3>

                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Milestone {idx + 1} of 3</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400/70" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
