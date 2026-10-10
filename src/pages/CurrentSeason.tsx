import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TeamCrestBadge } from '../components/TeamCrestBadge';
import { Season2627MatchdaysModal } from '../components/Season2627MatchdaysModal';
import {
  getCachedStandings,
  hasMatchdayUpdate,
  invalidateSimulationCache,
} from '../services/apiCacheService';

export interface SplitStats {
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: string;
  gdNum?: number;
  pts: number;
}

export interface StandingsRow {
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
  form: string[];
  pts: number;
  zone: 'ucl' | 'uel' | 'uecl' | 'relegation' | 'mid';
  tagColor?: string;
  logo?: string;
  home?: SplitStats;
  away?: SplitStats;
}

export interface CacheMeta {
  cached: boolean;
  cachedAt?: string;
  ttlSeconds?: number;
  isFallback?: boolean;
}

const DEFAULT_STANDINGS_2020_21: StandingsRow[] = [
  { pos: 1, code: 'ATM', name: 'Atletico Madrid', stadium: 'Wanda Metropolitano', p: 38, w: 26, d: 8, l: 4, gf: 67, ga: 25, gd: '+42', form: ['W', 'D', 'W', 'W', 'W'], pts: 86, zone: 'ucl', tagColor: 'text-tertiary', home: { p: 19, w: 15, d: 3, l: 1, gf: 41, ga: 11, gd: '+30', gdNum: 30, pts: 48 }, away: { p: 19, w: 11, d: 5, l: 3, gf: 26, ga: 14, gd: '+12', gdNum: 12, pts: 38 } },
  { pos: 2, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 38, w: 25, d: 9, l: 4, gf: 67, ga: 28, gd: '+39', form: ['W', 'D', 'W', 'W', 'W'], pts: 84, zone: 'ucl', tagColor: 'text-secondary', home: { p: 19, w: 13, d: 3, l: 3, gf: 33, ga: 13, gd: '+20', gdNum: 20, pts: 42 }, away: { p: 19, w: 12, d: 6, l: 1, gf: 34, ga: 15, gd: '+19', gdNum: 19, pts: 42 } },
  { pos: 3, code: 'FCB', name: 'Barcelona', stadium: 'Camp Nou', p: 38, w: 24, d: 7, l: 7, gf: 85, ga: 38, gd: '+47', form: ['W', 'D', 'D', 'L', 'W'], pts: 79, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 11, d: 5, l: 3, gf: 44, ga: 20, gd: '+24', gdNum: 24, pts: 38 }, away: { p: 19, w: 13, d: 2, l: 4, gf: 41, ga: 18, gd: '+23', gdNum: 23, pts: 41 } },
  { pos: 4, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 38, w: 24, d: 5, l: 9, gf: 53, ga: 33, gd: '+20', form: ['L', 'D', 'W', 'L', 'W'], pts: 77, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 14, d: 1, l: 4, gf: 27, ga: 11, gd: '+16', gdNum: 16, pts: 43 }, away: { p: 19, w: 10, d: 4, l: 5, gf: 26, ga: 22, gd: '+4', gdNum: 4, pts: 34 } },
  { pos: 5, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 38, w: 17, d: 11, l: 10, gf: 59, ga: 38, gd: '+21', form: ['L', 'W', 'L', 'W', 'W'], pts: 62, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 10, d: 5, l: 4, gf: 34, ga: 19, gd: '+15', gdNum: 15, pts: 35 }, away: { p: 19, w: 7, d: 6, l: 6, gf: 25, ga: 19, gd: '+6', gdNum: 6, pts: 27 } },
  { pos: 6, code: 'BET', name: 'Real Betis', stadium: 'Benito Villamarín', p: 38, w: 17, d: 10, l: 11, gf: 50, ga: 50, gd: '0', form: ['D', 'W', 'D', 'W', 'W'], pts: 61, zone: 'uel', tagColor: 'text-tertiary', home: { p: 19, w: 10, d: 5, l: 4, gf: 27, ga: 21, gd: '+6', gdNum: 6, pts: 35 }, away: { p: 19, w: 7, d: 5, l: 7, gf: 23, ga: 29, gd: '-6', gdNum: -6, pts: 26 } },
  { pos: 7, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 38, w: 15, d: 13, l: 10, gf: 60, ga: 44, gd: '+16', form: ['W', 'L', 'W', 'W', 'L'], pts: 58, zone: 'uecl', tagColor: 'text-secondary', home: { p: 19, w: 8, d: 6, l: 5, gf: 29, ga: 23, gd: '+6', gdNum: 6, pts: 30 }, away: { p: 19, w: 7, d: 7, l: 5, gf: 31, ga: 21, gd: '+10', gdNum: 10, pts: 28 } },
  { pos: 8, code: 'CEL', name: 'Celta Vigo', stadium: 'Balaídos', p: 38, w: 14, d: 11, l: 13, gf: 55, ga: 57, gd: '-2', form: ['W', 'W', 'W', 'W', 'L'], pts: 53, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 3, l: 7, gf: 30, ga: 30, gd: '0', gdNum: 0, pts: 30 }, away: { p: 19, w: 5, d: 8, l: 6, gf: 25, ga: 27, gd: '-2', gdNum: -2, pts: 23 } },
  { pos: 9, code: 'GRA', name: 'Granada CF', stadium: 'Nuevo Los Cármenes', p: 38, w: 13, d: 7, l: 18, gf: 47, ga: 65, gd: '-18', form: ['L', 'L', 'L', 'L', 'D'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 4, l: 6, gf: 25, ga: 25, gd: '0', gdNum: 0, pts: 31 }, away: { p: 19, w: 4, d: 3, l: 12, gf: 22, ga: 40, gd: '-18', gdNum: -18, pts: 15 } },
  { pos: 10, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 38, w: 11, d: 13, l: 14, gf: 46, ga: 42, gd: '+4', form: ['W', 'D', 'L', 'L', 'L'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 6, l: 5, gf: 29, ga: 19, gd: '+10', gdNum: 10, pts: 30 }, away: { p: 19, w: 3, d: 7, l: 9, gf: 17, ga: 23, gd: '-6', gdNum: -6, pts: 16 } },
  { pos: 11, code: 'OSA', name: 'Osasuna', stadium: 'El Sadar', p: 38, w: 11, d: 11, l: 16, gf: 37, ga: 48, gd: '-11', form: ['L', 'D', 'W', 'L', 'L'], pts: 44, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 5, l: 7, gf: 21, ga: 23, gd: '-2', gdNum: -2, pts: 26 }, away: { p: 19, w: 4, d: 6, l: 9, gf: 16, ga: 25, gd: '-9', gdNum: -9, pts: 18 } },
  { pos: 12, code: 'CAD', name: 'Cadiz', stadium: 'Estadio Ramón de Carranza', p: 38, w: 11, d: 11, l: 16, gf: 36, ga: 58, gd: '-22', form: ['W', 'W', 'L', 'L', 'D'], pts: 44, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 5, d: 5, l: 9, gf: 17, ga: 30, gd: '-13', gdNum: -13, pts: 20 }, away: { p: 19, w: 6, d: 6, l: 7, gf: 19, ga: 28, gd: '-9', gdNum: -9, pts: 24 } },
  { pos: 13, code: 'VAL', name: 'Valencia', stadium: 'Mestalla', p: 38, w: 10, d: 13, l: 15, gf: 50, ga: 53, gd: '-3', form: ['L', 'W', 'L', 'W', 'D'], pts: 43, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 7, l: 4, gf: 34, ga: 23, gd: '+11', gdNum: 11, pts: 31 }, away: { p: 19, w: 2, d: 6, l: 11, gf: 16, ga: 30, gd: '-14', gdNum: -14, pts: 12 } },
  { pos: 14, code: 'LEV', name: 'Levante', stadium: 'Ciutat de València', p: 38, w: 9, d: 14, l: 15, gf: 46, ga: 57, gd: '-11', form: ['L', 'D', 'D', 'L', 'D'], pts: 41, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 5, d: 9, l: 5, gf: 27, ga: 30, gd: '-3', gdNum: -3, pts: 24 }, away: { p: 19, w: 4, d: 5, l: 10, gf: 19, ga: 27, gd: '-8', gdNum: -8, pts: 17 } },
  { pos: 15, code: 'GET', name: 'Getafe', stadium: 'Coliseum Alfonso Pérez', p: 38, w: 9, d: 11, l: 18, gf: 28, ga: 43, gd: '-15', form: ['L', 'L', 'L', 'W', 'D'], pts: 38, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 6, l: 7, gf: 15, ga: 13, gd: '+2', gdNum: 2, pts: 24 }, away: { p: 19, w: 3, d: 5, l: 11, gf: 13, ga: 30, gd: '-17', gdNum: -17, pts: 14 } },
  { pos: 16, code: 'ALA', name: 'Alaves', stadium: 'Mendizorrotza', p: 38, w: 9, d: 11, l: 18, gf: 36, ga: 57, gd: '-21', form: ['L', 'D', 'W', 'W', 'L'], pts: 38, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 6, l: 7, gf: 21, ga: 25, gd: '-4', gdNum: -4, pts: 24 }, away: { p: 19, w: 3, d: 5, l: 11, gf: 15, ga: 32, gd: '-17', gdNum: -17, pts: 14 } },
  { pos: 17, code: 'ELC', name: 'Elche', stadium: 'Martínez Valero', p: 38, w: 8, d: 12, l: 18, gf: 34, ga: 55, gd: '-21', form: ['L', 'L', 'L', 'W', 'W'], pts: 36, zone: 'mid', tagColor: 'text-secondary', home: { p: 19, w: 5, d: 8, l: 6, gf: 18, ga: 23, gd: '-5', gdNum: -5, pts: 23 }, away: { p: 19, w: 3, d: 4, l: 12, gf: 16, ga: 32, gd: '-16', gdNum: -16, pts: 13 } },
  { pos: 18, code: 'HUE', name: 'Huesca', stadium: 'El Alcoraz', p: 38, w: 7, d: 13, l: 18, gf: 34, ga: 53, gd: '-19', form: ['W', 'L', 'W', 'L', 'D'], pts: 34, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 5, d: 7, l: 7, gf: 17, ga: 21, gd: '-4', gdNum: -4, pts: 22 }, away: { p: 19, w: 2, d: 6, l: 11, gf: 17, ga: 32, gd: '-15', gdNum: -15, pts: 12 } },
  { pos: 19, code: 'VLL', name: 'Valladolid', stadium: 'José Zorrilla', p: 38, w: 5, d: 16, l: 17, gf: 34, ga: 57, gd: '-23', form: ['D', 'L', 'L', 'L', 'L'], pts: 31, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 3, d: 7, l: 9, gf: 19, ga: 30, gd: '-11', gdNum: -11, pts: 16 }, away: { p: 19, w: 2, d: 9, l: 8, gf: 15, ga: 27, gd: '-12', gdNum: -12, pts: 15 } },
  { pos: 20, code: 'EIB', name: 'Eibar', stadium: 'Ipurua', p: 38, w: 6, d: 12, l: 20, gf: 29, ga: 52, gd: '-23', form: ['W', 'W', 'D', 'L', 'L'], pts: 30, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 2, d: 7, l: 10, gf: 12, ga: 21, gd: '-9', gdNum: -9, pts: 13 }, away: { p: 19, w: 4, d: 5, l: 10, gf: 17, ga: 31, gd: '-14', gdNum: -14, pts: 17 } },
];

