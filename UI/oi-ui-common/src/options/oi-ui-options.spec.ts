import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { vi } from 'vitest';
import { AuthService } from '../services/auth-service';
import { adminGuard, authGuard } from '../services/auth-guard';
import { OI_UI_OPTIONS, provideOiUiCommon } from './oi-ui-options';

describe('OiUiOptions', () => {
  it('should default to the OI UI routes, and secure nothing until told what to secure', () => {
    const options = TestBed.inject(OI_UI_OPTIONS);

    expect(options.callbackRoute).toBe('/auth/callback');
    expect(options.signedOutRoute).toBe('/signed-out');
    expect(options.scopes).toBe('openid profile email offline_access');
    expect(options.clientId).toBe('');
    expect(options.homeRoute).toBe('/home');
    expect(options.forbiddenRoute).toBe('/home');
    expect(options.securedUrls({ authApiUrl: 'https://auth.test/api/', hubUrl: '' })).toEqual([]);
  });

  describe('provideOiUiCommon', () => {
    it('should keep what the application gives and default the rest', () => {
      TestBed.configureTestingModule({
        providers: [provideOiUiCommon({ securedUrls: () => ['https://a.test/'], clientId: 'product-admin', appTitle: 'Product Manager' })],
      });

      const options = TestBed.inject(OI_UI_OPTIONS);

      expect(options.securedUrls({ authApiUrl: '', hubUrl: '' })).toEqual(['https://a.test/']);
      expect(options.appTitle).toBe('Product Manager');
      expect(options.clientId).toBe('product-admin');
      expect(options.callbackRoute).toBe('/auth/callback');
      expect(options.signedOutRoute).toBe('/signed-out');
      expect(options.scopes).toBe('openid profile email offline_access');
    });

    it('should send a user who lacks the role to the home route unless told otherwise', () => {
      TestBed.configureTestingModule({
        providers: [provideOiUiCommon({ securedUrls: () => [], clientId: 'product-admin', homeRoute: '/products' })],
      });

      const options = TestBed.inject(OI_UI_OPTIONS);

      expect(options.homeRoute).toBe('/products');
      expect(options.forbiddenRoute).toBe('/products');
    });

    it('should use its own sign-in routes and scopes when given', () => {
      TestBed.configureTestingModule({
        providers: [
          provideOiUiCommon({
            securedUrls: () => [],
            clientId: 'x',
            callbackRoute: '/cb',
            signedOutRoute: '/bye',
            scopes: 'openid',
          }),
        ],
      });

      const options = TestBed.inject(OI_UI_OPTIONS);

      expect(options.callbackRoute).toBe('/cb');
      expect(options.signedOutRoute).toBe('/bye');
      expect(options.scopes).toBe('openid');
    });

    it('should use its own route for a user who lacks the role when one is given', () => {
      TestBed.configureTestingModule({
        providers: [provideOiUiCommon({ securedUrls: () => [], clientId: 'product-admin', homeRoute: '/products', forbiddenRoute: '/access-denied' })],
      });

      expect(TestBed.inject(OI_UI_OPTIONS).forbiddenRoute).toBe('/access-denied');
    });
  });

  describe('the guards follow the options', () => {
    const signedIn = signal(false);
    const roles = signal<string[]>([]);
    let createUrlTree: ReturnType<typeof vi.fn>;
    let signIn: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      signedIn.set(false);
      roles.set([]);
      signIn = vi.fn().mockResolvedValue(undefined);
      createUrlTree = vi.fn((commands: string[]) => ({ commands }) as unknown as UrlTree);
      TestBed.configureTestingModule({
        providers: [
          provideOiUiCommon({ securedUrls: () => [], clientId: 'product-admin', signedOutRoute: '/bye', homeRoute: '/products', forbiddenRoute: '/access-denied' }),
          { provide: AuthService, useValue: { isAuthenticated: signedIn, roles, signIn } },
          { provide: Router, useValue: { createUrlTree } },
        ],
      });
    });

    const run = (guard: typeof authGuard, url = '/products/list') =>
      TestBed.runInInjectionContext(() => guard({} as never, { url } as never));

    it('should send a signed-out user to OI.Auth, remembering the page', async () => {
      await run(authGuard);

      expect(signIn).toHaveBeenCalledWith('/products/list');
    });

    it('should send the user to the configured signed-out route when OI.Auth cannot be reached', async () => {
      signIn.mockRejectedValue(new Error('Network Error'));

      await run(authGuard);

      expect(createUrlTree).toHaveBeenCalledWith(['/bye'], { queryParams: { error: 'unavailable' } });
    });

    it('should send a signed-in non-admin to the configured forbidden route', () => {
      signedIn.set(true);
      roles.set(['User']);

      run(adminGuard);

      expect(createUrlTree).toHaveBeenCalledWith(['/access-denied']);
    });

    it('should let an administrator through', () => {
      signedIn.set(true);
      roles.set(['Admin']);

      expect(run(adminGuard)).toBe(true);
    });
  });
});
