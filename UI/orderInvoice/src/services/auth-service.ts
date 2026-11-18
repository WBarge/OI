// The sign-in logic now lives in the shared library (UI/oi-ui-common) so the ProductManager UI uses the very same code.
// This file only keeps the old import path working.
export { AuthService, REFRESH_KEY } from '@oi/ui-common';
export type { RefreshOutcome } from '@oi/ui-common';
