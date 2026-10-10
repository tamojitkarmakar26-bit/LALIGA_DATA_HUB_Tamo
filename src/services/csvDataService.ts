import fs from 'fs';
import path from 'path';

export interface MatchRecord {
  homeTeam: string;
  awayTeam: string;
  fthg: number;
  ftag: number;
  ftr: 'H' | 'A' | 'D';
  hs: number;
  as: number;
  hst: number;
  ast: number;
  hf: number;
  af: number;
  hc: number;
  ac: number;
  hy: number;
  ay: number;
  hr: number;
  ar: number;
}

export interface HistoricalSeasonRow {
  season: string;
  sNo: number;
  team: string;
  position: number;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  headToHeadScores?: Record<number, string>;
}

export interface MatchAnalyticsRecord {
  homeTeam: string;
  awayTeam: string;
  matchResult: 'H' | 'A' | 'D';
  homeGoalsScoredAvg: number;
  awayGoalsScoredAvg: number;
  avgGoalsScored: number;
  homeGoalsConcededAvg: number;
  awayGoalsConcededAvg: number;
  avgGoalsConceded: number;
  homeWinPct: number;
  awayWinPct: number;
}

export interface DatasetDiagnostics {
  status: 'operational' | 'degraded';
  filesDetected: {
    seasonsCsv: boolean;
    analyticsCsv: boolean;
    telemetryCsv: boolean;
  };
  counts: {
    historicalSeasonsRows: number;
    distinctSeasonsCount: number;
    analyticsMatchPairs: number;
    telemetryMatchRecords: number;
  };
  availableSeasons: string[];
}

import { convertMadridTimeToIST, formatTo24Hour, formatTo12Hour } from '../utils/istTimeUtils';

export interface FixtureRecord {
  date: string; // YYYY-MM-DD (in IST)
  formattedDate: string; // DD.MM.YYYY (in IST)
  time: string; // 24-hr format (e.g. 00:30, 17:30)
  time24: string; // 24-hr format (e.g. 00:30, 17:30)
  time12: string; // 12-hr format (e.g. 12:30 AM, 5:30 PM)
  timeIST?: string; // e.g. 00:30 IST
  timeCET?: string; // Original CET / CEST time
  matchday: number;
  homeTeam: string;
  awayTeam: string;
  city: string;
  stadium: string;
  status: 'Played' | 'To be played' | 'Live' | string;
  result: string;
  homeScore: number | null;
  awayScore: number | null;
  season: string;
}

const cachedFixturesBySeason: Record<string, FixtureRecord[]> = {};

export function formatDateToDDMMYYYY(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }
  return isoDate;
}

export function clearFixturesCache(season?: string): void {
  if (season) {
    delete cachedFixturesBySeason[season];
  } else {
    Object.keys(cachedFixturesBySeason).forEach((k) => delete cachedFixturesBySeason[k]);
  }
}

