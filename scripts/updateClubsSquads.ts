import fs from 'fs';

// Parse CSV
const csvRaw = fs.readFileSync('data/laliga_squads_2026_27.csv', 'utf8');
const lines = csvRaw.split('\n').filter((l) => l.trim().length > 0);

interface CsvPlayer {
  playerId: number;
  teamId: number;
  teamName: string;
  coachName: string;
  squadIndex: number;
  jerseyNumber: string;
  role: string;
  playerName: string;
}

const csvPlayers: CsvPlayer[] = [];
for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split(',');
  if (parts.length >= 8) {
    csvPlayers.push({
      playerId: parseInt(parts[0].trim()),
      teamId: parseInt(parts[1].trim()),
      teamName: parts[2].trim(),
      coachName: parts[3].trim(),
      squadIndex: parseInt(parts[4].trim()),
      jerseyNumber: parts[5].trim(),
      role: parts[6].trim(),
      playerName: parts[7].trim(),
    });
  }
}

const TEAM_NAME_TO_CODE: Record<string, string> = {
  'Athletic Club': 'ATH',
  'Atlético Madrid': 'ATM',
  'CA Osasuna': 'OSA',
  'Deportivo Alavés': 'ALA',
  'Deportivo de La Coruña': 'DEP',
  'Elche CF': 'ELC',
  'FC Barcelona': 'FCB',
  'Getafe CF': 'GET',
  'Levante UD': 'LEV',
  'Málaga CF': 'MAL',
  'RC Celta de Vigo': 'CEL',
  'RCD Espanyol de Barcelona': 'ESP',
  'Rayo Vallecano': 'RAY',
  'Real Betis Balompié': 'BET',
  'Real Madrid': 'RMA',
  'Real Racing Club': 'RAC',
  'Real Sociedad': 'RSO',
  'Sevilla FC': 'SFC',
  'Valencia CF': 'VAL',
  'Villarreal CF': 'VIL',
};

const AVATAR_POOL = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
];

const SPECIAL_PLAYERS: Record<string, { img?: string; badge?: string; val?: string; statLabel?: string; statVal?: string }> = {
  'Robert Lewandowski': {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9nspUO4nUx5pIrntP-O1sDRBEVGuAiR3eJeyyapJOPq7uCYwzIuhJK6R8v7ZxSTVMwVSrj2NUOEzp8N2yqtKXIhzsFeRGyA8rcBoa8QYGdxsb0-DvhaR0_5lzxFUpuEHu-g0ImfsWYuJsL11GTCI7F3qvwzDbbXtFuEt-_xieOjNgq9KUTe0XBYXaeZwFYBJGdTgcrEdwwdI09Xsq1GFPV1BlniQ46NkQ295uWfc',
    badge: 'PICHICHI',
    val: '€15.0M',
    statLabel: 'Goals / xG',
    statVal: '24 Goals / 21.4 xG',
  },
  'Lamine Yamal': {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYFM56Q-r89U6KBoCjE4F613zb4TNOxL9oXdnxJZ_B1hHnI0LCXkbGWIlgyBHVu76W4tXXZMT9k8Ui_TgHOvPi5U7zNyjA8X70EnMbhWkcAKVhaFKEcWNqWTuyRnm8E0V_YK8yChLMTpPURlDoxQswMV_iGnm2BzmcA0somarzGhBWFmDFM7mvvEEEfh4qzXOCEmuOy9r9IAxrVjVVJrKYQ0QVs_ycRrsGrIgtL5o',
    badge: 'MASIA',
    val: '€150.0M',
    statLabel: 'G/A + Take-ons',
    statVal: '9G, 14A • 4.1 Drb',
  },
  'Pau Cubarsí': {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH_fTmyjHk8o_DKknolp9YzdJJ6vcC7CsUOEGOiMjBYYNIo2uqGU0Qjg6pVQZvhm_B4KA4O_z6AzLWTpOxxUcuP0tif_6wljxs9GwxxpqH6BHY5krw0b3lDvlx9jjo_5VxG0aTe4RwKS4INmKOayEqoc1MsiXbBw0t2WnaS-qtGaHGddthGA3mJGL9dIP3BPAI1s_QUOlGTDVxxx-HgmnXiLMrFg42brHwDlcqQiY',
    badge: 'MASIA',
    val: '€40.0M',
    statLabel: 'Pass Accuracy',
    statVal: '91.8% (94.2/90)',
  },
  'Pedri': {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPR6MdsXPdGevNK0WYNgompOaO51J8nLaVo_XCeZYB7kRKb9SulBYSwQXZZ40ERSrmh2iMTefDuFQ8TG8f48-94y44L9XAopHHq2Ue30FhUNIbytFUYe3gERAyfgI77Z_9XVA2s_1nuTCugWv2x4Af6FHJcpYcKicD6m87RdeDe5SV8nV8g3QJ7T1aK1J3Kn-yFf-MOGtgYQJJ2ZZC85gAWRWMccaG3AfBOn0WefA',
    val: '€80.0M',
    statLabel: 'Key Passes',
    statVal: '2.8 per 90',
  },
  'Marc-André ter Stegen': {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe6o_5a1kVTx87sgYx1j2N4ERRybY971Vagt8O2gK9_CFky8Tw-WcJNhW_8wTX1tbLDCoDlDd5Y9UlaSqkkH2iEyitKwOBJl8lqq1xD6OFDlsHjJJNIBPD9m6YJrtInrkdiqNarOJAK5d9wRF-SS30ui2tss-Iz_WAMIKprUPXGDQ9JgdyFNqQO0DB7Lx28GnDB4-0iCOFZqk8U9l7EUyAIT-508UCsFP9wsOJoIo',
    badge: 'CAPTAIN',
    val: '€28.0M',
    statLabel: 'Clean Sheets',
    statVal: '12 Clean (75.4% SV)',
  },
  'Kylian Mbappé': {
    badge: 'GALÁCTICO',
    val: '€180.0M',
    statLabel: 'Sprint Velocity',
    statVal: '36.2 km/h • 0.88 G/90',
  },
  'Vinícius Júnior': {
    badge: 'UCL MVP',
    val: '€200.0M',
    statLabel: 'Take-on Success',
    statVal: '68.4% (4.2/90)',
  },
  'Jude Bellingham': {
    badge: 'KOPA',
    val: '€180.0M',
    statLabel: 'Ground Duels',
    statVal: '64.1% Won (7.4/90)',
  },
  'Antoine Griezmann': {
    badge: 'ICON',
    val: '€25.0M',
    statLabel: 'Goal Contributions',
    statVal: '16G, 8A per season',
  },
  'Jan Oblak': {
    badge: 'ZAMORA x5',
    val: '€28.0M',
    statLabel: 'Save Percentage',
    statVal: '76.8% (Post-Shot xG +4.2)',
  },
  'Nico Williams': {
    badge: 'EURO CHAMP',
    val: '€70.0M',
    statLabel: 'Dribbles per 90',
    statVal: '5.2 successful/90',
  },
  'Iñaki Williams': {
    badge: 'RECORD IRONMAN',
    val: '€25.0M',
    statLabel: 'Consecutive Matches',
    statVal: '251 Unbroken Games',
  },
  'Dani Olmo': {
    badge: 'EURO STAR',
    val: '€60.0M',
    statLabel: 'G/A per 90',
    statVal: '0.92 G/A per 90',
  },
  'Gavi': {
    badge: 'MASIA',
    val: '€90.0M',
    statLabel: 'Ground Duels',
    statVal: '8.2 won/90',
  },
  'Raphinha': {
    val: '€60.0M',
    statLabel: 'Chances Created',
    statVal: '3.6 per 90',
  },
};

