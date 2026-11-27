import { TestBed } from '@angular/core/testing';
import { OidcClient } from 'oidc-client-ts';
import { Configuration } from '../testing/configuration';
import { OI_UI_OPTIONS, OiUiOptions } from '../options/oi-ui-options';
import {
  OIDC_SESSION,
  UserManagerOidcSession,
  absoluteRouteUrl,
  authorityFrom,
  buildUserManagerSettings,
  newNonce,
  signinArgs,
} from './oidc-session';
import { ConfigService } from './config-service';

describe('oidc-session', () => {
  const options: OiUiOptions = {
    securedUrls: () => [],
    clientId: 'oi-ui',
    scopes: 'openid profile email offline_access',
    callbackRoute: '/auth/callback',
    signedOutRoute: '/signed-out',
    loginRoute: undefined as never,
    homeRoute: '/home',
    forbiddenRoute: '/home',
    appTitle: 'Orders',
  } as unknown as OiUiOptions;
  const config = Object.assign(new Configuration(), { authApiUrl: 'https://auth.test/api/' });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  describe('authorityFrom', () => {
    it.each([
      ['https://auth.test/api/', 'https://auth.test'],
      ['https://auth.test/api', 'https://auth.test'],
      ['https://auth.test/API/', 'https://auth.test'],
      ['https://auth.test:7300/api/', 'https://auth.test:7300'],
      ['https://host.test/auth/api/', 'https://host.test/auth'],
    ])('should work out the address of OI.Auth from %s', (authApiUrl, expected) => {
      expect(authorityFrom(authApiUrl)).toBe(expected);
    });

    it('should leave an address alone when it does not end in /api/', () => {
      expect(authorityFrom('https://auth.test/')).toBe('https://auth.test');
    });
  });

  describe('absoluteRouteUrl', () => {
    it.each([
      ['/auth/callback', 'http://localhost:4201/', 'http://localhost:4201/auth/callback'],
      ['/signed-out', 'http://localhost:4200/', 'http://localhost:4200/signed-out'],
      ['/auth/callback', 'https://apps.test/orders/', 'https://apps.test/orders/auth/callback'],
      ['auth/callback', 'http://localhost:4201/', 'http://localhost:4201/auth/callback'],
    ])('should turn the route %s into a full address under %s', (route, baseUri, expected) => {
      expect(absoluteRouteUrl(route, baseUri)).toBe(expected);
    });
  });

  describe('buildUserManagerSettings', () => {
    const settings = buildUserManagerSettings(config, options, 'http://localhost:4201/', sessionStorage);

    it('should ask OI.Auth for the authorization code flow as this application', () => {
      expect(settings.authority).toBe('https://auth.test');
      expect(settings.client_id).toBe('oi-ui');
      expect(settings.response_type).toBe('code');
      expect(settings.scope).toBe('openid profile email offline_access');
    });

    it('should come back to the registered addresses', () => {
      expect(settings.redirect_uri).toBe('http://localhost:4201/auth/callback');
      expect(settings.post_logout_redirect_uri).toBe('http://localhost:4201/signed-out');
    });

    it('should renew only when AuthService asks, and read nothing but the tokens', () => {
      expect(settings.automaticSilentRenew).toBe(false);
      expect(settings.loadUserInfo).toBe(false);
      expect(settings.monitorSession).toBe(false);
      expect(settings.revokeTokensOnSignout).toBe(false);
    });

    it('should keep the user and the sign-in state in the given storage', () => {
      expect(settings.userStore).toBeDefined();
      expect(settings.stateStore).toBeDefined();
    });
  });

  describe('UserManagerOidcSession', () => {
    const session = () => new UserManagerOidcSession({ config, isLoaded: true } as unknown as ConfigService, options);
    const storedUser = JSON.stringify({
      access_token: 'access-1',
      refresh_token: 'refresh-1',
      token_type: 'Bearer',
      scope: 'openid',
      profile: { sub: 'user-1', iss: 'https://auth.test/', aud: 'oi-ui', exp: 1, iat: 1 },
      expires_at: 4102444800,
    });
    const key = 'oidc.user:https://auth.test:oi-ui';

    it('should have no user when nothing is kept', async () => {
      expect(await session().getUser()).toBeNull();
    });

    it('should read the user kept in this tab (sessionStorage), so a reload stays signed in', async () => {
      sessionStorage.setItem(key, storedUser);

      const user = await session().getUser();

      expect(user?.access_token).toBe('access-1');
      expect(user?.refresh_token).toBe('refresh-1');
    });

    it('should not read a user from localStorage, which every tab shares', async () => {
      localStorage.setItem(key, storedUser);

      expect(await session().getUser()).toBeNull();
    });

    it('should forget the user in this tab', async () => {
      sessionStorage.setItem(key, storedUser);
      const sut = session();

      await sut.removeUser();

      expect(sessionStorage.getItem(key)).toBeNull();
      expect(await sut.getUser()).toBeNull();
    });
  });

  it('should be provided in the root, built from the loaded configuration and the options', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: { config, isLoaded: true } },
        { provide: OI_UI_OPTIONS, useValue: options },
      ],
    });

    expect(TestBed.inject(OIDC_SESSION)).toBeInstanceOf(UserManagerOidcSession);
  });
});

