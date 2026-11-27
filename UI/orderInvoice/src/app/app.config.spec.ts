import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { appConfig } from './app.config';
import { routes } from './app.routes';
import { ConfigService } from '../services/config-service';
import { AuthService } from '../services/auth-service';
import { OI_UI_OPTIONS, OIDC_SESSION } from '@oi/ui-common';
import { FakeOidcSession, errorResponse } from '../testing/fake-oidc-session';
import { oidcUser } from '../testing/jwt-helper';

describe('appConfig', () => {
  let httpTestingController: HttpTestingController;
  let oidc: FakeOidcSession;

  const isConfigRequest = (req: { url: string }) => req.url.startsWith('config.json?');

  const settle = () => new Promise(resolve => setTimeout(resolve, 0));

  beforeEach(() => {
    oidc = new FakeOidcSession();
    // the testing backend and the fake OpenID Connect session come last so they replace the real ones provided by appConfig
    TestBed.configureTestingModule({ providers: [...appConfig.providers, provideHttpClientTesting(), { provide: OIDC_SESSION, useValue: oidc }] });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should provide the router with the application routes', () => {
    const router = TestBed.inject(Router);

    // compared with the routes file rather than a copy of its paths, which app.routes.spec pins down
    expect(router.config.map(route => route.path)).toEqual(routes.map(route => route.path));
    // the config request is made by the app initializer, answer it so nothing is left hanging
    httpTestingController.expectOne(isConfigRequest).flush({});
  });

  it('should provide the HttpClient', () => {
    expect(TestBed.inject(HttpClient)).toBeTruthy();
    httpTestingController.expectOne(isConfigRequest).flush({});
  });

  it('should provide the MessageService used for toasts', () => {
    expect(TestBed.inject(MessageService)).toBeTruthy();
    httpTestingController.expectOne(isConfigRequest).flush({});
  });

  it('should configure PrimeNG with a theme', () => {
    expect(TestBed.inject(PrimeNG).theme()).toBeTruthy();
    httpTestingController.expectOne(isConfigRequest).flush({});
  });

  describe('the app initializer', () => {
    it('should load the configuration before the application starts', async () => {
      const initStatus = TestBed.inject(ApplicationInitStatus);
      expect(initStatus.done).toBe(false);

      httpTestingController.expectOne(isConfigRequest).flush({
        disableAddresses: true,
        HideShippingAddress: true,
        EnableCustomProducts: false,
        productApiUrl: 'https://products.test/api/',
        oiApiUrl: 'https://oi.test/api/'
      });
      await initStatus.donePromise;

      const config = TestBed.inject(ConfigService).config;
      expect(config.disableAddresses).toBe(true);
      expect(config.HideShippingAddress).toBe(true);
      expect(config.productApiUrl).toBe('https://products.test/api/');
      expect(config.oiApiUrl).toBe('https://oi.test/api/');
    });

    const serverConfig = {
      authApiUrl: 'https://auth.test/api/',
      oiApiUrl: 'https://oi.test/api/',
      productApiUrl: 'https://products.test/api/'
    };

    it('should not try to renew anything when this tab holds no session', async () => {
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await initStatus.donePromise;

      expect(oidc.signinSilent).not.toHaveBeenCalled();
      expect(TestBed.inject(AuthService).isAuthenticated()).toBe(false);
    });

    it('should sign the user back in, once the configuration is loaded, when this tab was already signed in', async () => {
      oidc.user = oidcUser({ name: 'Pat Example' });
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await initStatus.donePromise;

      const auth = TestBed.inject(AuthService);
      expect(auth.isAuthenticated()).toBe(true);
      expect(auth.userName()).toBe('Pat Example');
    });

    it('should hold the application back until an expired session is renewed, so no page flashes before it', async () => {
      oidc.user = oidcUser({}, { expiresInSeconds: -10 });
      let renewed!: (user: ReturnType<typeof oidcUser>) => void;
      oidc.signinSilent.mockReturnValue(new Promise(resolve => (renewed = resolve)));
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await settle();
      expect(initStatus.done).toBe(false);

      renewed(oidcUser());
      await initStatus.donePromise;
      expect(initStatus.done).toBe(true);
      expect(TestBed.inject(AuthService).isAuthenticated()).toBe(true);
    });

    it('should still start when the kept session is refused, leaving the user to sign in', async () => {
      oidc.user = oidcUser({}, { expiresInSeconds: -10 });
      oidc.signinSilent.mockRejectedValue(errorResponse('invalid_grant'));
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await initStatus.donePromise;

      expect(TestBed.inject(AuthService).isAuthenticated()).toBe(false);
      expect(oidc.removeUser).toHaveBeenCalled();
    });

    it('should still start when OI.Auth is down, and keep the session for next time', async () => {
      oidc.user = oidcUser({}, { expiresInSeconds: -10 });
      oidc.signinSilent.mockRejectedValue(new Error('Network Error'));
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await initStatus.donePromise;

      expect(oidc.removeUser).not.toHaveBeenCalled();
      expect(oidc.user).not.toBeNull();
    });

    it('should register itself with OI.Auth as the oi-ui client', () => {
      // the id has to match the "Clients" entry in OI.Auth's settings, or OI.Auth refuses every sign-in
      httpTestingController.expectOne(isConfigRequest).flush({});

      const options = TestBed.inject(OI_UI_OPTIONS);

      expect(options.clientId).toBe('oi-ui');
      expect(options.callbackRoute).toBe('/auth/callback');
      expect(options.signedOutRoute).toBe('/signed-out');
    });
  });

  describe('the company details upload', () => {
    const withCompany = {
      authApiUrl: 'https://auth.test/api/',
      reportingApiUrl: 'https://reporting.test/api/',
      companyName: 'Acme Tools',
      companyCity: 'Phoenix'
    };

    it('should send the company details to the Reporting API after the configuration is loaded and the session restored', async () => {
      oidc.user = oidcUser();
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(withCompany);
      await initStatus.donePromise;
      TestBed.tick();
      await settle();

      const upload = httpTestingController.expectOne('https://reporting.test/api/CompanyProfile');
      expect(upload.request.method).toBe('PUT');
      expect(upload.request.headers.get('Authorization')).toMatch(/^Bearer /);
      expect((upload.request.body as FormData).get('companyName')).toBe('Acme Tools');
      upload.flush(null, { status: 204, statusText: 'No Content' });
    });

    it('should send nothing while no one is signed in, rather than be refused and sent to OI.Auth', async () => {
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(withCompany);
      await initStatus.donePromise;
      TestBed.tick();
      await settle();

      httpTestingController.expectNone('https://reporting.test/api/CompanyProfile');
    });
  });

  describe('the http client', () => {
    it('should add the signed-in token to calls to the order api and the product api, and to nothing else', async () => {
      const issued = oidcUser();
      oidc.user = issued;
      const initStatus = TestBed.inject(ApplicationInitStatus);
      httpTestingController.expectOne(isConfigRequest).flush({
        authApiUrl: 'https://auth.test/api/', oiApiUrl: 'https://oi.test/api/', productApiUrl: 'https://products.test/api/'
      });
      await initStatus.donePromise;

      const http = TestBed.inject(HttpClient);
      http.get('https://oi.test/api/Orders').subscribe();
      http.get('https://products.test/api/Products').subscribe();
      http.get('https://elsewhere.test/api/Things').subscribe();

      const orders = httpTestingController.expectOne('https://oi.test/api/Orders');
      const products = httpTestingController.expectOne('https://products.test/api/Products');
      expect(orders.request.headers.get('Authorization')).toBe(`Bearer ${issued.access_token}`);
      const elsewhere = httpTestingController.expectOne('https://elsewhere.test/api/Things');
      expect(products.request.headers.get('Authorization')).toBe(`Bearer ${issued.access_token}`);
      expect(elsewhere.request.headers.has('Authorization')).toBe(false);
      orders.flush([]);
      products.flush([]);
      elsewhere.flush([]);
    });

    it('should load config.json without needing the configuration it is loading', () => {
      // if the interceptor read the configuration for this request, the initializer would fail with "accessed before it was loaded"
      httpTestingController.expectOne(isConfigRequest).flush({});
    });
  });
});