const DEFAULT_STANDINGS_2026_27: StandingsRow[] = [
  { pos: 1, code: 'FCB', name: 'Barcelona', stadium: 'Spotify Camp Nou', p: 7, w: 7, d: 0, l: 0, gf: 31, ga: 7, gd: '+24', form: ['W', 'W', 'W', 'W', 'W'], pts: 21, zone: 'ucl', tagColor: 'text-primary', home: { p: 3, w: 3, d: 0, l: 0, gf: 14, ga: 4, gd: '+10', gdNum: 10, pts: 9 }, away: { p: 4, w: 4, d: 0, l: 0, gf: 17, ga: 3, gd: '+14', gdNum: 14, pts: 12 } },
  { pos: 2, code: 'ATM', name: 'Atletico Madrid', stadium: 'Riyadh Air Metropolitano', p: 7, w: 5, d: 1, l: 1, gf: 16, ga: 7, gd: '+9', form: ['W', 'L', 'W', 'W', 'W'], pts: 16, zone: 'ucl', tagColor: 'text-primary', home: { p: 4, w: 3, d: 1, l: 0, gf: 10, ga: 3, gd: '+7', gdNum: 7, pts: 10 }, away: { p: 3, w: 2, d: 0, l: 1, gf: 6, ga: 4, gd: '+2', gdNum: 2, pts: 6 } },
  { pos: 3, code: 'BET', name: 'Real Betis', stadium: 'Estadio de La Cartuja', p: 7, w: 5, d: 1, l: 1, gf: 9, ga: 7, gd: '+2', form: ['L', 'W', 'W', 'W', 'D'], pts: 16, zone: 'ucl', tagColor: 'text-primary', home: { p: 3, w: 3, d: 0, l: 0, gf: 3, ga: 0, gd: '+3', gdNum: 3, pts: 9 }, away: { p: 4, w: 2, d: 1, l: 1, gf: 6, ga: 7, gd: '-1', gdNum: -1, pts: 7 } },
  { pos: 4, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 7, w: 5, d: 0, l: 2, gf: 18, ga: 8, gd: '+10', form: ['W', 'L', 'W', 'W', 'L'], pts: 15, zone: 'ucl', tagColor: 'text-primary', home: { p: 3, w: 3, d: 0, l: 0, gf: 12, ga: 2, gd: '+10', gdNum: 10, pts: 9 }, away: { p: 4, w: 2, d: 0, l: 2, gf: 6, ga: 6, gd: '0', gdNum: 0, pts: 6 } },
  { pos: 5, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 7, w: 4, d: 1, l: 2, gf: 10, ga: 9, gd: '+1', form: ['L', 'D', 'W', 'W', 'L'], pts: 13, zone: 'uel', tagColor: 'text-secondary', home: { p: 4, w: 2, d: 0, l: 2, gf: 5, ga: 7, gd: '-2', gdNum: -2, pts: 6 }, away: { p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 2, gd: '+3', gdNum: 3, pts: 7 } },
  { pos: 6, code: 'ALA', name: 'Alaves', stadium: 'Estadio Mendizorrotza', p: 7, w: 3, d: 2, l: 2, gf: 11, ga: 6, gd: '+5', form: ['W', 'W', 'L', 'L', 'D'], pts: 11, zone: 'uel', tagColor: 'text-secondary', home: { p: 4, w: 3, d: 0, l: 1, gf: 9, ga: 3, gd: '+6', gdNum: 6, pts: 9 }, away: { p: 3, w: 0, d: 2, l: 1, gf: 2, ga: 3, gd: '-1', gdNum: -1, pts: 2 } },
  { pos: 7, code: 'DEP', name: 'Deportivo La Coruna', stadium: 'Estadio Riazor', p: 7, w: 2, d: 4, l: 1, gf: 10, ga: 8, gd: '+2', form: ['W', 'W', 'D', 'L', 'D'], pts: 10, zone: 'uecl', tagColor: 'text-primary-fixed', home: { p: 4, w: 1, d: 2, l: 1, gf: 5, ga: 4, gd: '+1', gdNum: 1, pts: 5 }, away: { p: 3, w: 1, d: 2, l: 0, gf: 5, ga: 4, gd: '+1', gdNum: 1, pts: 5 } },
  { pos: 8, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 7, w: 3, d: 1, l: 3, gf: 9, ga: 13, gd: '-4', form: ['W', 'D', 'W', 'L', 'W'], pts: 10, zone: 'mid', tagColor: 'text-on-surface', home: { p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 4, gd: '-2', gdNum: -2, pts: 4 }, away: { p: 4, w: 2, d: 0, l: 2, gf: 7, ga: 9, gd: '-2', gdNum: -2, pts: 6 } },
  { pos: 9, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 7, w: 2, d: 2, l: 3, gf: 13, ga: 12, gd: '+1', form: ['L', 'L', 'L', 'W', 'W'], pts: 8, zone: 'mid', tagColor: 'text-on-surface', home: { p: 3, w: 1, d: 0, l: 2, gf: 6, ga: 6, gd: '0', gdNum: 0, pts: 3 }, away: { p: 4, w: 1, d: 2, l: 1, gf: 7, ga: 6, gd: '+1', gdNum: 1, pts: 5 } },
  { pos: 10, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 6, w: 2, d: 2, l: 2, gf: 7, ga: 6, gd: '+1', form: ['L', 'W', 'W', 'D', 'D'], pts: 8, zone: 'mid', tagColor: 'text-on-surface', home: { p: 4, w: 1, d: 2, l: 1, gf: 5, ga: 4, gd: '+1', gdNum: 1, pts: 5 }, away: { p: 2, w: 1, d: 0, l: 1, gf: 2, ga: 2, gd: '0', gdNum: 0, pts: 3 } },
  { pos: 11, code: 'GET', name: 'Getafe', stadium: 'Coliseum', p: 7, w: 2, d: 2, l: 3, gf: 4, ga: 7, gd: '-3', form: ['L', 'D', 'D', 'L', 'W'], pts: 8, zone: 'mid', tagColor: 'text-on-surface', home: { p: 4, w: 2, d: 2, l: 0, gf: 4, ga: 2, gd: '+2', gdNum: 2, pts: 8 }, away: { p: 3, w: 0, d: 0, l: 3, gf: 0, ga: 5, gd: '-5', gdNum: -5, pts: 0 } },
  { pos: 12, code: 'RAY', name: 'Rayo Vallecano', stadium: 'Campo de Futbol de Vallecas', p: 7, w: 2, d: 2, l: 3, gf: 11, ga: 16, gd: '-5', form: ['L', 'W', 'L', 'W', 'D'], pts: 8, zone: 'mid', tagColor: 'text-on-surface', home: { p: 3, w: 2, d: 1, l: 0, gf: 6, ga: 4, gd: '+2', gdNum: 2, pts: 7 }, away: { p: 4, w: 0, d: 1, l: 3, gf: 5, ga: 12, gd: '-7', gdNum: -7, pts: 1 } },
  { pos: 13, code: 'OSA', name: 'Osasuna', stadium: 'Estadio El Sadar', p: 7, w: 2, d: 2, l: 3, gf: 6, ga: 13, gd: '-7', form: ['W', 'L', 'L', 'L', 'D'], pts: 8, zone: 'mid', tagColor: 'text-on-surface', home: { p: 4, w: 1, d: 2, l: 1, gf: 2, ga: 3, gd: '-1', gdNum: -1, pts: 5 }, away: { p: 3, w: 1, d: 0, l: 2, gf: 4, ga: 10, gd: '-6', gdNum: -6, pts: 3 } },
  { pos: 14, code: 'CEL', name: 'Celta Vigo', stadium: 'Municipal de Balaídos', p: 7, w: 1, d: 4, l: 2, gf: 8, ga: 6, gd: '+2', form: ['L', 'D', 'D', 'D', 'W'], pts: 7, zone: 'mid', tagColor: 'text-on-surface', home: { p: 4, w: 1, d: 1, l: 2, gf: 7, ga: 5, gd: '+2', gdNum: 2, pts: 4 }, away: { p: 3, w: 0, d: 3, l: 0, gf: 1, ga: 1, gd: '0', gdNum: 0, pts: 3 } },
  { pos: 15, code: 'ESP', name: 'Espanyol', stadium: 'RCDE Stadium', p: 7, w: 2, d: 1, l: 4, gf: 10, ga: 10, gd: '0', form: ['L', 'D', 'W', 'L', 'L'], pts: 7, zone: 'mid', tagColor: 'text-on-surface', home: { p: 4, w: 1, d: 1, l: 2, gf: 6, ga: 6, gd: '0', gdNum: 0, pts: 4 }, away: { p: 3, w: 1, d: 0, l: 2, gf: 4, ga: 4, gd: '0', gdNum: 0, pts: 3 } },
  { pos: 16, code: 'RAC', name: 'Racing Santander', stadium: 'El Sardinero', p: 7, w: 2, d: 1, l: 4, gf: 11, ga: 21, gd: '-10', form: ['W', 'L', 'W', 'L', 'L'], pts: 7, zone: 'mid', tagColor: 'text-on-surface', home: { p: 3, w: 2, d: 1, l: 0, gf: 7, ga: 5, gd: '+2', gdNum: 2, pts: 7 }, away: { p: 4, w: 0, d: 0, l: 4, gf: 4, ga: 16, gd: '-12', gdNum: -12, pts: 0 } },
  { pos: 17, code: 'LEV', name: 'Levante', stadium: 'Estadio Ciudad de Valencia', p: 6, w: 1, d: 2, l: 3, gf: 8, ga: 12, gd: '-4', form: ['D', 'W', 'D', 'L', 'L'], pts: 5, zone: 'mid', tagColor: 'text-on-surface', home: { p: 2, w: 1, d: 0, l: 1, gf: 7, ga: 6, gd: '+1', gdNum: 1, pts: 3 }, away: { p: 4, w: 0, d: 2, l: 2, gf: 1, ga: 6, gd: '-5', gdNum: -5, pts: 2 } },
  { pos: 18, code: 'ELC', name: 'Elche', stadium: 'Estadio Manuel Martínez Valero', p: 7, w: 1, d: 2, l: 4, gf: 11, ga: 17, gd: '-6', form: ['L', 'L', 'D', 'L', 'W'], pts: 5, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 3, w: 0, d: 0, l: 3, gf: 4, ga: 11, gd: '-7', gdNum: -7, pts: 0 }, away: { p: 4, w: 1, d: 2, l: 1, gf: 7, ga: 6, gd: '+1', gdNum: 1, pts: 5 } },
  { pos: 19, code: 'VAL', name: 'Valencia', stadium: 'Estadio de Mestalla', p: 7, w: 1, d: 1, l: 5, gf: 4, ga: 13, gd: '-9', form: ['L', 'L', 'L', 'W', 'L'], pts: 4, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 4, w: 0, d: 1, l: 3, gf: 2, ga: 9, gd: '-7', gdNum: -7, pts: 1 }, away: { p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: '-2', gdNum: -2, pts: 3 } },
  { pos: 20, code: 'MAL', name: 'Malaga', stadium: 'Estadio La Rosaleda', p: 7, w: 0, d: 3, l: 4, gf: 3, ga: 12, gd: '-9', form: ['L', 'D', 'D', 'L', 'L'], pts: 3, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 3, w: 0, d: 2, l: 1, gf: 2, ga: 4, gd: '-2', gdNum: -2, pts: 2 }, away: { p: 4, w: 0, d: 1, l: 3, gf: 1, ga: 8, gd: '-7', gdNum: -7, pts: 1 } },
];

const DEFAULT_STANDINGS_2025_26: StandingsRow[] = [
  { pos: 1, code: 'FCB', name: 'Barcelona', stadium: 'Spotify Camp Nou', p: 38, w: 31, d: 1, l: 6, gf: 95, ga: 36, gd: '+59', form: ['W', 'W', 'L', 'W', 'L'], pts: 94, zone: 'ucl', tagColor: 'text-tertiary', home: { p: 19, w: 19, d: 0, l: 0, gf: 57, ga: 10, gd: '+47', gdNum: 47, pts: 57 }, away: { p: 19, w: 12, d: 1, l: 6, gf: 38, ga: 26, gd: '+12', gdNum: 12, pts: 37 } },
  { pos: 2, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 38, w: 27, d: 5, l: 6, gf: 77, ga: 35, gd: '+42', form: ['W', 'L', 'W', 'W', 'W'], pts: 86, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 16, d: 1, l: 2, gf: 45, ga: 16, gd: '+29', gdNum: 29, pts: 49 }, away: { p: 19, w: 11, d: 4, l: 4, gf: 32, ga: 19, gd: '+13', gdNum: 13, pts: 37 } },
  { pos: 3, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 38, w: 22, d: 6, l: 10, gf: 72, ga: 46, gd: '+26', form: ['W', 'D', 'L', 'L', 'W'], pts: 72, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 15, d: 1, l: 3, gf: 48, ga: 19, gd: '+29', gdNum: 29, pts: 46 }, away: { p: 19, w: 7, d: 5, l: 7, gf: 24, ga: 27, gd: '-3', gdNum: -3, pts: 26 } },
  { pos: 4, code: 'ATM', name: 'Atletico Madrid', stadium: 'Riyadh Air Metropolitano', p: 38, w: 21, d: 6, l: 11, gf: 62, ga: 44, gd: '+18', form: ['W', 'L', 'W', 'W', 'L'], pts: 69, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 15, d: 1, l: 3, gf: 39, ga: 17, gd: '+22', gdNum: 22, pts: 46 }, away: { p: 19, w: 6, d: 5, l: 8, gf: 23, ga: 27, gd: '-4', gdNum: -4, pts: 23 } },
  { pos: 5, code: 'BET', name: 'Real Betis', stadium: 'Estadio de La Cartuja', p: 38, w: 15, d: 15, l: 8, gf: 59, ga: 48, gd: '+11', form: ['W', 'D', 'W', 'L', 'W'], pts: 60, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 10, d: 6, l: 3, gf: 34, ga: 19, gd: '+15', gdNum: 15, pts: 36 }, away: { p: 19, w: 5, d: 9, l: 5, gf: 25, ga: 29, gd: '-4', gdNum: -4, pts: 24 } },
  { pos: 6, code: 'CEL', name: 'Celta Vigo', stadium: 'Municipal de Balaídos', p: 38, w: 14, d: 12, l: 12, gf: 53, ga: 48, gd: '+5', form: ['W', 'W', 'L', 'D', 'W'], pts: 54, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 6, d: 5, l: 8, gf: 29, ga: 28, gd: '+1', gdNum: 1, pts: 23 }, away: { p: 19, w: 8, d: 7, l: 4, gf: 24, ga: 20, gd: '+4', gdNum: 4, pts: 31 } },
  { pos: 7, code: 'GET', name: 'Getafe', stadium: 'Coliseum', p: 38, w: 15, d: 6, l: 17, gf: 32, ga: 38, gd: '-6', form: ['L', 'D', 'W', 'L', 'W'], pts: 51, zone: 'uecl', tagColor: 'text-primary-fixed', home: { p: 19, w: 8, d: 3, l: 8, gf: 18, ga: 16, gd: '+2', gdNum: 2, pts: 27 }, away: { p: 19, w: 7, d: 3, l: 9, gf: 14, ga: 22, gd: '-8', gdNum: -8, pts: 24 } },
  { pos: 8, code: 'RAY', name: 'Rayo Vallecano', stadium: 'Campo de Futbol de Vallecas', p: 38, w: 12, d: 14, l: 12, gf: 41, ga: 44, gd: '-3', form: ['W', 'D', 'D', 'W', 'W'], pts: 50, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 10, l: 2, gf: 24, ga: 15, gd: '+9', gdNum: 9, pts: 31 }, away: { p: 19, w: 5, d: 4, l: 10, gf: 17, ga: 29, gd: '-12', gdNum: -12, pts: 19 } },
  { pos: 9, code: 'VAL', name: 'Valencia', stadium: 'Estadio de Mestalla', p: 38, w: 13, d: 10, l: 15, gf: 46, ga: 55, gd: '-9', form: ['L', 'W', 'D', 'W', 'W'], pts: 49, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 6, l: 5, gf: 27, ga: 23, pts: 30, gdNum: 4, gd: '+4' }, away: { p: 19, w: 5, d: 4, l: 10, gf: 19, ga: 32, pts: 19, gdNum: -13, gd: '-13' } },
  { pos: 10, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 38, w: 11, d: 13, l: 14, gf: 59, ga: 61, gd: '-2', form: ['L', 'D', 'D', 'L', 'D'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 5, l: 6, gf: 37, ga: 31, pts: 29, gdNum: 6, gd: '+6' }, away: { p: 19, w: 3, d: 8, l: 8, gf: 22, ga: 30, pts: 17, gdNum: -8, gd: '-8' } },
  { pos: 11, code: 'ESP', name: 'Espanyol', stadium: 'RCDE Stadium', p: 38, w: 12, d: 10, l: 16, gf: 43, ga: 55, gd: '-12', form: ['L', 'L', 'W', 'W', 'D'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 5, l: 7, gf: 21, ga: 24, pts: 26, gdNum: -3, gd: '-3' }, away: { p: 19, w: 5, d: 5, l: 9, gf: 22, ga: 31, pts: 20, gdNum: -9, gd: '-9' } },
  { pos: 12, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 38, w: 13, d: 6, l: 19, gf: 43, ga: 58, gd: '-15', form: ['W', 'L', 'L', 'D', 'L'], pts: 45, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 3, l: 7, gf: 22, ga: 21, pts: 30, gdNum: 1, gd: '+1' }, away: { p: 19, w: 4, d: 3, l: 12, gf: 21, ga: 37, pts: 15, gdNum: -16, gd: '-16' } },
  { pos: 13, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 38, w: 12, d: 7, l: 19, gf: 46, ga: 60, gd: '-14', form: ['W', 'W', 'W', 'L', 'L'], pts: 43, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 4, l: 8, gf: 24, ga: 25, pts: 25, gdNum: -1, gd: '-1' }, away: { p: 19, w: 5, d: 3, l: 11, gf: 22, ga: 35, pts: 18, gdNum: -13, gd: '-13' } },
  { pos: 14, code: 'ALA', name: 'Alaves', stadium: 'Estadio Mendizorrotza', p: 38, w: 11, d: 10, l: 17, gf: 44, ga: 56, gd: '-12', form: ['L', 'D', 'W', 'W', 'L'], pts: 43, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 6, l: 6, gf: 25, ga: 25, pts: 27, gdNum: 0, gd: '0' }, away: { p: 19, w: 4, d: 4, l: 11, gf: 19, ga: 31, pts: 16, gdNum: -12, gd: '-12' } },
  { pos: 15, code: 'ELC', name: 'Elche', stadium: 'Estadio Manuel Martínez Valero', p: 38, w: 10, d: 13, l: 15, gf: 49, ga: 57, gd: '-8', form: ['L', 'D', 'L', 'W', 'D'], pts: 43, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 8, l: 2, gf: 30, ga: 19, pts: 35, gdNum: 11, gd: '+11' }, away: { p: 19, w: 1, d: 5, l: 13, gf: 19, ga: 38, pts: 8, gdNum: -19, gd: '-19' } },
  { pos: 16, code: 'LEV', name: 'Levante', stadium: 'Estadio Ciudad de Valencia', p: 38, w: 11, d: 9, l: 18, gf: 47, ga: 61, gd: '-14', form: ['L', 'W', 'W', 'W', 'L'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 5, l: 7, gf: 26, ga: 28, pts: 26, gdNum: -2, gd: '-2' }, away: { p: 19, w: 4, d: 4, l: 11, gf: 21, ga: 33, pts: 16, gdNum: -12, gd: '-12' } },
  { pos: 17, code: 'OSA', name: 'Osasuna', stadium: 'Estadio El Sadar', p: 38, w: 11, d: 9, l: 18, gf: 44, ga: 50, gd: '-6', form: ['L', 'L', 'L', 'L', 'L'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 5, l: 5, gf: 31, ga: 24, pts: 32, gdNum: 7, gd: '+7' }, away: { p: 19, w: 2, d: 4, l: 13, gf: 13, ga: 26, pts: 10, gdNum: -13, gd: '-13' } },
  { pos: 18, code: 'MLL', name: 'Mallorca', stadium: 'Estadi Mallorca Son Moix', p: 38, w: 11, d: 9, l: 18, gf: 47, ga: 57, gd: '-10', form: ['W', 'D', 'L', 'L', 'W'], pts: 42, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 9, d: 6, l: 4, gf: 31, ga: 21, pts: 33, gdNum: 10, gd: '+10' }, away: { p: 19, w: 2, d: 3, l: 14, gf: 16, ga: 36, pts: 9, gdNum: -20, gd: '-20' } },
  { pos: 19, code: 'GIR', name: 'Girona', stadium: 'Estadi Montilivi', p: 38, w: 9, d: 14, l: 15, gf: 39, ga: 55, gd: '-16', form: ['L', 'D', 'D', 'L', 'D'], pts: 41, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 6, d: 6, l: 7, gf: 21, ga: 27, pts: 24, gdNum: -6, gd: '-6' }, away: { p: 19, w: 3, d: 8, l: 8, gf: 18, ga: 28, pts: 17, gdNum: -10, gd: '-10' } },
  { pos: 20, code: 'OVI', name: 'Oviedo', stadium: 'Estadio Nuevo Carlos Tartiere', p: 38, w: 6, d: 11, l: 21, gf: 26, ga: 60, gd: '-34', form: ['L', 'D', 'L', 'L', 'L'], pts: 29, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 4, d: 7, l: 8, gf: 9, ga: 18, pts: 19, gdNum: -9, gd: '-9' }, away: { p: 19, w: 2, d: 4, l: 13, gf: 17, ga: 42, pts: 10, gdNum: -25, gd: '-25' } },
];

