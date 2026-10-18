import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { NotificationService } from './notification-service';

describe('NotificationService', () => {
  let service: NotificationService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MessageService] });
    service = TestBed.inject(NotificationService);
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it.each([
    ['success'],
    ['info'],
    ['warn'],
    ['error']
  ] as const)('should show a %s toast with the summary and the detail', (severity) => {
    const addSpy = vi.spyOn(messageService, 'add');

    service[severity]('The summary', 'The detail');

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledWith({ severity, summary: 'The summary', detail: 'The detail' });
  });

  it('should show one toast per call', () => {
    const addSpy = vi.spyOn(messageService, 'add');

    service.info('First', 'one');
    service.error('Second', 'two');

    expect(addSpy).toHaveBeenCalledTimes(2);
    expect(addSpy).toHaveBeenNthCalledWith(1, { severity: 'info', summary: 'First', detail: 'one' });
    expect(addSpy).toHaveBeenNthCalledWith(2, { severity: 'error', summary: 'Second', detail: 'two' });
  });

  it('should reach the message service that the toast component listens to', () => {
    const received = vi.fn();
    messageService.messageObserver.subscribe(received);

    service.warn('Heads up', 'Something to read');

    expect(received).toHaveBeenCalledWith({ severity: 'warn', summary: 'Heads up', detail: 'Something to read' });
  });
});
