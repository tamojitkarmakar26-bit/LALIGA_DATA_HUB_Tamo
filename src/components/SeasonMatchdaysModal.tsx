import React, { useState, useEffect, useMemo } from 'react';
import { FixtureRecord } from '../services/csvDataService';
import { TeamCrestBadge } from './TeamCrestBadge';
import { getTeamCode } from '../utils/teamLogos';

const AVAILABLE_SEASONS = [
  '2026-27',
  '2025-26',
  '2024-25',
  '2023-24',
  '2022-23',
  '2021-22',
  '2020-21',
];

interface SeasonMatchdaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCalendar?: (matchday: number, season?: string) => void;
  onSelectClub?: (clubId: string) => void;
  initialSeason?: string;
  initialMatchday?: number;
}

export const SeasonMatchdaysModal: React.FC<SeasonMatchdaysModalProps> = ({
  isOpen,
  onClose,
  onNavigateToCalendar,
  onSelectClub,
  initialSeason = '2026-27',
  initialMatchday,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<string>(initialSeason);
  const is2627 = selectedSeason === '2026-27';
  const [selectedMatchday, setSelectedMatchday] = useState<number>(
    initialMatchday || (is2627 ? 8 : 1)
  );
  const [allFixtures, setAllFixtures] = useState<FixtureRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState<boolean>(false);
  const [use24Hour, setUse24Hour] = useState<boolean>(true);

  // Sync when initialSeason or initialMatchday changes
  useEffect(() => {
    if (initialSeason) {
      setSelectedSeason(initialSeason);
    }
  }, [initialSeason]);

  useEffect(() => {
    if (initialMatchday) {
      setSelectedMatchday(initialMatchday);
    } else {
      setSelectedMatchday(selectedSeason === '2026-27' ? 8 : 1);
    }
  }, [initialMatchday, selectedSeason]);

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/fixtures?season=${encodeURIComponent(selectedSeason)}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setAllFixtures(json.fixtures || []);
          }
        }
      } catch (err) {
        console.error(`Failed to load ${selectedSeason} fixtures:`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedSeason]);

  const matchdayFixtures = useMemo(() => {
    return allFixtures.filter((f) => f.matchday === selectedMatchday);
  }, [allFixtures, selectedMatchday]);

  // Overall season played overview
  const playedCount = useMemo(() => {
    return allFixtures.filter(
      (f) => f.status === 'Played' || (f.homeScore !== null && f.awayScore !== null)
    ).length;
  }, [allFixtures]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-surface-container-low border border-surface-container-high rounded-3xl shadow-2xl flex flex-col overflow-hidden text-on-surface"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-surface-container-high bg-surface-container/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary border border-secondary/30 flex items-center justify-center shadow-inner shrink-0">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                  LaLiga Matchday Central &amp; Scores
                </h2>

                {/* Season Dropdown Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
                    type="button"
                    className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary text-[#030712] font-label-caps text-xs font-black uppercase tracking-wider hover:bg-secondary/90 transition-colors cursor-pointer"
                  >
                    <span>Season {selectedSeason}</span>
                    <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
                  </button>

                  {showSeasonDropdown && (
                    <div className="absolute left-0 mt-1 z-50 w-44 rounded-xl bg-surface-container-high border border-surface-container shadow-2xl py-1 divide-y divide-surface-container-low/40">
                      {AVAILABLE_SEASONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setSelectedSeason(s);
                            setSelectedMatchday(s === '2026-27' ? 8 : 1);
                            setShowSeasonDropdown(false);
                          }}
                          type="button"
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold cursor-pointer flex items-center justify-between ${
                            selectedSeason === s
                              ? 'bg-secondary text-[#030712] font-black'
                              : 'text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          <span>{s}</span>
                          {s === '2026-27' && <span className="text-[9px] uppercase font-bold">Active</span>}
                          {s === '2025-26' && <span className="text-[9px] uppercase font-bold text-primary">FCB 94P</span>}
                          {s === '2024-25' && <span className="text-[9px] uppercase font-bold text-primary">FCB 88P</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-caps text-xs font-bold uppercase tracking-wider">
                  Gameweek {selectedMatchday} of 38
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {is2627
                  ? 'Gameweeks 1–7 completed with verified scores • Matchday 8 upcoming'
                  : `All 38 gameweeks completed for ${selectedSeason} • Verified official final scores`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
            type="button"
            title="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Gameweek Selector Grid (1 to 38) */}
        <div className="p-3 sm:p-4 border-b border-surface-container-high bg-surface-container-lowest/70">
          <div className="flex items-center justify-between pb-2 text-xs">
            <span className="font-label-caps uppercase text-on-surface-variant font-bold">
              Select Matchday (1 - 38):
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-tertiary">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                {is2627 ? 'GW 1–7 (Played)' : 'All 38 Played'}
              </span>
              {is2627 && (
                <>
                  <span className="flex items-center gap-1 text-secondary font-semibold">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    GW 8 (Next)
                  </span>
                  <span className="flex items-center gap-1 text-on-surface-variant">
                    <span className="w-2 h-2 rounded-full bg-surface-container-high"></span>
                    GW 9–38 (Upcoming)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Scrollable matchday tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {Array.from({ length: 38 }, (_, i) => i + 1).map((gw) => {
              const isSelected = selectedMatchday === gw;
              const isPlayed = is2627 ? gw <= 7 : true;
              const isCurrent = is2627 && gw === 8;

              return (
                <button
                  key={gw}
                  onClick={() => setSelectedMatchday(gw)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-tabular-data font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-secondary text-[#030712] font-black shadow-md ring-2 ring-secondary/50 scale-105'
                      : isCurrent
                      ? 'bg-secondary/20 text-secondary border border-secondary/40 hover:bg-secondary/30'
                      : isPlayed
                      ? 'bg-surface-container text-tertiary hover:bg-surface-container-high border border-tertiary/20'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <span>GW {gw}</span>
                  {isPlayed && !isSelected && (
                    <span className="material-symbols-outlined text-[10px]">check</span>
                  )}
                  {isCurrent && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Matchday Information & Quick Actions */}
        <div className="px-5 sm:px-6 py-3 bg-surface-container-low border-b border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
              Matchday {selectedMatchday} Fixtures
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-label-caps uppercase font-bold ${
                !is2627 || selectedMatchday <= 7
                  ? 'bg-tertiary/20 text-tertiary border border-tertiary/30'
                  : selectedMatchday === 8
                  ? 'bg-secondary/20 text-secondary border border-secondary/30'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              {!is2627 || selectedMatchday <= 7
                ? 'All Matches Played • Final Scores'
                : selectedMatchday === 8
                ? 'Next Gameweek • Oct 10 - Oct 13'
                : 'Scheduled Upcoming Gameweek'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUse24Hour(!use24Hour)}
              className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-on-surface font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-surface-container-high"
              type="button"
            >
              <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
              <span>{use24Hour ? '24H' : '12H'} IST</span>
            </button>

            {onNavigateToCalendar && (
              <button
                onClick={() => {
                  onNavigateToCalendar(selectedMatchday, selectedSeason);
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-secondary text-[#030712] text-xs font-bold flex items-center gap-1.5 hover:bg-secondary/90 transition-colors cursor-pointer shadow-sm"
                type="button"
              >
                <span>Open in Full Calendar</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>
        </div>

        {/* Fixtures List for Selected Matchday */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 max-h-[55vh]">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
              <span className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">
                Loading Gameweek {selectedMatchday} fixtures &amp; scores for Season {selectedSeason}...
              </span>
            </div>
          ) : matchdayFixtures.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              No fixtures found for Gameweek {selectedMatchday}.
            </div>
          ) : (
            matchdayFixtures.map((fixture, idx) => {
              const isPlayed =
                fixture.status === 'Played' ||
                (fixture.homeScore !== null && fixture.awayScore !== null);
              const homeCode = getTeamCode(fixture.homeTeam);
              const awayCode = getTeamCode(fixture.awayTeam);
              const displayTime = use24Hour
                ? fixture.time24 || fixture.time
                : fixture.time12 || fixture.time;

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors border border-surface-container-high/60 gap-3"
                >
                  {/* Left: Date & Time in IST */}
                  <div className="flex items-center gap-2.5 sm:w-44 shrink-0 text-xs text-on-surface-variant font-tabular-data">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      schedule
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">{fixture.formattedDate}</span>
                      <span className="text-[11px] font-semibold text-secondary">
                        {displayTime} IST
                      </span>
                    </div>
                  </div>

                  {/* Center: Home vs Away + Score */}
                  <div className="flex items-center justify-center flex-1 gap-3 sm:gap-5">
                    {/* Home Team */}
                    <div
                      className="flex items-center gap-2 flex-1 justify-end text-right cursor-pointer group"
                      onClick={() => onSelectClub && onSelectClub(homeCode)}
                    >
                      <span className="font-body-sm text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                        {fixture.homeTeam}
                      </span>
                      <TeamCrestBadge teamName={fixture.homeTeam} size="sm" />
                    </div>

                    {/* Score / Status Badge */}
                    <div className="px-3 py-1 rounded-lg bg-surface-container-lowest border border-surface-container-high flex flex-col items-center justify-center min-w-[65px] shrink-0 text-center shadow-inner">
                      {isPlayed ? (
                        <span className="font-score-display text-sm sm:text-base font-extrabold text-on-surface tracking-wider">
                          {fixture.homeScore ?? '-'} : {fixture.awayScore ?? '-'}
                        </span>
                      ) : (
                        <span className="font-label-caps text-[10px] font-bold text-secondary uppercase">
                          UPCOMING
                        </span>
                      )}
                    </div>

                    {/* Away Team */}
                    <div
                      className="flex items-center gap-2 flex-1 justify-start text-left cursor-pointer group"
                      onClick={() => onSelectClub && onSelectClub(awayCode)}
                    >
                      <TeamCrestBadge teamName={fixture.awayTeam} size="sm" />
                      <span className="font-body-sm text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                        {fixture.awayTeam}
                      </span>
                    </div>
                  </div>

                  {/* Right: Venue / Stadium */}
                  <div className="hidden md:flex flex-col text-right sm:w-48 shrink-0 text-[11px] text-on-surface-variant truncate">
                    <span className="truncate font-medium text-on-surface">
                      {fixture.stadium || 'Official Venue'}
                    </span>
                    <span className="truncate text-[10px]">{fixture.city || 'Spain'}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-3 border-t border-surface-container-high bg-surface-container-low text-xs text-on-surface-variant flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            Season {selectedSeason} • Total Matches: 380 • <strong>{playedCount}</strong> Completed
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold transition-colors cursor-pointer self-end sm:self-auto"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

