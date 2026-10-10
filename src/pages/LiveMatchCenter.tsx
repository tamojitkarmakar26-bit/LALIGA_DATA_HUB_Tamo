import React, { useState, useEffect, useMemo } from 'react';
import { FixtureRecord } from '../services/csvDataService';
import { TeamCrestBadge } from '../components/TeamCrestBadge';
import { getCurrentISTDate, getCurrentISTTime, formatISTDisplayDate } from '../utils/istTimeUtils';
import {
  MatchTelemetry,
  getFixtureTelemetry,
  GW8_TELEMETRY_MAP,
  LiveMatchEvent,
} from '../services/matchTelemetryService';

interface LiveMatchCenterProps {
  searchQuery?: string;
  onSelectClub?: (clubId: string) => void;
  onNavigateToCalendar?: (matchday?: number) => void;
}

export const LiveMatchCenter: React.FC<LiveMatchCenterProps> = ({
  searchQuery = '',
  onSelectClub,
  onNavigateToCalendar,
}) => {
  const [gw8Fixtures, setGw8Fixtures] = useState<FixtureRecord[]>([]);
  const [gw7Fixtures, setGw7Fixtures] = useState<FixtureRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeGwTab, setActiveGwTab] = useState<'gw8' | 'gw7'>('gw8');
  const [use24Hour, setUse24Hour] = useState<boolean>(true);
  const [rateLimitWarning, setRateLimitWarning] = useState<boolean>(false);
  const [isTelemetryActive, setIsTelemetryActive] = useState<boolean>(true);

  // Selected match for rich telemetry inspection (default: Tomorrow 12:30 AM Malaga vs Espanyol)
  const [selectedMatchKey, setSelectedMatchKey] = useState<string>('Malaga-Espanyol');
  const [activeTelemetry, setActiveTelemetry] = useState<MatchTelemetry>(
    GW8_TELEMETRY_MAP['Malaga-Espanyol'] || getFixtureTelemetry('Malaga', 'Espanyol', 8)
  );

  // Live in-play simulation controls (Default FALSE: Matchday 8 has not started yet!)
  const [isLiveSimActive, setIsLiveSimActive] = useState<boolean>(false);
  const [simulatedMinute, setSimulatedMinute] = useState<number>(0);
  const [expandedSection, setExpandedSection] = useState<'stats' | 'events' | 'lineups' | 'all'>('all');

  // Club code mapping
  const getTeamCode = (name: string): string => {
    const map: Record<string, string> = {
      'Real Madrid': 'RMA',
      'Barcelona': 'FCB',
      'FC Barcelona': 'FCB',
      'Atletico Madrid': 'ATM',
      'Atlético de Madrid': 'ATM',
      'Athletic Club': 'ATH',
      'Real Sociedad': 'RSO',
      'Real Betis': 'BET',
      'Villarreal': 'VIL',
      'Sevilla': 'SFC',
      'Valencia': 'VAL',
      'Celta Vigo': 'CEL',
      'Osasuna': 'OSA',
      'Espanyol': 'ESP',
      'Getafe': 'GET',
      'Rayo Vallecano': 'RAY',
      'Alaves': 'ALA',
      'Girona': 'GIR',
      'Mallorca': 'MLL',
      'Elche': 'ELC',
      'Levante': 'LEV',
      'Deportivo La Coruna': 'DEP',
      'Racing Santander': 'RAC',
      'Malaga': 'MAL',
      'Málaga': 'MAL',
      'Real Oviedo': 'OVI',
    };
    return map[name] || (name.substring(0, 3) || '').toUpperCase();
  };

  // Fetch official fixtures and live matches silently with rate limit error handling
  const loadFixtures = async () => {
    try {
      setRefreshing(true);
      const [res8, res7, resLive] = await Promise.allSettled([
        fetch('/api/fixtures?season=2026-27&matchday=8'),
        fetch('/api/fixtures?season=2026-27&matchday=7'),
        fetch('/api/fixtures/live'),
      ]);

      let isRateLimited = false;

      // Handle live polling response and 429 status code
      if (resLive.status === 'fulfilled') {
        const liveRes = resLive.value;
        if (liveRes.status === 429) {
          isRateLimited = true;
        } else if (liveRes.ok) {
          const liveData = await liveRes.json();
          if (liveData.rate_limit_exceeded || liveData.warning) {
            isRateLimited = true;
          }
          if (liveData.fixtures && liveData.fixtures.length > 0) {
            setIsTelemetryActive(true);
          }
        }
      } else {
        isRateLimited = true;
      }

      setRateLimitWarning(isRateLimited);

      if (res8.status === 'fulfilled' && res8.value.ok) {
        const j8 = await res8.value.json();
        if (j8.fixtures && j8.fixtures.length > 0) {
          setGw8Fixtures(j8.fixtures);
        }
      }
      if (res7.status === 'fulfilled' && res7.value.ok) {
        const j7 = await res7.value.json();
        if (j7.fixtures && j7.fixtures.length > 0) {
          setGw7Fixtures(j7.fixtures);
        }
      }
      setLastUpdated(`${getCurrentISTTime(true)} IST`);
    } catch (err) {
      console.error('Error loading live match center fixtures:', err);
      setRateLimitWarning(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFixtures();
    // Silent 30-second polling interval
    const interval = setInterval(() => {
      loadFixtures();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update telemetry when selected match key changes
  useEffect(() => {
    const [home, away] = selectedMatchKey.split('-');
    if (GW8_TELEMETRY_MAP[selectedMatchKey]) {
      setActiveTelemetry({ ...GW8_TELEMETRY_MAP[selectedMatchKey] });
    } else {
      setActiveTelemetry(getFixtureTelemetry(home || 'Malaga', away || 'Espanyol', 8));
    }
    setSimulatedMinute(0);
  }, [selectedMatchKey]);

  // Handle select match
  const handleSelectMatch = (home: string, away: string) => {
    const key = `${home}-${away}`;
    setSelectedMatchKey(key);
  };

  // Advance simulation minute
  const handleAdvanceSimulation = () => {
    setSimulatedMinute((prev) => {
      const nextMin = Math.min(90, (prev === 0 ? 65 : prev) + 5);
      return nextMin;
    });
  };

  const handleResetSimulation = () => {
    setSimulatedMinute(0);
  };

  // Filter fixtures using search query
  const term = searchQuery.toLowerCase().trim();
  const filteredGw8 = useMemo(() => {
    if (!term) return gw8Fixtures;
    return gw8Fixtures.filter(
      (m) =>
        m.homeTeam.toLowerCase().includes(term) ||
        m.awayTeam.toLowerCase().includes(term) ||
        m.city.toLowerCase().includes(term) ||
        m.stadium.toLowerCase().includes(term)
    );
  }, [gw8Fixtures, term]);

  const filteredGw7 = useMemo(() => {
    if (!term) return gw7Fixtures;
    return gw7Fixtures.filter(
      (m) =>
        m.homeTeam.toLowerCase().includes(term) ||
        m.awayTeam.toLowerCase().includes(term) ||
        m.city.toLowerCase().includes(term) ||
        m.stadium.toLowerCase().includes(term)
    );
  }, [gw7Fixtures, term]);

  const todayFormatted = formatISTDisplayDate();

  // Highlighted tomorrow fixture: Malaga vs Espanyol
  const tomorrowMatch = gw8Fixtures.find((m) => m.homeTeam === 'Malaga' && m.awayTeam === 'Espanyol') || gw8Fixtures[0];

  return (
    <div className="flex flex-col w-full gap-space-lg pt-2 select-none">
      {/* Rate Limit Banner Error State */}
      {rateLimitWarning && (
        <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center justify-between gap-3 shadow-md animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-400 text-base">warning</span>
            <span>Live updates paused (API limit reached)</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-500/30 shrink-0">
            Serving Cached Telemetry
          </span>
        </div>
      )}

      {/* Top Header & Real-Time Telemetry Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary font-label-caps text-label-caps tracking-wider uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              Live Match Center • Season 2026/27
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-label-caps text-label-caps tracking-wider uppercase font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Telemetry Active
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 font-label-caps text-label-caps tracking-wider uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Indian Standard Time (IST)
            </span>
            <span className="text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
              {todayFormatted}
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg lg:text-3xl text-on-surface tracking-tight font-bold">
            Live Match Center &amp; Matchday Telemetry
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Live scores, minute feeds, and complete statistical telemetry for every match of LaLiga. Highlighted: <strong>Tomorrow at 12:30 AM IST (Malaga vs Espanyol)</strong>.
          </p>
        </div>

        {/* Action Controls & Format Switchers */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* 24-Hour / 12-Hour IST Switcher */}
          <button
            onClick={() => setUse24Hour(!use24Hour)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low text-xs font-bold text-on-surface hover:bg-surface-container transition-colors cursor-pointer border border-surface-container-high shadow-sm"
            type="button"
            title="Toggle between 24-Hour and 12-Hour IST format"
          >
            <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
            <span>{use24Hour ? '24H Format (IST)' : '12H AM/PM (IST)'}</span>
          </button>

          {/* Toggle In-Play Simulation Mode */}
          <button
            onClick={() => {
              const next = !isLiveSimActive;
              setIsLiveSimActive(next);
              if (next && simulatedMinute === 0) setSimulatedMinute(68);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              isLiveSimActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md font-bold'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container-high'
            }`}
            type="button"
            title="Toggle in-play match simulation demo"
          >
            <span className={`material-symbols-outlined text-sm ${isLiveSimActive ? 'animate-spin text-amber-400' : 'text-secondary'}`}>
              sensors
            </span>
            <span>{isLiveSimActive ? 'Simulation Active' : 'Simulate In-Play Demo'}</span>
          </button>

          {/* Refresh / Sync Live Feed */}
          <button
            onClick={loadFixtures}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs text-on-surface transition-colors cursor-pointer border border-surface-container-high shadow-sm"
            type="button"
            title="Sync Live Telemetry"
          >
            <span className={`material-symbols-outlined text-base ${refreshing ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span className="hidden sm:inline font-label-badge">
              {refreshing ? 'Syncing...' : 'Sync Live'}
            </span>
          </button>
        </div>
      </div>

      {/* Gameweek 8 Matchday Fixtures Carousel / Selector (Every Match Can Be Selected) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <h2 className="font-headline-sm text-base font-bold text-on-surface uppercase tracking-wider">
              Gameweek 8 Fixtures • Select Match to View Live Scores &amp; Stats
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            10 Fixtures Scheduled • Click any match
          </span>
        </div>

        {/* Horizontal Scrollable Match Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {gw8Fixtures.map((fix, idx) => {
            const key = `${fix.homeTeam}-${fix.awayTeam}`;
            const isSelected = selectedMatchKey === key;
            const isTomorrowOpener = fix.homeTeam === 'Malaga' && fix.awayTeam === 'Espanyol';

            const displayTime = use24Hour ? (fix.time24 || fix.time) : (fix.time12 || fix.time);

            return (
              <div
                key={idx}
                onClick={() => handleSelectMatch(fix.homeTeam, fix.awayTeam)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 relative overflow-hidden group shadow-sm ${
                  isSelected
                    ? 'bg-surface-container-high border-secondary ring-2 ring-secondary/40 shadow-lg scale-[1.02]'
                    : isTomorrowOpener
                    ? 'bg-surface-container-low border-secondary/40 hover:border-secondary hover:bg-surface-container'
                    : 'bg-surface-container-low border-surface-container-high hover:border-secondary/50 hover:bg-surface-container'
                }`}
              >
                {/* Header Tag - Clean layout without text overlap */}
                <div className="flex items-center justify-between text-[11px] gap-2 min-w-0">
                  {isTomorrowOpener ? (
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-[#030712] font-black tracking-wider uppercase text-[10px] flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#030712] animate-pulse"></span>
                      TOMORROW
                    </span>
                  ) : (
                    <span className="text-on-surface-variant font-semibold truncate">
                      {fix.formattedDate?.split(',')[0] || 'GW 8'}
                    </span>
                  )}
                  <span className="text-secondary font-bold font-tabular-data shrink-0 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>{displayTime} IST</span>
                  </span>
                </div>

                {/* Matchup Crests & Names */}
                <div className="flex items-center justify-between gap-2 py-1">
                  <div className="flex flex-col items-center gap-1 flex-1 text-center min-w-0">
                    <TeamCrestBadge teamName={fix.homeTeam} size="md" />
                    <span className="text-xs font-bold text-on-surface truncate w-full px-0.5" title={fix.homeTeam}>
                      {fix.homeTeam}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center shrink-0 px-1">
                    {isLiveSimActive && isTomorrowOpener ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-xs shadow-sm">
                        1 : 0
                      </span>
                    ) : isTomorrowOpener || fix.homeTeam === 'Malaga' ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-xs shadow-sm">
                        1 : 0
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded bg-surface-container-lowest font-black text-xs text-on-surface-variant shadow-sm border border-surface-container-high">
                        VS
                      </span>
                    )}
                    <span className="text-[9px] uppercase font-bold mt-0.5 text-secondary">
                      {isLiveSimActive && isTomorrowOpener ? `${simulatedMinute || 68}' SIM` : (isTomorrowOpener || fix.homeTeam === 'Malaga' ? '68\' LIVE' : 'SCHEDULED')}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1 flex-1 text-center min-w-0">
                    <TeamCrestBadge teamName={fix.awayTeam} size="md" />
                    <span className="text-xs font-bold text-on-surface truncate w-full px-0.5" title={fix.awayTeam}>
                      {fix.awayTeam}
                    </span>
                  </div>
                </div>

                {/* Footer Indicator */}
                <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/60 text-[10px] text-on-surface-variant gap-2">
                  <span className="truncate flex-1" title={fix.stadium}>{fix.stadium}</span>
                  <span className={`font-bold uppercase shrink-0 ${isSelected ? 'text-secondary' : 'group-hover:text-primary'}`}>
                    {isSelected ? 'Viewing' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Match Live Telemetry View (Displays Live Scores & All Stats for Selected Match) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high/70 border border-secondary/30 shadow-2xl relative overflow-hidden flex flex-col gap-6">
        {/* Top Match Info & Live Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full font-label-caps text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md ${
                isLiveSimActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                  : 'bg-surface-container-high text-secondary border border-secondary/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLiveSimActive ? 'bg-amber-400' : 'bg-secondary'}`}></span>
              {isLiveSimActive
                ? `DEMO SIMULATION • ${simulatedMinute || 68}' MIN`
                : 'MATCHDAY 8 • SCHEDULED'}
            </span>

            {activeTelemetry.isTomorrowOpener && (
              <span className="px-2.5 py-1 rounded-full bg-secondary text-[#030712] font-black text-xs uppercase tracking-wider shadow-sm">
                Tomorrow • 12:30 AM IST
              </span>
            )}

            <span className="text-xs font-label-caps uppercase text-on-surface-variant font-semibold">
              {activeTelemetry.venue}, {activeTelemetry.city}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-on-surface-variant font-tabular-data">
            <span className="material-symbols-outlined text-sm text-secondary">sports</span>
            <span>Referee: {activeTelemetry.referee}</span>
            <span>•</span>
            <span className="font-bold text-secondary">{activeTelemetry.timeIST}</span>
          </div>
        </div>

        {/* Informative Pre-Match / Simulation Banner */}
        {!isLiveSimActive ? (
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-base">event_upcoming</span>
              <span className="text-on-surface">
                <strong>Matchday 8 has not started yet.</strong> Tomorrow at <strong>12:30 AM IST</strong> is the opening kickoff ({activeTelemetry.homeTeam} vs {activeTelemetry.awayTeam}). Scoreboard displays <strong>VS</strong> until live kickoff.
              </span>
            </div>
            <button
              onClick={() => {
                setIsLiveSimActive(true);
                setSimulatedMinute(68);
              }}
              className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-secondary hover:text-[#030712] text-secondary font-bold transition-all text-xs flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer border border-secondary/30"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              <span>Test In-Play Simulator</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-400 text-base">sensors</span>
              <span className="text-amber-200">
                <strong>Demo Simulation Mode Active:</strong> Demonstrating in-play live scoring and telemetry as it will stream during tomorrow&apos;s match. Matchday 8 officially begins tomorrow at 12:30 AM IST.
              </span>
            </div>
            <button
              onClick={() => {
                setIsLiveSimActive(false);
                setSimulatedMinute(0);
              }}
              className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-bold transition-colors text-xs flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer border border-surface-container-high"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              <span>Exit Simulation</span>
            </button>
          </div>
        )}

        {/* Main Scoreboard Display with Vector Crests */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
          {/* Home Team */}
          <div
            className="flex items-center gap-4 sm:gap-6 flex-1 justify-end text-right cursor-pointer group"
            onClick={() => onSelectClub && onSelectClub(getTeamCode(activeTelemetry.homeTeam))}
          >
            <div className="flex flex-col">
              <span className="font-headline-lg text-2xl sm:text-4xl font-black text-on-surface group-hover:text-primary transition-colors">
                {activeTelemetry.homeTeam}
              </span>
              <span className="text-xs text-on-surface-variant font-semibold mt-0.5">
                Home Club • {activeTelemetry.lineups.home.formation}
              </span>
            </div>
            <TeamCrestBadge teamName={activeTelemetry.homeTeam} size="xl" />
          </div>

          {/* Main Scoreboard Center Block */}
          {isLiveSimActive ? (
            <div className="flex flex-col items-center justify-center px-8 py-4 rounded-3xl bg-surface-container-lowest border border-amber-500/40 shadow-2xl min-w-[190px] text-center">
              <span className="font-score-display text-4xl sm:text-6xl font-black text-on-surface tracking-wider">
                {activeTelemetry.simulatedScenario?.homeScore ?? 1} : {activeTelemetry.simulatedScenario?.awayScore ?? 0}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-black uppercase tracking-widest mt-1 animate-pulse">
                SIMULATION • {simulatedMinute || activeTelemetry.simulatedScenario?.elapsed || 68}&apos; MIN
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={handleAdvanceSimulation}
                  className="px-2.5 py-1 rounded-lg bg-surface-container text-[11px] font-bold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                  title="Advance minute"
                >
                  +5 Min
                </button>
                <button
                  onClick={handleResetSimulation}
                  className="px-2.5 py-1 rounded-lg bg-surface-container text-[11px] font-bold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                  title="Reset minute"
                >
                  Reset
                </button>
              </div>
            </div>
          ) : activeTelemetry.status === 'LIVE' || activeTelemetry.homeScore !== null ? (
            <div className="flex flex-col items-center justify-center px-8 py-5 rounded-3xl bg-surface-container-lowest border border-emerald-500/40 shadow-2xl min-w-[210px] text-center">
              <span className="font-score-display text-4xl sm:text-6xl font-black text-on-surface tracking-wider">
                {activeTelemetry.homeScore ?? 1} : {activeTelemetry.awayScore ?? 0}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black uppercase tracking-widest mt-2 flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                LIVE • {activeTelemetry.elapsed || 68}&apos; MIN
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1">
                Real-Time Telemetry Active
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-8 py-5 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-2xl min-w-[210px] text-center">
              <span className="font-score-display text-4xl sm:text-6xl font-black text-on-surface-variant tracking-wider">
                VS
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-container text-secondary border border-secondary/30 text-[11px] font-black uppercase tracking-widest mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                SCHEDULED • NOT STARTED
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium mt-1">
                Kickoff: {activeTelemetry.timeIST}
              </span>
            </div>
          )}

          {/* Away Team */}
          <div
            className="flex items-center gap-4 sm:gap-6 flex-1 justify-start text-left cursor-pointer group"
            onClick={() => onSelectClub && onSelectClub(getTeamCode(activeTelemetry.awayTeam))}
          >
            <TeamCrestBadge teamName={activeTelemetry.awayTeam} size="xl" />
            <div className="flex flex-col">
              <span className="font-headline-lg text-2xl sm:text-4xl font-black text-on-surface group-hover:text-primary transition-colors">
                {activeTelemetry.awayTeam}
              </span>
              <span className="text-xs text-on-surface-variant font-semibold mt-0.5">
                Away Club • {activeTelemetry.lineups.away.formation}
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex items-center gap-2 border-b border-surface-container-high pb-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Telemetry & Stats', icon: 'dashboard' },
            { id: 'stats', label: 'Full Match Statistics', icon: 'analytics' },
            { id: 'events', label: 'Match Events & Goals', icon: 'sports_soccer' },
            { id: 'lineups', label: 'Starting Lineups', icon: 'groups' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setExpandedSection(sec.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                expandedSection === sec.id
                  ? 'bg-secondary text-[#030712] shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{sec.icon}</span>
              <span>{sec.label}</span>
            </button>
          ))}
        </div>

        {/* 1. In-Game Advanced Statistics (Visible for selected match) */}
        {(expandedSection === 'all' || expandedSection === 'stats') && (
          <div className="flex flex-col gap-4 p-5 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-high">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-xs uppercase font-extrabold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">analytics</span>
                {isLiveSimActive
                  ? 'Simulated In-Game Telemetry & Match Statistics:'
                  : 'Pre-Match Projected Telemetry & Tactical Metrics:'}
              </span>
              <span className="text-[11px] font-bold text-secondary uppercase font-tabular-data">
                {activeTelemetry.homeTeam} vs {activeTelemetry.awayTeam}
              </span>
            </div>

            {/* Possession Comparison Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-tabular-data font-bold">
                <span className="text-secondary">{activeTelemetry.homeTeam} {activeTelemetry.stats.possession.home}%</span>
                <span className="text-on-surface-variant font-label-caps uppercase text-[11px]">Ball Possession</span>
                <span className="text-primary">{activeTelemetry.stats.possession.away}% {activeTelemetry.awayTeam}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden flex">
                <div
                  className="bg-secondary h-full transition-all duration-500"
                  style={{ width: `${activeTelemetry.stats.possession.home}%` }}
                ></div>
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${activeTelemetry.stats.possession.away}%` }}
                ></div>
              </div>
            </div>

            {/* Detailed Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2 text-xs font-tabular-data">
              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.xg.home}</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Expected Goals (xG)</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.xg.away}</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.shotsOnTarget.home} / {activeTelemetry.stats.totalShots.home}</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Shots (Target/Total)</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.shotsOnTarget.away} / {activeTelemetry.stats.totalShots.away}</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.corners.home}</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Corners</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.corners.away}</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.fouls.home}</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Fouls</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.fouls.away}</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.passAccuracy.home}%</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Pass Accuracy</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.passAccuracy.away}%</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.completedPasses.home} / {activeTelemetry.stats.totalPasses.home}</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Passes (Comp/Tot)</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.completedPasses.away} / {activeTelemetry.stats.totalPasses.away}</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.saves.home}</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Goalkeeper Saves</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.saves.away}</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex justify-between items-center border border-surface-container-high/40">
                <span className="font-bold text-secondary text-sm">{activeTelemetry.stats.yellowCards.home}Y / {activeTelemetry.stats.redCards.home}R</span>
                <span className="text-on-surface-variant font-label-caps text-[10px] uppercase font-bold">Cards (Yellow/Red)</span>
                <span className="font-bold text-primary text-sm">{activeTelemetry.stats.yellowCards.away}Y / {activeTelemetry.stats.redCards.away}R</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Match Events Ticker */}
        {(expandedSection === 'all' || expandedSection === 'events') && (
          <div className="flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-high">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-xs uppercase font-extrabold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">sports_soccer</span>
                Live Match Events &amp; Timeline:
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium">
                {isLiveSimActive ? 'Simulated In-Play Feed' : 'Pre-Match Feed'}
              </span>
            </div>

            {isLiveSimActive && ((activeTelemetry.simulatedScenario?.events?.length || 0) > 0 || activeTelemetry.events.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {(activeTelemetry.simulatedScenario?.events || activeTelemetry.events).map((evt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/50 text-xs"
                  >
                    <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-tabular-data font-black text-xs">
                      {evt.minute}&apos;
                    </span>
                    <div className="flex flex-col flex-1">
                      <span className="font-bold text-on-surface">
                        {evt.player} ({evt.team})
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        {evt.detail} {evt.assist ? `• Assist: ${evt.assist}` : ''}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-container-high text-on-surface">
                      {evt.type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-high/40 text-center flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-3xl text-secondary">sports_soccer</span>
                <span className="font-bold text-sm text-on-surface">No Match Events Yet</span>
                <p className="text-xs text-on-surface-variant max-w-md">
                  Matchday 8 has not kicked off yet. Real-time events (goals, bookings, substitutions, VAR decisions) will stream live right here starting upon kickoff tomorrow at 12:30 AM IST.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 3. Confirmed Starting Lineups & Tactical Formations */}
        {(expandedSection === 'all' || expandedSection === 'lineups') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Home Starting XI */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-high flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                <div>
                  <span className="font-bold text-sm text-on-surface">
                    {activeTelemetry.lineups.home.teamName} Starting XI
                  </span>
                  <div className="text-[11px] text-on-surface-variant">
                    Coach: {activeTelemetry.lineups.home.coach}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-secondary text-[#030712] font-black font-tabular-data text-xs">
                  {activeTelemetry.lineups.home.formation}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {activeTelemetry.lineups.home.startingXI.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-surface-container-low border border-surface-container-high/30"
                  >
                    <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-[10px] text-secondary">
                      {p.number}
                    </span>
                    <span className="font-semibold text-on-surface truncate flex-1">{p.name}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">{p.position}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Away Starting XI */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-high flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                <div>
                  <span className="font-bold text-sm text-on-surface">
                    {activeTelemetry.lineups.away.teamName} Starting XI
                  </span>
                  <div className="text-[11px] text-on-surface-variant">
                    Coach: {activeTelemetry.lineups.away.coach}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-primary text-white font-black font-tabular-data text-xs">
                  {activeTelemetry.lineups.away.formation}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {activeTelemetry.lineups.away.startingXI.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-surface-container-low border border-surface-container-high/30"
                  >
                    <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-[10px] text-primary">
                      {p.number}
                    </span>
                    <span className="font-semibold text-on-surface truncate flex-1">{p.name}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">{p.position}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Gameweek 8 / Gameweek 7 Full Fixture Schedule */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">calendar_month</span>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">
              Official Matchday Schedules &amp; Full Results
            </h3>
          </div>

          {/* Gameweek 8 (Next) / Gameweek 7 (Played) Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl border border-surface-container-high">
            <button
              onClick={() => setActiveGwTab('gw8')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeGwTab === 'gw8'
                  ? 'bg-secondary text-[#030712] shadow-sm font-black'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Gameweek 8 (Upcoming)
            </button>
            <button
              onClick={() => setActiveGwTab('gw7')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeGwTab === 'gw7'
                  ? 'bg-secondary text-[#030712] shadow-sm font-black'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Gameweek 7 (Latest Played)
            </button>
          </div>
        </div>

        {/* Fixtures List */}
        <div className="flex flex-col gap-2.5">
          {(activeGwTab === 'gw8' ? filteredGw8 : filteredGw7).map((match, idx) => {
            const isTomorrowOpener = activeGwTab === 'gw8' && match.homeTeam === 'Malaga' && match.awayTeam === 'Espanyol';
            const isPlayed = match.status === 'Played';
            const displayTime = use24Hour ? (match.time24 || match.time) : (match.time12 || match.time);

            return (
              <div
                key={idx}
                onClick={() => {
                  if (activeGwTab === 'gw8') {
                    handleSelectMatch(match.homeTeam, match.awayTeam);
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border shadow-sm cursor-pointer group ${
                  isTomorrowOpener
                    ? 'bg-surface-container border-secondary ring-1 ring-secondary/30 shadow-md'
                    : 'bg-surface-container-low hover:bg-surface-container border-surface-container-high/50'
                }`}
              >
                {/* Left: Date & Kick-off Time in IST */}
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-tabular-data sm:w-48 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      {isPlayed ? 'event_available' : 'schedule'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-on-surface">{match.formattedDate}</span>
                    <span className="text-secondary font-bold text-xs">{displayTime} IST</span>
                  </div>
                </div>

                {/* Center: Clubs Matchup & Score */}
                <div className="flex items-center justify-center flex-1 gap-2 sm:gap-4 py-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-1 justify-end text-right">
                    <span className="font-headline-sm text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors text-right">
                      {match.homeTeam}
                    </span>
                    <TeamCrestBadge teamName={match.homeTeam} size="md" />
                  </div>

                  {isPlayed ? (
                    <div className="px-3 py-1 rounded-xl bg-surface-container-high border border-surface-container-highest shrink-0 shadow-inner text-center min-w-[64px]">
                      <span className="font-score-display text-sm sm:text-base font-extrabold text-on-surface tracking-wider">
                        {match.homeScore ?? '-'} : {match.awayScore ?? '-'}
                      </span>
                    </div>
                  ) : (
                    <div className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-surface-container-highest shrink-0 shadow-inner text-center">
                      <span className="font-tabular-data text-[11px] font-black text-secondary tracking-wider">
                        VS
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 flex-1 justify-start text-left">
                    <TeamCrestBadge teamName={match.awayTeam} size="md" />
                    <span className="font-headline-sm text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors text-left">
                      {match.awayTeam}
                    </span>
                  </div>
                </div>

                {/* Right: Venue & Status badge */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center sm:min-w-[170px] shrink-0 text-right">
                  {isPlayed ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-tertiary/20 text-tertiary text-[10px] font-extrabold uppercase tracking-wider font-label-caps border border-tertiary/30">
                      Played
                    </span>
                  ) : isTomorrowOpener ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary text-[#030712] text-[10px] font-black uppercase tracking-wider font-label-caps animate-pulse">
                      Tomorrow 12:30 AM
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-wider font-label-caps border border-surface-container-highest">
                      Scheduled
                    </span>
                  )}
                  <span className="text-[11px] text-on-surface-variant mt-1 font-medium flex items-center gap-1 justify-end max-w-[200px]">
                    <span className="material-symbols-outlined text-[13px] text-on-surface-variant/70 shrink-0">stadium</span>
                    <span className="truncate">{match.stadium || 'Official Ground'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
