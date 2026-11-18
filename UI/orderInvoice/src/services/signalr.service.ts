// Lives in the shared library (UI/oi-ui-common) so every UI connects to the hub the same way.
export { SignalRService, BackoffRetryPolicy, defaultHubConnectionFactory, HUB_CONNECTION_FACTORY } from '@oi/ui-common';
export type { SignalRConfig, HubConnectionFactory } from '@oi/ui-common';
