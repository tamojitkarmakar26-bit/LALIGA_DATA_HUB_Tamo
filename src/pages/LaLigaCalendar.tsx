import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FixtureRecord } from '../services/csvDataService';
import { TeamCrestBadge } from '../components/TeamCrestBadge';
import { getTeamCode, getTeamColor } from '../utils/teamLogos';

interface LaLigaCalendarProps {
  searchQuery?: string;
  onSelectClub?: (clubId: string) => void;
  initialMatchday?: number;
  initialSeason?: string;
}

const ALL_LALIGA_SEASONS = [
  '2026-27',
  '2025-26',
  '2024-25',
  '2023-24',
  '2022-23',
  '2021-22',
  '2020-21',
];

interface SeasonMeta {
  title: string;
  badge: string;
  badgeCls: string;
  champion?: string;
  pts?: number;
  completed: boolean;
  totalMatches: number;
}

const SEASON_METADATA: Record<string, SeasonMeta> = {
  '2026-27': {
    title: 'LaLiga EA SPORTS 2026/27',
    badge: 'ACTIVE CAMPAIGN',
    badgeCls: 'bg-secondary text-[#030712] font-black',
    completed: false,
    totalMatches: 380,
  },
  '2025-26': {
    title: 'LaLiga EA SPORTS 2025/26',
    badge: 'FCB CHAMP (94 PTS)',
    badgeCls: 'bg-primary/20 text-primary font-bold border border-primary/30',
    champion: 'FC Barcelona',
    pts: 94,
    completed: true,
    totalMatches: 380,
  },
  '2024-25': {
    title: 'LaLiga EA SPORTS 2024/25',
    badge: 'FCB CHAMP (88 PTS)',
    badgeCls: 'bg-primary/20 text-primary font-bold border border-primary/30',
    champion: 'FC Barcelona',
    pts: 88,
    completed: true,
    totalMatches: 380,
  },
  '2023-24': {
    title: 'LaLiga EA SPORTS 2023/24',
    badge: 'RMA CHAMP (95 PTS)',
    badgeCls: 'bg-secondary/20 text-secondary font-bold border border-secondary/30',
    champion: 'Real Madrid',
    pts: 95,
    completed: true,
    totalMatches: 380,
  },
  '2022-23': {
    title: 'LaLiga Santander 2022/23',
    badge: 'FCB CHAMP (88 PTS)',
    badgeCls: 'bg-primary/20 text-primary font-bold border border-primary/30',
    champion: 'FC Barcelona',
    pts: 88,
    completed: true,
    totalMatches: 380,
  },
  '2021-22': {
    title: 'LaLiga Santander 2021/22',
    badge: 'RMA CHAMP (86 PTS)',
    badgeCls: 'bg-secondary/20 text-secondary font-bold border border-secondary/30',
    champion: 'Real Madrid',
    pts: 86,
    completed: true,
    totalMatches: 380,
  },
  '2020-21': {
    title: 'LaLiga Santander 2020/21',
    badge: 'ATM CHAMP (86 PTS)',
    badgeCls: 'bg-red-500/20 text-red-400 font-bold border border-red-500/30',
    champion: 'Atlético de Madrid',
    pts: 86,
    completed: true,
    totalMatches: 380,
  },
};

