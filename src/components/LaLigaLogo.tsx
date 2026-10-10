import React from 'react';

interface LaLigaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showWordmark?: boolean;
}

/**
 * Official LaLiga Brand Logo Component
 * Exact mathematical vector geometry of the official LaLiga double-L emblem
 * in Coral Red (#FF4B44) on sleek dark container, exactly matching the user's brand asset.
 */
export const LaLigaLogo: React.FC<LaLigaLogoProps> = ({
  size = 'md',
  className = '',
  showWordmark = false,
}) => {
  const dimensionClasses = {
    sm: 'w-7 h-7 p-1',
    md: 'w-10 h-10 p-1.5',
    lg: 'w-12 h-12 p-2',
    xl: 'w-16 h-16 p-2.5',
  }[size];

  // The exact vector emblem
  const VectorEmblem = (
    <svg
      viewBox="90 -5 248 228"
      className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,75,68,0.45)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Official LaLiga Logo"
    >
      {/* Left L Glyph */}
      <path
        fill="#FF4B44"
        d="M162.8 0h56.87l-73.18 104.14H194l-73.9 37.67-14.88-18.96c-5.28-6.96-7.68-12.24-7.68-19.44 0-6.48 2.4-12.72 6.48-18.48Z"
      />
      {/* Right L Glyph */}
      <path
        fill="#FF4B44"
        d="M267.18 0h62.63L208.4 172.76h54.71l-84.94 43.19-18.24-23.27c-5.04-6.48-7.68-12.96-7.68-19.92 0-6 2.4-12.48 6.72-18.72Z"
      />
    </svg>
  );

  if (showWordmark) {
    return (
      <div className={`flex items-center gap-2.5 select-none ${className}`}>
        <div className={`relative shrink-0 ${dimensionClasses} rounded-xl bg-black border border-[#FF4B44]/25 flex items-center justify-center shadow-[0_2px_12px_rgba(255,75,68,0.25)]`}>
          {VectorEmblem}
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm font-black tracking-tight text-white leading-none text-xl">
            LALIGA
          </span>
          <span className="text-[10px] font-bold text-[#FF4B44] tracking-widest uppercase">
            EA SPORTS
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center rounded-xl bg-[#030712] border border-[#FF4B44]/30 shadow-[0_0_15px_rgba(255,75,68,0.2)] select-none group transition-all duration-200 hover:scale-105 hover:border-[#FF4B44]/60 hover:shadow-[0_0_20px_rgba(255,75,68,0.35)] ${dimensionClasses} ${className}`}
      title="Official LaLiga Logo"
    >
      {VectorEmblem}
    </div>
  );
};
