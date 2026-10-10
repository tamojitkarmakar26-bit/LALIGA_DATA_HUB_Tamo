import React, { useState, useEffect } from 'react';
import { Sidebar, NavRoute } from './components/Sidebar';
import { Header } from './components/Header';
import { DiagnosticsModal } from './components/DiagnosticsModal';
import { LaLigaCalendar } from './pages/LaLigaCalendar';
import { LiveMatchCenter } from './pages/LiveMatchCenter';
import { CurrentSeason } from './pages/CurrentSeason';
import { TheClubs } from './pages/TheClubs';
import { JerseyArchive } from './pages/JerseyArchive';
import { LaLigaHistory } from './pages/LaLigaHistory';
import { SeasonStats } from './pages/SeasonStats';

export default function App() {
  // Determine initial route and optional club ID from window.location
  const getInitialState = (): { route: NavRoute; clubId: string } => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const urlClub = params.get('club') || params.get('id');

      if (path.startsWith('/clubs/') || path === '/clubs' || path === '/the-clubs') {
        const parts = path.split('/');
        const idFromPath = parts[2] ? parts[2].toUpperCase() : null;
        return { route: '/clubs', clubId: idFromPath || urlClub || 'FCB' };
      }
      if (path === '/standings' || path === '/current-season') return { route: '/standings', clubId: 'FCB' };
      if (path === '/season-stats' || path === '/current-season-stats' || path === '/stats') return { route: '/season-stats', clubId: 'FCB' };
      if (path === '/jerseys' || path === '/jersey-archive') return { route: '/jerseys', clubId: 'FCB' };
      if (path === '/history' || path === '/laliga-history') return { route: '/history', clubId: 'FCB' };
      if (path === '/live' || path === '/live-match-center') return { route: '/live', clubId: 'FCB' };
      if (path === '/calendar' || path === '/laliga-calendar' || path === '/') return { route: '/calendar', clubId: 'FCB' };
    }
    return { route: '/calendar', clubId: 'FCB' };
  };

  const initial = getInitialState();
  const [currentPath, setCurrentPath] = useState<NavRoute>(initial.route);
  const [selectedClubId, setSelectedClubId] = useState<string>(initial.clubId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState<boolean>(false);
  const [calendarMatchday, setCalendarMatchday] = useState<number>(8); // Default to current matchday 8
  const [calendarSeason, setCalendarSeason] = useState<string>('2026-27');

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const state = getInitialState();
      setCurrentPath(state.route);
      setSelectedClubId(state.clubId);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: NavRoute) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
  };

  const handleNavigateClub = (clubId: string) => {
    setSelectedClubId(clubId);
    setCurrentPath('/clubs');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/clubs?club=${encodeURIComponent(clubId)}`);
    }
  };

  // Render current view
  const renderView = () => {
    switch (currentPath) {
      case '/calendar':
        return (
          <LaLigaCalendar
            searchQuery={searchQuery}
            onSelectClub={handleNavigateClub}
            initialMatchday={calendarMatchday}
            initialSeason={calendarSeason}
          />
        );
      case '/live':
        return (
          <LiveMatchCenter
            searchQuery={searchQuery}
            onSelectClub={handleNavigateClub}
            onNavigateToCalendar={(matchday) => {
              if (matchday) setCalendarMatchday(matchday);
              setCalendarSeason('2026-27');
              handleNavigate('/calendar');
            }}
          />
        );
      case '/standings':
        return (
          <CurrentSeason
            searchQuery={searchQuery}
            initialSeason="2026-27"
            onSelectClub={handleNavigateClub}
            onNavigateToCalendar={(matchday, season) => {
              if (matchday) setCalendarMatchday(matchday);
              if (season) setCalendarSeason(season);
              handleNavigate('/calendar');
            }}
          />
        );
      case '/season-stats':
        return (
          <SeasonStats
            searchQuery={searchQuery}
            onSelectClub={handleNavigateClub}
          />
        );
      case '/clubs':
        return (
          <TheClubs
            initialClubId={selectedClubId}
            searchQuery={searchQuery}
            onNavigateClub={(id) => setSelectedClubId(id)}
          />
        );
      case '/jerseys':
        return <JerseyArchive />;
      case '/history':
        return <LaLigaHistory />;
      default:
        return (
          <LaLigaCalendar
            searchQuery={searchQuery}
            onSelectClub={handleNavigateClub}
            initialMatchday={calendarMatchday}
            initialSeason={calendarSeason}
          />
        );
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main Content Area offset by Sidebar width (pl-72) */}
      <div className="pl-72 min-h-screen">
        <Header
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
          currentSeason={calendarSeason}
          currentMatchday={calendarMatchday}
          onNavigateToCalendar={(matchday, season) => {
            if (matchday) setCalendarMatchday(matchday);
            if (season) setCalendarSeason(season);
            handleNavigate('/calendar');
          }}
          onSelectClub={handleNavigateClub}
        />

        <main className="w-full pt-16 px-space-margin pb-space-xl bg-background min-h-screen">
          {renderView()}
        </main>
      </div>

      {/* API & Telemetry Diagnostics Modal */}
      <DiagnosticsModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
      />
    </div>
  );
}