export function loadSeasonFixtures(season: string = '2026-27'): FixtureRecord[] {
  if (cachedFixturesBySeason[season]) {
    return cachedFixturesBySeason[season];
  }

  const dataDir = path.resolve(process.cwd(), 'data');
  const seasonClean = season.replace(/\//g, '-');
  
  // Try season-specific file in local or absolute data directories
  const candidates = [
    path.join(dataDir, 'fixtures', `${seasonClean}.csv`),
    path.join('/data/fixtures', `${seasonClean}.csv`),
    path.join(dataDir, `laliga_fixtures_${seasonClean.replace('-', '_')}.csv`),
    path.join('/data', `laliga_fixtures_${seasonClean.replace('-', '_')}.csv`),
    path.join(dataDir, `${seasonClean}.csv`),
    path.join('/data', `${seasonClean}.csv`),
    path.join(dataDir, 'laliga_fixtures_2026_2027.csv'),
    path.join('/data', 'laliga_fixtures_2026_2027.csv'),
    path.join(dataDir, 'laliga_fixtures.csv'),
    path.join('/data', 'laliga_fixtures.csv'),
  ];

  let filePath = candidates.find((p) => fs.existsSync(p));

  if (!filePath) {
    return [];
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter((l) => l.trim().length > 0);
    const records: FixtureRecord[] = [];

    // Header: date,time,matchday,home_team,away_team,city,stadium,status,result
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 8) {
        const d = parts[0].trim();
        const time = parts[1].trim();
        const matchday = parseInt(parts[2].trim()) || 1;
        const homeTeam = parts[3].trim();
        const awayTeam = parts[4].trim();
        const city = parts[5].trim();
        const stadium = parts[6].trim();
        const status = parts[7].trim();
        const result = parts.length >= 9 ? parts[8].trim() : '';

        let homeScore: number | null = null;
        let awayScore: number | null = null;

        if (result && result.includes('-')) {
          const scoreParts = result.split('-');
          homeScore = parseInt(scoreParts[0].trim());
          awayScore = parseInt(scoreParts[1].trim());
          if (isNaN(homeScore)) homeScore = null;
          if (isNaN(awayScore)) awayScore = null;
        }

        let istDate = d;
        let istFormattedDate = d.split('-').length === 3 ? `${d.split('-')[2]}.${d.split('-')[1]}.${d.split('-')[0]}` : d;
        let time24 = formatTo24Hour(time);
        let time12 = formatTo12Hour(time);
        let istTimeWithLabel = `${time24} IST`;

        if (!time.toUpperCase().includes('AM') && !time.toUpperCase().includes('PM')) {
          const istConversion = convertMadridTimeToIST(d, time);
          istDate = istConversion.istDate;
          istFormattedDate = istConversion.istFormattedDate;
          time24 = istConversion.istTime24;
          time12 = istConversion.istTime12;
          istTimeWithLabel = istConversion.istTimeWithLabel;
        }

        records.push({
          date: istDate,
          formattedDate: istFormattedDate,
          time: time24,
          time24,
          time12,
          timeIST: istTimeWithLabel,
          timeCET: time,
          matchday,
          homeTeam,
          awayTeam,
          city,
          stadium,
          status,
          result,
          homeScore,
          awayScore,
          season,
        });
      }
    }

    cachedFixturesBySeason[season] = records;
    return records;
  } catch (err) {
    console.warn(`Could not load fixtures for season ${season}:`, err);
    return [];
  }
}

export function getFixturesByMatchday(season: string = '2026-27', matchday: number = 1): FixtureRecord[] {
  const all = loadSeasonFixtures(season);
  return all.filter((f) => f.matchday === matchday);
}

export function getFixturesByDate(date: string, season: string = '2026-27'): FixtureRecord[] {
  const all = loadSeasonFixtures(season);
  return all.filter((f) => f.date === date);
}

export const ALLOWED_LALIGA_SEASONS = [
  '2026-27',
  '2025-26',
  '2024-25',
  '2023-24',
  '2022-23',
  '2021-22',
  '2020-21',
];

export function getAvailableFixtureSeasons(): string[] {
  const allowedSet = new Set<string>(ALLOWED_LALIGA_SEASONS);
  const found = new Set<string>();
  const dataDir = path.resolve(process.cwd(), 'data');
  const dirs = [path.join(dataDir, 'fixtures'), '/data/fixtures'];

  dirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach((f) => {
        if (f.endsWith('.csv')) {
          const s = f.replace('.csv', '');
          if (allowedSet.has(s)) {
            found.add(s);
          }
        }
      });
    }
  });

  // Always ensure all allowed seasons are present
  ALLOWED_LALIGA_SEASONS.forEach((s) => found.add(s));

  // Sort so 2026-27 is top (active), then chronological descending
  return Array.from(found).sort((a, b) => {
    if (a === '2026-27') return -1;
    if (b === '2026-27') return 1;
    const aYr = parseInt(a.split('-')[0]) || 0;
    const bYr = parseInt(b.split('-')[0]) || 0;
    return bYr - aYr;
  });
}

