import React, { useState } from 'react';
import { commandsConfig } from '../config/airaConfig';
import { CommandItem, CommandStatus } from '../types';
import { Terminal, ShieldAlert, CheckCircle2, Clock, Play, ArrowRight, CornerDownRight } from 'lucide-react';

export const CommandShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCommand, setActiveCommand] = useState<CommandItem>(commandsConfig[0]);
  const [simulating, setSimulating] = useState<boolean>(false);

  const categories = ['All', 'Apps', 'System', 'Memory', 'Voice', 'Productivity'];

  const filteredCommands =
    selectedCategory === 'All'
      ? commandsConfig
      : commandsConfig.filter((cmd) => cmd.category === selectedCategory);

  const getStatusBadge = (status: CommandStatus) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Available
          </span>
        );
      case 'requires_permission':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <ShieldAlert className="w-3 h-3" />
            Requires Permission
          </span>
        );
      case 'coming_soon':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30">
            <Clock className="w-3 h-3" />
            Coming Soon
          </span>
        );
    }
  };

  const handleTestCommand = (cmd: CommandItem) => {
    setActiveCommand(cmd);
    setSimulating(true);
    setTimeout(() => setSimulating(false), 400);
  };

  return (
    <section id="commands" className="py-24 relative overflow-hidden bg-[#06080E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            Interactive Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
            What Can AIRA Do?
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Test realistic spoken commands and inspect how AIRA categorizes, plans, and enforces permission boundaries on your Android phone.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Command Matrix & Live Execution Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Command List */}
          <div className="lg:col-span-6 space-y-3">
            {filteredCommands.map((cmd) => {
              const isSelected = activeCommand.id === cmd.id;
              return (
                <div
                  key={cmd.id}
                  onClick={() => handleTestCommand(cmd)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/30'
                      : 'bg-slate-900/40 hover:bg-slate-900/70 border-white/[0.06] hover:border-white/15'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {cmd.category}
                      </span>
                    </div>
                    <span className="text-base font-semibold text-white">
                      {cmd.command}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      {cmd.description}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {getStatusBadge(cmd.status)}
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Inspect <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Execution Inspector / Terminal */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="rounded-3xl bg-[#04060C] border border-cyan-500/30 overflow-hidden shadow-2xl">
              {/* Terminal Titlebar */}
              <div className="px-6 py-4 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    AIRA Action Inspector v0.9.4
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(activeCommand.status)}
                </div>
              </div>

              {/* Terminal Output */}
              <div className="p-6 sm:p-8 space-y-6 font-mono text-xs">
                {/* Spoken Query */}
                <div>
                  <div className="text-slate-500 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    Spoken Trigger:
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 text-cyan-200 text-sm font-sans font-medium">
                    {activeCommand.command}
                  </div>
                </div>

                {/* Step 1: OBSERVE */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <span>[PHASE: OBSERVE]</span>
                  </div>
                  <div className="pl-4 border-l-2 border-cyan-500/40 text-slate-300">
                    {activeCommand.observedAction}
                  </div>
                </div>

                {/* Step 2: PLAN */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    <span>[PHASE: PLAN]</span>
                  </div>
                  <div className="pl-4 border-l-2 border-indigo-500/40 text-slate-300">
                    {activeCommand.plannedExecution}
                  </div>
                </div>

                {/* Step 3: PERMISSION CHECK */}
                {activeCommand.permissionRequired && (
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Security Barrier Required:</span>
                    </div>
                    <div className="text-slate-300 font-sans text-xs">
                      {activeCommand.permissionRequired}
                    </div>
                    <div className="text-[10px] text-amber-400/80 font-mono">
                      * User must grant this Android runtime permission before execution is permitted.
                    </div>
                  </div>
                )}

                {/* Step 4: ACT & VERIFY */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span>[PHASE: VERIFY]</span>
                  </div>
                  <div className="pl-4 border-l-2 border-emerald-500/40 text-slate-300">
                    {activeCommand.status === 'available' && 'Execution validated via Android PackageManager and intent handler return.'}
                    {activeCommand.status === 'requires_permission' && 'Dispatches system permission request dialog to user.'}
                    {activeCommand.status === 'coming_soon' && 'Feature is under active development. Preview mock available in developer builds.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