const DEFAULT_STANDINGS_2024_25: StandingsRow[] = [
  { pos: 1, code: 'FCB', name: 'Barcelona', stadium: 'Spotify Camp Nou', p: 38, w: 28, d: 4, l: 6, gf: 102, ga: 39, gd: '+63', form: ['W', 'W', 'W', 'L', 'W'], pts: 88, zone: 'ucl', tagColor: 'text-tertiary', home: { p: 19, w: 14, d: 1, l: 4, gf: 52, ga: 20, gd: '+32', gdNum: 32, pts: 43 }, away: { p: 19, w: 14, d: 3, l: 2, gf: 50, ga: 19, gd: '+31', gdNum: 31, pts: 45 } },
  { pos: 2, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 38, w: 26, d: 6, l: 6, gf: 78, ga: 38, gd: '+40', form: ['W', 'L', 'W', 'W', 'W'], pts: 84, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 16, d: 1, l: 2, gf: 45, ga: 19, gd: '+26', gdNum: 26, pts: 49 }, away: { p: 19, w: 10, d: 5, l: 4, gf: 33, ga: 19, gd: '+14', gdNum: 14, pts: 35 } },
  { pos: 3, code: 'ATM', name: 'Atletico Madrid', stadium: 'Riyadh Air Metropolitano', p: 38, w: 22, d: 10, l: 6, gf: 68, ga: 30, gd: '+38', form: ['D', 'W', 'L', 'W', 'W'], pts: 76, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 14, d: 4, l: 1, gf: 42, ga: 15, gd: '+27', gdNum: 27, pts: 46 }, away: { p: 19, w: 8, d: 6, l: 5, gf: 26, ga: 15, gd: '+11', gdNum: 11, pts: 30 } },
  { pos: 4, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 38, w: 19, d: 13, l: 6, gf: 54, ga: 29, gd: '+25', form: ['D', 'W', 'W', 'W', 'L'], pts: 70, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 11, d: 6, l: 2, gf: 32, ga: 13, gd: '+19', gdNum: 19, pts: 39 }, away: { p: 19, w: 8, d: 7, l: 4, gf: 22, ga: 16, gd: '+6', gdNum: 6, pts: 31 } },
  { pos: 5, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 38, w: 20, d: 10, l: 8, gf: 71, ga: 51, gd: '+20', form: ['W', 'W', 'W', 'W', 'W'], pts: 70, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 9, d: 7, l: 3, gf: 43, ga: 27, gd: '+16', gdNum: 16, pts: 34 }, away: { p: 19, w: 11, d: 3, l: 5, gf: 28, ga: 24, gd: '+4', gdNum: 4, pts: 36 } },
  { pos: 6, code: 'BET', name: 'Real Betis', stadium: 'Benito Villamarín', p: 38, w: 16, d: 12, l: 10, gf: 57, ga: 50, gd: '+7', form: ['W', 'D', 'D', 'L', 'D'], pts: 60, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 9, d: 7, l: 3, gf: 32, ga: 21, gd: '+11', gdNum: 11, pts: 34 }, away: { p: 19, w: 7, d: 5, l: 7, gf: 25, ga: 29, gd: '-4', gdNum: -4, pts: 26 } },
  { pos: 7, code: 'CEL', name: 'Celta Vigo', stadium: 'Abanca-Balaídos', p: 38, w: 16, d: 7, l: 15, gf: 59, ga: 57, gd: '+2', form: ['L', 'W', 'W', 'L', 'W'], pts: 55, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 11, d: 3, l: 5, gf: 32, ga: 21, gd: '+11', gdNum: 11, pts: 36 }, away: { p: 19, w: 5, d: 4, l: 10, gf: 27, ga: 36, gd: '-9', gdNum: -9, pts: 19 } },
  { pos: 8, code: 'RAY', name: 'Rayo Vallecano', stadium: 'Campo de Fútbol de Vallecas', p: 38, w: 13, d: 13, l: 12, gf: 41, ga: 45, gd: '-4', form: ['W', 'W', 'D', 'W', 'D'], pts: 52, zone: 'uecl', tagColor: 'text-primary-fixed', home: { p: 19, w: 6, d: 8, l: 5, gf: 24, ga: 26, gd: '-2', gdNum: -2, pts: 26 }, away: { p: 19, w: 7, d: 5, l: 7, gf: 17, ga: 19, gd: '-2', gdNum: -2, pts: 26 } },
  { pos: 9, code: 'OSA', name: 'Osasuna', stadium: 'El Sadar', p: 38, w: 12, d: 16, l: 10, gf: 48, ga: 52, gd: '-4', form: ['L', 'D', 'W', 'W', 'D'], pts: 52, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 10, d: 6, l: 3, gf: 33, ga: 23, gd: '+10', gdNum: 10, pts: 36 }, away: { p: 19, w: 2, d: 10, l: 7, gf: 15, ga: 29, gd: '-14', gdNum: -14, pts: 16 } },
  { pos: 10, code: 'MLL', name: 'Mallorca', stadium: 'Son Moix', p: 38, w: 13, d: 9, l: 16, gf: 35, ga: 44, gd: '-9', form: ['L', 'W', 'L', 'L', 'D'], pts: 48, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 6, l: 6, gf: 20, ga: 21, gd: '-1', gdNum: -1, pts: 27 }, away: { p: 19, w: 6, d: 3, l: 10, gf: 15, ga: 23, gd: '-8', gdNum: -8, pts: 21 } },
  { pos: 11, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 38, w: 13, d: 7, l: 18, gf: 35, ga: 46, gd: '-11', form: ['D', 'L', 'L', 'W', 'L'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 3, l: 8, gf: 20, ga: 20, gd: '0', gdNum: 0, pts: 27 }, away: { p: 19, w: 5, d: 4, l: 10, gf: 15, ga: 26, gd: '-11', gdNum: -11, pts: 19 } },
  { pos: 12, code: 'VAL', name: 'Valencia', stadium: 'Mestalla', p: 38, w: 11, d: 13, l: 14, gf: 44, ga: 54, gd: '-10', form: ['W', 'W', 'L', 'L', 'D'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 4, l: 6, gf: 26, ga: 20, gd: '+6', gdNum: 6, pts: 31 }, away: { p: 19, w: 2, d: 9, l: 8, gf: 18, ga: 34, gd: '-16', gdNum: -16, pts: 15 } },
  { pos: 13, code: 'GET', name: 'Getafe', stadium: 'Coliseum', p: 38, w: 11, d: 9, l: 18, gf: 34, ga: 39, gd: '-5', form: ['L', 'L', 'L', 'W', 'L'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 4, d: 7, l: 8, gf: 15, ga: 19, gd: '-4', gdNum: -4, pts: 19 }, away: { p: 19, w: 7, d: 2, l: 10, gf: 19, ga: 20, gd: '-1', gdNum: -1, pts: 23 } },
  { pos: 14, code: 'ESP', name: 'Espanyol', stadium: 'RCDE Stadium', p: 38, w: 11, d: 9, l: 18, gf: 40, ga: 51, gd: '-11', form: ['L', 'L', 'L', 'L', 'W'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 6, l: 5, gf: 23, ga: 20, gd: '+3', gdNum: 3, pts: 30 }, away: { p: 19, w: 3, d: 3, l: 13, gf: 17, ga: 31, gd: '-14', gdNum: -14, pts: 12 } },
  { pos: 15, code: 'ALA', name: 'Alaves', stadium: 'Mendizorroza', p: 38, w: 10, d: 12, l: 16, gf: 38, ga: 48, gd: '-10', form: ['D', 'L', 'W', 'W', 'D'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 6, l: 7, gf: 14, ga: 17, gd: '-3', gdNum: -3, pts: 24 }, away: { p: 19, w: 4, d: 6, l: 9, gf: 24, ga: 31, gd: '-7', gdNum: -7, pts: 18 } },
  { pos: 16, code: 'GIR', name: 'Girona', stadium: 'Estadi Montilivi', p: 38, w: 11, d: 8, l: 19, gf: 44, ga: 60, gd: '-16', form: ['W', 'L', 'W', 'L', 'L'], pts: 41, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 3, l: 9, gf: 27, ga: 30, gd: '-3', gdNum: -3, pts: 24 }, away: { p: 19, w: 4, d: 5, l: 10, gf: 17, ga: 30, gd: '-13', gdNum: -13, pts: 17 } },
  { pos: 17, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 38, w: 10, d: 11, l: 17, gf: 42, ga: 55, gd: '-13', form: ['D', 'L', 'W', 'L', 'L'], pts: 41, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 6, l: 7, gf: 17, ga: 23, gd: '-6', gdNum: -6, pts: 24 }, away: { p: 19, w: 4, d: 5, l: 10, gf: 25, ga: 32, gd: '-7', gdNum: -7, pts: 17 } },
  { pos: 18, code: 'LEG', name: 'Leganes', stadium: 'Estadio Municipal Butarque', p: 38, w: 9, d: 13, l: 16, gf: 39, ga: 56, gd: '-17', form: ['D', 'W', 'L', 'W', 'W'], pts: 40, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 7, d: 4, l: 8, gf: 23, ga: 27, gd: '-4', gdNum: -4, pts: 25 }, away: { p: 19, w: 2, d: 9, l: 8, gf: 16, ga: 29, gd: '-13', gdNum: -13, pts: 15 } },
  { pos: 19, code: 'LPA', name: 'Las Palmas', stadium: 'Gran Canaria', p: 38, w: 8, d: 8, l: 22, gf: 40, ga: 61, gd: '-21', form: ['L', 'L', 'L', 'L', 'L'], pts: 32, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 4, d: 5, l: 10, gf: 21, ga: 29, gd: '-8', gdNum: -8, pts: 17 }, away: { p: 19, w: 4, d: 3, l: 12, gf: 19, ga: 32, gd: '-13', gdNum: -13, pts: 15 } },
  { pos: 20, code: 'VLL', name: 'Valladolid', stadium: 'José Zorrilla', p: 38, w: 4, d: 4, l: 30, gf: 26, ga: 90, gd: '-64', form: ['L', 'L', 'L', 'L', 'L'], pts: 16, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 3, d: 4, l: 12, gf: 11, ga: 32, gd: '-21', gdNum: -21, pts: 13 }, away: { p: 19, w: 1, d: 0, l: 18, gf: 15, ga: 58, gd: '-43', gdNum: -43, pts: 3 } },
];

const DEFAULT_STANDINGS_2023_24: StandingsRow[] = [
  { pos: 1, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 38, w: 29, d: 8, l: 1, gf: 87, ga: 26, gd: '+61', form: ['W', 'W', 'W', 'W', 'D'], pts: 95, zone: 'ucl', tagColor: 'text-tertiary', home: { p: 19, w: 16, d: 3, l: 0, gf: 48, ga: 9, gd: '+39', gdNum: 39, pts: 51 }, away: { p: 19, w: 13, d: 5, l: 1, gf: 39, ga: 17, gd: '+22', gdNum: 22, pts: 44 } },
  { pos: 2, code: 'FCB', name: 'Barcelona', stadium: 'Estadi Olímpic Lluís Companys', p: 38, w: 26, d: 7, l: 5, gf: 79, ga: 44, gd: '+35', form: ['L', 'W', 'W', 'W', 'W'], pts: 85, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 15, d: 1, l: 3, gf: 43, ga: 21, gd: '+22', gdNum: 22, pts: 46 }, away: { p: 19, w: 11, d: 6, l: 2, gf: 36, ga: 23, gd: '+13', gdNum: 13, pts: 39 } },
  { pos: 3, code: 'GIR', name: 'Girona', stadium: 'Estadi Montilivi', p: 38, w: 25, d: 6, l: 7, gf: 85, ga: 46, gd: '+39', form: ['W', 'W', 'L', 'W', 'W'], pts: 81, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 15, d: 2, l: 2, gf: 53, ga: 20, gd: '+33', gdNum: 33, pts: 47 }, away: { p: 19, w: 10, d: 4, l: 5, gf: 32, ga: 26, gd: '+6', gdNum: 6, pts: 34 } },
  { pos: 4, code: 'ATM', name: 'Atletico Madrid', stadium: 'Civitas Metropolitano', p: 38, w: 24, d: 4, l: 10, gf: 70, ga: 43, gd: '+27', form: ['W', 'W', 'W', 'L', 'W'], pts: 76, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 16, d: 1, l: 2, gf: 42, ga: 22, gd: '+20', gdNum: 20, pts: 49 }, away: { p: 19, w: 8, d: 3, l: 8, gf: 28, ga: 21, gd: '+7', gdNum: 7, pts: 27 } },
  { pos: 5, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 38, w: 19, d: 11, l: 8, gf: 61, ga: 37, gd: '+24', form: ['W', 'D', 'L', 'W', 'W'], pts: 68, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 12, d: 6, l: 1, gf: 42, ga: 18, gd: '+24', gdNum: 24, pts: 42 }, away: { p: 19, w: 7, d: 5, l: 7, gf: 19, ga: 19, gd: '0', gdNum: 0, pts: 26 } },
  { pos: 6, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 38, w: 16, d: 12, l: 10, gf: 51, ga: 39, gd: '+12', form: ['W', 'L', 'W', 'W', 'L'], pts: 60, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 8, d: 6, l: 5, gf: 26, ga: 20, gd: '+6', gdNum: 6, pts: 30 }, away: { p: 19, w: 8, d: 6, l: 5, gf: 25, ga: 19, gd: '+6', gdNum: 6, pts: 30 } },
  { pos: 7, code: 'BET', name: 'Real Betis', stadium: 'Benito Villamarín', p: 38, w: 14, d: 15, l: 9, gf: 48, ga: 45, gd: '+3', form: ['W', 'D', 'W', 'W', 'L'], pts: 57, zone: 'uecl', tagColor: 'text-primary-fixed', home: { p: 19, w: 9, d: 7, l: 3, gf: 27, ga: 19, gd: '+8', gdNum: 8, pts: 34 }, away: { p: 19, w: 5, d: 8, l: 6, gf: 21, ga: 26, gd: '-5', gdNum: -5, pts: 23 } },
  { pos: 8, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 38, w: 14, d: 11, l: 13, gf: 65, ga: 65, gd: '0', form: ['W', 'L', 'W', 'W', 'D'], pts: 53, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 5, l: 7, gf: 36, ga: 32, gd: '+4', gdNum: 4, pts: 26 }, away: { p: 19, w: 7, d: 6, l: 6, gf: 29, ga: 33, gd: '-4', gdNum: -4, pts: 27 } },
  { pos: 9, code: 'VAL', name: 'Valencia', stadium: 'Mestalla', p: 38, w: 13, d: 10, l: 15, gf: 40, ga: 45, gd: '-5', form: ['L', 'L', 'D', 'L', 'L'], pts: 49, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 6, l: 5, gf: 20, ga: 14, gd: '+6', gdNum: 6, pts: 30 }, away: { p: 19, w: 5, d: 4, l: 10, gf: 20, ga: 31, gd: '-11', gdNum: -11, pts: 19 } },
  { pos: 10, code: 'ALA', name: 'Alaves', stadium: 'Mendizorroza', p: 38, w: 12, d: 10, l: 16, gf: 36, ga: 46, gd: '-10', form: ['W', 'W', 'D', 'L', 'W'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 4, l: 6, gf: 23, ga: 19, gd: '+4', gdNum: 4, pts: 31 }, away: { p: 19, w: 3, d: 6, l: 10, gf: 13, ga: 27, gd: '-14', gdNum: -14, pts: 15 } },
  { pos: 11, code: 'OSA', name: 'Osasuna', stadium: 'El Sadar', p: 38, w: 12, d: 9, l: 17, gf: 45, ga: 56, gd: '-11', form: ['L', 'L', 'D', 'W', 'D'], pts: 45, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 5, l: 8, gf: 19, ga: 26, gd: '-7', gdNum: -7, pts: 23 }, away: { p: 19, w: 6, d: 4, l: 9, gf: 26, ga: 30, gd: '-4', gdNum: -4, pts: 22 } },
  { pos: 12, code: 'GET', name: 'Getafe', stadium: 'Coliseum', p: 38, w: 10, d: 13, l: 15, gf: 42, ga: 54, gd: '-12', form: ['L', 'L', 'L', 'L', 'L'], pts: 43, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 5, l: 6, gf: 20, ga: 22, gd: '-2', gdNum: -2, pts: 29 }, away: { p: 19, w: 2, d: 8, l: 9, gf: 22, ga: 32, gd: '-10', gdNum: -10, pts: 14 } },
  { pos: 13, code: 'CEL', name: 'Celta Vigo', stadium: 'Abanca-Balaídos', p: 38, w: 10, d: 11, l: 17, gf: 46, ga: 57, gd: '-11', form: ['W', 'L', 'W', 'W', 'D'], pts: 41, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 6, l: 7, gf: 21, ga: 23, gd: '-2', gdNum: -2, pts: 24 }, away: { p: 19, w: 4, d: 5, l: 10, gf: 25, ga: 34, gd: '-9', gdNum: -9, pts: 17 } },
  { pos: 14, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 38, w: 10, d: 11, l: 17, gf: 48, ga: 54, gd: '-6', form: ['W', 'L', 'L', 'L', 'L'], pts: 41, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 5, l: 8, gf: 27, ga: 27, gd: '0', gdNum: 0, pts: 23 }, away: { p: 19, w: 4, d: 6, l: 9, gf: 21, ga: 27, gd: '-6', gdNum: -6, pts: 18 } },
  { pos: 15, code: 'MLL', name: 'Mallorca', stadium: 'Son Moix', p: 38, w: 8, d: 16, l: 14, gf: 33, ga: 44, gd: '-11', form: ['L', 'L', 'W', 'D', 'W'], pts: 40, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 8, l: 5, gf: 17, ga: 16, gd: '+1', gdNum: 1, pts: 26 }, away: { p: 19, w: 2, d: 8, l: 9, gf: 16, ga: 28, gd: '-12', gdNum: -12, pts: 14 } },
  { pos: 16, code: 'LPA', name: 'Las Palmas', stadium: 'Gran Canaria', p: 38, w: 10, d: 10, l: 18, gf: 33, ga: 47, gd: '-14', form: ['L', 'L', 'L', 'D', 'D'], pts: 40, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 6, l: 7, gf: 20, ga: 20, gd: '0', gdNum: 0, pts: 24 }, away: { p: 19, w: 4, d: 4, l: 11, gf: 13, ga: 27, gd: '-14', gdNum: -14, pts: 16 } },
  { pos: 17, code: 'RAY', name: 'Rayo Vallecano', stadium: 'Campo de Fútbol de Vallecas', p: 38, w: 8, d: 14, l: 16, gf: 29, ga: 48, gd: '-19', form: ['L', 'L', 'W', 'L', 'L'], pts: 38, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 4, d: 8, l: 7, gf: 18, ga: 26, gd: '-8', gdNum: -8, pts: 20 }, away: { p: 19, w: 4, d: 6, l: 9, gf: 11, ga: 22, gd: '-11', gdNum: -11, pts: 18 } },
  { pos: 18, code: 'CAD', name: 'Cadiz', stadium: 'Nuevo Mirandilla', p: 38, w: 6, d: 15, l: 17, gf: 26, ga: 55, gd: '-29', form: ['L', 'W', 'W', 'D', 'L'], pts: 33, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 5, d: 9, l: 5, gf: 16, ga: 19, gd: '-3', gdNum: -3, pts: 24 }, away: { p: 19, w: 1, d: 6, l: 12, gf: 10, ga: 36, gd: '-26', gdNum: -26, pts: 9 } },
  { pos: 19, code: 'ALM', name: 'Almeria', stadium: 'Power Horse Stadium', p: 38, w: 3, d: 12, l: 23, gf: 43, ga: 75, gd: '-32', form: ['L', 'W', 'L', 'L', 'W'], pts: 21, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 1, d: 8, l: 10, gf: 22, ga: 36, gd: '-14', gdNum: -14, pts: 11 }, away: { p: 19, w: 2, d: 4, l: 13, gf: 21, ga: 39, gd: '-18', gdNum: -18, pts: 10 } },
  { pos: 20, code: 'GRA', name: 'Granada', stadium: 'Nuevo Los Cármenes', p: 38, w: 4, d: 9, l: 25, gf: 38, ga: 79, gd: '-41', form: ['L', 'L', 'L', 'L', 'L'], pts: 21, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 4, d: 6, l: 9, gf: 24, ga: 32, gd: '-8', gdNum: -8, pts: 18 }, away: { p: 19, w: 0, d: 3, l: 16, gf: 14, ga: 47, gd: '-33', gdNum: -33, pts: 3 } },
];