export function getNextUpcomingMatchday(currentDate?: string, season: string = '2026-27'): {
  matchday: number;
  season: string;
  fixtures: FixtureRecord[];
} {
  const all = loadSeasonFixtures(season);
  const now = currentDate || new Date().toISOString().split('T')[0];

  // Find first fixture with 'To be played' or with date >= now
  const upcoming = all.find((f) => f.status === 'To be played' || f.date >= now);
  const targetMatchday = upcoming ? upcoming.matchday : (all.length > 0 ? all[all.length - 1].matchday : 1);
  const fixtures = all.filter((f) => f.matchday === targetMatchday);

  return {
    matchday: targetMatchday,
    season,
    fixtures,
  };
}

export interface SplitRecord {
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: string;
  gdNum: number;
  pts: number;
}

export interface ComputedStandingsRow {
  pos: number;
  code: string;
  name: string;
  stadium: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: string;
  gdNum: number;
  form: string[];
  pts: number;
  zone: 'ucl' | 'uel' | 'uecl' | 'relegation' | 'mid';
  home?: SplitRecord;
  away?: SplitRecord;
}

export function getStandingsFromFixtures(season: string = '2026-27', upToMatchday?: number): ComputedStandingsRow[] {
  const allFixtures = loadSeasonFixtures(season);
  const teams: Record<
    string,
    {
      name: string;
      p: number;
      w: number;
      d: number;
      l: number;
      gf: number;
      ga: number;
      pts: number;
      stadium: string;
      form: string[];
      home: { p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number };
      away: { p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number };
    }
  > = {};

  const h2h: Record<string, Record<string, { pts: number; gf: number; ga: number; played: number }>> = {};

  const teamStadiumMap: Record<string, string> = {
    'Barcelona': 'Spotify Camp Nou',
    'FC Barcelona': 'Spotify Camp Nou',
    'Real Madrid': 'Santiago Bernabéu',
    'Atletico Madrid': 'Riyadh Air Metropolitano',
    'Atlético de Madrid': 'Riyadh Air Metropolitano',
    'Athletic Club': 'San Mamés',
    'Real Sociedad': 'Reale Arena',
    'Real Betis': 'Estadio de La Cartuja',
    'Villarreal': 'Estadio de la Cerámica',
    'Sevilla': 'Ramón Sánchez-Pizjuán',
    'Valencia': 'Estadio de Mestalla',
    'Celta Vigo': 'Municipal de Balaídos',
    'Osasuna': 'Estadio El Sadar',
    'Espanyol': 'RCDE Stadium',
    'Getafe': 'Coliseum',
    'Rayo Vallecano': 'Campo de Futbol de Vallecas',
    'Alaves': 'Estadio Mendizorrotza',
    'Elche': 'Estadio Manuel Martínez Valero',
    'Levante': 'Estadio Ciudad de Valencia',
    'Deportivo La Coruna': 'Estadio Riazor',
    'Racing Santander': 'El Sardinero',
    'Malaga': 'Estadio La Rosaleda',
    'Cadiz': 'Estadio Nuevo Mirandilla',
    'Cádiz': 'Estadio Nuevo Mirandilla',
    'Almeria': 'Power Horse Stadium',
    'UD Almería': 'Power Horse Stadium',
    'Granada CF': 'Nuevo Los Cármenes',
    'Granada': 'Nuevo Los Cármenes',
    'Huesca': 'Estadio El Alcoraz',
    'SD Huesca': 'Estadio El Alcoraz',
    'Eibar': 'Estadio Municipal de Ipurúa',
    'SD Eibar': 'Estadio Municipal de Ipurúa',
    'Mallorca': 'Estadi Mallorca Son Moix',
    'RCD Mallorca': 'Estadi Mallorca Son Moix',
    'Girona': 'Estadi Montilivi',
    'Las Palmas': 'Estadio Gran Canaria',
    'UD Las Palmas': 'Estadio Gran Canaria',
    'Leganes': 'Estadio Municipal Butarque',
    'CD Leganés': 'Estadio Municipal Butarque',
    'Valladolid': 'Estadio Municipal José Zorrilla',
    'Real Valladolid': 'Estadio Municipal José Zorrilla',
    'Oviedo': 'Estadio Nuevo Carlos Tartiere',
    'Real Oviedo': 'Estadio Nuevo Carlos Tartiere',
  };

  const getCode = (name: string): string => {
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
      'Villarreal CF': 'VIL',
      'Sevilla': 'SFC',
      'Sevilla FC': 'SFC',
      'Valencia': 'VAL',
      'Valencia CF': 'VAL',
      'Celta Vigo': 'CEL',
      'RC Celta': 'CEL',
      'RC Celta de Vigo': 'CEL',
      'Osasuna': 'OSA',
      'CA Osasuna': 'OSA',
      'Espanyol': 'ESP',
      'RCD Espanyol': 'ESP',
      'Getafe': 'GET',
      'Getafe CF': 'GET',
      'Rayo Vallecano': 'RAY',
      'Alaves': 'ALA',
      'Deportivo Alavés': 'ALA',
      'Elche': 'ELC',
      'Elche CF': 'ELC',
      'Levante': 'LEV',
      'Levante UD': 'LEV',
      'Deportivo La Coruna': 'DEP',
      'Racing Santander': 'RAC',
      'Malaga': 'MAL',
      'Cadiz': 'CAD',
      'Cádiz': 'CAD',
      'Cádiz CF': 'CAD',
      'Almeria': 'ALM',
      'UD Almería': 'ALM',
      'Granada CF': 'GRA',
      'Granada': 'GRA',
      'Huesca': 'HUE',
      'SD Huesca': 'HUE',
      'Eibar': 'EIB',
      'SD Eibar': 'EIB',
      'Mallorca': 'MLL',
      'RCD Mallorca': 'MLL',
      'Girona': 'GIR',
      'Girona FC': 'GIR',
      'Las Palmas': 'LPA',
      'UD Las Palmas': 'LPA',
      'Leganes': 'LEG',
      'CD Leganés': 'LEG',
      'Valladolid': 'VLL',
      'Real Valladolid': 'VLL',
      'Oviedo': 'OVI',
      'Real Oviedo': 'OVI',
    };
    return map[name] || (name.substring(0, 3) || '').toUpperCase();
  };

  // Only consider played matches with actual scores (optionally filtered up to matchday)
  const playedFixtures = allFixtures.filter(
    (f) => f.status === 'Played' && f.homeScore !== null && f.awayScore !== null && (upToMatchday === undefined || f.matchday <= upToMatchday)
  );

  // Initialize all known 20 clubs
  allFixtures.forEach((f) => {
    [f.homeTeam, f.awayTeam].forEach((teamName) => {
      if (!teams[teamName]) {
        teams[teamName] = {
          name: teamName,
          p: 0,
          w: 0,
          d: 0,
          l: 0,
          gf: 0,
          ga: 0,
          pts: 0,
          stadium: teamStadiumMap[teamName] || f.stadium || 'Official Ground',
          form: [],
          home: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
          away: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        };
      }
    });
  });

  // Tally played fixtures
  playedFixtures.forEach((f) => {
    const home = f.homeTeam;
    const away = f.awayTeam;
    const hg = f.homeScore!;
    const ag = f.awayScore!;

    if (!teams[home]) {
      teams[home] = {
        name: home,
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        pts: 0,
        stadium: f.stadium,
        form: [],
        home: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        away: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      };
    }
    if (!teams[away]) {
      teams[away] = {
        name: away,
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        pts: 0,
        stadium: '',
        form: [],
        home: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        away: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      };
    }

    // Initialize H2H matrix
    if (!h2h[home]) h2h[home] = {};
    if (!h2h[away]) h2h[away] = {};
    if (!h2h[home][away]) h2h[home][away] = { pts: 0, gf: 0, ga: 0, played: 0 };
    if (!h2h[away][home]) h2h[away][home] = { pts: 0, gf: 0, ga: 0, played: 0 };

    teams[home].p++;
    teams[away].p++;
    teams[home].gf += hg;
    teams[home].ga += ag;
    teams[away].gf += ag;
    teams[away].ga += hg;

    teams[home].home.p++;
    teams[home].home.gf += hg;
    teams[home].home.ga += ag;

    teams[away].away.p++;
    teams[away].away.gf += ag;
    teams[away].away.ga += hg;

    h2h[home][away].played++;
    h2h[away][home].played++;
    h2h[home][away].gf += hg;
    h2h[home][away].ga += ag;
    h2h[away][home].gf += ag;
    h2h[away][home].ga += hg;

    if (hg > ag) {
      teams[home].w++;
      teams[home].pts += 3;
      teams[home].form.push('W');
      teams[home].home.w++;
      teams[home].home.pts += 3;

      teams[away].l++;
      teams[away].form.push('L');
      teams[away].away.l++;

      h2h[home][away].pts += 3;
    } else if (hg < ag) {
      teams[away].w++;
      teams[away].pts += 3;
      teams[away].form.push('W');
      teams[away].away.w++;
      teams[away].away.pts += 3;

      teams[home].l++;
      teams[home].form.push('L');
      teams[home].home.l++;

      h2h[away][home].pts += 3;
    } else {
      teams[home].d++;
      teams[home].pts += 1;
      teams[home].form.push('D');
      teams[home].home.d++;
      teams[home].home.pts += 1;

      teams[away].d++;
      teams[away].pts += 1;
      teams[away].form.push('D');
      teams[away].away.d++;
      teams[away].away.pts += 1;

      h2h[home][away].pts += 1;
      h2h[away][home].pts += 1;
    }
  });

  // Group by total points and resolve tiebreakers
  // Official La Liga rules:
  // - While season is in progress: Goal Difference (GD) is primary tiebreaker, then Goals Scored (GF).
  // - Once season completes (all 380 matches played): Head-to-Head mini-league between tied teams is primary.
  const isOngoingSeason = playedFixtures.length < allFixtures.length;

  const byPts: Record<number, typeof teams[string][]> = {};
  Object.values(teams).forEach((t) => {
    if (!byPts[t.pts]) byPts[t.pts] = [];
    byPts[t.pts].push(t);
  });

  const sorted: typeof teams[string][] = [];
  Object.keys(byPts)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach((pts) => {
      const group = byPts[pts];
      if (group.length === 1) {
        sorted.push(group[0]);
      } else {
        group.sort((a, b) => {
          if (isOngoingSeason) {
            // Ongoing season: Overall Goal Difference first
            const oGdA = a.gf - a.ga;
            const oGdB = b.gf - b.ga;
            if (oGdB !== oGdA) return oGdB - oGdA;
            // Next: Overall Goals Scored
            if (b.gf !== a.gf) return b.gf - a.gf;
            // Next: Head-to-head if both matches completed
            const h2hAB = h2h[a.name]?.[b.name];
            const h2hBA = h2h[b.name]?.[a.name];
            if (h2hAB && h2hBA && h2hAB.played === 2) {
              if (h2hBA.pts !== h2hAB.pts) return h2hBA.pts - h2hAB.pts;
            }
            return a.name.localeCompare(b.name);
          } else {
            // Season completed: Multi-way mini-league head-to-head among all tied clubs
            let ptsA = 0;
            let ptsB = 0;
            let gdA = 0;
            let gdB = 0;
            group.forEach((other) => {
              if (other.name !== a.name) {
                ptsA += h2h[a.name]?.[other.name]?.pts || 0;
                gdA += (h2h[a.name]?.[other.name]?.gf || 0) - (h2h[a.name]?.[other.name]?.ga || 0);
              }
              if (other.name !== b.name) {
                ptsB += h2h[b.name]?.[other.name]?.pts || 0;
                gdB += (h2h[b.name]?.[other.name]?.gf || 0) - (h2h[b.name]?.[other.name]?.ga || 0);
              }
            });
            if (ptsB !== ptsA) return ptsB - ptsA;
            if (gdB !== gdA) return gdB - gdA;
            // Overall Goal Difference
            const oGdA = a.gf - a.ga;
            const oGdB = b.gf - b.ga;
            if (oGdB !== oGdA) return oGdB - oGdA;
            // Overall Goals Scored
            return b.gf - a.gf;
          }
        });
        sorted.push(...group);
      }
    });

  return sorted.map((t, idx) => {
    const pos = idx + 1;
    const gdNum = t.gf - t.ga;
    const gd = gdNum > 0 ? `+${gdNum}` : `${gdNum}`;
    const zone: 'ucl' | 'uel' | 'uecl' | 'relegation' | 'mid' =
      season === '2024-25'
        ? pos <= 5
          ? 'ucl'
          : pos <= 7
          ? 'uel'
          : pos === 8
          ? 'uecl'
          : pos >= 18
          ? 'relegation'
          : 'mid'
        : season === '2022-23' && pos === 12
        ? 'ucl' // Sevilla won Europa League 2022-23 -> automatic UCL qualification
        : pos <= 4
        ? 'ucl'
        : pos <= 6
        ? 'uel'
        : pos === 7
        ? 'uecl'
        : pos >= 18
        ? 'relegation'
        : 'mid';

    const homeGdNum = t.home.gf - t.home.ga;
    const awayGdNum = t.away.gf - t.away.ga;

    return {
      pos,
      code: getCode(t.name),
      name: t.name,
      stadium: t.stadium,
      p: t.p,
      w: t.w,
      d: t.d,
      l: t.l,
      gf: t.gf,
      ga: t.ga,
      gd,
      gdNum,
      form: t.form.slice(-5),
      pts: t.pts,
      zone,
      home: {
        ...t.home,
        gdNum: homeGdNum,
        gd: homeGdNum > 0 ? `+${homeGdNum}` : `${homeGdNum}`,
      },
      away: {
        ...t.away,
        gdNum: awayGdNum,
        gd: awayGdNum > 0 ? `+${awayGdNum}` : `${awayGdNum}`,
      },
    };
  });
}

