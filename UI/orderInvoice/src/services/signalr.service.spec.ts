import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import {
  BackoffRetryPolicy,
  HUB_CONNECTION_FACTORY,
  SignalRConfig,
  SignalRService,
  defaultHubConnectionFactory,
} from './signalr.service';

type Handler = (...args: unknown[]) => void;

/** A stand-in for the real connection, so the service can be tested without a server. */
class FakeConnection {
  state: string = HubConnectionState.Disconnected;
  handlers = new Map<string, Set<Handler>>();
  closeCallbacks: ((error?: Error) => void)[] = [];
  reconnectingCallbacks: ((error?: Error) => void)[] = [];
  reconnectedCallbacks: (() => void)[] = [];

  start = vi.fn(async () => { this.state = HubConnectionState.Connected; });
  stop = vi.fn(async () => { this.state = HubConnectionState.Disconnected; });
  send = vi.fn(async () => undefined);
  invoke = vi.fn(async () => 'result');
  stream = vi.fn();
  on = vi.fn((method: string, handler: Handler) => {
    const key = method.toLowerCase();
    this.handlers.set(key, (this.handlers.get(key) ?? new Set()).add(handler));
  });
  off = vi.fn((method: string, handler: Handler) => {
    this.handlers.get(method.toLowerCase())?.delete(handler);
  });
  onclose = vi.fn((callback: (error?: Error) => void) => { this.closeCallbacks.push(callback); });
  onreconnecting = vi.fn((callback: (error?: Error) => void) => { this.reconnectingCallbacks.push(callback); });
  onreconnected = vi.fn((callback: () => void) => { this.reconnectedCallbacks.push(callback); });

  emit(method: string, ...args: unknown[]) {
    this.handlers.get(method.toLowerCase())?.forEach((handler) => handler(...args));
  }
}

