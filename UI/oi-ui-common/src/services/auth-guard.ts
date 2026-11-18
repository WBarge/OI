import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OI_UI_OPTIONS } from '../options/oi-ui-options';
import { AuthService } from './auth-service';

/** Everything except the sign-in page. Sends a signed-out user to the sign-in route and remembers where they were going. */
export const authGuard: CanActivateFn = (_route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    return true;
  }
  const queryParams = state.url && state.url !== '/' ? { returnUrl: state.url } : undefined;
  return inject(Router).createUrlTree([inject(OI_UI_OPTIONS).loginRoute], { queryParams });
};

/** The sign-in page itself: a user who is already signed in has no reason to see it. */
export const guestGuard: CanActivateFn = () =>
  inject(AuthService).isAuthenticated() ? inject(Router).createUrlTree([inject(OI_UI_OPTIONS).homeRoute]) : true;

export const roleGuard =
  (role: string): CanActivateFn =>
  () => inject(AuthService).roles().includes(role) || inject(Router).createUrlTree([inject(OI_UI_OPTIONS).forbiddenRoute]);

/**
 * The Admin screens. The server enforces the same rule on every admin endpoint, so this only saves a non-admin
 * from landing on a page whose every call would be refused.
 */
export const adminGuard = roleGuard('Admin');