let cachedMatches: MatchRecord[] | null = null;
let cachedSeasons: HistoricalSeasonRow[] | null = null;
let cachedAnalytics: MatchAnalyticsRecord[] | null = null;

export function loadMatchTelemetry(): MatchRecord[] {
  if (cachedMatches) return cachedMatches;
  try {
    const csvPath = path.resolve(process.cwd(), 'data', 'laliga_match_telemetry.csv');
    if (!fs.existsSync(csvPath)) return [];
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n').filter((l) => l.trim().length > 0);

    const records: MatchRecord[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 17) {
        records.push({
          homeTeam: parts[0].trim(),
          awayTeam: parts[1].trim(),
          fthg: parseInt(parts[2]) || 0,
          ftag: parseInt(parts[3]) || 0,
          ftr: (parts[4].trim() as 'H' | 'A' | 'D') || 'D',
          hs: parseInt(parts[5]) || 0,
          as: parseInt(parts[6]) || 0,
          hst: parseInt(parts[7]) || 0,
          ast: parseInt(parts[8]) || 0,
          hf: parseInt(parts[9]) || 0,
          af: parseInt(parts[10]) || 0,
          hc: parseInt(parts[11]) || 0,
          ac: parseInt(parts[12]) || 0,
          hy: parseInt(parts[13]) || 0,
          ay: parseInt(parts[14]) || 0,
          hr: parseInt(parts[15]) || 0,
          ar: parseInt(parts[16]) || 0,
        });
      }
    }
    cachedMatches = records;
    return records;
  } catch (err) {
    console.warn('Could not read match telemetry CSV:', err);
    return [];
  }
}

