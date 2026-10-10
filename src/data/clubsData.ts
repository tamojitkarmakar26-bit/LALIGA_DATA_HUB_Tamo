export interface ClubPlayer {
  num: string;
  jerseyNumber?: number;
  squadIndex?: number;
  playerId?: number;
  teamId?: number;
  coachName?: string;
  teamName?: string;
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
  FCB: {
    id: 'FCB',
    code: 'FCB',
    name: 'FC Barcelona',
    fullName: 'Futbol Club Barcelona',
    city: 'Barcelona, Catalonia',
    founded: 1899,
    president: 'Joan Laporta',
    manager: 'Hansi Flick',
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
    nicknames: ["Blaugrana","Culés"],
    motto: 'Més que un club (More than a club)',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 27,
                "icon": "military_tech",
                "years": "1929, 1945, 1948, 1949, 1952, 1953, 1959, 1960, 1974, 1985, 1991, 1992, 1993, 1994, 1998, 1999, 2005, 2006, 2009, 2010, 2011, 2013, 2015, 2016, 2018, 2019, 2023"
          },
          {
                "name": "Copa del Rey",
                "count": 31,
                "icon": "emoji_events",
                "years": "Record 31 titles"
          },
          {
                "name": "UEFA Champions League",
                "count": 5,
                "icon": "workspace_premium",
                "years": "1992, 2006, 2009, 2011, 2015"
          },
          {
                "name": "Supercopa de España",
                "count": 14,
                "icon": "shield",
                "years": "14 titles"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home 125th Anniversary",
                "colorName": "Deep Blaugrana Split",
                "badge": "125 YRS",
                "desc": "Symmetrical half-and-half classic homage to 1899 founding kit.",
                "hexPrimary": "#004D98",
                "hexSecondary": "#A50044"
          },
          {
                "season": "2024/25",
                "type": "Away Blackout",
                "colorName": "Stealth Obsidian Gold",
                "badge": "LIMITED",
                "desc": "Monochromatic obsidian body with iridescent metallic crest.",
                "hexPrimary": "#111827",
                "hexSecondary": "#F59E0B"
          },
          {
                "season": "2023/24",
                "type": "Senyera Special",
                "colorName": "Catalan Gold Red",
                "badge": "HERITAGE",
                "desc": "Traditional four blood-red bars across golden backdrop.",
                "hexPrimary": "#FBBF24",
                "hexSecondary": "#DC2626"
          }
    ],
    squad: [
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 138, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Alejandro Balde', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.0/90)', val: '€12.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 15, playerId: 139, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Andreas Christensen', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (2.3/90)', val: '€19.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 17, playerId: 140, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Anthony Gordon', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'PACE WINGER', statLabel: 'Take-ons Won', statVal: '3.4 per 90', val: '€65.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 141, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Brian Farinas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€17.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 20, playerId: 142, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Dani Olmo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'EURO STAR', statLabel: 'G/A per 90', statVal: '0.92 G/A per 90', val: '€60.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '25', jerseyNumber: 25, squadIndex: 25, playerId: 143, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Dominik Livaković', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: 'PENALTY HERO', statLabel: 'Save Pct', statVal: '76.4% SV', val: '€15.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '24', jerseyNumber: 24, squadIndex: 24, playerId: 144, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Eric García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'MASIA', statLabel: 'Pass Accuracy', statVal: '91.0%', val: '€18.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 145, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Fermín López', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€21.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 21, playerId: 146, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Frenkie de Jong', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'MAESTRO', statLabel: 'Prog Passes', statVal: '8.4 per 90', val: '€70.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 147, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Gabriel Jesus', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'EXPERIENCE', statLabel: 'Box Touches', statVal: '7.8 per 90', val: '€50.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 148, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Gavi', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'MASIA', statLabel: 'Ground Duels', statVal: '8.2 won/90', val: '€90.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 18, playerId: 149, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Gerard Martín', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '67.0% (3.4/90)', val: '€38.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '29', jerseyNumber: 29, squadIndex: 27, playerId: 150, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Hamza Abdelkarim', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€10.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '27', jerseyNumber: 27, squadIndex: 26, playerId: 151, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Jesse Bisiwu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.9 per 90', val: '€17.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 152, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Joan García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€20.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 153, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'João Cancelo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'VERSATILE', statLabel: 'Prog Carries', statVal: '6.2 per 90', val: '€25.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 23, playerId: 154, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Jules Koundé', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '82.0% (3.0/90)', val: '€16.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 14, playerId: 155, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Karim Adeyemi', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'SPRINTER', statLabel: 'Sprint Velocity', statVal: '36.1 km/h', val: '€45.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 156, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Lamine Yamal', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'MASIA', statLabel: 'G/A + Take-ons', statVal: '9G, 14A • 4.1 Drb', val: '€150.0M', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYFM56Q-r89U6KBoCjE4F613zb4TNOxL9oXdnxJZ_B1hHnI0LCXkbGWIlgyBHVu76W4tXXZMT9k8Ui_TgHOvPi5U7zNyjA8X70EnMbhWkcAKVhaFKEcWNqWTuyRnm8E0V_YK8yChLMTpPURlDoxQswMV_iGnm2BzmcA0somarzGhBWFmDFM7mvvEEEfh4qzXOCEmuOy9r9IAxrVjVVJrKYQ0QVs_ycRrsGrIgtL5o' },
      { num: '22', jerseyNumber: 22, squadIndex: 22, playerId: 157, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Marc Bernal', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '85.0% completion', val: '€24.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 158, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Pau Cubarsí', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'MASIA', statLabel: 'Pass Accuracy', statVal: '91.8% (94.2/90)', val: '€40.0M', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH_fTmyjHk8o_DKknolp9YzdJJ6vcC7CsUOEGOiMjBYYNIo2uqGU0Qjg6pVQZvhm_B4KA4O_z6AzLWTpOxxUcuP0tif_6wljxs9GwxxpqH6BHY5krw0b3lDvlx9jjo_5VxG0aTe4RwKS4INmKOayEqoc1MsiXbBw0t2WnaS-qtGaHGddthGA3mJGL9dIP3BPAI1s_QUOlGTDVxxx-HgmnXiLMrFg42brHwDlcqQiY' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 159, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Pedri', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Key Passes', statVal: '2.8 per 90', val: '€80.0M', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPR6MdsXPdGevNK0WYNgompOaO51J8nLaVo_XCeZYB7kRKb9SulBYSwQXZZ40ERSrmh2iMTefDuFQ8TG8f48-94y44L9XAopHHq2Ue30FhUNIbytFUYe3gERAyfgI77Z_9XVA2s_1nuTCugWv2x4Af6FHJcpYcKicD6m87RdeDe5SV8nV8g3QJ7T1aK1J3Kn-yFf-MOGtgYQJJ2ZZC85gAWRWMccaG3AfBOn0WefA' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 160, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Raphinha', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€60.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 16, playerId: 161, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Rodrigo Hernandez Cascante', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: "BALLON D'OR", statLabel: 'Pass Accuracy', statVal: '92.4% (8.1 recov/90)', val: '€110.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 19, playerId: 162, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Roony Bardghji', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.2 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 13, playerId: 163, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Wojciech Szczęsny', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: 'VETERAN', statLabel: 'Save Pct', statVal: '78.2% SV', val: '€5.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '12', jerseyNumber: 12, squadIndex: 12, playerId: 164, teamId: 8, coachName: 'Hansi Flick', teamName: 'FC Barcelona', name: 'Xavi Espart', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (3.4/90)', val: '€38.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  RMA: {
    id: 'RMA',
    code: 'RMA',
    name: 'Real Madrid',
    fullName: 'Real Madrid Club de Fútbol',
    city: 'Madrid, Community of Madrid',
    founded: 1902,
    president: 'Florentino Pérez',
    manager: 'José Mourinho',
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
    nicknames: ["Los Blancos","Los Merengues","La Casa Blanca"],
    motto: '¡Hala Madrid y nada más!',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 36,
                "icon": "military_tech",
                "years": "Record 36 titles (1932 to 2024)"
          },
          {
                "name": "UEFA Champions League",
                "count": 15,
                "icon": "workspace_premium",
                "years": "Record 15 European Cups"
          },
          {
                "name": "Copa del Rey",
                "count": 20,
                "icon": "emoji_events",
                "years": "20 titles"
          },
          {
                "name": "Supercopa de España",
                "count": 13,
                "icon": "shield",
                "years": "13 titles"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Blanco Houndstooth",
                "colorName": "Pure White & Gold",
                "badge": "CLASSIC",
                "desc": "Houndstooth fabric pattern woven with bespoke golden crest embroidery.",
                "hexPrimary": "#FFFFFF",
                "hexSecondary": "#FEBE10"
          },
          {
                "season": "2024/25",
                "type": "Away Solar Orange",
                "colorName": "Vibrant Solar Orange",
                "badge": "MODERN",
                "desc": "Nod to iconic 2013/14 La Décima away kit palette.",
                "hexPrimary": "#EA580C",
                "hexSecondary": "#1E293B"
          }
    ],
    squad: [
      { num: '13', jerseyNumber: 13, squadIndex: 13, playerId: 291, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Andriy Lunin', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '71.0% SV', val: '€8.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 22, playerId: 292, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Antonio Rüdiger', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (2.3/90)', val: '€19.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 15, playerId: 293, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Arda Güler', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€29.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 14, playerId: 294, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Aurélien Tchouaméni', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€36.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 20, playerId: 295, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Bernardo Silva', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'WIZARD', statLabel: 'Chances Created', statVal: '3.1 per 90', val: '€65.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 21, playerId: 296, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Brahim Díaz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€21.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 19, playerId: 297, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Carlos Espí', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.1 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 298, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Dean Huijsen', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'GOLDEN BOY', statLabel: 'Duels Won', statVal: '68.0%', val: '€25.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '24', jerseyNumber: 24, squadIndex: 24, playerId: 299, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Denzel Dumfries', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'POWER BACK', statLabel: 'Box Entries', statVal: '4.5 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 300, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Eduardo Camavinga', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '93.0% completion', val: '€20.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 301, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Endrick', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.5 per 90', val: '€30.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 302, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Federico Valverde', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€34.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 23, playerId: 303, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Ferland Mendy', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '82.0% (3.0/90)', val: '€16.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 16, playerId: 304, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Ibrahima Konaté', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'AERIAL WALL', statLabel: 'Aerial Duels', statVal: '74.2% Won', val: '€45.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 305, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Jude Bellingham', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'KOPA', statLabel: 'Ground Duels', statVal: '64.1% Won (7.4/90)', val: '€180.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 306, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Kylian Mbappé', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'GALÁCTICO', statLabel: 'Sprint Velocity', statVal: '36.2 km/h • 0.88 G/90', val: '€180.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 17, playerId: 307, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Marc Cucurella', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'EURO CHAMPION', statLabel: 'Tackles Won', statVal: '3.6 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 308, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Raúl Asencio', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.8/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 309, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Rodrygo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.9 per 90', val: '€20.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '27', jerseyNumber: 27, squadIndex: 26, playerId: 310, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Thiago', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€10.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 311, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Thibaut Courtois', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€17.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '12', jerseyNumber: 12, squadIndex: 12, playerId: 312, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Trent Alexander-Arnold', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'CROSS MASTER', statLabel: 'Key Passes', statVal: '3.2 per 90', val: '€70.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 313, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Vinícius Júnior', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'UCL MVP', statLabel: 'Take-on Success', statVal: '68.4% (4.2/90)', val: '€200.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '25', jerseyNumber: 25, squadIndex: 25, playerId: 314, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Yan Diomande', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.0 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 18, playerId: 315, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Álvaro Carreras', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'RISING STAR', statLabel: 'Tackles Won', statVal: '2.8 per 90', val: '€20.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 316, teamId: 16, coachName: 'José Mourinho', teamName: 'Real Madrid', name: 'Éder Militão', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (3.7/90)', val: '€13.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  ATM: {
    id: 'ATM',
    code: 'ATM',
    name: 'Atlético Madrid',
    fullName: 'Club Atlético de Madrid, S.A.D.',
    city: 'Madrid, Community of Madrid',
    founded: 1903,
    president: 'Enrique Cerezo',
    manager: 'Diego Simeone',
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
    nicknames: ["Los Colchoneros (The Mattress Makers)","Los Rojiblancos"],
    motto: 'Coraje y Corazón (Courage and Heart)',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 11,
                "icon": "military_tech",
                "years": "1940, 1941, 1950, 1951, 1966, 1970, 1973, 1977, 1996, 2014, 2021"
          },
          {
                "name": "Copa del Rey",
                "count": 10,
                "icon": "emoji_events",
                "years": "10 titles"
          },
          {
                "name": "UEFA Europa League",
                "count": 3,
                "icon": "workspace_premium",
                "years": "2010, 2012, 2018"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Rojiblanco Heritage",
                "colorName": "Crimson & Cobalt Stripes",
                "badge": "HERITAGE",
                "desc": "Return of the historic crest with thin blue and red accent stripes.",
                "hexPrimary": "#CB3524",
                "hexSecondary": "#003366"
          }
    ],
    squad: [
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 45, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Ademola Lookman', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'HAT-TRICK HERO', statLabel: 'Chances Created', statVal: '3.4 per 90', val: '€60.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 20, playerId: 46, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Alejandro Grimaldo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'SET PIECE KING', statLabel: 'Assists / 90', statVal: '0.42 A/90', val: '€45.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 47, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Alex Baena', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'PLAYMAKER', statLabel: 'Key Passes', statVal: '3.5 per 90', val: '€50.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 48, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Alexander Sørloth', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.1 per 90', val: '€18.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 14, playerId: 49, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Arnau Ortiz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.5 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 19, playerId: 50, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Cristian Romero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'COPA CHAMP', statLabel: 'Interceptions', statVal: '2.8 per 90', val: '€65.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '30', jerseyNumber: 30, squadIndex: 24, playerId: 51, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Daniel Martinez Moreno', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '77.0% (2.6/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 15, playerId: 52, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Dávid Hancko', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'SOLID CB', statLabel: 'Pass Accuracy', statVal: '88.5%', val: '€35.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 18, playerId: 53, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Giuliano Simeone', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 11, playerId: 54, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Jan Oblak', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: 'ZAMORA x5', statLabel: 'Save Percentage', statVal: '76.8% (Post-Shot xG +4.2)', val: '€28.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 4, playerId: 55, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Johnny Cardoso', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€34.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 13, playerId: 56, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Jonathan David', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'CLINICAL', statLabel: 'Shot Conv', statVal: '24.5%', val: '€50.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 57, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Juan Musso', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€13.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 17, playerId: 58, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Julián Álvarez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'WORLD CHAMP', statLabel: 'G/A per 90', statVal: '0.94', val: '€90.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 5, playerId: 59, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Koke', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€34.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 6, playerId: 60, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Lee Kang-In', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'DRIBBLE STAR', statLabel: 'Prog Passes', statVal: '5.8 per 90', val: '€30.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 16, playerId: 61, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Marc Pubill', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '69.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 12, playerId: 62, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Marcos Llorente', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 21, playerId: 63, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Morten Hjulmand', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '90.0% completion', val: '€31.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 2, playerId: 64, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Obed Vargas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€38.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 7, playerId: 65, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Pablo Barrios', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '24', jerseyNumber: 24, squadIndex: 22, playerId: 66, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Robin Le Normand', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.2/90)', val: '€22.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 3, playerId: 67, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Rodrigo Mendoza', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€24.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '25', jerseyNumber: 25, squadIndex: 23, playerId: 68, teamId: 3, coachName: 'Diego Simeone', teamName: 'Atlético de Madrid', name: 'Salvi Esquivel', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '76.0% SV', val: '€31.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  ATH: {
    id: 'ATH',
    code: 'ATH',
    name: 'Athletic Club',
    fullName: 'Athletic Club',
    city: 'Bilbao, Basque Country',
    founded: 1898,
    president: 'Jon Uriarte',
    manager: 'Edin Terzić',
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
    nicknames: ["Los Leones (The Lions)","Zurigorri"],
    motto: 'Con cantera y afición, no hace falta importación',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 8,
                "icon": "military_tech",
                "years": "1930, 1931, 1934, 1936, 1943, 1956, 1983, 1984"
          },
          {
                "name": "Copa del Rey",
                "count": 24,
                "icon": "emoji_events",
                "years": "24 titles (most recent: 2024)"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Zurigorri",
                "colorName": "Red & White Stripes",
                "badge": "COPA 24",
                "desc": "Classic red and white verticals adorned with the 24th Copa del Rey winners emblem.",
                "hexPrimary": "#EE2524",
                "hexSecondary": "#000000"
          }
    ],
    squad: [
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 20, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Aitor Paredes', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.0/90)', val: '€12.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 18, playerId: 21, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Alejandro Rego', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€17.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 14, playerId: 22, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Aymeric Laporte', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: 'EURO STAR', statLabel: 'Aerial Duels', statVal: '72.0% Won', val: '€20.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '24', jerseyNumber: 24, squadIndex: 22, playerId: 23, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Beñat Gerenabarrena', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€31.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 24, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Beñat Prados', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€36.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 25, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Dani Vivian', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (3.2/90)', val: '€18.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 26, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Gorka Guruzeta', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 27, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Hugo Rincón', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '71.0% (3.2/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 28, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Iñaki Williams', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'RECORD IRONMAN', statLabel: 'Consecutive Matches', statVal: '251 Unbroken Games', val: '€25.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 15, playerId: 29, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Iñigo Ruiz De Galarreta', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '93.0% completion', val: '€20.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '12', jerseyNumber: 12, squadIndex: 12, playerId: 30, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Jesus Areso', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (2.0/90)', val: '€10.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '31', jerseyNumber: 31, squadIndex: 25, playerId: 31, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Johaneko Louis-Jean', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '75.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 13, playerId: 32, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Julen Agirrezabala', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€20.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 19, playerId: 33, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Maroan Sannadi', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.7 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 17, playerId: 34, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Mikel Jauregizar', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€34.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 20, playerId: 35, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Nico Serrano', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€10.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 36, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Nico Williams', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'EURO CHAMP', statLabel: 'Dribbles per 90', statVal: '5.2 successful/90', val: '€70.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 37, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Oihan Sancet', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '28', jerseyNumber: 28, squadIndex: 24, playerId: 38, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Peio Canales', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '87.0% completion', val: '€31.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 21, playerId: 39, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Robert Navarro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.5 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 40, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Unai Simón', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€11.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 41, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Yeray Álvarez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.2/90)', val: '€22.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 16, playerId: 42, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Yuri Berchiche', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (2.5/90)', val: '€29.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 43, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Álex Berenguer', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.9 per 90', val: '€20.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '25', jerseyNumber: 25, squadIndex: 23, playerId: 44, teamId: 2, coachName: 'Edin Terzić', teamName: 'Athletic Club', name: 'Álvaro Djaló', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.2 per 90', val: '€27.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  RSO: {
    id: 'RSO',
    code: 'RSO',
    name: 'Real Sociedad',
    fullName: 'Real Sociedad de Fútbol, S.A.D.',
    city: 'San Sebastián, Basque Country',
    founded: 1909,
    president: 'Jokin Aperribay',
    manager: 'Pellegrino Matarazzo',
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
    nicknames: ["La Real","Txuri-Urdin (White-Blue)","Erreala"],
    motto: 'Aupa Erreala!',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 2,
                "icon": "military_tech",
                "years": "1981, 1982"
          },
          {
                "name": "Copa del Rey",
                "count": 3,
                "icon": "emoji_events",
                "years": "1909, 1987, 2020"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Txuri-Urdin",
                "colorName": "Royal Blue and Pure White",
                "badge": "IKURRIÑA",
                "desc": "Thick royal blue columns with subtle Basque Ikurriña flag details on collar.",
                "hexPrimary": "#0047AB",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 317, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Aihen Muñoz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.0/90)', val: '€12.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 318, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Ander Barrenetxea', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.4 per 90', val: '€25.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 319, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Aritz Elustondo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (2.6/90)', val: '€26.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 320, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Arsen Zakharyan', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€36.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 17, playerId: 321, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Beñat Turrientes', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€21.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 18, playerId: 322, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Brais Méndez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '87.0% completion', val: '€28.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 323, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Hamari Traoré', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '66.0% (3.8/90)', val: '€32.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 324, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Igor Zubeldia', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 325, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Jon Aramburu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (2.4/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 15, playerId: 326, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Jon Pacheco', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '78.0% (2.7/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 16, playerId: 327, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Luka Sučić', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 328, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Martín Zubimendi', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 329, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Mikel Oyarzabal', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.7 per 90', val: '€36.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '25', jerseyNumber: 25, squadIndex: 19, playerId: 330, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Orri Óskarsson', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '4.0 per 90', val: '€21.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 14, playerId: 331, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Sheraldo Becker', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 332, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Takefusa Kubo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.6 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 334, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Unai Marrero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '78.0% SV', val: '€38.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 335, teamId: 17, coachName: 'Pellegrino Matarazzo', teamName: 'Real Sociedad', name: 'Álex Remiro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€17.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  BET: {
    id: 'BET',
    code: 'BET',
    name: 'Real Betis',
    fullName: 'Real Betis Balompié, S.A.D.',
    city: 'Seville, Andalusia',
    founded: 1907,
    president: 'Ángel Haro',
    manager: 'Manuel Pellegrini',
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
    nicknames: ["Los Verdiblancos","Los Béticos","Heliópolis"],
    motto: '¡Viva el Betis manque pierda!',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 1,
                "icon": "military_tech",
                "years": "1935"
          },
          {
                "name": "Copa del Rey",
                "count": 3,
                "icon": "emoji_events",
                "years": "1977, 2005, 2022"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Verdiblanco",
                "colorName": "Emerald Green & White Stripes",
                "badge": "HERITAGE",
                "desc": "Thirteen traditional green and white stripes inspired by the iconic 1990s Hummel era.",
                "hexPrimary": "#0BB364",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 270, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Adrián', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '71.0% SV', val: '€8.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 15, playerId: 271, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Aitor Ruibal', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.4 per 90', val: '€25.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 17, playerId: 272, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Chimy Ávila', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.7 per 90', val: '€32.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 273, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Cédric Bakambu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.0 per 90', val: '€39.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 274, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Diego Llorente', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (3.2/90)', val: '€18.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 275, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Ez Abde', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 7, playerId: 276, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Giovani Lo Celso', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '90.0% completion', val: '€35.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 277, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Héctor Bellerín', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 20, playerId: 278, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Isco', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '85.0% completion', val: '€27.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 280, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Marc Bartra', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '82.0% (3.0/90)', val: '€16.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 19, playerId: 281, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Marc Roca', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 282, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Natan', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (3.6/90)', val: '€30.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 16, playerId: 283, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Pablo Fornals', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€18.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '12', jerseyNumber: 12, squadIndex: 11, playerId: 284, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Ricardo Rodríguez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.2/90)', val: '€22.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 285, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Romain Perraud', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (2.5/90)', val: '€29.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 286, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Rui Silva', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€10.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 18, playerId: 287, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Sergi Altimira', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '90.0% completion', val: '€24.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 288, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Vitor Roque', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.5 per 90', val: '€34.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 289, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'William Carvalho', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '85.0% completion', val: '€16.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 21, playerId: 290, teamId: 15, coachName: 'Manuel Pellegrini', teamName: 'Real Betis', name: 'Youssouf Sabaly', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '78.0% (2.0/90)', val: '€20.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  SFC: {
    id: 'SFC',
    code: 'SFC',
    name: 'Sevilla FC',
    fullName: 'Sevilla Fútbol Club, S.A.D.',
    city: 'Seville, Andalusia',
    founded: 1890,
    president: 'José María del Nido Carrasco',
    manager: 'Luis García Plaza',
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
    nicknames: ["Los Nervionenses","Los Palanganas","Rojiblancos"],
    motto: 'Nunca se rinde (Never gives up)',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 1,
                "icon": "military_tech",
                "years": "1946"
          },
          {
                "name": "UEFA Europa League",
                "count": 7,
                "icon": "workspace_premium",
                "years": "Record 7 UEL titles (2006-2023)"
          },
          {
                "name": "Copa del Rey",
                "count": 5,
                "icon": "emoji_events",
                "years": "1935, 1939, 1948, 2007, 2010"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Blanco Nervión",
                "colorName": "Pure White with Crimson Trim",
                "badge": "CASTILLE",
                "desc": "Clean white body with crimson cuffs and Sánchez-Pizjuán mosaic homage.",
                "hexPrimary": "#FFFFFF",
                "hexSecondary": "#D4002D"
          }
    ],
    squad: [
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 336, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Adrià Pedrosa', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.0/90)', val: '€12.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 15, playerId: 337, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Albert Sambi Lokonga', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€22.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 18, playerId: 338, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Chidera Ejuke', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.7 per 90', val: '€32.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 17, playerId: 339, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Djibril Sow', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€36.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 340, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Dodi Lukebakio', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 16, playerId: 341, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Gabriel Suazo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '79.0% (3.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 342, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Isaac Romero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 343, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'José Ángel Carmona', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '66.0% (3.8/90)', val: '€32.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 344, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Kelechi Iheanacho', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.2 per 90', val: '€23.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 345, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Loïc Badé', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (2.4/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 19, playerId: 346, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Lucien Agoumé', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€34.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 20, playerId: 347, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Marcão', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '82.0% (3.0/90)', val: '€16.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 348, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Nemanja Gudelj', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 14, playerId: 349, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Peque', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.7 per 90', val: '€36.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 350, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Saúl Ñíguez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€18.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 351, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Suso', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 352, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Tanguy Nianzou', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (2.5/90)', val: '€29.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 353, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Valentín Barco', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (2.8/90)', val: '€14.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 354, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Álvaro Fernández', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€38.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 355, teamId: 18, coachName: 'Luis García Plaza', teamName: 'Sevilla FC', name: 'Ørjan Nyland', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€17.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  VIL: {
    id: 'VIL',
    code: 'VIL',
    name: 'Villarreal CF',
    fullName: 'Villarreal Club de Fútbol, S.A.D.',
    city: 'Villarreal, Castellón',
    founded: 1923,
    president: 'Fernando Roig',
    manager: 'Iñigo Pérez',
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
    nicknames: ["El Submarino Amarillo (The Yellow Submarine)"],
    motto: 'Endavant Villarreal (Forward Villarreal)',
    trophies: [
          {
                "name": "UEFA Europa League",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2021 Champions"
          },
          {
                "name": "UEFA Champions League Semi-finalists",
                "count": 2,
                "icon": "military_tech",
                "years": "2006, 2022"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Total Amarillo",
                "colorName": "Canary Yellow",
                "badge": "SUBMARINO",
                "desc": "All-yellow monochrome uniform with navy ceramic detailing.",
                "hexPrimary": "#FDE047",
                "hexSecondary": "#005CA9"
          }
    ],
    squad: [
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 392, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Alfonso Pedraza', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.0/90)', val: '€12.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 18, playerId: 393, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Ayoze Pérez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.4 per 90', val: '€25.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 394, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Dani Parejo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€29.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 395, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Diego Conde', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '71.0% SV', val: '€29.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '12', jerseyNumber: 12, squadIndex: 11, playerId: 396, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Eric Bailly', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (3.2/90)', val: '€18.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 397, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Gerard Moreno', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 398, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Ilias Akhomach', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 399, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Juan Foyth', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 400, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Logan Costa', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '78.0% (2.7/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 401, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Luiz Júnior', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€12.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 15, playerId: 402, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Nicolas Pépé', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.4 per 90', val: '€29.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 14, playerId: 403, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Pape Gueye', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 16, playerId: 404, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Ramon Terrats', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€18.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 405, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Santi Comesaña', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€32.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 19, playerId: 406, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Sergi Cardona', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (2.8/90)', val: '€14.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 407, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Thierno Barry', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.2 per 90', val: '€27.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 408, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Willy Kambwala', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (3.4/90)', val: '€28.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 17, playerId: 409, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Yéremy Pino', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.8 per 90', val: '€19.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 13, playerId: 410, teamId: 20, coachName: 'Iñigo Pérez', teamName: 'Villarreal CF', name: 'Álex Baena', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€23.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  VAL: {
    id: 'VAL',
    code: 'VAL',
    name: 'Valencia CF',
    fullName: 'Valencia Club de Fútbol, S.A.D.',
    city: 'Valencia, Valencian Community',
    founded: 1919,
    president: 'Layhoon Chan',
    manager: 'Carlos Corberán',
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
    nicknames: ["Los Che","Els Blanquinegres","Los Murciélagos"],
    motto: 'Amunt Valencia',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 6,
                "icon": "military_tech",
                "years": "1942, 1944, 1947, 1971, 2002, 2004"
          },
          {
                "name": "Copa del Rey",
                "count": 8,
                "icon": "emoji_events",
                "years": "8 titles (most recent: 2019)"
          },
          {
                "name": "UEFA Cup",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2004 Champions"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Blanquinegre",
                "colorName": "White and Deep Obsidian",
                "badge": "MESTALLA",
                "desc": "White body with bat-wing obsidian shoulders and orange piping.",
                "hexPrimary": "#FFFFFF",
                "hexSecondary": "#FF6600"
          }
    ],
    squad: [
      { num: '33', jerseyNumber: 33, squadIndex: 31, playerId: 356, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Aaron Mayol', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€17.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '37', jerseyNumber: 37, squadIndex: 33, playerId: 357, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Aimar Blazquez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.7 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '29', jerseyNumber: 29, squadIndex: 28, playerId: 358, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Alejandro Panach', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '78.0% (3.3/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 16, playerId: 359, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Aliou Dieng', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€38.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 360, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'André Almeida', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€15.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 22, playerId: 361, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Arnau Martínez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '63.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 362, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Arnaut Danjuma', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'EXPLOSIVE', statLabel: 'Take-ons Won', statVal: '2.8 per 90', val: '€14.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 14, playerId: 363, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Cristian Rivero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '75.0% SV', val: '€31.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 364, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'César Tárrega', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (2.6/90)', val: '€26.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 19, playerId: 365, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Dani Raba', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.7 per 90', val: '€10.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '27', jerseyNumber: 27, squadIndex: 27, playerId: 366, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'David Otorbi', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€17.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 17, playerId: 367, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Diego López', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 20, playerId: 368, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Dimitri Foulquier', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.8/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 23, playerId: 369, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Filip Ugrinic', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€38.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 370, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Guido Rodríguez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'ANCHOR', statLabel: 'Interceptions', statVal: '2.6 per 90', val: '€15.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 11, playerId: 371, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Harvey Elliott', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'TALENT', statLabel: 'Key Passes', statVal: '2.9 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 372, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Hugo Duro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.5 per 90', val: '€30.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '36', jerseyNumber: 36, squadIndex: 32, playerId: 373, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Iker Córdoba', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '75.0% (3.3/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '38', jerseyNumber: 38, squadIndex: 34, playerId: 374, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Jaume Dura', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '82.0% completion', val: '€38.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 375, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Javi Guerra', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 21, playerId: 376, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Jesús Vázquez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (3.3/90)', val: '€23.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 377, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'José Copete', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '79.0% (2.2/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 15, playerId: 378, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'José Gayà', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (3.6/90)', val: '€30.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '12', jerseyNumber: 12, squadIndex: 13, playerId: 379, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Justin De Haas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '63.0% (2.4/90)', val: '€38.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '25', jerseyNumber: 25, squadIndex: 25, playerId: 380, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Kayne Van Oevelen', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '76.0% SV', val: '€10.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '29', jerseyNumber: 29, squadIndex: 29, playerId: 381, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Lucas Núñez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€17.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 12, playerId: 382, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Luis Rioja', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Chances Created', statVal: '4.0 per 90', val: '€21.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '41', jerseyNumber: 41, squadIndex: 36, playerId: 383, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Marcos Navarro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '67.0% (2.8/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 384, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Mouctar Diakhaby', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (2.9/90)', val: '€38.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '24', jerseyNumber: 24, squadIndex: 24, playerId: 385, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Pablo Maffeo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '69.0% (3.0/90)', val: '€10.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 18, playerId: 386, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Pepelu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€25.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '31', jerseyNumber: 31, squadIndex: 30, playerId: 387, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Rodrigo Gamon', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '71.0% (3.2/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '39', jerseyNumber: 39, squadIndex: 35, playerId: 388, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Ryūnosuke Satō', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '85.0% completion', val: '€31.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '26', jerseyNumber: 26, squadIndex: 26, playerId: 389, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Sergi Canos', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 390, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Stole Dimitrievski', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€17.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 391, teamId: 19, coachName: 'Carlos Corberán', teamName: 'Valencia CF', name: 'Umar Sadiq', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: 'POWER STRIKER', statLabel: 'Aerial Duels', statVal: '5.2 won/90', val: '€12.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  CEL: {
    id: 'CEL',
    code: 'CEL',
    name: 'RC Celta',
    fullName: 'Real Club Celta de Vigo, S.A.D.',
    city: 'Vigo, Galicia',
    founded: 1923,
    president: 'Marián Mouriño',
    manager: 'Claudio Giráldez',
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
    nicknames: ["Os Celestes (The Sky Blues)","O Celtiña"],
    motto: 'Afouteza e Corazón (Courage and Heart)',
    trophies: [
          {
                "name": "UEFA Intertoto Cup",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2000"
          },
          {
                "name": "Copa del Rey Runners-up",
                "count": 3,
                "icon": "emoji_events",
                "years": "1948, 1994, 2001"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Celeste Centenario",
                "colorName": "Sky Blue and Wine Red",
                "badge": "AFOUTEZA",
                "desc": "Pure sky blue shirt featuring lyrics of the C. Tangana anthem \"Oliveira dos Cen Anos\".",
                "hexPrimary": "#70B5FF",
                "hexSecondary": "#A81E2B"
          }
    ],
    squad: [
      { num: '11', jerseyNumber: 11, squadIndex: 9, playerId: 69, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Borja Iglesias', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.1 per 90', val: '€18.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 70, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Carl Starfelt', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (2.3/90)', val: '€19.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 6, playerId: 71, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Fran Beltrán', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€29.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 16, playerId: 72, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Hugo Sotelo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€36.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 11, playerId: 73, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Hugo Álvarez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 8, playerId: 74, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Iago Aspas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 5, playerId: 75, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Ilaix Moriba', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '90.0% completion', val: '€35.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 10, playerId: 76, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Iván Villar', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€13.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 13, playerId: 77, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Jailson', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (2.4/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 14, playerId: 78, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Jonathan Bamba', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€37.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 12, playerId: 79, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Joseph Aidoo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '82.0% (3.0/90)', val: '€16.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 15, playerId: 80, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Luca de la Torre', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 18, playerId: 81, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Pablo Durán', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '4.0 per 90', val: '€21.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 4, playerId: 82, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Sergio Carreira', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.2/90)', val: '€22.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 7, playerId: 83, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Tasos Douvikas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.6 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 84, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Vicente Guaita', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€10.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 17, playerId: 85, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Williot Swedberg', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.2 per 90', val: '€27.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 86, teamId: 4, coachName: 'Claudio Giráldez', teamName: 'Celta', name: 'Óscar Mingueza', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (3.4/90)', val: '€28.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  OSA: {
    id: 'OSA',
    code: 'OSA',
    name: 'CA Osasuna',
    fullName: 'Club Atlético Osasuna',
    city: 'Pamplona, Navarre',
    founded: 1920,
    president: 'Luis Sabalza',
    manager: 'Luis Miguel Ramis',
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
    nicknames: ["Los Rojillos (The Little Reds)","Gorritxoak"],
    motto: 'Osasuna nunca se rinde (Osasuna means Health & Vigor)',
    trophies: [
          {
                "name": "Copa del Rey Runners-up",
                "count": 2,
                "icon": "emoji_events",
                "years": "2005, 2023"
          },
          {
                "name": "Segunda División Titles",
                "count": 4,
                "icon": "military_tech",
                "years": "1952/53, 1955/56, 1960/61, 2018/19"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Rojillo Clásico",
                "colorName": "Deep Navarre Red and Navy",
                "badge": "SADAR",
                "desc": "Fiery Navarre red torso with royal navy sleeves and golden lions crest.",
                "hexPrimary": "#D11212",
                "hexSecondary": "#001E50"
          }
    ],
    squad: [
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 216, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Aimar Oroz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€15.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 11, playerId: 217, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Aitor Fernández', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€15.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 218, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Alejandro Catena', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (2.6/90)', val: '€26.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 219, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Ante Budimir', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.0 per 90', val: '€39.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 220, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Bryan Zaragoza', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 221, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Enzo Boyomo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (3.5/90)', val: '€25.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 19, playerId: 222, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Iker Muñoz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 223, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Jesús Areso', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 224, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Jon Moncayola', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '85.0% completion', val: '€27.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 15, playerId: 225, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'José Arnaiz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€37.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 226, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Juan Cruz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '82.0% (3.0/90)', val: '€16.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 18, playerId: 227, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Kike Barja', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 228, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Lucas Torró', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '16', jerseyNumber: 16, squadIndex: 14, playerId: 229, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Moi Gómez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 16, playerId: 230, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Pablo Ibáñez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€18.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 17, playerId: 231, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Raúl García de Haro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 12, playerId: 232, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Rubén García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.6 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 13, playerId: 233, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Rubén Peña', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (2.8/90)', val: '€14.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 234, teamId: 12, coachName: 'Luis Miguel Ramis', teamName: 'Osasuna', name: 'Sergio Herrera', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€17.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  GET: {
    id: 'GET',
    code: 'GET',
    name: 'Getafe CF',
    fullName: 'Getafe Club de Fútbol, S.A.D.',
    city: 'Getafe, Community of Madrid',
    founded: 1983,
    president: 'Ángel Torres Sánchez',
    manager: 'José Bordalás',
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
    nicknames: ["Los Azulones (The Deep Blues)","Geta"],
    motto: '¡Vamos Geta!',
    trophies: [
          {
                "name": "Copa del Rey Runners-up",
                "count": 2,
                "icon": "emoji_events",
                "years": "2007, 2008"
          },
          {
                "name": "UEFA Cup Quarter-finalists",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2008 (vs Bayern Munich)"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Azulón Total",
                "colorName": "Cobalt Royal Blue",
                "badge": "COLISEUM",
                "desc": "Monochromatic cobalt blue featuring the aeronautical cross emblem of Getafe.",
                "hexPrimary": "#004B87",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
      { num: '18', jerseyNumber: 18, squadIndex: 14, playerId: 165, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Bertuğ Yıldırım', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.1 per 90', val: '€18.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 166, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Borja Mayoral', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.4 per 90', val: '€25.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 167, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Carles Aleñá', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€29.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 13, playerId: 168, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Carles Pérez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.0 per 90', val: '€39.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 169, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'David Soria', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€14.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 12, playerId: 170, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Diego Rico', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (3.5/90)', val: '€25.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 171, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Djené Dakonam', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '66.0% (3.8/90)', val: '€32.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 172, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Domingos Duarte', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 11, playerId: 173, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Jiří Letáček', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€31.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 17, playerId: 174, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Juan Iglesias', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (2.4/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 7, playerId: 175, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Luis Milla', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€34.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 176, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Mauro Arambarri', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 177, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Nabil Aberdin', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (3.3/90)', val: '€23.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 178, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Omar Alderete', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (3.6/90)', val: '€30.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 18, playerId: 179, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Peter Federico', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '4.0 per 90', val: '€21.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 16, playerId: 180, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Uche', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€25.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 15, playerId: 181, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Yellu Santiago', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€32.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 182, teamId: 9, coachName: 'José Bordalás', teamName: 'Getafe CF', name: 'Álex Sola', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.9 per 90', val: '€20.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  ALA: {
    id: 'ALA',
    code: 'ALA',
    name: 'Deportivo Alavés',
    fullName: 'Deportivo Alavés, S.A.D.',
    city: 'Vitoria-Gasteiz, Basque Country',
    founded: 1921,
    president: 'Alfonso Fernández de Trocóniz',
    manager: 'Quique Sánchez Flores',
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
    nicknames: ["Babazorros (Bean Eaters)","El Glorioso"],
    motto: 'Gora Alavés!',
    trophies: [
          {
                "name": "UEFA Cup Runners-up",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2001 (Epic 4-5 vs Liverpool)"
          },
          {
                "name": "Copa del Rey Runners-up",
                "count": 1,
                "icon": "emoji_events",
                "years": "2017"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Albiazul",
                "colorName": "Blue and White Vertical Stripes",
                "badge": "MENDI 100",
                "desc": "Centenary tribute to Mendizorrotza stadium with traditional broad stripes.",
                "hexPrimary": "#005CA9",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 1, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Abdel Abqar', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.0/90)', val: '€12.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 2, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Aleksandar Sedlar', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (2.3/90)', val: '€19.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 3, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Ander Guevara', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€29.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 7, playerId: 4, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Antonio Blanco', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€36.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 5, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Antonio Sivera', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€14.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 6, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Asier Villalibre', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 16, playerId: 7, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Carlos Martín', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 18, playerId: 8, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Carlos Protesoni', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '93.0% completion', val: '€20.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '12', jerseyNumber: 12, squadIndex: 11, playerId: 9, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Hugo Novoa', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Chances Created', statVal: '2.5 per 90', val: '€30.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 10, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Jesús Owono', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€10.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '24', jerseyNumber: 24, squadIndex: 19, playerId: 11, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Joan Jordán', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '88.0% completion', val: '€34.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 15, playerId: 12, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Jon Guridi', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 14, playerId: 13, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Kike García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.4 per 90', val: '€29.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 14, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Luka Romero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.7 per 90', val: '€36.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 15, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Manu Sánchez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (3.9/90)', val: '€15.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 16, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Moussa Diarra', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.2/90)', val: '€22.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 17, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Nahuel Tenaglia', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (2.5/90)', val: '€29.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 18, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Tomás Conechny', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.9 per 90', val: '€20.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 17, playerId: 19, teamId: 1, coachName: 'Quique Sánchez Flores', teamName: 'Alavés', name: 'Toni Martínez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.2 per 90', val: '€27.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  RAY: {
    id: 'RAY',
    code: 'RAY',
    name: 'Rayo Vallecano',
    fullName: 'Rayo Vallecano de Madrid, S.A.D.',
    city: 'Madrid (Vallecas), Community of Madrid',
    founded: 1924,
    president: 'Raúl Martín Presa',
    manager: 'Beñat San José',
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
    nicknames: ["Los Franjirrojos (The Red Sashes)","Los Vallecanos"],
    motto: 'Vallecas puerto de mar • Clase trabajadora',
    trophies: [
          {
                "name": "Centenary Edition",
                "count": 100,
                "icon": "military_tech",
                "years": "1924-2024 Centenario de Vallecas"
          },
          {
                "name": "UEFA Cup Quarter-finalists",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2001"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Franja Centenario",
                "colorName": "Alpine White & Diagonal Lightning Sash",
                "badge": "100 AÑOS",
                "desc": "Centenary edition white shirt featuring the iconic crimson lightning bolt sash.",
                "hexPrimary": "#FFFFFF",
                "hexSecondary": "#E20613"
          }
    ],
    squad: [
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 251, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Abdul Mumin', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (2.0/90)', val: '€12.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 252, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Alfonso Espino', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (2.3/90)', val: '€19.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 253, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Andrei Rațiu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (2.6/90)', val: '€26.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '15', jerseyNumber: 15, squadIndex: 14, playerId: 254, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Aridane Hernández', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.9/90)', val: '€33.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 255, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Augusto Batalla', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€14.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 256, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Dani Cárdenas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€21.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 257, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Florian Lejeune', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '66.0% (3.8/90)', val: '€32.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 15, playerId: 258, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Gerard Gumbau', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '93.0% completion', val: '€20.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 259, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Isi Palazón', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.5 per 90', val: '€30.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 17, playerId: 260, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Ivan Balliu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '78.0% (2.7/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 261, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'James Rodríguez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: 'GOLDEN BOOT', statLabel: 'Key Passes', statVal: '3.8 per 90', val: '€10.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 16, playerId: 262, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Jorge de Frutos', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.4 per 90', val: '€29.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 263, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Pathé Ciss', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 18, playerId: 264, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Randy Nteka', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '4.0 per 90', val: '€21.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 19, playerId: 265, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Raúl de Tomás', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 266, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Sergio Camello', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.6 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 267, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Unai López', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '87.0% completion', val: '€17.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 268, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Álvaro García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.2 per 90', val: '€27.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 269, teamId: 14, coachName: 'Beñat San José', teamName: 'Rayo Vallecano', name: 'Óscar Valentín', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '93.0% completion', val: '€31.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  ESP: {
    id: 'ESP',
    code: 'ESP',
    name: 'RCD Espanyol',
    fullName: 'Reial Club Deportiu Espanyol de Barcelona, S.A.D.',
    city: 'Cornellà de Llobregat, Catalonia',
    founded: 1900,
    president: 'Chen Yansheng',
    manager: 'Manolo González',
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
    nicknames: ["Periquitos (The Parakeets)","Mágico Espanyol"],
    motto: 'Maravillosa minoría (Wonderful minority)',
    trophies: [
          {
                "name": "Copa del Rey",
                "count": 4,
                "icon": "emoji_events",
                "years": "1929, 1940, 2000, 2006"
          },
          {
                "name": "UEFA Cup Runners-up",
                "count": 2,
                "icon": "workspace_premium",
                "years": "1988, 2007"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Blanquiazul Perico",
                "colorName": "Azure Blue and Pure White Columns",
                "badge": "PERICO",
                "desc": "Rich azure and white vertical blocks with royal crest crown detailing.",
                "hexPrimary": "#0070B8",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
      { num: '19', jerseyNumber: 19, squadIndex: 15, playerId: 120, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Alejo Veliz', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.1 per 90', val: '€18.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 16, playerId: 121, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Alex Král', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€22.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '23', jerseyNumber: 23, squadIndex: 18, playerId: 122, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Antoniu Roca', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.7 per 90', val: '€32.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 123, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Brian Oliván', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.9/90)', val: '€33.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 124, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Carlos Romero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '80.0% (3.2/90)', val: '€18.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 125, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Fernando Pacheco', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€21.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 126, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Irvin Cardona', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 127, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Javi Puado', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.2 per 90', val: '€23.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 128, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Joan Garcia', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '72.0% SV', val: '€31.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 129, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Jofre Carreras', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€37.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 130, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'José Gragera', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 131, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Leandro Cabrera', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (3.3/90)', val: '€23.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 132, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Marash Kumbulla', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (3.6/90)', val: '€30.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 133, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Omar El Hilali', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (3.9/90)', val: '€15.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 134, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Pere Milla', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 135, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Pol Lozano', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€32.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 17, playerId: 136, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Walid Cheddira', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.9 per 90', val: '€20.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 14, playerId: 137, teamId: 7, coachName: 'Manolo González', teamName: 'RCD Espanyol de Barcelona', name: 'Álvaro Aguado', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '90.0% completion', val: '€24.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  DEP: {
    id: 'DEP',
    code: 'DEP',
    name: 'Deportivo La Coruña',
    fullName: 'Real Club Deportivo de La Coruña, S.A.D.',
    city: 'A Coruña, Galicia',
    founded: 1906,
    president: 'Juan Carlos Escotet',
    manager: 'Antonio Hidalgo',
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
    nicknames: ["Super Dépor","Os Branquiazuis","Herculinos"],
    motto: 'Forza Dépor, Sempre',
    trophies: [
          {
                "name": "LaLiga Titles",
                "count": 1,
                "icon": "military_tech",
                "years": "1999/2000 Champions"
          },
          {
                "name": "Copa del Rey",
                "count": 2,
                "icon": "emoji_events",
                "years": "1995, 2002 (Centenariazo)"
          },
          {
                "name": "Supercopa de España",
                "count": 3,
                "icon": "workspace_premium",
                "years": "1995, 2000, 2002"
          }
    ],
    kits: [
          {
                "season": "2026/27",
                "type": "Home Branquiazul",
                "colorName": "Classic Blue and White Vertical Stripes",
                "badge": "HERITAGE",
                "desc": "Historic dual-vertical blue and white strip with golden crest detailing.",
                "hexPrimary": "#004B87",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
      { num: '20', jerseyNumber: 20, squadIndex: 15, playerId: 87, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Charlie Patiño', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€15.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 16, playerId: 88, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Cristian Herrera', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.4 per 90', val: '€25.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 89, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Dani Barcia', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (2.6/90)', val: '€26.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 90, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'David Mella', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.0 per 90', val: '€39.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 91, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Diego Villares', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€21.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 92, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Germán Parreño', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€21.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 93, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Helton Leite', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '71.0% SV', val: '€28.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 14, playerId: 94, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Ivan Barbero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.2 per 90', val: '€23.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 95, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Jose Angel Jurado', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (2.4/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 96, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Lucas Pérez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€37.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 97, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Mario Soriano', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 98, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Omenuke Mfulu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 99, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Pablo Vázquez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (3.6/90)', val: '€30.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 100, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Sergio Escudero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (3.9/90)', val: '€15.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 101, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Ximo Navarro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.2/90)', val: '€22.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 102, teamId: 5, coachName: 'Antonio Hidalgo', teamName: 'Deportivo A Coruña', name: 'Yeremay Hernández', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.6 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  ELC: {
    id: 'ELC',
    code: 'ELC',
    name: 'Elche CF',
    fullName: 'Elche Club de Fútbol, S.A.D.',
    city: 'Elche, Alicante',
    founded: 1923,
    president: 'Joaquín Buitrago',
    manager: 'Martín Anselmi',
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
    nicknames: ["Los Franjiverdes (The Green-striped)","Los Ilicitanos"],
    motto: 'Orgullo Franjiverde',
    trophies: [
          {
                "name": "Segunda División Titles",
                "count": 2,
                "icon": "military_tech",
                "years": "1958/59, 2012/13"
          },
          {
                "name": "Copa del Rey Runners-up",
                "count": 1,
                "icon": "emoji_events",
                "years": "1969"
          }
    ],
    kits: [
          {
                "season": "2026/27",
                "type": "Home Franjiverde",
                "colorName": "Pure White with Emerald Green Chest Band",
                "badge": "CLASSIC",
                "desc": "Iconic horizontal emerald stripe across clean alpine white shirt.",
                "hexPrimary": "#FFFFFF",
                "hexSecondary": "#008542"
          }
    ],
    squad: [
      { num: '19', jerseyNumber: 19, squadIndex: 15, playerId: 103, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Agustín Álvarez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.1 per 90', val: '€18.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 104, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Aleix Febas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€22.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 105, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Bambo Diaby', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (2.6/90)', val: '€26.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '18', jerseyNumber: 18, squadIndex: 14, playerId: 106, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Federico Redondo Solari', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€36.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 107, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Ferran Jutglà', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 7, playerId: 108, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Gonzalo Villar', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '87.0% completion', val: '€28.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 13, playerId: 109, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Josan', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 110, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Mario Gaspar', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 111, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Matías Dituro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€20.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 17, playerId: 112, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Mourad', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€37.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 113, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Nicolás Fernández', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 114, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Pedro Bigas', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '64.0% (3.3/90)', val: '€23.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 12, playerId: 115, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Roy Revivo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '68.0% (3.6/90)', val: '€30.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 16, playerId: 116, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Ruben Sanchez Saez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (3.9/90)', val: '€15.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 11, playerId: 117, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'San Román', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€24.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 118, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Sory Kaba', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 119, teamId: 6, coachName: 'Martín Anselmi', teamName: 'Elche CF', name: 'Victor Chust', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (2.8/90)', val: '€14.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  LEV: {
    id: 'LEV',
    code: 'LEV',
    name: 'Levante UD',
    fullName: 'Levante Unión Deportiva, S.A.D.',
    city: 'Valencia, Valencian Community',
    founded: 1909,
    president: 'Pablo Sánchez',
    manager: 'Luís Castro',
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
    nicknames: ["Granotes (The Frogs)","Azulgranas"],
    motto: 'Orgullo Granota',
    trophies: [
          {
                "name": "Copa de la España Libre",
                "count": 1,
                "icon": "military_tech",
                "years": "1937"
          },
          {
                "name": "Segunda División Titles",
                "count": 2,
                "icon": "emoji_events",
                "years": "2003/04, 2016/17"
          }
    ],
    kits: [
          {
                "season": "2026/27",
                "type": "Home Granota",
                "colorName": "Deep Navy Blue & Crimson Red Stripes",
                "badge": "AUTHENTIC",
                "desc": "Traditional navy and crimson vertical columns inspired by 1909 roots.",
                "hexPrimary": "#003F7A",
                "hexSecondary": "#B81D22"
          }
    ],
    squad: [
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 183, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Alfonso Pastor', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '71.0% SV', val: '€8.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 184, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Andrés Fernández', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '74.0% SV', val: '€15.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 185, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Andrés García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Chances Created', statVal: '2.7 per 90', val: '€32.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 186, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Brugui', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.0 per 90', val: '€39.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 14, playerId: 187, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Carlos Álvarez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 188, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Diego Pampín', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (3.5/90)', val: '€25.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 13, playerId: 189, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Fabrício', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 190, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Iván Romero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.2 per 90', val: '€23.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 191, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Jorge Cabello', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '74.0% (2.4/90)', val: '€24.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 192, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'José Luis Morales', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€37.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 193, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Oriol Rey', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 194, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Pablo Martínez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 15, playerId: 195, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Sergio Lozano', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 196, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Unai Elgezabal', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (3.9/90)', val: '€15.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 197, teamId: 10, coachName: 'Luís Castro', teamName: 'Levante UD', name: 'Vicente Iborra', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '92.0% completion', val: '€25.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  MAL: {
    id: 'MAL',
    code: 'MAL',
    name: 'Málaga CF',
    fullName: 'Málaga Club de Fútbol, S.A.D.',
    city: 'Málaga, Andalusia',
    founded: 1904,
    president: 'José María Muñoz (Admin)',
    manager: 'Juan Francisco Funes',
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
    nicknames: ["Los Boquerones (The Anchovies)","Blanquiazules"],
    motto: 'Memoria, Compromiso y Fe',
    trophies: [
          {
                "name": "UEFA Intertoto Cup",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2002 Champions"
          },
          {
                "name": "UEFA Champions League Quarter-finalists",
                "count": 1,
                "icon": "military_tech",
                "years": "2012/13 Historic Run"
          }
    ],
    kits: [
          {
                "season": "2026/27",
                "type": "Home Blanquiazul",
                "colorName": "Sky Blue and Crisp White Stripes",
                "badge": "COSTA DEL SOL",
                "desc": "Mediterranean azure and white heritage stripes with gold crest accents.",
                "hexPrimary": "#70B5FF",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 198, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Alfonso Herrero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '71.0% SV', val: '€8.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 15, playerId: 199, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Antonio Cordero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.4 per 90', val: '€25.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 12, playerId: 200, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Carlos López', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€22.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '14', jerseyNumber: 14, squadIndex: 13, playerId: 201, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Dani Sánchez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.9/90)', val: '€33.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 7, playerId: 202, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'David Larrubia', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 18, playerId: 203, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Dioni', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.6 per 90', val: '€31.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 5, playerId: 204, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Einar Galilea', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '66.0% (3.8/90)', val: '€32.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '02', jerseyNumber: 2, squadIndex: 2, playerId: 205, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Jokin Gabilondo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '70.0% (2.1/90)', val: '€17.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 16, playerId: 206, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Julen Lobete', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.5 per 90', val: '€30.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '11', jerseyNumber: 11, squadIndex: 11, playerId: 207, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Kevin Medina', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.8 per 90', val: '€37.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 10, playerId: 208, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Luca Sangalli', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 6, playerId: 209, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Luismi', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '83.0% completion', val: '€26.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 8, playerId: 210, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Manu Molina', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 17, playerId: 211, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Ramón Enríquez', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '89.0% completion', val: '€18.0M', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 9, playerId: 212, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Roko Baturina', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 14, playerId: 213, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Sergio Castel', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.6 per 90', val: '€35.0M', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 3, playerId: 214, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Víctor García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '84.0% (2.8/90)', val: '€14.0M', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 4, playerId: 215, teamId: 11, coachName: 'Juan Francisco Funes', teamName: 'Málaga CF', name: 'Álex Pastor', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '66.0% (3.1/90)', val: '€21.0M', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  RAC: {
    id: 'RAC',
    code: 'RAC',
    name: 'Real Racing Club',
    fullName: 'Real Racing Club de Santander, S.A.D.',
    city: 'Santander, Cantabria',
    founded: 1913,
    president: 'Manolo Higuera',
    manager: 'José Alberto López',
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
    nicknames: ["Los Verdiblancos","Los Racinguistas","El Sardinero"],
    motto: 'Racing Nunca Se Rinde',
    trophies: [
          {
                "name": "LaLiga Runners-up",
                "count": 1,
                "icon": "military_tech",
                "years": "1930/31 Founding Season"
          },
          {
                "name": "Copa del Rey Semi-finalists",
                "count": 2,
                "icon": "emoji_events",
                "years": "2007/08, 2009/10"
          }
    ],
    kits: [
          {
                "season": "2026/27",
                "type": "Home Verdiblanco",
                "colorName": "Pure Alpine White with Emerald & Black Trims",
                "badge": "SARDINERO",
                "desc": "White body with green collars and black shorts, the Cantabrian classic.",
                "hexPrimary": "#0BB364",
                "hexSecondary": "#000000"
          }
    ],
    squad: [
      { num: '11', jerseyNumber: 11, squadIndex: 10, playerId: 235, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Andrés Martín', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.1 per 90', val: '€18.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '06', jerseyNumber: 6, squadIndex: 5, playerId: 236, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Aritz Aldasoro', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€22.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '07', jerseyNumber: 7, squadIndex: 6, playerId: 237, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Iñigo Vicente', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.7 per 90', val: '€32.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '05', jerseyNumber: 5, squadIndex: 4, playerId: 238, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Javi Montero', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '76.0% (2.9/90)', val: '€33.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '22', jerseyNumber: 22, squadIndex: 16, playerId: 239, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Jeremy Arévalo', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.3 per 90', val: '€24.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '01', jerseyNumber: 1, squadIndex: 1, playerId: 240, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Jokin Ezkieta', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€21.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '19', jerseyNumber: 19, squadIndex: 13, playerId: 241, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Jon Karrikaburu', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '3.9 per 90', val: '€38.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '09', jerseyNumber: 9, squadIndex: 8, playerId: 242, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Juan Carlos Arana', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.2 per 90', val: '€23.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '17', jerseyNumber: 17, squadIndex: 12, playerId: 243, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Lago Junior', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.5 per 90', val: '€30.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '04', jerseyNumber: 4, squadIndex: 3, playerId: 244, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Manu Hernando', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '78.0% (2.7/90)', val: '€31.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '21', jerseyNumber: 21, squadIndex: 15, playerId: 245, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Marco Sangalli', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '91.0% completion', val: '€19.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      { num: '13', jerseyNumber: 13, squadIndex: 11, playerId: 246, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Miquel Parera', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Goalkeeper', category: 'gk', badge: null, statLabel: 'Save Percentage', statVal: '77.0% SV', val: '€19.0M', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      { num: '10', jerseyNumber: 10, squadIndex: 9, playerId: 247, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Pablo Torre', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '86.0% completion', val: '€33.0M', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { num: '03', jerseyNumber: 3, squadIndex: 2, playerId: 248, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Saúl García', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Defender', category: 'def', badge: null, statLabel: 'Duels Won', statVal: '72.0% (3.9/90)', val: '€15.0M', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { num: '20', jerseyNumber: 20, squadIndex: 14, playerId: 249, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Suleiman Camara', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Attacker', category: 'fwd', badge: null, statLabel: 'Chances Created', statVal: '2.3 per 90', val: '€28.0M', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { num: '08', jerseyNumber: 8, squadIndex: 7, playerId: 250, teamId: 13, coachName: 'José Alberto López', teamName: 'R. Racing Club', name: 'Íñigo Sainz-Maza', nat: 'ESP', natColor: 'text-on-surface-variant', role: 'Midfielder', category: 'mid', badge: null, statLabel: 'Pass Accuracy', statVal: '84.0% completion', val: '€32.0M', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  GIR: {
    id: 'GIR',
    code: 'GIR',
    name: 'Girona FC',
    fullName: 'Girona Futbol Club, S.A.D.',
    city: 'Girona, Catalonia',
    founded: 1930,
    president: 'Delfí Geli',
    manager: 'Míchel Sánchez',
    stadium: {
          "name": "Estadi Montilivi",
          "capacity": 14624,
          "city": "Girona",
          "inaugurated": 1970,
          "pitchSize": "105 x 68 m",
          "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80"
    },
    tier: 'ucl',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/9812.png',
    tagColor: 'text-primary',
    primaryColor: '#D31427',
    secondaryColor: '#FFFFFF',
    nicknames: ["Blanquivermells","Gironistes"],
    motto: 'Orgull Gironí',
    trophies: [
          {
                "name": "UEFA Champions League Debutants",
                "count": 1,
                "icon": "workspace_premium",
                "years": "2024/25 Qualified"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Blanquivermell",
                "colorName": "Red and White Vertical Halves",
                "badge": "UCL DEBUT",
                "desc": "Historic debut European kit with gold detailing.",
                "hexPrimary": "#D31427",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
          {
                "num": "01",
                "name": "Juan Carlos",
                "nat": "ESP",
                "natColor": "text-secondary",
                "role": "Goalkeeper",
                "category": "gk",
                "badge": null,
                "statLabel": "Clean Sheets",
                "statVal": "6 Clean",
                "val": "€1.5M",
                "img": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
          },
          {
                "num": "08",
                "name": "Viktor Tsygankov",
                "nat": "UKR",
                "natColor": "text-secondary",
                "role": "Winger",
                "category": "fwd",
                "badge": null,
                "statLabel": "Goals / Assists",
                "statVal": "8G, 7A",
                "val": "€30.0M",
                "img": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
          }
    ],
  },
  MLL: {
    id: 'MLL',
    code: 'MLL',
    name: 'RCD Mallorca',
    fullName: 'Real Club Deportivo Mallorca, S.A.D.',
    city: 'Palma, Balearic Islands',
    founded: 1916,
    president: 'Andy Kohlberg',
    manager: 'Jagoba Arrasate',
    stadium: {
          "name": "Estadi Mallorca Son Moix",
          "capacity": 23142,
          "city": "Palma",
          "inaugurated": 1999,
          "pitchSize": "105 x 68 m",
          "image": "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80"
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/84.png',
    tagColor: 'text-primary',
    primaryColor: '#E20613',
    secondaryColor: '#000000',
    nicknames: ["Los Bermellones (The Vermilions)","Els Barralets"],
    motto: 'Sempre Endavant Mallorca',
    trophies: [
          {
                "name": "Copa del Rey",
                "count": 1,
                "icon": "emoji_events",
                "years": "2003"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Vermelló",
                "colorName": "Vermilion Red",
                "badge": "MALLORCA",
                "desc": "Vermilion red with black sleeve accents.",
                "hexPrimary": "#E20613",
                "hexSecondary": "#000000"
          }
    ],
    squad: [
          {
                "num": "01",
                "name": "Dominik Greif",
                "nat": "SVK",
                "natColor": "text-secondary",
                "role": "Goalkeeper",
                "category": "gk",
                "badge": null,
                "statLabel": "Save Pct",
                "statVal": "75.2%",
                "val": "€4.0M",
                "img": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
          },
          {
                "num": "07",
                "name": "Vedat Muriqi",
                "nat": "KOS",
                "natColor": "text-secondary",
                "role": "Striker",
                "category": "fwd",
                "badge": "PIRATE",
                "statLabel": "Aerial Duels",
                "statVal": "8.4 won/90",
                "val": "€14.0M",
                "img": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
          }
    ],
  },
  LPA: {
    id: 'LPA',
    code: 'LPA',
    name: 'UD Las Palmas',
    fullName: 'Unión Deportiva Las Palmas, S.A.D.',
    city: 'Las Palmas, Canary Islands',
    founded: 1949,
    president: 'Miguel Ángel Ramírez',
    manager: 'Diego Martínez',
    stadium: {
          "name": "Estadio Gran Canaria",
          "capacity": 32400,
          "city": "Las Palmas",
          "inaugurated": 2003,
          "pitchSize": "105 x 68 m",
          "image": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80"
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/100.png',
    tagColor: 'text-secondary',
    primaryColor: '#FFE000',
    secondaryColor: '#005CA9',
    nicknames: ["Los Amarillos (The Yellows)","Pío-Pío"],
    motto: 'Seguimos con Orgullo Amarillo',
    trophies: [
          {
                "name": "LaLiga Runners-up",
                "count": 1,
                "icon": "military_tech",
                "years": "1968/69"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Amarillo Canario",
                "colorName": "Canary Yellow & Royal Blue",
                "badge": "75 AÑOS",
                "desc": "75th anniversary golden shirt with royal blue shorts.",
                "hexPrimary": "#FFE000",
                "hexSecondary": "#005CA9"
          }
    ],
    squad: [
          {
                "num": "01",
                "name": "Jasper Cillessen",
                "nat": "NED",
                "natColor": "text-secondary",
                "role": "Goalkeeper",
                "category": "gk",
                "badge": null,
                "statLabel": "Save Pct",
                "statVal": "72.4%",
                "val": "€2.5M",
                "img": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
          },
          {
                "num": "10",
                "name": "Alberto Moleiro",
                "nat": "ESP",
                "natColor": "text-secondary",
                "role": "Attacking Mid",
                "category": "mid",
                "badge": "TALENT",
                "statLabel": "Take-ons",
                "statVal": "3.8/90",
                "val": "€20.0M",
                "img": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
          }
    ],
  },
  LEG: {
    id: 'LEG',
    code: 'LEG',
    name: 'CD Leganés',
    fullName: 'Club Deportivo Leganés, S.A.D.',
    city: 'Leganés, Community of Madrid',
    founded: 1928,
    president: 'Jeff Luhnow',
    manager: 'Borja Jiménez',
    stadium: {
          "name": "Estadio Municipal Butarque",
          "capacity": 12454,
          "city": "Leganés",
          "inaugurated": 1998,
          "pitchSize": "105 x 70 m",
          "image": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80"
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/2884.png',
    tagColor: 'text-primary',
    primaryColor: '#005CA9',
    secondaryColor: '#FFFFFF',
    nicknames: ["Lega","Los Pepineros (The Cucumber Growers)"],
    motto: 'El corazón nunca desciende',
    trophies: [
          {
                "name": "Segunda División Champions",
                "count": 1,
                "icon": "military_tech",
                "years": "2023/24"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Pepinero",
                "colorName": "Blue and White Stripes",
                "badge": "BUTARQUE",
                "desc": "Classic blue and white stripes with gold crest accents.",
                "hexPrimary": "#005CA9",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
          {
                "num": "01",
                "name": "Juan Soriano",
                "nat": "ESP",
                "natColor": "text-secondary",
                "role": "Goalkeeper",
                "category": "gk",
                "badge": null,
                "statLabel": "Save Pct",
                "statVal": "76.1%",
                "val": "€2.0M",
                "img": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
          },
          {
                "num": "09",
                "name": "Miguel de la Fuente",
                "nat": "ESP",
                "natColor": "text-secondary",
                "role": "Striker",
                "category": "fwd",
                "badge": null,
                "statLabel": "Goals",
                "statVal": "13 Goals",
                "val": "€4.0M",
                "img": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
          }
    ],
  },
  VLL: {
    id: 'VLL',
    code: 'VLL',
    name: 'Real Valladolid',
    fullName: 'Real Valladolid Club de Fútbol, S.A.D.',
    city: 'Valladolid, Castile and León',
    founded: 1928,
    president: 'Ronaldo Nazário',
    manager: 'Paulo Pezzolano',
    stadium: {
          "name": "Estadio José Zorrilla",
          "capacity": 27618,
          "city": "Valladolid",
          "inaugurated": 1982,
          "pitchSize": "105 x 68 m",
          "image": "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80"
    },
    tier: 'domestic',
    crestUrl: 'https://a.espncdn.com/i/teamlogos/soccer/500/103.png',
    tagColor: 'text-secondary',
    primaryColor: '#6B21A8',
    secondaryColor: '#FFFFFF',
    nicknames: ["Pucela","Blanquivioletas (White and Violets)"],
    motto: 'Aúpa Pucela',
    trophies: [
          {
                "name": "Copa de la Liga",
                "count": 1,
                "icon": "emoji_events",
                "years": "1984"
          }
    ],
    kits: [
          {
                "season": "2024/25",
                "type": "Home Blanquivioleta",
                "colorName": "Castilian Violet & White",
                "badge": "PUCELA",
                "desc": "Deep royal violet and white stripes.",
                "hexPrimary": "#6B21A8",
                "hexSecondary": "#FFFFFF"
          }
    ],
    squad: [
          {
                "num": "01",
                "name": "Karl Hein",
                "nat": "EST",
                "natColor": "text-secondary",
                "role": "Goalkeeper",
                "category": "gk",
                "badge": null,
                "statLabel": "Saves Made",
                "statVal": "38 Saves in 9 matches",
                "val": "€3.0M",
                "img": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80"
          },
          {
                "num": "10",
                "name": "Raúl Moro",
                "nat": "ESP",
                "natColor": "text-secondary",
                "role": "Winger",
                "category": "fwd",
                "badge": null,
                "statLabel": "Take-on Success",
                "statVal": "64.2%",
                "val": "€5.0M",
                "img": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
          }
    ],
  },
};

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
