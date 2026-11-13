import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';
import { NotificationService } from '../utils/notification-service';
import { ConfigService } from './config-service';

/**
 * Downloads a finished report from the OI.Reporting ReportController (GET api/Report/{reportId}).
 *
 * - 200: the file is saved on the user's machine under the file name that was passed in.
 * - 404: the report is not ready yet, so the user gets a "not available yet" message.
 * - anything else: handled by the shared ErrorHandlerService like every other service.
 *
 * Emits true when a file was handed to the browser, false otherwise. It never errors.
 */
@Service()
export class ReportDownloadService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private notifications = inject(NotificationService);
  private document = inject(DOCUMENT);
  private httpErrorHandler = inject(ErrorHandlerService);

  private handleError: HandleError;

  constructor() {
    this.handleError = this.httpErrorHandler.createHandleError('ReportDownloadService');
  }

  public downloadReport(reportId: string, fileName: string): Observable<boolean> {
    const url = this.configService.config.reportingApiUrl + 'Report/' + encodeURIComponent(reportId);

    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((content: Blob) => {
        this.saveFile(content, fileName);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.notifications.warn('Report not available', 'The report is not available yet. Please try again in a few moments.');
          return of(false);
        }
        return this.handleError<boolean>('downloadReport', false)(error);
      }),
    );
  }

  /** Hands the bytes to the browser as a download by clicking a temporary link. */
  private saveFile(content: Blob, fileName: string): void {
    const objectUrl = URL.createObjectURL(content);
    const link = this.document.createElement('a');
    link.href = objectUrl;
    link.download = fileName;
    link.style.display = 'none';
    this.document.body.appendChild(link);
    link.click();
    this.document.body.removeChild(link);
    // revoke on the next tick so the browser has started the download first
    setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  }
}
