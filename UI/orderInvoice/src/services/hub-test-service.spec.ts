import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { HubTestService } from './hub-test-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { HubTestResult } from '../model/results/hub-test-result';

describe('HubTestService', () => {
  let service: HubTestService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  const url = 'https://reports.test/api/NotificationTest';

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { reportingApiUrl: 'https://reports.test/api/' });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: configuration } }
      ]
    });
    service = TestBed.inject(HubTestService);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  it('should not call the server until someone subscribes', () => {
    service.sendTestMessage();

    httpTestingController.expectNone(url);
  });

  it('should ask the Reporting API to send the message, with a POST to NotificationTest', () => {
    service.sendTestMessage().subscribe();

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({});
    request.flush({ sent: true });
  });

  it('should hand back what the API answers', () => {
    let result: HubTestResult | null | undefined;
    service.sendTestMessage().subscribe(value => (result = value));

    httpTestingController.expectOne(url).flush({ sent: true });

    expect(result).toEqual({ sent: true });
  });

  it.each([503, 401, 500])('should hand back null, and tell the user, when the API answers %s', status => {
    const addSpy = vi.spyOn(messageService, 'add');
    let result: HubTestResult | null | undefined;
    service.sendTestMessage().subscribe(value => (result = value));

    httpTestingController.expectOne(url).flush({ message: 'The notification hub could not be reached.' }, { status, statusText: 'Error' });

    expect(result).toBeNull();
    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
  });

  it('should hand back null, and tell the user, when the API cannot be reached at all', () => {
    const addSpy = vi.spyOn(messageService, 'add');
    let result: HubTestResult | null | undefined;
    service.sendTestMessage().subscribe(value => (result = value));

    httpTestingController.expectOne(url).error(new ProgressEvent('error'));

    expect(result).toBeNull();
    expect(addSpy).toHaveBeenCalledTimes(1);
  });

  it('should call once per subscription', () => {
    service.sendTestMessage().subscribe();
    service.sendTestMessage().subscribe();

    const requests = httpTestingController.match(url);
    expect(requests.length).toBe(2);
    requests.forEach(request => request.flush({ sent: true }));
  });
});