export function loadHistoricalSeasons(): HistoricalSeasonRow[] {
  if (cachedSeasons) return cachedSeasons;
  try {
    const csvPath = path.resolve(process.cwd(), 'data', 'laliga_historical_seasons.csv');
    if (!fs.existsSync(csvPath)) return [];
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n').filter((l) => l.trim().length > 0);

    const rows: HistoricalSeasonRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 28) {
        const season = parts[0].trim();
        const sNo = parseInt(parts[1]) || 0;
        const team = parts[2].trim();
        const pos = parseInt(parts[parts.length - 5]) || 0;
        const p = parseInt(parts[parts.length - 4]) || 0;
        const w = parseInt(parts[parts.length - 3]) || 0;
        const d = parseInt(parts[parts.length - 2]) || 0;
        const l = parseInt(parts[parts.length - 1]) || 0;
        const points = w * 3 + d;

        // Head to head scores matrix columns 3 to 24 (index 3 to 24)
        const headToHeadScores: Record<number, string> = {};
        for (let col = 3; col < parts.length - 5; col++) {
          const val = parts[col].trim();
          if (val && val !== '') {
            headToHeadScores[col - 2] = val;
          }
        }

        if (season && team) {
          rows.push({
            season,
            sNo,
            team,
            position: pos,
            played: p,
            won: w,
            draw: d,
            lost: l,
            points,
            headToHeadScores,
          });
        }
      }
    }
    cachedSeasons = rows;
    return rows;
  } catch (err) {
    console.warn('Could not read historical seasons CSV:', err);
    return [];
  }
}

