import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { TeamCrestBadge } from '../components/TeamCrestBadge';
import {
  GoalScorerStat,
  AssistStat,
  PassingStat,
  SaveStat,
  CardStat,
  TeamSeasonStat,
  SeasonStatsPayload,
  MD7_SCORERS_OFFICIAL,
  MD7_ASSISTS_OFFICIAL,
  MD7_PASSES_OFFICIAL,
  MD7_SAVES_OFFICIAL,
  MD7_YELLOWS_OFFICIAL,
  MD7_REDS_OFFICIAL,
  MD7_TEAMS_OFFICIAL,
} from '../services/seasonStatsService';
import { HISTORICAL_SEASON_STATS } from '../services/historicalSeasonStatsData';
import {
  getCachedSeasonStats,
  hasMatchdayUpdate,
  invalidateSimulationCache,
  getCacheDiagnostics,
} from '../services/apiCacheService';

interface SeasonStatsProps {
  searchQuery?: string;
  onSelectClub?: (clubId: string) => void;
}

type StatCategory =
  | 'all'
  | 'scorers'
  | 'assists'
  | 'passes'
  | 'saves'
  | 'discipline'
  | 'teams';

export const AVAILABLE_SEASONS = [
  { id: '2026-27', label: 'Season 2026-27 (Current • Live)', isLive: true },
  { id: '2025-26', label: 'Season 2025-26 (Historical Archive)', isLive: false },
  { id: '2024-25', label: 'Season 2024-25 (Historical Archive)', isLive: false },
  { id: '2023-24', label: 'Season 2023-24 (Historical Archive)', isLive: false },
  { id: '2022-23', label: 'Season 2022-23 (Historical Archive)', isLive: false },
  { id: '2021-22', label: 'Season 2021-22 (Historical Archive)', isLive: false },
  { id: '2020-21', label: 'Season 2020-21 (Historical Archive)', isLive: false },
];

// Official baseline payload for Matchday 7 of 2026-27 season
const DEFAULT_MD7_DATA: SeasonStatsPayload = {
  season: '2026-27',
  matchday: 7,
  totalMatches: 69,
  lastUpdated: new Date().toISOString(),
  isHistorical: false,
  goalScorers: MD7_SCORERS_OFFICIAL,
  assists: MD7_ASSISTS_OFFICIAL,
  passes: MD7_PASSES_OFFICIAL,
  saves: MD7_SAVES_OFFICIAL,
  yellowCards: MD7_YELLOWS_OFFICIAL,
  redCards: MD7_REDS_OFFICIAL,
  teamStats: MD7_TEAMS_OFFICIAL,
};

