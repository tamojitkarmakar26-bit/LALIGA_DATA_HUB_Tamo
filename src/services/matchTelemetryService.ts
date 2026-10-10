export interface LiveMatchEvent {
  minute: number;
  team: string;
  player: string;
  type: 'Goal' | 'Card' | 'Substitution';
  detail: string;
  assist?: string;
}

export interface LiveMatchStats {
  possession: { home: number; away: number };
  xg: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  totalShots: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  passAccuracy: { home: number; away: number };
  totalPasses: { home: number; away: number };
  completedPasses: { home: number; away: number };
  offsides: { home: number; away: number };
  saves: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}

export interface TeamLineup {
  teamName: string;
  formation: string;
  coach: string;
  startingXI: { number: number; name: string; position: string }[];
  substitutes: { number: number; name: string; position: string }[];
}

export interface MatchTelemetry {
  matchId: string;
  matchday: number;
  date: string;
  timeIST: string;
  isTomorrowOpener?: boolean;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'LIVE' | '1H' | 'HT' | '2H' | 'FT' | 'Scheduled' | 'Pre-Match';
  simulatedScenario?: {
    homeScore: number;
    awayScore: number;
    status: 'LIVE' | '2H';
    elapsed: number;
    events: LiveMatchEvent[];
  };
  elapsed: number;
  venue: string;
  city: string;
  referee: string;
  events: LiveMatchEvent[];
  stats: LiveMatchStats;
  lineups: {
    home: TeamLineup;
    away: TeamLineup;
  };
}

/**
 * Pre-configured rich telemetry for all Gameweek 8 fixtures.
 * Highlighting Tomorrow at 12:30 AM match (Malaga vs Espanyol).
 */
