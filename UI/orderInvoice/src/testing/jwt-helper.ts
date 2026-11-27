import type { OidcUser } from '@oi/ui-common';

/** Builds an unsigned token for specs. The app only reads the payload, the server is what checks the signature. */
export function makeJwt(claims: Record<string, unknown>): string {
  const encode = (value: unknown) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  return `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode(claims)}.signature`;
}

/** The user oidc-client-ts keeps for a sign-in: an access token that expires in the given number of seconds, and a refresh token. */
export function oidcUser(
  claims: Record<string, unknown> = {},
  options: { refreshToken?: string | null; expiresInSeconds?: number; state?: unknown } = {},
): OidcUser {
  const { refreshToken = 'refresh-1', expiresInSeconds = 900, state } = options;
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const user: OidcUser = {
    access_token: makeJwt({ sub: 'user-1', name: 'Pat Example', exp, ...claims }),
    expires_at: exp,
    state,
  };
  if (refreshToken !== null) {
    user.refresh_token = refreshToken;
  }
  return user;
}
