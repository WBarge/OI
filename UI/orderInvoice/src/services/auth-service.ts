import { computed, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from './config-service';

interface AuthResult {
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
}

interface TokenClaims {
  sub: string;
  name?: string;
  role?: string | string[];
  group?: string | string[];
  exp: number;
}

const REFRESH_KEY = 'oi.refresh';
const toArray = (v?: string | string[]) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/**
 * Holds the access token in memory only. The refresh token is kept in localStorage so a page
 * reload does not sign the user out (trade-off noted in the README).
 */
@Service()
export class AuthService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private router = inject(Router);

  private readonly accessToken = signal<string | null>(null);
  private readonly claims = signal<TokenClaims | null>(null);
  private refreshInFlight: Promise<boolean> | null = null;

  readonly isAuthenticated = computed(() => this.accessToken() !== null);
  readonly userName = computed(() => this.claims()?.name ?? '');
  readonly roles = computed(() => toArray(this.claims()?.role));
  readonly groups = computed(() => toArray(this.claims()?.group));

  private get authUrl(): string {
    return this.configService.config.authApiUrl + 'auth/';
  }

  /** Called by the app initializer: silently sign back in if a refresh token is stored. */
  async restore(): Promise<void> {
    if (localStorage.getItem(REFRESH_KEY)) {
      await this.refresh();
    }
  }

  async login(email: string, password: string): Promise<void> {
    const result = await firstValueFrom(
      this.http.post<AuthResult>(this.authUrl + 'login', { email, password }),
    );
    this.apply(result);
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    this.clear();
    if (refreshToken) {
      try {
        await firstValueFrom(this.http.post(this.authUrl + 'logout', { refreshToken }));
      } catch {
        /* best effort: the token is already gone from this browser */
      }
    }
    await this.router.navigate(['/login']);
  }

  /** Single-flight: concurrent callers (interceptor, SignalR) share one refresh request. */
  refresh(): Promise<boolean> {
    this.refreshInFlight ??= this.doRefresh().finally(() => (this.refreshInFlight = null));
    return this.refreshInFlight;
  }

  /** For SignalR's accessTokenFactory. Refreshes first if the token is about to expire. */
  async getAccessToken(): Promise<string> {
    const exp = this.claims()?.exp ?? 0;
    if (!this.accessToken() || exp * 1000 - Date.now() < 60_000) {
      await this.refresh();
    }
    return this.accessToken() ?? '';
  }

  /** For the interceptor. */
  get currentToken(): string | null {
    return this.accessToken();
  }

  private async doRefresh(): Promise<boolean> {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) {
      this.clear();
      return false;
    }
    try {
      const result = await firstValueFrom(
        this.http.post<AuthResult>(this.authUrl + 'refresh', { refreshToken }),
      );
      this.apply(result);
      return true;
    } catch {
      this.clear();
      return false;
    }
  }

  private apply(result: AuthResult): void {
    this.accessToken.set(result.accessToken);
    this.claims.set(this.decode(result.accessToken));
    localStorage.setItem(REFRESH_KEY, result.refreshToken);
  }

  private clear(): void {
    this.accessToken.set(null);
    this.claims.set(null);
    localStorage.removeItem(REFRESH_KEY);
  }

  /** Reads the payload for display and expiry only. The server is what enforces access. */
  private decode(jwt: string): TokenClaims {
    const payload = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(payload)))) as TokenClaims;
  }
}
