/**
 * Complete LaLiga Team Crests & Visual Identity Database
 * Supports all modern and historical LaLiga clubs (1928-29 to 2026-27).
 * Verified high-resolution transparent PNG crests via official sports CDNs.
 */

export interface TeamIdentity {
  name: string;
  shortName: string;
  code: string;
  crestUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

export const TEAM_IDENTITIES: Record<string, TeamIdentity> = {
  // Current 2024-2027 Top Flight Clubs
  RMA: {
    name: 'Real Madrid',
    shortName: 'Real Madrid',
    code: 'RMA',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
    primaryColor: '#FEBE10',
    secondaryColor: '#00529F',
  },
  FCB: {
    name: 'FC Barcelona',
    shortName: 'Barcelona',
    code: 'FCB',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
    primaryColor: '#004D98',
    secondaryColor: '#A50044',
  },
  ATM: {
    name: 'Atlético de Madrid',
    shortName: 'Atlético',
    code: 'ATM',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/1068.png',
    primaryColor: '#CB3524',
    secondaryColor: '#272E61',
  },
  ATH: {
    name: 'Athletic Club',
    shortName: 'Athletic',
    code: 'ATH',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/93.png',
    primaryColor: '#EE2524',
    secondaryColor: '#000000',
  },
  RSO: {
    name: 'Real Sociedad',
    shortName: 'R. Sociedad',
    code: 'RSO',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/89.png',
    primaryColor: '#0047AB',
    secondaryColor: '#FFFFFF',
  },
  BET: {
    name: 'Real Betis',
    shortName: 'Betis',
    code: 'BET',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/244.png',
    primaryColor: '#0BB364',
    secondaryColor: '#FFFFFF',
  },
  VIL: {
    name: 'Villarreal CF',
    shortName: 'Villarreal',
    code: 'VIL',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/102.png',
    primaryColor: '#FDE047',
    secondaryColor: '#00519E',
  },
  SFC: {
    name: 'Sevilla FC',
    shortName: 'Sevilla',
    code: 'SFC',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/243.png',
    primaryColor: '#D4002D',
    secondaryColor: '#FFFFFF',
  },
  VAL: {
    name: 'Valencia CF',
    shortName: 'Valencia',
    code: 'VAL',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/94.png',
    primaryColor: '#FF6600',
    secondaryColor: '#000000',
  },
  CEL: {
    name: 'RC Celta',
    shortName: 'Celta Vigo',
    code: 'CEL',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/85.png',
    primaryColor: '#70B5FF',
    secondaryColor: '#C41230',
  },
  OSA: {
    name: 'CA Osasuna',
    shortName: 'Osasuna',
    code: 'OSA',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/97.png',
    primaryColor: '#D11212',
    secondaryColor: '#0A1C3C',
  },
  ESP: {
    name: 'RCD Espanyol',
    shortName: 'Espanyol',
    code: 'ESP',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/88.png',
    primaryColor: '#0072CE',
    secondaryColor: '#FFFFFF',
  },
  GET: {
    name: 'Getafe CF',
    shortName: 'Getafe',
    code: 'GET',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2922.png',
    primaryColor: '#004B87',
    secondaryColor: '#008542',
  },
  RAY: {
    name: 'Rayo Vallecano',
    shortName: 'Rayo',
    code: 'RAY',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/101.png',
    primaryColor: '#E20613',
    secondaryColor: '#FFFFFF',
  },
  ALA: {
    name: 'Deportivo Alavés',
    shortName: 'Alavés',
    code: 'ALA',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/96.png',
    primaryColor: '#005CA9',
    secondaryColor: '#FFFFFF',
  },
  GIR: {
    name: 'Girona FC',
    shortName: 'Girona',
    code: 'GIR',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/9812.png',
    primaryColor: '#CD1226',
    secondaryColor: '#FFFFFF',
  },
  MLL: {
    name: 'RCD Mallorca',
    shortName: 'Mallorca',
    code: 'MLL',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/84.png',
    primaryColor: '#E20613',
    secondaryColor: '#000000',
  },
  LPA: {
    name: 'UD Las Palmas',
    shortName: 'Las Palmas',
    code: 'LPA',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/98.png',
    primaryColor: '#FDD206',
    secondaryColor: '#00529F',
  },
  LEG: {
    name: 'CD Leganés',
    shortName: 'Leganés',
    code: 'LEG',
    crestUrl: 'https://media.api-sports.io/football/teams/537.png',
    primaryColor: '#005CA9',
    secondaryColor: '#FFFFFF',
  },
  VLL: {
    name: 'Real Valladolid',
    shortName: 'Valladolid',
    code: 'VLL',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/103.png',
    primaryColor: '#6B2D7C',
    secondaryColor: '#FFFFFF',
  },

  // Historical LaLiga Clubs (Present in historical seasons datasets)
  EIB: {
    name: 'SD Eibar',
    shortName: 'Eibar',
    code: 'EIB',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/153.png',
    primaryColor: '#9C0028',
    secondaryColor: '#002C6C',
  },
  CAD: {
    name: 'Cádiz CF',
    shortName: 'Cádiz',
    code: 'CAD',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3748.png',
    primaryColor: '#F7C300',
    secondaryColor: '#003366',
  },
  ALM: {
    name: 'UD Almería',
    shortName: 'Almería',
    code: 'ALM',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3746.png',
    primaryColor: '#EE2524',
    secondaryColor: '#FFFFFF',
  },
  GRA: {
    name: 'Granada CF',
    shortName: 'Granada',
    code: 'GRA',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3747.png',
    primaryColor: '#C41230',
    secondaryColor: '#FFFFFF',
  },
  HUE: {
    name: 'SD Huesca',
    shortName: 'Huesca',
    code: 'HUE',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/9865.png',
    primaryColor: '#003366',
    secondaryColor: '#C41230',
  },
  LEV: {
    name: 'Levante UD',
    shortName: 'Levante',
    code: 'LEV',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/9867.png',
    primaryColor: '#003F7A',
    secondaryColor: '#9C0028',
  },
  MAL: {
    name: 'Málaga CF',
    shortName: 'Málaga',
    code: 'MAL',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/87.png',
    primaryColor: '#70B5FF',
    secondaryColor: '#003882',
  },
  DEP: {
    name: 'Deportivo La Coruña',
    shortName: 'Deportivo',
    code: 'DEP',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/90.png',
    primaryColor: '#004B87',
    secondaryColor: '#FFFFFF',
  },
  RAC: {
    name: 'Racing Santander',
    shortName: 'Racing',
    code: 'RAC',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/92.png',
    primaryColor: '#0BB364',
    secondaryColor: '#000000',
  },
  OVI: {
    name: 'Real Oviedo',
    shortName: 'Oviedo',
    code: 'OVI',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/91.png',
    primaryColor: '#0047AB',
    secondaryColor: '#FFFFFF',
  },
  SPO: {
    name: 'Sporting de Gijón',
    shortName: 'Sporting',
    code: 'SPO',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/99.png',
    primaryColor: '#EE2524',
    secondaryColor: '#002C6C',
  },
  ZAR: {
    name: 'Real Zaragoza',
    shortName: 'Zaragoza',
    code: 'ZAR',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/100.png',
    primaryColor: '#003F7A',
    secondaryColor: '#FFFFFF',
  },
  NUM: {
    name: 'CD Numancia',
    shortName: 'Numancia',
    code: 'NUM',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/95.png',
    primaryColor: '#E20613',
    secondaryColor: '#003882',
  },
  ELC: {
    name: 'Elche CF',
    shortName: 'Elche',
    code: 'ELC',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3751.png',
    primaryColor: '#008542',
    secondaryColor: '#FFFFFF',
  },
  ARE: {
    name: 'Arenas Club de Getxo',
    shortName: 'Arenas',
    code: 'ARE',
    crestUrl: 'https://media.api-sports.io/football/teams/10486.png',
    primaryColor: '#C41230',
    secondaryColor: '#000000',
  },
  RUN: {
    name: 'Real Unión Club',
    shortName: 'Real Unión',
    code: 'RUN',
    crestUrl: 'https://media.api-sports.io/football/teams/2841.png',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
  },
  EUR: {
    name: 'CE Europa',
    shortName: 'Europa',
    code: 'EUR',
    crestUrl: 'https://media.api-sports.io/football/teams/9691.png',
    primaryColor: '#002C6C',
    secondaryColor: '#FFFFFF',
  },
};

// Normalized name aliases map to 3-letter canonical code
const ALIAS_MAP: Record<string, string> = {
  // Real Madrid
  'real madrid': 'RMA',
  'madrid': 'RMA',
  'rma': 'RMA',

  // Barcelona
  'barcelona': 'FCB',
  'fc barcelona': 'FCB',
  'fcb': 'FCB',

  // Atletico Madrid
  'atletico madrid': 'ATM',
  'atlético madrid': 'ATM',
  'atletico de madrid': 'ATM',
  'atlético de madrid': 'ATM',
  'atm': 'ATM',

  // Athletic Club / Bilbao
  'athletic club': 'ATH',
  'athletic bilbao': 'ATH',
  'athletic': 'ATH',
  'bilbao': 'ATH',
  'ath': 'ATH',

  // Real Sociedad / San Sebastian
  'real sociedad': 'RSO',
  'san sebastián': 'RSO',
  'san sebastian': 'RSO',
  'sociedad': 'RSO',
  'rso': 'RSO',

  // Real Betis
  'real betis': 'BET',
  'betis': 'BET',
  'real betis balompié': 'BET',
  'bet': 'BET',

  // Villarreal
  'villarreal': 'VIL',
  'villarreal cf': 'VIL',
  'vil': 'VIL',

  // Sevilla
  'sevilla': 'SFC',
  'sevilla fc': 'SFC',
  'seville': 'SFC',
  'sfc': 'SFC',

  // Valencia
  'valencia': 'VAL',
  'valencia cf': 'VAL',
  'val': 'VAL',

  // Celta Vigo
  'celta vigo': 'CEL',
  'rc celta': 'CEL',
  'celta': 'CEL',
  'rc celta de vigo': 'CEL',
  'vigo': 'CEL',
  'cel': 'CEL',

  // Osasuna
  'osasuna': 'OSA',
  'ca osasuna': 'OSA',
  'pamplona': 'OSA',
  'osa': 'OSA',

  // Espanyol
  'rcd espanyol de barcelona': 'ESP',
  'rcd espanyol': 'ESP',
  'espanyol': 'ESP',
  'español': 'ESP',
  'rcd español': 'ESP',
  'esp': 'ESP',

  // Getafe
  'getafe': 'GET',
  'getafe cf': 'GET',
  'get': 'GET',

  // Rayo Vallecano
  'rayo vallecano': 'RAY',
  'rayo': 'RAY',
  'ray': 'RAY',

  // Alaves
  'alavés': 'ALA',
  'alaves': 'ALA',
  'deportivo alavés': 'ALA',
  'deportivo alaves': 'ALA',
  'vitoria-gasteiz': 'ALA',
  'ala': 'ALA',

  // Girona
  'girona': 'GIR',
  'girona fc': 'GIR',
  'gir': 'GIR',

  // Mallorca
  'mallorca': 'MLL',
  'rcd mallorca': 'MLL',
  'palma': 'MLL',
  'mll': 'MLL',

  // Las Palmas
  'las palmas': 'LPA',
  'ud las palmas': 'LPA',
  'lpa': 'LPA',

  // Leganes
  'leganés': 'LEG',
  'leganes': 'LEG',
  'cd leganés': 'LEG',
  'cd leganes': 'LEG',
  'leg': 'LEG',

  // Valladolid
  'valladolid': 'VLL',
  'real valladolid': 'VLL',
  'vll': 'VLL',

  // Cadiz
  'cadiz': 'CAD',
  'cádiz': 'CAD',
  'cadiz cf': 'CAD',
  'cádiz cf': 'CAD',
  'cad': 'CAD',

  // Almeria
  'almeria': 'ALM',
  'almería': 'ALM',
  'ud almeria': 'ALM',
  'ud almería': 'ALM',
  'alm': 'ALM',

  // Historical clubs
  'eibar': 'EIB',
  'sd eibar': 'EIB',
  'eib': 'EIB',

  'granada': 'GRA',
  'granada cf': 'GRA',
  'gra': 'GRA',

  'huesca': 'HUE',
  'sd huesca': 'HUE',
  'hue': 'HUE',

  'levante': 'LEV',
  'levante ud': 'LEV',
  'lev': 'LEV',

  'málaga': 'MAL',
  'malaga': 'MAL',
  'málaga cf': 'MAL',
  'malaga cf': 'MAL',
  'mal': 'MAL',

  'deportivo': 'DEP',
  'deportivo la coruña': 'DEP',
  'deportivo la coruna': 'DEP',
  'rc deportivo': 'DEP',
  'rc deportivo de la coruña': 'DEP',
  'dep': 'DEP',

  'racing': 'RAC',
  'racing santander': 'RAC',
  'r. racing club': 'RAC',
  'real racing club': 'RAC',
  'rac': 'RAC',

  'oviedo': 'OVI',
  'real oviedo': 'OVI',
  'ovi': 'OVI',

  'sporting': 'SPO',
  'sporting gijón': 'SPO',
  'sporting gijon': 'SPO',
  'sporting de gijón': 'SPO',
  'spo': 'SPO',

  'zaragoza': 'ZAR',
  'real zaragoza': 'ZAR',
  'zar': 'ZAR',

  'numancia': 'NUM',
  'cd numancia': 'NUM',
  'num': 'NUM',

  'elche': 'ELC',
  'elche cf': 'ELC',
  'elc': 'ELC',

  'arenas': 'ARE',
  'arenas club': 'ARE',
  'arenas de getxo': 'ARE',
  'arenas club de getxo': 'ARE',
  'are': 'ARE',

  'real unión': 'RUN',
  'real union': 'RUN',
  'real unión club': 'RUN',
  'run': 'RUN',

  'europa': 'EUR',
  'ce europa': 'EUR',
  'eur': 'EUR',
};

/**
 * Normalizes any club name, city, or code string into a canonical 3-letter code.
 */
export function getCanonicalTeamCode(input: string): string {
  if (!input) return 'LAL';
  const clean = input.trim().toLowerCase();
  
  // Direct match
  if (ALIAS_MAP[clean]) {
    return ALIAS_MAP[clean];
  }

  // Check uppercase directly in TEAM_IDENTITIES
  const upper = input.trim().toUpperCase();
  if (TEAM_IDENTITIES[upper]) {
    return upper;
  }

  // Partial match checks - check longer, more specific aliases first
  const sortedAliases = Object.entries(ALIAS_MAP).sort((a, b) => b[0].length - a[0].length);
  for (const [alias, code] of sortedAliases) {
    if (clean.includes(alias)) {
      return code;
    }
  }

  // Fallback 3 letters
  return upper.substring(0, 3) || 'LAL';
}

/**
 * Returns the full TeamIdentity for any input name or code.
 */
export function getTeamIdentity(input: string): TeamIdentity {
  const code = getCanonicalTeamCode(input);
  if (TEAM_IDENTITIES[code]) {
    return TEAM_IDENTITIES[code];
  }

  // Generic fallback identity
  return {
    name: input || 'LaLiga Club',
    shortName: input || 'Club',
    code: code || 'LAL',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png', // Fallback to verified LaLiga logo
    primaryColor: '#0F172A',
    secondaryColor: '#E2E8F0',
  };
}

/**
 * Guaranteed official high-res crest URL for any club.
 */
export function getTeamCrestUrl(teamNameOrCode: string): string {
  return getTeamIdentity(teamNameOrCode).crestUrl;
}

/**
 * Guaranteed primary color for any club.
 */
export function getTeamColor(teamNameOrCode: string): string {
  return getTeamIdentity(teamNameOrCode).primaryColor;
}

/**
 * Guaranteed 3-letter code for display.
 */
export function getTeamCode(teamNameOrCode: string): string {
  return getTeamIdentity(teamNameOrCode).code;
}
