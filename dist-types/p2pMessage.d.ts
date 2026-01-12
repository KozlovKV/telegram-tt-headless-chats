/* tslint:disable */
/* eslint-disable */
/**
 * Auto-generated type definitions from telegram-web
 * Generated: 2026-01-12T05:13:42.533Z
 */

import type { RTCPFeedbackParam, RTPExtension } from './types';

type P2pSsrcGroup = {
  semantics?: string;
  ssrcs: number[];
};

export interface P2PPayloadType {
  id: number;
  name: string;
  clockrate: number;
  channels: number;
  parameters?: Record<string, string>;
  feedbackTypes?: RTCPFeedbackParam[];
}

export type MediaContent = {
  ssrc: string;
  ssrcGroups: P2pSsrcGroup[];
  payloadTypes: P2PPayloadType[];
  rtpExtensions: RTPExtension[];
};