export function loadMatchAnalytics(): MatchAnalyticsRecord[] {
  if (cachedAnalytics) return cachedAnalytics;
  try {
    const csvPath = path.resolve(process.cwd(), 'data', 'laliga_match_analytics.csv');
    if (!fs.existsSync(csvPath)) return [];
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n').filter((l) => l.trim().length > 0);

    const records: MatchAnalyticsRecord[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 11) {
        records.push({
          homeTeam: parts[0].trim(),
          awayTeam: parts[1].trim(),
          matchResult: (parts[2].trim() as 'H' | 'A' | 'D') || 'D',
          homeGoalsScoredAvg: parseFloat(parts[3]) || 0,
          awayGoalsScoredAvg: parseFloat(parts[4]) || 0,
          avgGoalsScored: parseFloat(parts[5]) || 0,
          homeGoalsConcededAvg: parseFloat(parts[6]) || 0,
          awayGoalsConcededAvg: parseFloat(parts[7]) || 0,
          avgGoalsConceded: parseFloat(parts[8]) || 0,
          homeWinPct: parseFloat(parts[9]) || 0,
          awayWinPct: parseFloat(parts[10]) || 0,
        });
      }
    }
    cachedAnalytics = records;
    return records;
  } catch (err) {
    console.warn('Could not read match analytics CSV:', err);
    return [];
  }
}

