import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OI_UI_OPTIONS } from '../options/oi-ui-options';
import { AuthService } from './auth-service';

/**
 * Everything except the sign-in plumbing pages. Sends a signed-out user to OI.Auth to sign in and remembers where they were
 * going; they come back to that page signed in (straight away, with no password, if they already have an OI.Auth session).
 * The navigation is cancelled because the browser is leaving this application.
 * If OI.Auth cannot be reached, the user lands on the signed-out page with a message and a Try again button.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  if (auth.isAuthenticated()) {
    return true;
  }

  const router = inject(Router);
  const options = inject(OI_UI_OPTIONS);
  return auth.signIn(state.url).then(
    () => false,
    () => router.createUrlTree([options.signedOutRoute], { queryParams: { error: 'unavailable' } }),
  );
};

export const roleGuard =
  (role: string): CanActivateFn =>
  () => inject(AuthService).roles().includes(role) || inject(Router).createUrlTree([inject(OI_UI_OPTIONS).forbiddenRoute]);

/**
 * The Admin screens. The server enforces the same rule on every admin endpoint, so this only saves a non-admin
 * from landing on a page whose every call would be refused.
 */
export const adminGuard = roleGuard('Admin');