export const SeasonStats: React.FC<SeasonStatsProps> = ({
  searchQuery = '',
  onSelectClub,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<string>('2026-27');
  const [statsData, setStatsData] = useState<SeasonStatsPayload>(DEFAULT_MD7_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<StatCategory>('all');
  const [selectedMatchday, setSelectedMatchday] = useState<number>(7);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [disciplineTab, setDisciplineTab] = useState<'yellow' | 'red'>('yellow');
  const [isFromCache, setIsFromCache] = useState<boolean>(true);

  // Re-render guard reference to track data state
  const previousStatsRef = useRef<SeasonStatsPayload>(DEFAULT_MD7_DATA);

  const isLiveSeason = selectedSeason === '2026-27';
  const isHistorical = !isLiveSeason;

  /**
   * Fetch season stats with Caching Layer.
   * Guard: The UI only re-renders when data updates occur for matchdays beyond Matchday 7,
   * or when switching season/matchday.
   */
  const fetchStats = useCallback(
    async (seasonToFetch: string = selectedSeason, matchday?: number, forceRefresh: boolean = false) => {
      try {
        setLoading(true);
        setError(null);
        const md = matchday !== undefined ? matchday : selectedMatchday;

        const { data, fromCache } = await getCachedSeasonStats(seasonToFetch, md, forceRefresh);
        setIsFromCache(fromCache);

        const isSeasonOrMatchdayChange =
          previousStatsRef.current.season !== seasonToFetch ||
          previousStatsRef.current.matchday !== md;

        // Re-render guard: Only re-render when matchday is beyond MD7 AND has updates,
        // or on explicit season/matchday selection!
        if (isSeasonOrMatchdayChange || hasMatchdayUpdate(previousStatsRef.current, data)) {
          previousStatsRef.current = data;
          setStatsData(data);
          if (seasonToFetch === '2026-27' && data.matchday) {
            setSelectedMatchday(data.matchday);
          }
          setLastRefreshed(new Date().toLocaleTimeString());
        }
      } catch (err: any) {
        console.warn('Network fetch error, maintaining cached fallback:', err);
        if (seasonToFetch === '2026-27' && (matchday ?? 7) <= 7) {
          setStatsData(DEFAULT_MD7_DATA);
        } else if (HISTORICAL_SEASON_STATS[seasonToFetch]) {
          setStatsData(HISTORICAL_SEASON_STATS[seasonToFetch]);
        } else {
          setError(err.message || 'Error fetching stats');
        }
      } finally {
        setLoading(false);
      }
    },
    [selectedSeason, selectedMatchday]
  );

  // Switch season handler
  const handleSeasonChange = (newSeason: string) => {
    setSelectedSeason(newSeason);
    if (newSeason === '2026-27') {
      setSelectedMatchday(7);
      fetchStats('2026-27', 7, false);
    } else {
      const historicalData = HISTORICAL_SEASON_STATS[newSeason];
      if (historicalData) {
        setStatsData(historicalData);
        previousStatsRef.current = historicalData;
      }
      fetchStats(newSeason, 38, false);
    }
  };

  // Reload when matchday changes in live season
  useEffect(() => {
    if (isLiveSeason) {
      fetchStats('2026-27', selectedMatchday, false);
    }
  }, [selectedMatchday, selectedSeason, fetchStats, isLiveSeason]);

  // Handle Advance to Next Matchday (Live season only)
  const handleAdvanceMatchday = async () => {
    if (!isLiveSeason) return;
    try {
      setIsSimulating(true);
      invalidateSimulationCache();
      const res = await fetch('/api/model/simulate-matchday', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchday: selectedMatchday + 1 }),
      });
      const data = await res.json();
      if (data.success) {
        const nextMd = data.modelStatus?.currentCompletedMatchday || selectedMatchday + 1;
        setSelectedMatchday(nextMd);
        await fetchStats('2026-27', nextMd, true);
      }
    } catch (err: any) {
      console.error('Failed to advance matchday:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Handle Reset to Official Matchday 7 (Live season only)
  const handleResetSeason = async () => {
    if (!isLiveSeason) return;
    try {
      setIsResetting(true);
      invalidateSimulationCache();
      const res = await fetch('/api/model/reset-season', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setSelectedMatchday(7);
        await fetchStats('2026-27', 7, true);
      }
    } catch (err: any) {
      console.error('Failed to reset season:', err);
    } finally {
      setIsResetting(false);
    }
  };

  // Toggle Auto-Update Scheduler (Live season only)
  const handleToggleAutoUpdate = async () => {
    if (!isLiveSeason) return;
    const nextState = !autoUpdate;
    setAutoUpdate(nextState);
    try {
      await fetch('/api/model/auto-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: nextState }),
      });
    } catch (e) {
      console.warn('Auto-update API toggle failed:', e);
    }
  };

  // Filtered datasets based on search query
  const query = searchQuery.trim().toLowerCase();

  const playerMatchesQuery = (playerName: string, team: string, teamCode: string) => {
    if (!query) return true;
    const nameLower = playerName.toLowerCase();
    if (nameLower.includes(query) || team.toLowerCase().includes(query) || teamCode.toLowerCase().includes(query)) {
      return true;
    }
    const ALIASES: Record<string, string[]> = {
      'RAPHAEL DIAS BELLOLI': ['raphinha', 'rapha', 'belloli'],
      'LAMINE YAMAL NASRAOUI EBANA': ['lamine yamal', 'yamal', 'lamine'],
      'KYLIAN MBAPPÉ': ['mbappe', 'kylian'],
      'VINÍCIUS JOSÉ PAIXÃO DE OLIVEIRA JÚNIOR': ['vinicius', 'vini', 'vinicius jr'],
      'PEDRO GONZÁLEZ LÓPEZ': ['pedri'],
      'RENATO PALMA VEIGA': ['veiga', 'renato'],
      'PIERRE-EMERICK AUBAMEYANG': ['aubameyang', 'auba'],
      'FER NIÑO': ['nino', 'fer'],
      'ANTE BUDIMIR': ['budimir'],
      'ÁLEX BAENA': ['baena'],
      'MIGUEL ROMÁN': ['roman'],
      'AYMERIC LAPORTE': ['laporte'],
      'PAU CUBARSÍ': ['cubarsi'],
      'JULEN AGIRREZABALA': ['agirrezabala'],
      'ÁLVARO VALLES': ['valles'],
      'SERGIO CAMELLO': ['camello'],
    };
    const extra = ALIASES[playerName];
    if (extra && extra.some((alias) => alias.includes(query) || query.includes(alias))) {
      return true;
    }
    return false;
  };

  const filteredScorers = useMemo(() => {
    if (!statsData?.goalScorers) return [];
    if (!query) return statsData.goalScorers;
    return statsData.goalScorers.filter((s) => playerMatchesQuery(s.player, s.team, s.teamCode));
  }, [statsData?.goalScorers, query]);

  const filteredAssists = useMemo(() => {
    if (!statsData?.assists) return [];
    if (!query) return statsData.assists;
    return statsData.assists.filter((s) => playerMatchesQuery(s.player, s.team, s.teamCode));
  }, [statsData?.assists, query]);

  const filteredPasses = useMemo(() => {
    if (!statsData?.passes) return [];
    if (!query) return statsData.passes;
    return statsData.passes.filter((s) => playerMatchesQuery(s.player, s.team, s.teamCode));
  }, [statsData?.passes, query]);

  const filteredSaves = useMemo(() => {
    if (!statsData?.saves) return [];
    if (!query) return statsData.saves;
    return statsData.saves.filter((s) => playerMatchesQuery(s.player, s.team, s.teamCode));
  }, [statsData?.saves, query]);

  const filteredYellows = useMemo(() => {
    if (!statsData?.yellowCards) return [];
    if (!query) return statsData.yellowCards;
    return statsData.yellowCards.filter((s) => playerMatchesQuery(s.player, s.team, s.teamCode));
  }, [statsData?.yellowCards, query]);

  const filteredReds = useMemo(() => {
    if (!statsData?.redCards) return [];
    if (!query) return statsData.redCards;
    return statsData.redCards.filter((s) => playerMatchesQuery(s.player, s.team, s.teamCode));
  }, [statsData?.redCards, query]);

  const filteredTeamStats = useMemo(() => {
    if (!statsData?.teamStats) return [];
    if (!query) return statsData.teamStats;
    return statsData.teamStats.filter(
      (s) => s.team.toLowerCase().includes(query) || s.teamCode.toLowerCase().includes(query)
    );
  }, [statsData?.teamStats, query]);

  // Max values for relative progress bar calculation
  const maxGoals = useMemo(() => {
    if (!statsData?.goalScorers?.length) return 1;
    return Math.max(...statsData.goalScorers.map((s) => s.goals), 1);
  }, [statsData?.goalScorers]);

  const maxAssists = useMemo(() => {
    if (!statsData?.assists?.length) return 1;
    return Math.max(...statsData.assists.map((s) => s.assists), 1);
  }, [statsData?.assists]);

  const maxPasses = useMemo(() => {
    if (!statsData?.passes?.length) return 1;
    return Math.max(...statsData.passes.map((s) => s.completedPasses), 1);
  }, [statsData?.passes]);

  const maxSaves = useMemo(() => {
    if (!statsData?.saves?.length) return 1;
    return Math.max(...statsData.saves.map((s) => s.totalSaves), 1);
  }, [statsData?.saves]);

  // Top leaders for showcase units
  const topScorer = statsData.goalScorers?.[0];
  const topAssist = statsData.assists?.[0];
  const topPasser = statsData.passes?.[0];
  const topKeeper = statsData.saves?.[0];

  // Clean podium rank rendering (Zero-Pill discipline: Only top 3 receive metallic highlight)
  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black font-mono shadow-sm">
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 text-[11px] font-bold font-mono">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/20 text-amber-400 border border-amber-700/40 text-[11px] font-bold font-mono">
          3
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center w-6 text-on-surface-variant font-mono text-xs font-semibold">
        {rank}
      </span>
    );
  };

  const navCategories = [
    { id: 'all' as StatCategory, label: 'All Metrics (Card View)', icon: 'grid_view' },
    { id: 'scorers' as StatCategory, label: 'Goal Scorers', icon: 'sports_soccer' },
    { id: 'assists' as StatCategory, label: 'Assists', icon: 'handshake' },
    { id: 'passes' as StatCategory, label: 'Passes', icon: 'sync_alt' },
    { id: 'saves' as StatCategory, label: 'Goalkeeping', icon: 'sports_handball' },
    { id: 'discipline' as StatCategory, label: 'Disciplinary', icon: 'warning' },
    { id: 'teams' as StatCategory, label: 'Team Stats', icon: 'groups' },
  ];

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ========================================================
          1. HEADER & CONTROLS SECTION
          Clear visual hierarchy, elevated control deck, broadcast aesthetics
      ======================================================== */}
      <header className="relative space-y-4">
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
                LaLiga EA SPORTS Telemetry
              </span>
              <span className="text-white/20">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                {isLiveSeason ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-emerald-400">Live Season</span>
                    <span className="text-white/20">•</span>
                    <span>
                      Matchday {selectedMatchday}{' '}
                      <strong className="text-on-surface font-semibold">
                        {selectedMatchday === 7 ? '(Official MD7)' : '(Projected Sim)'}
                      </strong>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xs text-amber-400">archive</span>
                    <span className="font-medium text-amber-300">Historical Archive</span>
                    <span className="text-white/20">•</span>
                    <span>38 Matchdays Completed</span>
                  </>
                )}
              </span>
              {/* Cache Layer telemetry pill */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-on-surface-variant">
                <span className="material-symbols-outlined text-xs text-primary">bolt</span>
                <span>{isFromCache ? 'Cached (Zero API Latency)' : 'Fresh Stream'}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display-hero font-extrabold tracking-tight text-on-surface">
              {isLiveSeason ? 'Season 2026/27 Performance & Statistics' : `LaLiga ${selectedSeason} Season Archive`}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
              {isLiveSeason
                ? 'Card-based analytical telemetry across 7 core metrics. Official verified Matchday 7 baseline with predictive matchday simulation engine.'
                : `Official historical records and season performance metrics for the concluded ${selectedSeason} campaign.`}
            </p>
          </div>

          {/* Controls: Season & Matchday Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 sm:self-auto shrink-0">
            {/* Season Selector */}
            <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-xl border border-white/10 shadow-sm">
              <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
              <select
                value={selectedSeason}
                onChange={(e) => handleSeasonChange(e.target.value)}
                className="bg-transparent text-on-surface text-xs font-bold focus:outline-none cursor-pointer pr-1"
                aria-label="Select Season"
              >
                {AVAILABLE_SEASONS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-surface-container text-on-surface">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* LIVE SEASON CONTROLS */}
            {isLiveSeason ? (
              <div className="flex items-center gap-1.5 bg-surface-container px-2 py-1.5 rounded-xl border border-white/10 shadow-sm">
                {/* Matchday Selector */}
                <div className="flex items-center gap-1 pl-1 pr-2 border-r border-white/10">
                  <span className="text-[11px] font-mono text-on-surface-variant font-semibold">MD</span>
                  <select
                    value={selectedMatchday}
                    onChange={(e) => setSelectedMatchday(Number(e.target.value))}
                    className="bg-transparent text-on-surface text-xs font-bold focus:outline-none cursor-pointer"
                    aria-label="Select Matchday"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((md) => (
                      <option key={md} value={md} className="bg-surface-container text-on-surface">
                        {md} {md === 7 ? '(Latest MD7)' : md > 7 ? '(Sim)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Next MD Simulation Button */}
                <button
                  onClick={handleAdvanceMatchday}
                  disabled={isSimulating}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/15 hover:bg-secondary/25 text-secondary text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  title="Simulate Next Matchday beyond Matchday 7"
                >
                  <span className={`material-symbols-outlined text-xs ${isSimulating ? 'animate-spin' : ''}`}>
                    fast_forward
                  </span>
                  <span className="hidden sm:inline">{isSimulating ? 'Simulating...' : 'Next MD'}</span>
                </button>

                {/* Reset Button */}
                <button
                  onClick={handleResetSeason}
                  disabled={isResetting}
                  className="px-2 py-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Reset to official Matchday 7 baseline"
                >
                  <span className="material-symbols-outlined text-xs">restart_alt</span>
                </button>

                {/* Auto Update Toggle */}
                <button
                  onClick={handleToggleAutoUpdate}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    autoUpdate
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Toggle automated simulation updates"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${autoUpdate ? 'bg-emerald-400' : 'bg-on-surface-variant'}`} />
                  <span className="text-[10px] font-mono">{autoUpdate ? 'AUTO' : 'MANUAL'}</span>
                </button>

                {/* Refresh */}
                <button
                  onClick={() => fetchStats('2026-27', selectedMatchday, true)}
                  className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
                  title="Refresh stats"
                >
                  <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>
                    refresh
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleSeasonChange('2026-27')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs transition-all cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-xs">bolt</span>
                <span>Current Season</span>
              </button>
            )}
          </div>
        </div>

        {/* HISTORICAL SEASON: Championship Glory Card */}
        {isHistorical && statsData.historicalMeta && (
          <div className="bg-surface-container-low border border-amber-500/25 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-3xl">emoji_events</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-extrabold">
                      CHAMPION
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Runner-up: <strong className="text-on-surface">{statsData.historicalMeta.runnerUp}</strong> ({statsData.historicalMeta.runnerUpPoints} pts)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <TeamCrestBadge teamName={statsData.historicalMeta.champion} size="md" />
                    <span className="text-xl font-bold text-on-surface">
                      {statsData.historicalMeta.champion}
                    </span>
                    <span className="text-amber-400 font-mono font-bold text-lg">
                      {statsData.historicalMeta.points} pts
                    </span>
                  </div>
                </div>
              </div>

              {/* Awards Row */}
              <div className="flex flex-wrap items-center gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10">
                <div className="bg-surface-container px-3 py-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-mono block">Pichichi Trophy</span>
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5 mt-0.5">
                    {statsData.historicalMeta.pichichiWinner}
                    <span className="text-amber-400 font-mono">({statsData.historicalMeta.pichichiGoals}G)</span>
                  </span>
                </div>
                <div className="bg-surface-container px-3 py-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-mono block">Zamora Trophy</span>
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5 mt-0.5">
                    {statsData.historicalMeta.zamoraWinner}
                    <span className="text-secondary font-mono">({statsData.historicalMeta.zamoraMetric.split('(')[0].trim()})</span>
                  </span>
                </div>
                <div className="bg-surface-container px-3 py-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-mono block">Relegated Clubs</span>
                  <span className="text-xs font-medium text-error/90 mt-0.5 block">
                    {statsData.historicalMeta.relegated.join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant mt-3 border-t border-white/5 pt-3 leading-relaxed">
              {statsData.historicalMeta.summary}
            </p>
          </div>
        )}

        {/* Category Navigation Tabs */}
        <nav
          className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-white/10"
          aria-label="Statistical Categories"
        >
          {navCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-base leading-none">
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ========================================================
          2. TOP LEADERS SPOTLIGHT KPI CARDS
          Quick-glance hero strip highlighting current metric masters
      ======================================================== */}
      {isLiveSeason && (activeCategory === 'all' || activeCategory === 'scorers' || activeCategory === 'assists' || activeCategory === 'passes' || activeCategory === 'saves') && (
        <section aria-label="Season Leaders Spotlight" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pichichi Leader */}
          {topScorer && (
            <div className="bg-surface-container-low border border-amber-400/25 hover:border-amber-400/50 rounded-2xl p-4 shadow-sm transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm">military_tech</span>
                  PICHICHI LEADER
                </span>
                <span className="text-[10px] text-on-surface-variant">Goals</span>
              </div>
              <div className="flex items-center gap-3">
                <TeamCrestBadge teamName={topScorer.team} size="md" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-on-surface truncate group-hover:text-amber-300 transition-colors">
                    {topScorer.player}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant truncate">{topScorer.team}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black font-mono text-amber-300">{topScorer.goals}</span>
                  <span className="text-xs text-on-surface-variant ml-1 font-medium">Goals</span>
                </div>
                <span className="text-[11px] font-mono text-on-surface-variant">
                  {topScorer.goalsPerMatch} / match • {topScorer.games} apps
                </span>
              </div>
            </div>
          )}

          {/* Assist Leader */}
          {topAssist && (
            <div className="bg-surface-container-low border border-secondary/25 hover:border-secondary/50 rounded-2xl p-4 shadow-sm transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-secondary font-mono mb-2">
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm">handshake</span>
                  TOP PLAYMAKER
                </span>
                <span className="text-[10px] text-on-surface-variant">Assists</span>
              </div>
              <div className="flex items-center gap-3">
                <TeamCrestBadge teamName={topAssist.team} size="md" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-on-surface truncate group-hover:text-secondary transition-colors">
                    {topAssist.player}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant truncate">{topAssist.team}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black font-mono text-secondary">{topAssist.assists}</span>
                  <span className="text-xs text-on-surface-variant ml-1 font-medium">Assists</span>
                </div>
                <span className="text-[11px] font-mono text-on-surface-variant">
                  {topAssist.assistsPerMatch} / match • {topAssist.games} apps
                </span>
              </div>
            </div>
          )}

          {/* Passing Leader */}
          {topPasser && (
            <div className="bg-surface-container-low border border-tertiary/25 hover:border-tertiary/50 rounded-2xl p-4 shadow-sm transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-tertiary font-mono mb-2">
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm">sync_alt</span>
                  PASS MASTER
                </span>
                <span className="text-[10px] text-on-surface-variant">Distribution</span>
              </div>
              <div className="flex items-center gap-3">
                <TeamCrestBadge teamName={topPasser.team} size="md" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-on-surface truncate group-hover:text-tertiary transition-colors">
                    {topPasser.player}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant truncate">{topPasser.team}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black font-mono text-tertiary">{topPasser.completedPasses}</span>
                  <span className="text-xs text-on-surface-variant ml-1 font-medium">Passes</span>
                </div>
                <span className="text-[11px] font-mono text-on-surface-variant">
                  {topPasser.passAccuracy} acc • {topPasser.games} apps
                </span>
              </div>
            </div>
          )}

          {/* Goalkeeping Leader */}
          {topKeeper && (
            <div className="bg-surface-container-low border border-blue-400/25 hover:border-blue-400/50 rounded-2xl p-4 shadow-sm transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-blue-400 font-mono mb-2">
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm">sports_handball</span>
                  TOP STOPPER
                </span>
                <span className="text-[10px] text-on-surface-variant">Zamora Race</span>
              </div>
              <div className="flex items-center gap-3">
                <TeamCrestBadge teamName={topKeeper.team} size="md" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-on-surface truncate group-hover:text-blue-300 transition-colors">
                    {topKeeper.player}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant truncate">{topKeeper.team}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black font-mono text-blue-400">{topKeeper.totalSaves}</span>
                  <span className="text-xs text-on-surface-variant ml-1 font-medium">Saves</span>
                </div>
                <span className="text-[11px] font-mono text-on-surface-variant">
                  {topKeeper.savePercentage} • {topKeeper.cleanSheets} clean sheets
                </span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Search Filter Banner */}
      {searchQuery && (
        <div className="flex items-center justify-between bg-surface-container-low border border-primary/20 px-4 py-3 rounded-xl text-xs text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">search</span>
            <span>
              Filtering statistics for <strong className="text-primary font-bold">"{searchQuery}"</strong>
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-mono">Preserving Top 10 rankings</span>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-error-container/40 border border-error/30 text-error p-4 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchStats(selectedSeason, selectedMatchday, true)}
            className="underline font-bold hover:text-white cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* ========================================================
          3. DISTINCT CARD-BASED METRIC SECTIONS
          Clean, modern layout with distinct sections for Goal Scorers,
          Assists, and other metrics.
      ======================================================== */}

      {/* --------------------------------------------------------
          SECTION A: GOAL SCORERS CARD (PICHICHI TROPHY RACE)
      -------------------------------------------------------- */}
      {(activeCategory === 'all' || activeCategory === 'scorers') && (
        <section className="bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-white/15">
          {/* Card Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center border border-amber-400/25 shadow-inner">
                <span className="material-symbols-outlined text-xl">sports_soccer</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-display">
                  Goal Scorers
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    Pichichi Race
                  </span>
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Top 10 finishers ranked by goals scored, efficiency and scoring rate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-mono text-on-surface-variant">
              <span>{isLiveSeason ? `Matchday ${selectedMatchday} Baseline` : `${selectedSeason} Campaign`}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-amber-400 font-bold">{filteredScorers.length} Players</span>
            </div>
          </div>

          {/* Leader Spotlight Banner inside the card */}
          {topScorer && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <TeamCrestBadge teamName={topScorer.team} size="lg" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center font-mono shadow-md">
                    1
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                      LEADER • GOLDEN BOOT PROJECTION
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-on-surface tracking-tight">
                    {topScorer.player}
                  </h3>
                  <p className="text-xs text-on-surface-variant">{topScorer.team}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Goals</span>
                  <span className="text-2xl font-black font-mono text-amber-300">{topScorer.goals}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Goals / Game</span>
                  <span className="text-lg font-bold font-mono text-secondary">{topScorer.goalsPerMatch}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Penalties</span>
                  <span className="text-lg font-bold font-mono text-on-surface">{topScorer.penaltyGoals ?? 0}</span>
                </div>
              </div>
            </div>
          )}

          {/* Scorers Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[10px] bg-white/[0.01]">
                  <th className="py-3 px-4 w-14 text-center">Rank</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-4 text-center">Apps</th>
                  <th className="py-3 px-4 text-center">Goals</th>
                  <th className="py-3 px-4 w-36 hidden md:table-cell">Scoring Volume</th>
                  <th className="py-3 px-4 text-center">Goals / Match</th>
                  <th className="py-3 px-4 text-right">Penalties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredScorers.slice(0, 10).map((row) => {
                  const barWidth = Math.max(8, (row.goals / maxGoals) * 100);
                  return (
                    <tr
                      key={row.player}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center">{renderRankBadge(row.rank)}</td>
                      <td className="py-3.5 px-4 font-semibold text-on-surface group-hover:text-primary transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px] sm:max-w-none">{row.player}</span>
                          {row.rank === 1 && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                              #1 PICHICHI
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onSelectClub && onSelectClub(row.teamCode)}
                          className="flex items-center gap-2 hover:underline cursor-pointer text-left"
                        >
                          <TeamCrestBadge teamName={row.team} size="sm" />
                          <span className="text-on-surface-variant group-hover:text-on-surface truncate max-w-[140px] sm:max-w-none">
                            {row.team}
                          </span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">
                        {row.games}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-primary">
                        {row.goals}
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5">
                          <div
                            className="bg-primary h-full rounded-full transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-secondary font-semibold">
                        {row.goalsPerMatch}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-on-surface-variant">
                        {row.penaltyGoals ?? 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------
          SECTION B: ASSISTS CARD (PLAYMAKER LEADERBOARD)
      -------------------------------------------------------- */}
      {(activeCategory === 'all' || activeCategory === 'assists') && (
        <section className="bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-white/15">
          {/* Card Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center border border-secondary/25 shadow-inner">
                <span className="material-symbols-outlined text-xl">handshake</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-display">
                  Assists & Playmaking
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/30">
                    Top Creators
                  </span>
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Top 10 playmakers ranked by key chances created and assists delivered
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-mono text-on-surface-variant">
              <span>{isLiveSeason ? `Matchday ${selectedMatchday} Baseline` : `${selectedSeason} Campaign`}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-secondary font-bold">{filteredAssists.length} Creators</span>
            </div>
          </div>

          {/* Playmakers Spotlight */}
          {topAssist && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <TeamCrestBadge teamName={topAssist.team} size="lg" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-slate-950 text-[10px] font-black flex items-center justify-center font-mono shadow-md">
                    1
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary">
                    TOP CREATOR • PLAYMAKER LEADER
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-on-surface tracking-tight">
                    {topAssist.player}
                  </h3>
                  <p className="text-xs text-on-surface-variant">{topAssist.team}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Assists</span>
                  <span className="text-2xl font-black font-mono text-secondary">{topAssist.assists}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Assists / Game</span>
                  <span className="text-lg font-bold font-mono text-on-surface">{topAssist.assistsPerMatch}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Matches</span>
                  <span className="text-lg font-bold font-mono text-on-surface-variant">{topAssist.games}</span>
                </div>
              </div>
            </div>
          )}

          {/* Assists Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[10px] bg-white/[0.01]">
                  <th className="py-3 px-4 w-14 text-center">Rank</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-4 text-center">Apps</th>
                  <th className="py-3 px-4 text-center">Assists</th>
                  <th className="py-3 px-4 w-36 hidden md:table-cell">Distribution Volume</th>
                  <th className="py-3 px-4 text-right">Assists / Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAssists.slice(0, 10).map((row) => {
                  const barWidth = Math.max(8, (row.assists / maxAssists) * 100);
                  return (
                    <tr
                      key={row.player}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center">{renderRankBadge(row.rank)}</td>
                      <td className="py-3.5 px-4 font-semibold text-on-surface group-hover:text-secondary transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px] sm:max-w-none">{row.player}</span>
                          {row.rank === 1 && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-secondary/20 text-secondary">
                              TOP CREATOR
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onSelectClub && onSelectClub(row.teamCode)}
                          className="flex items-center gap-2 hover:underline cursor-pointer text-left"
                        >
                          <TeamCrestBadge teamName={row.team} size="sm" />
                          <span className="text-on-surface-variant group-hover:text-on-surface truncate max-w-[140px] sm:max-w-none">
                            {row.team}
                          </span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">
                        {row.games}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-secondary">
                        {row.assists}
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5">
                          <div
                            className="bg-secondary h-full rounded-full transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-on-surface font-semibold">
                        {row.assistsPerMatch}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------
          SECTION C: PASSING MASTERY CARD (DISTRIBUTION LEADERBOARD)
      -------------------------------------------------------- */}
      {(activeCategory === 'all' || activeCategory === 'passes') && (
        <section className="bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-white/15">
          {/* Card Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary/15 text-tertiary flex items-center justify-center border border-tertiary/25 shadow-inner">
                <span className="material-symbols-outlined text-xl">sync_alt</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-display">
                  Passing Mastery & Distribution
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/30">
                    Midfield Engine
                  </span>
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Top 10 playmakers and defenders ranked by completed passes, total distribution volume and completion accuracy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-mono text-on-surface-variant">
              <span>{isLiveSeason ? `Matchday ${selectedMatchday} Baseline` : `${selectedSeason} Campaign`}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-tertiary font-bold">{filteredPasses.length} Passers</span>
            </div>
          </div>

          {/* Pass Master Spotlight */}
          {topPasser && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-tertiary/10 via-tertiary/5 to-transparent border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <TeamCrestBadge teamName={topPasser.team} size="lg" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-tertiary text-slate-950 text-[10px] font-black flex items-center justify-center font-mono shadow-md">
                    1
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-tertiary">
                    DISTRIBUTION LEADER • PASS MASTER
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-on-surface tracking-tight">
                    {topPasser.player}
                  </h3>
                  <p className="text-xs text-on-surface-variant">{topPasser.team}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Completed Passes</span>
                  <span className="text-2xl font-black font-mono text-tertiary">{topPasser.completedPasses.toLocaleString()}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Pass Accuracy</span>
                  <span className="text-lg font-bold font-mono text-secondary">{topPasser.passAccuracy}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Total Attempted</span>
                  <span className="text-lg font-bold font-mono text-on-surface-variant">{topPasser.totalPasses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Passes Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[10px] bg-white/[0.01]">
                  <th className="py-3 px-4 w-14 text-center">Rank</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-4 text-center">Apps</th>
                  <th className="py-3 px-4 text-center">Completed</th>
                  <th className="py-3 px-4 w-36 hidden md:table-cell">Distribution Volume</th>
                  <th className="py-3 px-4 text-center">Total Passes</th>
                  <th className="py-3 px-4 text-right">Pass Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPasses.slice(0, 10).map((row) => {
                  const barWidth = Math.max(8, (row.completedPasses / maxPasses) * 100);
                  return (
                    <tr
                      key={row.player}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center">{renderRankBadge(row.rank)}</td>
                      <td className="py-3.5 px-4 font-semibold text-on-surface group-hover:text-tertiary transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px] sm:max-w-none">{row.player}</span>
                          {row.rank === 1 && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-tertiary/20 text-tertiary">
                              PASS MASTER
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onSelectClub && onSelectClub(row.teamCode)}
                          className="flex items-center gap-2 hover:underline cursor-pointer text-left"
                        >
                          <TeamCrestBadge teamName={row.team} size="sm" />
                          <span className="text-on-surface-variant group-hover:text-on-surface truncate max-w-[140px] sm:max-w-none">
                            {row.team}
                          </span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">
                        {row.games}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-tertiary">
                        {row.completedPasses.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5">
                          <div
                            className="bg-tertiary h-full rounded-full transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">
                        {row.totalPasses.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-secondary font-bold">
                        {row.passAccuracy}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------
          SECTION D: GOALKEEPING CARD (ZAMORA TROPHY RACE)
      -------------------------------------------------------- */}
      {(activeCategory === 'all' || activeCategory === 'saves') && (
        <section className="bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-white/15">
          {/* Card Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/25 shadow-inner">
                <span className="material-symbols-outlined text-xl">sports_handball</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-display">
                  Goalkeeping & Saves
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                    Zamora Race
                  </span>
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Top 10 shot-stoppers ranked by total saves, clean sheets and goals conceded per match
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-mono text-on-surface-variant">
              <span>{isLiveSeason ? `Matchday ${selectedMatchday} Baseline` : `${selectedSeason} Campaign`}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-blue-400 font-bold">{filteredSaves.length} Keepers</span>
            </div>
          </div>

          {/* Keeper Spotlight */}
          {topKeeper && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <TeamCrestBadge teamName={topKeeper.team} size="lg" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-400 text-slate-950 text-[10px] font-black flex items-center justify-center font-mono shadow-md">
                    1
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
                    TOP STOPPER • ZAMORA TROPHY PROJECTION
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-on-surface tracking-tight">
                    {topKeeper.player}
                  </h3>
                  <p className="text-xs text-on-surface-variant">{topKeeper.team}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Total Saves</span>
                  <span className="text-2xl font-black font-mono text-blue-400">{topKeeper.totalSaves}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Clean Sheets</span>
                  <span className="text-lg font-bold font-mono text-secondary">{topKeeper.cleanSheets}</span>
                </div>
                <div className="text-center sm:text-right border-l border-white/10 pl-4 sm:pl-6">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Save Metric</span>
                  <span className="text-lg font-bold font-mono text-on-surface">{topKeeper.savePercentage}</span>
                </div>
              </div>
            </div>
          )}

          {/* Saves Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[10px] bg-white/[0.01]">
                  <th className="py-3 px-4 w-14 text-center">Rank</th>
                  <th className="py-3 px-4">Goalkeeper</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-4 text-center">Apps</th>
                  <th className="py-3 px-4 text-center">Saves</th>
                  <th className="py-3 px-4 w-36 hidden md:table-cell">Shot Stopping Volume</th>
                  <th className="py-3 px-4 text-center">Clean Sheets</th>
                  <th className="py-3 px-4 text-center">Conceded</th>
                  <th className="py-3 px-4 text-right">Save Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSaves.slice(0, 10).map((row) => {
                  const barWidth = Math.max(8, (row.totalSaves / maxSaves) * 100);
                  return (
                    <tr
                      key={row.player}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center">{renderRankBadge(row.rank)}</td>
                      <td className="py-3.5 px-4 font-semibold text-on-surface group-hover:text-blue-400 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px] sm:max-w-none">{row.player}</span>
                          {row.rank === 1 && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                              TOP STOPPER
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onSelectClub && onSelectClub(row.teamCode)}
                          className="flex items-center gap-2 hover:underline cursor-pointer text-left"
                        >
                          <TeamCrestBadge teamName={row.team} size="sm" />
                          <span className="text-on-surface-variant group-hover:text-on-surface truncate max-w-[140px] sm:max-w-none">
                            {row.team}
                          </span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">
                        {row.games}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-blue-400">
                        {row.totalSaves}
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5">
                          <div
                            className="bg-blue-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-secondary">
                        {row.cleanSheets}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">
                        {row.goalsConceded}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-tertiary font-semibold">
                        {row.savePercentage}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------
          SECTION E: DISCIPLINARY & FAIR PLAY CARD
      -------------------------------------------------------- */}
      {(activeCategory === 'all' || activeCategory === 'discipline') && (
        <section className="bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-white/15">
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/15 text-yellow-400 flex items-center justify-center border border-yellow-400/25">
                <span className="material-symbols-outlined text-xl">warning</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-display">
                  Disciplinary & Cautions
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-on-surface-variant border border-white/10">
                    Fair Play
                  </span>
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Disciplinary cautions, foul records, direct ejections and second yellow dismissals
                </p>
              </div>
            </div>

            {/* Sub-tab toggle within Disciplinary card */}
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setDisciplineTab('yellow')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  disciplineTab === 'yellow'
                    ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="w-2 h-3 bg-yellow-400 rounded-xs inline-block" />
                <span>Yellow Cards (10)</span>
              </button>
              <button
                onClick={() => setDisciplineTab('red')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  disciplineTab === 'red'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="w-2 h-3 bg-red-600 rounded-xs inline-block" />
                <span>Red Cards (10)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {disciplineTab === 'yellow' ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 w-14 text-center">Rank</th>
                    <th className="py-3 px-4">Player</th>
                    <th className="py-3 px-4">Club</th>
                    <th className="py-3 px-4 text-center">Apps</th>
                    <th className="py-3 px-4 text-center">Yellow Cards</th>
                    <th className="py-3 px-4 text-right">Fouls Committed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredYellows.slice(0, 10).map((row) => (
                    <tr key={row.player} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-3.5 px-4 text-center">{renderRankBadge(row.rank)}</td>
                      <td className="py-3.5 px-4 font-semibold text-on-surface group-hover:text-yellow-400 transition-colors">
                        <span className="truncate max-w-[200px] sm:max-w-none block">{row.player}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onSelectClub && onSelectClub(row.teamCode)}
                          className="flex items-center gap-2 hover:underline cursor-pointer"
                        >
                          <TeamCrestBadge teamName={row.team} size="sm" />
                          <span className="text-on-surface-variant truncate max-w-[130px] sm:max-w-none">
                            {row.team}
                          </span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">{row.games}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-yellow-400">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2.5 h-3.5 bg-yellow-400 rounded-xs inline-block shadow-sm" />
                          {row.cards}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-on-surface-variant">{row.fouls ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 w-14 text-center">Rank</th>
                    <th className="py-3 px-4">Player</th>
                    <th className="py-3 px-4">Club</th>
                    <th className="py-3 px-4 text-center">Apps</th>
                    <th className="py-3 px-4 text-center">Red Cards</th>
                    <th className="py-3 px-4 text-center">Direct Reds</th>
                    <th className="py-3 px-4 text-right">Second Yellows</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredReds.slice(0, 10).map((row) => (
                    <tr key={row.player} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="py-3.5 px-4 text-center">{renderRankBadge(row.rank)}</td>
                      <td className="py-3.5 px-4 font-semibold text-on-surface group-hover:text-error transition-colors">
                        <span className="truncate max-w-[200px] sm:max-w-none block">{row.player}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onSelectClub && onSelectClub(row.teamCode)}
                          className="flex items-center gap-2 hover:underline cursor-pointer"
                        >
                          <TeamCrestBadge teamName={row.team} size="sm" />
                          <span className="text-on-surface-variant truncate max-w-[130px] sm:max-w-none">
                            {row.team}
                          </span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">{row.games}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-sm text-error">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2.5 h-3.5 bg-red-600 rounded-xs inline-block shadow-sm" />
                          {row.cards}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">{row.directReds ?? 0}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-on-surface-variant">{row.secondYellows ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {/* --------------------------------------------------------
          SECTION F: TEAM AGGREGATE PERFORMANCE CARD
      -------------------------------------------------------- */}
      {(activeCategory === 'all' || activeCategory === 'teams') && (
        <section className="bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-white/15">
          <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center border border-primary/25">
                <span className="material-symbols-outlined text-xl">groups</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2 font-display">
                  Club Aggregate Statistics
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                    All 20 Clubs
                  </span>
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Cumulative scoring volume, defensive resilience, shots and foul totals
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-on-surface-variant">
              {isLiveSeason ? `Matchday ${selectedMatchday} Aggregates` : `${selectedSeason} Campaign Final`}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-on-surface-variant font-mono uppercase tracking-wider text-[10px] bg-white/[0.01]">
                  <th className="py-3 px-4 w-14 text-center">Rank</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-4 text-center">Matches</th>
                  <th className="py-3 px-4 text-center">Goals For</th>
                  <th className="py-3 px-4 text-center">Conceded</th>
                  <th className="py-3 px-4 text-center">Shots on Target</th>
                  <th className="py-3 px-4 text-center">Fouls</th>
                  <th className="py-3 px-4 text-center">Yellows</th>
                  <th className="py-3 px-4 text-right">Reds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTeamStats.slice(0, 20).map((row) => (
                  <tr key={row.teamCode} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3.5 px-4 text-center">{renderRankBadge(row.rank)}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onSelectClub && onSelectClub(row.teamCode)}
                        className="flex items-center gap-2.5 hover:underline cursor-pointer text-left"
                      >
                        <TeamCrestBadge teamName={row.team} size="sm" />
                        <div>
                          <span className="font-semibold text-on-surface group-hover:text-primary transition-colors block">
                            {row.team}
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-mono">{row.teamCode}</span>
                        </div>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">{row.games}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-primary">{row.goalsScored}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-error">{row.goalsConceded}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-secondary font-semibold">{row.shotsOnTarget}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant">{row.fouls}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-yellow-400 font-medium">{row.yellowCards}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-error font-medium">{row.redCards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ========================================================
          4. CLEAN TELEMETRY FOOTER & CACHING STATUS
      ======================================================== */}
      <footer className="border-t border-white/10 pt-5 text-[11px] text-on-surface-variant flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-sm">verified</span>
          <span>
            {isLiveSeason
              ? 'LaLiga EA SPORTS Telemetry • Matchday 7 Official Baseline'
              : `LaLiga Official Archive • Concluded Campaign ${selectedSeason}`}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[10px]">
          <span>Matches Analyzed: {statsData?.totalMatches ?? (isLiveSeason ? 69 : 380)}</span>
          <span className="text-white/20">•</span>
          <span>Re-render Guard: Active</span>
          {lastRefreshed && (
            <>
              <span className="text-white/20">•</span>
              <span>Last Refreshed: {lastRefreshed}</span>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};
