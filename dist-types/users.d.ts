/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.526Z
 */

import type { ApiBotVerification, ApiEmojiStatusType, ApiFakeType, ApiPeerColor, ApiPeerSettings, ApiProfileTab } from './peers';
import type { ApiBotInfo } from './bots';
import type { ApiPhoto } from './messages';
import type { ApiBusinessIntro, ApiBusinessLocation, ApiBusinessWorkHours } from './business';
import type { ApiStarsRating } from './stars';

export type ApiUserType = 'userTypeBot' | 'userTypeRegular' | 'userTypeDeleted' | 'userTypeUnknown';

export interface ApiUsername {
  username: string;
  isActive?: boolean;
  isEditable?: boolean;
}

export interface ApiUser {
  id: string;
  isMin: boolean;
  isSelf?: true;
  isVerified?: true;
  isPremium?: boolean;
  isCloseFriend?: boolean;
  isContact?: true;
  isSupport?: true;
  type: ApiUserType;
  firstName?: string;
  lastName?: string;
  noStatus?: boolean;
  usernames?: ApiUsername[];
  hasUsername?: boolean;
  phoneNumber: string;
  accessHash?: string;
  hasVideoAvatar?: boolean;
  avatarPhotoId?: string;
  botPlaceholder?: string;
  canBeInvitedToGroup?: boolean;
  fakeType?: ApiFakeType;
  isAttachBot?: boolean;
  emojiStatus?: ApiEmojiStatusType;
  areStoriesHidden?: boolean;
  hasStories?: boolean;
  hasUnreadStories?: boolean;
  maxStoryId?: number;
  color?: ApiPeerColor;
  profileColor?: ApiPeerColor;
  canEditBot?: boolean;
  hasMainMiniApp?: boolean;
  botActiveUsers?: number;
  botVerificationIconId?: string;
  paidMessagesStars?: number;
}

export interface ApiDisallowedGifts {
  shouldDisallowUnlimitedStarGifts?: boolean;
  shouldDisallowLimitedStarGifts?: boolean;
  shouldDisallowUniqueStarGifts?: boolean;
  shouldDisallowPremiumGifts?: boolean;
}

export interface ApiBirthday {
  day: number;
  month: number;
  year?: number;
}

export interface ApiUserFullInfo {
  isBlocked?: boolean;
  bio?: string;
  commonChatsCount?: number;
  pinnedMessageId?: number;
  botInfo?: ApiBotInfo;
  profilePhoto?: ApiPhoto;
  fallbackPhoto?: ApiPhoto;
  personalPhoto?: ApiPhoto;
  noVoiceMessages?: boolean;
  isTranslationDisabled?: true;
  areAdsEnabled?: boolean;
  hasPinnedStories?: boolean;
  isContactRequirePremium?: boolean;
  shouldDisplayGiftsButton?: boolean;
  disallowedGifts?: ApiDisallowedGifts;
  birthday?: ApiBirthday;
  personalChannelId?: string;
  personalChannelMessageId?: number;
  businessLocation?: ApiBusinessLocation;
  businessWorkHours?: ApiBusinessWorkHours;
  businessIntro?: ApiBusinessIntro;
  starGiftCount?: number;
  starsRating?: ApiStarsRating;
  starsMyPendingRating?: ApiStarsRating;
  starsMyPendingRatingDate?: number;
  isBotCanManageEmojiStatus?: boolean;
  isBotAccessEmojiGranted?: boolean;
  hasScheduledMessages?: boolean;
  botVerification?: ApiBotVerification;
  paidMessagesStars?: number;
  settings?: ApiPeerSettings;
  mainTab?: ApiProfileTab;
}

export type ApiChatType = 'bots' | 'channels' | 'chats' | 'users' | 'groups';

