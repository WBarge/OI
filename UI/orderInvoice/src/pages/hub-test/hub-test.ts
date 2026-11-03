import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { ButtonDirective } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { HubTestService } from '../../services/hub-test-service';
import { SignalRService } from '../../services/signalr.service';

/**
 * Temporary page that exercises the whole path: this page -> Reporting API -> hub -> back to this
 * browser as a toast. Remove it, and the Reporting NotificationTest endpoint, once real notifications exist.
 */
@Component({
  imports: [ButtonDirective, MessageModule],
  selector: 'app-hub-test',
  styleUrl: './hub-test.css',
  templateUrl: './hub-test.html',
})
export class HubTest {
  private service = inject(HubTestService);
  protected readonly hub = inject(SignalRService);

  protected readonly busy = signal(false);
  protected readonly lastSent = signal<string | null>(null);

  protected send(): void {
    if (this.busy()) {
      return;
    }

    this.busy.set(true);
    this.lastSent.set(null);
    this.service.sendTestMessage()
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (result) => {
          if (result?.sent) {
            this.lastSent.set(`Requested at ${new Date().toLocaleTimeString()}. The message should appear as a notification.`);
          }
        },
        // the service reports http failures itself and answers null; this is only for something unexpected
        error: (error: unknown) => console.error('Hub test failed', error),
      });
  }
}
