/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.525Z
 */

import type { MediaContent } from './p2pMessage';
import type { ApiRestrictionReason } from './misc';
import type { ApiTypeCurrencyAmount } from './stars';

export interface ApiDimensions {
  width: number;
  height: number;
}

export interface ApiMessageForwardInfo {
  date: number;
  savedDate?: number;
  isImported?: boolean;
  isChannelPost: boolean;
  channelPostId?: number;
  isLinkedChannelPost?: boolean;
  fromChatId?: string;
  fromId?: string;
  savedFromPeerId?: string;
  isSavedOutgoing?: boolean;
  fromMessageId?: number;
  hiddenUserName?: string;
  postAuthorTitle?: string;
}

export enum ApiMessageEntityTypes {
  Bold = 'MessageEntityBold',
  Blockquote = 'MessageEntityBlockquote',
  BotCommand = 'MessageEntityBotCommand',
  Cashtag = 'MessageEntityCashtag',
  Code = 'MessageEntityCode',
  Email = 'MessageEntityEmail',
  Hashtag = 'MessageEntityHashtag',
  Italic = 'MessageEntityItalic',
  MentionName = 'MessageEntityMentionName',
  Mention = 'MessageEntityMention',
  Phone = 'MessageEntityPhone',
  Pre = 'MessageEntityPre',
  Strike = 'MessageEntityStrike',
  TextUrl = 'MessageEntityTextUrl',
  Url = 'MessageEntityUrl',
  Underline = 'MessageEntityUnderline',
  Spoiler = 'MessageEntitySpoiler',
  CustomEmoji = 'MessageEntityCustomEmoji',
  Timestamp = 'MessageEntityTimestamp',
  QuoteFocus = 'MessageEntityQuoteFocus',
  Unknown = 'MessageEntityUnknown',
}

export type ApiMessageEntityDefault = {
  type: Exclude<
  `${ApiMessageEntityTypes}`,
  `${ApiMessageEntityTypes.Pre}` | `${ApiMessageEntityTypes.TextUrl}` | `${ApiMessageEntityTypes.MentionName}` |
  `${ApiMessageEntityTypes.CustomEmoji}` | `${ApiMessageEntityTypes.Blockquote}` | `${ApiMessageEntityTypes.Timestamp}`
  >;
  offset: number;
  length: number;
};

export type ApiMessageEntityPre = {
  type: ApiMessageEntityTypes.Pre;
  offset: number;
  length: number;
  language?: string;
};

export type ApiMessageEntityTextUrl = {
  type: ApiMessageEntityTypes.TextUrl;
  offset: number;
  length: number;
  url: string;
};

export type ApiMessageEntityMentionName = {
  type: ApiMessageEntityTypes.MentionName;
  offset: number;
  length: number;
  userId: string;
};

export type ApiMessageEntityCustomEmoji = {
  type: ApiMessageEntityTypes.CustomEmoji;
  offset: number;
  length: number;
  documentId: string;
};

export type ApiMessageEntityBlockquote = {
  type: ApiMessageEntityTypes.Blockquote;
  offset: number;
  length: number;
  canCollapse?: boolean;
};

export type ApiMessageEntityTimestamp = {
  type: ApiMessageEntityTypes.Timestamp;
  offset: number;
  length: number;
  timestamp: number;
};

export type ApiMessageEntityQuoteFocus = {
  type: 'quoteFocus';
  offset: number;
  length: number;
};

export type ApiMessageEntity = ApiMessageEntityDefault | ApiMessageEntityPre | ApiMessageEntityTextUrl |
  ApiMessageEntityMentionName | ApiMessageEntityCustomEmoji | ApiMessageEntityBlockquote | ApiMessageEntityTimestamp |
  ApiMessageEntityQuoteFocus;

export interface ApiFormattedText {
  text: string;
  entities?: ApiMessageEntity[];
}

export interface ApiMessageReplyInfo {
  type: 'message';
  replyToMsgId?: number;
  replyToPeerId?: string;
  replyFrom?: ApiMessageForwardInfo;
  replyMedia?: MediaContent;
  replyToTopId?: number;
  isForumTopic?: true;
  isQuote?: true;
  quoteText?: ApiFormattedText;
  quoteOffset?: number;
}

