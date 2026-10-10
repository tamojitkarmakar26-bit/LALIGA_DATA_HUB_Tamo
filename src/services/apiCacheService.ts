/**
 * High-performance Caching & Re-render Prevention Layer for LaLiga Stats & Standings.
 * 
 * Requirements addressed:
 * 1. Prevents redundant API calls in SeasonStats and CurrentSeason components.
 * 2. Static data (Matchday <= 7 & Historical seasons) is cached indefinitely with zero redundant fetches.
 * 3. Enforces that UI re-renders ONLY occur when data updates occur for matchdays beyond Matchday 7.
 * 4. In-flight request deduplication so concurrent requests share a single network call.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { SeasonStatsPayload, MD7_SCORERS_OFFICIAL, MD7_ASSISTS_OFFICIAL, MD7_PASSES_OFFICIAL, MD7_SAVES_OFFICIAL, MD7_YELLOWS_OFFICIAL, MD7_REDS_OFFICIAL, MD7_TEAMS_OFFICIAL } from './seasonStatsService';
import { HISTORICAL_SEASON_STATS } from './historicalSeasonStatsData';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // ms, Infinity for static data
  isStatic: boolean;
  versionHash: string;
}

export interface CacheDiagnostics {
  totalEntries: number;
  cacheHits: number;
  cacheMisses: number;
  redundantCallsPrevented: number;
  reRendersPrevented: number;
  activeMatchday: number;
  entries: { key: string; isStatic: boolean; ageSeconds: number }[];
}

// In-Memory Global Cache Stores
const statsCacheStore = new Map<string, CacheEntry<SeasonStatsPayload>>();
const standingsCacheStore = new Map<string, CacheEntry<any>>();

// In-flight Promise Registry for Request Deduplication
const inFlightRequests = new Map<string, Promise<any>>();

// Metrics tracking
let cacheHitsCount = 0;
let cacheMissesCount = 0;
let redundantCallsPreventedCount = 0;
let reRendersPreventedCount = 0;

// Default Matchday 7 Official Baseline
const DEFAULT_MD7_DATA: SeasonStatsPayload = {
  season: '2026-27',
  matchday: 7,
  totalMatches: 69,
  lastUpdated: '2026-10-09T00:00:00.000Z',
  isHistorical: false,
  goalScorers: MD7_SCORERS_OFFICIAL,
  assists: MD7_ASSISTS_OFFICIAL,
  passes: MD7_PASSES_OFFICIAL,
  saves: MD7_SAVES_OFFICIAL,
  yellowCards: MD7_YELLOWS_OFFICIAL,
  redCards: MD7_REDS_OFFICIAL,
  teamStats: MD7_TEAMS_OFFICIAL,
};

// Seed baseline for 2026-27 MD7 immediately
statsCacheStore.set('season-stats:2026-27:7', {
  data: DEFAULT_MD7_DATA,
  timestamp: Date.now(),
  ttl: Infinity,
  isStatic: true,
  versionHash: 'md7-official-baseline',
});

// Seed historical seasons into stats cache
Object.keys(HISTORICAL_SEASON_STATS).forEach((seasonKey) => {
  const hist = HISTORICAL_SEASON_STATS[seasonKey];
  statsCacheStore.set(`season-stats:${seasonKey}:38`, {
    data: hist,
    timestamp: Date.now(),
    ttl: Infinity,
    isStatic: true,
    versionHash: `hist-${seasonKey}`,
  });
});

/**
 * Generate a structural hash for data comparison.
 */
function computeDataHash(data: any): string {
  if (!data) return 'null';
  if (data.season && data.matchday !== undefined) {
    const scorersSummary = data.goalScorers?.slice(0, 3).map((s: any) => `${s.player}:${s.goals}`).join(',') || '';
    const standingsSummary = data.standings?.slice(0, 3).map((s: any) => `${s.name}:${s.pts}`).join(',') || '';
    return `${data.season}:md${data.matchday}:m${data.totalMatches || 0}:${scorersSummary}:${standingsSummary}`;
  }
  return JSON.stringify(data).slice(0, 100);
}

