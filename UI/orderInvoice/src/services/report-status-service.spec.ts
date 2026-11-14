import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppNotification } from './app-hub-service';
import { REPORT_FAILED_EVENT, REPORT_READY_EVENT, ReportStatusService } from './report-status-service';

describe('ReportStatusService', () => {
  const id = '3f2504e0-4f89-11d3-9a0c-0305e82c3301';
  let service: ReportStatusService;

  const notification = (overrides: Partial<AppNotification> = {}): AppNotification => ({
    type: 'success',
    title: 'Estimate Generated',
    at: '2026-11-13T12:00:00Z',
    event: REPORT_READY_EVENT,
    correlationId: id,
    ...overrides,
  });

  beforeEach(() => {
    service = TestBed.inject(ReportStatusService);
  });

  it('knows nothing about a report it was never told about, and lets it be downloaded', () => {
    expect(service.status(id)).toBeUndefined();
    expect(service.isDownloadable(id)).toBe(true);
  });

  it('does not allow a download when there is no report id', () => {
    expect(service.isDownloadable(null)).toBe(false);
    expect(service.isDownloadable(undefined)).toBe(false);
    expect(service.isDownloadable('')).toBe(false);
  });

  it('holds the download back while a requested report is pending', () => {
    service.markPending(id);

    expect(service.status(id)).toBe('pending');
    expect(service.isDownloadable(id)).toBe(false);
  });

  it('allows the download once the back end says the report is ready', () => {
    service.markPending(id);
    service.handle(notification());

    expect(service.status(id)).toBe('ready');
    expect(service.isDownloadable(id)).toBe(true);
  });

  it('keeps the download blocked when the report failed', () => {
    service.markPending(id);
    service.handle(notification({ event: REPORT_FAILED_EVENT, type: 'error' }));

    expect(service.status(id)).toBe('failed');
    expect(service.isDownloadable(id)).toBe(false);
  });

  it('lets a retried report that finally succeeds become downloadable again', () => {
    service.handle(notification({ event: REPORT_FAILED_EVENT }));
    service.handle(notification());

    expect(service.isDownloadable(id)).toBe(true);
  });

  it('keeps the answer when it arrives before the request is marked pending', () => {
    service.handle(notification());
    service.markPending(id);

    expect(service.status(id)).toBe('ready');
  });

  it('compares ids without regard to case', () => {
    service.markPending(id.toUpperCase());

    expect(service.status(id)).toBe('pending');
  });

  it('only tracks the report named by the notification', () => {
    service.markPending(id);
    service.markPending('11111111-1111-1111-1111-111111111111');
    service.handle(notification());

    expect(service.isDownloadable(id)).toBe(true);
    expect(service.isDownloadable('11111111-1111-1111-1111-111111111111')).toBe(false);
  });

  it('ignores plain messages and events it does not know', () => {
    service.markPending(id);
    service.handle(notification({ event: undefined, correlationId: undefined }));
    service.handle(notification({ event: 'something.else' }));
    service.handle(notification({ correlationId: undefined }));

    expect(service.status(id)).toBe('pending');
  });

  it('ignores a value that is not an id, such as what a failed request hands back', () => {
    expect(() => service.markPending({} as unknown as string)).not.toThrow();
    expect(service.status({} as unknown as string)).toBeUndefined();
  });

  it('forgets everything when cleared', () => {
    service.markPending(id);
    service.clear();

    expect(service.status(id)).toBeUndefined();
  });
});

/**
 * A page like OrderInvoice: OnPush, the report id is a plain field that is null when the page is first drawn
 * and set later, and the button asks the service on every refresh.
 */
@Component({
  selector: 'app-report-button-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button [disabled]="!canDownload">{{ label }}</button>`,
})
class ReportButtonHost {
  private status = inject(ReportStatusService);
  private changeDetector = inject(ChangeDetectorRef);
  reportId: string | null = null;
  get canDownload() { return this.status.isDownloadable(this.reportId); }
  get label() { return this.status.status(this.reportId) ?? 'unknown'; }
  markForCheck() { this.changeDetector.markForCheck(); }
}

describe('ReportStatusService with a view that is drawn before it has a report id', () => {
  const id = 'b821270a-26b1-45d2-adfc-07e2c2225587';
  const ready: AppNotification = { type: 'Success', title: 'Estimate Generated', at: '', event: REPORT_READY_EVENT, correlationId: id };
  const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

  async function draw() {
    const fixture = TestBed.createComponent(ReportButtonHost);
    fixture.autoDetectChanges(true);
    await settle();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    return { fixture, host: fixture.componentInstance, button };
  }

  it('should follow the report from pending to ready without the view being forced to refresh', async () => {
    const status = TestBed.inject(ReportStatusService);
    const { host, button } = await draw();
    expect(button.disabled).toBe(true);

    host.reportId = id;
    status.markPending(id);
    await settle();
    expect(button.textContent).toBe('pending');
    expect(button.disabled).toBe(true);

    status.handle(ready);
    await settle();
    expect(button.textContent).toBe('ready');
    expect(button.disabled).toBe(false);
  });

  it('should open up when the answer arrived before the view had its report id, once the view is told', async () => {
    const status = TestBed.inject(ReportStatusService);
    const { host, button } = await draw();

    status.handle(ready);          // the back end won the race
    await settle();
    host.reportId = id;            // the response is handled afterwards
    status.markPending(id);
    host.markForCheck();
    await settle();

    expect(button.textContent).toBe('ready');
    expect(button.disabled).toBe(false);
  });
});

