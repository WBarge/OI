import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth-service';
import { ConfigService } from './config-service';

/**
 * Adds the bearer token to calls to our own APIs (orders and reporting) and retries once after a 401
 * with a fresh token. Calls to the auth API, and to anything else, are left alone.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const config = inject(ConfigService).config;

  const secured = [config.oiApiUrl, config.reportingApiUrl].filter((u) => u.length > 0);
  if (!secured.some((u) => req.url.startsWith(u))) {
    return next(req);
  }

  const withToken = (r: HttpRequest<unknown>) => {
    const token = auth.currentToken;
    return token ? r.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : r;
  };

  return next(withToken(req)).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return from(auth.refresh()).pipe(
          switchMap((ok) => {
            if (ok) return next(withToken(req));
            void auth.logout();
            return throwError(() => err);
          }),
        );
      }
      return throwError(() => err);
    }),
  );
};
