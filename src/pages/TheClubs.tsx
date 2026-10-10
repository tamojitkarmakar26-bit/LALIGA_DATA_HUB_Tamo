import React, { useState, useEffect, useMemo } from 'react';
import { getAllClubs, getClubById, ClubDetails, ClubPlayer } from '../data/clubsData';
import { TeamCrestBadge } from '../components/TeamCrestBadge';

interface TheClubsProps {
  initialClubId?: string;
  searchQuery?: string;
  onNavigateClub?: (clubId: string) => void;
}

const PlayerAvatar: React.FC<{ player: ClubPlayer; size?: string; textSize?: string }> = ({
  player,
  size = 'w-12 h-12',
  textSize = 'text-[11px]',
}) => {
  const [imgError, setImgError] = useState(false);
  const initials = player.name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const jNum = player.jerseyNumber ?? parseInt(player.num, 10);

  if (imgError || !player.img) {
    return (
      <div
        className={`${size} rounded-full bg-surface-container-high border border-surface-container-highest flex flex-col items-center justify-center shrink-0 shadow-inner`}
        title={`${player.name} (#${jNum})`}
      >
        <span className={`${textSize} font-bold text-on-surface font-tabular-data leading-none`}>
          #{jNum}
        </span>
        <span className="text-[8px] font-semibold text-on-surface-variant leading-none mt-0.5">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      alt={player.name}
      className={`${size} rounded-full object-cover shrink-0 ring-1 ring-surface-container-high`}
      src={player.img}
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

export const TheClubs: React.FC<TheClubsProps> = ({
  initialClubId = 'FCB',
  searchQuery = '',
  onNavigateClub,
}) => {
  const allClubs = useMemo(() => getAllClubs(), []);
  const [selectedClubId, setSelectedClubId] = useState<string>(initialClubId);
  const [tierFilter, setTierFilter] = useState<'all' | 'ucl' | 'uefa'>('all');
  const [squadTab, setSquadTab] = useState<'all' | 'gk' | 'def' | 'mid' | 'fwd'>('all');
  const [squadSearch, setSquadSearch] = useState<string>('');
  const [squadSort, setSquadSort] = useState<'index' | 'num-asc' | 'num-desc' | 'name' | 'role'>('index');
  const [squadView, setSquadView] = useState<'grid' | 'table'>('grid');
  const [localSearch, setLocalSearch] = useState<string>(searchQuery);
  const [telemetryData, setTelemetryData] = useState<any>(null);
  const [loadingTelemetry, setLoadingTelemetry] = useState(false);

  // Sync external search query
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Sync initial club ID
  useEffect(() => {
    if (initialClubId) {
      setSelectedClubId(initialClubId);
    }
  }, [initialClubId]);

  const activeClub: ClubDetails = useMemo(() => {
    return getClubById(selectedClubId) || allClubs[0];
  }, [selectedClubId, allClubs]);

  // Fetch real telemetry and match analytics from backend for the selected club
  useEffect(() => {
    let isMounted = true;
    async function fetchClubTelemetry() {
      if (!activeClub) return;
      setLoadingTelemetry(true);
      try {
        const res = await fetch(`/api/dataset/telemetry?team=${encodeURIComponent(activeClub.name)}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted) setTelemetryData(json.telemetry);
        } else {
          // Try with short name
          const shortName = activeClub.name.replace(/^(FC |RC |UD |CD |CA |Real )/, '');
          const altRes = await fetch(`/api/dataset/telemetry?team=${encodeURIComponent(shortName)}`);
          if (altRes.ok) {
            const altJson = await altRes.json();
            if (isMounted) setTelemetryData(altJson.telemetry);
          } else if (isMounted) {
            setTelemetryData(null);
          }
        }
      } catch (err) {
        if (isMounted) setTelemetryData(null);
      } finally {
        if (isMounted) setLoadingTelemetry(false);
      }
    }

    fetchClubTelemetry();
    return () => {
      isMounted = false;
    };
  }, [activeClub]);

  // Filter clubs based on tier and search
  const filteredClubs = useMemo(() => {
    return allClubs.filter((c) => {
      // Tier filter
      if (tierFilter === 'ucl' && c.tier !== 'ucl') return false;
      if (tierFilter === 'uefa' && c.tier !== 'uel' && c.tier !== 'uecl') return false;

      // Search filter across name, fullName, city, stadium
      if (localSearch.trim()) {
        const term = localSearch.toLowerCase().trim();
        const matchesName = c.name.toLowerCase().includes(term);
        const matchesFullName = c.fullName.toLowerCase().includes(term);
        const matchesCode = c.code.toLowerCase().includes(term);
        const matchesCity = c.city.toLowerCase().includes(term);
        const matchesStadium = c.stadium.name.toLowerCase().includes(term);
        return matchesName || matchesFullName || matchesCode || matchesCity || matchesStadium;
      }
      return true;
    });
  }, [allClubs, tierFilter, localSearch]);

  // Dynamic position counts for the active club
  const positionCounts = useMemo(() => {
    if (!activeClub?.squad) return { all: 0, gk: 0, def: 0, mid: 0, fwd: 0 };
    return {
      all: activeClub.squad.length,
      gk: activeClub.squad.filter((p) => p.category === 'gk').length,
      def: activeClub.squad.filter((p) => p.category === 'def').length,
      mid: activeClub.squad.filter((p) => p.category === 'mid').length,
      fwd: activeClub.squad.filter((p) => p.category === 'fwd').length,
    };
  }, [activeClub]);

  // Total estimated squad market value
  const totalSquadValue = useMemo(() => {
    if (!activeClub?.squad) return '€0.0M';
    let totalM = 0;
    activeClub.squad.forEach((p) => {
      const match = p.val?.match(/€([\d.]+)M/);
      if (match) {
        totalM += parseFloat(match[1]);
      }
    });
    return `€${totalM.toFixed(1)}M`;
  }, [activeClub]);

  const filteredSquad = useMemo(() => {
    if (!activeClub?.squad) return [];
    let list = [...activeClub.squad];

    // Filter by position tab
    if (squadTab !== 'all') {
      list = list.filter((p) => p.category === squadTab);
    }

    // Filter by player search
    if (squadSearch.trim()) {
      const q = squadSearch.toLowerCase().trim();
      list = list.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesRole = p.role.toLowerCase().includes(q);
        const matchesNum = String(p.jerseyNumber ?? p.num).includes(q) || `#${p.jerseyNumber ?? p.num}`.includes(q);
        const matchesStat = p.statLabel.toLowerCase().includes(q) || p.statVal.toLowerCase().includes(q);
        return matchesName || matchesRole || matchesNum || matchesStat;
      });
    }

    // Sort squad
    const roleRank: Record<string, number> = { Goalkeeper: 1, Defender: 2, Midfielder: 3, Attacker: 4 };
    list.sort((a, b) => {
      if (squadSort === 'index') {
        return (a.squadIndex ?? 99) - (b.squadIndex ?? 99);
      }
      if (squadSort === 'num-asc') {
        const numA = a.jerseyNumber ?? (parseInt(a.num, 10) || 99);
        const numB = b.jerseyNumber ?? (parseInt(b.num, 10) || 99);
        return numA - numB;
      }
      if (squadSort === 'num-desc') {
        const numA = a.jerseyNumber ?? (parseInt(a.num, 10) || 99);
        const numB = b.jerseyNumber ?? (parseInt(b.num, 10) || 99);
        return numB - numA;
      }
      if (squadSort === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (squadSort === 'role') {
        const rA = roleRank[a.role] ?? 9;
        const rB = roleRank[b.role] ?? 9;
        if (rA !== rB) return rA - rB;
        const numA = a.jerseyNumber ?? (parseInt(a.num, 10) || 99);
        const numB = b.jerseyNumber ?? (parseInt(b.num, 10) || 99);
        return numA - numB;
      }
      return 0;
    });

    return list;
  }, [activeClub, squadTab, squadSearch, squadSort]);

  const downloadSquadCSV = () => {
    if (!activeClub?.squad) return;
    const headers = 'Jersey_Number,Player_Name,Role,Category,Squad_Index,Player_ID,Coach_Name,Team_Name,Market_Value,Stat_Metric\n';
    const rows = activeClub.squad
      .map((p) => {
        const jNum = p.jerseyNumber ?? parseInt(p.num, 10);
        return `"${jNum}","${p.name}","${p.role}","${p.category}","${p.squadIndex ?? ''}","${p.playerId ?? ''}","${p.coachName ?? activeClub.manager}","${p.teamName ?? activeClub.name}","${p.val}","${p.statLabel}: ${p.statVal}"`;
      })
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeClub.code}_Squad_2026_27.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectClub = (id: string) => {
    setSelectedClubId(id);
    if (onNavigateClub) {
      onNavigateClub(id);
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* 20 Clubs Quick Selector Ribbon */}
      <section className="flex flex-col gap-space-sm pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface">LaLiga Clubs Directory</span>
            <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary">
              20 Top Flight
            </span>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 rounded-xl bg-surface-container-low shadow-sm">
              <button
                onClick={() => setTierFilter('all')}
                className={`px-3 py-1 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer ${
                  tierFilter === 'all'
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                All Clubs (20)
              </button>
              <button
                onClick={() => setTierFilter('ucl')}
                className={`px-3 py-1 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer ${
                  tierFilter === 'ucl'
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                Champions League (5)
              </button>
              <button
                onClick={() => setTierFilter('uefa')}
                className={`px-3 py-1 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer ${
                  tierFilter === 'uefa'
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                Europa / Conf (3)
              </button>
            </div>
          </div>
        </div>

        {/* Local Search Input within Clubs Directory */}
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg pointer-events-none">
            filter_alt
          </span>
          <input
            className="w-full h-10 pl-9 pr-9 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-surface-container"
            placeholder="Filter clubs by name, stadium, or city..."
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="absolute right-2.5 top-2.5 p-0.5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              type="button"
              title="Clear filter"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>

        {/* 20 Clubs Scrollable Carousel / Grid Selector */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 p-2 rounded-xl bg-surface-container-low">
            {filteredClubs.map((club) => {
              const isSelected = club.id === activeClub.id;
              return (
                <button
                  key={club.id}
                  onClick={() => handleSelectClub(club.id)}
                  type="button"
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg transition-all cursor-pointer text-center group ${
                    isSelected
                      ? 'bg-surface-container-high text-on-surface font-bold ring-2 ring-primary shadow-md'
                      : 'hover:bg-surface-container/70 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <div className="relative mb-1 flex items-center justify-center">
                    <TeamCrestBadge teamName={club.name} size="md" />
                    {club.tier === 'ucl' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary border border-surface" title="UEFA Champions League"></span>
                    )}
                  </div>
                  <span className="font-label-caps text-[11px] truncate w-full text-center">{club.name}</span>
                  <span className="text-[9px] text-on-surface-variant truncate w-full">{club.stadium.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-surface-container-low text-center flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
            <p className="font-body-md text-body-md text-on-surface font-medium">
              No clubs match &quot;{localSearch}&quot;
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Try adjusting your search terms or clearing the filter.
            </p>
            <button
              onClick={() => {
                setLocalSearch('');
                setTierFilter('all');
              }}
              className="mt-2 px-4 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-body-sm font-semibold hover:bg-surface-container-highest cursor-pointer"
              type="button"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Main Club Dossier View */}
      <section className="relative rounded-2xl overflow-hidden bg-surface-container shadow-2xl border border-surface-container-high">
        {/* Club Color Gradient Banner */}
        <div
          className="h-32 sm:h-44 w-full relative flex items-end p-6"
          style={{
            background: `linear-gradient(135deg, ${activeClub.primaryColor} 0%, #051424 75%, ${activeClub.secondaryColor} 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

          <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 w-full">
            <div className="flex items-center gap-4">
              <TeamCrestBadge teamName={activeClub.name} size="xl" className="shadow-2xl" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-headline-lg text-headline-lg sm:text-3xl text-white font-bold tracking-tight">
                    {activeClub.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-label-caps text-label-caps uppercase backdrop-blur-md">
                    Est. {activeClub.founded}
                  </span>
                </div>
                <p className="text-white/80 font-body-sm text-body-sm mt-0.5">
                  {activeClub.city} • Home of {activeClub.nicknames.join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-black/40 text-white text-xs backdrop-blur-md border border-white/10">
                President: <strong className="font-semibold">{activeClub.president}</strong>
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/40 text-white text-xs backdrop-blur-md border border-white/10">
                Manager: <strong className="font-semibold">{activeClub.manager}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Dossier Content Tabs & Telemetry Strip */}
        <div className="p-space-lg flex flex-col gap-space-lg">
          {/* Motto and Key Identity */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface-container-low border border-surface-container-high/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-2xl">format_quote</span>
              <span className="font-body-md text-body-md italic text-on-surface">
                &ldquo;{activeClub.motto}&rdquo;
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-on-surface-variant font-label-caps uppercase">Club Colors:</span>
              <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: activeClub.primaryColor }}></span>
              <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: activeClub.secondaryColor }}></span>
            </div>
          </div>

          {/* Real Match Telemetry Ingested from Kaggle CSV */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-xl">sensors</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Historical Match Telemetry & Analytics
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant font-label-caps uppercase">
                Source: Kaggle LaLiga Telemetry Dataset
              </span>
            </div>

            {loadingTelemetry ? (
              <div className="p-8 rounded-xl bg-surface-container-low text-center flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-tertiary/20 border-t-tertiary rounded-full animate-spin"></div>
                <span className="text-body-sm text-on-surface-variant">Computing club telemetry averages...</span>
              </div>
            ) : telemetryData ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Matches</span>
                  <span className="font-tabular-data text-xl font-bold text-on-surface">
                    {telemetryData.matchesRecorded}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Recorded</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Win Rate</span>
                  <span className="font-tabular-data text-xl font-bold text-tertiary">
                    {telemetryData.winRatePct}%
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{telemetryData.wins} Wins</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Clean Sheets</span>
                  <span className="font-tabular-data text-xl font-bold text-secondary">
                    {telemetryData.cleanSheets}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{telemetryData.cleanSheetPct}% of games</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Avg Goals</span>
                  <span className="font-tabular-data text-xl font-bold text-primary">
                    {telemetryData.avgGoalsScored}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Per match</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Goals Conceded</span>
                  <span className="font-tabular-data text-xl font-bold text-on-surface">
                    {telemetryData.avgGoalsConceded}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Per match</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Avg Shots</span>
                  <span className="font-tabular-data text-xl font-bold text-on-surface">
                    {telemetryData.avgShots}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{telemetryData.avgShotsOnTarget} on target</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Shot Accuracy</span>
                  <span className="font-tabular-data text-xl font-bold text-tertiary">
                    {telemetryData.shotAccuracyPct}%
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Target ratio</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="text-[11px] text-on-surface-variant uppercase font-label-caps">Discipline</span>
                  <span className="font-tabular-data text-xl font-bold text-on-surface">
                    {telemetryData.totalYellows}🟨 {telemetryData.totalReds}🟥
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{telemetryData.avgFouls} fouls/match</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-surface-container-low text-body-sm text-on-surface-variant">
                Historical telemetry ready. Showing club official database profiles.
              </div>
            )}
          </div>

          {/* Trophy Cabinet & Stadium Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
            {/* Trophy Cabinet (7/12) */}
            <div className="lg:col-span-7 flex flex-col gap-space-sm p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-xl">military_tech</span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Historical Trophy Cabinet</h4>
                </div>
                <span className="font-label-caps text-label-caps text-secondary font-bold">
                  {activeClub.trophies.reduce((a, b) => a + b.count, 0)} Major Honours
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeClub.trophies.map((trophy, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-surface-container/60 flex items-start gap-3">
                    <span className="material-symbols-outlined text-2xl text-secondary shrink-0 mt-0.5">
                      {trophy.icon}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-score-display text-2xl font-bold text-on-surface">
                          {trophy.count}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate">
                          {trophy.name}
                        </span>
                      </div>
                      {trophy.years && (
                        <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">{trophy.years}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stadium Profile (5/12) */}
            <div className="lg:col-span-5 flex flex-col gap-3 p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-xl">stadium</span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Home Stadium Profile</h4>
                </div>
                <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                  Inaugurated {activeClub.stadium.inaugurated}
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <div className="relative h-32 rounded-lg overflow-hidden bg-surface-container-lowest">
                  <img
                    alt={activeClub.stadium.name}
                    className="w-full h-full object-cover"
                    src={activeClub.stadium.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="font-headline-sm text-sm text-white font-bold">{activeClub.stadium.name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-body-sm font-body-sm pt-1">
                  <div className="p-2 rounded bg-surface-container/60 flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-label-caps">Capacity</span>
                    <span className="font-tabular-data text-base font-bold text-on-surface">
                      {activeClub.stadium.capacity.toLocaleString()} seats
                    </span>
                  </div>
                  <div className="p-2 rounded bg-surface-container/60 flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-label-caps">Dimensions</span>
                    <span className="font-tabular-data text-base font-bold text-on-surface">
                      {activeClub.stadium.pitchSize}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Squad Roster Section */}
          <div className="flex flex-col gap-space-sm">
            {/* Squad Header and Quick Metrics Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Full Squad Roster
                    </h3>
                    <span className="font-label-caps text-xs px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-bold">
                      {activeClub.squad.length} Registered
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant flex items-center gap-2 mt-0.5">
                    <span>Manager: <strong className="text-on-surface">{activeClub.manager}</strong></span>
                    <span>•</span>
                    <span>Dataset: <span className="font-mono text-[11px] text-tertiary">laliga_squads_2026_27.csv</span></span>
                  </span>
                </div>
              </div>

              {/* Quick Actions & CSV Export */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={downloadSquadCSV}
                  className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs text-on-surface font-semibold flex items-center gap-1.5 border border-surface-container-high/60 transition-all cursor-pointer shadow-sm"
                  title="Download complete squad dataset for this club as CSV"
                  type="button"
                >
                  <span className="material-symbols-outlined text-base text-secondary">download</span>
                  Export Squad CSV
                </button>
              </div>
            </div>

            {/* Squad Stats Overview Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40 text-xs">
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-[11px] font-label-caps uppercase">Total Squad Size</span>
                <span className="font-headline-sm text-base text-on-surface font-bold mt-0.5">
                  {activeClub.squad.length} Players
                </span>
                <span className="text-[10px] text-on-surface-variant font-tabular-data">2026/27 Primera División</span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-[11px] font-label-caps uppercase">Position Balance</span>
                <span className="font-body-sm text-xs text-on-surface font-semibold mt-0.5">
                  {positionCounts.gk} GK • {positionCounts.def} DEF
                </span>
                <span className="text-[10px] text-on-surface-variant">
                  {positionCounts.mid} MID • {positionCounts.fwd} FWD
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-[11px] font-label-caps uppercase">Est. Squad Valuation</span>
                <span className="font-headline-sm text-base text-secondary font-bold font-tabular-data mt-0.5">
                  {totalSquadValue}
                </span>
                <span className="text-[10px] text-on-surface-variant">Market appraisal</span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-[11px] font-label-caps uppercase">Head Coach</span>
                <span className="font-body-sm text-xs text-primary font-bold truncate mt-0.5">
                  {activeClub.manager}
                </span>
                <span className="text-[10px] text-on-surface-variant">Tactical lead</span>
              </div>
            </div>

            {/* Interactive Filters & Controls Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
              {/* Category Filter Tabs */}
              <div className="inline-flex p-1 rounded-xl bg-surface-container-low shadow-sm overflow-x-auto max-w-full">
                <button
                  onClick={() => setSquadTab('all')}
                  className={`px-3 py-1.5 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    squadTab === 'all'
                      ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span>All</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-[10px] font-tabular-data">
                    {positionCounts.all}
                  </span>
                </button>
                <button
                  onClick={() => setSquadTab('gk')}
                  className={`px-3 py-1.5 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    squadTab === 'gk'
                      ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span>Goalkeepers</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-tabular-data">
                    {positionCounts.gk}
                  </span>
                </button>
                <button
                  onClick={() => setSquadTab('def')}
                  className={`px-3 py-1.5 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    squadTab === 'def'
                      ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span>Defenders</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-tabular-data">
                    {positionCounts.def}
                  </span>
                </button>
                <button
                  onClick={() => setSquadTab('mid')}
                  className={`px-3 py-1.5 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    squadTab === 'mid'
                      ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span>Midfielders</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-tabular-data">
                    {positionCounts.mid}
                  </span>
                </button>
                <button
                  onClick={() => setSquadTab('fwd')}
                  className={`px-3 py-1.5 rounded-lg font-label-badge text-label-badge transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    squadTab === 'fwd'
                      ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span>Forwards</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-tabular-data">
                    {positionCounts.fwd}
                  </span>
                </button>
              </div>

              {/* Search, Sort, and View Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search Player Input */}
                <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                    search
                  </span>
                  <input
                    type="text"
                    value={squadSearch}
                    onChange={(e) => setSquadSearch(e.target.value)}
                    placeholder="Filter player or jersey #..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary transition-all"
                  />
                  {squadSearch && (
                    <button
                      onClick={() => setSquadSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs"
                      type="button"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1.5 rounded-xl border border-surface-container-high/60">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">sort</span>
                  <select
                    value={squadSort}
                    onChange={(e) => setSquadSort(e.target.value as any)}
                    className="bg-transparent text-xs text-on-surface focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="index" className="bg-surface-container text-on-surface">Squad Order</option>
                    <option value="num-asc" className="bg-surface-container text-on-surface">Jersey # (1 → 25)</option>
                    <option value="num-desc" className="bg-surface-container text-on-surface">Jersey # (25 → 1)</option>
                    <option value="name" className="bg-surface-container text-on-surface">Name (A-Z)</option>
                    <option value="role" className="bg-surface-container text-on-surface">Position (GK → ATT)</option>
                  </select>
                </div>

                {/* View Mode Switcher */}
                <div className="inline-flex p-1 rounded-xl bg-surface-container-low border border-surface-container-high/60">
                  <button
                    onClick={() => setSquadView('grid')}
                    className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      squadView === 'grid'
                        ? 'bg-surface-container-high text-on-surface shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    title="Card Grid View"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base block">grid_view</span>
                  </button>
                  <button
                    onClick={() => setSquadView('table')}
                    className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      squadView === 'table'
                        ? 'bg-surface-container-high text-on-surface shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    title="Roster Table View"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base block">table_rows</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Squad List Render */}
            {filteredSquad.length === 0 ? (
              <div className="p-8 rounded-xl bg-surface-container-low text-center flex flex-col items-center justify-center gap-2 border border-surface-container-high/40">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">person_search</span>
                <p className="text-body-sm text-on-surface font-semibold">No players found matching your criteria</p>
                <p className="text-xs text-on-surface-variant">Try clearing the search filter or switching position tabs.</p>
                {squadSearch && (
                  <button
                    onClick={() => setSquadSearch('')}
                    className="mt-2 px-3 py-1 rounded-lg bg-surface-container-high text-xs text-primary font-semibold cursor-pointer"
                    type="button"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : squadView === 'grid' ? (
              /* Squad Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-sm pt-2">
                {filteredSquad.map((player: ClubPlayer, idx: number) => {
                  const jNum = player.jerseyNumber ?? parseInt(player.num, 10);
                  const roleBadgeClass =
                    player.role === 'Goalkeeper'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : player.role === 'Defender'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : player.role === 'Midfielder'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20';

                  return (
                    <div
                      key={player.playerId ?? idx}
                      className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between gap-3 shadow-sm border border-surface-container-high/30 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Jersey Number Badge */}
                        <div className="relative shrink-0">
                          <PlayerAvatar player={player} size="w-12 h-12" />
                          <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-surface-container-highest text-on-surface font-tabular-data text-[10px] font-black border border-surface-container shadow-sm">
                            #{jNum}
                          </div>
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-headline-sm text-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                              {player.name}
                            </span>
                            {player.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-primary-container text-on-primary-container font-label-caps text-[9px] uppercase font-bold">
                                {player.badge}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${roleBadgeClass}`}>
                              {player.role}
                            </span>
                            {player.squadIndex && (
                              <span className="text-[10px] text-on-surface-variant font-mono">
                                Pos #{player.squadIndex}
                              </span>
                            )}
                          </div>

                          <span className="text-xs text-tertiary font-tabular-data mt-1 truncate">
                            {player.statLabel}: <strong>{player.statVal}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0 pl-2">
                        <span className="font-tabular-data text-xs font-bold text-secondary">{player.val}</span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-label-caps">Est. Value</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Squad Roster Table View */
              <div className="overflow-x-auto rounded-xl border border-surface-container-high/40 bg-surface-container-low shadow-sm pt-1">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-surface-container-high bg-surface-container-lowest/50 text-[11px] font-label-caps uppercase text-on-surface-variant">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-12">#</th>
                      <th className="py-2.5 px-4">Player</th>
                      <th className="py-2.5 px-3">Position</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-4">Key Metric</th>
                      <th className="py-2.5 px-3 text-right">Est. Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high/30">
                    {filteredSquad.map((player: ClubPlayer, idx: number) => {
                      const jNum = player.jerseyNumber ?? parseInt(player.num, 10);
                      const roleBadgeClass =
                        player.role === 'Goalkeeper'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : player.role === 'Defender'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : player.role === 'Midfielder'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20';

                      return (
                        <tr
                          key={player.playerId ?? idx}
                          className="hover:bg-surface-container/50 transition-colors"
                        >
                          <td className="py-2.5 px-3 text-center font-tabular-data font-bold text-on-surface">
                            <span className="px-2 py-0.5 rounded bg-surface-container-high text-xs font-black">
                              {jNum}
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <PlayerAvatar player={player} size="w-8 h-8" textSize="text-[9px]" />
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-semibold text-on-surface truncate">{player.name}</span>
                                  {player.badge && (
                                    <span className="px-1.5 py-0.2 rounded bg-primary-container text-on-primary-container text-[9px] font-bold uppercase">
                                      {player.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-on-surface-variant font-mono">
                                  ID #{player.playerId ?? idx + 1}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`inline-block text-[11px] px-2 py-0.5 rounded border font-medium ${roleBadgeClass}`}>
                              {player.role}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 uppercase text-[10px] font-label-caps text-on-surface-variant font-semibold">
                            {player.category}
                          </td>
                          <td className="py-2.5 px-4 text-tertiary font-tabular-data">
                            <span className="text-[11px] text-on-surface-variant">{player.statLabel}: </span>
                            <strong className="text-on-surface">{player.statVal}</strong>
                          </td>
                          <td className="py-2.5 px-3 text-right font-tabular-data font-bold text-secondary">
                            {player.val}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Historical Kits Showcase */}
          <div className="flex flex-col gap-space-sm pt-2">
            <div className="flex items-center gap-2 pb-2 border-b border-surface-container-high">
              <span className="material-symbols-outlined text-secondary text-xl">checkroom</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Historical Kits Showcase</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-2">
              {activeClub.kits.map((kit, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/40">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-bold">
                      {kit.season}
                    </span>
                    <span className="font-label-caps text-label-caps text-tertiary font-bold">{kit.badge}</span>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <div className="w-8 h-8 rounded-full border border-white/20 shadow-md flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full flex">
                        <div className="w-1/2 h-full" style={{ backgroundColor: kit.hexPrimary }}></div>
                        <div className="w-1/2 h-full" style={{ backgroundColor: kit.hexSecondary }}></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-body-sm font-semibold text-on-surface">{kit.type}</span>
                      <span className="text-xs text-on-surface-variant">{kit.colorName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant">{kit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
