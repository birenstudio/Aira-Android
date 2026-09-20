import React, { useState, useEffect } from 'react';
import { AiraLogo } from './AiraLogo';
import { Menu, X, Download, ExternalLink, Sparkles, Smartphone, LifeBuoy, User as UserIcon } from 'lucide-react';
import { productConfig } from '../config/airaConfig';
import { useAuth } from '../context/AuthContext';

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
  const { user, loading, signInWithGoogle } = useAuth();
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

          {/* User Auth state button */}
          {user ? (
            <button
              onClick={onOpenAccount}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-sm shadow-cyan-500/10"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-4 h-4 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span className="max-w-[90px] truncate">
                {user.displayName?.split(' ')[0] || 'Account'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
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

          <a
            href="#download"
            onClick={(e) => {
              handleNavClick(e, '#download');
              if (onOpenDownload) onOpenDownload();
            }}
            className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_20px_-3px_rgba(56,189,248,0.4)] transition-all duration-300 active:scale-95"
          >
            <svg className="w-3.5 h-3.5 text-cyan-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9996.4482.9996.9993.0001.5511-.4486.9997-.9996.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9997.4482.9997.9993 0 .5511-.4486.9997-.9997.9997m11.4045-6.02l1.996-3.4572c.1556-.2696.0633-.6135-.2063-.7692-.2691-.1556-.6131-.0633-.7687.2063l-2.0224 3.5029c-1.4646-.6672-3.1118-1.0423-4.8801-1.0423s-3.4155.3751-4.8801 1.0423L5.1004 5.3022c-.1556-.2696-.4996-.3619-.7687-.2063-.2696.1557-.3619.4996-.2063.7692l1.996 3.4572C2.6888 11.2868.3444 15.0232 0 19.3905h24c-.3444-4.3673-2.6888-8.1037-6.1185-10.0691" />
            </svg>
            <span>Download AIRA</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          {user ? (
            <button
              onClick={onOpenAccount}
              className="p-1.5 rounded-full bg-slate-900 border border-cyan-500/40"
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
              onClick={() => signInWithGoogle()}
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
            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
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

              <a
                href="#download"
                onClick={(e) => handleNavClick(e, '#download')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download AIRA APK</span>
              </a>
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
