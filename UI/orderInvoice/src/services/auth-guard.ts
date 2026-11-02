import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

/** Everything except the sign-in page. Sends a signed-out user to /login and remembers where they were going. */
export const authGuard: CanActivateFn = (_route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    return true;
  }
  const queryParams = state.url && state.url !== '/' ? { returnUrl: state.url } : undefined;
  return inject(Router).createUrlTree(['/login'], { queryParams });
};

/** The sign-in page itself: a user who is already signed in has no reason to see it. */
export const guestGuard: CanActivateFn = () =>
  inject(AuthService).isAuthenticated() ? inject(Router).createUrlTree(['/home']) : true;

export const roleGuard =
  (role: string): CanActivateFn =>
  () => inject(AuthService).roles().includes(role) || inject(Router).createUrlTree(['/home']);
