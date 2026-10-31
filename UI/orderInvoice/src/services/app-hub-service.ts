import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { ConfigService } from './config-service';
import { SignalRService } from './signalr.service';

export interface AppNotification {
  type: string;
  title: string;
  body?: string;
  at: string;
}

/** Typed facade over SignalRService for the central hub (OI.Hub: AppHub / IAppClient). */
@Service()
export class AppHubService {
  private hub = inject(SignalRService);
  private auth = inject(AuthService);
  private configService = inject(ConfigService);

  /** Call after sign-in. The token is read again on every (re)connect, so refreshes are picked up. */
  async connect(): Promise<void> {
    this.hub.configure({
      url: this.configService.config.hubUrl,
      accessTokenFactory: () => this.auth.getAccessToken(),
    });
    await this.hub.start();
  }

  disconnect(): Promise<void> {
    return this.hub.stop();
  }

  // Server -> browser
  readonly messages$: Observable<[string, string]> = this.hub.listen('ReceiveMessage');
  readonly notifications$: Observable<AppNotification> = this.hub.listen('ReceiveNotification');

  // Browser -> server
  sendToMyGroup(groupId: string, text: string) {
    return this.hub.send('SendToMyGroup', groupId, text);
  }
  subscribe(groupId: string, topic: string) {
    return this.hub.invoke('Subscribe', groupId, topic);
  }
  unsubscribe(groupId: string, topic: string) {
    return this.hub.invoke('Unsubscribe', groupId, topic);
  }
}
