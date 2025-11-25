import { invoke } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { callApi } from '../../../api/gramjs';
import { getActions } from '../..';

const window = getCurrentWindow();

window.listen<string>('external://open-chat', (e) => {
  if (!e.payload) return;
  getActions().openChat({ id: '-' + e.payload, shouldReplaceHistory: true });
});

window.listen<string>('external://chats-request', async () => {
  try {
    const response = await callApi('fetchChats', { limit: 100 });
    console.log('Got chats: ', response);
    if (!response) return;
    invoke('send_update', {
      update: {
        label: 'external://chats-response',
        body: response.chatIds,
      },
    });
  } catch (err) {
    console.error('Failed to get chats:', err);
  }
});
