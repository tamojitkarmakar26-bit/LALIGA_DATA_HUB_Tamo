import React from 'react';
import { LaLigaLogo } from './LaLigaLogo';

export type NavRoute = '/calendar' | '/live' | '/standings' | '/season-stats' | '/clubs' | '/jerseys' | '/history';

interface SidebarProps {
  currentPath: NavRoute;
  onNavigate: (path: NavRoute) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const navItems = [
    {
      path: '/calendar' as NavRoute,
      label: 'LaLiga Calendar',
      icon: 'calendar_month',
      hasPing: false,
      badge: null,
    },
    {
      path: '/live' as NavRoute,
      label: 'Live Match Center',
      icon: 'sensors',
      hasPing: true,
      badge: null,
    },
    {
      path: '/standings' as NavRoute,
      label: 'Points Table & Standings',
      icon: 'leaderboard',
      hasPing: false,
      badge: '26/27 LIVE',
    },
    {
      path: '/season-stats' as NavRoute,
      label: 'Current Season Stats',
      icon: 'query_stats',
      hasPing: false,
      badge: '26/27',
    },
    {
      path: '/clubs' as NavRoute,
      label: 'The Clubs',
      icon: 'shield',
      hasPing: false,
      badge: '20',
    },
    {
      path: '/jerseys' as NavRoute,
      label: 'Jersey Archive',
      icon: 'checkroom',
      hasPing: false,
      badge: null,
    },
    {
      path: '/history' as NavRoute,
      label: 'LaLiga History',
      icon: 'menu_book',
      hasPing: false,
      badge: null,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      <div className="flex flex-col gap-space-lg px-space-md">
        {/* Brand / Logo Section */}
        <div
          onClick={() => onNavigate('/calendar')}
          className="flex items-center gap-space-sm px-space-xs cursor-pointer hover:opacity-90 transition-opacity"
        >
          <LaLigaLogo size="md" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">
                LALIGA
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#FF2B44]/15 border border-[#FF2B44]/30 text-[#FF2B44] font-label-caps text-label-caps uppercase font-bold tracking-wider">
                EA SPORTS
              </span>
            </div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mt-0.5">
              Official Data Hub 26/27
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-surface-container-low"></div>

        {/* Navigation Items with Exact Stitch Styling */}
        <nav className="flex flex-col gap-1.5" data-active-classes="bg-surface-container-high text-on-surface font-semibold shadow-sm">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;

            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
                className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all cursor-pointer gap-2 ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-xl shrink-0 ${
                      isActive && (item.hasPing || item.badge?.includes('LIVE'))
                        ? 'text-primary'
                        : isActive
                        ? 'text-on-surface'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-body-md text-body-md truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span
                      className={`font-label-caps text-label-caps px-2 py-0.5 rounded-full font-tabular-data flex items-center gap-1 font-bold ${
                        item.badge.includes('LIVE')
                          ? 'bg-secondary/15 text-secondary border border-secondary/30'
                          : 'bg-surface-container-low text-secondary'
                      }`}
                    >
                      {item.badge.includes('LIVE') && (
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shrink-0" />
                      )}
                      <span>{item.badge}</span>
                    </span>
                  )}

                  {!item.badge && item.hasPing && (
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Clean Footer without user card */}
      <div className="flex flex-col gap-2 px-space-md">
        <div className="h-px w-full bg-surface-container-low"></div>
        <div className="flex items-center justify-between px-space-sm py-2 text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            <span className="font-label-caps uppercase tracking-wider text-[10px]">Season 2026–27</span>
          </div>
          <span className="font-label-caps text-[10px] text-outline">v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};
