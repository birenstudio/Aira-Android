import React from 'react';
import { AiraLogo } from './AiraLogo';
import { productConfig, downloadConfig, developerConfig } from '../config/airaConfig';
import { ShieldCheck, Mail, MessageCircle, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenSupport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onOpenSupport }) => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030509] border-t border-white/[0.08] relative overflow-hidden pt-16 pb-12">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.08]">
          
          {/* Brand & Creator Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <AiraLogo size="md" showSubtitle={true} />
            <p className="text-sm font-medium text-cyan-400 font-['Syne',sans-serif]">
              {productConfig.positioning}
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AIRA is an Android AI assistant built to understand natural conversation, communicate through continuous voice, retain useful memory, and perform real actions on an Android device.
            </p>

            {/* Creator Credit */}
            <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-400">
              <span>Created with passion by</span>
              <a
                href={developerConfig.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-cyan-300 hover:text-cyan-200 underline inline-flex items-center gap-1"
              >
                <span>{developerConfig.name}</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
            </div>

            {/* Contact & Support */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${productConfig.contactEmail}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{productConfig.contactEmail}</span>
              </a>

              <a
                href={developerConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#features" onClick={(e) => scrollTo(e, 'features')} className="hover:text-cyan-400 transition-colors">
                  Key Features
                </a>
              </li>
              <li>
                <a href="#screenshots" onClick={(e) => scrollTo(e, 'screenshots')} className="hover:text-cyan-400 transition-colors">
                  AIRA in Action
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollTo(e, 'how-it-works')} className="hover:text-cyan-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#download" onClick={(e) => scrollTo(e, 'download')} className="hover:text-cyan-400 transition-colors">
                  Download APK
                </a>
              </li>
              <li>
                <a href="#roadmap" onClick={(e) => scrollTo(e, 'roadmap')} className="hover:text-cyan-400 transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#developer" onClick={(e) => scrollTo(e, 'developer')} className="hover:text-cyan-400 transition-colors">
                  Developer
                </a>
              </li>
            </ul>
          </div>

          {/* Setup & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Guides & Help
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#installation-guide" onClick={(e) => scrollTo(e, 'installation-guide')} className="hover:text-cyan-400 transition-colors">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#gemini-setup" onClick={(e) => scrollTo(e, 'gemini-setup')} className="hover:text-cyan-400 transition-colors">
                  Gemini API Setup (BYOK)
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#changelog" onClick={(e) => scrollTo(e, 'changelog')} className="hover:text-cyan-400 transition-colors">
                  Changelog & Releases
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-cyan-400 transition-colors text-left text-cyan-300"
                >
                  Contact Support Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Legal & Privacy
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => scrollTo(e, 'privacy')} className="hover:text-cyan-400 transition-colors">
                  Privacy Pillars
                </a>
              </li>
              <li>
                <a
                  href={productConfig.geminiStudioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Google AI Studio Key</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>Copyright © 2026 AIRA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              On-Device Encrypted Keystore
            </span>
            <span>•</span>
            <span>Android 10+ (API 29)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
