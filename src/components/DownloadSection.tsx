import React, { useState } from 'react';
import { downloadConfig, AIRA_DOWNLOAD_URL } from '../config/airaConfig';
import {
  Download,
  Copy,
  Check,
  FileCode2,
  Calendar,
  HardDrive,
  Smartphone,
  ChevronDown,
  ChevronUp,
  History,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Info,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export const DownloadSection: React.FC = () => {
  const [copiedChecksum, setCopiedChecksum] = useState(false);
  const [showReleaseNotes, setShowReleaseNotes] = useState(true);
  const [showPreviousReleases, setShowPreviousReleases] = useState(false);

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(downloadConfig.sha256);
    setCopiedChecksum(true);
    setTimeout(() => setCopiedChecksum(false), 2000);
  };

  const handleDownloadClick = () => {
    window.location.href = AIRA_DOWNLOAD_URL;
  };

  const quickSteps = [
    { step: '1', title: 'Download APK', desc: 'Tap the download button to save the v1.0.0 APK file (~48 MB).' },
    { step: '2', title: 'Allow Source', desc: 'When prompted by Android, allow installation from this source.' },
    { step: '3', title: 'Install AIRA', desc: 'Tap Install and confirm package permissions on your device.' },
    { step: '4', title: 'Enter API Key', desc: 'Paste your free Gemini API key obtained from Google AI Studio.' },
    { step: '5', title: 'Start Talking', desc: 'Experience continuous real-time voice and Android actions!' }
  ];

  return (
    <section id="download" className="py-24 relative overflow-hidden bg-[#07080D]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-600/10 via-cyan-500/10 to-indigo-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            AI RESPONSIVE ASSISTANT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Ready to meet AIRA?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Bring your personal AI assistant with you.
          </p>
        </div>

        {/* Primary Download Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
            {/* Package Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif]">
                  AIRA Android Package
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {downloadConfig.latestVersion}
                </span>
              </div>
              <p className="text-sm text-slate-300">
                Official standalone Android release built for continuous voice and device execution.
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <button
                  id="main-download-apk-btn"
                  onClick={handleDownloadClick}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all duration-200 active:scale-95"
                >
                  <Download className="w-4 h-4 text-cyan-200 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Download AIRA for Android</span>
                </button>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider self-center">
                  Android 10+ • Free Direct APK (~48 MB)
                </span>
              </div>

              <button
                onClick={() => setShowReleaseNotes(!showReleaseNotes)}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-4 rounded-full text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
              >
                <span>Release Notes</span>
                {showReleaseNotes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Package Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-b border-white/10">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 uppercase">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Release Date
              </span>
              <p className="text-sm font-semibold text-slate-200">{downloadConfig.releaseDate}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 uppercase">
                <HardDrive className="w-3.5 h-3.5 text-violet-400" /> APK Size
              </span>
              <p className="text-sm font-semibold text-slate-200">{downloadConfig.apkSize}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 uppercase">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Target OS
              </span>
              <p className="text-sm font-semibold text-slate-200">{downloadConfig.androidRequirement}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Architecture
              </span>
              <p className="text-sm font-semibold text-slate-200">{downloadConfig.targetArchitecture}</p>
            </div>
          </div>

          {/* SHA-256 Checksum Section */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  SHA-256 Checksum
                </span>
              </div>
              <button
                onClick={handleCopyChecksum}
                className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
              >
                {copiedChecksum ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Checksum</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs text-slate-400 break-all select-all flex items-center justify-between">
              <span>{downloadConfig.sha256}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Verify integrity in Android shell or terminal via <code className="text-slate-400">sha256sum AIRA-{downloadConfig.latestVersion}.apk</code> before installation.
            </p>
          </div>

          {/* Expandable Release Notes */}
          {showReleaseNotes && (
            <div className="mt-8 pt-8 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                What's New in {downloadConfig.latestVersion}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {downloadConfig.releaseNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Previous Releases Toggle */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setShowPreviousReleases(!showPreviousReleases)}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300"
            >
              <History className="w-4 h-4" />
              <span>{showPreviousReleases ? 'Hide Previous Releases' : 'View Previous Releases Archive'}</span>
            </button>
          </div>

          {showPreviousReleases && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3 animate-in fade-in">
              {downloadConfig.previousReleases.map((rel) => (
                <div key={rel.version} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{rel.version}</span>
                    <span className="text-slate-500">• {rel.date}</span>
                    <span className="text-slate-500">({rel.apkSize})</span>
                  </div>
                  <span className="text-slate-400 truncate max-w-xs">{rel.notes}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick 5-Step Installation Flow */}
        <div className="max-w-4xl mx-auto mt-10">
          <h4 className="text-xs font-mono font-bold text-center uppercase tracking-widest text-cyan-400 mb-6">
            Quick 5-Step Installation Flow
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {quickSteps.map((s) => (
              <div
                key={s.step}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 backdrop-blur-md space-y-1.5 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center mb-2">
                  {s.step}
                </div>
                <h5 className="text-xs font-bold text-white font-['Syne',sans-serif]">
                  {s.title}
                </h5>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
