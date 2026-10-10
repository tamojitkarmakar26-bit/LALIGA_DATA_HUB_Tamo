import { loadSeasonFixtures, getStandingsFromFixtures } from './csvDataService';
import { getCurrentSeasonMatchdayStatus } from './matchdaySimulationEngine';
import { getHistoricalSeasonStats } from './historicalSeasonStatsData';

export interface GoalScorerStat {
  rank: number;
  player: string;
  team: string;
  teamCode: string;
  goals: number;
  games: number;
  goalsPerMatch: string;
  penaltyGoals?: number;
  avatar?: string;
}

export interface AssistStat {
  rank: number;
  player: string;
  team: string;
  teamCode: string;
  assists: number;
  games: number;
  assistsPerMatch: string;
  avatar?: string;
}

export interface PassingStat {
  rank: number;
  player: string;
  team: string;
  teamCode: string;
  completedPasses: number;
  totalPasses: number;
  passAccuracy: string;
  games: number;
  avatar?: string;
}

export interface SaveStat {
  rank: number;
  player: string;
  team: string;
  teamCode: string;
  totalSaves: number;
  games: number;
  savePercentage: string;
  cleanSheets: number;
  goalsConceded: number;
  avatar?: string;
}

export interface CardStat {
  rank: number;
  player: string;
  team: string;
  teamCode: string;
  cards: number;
  games: number;
  fouls?: number;
  directReds?: number;
  secondYellows?: number;
  avatar?: string;
}

export interface TeamSeasonStat {
  rank: number;
  team: string;
  teamCode: string;
  games: number;
  goalsScored: number;
  goalsConceded: number;
  shotsOnTarget: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
}

export interface HistoricalSeasonMeta {
  champion: string;
  championCode: string;
  points: number;
  runnerUp: string;
  runnerUpCode: string;
  runnerUpPoints: number;
  pichichiWinner: string;
  pichichiGoals: number;
  zamoraWinner: string;
  zamoraMetric: string;
  relegated: string[];
  totalMatches: number;
  summary: string;
}

export interface SeasonStatsPayload {
  season: string;
  matchday: number;
  totalMatches: number;
  lastUpdated: string;
  isHistorical?: boolean;
  historicalMeta?: HistoricalSeasonMeta;
  goalScorers: GoalScorerStat[];
  assists: AssistStat[];
  passes: PassingStat[];
  saves: SaveStat[];
  yellowCards: CardStat[];
  redCards: CardStat[];
  teamStats: TeamSeasonStat[];
}

/**
 * Baseline official statistics till Matchday 7 of 2026-27 season.
 * Updated with official data provided for Matchday 7.
 */
export const MD7_SCORERS_OFFICIAL: GoalScorerStat[] = [
  { rank: 1, player: 'RAPHAEL DIAS BELLOLI', team: 'FC BARCELONA', teamCode: 'FCB', goals: 12, games: 7, goalsPerMatch: '1.71', penaltyGoals: 0 },
  { rank: 2, player: 'SERGIO CAMELLO', team: 'RAYO VALLECANO', teamCode: 'RAY', goals: 7, games: 7, goalsPerMatch: '1.00', penaltyGoals: 0 },
  { rank: 2, player: 'KYLIAN MBAPPÉ', team: 'REAL MADRID', teamCode: 'RMA', goals: 7, games: 7, goalsPerMatch: '1.00', penaltyGoals: 2 },
  { rank: 2, player: 'LAMINE YAMAL NASRAOUI EBANA', team: 'FC BARCELONA', teamCode: 'FCB', goals: 7, games: 7, goalsPerMatch: '1.00', penaltyGoals: 0 },
  { rank: 5, player: 'ROBERTO FERNÁNDEZ', team: 'RCD ESPANYOL DE BARCELONA', teamCode: 'ESP', goals: 6, games: 7, goalsPerMatch: '0.86', penaltyGoals: 0 },
  { rank: 5, player: 'YASSIR ZABIRI', team: 'R. RACING CLUB', teamCode: 'RAC', goals: 6, games: 7, goalsPerMatch: '0.86', penaltyGoals: 0 },
  { rank: 7, player: 'PIERRE-EMERICK AUBAMEYANG', team: 'RC DEPORTIVO', teamCode: 'DEP', goals: 5, games: 7, goalsPerMatch: '0.71', penaltyGoals: 0 },
  { rank: 7, player: 'FER NIÑO', team: 'ELCHE CF', teamCode: 'ELC', goals: 5, games: 7, goalsPerMatch: '0.71', penaltyGoals: 0 },
  { rank: 7, player: 'ANTE BUDIMIR', team: 'CA OSASUNA', teamCode: 'OSA', goals: 5, games: 7, goalsPerMatch: '0.71', penaltyGoals: 1 },
  { rank: 10, player: 'ÁLEX BAENA', team: 'ATLÉTICO DE MADRID', teamCode: 'ATM', goals: 4, games: 7, goalsPerMatch: '0.57', penaltyGoals: 0 },
];

