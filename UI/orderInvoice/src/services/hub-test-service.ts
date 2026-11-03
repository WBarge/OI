import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';
import { HubTestResult } from '../model/results/hub-test-result';
import { ConfigService } from './config-service';

/**
 * Asks the Reporting API to send this user a test message through the central hub.
 * The message itself does not come back here: it arrives over the hub connection and is shown as a toast.
 */
@Service()
export class HubTestService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler = inject(ErrorHandlerService);

  private readonly location: string;
  private handleError: HandleError;

  constructor() {
    this.location = this.configService.config.reportingApiUrl + 'NotificationTest';
    this.handleError = this.httpErrorHandler.createHandleError('HubTestService');
  }

  /** Emits the result, or null if the call failed (the error handler has already told the user). */
  sendTestMessage(): Observable<HubTestResult | null> {
    return this.http.post<HubTestResult>(this.location, {})
      .pipe(
        catchError(this.handleError<HubTestResult | null>('sendTestMessage', null))
      );
  }
}