function getCategoryFromRole(role: string): 'gk' | 'def' | 'mid' | 'fwd' {
  const r = role.toLowerCase();
  if (r.includes('goalkeeper') || r === 'gk') return 'gk';
  if (r.includes('defender') || r.includes('back') || r.includes('cb') || r.includes('rb') || r.includes('lb')) return 'def';
  if (r.includes('midfielder') || r.includes('mid') || r.includes('playmaker')) return 'mid';
  if (r.includes('attacker') || r.includes('forward') || r.includes('striker') || r.includes('winger')) return 'fwd';
  return 'mid';
}

function getDefaultStatForCategory(category: 'gk' | 'def' | 'mid' | 'fwd', idx: number) {
  if (category === 'gk') {
    const sv = (71 + (idx * 3) % 9).toFixed(1);
    return { statLabel: 'Save Percentage', statVal: `${sv}% SV` };
  }
  if (category === 'def') {
    const duels = (64 + (idx * 4) % 22).toFixed(1);
    return { statLabel: 'Duels Won', statVal: `${duels}% (${(2.0 + (idx * 0.3) % 2).toFixed(1)}/90)` };
  }
  if (category === 'mid') {
    const pass = (83 + (idx * 3) % 11).toFixed(1);
    return { statLabel: 'Pass Accuracy', statVal: `${pass}% completion` };
  }
  // fwd
  const chances = (2.1 + (idx * 0.3) % 2).toFixed(1);
  return { statLabel: 'Chances Created', statVal: `${chances} per 90` };
}

function getDefaultValForRole(category: 'gk' | 'def' | 'mid' | 'fwd', idx: number): string {
  const base = category === 'fwd' ? 18 : category === 'mid' ? 15 : category === 'def' ? 12 : 8;
  const mod = (idx * 7) % 22;
  return `€${base + mod}.0M`;
}

// Group csv players by team
const playersByTeam = new Map<string, { coachName: string; players: CsvPlayer[] }>();
csvPlayers.forEach((p) => {
  if (!playersByTeam.has(p.teamName)) {
    playersByTeam.set(p.teamName, { coachName: p.coachName, players: [] });
  }
  playersByTeam.get(p.teamName)!.players.push(p);
});

