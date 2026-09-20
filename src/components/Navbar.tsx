import React, { useState, useEffect } from 'react';
import { AiraLogo } from './AiraLogo';
import { Menu, X, Download, ExternalLink, Sparkles, LifeBuoy, LogOut, User as UserIcon } from 'lucide-react';
import { productConfig } from '../config/airaConfig';
import { useAuth } from '../context/AuthContext';
import { AuthUserMenu } from './AuthUserMenu';
import { ProtectedDownloadButton } from './ProtectedDownloadButton';

interface NavbarProps {
  onOpenDownload?: () => void;
  onOpenSupport?: () => void;
  onOpenAccount?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDownload,
  onOpenSupport,
  onOpenAccount
}) => {
  const { user, loading, openAuthModal, signOutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Experience', href: '#experience' },
    { label: 'Screenshots', href: '#screenshots' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080D]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 group transition-transform hover:scale-[1.02]"
        >
          <AiraLogo size="sm" showSubtitle={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Support button */}
          <button
            onClick={onOpenSupport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            title="AIRA Official Support"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Support</span>
          </button>

          {/* User Auth state control */}
          {user ? (
            <AuthUserMenu onOpenAccount={onOpenAccount || (() => {})} />
          ) : (
            <button
              id="navbar-signin-btn"
              onClick={() => openAuthModal('general')}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors active:scale-95"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
              <span>Sign In</span>
            </button>
          )}

          {/* Centralized Protected Download Button */}
          <ProtectedDownloadButton
            id="navbar-download-cta"
            variant="nav"
            label="Download AIRA"
          />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          {user ? (
            <button
              onClick={onOpenAccount}
              className="p-1.5 rounded-full bg-slate-900 border border-cyan-500/40"
              aria-label="User account"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-5 h-5 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('general')}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-white/10 border border-white/20"
            >
              Sign In
            </button>
          )}

          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/80 border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-[#07080D]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/[0.04] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-600 text-xs">→</span>
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2.5">
              {/* User mobile state */}
              {user ? (
                <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-7 h-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
                        {user.displayName?.[0] || 'A'}
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">{user.displayName || 'AIRA User'}</p>
                      <p className="text-[10px] text-cyan-400/80 font-mono truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOutUser();
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs"
                    title="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('general');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.08] hover:bg-white/[0.12] border border-white/15"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenSupport) onOpenSupport();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.06] border border-white/10"
              >
                <LifeBuoy className="w-3.5 h-3.5 text-cyan-400" />
                <span>AIRA Support Desk</span>
              </button>

              {/* Protected Mobile Download CTA */}
              <ProtectedDownloadButton
                id="mobile-drawer-download-cta"
                variant="card"
                className="w-full justify-center"
                label="Download AIRA APK"
                onClickBefore={() => setMobileMenuOpen(false)}
              />

              <a
                href={productConfig.geminiStudioUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900/80 border border-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Get Gemini API Key</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
