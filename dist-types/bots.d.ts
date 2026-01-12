/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.530Z
 */

import type { ApiPhoto, ApiVideo } from './messages';

export interface ApiBotCommand {
  botId: string;
  command: string;
  description: string;
}

type ApiBotMenuButtonWebApp = {
  type: 'webApp';
  text: string;
  url: string;
};

type ApiBotMenuButtonCommands = {
  type: 'commands';
};

export type ApiBotMenuButton = ApiBotMenuButtonWebApp | ApiBotMenuButtonCommands;

export interface ApiBotAppSettings {
  placeholderPath?: string;
  backgroundColor?: string;
  backgroundDarkColor?: string;
  headerColor?: string;
  headerDarkColor?: string;
}

export interface ApiBotInfo {
  botId: string;
  commands?: ApiBotCommand[];
  description?: string;
  photo?: ApiPhoto;
  gif?: ApiVideo;
  menuButton: ApiBotMenuButton;
  privacyPolicyUrl?: string;
  hasPreviewMedia?: true;
  appSettings?: ApiBotAppSettings;
}

