import { customRef, onScopeDispose, type Ref } from 'vue';

interface TabUpdateEventDetail<T> {
  key: string;
  value: T | null;
}

const SAME_TAB_EVENT = 'use-localstorage-ref';

export function useLocalstorageRef<T extends string | number | boolean>(
  key: string,
): Ref<T | null> {
  const parse = (raw: string | null): T | null => {
    if (raw === null) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  };

  const safeRead = (): T | null => {
    try {
      return parse(window.localStorage.getItem(key));
    } catch {
      return null;
    }
  };

  return customRef<T | null>((track, trigger) => {
    let state: T | null = safeRead();

    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== window.localStorage || e.key !== key) return;
      state = parse(e.newValue);
      trigger();
    };

    const onSameTab = (event: Event) => {
      const custom = event as CustomEvent<TabUpdateEventDetail<T>>;
      const { detail } = custom || ({} as CustomEvent<TabUpdateEventDetail<T>>);
      if (!detail || detail.key !== key) return;
      state = detail.value;
      trigger();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(SAME_TAB_EVENT, onSameTab);

    onScopeDispose(() => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(SAME_TAB_EVENT, onSameTab);
    });

    return {
      get() {
        track();
        return state;
      },
      set(value: T | null) {
        state = value;

        try {
          if (value === null) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, JSON.stringify(value));
          }

          window.dispatchEvent(new CustomEvent(SAME_TAB_EVENT, { detail: { key, value } }));
        } catch {}

        trigger();
      },
    };
  });
}
