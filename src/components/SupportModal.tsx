import React, { useState } from 'react';
import {
  X,
  Mail,
  Copy,
  Check,
  Send,
  LifeBuoy,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Clock,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth?: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, onOpenAuth }) => {
  const { user, supportEmail, submitSupportRequest, supportRequests, signInWithGoogle } = useAuth();

  const [copied, setCopied] = useState(false);
  const [category, setCategory] = useState('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitSupportRequest(subject, message, category);
      setSubmitSuccess(true);
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit support request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#090B12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with holographic ambient glow */}
        <div className="relative px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Syne',sans-serif]">
                AIRA Official Support
              </h3>
              <p className="text-xs text-slate-400">
                Direct developer assistance and inquiry desk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Primary Support Email Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-violet-950/40 border border-cyan-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Official Support Email
                </span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Verified Contact
                </span>
              </div>
              <div className="flex items-center gap-2 text-base font-mono text-white font-medium">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{supportEmail}</span>
              </div>
              <p className="text-xs text-slate-400">
                Inquiries regarding Android APK setup, Gemini API key connection, or voice pipeline diagnostics.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-slate-200 border border-white/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${supportEmail}?subject=AIRA%20Inquiry%20from%20Website`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Email Us</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* In-App Ticket Form (Database Backed) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Submit Ticket to Firestore Database</span>
              </h4>
              {user && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Authenticated as {user.email}
                </span>
              )}
            </div>

            {!user ? (
              <div className="p-6 rounded-xl bg-slate-900/60 border border-white/[0.08] text-center space-y-3">
                <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto opacity-80" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Sign in with Google to Log Database Inquiries
                  </p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Sign in to track your support status directly in Firestore or send an email directly to{' '}
                    <strong className="text-slate-300 font-mono">{supportEmail}</strong>.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await signInWithGoogle();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs tracking-wide shadow-lg transition-transform active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Your inquiry was logged to the Firestore database and queued for {supportEmail}.</span>
                  </div>
                )}

                {submitError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="voice_pipeline">Gemini Live / Voice Pipeline</option>
                      <option value="gemini_key">API Key & Configuration</option>
                      <option value="installation">Android APK Installation</option>
                      <option value="bug_report">Bug Report / Device Actions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Gemini Live audio handshake inquiry"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what you are encountering with AIRA..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                  <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500">
                    <span>Inquiries are reviewed by the lead developer.</span>
                    <span>{message.length} / 2000</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !subject.trim() || !message.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20 transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Logging Ticket...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Past Support Requests if logged in */}
          {user && supportRequests.length > 0 && (
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Your Logged Tickets ({supportRequests.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {supportRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{req.subject}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                          req.status === 'resolved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-slate-400 line-clamp-2">{req.message}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono pt-1">
                      <span>Tag: {req.category}</span>
                      <span>•</span>
                      <span>ID: {req.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-slate-950/90 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500">
          <span>AIRA Support Desk</span>
          <span className="font-mono text-cyan-400">{supportEmail}</span>
        </div>
      </div>
    </div>
  );
};