const DEFAULT_STANDINGS_2022_23: StandingsRow[] = [
  { pos: 1, code: 'FCB', name: 'Barcelona', stadium: 'Spotify Camp Nou', p: 38, w: 28, d: 4, l: 6, gf: 70, ga: 20, gd: '+50', form: ['W', 'L', 'L', 'W', 'L'], pts: 88, zone: 'ucl', tagColor: 'text-tertiary', home: { p: 19, w: 15, d: 3, l: 1, gf: 37, ga: 4, gd: '+33', gdNum: 33, pts: 48 }, away: { p: 19, w: 13, d: 1, l: 5, gf: 33, ga: 16, gd: '+17', gdNum: 17, pts: 40 } },
  { pos: 2, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 38, w: 24, d: 6, l: 8, gf: 75, ga: 36, gd: '+39', form: ['W', 'L', 'W', 'W', 'D'], pts: 78, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 13, d: 5, l: 1, gf: 44, ga: 16, gd: '+28', gdNum: 28, pts: 44 }, away: { p: 19, w: 11, d: 1, l: 7, gf: 31, ga: 20, gd: '+11', gdNum: 11, pts: 34 } },
  { pos: 3, code: 'ATM', name: 'Atletico Madrid', stadium: 'Civitas Metropolitano', p: 38, w: 23, d: 8, l: 7, gf: 70, ga: 33, gd: '+37', form: ['L', 'W', 'D', 'W', 'D'], pts: 77, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 13, d: 3, l: 3, gf: 41, ga: 15, gd: '+26', gdNum: 26, pts: 42 }, away: { p: 19, w: 10, d: 5, l: 4, gf: 29, ga: 18, gd: '+11', gdNum: 11, pts: 35 } },
  { pos: 4, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 38, w: 21, d: 8, l: 9, gf: 51, ga: 35, gd: '+16', form: ['D', 'W', 'W', 'L', 'W'], pts: 71, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 11, d: 5, l: 3, gf: 26, ga: 16, gd: '+10', gdNum: 10, pts: 38 }, away: { p: 19, w: 10, d: 3, l: 6, gf: 25, ga: 19, gd: '+6', gdNum: 6, pts: 33 } },
  { pos: 5, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 38, w: 19, d: 7, l: 12, gf: 59, ga: 40, gd: '+19', form: ['W', 'W', 'W', 'L', 'D'], pts: 64, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 12, d: 3, l: 4, gf: 36, ga: 18, gd: '+18', gdNum: 18, pts: 39 }, away: { p: 19, w: 7, d: 4, l: 8, gf: 23, ga: 22, gd: '+1', gdNum: 1, pts: 25 } },
  { pos: 6, code: 'BET', name: 'Real Betis', stadium: 'Benito Villamarín', p: 38, w: 17, d: 9, l: 12, gf: 46, ga: 41, gd: '+5', form: ['W', 'D', 'L', 'W', 'D'], pts: 60, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 9, d: 5, l: 5, gf: 26, ga: 18, gd: '+8', gdNum: 8, pts: 32 }, away: { p: 19, w: 8, d: 4, l: 7, gf: 20, ga: 23, gd: '-3', gdNum: -3, pts: 28 } },
  { pos: 7, code: 'OSA', name: 'Osasuna', stadium: 'El Sadar', p: 38, w: 15, d: 8, l: 15, gf: 37, ga: 42, gd: '-5', form: ['W', 'L', 'W', 'L', 'W'], pts: 53, zone: 'uecl', tagColor: 'text-primary-fixed', home: { p: 19, w: 11, d: 1, l: 7, gf: 24, ga: 21, gd: '+3', gdNum: 3, pts: 34 }, away: { p: 19, w: 4, d: 7, l: 8, gf: 13, ga: 21, gd: '-8', gdNum: -8, pts: 19 } },
  { pos: 8, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 38, w: 14, d: 9, l: 15, gf: 47, ga: 43, gd: '+4', form: ['L', 'W', 'L', 'L', 'D'], pts: 51, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 3, l: 8, gf: 22, ga: 15, gd: '+7', gdNum: 7, pts: 27 }, away: { p: 19, w: 6, d: 6, l: 7, gf: 25, ga: 28, gd: '-3', gdNum: -3, pts: 24 } },
  { pos: 9, code: 'MLL', name: 'Mallorca', stadium: 'Visit Mallorca Estadi', p: 38, w: 14, d: 8, l: 16, gf: 37, ga: 43, gd: '-6', form: ['W', 'L', 'W', 'L', 'W'], pts: 50, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 10, d: 5, l: 4, gf: 22, ga: 12, gd: '+10', gdNum: 10, pts: 35 }, away: { p: 19, w: 4, d: 3, l: 12, gf: 15, ga: 31, gd: '-16', gdNum: -16, pts: 15 } },
  { pos: 10, code: 'GIR', name: 'Girona', stadium: 'Estadi Montilivi', p: 38, w: 13, d: 10, l: 15, gf: 58, ga: 55, gd: '+3', form: ['D', 'L', 'D', 'L', 'L'], pts: 49, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 10, d: 3, l: 6, gf: 35, ga: 26, gd: '+9', gdNum: 9, pts: 33 }, away: { p: 19, w: 3, d: 7, l: 9, gf: 23, ga: 29, gd: '-6', gdNum: -6, pts: 16 } },
  { pos: 11, code: 'RAY', name: 'Rayo Vallecano', stadium: 'Campo de Fútbol de Vallecas', p: 38, w: 13, d: 10, l: 15, gf: 45, ga: 53, gd: '-8', form: ['L', 'L', 'L', 'W', 'L'], pts: 49, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 9, d: 5, l: 5, gf: 28, ga: 22, gd: '+6', gdNum: 6, pts: 32 }, away: { p: 19, w: 4, d: 5, l: 10, gf: 17, ga: 31, gd: '-14', gdNum: -14, pts: 17 } },
  { pos: 12, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 38, w: 13, d: 10, l: 15, gf: 47, ga: 54, gd: '-7', form: ['W', 'D', 'D', 'L', 'L'], pts: 49, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 7, d: 5, l: 7, gf: 24, ga: 25, gd: '-1', gdNum: -1, pts: 26 }, away: { p: 19, w: 6, d: 5, l: 8, gf: 23, ga: 29, gd: '-6', gdNum: -6, pts: 23 } },
  { pos: 13, code: 'CEL', name: 'Celta Vigo', stadium: 'Abanca-Balaídos', p: 38, w: 11, d: 10, l: 17, gf: 43, ga: 53, gd: '-10', form: ['L', 'L', 'D', 'L', 'W'], pts: 43, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 6, l: 6, gf: 26, ga: 21, gd: '+5', gdNum: 5, pts: 27 }, away: { p: 19, w: 4, d: 4, l: 11, gf: 17, ga: 32, gd: '-15', gdNum: -15, pts: 16 } },
  { pos: 14, code: 'CAD', name: 'Cadiz', stadium: 'Nuevo Mirandilla', p: 38, w: 10, d: 12, l: 16, gf: 30, ga: 53, gd: '-23', form: ['L', 'W', 'L', 'W', 'D'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 6, l: 6, gf: 19, ga: 23, gd: '-4', gdNum: -4, pts: 27 }, away: { p: 19, w: 3, d: 6, l: 10, gf: 11, ga: 30, gd: '-19', gdNum: -19, pts: 15 } },
  { pos: 15, code: 'GET', name: 'Getafe', stadium: 'Coliseum Alfonso Pérez', p: 38, w: 10, d: 12, l: 16, gf: 34, ga: 45, gd: '-11', form: ['L', 'D', 'W', 'W', 'D'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 6, l: 6, gf: 21, ga: 20, gd: '+1', gdNum: 1, pts: 27 }, away: { p: 19, w: 3, d: 6, l: 10, gf: 13, ga: 25, gd: '-12', gdNum: -12, pts: 15 } },
  { pos: 16, code: 'VAL', name: 'Valencia', stadium: 'Mestalla', p: 38, w: 11, d: 9, l: 18, gf: 42, ga: 45, gd: '-3', form: ['W', 'W', 'L', 'D', 'D'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 5, l: 6, gf: 27, ga: 19, gd: '+8', gdNum: 8, pts: 29 }, away: { p: 19, w: 3, d: 4, l: 12, gf: 15, ga: 26, gd: '-11', gdNum: -11, pts: 13 } },
  { pos: 17, code: 'ALM', name: 'Almeria', stadium: 'Power Horse Stadium', p: 38, w: 11, d: 8, l: 19, gf: 49, ga: 65, gd: '-16', form: ['L', 'W', 'L', 'D', 'D'], pts: 41, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 10, d: 3, l: 6, gf: 29, ga: 22, gd: '+7', gdNum: 7, pts: 33 }, away: { p: 19, w: 1, d: 5, l: 13, gf: 20, ga: 43, gd: '-23', gdNum: -23, pts: 8 } },
  { pos: 18, code: 'VLL', name: 'Valladolid', stadium: 'José Zorrilla', p: 38, w: 11, d: 7, l: 20, gf: 33, ga: 63, gd: '-30', form: ['L', 'L', 'W', 'D', 'D'], pts: 40, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 8, d: 4, l: 7, gf: 21, ga: 25, gd: '-4', gdNum: -4, pts: 28 }, away: { p: 19, w: 3, d: 3, l: 13, gf: 12, ga: 38, gd: '-26', gdNum: -26, pts: 12 } },
  { pos: 19, code: 'ESP', name: 'Espanyol', stadium: 'RCDE Stadium', p: 38, w: 8, d: 13, l: 17, gf: 52, ga: 69, gd: '-17', form: ['L', 'W', 'D', 'D', 'D'], pts: 37, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 4, d: 7, l: 8, gf: 27, ga: 35, gd: '-8', gdNum: -8, pts: 19 }, away: { p: 19, w: 4, d: 6, l: 9, gf: 25, ga: 34, gd: '-9', gdNum: -9, pts: 18 } },
  { pos: 20, code: 'ELC', name: 'Elche', stadium: 'Martínez Valero', p: 38, w: 5, d: 10, l: 23, gf: 30, ga: 67, gd: '-37', form: ['W', 'D', 'D', 'W', 'D'], pts: 25, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 3, d: 6, l: 10, gf: 18, ga: 29, gd: '-11', gdNum: -11, pts: 15 }, away: { p: 19, w: 2, d: 4, l: 13, gf: 12, ga: 38, gd: '-26', gdNum: -26, pts: 10 } },
];