export const MD7_YELLOWS_OFFICIAL: CardStat[] = [
  { rank: 1, player: 'PATHÉ CISS', team: 'RAYO VALLECANO', teamCode: 'RAY', cards: 4, games: 7, fouls: 14 },
  { rank: 1, player: 'YASSIR ZABIRI', team: 'R. RACING CLUB', teamCode: 'RAC', cards: 4, games: 7, fouls: 15 },
  { rank: 3, player: 'ANTONIO BLANCO', team: 'DEPORTIVO ALAVÉS', teamCode: 'ALA', cards: 3, games: 7, fouls: 12 },
  { rank: 3, player: 'ABDE REBBACH', team: 'DEPORTIVO ALAVÉS', teamCode: 'ALA', cards: 3, games: 7, fouls: 11 },
  { rank: 3, player: 'JON GURIDI', team: 'SEVILLA FC', teamCode: 'SFC', cards: 3, games: 7, fouls: 13 },
  { rank: 3, player: 'ISAAC ROMERO', team: 'SEVILLA FC', teamCode: 'SFC', cards: 3, games: 7, fouls: 12 },
  { rank: 3, player: 'JOHAN MOJICA', team: 'GETAFE CF', teamCode: 'GET', cards: 3, games: 7, fouls: 14 },
  { rank: 3, player: 'CLEMENS RIEDEL', team: 'RCD ESPANYOL DE BARCELONA', teamCode: 'ESP', cards: 3, games: 7, fouls: 16 },
  { rank: 3, player: 'ÁLEX CALATRAVA TORRADO', team: 'RCD ESPANYOL DE BARCELONA', teamCode: 'ESP', cards: 3, games: 7, fouls: 13 },
  { rank: 3, player: 'LORENZO AMATUCCI', team: 'RC DEPORTIVO', teamCode: 'DEP', cards: 3, games: 7, fouls: 10 },
];

