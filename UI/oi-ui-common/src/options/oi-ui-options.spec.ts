import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { vi } from 'vitest';
import { AuthService } from '../services/auth-service';
import { adminGuard, authGuard, guestGuard } from '../services/auth-guard';
import { OI_UI_OPTIONS, provideOiUiCommon } from './oi-ui-options';

describe('OiUiOptions', () => {
  it('should default to the OI UI routes, and secure nothing until told what to secure', () => {
    const options = TestBed.inject(OI_UI_OPTIONS);

    expect(options.loginRoute).toBe('/login');
    expect(options.homeRoute).toBe('/home');
    expect(options.forbiddenRoute).toBe('/home');
    expect(options.securedUrls({ authApiUrl: 'https://auth.test/api/', hubUrl: '' })).toEqual([]);
  });

  describe('provideOiUiCommon', () => {
    it('should keep what the application gives and default the rest', () => {
      TestBed.configureTestingModule({
        providers: [provideOiUiCommon({ securedUrls: () => ['https://a.test/'], appTitle: 'Product Manager' })],
      });

      const options = TestBed.inject(OI_UI_OPTIONS);

      expect(options.securedUrls({ authApiUrl: '', hubUrl: '' })).toEqual(['https://a.test/']);
      expect(options.appTitle).toBe('Product Manager');
      expect(options.loginRoute).toBe('/login');
    });

    it('should send a user who lacks the role to the home route unless told otherwise', () => {
      TestBed.configureTestingModule({
        providers: [provideOiUiCommon({ securedUrls: () => [], homeRoute: '/products' })],
      });

      const options = TestBed.inject(OI_UI_OPTIONS);

      expect(options.homeRoute).toBe('/products');
      expect(options.forbiddenRoute).toBe('/products');
    });

    it('should use its own route for a user who lacks the role when one is given', () => {
      TestBed.configureTestingModule({
        providers: [provideOiUiCommon({ securedUrls: () => [], homeRoute: '/products', forbiddenRoute: '/access-denied' })],
      });

      expect(TestBed.inject(OI_UI_OPTIONS).forbiddenRoute).toBe('/access-denied');
    });
  });

  describe('the guards follow the options', () => {
    const signedIn = signal(false);
    const roles = signal<string[]>([]);
    let createUrlTree: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      signedIn.set(false);
      roles.set([]);
      createUrlTree = vi.fn((commands: string[]) => ({ commands }) as unknown as UrlTree);
      TestBed.configureTestingModule({
        providers: [
          provideOiUiCommon({ securedUrls: () => [], loginRoute: '/sign-in', homeRoute: '/products', forbiddenRoute: '/access-denied' }),
          { provide: AuthService, useValue: { isAuthenticated: signedIn, roles } },
          { provide: Router, useValue: { createUrlTree } },
        ],
      });
    });

    const run = (guard: typeof authGuard, url = '/products/list') =>
      TestBed.runInInjectionContext(() => guard({} as never, { url } as never));

    it('should send a signed-out user to the configured sign-in route', () => {
      run(authGuard);

      expect(createUrlTree).toHaveBeenCalledWith(['/sign-in'], { queryParams: { returnUrl: '/products/list' } });
    });

    it('should send a signed-in user away from the sign-in page to the configured home route', () => {
      signedIn.set(true);

      run(guestGuard);

      expect(createUrlTree).toHaveBeenCalledWith(['/products']);
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
