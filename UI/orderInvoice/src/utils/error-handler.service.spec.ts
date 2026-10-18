import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.inject(ErrorHandlerService);
    messageService = TestBed.inject(MessageService);
    // the handler logs every error to the console, keep the test output clean
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('error bodies from our own exception handler', () => {
    it('should show a fatal error toast with the reference for a 500 that carries a traceId', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        error: { message: 'An unexpected error occurred.', exceptionType: 'UnhandledException', traceId: 'trace-123' }
      });

      service.handleError('OrdersService', 'createOrder')(error);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Fatal Error',
        detail: 'OrdersService: createOrder failed: An unexpected error occurred. (reference: trace-123)',
        sticky: true
      });
    });

    it('should show an invalid request warning without a reference for a 400 without a traceId', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: { message: 'Order item 2 has no ProductId. Every order item must reference a product.', exceptionType: 'RequestException' }
      });

      service.handleError('OrdersService', 'createOrder')(error);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Invalid request',
        detail: 'OrdersService: createOrder failed: Order item 2 has no ProductId. Every order item must reference a product.',
        sticky: false
      });
    });

    it('should keep the toast open and show the reference for a 400 that carries a traceId', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: { message: 'ProductId is required', exceptionType: 'RequestException', traceId: 'trace-456' }
      });

      service.handleError('OrdersService', 'createOrder')(error);

      expect(addSpy).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Invalid request',
        detail: 'OrdersService: createOrder failed: ProductId is required (reference: trace-456)',
        sticky: true
      });
    });

    it('should prefer the message over detail and title when all are present', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        error: { message: 'the message', detail: 'the detail', title: 'the title' }
      });

      service.handleError('S', 'op')(error);

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'S: op failed: the message' }));
    });
  });

  describe('ASP.NET ProblemDetails bodies', () => {
    it('should use the title and the traceId for an automatic validation 400', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: {
          type: 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
          title: 'One or more validation errors occurred.',
          status: 400,
          traceId: '00-abc-def-00'
        }
      });

      service.handleError('OrdersService', 'createOrder')(error);

      expect(addSpy).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Invalid request',
        detail: 'OrdersService: createOrder failed: One or more validation errors occurred. (reference: 00-abc-def-00)',
        sticky: true
      });
    });

    it('should prefer detail over title when both are present', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: { title: 'Bad Request', detail: 'The request body is not valid JSON.' }
      });

      service.handleError('OrdersService', 'createOrder')(error);

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: 'OrdersService: createOrder failed: The request body is not valid JSON.'
      }));
    });
  });

  describe('bodies that are not our error format', () => {
    it('should fall back to the status code when the body is null', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found', error: null });

      service.handleError('ProductService', 'getProducts')(error);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Fatal Error',
        detail: 'ProductService: getProducts failed: server returned code 404',
        sticky: false
      });
    });

    it('should include a plain text body in the message', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({ status: 502, statusText: 'Bad Gateway', error: 'Bad Gateway' });

      service.handleError('ProductService', 'getProducts')(error);

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: 'ProductService: getProducts failed: server returned code 502 with body "Bad Gateway"'
      }));
    });

    it('should fall back to the status code when the body is an object without a message, detail or title', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: {} });

      service.handleError('ProductService', 'getProducts')(error);

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: 'ProductService: getProducts failed: server returned code 500'
      }));
    });

    it('should explain that the server could not be reached when there is no response', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      // when the network is down the browser hands back a ProgressEvent, not a body
      const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error', error: { isTrusted: true, type: 'error' } });

      service.handleError('ProductService', 'getProducts')(error);

      expect(addSpy).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Fatal Error',
        detail: 'ProductService: getProducts failed: Unable to reach the server. Check your connection and try again.',
        sticky: false
      });
    });
  });

  describe('result and logging', () => {
    it('should emit the supplied result and complete so the app keeps running', () => {
      const fallback = ['safe'];
      const next = vi.fn();
      const complete = vi.fn();
      const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: { message: 'boom' } });

      service.handleError<string[]>('ProductService', 'getProducts', fallback)(error).subscribe({ next, complete });

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(fallback);
      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should emit an empty object when no result is supplied', () => {
      const next = vi.fn();
      const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: { message: 'boom' } });

      service.handleError('ProductService', 'getProducts')(error).subscribe({ next });

      expect(next).toHaveBeenCalledWith({});
    });

    it('should log the message with the reference and the original error to the console', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const error = new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        error: { message: 'boom', traceId: 'trace-789' }
      });

      service.handleError('ProductService', 'getProducts')(error);

      expect(consoleSpy).toHaveBeenCalledWith('boom (reference: trace-789)', error);
    });

    it('should use the default operation name when none is given', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: { message: 'boom' } });

      service.handleError('ProductService')(error);

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: 'ProductService: operation failed: boom'
      }));
    });
  });

  describe('createHandleError', () => {
    it('should create a handler factory that remembers the service name', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: { message: 'boom' } });

      const handleError = service.createHandleError('ProductService');
      handleError<string[]>('getProducts', [])(error).subscribe({ next });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: 'ProductService: getProducts failed: boom'
      }));
      expect(next).toHaveBeenCalledWith([]);
    });
  });
});
