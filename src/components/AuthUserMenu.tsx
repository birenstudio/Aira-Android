import React, { useState, useRef, useEffect } from 'react';
import { User as UserIcon, ChevronDown, Download, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthUserMenuProps {
  onOpenAccount: () => void;
}

export const AuthUserMenu: React.FC<AuthUserMenuProps> = ({ onOpenAccount }) => {
  const { user, signOutUser, triggerProtectedDownload } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!user) return null;

  const displayName = user.displayName || user.email?.split('@')[0] || 'AIRA User';
  const firstName = displayName.split(' ')[0];

  return (
    <div className="relative" ref={menuRef}>
      {/* Compact Authenticated Control */}
      <button
        id="user-menu-btn"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-slate-800 transition-all shadow-sm shadow-cyan-500/10 active:scale-95"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={displayName}
            className="w-5 h-5 rounded-full object-cover border border-cyan-400/40"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold text-[10px]">
            {firstName[0]?.toUpperCase() || 'A'}
          </div>
        )}
        <span className="max-w-[90px] truncate text-slate-200 font-medium">
          {firstName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#090D1A]/95 border border-cyan-500/30 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-3 py-2.5 border-b border-white/[0.08] mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate">{displayName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <p className="text-[11px] font-mono text-cyan-400/80 truncate mt-0.5">
              {user.email || 'Authenticated Account'}
            </p>
          </div>

          {/* Menu Items */}
          <div className="space-y-0.5">
            <button
              id="menu-account-btn"
              onClick={() => {
                setDropdownOpen(false);
                onOpenAccount();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Account & Settings</span>
            </button>

            <button
              id="menu-download-btn"
              onClick={() => {
                setDropdownOpen(false);
                triggerProtectedDownload();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download AIRA APK</span>
            </button>
          </div>

          <div className="my-1.5 border-t border-white/[0.08]" />

          {/* Sign Out */}
          <button
            id="menu-signout-btn"
            onClick={() => {
              setDropdownOpen(false);
              signOutUser();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
};