describe('what the settings ask OI.Auth for (the real oidc-client-ts, with fixed discovery metadata)', () => {
  const options = {
    clientId: 'oi-ui',
    scopes: 'openid profile email offline_access',
    callbackRoute: '/auth/callback',
    signedOutRoute: '/signed-out',
  } as OiUiOptions;
  const config = Object.assign(new Configuration(), { authApiUrl: 'https://auth.test/api/' });
  const metadata = {
    issuer: 'https://auth.test/',
    authorization_endpoint: 'https://auth.test/connect/authorize',
    token_endpoint: 'https://auth.test/connect/token',
    end_session_endpoint: 'https://auth.test/connect/logout',
    jwks_uri: 'https://auth.test/.well-known/jwks.json',
  };

  const authorizeUrl = async (state: unknown = { returnUrl: '/customers' }) => {
    const settings = { ...buildUserManagerSettings(config, options, 'http://localhost:4201/', sessionStorage), metadata };
    const request = await new OidcClient(settings).createSigninRequest(signinArgs(state));
    return new URL(request.url);
  };

  it('should send the browser to the authorize endpoint on OI.Auth', async () => {
    const url = await authorizeUrl();

    expect(url.origin + url.pathname).toBe('https://auth.test/connect/authorize');
  });

  it('should ask for the authorization code flow as the registered client, to the registered callback address', async () => {
    const query = (await authorizeUrl()).searchParams;

    expect(query.get('client_id')).toBe('oi-ui');
    expect(query.get('response_type')).toBe('code');
    expect(query.get('redirect_uri')).toBe('http://localhost:4201/auth/callback');
    expect(query.get('scope')).toBe('openid profile email offline_access');
  });

  it('should protect the code with PKCE (S256), which OI.Auth requires', async () => {
    const query = (await authorizeUrl()).searchParams;

    expect(query.get('code_challenge_method')).toBe('S256');
    expect(query.get('code_challenge')).toMatch(/^[A-Za-z0-9_-]{43}$/);
  });

  it('should send a state and a nonce, and a different pair each time', async () => {
    const first = (await authorizeUrl()).searchParams;
    const second = (await authorizeUrl()).searchParams;

    expect(first.get('state')).toBeTruthy();
    expect(first.get('nonce')).toBeTruthy();
    expect(first.get('state')).not.toBe(second.get('state'));
    expect(first.get('nonce')).not.toBe(second.get('nonce'));
    expect(first.get('code_challenge')).not.toBe(second.get('code_challenge'));
  });

  it('should make a new random nonce each time, long enough to be unguessable', () => {
    const nonces = Array.from({ length: 50 }, () => newNonce());

    expect(new Set(nonces).size).toBe(50);
    for (const nonce of nonces) {
      expect(nonce).toMatch(/^[A-Za-z0-9_-]{22}$/);   // 16 random bytes, URL safe
    }
  });

  it('should carry the application state and a nonce on every sign-in request', () => {
    const args = signinArgs({ returnUrl: '/customers' });

    expect(args.state).toEqual({ returnUrl: '/customers' });
    expect(args.nonce).toMatch(/^[A-Za-z0-9_-]{22}$/);
  });

  it('should send the destination in the stored state only, never in the address', async () => {
    const url = await authorizeUrl({ returnUrl: '/secret-place' });

    expect(url.toString()).not.toContain('secret-place');
  });

  it('should send the browser back to the signed-out page after signing out, and say which sign-in is ending', async () => {
    const settings = { ...buildUserManagerSettings(config, options, 'http://localhost:4201/', sessionStorage), metadata };
    const request = await new OidcClient(settings).createSignoutRequest({ id_token_hint: 'the-id-token' });
    const url = new URL(request.url);

    expect(url.origin + url.pathname).toBe('https://auth.test/connect/logout');
    expect(url.searchParams.get('post_logout_redirect_uri')).toBe('http://localhost:4201/signed-out');
    expect(url.searchParams.get('id_token_hint')).toBe('the-id-token');
  });
});
