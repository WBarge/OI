import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { adminGuard, authGuard, roleGuard } from './auth-guard';
import { AuthService } from './auth-service';

describe('route guards', () => {
  const signedIn = signal(false);
  const roles = signal<string[]>([]);
  let router: Router;
  let signIn: ReturnType<typeof vi.fn>;

  const route = {} as ActivatedRouteSnapshot;
  const at = (url: string) => ({ url }) as RouterStateSnapshot;
  const run = (guard: typeof authGuard, url = '/customers') =>
    TestBed.runInInjectionContext(() => guard(route, at(url)));
  const asUrl = (result: unknown) => router.serializeUrl(result as UrlTree);

  beforeEach(() => {
    signedIn.set(false);
    roles.set([]);
    signIn = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: { isAuthenticated: signedIn, roles, signIn } }]
    });
    router = TestBed.inject(Router);
  });

  describe('authGuard', () => {
    it('should let a signed-in user through', () => {
      signedIn.set(true);

      expect(run(authGuard)).toBe(true);
    });

    it('should send a signed-out user to OI.Auth to sign in, remembering the page they were going to', async () => {
      await run(authGuard, '/orderInvoice/abc-123');

      expect(signIn).toHaveBeenCalledWith('/orderInvoice/abc-123');
    });

    it('should keep the query string of the page the user was going to', async () => {
      await run(authGuard, '/orderSelection?page=2');

      expect(signIn).toHaveBeenCalledWith('/orderSelection?page=2');
    });

    it('should cancel the navigation, because the browser is leaving for OI.Auth', async () => {
      expect(await run(authGuard)).toBe(false);
    });

    it('should not start a sign-in for a user who is already signed in', () => {
      signedIn.set(true);

      run(authGuard);

      expect(signIn).not.toHaveBeenCalled();
    });

    it('should land on the signed-out page with a message when OI.Auth cannot be reached', async () => {
      signIn.mockRejectedValue(new Error('Network Error'));

      const result = await run(authGuard, '/customers');

      expect(result).toBeInstanceOf(UrlTree);
      expect(asUrl(result)).toBe('/signed-out?error=unavailable');
    });
  });

  describe('roleGuard', () => {
    it('should let a user with the role through', () => {
      roles.set(['User', 'Admin']);

      expect(run(roleGuard('Admin'))).toBe(true);
    });

    it('should send a user without the role to the home page', () => {
      roles.set(['User']);

      expect(asUrl(run(roleGuard('Admin')))).toBe('/home');
    });

    it('should send a user with no roles to the home page', () => {
      expect(asUrl(run(roleGuard('Admin')))).toBe('/home');
    });
  });

  describe('adminGuard', () => {
    it('should let an administrator through', () => {
      roles.set(['User', 'Admin']);

      expect(run(adminGuard)).toBe(true);
    });

    it('should send an ordinary user to the home page', () => {
      roles.set(['User']);

      expect(asUrl(run(adminGuard))).toBe('/home');
    });

    it('should send someone with no roles to the home page', () => {
      expect(asUrl(run(adminGuard))).toBe('/home');
    });

    it('should not accept a role that only resembles Admin', () => {
      roles.set(['Administrator', 'admin', 'Admins']);

      expect(asUrl(run(adminGuard))).toBe('/home');
    });
  });
});
