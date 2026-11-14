import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { TermsService } from './terms-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';

describe('TermsService', () => {
  let service: TermsService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  const apiUrl = 'https://oi.test/api/';
  const termsUrl = `${apiUrl}Terms`;

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { oiApiUrl: apiUrl });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: configuration } }
      ]
    });
    service = TestBed.inject(TermsService);
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

  describe('getTerms', () => {
    it('should GET the terms from the Terms endpoint', () => {
      service.getTerms().subscribe();

      const request = httpTestingController.expectOne(termsUrl);
      expect(request.request.method).toBe('GET');
      request.flush([]);
    });

    it('should not call the server until it is subscribed to', () => {
      service.getTerms();

      httpTestingController.expectNone(termsUrl);
    });

    it('should emit the terms in the order the API sent them', () => {
      const next = vi.fn();

      service.getTerms().subscribe(next);
      httpTestingController.expectOne(termsUrl).flush(['Upon Completion', 'Net 30', 'Net 60', 'Net 90', 'COD']);

      expect(next).toHaveBeenCalledWith(['Upon Completion', 'Net 30', 'Net 60', 'Net 90', 'COD']);
    });

    it('should show a toast naming the operation and emit an empty list when the API fails', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const complete = vi.fn();

      service.getTerms().subscribe({ next, complete });
      httpTestingController.expectOne(termsUrl).flush(null, { status: 500, statusText: 'Server Error' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        severity: 'error',
        summary: 'Fatal Error',
        detail: 'TermsService: getTerms failed: server returned code 500'
      }));
      expect(next).toHaveBeenCalledWith([]);
      expect(complete).toHaveBeenCalledTimes(1);
    });
  });
});