// Club Metadatas (Stadiums, Trophies, Kits, Colors, etc.)
const CLUB_STATIC_META: Record<string, any> = {
  FCB: {
    name: 'FC Barcelona',
    fullName: 'Futbol Club Barcelona',
    city: 'Barcelona, Catalonia',
    founded: 1899,
    president: 'Joan Laporta',
    stadium: {
      name: 'Spotify Camp Nou (Estadi Olímpic Lluís Companys)',
      capacity: 55926,
      city: 'Barcelona',
      inaugurated: 1957,
      pitchSize: '105 x 68 m',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCzY_Qc7bH1U8y3aZ1yWq4hR5tM-6g1P3d5K8nL7vX9zJ2yQ4k6uL0m8n1r7w2b9o3a1c4e7g0i',
    },
    tier: 'ucl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
    tagColor: 'text-primary',
    primaryColor: '#004D98',
    secondaryColor: '#A50044',
    nicknames: ['Blaugrana', 'Culés'],
    motto: 'Més que un club (More than a club)',
    trophies: [
      { name: 'LaLiga Titles', count: 27, icon: 'military_tech', years: '1929, 1945, 1948, 1949, 1952, 1953, 1959, 1960, 1974, 1985, 1991, 1992, 1993, 1994, 1998, 1999, 2005, 2006, 2009, 2010, 2011, 2013, 2015, 2016, 2018, 2019, 2023' },
      { name: 'Copa del Rey', count: 31, icon: 'emoji_events', years: 'Record 31 titles' },
      { name: 'UEFA Champions League', count: 5, icon: 'workspace_premium', years: '1992, 2006, 2009, 2011, 2015' },
      { name: 'Supercopa de España', count: 14, icon: 'shield', years: '14 titles' },
    ],
    kits: [
      { season: '2024/25', type: 'Home 125th Anniversary', colorName: 'Deep Blaugrana Split', badge: '125 YRS', desc: 'Symmetrical half-and-half classic homage to 1899 founding kit.', hexPrimary: '#004D98', hexSecondary: '#A50044' },
      { season: '2024/25', type: 'Away Blackout', colorName: 'Stealth Obsidian Gold', badge: 'LIMITED', desc: 'Monochromatic obsidian body with iridescent metallic crest.', hexPrimary: '#111827', hexSecondary: '#F59E0B' },
      { season: '2023/24', type: 'Senyera Special', colorName: 'Catalan Gold Red', badge: 'HERITAGE', desc: 'Traditional four blood-red bars across golden backdrop.', hexPrimary: '#FBBF24', hexSecondary: '#DC2626' },
    ],
  },
  RMA: {
    name: 'Real Madrid',
    fullName: 'Real Madrid Club de Fútbol',
    city: 'Madrid, Community of Madrid',
    founded: 1902,
    president: 'Florentino Pérez',
    stadium: {
      name: 'Estadio Santiago Bernabéu',
      capacity: 81044,
      city: 'Madrid',
      inaugurated: 1947,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'ucl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
    tagColor: 'text-secondary',
    primaryColor: '#FEBE10',
    secondaryColor: '#00529F',
    nicknames: ['Los Blancos', 'Los Merengues', 'La Casa Blanca'],
    motto: '¡Hala Madrid y nada más!',
    trophies: [
      { name: 'LaLiga Titles', count: 36, icon: 'military_tech', years: 'Record 36 titles (1932 to 2024)' },
      { name: 'UEFA Champions League', count: 15, icon: 'workspace_premium', years: 'Record 15 European Cups' },
      { name: 'Copa del Rey', count: 20, icon: 'emoji_events', years: '20 titles' },
      { name: 'Supercopa de España', count: 13, icon: 'shield', years: '13 titles' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Blanco Houndstooth', colorName: 'Pure White & Gold', badge: 'CLASSIC', desc: 'Houndstooth fabric pattern woven with bespoke golden crest embroidery.', hexPrimary: '#FFFFFF', hexSecondary: '#FEBE10' },
      { season: '2024/25', type: 'Away Solar Orange', colorName: 'Vibrant Solar Orange', badge: 'MODERN', desc: 'Nod to iconic 2013/14 La Décima away kit palette.', hexPrimary: '#EA580C', hexSecondary: '#1E293B' },
    ],
  },
  ATM: {
    name: 'Atlético Madrid',
    fullName: 'Club Atlético de Madrid, S.A.D.',
    city: 'Madrid, Community of Madrid',
    founded: 1903,
    president: 'Enrique Cerezo',
    stadium: {
      name: 'Riyadh Air Metropolitano',
      capacity: 70460,
      city: 'Madrid',
      inaugurated: 2017,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'ucl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/1068.png',
    tagColor: 'text-primary-container',
    primaryColor: '#CB3524',
    secondaryColor: '#003366',
    nicknames: ['Los Colchoneros (The Mattress Makers)', 'Los Rojiblancos'],
    motto: 'Coraje y Corazón (Courage and Heart)',
    trophies: [
      { name: 'LaLiga Titles', count: 11, icon: 'military_tech', years: '1940, 1941, 1950, 1951, 1966, 1970, 1973, 1977, 1996, 2014, 2021' },
      { name: 'Copa del Rey', count: 10, icon: 'emoji_events', years: '10 titles' },
      { name: 'UEFA Europa League', count: 3, icon: 'workspace_premium', years: '2010, 2012, 2018' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Rojiblanco Heritage', colorName: 'Crimson & Cobalt Stripes', badge: 'HERITAGE', desc: 'Return of the historic crest with thin blue and red accent stripes.', hexPrimary: '#CB3524', hexSecondary: '#003366' },
    ],
  },
  ATH: {
    name: 'Athletic Club',
    fullName: 'Athletic Club',
    city: 'Bilbao, Basque Country',
    founded: 1898,
    president: 'Jon Uriarte',
    stadium: {
      name: 'San Mamés (La Catedral)',
      capacity: 53289,
      city: 'Bilbao',
      inaugurated: 2013,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'uel',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/93.png',
    tagColor: 'text-tertiary',
    primaryColor: '#EE2524',
    secondaryColor: '#000000',
    nicknames: ['Los Leones (The Lions)', 'Zurigorri'],
    motto: 'Con cantera y afición, no hace falta importación',
    trophies: [
      { name: 'LaLiga Titles', count: 8, icon: 'military_tech', years: '1930, 1931, 1934, 1936, 1943, 1956, 1983, 1984' },
      { name: 'Copa del Rey', count: 24, icon: 'emoji_events', years: '24 titles (most recent: 2024)' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Zurigorri', colorName: 'Red & White Stripes', badge: 'COPA 24', desc: 'Classic red and white verticals adorned with the 24th Copa del Rey winners emblem.', hexPrimary: '#EE2524', hexSecondary: '#000000' },
    ],
  },
  RSO: {
    name: 'Real Sociedad',
    fullName: 'Real Sociedad de Fútbol, S.A.D.',
    city: 'San Sebastián, Basque Country',
    founded: 1909,
    president: 'Jokin Aperribay',
    stadium: {
      name: 'Reale Arena (Anoeta)',
      capacity: 39313,
      city: 'San Sebastián',
      inaugurated: 1993,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'uel',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/89.png',
    tagColor: 'text-primary',
    primaryColor: '#0047AB',
    secondaryColor: '#FFFFFF',
    nicknames: ['La Real', 'Txuri-Urdin (White-Blue)', 'Erreala'],
    motto: 'Aupa Erreala!',
    trophies: [
      { name: 'LaLiga Titles', count: 2, icon: 'military_tech', years: '1981, 1982' },
      { name: 'Copa del Rey', count: 3, icon: 'emoji_events', years: '1909, 1987, 2020' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Txuri-Urdin', colorName: 'Royal Blue and Pure White', badge: 'IKURRIÑA', desc: 'Thick royal blue columns with subtle Basque Ikurriña flag details on collar.', hexPrimary: '#0047AB', hexSecondary: '#FFFFFF' },
    ],
  },
  BET: {
    name: 'Real Betis',
    fullName: 'Real Betis Balompié, S.A.D.',
    city: 'Seville, Andalusia',
    founded: 1907,
    president: 'Ángel Haro',
    stadium: {
      name: 'Estadio de La Cartuja (Estadio Benito Villamarín)',
      capacity: 60721,
      city: 'Seville',
      inaugurated: 1929,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'uecl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/244.png',
    tagColor: 'text-secondary',
    primaryColor: '#0BB364',
    secondaryColor: '#FFFFFF',
    nicknames: ['Los Verdiblancos', 'Los Béticos', 'Heliópolis'],
    motto: '¡Viva el Betis manque pierda!',
    trophies: [
      { name: 'LaLiga Titles', count: 1, icon: 'military_tech', years: '1935' },
      { name: 'Copa del Rey', count: 3, icon: 'emoji_events', years: '1977, 2005, 2022' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Verdiblanco', colorName: 'Emerald Green & White Stripes', badge: 'HERITAGE', desc: 'Thirteen traditional green and white stripes inspired by the iconic 1990s Hummel era.', hexPrimary: '#0BB364', hexSecondary: '#FFFFFF' },
    ],
  },
  SFC: {
    name: 'Sevilla FC',
    fullName: 'Sevilla Fútbol Club, S.A.D.',
    city: 'Seville, Andalusia',
    founded: 1890,
    president: 'José María del Nido Carrasco',
    stadium: {
      name: 'Estadio Ramón Sánchez-Pizjuán',
      capacity: 43883,
      city: 'Seville',
      inaugurated: 1958,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'uel',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/243.png',
    tagColor: 'text-primary',
    primaryColor: '#D4002D',
    secondaryColor: '#FFFFFF',
    nicknames: ['Los Nervionenses', 'Los Palanganas', 'Rojiblancos'],
    motto: 'Nunca se rinde (Never gives up)',
    trophies: [
      { name: 'LaLiga Titles', count: 1, icon: 'military_tech', years: '1946' },
      { name: 'UEFA Europa League', count: 7, icon: 'workspace_premium', years: 'Record 7 UEL titles (2006-2023)' },
      { name: 'Copa del Rey', count: 5, icon: 'emoji_events', years: '1935, 1939, 1948, 2007, 2010' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Blanco Nervión', colorName: 'Pure White with Crimson Trim', badge: 'CASTILLE', desc: 'Clean white body with crimson cuffs and Sánchez-Pizjuán mosaic homage.', hexPrimary: '#FFFFFF', hexSecondary: '#D4002D' },
    ],
  },
  VIL: {
    name: 'Villarreal CF',
    fullName: 'Villarreal Club de Fútbol, S.A.D.',
    city: 'Villarreal, Castellón',
    founded: 1923,
    president: 'Fernando Roig',
    stadium: {
      name: 'Estadio de la Cerámica',
      capacity: 23500,
      city: 'Villarreal',
      inaugurated: 1923,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'uecl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/102.png',
    tagColor: 'text-secondary',
    primaryColor: '#FDE047',
    secondaryColor: '#005CA9',
    nicknames: ['El Submarino Amarillo (The Yellow Submarine)'],
    motto: 'Endavant Villarreal (Forward Villarreal)',
    trophies: [
      { name: 'UEFA Europa League', count: 1, icon: 'workspace_premium', years: '2021 Champions' },
      { name: 'UEFA Champions League Semi-finalists', count: 2, icon: 'military_tech', years: '2006, 2022' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Total Amarillo', colorName: 'Canary Yellow', badge: 'SUBMARINO', desc: 'All-yellow monochrome uniform with navy ceramic detailing.', hexPrimary: '#FDE047', hexSecondary: '#005CA9' },
    ],
  },
  VAL: {
    name: 'Valencia CF',
    fullName: 'Valencia Club de Fútbol, S.A.D.',
    city: 'Valencia, Valencian Community',
    founded: 1919,
    president: 'Layhoon Chan',
    stadium: {
      name: 'Estadio de Mestalla',
      capacity: 49430,
      city: 'Valencia',
      inaugurated: 1923,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/94.png',
    tagColor: 'text-secondary',
    primaryColor: '#FF6600',
    secondaryColor: '#000000',
    nicknames: ['Los Che', 'Els Blanquinegres', 'Los Murciélagos'],
    motto: 'Amunt Valencia',
    trophies: [
      { name: 'LaLiga Titles', count: 6, icon: 'military_tech', years: '1942, 1944, 1947, 1971, 2002, 2004' },
      { name: 'Copa del Rey', count: 8, icon: 'emoji_events', years: '8 titles (most recent: 2019)' },
      { name: 'UEFA Cup', count: 1, icon: 'workspace_premium', years: '2004 Champions' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Blanquinegre', colorName: 'White and Deep Obsidian', badge: 'MESTALLA', desc: 'White body with bat-wing obsidian shoulders and orange piping.', hexPrimary: '#FFFFFF', hexSecondary: '#FF6600' },
    ],
  },
  CEL: {
    name: 'RC Celta',
    fullName: 'Real Club Celta de Vigo, S.A.D.',
    city: 'Vigo, Galicia',
    founded: 1923,
    president: 'Marián Mouriño',
    stadium: {
      name: 'Abanca-Balaídos',
      capacity: 24791,
      city: 'Vigo',
      inaugurated: 1928,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/85.png',
    tagColor: 'text-primary',
    primaryColor: '#70B5FF',
    secondaryColor: '#FFFFFF',
    nicknames: ['Os Celestes (The Sky Blues)', 'O Celtiña'],
    motto: 'Afouteza e Corazón (Courage and Heart)',
    trophies: [
      { name: 'UEFA Intertoto Cup', count: 1, icon: 'workspace_premium', years: '2000' },
      { name: 'Copa del Rey Runners-up', count: 3, icon: 'emoji_events', years: '1948, 1994, 2001' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Celeste Centenario', colorName: 'Sky Blue and Wine Red', badge: 'AFOUTEZA', desc: 'Pure sky blue shirt featuring lyrics of the C. Tangana anthem "Oliveira dos Cen Anos".', hexPrimary: '#70B5FF', hexSecondary: '#A81E2B' },
    ],
  },
  OSA: {
    name: 'CA Osasuna',
    fullName: 'Club Atlético Osasuna',
    city: 'Pamplona, Navarre',
    founded: 1920,
    president: 'Luis Sabalza',
    stadium: {
      name: 'Estadio El Sadar',
      capacity: 23576,
      city: 'Pamplona',
      inaugurated: 1967,
      pitchSize: '105 x 67.5 m',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/97.png',
    tagColor: 'text-tertiary',
    primaryColor: '#D11212',
    secondaryColor: '#001E50',
    nicknames: ['Los Rojillos (The Little Reds)', 'Gorritxoak'],
    motto: 'Osasuna nunca se rinde (Osasuna means Health & Vigor)',
    trophies: [
      { name: 'Copa del Rey Runners-up', count: 2, icon: 'emoji_events', years: '2005, 2023' },
      { name: 'Segunda División Titles', count: 4, icon: 'military_tech', years: '1952/53, 1955/56, 1960/61, 2018/19' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Rojillo Clásico', colorName: 'Deep Navarre Red and Navy', badge: 'SADAR', desc: 'Fiery Navarre red torso with royal navy sleeves and golden lions crest.', hexPrimary: '#D11212', hexSecondary: '#001E50' },
    ],
  },
  GET: {
    name: 'Getafe CF',
    fullName: 'Getafe Club de Fútbol, S.A.D.',
    city: 'Getafe, Community of Madrid',
    founded: 1983,
    president: 'Ángel Torres Sánchez',
    stadium: {
      name: 'Coliseum',
      capacity: 16500,
      city: 'Getafe',
      inaugurated: 1998,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/98.png',
    tagColor: 'text-primary',
    primaryColor: '#004B87',
    secondaryColor: '#FFFFFF',
    nicknames: ['Los Azulones (The Deep Blues)', 'Geta'],
    motto: '¡Vamos Geta!',
    trophies: [
      { name: 'Copa del Rey Runners-up', count: 2, icon: 'emoji_events', years: '2007, 2008' },
      { name: 'UEFA Cup Quarter-finalists', count: 1, icon: 'workspace_premium', years: '2008 (vs Bayern Munich)' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Azulón Total', colorName: 'Cobalt Royal Blue', badge: 'COLISEUM', desc: 'Monochromatic cobalt blue featuring the aeronautical cross emblem of Getafe.', hexPrimary: '#004B87', hexSecondary: '#FFFFFF' },
    ],
  },
  ALA: {
    name: 'Deportivo Alavés',
    fullName: 'Deportivo Alavés, S.A.D.',
    city: 'Vitoria-Gasteiz, Basque Country',
    founded: 1921,
    president: 'Alfonso Fernández de Trocóniz',
    stadium: {
      name: 'Estadio Mendizorrotza',
      capacity: 19840,
      city: 'Vitoria-Gasteiz',
      inaugurated: 1924,
      pitchSize: '105 x 67 m',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/96.png',
    tagColor: 'text-primary',
    primaryColor: '#005CA9',
    secondaryColor: '#FFFFFF',
    nicknames: ['Babazorros (Bean Eaters)', 'El Glorioso'],
    motto: 'Gora Alavés!',
    trophies: [
      { name: 'UEFA Cup Runners-up', count: 1, icon: 'workspace_premium', years: '2001 (Epic 4-5 vs Liverpool)' },
      { name: 'Copa del Rey Runners-up', count: 1, icon: 'emoji_events', years: '2017' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Albiazul', colorName: 'Blue and White Vertical Stripes', badge: 'MENDI 100', desc: 'Centenary tribute to Mendizorrotza stadium with traditional broad stripes.', hexPrimary: '#005CA9', hexSecondary: '#FFFFFF' },
    ],
  },
  RAY: {
    name: 'Rayo Vallecano',
    fullName: 'Rayo Vallecano de Madrid, S.A.D.',
    city: 'Madrid (Vallecas), Community of Madrid',
    founded: 1924,
    president: 'Raúl Martín Presa',
    stadium: {
      name: 'Campo de Fútbol de Vallecas',
      capacity: 14708,
      city: 'Madrid (Vallecas)',
      inaugurated: 1976,
      pitchSize: '100 x 65 m',
      image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/101.png',
    tagColor: 'text-tertiary',
    primaryColor: '#E20613',
    secondaryColor: '#FFFFFF',
    nicknames: ['Los Franjirrojos (The Red Sashes)', 'Los Vallecanos'],
    motto: 'Vallecas puerto de mar • Clase trabajadora',
    trophies: [
      { name: 'Centenary Edition', count: 100, icon: 'military_tech', years: '1924-2024 Centenario de Vallecas' },
      { name: 'UEFA Cup Quarter-finalists', count: 1, icon: 'workspace_premium', years: '2001' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Franja Centenario', colorName: 'Alpine White & Diagonal Lightning Sash', badge: '100 AÑOS', desc: 'Centenary edition white shirt featuring the iconic crimson lightning bolt sash.', hexPrimary: '#FFFFFF', hexSecondary: '#E20613' },
    ],
  },
  ESP: {
    name: 'RCD Espanyol',
    fullName: 'Reial Club Deportiu Espanyol de Barcelona, S.A.D.',
    city: 'Cornellà de Llobregat, Catalonia',
    founded: 1900,
    president: 'Chen Yansheng',
    stadium: {
      name: 'Stage Front Stadium (RCDE Stadium)',
      capacity: 40000,
      city: 'Cornellà / El Prat',
      inaugurated: 2009,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/88.png',
    tagColor: 'text-secondary',
    primaryColor: '#0070B8',
    secondaryColor: '#FFFFFF',
    nicknames: ['Periquitos (The Parakeets)', 'Mágico Espanyol'],
    motto: 'Maravillosa minoría (Wonderful minority)',
    trophies: [
      { name: 'Copa del Rey', count: 4, icon: 'emoji_events', years: '1929, 1940, 2000, 2006' },
      { name: 'UEFA Cup Runners-up', count: 2, icon: 'workspace_premium', years: '1988, 2007' },
    ],
    kits: [
      { season: '2024/25', type: 'Home Blanquiazul Perico', colorName: 'Azure Blue and Pure White Columns', badge: 'PERICO', desc: 'Rich azure and white vertical blocks with royal crest crown detailing.', hexPrimary: '#0070B8', hexSecondary: '#FFFFFF' },
    ],
  },
  DEP: {
    name: 'Deportivo La Coruña',
    fullName: 'Real Club Deportivo de La Coruña, S.A.D.',
    city: 'A Coruña, Galicia',
    founded: 1906,
    president: 'Juan Carlos Escotet',
    stadium: {
      name: 'Estadio Riazor',
      capacity: 32490,
      city: 'A Coruña',
      inaugurated: 1944,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'uecl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/95.png',
    tagColor: 'text-primary',
    primaryColor: '#004B87',
    secondaryColor: '#FFFFFF',
    nicknames: ['Super Dépor', 'Os Branquiazuis', 'Herculinos'],
    motto: 'Forza Dépor, Sempre',
    trophies: [
      { name: 'LaLiga Titles', count: 1, icon: 'military_tech', years: '1999/2000 Champions' },
      { name: 'Copa del Rey', count: 2, icon: 'emoji_events', years: '1995, 2002 (Centenariazo)' },
      { name: 'Supercopa de España', count: 3, icon: 'workspace_premium', years: '1995, 2000, 2002' },
    ],
    kits: [
      { season: '2026/27', type: 'Home Branquiazul', colorName: 'Classic Blue and White Vertical Stripes', badge: 'HERITAGE', desc: 'Historic dual-vertical blue and white strip with golden crest detailing.', hexPrimary: '#004B87', hexSecondary: '#FFFFFF' },
    ],
  },
  ELC: {
    name: 'Elche CF',
    fullName: 'Elche Club de Fútbol, S.A.D.',
    city: 'Elche, Alicante',
    founded: 1923,
    president: 'Joaquín Buitrago',
    stadium: {
      name: 'Estadio Manuel Martínez Valero',
      capacity: 31388,
      city: 'Elche',
      inaugurated: 1976,
      pitchSize: '108 x 70 m',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/3751.png',
    tagColor: 'text-secondary',
    primaryColor: '#008542',
    secondaryColor: '#FFFFFF',
    nicknames: ['Los Franjiverdes (The Green-striped)', 'Los Ilicitanos'],
    motto: 'Orgullo Franjiverde',
    trophies: [
      { name: 'Segunda División Titles', count: 2, icon: 'military_tech', years: '1958/59, 2012/13' },
      { name: 'Copa del Rey Runners-up', count: 1, icon: 'emoji_events', years: '1969' },
    ],
    kits: [
      { season: '2026/27', type: 'Home Franjiverde', colorName: 'Pure White with Emerald Green Chest Band', badge: 'CLASSIC', desc: 'Iconic horizontal emerald stripe across clean alpine white shirt.', hexPrimary: '#FFFFFF', hexSecondary: '#008542' },
    ],
  },
  LEV: {
    name: 'Levante UD',
    fullName: 'Levante Unión Deportiva, S.A.D.',
    city: 'Valencia, Valencian Community',
    founded: 1909,
    president: 'Pablo Sánchez',
    stadium: {
      name: 'Estadio Ciudad de Valencia',
      capacity: 26354,
      city: 'Valencia',
      inaugurated: 1969,
      pitchSize: '107 x 69 m',
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/91.png',
    tagColor: 'text-primary',
    primaryColor: '#003F7A',
    secondaryColor: '#B81D22',
    nicknames: ['Granotes (The Frogs)', 'Azulgranas'],
    motto: 'Orgullo Granota',
    trophies: [
      { name: 'Copa de la España Libre', count: 1, icon: 'military_tech', years: '1937' },
      { name: 'Segunda División Titles', count: 2, icon: 'emoji_events', years: '2003/04, 2016/17' },
    ],
    kits: [
      { season: '2026/27', type: 'Home Granota', colorName: 'Deep Navy Blue & Crimson Red Stripes', badge: 'AUTHENTIC', desc: 'Traditional navy and crimson vertical columns inspired by 1909 roots.', hexPrimary: '#003F7A', hexSecondary: '#B81D22' },
    ],
  },
  MAL: {
    name: 'Málaga CF',
    fullName: 'Málaga Club de Fútbol, S.A.D.',
    city: 'Málaga, Andalusia',
    founded: 1904,
    president: 'José María Muñoz (Admin)',
    stadium: {
      name: 'Estadio La Rosaleda',
      capacity: 30044,
      city: 'Málaga',
      inaugurated: 1941,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/90.png',
    tagColor: 'text-secondary',
    primaryColor: '#70B5FF',
    secondaryColor: '#FFFFFF',
    nicknames: ['Los Boquerones (The Anchovies)', 'Blanquiazules'],
    motto: 'Memoria, Compromiso y Fe',
    trophies: [
      { name: 'UEFA Intertoto Cup', count: 1, icon: 'workspace_premium', years: '2002 Champions' },
      { name: 'UEFA Champions League Quarter-finalists', count: 1, icon: 'military_tech', years: '2012/13 Historic Run' },
    ],
    kits: [
      { season: '2026/27', type: 'Home Blanquiazul', colorName: 'Sky Blue and Crisp White Stripes', badge: 'COSTA DEL SOL', desc: 'Mediterranean azure and white heritage stripes with gold crest accents.', hexPrimary: '#70B5FF', hexSecondary: '#FFFFFF' },
    ],
  },
  RAC: {
    name: 'Real Racing Club',
    fullName: 'Real Racing Club de Santander, S.A.D.',
    city: 'Santander, Cantabria',
    founded: 1913,
    president: 'Manolo Higuera',
    stadium: {
      name: 'Campos de Sport de El Sardinero',
      capacity: 22222,
      city: 'Santander',
      inaugurated: 1988,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/94.png',
    tagColor: 'text-secondary',
    primaryColor: '#0BB364',
    secondaryColor: '#000000',
    nicknames: ['Los Verdiblancos', 'Los Racinguistas', 'El Sardinero'],
    motto: 'Racing Nunca Se Rinde',
    trophies: [
      { name: 'LaLiga Runners-up', count: 1, icon: 'military_tech', years: '1930/31 Founding Season' },
      { name: 'Copa del Rey Semi-finalists', count: 2, icon: 'emoji_events', years: '2007/08, 2009/10' },
    ],
    kits: [
      { season: '2026/27', type: 'Home Verdiblanco', colorName: 'Pure Alpine White with Emerald & Black Trims', badge: 'SARDINERO', desc: 'White body with green collars and black shorts, the Cantabrian classic.', hexPrimary: '#0BB364', hexSecondary: '#000000' },
    ],
  },
};

// Historical clubs preserved
const HISTORICAL_EXTRA_CLUBS: Record<string, any> = {
  GIR: {
    name: 'Girona FC',
    fullName: 'Girona Futbol Club, S.A.D.',
    city: 'Girona, Catalonia',
    founded: 1930,
    president: 'Delfí Geli',
    manager: 'Míchel Sánchez',
    stadium: {
      name: 'Estadi Montilivi',
      capacity: 14624,
      city: 'Girona',
      inaugurated: 1970,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'ucl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/9812.png',
    tagColor: 'text-primary',
    primaryColor: '#D31427',
    secondaryColor: '#FFFFFF',
    nicknames: ['Blanquivermells', 'Gironistes'],
    motto: 'Orgull Gironí',
    trophies: [{ name: 'UEFA Champions League Debutants', count: 1, icon: 'workspace_premium', years: '2024/25 Qualified' }],
    kits: [{ season: '2024/25', type: 'Home Blanquivermell', colorName: 'Red and White Vertical Halves', badge: 'UCL DEBUT', desc: 'Historic debut European kit with gold detailing.', hexPrimary: '#D31427', hexSecondary: '#FFFFFF' }],
    squad: [
      { num: '01', name: 'Juan Carlos', nat: 'ESP', natColor: 'text-secondary', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Clean Sheets', statVal: '6 Clean', val: '€1.5M', img: AVATAR_POOL[0] },
      { num: '08', name: 'Viktor Tsygankov', nat: 'UKR', natColor: 'text-secondary', role: 'Winger', category: 'fwd', badge: null, statLabel: 'Goals / Assists', statVal: '8G, 7A', val: '€30.0M', img: AVATAR_POOL[1] },
    ],
  },
  MLL: {
    name: 'RCD Mallorca',
    fullName: 'Real Club Deportivo Mallorca, S.A.D.',
    city: 'Palma, Balearic Islands',
    founded: 1916,
    president: 'Andy Kohlberg',
    manager: 'Jagoba Arrasate',
    stadium: {
      name: 'Estadi Mallorca Son Moix',
      capacity: 23142,
      city: 'Palma',
      inaugurated: 1999,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/84.png',
    tagColor: 'text-primary',
    primaryColor: '#E20613',
    secondaryColor: '#000000',
    nicknames: ['Los Bermellones (The Vermilions)', 'Els Barralets'],
    motto: 'Sempre Endavant Mallorca',
    trophies: [{ name: 'Copa del Rey', count: 1, icon: 'emoji_events', years: '2003' }],
    kits: [{ season: '2024/25', type: 'Home Vermelló', colorName: 'Vermilion Red', badge: 'MALLORCA', desc: 'Vermilion red with black sleeve accents.', hexPrimary: '#E20613', hexSecondary: '#000000' }],
    squad: [
      { num: '01', name: 'Dominik Greif', nat: 'SVK', natColor: 'text-secondary', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Pct', statVal: '75.2%', val: '€4.0M', img: AVATAR_POOL[2] },
      { num: '07', name: 'Vedat Muriqi', nat: 'KOS', natColor: 'text-secondary', role: 'Striker', category: 'fwd', badge: 'PIRATE', statLabel: 'Aerial Duels', statVal: '8.4 won/90', val: '€14.0M', img: AVATAR_POOL[3] },
    ],
  },
  LPA: {
    name: 'UD Las Palmas',
    fullName: 'Unión Deportiva Las Palmas, S.A.D.',
    city: 'Las Palmas, Canary Islands',
    founded: 1949,
    president: 'Miguel Ángel Ramírez',
    manager: 'Diego Martínez',
    stadium: {
      name: 'Estadio Gran Canaria',
      capacity: 32400,
      city: 'Las Palmas',
      inaugurated: 2003,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/100.png',
    tagColor: 'text-secondary',
    primaryColor: '#FFE000',
    secondaryColor: '#005CA9',
    nicknames: ['Los Amarillos (The Yellows)', 'Pío-Pío'],
    motto: 'Seguimos con Orgullo Amarillo',
    trophies: [{ name: 'LaLiga Runners-up', count: 1, icon: 'military_tech', years: '1968/69' }],
    kits: [{ season: '2024/25', type: 'Home Amarillo Canario', colorName: 'Canary Yellow & Royal Blue', badge: '75 AÑOS', desc: '75th anniversary golden shirt with royal blue shorts.', hexPrimary: '#FFE000', hexSecondary: '#005CA9' }],
    squad: [
      { num: '01', name: 'Jasper Cillessen', nat: 'NED', natColor: 'text-secondary', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Pct', statVal: '72.4%', val: '€2.5M', img: AVATAR_POOL[4] },
      { num: '10', name: 'Alberto Moleiro', nat: 'ESP', natColor: 'text-secondary', role: 'Attacking Mid', category: 'mid', badge: 'TALENT', statLabel: 'Take-ons', statVal: '3.8/90', val: '€20.0M', img: AVATAR_POOL[5] },
    ],
  },
  LEG: {
    name: 'CD Leganés',
    fullName: 'Club Deportivo Leganés, S.A.D.',
    city: 'Leganés, Community of Madrid',
    founded: 1928,
    president: 'Jeff Luhnow',
    manager: 'Borja Jiménez',
    stadium: {
      name: 'Estadio Municipal Butarque',
      capacity: 12454,
      city: 'Leganés',
      inaugurated: 1998,
      pitchSize: '105 x 70 m',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2884.png',
    tagColor: 'text-primary',
    primaryColor: '#005CA9',
    secondaryColor: '#FFFFFF',
    nicknames: ['Lega', 'Los Pepineros (The Cucumber Growers)'],
    motto: 'El corazón nunca desciende',
    trophies: [{ name: 'Segunda División Champions', count: 1, icon: 'military_tech', years: '2023/24' }],
    kits: [{ season: '2024/25', type: 'Home Pepinero', colorName: 'Blue and White Stripes', badge: 'BUTARQUE', desc: 'Classic blue and white stripes with gold crest accents.', hexPrimary: '#005CA9', hexSecondary: '#FFFFFF' }],
    squad: [
      { num: '01', name: 'Juan Soriano', nat: 'ESP', natColor: 'text-secondary', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Pct', statVal: '76.1%', val: '€2.0M', img: AVATAR_POOL[6] },
      { num: '09', name: 'Miguel de la Fuente', nat: 'ESP', natColor: 'text-secondary', role: 'Striker', category: 'fwd', badge: null, statLabel: 'Goals', statVal: '13 Goals', val: '€4.0M', img: AVATAR_POOL[7] },
    ],
  },
  VLL: {
    name: 'Real Valladolid',
    fullName: 'Real Valladolid Club de Fútbol, S.A.D.',
    city: 'Valladolid, Castile and León',
    founded: 1928,
    president: 'Ronaldo Nazário',
    manager: 'Paulo Pezzolano',
    stadium: {
      name: 'Estadio José Zorrilla',
      capacity: 27618,
      city: 'Valladolid',
      inaugurated: 1982,
      pitchSize: '105 x 68 m',
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80',
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/103.png',
    tagColor: 'text-secondary',
    primaryColor: '#6B21A8',
    secondaryColor: '#FFFFFF',
    nicknames: ['Pucela', 'Blanquivioletas (White and Violets)'],
    motto: 'Aúpa Pucela',
    trophies: [{ name: 'Copa de la Liga', count: 1, icon: 'emoji_events', years: '1984' }],
    kits: [{ season: '2024/25', type: 'Home Blanquivioleta', colorName: 'Castilian Violet & White', badge: 'PUCELA', desc: 'Deep royal violet and white stripes.', hexPrimary: '#6B21A8', hexSecondary: '#FFFFFF' }],
    squad: [
      { num: '01', name: 'Karl Hein', nat: 'EST', natColor: 'text-secondary', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Saves Made', statVal: '38 Saves in 9 matches', val: '€3.0M', img: AVATAR_POOL[8] },
      { num: '10', name: 'Raúl Moro', nat: 'ESP', natColor: 'text-secondary', role: 'Winger', category: 'fwd', badge: null, statLabel: 'Take-on Success', statVal: '64.2%', val: '€5.0M', img: AVATAR_POOL[9] },
    ],
  },
};

// Build the full code
let outputTs = `export interface ClubPlayer {
  num: string;
  name: string;
  nat?: string | null;
  natColor?: string;
  role: string;
  category: 'gk' | 'def' | 'mid' | 'fwd';
  badge?: string | null;
  statLabel: string;
  statVal: string;
  val: string;
  img: string;
}

export interface ClubTrophy {
  name: string;
  count: number;
  icon: string;
  years?: string;
}

export interface ClubKit {
  season: string;
  type: string;
  colorName: string;
  badge: string;
  desc: string;
  hexPrimary: string;
  hexSecondary: string;
  previewUrl?: string;
}

export interface ClubDetails {
  id: string; // RMA, FCB, etc.
  code: string;
  name: string;
  fullName: string;
  city: string;
  founded: number;
  president: string;
  manager: string;
  stadium: {
    name: string;
    capacity: number;
    city: string;
    inaugurated: number;
    pitchSize: string;
    image: string;
  };
  tier: 'ucl' | 'uel' | 'uecl' | 'domestic';
  crestUrl: string;
  tagColor: string;
  primaryColor: string;
  secondaryColor: string;
  nicknames: string[];
  motto: string;
  trophies: ClubTrophy[];
  kits: ClubKit[];
  squad: ClubPlayer[];
}

export const LALIGA_CLUBS: Record<string, ClubDetails> = {
`;

// Build each club object
const codeList = Object.keys(CLUB_STATIC_META);

codeList.forEach((code) => {
  const meta = CLUB_STATIC_META[code];
  // Find matching team in CSV
  let teamNameInCsv = Object.keys(TEAM_NAME_TO_CODE).find((tn) => TEAM_NAME_TO_CODE[tn] === code);
  const teamData = teamNameInCsv ? playersByTeam.get(teamNameInCsv) : null;
  const managerName = teamData?.coachName || meta.manager || 'Official Manager';

  outputTs += `  ${code}: {
    id: '${code}',
    code: '${code}',
    name: '${meta.name}',
    fullName: '${meta.fullName}',
    city: '${meta.city}',
    founded: ${meta.founded},
    president: '${meta.president}',
    manager: '${managerName}',
    stadium: {
      name: '${meta.stadium.name.replace(/'/g, "\\'")}',
      capacity: ${meta.stadium.capacity},
      city: '${meta.stadium.city}',
      inaugurated: ${meta.stadium.inaugurated},
      pitchSize: '${meta.stadium.pitchSize}',
      image: '${meta.stadium.image}',
    },
    tier: '${meta.tier}',
    crestUrl: '${meta.crestUrl}',
    tagColor: '${meta.tagColor}',
    primaryColor: '${meta.primaryColor}',
    secondaryColor: '${meta.secondaryColor}',
    nicknames: ${JSON.stringify(meta.nicknames)},
    motto: '${meta.motto.replace(/'/g, "\\'")}',
    trophies: ${JSON.stringify(meta.trophies, null, 6).replace(/\n/g, '\n    ')},
    kits: ${JSON.stringify(meta.kits, null, 6).replace(/\n/g, '\n    ')},
    squad: [
`;

  if (teamData) {
    teamData.players.forEach((p, idx) => {
      const cat = getCategoryFromRole(p.role);
      const special = SPECIAL_PLAYERS[p.playerName] || {};
      const defStat = getDefaultStatForCategory(cat, idx);
      const val = special.val || getDefaultValForRole(cat, idx);
      const statLabel = special.statLabel || defStat.statLabel;
      const statVal = special.statVal || defStat.statVal;
      const img = special.img || AVATAR_POOL[(p.playerId + idx) % AVATAR_POOL.length];
      const badge = special.badge ? `'${special.badge}'` : 'null';
      const numPadded = p.jerseyNumber.padStart(2, '0');

      outputTs += `      { num: '${numPadded}', name: '${p.playerName.replace(/'/g, "\\'")}', nat: 'ESP', natColor: 'text-on-surface-variant', role: '${p.role}', category: '${cat}', badge: ${badge}, statLabel: '${statLabel}', statVal: '${statVal}', val: '${val}', img: '${img}' },\n`;
    });
  }

  outputTs += `    ],
  },
`;
});

// Append historical extra clubs
Object.keys(HISTORICAL_EXTRA_CLUBS).forEach((code) => {
  const meta = HISTORICAL_EXTRA_CLUBS[code];
  outputTs += `  ${code}: {
    id: '${code}',
    code: '${code}',
    name: '${meta.name}',
    fullName: '${meta.fullName}',
    city: '${meta.city}',
    founded: ${meta.founded},
    president: '${meta.president}',
    manager: '${meta.manager}',
    stadium: ${JSON.stringify(meta.stadium, null, 6).replace(/\n/g, '\n    ')},
    tier: '${meta.tier}',
    crestUrl: '${meta.crestUrl}',
    tagColor: '${meta.tagColor}',
    primaryColor: '${meta.primaryColor}',
    secondaryColor: '${meta.secondaryColor}',
    nicknames: ${JSON.stringify(meta.nicknames)},
    motto: '${meta.motto.replace(/'/g, "\\'")}',
    trophies: ${JSON.stringify(meta.trophies, null, 6).replace(/\n/g, '\n    ')},
    kits: ${JSON.stringify(meta.kits, null, 6).replace(/\n/g, '\n    ')},
    squad: ${JSON.stringify(meta.squad, null, 6).replace(/\n/g, '\n    ')},
  },
`;
});

outputTs += `};

// Alias VCF to VAL and vice versa for consistency across fixtures, tables and clubs
LALIGA_CLUBS['VCF'] = LALIGA_CLUBS['VAL'];

// 20 Primary Clubs in active LaLiga EA SPORTS 2026/27 campaign
export const CLUBS_ORDER = [
  'FCB', 'RMA', 'ATM', 'ATH', 'RSO', 'BET', 'SFC', 'VIL', 'VAL', 'CEL',
  'OSA', 'GET', 'ALA', 'RAY', 'ESP', 'DEP', 'ELC', 'LEV', 'MAL', 'RAC'
];

export function getAllClubs(): ClubDetails[] {
  return CLUBS_ORDER.map((id) => LALIGA_CLUBS[id]).filter(Boolean);
}

export function getClubById(id: string): ClubDetails | null {
  if (!id) return null;
  const upper = id.toUpperCase().trim();
  if (LALIGA_CLUBS[upper]) return LALIGA_CLUBS[upper];

  // Try matching by name, fullName, or code
  const lower = id.toLowerCase().trim();
  for (const club of Object.values(LALIGA_CLUBS)) {
    if (
      club.code.toLowerCase() === lower ||
      club.name.toLowerCase() === lower ||
      club.fullName.toLowerCase() === lower ||
      club.name.toLowerCase().includes(lower) ||
      lower.includes(club.name.toLowerCase())
    ) {
      return club;
    }
  }

  return null;
}
`;

fs.writeFileSync('src/data/clubsData.ts', outputTs, 'utf8');
console.log('Successfully wrote updated src/data/clubsData.ts');
