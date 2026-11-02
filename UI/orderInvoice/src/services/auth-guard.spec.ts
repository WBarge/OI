import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { authGuard, guestGuard, roleGuard } from './auth-guard';
import { AuthService } from './auth-service';

describe('route guards', () => {
  const signedIn = signal(false);
  const roles = signal<string[]>([]);
  let router: Router;

  const route = {} as ActivatedRouteSnapshot;
  const at = (url: string) => ({ url }) as RouterStateSnapshot;
  const run = (guard: typeof authGuard, url = '/customers') =>
    TestBed.runInInjectionContext(() => guard(route, at(url)));
  const asUrl = (result: unknown) => router.serializeUrl(result as UrlTree);

  beforeEach(() => {
    signedIn.set(false);
    roles.set([]);
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: { isAuthenticated: signedIn, roles } }]
    });
    router = TestBed.inject(Router);
  });

  describe('authGuard', () => {
    it('should let a signed-in user through', () => {
      signedIn.set(true);

      expect(run(authGuard)).toBe(true);
    });

    it('should send a signed-out user to the sign-in page', () => {
      expect(run(authGuard)).toBeInstanceOf(UrlTree);
      expect(asUrl(run(authGuard))).toMatch(/^\/login/);
    });

    it('should remember the page the user was going to', () => {
      expect(asUrl(run(authGuard, '/orderInvoice/abc-123'))).toBe('/login?returnUrl=%2ForderInvoice%2Fabc-123');
    });

    it('should keep the query string of the page the user was going to', () => {
      expect(asUrl(run(authGuard, '/orderSelection?page=2'))).toBe('/login?returnUrl=%2ForderSelection%3Fpage%3D2');
    });

    it('should not bother remembering the root, which only leads to the home page', () => {
      expect(asUrl(run(authGuard, '/'))).toBe('/login');
    });
  });

  describe('guestGuard', () => {
    it('should let a signed-out user see the sign-in page', () => {
      expect(run(guestGuard, '/login')).toBe(true);
    });

    it('should send a signed-in user to the home page instead', () => {
      signedIn.set(true);

      expect(asUrl(run(guestGuard, '/login'))).toBe('/home');
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
});
