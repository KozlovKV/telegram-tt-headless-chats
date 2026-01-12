/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.531Z
 */


export interface ApiStarsRating {
  level: number;
  currentLevelStars: number;
  stars: number;
  nextLevelStars?: number;
}

export interface ApiStarsAmount {
  currency: 'XTR';
  amount: number;
  nanos: number;
}

export interface ApiTonAmount {
  currency: 'TON';
  amount: number;
}

export type ApiTypeCurrencyAmount = ApiStarsAmount | ApiTonAmount;

