import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { AuthService, REFRESH_KEY } from './auth-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { authResult } from '../testing/jwt-helper';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let router: Router;
  let navigate: ReturnType<typeof vi.fn>;

  const login = 'https://auth.test/api/auth/login';
  const refresh = 'https://auth.test/api/auth/refresh';
  const logout = 'https://auth.test/api/auth/logout';

  beforeEach(() => {
    localStorage.clear();
    const config = Object.assign(new Configuration(), { authApiUrl: 'https://auth.test/api/' });
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ConfigService, useValue: { config, isLoaded: true } }
      ]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true) as unknown as ReturnType<typeof vi.fn>;
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
    vi.restoreAllMocks();
    delete (navigator as unknown as { locks?: unknown }).locks;
  });

  /** Lets a pending promise chain run, so a request made after an await is visible to the test. */
  const settle = () => new Promise(resolve => setTimeout(resolve, 0));

  describe('at the start', () => {
    it('should be signed out', () => {
      expect(service.isAuthenticated()).toBe(false);
      expect(service.currentToken).toBeNull();
      expect(service.userName()).toBe('');
      expect(service.roles()).toEqual([]);
      expect(service.groups()).toEqual([]);
    });
  });

  describe('login', () => {
    it('should post the credentials to the auth api', async () => {
      const signingIn = service.login('pat@example.com', 'secret-password');

      const request = http.expectOne(login);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({ email: 'pat@example.com', password: 'secret-password' });
      request.flush(authResult());
      await signingIn;
    });

    it('should hold the access token, and know who the user is', async () => {
      const result = authResult({ name: 'Pat Example', role: 'Admin', group: ['default', 'sales-west'] });
      const signingIn = service.login('pat@example.com', 'x');
      http.expectOne(login).flush(result);
      await signingIn;

      expect(service.isAuthenticated()).toBe(true);
      expect(service.currentToken).toBe(result.accessToken);
      expect(service.userName()).toBe('Pat Example');
      expect(service.roles()).toEqual(['Admin']);
      expect(service.groups()).toEqual(['default', 'sales-west']);
    });

    it('should treat a single role or group as a list', async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult({ role: 'Admin', group: 'default' }));
      await signingIn;

      expect(service.roles()).toEqual(['Admin']);
      expect(service.groups()).toEqual(['default']);
    });

    it('should keep the refresh token so the next visit does not ask for a password', async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult({}, 'refresh-abc'));
      await signingIn;

      expect(localStorage.getItem(REFRESH_KEY)).toBe('refresh-abc');
    });

    it('should read a name with accents and symbols correctly', async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult({ name: 'Zoë Müller ✓' }));
      await signingIn;

      expect(service.userName()).toBe('Zoë Müller ✓');
    });

    it.each([401, 429, 0])('should reject with the server error, and stay signed out, for status %s', async status => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush('no', { status: status || 0, statusText: 'No' });

      await expect(signingIn).rejects.toBeInstanceOf(HttpErrorResponse);
      expect(service.isAuthenticated()).toBe(false);
      expect(localStorage.getItem(REFRESH_KEY)).toBeNull();
    });
  });

  describe('restore (already signed in from an earlier visit)', () => {
    it('should not call the server when there is nothing to restore from', async () => {
      await service.restore();

      http.expectNone(refresh);
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should sign the user back in with the kept refresh token', async () => {
      localStorage.setItem(REFRESH_KEY, 'kept-token');

      const restoring = service.restore();
      const request = http.expectOne(refresh);
      expect(request.request.body).toEqual({ refreshToken: 'kept-token' });
      request.flush(authResult({ name: 'Pat Example' }, 'replacement-token'));
      await restoring;

      expect(service.isAuthenticated()).toBe(true);
      expect(service.userName()).toBe('Pat Example');
    });

    it('should keep the replacement refresh token, because each one works only once', async () => {
      localStorage.setItem(REFRESH_KEY, 'kept-token');

      const restoring = service.restore();
      http.expectOne(refresh).flush(authResult({}, 'replacement-token'));
      await restoring;

      expect(localStorage.getItem(REFRESH_KEY)).toBe('replacement-token');
    });

    it.each([400, 401, 403])('should forget a refresh token the server refuses (%s)', async status => {
      localStorage.setItem(REFRESH_KEY, 'old-token');

      const restoring = service.restore();
      http.expectOne(refresh).flush('no', { status, statusText: 'Refused' });
      await restoring;

      expect(service.isAuthenticated()).toBe(false);
      expect(localStorage.getItem(REFRESH_KEY)).toBeNull();
    });

    it.each([0, 500, 502, 503, 429])(
      'should keep the refresh token when the server cannot be asked right now (%s), so a short outage does not sign anyone out',
      async status => {
        localStorage.setItem(REFRESH_KEY, 'old-token');

        const restoring = service.restore();
        http.expectOne(refresh).flush('down', { status, statusText: 'Trouble' });
        await restoring;

        expect(service.isAuthenticated()).toBe(false);
        expect(localStorage.getItem(REFRESH_KEY)).toBe('old-token');
      }
    );
  });

  describe('refresh', () => {
    it('should report refreshed when the server hands out a new token', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');

      const refreshing = service.refresh();
      http.expectOne(refresh).flush(authResult());

      expect(await refreshing).toBe('refreshed');
    });

    it('should report rejected, without calling the server, when there is no refresh token', async () => {
      expect(await service.refresh()).toBe('rejected');

      http.expectNone(refresh);
    });

    it('should report rejected when the server refuses the token', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');

      const refreshing = service.refresh();
      http.expectOne(refresh).flush('no', { status: 401, statusText: 'Unauthorized' });

      expect(await refreshing).toBe('rejected');
    });

    it('should report unavailable when the server cannot be reached', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');

      const refreshing = service.refresh();
      http.expectOne(refresh).error(new ProgressEvent('error'));

      expect(await refreshing).toBe('unavailable');
    });

    it('should make one request when several callers refresh at the same time', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');

      const first = service.refresh();
      const second = service.refresh();
      const third = service.refresh();
      http.expectOne(refresh).flush(authResult());

      expect(await Promise.all([first, second, third])).toEqual(['refreshed', 'refreshed', 'refreshed']);
    });

    it('should be able to refresh again after an earlier refresh has finished', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');
      const first = service.refresh();
      http.expectOne(refresh).flush(authResult({}, 'r2'));
      await first;

      const second = service.refresh();
      const request = http.expectOne(refresh);
      expect(request.request.body).toEqual({ refreshToken: 'r2' });
      request.flush(authResult({}, 'r3'));
      await second;
    });

    it('should take the cross-tab lock when the browser has one, so two tabs never use the same refresh token', async () => {
      const request = vi.fn((_name: string, callback: () => Promise<unknown>) => callback());
      Object.defineProperty(navigator, 'locks', { value: { request }, configurable: true });
      localStorage.setItem(REFRESH_KEY, 'r1');

      const refreshing = service.refresh();
      await settle();
      http.expectOne(refresh).flush(authResult());
      await refreshing;

      expect(request).toHaveBeenCalledTimes(1);
      expect(request.mock.calls[0][0]).toBe('oi-token-refresh');
    });

    it('should read the refresh token inside the lock, so it uses the one another tab just stored', async () => {
      let release!: () => void;
      const gate = new Promise<void>(resolve => (release = resolve));
      const request = vi.fn(async (_name: string, callback: () => Promise<unknown>) => {
        await gate;                                   // the other tab is still refreshing
        return callback();
      });
      Object.defineProperty(navigator, 'locks', { value: { request }, configurable: true });
      localStorage.setItem(REFRESH_KEY, 'stale-token');

      const refreshing = service.refresh();
      localStorage.setItem(REFRESH_KEY, 'token-from-other-tab');   // the other tab finishes
      release();
      await settle();

      const sent = http.expectOne(refresh);
      expect(sent.request.body).toEqual({ refreshToken: 'token-from-other-tab' });
      sent.flush(authResult());
      await refreshing;
    });
  });

  describe('renewAfterRejection', () => {
    it('should not refresh when a newer token already exists, because another request has renewed since this one was sent', async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult());
      await signingIn;

      expect(await service.renewAfterRejection('an-older-token')).toBe('refreshed');
      http.expectNone(refresh);
    });

    it('should refresh when the rejected token is still the current one', async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult());
      await signingIn;

      const renewing = service.renewAfterRejection(service.currentToken);
      http.expectOne(refresh).flush(authResult({}, 'r2'));

      expect(await renewing).toBe('refreshed');
    });

    it('should refresh when there was no token at all', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');

      const renewing = service.renewAfterRejection(null);
      http.expectOne(refresh).flush(authResult());

      expect(await renewing).toBe('refreshed');
    });
  });

  describe('getAccessToken (used by the hub connection)', () => {
    it('should return the current token without a request while it has plenty of life left', async () => {
      const result = authResult({}, 'r1', 900);
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(result);
      await signingIn;

      expect(await service.getAccessToken()).toBe(result.accessToken);
      http.expectNone(refresh);
    });

    it('should renew first when the token is about to expire', async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult({}, 'r1', 30));
      await signingIn;

      const getting = service.getAccessToken();
      const fresh = authResult({}, 'r2', 900);
      http.expectOne(refresh).flush(fresh);

      expect(await getting).toBe(fresh.accessToken);
    });

    it('should renew when there is no token yet but a refresh token was kept', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');

      const getting = service.getAccessToken();
      const fresh = authResult();
      http.expectOne(refresh).flush(fresh);

      expect(await getting).toBe(fresh.accessToken);
    });

    it('should return an empty token when the user is signed out', async () => {
      expect(await service.getAccessToken()).toBe('');
    });
  });

  describe('logout', () => {
    const signIn = async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult({}, 'r1'));
      await signingIn;
    };

    it('should forget the session straight away', async () => {
      await signIn();

      const signingOut = service.logout();
      expect(service.isAuthenticated()).toBe(false);
      expect(localStorage.getItem(REFRESH_KEY)).toBeNull();
      await settle();
      http.expectOne(logout).flush(null);
      await signingOut;
    });

    it('should go to the sign-in page', async () => {
      await signIn();

      const signingOut = service.logout();
      await settle();
      http.expectOne(logout).flush(null);
      await signingOut;

      expect(navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should revoke the refresh token on the server so it cannot be used again', async () => {
      await signIn();

      const signingOut = service.logout();
      await settle();
      const request = http.expectOne(logout);
      expect(request.request.body).toEqual({ refreshToken: 'r1' });
      request.flush(null);
      await signingOut;
    });

    it('should not call the server when there is no refresh token', async () => {
      await service.logout();

      http.expectNone(logout);
      expect(navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should still finish when the server cannot be reached', async () => {
      await signIn();

      const signingOut = service.logout();
      await settle();
      http.expectOne(logout).error(new ProgressEvent('error'));
      await signingOut;

      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('sessionExpired', () => {
    it('should forget the session and go to the sign-in page, remembering where the user was', async () => {
      localStorage.setItem(REFRESH_KEY, 'r1');
      vi.spyOn(router, 'url', 'get').mockReturnValue('/customers');

      await service.sessionExpired();

      expect(service.isAuthenticated()).toBe(false);
      expect(localStorage.getItem(REFRESH_KEY)).toBeNull();
      expect(navigate).toHaveBeenCalledWith(['/login'], { queryParams: { reason: 'expired', returnUrl: '/customers' } });
    });

    it('should only navigate once when several requests fail together', async () => {
      vi.spyOn(router, 'url', 'get').mockReturnValue('/customers');
      let finish!: () => void;
      navigate.mockImplementation(() => new Promise<boolean>(resolve => (finish = () => resolve(true))));

      const first = service.sessionExpired();
      const second = service.sessionExpired();
      const third = service.sessionExpired();
      finish();
      await Promise.all([first, second, third]);

      expect(navigate).toHaveBeenCalledTimes(1);
    });

    it('should be able to navigate again for a later expiry', async () => {
      vi.spyOn(router, 'url', 'get').mockReturnValue('/customers');

      await service.sessionExpired();
      await service.sessionExpired();

      expect(navigate).toHaveBeenCalledTimes(2);
    });

    it('should not navigate when the user is already on the sign-in page', async () => {
      vi.spyOn(router, 'url', 'get').mockReturnValue('/login?reason=expired');

      await service.sessionExpired();

      expect(navigate).not.toHaveBeenCalled();
    });
  });

  describe('when another tab signs out', () => {
    const signIn = async () => {
      const signingIn = service.login('a', 'b');
      http.expectOne(login).flush(authResult({}, 'r1'));
      await signingIn;
    };
    const otherTabRemovedTheToken = (key: string | null = REFRESH_KEY) => {
      localStorage.removeItem(REFRESH_KEY);
      window.dispatchEvent(new StorageEvent('storage', { key, newValue: null }));
    };

    it('should sign out here too and go to the sign-in page', async () => {
      await signIn();

      otherTabRemovedTheToken();

      expect(service.isAuthenticated()).toBe(false);
      expect(navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should also react when all storage is cleared', async () => {
      await signIn();

      otherTabRemovedTheToken(null);

      expect(service.isAuthenticated()).toBe(false);
    });

    it('should ignore changes to other keys', async () => {
      await signIn();

      window.dispatchEvent(new StorageEvent('storage', { key: 'something-else', newValue: null }));

      expect(service.isAuthenticated()).toBe(true);
      expect(navigate).not.toHaveBeenCalled();
    });

    it('should stay signed in when the refresh token is still there, as when another tab just renewed it', async () => {
      await signIn();

      window.dispatchEvent(new StorageEvent('storage', { key: REFRESH_KEY, newValue: null }));

      expect(service.isAuthenticated()).toBe(true);
    });

    it('should do nothing when this tab was not signed in', () => {
      otherTabRemovedTheToken();

      expect(navigate).not.toHaveBeenCalled();
    });

    it('should stop listening when the service is destroyed', async () => {
      await signIn();
      TestBed.resetTestingModule();

      otherTabRemovedTheToken();

      expect(navigate).not.toHaveBeenCalled();
    });
  });
});
