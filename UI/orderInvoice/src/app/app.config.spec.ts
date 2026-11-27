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
import { AuthService, REFRESH_KEY } from '../services/auth-service';
import { authResult } from '../testing/jwt-helper';

describe('appConfig', () => {
  let httpTestingController: HttpTestingController;

  const isConfigRequest = (req: { url: string }) => req.url.startsWith('/config.json?');

  const settle = () => new Promise(resolve => setTimeout(resolve, 0));

  beforeEach(() => {
    localStorage.clear();
    // the testing backend comes last so it replaces the real one provided by appConfig
    TestBed.configureTestingModule({ providers: [...appConfig.providers, provideHttpClientTesting()] });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
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

    it('should not ask the server about a session when none was kept from an earlier visit', async () => {
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await initStatus.donePromise;

      httpTestingController.expectNone('https://auth.test/api/auth/refresh');
      expect(TestBed.inject(AuthService).isAuthenticated()).toBe(false);
    });

    it('should sign the user back in, once the configuration is loaded, when a session was kept', async () => {
      localStorage.setItem(REFRESH_KEY, 'kept-token');
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await settle();
      const refresh = httpTestingController.expectOne('https://auth.test/api/auth/refresh');
      expect(refresh.request.body).toEqual({ refreshToken: 'kept-token' });
      refresh.flush(authResult({ name: 'Pat Example' }, 'next-token'));
      await initStatus.donePromise;

      const auth = TestBed.inject(AuthService);
      expect(auth.isAuthenticated()).toBe(true);
      expect(auth.userName()).toBe('Pat Example');
    });

    it('should hold the application back until the session is restored, so no page flashes the sign-in screen first', async () => {
      localStorage.setItem(REFRESH_KEY, 'kept-token');
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await settle();
      expect(initStatus.done).toBe(false);

      httpTestingController.expectOne('https://auth.test/api/auth/refresh').flush(authResult());
      await initStatus.donePromise;
      expect(initStatus.done).toBe(true);
    });

    it('should still start when the kept session is refused, leaving the user to sign in', async () => {
      localStorage.setItem(REFRESH_KEY, 'expired-token');
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await settle();
      httpTestingController.expectOne('https://auth.test/api/auth/refresh').flush('no', { status: 401, statusText: 'Unauthorized' });
      await initStatus.donePromise;

      expect(TestBed.inject(AuthService).isAuthenticated()).toBe(false);
      expect(localStorage.getItem(REFRESH_KEY)).toBeNull();
    });

    it('should still start when the auth service is down, and keep the session for next time', async () => {
      localStorage.setItem(REFRESH_KEY, 'kept-token');
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await settle();
      httpTestingController.expectOne('https://auth.test/api/auth/refresh').error(new ProgressEvent('error'));
      await initStatus.donePromise;

      expect(localStorage.getItem(REFRESH_KEY)).toBe('kept-token');
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
      localStorage.setItem(REFRESH_KEY, 'kept-token');
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(withCompany);
      await settle();
      httpTestingController.expectOne('https://auth.test/api/auth/refresh').flush(authResult());
      await initStatus.donePromise;
      TestBed.tick();
      await settle();

      const upload = httpTestingController.expectOne('https://reporting.test/api/CompanyProfile');
      expect(upload.request.method).toBe('PUT');
      expect(upload.request.headers.get('Authorization')).toMatch(/^Bearer /);
      expect((upload.request.body as FormData).get('companyName')).toBe('Acme Tools');
      upload.flush(null, { status: 204, statusText: 'No Content' });
    });

    it('should send nothing while no one is signed in, rather than be refused and sent to the sign-in page', async () => {
      const initStatus = TestBed.inject(ApplicationInitStatus);

      httpTestingController.expectOne(isConfigRequest).flush(withCompany);
      await initStatus.donePromise;
      TestBed.tick();
      await settle();

      httpTestingController.expectNone('https://reporting.test/api/CompanyProfile');
    });
  });

  describe('the http client', () => {
    it('should add the signed-in token to calls to the order api, and to nothing else', async () => {
      localStorage.setItem(REFRESH_KEY, 'kept-token');
      const initStatus = TestBed.inject(ApplicationInitStatus);
      httpTestingController.expectOne(isConfigRequest).flush({
        authApiUrl: 'https://auth.test/api/', oiApiUrl: 'https://oi.test/api/', productApiUrl: 'https://products.test/api/'
      });
      await settle();
      const issued = authResult();
      httpTestingController.expectOne('https://auth.test/api/auth/refresh').flush(issued);
      await initStatus.donePromise;

      const http = TestBed.inject(HttpClient);
      http.get('https://oi.test/api/Orders').subscribe();
      http.get('https://products.test/api/Products').subscribe();

      const orders = httpTestingController.expectOne('https://oi.test/api/Orders');
      const products = httpTestingController.expectOne('https://products.test/api/Products');
      expect(orders.request.headers.get('Authorization')).toBe(`Bearer ${issued.accessToken}`);
      expect(products.request.headers.has('Authorization')).toBe(false);
      orders.flush([]);
      products.flush([]);
    });

    it('should load config.json without needing the configuration it is loading', () => {
      // if the interceptor read the configuration for this request, the initializer would fail with "accessed before it was loaded"
      httpTestingController.expectOne(isConfigRequest).flush({});
    });
  });
});