describe('SignalRService', () => {
  let service: SignalRService;
  let connection: FakeConnection;
  let factory: ReturnType<typeof vi.fn>;
  const conn = () => connection;
  const token = () => 'token-1';
  const configGiven = () => factory.mock.calls[0][0] as SignalRConfig;

  beforeEach(() => {
    connection = new FakeConnection();
    factory = vi.fn(() => connection as unknown as HubConnection);
    TestBed.configureTestingModule({ providers: [{ provide: HUB_CONNECTION_FACTORY, useValue: factory }] });
    service = TestBed.inject(SignalRService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('before it is configured', () => {
    it('should be disconnected with no error', () => {
      expect(service.state()).toBe(HubConnectionState.Disconnected);
      expect(service.isConnected()).toBe(false);
      expect(service.error()).toBeNull();
    });

    it.each<[string, () => unknown]>([
      ['start', () => service.start()],
      ['on', () => service.on('x', () => undefined)],
      ['listen', () => new Promise((_resolve, reject) => service.listen('x').subscribe({ error: reject }))],
      ['send', () => service.send('x')],
      ['invoke', () => service.invoke('x')],
      ['stream', () => new Promise((_resolve, reject) => service.stream('x').subscribe({ error: reject }))],
    ])('should refuse to %s, and say configure() comes first', async (_name, act) => {
      await expect(Promise.resolve().then(() => act())).rejects.toThrow('configure()');
    });

    it('should be able to stop without a connection', async () => {
      await expect(service.stop()).resolves.toBeUndefined();

      expect(service.state()).toBe(HubConnectionState.Disconnected);
    });
  });

  describe('configure', () => {
    it('should build the connection for the url given, using the token supplied', () => {
      service.configure({ url: 'https://hub.test/hubs/app', accessTokenFactory: token });

      expect(factory).toHaveBeenCalledTimes(1);
      expect(configGiven().url).toBe('https://hub.test/hubs/app');
      expect(configGiven().accessTokenFactory!()).toBe('token-1');
    });

    it('should only build the connection once, however often it is called', () => {
      service.configure({ url: 'https://hub.test/a' });
      service.configure({ url: 'https://hub.test/b' });

      expect(factory).toHaveBeenCalledTimes(1);
      expect(configGiven().url).toBe('https://hub.test/a');
    });

    it('should not connect yet', () => {
      service.configure({ url: 'https://hub.test/hubs/app' });

      expect(conn().start).not.toHaveBeenCalled();
    });

    it('should hook up the connection events so the state follows the connection', () => {
      service.configure({ url: 'https://hub.test/hubs/app' });

      expect(conn().onreconnecting).toHaveBeenCalledTimes(1);
      expect(conn().onreconnected).toHaveBeenCalledTimes(1);
      expect(conn().onclose).toHaveBeenCalledTimes(1);
    });
  });

  describe('connecting', () => {
    beforeEach(() => service.configure({ url: 'https://hub.test/hubs/app', accessTokenFactory: token }));

    it('should connect, and report it', async () => {
      await service.start();

      expect(conn().start).toHaveBeenCalledTimes(1);
      expect(service.state()).toBe(HubConnectionState.Connected);
      expect(service.isConnected()).toBe(true);
      expect(service.error()).toBeNull();
    });

    it('should do nothing when it is already connected', async () => {
      await service.start();
      await service.start();

      expect(conn().start).toHaveBeenCalledTimes(1);
    });

    it('should show it is connecting while the attempt is in progress', async () => {
      let finish!: () => void;
      conn().start.mockImplementation(() => new Promise<void>((resolve) => (finish = () => { conn().state = 'Connected'; resolve(); })));

      const starting = service.start();
      expect(service.state()).toBe(HubConnectionState.Connecting);
      finish();
      await starting;

      expect(service.state()).toBe(HubConnectionState.Connected);
    });

    it('should try again after a failed attempt, and keep the error out of the way once it works', async () => {
      vi.useFakeTimers();
      conn().start.mockRejectedValueOnce(new Error('down'));

      const starting = service.start();
      await vi.advanceTimersByTimeAsync(0);
      expect(service.error()).toBe('down');
      await vi.advanceTimersByTimeAsync(2000);
      await starting;

      expect(conn().start).toHaveBeenCalledTimes(2);
      expect(service.isConnected()).toBe(true);
      expect(service.error()).toBeNull();
    });

    it('should wait a little longer before each new attempt', async () => {
      vi.useFakeTimers();
      conn().start.mockRejectedValue(new Error('down'));

      const starting = service.start(4);
      const outcome = starting.catch(() => undefined);
      await vi.advanceTimersByTimeAsync(0);
      expect(conn().start).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(1999);
      expect(conn().start).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(1);
      expect(conn().start).toHaveBeenCalledTimes(2);
      await vi.advanceTimersByTimeAsync(4000);
      expect(conn().start).toHaveBeenCalledTimes(3);
      await vi.advanceTimersByTimeAsync(8000);
      await outcome;

      expect(conn().start).toHaveBeenCalledTimes(4);
    });

    it('should give up after the attempts allowed, and say why', async () => {
      vi.useFakeTimers();
      conn().start.mockRejectedValue(new Error('still down'));

      const starting = service.start(3);
      const assertion = expect(starting).rejects.toThrow('still down');
      await vi.advanceTimersByTimeAsync(6000);
      await assertion;

      expect(conn().start).toHaveBeenCalledTimes(3);
      expect(service.state()).toBe(HubConnectionState.Disconnected);
      expect(service.error()).toBe('still down');
    });

    it('should be able to try again after giving up', async () => {
      vi.useFakeTimers();
      conn().start.mockRejectedValueOnce(new Error('down'));
      const first = service.start(1);
      await expect(first).rejects.toThrow('down');

      await service.start();

      expect(service.isConnected()).toBe(true);
    });
  });

  describe('stopping', () => {
    beforeEach(() => service.configure({ url: 'https://hub.test/hubs/app' }));

    it('should disconnect', async () => {
      await service.start();

      await service.stop();

      expect(conn().stop).toHaveBeenCalledTimes(1);
      expect(service.state()).toBe(HubConnectionState.Disconnected);
      expect(service.isConnected()).toBe(false);
    });

    it('should not reconnect when it is stopped while waiting to retry, which is what signing out during a failed connect looks like', async () => {
      vi.useFakeTimers();
      conn().start.mockRejectedValue(new Error('down'));

      const starting = service.start();
      await vi.advanceTimersByTimeAsync(0);
      await service.stop();
      await vi.advanceTimersByTimeAsync(20000);
      await starting;

      expect(conn().start).toHaveBeenCalledTimes(1);
      expect(service.state()).toBe(HubConnectionState.Disconnected);
    });

    it('should not stay connected when it is stopped while the connection is still being made', async () => {
      let finish!: () => void;
      conn().start.mockImplementation(() => new Promise<void>((resolve) => (finish = () => { conn().state = 'Connected'; resolve(); })));

      const starting = service.start();
      await service.stop();
      finish();
      await starting;

      expect(conn().stop).toHaveBeenCalledTimes(2);   // once by the caller, once when the late connection arrived
      expect(service.state()).toBe(HubConnectionState.Disconnected);
    });

    it('should treat an attempt that fails because it was stopped as a clean stop, not an error', async () => {
      let fail!: () => void;
      conn().start.mockImplementation(() => new Promise<void>((_resolve, reject) => (fail = () => reject(new Error('stopped during negotiation')))));

      const starting = service.start();
      await service.stop();
      fail();

      await expect(starting).resolves.toBeUndefined();
      expect(service.error()).toBeNull();
      expect(conn().start).toHaveBeenCalledTimes(1);
    });

    it('should be able to connect again after being stopped', async () => {
      await service.start();
      await service.stop();

      await service.start();

      expect(service.isConnected()).toBe(true);
      expect(conn().start).toHaveBeenCalledTimes(2);
    });

    it('should disconnect when the service is destroyed', () => {
      TestBed.resetTestingModule();

      expect(conn().stop).toHaveBeenCalledTimes(1);
    });
  });

  describe('connection events', () => {
    beforeEach(async () => {
      service.configure({ url: 'https://hub.test/hubs/app' });
      await service.start();
    });

    it('should show it is reconnecting, and why', () => {
      conn().state = 'Reconnecting';

      conn().reconnectingCallbacks.forEach((callback) => callback(new Error('network lost')));

      expect(service.state()).toBe(HubConnectionState.Reconnecting);
      expect(service.error()).toBe('network lost');
    });

    it('should say the connection was lost when no reason is given', () => {
      conn().reconnectingCallbacks.forEach((callback) => callback(undefined));

      expect(service.error()).toBe('Connection lost');
    });

    it('should clear the error once reconnected', () => {
      conn().reconnectingCallbacks.forEach((callback) => callback(new Error('network lost')));
      conn().state = 'Connected';

      conn().reconnectedCallbacks.forEach((callback) => callback());

      expect(service.error()).toBeNull();
      expect(service.isConnected()).toBe(true);
    });

    it('should show it is disconnected, and why, when the connection closes with an error', () => {
      conn().state = 'Disconnected';

      conn().closeCallbacks.forEach((callback) => callback(new Error('server closed it')));

      expect(service.isConnected()).toBe(false);
      expect(service.error()).toBe('server closed it');
    });

    it('should show it is disconnected when the connection closes cleanly', () => {
      conn().state = 'Disconnected';

      conn().closeCallbacks.forEach((callback) => callback(undefined));

      expect(service.state()).toBe(HubConnectionState.Disconnected);
    });
  });

  describe('messages', () => {
    beforeEach(() => service.configure({ url: 'https://hub.test/hubs/app' }));

    it('should pass a message to the handler registered with on()', () => {
      const handler = vi.fn();
      service.on('ReceiveNotification', handler);

      conn().emit('ReceiveNotification', { title: 'Hi' }, 'second');

      expect(handler).toHaveBeenCalledWith({ title: 'Hi' }, 'second');
    });

    it('should stop passing messages once on() is undone', () => {
      const handler = vi.fn();
      const off = service.on('ReceiveNotification', handler);

      off();
      conn().emit('ReceiveNotification', 'late');

      expect(handler).not.toHaveBeenCalled();
    });

    it('should emit a single argument as it is from listen()', () => {
      const received: unknown[] = [];
      service.listen('ReceiveNotification').subscribe((value) => received.push(value));

      conn().emit('ReceiveNotification', { title: 'Hi' });

      expect(received).toEqual([{ title: 'Hi' }]);
    });

    it('should emit several arguments together as a list from listen()', () => {
      const received: unknown[] = [];
      service.listen('ReceiveMessage').subscribe((value) => received.push(value));

      conn().emit('ReceiveMessage', 'pat', 'hello');

      expect(received).toEqual([['pat', 'hello']]);
    });

    it('should not register with the connection until something subscribes', () => {
      service.listen('ReceiveNotification');

      expect(conn().on).not.toHaveBeenCalled();
    });

    it('should stop listening when the subscription ends', () => {
      const received: unknown[] = [];
      const subscription = service.listen('ReceiveNotification').subscribe((value) => received.push(value));

      subscription.unsubscribe();
      conn().emit('ReceiveNotification', 'late');

      expect(received).toEqual([]);
      expect(conn().off).toHaveBeenCalledTimes(1);
    });

    it('should let several subscribers each receive the message', () => {
      const first: unknown[] = [];
      const second: unknown[] = [];
      service.listen('ReceiveNotification').subscribe((value) => first.push(value));
      service.listen('ReceiveNotification').subscribe((value) => second.push(value));

      conn().emit('ReceiveNotification', 'both');

      expect(first).toEqual(['both']);
      expect(second).toEqual(['both']);
    });

    it('should accept listeners before the connection is started, so nothing is missed when it opens', () => {
      const received: unknown[] = [];
      service.listen('ReceiveNotification').subscribe((value) => received.push(value));

      conn().emit('ReceiveNotification', 'early');

      expect(received).toEqual(['early']);
      expect(conn().start).not.toHaveBeenCalled();
    });
  });

  describe('calling the hub', () => {
    beforeEach(() => service.configure({ url: 'https://hub.test/hubs/app' }));

    it('should send a message without waiting for an answer', async () => {
      await service.send('SendToMyGroup', 'sales', 'hello');

      expect(conn().send).toHaveBeenCalledWith('SendToMyGroup', 'sales', 'hello');
    });

    it('should invoke a method and return what it answers', async () => {
      const result = await service.invoke<string>('Subscribe', 'sales', 'orders');

      expect(conn().invoke).toHaveBeenCalledWith('Subscribe', 'sales', 'orders');
      expect(result).toBe('result');
    });

    it('should relay a stream, and stop it when unsubscribed', () => {
      const dispose = vi.fn();
      let observer!: { next: (v: number) => void; error: (e: unknown) => void; complete: () => void };
      conn().stream.mockReturnValue({ subscribe: (o: typeof observer) => { observer = o; return { dispose }; } });
      const items: number[] = [];
      const done = vi.fn();

      const subscription = service.stream<number>('Ticks', 3).subscribe({ next: (v) => items.push(v), complete: done });
      observer.next(1);
      observer.next(2);
      observer.complete();
      subscription.unsubscribe();

      expect(conn().stream).toHaveBeenCalledWith('Ticks', 3);
      expect(items).toEqual([1, 2]);
      expect(done).toHaveBeenCalled();
      expect(dispose).toHaveBeenCalled();
    });

    it('should pass a stream error on', () => {
      let observer!: { next: (v: number) => void; error: (e: unknown) => void; complete: () => void };
      conn().stream.mockReturnValue({ subscribe: (o: typeof observer) => { observer = o; return { dispose: vi.fn() }; } });
      const failed = vi.fn();

      service.stream<number>('Ticks').subscribe({ error: failed });
      observer.error(new Error('stream broke'));

      expect(failed).toHaveBeenCalledWith(new Error('stream broke'));
    });
  });
});

describe('BackoffRetryPolicy', () => {
  it('should reconnect after 0, 2, 5, 10 and then every 30 seconds, and never give up', () => {
    const policy = new BackoffRetryPolicy();

    const delays = [0, 1, 2, 3, 4, 5, 50].map((previousRetryCount) => policy.nextRetryDelayInMilliseconds({ previousRetryCount } as never));

    expect(delays).toEqual([0, 2000, 5000, 10000, 30000, 30000, 30000]);
  });
});

describe('defaultHubConnectionFactory', () => {
  it('should build a real connection for the address given, without connecting', () => {
    const built = defaultHubConnectionFactory({ url: 'https://hub.test/hubs/app', accessTokenFactory: () => 'token-1' });

    expect(built.state).toBe(HubConnectionState.Disconnected);
    expect(built.baseUrl).toBe('https://hub.test/hubs/app');
  });

  it('should be what the service uses unless a spec says otherwise', () => {
    TestBed.resetTestingModule();

    expect(TestBed.inject(HUB_CONNECTION_FACTORY)).toBe(defaultHubConnectionFactory);
  });
});
