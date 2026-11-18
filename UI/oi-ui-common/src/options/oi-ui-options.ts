import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { OiBaseConfig } from '../model/oi-base-config';
import { AuthService } from '../services/auth-service';
import { ConfigService } from '../services/config-service';

/** What differs from one application to the next. Everything else in the library behaves the same everywhere. */
export interface OiUiOptions {
  /**
   * The address prefixes the bearer token is sent to, worked out from the loaded config.json.
   * The token is only ever sent to an API that is known to accept it, so list those and nothing else
   * (never the auth API's own sign-in, refresh and sign-out calls).
   */
  securedUrls: (config: OiBaseConfig) => string[];
  /** The sign-in route. Default /login */
  loginRoute: string;
  /** Where a signed-in user goes instead of the sign-in page. Default /home */
  homeRoute: string;
  /** Where a signed-in user who lacks the required role is sent. Default: homeRoute */
  forbiddenRoute: string;
  /** The heading on the sign-in page. Default "Sign in" */
  appTitle: string;
}

const DEFAULT_OPTIONS: OiUiOptions = {
  securedUrls: () => [],
  loginRoute: '/login',
  homeRoute: '/home',
  forbiddenRoute: '/home',
  appTitle: 'Sign in',
};

export const OI_UI_OPTIONS = new InjectionToken<OiUiOptions>('OI_UI_OPTIONS', {
  providedIn: 'root',
  factory: () => DEFAULT_OPTIONS,
});

/**
 * Register once in app.config.ts. Anything not given keeps its default
 * (forbiddenRoute follows homeRoute unless set).
 */
export function provideOiUiCommon(options: Partial<OiUiOptions> & Pick<OiUiOptions, 'securedUrls'>): EnvironmentProviders {
  const homeRoute = options.homeRoute ?? DEFAULT_OPTIONS.homeRoute;
  const merged: OiUiOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    homeRoute,
    forbiddenRoute: options.forbiddenRoute ?? homeRoute,
  };
  return makeEnvironmentProviders([{ provide: OI_UI_OPTIONS, useValue: merged }]);
}

/**
 * The start-up every application needs, in the order that matters: read config.json, then quietly sign back in
 * if a refresh token was kept. Call it from the application's app initializer.
 */
export async function startOiSession(): Promise<void> {
  // both are fetched before the first await: inject() only works while the initializer is starting up
  const config = inject(ConfigService);
  const auth = inject(AuthService);
  await config.load();
  await auth.restore();
}