export function getAvailableSeasonsList(): string[] {
  const rows = loadHistoricalSeasons();
  const set = new Set<string>();
  rows.forEach((r) => set.add(r.season));
  // Ingest fixture seasons like 2020-21 through 2026-27
  ALLOWED_LALIGA_SEASONS.forEach((s) => set.add(s));
  // Sort descending by starting year
  return Array.from(set).sort((a, b) => {
    const yearA = parseInt(a.split('-')[0]) || 0;
    const yearB = parseInt(b.split('-')[0]) || 0;
    return yearB - yearA;
  });
}

export function getSeasonTable(seasonId: string): HistoricalSeasonRow[] {
  const rows = loadHistoricalSeasons().filter((r) => r.season === seasonId);
  if (rows.length > 0) {
    return rows.sort((a, b) => a.position - b.position);
  }

  // Fallback to fixture computed standings (e.g. 2020-21)
  const standings = getStandingsFromFixtures(seasonId);
  if (standings.length > 0) {
    return standings.map((s, idx) => ({
      season: seasonId,
      sNo: idx + 1,
      team: s.name,
      position: s.pos,
      played: s.p,
      won: s.w,
      draw: s.d,
      lost: s.l,
      points: s.pts,
    }));
  }

  return [];
}

export function getTeamAnalytics(teamName: string): MatchAnalyticsRecord[] {
  const analytics = loadMatchAnalytics();
  return analytics.filter(
    (a) =>
      a.homeTeam.toLowerCase().includes(teamName.toLowerCase()) ||
      a.awayTeam.toLowerCase().includes(teamName.toLowerCase())
  );
}

