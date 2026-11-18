import { InjectionToken } from '@angular/core';

/** The key the refresh token is kept under. Unchanged from the OI UI, so people already signed in stay signed in. */
export const REFRESH_KEY = 'oi.refresh';

/**
 * Where the long-lived refresh token is kept between page loads.
 *
 * Today it is the browser's localStorage, which every window on the SAME ORIGIN shares: that sharing is what gives
 * the OI UI and the ProductManager UI one sign-in. This interface is the one place that assumption lives. A different
 * way of sharing a session (for example a single sign-on flow) replaces this class and nothing else.
 */
export interface RefreshTokenStore {
  /** The stored token, or null when there is none. */
  get(): string | null;
  /** Remember a token (replaces the one that was there). */
  set(token: string): void;
  /** Forget the token. */
  clear(): void;
  /**
   * Calls back when ANOTHER window removed the token (it signed out). Returns a function that stops listening.
   */
  onExternalRemoval(callback: () => void): () => void;
}

export class LocalStorageRefreshTokenStore implements RefreshTokenStore {
  get(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  }

  set(token: string): void {
    localStorage.setItem(REFRESH_KEY, token);
  }

  clear(): void {
    localStorage.removeItem(REFRESH_KEY);
  }

  onExternalRemoval(callback: () => void): () => void {
    const onStorage = (event: StorageEvent) => {
      const removed = (event.key === REFRESH_KEY || event.key === null) && this.get() === null;
      if (removed) {
        callback();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }
}

export const REFRESH_TOKEN_STORE = new InjectionToken<RefreshTokenStore>('REFRESH_TOKEN_STORE', {
  providedIn: 'root',
  factory: () => new LocalStorageRefreshTokenStore(),
});
