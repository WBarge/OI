import { vi } from 'vitest';
import { LocalStorageRefreshTokenStore, REFRESH_KEY } from './refresh-token-store';

describe('LocalStorageRefreshTokenStore', () => {
  let store: LocalStorageRefreshTokenStore;

  beforeEach(() => {
    localStorage.clear();
    store = new LocalStorageRefreshTokenStore();
  });

  afterEach(() => localStorage.clear());

  it('should keep the token under the same key the OI UI has always used, so existing sessions survive', () => {
    expect(REFRESH_KEY).toBe('oi.refresh');
  });

  it('should have no token to begin with', () => {
    expect(store.get()).toBeNull();
  });

  it('should remember a token, and replace it', () => {
    store.set('one');
    store.set('two');

    expect(store.get()).toBe('two');
    expect(localStorage.getItem(REFRESH_KEY)).toBe('two');
  });

  it('should forget the token', () => {
    store.set('one');

    store.clear();

    expect(store.get()).toBeNull();
  });

  describe('when another window signs out', () => {
    const storageEvent = (key: string | null) => window.dispatchEvent(new StorageEvent('storage', { key }));

    it('should call back when the token key was removed', () => {
      const callback = vi.fn();
      store.onExternalRemoval(callback);

      storageEvent(REFRESH_KEY);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call back when the whole storage was cleared', () => {
      const callback = vi.fn();
      store.onExternalRemoval(callback);

      storageEvent(null);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call back when some other key changed', () => {
      const callback = vi.fn();
      store.onExternalRemoval(callback);

      storageEvent('something.else');

      expect(callback).not.toHaveBeenCalled();
    });

    it('should not call back when the token is still there (another window only replaced it)', () => {
      const callback = vi.fn();
      store.onExternalRemoval(callback);
      store.set('replacement');

      storageEvent(REFRESH_KEY);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should stop calling back once told to stop listening', () => {
      const callback = vi.fn();
      const stop = store.onExternalRemoval(callback);

      stop();
      storageEvent(REFRESH_KEY);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
