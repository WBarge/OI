// services/notification-service.ts
import { Service, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export type Severity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'; //other levels are here for future extension

@Service()
export class NotificationService {
  private msgService = inject(MessageService);

  // life (milliseconds) is only passed on when given, otherwise the toast uses the default of the toast component
  private send(severity: Severity, summary: string, detail: string, life?: number): void {
    this.msgService.add({ severity, summary, detail, ...(life === undefined ? {} : { life }) });
  }

  public success(summary: string, detail: string, life?: number) { this.send('success', summary, detail, life); }
  public info(summary: string, detail: string, life?: number)    { this.send('info', summary, detail, life); }
  public warn(summary: string, detail: string, life?: number)    { this.send('warn', summary, detail, life); }
  public error(summary: string, detail: string, life?: number)   { this.send('error', summary, detail, life); }
}