const DEFAULT_STANDINGS_2021_22: StandingsRow[] = [
  { pos: 1, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 38, w: 26, d: 8, l: 4, gf: 80, ga: 31, gd: '+49', form: ['W', 'L', 'W', 'D', 'D'], pts: 86, zone: 'ucl', tagColor: 'text-tertiary', home: { p: 19, w: 13, d: 5, l: 1, gf: 44, ga: 13, gd: '+31', gdNum: 31, pts: 44 }, away: { p: 19, w: 13, d: 3, l: 3, gf: 36, ga: 18, gd: '+18', gdNum: 18, pts: 42 } },
  { pos: 2, code: 'FCB', name: 'Barcelona', stadium: 'Camp Nou', p: 38, w: 21, d: 10, l: 7, gf: 68, ga: 38, gd: '+30', form: ['W', 'W', 'W', 'D', 'L'], pts: 73, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 12, d: 2, l: 5, gf: 37, ga: 19, gd: '+18', gdNum: 18, pts: 38 }, away: { p: 19, w: 9, d: 8, l: 2, gf: 31, ga: 19, gd: '+12', gdNum: 12, pts: 35 } },
  { pos: 3, code: 'ATM', name: 'Atletico Madrid', stadium: 'Wanda Metropolitano', p: 38, w: 21, d: 8, l: 9, gf: 65, ga: 43, gd: '+22', form: ['L', 'W', 'W', 'D', 'W'], pts: 71, zone: 'ucl', tagColor: 'text-secondary', home: { p: 19, w: 12, d: 5, l: 2, gf: 33, ga: 16, gd: '+17', gdNum: 17, pts: 41 }, away: { p: 19, w: 9, d: 3, l: 7, gf: 32, ga: 27, gd: '+5', gdNum: 5, pts: 30 } },
  { pos: 4, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 38, w: 18, d: 16, l: 4, gf: 53, ga: 30, gd: '+23', form: ['D', 'D', 'D', 'D', 'W'], pts: 70, zone: 'ucl', tagColor: 'text-primary', home: { p: 19, w: 12, d: 6, l: 1, gf: 36, ga: 17, gd: '+19', gdNum: 19, pts: 42 }, away: { p: 19, w: 6, d: 10, l: 3, gf: 17, ga: 13, gd: '+4', gdNum: 4, pts: 28 } },
  { pos: 5, code: 'BET', name: 'Real Betis', stadium: 'Benito Villamarín', p: 38, w: 19, d: 8, l: 11, gf: 62, ga: 40, gd: '+22', form: ['D', 'L', 'W', 'W', 'D'], pts: 65, zone: 'uel', tagColor: 'text-tertiary', home: { p: 19, w: 10, d: 2, l: 7, gf: 34, ga: 22, gd: '+12', gdNum: 12, pts: 32 }, away: { p: 19, w: 9, d: 6, l: 4, gf: 28, ga: 18, gd: '+10', gdNum: 10, pts: 33 } },
  { pos: 6, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 38, w: 17, d: 11, l: 10, gf: 40, ga: 37, gd: '+3', form: ['D', 'L', 'W', 'W', 'L'], pts: 62, zone: 'uel', tagColor: 'text-secondary', home: { p: 19, w: 10, d: 5, l: 4, gf: 16, ga: 9, gd: '+7', gdNum: 7, pts: 35 }, away: { p: 19, w: 7, d: 6, l: 6, gf: 24, ga: 28, gd: '-4', gdNum: -4, pts: 27 } },
  { pos: 7, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 38, w: 16, d: 11, l: 11, gf: 63, ga: 37, gd: '+26', form: ['L', 'D', 'W', 'L', 'W'], pts: 59, zone: 'uecl', tagColor: 'text-secondary', home: { p: 19, w: 10, d: 6, l: 3, gf: 40, ga: 18, gd: '+22', gdNum: 22, pts: 36 }, away: { p: 19, w: 6, d: 5, l: 8, gf: 23, ga: 19, gd: '+4', gdNum: 4, pts: 23 } },
  { pos: 8, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 38, w: 14, d: 13, l: 11, gf: 43, ga: 36, gd: '+7', form: ['W', 'D', 'L', 'W', 'L'], pts: 55, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 10, d: 4, l: 5, gf: 29, ga: 18, gd: '+11', gdNum: 11, pts: 34 }, away: { p: 19, w: 4, d: 9, l: 6, gf: 14, ga: 18, gd: '-4', gdNum: -4, pts: 21 } },
  { pos: 9, code: 'VAL', name: 'Valencia', stadium: 'Estadio de Mestalla', p: 38, w: 11, d: 15, l: 12, gf: 48, ga: 53, gd: '-5', form: ['D', 'D', 'L', 'D', 'W'], pts: 48, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 6, d: 8, l: 5, gf: 26, ga: 24, gd: '+2', gdNum: 2, pts: 26 }, away: { p: 19, w: 5, d: 7, l: 7, gf: 22, ga: 29, gd: '-7', gdNum: -7, pts: 22 } },
  { pos: 10, code: 'OSA', name: 'Osasuna', stadium: 'Estadio El Sadar', p: 38, w: 12, d: 11, l: 15, gf: 37, ga: 51, gd: '-14', form: ['D', 'D', 'D', 'L', 'L'], pts: 47, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 5, d: 7, l: 7, gf: 17, ga: 26, gd: '-9', gdNum: -9, pts: 22 }, away: { p: 19, w: 7, d: 4, l: 8, gf: 20, ga: 25, gd: '-5', gdNum: -5, pts: 25 } },
  { pos: 11, code: 'CEL', name: 'Celta Vigo', stadium: 'Municipal de Balaídos', p: 38, w: 12, d: 10, l: 16, gf: 43, ga: 43, gd: '0', form: ['D', 'W', 'L', 'W', 'L'], pts: 46, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 4, l: 8, gf: 26, ga: 23, gd: '+3', gdNum: 3, pts: 25 }, away: { p: 19, w: 5, d: 6, l: 8, gf: 17, ga: 20, gd: '-3', gdNum: -3, pts: 21 } },
  { pos: 12, code: 'RAY', name: 'Rayo Vallecano', stadium: 'Campo de Futbol de Vallecas', p: 38, w: 11, d: 9, l: 18, gf: 39, ga: 50, gd: '-11', form: ['D', 'D', 'L', 'L', 'L'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 8, d: 5, l: 6, gf: 26, ga: 22, gd: '+4', gdNum: 4, pts: 29 }, away: { p: 19, w: 3, d: 4, l: 12, gf: 13, ga: 28, gd: '-15', gdNum: -15, pts: 13 } },
  { pos: 13, code: 'ELC', name: 'Elche', stadium: 'Estadio Manuel Martínez Valero', p: 38, w: 11, d: 9, l: 18, gf: 40, ga: 52, gd: '-12', form: ['D', 'L', 'L', 'L', 'W'], pts: 42, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 6, l: 6, gf: 24, ga: 21, gd: '+3', gdNum: 3, pts: 27 }, away: { p: 19, w: 4, d: 3, l: 12, gf: 16, ga: 31, gd: '-15', gdNum: -15, pts: 15 } },
  { pos: 14, code: 'ESP', name: 'Espanyol', stadium: 'RCDE Stadium', p: 38, w: 10, d: 12, l: 16, gf: 40, ga: 53, gd: '-13', form: ['L', 'D', 'L', 'D', 'D'], pts: 42, zone: 'mid', tagColor: 'text-secondary', home: { p: 19, w: 9, d: 6, l: 4, gf: 25, ga: 19, gd: '+6', gdNum: 6, pts: 33 }, away: { p: 19, w: 1, d: 6, l: 12, gf: 15, ga: 34, gd: '-19', gdNum: -19, pts: 9 } },
  { pos: 15, code: 'GET', name: 'Getafe', stadium: 'Coliseum', p: 38, w: 8, d: 15, l: 15, gf: 33, ga: 41, gd: '-8', form: ['D', 'D', 'D', 'D', 'L'], pts: 39, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 7, l: 5, gf: 21, ga: 15, gd: '+6', gdNum: 6, pts: 28 }, away: { p: 19, w: 1, d: 8, l: 10, gf: 12, ga: 26, gd: '-14', gdNum: -14, pts: 11 } },
  { pos: 16, code: 'MLL', name: 'Mallorca', stadium: 'Estadi Mallorca Son Moix', p: 38, w: 10, d: 9, l: 19, gf: 36, ga: 63, gd: '-27', form: ['L', 'L', 'D', 'W', 'W'], pts: 39, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 7, d: 6, l: 6, gf: 20, ga: 25, gd: '-5', gdNum: -5, pts: 27 }, away: { p: 19, w: 3, d: 3, l: 13, gf: 16, ga: 38, gd: '-22', gdNum: -22, pts: 12 } },
  { pos: 17, code: 'CAD', name: 'Cadiz', stadium: 'Estadio Nuevo Mirandilla', p: 38, w: 8, d: 15, l: 15, gf: 35, ga: 51, gd: '-16', form: ['D', 'W', 'L', 'D', 'W'], pts: 39, zone: 'mid', tagColor: 'text-on-surface', home: { p: 19, w: 3, d: 9, l: 7, gf: 19, ga: 24, gd: '-5', gdNum: -5, pts: 18 }, away: { p: 19, w: 5, d: 6, l: 8, gf: 16, ga: 27, gd: '-11', gdNum: -11, pts: 21 } },
  { pos: 18, code: 'GRA', name: 'Granada CF', stadium: 'Nuevo Los Cármenes', p: 38, w: 8, d: 14, l: 16, gf: 44, ga: 61, gd: '-17', form: ['D', 'W', 'W', 'L', 'D'], pts: 38, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 5, d: 7, l: 7, gf: 22, ga: 29, gd: '-7', gdNum: -7, pts: 22 }, away: { p: 19, w: 3, d: 7, l: 9, gf: 22, ga: 32, gd: '-10', gdNum: -10, pts: 16 } },
  { pos: 19, code: 'LEV', name: 'Levante', stadium: 'Estadio Ciudad de Valencia', p: 38, w: 8, d: 11, l: 19, gf: 51, ga: 76, gd: '-25', form: ['D', 'W', 'L', 'W', 'W'], pts: 35, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 5, d: 7, l: 7, gf: 28, ga: 30, gd: '-2', gdNum: -2, pts: 22 }, away: { p: 19, w: 3, d: 4, l: 12, gf: 23, ga: 46, gd: '-23', gdNum: -23, pts: 13 } },
  { pos: 20, code: 'ALA', name: 'Alaves', stadium: 'Estadio Mendizorrotza', p: 38, w: 8, d: 7, l: 23, gf: 31, ga: 65, gd: '-34', form: ['W', 'L', 'W', 'L', 'L'], pts: 31, zone: 'relegation', tagColor: 'text-primary-container', home: { p: 19, w: 7, d: 4, l: 8, gf: 17, ga: 21, gd: '-4', gdNum: -4, pts: 25 }, away: { p: 19, w: 1, d: 3, l: 15, gf: 14, ga: 44, gd: '-30', gdNum: -30, pts: 6 } },
];

const DEFAULT_STANDINGS: StandingsRow[] = [
  { pos: 1, code: 'FCB', name: 'Barcelona', stadium: 'Spotify Camp Nou', p: 7, w: 7, d: 0, l: 0, gf: 31, ga: 7, gd: '+24', form: ['W', 'W', 'W', 'W', 'W'], pts: 21, zone: 'ucl', tagColor: 'text-primary' },
  { pos: 2, code: 'ATM', name: 'Atletico Madrid', stadium: 'Riyadh Air Metropolitano', p: 7, w: 5, d: 1, l: 1, gf: 16, ga: 7, gd: '+9', form: ['W', 'L', 'W', 'W', 'W'], pts: 16, zone: 'ucl', tagColor: 'text-primary-container' },
  { pos: 3, code: 'BET', name: 'Real Betis', stadium: 'Estadio de La Cartuja', p: 7, w: 5, d: 1, l: 1, gf: 9, ga: 7, gd: '+2', form: ['L', 'W', 'W', 'W', 'D'], pts: 16, zone: 'ucl', tagColor: 'text-tertiary' },
  { pos: 4, code: 'RMA', name: 'Real Madrid', stadium: 'Santiago Bernabéu', p: 7, w: 5, d: 0, l: 2, gf: 18, ga: 8, gd: '+10', form: ['W', 'L', 'W', 'W', 'L'], pts: 15, zone: 'ucl', tagColor: 'text-secondary' },
  { pos: 5, code: 'SFC', name: 'Sevilla', stadium: 'Ramón Sánchez-Pizjuán', p: 7, w: 4, d: 1, l: 2, gf: 10, ga: 9, gd: '+1', form: ['L', 'D', 'W', 'W', 'L'], pts: 13, zone: 'uel', tagColor: 'text-primary' },
  { pos: 6, code: 'ALA', name: 'Alaves', stadium: 'Estadio Mendizorrotza', p: 7, w: 3, d: 2, l: 2, gf: 11, ga: 6, gd: '+5', form: ['W', 'W', 'L', 'L', 'D'], pts: 11, zone: 'uel', tagColor: 'text-on-surface' },
  { pos: 7, code: 'DEP', name: 'Deportivo La Coruna', stadium: 'Estadio Riazor', p: 7, w: 2, d: 4, l: 1, gf: 10, ga: 8, gd: '+2', form: ['W', 'W', 'D', 'L', 'D'], pts: 10, zone: 'uecl', tagColor: 'text-tertiary' },
  { pos: 8, code: 'RSO', name: 'Real Sociedad', stadium: 'Reale Arena', p: 7, w: 3, d: 1, l: 3, gf: 9, ga: 13, gd: '-4', form: ['W', 'D', 'W', 'L', 'W'], pts: 10, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 9, code: 'VIL', name: 'Villarreal', stadium: 'Estadio de la Cerámica', p: 7, w: 2, d: 2, l: 3, gf: 13, ga: 12, gd: '+1', form: ['L', 'L', 'L', 'W', 'W'], pts: 8, zone: 'mid', tagColor: 'text-secondary' },
  { pos: 10, code: 'ATH', name: 'Athletic Club', stadium: 'San Mamés', p: 6, w: 2, d: 2, l: 2, gf: 7, ga: 6, gd: '+1', form: ['L', 'W', 'W', 'D', 'D'], pts: 8, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 11, code: 'GET', name: 'Getafe', stadium: 'Coliseum', p: 7, w: 2, d: 2, l: 3, gf: 4, ga: 7, gd: '-3', form: ['L', 'D', 'D', 'L', 'W'], pts: 8, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 12, code: 'RAY', name: 'Rayo Vallecano', stadium: 'Campo de Futbol de Vallecas', p: 7, w: 2, d: 2, l: 3, gf: 11, ga: 16, gd: '-5', form: ['L', 'W', 'L', 'W', 'D'], pts: 8, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 13, code: 'OSA', name: 'Osasuna', stadium: 'Estadio El Sadar', p: 7, w: 2, d: 2, l: 3, gf: 6, ga: 13, gd: '-7', form: ['W', 'L', 'L', 'L', 'D'], pts: 8, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 14, code: 'CEL', name: 'Celta Vigo', stadium: 'Municipal de Balaídos', p: 7, w: 1, d: 4, l: 2, gf: 8, ga: 6, gd: '+2', form: ['L', 'D', 'D', 'D', 'W'], pts: 7, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 15, code: 'ESP', name: 'Espanyol', stadium: 'RCDE Stadium', p: 7, w: 2, d: 1, l: 4, gf: 10, ga: 10, gd: '0', form: ['L', 'D', 'W', 'L', 'L'], pts: 7, zone: 'mid', tagColor: 'text-secondary' },
  { pos: 16, code: 'RAC', name: 'Racing Santander', stadium: 'El Sardinero', p: 7, w: 2, d: 1, l: 4, gf: 11, ga: 21, gd: '-10', form: ['W', 'L', 'W', 'L', 'L'], pts: 7, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 17, code: 'LEV', name: 'Levante', stadium: 'Ciudad de Valencia', p: 6, w: 1, d: 2, l: 3, gf: 8, ga: 12, gd: '-4', form: ['D', 'W', 'D', 'L', 'L'], pts: 5, zone: 'mid', tagColor: 'text-on-surface' },
  { pos: 18, code: 'ELC', name: 'Elche', stadium: 'Estadio Manuel Martínez Valero', p: 7, w: 1, d: 2, l: 4, gf: 11, ga: 17, gd: '-6', form: ['L', 'L', 'D', 'L', 'W'], pts: 5, zone: 'relegation', tagColor: 'text-secondary' },
  { pos: 19, code: 'VAL', name: 'Valencia', stadium: 'Estadio de Mestalla', p: 7, w: 1, d: 1, l: 5, gf: 4, ga: 13, gd: '-9', form: ['L', 'L', 'L', 'W', 'L'], pts: 4, zone: 'relegation', tagColor: 'text-on-surface' },
  { pos: 20, code: 'MAL', name: 'Malaga', stadium: 'Estadio La Rosaleda', p: 7, w: 0, d: 3, l: 4, gf: 3, ga: 12, gd: '-9', form: ['L', 'D', 'D', 'L', 'L'], pts: 3, zone: 'relegation', tagColor: 'text-secondary' },
];

const STADIUM_NAME_MAP: Record<string, string> = {
  'Real Madrid': 'Santiago Bernabéu',
  'Girona': 'Estadi Montilivi',
  'Girona FC': 'Estadi Montilivi',
  'Athletic Club': 'San Mamés',
  'Athletic Bilbao': 'San Mamés',
  'Real Sociedad': 'Reale Arena',
  'Villarreal': 'Estadio de la Cerámica',
  'Villarreal CF': 'Estadio de la Cerámica',
  'Valencia': 'Mestalla',
  'Valencia CF': 'Mestalla',
  'Osasuna': 'El Sadar',
  'CA Osasuna': 'El Sadar',
  'Las Palmas': 'Gran Canaria',
  'UD Las Palmas': 'Gran Canaria',
  'Alavés': 'Mendizorroza',
  'Alaves': 'Mendizorroza',
  'Deportivo Alavés': 'Mendizorroza',
  'Almería': 'Power Horse Stadium',
  'Almeria': 'Power Horse Stadium',
  'UD Almería': 'Power Horse Stadium',
  'Sevilla': 'Ramón Sánchez-Pizjuán',
  'Sevilla FC': 'Ramón Sánchez-Pizjuán',
  'Rayo Vallecano': 'Campo de Fútbol de Vallecas',
  'Espanyol': 'RCDE Stadium',
  'RCD Espanyol': 'RCDE Stadium',
  'Leganés': 'Butarque',
  'CD Leganés': 'Butarque',
  'Valladolid': 'José Zorrilla',
  'Real Valladolid': 'José Zorrilla',
  'Granada CF': 'Nuevo Los Cármenes',
  'Granada': 'Nuevo Los Cármenes',
  'Huesca': 'El Alcoraz',
  'SD Huesca': 'El Alcoraz',
  'Eibar': 'Ipurua',
  'SD Eibar': 'Ipurua',
  'Elche': 'Martínez Valero',
  'Elche CF': 'Martínez Valero',
  'Levante': 'Ciutat de València',
  'Levante UD': 'Ciutat de València',
  'Oviedo': 'Estadio Nuevo Carlos Tartiere',
  'Real Oviedo': 'Estadio Nuevo Carlos Tartiere',
  'Racing Santander': 'El Sardinero',
  'Deportivo La Coruna': 'Estadio Riazor',
  'Malaga': 'Estadio La Rosaleda',
};

