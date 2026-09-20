import React from 'react';
import { changelogConfig } from '../config/airaConfig';
import { Tag, Calendar, Check, GitCommit, Sparkles } from 'lucide-react';

export const ChangelogSection: React.FC = () => {
  return (
    <section id="changelog" className="py-24 relative overflow-hidden bg-[#07080D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Release History
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            Changelog & Updates
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Transparent release timeline tracking every architectural enhancement, feature rollout, and bug fix for AIRA.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {changelogConfig.map((release) => (
            <div
              key={release.version}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-8 relative overflow-hidden"
            >
              {/* Release Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-['Syne',sans-serif]">
                      AIRA {release.version}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-cyan-400" /> Released {release.date}
                    </span>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {release.badge}
                </span>
              </div>

              {/* Highlights Summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Key Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {release.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorized Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {release.sections.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-white/[0.05] space-y-2">
                    <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      {sec.title}
                    </h5>
                    <ul className="space-y-1.5">
                      {sec.items.map((item, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
