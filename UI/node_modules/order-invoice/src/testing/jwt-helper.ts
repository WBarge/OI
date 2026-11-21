/** Builds an unsigned token for specs. The app only reads the payload, the server is what checks the signature. */
export function makeJwt(claims: Record<string, unknown>): string {
  const encode = (value: unknown) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  return `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode(claims)}.signature`;
}

/** A login/refresh response whose access token expires in the given number of seconds. */
export function authResult(
  claims: Record<string, unknown> = {},
  refreshToken: string = 'refresh-1',
  expiresInSeconds: number = 900,
) {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  return {
    accessToken: makeJwt({ sub: 'user-1', name: 'Pat Example', exp, ...claims }),
    accessTokenExpires: new Date(exp * 1000).toISOString(),
    refreshToken,
  };
}