export const LaLigaCalendar: React.FC<LaLigaCalendarProps> = ({
  searchQuery = '',
  onSelectClub,
  initialMatchday,
  initialSeason,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<string>(initialSeason || '2026-27');
  const is2627 = selectedSeason === '2026-27';
  const [selectedMatchday, setSelectedMatchday] = useState<number>(
    initialMatchday || (is2627 ? 8 : 1)
  );
  const [fixtures, setFixtures] = useState<FixtureRecord[]>([]);
  const [allSeasonFixtures, setAllSeasonFixtures] = useState<FixtureRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [availableSeasons, setAvailableSeasons] = useState<string[]>(ALL_LALIGA_SEASONS);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState<boolean>(false);
  const [showMatchdayDropdown, setShowMatchdayDropdown] = useState<boolean>(false);
  const [use24Hour, setUse24Hour] = useState<boolean>(true);
  const [searchAllGameweeks, setSearchAllGameweeks] = useState<boolean>(false);

  const gameweekScrollRef = useRef<HTMLDivElement>(null);
  const totalGameweeks = 38;

  // Sync when initialMatchday changes
  useEffect(() => {
    if (initialMatchday) {
      setSelectedMatchday(initialMatchday);
    }
  }, [initialMatchday]);

  // Sync when initialSeason changes
  useEffect(() => {
    if (initialSeason) {
      setSelectedSeason(initialSeason);
    }
  }, [initialSeason]);

  // Fetch available seasons
  useEffect(() => {
    async function fetchSeasons() {
      try {
        const res = await fetch('/api/fixtures/seasons');
        if (res.ok) {
          const json = await res.json();
          if (json.seasons && json.seasons.length > 0) {
            setAvailableSeasons(json.seasons);
          }
        }
      } catch (err) {
        console.warn('Using default available seasons:', err);
      }
    }
    fetchSeasons();
  }, []);

  // Fetch fixtures for chosen season & matchday
  useEffect(() => {
    let isMounted = true;
    async function fetchFixtures() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/fixtures?season=${encodeURIComponent(selectedSeason)}&matchday=${selectedMatchday}`
        );
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setFixtures(json.fixtures || []);
          }
        }
      } catch (err) {
        console.error('Error fetching calendar fixtures:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchFixtures();
    return () => {
      isMounted = false;
    };
  }, [selectedSeason, selectedMatchday]);

  // Pre-load all season fixtures for fast searching across all 38 gameweeks
  useEffect(() => {
    let isMounted = true;
    async function fetchAllSeasonFixtures() {
      try {
        const res = await fetch(`/api/fixtures?season=${encodeURIComponent(selectedSeason)}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setAllSeasonFixtures(json.fixtures || []);
          }
        }
      } catch (err) {
        console.warn('Could not load all season fixtures:', err);
      }
    }
    fetchAllSeasonFixtures();
    return () => {
      isMounted = false;
    };
  }, [selectedSeason]);

  // Scroll active gameweek chip into view
  useEffect(() => {
    if (gameweekScrollRef.current) {
      const activeBtn = gameweekScrollRef.current.querySelector(
        `[data-gw="${selectedMatchday}"]`
      ) as HTMLElement | null;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [selectedMatchday]);

  // Keyboard navigation for gameweek switching (left/right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'ArrowLeft' && selectedMatchday > 1) {
        setSelectedMatchday((prev) => prev - 1);
      } else if (e.key === 'ArrowRight' && selectedMatchday < totalGameweeks) {
        setSelectedMatchday((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMatchday, totalGameweeks]);

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.season-dropdown-wrapper')) {
        setShowSeasonDropdown(false);
      }
      if (!target.closest('.matchday-dropdown-wrapper')) {
        setShowMatchdayDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter fixtures using universal header search
  const filteredFixtures = useMemo(() => {
    if (!searchQuery.trim()) {
      return fixtures;
    }
    const term = searchQuery.toLowerCase().trim();

    // If searching across all 38 gameweeks
    const targetSource = searchAllGameweeks ? allSeasonFixtures : fixtures;

    return targetSource.filter((f) => {
      const homeName = f.homeTeam.toLowerCase();
      const awayName = f.awayTeam.toLowerCase();
      const homeCode = getTeamCode(f.homeTeam).toLowerCase();
      const awayCode = getTeamCode(f.awayTeam).toLowerCase();
      const stadium = (f.stadium || '').toLowerCase();
      const city = (f.city || '').toLowerCase();
      const date = (f.formattedDate || '').toLowerCase();

      return (
        homeName.includes(term) ||
        awayName.includes(term) ||
        homeCode.includes(term) ||
        awayCode.includes(term) ||
        stadium.includes(term) ||
        city.includes(term) ||
        date.includes(term)
      );
    });
  }, [fixtures, allSeasonFixtures, searchQuery, searchAllGameweeks]);

  // Check how many matches in the entire season match the search query
  const totalSeasonSearchMatches = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    const term = searchQuery.toLowerCase().trim();
    return allSeasonFixtures.filter((f) => {
      const homeName = f.homeTeam.toLowerCase();
      const awayName = f.awayTeam.toLowerCase();
      const homeCode = getTeamCode(f.homeTeam).toLowerCase();
      const awayCode = getTeamCode(f.awayTeam).toLowerCase();
      return homeName.includes(term) || awayName.includes(term) || homeCode.includes(term) || awayCode.includes(term);
    }).length;
  }, [allSeasonFixtures, searchQuery]);

  const meta = SEASON_METADATA[selectedSeason] || {
    title: `LaLiga ${selectedSeason}`,
    badge: 'VERIFIED',
    badgeCls: 'bg-surface-container text-on-surface-variant',
    completed: true,
    totalMatches: 380,
  };

  return (
    <div className="flex flex-col w-full gap-space-lg pt-2">
      {/* Top Banner & Season Controller */}
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label-caps text-label-caps px-2.5 py-0.5 rounded-full bg-surface-container-high text-tertiary uppercase tracking-wider font-semibold">
              Official Match Schedule • 38 Gameweeks • 380 Matches
            </span>
            <span className="font-label-caps text-label-caps px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Indian Standard Time (IST) • UTC +05:30
            </span>
            {meta.champion && (
              <span className="font-label-caps text-label-caps px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase tracking-wider font-bold flex items-center gap-1">
                <span>🏆</span>
                <span>Champion: {meta.champion} ({meta.pts} pts)</span>
              </span>
            )}
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Season {selectedSeason}
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg lg:text-3xl text-on-surface tracking-tight font-bold">
            LaLiga Calendar &amp; Fixtures
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            {meta.completed
              ? `Complete official match schedule, kick-off times, venues, and verified scores for the ${selectedSeason} campaign.`
              : `Live fixtures, official kick-off times, verified match results, and stadium guides for the ${selectedSeason} season.`}
          </p>
        </div>

        {/* Top Control Bar: Season Selector + 24H Toggle */}
        <div className="flex items-center gap-space-sm flex-wrap">
          {/* 24-Hour / 12-Hour Switcher */}
          <button
            onClick={() => setUse24Hour(!use24Hour)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-badge text-label-badge hover:bg-surface-container transition-colors cursor-pointer border border-surface-container-high shadow-sm"
            type="button"
            title="Toggle between 24-Hour and 12-Hour IST format"
          >
            <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
            <span>{use24Hour ? '24H Format (IST)' : '12H AM/PM (IST)'}</span>
          </button>

          {/* Season Selector Dropdown */}
          <div className="relative season-dropdown-wrapper">
            <button
              onClick={() => {
                setShowSeasonDropdown(!showSeasonDropdown);
                setShowMatchdayDropdown(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-badge text-label-badge hover:bg-surface-container transition-colors cursor-pointer border border-surface-container-high shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-secondary text-base">calendar_today</span>
              <span>
                Season: <strong>{selectedSeason}</strong>
              </span>
              <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
            </button>

            {showSeasonDropdown && (
              <div className="absolute top-full right-0 mt-1 z-30 w-60 max-h-80 overflow-y-auto rounded-2xl bg-surface-container-high border border-surface-container shadow-2xl py-1 divide-y divide-surface-container-low/40">
                <div className="px-3 py-2 text-[10px] font-label-caps uppercase text-on-surface-variant font-bold">
                  Select Season:
                </div>
                {availableSeasons.map((season) => {
                  const isSelected = selectedSeason === season;
                  const itemMeta = SEASON_METADATA[season] || {
                    badge: 'VERIFIED',
                    badgeCls: 'bg-surface-container text-on-surface-variant',
                  };

                  return (
                    <button
                      key={season}
                      onClick={() => {
                        setSelectedSeason(season);
                        if (season === '2026-27') {
                          setSelectedMatchday(8);
                        } else if (selectedSeason === '2026-27' && selectedMatchday === 8) {
                          setSelectedMatchday(1);
                        }
                        setShowSeasonDropdown(false);
                      }}
                      type="button"
                      className={`w-full text-left px-3.5 py-2.5 text-xs transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-primary-container/20 text-on-primary-container font-bold'
                          : 'text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        )}
                        <span className={isSelected ? 'font-bold' : 'font-medium'}>{season}</span>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${itemMeta.badgeCls}`}
                      >
                        {itemMeta.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gameweek Stepper Banner (< Gameweek X >) */}
      <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 shadow-md">
        <div className="flex items-center justify-between gap-2">
          {/* Previous Matchday Button */}
          <button
            onClick={() => {
              if (selectedMatchday > 1) setSelectedMatchday((prev) => prev - 1);
            }}
            disabled={selectedMatchday <= 1}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed text-on-surface text-body-sm font-semibold transition-all cursor-pointer border border-surface-container-high/40"
            type="button"
            title="Previous Matchday (Left Arrow)"
          >
            <span className="material-symbols-outlined text-base">chevron_left</span>
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Center Gameweek Indicator with Quick Jump Dropdown */}
          <div className="relative flex flex-col items-center matchday-dropdown-wrapper">
            <button
              onClick={() => {
                setShowMatchdayDropdown(!showMatchdayDropdown);
                setShowSeasonDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl hover:bg-surface-container transition-colors cursor-pointer text-center group"
              type="button"
              title="Click to quickly jump to any matchday"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 justify-center">
                  <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-on-surface tracking-wide">
                    Gameweek {selectedMatchday}
                  </span>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-on-surface">
                    arrow_drop_down
                  </span>
                </div>
                <span className="font-label-caps text-[11px] text-tertiary uppercase tracking-wider font-semibold">
                  Matchday {selectedMatchday} of {totalGameweeks} • Season {selectedSeason}
                </span>
              </div>
            </button>

            {/* Jump to Gameweek Quick Grid Dropdown */}
            {showMatchdayDropdown && (
              <div className="absolute top-full mt-2 z-30 w-80 max-h-80 overflow-y-auto p-3 rounded-2xl bg-surface-container-high border border-surface-container shadow-2xl flex flex-col gap-2">
                <div className="flex items-center justify-between px-1 text-[11px] font-label-caps uppercase text-on-surface-variant font-bold border-b border-surface-container pb-2">
                  <span>Quick Jump:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedMatchday(1);
                        setShowMatchdayDropdown(false);
                      }}
                      className="text-secondary hover:underline cursor-pointer"
                      type="button"
                    >
                      GW 1
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        setSelectedMatchday(38);
                        setShowMatchdayDropdown(false);
                      }}
                      className="text-secondary hover:underline cursor-pointer"
                      type="button"
                    >
                      GW 38 (Final)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 max-h-60 overflow-y-auto pr-1">
                  {Array.from({ length: totalGameweeks }, (_, i) => i + 1).map((gw) => {
                    const isSelected = selectedMatchday === gw;
                    const isPlayed = is2627 ? gw <= 7 : true;
                    const isNext = is2627 && gw === 8;

                    return (
                      <button
                        key={gw}
                        onClick={() => {
                          setSelectedMatchday(gw);
                          setShowMatchdayDropdown(false);
                        }}
                        type="button"
                        className={`p-2 rounded-xl text-xs font-tabular-data font-bold text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-secondary text-[#030712] font-black shadow-md ring-2 ring-secondary/50'
                            : isNext
                            ? 'bg-secondary/20 text-secondary border border-secondary/40 hover:bg-secondary/30'
                            : isPlayed
                            ? 'bg-surface-container text-tertiary hover:bg-surface-container-highest border border-tertiary/20'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
                        }`}
                      >
                        <span className="leading-tight">GW {gw}</span>
                        {isPlayed && (
                          <span className="text-[9px] font-semibold text-tertiary leading-none mt-0.5">
                            PLAYED
                          </span>
                        )}
                        {isNext && (
                          <span className="text-[9px] font-extrabold text-secondary leading-none mt-0.5">
                            NEXT
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Next Matchday Button */}
          <button
            onClick={() => {
              if (selectedMatchday < totalGameweeks) setSelectedMatchday((prev) => prev + 1);
            }}
            disabled={selectedMatchday >= totalGameweeks}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed text-on-surface text-body-sm font-semibold transition-all cursor-pointer border border-surface-container-high/40"
            type="button"
            title="Next Matchday (Right Arrow)"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>

        {/* Scrollable Gameweek Chips Strip (GW 1 to GW 38) */}
        <div
          ref={gameweekScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-surface-container-high/40 scrollbar-thin"
        >
          {Array.from({ length: totalGameweeks }, (_, i) => i + 1).map((gw) => {
            const isSelected = selectedMatchday === gw;
            const isPlayed = is2627 ? gw <= 7 : true;
            const isNext = is2627 && gw === 8;

            return (
              <button
                key={gw}
                data-gw={gw}
                onClick={() => setSelectedMatchday(gw)}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-tabular-data font-bold shrink-0 transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-secondary text-[#030712] font-black shadow-md ring-2 ring-secondary/50 scale-105'
                    : isNext
                    ? 'bg-secondary/20 text-secondary border border-secondary/40 hover:bg-secondary/30'
                    : isPlayed
                    ? 'bg-surface-container text-tertiary hover:bg-surface-container-high border border-tertiary/20'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span>GW {gw}</span>
                <span className="text-[9px] uppercase font-bold mt-0.5 leading-none">
                  {isPlayed ? 'PLAYED' : isNext ? 'NEXT' : 'SOON'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Search Banner when active */}
      {searchQuery && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-surface-container border border-surface-container-high text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">filter_alt</span>
            <span>
              Searching for &quot;<strong>{searchQuery}</strong>&quot; in{' '}
              {searchAllGameweeks ? `All 38 Gameweeks (${selectedSeason})` : `Gameweek ${selectedMatchday}`}
              : Found <strong>{filteredFixtures.length}</strong> match(es).
            </span>
          </div>

          <div className="flex items-center gap-2">
            {totalSeasonSearchMatches > 0 && (
              <button
                onClick={() => setSearchAllGameweeks(!searchAllGameweeks)}
                className="px-3 py-1 rounded-lg bg-primary-container text-on-primary-container font-bold hover:bg-primary-container/80 transition-colors cursor-pointer"
                type="button"
              >
                {searchAllGameweeks
                  ? `Show Gameweek ${selectedMatchday} Only`
                  : `Show All ${totalSeasonSearchMatches} Matches in Season ${selectedSeason}`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Matchday Fixture Cards Container */}
      <section className="flex flex-col gap-2.5">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 rounded-2xl bg-surface-container">
            <div className="w-10 h-10 border-4 border-tertiary/20 border-t-tertiary rounded-full animate-spin"></div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Loading Gameweek {selectedMatchday} fixtures for Season {selectedSeason}...
            </span>
          </div>
        ) : filteredFixtures.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3 rounded-2xl bg-surface-container">
            <span className="material-symbols-outlined text-4xl text-outline">event_busy</span>
            <p className="font-headline-sm text-base text-on-surface">
              No fixtures found matching &quot;{searchQuery}&quot; in Gameweek {selectedMatchday}
            </p>
            {totalSeasonSearchMatches > 0 && !searchAllGameweeks ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-on-surface-variant">
                  {searchQuery} plays in {totalSeasonSearchMatches} other matchdays during the {selectedSeason} campaign.
                </p>
                <button
                  onClick={() => setSearchAllGameweeks(true)}
                  className="px-4 py-2 rounded-xl bg-secondary text-[#030712] font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-sm"
                  type="button"
                >
                  View All {totalSeasonSearchMatches} Fixtures for &quot;{searchQuery}&quot; in Season {selectedSeason}
                </button>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">
                Try switching to a different Gameweek or clearing the search query in the header.
              </p>
            )}
          </div>
        ) : (
          filteredFixtures.map((match, idx) => {
            const isPlayed =
              match.status === 'Played' ||
              (match.homeScore !== null && match.awayScore !== null);
            const homeCode = getTeamCode(match.homeTeam);
            const awayCode = getTeamCode(match.awayTeam);
            const displayTime = use24Hour
              ? match.time24 || match.time
              : match.time12 || match.time;

            // Score win/draw/loss state for subtle typography emphasis
            const isHomeWin = isPlayed && match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore;
            const isAwayWin = isPlayed && match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore;

            return (
              <div
                key={idx}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all border border-surface-container-high/50 hover:border-surface-container-high shadow-sm"
              >
                {/* Left: Date (DD.MM.YYYY) & Kick-off Time */}
                <div className="flex items-center gap-3 shrink-0 mb-2 sm:mb-0 sm:w-44">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-tabular-data text-xs sm:text-sm font-bold text-on-surface">
                        {match.formattedDate}
                      </span>
                      {searchAllGameweeks && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-secondary/15 text-secondary">
                          GW {match.matchday}
                        </span>
                      )}
                    </div>
                    <span className="font-label-caps text-[11px] text-on-surface-variant font-semibold">
                      {displayTime} IST
                    </span>
                  </div>
                </div>

                {/* Center: Match Teams & Score / Status */}
                <div className="flex items-center justify-center flex-1 gap-2 sm:gap-6 py-1 min-w-0">
                  {/* Home Team */}
                  <div
                    className="flex items-center gap-2.5 sm:gap-3 flex-1 justify-end text-right cursor-pointer group/home min-w-0"
                    onClick={() => onSelectClub && onSelectClub(homeCode)}
                    title={`View ${match.homeTeam} profile`}
                  >
                    <span
                      className={`font-headline-sm text-xs sm:text-sm md:text-base font-semibold group-hover/home:text-primary transition-colors truncate ${
                        isHomeWin ? 'text-on-surface font-bold' : isAwayWin ? 'text-on-surface-variant' : 'text-on-surface'
                      }`}
                    >
                      {match.homeTeam}
                    </span>
                    <TeamCrestBadge teamName={match.homeTeam} size="md" />
                  </div>

                  {/* Center Score / Status Badge */}
                  <div className="px-3.5 py-1.5 rounded-xl bg-surface-container-high/60 border border-surface-container-high flex flex-col items-center justify-center min-w-[76px] shrink-0 text-center shadow-inner">
                    {isPlayed ? (
                      <div className="flex flex-col items-center">
                        <span className="font-score-display text-base sm:text-lg font-extrabold text-on-surface tracking-wider leading-none">
                          {match.homeScore ?? '-'} : {match.awayScore ?? '-'}
                        </span>
                        <span className="text-[9px] font-bold text-tertiary uppercase tracking-wider mt-0.5">
                          FINAL (FT)
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="font-tabular-data text-xs sm:text-sm font-bold text-secondary">
                          {displayTime}
                        </span>
                        <span className="font-label-caps text-[9px] uppercase tracking-wider text-on-surface-variant font-semibold">
                          UPCOMING (IST)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div
                    className="flex items-center gap-2.5 sm:gap-3 flex-1 justify-start text-left cursor-pointer group/away min-w-0"
                    onClick={() => onSelectClub && onSelectClub(awayCode)}
                    title={`View ${match.awayTeam} profile`}
                  >
                    <TeamCrestBadge teamName={match.awayTeam} size="md" />
                    <span
                      className={`font-headline-sm text-xs sm:text-sm md:text-base font-semibold group-hover/away:text-primary transition-colors truncate ${
                        isAwayWin ? 'text-on-surface font-bold' : isHomeWin ? 'text-on-surface-variant' : 'text-on-surface'
                      }`}
                    >
                      {match.awayTeam}
                    </span>
                  </div>
                </div>

                {/* Right: Venue Info & Quick Club Navigator */}
                <div className="flex items-center justify-end gap-2 mt-2 sm:mt-0 sm:w-52 shrink-0">
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-xs text-on-surface truncate max-w-[170px] font-medium">
                      {match.stadium || 'Official Venue'}
                    </span>
                    <span className="text-[10px] text-on-surface-variant truncate">
                      {match.city || 'Spain'}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectClub && onSelectClub(homeCode)}
                    className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer shrink-0"
                    type="button"
                    title={`View ${match.homeTeam} profile`}
                  >
                    <span className="material-symbols-outlined text-base">visibility</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
