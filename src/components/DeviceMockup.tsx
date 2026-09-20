import React, { useState } from 'react';
import {
  Mic,
  Settings,
  Activity,
  Sparkles,
  Code2,
  Globe,
  Home,
  Grid,
  Brain,
  User,
  ChevronRight,
  Wifi,
  Battery,
  ShieldCheck,
  Terminal,
  Key,
  Volume2
} from 'lucide-react';
import { AiraLogo } from './AiraLogo';

export const DeviceMockup: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'voice' | 'memory' | 'actions' | 'settings'>('home');
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  return (
    <section id="phone-ui" className="py-24 relative overflow-hidden bg-[#05060A]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-violet-600/10 to-indigo-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Mobile Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            AIRA on Your Phone
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A native Android interface featuring holographic feedback, fluid voice streaming, and direct system actions.
          </p>
        </div>

        {/* Screen Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'home' as const, label: 'AIRA Home' },
            { id: 'voice' as const, label: 'Voice Streaming' },
            { id: 'memory' as const, label: 'Memory Vault' },
            { id: 'actions' as const, label: 'Device Actions' },
            { id: 'settings' as const, label: 'Gemini Setup' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveScreen(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
                activeScreen === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border-white/[0.08]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Phone Mockup Frame */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[390px] rounded-[48px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.15)] border border-white/20">
            {/* Phone Outer Bezel Reflection */}
            <div className="relative rounded-[40px] overflow-hidden bg-[#07080F] border border-white/10 flex flex-col h-[780px] select-none">
              {/* Android Status Bar */}
              <div className="px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0 z-30">
                <span className="font-semibold text-slate-200">9:41</span>
                {/* Camera punch hole */}
                <div className="w-4 h-4 rounded-full bg-black border border-white/10" />
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="text-[10px]">5G</span>
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* SCREEN CONTENT AREA */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col justify-between relative">
                {/* SCREEN 1: Authentic AIRA Home Interface */}
                {activeScreen === 'home' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-0.5 animate-in fade-in duration-300">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center">
                      <img
                        src="https://i.ibb.co/FkkwW2rq/aira-main-dashboard.png"
                        alt="AIRA AI Responsive Assistant Main Dashboard"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain object-center"
                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                        loading="eager"
                      />
                    </div>
                  </div>
                )}

                {/* SCREEN 2: Voice Streaming Overlay */}
                {activeScreen === 'voice' && (
                  <div className="space-y-4 animate-in fade-in duration-300 py-4">
                    <div className="text-center space-y-2">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-widest">
                        Gemini Live Voice Session
                      </span>
                      <h4 className="text-lg font-bold text-white">Continuous Voice Mode</h4>
                    </div>

                    <div className="py-8 flex flex-col items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-2 border-cyan-400/40 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-30" />
                        <Mic className="w-10 h-10 text-cyan-400 animate-pulse" />
                      </div>
                      <span className="text-xs font-mono text-slate-300 mt-4">
                        Listening to: English & Hinglish
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                      <span className="text-[11px] font-mono text-cyan-400">Live Transcript:</span>
                      <p className="text-xs text-slate-200 leading-relaxed italic">
                        “AIRA, can you turn on Bluetooth and play my workout playlist on Spotify?”
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
                      Observe → Plan → Action verified. Ready to dispatch system intent.
                    </div>
                  </div>
                )}

                {/* SCREEN 3: Memory Vault Screen */}
                {activeScreen === 'memory' && (
                  <div className="space-y-3 animate-in fade-in duration-300 py-2">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div>
                        <h4 className="text-sm font-bold text-white">Memory Vault</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Stored securely on-device</span>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                        3 Entries
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span>FACT #1</span>
                          <span className="text-emerald-400">Verified</span>
                        </div>
                        <p className="text-xs text-slate-200 mt-1">“Prefers concise responses for coding questions.”</p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span>SCHEDULE</span>
                          <span className="text-emerald-400">Active</span>
                        </div>
                        <p className="text-xs text-slate-200 mt-1">“Flight to Tokyo departs Oct 12 at 14:00.”</p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span>NAME</span>
                          <span className="text-cyan-400">User Profile</span>
                        </div>
                        <p className="text-xs text-slate-200 mt-1">“Preferred name: Biren.”</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 4: Device Actions */}
                {activeScreen === 'actions' && (
                  <div className="space-y-3 animate-in fade-in duration-300 py-2">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div>
                        <h4 className="text-sm font-bold text-white">Android System Actions</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Intent execution bridge</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-emerald-500/30 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">Launch YouTube</span>
                          <span className="text-[10px] text-slate-400 font-mono">com.google.android.youtube</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Available
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/70 border border-amber-500/30 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">Toggle Bluetooth</span>
                          <span className="text-[10px] text-slate-400 font-mono">BLUETOOTH_CONNECT</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          Permission
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/70 border border-violet-500/30 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">Screen Summarizer</span>
                          <span className="text-[10px] text-slate-400 font-mono">MediaProjection API</span>
                        </div>
                        <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 5: Settings & Gemini Key */}
                {activeScreen === 'settings' && (
                  <div className="space-y-3 animate-in fade-in duration-300 py-2">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div>
                        <h4 className="text-sm font-bold text-white">Settings & Keys</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Local Android Keystore</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Key className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">Gemini API Key</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-slate-400 truncate">
                        AIzaSyD...••••••••••••••
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck className="w-3 h-3" /> Encrypted Locally
                        </span>
                        <span className="text-cyan-400">Edit Key</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-1">
                      <span className="text-xs font-bold text-white block">Microphone Permission</span>
                      <span className="text-[10px] text-emerald-400 font-mono block">✓ Granted (RECORD_AUDIO)</span>
                    </div>
                  </div>
                )}

                {/* BOTTOM NAVIGATION BAR - Matches real AIRA screenshot */}
                <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between px-3 shrink-0">
                  <button
                    onClick={() => setActiveScreen('home')}
                    className={`flex flex-col items-center gap-1 ${activeScreen === 'home' ? 'text-cyan-400' : 'text-slate-500'}`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Home</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('actions')}
                    className={`flex flex-col items-center gap-1 ${activeScreen === 'actions' ? 'text-cyan-400' : 'text-slate-500'}`}
                  >
                    <Grid className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Tools</span>
                  </button>

                  {/* Central Elevated Holographic "A" Button */}
                  <div
                    onClick={() => {
                      setActiveScreen('voice');
                      setIsVoiceActive(true);
                    }}
                    className="relative -top-3 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(0,242,254,0.5)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-full bg-[#07080F] flex items-center justify-center">
                        <AiraLogo size="sm" showSubtitle={false} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveScreen('memory')}
                    className={`flex flex-col items-center gap-1 ${activeScreen === 'memory' ? 'text-cyan-400' : 'text-slate-500'}`}
                  >
                    <Brain className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Memory</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('settings')}
                    className={`flex flex-col items-center gap-1 ${activeScreen === 'settings' ? 'text-cyan-400' : 'text-slate-500'}`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-[9px] font-medium">Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
