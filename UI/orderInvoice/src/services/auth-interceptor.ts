import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { SessionEndedError } from '../model/session-ended-error';
import { AuthService } from './auth-service';
import { ConfigService } from './config-service';

/**
 * Adds the bearer token to calls to our own APIs (orders, reporting and the Auth admin endpoints). When one comes back 401 the
 * session is renewed once and the call is repeated, so the user never notices a token expiring.
 * If it cannot be renewed the user is sent to the sign-in page.
 *
 * Calls to the auth API, to the product API, and to anything else are left alone: the token is only
 * ever sent to an API that is known to accept it.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const configService = inject(ConfigService);
  if (!configService.isLoaded) {
    return next(req);   // this is the request that loads config.json itself
  }

  const config = configService.config;
  // OI.Auth's administration endpoints need the token too, but its sign-in, refresh and sign-out calls must never get one
  const adminApi = config.authApiUrl.length > 0 ? config.authApiUrl + 'admin/' : '';
  const secured = [config.oiApiUrl, config.reportingApiUrl, adminApi].filter((url) => url.length > 0);
  if (!secured.some((url) => req.url.startsWith(url))) {
    return next(req);
  }

  const auth = inject(AuthService);
  const withToken = (request: HttpRequest<unknown>, token: string | null) =>
    token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;

  const sentToken = auth.currentToken;

  return next(withToken(req, sentToken)).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
        return throwError(() => error);
      }

      return from(auth.renewAfterRejection(sentToken)).pipe(
        switchMap((outcome) => {
          if (outcome === 'refreshed') {
            return next(withToken(req, auth.currentToken)).pipe(
              catchError((retryError: unknown) => {
                if (retryError instanceof HttpErrorResponse && retryError.status === 401) {
                  void auth.sessionExpired();
                  return throwError(() => new SessionEndedError(req.url));
                }
                return throwError(() => retryError);
              }),
            );
          }
          if (outcome === 'rejected') {
            void auth.sessionExpired();
            return throwError(() => new SessionEndedError(req.url));
          }
          // 'unavailable': the auth service is down, so we know nothing about the session. Report it as a network failure.
          return throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Unknown Error', url: req.url }));
        }),
      );
    }),
  );
};