export const GW8_TELEMETRY_MAP: Record<string, MatchTelemetry> = {
  'Malaga-Espanyol': {
    matchId: 'gw8-malaga-espanyol',
    matchday: 8,
    date: '2026-10-10',
    timeIST: '12:30 AM IST (Tomorrow)',
    isTomorrowOpener: true,
    homeTeam: 'Malaga',
    awayTeam: 'Espanyol',
    homeScore: 1,
    awayScore: 0,
    status: 'LIVE',
    elapsed: 68,
    venue: 'Estadio La Rosaleda',
    city: 'Málaga',
    referee: 'Alejandro Hernández Hernández',
    events: [
      { minute: 24, team: 'Malaga', player: 'Kevin Medina', type: 'Goal', detail: 'Right-footed shot from inside box into top right corner', assist: 'Dioni' },
      { minute: 38, team: 'Espanyol', player: 'Pol Lozano', type: 'Card', detail: 'Yellow Card (Tactical foul on counter-attack)' },
      { minute: 54, team: 'Espanyol', player: 'Javi Puado', type: 'Substitution', detail: 'Substituted in for Irvin Cardona' },
      { minute: 61, team: 'Malaga', player: 'Nelson Monte', type: 'Card', detail: 'Yellow Card (Late challenge)' },
      { minute: 65, team: 'Malaga', player: 'Antoñito Cordero', type: 'Substitution', detail: 'Substituted in for Julen Lobete' },
    ],
    simulatedScenario: {
      homeScore: 1,
      awayScore: 0,
      status: '2H',
      elapsed: 68,
      events: [
      { minute: 24, team: 'Malaga', player: 'Kevin Medina', type: 'Goal', detail: 'Right-footed shot from inside box into top right corner', assist: 'Dioni' },
      { minute: 38, team: 'Espanyol', player: 'Pol Lozano', type: 'Card', detail: 'Yellow Card (Tactical foul on counter-attack)' },
      { minute: 54, team: 'Espanyol', player: 'Javi Puado', type: 'Substitution', detail: 'Substituted in for Irvin Cardona' },
      { minute: 61, team: 'Malaga', player: 'Nelson Monte', type: 'Card', detail: 'Yellow Card (Late challenge)' },
      { minute: 65, team: 'Malaga', player: 'Antoñito Cordero', type: 'Substitution', detail: 'Substituted in for Julen Lobete' },
    ],
    },
    stats: {
      possession: { home: 53, away: 47 },
      xg: { home: 1.38, away: 0.92 },
      shotsOnTarget: { home: 5, away: 3 },
      totalShots: { home: 12, away: 8 },
      corners: { home: 6, away: 4 },
      fouls: { home: 10, away: 12 },
      passAccuracy: { home: 85, away: 82 },
      totalPasses: { home: 412, away: 368 },
      completedPasses: { home: 350, away: 302 },
      offsides: { home: 2, away: 1 },
      saves: { home: 3, away: 4 },
      yellowCards: { home: 1, away: 1 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Malaga CF',
        formation: '4-2-3-1',
        coach: 'Juan Francisco Funes',
        startingXI: [
          { number: 1, name: 'Alfonso Herrero', position: 'GK' },
          { number: 2, name: 'Jokin Gabilondo', position: 'RB' },
          { number: 5, name: 'Einar Galilea', position: 'CB' },
          { number: 14, name: 'Nelson Monte', position: 'CB' },
          { number: 3, name: 'Víctor García', position: 'LB' },
          { number: 6, name: 'Luismi', position: 'CDM' },
          { number: 8, name: 'Manu Molina', position: 'CDM' },
          { number: 7, name: 'David Larrubia', position: 'RM' },
          { number: 10, name: 'Luca Sangalli', position: 'CAM' },
          { number: 11, name: 'Kevin Medina', position: 'LM' },
          { number: 22, name: 'Dioni', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Carlos López', position: 'GK' },
          { number: 19, name: 'Antoñito Cordero', position: 'FW' },
          { number: 20, name: 'Julen Lobete', position: 'FW' },
          { number: 21, name: 'Ramón Enríquez', position: 'MF' },
          { number: 17, name: 'Sergio Castel', position: 'FW' },
        ],
      },
      away: {
        teamName: 'RCD Espanyol',
        formation: '4-4-2',
        coach: 'Manolo González',
        startingXI: [
          { number: 13, name: 'Joan García', position: 'GK' },
          { number: 2, name: 'Omar El Hilali', position: 'RB' },
          { number: 5, name: 'Marash Kumbulla', position: 'CB' },
          { number: 4, name: 'Leandro Cabrera', position: 'CB' },
          { number: 3, name: 'Carlos Romero', position: 'LB' },
          { number: 11, name: 'Jofre Carreras', position: 'RM' },
          { number: 8, name: 'Pol Lozano', position: 'CM' },
          { number: 20, name: 'Alex Král', position: 'CM' },
          { number: 18, name: 'Álvaro Aguado', position: 'LM' },
          { number: 9, name: 'Irvin Cardona', position: 'ST' },
          { number: 19, name: 'Alejo Véliz', position: 'ST' },
        ],
        substitutes: [
          { number: 1, name: 'Fernando Pacheco', position: 'GK' },
          { number: 7, name: 'Javi Puado', position: 'FW' },
          { number: 10, name: 'Pere Milla', position: 'FW' },
          { number: 6, name: 'José Gragera', position: 'MF' },
          { number: 14, name: 'Brian Oliván', position: 'DF' },
        ],
      },
    },
  },

  'Rayo Vallecano-Athletic Club': {
    matchId: 'gw8-rayo-athletic',
    matchday: 8,
    date: '2026-10-10',
    timeIST: '5:30 PM IST',
    homeTeam: 'Rayo Vallecano',
    awayTeam: 'Athletic Club',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Campo de Fútbol de Vallecas',
    city: 'Madrid',
    referee: 'Juan Martínez Munuera',
    events: [
      { minute: 31, team: 'Athletic Club', player: 'Nico Williams', type: 'Goal', detail: 'Curled effort into far corner', assist: 'Iñaki Williams' },
      { minute: 49, team: 'Rayo Vallecano', player: 'Sergio Camello', type: 'Goal', detail: 'Header from corner kick', assist: 'Isi Palazón' },
      { minute: 73, team: 'Athletic Club', player: 'Oihan Sancet', type: 'Goal', detail: 'Volley from edge of the box', assist: 'Álex Berenguer' },
    ],
    stats: {
      possession: { home: 44, away: 56 },
      xg: { home: 1.15, away: 1.78 },
      shotsOnTarget: { home: 4, away: 6 },
      totalShots: { home: 9, away: 14 },
      corners: { home: 5, away: 7 },
      fouls: { home: 14, away: 10 },
      passAccuracy: { home: 79, away: 86 },
      totalPasses: { home: 350, away: 462 },
      completedPasses: { home: 276, away: 397 },
      offsides: { home: 3, away: 2 },
      saves: { home: 4, away: 3 },
      yellowCards: { home: 2, away: 1 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Rayo Vallecano',
        formation: '4-2-3-1',
        coach: 'Iñigo Pérez',
        startingXI: [
          { number: 1, name: 'Augusto Batalla', position: 'GK' },
          { number: 2, name: 'Andrei Rațiu', position: 'RB' },
          { number: 16, name: 'Abdul Mumin', position: 'CB' },
          { number: 24, name: 'Florian Lejeune', position: 'CB' },
          { number: 3, name: 'Pep Chavarría', position: 'LB' },
          { number: 23, name: 'Óscar Valentín', position: 'CDM' },
          { number: 6, name: 'Pathé Ciss', position: 'CDM' },
          { number: 19, name: 'Jorge de Frutos', position: 'RM' },
          { number: 7, name: 'Isi Palazón', position: 'CAM' },
          { number: 18, name: 'Álvaro García', position: 'LM' },
          { number: 14, name: 'Sergio Camello', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Dani Cárdenas', position: 'GK' },
          { number: 8, name: 'Óscar Trejo', position: 'MF' },
          { number: 9, name: 'Raúl de Tomás', position: 'FW' },
          { number: 11, name: 'Randy Nteka', position: 'FW' },
        ],
      },
      away: {
        teamName: 'Athletic Club',
        formation: '4-2-3-1',
        coach: 'Edin Terzić',
        startingXI: [
          { number: 1, name: 'Unai Simón', position: 'GK' },
          { number: 12, name: 'Jesus Areso', position: 'RB' },
          { number: 3, name: 'Dani Vivian', position: 'CB' },
          { number: 14, name: 'Aymeric Laporte', position: 'CB' },
          { number: 17, name: 'Yuri Berchiche', position: 'LB' },
          { number: 6, name: 'Beñat Prados', position: 'CDM' },
          { number: 18, name: 'Mikel Jauregizar', position: 'CDM' },
          { number: 9, name: 'Iñaki Williams', position: 'RM' },
          { number: 8, name: 'Oihan Sancet', position: 'CAM' },
          { number: 10, name: 'Nico Williams', position: 'LM' },
          { number: 11, name: 'Gorka Guruzeta', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Julen Agirrezabala', position: 'GK' },
          { number: 7, name: 'Álex Berenguer', position: 'FW' },
          { number: 23, name: 'Álvaro Djaló', position: 'FW' },
          { number: 16, name: 'Iñigo Ruiz de Galarreta', position: 'MF' },
        ],
      },
    },
  },

  'Alaves-Atletico Madrid': {
    matchId: 'gw8-alaves-atletico',
    matchday: 8,
    date: '2026-10-10',
    timeIST: '7:45 PM IST',
    homeTeam: 'Alaves',
    awayTeam: 'Atletico Madrid',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Estadio Mendizorrotza',
    city: 'Vitoria-Gasteiz',
    referee: 'José María Sánchez Martínez',
    events: [
      { minute: 18, team: 'Atletico Madrid', player: 'Julián Álvarez', type: 'Goal', detail: 'Clinical low finish to bottom left corner', assist: 'Alex Baena' },
      { minute: 42, team: 'Alaves', player: 'Abdel Abqar', type: 'Card', detail: 'Yellow Card' },
      { minute: 67, team: 'Atletico Madrid', player: 'Alexander Sørloth', type: 'Goal', detail: 'Powerful towering header', assist: 'Antoine Griezmann' },
    ],
    stats: {
      possession: { home: 41, away: 59 },
      xg: { home: 0.74, away: 2.12 },
      shotsOnTarget: { home: 2, away: 7 },
      totalShots: { home: 7, away: 16 },
      corners: { home: 3, away: 8 },
      fouls: { home: 13, away: 11 },
      passAccuracy: { home: 78, away: 88 },
      totalPasses: { home: 340, away: 512 },
      completedPasses: { home: 265, away: 451 },
      offsides: { home: 1, away: 2 },
      saves: { home: 5, away: 2 },
      yellowCards: { home: 2, away: 1 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Deportivo Alavés',
        formation: '4-4-2',
        coach: 'Quique Sánchez Flores',
        startingXI: [
          { number: 1, name: 'Antonio Sivera', position: 'GK' },
          { number: 2, name: 'Nahuel Tenaglia', position: 'RB' },
          { number: 5, name: 'Abdel Abqar', position: 'CB' },
          { number: 4, name: 'Aleksandar Sedlar', position: 'CB' },
          { number: 3, name: 'Manu Sánchez', position: 'LB' },
          { number: 10, name: 'Tomás Conechny', position: 'RM' },
          { number: 8, name: 'Antonio Blanco', position: 'CM' },
          { number: 6, name: 'Ander Guevara', position: 'CM' },
          { number: 18, name: 'Jon Guridi', position: 'LM' },
          { number: 20, name: 'Carlos Martín', position: 'ST' },
          { number: 17, name: 'Kike García', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Jesús Owono', position: 'GK' },
          { number: 9, name: 'Asier Villalibre', position: 'FW' },
          { number: 21, name: 'Toni Martínez', position: 'FW' },
        ],
      },
      away: {
        teamName: 'Atlético de Madrid',
        formation: '3-4-2-1',
        coach: 'Diego Simeone',
        startingXI: [
          { number: 13, name: 'Jan Oblak', position: 'GK' },
          { number: 21, name: 'Cristian Romero', position: 'CB' },
          { number: 17, name: 'Dávid Hancko', position: 'CB' },
          { number: 3, name: 'Robin Le Normand', position: 'CB' },
          { number: 14, name: 'Marcos Llorente', position: 'RWB' },
          { number: 6, name: 'Koke', position: 'CM' },
          { number: 5, name: 'Johnny Cardoso', position: 'CM' },
          { number: 22, name: 'Alejandro Grimaldo', position: 'LWB' },
          { number: 10, name: 'Alex Baena', position: 'CAM' },
          { number: 7, name: 'Antoine Griezmann', position: 'CAM' },
          { number: 19, name: 'Julián Álvarez', position: 'ST' },
        ],
        substitutes: [
          { number: 1, name: 'Juan Musso', position: 'GK' },
          { number: 9, name: 'Alexander Sørloth', position: 'FW' },
          { number: 11, name: 'Ademola Lookman', position: 'FW' },
        ],
      },
    },
  },

  'Barcelona-Getafe': {
    matchId: 'gw8-barcelona-getafe',
    matchday: 8,
    date: '2026-10-10',
    timeIST: '10:00 PM IST',
    homeTeam: 'Barcelona',
    awayTeam: 'Getafe',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Spotify Camp Nou',
    city: 'Barcelona',
    referee: 'César Soto Grado',
    events: [],
    simulatedScenario: {
      homeScore: 3,
      awayScore: 0,
      status: '2H',
      elapsed: 75,
      events: [
      { minute: 14, team: 'Barcelona', player: 'Lamine Yamal', type: 'Goal', detail: 'Curled masterpiece from outside box', assist: 'Pedri' },
      { minute: 36, team: 'Barcelona', player: 'Robert Lewandowski', type: 'Goal', detail: 'Poacher tap-in after cross', assist: 'Raphinha' },
      { minute: 71, team: 'Barcelona', player: 'Dani Olmo', type: 'Goal', detail: 'Slot past keeper from 12 yards', assist: 'Lamine Yamal' },
    ],
    },
    stats: {
      possession: { home: 69, away: 31 },
      xg: { home: 2.85, away: 0.42 },
      shotsOnTarget: { home: 9, away: 2 },
      totalShots: { home: 19, away: 5 },
      corners: { home: 10, away: 2 },
      fouls: { home: 8, away: 17 },
      passAccuracy: { home: 92, away: 74 },
      totalPasses: { home: 685, away: 288 },
      completedPasses: { home: 630, away: 213 },
      offsides: { home: 2, away: 1 },
      saves: { home: 2, away: 6 },
      yellowCards: { home: 1, away: 3 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'FC Barcelona',
        formation: '4-3-3',
        coach: 'Hansi Flick',
        startingXI: [
          { number: 1, name: 'Marc-André ter Stegen', position: 'GK' },
          { number: 23, name: 'Jules Koundé', position: 'RB' },
          { number: 2, name: 'Pau Cubarsí', position: 'CB' },
          { number: 5, name: 'Iñigo Martínez', position: 'CB' },
          { number: 3, name: 'Alejandro Balde', position: 'LB' },
          { number: 17, name: 'Marc Casadó', position: 'CDM' },
          { number: 8, name: 'Pedri', position: 'CM' },
          { number: 20, name: 'Dani Olmo', position: 'CM' },
          { number: 19, name: 'Lamine Yamal', position: 'RW' },
          { number: 9, name: 'Robert Lewandowski', position: 'ST' },
          { number: 11, name: 'Raphinha', position: 'LW' },
        ],
        substitutes: [
          { number: 13, name: 'Iñaki Peña', position: 'GK' },
          { number: 21, name: 'Frenkie de Jong', position: 'MF' },
          { number: 6, name: 'Gavi', position: 'MF' },
          { number: 7, name: 'Ferran Torres', position: 'FW' },
        ],
      },
      away: {
        teamName: 'Getafe CF',
        formation: '5-3-2',
        coach: 'José Bordalás',
        startingXI: [
          { number: 13, name: 'David Soria', position: 'GK' },
          { number: 2, name: 'Djené Dakonam', position: 'RWB' },
          { number: 15, name: 'Omar Alderete', position: 'CB' },
          { number: 22, name: 'Domingos Duarte', position: 'CB' },
          { number: 16, name: 'Diego Rico', position: 'CB' },
          { number: 21, name: 'Juan Iglesias', position: 'LWB' },
          { number: 8, name: 'Mauro Arambarri', position: 'CM' },
          { number: 5, name: 'Luis Milla', position: 'CM' },
          { number: 11, name: 'Carles Aleñá', position: 'CM' },
          { number: 9, name: 'Borja Mayoral', position: 'ST' },
          { number: 18, name: 'Bertuğ Yıldırım', position: 'ST' },
        ],
        substitutes: [
          { number: 1, name: 'Jiří Letáček', position: 'GK' },
          { number: 12, name: 'Allan Nyom', position: 'DF' },
          { number: 17, name: 'Carles Pérez', position: 'FW' },
        ],
      },
    },
  },

  'Real Madrid-Villarreal': {
    matchId: 'gw8-real-madrid-villarreal',
    matchday: 8,
    date: '2026-10-11',
    timeIST: '12:30 AM IST (11 Oct)',
    homeTeam: 'Real Madrid',
    awayTeam: 'Villarreal',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Santiago Bernabéu Stadium',
    city: 'Madrid',
    referee: 'Jesús Gil Manzano',
    events: [],
    simulatedScenario: {
      homeScore: 3,
      awayScore: 1,
      status: '2H',
      elapsed: 85,
      events: [
      { minute: 22, team: 'Real Madrid', player: 'Kylian Mbappé', type: 'Goal', detail: 'Rapid sprint and near-post finish', assist: 'Vinícius Júnior' },
      { minute: 51, team: 'Villarreal', player: 'Ayoze Pérez', type: 'Goal', detail: 'First-time shot into the corner', assist: 'Dani Parejo' },
      { minute: 64, team: 'Real Madrid', player: 'Vinícius Júnior', type: 'Goal', detail: 'Sensational solo run from left flank', assist: 'Jude Bellingham' },
      { minute: 88, team: 'Real Madrid', player: 'Kylian Mbappé', type: 'Goal', detail: 'Penalty kick converted down the middle', assist: 'Endrick (Won Penalty)' },
    ],
    },
    stats: {
      possession: { home: 58, away: 42 },
      xg: { home: 2.65, away: 1.25 },
      shotsOnTarget: { home: 8, away: 4 },
      totalShots: { home: 18, away: 11 },
      corners: { home: 8, away: 5 },
      fouls: { home: 10, away: 13 },
      passAccuracy: { home: 90, away: 84 },
      totalPasses: { home: 560, away: 412 },
      completedPasses: { home: 504, away: 346 },
      offsides: { home: 3, away: 1 },
      saves: { home: 3, away: 5 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Real Madrid',
        formation: '4-3-3',
        coach: 'Carlo Ancelotti',
        startingXI: [
          { number: 1, name: 'Thibaut Courtois', position: 'GK' },
          { number: 17, name: 'Lucas Vázquez', position: 'RB' },
          { number: 3, name: 'Éder Militão', position: 'CB' },
          { number: 22, name: 'Antonio Rüdiger', position: 'CB' },
          { number: 23, name: 'Ferland Mendy', position: 'LB' },
          { number: 14, name: 'Aurélien Tchouaméni', position: 'CDM' },
          { number: 8, name: 'Federico Valverde', position: 'CM' },
          { number: 5, name: 'Jude Bellingham', position: 'CAM' },
          { number: 11, name: 'Rodrygo', position: 'RW' },
          { number: 9, name: 'Kylian Mbappé', position: 'ST' },
          { number: 7, name: 'Vinícius Júnior', position: 'LW' },
        ],
        substitutes: [
          { number: 13, name: 'Andriy Lunin', position: 'GK' },
          { number: 10, name: 'Luka Modrić', position: 'MF' },
          { number: 6, name: 'Eduardo Camavinga', position: 'MF' },
          { number: 16, name: 'Endrick', position: 'FW' },
        ],
      },
      away: {
        teamName: 'Villarreal CF',
        formation: '4-4-2',
        coach: 'Marcelino García Toral',
        startingXI: [
          { number: 13, name: 'Diego Conde', position: 'GK' },
          { number: 2, name: 'Logan Costa', position: 'RB' },
          { number: 4, name: 'Eric Bailly', position: 'CB' },
          { number: 3, name: 'Raúl Albiol', position: 'CB' },
          { number: 24, name: 'Alfonso Pedraza', position: 'LB' },
          { number: 19, name: 'Nicolas Pépé', position: 'RM' },
          { number: 10, name: 'Dani Parejo', position: 'CM' },
          { number: 14, name: 'Santi Comesaña', position: 'CM' },
          { number: 16, name: 'Alex Baena', position: 'LM' },
          { number: 22, name: 'Ayoze Pérez', position: 'ST' },
          { number: 7, name: 'Gerard Moreno', position: 'ST' },
        ],
        substitutes: [
          { number: 1, name: 'Luiz Júnior', position: 'GK' },
          { number: 15, name: 'Thierno Barry', position: 'FW' },
          { number: 6, name: 'Denis Suárez', position: 'MF' },
        ],
      },
    },
  },
  'Elche-Celta Vigo': {
    matchId: 'gw8-elche-celta',
    matchday: 8,
    date: '2026-10-11',
    timeIST: '5:30 PM IST',
    homeTeam: 'Elche',
    awayTeam: 'Celta Vigo',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Estadio Manuel Martínez Valero',
    city: 'Elche',
    referee: 'Mario Melero López',
    events: [],
    simulatedScenario: {
      homeScore: 1,
      awayScore: 1,
      status: '2H',
      elapsed: 74,
      events: [
      { minute: 31, team: 'Elche', player: 'Mourad El Ghezouani', type: 'Goal', detail: 'Header from close range following a corner', assist: 'Nico Castro' },
      { minute: 58, team: 'Celta Vigo', player: 'Iago Aspas', type: 'Goal', detail: 'Left-footed clinical finish into bottom corner', assist: 'Fran Beltrán' },
      { minute: 74, team: 'Elche', player: 'Mario Gaspar', type: 'Card', detail: 'Yellow Card for reckless tackle' },
    ],
    },
    stats: {
      possession: { home: 47, away: 53 },
      xg: { home: 1.15, away: 1.38 },
      shotsOnTarget: { home: 3, away: 5 },
      totalShots: { home: 9, away: 13 },
      corners: { home: 4, away: 6 },
      fouls: { home: 14, away: 10 },
      passAccuracy: { home: 80, away: 85 },
      totalPasses: { home: 410, away: 478 },
      completedPasses: { home: 328, away: 406 },
      offsides: { home: 1, away: 3 },
      saves: { home: 4, away: 2 },
      yellowCards: { home: 2, away: 1 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Elche',
        formation: '4-3-3',
        coach: 'Eder Sarabia',
        startingXI: [
          { number: 13, name: 'Matías Dituro', position: 'GK' },
          { number: 2, name: 'Mario Gaspar', position: 'RB' },
          { number: 6, name: 'Pedro Bigas', position: 'CB' },
          { number: 5, name: 'David Affengruber', position: 'CB' },
          { number: 17, name: 'Josan', position: 'LB' },
          { number: 8, name: 'Aleix Febas', position: 'CM' },
          { number: 21, name: 'Nico Castro', position: 'CM' },
          { number: 14, name: 'Febas', position: 'CM' },
          { number: 11, name: 'Germán Valera', position: 'RW' },
          { number: 9, name: 'Mourad El Ghezouani', position: 'ST' },
          { number: 7, name: 'Yago Santiago', position: 'LW' },
        ],
        substitutes: [
          { number: 1, name: 'Miguel San Román', position: 'GK' },
          { number: 19, name: 'Sory Kaba', position: 'FW' },
          { number: 10, name: 'Rafa Núñez', position: 'MF' },
        ],
      },
      away: {
        teamName: 'Celta Vigo',
        formation: '3-4-3',
        coach: 'Claudio Giráldez',
        startingXI: [
          { number: 13, name: 'Vicente Guaita', position: 'GK' },
          { number: 2, name: 'Carl Starfelt', position: 'CB' },
          { number: 20, name: 'Marcos Alonso', position: 'CB' },
          { number: 3, name: 'Óscar Mingueza', position: 'CB' },
          { number: 8, name: 'Fran Beltrán', position: 'CM' },
          { number: 6, name: 'Ilaix Moriba', position: 'CM' },
          { number: 17, name: 'Jonathan Bamba', position: 'RM' },
          { number: 21, name: 'Mihailo Ristić', position: 'LM' },
          { number: 10, name: 'Iago Aspas', position: 'RW' },
          { number: 7, name: 'Borja Iglesias', position: 'ST' },
          { number: 11, name: 'Franco Cervi', position: 'LW' },
        ],
        substitutes: [
          { number: 1, name: 'Iván Villar', position: 'GK' },
          { number: 9, name: 'Anastasios Douvikas', position: 'FW' },
          { number: 14, name: 'Luca de la Torre', position: 'MF' },
        ],
      },
    },
  },
  'Real Sociedad-Deportivo La Coruna': {
    matchId: 'gw8-realsociedad-deportivo',
    matchday: 8,
    date: '2026-10-11',
    timeIST: '7:45 PM IST',
    homeTeam: 'Real Sociedad',
    awayTeam: 'Deportivo La Coruna',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Reale Arena',
    city: 'San Sebastián',
    referee: 'Ricardo De Burgos Bengoetxea',
    events: [],
    simulatedScenario: {
      homeScore: 2,
      awayScore: 1,
      status: '2H',
      elapsed: 71,
      events: [
      { minute: 19, team: 'Real Sociedad', player: 'Takefusa Kubo', type: 'Goal', detail: 'Curling left-foot strike from outside the box', assist: 'Brais Méndez' },
      { minute: 43, team: 'Deportivo La Coruna', player: 'Lucas Pérez', type: 'Goal', detail: 'Direct free-kick into bottom corner', assist: '' },
      { minute: 71, team: 'Real Sociedad', player: 'Mikel Oyarzabal', type: 'Goal', detail: 'Penalty scored into the bottom right', assist: '' },
    ],
    },
    stats: {
      possession: { home: 61, away: 39 },
      xg: { home: 2.05, away: 0.88 },
      shotsOnTarget: { home: 7, away: 3 },
      totalShots: { home: 16, away: 7 },
      corners: { home: 8, away: 3 },
      fouls: { home: 9, away: 15 },
      passAccuracy: { home: 88, away: 75 },
      totalPasses: { home: 580, away: 320 },
      completedPasses: { home: 510, away: 240 },
      offsides: { home: 2, away: 1 },
      saves: { home: 2, away: 5 },
      yellowCards: { home: 1, away: 3 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Real Sociedad',
        formation: '4-3-3',
        coach: 'Imanol Alguacil',
        startingXI: [
          { number: 1, name: 'Álex Remiro', position: 'GK' },
          { number: 18, name: 'Hamari Traoré', position: 'RB' },
          { number: 5, name: 'Igor Zubeldia', position: 'CB' },
          { number: 21, name: 'Nayef Aguerd', position: 'CB' },
          { number: 3, name: 'Aihen Muñoz', position: 'LB' },
          { number: 4, name: 'Martín Zubimendi', position: 'DM' },
          { number: 23, name: 'Brais Méndez', position: 'CM' },
          { number: 24, name: 'Luka Sučić', position: 'CM' },
          { number: 14, name: 'Takefusa Kubo', position: 'RW' },
          { number: 10, name: 'Mikel Oyarzabal', position: 'ST' },
          { number: 7, name: 'Ander Barrenetxea', position: 'LW' },
        ],
        substitutes: [
          { number: 13, name: 'Unai Marrero', position: 'GK' },
          { number: 9, name: 'Orri Óskarsson', position: 'FW' },
          { number: 11, name: 'Sheraldo Becker', position: 'FW' },
        ],
      },
      away: {
        teamName: 'Deportivo La Coruna',
        formation: '4-2-3-1',
        coach: 'Imanol Idiakez',
        startingXI: [
          { number: 1, name: 'Germán Parreño', position: 'GK' },
          { number: 22, name: 'Ximo Navarro', position: 'RB' },
          { number: 4, name: 'Pablo Vázquez', position: 'CB' },
          { number: 5, name: 'Dani Barcia', position: 'CB' },
          { number: 18, name: 'Sergio Escudero', position: 'LB' },
          { number: 8, name: 'Diego Villares', position: 'DM' },
          { number: 6, name: 'José Ángel', position: 'DM' },
          { number: 11, name: 'David Mella', position: 'RM' },
          { number: 10, name: 'Yeremay Hernández', position: 'AM' },
          { number: 7, name: 'Lucas Pérez', position: 'LM' },
          { number: 9, name: 'Ivan Barbero', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Eric Puerto', position: 'GK' },
          { number: 20, name: 'Bouldini', position: 'FW' },
          { number: 21, name: 'Mario Soriano', position: 'MF' },
        ],
      },
    },
  },
  'Real Betis-Osasuna': {
    matchId: 'gw8-betis-osasuna',
    matchday: 8,
    date: '2026-10-11',
    timeIST: '10:00 PM IST',
    homeTeam: 'Real Betis',
    awayTeam: 'Osasuna',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Estadio de La Cartuja',
    city: 'Sevilla',
    referee: 'Juan Martínez Munuera',
    events: [],
    simulatedScenario: {
      homeScore: 2,
      awayScore: 0,
      status: '2H',
      elapsed: 67,
      events: [
      { minute: 28, team: 'Real Betis', player: 'Giovani Lo Celso', type: 'Goal', detail: 'Slotted into the corner after 1-2 passing with Fornals', assist: 'Pablo Fornals' },
      { minute: 67, team: 'Real Betis', player: 'Vitor Roque', type: 'Goal', detail: 'Tap-in rebound off goalkeeper save', assist: 'Abde Ezzalzouli' },
    ],
    },
    stats: {
      possession: { home: 58, away: 42 },
      xg: { home: 1.82, away: 0.65 },
      shotsOnTarget: { home: 6, away: 2 },
      totalShots: { home: 14, away: 8 },
      corners: { home: 6, away: 4 },
      fouls: { home: 11, away: 12 },
      passAccuracy: { home: 86, away: 78 },
      totalPasses: { home: 512, away: 374 },
      completedPasses: { home: 440, away: 292 },
      offsides: { home: 1, away: 2 },
      saves: { home: 2, away: 4 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Real Betis',
        formation: '4-2-3-1',
        coach: 'Manuel Pellegrini',
        startingXI: [
          { number: 1, name: 'Rui Silva', position: 'GK' },
          { number: 2, name: 'Héctor Bellerín', position: 'RB' },
          { number: 3, name: 'Diego Llorente', position: 'CB' },
          { number: 5, name: 'Marc Bartra', position: 'CB' },
          { number: 12, name: 'Ricardo Rodríguez', position: 'LB' },
          { number: 21, name: 'Marc Roca', position: 'DM' },
          { number: 4, name: 'Johnny Cardoso', position: 'DM' },
          { number: 18, name: 'Pablo Fornals', position: 'RM' },
          { number: 20, name: 'Giovani Lo Celso', position: 'AM' },
          { number: 10, name: 'Abde Ezzalzouli', position: 'LM' },
          { number: 8, name: 'Vitor Roque', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Adrián', position: 'GK' },
          { number: 7, name: 'Juanmi', position: 'FW' },
          { number: 16, name: 'Sergi Altimira', position: 'MF' },
        ],
      },
      away: {
        teamName: 'Osasuna',
        formation: '4-3-3',
        coach: 'Vicente Moreno',
        startingXI: [
          { number: 1, name: 'Sergio Herrera', position: 'GK' },
          { number: 12, name: 'Jesús Areso', position: 'RB' },
          { number: 22, name: 'Enzo Boyomo', position: 'CB' },
          { number: 24, name: 'Alejandro Catena', position: 'CB' },
          { number: 23, name: 'Abel Bretones', position: 'LB' },
          { number: 6, name: 'Lucas Torró', position: 'DM' },
          { number: 7, name: 'Jon Moncayola', position: 'CM' },
          { number: 10, name: 'Aimar Oroz', position: 'CM' },
          { number: 14, name: 'Rubén García', position: 'RW' },
          { number: 17, name: 'Ante Budimir', position: 'ST' },
          { number: 19, name: 'Bryan Zaragoza', position: 'LW' },
        ],
        substitutes: [
          { number: 13, name: 'Aitor Fernández', position: 'GK' },
          { number: 9, name: 'Raúl García de Haro', position: 'FW' },
          { number: 18, name: 'Iker Muñoz', position: 'MF' },
        ],
      },
    },
  },
  'Racing Santander-Valencia': {
    matchId: 'gw8-racing-valencia',
    matchday: 8,
    date: '2026-10-12',
    timeIST: '12:30 AM IST',
    homeTeam: 'Racing Santander',
    awayTeam: 'Valencia',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'El Sardinero',
    city: 'Santander',
    referee: 'Jesús Gil Manzano',
    events: [],
    simulatedScenario: {
      homeScore: 1,
      awayScore: 2,
      status: '2H',
      elapsed: 78,
      events: [
      { minute: 15, team: 'Racing Santander', player: 'Andrés Martín', type: 'Goal', detail: 'Header into top corner from set piece cross', assist: 'Íñigo Vicente' },
      { minute: 39, team: 'Valencia', player: 'Hugo Duro', type: 'Goal', detail: 'Slid into back of net from cross', assist: 'Diego López' },
      { minute: 78, team: 'Valencia', player: 'Pepelu', type: 'Goal', detail: 'Penalty converted after hand ball', assist: '' },
    ],
    },
    stats: {
      possession: { home: 46, away: 54 },
      xg: { home: 1.05, away: 1.62 },
      shotsOnTarget: { home: 4, away: 6 },
      totalShots: { home: 10, away: 15 },
      corners: { home: 5, away: 7 },
      fouls: { home: 13, away: 11 },
      passAccuracy: { home: 79, away: 84 },
      totalPasses: { home: 395, away: 480 },
      completedPasses: { home: 312, away: 403 },
      offsides: { home: 2, away: 2 },
      saves: { home: 4, away: 3 },
      yellowCards: { home: 3, away: 2 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Racing Santander',
        formation: '4-2-3-1',
        coach: 'José Alberto López',
        startingXI: [
          { number: 13, name: 'Jokin Ezkieta', position: 'GK' },
          { number: 2, name: 'Clément Michelin', position: 'RB' },
          { number: 5, name: 'Manu Hernando', position: 'CB' },
          { number: 4, name: 'Facundo Castro', position: 'CB' },
          { number: 3, name: 'Saúl García', position: 'LB' },
          { number: 6, name: 'Íñigo Sainz-Maza', position: 'DM' },
          { number: 8, name: 'Unai Vencedor', position: 'DM' },
          { number: 11, name: 'Andrés Martín', position: 'RM' },
          { number: 10, name: 'Íñigo Vicente', position: 'AM' },
          { number: 14, name: 'Pablo Rodríguez', position: 'LM' },
          { number: 9, name: 'Juanca Arana', position: 'ST' },
        ],
        substitutes: [
          { number: 1, name: 'Miquel Parera', position: 'GK' },
          { number: 19, name: 'Karrikaburu', position: 'FW' },
          { number: 21, name: 'Aritz Aldasoro', position: 'MF' },
        ],
      },
      away: {
        teamName: 'Valencia',
        formation: '4-4-2',
        coach: 'Rubén Baraja',
        startingXI: [
          { number: 25, name: 'Giorgi Mamardashvili', position: 'GK' },
          { number: 12, name: 'Thierry Correia', position: 'RB' },
          { number: 3, name: 'Cristhian Mosquera', position: 'CB' },
          { number: 15, name: 'César Tárrega', position: 'CB' },
          { number: 21, name: 'Jesús Vázquez', position: 'LB' },
          { number: 16, name: 'Diego López', position: 'RM' },
          { number: 18, name: 'Pepelu', position: 'CM' },
          { number: 8, name: 'Javi Guerra', position: 'CM' },
          { number: 7, name: 'Sergi Canós', position: 'LM' },
          { number: 9, name: 'Hugo Duro', position: 'ST' },
          { number: 11, name: 'Rafa Mir', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Stole Dimitrievski', position: 'GK' },
          { number: 22, name: 'Dani Gómez', position: 'FW' },
          { number: 10, name: 'André Almeida', position: 'MF' },
        ],
      },
    },
  },
  'Levante-Sevilla': {
    matchId: 'gw8-levante-sevilla',
    matchday: 8,
    date: '2026-10-13',
    timeIST: '12:30 AM IST',
    homeTeam: 'Levante',
    awayTeam: 'Sevilla',
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: 'Estadio Ciudad de Valencia',
    city: 'Valencia',
    referee: 'César Soto Grado',
    events: [],
    simulatedScenario: {
      homeScore: 1,
      awayScore: 2,
      status: '2H',
      elapsed: 81,
      events: [
      { minute: 22, team: 'Sevilla', player: 'Isaac Romero', type: 'Goal', detail: 'Chipped goalkeeper from acute angle', assist: 'Chidera Ejuke' },
      { minute: 53, team: 'Levante', player: 'José Luis Morales', type: 'Goal', detail: 'Low drive inside left post', assist: 'Carlos Álvarez' },
      { minute: 81, team: 'Sevilla', player: 'Dodi Lukebakio', type: 'Goal', detail: 'Cut inside and curled into far corner', assist: 'Djibril Sow' },
    ],
    },
    stats: {
      possession: { home: 45, away: 55 },
      xg: { home: 1.10, away: 1.75 },
      shotsOnTarget: { home: 3, away: 7 },
      totalShots: { home: 8, away: 16 },
      corners: { home: 4, away: 8 },
      fouls: { home: 15, away: 12 },
      passAccuracy: { home: 78, away: 86 },
      totalPasses: { home: 380, away: 510 },
      completedPasses: { home: 296, away: 438 },
      offsides: { home: 1, away: 3 },
      saves: { home: 5, away: 2 },
      yellowCards: { home: 3, away: 1 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: 'Levante',
        formation: '4-2-3-1',
        coach: 'Julián Calero',
        startingXI: [
          { number: 1, name: 'Andrés Fernández', position: 'GK' },
          { number: 2, name: 'Andrés García', position: 'RB' },
          { number: 4, name: 'Unai Elgezabal', position: 'CB' },
          { number: 5, name: 'Jorge Cabello', position: 'CB' },
          { number: 3, name: 'Marcos Navarro', position: 'LB' },
          { number: 6, name: 'Oriol Rey', position: 'DM' },
          { number: 8, name: 'Ángel Algobia', position: 'DM' },
          { number: 24, name: 'Carlos Álvarez', position: 'RM' },
          { number: 10, name: 'Pablo Martínez', position: 'AM' },
          { number: 11, name: 'José Luis Morales', position: 'LM' },
          { number: 9, name: 'Iván Romero', position: 'ST' },
        ],
        substitutes: [
          { number: 13, name: 'Alfonso Pastor', position: 'GK' },
          { number: 17, name: 'Carlos Espí', position: 'FW' },
          { number: 14, name: 'Fabricio', position: 'FW' },
        ],
      },
      away: {
        teamName: 'Sevilla',
        formation: '4-3-3',
        coach: 'Francisco Javier García Pimienta',
        startingXI: [
          { number: 13, name: 'Ørjan Nyland', position: 'GK' },
          { number: 32, name: 'José Ángel Carmona', position: 'RB' },
          { number: 22, name: 'Loïc Badé', position: 'CB' },
          { number: 6, name: 'Nemanja Gudelj', position: 'CB' },
          { number: 3, name: 'Adrià Pedrosa', position: 'LB' },
          { number: 20, name: 'Djibril Sow', position: 'CM' },
          { number: 18, name: 'Lucien Agoumé', position: 'CM' },
          { number: 17, name: 'Saúl Ñíguez', position: 'CM' },
          { number: 11, name: 'Dodi Lukebakio', position: 'RW' },
          { number: 7, name: 'Isaac Romero', position: 'ST' },
          { number: 21, name: 'Chidera Ejuke', position: 'LW' },
        ],
        substitutes: [
          { number: 1, name: 'Álvaro Fernández', position: 'GK' },
          { number: 14, name: 'Peque Fernández', position: 'FW' },
          { number: 24, name: 'Tanguy Nianzou', position: 'DF' },
        ],
      },
    },
  },
};

/**
 * Returns dynamic live telemetry for any fixture in LaLiga 2026-27.
 */
export function getFixtureTelemetry(homeTeam: string, awayTeam: string, matchday: number = 8): MatchTelemetry {
  const directKey = `${homeTeam}-${awayTeam}`;
  if (GW8_TELEMETRY_MAP[directKey]) {
    return GW8_TELEMETRY_MAP[directKey];
  }

  // Alias lookup for accents / abbreviations
  const cleanHome = homeTeam.replace(/^(FC|RCD|CF)\s+/i, '').trim();
  const cleanAway = awayTeam.replace(/^(FC|RCD|CF)\s+/i, '').trim();
  const mappedKey = Object.keys(GW8_TELEMETRY_MAP).find(
    (k) => k.toLowerCase().includes(cleanHome.toLowerCase()) && k.toLowerCase().includes(cleanAway.toLowerCase())
  );
  if (mappedKey && GW8_TELEMETRY_MAP[mappedKey]) {
    return GW8_TELEMETRY_MAP[mappedKey];
  }

  // Fallback procedural telemetry generator for remaining fixtures
  const homeScore = Math.max(0, Math.floor(Math.sin(homeTeam.length) * 2 + 1));
  const awayScore = Math.max(0, Math.floor(Math.cos(awayTeam.length) * 2 + 1));

  return {
    matchId: `gw${matchday}-${homeTeam.toLowerCase().replace(/\s+/g, '')}-${awayTeam.toLowerCase().replace(/\s+/g, '')}`,
    matchday,
    date: '2026-10-11',
    timeIST: '7:45 PM IST',
    homeTeam,
    awayTeam,
    homeScore: null,
    awayScore: null,
    status: 'Scheduled',
    elapsed: 0,
    venue: `Estadio de ${homeTeam}`,
    city: 'Spain',
    referee: 'Guillermo Cuadra Fernández',
    events: [],
    simulatedScenario: {
      homeScore,
      awayScore,
      status: '2H',
      elapsed: 65,
      events: [
        { minute: 34, team: homeTeam, player: `${homeTeam} Striker`, type: 'Goal', detail: 'Shot inside the 6-yard box' },
        { minute: 62, team: awayTeam, player: `${awayTeam} Attacker`, type: 'Goal', detail: 'Counter-attack strike' },
      ],
    },
    stats: {
      possession: { home: 51, away: 49 },
      xg: { home: 1.35, away: 1.15 },
      shotsOnTarget: { home: 4, away: 4 },
      totalShots: { home: 11, away: 9 },
      corners: { home: 5, away: 4 },
      fouls: { home: 11, away: 13 },
      passAccuracy: { home: 83, away: 81 },
      totalPasses: { home: 430, away: 405 },
      completedPasses: { home: 356, away: 328 },
      offsides: { home: 2, away: 2 },
      saves: { home: 3, away: 3 },
      yellowCards: { home: 2, away: 2 },
      redCards: { home: 0, away: 0 },
    },
    lineups: {
      home: {
        teamName: homeTeam,
        formation: '4-3-3',
        coach: 'Head Coach',
        startingXI: Array.from({ length: 11 }, (_, i) => ({ number: i + 1, name: `${homeTeam} Player ${i + 1}`, position: i === 0 ? 'GK' : 'MF' })),
        substitutes: [],
      },
      away: {
        teamName: awayTeam,
        formation: '4-4-2',
        coach: 'Head Coach',
        startingXI: Array.from({ length: 11 }, (_, i) => ({ number: i + 1, name: `${awayTeam} Player ${i + 1}`, position: i === 0 ? 'GK' : 'MF' })),
        substitutes: [],
      },
    },
  };
}