function getStadiumForTeam(name: string, season: string): string {
  if (name.includes('Barcelona')) {
    return season === '2023-24' ? 'Estadi Olímpic Lluís Companys' : season === '2020-21' || season === '2021-22' ? 'Camp Nou' : 'Spotify Camp Nou';
  }
  if (name.includes('Atletico') || name.includes('Atlético')) {
    return season === '2022-23' || season === '2023-24' ? 'Civitas Metropolitano' : season === '2020-21' || season === '2021-22' ? 'Wanda Metropolitano' : 'Riyadh Air Metropolitano';
  }
  if (name.includes('Betis')) {
    return season === '2025-26' || season === '2026-27' ? 'Estadio de La Cartuja' : 'Benito Villamarín';
  }
  if (name.includes('Getafe')) {
    return season === '2023-24' || season === '2025-26' || season === '2026-27' ? 'Coliseum' : 'Coliseum Alfonso Pérez';
  }
  if (name.includes('Mallorca')) {
    return season === '2025-26' ? 'Estadi Mallorca Son Moix' : season === '2023-24' ? 'Son Moix' : 'Visit Mallorca Estadi';
  }
  if (name.includes('Celta')) {
    return season === '2025-26' || season === '2026-27' ? 'Municipal de Balaídos' : 'Abanca-Balaídos';
  }
  if (name.includes('Cadiz') || name.includes('Cádiz')) {
    return season === '2020-21' ? 'Estadio Ramón de Carranza' : 'Nuevo Mirandilla';
  }
  return STADIUM_NAME_MAP[name] || 'Official Ground';
}

function formatStandingsList(rawStandings: any[], season: string): StandingsRow[] {
  return rawStandings.map((item: any, i: number) => {
    const name = item.name || '';
    const stadium = getStadiumForTeam(name, season) || item.stadium || 'Official Ground';
    const pos = item.pos || i + 1;
    const zone =
      item.zone ||
      (season === '2024-25'
        ? pos <= 5 ? 'ucl' : pos <= 7 ? 'uel' : pos === 8 ? 'uecl' : pos >= 18 ? 'relegation' : 'mid'
        : season === '2022-23' && (pos === 12 || name.toLowerCase().includes('sevilla'))
        ? 'ucl'
        : pos <= 4 ? 'ucl' : pos <= 6 ? 'uel' : pos === 7 ? 'uecl' : pos >= 18 ? 'relegation' : 'mid');

    return {
      pos,
      code: item.code || (name.substring(0, 3) || '').toUpperCase(),
      name,
      stadium,
      p: item.p || 0,
      w: item.w || 0,
      d: item.d || 0,
      l: item.l || 0,
      gf: item.gf !== undefined && item.gf !== '-' ? item.gf : 0,
      ga: item.ga !== undefined && item.ga !== '-' ? item.ga : 0,
      gd: item.gd !== undefined ? item.gd : '0',
      form: item.form && Array.isArray(item.form) ? item.form : ['W', 'D', 'W', 'W', 'D'],
      pts: item.pts || 0,
      zone,
      tagColor:
        item.tagColor ||
        (pos === 1
          ? 'text-tertiary'
          : zone === 'ucl'
          ? 'text-primary'
          : zone === 'uel'
          ? 'text-secondary'
          : zone === 'uecl'
          ? 'text-primary-fixed'
          : zone === 'relegation'
          ? 'text-primary-container'
          : 'text-on-surface'),
      logo: item.logo || '',
      home: item.home,
      away: item.away,
    };
  });
}

interface CurrentSeasonProps {
  searchQuery?: string;
  onSelectClub?: (clubId: string) => void;
  onNavigateToCalendar?: (matchday?: number, season?: string) => void;
  initialSeason?: string;
}

