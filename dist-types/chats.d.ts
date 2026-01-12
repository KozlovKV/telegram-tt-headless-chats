/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.528Z
 */

import type { ApiChatType, ApiUsername } from './users';
import type { ApiEmojiStatusType, ApiFakeType, ApiPeerColor, ApiSendAsPeerId } from './peers';
import type { ApiChatInviteImporter, ApiRestrictionReason } from './misc';

export interface ApiChatAdminRights {
  changeInfo?: true;
  postMessages?: true;
  editMessages?: true;
  deleteMessages?: true;
  banUsers?: true;
  inviteUsers?: true;
  pinMessages?: true;
  addAdmins?: true;
  anonymous?: true;
  manageCall?: true;
  manageTopics?: true;
  postStories?: true;
  editStories?: true;
  deleteStories?: true;
}

export interface ApiChatBannedRights {
  viewMessages?: true;
  sendMessages?: true;
  sendMedia?: true;
  sendStickers?: true;
  sendGifs?: true;
  sendGames?: true;
  sendInline?: true;
  embedLinks?: true;
  sendPolls?: true;
  changeInfo?: true;
  inviteUsers?: true;
  pinMessages?: true;
  manageTopics?: true;
  sendPhotos?: true;
  sendVideos?: true;
  sendRoundvideos?: true;
  sendAudios?: true;
  sendVoices?: true;
  sendDocs?: true;
  sendPlain?: true;
  untilDate?: number;
}

export interface ApiChat {
  id: string;
  folderId?: number;
  type: ApiChatType;
  title: string;
  hasUnreadMark?: boolean;
  lastReadOutboxMessageId?: number;
  lastReadInboxMessageId?: number;
  unreadCount?: number;
  unreadMentionsCount?: number;
  unreadReactionsCount?: number;
  isVerified?: true;
  areSignaturesShown?: boolean;
  areProfilesShown?: boolean;
  isLinkedInDiscussion?: boolean;
  hasGeo?: boolean;
  accessHash?: string;
  isMin?: boolean;
  hasVideoAvatar?: boolean;
  avatarPhotoId?: string;
  usernames?: ApiUsername[];
  hasUsername?: boolean;
  membersCount?: number;
  creationDate?: number;
  isSupport?: true;
  draftDate?: number;
  isProtected?: boolean;
  fakeType?: ApiFakeType;
  color?: ApiPeerColor;
  profileColor?: ApiPeerColor;
  emojiStatus?: ApiEmojiStatusType;
  isForum?: boolean;
  isForumAsMessages?: true;
  isMonoforum?: boolean;
  withForumTabs?: boolean;
  linkedMonoforumId?: string;
  areChannelMessagesAllowed?: boolean;
  boostLevel?: number;
  botVerificationIconId?: string;
  hasAutoTranslation?: true;
  level?: number;

  // Calls
  isCallActive?: boolean;
  isCallNotEmpty?: boolean;

  // Current user permissions
  isNotJoined?: boolean;
  isListed?: boolean;
  isCreator?: boolean;
  isForbidden?: boolean; // Forbidden - can't send messages (user was kicked, for example)
  isRestricted?: boolean; // Restricted - can't access the chat (user was banned or chat is violating rules)
  restrictionReasons?: ApiRestrictionReason[];
  adminRights?: ApiChatAdminRights;
  currentUserBannedRights?: ApiChatBannedRights;
  defaultBannedRights?: ApiChatBannedRights;

  migratedTo?: {
    chatId: string;
    accessHash?: string;
  };

  joinRequests?: ApiChatInviteImporter[];
  isJoinToSend?: boolean;
  isJoinRequest?: boolean;
  sendAsPeerIds?: ApiSendAsPeerId[];
  sendPaidReactionsAsPeerIds?: ApiSendAsPeerId[];
  sendPaidReactionsPeer?: ApiSendAsPeerId;

  unreadReactions?: number[];
  unreadMentions?: number[];

  // Stories
  areStoriesHidden?: boolean;
  hasStories?: boolean;
  hasUnreadStories?: boolean;
  maxStoryId?: number;

  subscriptionUntil?: number;

  // Locally determined field
  detectedLanguage?: string;

  paidMessagesStars?: number;
}