export function getHeadToHeadAnalytics(homeTeam: string, awayTeam: string): MatchAnalyticsRecord | null {
  const analytics = loadMatchAnalytics();
  const match = analytics.find(
    (a) =>
      a.homeTeam.toLowerCase().includes(homeTeam.toLowerCase()) &&
      a.awayTeam.toLowerCase().includes(awayTeam.toLowerCase())
  );
  return match || null;
}

export function getTeamAverages(teamName: string) {
  const matches = loadMatchTelemetry();
  const teamMatches = matches.filter(
    (m) =>
      m.homeTeam.toLowerCase().includes(teamName.toLowerCase()) ||
      m.awayTeam.toLowerCase().includes(teamName.toLowerCase())
  );

  if (teamMatches.length === 0) return null;

  let totalGoalsScored = 0;
  let totalGoalsConceded = 0;
  let totalShots = 0;
  let totalShotsOnTarget = 0;
  let totalFouls = 0;
  let totalCorners = 0;
  let totalYellows = 0;
  let totalReds = 0;
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let cleanSheets = 0;

  teamMatches.forEach((m) => {
    const isHome = m.homeTeam.toLowerCase().includes(teamName.toLowerCase());
    const scored = isHome ? m.fthg : m.ftag;
    const conceded = isHome ? m.ftag : m.fthg;
    
    totalGoalsScored += scored;
    totalGoalsConceded += conceded;
    totalShots += isHome ? m.hs : m.as;
    totalShotsOnTarget += isHome ? m.hst : m.ast;
    totalFouls += isHome ? m.hf : m.af;
    totalCorners += isHome ? m.hc : m.ac;
    totalYellows += isHome ? m.hy : m.ay;
    totalReds += isHome ? m.hr : m.ar;

    if (conceded === 0) cleanSheets++;

    if (isHome) {
      if (m.ftr === 'H') wins++;
      else if (m.ftr === 'D') draws++;
      else losses++;
    } else {
      if (m.ftr === 'A') wins++;
      else if (m.ftr === 'D') draws++;
      else losses++;
    }
  });

  const count = teamMatches.length;
  return {
    matchesRecorded: count,
    wins,
    draws,
    losses,
    winRatePct: +((wins / count) * 100).toFixed(1),
    cleanSheets,
    cleanSheetPct: +((cleanSheets / count) * 100).toFixed(1),
    avgGoalsScored: +(totalGoalsScored / count).toFixed(2),
    avgGoalsConceded: +(totalGoalsConceded / count).toFixed(2),
    avgShots: +(totalShots / count).toFixed(2),
    avgShotsOnTarget: +(totalShotsOnTarget / count).toFixed(2),
    shotAccuracyPct: +((totalShotsOnTarget / (totalShots || 1)) * 100).toFixed(1),
    avgFouls: +(totalFouls / count).toFixed(2),
    avgCorners: +(totalCorners / count).toFixed(2),
    totalYellows,
    totalReds,
  };
}

export function getDatasetDiagnostics(): DatasetDiagnostics {
  const telemetry = loadMatchTelemetry();
  const seasons = loadHistoricalSeasons();
  const analytics = loadMatchAnalytics();
  const seasonsList = getAvailableSeasonsList();

  const dataDir = path.resolve(process.cwd(), 'data');
  const seasonsPath = path.join(dataDir, 'laliga_historical_seasons.csv');
  const analyticsPath = path.join(dataDir, 'laliga_match_analytics.csv');
  const telemetryPath = path.join(dataDir, 'laliga_match_telemetry.csv');

  const filesDetected = {
    seasonsCsv: fs.existsSync(seasonsPath),
    analyticsCsv: fs.existsSync(analyticsPath),
    telemetryCsv: fs.existsSync(telemetryPath),
  };

  const isOperational = filesDetected.seasonsCsv && filesDetected.analyticsCsv && filesDetected.telemetryCsv;

  return {
    status: isOperational ? 'operational' : 'degraded',
    filesDetected,
    counts: {
      historicalSeasonsRows: seasons.length,
      distinctSeasonsCount: seasonsList.length,
      analyticsMatchPairs: analytics.length,
      telemetryMatchRecords: telemetry.length,
    },
    availableSeasons: seasonsList,
  };
}