export interface ApiStoryReplyInfo {
  type: 'story';
  peerId: string;
  storyId: number;
}

export type ApiReplyInfo = ApiMessageReplyInfo | ApiStoryReplyInfo;

export interface ApiInputSuggestedPostInfo {
  price?: ApiTypeCurrencyAmount;
  scheduleDate?: number;
  isAccepted?: true;
  isRejected?: true;
}

interface ApiKeyboardButtonSimple {
  type: 'unsupported' | 'buy' | 'command' | 'requestPhone' | 'game';
  text: string;
}

interface ApiKeyboardButtonReceipt {
  type: 'receipt';
  receiptMessageId: number;
}

interface ApiKeyboardButtonUrl {
  type: 'url';
  text: string;
  url: string;
}

interface ApiKeyboardButtonCallback {
  type: 'callback';
  text: string;
  data: string;
}

interface ApiKeyboardButtonRequestPoll {
  type: 'requestPoll';
  text: string;
  isQuiz?: boolean;
}

interface ApiKeyboardButtonSwitchBotInline {
  type: 'switchBotInline';
  text: string;
  query: string;
  isSamePeer?: boolean;
}

interface ApiKeyboardButtonUserProfile {
  type: 'userProfile';
  text: string;
  userId: string;
}

interface ApiKeyboardButtonWebView {
  type: 'webView';
  text: string;
  url: string;
}

interface ApiKeyboardButtonSimpleWebView {
  type: 'simpleWebView';
  text: string;
  url: string;
}

interface ApiKeyboardButtonUrlAuth {
  type: 'urlAuth';
  text: string;
  url: string;
  buttonId: number;
}

interface ApiKeyboardButtonCopy {
  type: 'copy';
  text: string;
  copyText: string;
}

export interface ApiKeyboardButtonSuggestedMessage {
  type: 'suggestedMessage';
  text: string;
  buttonType: 'approve' | 'decline' | 'suggestChanges';
  disabled?: boolean;
}

export type ApiKeyboardButton = (
  ApiKeyboardButtonSimple
  | ApiKeyboardButtonReceipt
  | ApiKeyboardButtonUrl
  | ApiKeyboardButtonCallback
  | ApiKeyboardButtonRequestPoll
  | ApiKeyboardButtonSwitchBotInline
  | ApiKeyboardButtonUserProfile
  | ApiKeyboardButtonWebView
  | ApiKeyboardButtonSimpleWebView
  | ApiKeyboardButtonUrlAuth
  | ApiKeyboardButtonCopy
  | ApiKeyboardButtonSuggestedMessage
);

export type ApiKeyboardButtons = ApiKeyboardButton[][];

export type ApiReactionEmoji = {
  type: 'emoji';
  emoticon: string;
};

export type ApiReactionCustomEmoji = {
  type: 'custom';
  documentId: string;
};

export type ApiReaction = ApiReactionEmoji | ApiReactionCustomEmoji;

export interface ApiPeerReaction {
  peerId: string;
  reaction: ApiReaction;
  isOwn?: boolean;
  isBig?: boolean;
  isUnread?: boolean;
  addedDate: number;
}

export type ApiReactionPaid = {
  type: 'paid';
};

export type ApiReactionWithPaid = ApiReaction | ApiReactionPaid;

export interface ApiReactionCount {
  chosenOrder?: number;
  count: number;
  reaction: ApiReactionWithPaid;
  localAmount?: number;
  localIsPrivate?: boolean;
  localPeerId?: string;
  localPreviousChosenOrder?: number;
}

export interface ApiMessageReactor {
  isTop?: true;
  isMy?: true;
  count: number;
  isAnonymous?: true;
  peerId?: string;
}

export interface ApiReactions {
  canSeeList?: boolean;
  areTags?: boolean;
  results: ApiReactionCount[];
  recentReactions?: ApiPeerReaction[];
  topReactors?: ApiMessageReactor[];
}

export type ApiFactCheck = {
  shouldFetch?: true;
  hash: string;
  countryCode?: string;
  text?: ApiFormattedText;
};

