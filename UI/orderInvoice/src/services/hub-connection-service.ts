// Lives in the shared library (UI/oi-ui-common). ReportStatusService plugs into it in app.config.ts (HUB_NOTIFICATION_HANDLER).
export { HubConnectionService, HUB_NOTIFICATION_HANDLER } from '@oi/ui-common';
export type { HubNotificationHandler } from '@oi/ui-common';
