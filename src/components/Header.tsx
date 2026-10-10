import React, { useState, useEffect } from 'react';
import { getCurrentISTTime } from '../utils/istTimeUtils';
import { SeasonMatchdaysModal } from './SeasonMatchdaysModal';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (term: string) => void;
  onOpenDiagnostics: () => void;
  apiConnected?: boolean;
  onNavigateToCalendar?: (matchday?: number, season?: string) => void;
  onSelectClub?: (clubId: string) => void;
  currentSeason?: string;
  currentMatchday?: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchValue,
  onSearchChange,
  onOpenDiagnostics,
  apiConnected = true,
  onNavigateToCalendar,
  onSelectClub,
  currentSeason = '2026-27',
  currentMatchday = 8,
}) => {
  const [istTime, setIstTime] = useState<string>(() => getCurrentISTTime());
  const [showMatchdaysModal, setShowMatchdaysModal] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIstTime(getCurrentISTTime());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const seasonShort = currentSeason.replace('20', '').replace('-20', '/').replace('-', '/');

  return (
    <>
      <header className="fixed top-0 left-72 right-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-space-margin flex items-center justify-between gap-space-md">
          {/* Left Status: Matchday X of 38 (Clickable to view all matchdays & scores) + Sync Time */}
          <div className="flex items-center gap-space-lg">
            <button
              onClick={() => setShowMatchdaysModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-all cursor-pointer group border border-surface-container-high hover:border-secondary/50 shadow-sm"
              type="button"
              title={`Click to inspect all matchdays & scores of Season ${currentSeason}`}
            >
              <span className="material-symbols-outlined text-secondary text-sm group-hover:scale-110 transition-transform">
                calendar_today
              </span>
              <span className="font-label-badge text-label-badge uppercase tracking-wide">
                Matchday {currentMatchday} <span className="text-on-surface-variant">of 38</span>
              </span>
              <span className="font-label-caps text-[10px] px-1.5 py-0.2 rounded bg-secondary/20 text-secondary font-bold">
                {seasonShort}
              </span>
              <span className="material-symbols-outlined text-xs text-on-surface-variant group-hover:text-on-surface">
                expand_more
              </span>
            </button>

            <div
              className="hidden lg:flex items-center gap-2 text-on-surface-variant"
              title="Current Indian Standard Time (UTC +05:30)"
            >
              <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
              <span className="font-tabular-data text-tabular-data font-semibold text-on-surface">
                {istTime} IST
              </span>
              <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/20">
                LIVE IST
              </span>
            </div>

          {/* Interactive API Telemetry Status Pill */}
          <button
            onClick={onOpenDiagnostics}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs transition-colors cursor-pointer group"
            type="button"
            title="Inspect API-Football & Kaggle Dataset Connectivity"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface">
              Telemetry Diagnostics
            </span>
            <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-on-surface">
              tune
            </span>
          </button>
        </div>

        {/* Right Search & Profile Actions */}
        <div className="flex items-center gap-space-md">
          {/* Universal Search Bar */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
              search
            </span>
            <input
              className="w-64 xl:w-80 h-9 pl-9 pr-9 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="Search clubs, players, fixtures, stadiums..."
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                type="button"
                title="Clear search"
              >
                <span className="material-symbols-outlined text-base leading-none">close</span>
              </button>
            )}
          </div>

          <button
            onClick={onOpenDiagnostics}
            className="relative p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            type="button"
            title="Telemetry Status & Alerts"
          >
            <span className="material-symbols-outlined text-xl leading-none">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
          </button>
        </div>
      </div>
    </header>

    {/* Quick Inspector Modal for Matchdays & Scores */}
    <SeasonMatchdaysModal
      isOpen={showMatchdaysModal}
      onClose={() => setShowMatchdaysModal(false)}
      onNavigateToCalendar={onNavigateToCalendar}
      onSelectClub={onSelectClub}
      initialSeason={currentSeason}
      initialMatchday={currentMatchday}
    />
  </>
);
};
