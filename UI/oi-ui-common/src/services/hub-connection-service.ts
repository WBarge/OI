import { DestroyRef, effect, inject, InjectionToken, Service, untracked } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService, Severity } from '../utils/notification-service';
import { AppHubService, AppNotification } from './app-hub-service';
import { AuthService } from './auth-service';

/**
 * Something else in the application that wants to see every notification the hub delivers
 * (the OI UI uses this to tell its pages that a report is ready). Register with { provide: HUB_NOTIFICATION_HANDLER, useExisting: ..., multi: true }.
 */
export interface HubNotificationHandler {
  handle(notification: AppNotification): void;
  /** The user signed out: forget anything remembered from notifications. */
  clear(): void;
}

export const HUB_NOTIFICATION_HANDLER = new InjectionToken<HubNotificationHandler[]>('HUB_NOTIFICATION_HANDLER');

const TOAST_LIFE_MS = 10000;
const RETRY_AFTER_MS = 30_000;

/** The hub sends a free-text type; these are the ones that map onto a toast colour, anything else is shown as info. */
const SEVERITY_BY_TYPE: Record<string, Severity> = {
  success: 'success',
  info: 'info',
  warn: 'warn',
  warning: 'warn',
  error: 'error',
};

/**
 * Keeps the browser connected to the central hub for as long as someone is signed in, and shows
 * what the back end sends as toasts. It is started by injecting it once (each application's root component does).
 *
 *  - signed in   -> connect, and listen for notifications
 *  - signed out  -> stop listening and disconnect
 *  - hub down    -> try again every 30 seconds while still signed in
 *
 * The hub only reaches browsers that are connected at that moment; nothing is stored for later.
 */
@Service()
export class HubConnectionService {
  private auth = inject(AuthService);
  private appHub = inject(AppHubService);
  private notifications = inject(NotificationService);
  private handlers = inject(HUB_NOTIFICATION_HANDLER, { optional: true }) ?? [];

  private subscription?: Subscription;
  private retryTimer?: ReturnType<typeof setTimeout>;
  /** Sign-in and sign-out can happen in quick succession; the work is done strictly one after another. */
  private queue: Promise<void> = Promise.resolve();

  constructor() {
    effect(() => {
      const signedIn = this.auth.isAuthenticated();
      untracked(() => this.enqueue(signedIn ? () => this.start() : () => this.stop()));
    });
    inject(DestroyRef).onDestroy(() => this.cancelRetry());
  }

  private enqueue(work: () => Promise<void>): void {
    this.queue = this.queue.then(work).catch((error: unknown) => {
      console.error('Hub connection error', error);
    });
  }

  private async start(): Promise<void> {
    if (this.subscription) {
      return;   // already running
    }
    // listen before connecting so a message sent the moment the connection opens is not missed
    this.appHub.configure();
    this.subscription = this.appHub.notifications$.subscribe((notification) => {
      this.handlers.forEach((handler) => handler.handle(notification));   // e.g. lets pages know a report is ready or failed
      this.show(notification);
    });
    await this.connect();
  }

  private async connect(): Promise<void> {
    try {
      await this.appHub.connect();
    } catch (error) {
      console.error('Could not connect to the notification hub; will try again', error);
      this.retryTimer = setTimeout(() => this.enqueue(() => this.retry()), RETRY_AFTER_MS);
    }
  }

  private async retry(): Promise<void> {
    this.retryTimer = undefined;
    if (this.subscription) {   // still signed in
      await this.connect();
    }
  }

  private async stop(): Promise<void> {
    if (!this.subscription) {
      return;   // never started
    }
    this.cancelRetry();
    this.subscription.unsubscribe();
    this.subscription = undefined;
    this.handlers.forEach((handler) => handler.clear());
    await this.appHub.disconnect();
  }

  private cancelRetry(): void {
    if (this.retryTimer !== undefined) {
      clearTimeout(this.retryTimer);
      this.retryTimer = undefined;
    }
  }

  private show(notification: AppNotification): void {
    const severity = SEVERITY_BY_TYPE[notification.type?.toLowerCase() ?? ''] ?? 'info';
    this.notifications[severity as 'success' | 'info' | 'warn' | 'error'](notification.title, notification.body ?? '', TOAST_LIFE_MS);
  }
}
