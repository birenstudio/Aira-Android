import React, { useState, useEffect } from 'react';
import { AiraState, LivingStateInfo } from '../types';
import { livingStatesConfig } from '../config/airaConfig';

interface AiraOrbProps {
  currentState?: AiraState;
  onStateChange?: (state: AiraState) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AiraOrb: React.FC<AiraOrbProps> = ({
  currentState = 'listening',
  onStateChange,
  interactive = true,
  size = 'lg',
  className = ''
}) => {
  const [internalState, setInternalState] = useState<AiraState>(currentState);
  const [audioLevel, setAudioLevel] = useState<number>(0.4);

  useEffect(() => {
    setInternalState(currentState);
  }, [currentState]);

  // Simulate subtle ambient audio oscillation
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(0.25 + Math.random() * 0.65);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const stateInfo: LivingStateInfo =
    livingStatesConfig.find((s) => s.id === internalState) || livingStatesConfig[1];

  const handleOrbClick = () => {
    if (!interactive) return;
    const states: AiraState[] = ['neutral', 'listening', 'thinking', 'speaking', 'smiling'];
    const nextIdx = (states.indexOf(internalState) + 1) % states.length;
    const nextState = states[nextIdx];
    setInternalState(nextState);
    if (onStateChange) onStateChange(nextState);
  };

  const dimensions = {
    sm: 'w-48 h-48 sm:w-56 sm:h-56',
    md: 'w-64 h-64 sm:w-72 sm:h-72',
    lg: 'w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer Atmospheric Aura */}
      <div
        className="absolute rounded-full blur-3xl transition-all duration-700 pointer-events-none opacity-40 -z-10"
        style={{
          width: '120%',
          height: '120%',
          background: `radial-gradient(circle, ${stateInfo.accentColor} 0%, rgba(139, 92, 246, 0.4) 40%, transparent 70%)`
        }}
      />

      {/* Primary Orb Stage */}
      <div
        id="aira-hologram-stage"
        onClick={handleOrbClick}
        className={`relative ${dimensions[size]} flex items-center justify-center cursor-pointer group`}
        title={interactive ? 'Click to toggle AIRA living states' : undefined}
      >
        {/* Orbital Ring 1: Outermost with dashed telemetry track */}
        <div
          className="absolute inset-0 rounded-full border border-cyan-400/20 animate-[spin_32s_linear_infinite]"
          style={{ borderStyle: 'dashed', borderWidth: '1px' }}
        >
          {/* Orbital Node 1 */}
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F2FE]" />
          {/* Orbital Node 2 */}
          <div className="absolute top-4 right-1/4 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#A855F7]" />
        </div>

        {/* Orbital Ring 2: Reverse angled rotation */}
        <div
          className="absolute inset-4 sm:inset-6 rounded-full border border-violet-500/25 animate-[spin_24s_linear_infinite_reverse]"
        >
          {/* Orbital Node 3 */}
          <div className="absolute -top-1 left-1/3 w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#E879F9]" />
          {/* Orbital Node 4 */}
          <div className="absolute bottom-6 right-1/4 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38BDF8]" />
        </div>

        {/* Orbital Ring 3: Innermost glowing solid line with pulse */}
        <div
          className="absolute inset-8 sm:inset-12 rounded-full transition-all duration-500"
          style={{
            border: `1.5px solid ${stateInfo.accentColor}55`,
            boxShadow: `0 0 24px -4px ${stateInfo.accentColor}40`
          }}
        />

        {/* Audio Waveform Resonance Rings (active when listening or speaking) */}
        {(internalState === 'listening' || internalState === 'speaking') && (
          <>
            <div
              className="absolute inset-2 sm:inset-4 rounded-full border border-cyan-400/30 animate-ping opacity-25 pointer-events-none"
              style={{ animationDuration: '2.5s' }}
            />
            <div
              className="absolute inset-6 sm:inset-10 rounded-full border border-violet-400/30 animate-pulse opacity-40 pointer-events-none"
              style={{ animationDuration: '1.8s' }}
            />
          </>
        )}

        {/* Center Holographic Core Container */}
        <div className="relative w-3/4 h-3/4 rounded-full overflow-hidden flex items-center justify-center bg-[#070913]/85 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]">
          {/* Starfield / celestial backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

          {/* Holographic Avatar Silhouette & Glyphs */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Ambient inner glow */}
            <div
              className="absolute w-44 h-44 rounded-full blur-xl opacity-60 transition-colors duration-700"
              style={{ background: stateInfo.accentColor }}
            />

            {/* Futuristic Celestial Avatar Vector */}
            <svg
              viewBox="0 0 200 240"
              className="w-full h-full relative z-10 drop-shadow-[0_0_16px_rgba(56,189,248,0.6)]"
            >
              <defs>
                <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#00F2FE" />
                </linearGradient>
                <linearGradient id="suitGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#1E243A" />
                  <stop offset="100%" stopColor="#0B0D18" />
                </linearGradient>
                <linearGradient id="glowPrism" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F2FE" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
              </defs>

              {/* Luminous Hair Flow Backing */}
              <path
                d="M 50 100 Q 30 140 40 210 Q 75 190 70 140 Z"
                fill="url(#hairGrad)"
                opacity="0.75"
              />
              <path
                d="M 150 100 Q 170 140 160 210 Q 125 190 130 140 Z"
                fill="url(#hairGrad)"
                opacity="0.75"
              />

              {/* Head & Face Contour */}
              <path
                d="M 68 85 Q 68 135 100 152 Q 132 135 132 85 Q 132 45 100 45 Q 68 45 68 85 Z"
                fill="#F3E8FF"
                opacity="0.95"
              />

              {/* Front Bangs & Crown Hair */}
              <path
                d="M 65 80 Q 72 40 100 40 Q 128 40 135 80 Q 125 65 100 68 Q 75 65 65 80 Z"
                fill="url(#hairGrad)"
              />
              <path
                d="M 68 80 Q 80 120 74 150 Q 82 110 82 85 Z"
                fill="url(#hairGrad)"
                opacity="0.85"
              />
              <path
                d="M 132 80 Q 120 120 126 150 Q 118 110 118 85 Z"
                fill="url(#hairGrad)"
                opacity="0.85"
              />

              {/* Forehead Glowing "A" Glyph - Authentically matches AIRA mark */}
              <polygon
                points="100,56 106,66 94,66"
                fill="url(#glowPrism)"
                className="animate-pulse"
              />
              <polygon
                points="100,59 104,65 96,65"
                fill="#070913"
              />

              {/* Cybernetic Eyes with Expressive State */}
              {internalState === 'smiling' ? (
                // Smiling gentle curved eyes
                <>
                  <path d="M 82 102 Q 88 97 94 102" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 106 102 Q 112 97 118 102" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
              ) : (
                // Open radiant celestial eyes
                <>
                  <ellipse cx="88" cy="100" rx="6" ry="7" fill="#0E1626" />
                  <circle cx="89" cy="99" r="4.5" fill="#38BDF8" />
                  <circle cx="90" cy="98" r="1.8" fill="#FFFFFF" />
                  
                  <ellipse cx="112" cy="100" rx="6" ry="7" fill="#0E1626" />
                  <circle cx="111" cy="99" r="4.5" fill="#38BDF8" />
                  <circle cx="110" cy="98" r="1.8" fill="#FFFFFF" />
                </>
              )}

              {/* Cybernetic Neck & Collar Suit */}
              <path
                d="M 90 148 L 90 172 Q 80 180 60 190 L 50 240 L 150 240 L 140 190 Q 120 180 110 172 L 110 148 Z"
                fill="url(#suitGrad)"
                stroke="#38BDF8"
                strokeWidth="1"
              />

              {/* Chest Glowing "A" Crest */}
              <circle cx="100" cy="205" r="14" fill="#0B0E1B" stroke="#00F2FE" strokeWidth="1.5" />
              <polygon
                points="100,195 108,212 92,212"
                fill="url(#glowPrism)"
              />
              <polygon
                points="100,199 105,210 95,210"
                fill="#0B0E1B"
              />

              {/* Holographic Scanline Overlay */}
              <line x1="20" y1="120" x2="180" y2="120" stroke="#00F2FE" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3,3" />
            </svg>

            {/* Real-time Frequency Waveform at base */}
            <div className="absolute bottom-3 flex items-center justify-center gap-1 z-20">
              {[0.4, 0.7, 1.0, 0.6, 0.8, 0.5, 0.9, 0.3].map((factor, i) => {
                const height = Math.max(
                  4,
                  internalState === 'listening' || internalState === 'speaking'
                    ? Math.round(audioLevel * 20 * factor)
                    : 4
                );
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-150"
                    style={{
                      height: `${height}px`,
                      backgroundColor: stateInfo.accentColor,
                      boxShadow: `0 0 8px ${stateInfo.accentColor}`
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Hover Cue tooltip */}
        {interactive && (
          <div className="absolute -bottom-8 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-slate-900/90 border border-white/10 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            Tap to change state: <span className="text-cyan-400 capitalize">{internalState}</span>
          </div>
        )}
      </div>

      {/* State Badge Pill */}
      <div className="mt-8 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg">
        <span
          className="w-2.5 h-2.5 rounded-full animate-pulse"
          style={{ backgroundColor: stateInfo.accentColor, boxShadow: `0 0 10px ${stateInfo.accentColor}` }}
        />
        <span className="text-xs font-mono font-medium text-slate-300">
          State: <span className="font-semibold text-white capitalize">{stateInfo.label}</span>
        </span>
        <span className="text-[11px] text-slate-500 hidden sm:inline">•</span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">{stateInfo.description}</span>
      </div>
    </div>
  );
};
