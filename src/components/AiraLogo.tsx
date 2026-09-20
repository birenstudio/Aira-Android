import React from 'react';

interface AiraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const AiraLogo: React.FC<AiraLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.25em]',
    md: 'text-xl tracking-[0.3em]',
    lg: 'text-2xl tracking-[0.35em]',
    xl: 'text-4xl tracking-[0.4em]'
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Holographic Prism A Emblem */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Ambient atmospheric glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-cyan-400 blur-md opacity-70 rounded-full scale-110 pointer-events-none" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(0,242,254,0.5)]">
          <defs>
            <linearGradient id="airaPrismGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#00F2FE" />
            </linearGradient>
            <linearGradient id="airaInnerGlow" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Outer faceted triangle */}
          <path
            d="M 50 12 L 86 86 L 68 86 L 50 50 L 32 86 L 14 86 Z"
            fill="url(#airaPrismGrad)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
          {/* Center inner dark aperture */}
          <polygon
            points="50,26 72,74 28,74"
            fill="#07080D"
          />
          {/* Floating inner prism core */}
          <path
            d="M 50 36 L 62 62 L 38 62 Z"
            fill="url(#airaInnerGlow)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-bold font-['Syne',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200 ${titleSizes[size]}`}>
          A I R A
        </span>
        {showSubtitle && (
          <span className={`font-semibold uppercase text-cyan-400/90 font-['JetBrains_Mono',monospace] ${subSizes[size]}`}>
            AI RESPONSIVE ASSISTANT
          </span>
        )}
      </div>
    </div>
  );
};
