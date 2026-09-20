import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AiraDemo } from './components/AiraDemo';
import { MeetAiraAndroid } from './components/MeetAiraAndroid';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { AiraInAction } from './components/AiraInAction';
import { PlatformRoadmap } from './components/PlatformRoadmap';
import { DeveloperSection } from './components/DeveloperSection';
import { PermissionsPrivacy } from './components/PermissionsPrivacy';
import { DownloadSection } from './components/DownloadSection';
import { InstallationGuide } from './components/InstallationGuide';
import { GeminiSetup } from './components/GeminiSetup';
import { FAQSection } from './components/FAQSection';
import { ChangelogSection } from './components/ChangelogSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { SupportModal } from './components/SupportModal';
import { UserAccountModal } from './components/UserAccountModal';
import { AuthModal } from './components/AuthModal';

const AuthModalContainer: React.FC = () => {
  const { authModalOpen, authModalReason, closeAuthModal } = useAuth();
  return (
    <AuthModal
      isOpen={authModalOpen}
      onClose={closeAuthModal}
      reason={authModalReason}
    />
  );
};

export default function App() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const openPrivacy = () => {
    setLegalTab('privacy');
    setLegalModalOpen(true);
  };

  const openTerms = () => {
    setLegalTab('terms');
    setLegalModalOpen(true);
  };

  const openSupport = () => {
    setSupportModalOpen(true);
  };

  const openAccount = () => {
    setAccountModalOpen(true);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#040509] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Top Sticky Navigation with Google Sign In & Support */}
        <Navbar
          onOpenSupport={openSupport}
          onOpenAccount={openAccount}
        />

        <main>
          {/* Section 1: Hero Section (Avatar, glow aura, badge, CTAs) */}
          <Hero />

          {/* Section 2: Interactive Voice Demo */}
          <AiraDemo />

          {/* Section 3: Meet AIRA on Android (Dashboard Showcase) */}
          <MeetAiraAndroid />

          {/* Section 4: Key Features (9 Cards with Available Now vs In Development) */}
          <Features />

          {/* Section 5: How AIRA Works (5-Step Pipeline) */}
          <HowItWorks />

          {/* Section 6: AIRA in Action (Visual Gallery & Lightbox) */}
          <AiraInAction />

          {/* Section 7: Platform Availability & 3-Phase Roadmap */}
          <PlatformRoadmap />

          {/* Section 8: Developer Section (Biren - AI/ML Engineer) */}
          <DeveloperSection />

          {/* Section 9: Privacy & Security (4 Pillars + Transparency Table) */}
          <PermissionsPrivacy onOpenPrivacy={openPrivacy} onOpenTerms={openTerms} />

          {/* Section 10: Download Center (APK ~48MB, SHA-256, 5-Step Flow) */}
          <DownloadSection />

          {/* Section 11: Installation Guide */}
          <InstallationGuide />

          {/* Section 12: Gemini API Setup (BYOK) */}
          <GeminiSetup />

          {/* Section 13: Frequently Asked Questions (9 official Q&As) */}
          <FAQSection />

          {/* Section 14: Changelog & Release History */}
          <ChangelogSection />
        </main>

        {/* Section 15: Footer with Creator credit, links, and support */}
        <Footer
          onOpenPrivacy={openPrivacy}
          onOpenTerms={openTerms}
          onOpenSupport={openSupport}
        />

        {/* Privacy Policy and Terms of Use Modal */}
        <LegalModal
          isOpen={legalModalOpen}
          initialTab={legalTab}
          onClose={() => setLegalModalOpen(false)}
        />

        {/* Support Desk Modal */}
        <SupportModal
          isOpen={supportModalOpen}
          onClose={() => setSupportModalOpen(false)}
        />

        {/* User Account & Cloud Memory Modal */}
        <UserAccountModal
          isOpen={accountModalOpen}
          onClose={() => setAccountModalOpen(false)}
          onOpenSupport={openSupport}
        />

        {/* AIRA Protected Authentication Modal */}
        <AuthModalContainer />
      </div>
    </AuthProvider>
  );
}
