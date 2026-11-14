import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { AppHubService, AppNotification } from './app-hub-service';
import { AuthService } from './auth-service';
import { HubConnectionService } from './hub-connection-service';
import { ReportStatusService } from './report-status-service';
import { NotificationService } from '../utils/notification-service';

describe('HubConnectionService', () => {
  const signedIn = signal(false);
  let incoming: Subject<AppNotification>;
  let calls: string[];
  let appHub: {
    configure: ReturnType<typeof vi.fn>;
    connect: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    notifications$: Subject<AppNotification>['asObservable'] extends () => infer R ? R : never;
  };
  let toast: Record<'success' | 'info' | 'warn' | 'error', ReturnType<typeof vi.fn>>;

  /** Runs the effect that watches the sign-in state, and lets the queued work finish. */
  const settle = async () => {
    TestBed.tick();
    await vi.advanceTimersByTimeAsync(0);
  };
  const start = async () => {
    TestBed.inject(HubConnectionService);
    await settle();
  };
  const notification = (overrides: Partial<AppNotification> = {}): AppNotification => ({
    type: 'success', title: 'Hello from Reporting', body: 'Just for you', at: '2026-11-02T20:00:00Z', ...overrides
  });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    signedIn.set(false);
    incoming = new Subject<AppNotification>();
    calls = [];
    appHub = {
      configure: vi.fn(() => { calls.push('configure'); }),
      connect: vi.fn(async () => { calls.push(incoming.observed ? 'connect(listening)' : 'connect(not listening)'); }),
      disconnect: vi.fn(async () => { calls.push('disconnect'); }),
      notifications$: incoming.asObservable(),
    };
    toast = { success: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isAuthenticated: signedIn } },
        { provide: AppHubService, useValue: appHub },
        { provide: NotificationService, useValue: toast },
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('while nobody is signed in', () => {
    it('should not connect', async () => {
      await start();

      expect(appHub.configure).not.toHaveBeenCalled();
      expect(appHub.connect).not.toHaveBeenCalled();
    });

    it('should not disconnect something that was never connected', async () => {
      await start();

      expect(appHub.disconnect).not.toHaveBeenCalled();
    });
  });

  describe('signing in', () => {
    it('should connect when someone signs in', async () => {
      await start();

      signedIn.set(true);
      await settle();

      expect(appHub.connect).toHaveBeenCalledTimes(1);
    });

    it('should connect straight away when the user was already signed in at startup, as after a page reload', async () => {
      signedIn.set(true);

      await start();

      expect(appHub.connect).toHaveBeenCalledTimes(1);
    });

    it('should build the connection and start listening before it connects, so no message can slip past', async () => {
      signedIn.set(true);

      await start();

      expect(calls).toEqual(['configure', 'connect(listening)']);
    });

    it('should connect only once however often the sign-in state is read', async () => {
      signedIn.set(true);
      await start();

      TestBed.tick();
      await settle();

      expect(appHub.connect).toHaveBeenCalledTimes(1);
    });
  });

  describe('signing out', () => {
    it('should disconnect', async () => {
      signedIn.set(true);
      await start();

      signedIn.set(false);
      await settle();

      expect(appHub.disconnect).toHaveBeenCalledTimes(1);
    });

    it('should stop listening, so nothing is shown after the user has gone', async () => {
      signedIn.set(true);
      await start();

      signedIn.set(false);
      await settle();
      incoming.next(notification());

      expect(incoming.observed).toBe(false);
      expect(toast.success).not.toHaveBeenCalled();
    });

    it('should connect again, with one listener, when someone signs in again', async () => {
      signedIn.set(true);
      await start();
      signedIn.set(false);
      await settle();

      signedIn.set(true);
      await settle();
      incoming.next(notification());

      expect(appHub.connect).toHaveBeenCalledTimes(2);
      expect(toast.success).toHaveBeenCalledTimes(1);
    });

    it('should carry on, and still connect on the next sign-in, if disconnecting fails', async () => {
      appHub.disconnect.mockRejectedValueOnce(new Error('already closed'));
      signedIn.set(true);
      await start();
      signedIn.set(false);
      await settle();

      signedIn.set(true);
      await settle();

      expect(appHub.connect).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('what the back end sends', () => {
    beforeEach(async () => {
      signedIn.set(true);
      await start();
    });

    it.each([
      ['success', 'success'],
      ['info', 'info'],
      ['warn', 'warn'],
      ['warning', 'warn'],
      ['error', 'error'],
    ] as const)('should show a %s notification as a %s toast', (type, method) => {
      incoming.next(notification({ type }));

      expect(toast[method]).toHaveBeenCalledTimes(1);
    });

    it('should ignore the case of the type', () => {
      incoming.next(notification({ type: 'ERROR' }));

      expect(toast.error).toHaveBeenCalledTimes(1);
    });

    it.each(['report-ready', 'something-new', ''])('should show a notification of an unknown type (%j) as information', (type) => {
      incoming.next(notification({ type }));

      expect(toast.info).toHaveBeenCalledTimes(1);
    });

    it('should show every notification, one toast each', () => {
      incoming.next(notification({ title: 'One' }));
      incoming.next(notification({ title: 'Two', type: 'error' }));

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('report events from the back end', () => {
    const reportId = 'b821270a-26b1-45d2-adfc-07e2c2225587';
    // the notification exactly as it arrived over the wire from the hub
    const reportReady = (overrides: Partial<AppNotification> = {}) => notification({
      type: 'Success', title: 'Estimate Generated', event: 'report.ready', correlationId: reportId, ...overrides
    });
    let reports: ReportStatusService;

    beforeEach(async () => {
      signedIn.set(true);
      await start();
      reports = TestBed.inject(ReportStatusService);
    });

    it('should mark a pending report as ready, and still show the toast', () => {
      reports.markPending(reportId);

      incoming.next(reportReady());

      expect(reports.status(reportId)).toBe('ready');
      expect(reports.isDownloadable(reportId)).toBe(true);
      expect(toast.success).toHaveBeenCalledTimes(1);
    });

    it('should mark a pending report as failed', () => {
      reports.markPending(reportId);

      incoming.next(reportReady({ type: 'Error', event: 'report.failed' }));

      expect(reports.status(reportId)).toBe('failed');
      expect(toast.error).toHaveBeenCalledTimes(1);
    });

    it('should leave reports alone when the notification is a plain message', () => {
      reports.markPending(reportId);

      incoming.next(notification());

      expect(reports.status(reportId)).toBe('pending');
    });

    it('should forget the reports when the person signs out', async () => {
      reports.markPending(reportId);

      signedIn.set(false);
      await settle();

      expect(reports.status(reportId)).toBeUndefined();
    });
  });

  describe('when the hub cannot be reached', () => {
    it('should try again after 30 seconds while still signed in', async () => {
      appHub.connect.mockRejectedValueOnce(new Error('hub down'));
      signedIn.set(true);
      await start();
      expect(appHub.connect).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(29_999);
      expect(appHub.connect).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(1);

      expect(appHub.connect).toHaveBeenCalledTimes(2);
    });

    it('should keep trying every 30 seconds until it works, and then stop trying', async () => {
      appHub.connect.mockRejectedValueOnce(new Error('down')).mockRejectedValueOnce(new Error('down'));
      signedIn.set(true);
      await start();

      await vi.advanceTimersByTimeAsync(30_000);
      await vi.advanceTimersByTimeAsync(30_000);
      expect(appHub.connect).toHaveBeenCalledTimes(3);

      await vi.advanceTimersByTimeAsync(120_000);
      expect(appHub.connect).toHaveBeenCalledTimes(3);
    });

    it('should not set up a second listener when it retries', async () => {
      appHub.connect.mockRejectedValueOnce(new Error('down'));
      signedIn.set(true);
      await start();
      await vi.advanceTimersByTimeAsync(30_000);

      incoming.next(notification());

      expect(toast.success).toHaveBeenCalledTimes(1);
    });

    it('should stop trying when the user signs out', async () => {
      appHub.connect.mockRejectedValue(new Error('down'));
      signedIn.set(true);
      await start();

      signedIn.set(false);
      await settle();
      await vi.advanceTimersByTimeAsync(120_000);

      expect(appHub.connect).toHaveBeenCalledTimes(1);
    });

    it('should stop trying when the application is torn down', async () => {
      appHub.connect.mockRejectedValue(new Error('down'));
      signedIn.set(true);
      await start();

      TestBed.resetTestingModule();
      await vi.advanceTimersByTimeAsync(120_000);

      expect(appHub.connect).toHaveBeenCalledTimes(1);
    });

    it('should report the failure to the console and keep the application working', async () => {
      appHub.connect.mockRejectedValueOnce(new Error('hub down'));
      signedIn.set(true);

      await expect(start()).resolves.toBeUndefined();

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('signing in and out quickly', () => {
    it('should handle each change in order and end up as the last one says', async () => {
      await start();

      signedIn.set(true);
      TestBed.tick();
      signedIn.set(false);
      TestBed.tick();
      signedIn.set(true);
      await settle();

      expect(calls.filter((c) => c !== 'configure')).toEqual(['connect(listening)', 'disconnect', 'connect(listening)']);
      expect(incoming.observed).toBe(true);
    });
  });
});
