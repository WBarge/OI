import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { ReportGenerationService } from './report-generation-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';

describe('ReportGenerationService', () => {
  let service: ReportGenerationService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  const reportingUrl = 'https://reporting.test/api/';
  const estimateUrl = `${reportingUrl}Estimate`;
  const orderId = '22222222-2222-2222-2222-222222222222';

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { reportingApiUrl: reportingUrl });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: configuration } }
      ]
    });
    service = TestBed.inject(ReportGenerationService);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateEstimateReport', () => {
    it('should POST to the Estimate endpoint of the reporting API', () => {
      service.generateEstimateReport(orderId).subscribe();

      const request = httpTestingController.expectOne(estimateUrl);
      expect(request.request.method).toBe('POST');
      request.flush('report-1');
    });

    it('should send the order id as a JSON string with a JSON content type', () => {
      service.generateEstimateReport(orderId).subscribe();

      const request = httpTestingController.expectOne(estimateUrl);
      expect(request.request.body).toBe(JSON.stringify(orderId));
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      request.flush('report-1');
    });

    it('should not call the server until it is subscribed to', () => {
      service.generateEstimateReport(orderId);

      httpTestingController.expectNone(estimateUrl);
    });

    it('should emit the report id the API returns', () => {
      const next = vi.fn();

      service.generateEstimateReport(orderId).subscribe(next);
      httpTestingController.expectOne(estimateUrl).flush('3f2504e0-4f89-11d3-9a0c-0305e82c3301');

      expect(next).toHaveBeenCalledWith('3f2504e0-4f89-11d3-9a0c-0305e82c3301');
    });

    it('should show a toast naming the operation and emit a safe value when the API fails', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const complete = vi.fn();

      service.generateEstimateReport(orderId).subscribe({ next, complete });
      httpTestingController.expectOne(estimateUrl)
        .flush({ message: 'The order does not exist.' }, { status: 400, statusText: 'Bad Request' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        severity: 'warn',
        summary: 'Invalid request',
        detail: 'ReportGenerationService: generateEstimateReport failed: The order does not exist.'
      }));
      expect(next).toHaveBeenCalledWith({});
      expect(complete).toHaveBeenCalledTimes(1);
    });
  });
});