export const CurrentSeason: React.FC<CurrentSeasonProps> = ({
  searchQuery = '',
  onSelectClub,
  onNavigateToCalendar,
  initialSeason,
}) => {
  const [tableFilter, setTableFilter] = useState<'all' | 'home' | 'away' | 'xg'>('all');
  const [expanded, setExpanded] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<string>(() => {
    if (initialSeason) return initialSeason;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSeason = params.get('season');
      if (urlSeason) return urlSeason;
    }
    return '2026-27';
  });
  const [standings, setStandings] = useState<StandingsRow[]>(() =>
    selectedSeason === '2026-27'
      ? DEFAULT_STANDINGS_2026_27
      : selectedSeason === '2025-26'
      ? DEFAULT_STANDINGS_2025_26
      : selectedSeason === '2024-25'
      ? DEFAULT_STANDINGS_2024_25
      : selectedSeason === '2023-24'
      ? DEFAULT_STANDINGS_2023_24
      : selectedSeason === '2022-23'
      ? DEFAULT_STANDINGS_2022_23
      : selectedSeason === '2021-22'
      ? DEFAULT_STANDINGS_2021_22
      : selectedSeason === '2020-21'
      ? DEFAULT_STANDINGS_2020_21
      : DEFAULT_STANDINGS
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [cacheMeta, setCacheMeta] = useState<CacheMeta | null>(null);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState<boolean>(false);
  const [showMatchdaysModal, setShowMatchdaysModal] = useState<boolean>(false);
  const [localSearch, setLocalSearch] = useState<string>(searchQuery);

  // Matchday progression and predictive model states
  const [selectedMatchday, setSelectedMatchday] = useState<number | 'all'>('all');
  const [modelStatus, setModelStatus] = useState<any>(null);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simulationNotification, setSimulationNotification] = useState<{
    matchday: number;
    results: { homeTeam: string; awayTeam: string; homeScore: number; awayScore: number }[];
  } | null>(null);
  const [autoUpdateActive, setAutoUpdateActive] = useState<boolean>(false);

  // 30-second Polling Service states
  const [lastPollTime, setLastPollTime] = useState<string>('');
  const [pollingCountdown, setPollingCountdown] = useState<number>(30);
  const [isPollingActive, setIsPollingActive] = useState<boolean>(false);
  const previousStandingsRawRef = useRef<any>(null);

  // Sync initialSeason changes if prop updates
  useEffect(() => {
    if (initialSeason && initialSeason !== selectedSeason) {
      setSelectedSeason(initialSeason);
    }
  }, [initialSeason]);

  // Sync external search query
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Close season dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.standings-season-dropdown')) {
        setShowSeasonDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availableSeasons = [
    '2026-27',
    '2025-26',
    '2024-25',
    '2023-24',
    '2022-23',
    '2021-22',
    '2020-21',
  ];

  // Fetch live or historical standings
  useEffect(() => {
    let isMounted = true;

    async function fetchStandingsData() {
      setLoading(true);
      try {
        const { data, fromCache } = await getCachedStandings(selectedSeason, selectedMatchday);

        if (isMounted && data.standings && Array.isArray(data.standings)) {
          if (data.model_status) {
            setModelStatus(data.model_status);
            if (data.model_status.autoUpdateActive !== undefined) {
              setAutoUpdateActive(data.model_status.autoUpdateActive);
            }
          }

          const isSeasonMatchdayChange =
            !previousStandingsRawRef.current ||
            previousStandingsRawRef.current?.season !== selectedSeason ||
            previousStandingsRawRef.current?._matchday !== selectedMatchday;

          // Re-render guard: only re-render if season/matchday changed or updates occurred beyond Matchday 7
          if (isSeasonMatchdayChange || hasMatchdayUpdate(previousStandingsRawRef.current, data)) {
            previousStandingsRawRef.current = { ...data, _matchday: selectedMatchday };
            const formatted = formatStandingsList(data.standings, selectedSeason);
            setStandings(formatted);
          }

          setCacheMeta({
            cached: fromCache || Boolean(data.cached),
            cachedAt: data.cached_at || new Date().toISOString(),
            ttlSeconds: data.ttl_seconds || (fromCache ? 3600 : 30),
            isFallback: Boolean(data.is_fallback),
          });
        }
      } catch (err) {
        console.warn('Using resilient fallback standings due to fetch error:', err);
        if (isMounted) {
          setStandings(
            selectedSeason === '2026-27'
              ? DEFAULT_STANDINGS_2026_27
              : selectedSeason === '2025-26'
              ? DEFAULT_STANDINGS_2025_26
              : selectedSeason === '2024-25'
              ? DEFAULT_STANDINGS_2024_25
              : selectedSeason === '2023-24'
              ? DEFAULT_STANDINGS_2023_24
              : selectedSeason === '2022-23'
              ? DEFAULT_STANDINGS_2022_23
              : selectedSeason === '2021-22'
              ? DEFAULT_STANDINGS_2021_22
              : selectedSeason === '2020-21'
              ? DEFAULT_STANDINGS_2020_21
              : DEFAULT_STANDINGS
          );
          setCacheMeta({
            cached: false,
            isFallback: true,
            ttlSeconds: 900,
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchStandingsData();
    return () => {
      isMounted = false;
    };
  }, [selectedSeason, selectedMatchday]);

  // Polling service effect hook: automatically triggers an API fetch every 30 seconds
  // to refresh table data as matchdays progress in the 2026-27 season.
  // Re-render guard: Only re-renders when data updates occur for matchdays beyond Matchday 7!
  useEffect(() => {
    if (selectedSeason !== '2026-27') return;

    let isMounted = true;
    const POLLING_INTERVAL_MS = 30000; // 30-second polling interval

    const pollStandingsData = async () => {
      try {
        if (isMounted) setIsPollingActive(true);
        const { data } = await getCachedStandings('2026-27', selectedMatchday);

        if (isMounted && data?.standings && Array.isArray(data.standings)) {
          const currentMd = data.model_status?.currentCompletedMatchday ?? 7;
          // Re-render guard: UI only re-renders when data updates occur for matchdays beyond Matchday 7
          if (currentMd > 7 && hasMatchdayUpdate(previousStandingsRawRef.current, data)) {
            previousStandingsRawRef.current = { ...data, _matchday: selectedMatchday };
            const formatted = formatStandingsList(data.standings, '2026-27');
            setStandings(formatted);
          }
          if (data.model_status) {
            setModelStatus(data.model_status);
            if (data.model_status.autoUpdateActive !== undefined) {
              setAutoUpdateActive(data.model_status.autoUpdateActive);
            }
          }
          setLastPollTime(new Date().toLocaleTimeString());
          setPollingCountdown(30);
        }
      } catch (err) {
        console.warn('30-second polling refresh error:', err);
      } finally {
        if (isMounted) {
          setIsPollingActive(false);
        }
      }
    };

    const intervalId = setInterval(pollStandingsData, POLLING_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [selectedSeason, selectedMatchday]);

  // 1-second ticker for the 30-second polling countdown
  useEffect(() => {
    if (selectedSeason !== '2026-27') return;
    const countdownTicker = setInterval(() => {
      setPollingCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(countdownTicker);
  }, [selectedSeason]);

  // Manual trigger for immediate API poll
  const handleManualPoll = async () => {
    if (selectedSeason !== '2026-27') return;
    setIsPollingActive(true);
    try {
      const matchdayQuery = selectedMatchday !== 'all' ? `&matchday=${selectedMatchday}` : '';
      const url = `/api/standings?season=2026-27${matchdayQuery}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.standings && Array.isArray(data.standings)) {
          setStandings(formatStandingsList(data.standings, '2026-27'));
          if (data.model_status) setModelStatus(data.model_status);
          setLastPollTime(new Date().toLocaleTimeString());
          setPollingCountdown(30);
        }
      }
    } catch (e) {
      console.warn('Manual poll failed:', e);
    } finally {
      setIsPollingActive(false);
    }
  };

  // Simulation & Model handlers
  const handleSimulateNextMatchday = async () => {
    setSimulating(true);
    try {
      invalidateSimulationCache();
      const res = await fetch('/api/model/simulate-matchday', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error('Simulation failed');
      const data = await res.json();
      if (data.success) {
        setSimulationNotification({
          matchday: data.matchdaySimulated,
          results: data.results,
        });
        if (data.newStandings) {
          setStandings(data.newStandings);
          previousStandingsRawRef.current = data;
        }
        if (data.modelStatus) {
          setModelStatus(data.modelStatus);
        }
        setTimeout(() => setSimulationNotification(null), 10000);
      }
    } catch (err) {
      console.error('Error simulating matchday:', err);
    } finally {
      setSimulating(false);
    }
  };

  const handleResetToOfficialMD7 = async () => {
    setSimulating(true);
    try {
      invalidateSimulationCache();
      const res = await fetch('/api/model/reset-season', { method: 'POST' });
      if (!res.ok) throw new Error('Reset failed');
      const data = await res.json();
      if (data.success) {
        setSimulationNotification(null);
        if (data.standings) {
          setStandings(data.standings);
          previousStandingsRawRef.current = data;
        }
        if (data.modelStatus) {
          setModelStatus(data.modelStatus);
        }
        setSelectedMatchday('all');
      }
    } catch (err) {
      console.error('Error resetting season:', err);
    } finally {
      setSimulating(false);
    }
  };

  const handleToggleAutoUpdate = async () => {
    const nextState = !autoUpdateActive;
    try {
      const res = await fetch('/api/model/auto-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: nextState }),
      });
      if (res.ok) {
        const data = await res.json();
        setAutoUpdateActive(data.autoUpdateActive);
        if (data.modelStatus) setModelStatus(data.modelStatus);
      }
    } catch (err) {
      console.error('Error toggling auto-update:', err);
    }
  };

  const handleTrainModel = async () => {
    setSimulating(true);
    try {
      const res = await fetch('/api/model/train', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.status) setModelStatus(data.status);
      }
    } catch (err) {
      console.error('Error training model:', err);
    } finally {
      setSimulating(false);
    }
  };

  const handleExportCSV = () => {
    const isSplit = tableFilter === 'home' || tableFilter === 'away';
    const headers = isSplit
      ? ['Pos', 'Club', `${tableFilter === 'home' ? 'Home' : 'Away'} P`, 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts']
      : ['Pos', 'Club', 'Stadium', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts', 'Home Pts', 'Away Pts'];

    const rows = standings.map((r) => {
      if (tableFilter === 'home' && r.home) {
        return [r.pos, r.name, r.home.p, r.home.w, r.home.d, r.home.l, r.home.gf, r.home.ga, r.home.gd, r.home.pts];
      }
      if (tableFilter === 'away' && r.away) {
        return [r.pos, r.name, r.away.p, r.away.w, r.away.d, r.away.l, r.away.gf, r.away.ga, r.away.gd, r.away.pts];
      }
      return [r.pos, r.name, r.stadium, r.p, r.w, r.d, r.l, r.gf, r.ga, r.gd, r.pts, r.home?.pts ?? '-', r.away?.pts ?? '-'];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `laliga_standings_${selectedSeason.replace(/[^a-zA-Z0-9]/g, '_')}_${tableFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter View Handler (All, Home, Away, xG Matrix) + Search Query
  const filteredAndSortedRows = useMemo(() => {
    let rows = [...standings];

    // Table Mode Sort
    if (tableFilter === 'home') {
      rows.sort((a, b) => {
        const ptsB = b.home ? b.home.pts : b.pts;
        const ptsA = a.home ? a.home.pts : a.pts;
        if (ptsB !== ptsA) return ptsB - ptsA;
        const gdB = b.home ? (b.home.gf - b.home.ga) : (b.gf - b.ga);
        const gdA = a.home ? (a.home.gf - a.home.ga) : (a.gf - a.ga);
        if (gdB !== gdA) return gdB - gdA;
        return (b.home ? b.home.gf : b.gf) - (a.home ? a.home.gf : a.gf);
      });
    } else if (tableFilter === 'away') {
      rows.sort((a, b) => {
        const ptsB = b.away ? b.away.pts : b.pts;
        const ptsA = a.away ? a.away.pts : a.pts;
        if (ptsB !== ptsA) return ptsB - ptsA;
        const gdB = b.away ? (b.away.gf - b.away.ga) : (b.gf - b.ga);
        const gdA = a.away ? (a.away.gf - a.away.ga) : (a.gf - a.ga);
        if (gdB !== gdA) return gdB - gdA;
        return (b.away ? b.away.gf : b.gf) - (a.away ? a.away.gf : a.gf);
      });
    } else if (tableFilter === 'xg') {
      rows.sort((a, b) => b.gf - a.gf);
    } else {
      rows.sort((a, b) => a.pos - b.pos);
    }

    // Search Filter
    if (localSearch.trim()) {
      const term = localSearch.toLowerCase().trim();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.code.toLowerCase().includes(term) ||
          r.stadium.toLowerCase().includes(term) ||
          r.pos.toString() === term
      );
    }

    return rows;
  }, [standings, tableFilter, localSearch]);

  const displayedRows = expanded ? filteredAndSortedRows : filteredAndSortedRows.slice(0, 10);

  const getPositionIndicator = (zone: string) => {
    switch (zone) {
      case 'ucl':
        return <span className="w-1.5 h-6 rounded-full bg-tertiary" title="UEFA Champions League"></span>;
      case 'uel':
        return <span className="w-1.5 h-6 rounded-full bg-secondary" title="UEFA Europa League"></span>;
      case 'uecl':
        return <span className="w-1.5 h-6 rounded-full bg-primary-fixed" title="UEFA Conference League"></span>;
      case 'relegation':
        return <span className="w-1.5 h-6 rounded-full bg-primary-container" title="Relegation Zone"></span>;
      default:
        return <span className="w-1.5 h-6 rounded-full bg-surface-container-high"></span>;
    }
  };

  const renderFormBadge = (result: string, idx: number) => {
    if (result === 'W') {
      return (
        <span key={idx} className="w-5 h-5 rounded flex items-center justify-center bg-tertiary/20 text-tertiary font-label-caps text-[10px] font-bold">
          W
        </span>
      );
    }
    if (result === 'D') {
      return (
        <span key={idx} className="w-5 h-5 rounded flex items-center justify-center bg-secondary/20 text-secondary font-label-caps text-[10px] font-bold">
          D
        </span>
      );
    }
    return (
      <span key={idx} className="w-5 h-5 rounded flex items-center justify-center bg-primary-container/20 text-primary-container font-label-caps text-[10px] font-bold">
        L
      </span>
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Simulation Result Notification Banner */}
      {simulationNotification && (
        <div className="mb-space-md p-4 rounded-2xl bg-gradient-to-r from-secondary/20 via-surface-container to-secondary/10 border border-secondary/40 shadow-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
              <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-secondary text-[#030712]">
                MATCHDAY {simulationNotification.matchday} INGESTED
              </span>
              <span className="text-sm font-bold text-on-surface">
                Predictive Model Simulated Results & Recalculated Standings:
              </span>
            </div>
            <button
              onClick={() => setSimulationNotification(null)}
              className="text-on-surface-variant hover:text-on-surface text-xs px-2 py-1 rounded bg-surface-container-high cursor-pointer"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
            {simulationNotification.results.map((r, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex flex-col items-center justify-center text-center shadow-xs"
              >
                <div className="text-[11px] font-semibold text-on-surface truncate w-full">
                  {r.homeTeam} vs {r.awayTeam}
                </div>
                <div className="font-headline-sm text-sm font-black text-secondary mt-0.5">
                  {r.homeScore} - {r.awayScore}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2026-27 Current Season Live Matchday & Automated Model Banner */}
      {selectedSeason === '2026-27' && (
        <div className="mb-space-md p-5 rounded-2xl bg-gradient-to-r from-secondary/15 via-surface-container to-primary/10 border border-secondary/35 flex flex-col gap-4 shadow-xl animate-in fade-in duration-300">
          {/* Top Section: Header & Live Auto-Poll Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container-high/50">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center shrink-0 border border-secondary/30 shadow-inner">
                <span className="material-symbols-outlined text-2xl">sports_soccer</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-secondary text-[#030712] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#030712] animate-pulse"></span>
                    CURRENT SEASON 2026–27
                  </span>
                  <span className="text-xs text-secondary font-semibold">
                    Matchday 8 Commencing 10 Oct 2026
                  </span>
                </div>
                <h2 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold mt-0.5">
                  Official Standings till Matchday 7 Completed
                </h2>
              </div>
            </div>

            {/* 30s Polling Service Status Pill */}
            <button
              type="button"
              onClick={handleManualPoll}
              className="px-3 py-1.5 rounded-xl bg-surface-container-high text-xs font-bold text-tertiary border border-tertiary/25 flex items-center gap-2 shadow-xs hover:bg-surface-container-highest transition-all cursor-pointer group shrink-0 self-start sm:self-auto"
              title="Polling API every 30s to automatically refresh table data as matchdays progress. Click to trigger instant refresh."
            >
              <span className={`w-2 h-2 rounded-full bg-tertiary ${isPollingActive ? 'animate-ping' : 'animate-pulse'}`} />
              <span>30s Auto-Poll Active</span>
              <span className="text-[10px] text-on-surface-variant font-mono">
                ({pollingCountdown}s{lastPollTime ? ` • ${lastPollTime}` : ''})
              </span>
              <span className={`material-symbols-outlined text-xs text-on-surface-variant group-hover:text-white ${isPollingActive ? 'animate-spin' : ''}`}>
                refresh
              </span>
            </button>
          </div>

          {/* Subtitle / Rules description */}
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Official standings calculated with LaLiga EA SPORTS in-progress tiebreakers (Points, Goal Difference, Goals Scored). The automated predictive model ingests match scores and updates the points table after each matchday automatically.
          </p>

          {/* Key Season Telemetry Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="px-3.5 py-2 rounded-xl bg-surface-container-high/60 border border-tertiary/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Table Leader</span>
                <span className="text-xs font-bold text-tertiary truncate">FC Barcelona (21 pts • +24 GD)</span>
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-surface-container-high/60 border border-primary/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">4th UCL Threshold</span>
                <span className="text-xs font-bold text-primary truncate">Real Madrid (15 pts)</span>
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-surface-container-high/60 border border-amber-500/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Postponed Fixture</span>
                <span className="text-xs font-bold text-amber-300 truncate">LEV vs ATH (MD 6, Oct 21)</span>
              </div>
            </div>
          </div>

          {/* Matchday Filter & Predictive Model Action Bar */}
          <div className="pt-3 border-t border-surface-container-high/50 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Matchday Navigation Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold mr-1">
                View Matchday:
              </span>
              <button
                onClick={() => setSelectedMatchday('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedMatchday === 'all'
                    ? 'bg-secondary text-[#030712] font-black shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
                type="button"
              >
                All (MD {modelStatus?.currentCompletedMatchday || 7})
              </button>
              {[1, 2, 3, 4, 5, 6, 7].map((md) => (
                <button
                  key={md}
                  onClick={() => setSelectedMatchday(md)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    selectedMatchday === md
                      ? 'bg-secondary text-[#030712] font-black shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  MD {md}
                </button>
              ))}
              {modelStatus && modelStatus.currentCompletedMatchday > 7 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary/20 text-secondary border border-secondary/30">
                  Simulated up to MD {modelStatus.currentCompletedMatchday}
                </span>
              )}
            </div>

            {/* Automation & Model Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Advance Next Matchday Button */}
              <button
                onClick={handleSimulateNextMatchday}
                disabled={simulating}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-secondary to-teal-400 text-[#030712] font-label-badge text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                title="Uses the trained neural/statistical model to simulate upcoming matchday scores and update table automatically"
                type="button"
              >
                <span className={`material-symbols-outlined text-sm ${simulating ? 'animate-spin' : ''}`}>
                  {simulating ? 'sync' : 'bolt'}
                </span>
                <span>
                  {simulating
                    ? 'Simulating...'
                    : `Simulate MD ${modelStatus?.nextUpcomingMatchday || 8}`}
                </span>
              </button>

              {/* Auto-Update Toggle */}
              <button
                onClick={handleToggleAutoUpdate}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  autoUpdateActive
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-surface-container-high'
                }`}
                title="Toggle automatic post-matchday updater"
                type="button"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    autoUpdateActive ? 'bg-emerald-400 animate-ping' : 'bg-on-surface-variant'
                  }`}
                ></span>
                <span>Auto-Update: {autoUpdateActive ? 'ON' : 'OFF'}</span>
              </button>

              {/* Reset Season Button */}
              <button
                onClick={handleResetToOfficialMD7}
                disabled={simulating}
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface-variant hover:text-on-surface border border-surface-container-high transition-all cursor-pointer"
                title="Reset table back to official completed Matchday 7"
                type="button"
              >
                <span className="material-symbols-outlined text-xs inline-block mr-1 align-middle">
                  restart_alt
                </span>
                Reset MD 7
              </button>

              {/* Model Info Pill */}
              <button
                onClick={handleTrainModel}
                disabled={simulating}
                className="px-2.5 py-1.5 rounded-xl bg-surface-container text-[11px] font-semibold text-on-surface-variant hover:text-on-surface border border-surface-container-high transition-all cursor-pointer"
                title="Re-train model on 2,349 matches"
                type="button"
              >
                <span className="material-symbols-outlined text-xs inline-block mr-1 align-middle text-secondary">
                  psychology
                </span>
                Model Active
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2025-26 Champions Glory Banner */}
      {selectedSeason === '2025-26' && (
        <div className="mb-space-md p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-surface-container to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
                  CHAMPIONS
                </span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  FC Barcelona • LaLiga 2025/26 Champions
                </h2>
                <span className="text-xs text-amber-300 font-semibold">(29th League Title • Flawless 19/19 Home Record)</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl">
                FC Barcelona conquered their 29th league championship in dominant fashion with 94 points (31W, 1D, 6L, +59 GD), winning an astonishing 19 out of 19 matches at Spotify Camp Nou (57 pts). Real Madrid finished runners-up on 86 points (8-point margin), Villarreal took 3rd (72 pts), and Atlético Madrid completed the UEFA Champions League quartet (69 pts).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:flex-auto flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-amber-300 border border-amber-500/20">
              100% Home Record (19W 0D 0L)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-tertiary border border-tertiary/20">
              UCL Quartet: FCB, RMA, VIL, ATM
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-secondary border border-secondary/20">
              Betis (5th) & Celta (6th) in UEL
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary-container border border-primary-container/20">
              Relegated: MLL, GIR, OVI
            </span>
          </div>
        </div>
      )}

      {/* 2024-25 Champions Glory Banner */}
      {selectedSeason === '2024-25' && (
        <div className="mb-space-md p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-surface-container to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
                  CHAMPIONS
                </span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  FC Barcelona • LaLiga 2024/25 Champions
                </h2>
                <span className="text-xs text-amber-300 font-semibold">(28th League Title • Hansi Flick)</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl">
                Hansi Flick guided FC Barcelona to their 28th league title in dazzling attacking fashion, scoring an extraordinary 102 goals and accumulating 88 points (28W, 4D, 6L, +63 GD) to finish 4 points clear of Real Madrid (84 pts). With UEFA European Performance Spots in play, Spain secured 5 Champions League places (FCB, RMA, ATM, ATH, VIL).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-amber-300 border border-amber-500/20">
              102 Goals Scored (+63 GD)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-tertiary border border-tertiary/20">
              Top 5 UCL Qualifiers (VIL 5th)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary-fixed border border-primary-fixed/20">
              Rayo: 8th • Conference League
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary-container border border-primary-container/20">
              Relegated: LEG, LPA, VLL
            </span>
          </div>
        </div>
      )}

      {/* 2023-24 Champions Glory Banner */}
      {selectedSeason === '2023-24' && (
        <div className="mb-space-md p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-surface-container to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
                  CHAMPIONS
                </span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  Real Madrid C.F. • LaLiga 2023/24 Champions
                </h2>
                <span className="text-xs text-amber-300 font-semibold">(Record 36th League Title • Carlo Ancelotti)</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl">
                Carlo Ancelotti steered Real Madrid to their record-extending 36th league crown with 95 points (29W, 8D, 1L, +61 GD), remaining unbeaten at the Santiago Bernabéu and losing just once all campaign. Girona enjoyed a historic fairytale season, finishing 3rd with 81 points and qualifying for the UEFA Champions League for the very first time, while Athletic Club won the Copa del Rey and finished 5th.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-amber-300 border border-amber-500/20">
              Artem Dovbyk: 24 Goals (Pichichi)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-tertiary border border-tertiary/20">
              Unai Simón: Zamora Trophy (0.92)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-secondary border border-secondary/20">
              Girona: Historic 3rd & UCL Debut
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary-container border border-primary-container/20">
              Relegated: CAD, ALM, GRA
            </span>
          </div>
        </div>
      )}

      {/* 2022-23 Champions Glory Banner */}
      {selectedSeason === '2022-23' && (
        <div className="mb-space-md p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-surface-container to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
                  CHAMPIONS
                </span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  FC Barcelona • LaLiga 2022/23 Champions
                </h2>
                <span className="text-xs text-amber-300 font-semibold">(27th League Title • Xavi Hernández)</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl">
                Xavi Hernández guided Barça to their 27th league title with 88 points (28W, 4D, 6L, +50 GD), finishing 10 points clear of Real Madrid (78 pts). Marc-André ter Stegen equaled the all-time LaLiga record with 26 clean sheets (just 20 goals conceded in 38 games) to win the Zamora Trophy, while Robert Lewandowski claimed the Pichichi Trophy in his debut campaign with 23 goals.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-amber-300 border border-amber-500/20">
              Robert Lewandowski: 23 Goals (Pichichi)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-tertiary border border-tertiary/20">
              Ter Stegen: 26 Clean Sheets (Record)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-secondary border border-secondary/20">
              Sevilla: UEL Winners (UCL Spot)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary-container border border-primary-container/20">
              Relegated: VLL, ESP, ELC
            </span>
          </div>
        </div>
      )}

      {/* 2021-22 Champions Glory Banner */}
      {selectedSeason === '2021-22' && (
        <div className="mb-space-md p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-surface-container to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
                  CHAMPIONS
                </span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  Real Madrid C.F. • LaLiga 2021/22 Champions
                </h2>
                <span className="text-xs text-amber-300 font-semibold">(Record 35th League Title)</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl">
                Carlo Ancelotti became the first manager in history to win titles in all five major European leagues as Real Madrid clinched the championship with 86 points (26W, 8D, 4L, +49 GD), 13 points clear of runners-up Barcelona (73 pts). Karim Benzema scored 27 goals to claim the Pichichi Trophy.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-amber-300 border border-amber-500/20">
              Karim Benzema: 27 Goals (Pichichi)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-tertiary border border-tertiary/20">
              Vinícius Jr: 17G + 10A
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-secondary border border-secondary/20">
              Courtois: 16 Clean Sheets
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary-container border border-primary-container/20">
              Relegated: GRA, LEV, ALA
            </span>
          </div>
        </div>
      )}

      {/* 2020-21 Champions Glory Banner */}
      {selectedSeason === '2020-21' && (
        <div className="mb-space-md p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-surface-container to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
                  CHAMPIONS
                </span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  Atlético de Madrid • LaLiga 2020/21 Champions
                </h2>
                <span className="text-xs text-amber-300 font-semibold">(11th League Title)</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl">
                Diego Simeone&apos;s squad clinched the 2020/21 championship with 86 points (26W, 8D, 4L, +42 GD), finishing 2 points ahead of Real Madrid (84 pts). Jan Oblak conceded just 25 goals in 38 matches (18 clean sheets) to win the Zamora Trophy.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-amber-300 border border-amber-500/20">
              Luis Suárez: 21 Goals
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-tertiary border border-tertiary/20">
              Jan Oblak: 18 Clean Sheets
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary-container border border-primary-container/20">
              Relegated: HUE, VLL, EIB
            </span>
          </div>
        </div>
      )}

      {/* Top Telemetry & Championship Pulse Strip */}
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg mb-space-lg pt-2">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm flex-wrap">
            {/* Interactive Matchday / Season Button */}
            <button
              onClick={() => setShowMatchdaysModal(true)}
              type="button"
              className="font-label-caps text-label-caps px-3 py-1 rounded-full bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/40 uppercase tracking-wider font-extrabold cursor-pointer transition-all flex items-center gap-2 group shadow-sm hover:scale-[1.02]"
              title={`Click to view all matchdays and scores of season ${selectedSeason}`}
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>
                {selectedSeason === '2026-27'
                  ? 'Matchday 8 of 38 • Season 26/27 (Matches till Matchday 7 played)'
                  : `Season ${selectedSeason} • All 38 Matchdays Completed`}
              </span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform text-secondary">
                open_in_new
              </span>
            </button>

            {/* Season Badge */}
            <span className="font-label-caps text-label-caps px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary/30 font-semibold uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              {selectedSeason === '2026-27'
                ? 'Season 2026-27 (Active Matchday 7 Completed • MD 8 Upcoming)'
                : selectedSeason === '2025-26'
                ? 'Season 2025-26 (Official Final Standings)'
                : selectedSeason === '2024-25'
                ? 'Season 2024-25 (Official Final Standings)'
                : selectedSeason === '2023-24'
                ? 'Season 2023-24 (Official Final Standings)'
                : selectedSeason === '2022-23'
                ? 'Season 2022-23 (Official Final Standings)'
                : selectedSeason === '2021-22'
                ? 'Season 2021-22 (Official Final Standings)'
                : selectedSeason === '2020-21'
                ? 'Season 2020-21 (Official Final Standings)'
                : `${selectedSeason} Campaign`}
            </span>

            {/* Defensive Fallback Status Pill */}
            {cacheMeta && (
              <span
                className={`font-label-caps text-label-caps px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase font-semibold ${
                  cacheMeta.isFallback
                    ? 'bg-secondary-container/20 text-secondary'
                    : 'bg-tertiary-container/20 text-tertiary'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                {cacheMeta.isFallback ? 'Verified Local Dataset' : 'Live Dataset Active'}
              </span>
            )}
          </div>

          <h1 className="font-display-hero text-headline-lg lg:text-4xl text-on-surface tracking-tight font-bold">
            Current and Previous Seasons Points Table{' '}
            {selectedSeason === '2026-27'
              ? '(2026–27 Current Season • MD 7)'
              : selectedSeason === '2025-26'
              ? '(2025–26 Season)'
              : selectedSeason === '2024-25'
              ? '(2024–25 Season)'
              : selectedSeason === '2023-24'
              ? '(2023–24 Season)'
              : selectedSeason === '2022-23'
              ? '(2022–23 Season)'
              : selectedSeason === '2021-22'
              ? '(2021–22 Season)'
              : selectedSeason === '2020-21'
              ? '(2020–21 Season)'
              : ''}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Official points table, automated matchday updates, European qualification boundaries, home & away records, and relegation battle across all LaLiga EA SPORTS seasons.
          </p>
        </div>

        {/* Pulse Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm border border-surface-container-high/40">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              {selectedSeason === '2026-27' ? 'Current Table Leader' : selectedSeason === '2025-26' || selectedSeason === '2024-25' || selectedSeason === '2023-24' || selectedSeason === '2022-23' || selectedSeason === '2021-22' || selectedSeason === '2020-21' ? 'Champion' : 'Championship Leader'}
            </span>
            <span className="font-headline-sm text-base text-on-surface font-bold truncate">
              {standings[0]?.name || 'Leader'}
            </span>
            <span className="font-tabular-data text-xs text-tertiary font-semibold">
              {standings[0]?.pts ?? 0} Pts ({standings[0]?.gd ?? '+0'} GD) • {standings[0]?.w ?? 0} Wins
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm border border-surface-container-high/40">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">UCL Safety Line</span>
            <span className="font-headline-sm text-base text-on-surface font-bold truncate">
              {selectedSeason === '2024-25' ? `5th • ${standings[4]?.name || '5th Club'}` : `4th • ${standings[3]?.name || '4th Club'}`}
            </span>
            <span className="font-tabular-data text-xs text-on-surface-variant">
              {selectedSeason === '2024-25' ? (standings[4]?.pts ?? 0) : (standings[3]?.pts ?? 0)} Pts ({selectedSeason === '2024-25' ? (standings[4]?.gd ?? '+0') : (standings[3]?.gd ?? '+0')} GD)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm border border-surface-container-high/40">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              {selectedSeason === '2026-27'
                ? 'Title Advantage'
                : selectedSeason === '2025-26' || selectedSeason === '2024-25' || selectedSeason === '2023-24' || selectedSeason === '2022-23' || selectedSeason === '2021-22' || selectedSeason === '2020-21'
                ? 'Winning Margin'
                : 'Title Deficit'}
            </span>
            <span className="font-headline-sm text-base text-on-surface font-bold">
              {Math.max(0, (standings[0]?.pts ?? 0) - (standings[1]?.pts ?? 0))} Points
            </span>
            <span className="font-tabular-data text-xs text-primary font-semibold truncate">
              {selectedSeason === '2026-27'
                ? 'Chasers: Atlético & Betis (16)'
                : selectedSeason === '2025-26'
                ? 'Runner-up: Real Madrid (86)'
                : selectedSeason === '2024-25'
                ? 'Runner-up: Real Madrid (84)'
                : selectedSeason === '2023-24'
                ? 'Runner-up: Barcelona (85)'
                : selectedSeason === '2022-23'
                ? 'Runner-up: Real Madrid (78)'
                : selectedSeason === '2021-22'
                ? 'Runner-up: Barcelona (73)'
                : selectedSeason === '2020-21'
                ? 'Runner-up: Real Madrid (84)'
                : `${standings[1]?.name || 'Challenger'} Chasing`}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-sm border border-surface-container-high/40">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              {selectedSeason === '2026-27' ? 'Relegation Zone' : selectedSeason === '2025-26' || selectedSeason === '2024-25' || selectedSeason === '2023-24' || selectedSeason === '2022-23' || selectedSeason === '2021-22' || selectedSeason === '2020-21' ? 'Relegated Cutoff' : 'Relegation Cutoff'}
            </span>
            <span className="font-headline-sm text-base text-on-surface font-bold truncate">
              18th • {standings[17]?.name || '18th Club'}
            </span>
            <span className="font-tabular-data text-xs text-primary-container font-semibold">
              {standings[17]?.pts ?? 0} Pts{' '}
              {selectedSeason === '2026-27' ? '(Relegation Line)' : '(Relegated)'}
            </span>
          </div>
        </div>
      </section>

      {/* Control Ribbon: Season Switcher & Table Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-space-md bg-surface-container-low p-2.5 rounded-2xl border border-surface-container-high/40">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Season Switcher Segmented Control */}
          <div className="inline-flex p-1 rounded-xl bg-surface-container shadow-sm border border-surface-container-high/60 items-center">
            {/* 2026-27 Current Season LIVE button */}
            <button
              onClick={() => setSelectedSeason('2026-27')}
              className={`px-3 py-1.5 rounded-lg font-label-badge text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedSeason === '2026-27'
                  ? 'bg-secondary/25 text-secondary font-black shadow-md border border-secondary/50 ring-1 ring-secondary/30'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>2026–27</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-secondary text-[#030712] font-black uppercase tracking-wider">
                LIVE MD 7
              </span>
            </button>

            {/* 2025-26 Recent Champion */}
            <button
              onClick={() => setSelectedSeason('2025-26')}
              className={`px-3 py-1.5 rounded-lg font-label-badge text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedSeason === '2025-26'
                  ? 'bg-amber-500/20 text-amber-300 font-bold shadow-sm border border-amber-500/40'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">emoji_events</span>
              <span>2025–26</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-extrabold uppercase">
                FCB
              </span>
            </button>
          </div>

          {/* Historical Seasons Selector Dropdown */}
          <div className="relative standings-season-dropdown">
            <button
              onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-label-badge transition-colors cursor-pointer border ${
                selectedSeason !== '2026-27' && selectedSeason !== '2025-26'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border-amber-500/40 shadow-sm'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high border-surface-container-high'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm text-secondary">history_edu</span>
              <span>Season: <strong>{selectedSeason}</strong></span>
              <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
            </button>

            {showSeasonDropdown && (
              <div className="absolute top-full left-0 mt-1 z-30 w-56 rounded-2xl bg-surface-container-high border border-surface-container shadow-2xl py-1.5 divide-y divide-surface-container-low/40">
                {availableSeasons.map((season) => {
                  const isSelected = selectedSeason === season;
                  const champMap: Record<string, string> = {
                    '2026-27': 'LIVE MD 7',
                    '2025-26': 'FCB (94 pts)',
                    '2024-25': 'FCB (88 pts)',
                    '2023-24': 'RMA (95 pts)',
                    '2022-23': 'FCB (88 pts)',
                    '2021-22': 'RMA (86 pts)',
                    '2020-21': 'ATM (86 pts)',
                  };
                  return (
                    <button
                      key={season}
                      onClick={() => {
                        setSelectedSeason(season);
                        setShowSeasonDropdown(false);
                      }}
                      type="button"
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-primary-container/20 text-on-primary-container font-bold'
                          : 'text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">{season}</span>
                        {season === '2026-27' && <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />}
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        season === '2026-27'
                          ? 'bg-secondary/20 text-secondary'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {champMap[season] || 'Final'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Table Mode Filters */}
          <div className="inline-flex p-1 rounded-xl bg-surface-container shadow-sm border border-surface-container-high/60">
            <button
              onClick={() => setTableFilter('all')}
              className={`px-3 py-1 rounded-lg font-label-badge text-xs transition-all cursor-pointer ${
                tableFilter === 'all'
                  ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              All Matches
            </button>
            <button
              onClick={() => setTableFilter('home')}
              className={`px-3 py-1 rounded-lg font-label-badge text-xs transition-all cursor-pointer ${
                tableFilter === 'home'
                  ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Home
            </button>
            <button
              onClick={() => setTableFilter('away')}
              className={`px-3 py-1 rounded-lg font-label-badge text-xs transition-all cursor-pointer ${
                tableFilter === 'away'
                  ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Away
            </button>
            <button
              onClick={() => setTableFilter('xg')}
              className={`px-3 py-1 rounded-lg font-label-badge text-xs transition-all cursor-pointer ${
                tableFilter === 'xg'
                  ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Top Attacks
            </button>
          </div>
        </div>

        {/* Search Input for Standings Table and CSV Export */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-base pointer-events-none">
              search
            </span>
            <input
              className="w-44 sm:w-56 h-8 pl-8 pr-7 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-surface-container-high"
              placeholder="Filter table clubs..."
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-2 p-0.5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs text-on-surface transition-colors cursor-pointer border border-surface-container-high shrink-0"
            type="button"
            title="Download CSV Table"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span className="hidden sm:inline font-label-badge">CSV</span>
          </button>
        </div>
      </div>

      {/* Standings Table Container */}
      <div className="rounded-xl bg-surface-container shadow-xl overflow-hidden border border-surface-container-high">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-tertiary/20 border-t-tertiary rounded-full animate-spin"></div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Loading {selectedSeason} Standings Data...
            </span>
          </div>
        ) : filteredAndSortedRows.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
            <p className="font-headline-sm text-base text-on-surface">No clubs found matching &quot;{localSearch}&quot;</p>
            <p className="text-xs text-on-surface-variant">Try searching for a different club name or clear the filter.</p>
            <button
              onClick={() => setLocalSearch('')}
              className="mt-2 px-4 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest cursor-pointer"
              type="button"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider bg-surface-container-low/60">
                  <th className="py-3 px-4 w-12 text-center">Pos</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-3 text-center">
                    {tableFilter === 'home' ? 'Home P' : tableFilter === 'away' ? 'Away P' : 'Played'}
                  </th>
                  <th className="py-3 px-3 text-center">
                    {tableFilter === 'home' ? 'Home W' : tableFilter === 'away' ? 'Away W' : 'Won'}
                  </th>
                  <th className="py-3 px-3 text-center">
                    {tableFilter === 'home' ? 'Home D' : tableFilter === 'away' ? 'Away D' : 'Drawn'}
                  </th>
                  <th className="py-3 px-3 text-center">
                    {tableFilter === 'home' ? 'Home L' : tableFilter === 'away' ? 'Away L' : 'Lost'}
                  </th>
                  <th className="py-3 px-3 text-center hidden md:table-cell">
                    {tableFilter === 'home' ? 'Home GF' : tableFilter === 'away' ? 'Away GF' : 'GF'}
                  </th>
                  <th className="py-3 px-3 text-center hidden md:table-cell">
                    {tableFilter === 'home' ? 'Home GA' : tableFilter === 'away' ? 'Away GA' : 'GA'}
                  </th>
                  <th className="py-3 px-3 text-center">
                    {tableFilter === 'home' ? 'Home GD' : tableFilter === 'away' ? 'Away GD' : 'GD'}
                  </th>
                  <th className="py-3 px-4 text-center hidden lg:table-cell">Recent Form</th>
                  <th className="py-3 px-4 text-center font-bold text-on-surface">
                    {tableFilter === 'home' ? 'Home Pts' : tableFilter === 'away' ? 'Away Pts' : 'Points'}
                  </th>
                  <th className="py-3 px-3 text-center w-12">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40 text-body-sm font-body-sm">
                {displayedRows.map((row, index) => {
                  const isHome = tableFilter === 'home' && row.home;
                  const isAway = tableFilter === 'away' && row.away;
                  const activeStats = isHome ? row.home! : isAway ? row.away! : row;
                  const displayRank = tableFilter === 'all' ? row.pos : index + 1;

                  return (
                    <tr
                      key={row.code + row.pos}
                      className="hover:bg-surface-container-high/50 transition-colors group cursor-pointer"
                      onClick={() => onSelectClub && onSelectClub(row.code)}
                    >
                      {/* Position Indicator */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {getPositionIndicator(row.zone)}
                          <span className="font-tabular-data font-bold text-on-surface">{displayRank}</span>
                        </div>
                      </td>

                      {/* Club Name & Stadium */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <TeamCrestBadge teamName={row.name} size="sm" />
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-headline-sm text-sm text-on-surface font-semibold group-hover:text-primary transition-colors truncate">
                                {row.name}
                              </span>
                              {selectedSeason === '2022-23' && row.pos === 12 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-primary-fixed/20 text-primary-fixed border border-primary-fixed/40">
                                  UEL Winner • UCL Spot
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-on-surface-variant truncate">{row.stadium}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center font-tabular-data text-on-surface-variant">
                        {activeStats.p}
                      </td>
                      <td className="py-3.5 px-3 text-center font-tabular-data font-semibold text-tertiary">
                        {activeStats.w}
                      </td>
                      <td className="py-3.5 px-3 text-center font-tabular-data text-on-surface-variant">
                        {activeStats.d}
                      </td>
                      <td className="py-3.5 px-3 text-center font-tabular-data text-primary-container">
                        {activeStats.l}
                      </td>
                      <td className="py-3.5 px-3 text-center font-tabular-data text-on-surface-variant hidden md:table-cell">
                        {activeStats.gf}
                      </td>
                      <td className="py-3.5 px-3 text-center font-tabular-data text-on-surface-variant hidden md:table-cell">
                        {activeStats.ga}
                      </td>
                      <td className="py-3.5 px-3 text-center font-tabular-data font-semibold text-on-surface">
                        {activeStats.gd}
                      </td>

                      {/* Form Badges */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          {row.form.map((res, idx) => renderFormBadge(res, idx))}
                        </div>
                      </td>

                      {/* Points */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-tabular-data text-base font-extrabold text-on-surface bg-surface-container-low px-2.5 py-1 rounded-lg">
                          {activeStats.pts}
                        </span>
                      </td>

                      {/* Quick Link Arrow */}
                      <td className="py-3.5 px-3 text-center text-on-surface-variant group-hover:text-primary">
                        <span className="material-symbols-outlined text-lg leading-none">arrow_forward</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer with Expansion & Zone Legend */}
        <div className="p-4 bg-surface-container-low/80 border-t border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Zone Legend */}
          <div className="flex items-center gap-3 flex-wrap text-xs text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <span>
                {selectedSeason === '2024-25'
                  ? 'Positions 1, 2, 3, 4, 5: Champions League'
                  : selectedSeason === '2022-23'
                  ? 'UEFA Champions League (1-4 & 12 • Sevilla UEL Winner)'
                  : 'Positions 1, 2, 3, 4: Champions League'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span>
                {selectedSeason === '2024-25'
                  ? 'Positions 6, 7: Europa League'
                  : 'Positions 5, 6: Europa League'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed"></span>
              <span>
                {selectedSeason === '2024-25'
                  ? 'Position 8: Conference League qualifying'
                  : 'Position 7: Conference League qualifying'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              <span>Positions 18, 19, 20: Relegation</span>
            </div>
          </div>

          {/* Expand / Collapse Button */}
          {filteredAndSortedRows.length > 10 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-on-surface font-semibold transition-colors cursor-pointer self-start sm:self-auto"
              type="button"
            >
              <span>{expanded ? 'Show Top 10 Only' : `Expand Full Table (${filteredAndSortedRows.length} Clubs)`}</span>
              <span className="material-symbols-outlined text-sm">{expanded ? 'expand_less' : 'expand_more'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Season All Matchdays & Scores Modal */}
      <Season2627MatchdaysModal
        isOpen={showMatchdaysModal}
        onClose={() => setShowMatchdaysModal(false)}
        initialMatchday={selectedSeason === '2026-27' ? 8 : 1}
        season={selectedSeason}
        onNavigateToCalendar={onNavigateToCalendar}
        onSelectClub={onSelectClub}
      />
    </div>
  );
};