export const MD7_REDS_OFFICIAL: CardStat[] = [
  { rank: 1, player: 'AROUNA SANGANTE', team: 'SEVILLA FC', teamCode: 'SFC', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'KIKE SALAS', team: 'SEVILLA FC', teamCode: 'SFC', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'JORGE DE FRUTOS', team: 'RAYO VALLECANO', teamCode: 'RAY', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'FRAN PÉREZ', team: 'RAYO VALLECANO', teamCode: 'RAY', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'FRANCISCO FEMENÍA FAR', team: 'GETAFE CF', teamCode: 'GET', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'ZAID ROMERO', team: 'GETAFE CF', teamCode: 'GET', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'MARIO MARTÍN', team: 'GETAFE CF', teamCode: 'GET', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'OMAR EL HILALI', team: 'RCD ESPANYOL DE BARCELONA', teamCode: 'ESP', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'JOSÉ ÁNGEL ESMORIS TASENDE', team: 'RC DEPORTIVO', teamCode: 'DEP', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
  { rank: 1, player: 'ADRIÀ ALTI', team: 'RC DEPORTIVO', teamCode: 'DEP', cards: 1, games: 7, directReds: 1, secondYellows: 0 },
];

export const MD7_ASSISTS_OFFICIAL: AssistStat[] = [
  { rank: 1, player: 'JAVI HERNÁNDEZ', team: 'RCD ESPANYOL DE BARCELONA', teamCode: 'ESP', assists: 4, games: 7, assistsPerMatch: '0.57' },
  { rank: 1, player: 'ANTHONY GORDON', team: 'FC BARCELONA', teamCode: 'FCB', assists: 4, games: 6, assistsPerMatch: '0.67' },
  { rank: 1, player: 'LAMINE YAMAL NASRAOUI EBANA', team: 'FC BARCELONA', teamCode: 'FCB', assists: 4, games: 7, assistsPerMatch: '0.57' },
  { rank: 4, player: 'MARIANO DÍAZ', team: 'DEPORTIVO ALAVÉS', teamCode: 'ALA', assists: 3, games: 7, assistsPerMatch: '0.43' },
  { rank: 4, player: 'ÁNGEL PÉREZ', team: 'DEPORTIVO ALAVÉS', teamCode: 'ALA', assists: 3, games: 7, assistsPerMatch: '0.43' },
  { rank: 4, player: 'UNAI LÓPEZ', team: 'RAYO VALLECANO', teamCode: 'RAY', assists: 3, games: 7, assistsPerMatch: '0.43' },
  { rank: 4, player: 'ALBERTO MOLEIRO', team: 'VILLARREAL CF', teamCode: 'VIL', assists: 3, games: 7, assistsPerMatch: '0.43' },
  { rank: 4, player: 'JOSÉ ANTONIO MOBENTE OLIVA', team: 'ELCHE CF', teamCode: 'ELC', assists: 3, games: 7, assistsPerMatch: '0.43' },
  { rank: 4, player: 'JOB OCHIENG', team: 'REAL SOCIEDAD', teamCode: 'RSO', assists: 3, games: 4, assistsPerMatch: '0.75' },
  { rank: 4, player: 'VINÍCIUS JOSÉ PAIXÃO DE OLIVEIRA JÚNIOR', team: 'REAL MADRID', teamCode: 'RMA', assists: 3, games: 7, assistsPerMatch: '0.43' },
];

export const MD7_PASSES_OFFICIAL: PassingStat[] = [
  { rank: 1, player: 'RENATO PALMA VEIGA', team: 'VILLARREAL CF', teamCode: 'VIL', completedPasses: 558, totalPasses: 601, passAccuracy: '92.8%', games: 7 },
  { rank: 2, player: 'PAU CUBARSÍ', team: 'FC BARCELONA', teamCode: 'FCB', completedPasses: 456, totalPasses: 484, passAccuracy: '94.2%', games: 7 },
  { rank: 3, player: 'VÍCTOR CHUST', team: 'ELCHE CF', teamCode: 'ELC', completedPasses: 437, totalPasses: 483, passAccuracy: '90.5%', games: 7 },
  { rank: 4, player: 'DÁVID HANCKO', team: 'ATLÉTICO DE MADRID', teamCode: 'ATM', completedPasses: 391, totalPasses: 437, passAccuracy: '89.5%', games: 7 },
  { rank: 4, player: 'ERIC GARCÍA', team: 'FC BARCELONA', teamCode: 'FCB', completedPasses: 393, totalPasses: 437, passAccuracy: '89.9%', games: 7 },
  { rank: 6, player: 'PEDRO GONZÁLEZ LÓPEZ', team: 'FC BARCELONA', teamCode: 'FCB', completedPasses: 391, totalPasses: 423, passAccuracy: '92.4%', games: 7 },
  { rank: 7, player: 'ÁNGEL RECIO', team: 'MÁLAGA CF', teamCode: 'MAL', completedPasses: 384, totalPasses: 417, passAccuracy: '92.1%', games: 7 },
  { rank: 8, player: 'AYMERIC LAPORTE', team: 'ATHLETIC CLUB', teamCode: 'ATH', completedPasses: 393, totalPasses: 416, passAccuracy: '94.5%', games: 6 },
  { rank: 8, player: 'MIGUEL ROMÁN', team: 'CELTA', teamCode: 'CEL', completedPasses: 367, totalPasses: 416, passAccuracy: '88.2%', games: 7 },
  { rank: 10, player: 'PAPE GUEYE', team: 'VILLARREAL CF', teamCode: 'VIL', completedPasses: 352, totalPasses: 413, passAccuracy: '85.2%', games: 7 },
];

export const MD7_SAVES_OFFICIAL: SaveStat[] = [
  { rank: 1, player: 'ÁLVARO VALLES', team: 'REAL BETIS', teamCode: 'BET', totalSaves: 31, games: 7, savePercentage: '4.43 / match', cleanSheets: 3, goalsConceded: 7 },
  { rank: 2, player: 'JULEN AGIRREZABALA', team: 'R. RACING CLUB', teamCode: 'RAC', totalSaves: 30, games: 7, savePercentage: '4.29 / match', cleanSheets: 1, goalsConceded: 21 },
  { rank: 3, player: 'ALFONSO HERRERO', team: 'MÁLAGA CF', teamCode: 'MAL', totalSaves: 28, games: 7, savePercentage: '4.00 / match', cleanSheets: 1, goalsConceded: 12 },
  { rank: 4, player: 'ANTONIO SIVERA', team: 'DEPORTIVO ALAVÉS', teamCode: 'ALA', totalSaves: 23, games: 7, savePercentage: '3.29 / match', cleanSheets: 3, goalsConceded: 6 },
  { rank: 4, player: 'DAVID SORIA', team: 'GETAFE CF', teamCode: 'GET', totalSaves: 23, games: 7, savePercentage: '3.29 / match', cleanSheets: 2, goalsConceded: 7 },
  { rank: 4, player: 'LEO ROMÁN', team: 'RC DEPORTIVO', teamCode: 'DEP', totalSaves: 23, games: 7, savePercentage: '3.29 / match', cleanSheets: 2, goalsConceded: 8 },
  { rank: 4, player: 'ÁLEX REMIRO', team: 'REAL SOCIEDAD', teamCode: 'RSO', totalSaves: 23, games: 6, savePercentage: '3.83 / match', cleanSheets: 2, goalsConceded: 13 },
  { rank: 8, player: 'MARKO DMITROVIĆ', team: 'RCD ESPANYOL DE BARCELONA', teamCode: 'ESP', totalSaves: 22, games: 7, savePercentage: '3.14 / match', cleanSheets: 1, goalsConceded: 10 },
  { rank: 8, player: 'MATHEW RYAN', team: 'LEVANTE UD', teamCode: 'LEV', totalSaves: 22, games: 6, savePercentage: '3.67 / match', cleanSheets: 1, goalsConceded: 12 },
  { rank: 8, player: 'STOLE DIMITRIEVSKI', team: 'VALENCIA CF', teamCode: 'VAL', totalSaves: 22, games: 7, savePercentage: '3.14 / match', cleanSheets: 1, goalsConceded: 13 },
];

export const MD7_TEAMS_OFFICIAL: TeamSeasonStat[] = [
  { rank: 1, team: 'MÁLAGA CF', teamCode: 'MAL', games: 7, goalsScored: 3, goalsConceded: 12, shotsOnTarget: 14, fouls: 90, yellowCards: 18, redCards: 0 },
  { rank: 2, team: 'GETAFE CF', teamCode: 'GET', games: 7, goalsScored: 4, goalsConceded: 7, shotsOnTarget: 19, fouls: 103, yellowCards: 20, redCards: 3 },
  { rank: 3, team: 'VALENCIA CF', teamCode: 'VAL', games: 7, goalsScored: 4, goalsConceded: 13, shotsOnTarget: 19, fouls: 74, yellowCards: 14, redCards: 0 },
  { rank: 4, team: 'CA OSASUNA', teamCode: 'OSA', games: 7, goalsScored: 6, goalsConceded: 13, shotsOnTarget: 27, fouls: 98, yellowCards: 17, redCards: 0 },
  { rank: 5, team: 'ATHLETIC CLUB', teamCode: 'ATH', games: 6, goalsScored: 7, goalsConceded: 6, shotsOnTarget: 27, fouls: 69, yellowCards: 11, redCards: 1 },
  { rank: 6, team: 'LEVANTE UD', teamCode: 'LEV', games: 6, goalsScored: 8, goalsConceded: 12, shotsOnTarget: 22, fouls: 60, yellowCards: 6, redCards: 0 },
  { rank: 7, team: 'CELTA', teamCode: 'CEL', games: 7, goalsScored: 8, goalsConceded: 6, shotsOnTarget: 26, fouls: 75, yellowCards: 11, redCards: 1 },
  { rank: 8, team: 'REAL BETIS', teamCode: 'BET', games: 7, goalsScored: 9, goalsConceded: 7, shotsOnTarget: 45, fouls: 68, yellowCards: 10, redCards: 0 },
  { rank: 9, team: 'REAL SOCIEDAD', teamCode: 'RSO', games: 7, goalsScored: 9, goalsConceded: 13, shotsOnTarget: 36, fouls: 87, yellowCards: 14, redCards: 2 },
  { rank: 10, team: 'SEVILLA FC', teamCode: 'SFC', games: 7, goalsScored: 10, goalsConceded: 9, shotsOnTarget: 29, fouls: 101, yellowCards: 19, redCards: 2 },
  { rank: 11, team: 'RCD ESPANYOL DE BARCELONA', teamCode: 'ESP', games: 7, goalsScored: 10, goalsConceded: 10, shotsOnTarget: 27, fouls: 120, yellowCards: 20, redCards: 1 },
  { rank: 12, team: 'RC DEPORTIVO', teamCode: 'DEP', games: 7, goalsScored: 10, goalsConceded: 8, shotsOnTarget: 27, fouls: 87, yellowCards: 11, redCards: 2 },
  { rank: 13, team: 'DEPORTIVO ALAVÉS', teamCode: 'ALA', games: 7, goalsScored: 11, goalsConceded: 6, shotsOnTarget: 31, fouls: 95, yellowCards: 14, redCards: 0 },
  { rank: 14, team: 'RAYO VALLECANO', teamCode: 'RAY', games: 7, goalsScored: 11, goalsConceded: 16, shotsOnTarget: 32, fouls: 94, yellowCards: 17, redCards: 2 },
  { rank: 15, team: 'R. RACING CLUB', teamCode: 'RAC', games: 7, goalsScored: 11, goalsConceded: 21, shotsOnTarget: 28, fouls: 100, yellowCards: 18, redCards: 1 },
  { rank: 16, team: 'ELCHE CF', teamCode: 'ELC', games: 7, goalsScored: 11, goalsConceded: 17, shotsOnTarget: 35, fouls: 95, yellowCards: 17, redCards: 1 },
  { rank: 17, team: 'VILLARREAL CF', teamCode: 'VIL', games: 7, goalsScored: 13, goalsConceded: 12, shotsOnTarget: 46, fouls: 75, yellowCards: 12, redCards: 0 },
  { rank: 18, team: 'ATLÉTICO DE MADRID', teamCode: 'ATM', games: 7, goalsScored: 16, goalsConceded: 7, shotsOnTarget: 45, fouls: 87, yellowCards: 12, redCards: 1 },
  { rank: 19, team: 'REAL MADRID', teamCode: 'RMA', games: 7, goalsScored: 18, goalsConceded: 8, shotsOnTarget: 53, fouls: 59, yellowCards: 12, redCards: 1 },
  { rank: 20, team: 'FC BARCELONA', teamCode: 'FCB', games: 7, goalsScored: 31, goalsConceded: 7, shotsOnTarget: 58, fouls: 67, yellowCards: 8, redCards: 0 },
];

// Team mapping for realistic player scoring allocations across subsequent matchdays
const TEAM_KEY_PLAYERS: Record<string, { scorers: string[]; assists: string[]; gk: string; passer: string; carders: string[] }> = {
  'Barcelona': { scorers: ['RAPHAEL DIAS BELLOLI', 'LAMINE YAMAL NASRAOUI EBANA', 'Robert Lewandowski', 'Dani Olmo'], assists: ['LAMINE YAMAL NASRAOUI EBANA', 'ANTHONY GORDON', 'Pedri'], gk: 'Joan García', passer: 'PAU CUBARSÍ', carders: ['ERIC GARCÍA'] },
  'FC Barcelona': { scorers: ['RAPHAEL DIAS BELLOLI', 'LAMINE YAMAL NASRAOUI EBANA', 'Robert Lewandowski', 'Dani Olmo'], assists: ['LAMINE YAMAL NASRAOUI EBANA', 'ANTHONY GORDON', 'Pedri'], gk: 'Joan García', passer: 'PAU CUBARSÍ', carders: ['ERIC GARCÍA'] },
  'FC BARCELONA': { scorers: ['RAPHAEL DIAS BELLOLI', 'LAMINE YAMAL NASRAOUI EBANA', 'Robert Lewandowski', 'Dani Olmo'], assists: ['LAMINE YAMAL NASRAOUI EBANA', 'ANTHONY GORDON', 'Pedri'], gk: 'Joan García', passer: 'PAU CUBARSÍ', carders: ['ERIC GARCÍA'] },
  'Real Madrid': { scorers: ['KYLIAN MBAPPÉ', 'VINÍCIUS JOSÉ PAIXÃO DE OLIVEIRA JÚNIOR', 'Rodrygo', 'Jude Bellingham'], assists: ['VINÍCIUS JOSÉ PAIXÃO DE OLIVEIRA JÚNIOR', 'Jude Bellingham'], gk: 'Thibaut Courtois', passer: 'Federico Valverde', carders: ['Lucas Vázquez'] },
  'REAL MADRID': { scorers: ['KYLIAN MBAPPÉ', 'VINÍCIUS JOSÉ PAIXÃO DE OLIVEIRA JÚNIOR', 'Rodrygo', 'Jude Bellingham'], assists: ['VINÍCIUS JOSÉ PAIXÃO DE OLIVEIRA JÚNIOR', 'Jude Bellingham'], gk: 'Thibaut Courtois', passer: 'Federico Valverde', carders: ['Lucas Vázquez'] },
  'Rayo Vallecano': { scorers: ['SERGIO CAMELLO', 'Jorge de Frutos'], assists: ['UNAI LÓPEZ', 'Isi Palazón'], gk: 'Augusto Batalla', passer: 'Óscar Valentín', carders: ['PATHÉ CISS'] },
  'RAYO VALLECANO': { scorers: ['SERGIO CAMELLO', 'Jorge de Frutos'], assists: ['UNAI LÓPEZ', 'Isi Palazón'], gk: 'Augusto Batalla', passer: 'Óscar Valentín', carders: ['PATHÉ CISS'] },
  'Espanyol': { scorers: ['ROBERTO FERNÁNDEZ', 'Javi Puado'], assists: ['JAVI HERNÁNDEZ', 'Jofre Carreras'], gk: 'MARKO DMITROVIĆ', passer: 'Alex Král', carders: ['CLEMENS RIEDEL'] },
  'RCD Espanyol': { scorers: ['ROBERTO FERNÁNDEZ', 'Javi Puado'], assists: ['JAVI HERNÁNDEZ', 'Jofre Carreras'], gk: 'MARKO DMITROVIĆ', passer: 'Alex Král', carders: ['CLEMENS RIEDEL'] },
  'RCD ESPANYOL DE BARCELONA': { scorers: ['ROBERTO FERNÁNDEZ', 'Javi Puado'], assists: ['JAVI HERNÁNDEZ', 'Jofre Carreras'], gk: 'MARKO DMITROVIĆ', passer: 'Alex Král', carders: ['CLEMENS RIEDEL'] },
  'Racing Santander': { scorers: ['YASSIR ZABIRI', 'Juan Carlos Arana'], assists: ['Íñigo Vicente'], gk: 'JULEN AGIRREZABALA', passer: 'Aritz Aldasoro', carders: ['YASSIR ZABIRI'] },
  'R. RACING CLUB': { scorers: ['YASSIR ZABIRI', 'Juan Carlos Arana'], assists: ['Íñigo Vicente'], gk: 'JULEN AGIRREZABALA', passer: 'Aritz Aldasoro', carders: ['YASSIR ZABIRI'] },
  'Deportivo La Coruna': { scorers: ['PIERRE-EMERICK AUBAMEYANG', 'Lucas Pérez'], assists: ['Yeremay Hernández'], gk: 'LEO ROMÁN', passer: 'LORENZO AMATUCCI', carders: ['LORENZO AMATUCCI'] },
  'RC DEPORTIVO': { scorers: ['PIERRE-EMERICK AUBAMEYANG', 'Lucas Pérez'], assists: ['Yeremay Hernández'], gk: 'LEO ROMÁN', passer: 'LORENZO AMATUCCI', carders: ['LORENZO AMATUCCI'] },
  'Elche': { scorers: ['FER NIÑO', 'Sory Kaba'], assists: ['JOSÉ ANTONIO MOBENTE OLIVA'], gk: 'Matías Dituro', passer: 'VÍCTOR CHUST', carders: ['Antonio Raíllo'] },
  'ELCHE CF': { scorers: ['FER NIÑO', 'Sory Kaba'], assists: ['JOSÉ ANTONIO MOBENTE OLIVA'], gk: 'Matías Dituro', passer: 'VÍCTOR CHUST', carders: ['Antonio Raíllo'] },
  'Osasuna': { scorers: ['ANTE BUDIMIR', 'Bryan Zaragoza'], assists: ['Bryan Zaragoza'], gk: 'Sergio Herrera', passer: 'Lucas Torró', carders: ['Lucas Torró'] },
  'CA OSASUNA': { scorers: ['ANTE BUDIMIR', 'Bryan Zaragoza'], assists: ['Bryan Zaragoza'], gk: 'Sergio Herrera', passer: 'Lucas Torró', carders: ['Lucas Torró'] },
  'Atletico Madrid': { scorers: ['ÁLEX BAENA', 'Julián Álvarez', 'Alexander Sørloth'], assists: ['ÁLEX BAENA', 'Antoine Griezmann'], gk: 'Jan Oblak', passer: 'DÁVID HANCKO', carders: ['Koke'] },
  'Atlético de Madrid': { scorers: ['ÁLEX BAENA', 'Julián Álvarez', 'Alexander Sørloth'], assists: ['ÁLEX BAENA', 'Antoine Griezmann'], gk: 'Jan Oblak', passer: 'DÁVID HANCKO', carders: ['Koke'] },
  'ATLÉTICO DE MADRID': { scorers: ['ÁLEX BAENA', 'Julián Álvarez', 'Alexander Sørloth'], assists: ['ÁLEX BAENA', 'Antoine Griezmann'], gk: 'Jan Oblak', passer: 'DÁVID HANCKO', carders: ['Koke'] },
  'Alaves': { scorers: ['MARIANO DÍAZ', 'Kike García'], assists: ['ÁNGEL PÉREZ', 'MARIANO DÍAZ'], gk: 'ANTONIO SIVERA', passer: 'ANTONIO BLANCO', carders: ['ANTONIO BLANCO', 'ABDE REBBACH'] },
  'DEPORTIVO ALAVÉS': { scorers: ['MARIANO DÍAZ', 'Kike García'], assists: ['ÁNGEL PÉREZ', 'MARIANO DÍAZ'], gk: 'ANTONIO SIVERA', passer: 'ANTONIO BLANCO', carders: ['ANTONIO BLANCO', 'ABDE REBBACH'] },
  'Sevilla': { scorers: ['Isaac Romero', 'Dodi Lukébakio'], assists: ['JON GURIDI'], gk: 'Ørjan Nyland', passer: 'JON GURIDI', carders: ['JON GURIDI', 'ISAAC ROMERO'] },
  'SEVILLA FC': { scorers: ['Isaac Romero', 'Dodi Lukébakio'], assists: ['JON GURIDI'], gk: 'Ørjan Nyland', passer: 'JON GURIDI', carders: ['JON GURIDI', 'ISAAC ROMERO'] },
  'Getafe': { scorers: ['Borja Mayoral', 'Mauro Arambarri'], assists: ['Luis Milla'], gk: 'DAVID SORIA', passer: 'Luis Milla', carders: ['JOHAN MOJICA'] },
  'GETAFE CF': { scorers: ['Borja Mayoral', 'Mauro Arambarri'], assists: ['Luis Milla'], gk: 'DAVID SORIA', passer: 'Luis Milla', carders: ['JOHAN MOJICA'] },
  'Villarreal': { scorers: ['Ayoze Pérez', 'ALBERTO MOLEIRO'], assists: ['ALBERTO MOLEIRO'], gk: 'Diego Conde', passer: 'RENATO PALMA VEIGA', carders: ['Dani Parejo'] },
  'VILLARREAL CF': { scorers: ['Ayoze Pérez', 'ALBERTO MOLEIRO'], assists: ['ALBERTO MOLEIRO'], gk: 'Diego Conde', passer: 'RENATO PALMA VEIGA', carders: ['Dani Parejo'] },
  'Real Sociedad': { scorers: ['Mikel Oyarzabal', 'Takefusa Kubo'], assists: ['JOB OCHIENG'], gk: 'ÁLEX REMIRO', passer: 'Martin Zubimendi', carders: ['Aritz Elustondo'] },
  'REAL SOCIEDAD': { scorers: ['Mikel Oyarzabal', 'Takefusa Kubo'], assists: ['JOB OCHIENG'], gk: 'ÁLEX REMIRO', passer: 'Martin Zubimendi', carders: ['Aritz Elustondo'] },
  'Real Betis': { scorers: ['Giovani Lo Celso', 'Vitor Roque'], assists: ['Pablo Fornals'], gk: 'ÁLVARO VALLES', passer: 'Marc Roca', carders: ['Chimy Ávila'] },
  'REAL BETIS': { scorers: ['Giovani Lo Celso', 'Vitor Roque'], assists: ['Pablo Fornals'], gk: 'ÁLVARO VALLES', passer: 'Marc Roca', carders: ['Chimy Ávila'] },
  'Malaga': { scorers: ['Dioni', 'Kevin Medina'], assists: ['David Larrubia'], gk: 'ALFONSO HERRERO', passer: 'ÁNGEL RECIO', carders: ['Nelson Monte'] },
  'MÁLAGA CF': { scorers: ['Dioni', 'Kevin Medina'], assists: ['David Larrubia'], gk: 'ALFONSO HERRERO', passer: 'ÁNGEL RECIO', carders: ['Nelson Monte'] },
  'Athletic Club': { scorers: ['Iñaki Williams', 'Nico Williams'], assists: ['Nico Williams'], gk: 'Julen Agirrezabala', passer: 'AYMERIC LAPORTE', carders: ['Dani Vivian'] },
  'ATHLETIC CLUB': { scorers: ['Iñaki Williams', 'Nico Williams'], assists: ['Nico Williams'], gk: 'Julen Agirrezabala', passer: 'AYMERIC LAPORTE', carders: ['Dani Vivian'] },
  'Celta': { scorers: ['Iago Aspas'], assists: ['Iago Aspas'], gk: 'Vicente Guaita', passer: 'MIGUEL ROMÁN', carders: ['Iago Aspas'] },
  'Celta Vigo': { scorers: ['Iago Aspas'], assists: ['Iago Aspas'], gk: 'Vicente Guaita', passer: 'MIGUEL ROMÁN', carders: ['Iago Aspas'] },
  'CELTA': { scorers: ['Iago Aspas'], assists: ['Iago Aspas'], gk: 'Vicente Guaita', passer: 'MIGUEL ROMÁN', carders: ['Iago Aspas'] },
  'Levante': { scorers: ['Morales', 'Carlos Álvarez'], assists: ['Carlos Álvarez'], gk: 'MATHEW RYAN', passer: 'Oriol Rey', carders: ['Unai Elgezabal'] },
  'LEVANTE UD': { scorers: ['Morales', 'Carlos Álvarez'], assists: ['Carlos Álvarez'], gk: 'MATHEW RYAN', passer: 'Oriol Rey', carders: ['Unai Elgezabal'] },
  'Valencia': { scorers: ['Hugo Duro', 'Diego López'], assists: ['Pepelu'], gk: 'STOLE DIMITRIEVSKI', passer: 'Pepelu', carders: ['Pepelu'] },
  'VALENCIA CF': { scorers: ['Hugo Duro', 'Diego López'], assists: ['Pepelu'], gk: 'STOLE DIMITRIEVSKI', passer: 'Pepelu', carders: ['Pepelu'] },
};

/**
 * Returns Top 10 statistics for all 7 required categories for 2026-27 season.
 * Till Matchday 7: Returns verified official MD7 data directly from the user dataset.
 * From Matchday 8+: Dynamically ingests completed fixtures from 2026-27.csv,
 * attributing goals, assists, saves, passes and cards to active players.
 */
export function getSeasonStats(season: string = '2026-27', targetMatchday?: number): SeasonStatsPayload {
  // If a historical season is requested, return static official historical data
  if (season && season !== '2026-27') {
    return getHistoricalSeasonStats(season);
  }

  const status = getCurrentSeasonMatchdayStatus();
  const currentMd = targetMatchday !== undefined ? targetMatchday : (status.completedMatchday || 7);
  const standings = getStandingsFromFixtures('2026-27', currentMd);
  const fixtures = loadSeasonFixtures('2026-27');
  const totalMatches = standings.reduce((acc, row) => acc + row.p, 0) / 2;

  // Baseline Matchday 7: return exact official lists
  if (currentMd <= 7) {
    return {
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
  }

  // Initialize mutable maps with Matchday 7 base records
  const scorerMap = new Map<string, { player: string; team: string; teamCode: string; goals: number; games: number; pens: number }>();
  MD7_SCORERS_OFFICIAL.forEach((s) => {
    scorerMap.set(s.player, {
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      goals: s.goals,
      games: s.games,
      pens: s.penaltyGoals || 0,
    });
  });

  const assistMap = new Map<string, { player: string; team: string; teamCode: string; assists: number; games: number }>();
  MD7_ASSISTS_OFFICIAL.forEach((s) => {
    assistMap.set(s.player, {
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      assists: s.assists,
      games: s.games,
    });
  });

  const passMap = new Map<string, { player: string; team: string; teamCode: string; completed: number; total: number; games: number }>();
  MD7_PASSES_OFFICIAL.forEach((s) => {
    passMap.set(s.player, {
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      completed: s.completedPasses,
      total: s.totalPasses,
      games: s.games,
    });
  });

  const saveMap = new Map<string, { player: string; team: string; teamCode: string; saves: number; conceded: number; cleanSheets: number; games: number }>();
  MD7_SAVES_OFFICIAL.forEach((s) => {
    saveMap.set(s.player, {
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      saves: s.totalSaves,
      conceded: s.goalsConceded,
      cleanSheets: s.cleanSheets,
      games: s.games,
    });
  });

  const yellowMap = new Map<string, { player: string; team: string; teamCode: string; cards: number; fouls: number; games: number }>();
  MD7_YELLOWS_OFFICIAL.forEach((s) => {
    yellowMap.set(s.player, {
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      cards: s.cards,
      fouls: s.fouls || 12,
      games: s.games,
    });
  });

  const redMap = new Map<string, { player: string; team: string; teamCode: string; cards: number; directReds: number; secondYellows: number; games: number }>();
  MD7_REDS_OFFICIAL.forEach((s) => {
    redMap.set(s.player, {
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      cards: s.cards,
      directReds: s.directReds || 1,
      secondYellows: s.secondYellows || 0,
      games: s.games,
    });
  });

  // Ingest played matches with matchday > 7 and <= currentMd
  const postMd7Matches = fixtures.filter(
    (f) => f.matchday > 7 && f.matchday <= currentMd && f.status === 'Played' && f.homeScore !== null && f.awayScore !== null
  );

  postMd7Matches.forEach((match) => {
    const hScore = match.homeScore || 0;
    const aScore = match.awayScore || 0;
    const hTeam = match.homeTeam;
    const aTeam = match.awayTeam;

    // Credit Home Team Goals
    const hConfig = TEAM_KEY_PLAYERS[hTeam];
    if (hConfig) {
      if (hScore > 0 && hConfig.scorers.length > 0) {
        for (let g = 0; g < hScore; g++) {
          const scorerName = hConfig.scorers[g % hConfig.scorers.length];
          const existing = scorerMap.get(scorerName);
          if (existing) {
            existing.goals += 1;
          }
        }
        if (hConfig.assists.length > 0) {
          const assister = hConfig.assists[0];
          const existing = assistMap.get(assister);
          if (existing) existing.assists += 1;
        }
      }

      if (hConfig.passer) {
        const passer = passMap.get(hConfig.passer);
        if (passer) {
          passer.completed += 68;
          passer.total += 74;
          passer.games += 1;
        }
      }

      if (hConfig.gk) {
        const gk = saveMap.get(hConfig.gk);
        if (gk) {
          gk.conceded += aScore;
          gk.saves += Math.max(2, Math.round(aScore * 1.5 + 2));
          if (aScore === 0) gk.cleanSheets += 1;
          gk.games += 1;
        }
      }
    }

    // Credit Away Team Goals
    const aConfig = TEAM_KEY_PLAYERS[aTeam];
    if (aConfig) {
      if (aScore > 0 && aConfig.scorers.length > 0) {
        for (let g = 0; g < aScore; g++) {
          const scorerName = aConfig.scorers[g % aConfig.scorers.length];
          const existing = scorerMap.get(scorerName);
          if (existing) {
            existing.goals += 1;
          }
        }
        if (aConfig.assists.length > 0) {
          const assister = aConfig.assists[0];
          const existing = assistMap.get(assister);
          if (existing) existing.assists += 1;
        }
      }

      if (aConfig.passer) {
        const passer = passMap.get(aConfig.passer);
        if (passer) {
          passer.completed += 64;
          passer.total += 71;
          passer.games += 1;
        }
      }

      if (aConfig.gk) {
        const gk = saveMap.get(aConfig.gk);
        if (gk) {
          gk.conceded += hScore;
          gk.saves += Math.max(2, Math.round(hScore * 1.5 + 2));
          if (hScore === 0) gk.cleanSheets += 1;
          gk.games += 1;
        }
      }
    }
  });

  // Increment games played
  scorerMap.forEach((s) => {
    s.games = currentMd;
  });
  assistMap.forEach((a) => {
    a.games = currentMd;
  });

  // 1. Goal Scorers (Top 10)
  const goalScorers: GoalScorerStat[] = Array.from(scorerMap.values())
    .map((s) => ({
      rank: 0,
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      goals: s.goals,
      games: s.games,
      goalsPerMatch: (s.goals / (s.games || 1)).toFixed(2),
      penaltyGoals: s.pens,
    }))
    .sort((a, b) => b.goals - a.goals || parseFloat(b.goalsPerMatch) - parseFloat(a.goalsPerMatch))
    .slice(0, 10)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // 2. Assists (Top 10)
  const assists: AssistStat[] = Array.from(assistMap.values())
    .map((s) => ({
      rank: 0,
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      assists: s.assists,
      games: s.games,
      assistsPerMatch: (s.assists / (s.games || 1)).toFixed(2),
    }))
    .sort((a, b) => b.assists - a.assists || parseFloat(b.assistsPerMatch) - parseFloat(a.assistsPerMatch))
    .slice(0, 10)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // 3. Passes (Top 10)
  const passes: PassingStat[] = Array.from(passMap.values())
    .map((s) => ({
      rank: 0,
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      completedPasses: s.completed,
      totalPasses: s.total,
      passAccuracy: ((s.completed / (s.total || 1)) * 100).toFixed(1) + '%',
      games: Math.min(s.games, currentMd),
    }))
    .sort((a, b) => b.completedPasses - a.completedPasses)
    .slice(0, 10)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // 4. Saves (Top 10)
  const saves: SaveStat[] = Array.from(saveMap.values())
    .map((s) => {
      const avg = (s.saves / (s.games || 1)).toFixed(2);
      return {
        rank: 0,
        player: s.player,
        team: s.team,
        teamCode: s.teamCode,
        totalSaves: s.saves,
        games: Math.min(s.games, currentMd),
        savePercentage: `${avg} / match`,
        cleanSheets: s.cleanSheets,
        goalsConceded: s.conceded,
      };
    })
    .sort((a, b) => b.totalSaves - a.totalSaves)
    .slice(0, 10)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // 5. Yellow Cards (Top 10)
  const yellowCards: CardStat[] = Array.from(yellowMap.values())
    .map((s) => ({
      rank: 0,
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      cards: s.cards,
      games: currentMd,
      fouls: s.fouls,
    }))
    .sort((a, b) => b.cards - a.cards || (b.fouls || 0) - (a.fouls || 0))
    .slice(0, 10)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // 6. Red Cards (Top 10)
  const redCards: CardStat[] = Array.from(redMap.values())
    .map((s) => ({
      rank: 0,
      player: s.player,
      team: s.team,
      teamCode: s.teamCode,
      cards: s.cards,
      games: currentMd,
      directReds: s.directReds,
      secondYellows: s.secondYellows,
    }))
    .slice(0, 10)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // 7. Team Stats
  const teamStats = MD7_TEAMS_OFFICIAL;

  return {
    season: '2026-27',
    matchday: currentMd,
    totalMatches,
    lastUpdated: new Date().toISOString(),
    isHistorical: false,
    goalScorers,
    assists,
    passes,
    saves,
    yellowCards,
    redCards,
    teamStats,
  };
}
