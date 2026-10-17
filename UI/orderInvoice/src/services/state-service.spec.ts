import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { StateService } from './state-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { State } from '../model/results/state';

describe('StateService', () => {
  let service: StateService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  const apiUrl = 'https://oi.test/api/';
  const statesUrl = `${apiUrl}States`;

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
    service = TestBed.inject(StateService);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be created until the configuration has been loaded', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        // the real ConfigService throws when it is read before load() has run
        { provide: ConfigService, useValue: { get config(): Configuration { throw new Error('Configuration accessed before it was loaded.'); } } }
      ]
    });

    expect(() => TestBed.inject(StateService)).toThrow('Configuration accessed before it was loaded.');
  });

  describe('getStates', () => {
    it('should GET the States endpoint built from the configured oiApiUrl', () => {
      service.getStates().subscribe();

      const request = httpTestingController.expectOne(statesUrl);
      expect(request.request.method).toBe('GET');
      request.flush([]);
    });

    it('should return the states sorted by name', () => {
      const result = vi.fn();
      const unsorted: State[] = [
        { name: 'Texas', code: 'TX' },
        { name: 'Arizona', code: 'AZ' },
        { name: 'Oregon', code: 'OR' }
      ];

      service.getStates().subscribe(result);
      httpTestingController.expectOne(statesUrl).flush(unsorted);

      expect(result).toHaveBeenCalledTimes(1);
      expect(result.mock.calls[0][0]).toEqual([
        { name: 'Arizona', code: 'AZ' },
        { name: 'Oregon', code: 'OR' },
        { name: 'Texas', code: 'TX' }
      ]);
    });

    it('should leave an already sorted list in the same order', () => {
      const result = vi.fn();
      const sorted: State[] = [
        { name: 'Alabama', code: 'AL' },
        { name: 'Alaska', code: 'AK' },
        { name: 'Arizona', code: 'AZ' }
      ];

      service.getStates().subscribe(result);
      httpTestingController.expectOne(statesUrl).flush(sorted);

      expect(result.mock.calls[0][0]).toEqual(sorted);
    });

    it('should sort a list that arrives in reverse order', () => {
      const result = vi.fn();

      service.getStates().subscribe(result);
      httpTestingController.expectOne(statesUrl).flush([
        { name: 'Wyoming', code: 'WY' },
        { name: 'Utah', code: 'UT' },
        { name: 'Alaska', code: 'AK' }
      ]);

      expect((result.mock.calls[0][0] as State[]).map(s => s.code)).toEqual(['AK', 'UT', 'WY']);
    });

    it('should keep the code with its name when sorting', () => {
      const result = vi.fn();

      service.getStates().subscribe(result);
      httpTestingController.expectOne(statesUrl).flush([
        { name: 'Nevada', code: 'NV' },
        { name: 'Maine', code: 'ME' }
      ]);

      const states = result.mock.calls[0][0] as State[];
      expect(states[0]).toEqual({ name: 'Maine', code: 'ME' });
      expect(states[1]).toEqual({ name: 'Nevada', code: 'NV' });
    });

    it('should sort using locale comparison so accented names are placed with their base letters', () => {
      const result = vi.fn();

      service.getStates().subscribe(result);
      httpTestingController.expectOne(statesUrl).flush([
        { name: 'Zacatecas', code: 'ZA' },
        { name: 'Álvaro', code: 'AL' },
        { name: 'Berlin', code: 'BE' }
      ]);

      expect((result.mock.calls[0][0] as State[]).map(s => s.name)).toEqual(['Álvaro', 'Berlin', 'Zacatecas']);
    });

    it('should keep entries with the same name', () => {
      const result = vi.fn();

      service.getStates().subscribe(result);
      httpTestingController.expectOne(statesUrl).flush([
        { name: 'Georgia', code: 'GA' },
        { name: 'Georgia', code: 'GE' }
      ]);

      expect(result.mock.calls[0][0]).toHaveLength(2);
    });

    it('should return an empty list when the server returns no states', () => {
      const result = vi.fn();

      service.getStates().subscribe(result);
      httpTestingController.expectOne(statesUrl).flush([]);

      expect(result).toHaveBeenCalledTimes(1);
      expect(result.mock.calls[0][0]).toEqual([]);
    });

    it('should not mutate the array that came back from the server', () => {
      const result = vi.fn();
      const fromServer: State[] = [
        { name: 'Texas', code: 'TX' },
        { name: 'Arizona', code: 'AZ' }
      ];
      const snapshot = fromServer.map(s => ({ ...s }));

      service.getStates().subscribe(result);
      // flush hands the body through untouched when it is already an object graph
      httpTestingController.expectOne(statesUrl).flush(fromServer);

      expect(fromServer).toEqual(snapshot);
      expect(result.mock.calls[0][0]).not.toBe(fromServer);
    });

    it('should complete after emitting the states', () => {
      const next = vi.fn();
      const complete = vi.fn();

      service.getStates().subscribe({ next, complete });
      httpTestingController.expectOne(statesUrl).flush([{ name: 'Ohio', code: 'OH' }]);

      expect(next).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should make a new request each time it is subscribed to', () => {
      const states = service.getStates();

      states.subscribe();
      states.subscribe();

      const requests = httpTestingController.match(statesUrl);
      expect(requests).toHaveLength(2);
      requests.forEach(r => r.flush([]));
    });

    it('should not call the server until it is subscribed to', () => {
      service.getStates();

      httpTestingController.expectNone(statesUrl);
    });

    describe('when the call fails', () => {
      it('should show an error toast naming the service and operation', () => {
        const addSpy = vi.spyOn(messageService, 'add');

        service.getStates().subscribe();
        httpTestingController.expectOne(statesUrl)
          .flush({ message: 'database down' }, { status: 500, statusText: 'Internal Server Error' });

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
          severity: 'error',
          summary: 'Fatal Error',
          detail: 'StateService: getStates failed: database down'
        }));
      });

      it('should swallow the error and complete with a safe value instead of erroring', () => {
        const next = vi.fn();
        const error = vi.fn();
        const complete = vi.fn();

        service.getStates().subscribe({ next, error, complete });
        httpTestingController.expectOne(statesUrl)
          .flush({ message: 'database down' }, { status: 500, statusText: 'Internal Server Error' });

        expect(error).not.toHaveBeenCalled();
        // the safe value is an empty list so callers can keep iterating it
        expect(next).toHaveBeenCalledWith([]);
        expect(complete).toHaveBeenCalledTimes(1);
      });

      it('should show a warning toast when the server rejects the request with a 400', () => {
        const addSpy = vi.spyOn(messageService, 'add');

        service.getStates().subscribe();
        httpTestingController.expectOne(statesUrl)
          .flush({ message: 'bad request' }, { status: 400, statusText: 'Bad Request' });

        expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
          severity: 'warn',
          summary: 'Invalid request',
          detail: 'StateService: getStates failed: bad request'
        }));
      });

      it('should show a status based message when the server returns an empty 404', () => {
        const addSpy = vi.spyOn(messageService, 'add');

        service.getStates().subscribe();
        httpTestingController.expectOne(statesUrl)
          .flush(null, { status: 404, statusText: 'Not Found' });

        expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
          severity: 'error',
          detail: 'StateService: getStates failed: server returned code 404'
        }));
      });

      it('should show a connection message when the network is unreachable', () => {
        const addSpy = vi.spyOn(messageService, 'add');
        const next = vi.fn();

        service.getStates().subscribe(next);
        httpTestingController.expectOne(statesUrl).error(new ProgressEvent('error'), { status: 0 });

        expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
          severity: 'error',
          detail: 'StateService: getStates failed: Unable to reach the server. Check your connection and try again.'
        }));
        expect(next).toHaveBeenCalledTimes(1);
      });

      it('should keep the toast open and include the reference when the server returns a trace id', () => {
        const addSpy = vi.spyOn(messageService, 'add');

        service.getStates().subscribe();
        httpTestingController.expectOne(statesUrl)
          .flush({ message: 'boom', traceId: 'trace-123' }, { status: 500, statusText: 'Internal Server Error' });

        expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
          detail: 'StateService: getStates failed: boom (reference: trace-123)',
          sticky: true
        }));
      });

      it('should not make the toast sticky when there is no trace id', () => {
        const addSpy = vi.spyOn(messageService, 'add');

        service.getStates().subscribe();
        httpTestingController.expectOne(statesUrl)
          .flush({ message: 'boom' }, { status: 500, statusText: 'Internal Server Error' });

        expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ sticky: false }));
      });

      it('should log the failure to the console', () => {
        service.getStates().subscribe();
        httpTestingController.expectOne(statesUrl)
          .flush({ message: 'database down' }, { status: 500, statusText: 'Internal Server Error' });

        expect(console.error).toHaveBeenCalledTimes(1);
      });
    });
  });
});
