import { Service, signal } from '@angular/core';

import type { AppNotification } from './app-hub-service';

/** Event names the back end puts on a notification. They must match OI.Glue NotificationEvents. */
export const REPORT_READY_EVENT = 'report.ready';
export const REPORT_FAILED_EVENT = 'report.failed';

/**
 * pending - requested in this browser session, the back end has not said it is done
 * ready   - the back end said the report can be downloaded
 * failed  - the back end said the report could not be generated
 */
export type ReportStatus = 'pending' | 'ready' | 'failed';

/**
 * Remembers, for this browser session only, how the reports that were requested are doing, so a page can
 * disable its download button while a report is still being generated.
 *
 * It is a hint, not a lock. Nothing is stored: after a refresh, in another tab, or if the hub was down, a report
 * has no status here and counts as downloadable, and the 404 handling in ReportDownloadService stays the safety net.
 *
 * Reports are keyed by report id. Ids are unique across every kind of report (Estimate, Order, Invoice), so the
 * kinds never collide and nothing here needs to know which kind a report is.
 */
@Service()
export class ReportStatusService {
  private readonly statuses = signal<ReadonlyMap<string, ReportStatus>>(new Map());

  /**
   * The status of a report, or undefined when this session knows nothing about it.
   *
   * The signal is read before anything else, even when there is no report id yet. A template that calls this while the
   * id is still null must still depend on the signal, otherwise it is never told when the id arrives and the report
   * becomes pending or ready, and the page stays as it was first drawn.
   */
  status(reportId: string | null | undefined): ReportStatus | undefined {
    const statuses = this.statuses();
    const key = this.key(reportId);
    return key === null ? undefined : statuses.get(key);
  }

  /** True when there is a report id and the back end has not said it is still being generated or has failed. */
  isDownloadable(reportId: string | null | undefined): boolean {
    const status = this.status(reportId);   // always reads the signal, see status()
    if (this.key(reportId) === null) {
      return false;
    }
    return status !== 'pending' && status !== 'failed';
  }

  /**
   * Call when a report has been requested. If the back end's answer already arrived (a fast job can finish before
   * the request's own response is processed) that answer is kept.
   */
  markPending(reportId: string | null | undefined): void {
    const key = this.key(reportId);
    if (key === null || this.statuses().has(key)) {
      return;
    }
    this.set(key, 'pending');
  }

  /** Feeds a notification from the hub. Anything that is not a report event is ignored. */
  handle(notification: AppNotification): void {
    const key = this.key(notification.correlationId);
    if (key === null) {
      return;
    }
    if (notification.event === REPORT_READY_EVENT) {
      this.set(key, 'ready');
    } else if (notification.event === REPORT_FAILED_EVENT) {
      this.set(key, 'failed');
    }
  }

  /** Forget everything, for example when the person signs out. */
  clear(): void {
    this.statuses.set(new Map());
  }

  private set(key: string, status: ReportStatus): void {
    this.statuses.update((current) => new Map(current).set(key, status));
  }

  /** Ids are compared case-insensitively. Also guards against a failed request handing back something that is not an id. */
  private key(reportId: unknown): string | null {
    return typeof reportId === 'string' && reportId.trim() !== '' ? reportId.trim().toLowerCase() : null;
  }
}
