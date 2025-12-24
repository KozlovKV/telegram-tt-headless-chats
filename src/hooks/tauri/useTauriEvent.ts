import type { Event } from '@tauri-apps/api/event';
import { useEffect, useRef } from '../../lib/teact/teact';

import { IS_TAURI_NEW } from '../../util/browser/globalEnvironment';

export default function useTauriEvent<T>(name: string, callback: (event: Event<T>) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useEffect(() => {
    if (!IS_TAURI_NEW) return;

    let unlisten: VoidFunction;

    const setUpListener = async () => {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      const window = getCurrentWindow();
      // eslint-disable-next-line no-console
      console.log('setting up', name);

      unlisten = await window.listen<T>(name, (event) => {
        callbackRef.current(event);
      });
    };

    setUpListener().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`Could not set up window event listener. ${error}`);
    });

    return () => {
      // eslint-disable-next-line no-console
      console.log('unlisten', name);
      unlisten?.();
    };
  }, [name]);
}
