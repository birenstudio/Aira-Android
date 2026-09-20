import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProtectedDownloadButtonProps {
  id?: string;
  className?: string;
  variant?: 'primary' | 'nav' | 'secondary' | 'card';
  label?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  onClickBefore?: () => void;
}

export const ProtectedDownloadButton: React.FC<ProtectedDownloadButtonProps> = ({
  id,
  className = '',
  variant = 'primary',
  label = 'Download AIRA',
  icon,
  showIcon = true,
  onClickBefore
}) => {
  const { triggerProtectedDownload, isDownloading } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClickBefore) onClickBefore();
    triggerProtectedDownload();
  };

  // Variant Styles
  let baseStyle = '';
  switch (variant) {
    case 'primary':
      baseStyle =
        'group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.45)] transition-all duration-300 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed';
      break;
    case 'nav':
      baseStyle =
        'relative group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_20px_-3px_rgba(56,189,248,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed';
      break;
    case 'card':
      baseStyle =
        'w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-lg shadow-cyan-500/25 transition-all duration-300 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed';
      break;
    case 'secondary':
    default:
      baseStyle =
        'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed';
      break;
  }

  const renderedIcon = isDownloading ? (
    <Loader2 className="w-4 h-4 text-cyan-200 animate-spin" />
  ) : (
    icon || (
      <Download className="w-4 h-4 text-cyan-200 group-hover:-translate-y-0.5 transition-transform" />
    )
  );

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      disabled={isDownloading}
      className={`${baseStyle} ${className}`}
    >
      {showIcon && renderedIcon}
      <span>{isDownloading ? 'Preparing AIRA download...' : label}</span>
    </button>
  );
};
