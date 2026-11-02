import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';
import { authInterceptor } from './auth-interceptor';
import { AuthService, RefreshOutcome } from './auth-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { SessionEndedError } from '../model/session-ended-error';

describe('authInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let token: string | null;
  let renewAfterRejection: ReturnType<typeof vi.fn>;
  let sessionExpired: ReturnType<typeof vi.fn>;
  let configLoaded: boolean;

  const config = Object.assign(new Configuration(), {
    oiApiUrl: 'https://oi.test/api/',
    reportingApiUrl: 'https://reports.test/api/',
    authApiUrl: 'https://auth.test/api/',
    productApiUrl: 'https://products.test/api/'
  });

  beforeEach(() => {
    token = 'token-1';
    configLoaded = true;
    renewAfterRejection = vi.fn<(rejected: string | null) => Promise<RefreshOutcome>>().mockResolvedValue('refreshed');
    sessionExpired = vi.fn().mockResolvedValue(undefined);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        {
          provide: ConfigService,
          useValue: {
            get isLoaded() { return configLoaded; },
            get config() {
              if (!configLoaded) { throw new Error('Configuration accessed before it was loaded.'); }
              return config;
            }
          }
        },
        { provide: AuthService, useValue: { get currentToken() { return token; }, renewAfterRejection, sessionExpired } }
      ]
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  const settle = () => new Promise(resolve => setTimeout(resolve, 0));

  describe('which calls get the token', () => {
    it.each(['https://oi.test/api/Orders', 'https://oi.test/api/Customer/abc', 'https://reports.test/api/Reports'])(
      'should add the bearer token to %s',
      url => {
        http.get(url).subscribe();

        const request = backend.expectOne(url);
        expect(request.request.headers.get('Authorization')).toBe('Bearer token-1');
        request.flush({});
      }
    );

    it('should add the token to every kind of call, not just GET', () => {
      http.post('https://oi.test/api/Order', {}).subscribe();
      http.put('https://oi.test/api/Order', {}).subscribe();
      http.delete('https://oi.test/api/Order/1').subscribe();

      for (const request of backend.match(() => true)) {
        expect(request.request.headers.get('Authorization')).toBe('Bearer token-1');
        request.flush({});
      }
    });

    it.each([
      'https://auth.test/api/auth/login',
      'https://auth.test/api/auth/refresh',
      'https://products.test/api/Products',
      'https://other.example/api/anything',
      '/config.json?v=1'
    ])('should leave %s alone, so the token is only ever sent to an api that accepts it', url => {
      http.get(url).subscribe();

      const request = backend.expectOne(url);
      expect(request.request.headers.has('Authorization')).toBe(false);
      request.flush({});
    });

    it('should send the call without a header when nobody is signed in', () => {
      token = null;

      http.get('https://oi.test/api/Orders').subscribe();

      const request = backend.expectOne('https://oi.test/api/Orders');
      expect(request.request.headers.has('Authorization')).toBe(false);
      request.flush({});
    });

    it('should not read the configuration before it is loaded, which is when config.json itself is requested', () => {
      configLoaded = false;

      http.get('/config.json?v=1').subscribe();

      backend.expectOne('/config.json?v=1').flush({});
    });

    it('should ignore an api address that is not configured', () => {
      const original = config.reportingApiUrl;
      config.reportingApiUrl = '';
      try {
        http.get('/anything').subscribe();
        expect(backend.expectOne('/anything').request.headers.has('Authorization')).toBe(false);
      } finally {
        config.reportingApiUrl = original;
      }
    });
  });

  describe('when a call comes back 401', () => {
    const unauthorized = { status: 401, statusText: 'Unauthorized' };

    it('should renew the session, using the token that was rejected', async () => {
      http.get('https://oi.test/api/Orders').subscribe();
      backend.expectOne('https://oi.test/api/Orders').flush('no', unauthorized);
      await settle();

      expect(renewAfterRejection).toHaveBeenCalledWith('token-1');
      backend.expectOne('https://oi.test/api/Orders').flush({});
    });

    it('should repeat the call with the new token and give the caller the result, so the user never notices', async () => {
      const results: unknown[] = [];
      http.get('https://oi.test/api/Orders').subscribe(result => results.push(result));
      backend.expectOne('https://oi.test/api/Orders').flush('no', unauthorized);
      token = 'token-2';
      await settle();

      const retry = backend.expectOne('https://oi.test/api/Orders');
      expect(retry.request.headers.get('Authorization')).toBe('Bearer token-2');
      retry.flush({ ok: true });

      expect(results).toEqual([{ ok: true }]);
      expect(sessionExpired).not.toHaveBeenCalled();
    });

    it('should repeat the same method and body', async () => {
      http.put('https://oi.test/api/Order', { id: 7 }).subscribe();
      backend.expectOne('https://oi.test/api/Order').flush('no', unauthorized);
      await settle();

      const retry = backend.expectOne('https://oi.test/api/Order');
      expect(retry.request.method).toBe('PUT');
      expect(retry.request.body).toEqual({ id: 7 });
      retry.flush({});
    });

    it('should send the user to the sign-in page when the session cannot be renewed', async () => {
      renewAfterRejection.mockResolvedValue('rejected');
      let error: unknown;
      http.get('https://oi.test/api/Orders').subscribe({ error: e => (error = e) });
      backend.expectOne('https://oi.test/api/Orders').flush('no', unauthorized);
      await settle();

      expect(sessionExpired).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(SessionEndedError);
    });

    it('should not repeat the call when the session cannot be renewed', async () => {
      renewAfterRejection.mockResolvedValue('rejected');
      http.get('https://oi.test/api/Orders').subscribe({ error: () => undefined });
      backend.expectOne('https://oi.test/api/Orders').flush('no', unauthorized);
      await settle();

      backend.expectNone('https://oi.test/api/Orders');
    });

    it('should report a network failure, and keep the session, when the auth service is unavailable', async () => {
      renewAfterRejection.mockResolvedValue('unavailable');
      let error: HttpErrorResponse | undefined;
      http.get('https://oi.test/api/Orders').subscribe({ error: e => (error = e) });
      backend.expectOne('https://oi.test/api/Orders').flush('no', unauthorized);
      await settle();

      expect(error).toBeInstanceOf(HttpErrorResponse);
      expect(error?.status).toBe(0);
      expect(error).not.toBeInstanceOf(SessionEndedError);
      expect(sessionExpired).not.toHaveBeenCalled();
    });

    it('should only try once: a second 401 after renewing ends the session instead of looping', async () => {
      let error: unknown;
      http.get('https://oi.test/api/Orders').subscribe({ error: e => (error = e) });
      backend.expectOne('https://oi.test/api/Orders').flush('no', unauthorized);
      await settle();
      backend.expectOne('https://oi.test/api/Orders').flush('still no', unauthorized);
      await settle();

      expect(renewAfterRejection).toHaveBeenCalledTimes(1);
      expect(sessionExpired).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(SessionEndedError);
      backend.expectNone('https://oi.test/api/Orders');
    });

    it('should hand over any other error from the repeated call unchanged', async () => {
      let error: HttpErrorResponse | undefined;
      http.get('https://oi.test/api/Orders').subscribe({ error: e => (error = e) });
      backend.expectOne('https://oi.test/api/Orders').flush('no', unauthorized);
      await settle();
      backend.expectOne('https://oi.test/api/Orders').flush('boom', { status: 500, statusText: 'Server Error' });

      expect(error?.status).toBe(500);
      expect(sessionExpired).not.toHaveBeenCalled();
    });

    it('should not try to renew a 401 from an api that does not use our tokens', () => {
      let error: HttpErrorResponse | undefined;
      http.get('https://products.test/api/Products').subscribe({ error: e => (error = e) });
      backend.expectOne('https://products.test/api/Products').flush('no', unauthorized);

      expect(renewAfterRejection).not.toHaveBeenCalled();
      expect(error?.status).toBe(401);
      expect(error).not.toBeInstanceOf(SessionEndedError);
    });
  });

  describe('other errors', () => {
    it.each([400, 403, 404, 500])('should pass a %s straight through without renewing anything', status => {
      let error: HttpErrorResponse | undefined;
      http.get('https://oi.test/api/Orders').subscribe({ error: e => (error = e) });
      backend.expectOne('https://oi.test/api/Orders').flush('x', { status, statusText: 'Error' });

      expect(error?.status).toBe(status);
      expect(renewAfterRejection).not.toHaveBeenCalled();
      expect(sessionExpired).not.toHaveBeenCalled();
    });
  });
});
