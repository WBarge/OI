import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { AuthService } from './auth-service';
import { OIDC_SESSION, OidcUser } from './oidc-session';
import { provideOiUiCommon } from '../options/oi-ui-options';
import { FakeOidcSession, errorResponse } from '../testing/fake-oidc-session';
import { makeJwt, oidcUser } from '../testing/jwt-helper';

describe('AuthService', () => {
  let service: AuthService;
  let oidc: FakeOidcSession;
  let router: Router;
  let navigate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    oidc = new FakeOidcSession();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideOiUiCommon({ securedUrls: () => [], clientId: 'oi-ui', homeRoute: '/home' }),
        { provide: OIDC_SESSION, useValue: oidc },
      ],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true) as unknown as ReturnType<typeof vi.fn>;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const at = (url: string) => vi.spyOn(router, 'url', 'get').mockReturnValue(url);

  /** Signs in through the callback, the way a real sign-in ends. */
  async function signedInAs(user: OidcUser = oidcUser()): Promise<void> {
    oidc.signinCallback.mockResolvedValue(user);
    await service.completeSignIn();
  }

  describe('at the start', () => {
    it('should be signed out', () => {
      expect(service.isAuthenticated()).toBe(false);
      expect(service.currentToken).toBeNull();
      expect(service.userId()).toBe('');
      expect(service.userName()).toBe('');
      expect(service.roles()).toEqual([]);
      expect(service.groups()).toEqual([]);
    });
  });

  describe('restore (a page reload)', () => {
    it('should stay signed out when this tab holds no user', async () => {
      await service.restore();

      expect(service.isAuthenticated()).toBe(false);
      expect(oidc.signinSilent).not.toHaveBeenCalled();
    });

    it('should pick the session back up from the kept user without contacting OI.Auth while the token is still good', async () => {
      oidc.user = oidcUser({ sub: 'user-7', name: 'Pat Example', role: 'Admin' });

      await service.restore();

      expect(service.isAuthenticated()).toBe(true);
      expect(service.userId()).toBe('user-7');
      expect(service.roles()).toEqual(['Admin']);
      expect(service.currentToken).toBe(oidc.user.access_token);
      expect(oidc.signinSilent).not.toHaveBeenCalled();
    });

    it('should renew with the refresh token when the kept access token has run out or is about to', async () => {
      oidc.user = oidcUser({}, { expiresInSeconds: 30 });
      const renewed = oidcUser({ name: 'Renewed' }, { refreshToken: 'refresh-2' });
      oidc.signinSilent.mockResolvedValue(renewed);

      await service.restore();

      expect(oidc.signinSilent).toHaveBeenCalledOnce();
      expect(service.currentToken).toBe(renewed.access_token);
      expect(service.userName()).toBe('Renewed');
    });

    it('should stay signed out and forget the user when OI.Auth refuses the refresh token', async () => {
      oidc.user = oidcUser({}, { expiresInSeconds: -10 });
      oidc.signinSilent.mockRejectedValue(errorResponse('invalid_grant'));

      await service.restore();

      expect(service.isAuthenticated()).toBe(false);
      expect(oidc.removeUser).toHaveBeenCalled();
    });

    it('should not sign the user out because OI.Auth could not be reached, and keep what is stored', async () => {
      oidc.user = oidcUser({}, { expiresInSeconds: -10 });
      oidc.signinSilent.mockRejectedValue(new Error('Network Error'));

      await service.restore();

      expect(oidc.removeUser).not.toHaveBeenCalled();
      expect(oidc.user).not.toBeNull();
    });

    it('should renew when the kept access token cannot be read', async () => {
      oidc.user = { access_token: 'not-a-jwt', refresh_token: 'r1', expires_at: Math.floor(Date.now() / 1000) + 900 };
      const renewed = oidcUser();
      oidc.signinSilent.mockResolvedValue(renewed);

      await service.restore();

      expect(service.currentToken).toBe(renewed.access_token);
    });

    it('should stay signed out, without throwing, when the stored user cannot be read at all', async () => {
      oidc.getUser.mockRejectedValue(new Error('storage is unavailable'));

      await expect(service.restore()).resolves.toBeUndefined();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('signIn (sending the browser to OI.Auth)', () => {
    it('should send the browser to OI.Auth, remembering where the user was going', async () => {
      await service.signIn('/customers?page=2');

      expect(oidc.signinRedirect).toHaveBeenCalledWith({ returnUrl: '/customers?page=2' });
    });

    it('should remember the current page when no address is given', async () => {
      at('/orders/42');

      await service.signIn();

      expect(oidc.signinRedirect).toHaveBeenCalledWith({ returnUrl: '/orders/42' });
    });

    it('should never remember an address outside the application', async () => {
      await service.signIn('https://evil.example/steal');

      expect(oidc.signinRedirect).toHaveBeenCalledWith({ returnUrl: '/home' });
    });

    it('should not remember the sign-in pages themselves, which would loop', async () => {
      await service.signIn('/auth/callback?code=abc');

      expect(oidc.signinRedirect).toHaveBeenCalledWith({ returnUrl: '/home' });
    });

    it('should send the browser only once when several things ask at the same moment', async () => {
      await Promise.all([service.signIn('/a'), service.signIn('/b'), service.signIn('/c')]);

      expect(oidc.signinRedirect).toHaveBeenCalledOnce();
    });

    it('should allow another attempt after OI.Auth could not be reached, and tell the caller', async () => {
      oidc.signinRedirect.mockRejectedValueOnce(new Error('Network Error'));

      await expect(service.signIn('/a')).rejects.toThrow('Network Error');
      await service.signIn('/a');

      expect(oidc.signinRedirect).toHaveBeenCalledTimes(2);
    });

    it('should allow another attempt after a while, in case the browser came back from the cache without leaving', async () => {
      vi.useFakeTimers();
      await service.signIn('/a');

      await vi.advanceTimersByTimeAsync(6_000);
      await service.signIn('/a');

      expect(oidc.signinRedirect).toHaveBeenCalledTimes(2);
    });
  });

  describe('completeSignIn (the callback page)', () => {
    it('should sign in with the tokens OI.Auth issued and say where the user was going', async () => {
      oidc.signinCallback.mockResolvedValue(oidcUser({ sub: 'user-42', name: 'Pat Example' }, { state: { returnUrl: '/customers' } }));

      const target = await service.completeSignIn();

      expect(target).toBe('/customers');
      expect(service.isAuthenticated()).toBe(true);
      expect(service.userId()).toBe('user-42');
    });

    it('should pass the address on to oidc-client-ts when one is given', async () => {
      oidc.signinCallback.mockResolvedValue(oidcUser());

      await service.completeSignIn('https://app.test/auth/callback?code=abc&state=xyz');

      expect(oidc.signinCallback).toHaveBeenCalledWith('https://app.test/auth/callback?code=abc&state=xyz');
    });

    it('should go home when no destination was remembered', async () => {
      oidc.signinCallback.mockResolvedValue(oidcUser());

      expect(await service.completeSignIn()).toBe('/home');
    });

    it('should go home when the remembered destination is not inside the application', async () => {
      oidc.signinCallback.mockResolvedValue(oidcUser({}, { state: { returnUrl: '//evil.example' } }));

      expect(await service.completeSignIn()).toBe('/home');
    });

    it('should tell the caller and stay signed out when OI.Auth refused (the sign-in was cancelled, or the code was used twice)', async () => {
      oidc.signinCallback.mockRejectedValue(errorResponse('access_denied'));

      await expect(service.completeSignIn()).rejects.toThrow();
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should refuse an access token that cannot be read', async () => {
      oidc.signinCallback.mockResolvedValue({ access_token: 'garbage', refresh_token: 'r1' });

      await expect(service.completeSignIn()).rejects.toThrow();
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should allow signing in again afterwards', async () => {
      await service.signIn('/a');
      oidc.signinCallback.mockResolvedValue(oidcUser());
      await service.completeSignIn();

      await service.signIn('/b');

      expect(oidc.signinRedirect).toHaveBeenCalledTimes(2);
    });
  });

  describe('who is signed in', () => {
    it('should expose the id in the token, which is how the Admin screens recognise the user', async () => {
      await signedInAs(oidcUser({ sub: 'user-42' }));

      expect(service.userId()).toBe('user-42');
    });

    it('should read the roles and groups from the token, whether there is one or several', async () => {
      await signedInAs(oidcUser({ name: 'Pat Example', role: 'Admin', group: ['default', 'sales'] }));

      expect(service.userName()).toBe('Pat Example');
      expect(service.roles()).toEqual(['Admin']);
      expect(service.groups()).toEqual(['default', 'sales']);
    });

    it('should read several roles', async () => {
      await signedInAs(oidcUser({ role: ['Admin', 'User'] }));

      expect(service.roles()).toEqual(['Admin', 'User']);
    });

    it('should read names with accents and symbols', async () => {
      await signedInAs(oidcUser({ name: 'Zoë Müller ✓' }));

      expect(service.userName()).toBe('Zoë Müller ✓');
    });

    it('should have no roles or groups when the token carries none', async () => {
      await signedInAs(oidcUser());

      expect(service.roles()).toEqual([]);
      expect(service.groups()).toEqual([]);
    });
  });

  describe('refresh', () => {
    it('should renew with the refresh token and use the new access token', async () => {
      await signedInAs(oidcUser({}, { refreshToken: 'r1' }));
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      const renewed = oidcUser({ name: 'Renewed' }, { refreshToken: 'r2' });
      oidc.signinSilent.mockResolvedValue(renewed);

      const outcome = await service.refresh();

      expect(outcome).toBe('refreshed');
      expect(service.currentToken).toBe(renewed.access_token);
      expect(service.userName()).toBe('Renewed');
    });

    it('should make one request when several callers ask together', async () => {
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockResolvedValue(oidcUser());

      const outcomes = await Promise.all([service.refresh(), service.refresh(), service.refresh()]);

      expect(outcomes).toEqual(['refreshed', 'refreshed', 'refreshed']);
      expect(oidc.signinSilent).toHaveBeenCalledOnce();
    });

    it('should make a new request for a later call', async () => {
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockResolvedValue(oidcUser());

      await service.refresh();
      await service.refresh();

      expect(oidc.signinSilent).toHaveBeenCalledTimes(2);
    });

    it('should be rejected, without contacting OI.Auth, when there is no refresh token to use', async () => {
      oidc.user = oidcUser({}, { refreshToken: null });

      expect(await service.refresh()).toBe('rejected');
      expect(oidc.signinSilent).not.toHaveBeenCalled();
    });

    it('should be rejected when nobody is signed in in this tab', async () => {
      expect(await service.refresh()).toBe('rejected');
    });

    it.each(['invalid_grant', 'invalid_token', 'invalid_client', 'unauthorized_client', 'access_denied'])(
      'should be rejected, ending the session, when OI.Auth answers %s',
      async (error) => {
        await signedInAs();
        oidc.user = oidcUser({}, { refreshToken: 'r1' });
        oidc.signinSilent.mockRejectedValue(errorResponse(error));

        expect(await service.refresh()).toBe('rejected');
        expect(service.isAuthenticated()).toBe(false);
        expect(oidc.removeUser).toHaveBeenCalled();
      },
    );

    it('should be rejected when OI.Auth answers with nothing', async () => {
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockResolvedValue(null);

      expect(await service.refresh()).toBe('rejected');
    });

    it('should be rejected when the new access token cannot be read, keeping nothing of it', async () => {
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockResolvedValue({ access_token: 'garbage', refresh_token: 'r2' });

      expect(await service.refresh()).toBe('rejected');
      expect(service.currentToken).toBeNull();
    });

    it.each([
      ['a network failure', new Error('Network Error')],
      ['a server error', new Error('Internal Server Error (500)')],
      ['being throttled', new Error('Too Many Requests (429)')],
      ['a temporary OAuth error', errorResponse('server_error')],
      ['a timeout', Object.assign(new Error('timed out'), { name: 'ErrorTimeout' })],
    ])('should say unavailable, and keep the session, on %s', async (_what, failure) => {
      await signedInAs();
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockRejectedValue(failure);
      const before = service.currentToken;

      expect(await service.refresh()).toBe('unavailable');
      expect(service.isAuthenticated()).toBe(true);
      expect(service.currentToken).toBe(before);
      expect(oidc.removeUser).not.toHaveBeenCalled();
    });

    it('should say unavailable when the stored user cannot be read', async () => {
      oidc.getUser.mockRejectedValue(new Error('storage is unavailable'));

      expect(await service.refresh()).toBe('unavailable');
    });
  });

  describe('renewAfterRejection', () => {
    it('should renew when the token that was rejected is still the current one', async () => {
      await signedInAs();
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockResolvedValue(oidcUser({ name: 'Renewed' }));

      const outcome = await service.renewAfterRejection(service.currentToken);

      expect(outcome).toBe('refreshed');
      expect(oidc.signinSilent).toHaveBeenCalledOnce();
    });

    it('should not renew when another request already got a newer token', async () => {
      await signedInAs();

      const outcome = await service.renewAfterRejection('an-older-token');

      expect(outcome).toBe('refreshed');
      expect(oidc.signinSilent).not.toHaveBeenCalled();
    });

    it('should renew when nobody is signed in yet', async () => {
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockResolvedValue(oidcUser());

      expect(await service.renewAfterRejection(null)).toBe('refreshed');
    });
  });

  describe('getAccessToken (for SignalR)', () => {
    it('should return the current token without renewing while it is good', async () => {
      await signedInAs(oidcUser({}, { expiresInSeconds: 900 }));

      const token = await service.getAccessToken();

      expect(token).toBe(service.currentToken);
      expect(oidc.signinSilent).not.toHaveBeenCalled();
    });

    it('should renew first when the token is about to expire', async () => {
      await signedInAs(oidcUser({}, { expiresInSeconds: 30 }));
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      const fresh = oidcUser({}, { expiresInSeconds: 900 });
      oidc.signinSilent.mockResolvedValue(fresh);

      expect(await service.getAccessToken()).toBe(fresh.access_token);
    });

    it('should return an empty token when nobody is signed in and nothing can be renewed', async () => {
      expect(await service.getAccessToken()).toBe('');
    });

    it('should return the old token when renewing was not possible right now', async () => {
      const user = oidcUser({}, { expiresInSeconds: 30 });
      await signedInAs(user);
      oidc.user = oidcUser({}, { refreshToken: 'r1' });
      oidc.signinSilent.mockRejectedValue(new Error('Network Error'));

      expect(await service.getAccessToken()).toBe(user.access_token);
    });
  });

  describe('logout', () => {
    it('should forget the user here and send the browser to OI.Auth to end the sign-in', async () => {
      await signedInAs(oidcUser({ sub: 'user-42' }));

      await service.logout();

      expect(service.isAuthenticated()).toBe(false);
      expect(service.userId()).toBe('');
      expect(service.currentToken).toBeNull();
      expect(oidc.signoutRedirect).toHaveBeenCalledOnce();
    });

    it('should clear the session before the browser leaves, so nothing keeps using the token', async () => {
      await signedInAs();
      let signedInWhenLeaving: boolean | null = null;
      oidc.signoutRedirect.mockImplementation(async () => {
        signedInWhenLeaving = service.isAuthenticated();
      });

      await service.logout();

      expect(signedInWhenLeaving).toBe(false);
    });

    it('should still sign out here, and land on the signed-out page, when OI.Auth cannot be reached', async () => {
      await signedInAs();
      oidc.signoutRedirect.mockRejectedValue(new Error('Network Error'));

      await service.logout();

      expect(service.isAuthenticated()).toBe(false);
      expect(oidc.removeUser).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith(['/signed-out']);
    });
  });

  describe('sessionExpired', () => {
    it('should forget the session and go back to OI.Auth, remembering the page', async () => {
      await signedInAs();
      at('/orders/42');

      await service.sessionExpired();

      expect(service.isAuthenticated()).toBe(false);
      expect(oidc.removeUser).toHaveBeenCalled();
      expect(oidc.signinRedirect).toHaveBeenCalledWith({ returnUrl: '/orders/42' });
    });

    it('should go to OI.Auth once when several requests fail together', async () => {
      await signedInAs();
      at('/orders/42');

      await Promise.all([service.sessionExpired(), service.sessionExpired(), service.sessionExpired()]);

      expect(oidc.signinRedirect).toHaveBeenCalledOnce();
    });

    it.each(['/auth/callback', '/auth/callback?code=abc', '/signed-out', '/signed-out?error=unavailable'])(
      'should not start another sign-in while on %s',
      async (url) => {
        await signedInAs();
        at(url);

        await service.sessionExpired();

        expect(service.isAuthenticated()).toBe(false);
        expect(oidc.signinRedirect).not.toHaveBeenCalled();
      },
    );

    it('should land on the signed-out page with a message when OI.Auth cannot be reached', async () => {
      await signedInAs();
      at('/orders/42');
      oidc.signinRedirect.mockRejectedValue(new Error('Network Error'));

      await service.sessionExpired();

      expect(navigate).toHaveBeenCalledWith(['/signed-out'], { queryParams: { error: 'unavailable' } });
    });
  });

  it('should read a token whose payload is not padded base64', async () => {
    const token = makeJwt({ sub: 'u1', name: 'A', exp: Math.floor(Date.now() / 1000) + 900 });
    await signedInAs({ access_token: token, refresh_token: 'r1' });

    expect(service.userId()).toBe('u1');
  });
});
