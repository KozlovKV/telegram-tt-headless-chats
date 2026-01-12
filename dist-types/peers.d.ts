/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.529Z
 */


export type ApiFakeType = 'fake' | 'scam';

export interface ApiEmojiStatus {
  type: 'regular';
  documentId: string;
  until?: number;
}

export interface ApiEmojiStatusCollectible {
  type: 'collectible';
  collectibleId: string;
  documentId: string;
  title: string;
  slug: string;
  patternDocumentId: string;
  centerColor: string;
  edgeColor: string;
  patternColor: string;
  textColor: string;
  until?: number;
}

export type ApiEmojiStatusType = ApiEmojiStatus | ApiEmojiStatusCollectible;

export interface ApiPeerColor {
  color?: number;
  backgroundEmojiId?: string;
}

export interface ApiBotVerification {
  botId: string;
  iconId: string;
  description: string;
}

export interface ApiPeerSettings {
  isAutoArchived?: boolean;
  canReportSpam?: boolean;
  canAddContact?: boolean;
  canBlockContact?: boolean;
  chargedPaidMessageStars?: number;
  registrationMonth?: string;
  phoneCountry?: string;
  nameChangeDate?: number;
  photoChangeDate?: number;
}

export type ApiProfileTab = 'stories' | 'gifts' | 'media' | 'documents' | 'audio' | 'voice' | 'links' | 'gif';

export interface ApiSendAsPeerId {
  id: string;
  isPremium?: boolean;
}

