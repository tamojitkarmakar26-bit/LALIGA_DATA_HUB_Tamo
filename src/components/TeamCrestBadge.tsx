import React, { useState, useEffect } from 'react';
import { getTeamIdentity } from '../utils/teamLogos';

interface TeamCrestBadgeProps {
  teamName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showFallbackText?: boolean;
}

export const TeamCrestBadge: React.FC<TeamCrestBadgeProps> = ({
  teamName,
  size = 'md',
  className = '',
  showFallbackText = true,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const identity = getTeamIdentity(teamName);

  // Reset error state if teamName or crestUrl changes
  useEffect(() => {
    setHasError(false);
  }, [teamName, identity.crestUrl]);

  const sizeClasses = {
    sm: 'w-6 h-6 rounded-md p-0.5',
    md: 'w-8 h-8 sm:w-9 sm:h-9 rounded-xl p-1',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl p-1.5',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2',
  }[size];

  const textSize = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-lg',
  }[size];

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center bg-surface-container-lowest border border-white/10 shadow-sm overflow-hidden select-none ${sizeClasses} ${className}`}
      title={identity.name}
    >
      {!hasError && identity.crestUrl ? (
        <img
          src={identity.crestUrl}
          alt={`${identity.name} official crest`}
          className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : showFallbackText ? (
        <div
          className="w-full h-full rounded flex items-center justify-center font-score-display font-extrabold tracking-wider"
          style={{
            backgroundColor: `${identity.primaryColor}20`,
            color: identity.primaryColor,
          }}
        >
          <span className={textSize}>{identity.code}</span>
        </div>
      ) : null}
    </div>
  );
};
