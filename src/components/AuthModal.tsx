import React, { useEffect, useRef } from 'react';
import { X, Shield, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { assetUrls, downloadConfig } from '../config/airaConfig';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: 'download' | 'general';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  reason = 'general'
}) => {
  const { signInWithGoogle, authLoading, authError, clearAuthError } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      clearAuthError();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, clearAuthError]);

  if (!isOpen) return null;

  const isDownload = reason === 'download';
  const heading = isDownload ? 'Sign in to download AIRA' : 'Welcome to AIRA';
  const subheading = isDownload
    ? 'Create or sign in to your AIRA account to access the latest Android download.'
    : 'Sign in to access your AIRA account, custom voice memories, and priority support.';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !authLoading) {
          onClose();
        }
      }}
    >
      {/* Background radial glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute w-80 h-80 bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-3xl bg-[#070913] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.25)] text-slate-100 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={authLoading}
          aria-label="Close authentication dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Avatar with Glowing Aura */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-violet-500/20 border border-cyan-400/40 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <img
                src={assetUrls.airaAvatar}
                alt="AIRA Avatar"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = assetUrls.airaAvatarLocal;
                }}
              />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#070913] animate-pulse" />
            </div>
          </div>

          {/* Titles */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-wide">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{isDownload ? `AIRA ${downloadConfig.latestVersion} APK` : 'AIRA Neural Network'}</span>
            </div>

            <h3
              id="auth-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Syne',sans-serif]"
            >
              {heading}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300/90 max-w-sm leading-relaxed">
              {subheading}
            </p>
          </div>

          {/* Download Intent Info Pill (if download mode) */}
          {isDownload && (
            <div className="w-full p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="text-slate-400">Target Package:</span>
              <span className="font-bold text-cyan-300">
                {downloadConfig.latestVersion} • {downloadConfig.apkSize}
              </span>
            </div>
          )}

          {/* Error Banner */}
          {authError && (
            <div className="w-full p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 text-left animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-300">Authentication notice</p>
                <p className="text-rose-200/90 mt-0.5">{authError}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="w-full pt-2 space-y-3">
            {/* Primary Google Login Button */}
            <button
              id="auth-modal-google-btn"
              onClick={() => signInWithGoogle()}
              disabled={authLoading}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 text-slate-800 animate-spin" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  {/* Official Google 4-Color SVG Icon */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Cancel Button */}
            <button
              id="auth-modal-cancel-btn"
              onClick={onClose}
              disabled={authLoading}
              className="w-full py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white bg-transparent hover:bg-white/[0.05] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {/* Privacy & Reassurance Copy */}
          <div className="pt-2 flex flex-col items-center justify-center gap-1 text-[11px] text-slate-400 font-normal">
            <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
              <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Takes 5 seconds. Secure Google sign-in.</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Encrypted access • Zero ambient eavesdropping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
