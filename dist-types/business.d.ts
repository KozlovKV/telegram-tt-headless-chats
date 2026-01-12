/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.530Z
 */

import type { ApiGeoPoint, ApiSticker } from './messages';

export interface ApiBusinessLocation {
  geo?: ApiGeoPoint;
  address: string;
}

export interface ApiBusinessTimetableSegment {
  startMinute: number;
  endMinute: number;
}

export interface ApiBusinessWorkHours {
  timezoneId: string;
  workHours: ApiBusinessTimetableSegment[];
}

export interface ApiBusinessIntro {
  title: string;
  description: string;
  sticker?: ApiSticker;
}

