// services/notification-service.ts
import { Service, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export type Severity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'; //other levels are here for future extension

@Service()
export class NotificationService {
  private msgService = inject(MessageService);

  private send(severity: Severity, summary: string, detail: string): void {
    this.msgService.add({ severity, summary, detail });
  }

  public success(summary: string, detail: string) { this.send('success', summary, detail); }
  public info(summary: string, detail: string)    { this.send('info', summary, detail); }
  public warn(summary: string, detail: string)    { this.send('warn', summary, detail); }
  public error(summary: string, detail: string)   { this.send('error', summary, detail); }
}
