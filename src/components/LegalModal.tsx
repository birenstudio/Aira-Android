import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full max-h-[85vh] rounded-3xl bg-[#090D1A] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl flex flex-col">
        {/* Header with Tabs & Close */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('privacy')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                tab === 'privacy'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setTab('terms')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                tab === 'terms'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Terms of Use
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 py-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {tab === 'privacy' ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-['Syne',sans-serif]">
                AIRA Privacy Policy
              </h3>
              <p className="text-slate-400 font-mono text-xs">
                Last updated: September 2024
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">1. Core Philosophy: On-Device & Direct</h4>
                <p>
                  AIRA is engineered around privacy-first principles. We do not host central telemetry databases to harvest, sell, or profile your personal interactions. All user-specific settings, preferred name preferences, and memory entries reside strictly within your local Android SQLite database.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">2. Audio & Microphone Data</h4>
                <p>
                  The Android <code className="text-cyan-400 font-mono">RECORD_AUDIO</code> permission is utilized solely during user-initiated active voice conversations. Spoken audio is streamed directly to Google's Gemini models using the API credentials configured by you. Audio buffers are immediately released when continuous conversation stops.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">3. Gemini API Key Confidentiality</h4>
                <p>
                  Your Google Gemini API key is stored securely in Android's EncryptedSharedPreferences backed by the hardware-level Android Keystore. It is transmitted only to official Google AI endpoints and never to any intermediary third-party servers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">4. Memory Management & Purging</h4>
                <p>
                  You have full autonomy over retained memories. Through the Memory tab in AIRA, you can review, modify, or permanently delete stored context at any time. Uninstalling the application completely erases all local database records.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-['Syne',sans-serif]">
                AIRA Terms of Use
              </h3>
              <p className="text-slate-400 font-mono text-xs">
                Last updated: September 2024
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">1. Acceptance of Terms</h4>
                <p>
                  By downloading, installing, or operating the AIRA Android application or accessing this website, you agree to these Terms. If you disagree, please discontinue use and uninstall the software.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">2. Gemini API Usage & Quotas</h4>
                <p>
                  AIRA facilitates connectivity to Google Gemini intelligence models. Users are responsible for adhering to Google's AI Studio terms of service and acceptable use policies when generating and utilizing their personal API keys.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">3. System Action Safety</h4>
                <p>
                  AIRA executes Android intents and system toggles strictly based on user authorization. While AIRA incorporates an OBSERVE-PLAN-ACT-VERIFY-RECOVER loop to minimize unintended behaviors, users remain responsible for granting appropriate system permissions.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-300">4. Disclaimers</h4>
                <p>
                  AIRA is provided “as is” during its beta preview release without warranties of any kind regarding continuous uptime or third-party service availability.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
