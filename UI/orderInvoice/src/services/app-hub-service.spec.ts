import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { AppHubService, AppNotification } from './app-hub-service';
import { AuthService } from './auth-service';
import { ConfigService } from './config-service';
import { SignalRConfig, SignalRService } from './signalr.service';
import { Configuration } from '../model/configuration';

describe('AppHubService', () => {
  let service: AppHubService;
  let hub: {
    configure: ReturnType<typeof vi.fn>;
    start: ReturnType<typeof vi.fn>;
    stop: ReturnType<typeof vi.fn>;
    listen: ReturnType<typeof vi.fn>;
    send: ReturnType<typeof vi.fn>;
    invoke: ReturnType<typeof vi.fn>;
  };
  let getAccessToken: ReturnType<typeof vi.fn>;
  let incoming: Subject<unknown>;

  beforeEach(() => {
    incoming = new Subject<unknown>();
    hub = {
      configure: vi.fn(),
      start: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn().mockResolvedValue(undefined),
      listen: vi.fn().mockReturnValue(incoming.asObservable()),
      send: vi.fn().mockResolvedValue(undefined),
      invoke: vi.fn().mockResolvedValue(undefined),
    };
    getAccessToken = vi.fn().mockResolvedValue('token-1');
    const config = Object.assign(new Configuration(), { hubUrl: 'https://hub.test/hubs/app' });

    TestBed.configureTestingModule({
      providers: [
        { provide: SignalRService, useValue: hub },
        { provide: AuthService, useValue: { getAccessToken } },
        { provide: ConfigService, useValue: { config } },
      ],
    });
    service = TestBed.inject(AppHubService);
  });

  describe('configure', () => {
    it('should build the connection for the hub address in the configuration, without starting it', () => {
      service.configure();

      expect(hub.configure).toHaveBeenCalledTimes(1);
      expect(hub.configure.mock.calls[0][0].url).toBe('https://hub.test/hubs/app');
      expect(hub.start).not.toHaveBeenCalled();
    });

    it('should hand the connection a way to get a current access token every time it connects', async () => {
      service.configure();
      const config = hub.configure.mock.calls[0][0] as SignalRConfig;

      expect(await config.accessTokenFactory!()).toBe('token-1');
      getAccessToken.mockResolvedValue('token-2');
      expect(await config.accessTokenFactory!()).toBe('token-2');
    });
  });

  describe('connect', () => {
    it('should configure the connection and then start it', async () => {
      await service.connect();

      expect(hub.configure).toHaveBeenCalledTimes(1);
      expect(hub.start).toHaveBeenCalledTimes(1);
      expect(hub.configure.mock.invocationCallOrder[0]).toBeLessThan(hub.start.mock.invocationCallOrder[0]);
    });

    it('should pass on a failure to connect', async () => {
      hub.start.mockRejectedValue(new Error('down'));

      await expect(service.connect()).rejects.toThrow('down');
    });
  });

  it('should disconnect', async () => {
    await service.disconnect();

    expect(hub.stop).toHaveBeenCalledTimes(1);
  });

  describe('what the hub sends', () => {
    it('should listen for notifications under the name the hub uses', () => {
      expect(hub.listen).toHaveBeenCalledWith('ReceiveNotification');
    });

    it('should listen for messages under the name the hub uses', () => {
      expect(hub.listen).toHaveBeenCalledWith('ReceiveMessage');
    });

    it('should hand notifications on as they arrive', () => {
      const received: AppNotification[] = [];
      service.notifications$.subscribe((n) => received.push(n));

      incoming.next({ type: 'success', title: 'Hello', body: 'World', at: '2026-11-02T20:00:00Z' });

      expect(received).toEqual([{ type: 'success', title: 'Hello', body: 'World', at: '2026-11-02T20:00:00Z' }]);
    });
  });

  describe('calling the hub', () => {
    it('should send a message to one of the caller’s groups', () => {
      service.sendToMyGroup('sales', 'hello');

      expect(hub.send).toHaveBeenCalledWith('SendToMyGroup', 'sales', 'hello');
    });

    it('should subscribe to a topic', () => {
      service.subscribe('sales', 'orders');

      expect(hub.invoke).toHaveBeenCalledWith('Subscribe', 'sales', 'orders');
    });

    it('should unsubscribe from a topic', () => {
      service.unsubscribe('sales', 'orders');

      expect(hub.invoke).toHaveBeenCalledWith('Unsubscribe', 'sales', 'orders');
    });
  });
});
