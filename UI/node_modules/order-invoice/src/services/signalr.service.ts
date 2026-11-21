import { InjectionToken, OnDestroy, Service, computed, inject, signal } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  IRetryPolicy,
  LogLevel,
} from '@microsoft/signalr';
import { Observable } from 'rxjs';

export interface SignalRConfig {
  /** Full hub URL, e.g. https://localhost:5001/hubs/chat */
  url: string;
  /** Return a JWT (or null) for each connection attempt. */
  accessTokenFactory?: () => string | Promise<string>;
  logLevel?: LogLevel;
}

/** Retries after 0s, 2s, 5s, 10s, 30s, then every 30s forever. */
export class BackoffRetryPolicy implements IRetryPolicy {
  private readonly delays = [0, 2000, 5000, 10000, 30000];
  nextRetryDelayInMilliseconds(ctx: { previousRetryCount: number }): number {
    return this.delays[Math.min(ctx.previousRetryCount, this.delays.length - 1)];
  }
}

export type HubConnectionFactory = (config: SignalRConfig) => HubConnection;

/** Builds the real connection. */
export const defaultHubConnectionFactory: HubConnectionFactory = (config) =>
  new HubConnectionBuilder()
    .withUrl(config.url, {
      accessTokenFactory: config.accessTokenFactory,
    })
    .withAutomaticReconnect(new BackoffRetryPolicy())
    .configureLogging(config.logLevel ?? LogLevel.Information)
    .build();

/** How the service gets its connection. A token, so a spec can hand it a stand-in and test without a server. */
export const HUB_CONNECTION_FACTORY = new InjectionToken<HubConnectionFactory>('HUB_CONNECTION_FACTORY', {
  providedIn: 'root',
  factory: () => defaultHubConnectionFactory,
});

@Service()
export class SignalRService implements OnDestroy {
  private readonly createConnection = inject(HUB_CONNECTION_FACTORY);
  private connection?: HubConnection;
  /** Set by stop(), so a connection attempt that is still retrying gives up instead of reconnecting after sign-out. */
  private stopRequested = false;

  private readonly _state = signal<HubConnectionState>(HubConnectionState.Disconnected);
  private readonly _error = signal<string | null>(null);

  readonly state = this._state.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isConnected = computed(() => this._state() === HubConnectionState.Connected);

  /** Build the connection. Register handlers with on() before calling start(). */
  configure(config: SignalRConfig): void {
    if (this.connection) return;

    this.connection = this.createConnection(config);

    const sync = () => this._state.set(this.connection!.state);
    this.connection.onreconnecting((err:any) => {
      this._error.set(err?.message ?? 'Connection lost');
      sync();
    });
    this.connection.onreconnected(() => {
      this._error.set(null);
      sync();
    });
    this.connection.onclose((err:any) => {
      if (err) this._error.set(err.message);
      sync();
    });
  }

  /** Start the connection. Retries the *initial* connect, which
   *  withAutomaticReconnect does not do on its own. */
  async start(maxAttempts = 5): Promise<void> {
    const conn = this.requireConnection();
    if (conn.state !== HubConnectionState.Disconnected) return;

    this.stopRequested = false;
    this._state.set(HubConnectionState.Connecting);
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await conn.start();
        if (this.stopRequested) {
          // stop() was called while this attempt was in flight
          await conn.stop();
          this._state.set(HubConnectionState.Disconnected);
          return;
        }
        this._error.set(null);
        this._state.set(conn.state);
        return;
      } catch (err) {
        if (this.stopRequested) {
          // stopping on purpose interrupts the attempt; that is not a failure to report or retry
          this._state.set(HubConnectionState.Disconnected);
          return;
        }
        this._error.set((err as Error).message);
        if (attempt === maxAttempts) {
          this._state.set(HubConnectionState.Disconnected);
          throw err;
        }
        await new Promise((r) => setTimeout(r, Math.min(1000 * 2 ** attempt, 15000)));
        if (this.stopRequested) {
          this._state.set(HubConnectionState.Disconnected);
          return;
        }
      }
    }
  }

  async stop(): Promise<void> {
    this.stopRequested = true;
    await this.connection?.stop();
    this._state.set(HubConnectionState.Disconnected);
  }

  /** Subscribe to a server -> client method. Returns an unsubscribe function. */
  on<T extends unknown[]>(method: string, handler: (...args: T) => void): () => void {
    const conn = this.requireConnection();
    conn.on(method, handler as (...args: unknown[]) => void);
    return () => conn.off(method, handler as (...args: unknown[]) => void);
  }

  /** Same as on(), as an Observable. Emits the first argument (or the tuple if several). */
  listen<T = unknown>(method: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      const handler = (...args: unknown[]) =>
        subscriber.next((args.length === 1 ? args[0] : args) as T);
      const conn = this.requireConnection();
      conn.on(method, handler);
      return () => conn.off(method, handler);
    });
  }

  /** Fire-and-forget client -> server call. */
  send(method: string, ...args: unknown[]): Promise<void> {
    return this.requireConnection().send(method, ...args);
  }

  /** Client -> server call that returns the hub method's result. */
  invoke<T = void>(method: string, ...args: unknown[]): Promise<T> {
    return this.requireConnection().invoke<T>(method, ...args);
  }

  /** Server -> client streaming (IAsyncEnumerable / ChannelReader on the hub). */
  stream<T>(method: string, ...args: unknown[]): Observable<T> {
    return new Observable<T>((subscriber) => {
      const sub = this.requireConnection()
        .stream<T>(method, ...args)
        .subscribe({
          next: (v:any) => subscriber.next(v),
          error: (e:any) => subscriber.error(e),
          complete: () => subscriber.complete(),
        });
      return () => sub.dispose();
    });
  }

  ngOnDestroy(): void {
    void this.connection?.stop();
  }

  private requireConnection(): HubConnection {
    if (!this.connection) {
      throw new Error('SignalRService: call configure() before using the connection.');
    }
    return this.connection;
  }
}
