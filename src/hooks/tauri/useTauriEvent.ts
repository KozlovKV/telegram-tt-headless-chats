import type { Event } from '@tauri-apps/api/event';
import { useEffect } from '../../lib/teact/teact';

import { IS_TAURI_NEW } from '../../util/browser/globalEnvironment';

export default function useTauriEvent<T>(name: string, callback: (event: Event<T>) => void) {
  return useEffect(() => {
    if (!IS_TAURI_NEW) {
      return undefined;
    }

    const uuid = crypto.randomUUID();
    let removeListener: VoidFunction | undefined;

    const setUpListener = async () => {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      const window = getCurrentWindow();
      if (window.listeners[name]) return;
      // console.log('setting up', name, uuid);
      removeListener = await window.listen<T>(name, (event) => {
        callback(event);
      });
    };

    setUpListener().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`Could not set up window event listener. ${error}`);
    });

    return () => {
      // console.log('unlisten', name, uuid);
      removeListener?.();
    };
  }, [name, callback]);
}
