import { vi } from 'vitest';
import type { OidcSession, OidcUser } from '@oi/ui-common';

/** A stand-in for oidc-client-ts for the specs: nothing is redirected, and each call can be given an answer or a failure. */
export class FakeOidcSession implements OidcSession {
  /** The user "kept in sessionStorage". */
  user: OidcUser | null = null;

  getUser = vi.fn(async (): Promise<OidcUser | null> => this.user);
  signinRedirect = vi.fn(async (_state?: unknown): Promise<void> => undefined);
  signinCallback = vi.fn(async (_url?: string): Promise<OidcUser> => {
    throw new Error('signinCallback was not given an answer');
  });
  signinSilent = vi.fn(async (): Promise<OidcUser | null> => null);
  signoutRedirect = vi.fn(async (): Promise<void> => {
    this.user = null;
  });
  removeUser = vi.fn(async (): Promise<void> => {
    this.user = null;
  });
}

/** The error oidc-client-ts throws when the server answers with an OAuth error such as invalid_grant. */
export function errorResponse(error: string): Error {
  return Object.assign(new Error(error), { name: 'ErrorResponse', error });
}