export interface ApiMessage {
  id: number;
  chatId: string;
  content: MediaContent;
  date: number;
  isOutgoing: boolean;
  senderId?: string;
  replyInfo?: ApiReplyInfo;
  suggestedPostInfo?: ApiInputSuggestedPostInfo;
  sendingState?: 'messageSendingStatePending' | 'messageSendingStateFailed';
  forwardInfo?: ApiMessageForwardInfo;
  isDeleting?: boolean;
  previousLocalId?: number;
  viewsCount?: number;
  forwardsCount?: number;
  isEdited?: boolean;
  editDate?: number;
  isMentioned?: boolean;
  isMediaUnread?: boolean;
  groupedId?: string;
  isInAlbum?: boolean;
  hasUnreadMention?: boolean;
  inlineButtons?: ApiKeyboardButtons;
  keyboardButtons?: ApiKeyboardButtons;
  keyboardPlaceholder?: string;
  isKeyboardSingleUse?: boolean;
  isKeyboardSelective?: boolean;
  viaBotId?: string;
  viaBusinessBotId?: string;
  postAuthorTitle?: string;
  isScheduled?: boolean;
  shouldHideKeyboardButtons?: boolean;
  isHideKeyboardSelective?: boolean;
  isFromScheduled?: boolean;
  isSilent?: boolean;
  isPinned?: boolean;
  seenByDates?: Record<string, number>;
  isProtected?: boolean;
  isForwardingAllowed?: boolean;
  transcriptionId?: string;
  isTranscriptionError?: boolean;
  reactors?: {
    nextOffset?: string;
    count: number;
    reactions: ApiPeerReaction[];
  };
  reactions?: ApiReactions;
  hasComments?: boolean;
  readDate?: number;
  savedPeerId?: string;
  senderBoosts?: number;
  factCheck?: ApiFactCheck;
  effectId?: string;
  isInvertedMedia?: true;
  isVideoProcessingPending?: true;
  areReactionsPossible?: true;
  reportDeliveryUntilDate?: number;
  paidMessageStars?: number;
  restrictionReasons?: ApiRestrictionReason[];
}

export interface ApiThumbnail extends ApiDimensions {
  dataUri: string;
}

export interface ApiPhotoSize extends ApiDimensions {
  type: 's' | 'm' | 'x' | 'y' | 'w';
}

export interface ApiVideoSize extends ApiDimensions {
  type: 'u' | 'v';
  videoStartTs?: number;
  size: number;
}

export interface ApiPhoto {
  mediaType: 'photo';
  id: string;
  date: number;
  thumbnail?: ApiThumbnail;
  isVideo?: boolean;
  sizes: ApiPhotoSize[];
  videoSizes?: ApiVideoSize[];
  blobUrl?: string;
  isSpoiler?: boolean;
}

export interface ApiVideo {
  mediaType: 'video';
  id: string;
  mimeType: string;
  duration: number;
  fileName: string;
  width?: number;
  height?: number;
  supportsStreaming?: boolean;
  isRound?: boolean;
  isGif?: boolean;
  hasVideoPreview?: boolean;
  isSpoiler?: boolean;
  thumbnail?: ApiThumbnail;
  previewPhotoSizes?: ApiPhotoSize[];
  blobUrl?: string;
  previewBlobUrl?: string;
  size: number;
  noSound?: boolean;
  waveform?: number[];
  timestamp?: number;
}

export interface ApiGeoPoint {
  long: number;
  lat: number;
  accessHash: string;
  accuracyRadius?: number;
}

type ApiStickerSetInfoShortName = {
  shortName: string;
};

type ApiStickerSetInfoId = {
  id: string;
  accessHash: string;
};

type ApiStickerSetInfoMissing = {
  isMissing: true;
};

export type ApiStickerSetInfo = ApiStickerSetInfoShortName | ApiStickerSetInfoId | ApiStickerSetInfoMissing;

export interface ApiSticker {
  mediaType: 'sticker';
  id: string;
  stickerSetInfo: ApiStickerSetInfo;
  emoji?: string;
  isCustomEmoji?: boolean;
  isLottie: boolean;
  isVideo: boolean;
  width?: number;
  height?: number;
  thumbnail?: ApiThumbnail;
  previewPhotoSizes?: ApiPhotoSize[];
  isPreloadedGlobally?: boolean;
  hasEffect?: boolean;
  isFree?: boolean;
  shouldUseTextColor?: boolean;
}

