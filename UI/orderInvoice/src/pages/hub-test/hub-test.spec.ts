import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { HubTest } from './hub-test';
import { HubTestService } from '../../services/hub-test-service';
import { SignalRService } from '../../services/signalr.service';
import { HubTestResult } from '../../model/results/hub-test-result';

describe('HubTest', () => {
  let fixture: ComponentFixture<HubTest>;
  const connected = signal(true);
  let sendTestMessage: ReturnType<typeof vi.fn>;

  const html = () => fixture.nativeElement as HTMLElement;
  const text = () => html().textContent ?? '';
  const button = () => html().querySelector<HTMLButtonElement>('button')!;
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    connected.set(true);
    sendTestMessage = vi.fn().mockReturnValue(of({ sent: true } satisfies HubTestResult));

    await TestBed.configureTestingModule({
      imports: [HubTest],
      providers: [
        { provide: HubTestService, useValue: { sendTestMessage } },
        { provide: SignalRService, useValue: { isConnected: connected } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HubTest);
    await settle();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should explain what the page does', () => {
    expect(text()).toContain('Hub test');
    expect(text()).toContain('ask the Reporting API to send you a message');
  });

  describe('the hub connection', () => {
    it('should say Connected when the browser is connected to the hub', () => {
      expect(text()).toContain('Connected');
      expect(text()).not.toContain('Not connected');
      expect(html().querySelector('.hubOnline')).toBeTruthy();
    });

    it('should say Not connected, and warn that a message would be missed, when it is not', async () => {
      connected.set(false);
      await settle();

      expect(text()).toContain('Not connected');
      expect(html().querySelector('.hubOffline')).toBeTruthy();
      expect(text()).toContain('would not reach you');
    });

    it('should not show the warning while connected', () => {
      expect(text()).not.toContain('would not reach you');
    });

    it('should follow the connection as it changes', async () => {
      connected.set(false);
      await settle();
      connected.set(true);
      await settle();

      expect(text()).not.toContain('Not connected');
    });

    it('should still let the message be sent while not connected, so the failure can be seen', async () => {
      connected.set(false);
      await settle();

      expect(button().disabled).toBe(false);
    });
  });

  describe('sending', () => {
    it('should offer a button to send the message', () => {
      expect(button().textContent).toContain('Send me a test message');
      expect(button().disabled).toBe(false);
    });

    it('should ask the service to send it when the button is pressed', async () => {
      button().click();
      await settle();

      expect(sendTestMessage).toHaveBeenCalledTimes(1);
    });

    it('should say when the request was made', async () => {
      button().click();
      await settle();

      expect(text()).toContain('Requested at');
      expect(text()).toContain('should appear as a notification');
    });

    it('should show nothing about a request that failed, because the error handler has already told the user', async () => {
      sendTestMessage.mockReturnValue(of(null));

      button().click();
      await settle();

      expect(text()).not.toContain('Requested at');
    });

    it('should show nothing when the answer says it was not sent', async () => {
      sendTestMessage.mockReturnValue(of({ sent: false }));

      button().click();
      await settle();

      expect(text()).not.toContain('Requested at');
    });

    it('should show that it is working, and not allow a second press, until the answer arrives', async () => {
      const pending = new Subject<HubTestResult | null>();
      sendTestMessage.mockReturnValue(pending);

      button().click();
      await settle();
      expect(button().disabled).toBe(true);
      expect(button().textContent).toContain('Sending');

      button().click();
      await settle();
      expect(sendTestMessage).toHaveBeenCalledTimes(1);

      pending.next({ sent: true });
      pending.complete();
      await settle();
      expect(button().disabled).toBe(false);
      expect(button().textContent).toContain('Send me a test message');
    });

    it('should be ready to send again, and log the problem, if the call fails in a way the service did not expect', async () => {
      const logged = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      sendTestMessage.mockReturnValue(throwError(() => new Error('boom')));

      button().click();
      await settle();

      expect(logged).toHaveBeenCalledWith('Hub test failed', expect.any(Error));
      expect(button().disabled).toBe(false);
      expect(text()).not.toContain('Requested at');
    });

    it('should clear the earlier result while the next message is on its way', async () => {
      button().click();
      await settle();
      expect(text()).toContain('Requested at');

      sendTestMessage.mockReturnValue(new Subject<HubTestResult | null>());
      button().click();
      await settle();

      expect(text()).not.toContain('Requested at');
    });

    it('should be able to send as many times as the user likes', async () => {
      button().click();
      await settle();
      button().click();
      await settle();

      expect(sendTestMessage).toHaveBeenCalledTimes(2);
    });
  });
});