/**
 * Deep check to evaluate if data has updated for matchdays beyond Matchday 7.
 * For Matchday <= 7, returns false because data is verified static baseline.
 */
export function hasMatchdayUpdate(prevData: any, nextData: any): boolean {
  if (!prevData && nextData) return true;
  if (!nextData) return false;

  const prevMd = prevData.matchday ?? (prevData.model_status?.currentCompletedMatchday ?? 7);
  const nextMd = nextData.matchday ?? (nextData.model_status?.currentCompletedMatchday ?? 7);

  // If both are Matchday 7 or lower, data is the static official baseline: DO NOT RE-RENDER
  if (prevMd <= 7 && nextMd <= 7) {
    reRendersPreventedCount++;
    return false;
  }

  // If matchday advanced beyond 7
  if (nextMd !== prevMd) {
    return true;
  }

  // If matchday > 7, compare structural content
  if (nextMd > 7) {
    const prevHash = computeDataHash(prevData);
    const nextHash = computeDataHash(nextData);
    if (prevHash !== nextHash) {
      return true;
    }
  }

  reRendersPreventedCount++;
  return false;
}

/**
 * Fetch season stats with caching & request deduplication.
 */
export async function getCachedSeasonStats(
  season: string = '2026-27',
  matchday?: number,
  forceRefresh: boolean = false
): Promise<{ data: SeasonStatsPayload; fromCache: boolean }> {
  const isLive = season === '2026-27';
  const md = matchday ?? (isLive ? 7 : 38);
  const cacheKey = `season-stats:${season}:${md}`;
  const now = Date.now();

  // Check cache unless forceRefresh
  if (!forceRefresh) {
    const cached = statsCacheStore.get(cacheKey);
    if (cached) {
      const isValid = cached.isStatic || (now - cached.timestamp < cached.ttl);
      if (isValid) {
        cacheHitsCount++;
        redundantCallsPreventedCount++;
        return { data: cached.data, fromCache: true };
      }
    }
  }

  // Deduplicate in-flight requests
  if (inFlightRequests.has(cacheKey)) {
    redundantCallsPreventedCount++;
    const res = await inFlightRequests.get(cacheKey);
    return { data: res, fromCache: true };
  }

  cacheMissesCount++;

  // Create new fetch promise
  const fetchPromise = (async () => {
    try {
      const params = new URLSearchParams();
      params.set('season', season);
      if (isLive && md) {
        params.set('matchday', String(md));
      }

      const res = await fetch(`/api/season-stats?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (json.success) {
        const isStatic = !isLive || md <= 7;
        const entry: CacheEntry<SeasonStatsPayload> = {
          data: json,
          timestamp: Date.now(),
          ttl: isStatic ? Infinity : 45000, // 45 seconds for active simulation matchdays
          isStatic,
          versionHash: computeDataHash(json),
        };
        statsCacheStore.set(cacheKey, entry);
        return json;
      }
      throw new Error(json.error || 'Failed to fetch season stats');
    } catch (err) {
      // Robust fallback
      if (season === '2026-27' && md <= 7) {
        return DEFAULT_MD7_DATA;
      }
      if (HISTORICAL_SEASON_STATS[season]) {
        return HISTORICAL_SEASON_STATS[season];
      }
      throw err;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  const data = await fetchPromise;
  return { data, fromCache: false };
}

/**
 * Fetch standings with caching & request deduplication for CurrentSeason component.
 */
export async function getCachedStandings(
  season: string = '2026-27',
  matchday?: number | 'all',
  forceRefresh: boolean = false
): Promise<{ data: any; fromCache: boolean }> {
  const isLive = season === '2026-27';
  const mdKey = matchday !== undefined ? String(matchday) : 'all';
  const cacheKey = `standings:${season}:${mdKey}`;
  const now = Date.now();

  // If matchday is <= 7 or 'all' before simulation, check if static or fresh
  if (!forceRefresh) {
    const cached = standingsCacheStore.get(cacheKey);
    if (cached) {
      const isValid = cached.isStatic || (now - cached.timestamp < cached.ttl);
      if (isValid) {
        cacheHitsCount++;
        redundantCallsPreventedCount++;
        return { data: cached.data, fromCache: true };
      }
    }
  }

  // Deduplicate in-flight requests
  if (inFlightRequests.has(cacheKey)) {
    redundantCallsPreventedCount++;
    const res = await inFlightRequests.get(cacheKey);
    return { data: res, fromCache: true };
  }

  cacheMissesCount++;

  const fetchPromise = (async () => {
    try {
      const matchdayQuery = isLive && matchday !== 'all' && matchday !== undefined ? `&matchday=${matchday}` : '';
      const url = `/api/standings?season=${encodeURIComponent(season)}${matchdayQuery}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      const currentMd = json.model_status?.currentCompletedMatchday ?? (matchday !== 'all' && matchday ? Number(matchday) : 7);
      const isStatic = !isLive || (currentMd <= 7 && matchday === 'all');

      const entry: CacheEntry<any> = {
        data: json,
        timestamp: Date.now(),
        ttl: isStatic ? Infinity : 30000,
        isStatic,
        versionHash: computeDataHash(json),
      };
      standingsCacheStore.set(cacheKey, entry);
      return json;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  const data = await fetchPromise;
  return { data, fromCache: false };
}

/**
 * Invalidate dynamic simulation entries when advancing or resetting season.
 */
export function invalidateSimulationCache(): void {
  // Clear any matchday > 7 entries from cache
  for (const [key] of statsCacheStore.entries()) {
    if (key.startsWith('season-stats:2026-27:')) {
      const parts = key.split(':');
      const md = parseInt(parts[2], 10);
      if (md > 7) {
        statsCacheStore.delete(key);
      }
    }
  }

  for (const [key] of standingsCacheStore.entries()) {
    if (key.startsWith('standings:2026-27:')) {
      const parts = key.split(':');
      const md = parts[2];
      if (md !== '7' && md !== 'all') {
        standingsCacheStore.delete(key);
      }
    }
  }
}

/**
 * Retrieve cache layer runtime telemetry.
 */
export function getCacheDiagnostics(): CacheDiagnostics {
  const entries: { key: string; isStatic: boolean; ageSeconds: number }[] = [];
  const now = Date.now();

  statsCacheStore.forEach((val, key) => {
    entries.push({
      key,
      isStatic: val.isStatic,
      ageSeconds: Math.round((now - val.timestamp) / 1000),
    });
  });

  standingsCacheStore.forEach((val, key) => {
    entries.push({
      key,
      isStatic: val.isStatic,
      ageSeconds: Math.round((now - val.timestamp) / 1000),
    });
  });

  return {
    totalEntries: statsCacheStore.size + standingsCacheStore.size,
    cacheHits: cacheHitsCount,
    cacheMisses: cacheMissesCount,
    redundantCallsPrevented: redundantCallsPreventedCount,
    reRendersPrevented: reRendersPreventedCount,
    activeMatchday: 7,
    entries,
  };
}

/**
 * React Hook for cached SeasonStats queries with re-render prevention guard.
 * Only triggers UI re-renders when data updates occur for matchdays beyond Matchday 7.
 */
export function useSeasonStatsQuery(season: string = '2026-27', matchday: number = 7) {
  const [data, setData] = useState<SeasonStatsPayload>(() => {
    const cached = statsCacheStore.get(`season-stats:${season}:${matchday}`);
    return cached?.data || DEFAULT_MD7_DATA;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isFromCache, setIsFromCache] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Reference to track previous state for re-render prevention
  const lastDataRef = useRef<SeasonStatsPayload>(data);

  const loadData = useCallback(async (force: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCachedSeasonStats(season, matchday, force);
      setIsFromCache(res.fromCache);

      // Guard: Only re-render if data has updated for matchdays beyond Matchday 7,
      // or if season changed / first initialization!
      const shouldUpdate =
        season !== lastDataRef.current?.season ||
        matchday !== lastDataRef.current?.matchday ||
        hasMatchdayUpdate(lastDataRef.current, res.data);

      if (shouldUpdate) {
        lastDataRef.current = res.data;
        setData(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading stats');
    } finally {
      setLoading(false);
    }
  }, [season, matchday]);

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  return {
    data,
    loading,
    error,
    isFromCache,
    refetch: () => loadData(true),
  };
}
