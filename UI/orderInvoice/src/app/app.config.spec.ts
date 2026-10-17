import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { appConfig } from './app.config';
import { ConfigService } from '../services/config-service';

describe('appConfig', () => {
  let httpTestingController: HttpTestingController;

  const isConfigRequest = (req: { url: string }) => req.url.startsWith('/config.json?');

  beforeEach(() => {
    // the testing backend comes last so it replaces the real one provided by appConfig
    TestBed.configureTestingModule({ providers: [...appConfig.providers, provideHttpClientTesting()] });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should provide the router with the application routes', () => {
    const router = TestBed.inject(Router);

    expect(router.config.map(route => route.path)).toEqual(['', 'orderInvoice', 'about']);
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
        HideShippingAddress: true,
        EnableCustomProducts: false,
        productApiUrl: 'https://products.test/api/',
        oiApiUrl: 'https://oi.test/api/'
      });
      await initStatus.donePromise;

      const config = TestBed.inject(ConfigService).config;
      expect(config.HideShippingAddress).toBe(true);
      expect(config.productApiUrl).toBe('https://products.test/api/');
      expect(config.oiApiUrl).toBe('https://oi.test/api/');
    });
  });
});
