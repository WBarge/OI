import { Service,inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { MessageService } from 'primeng/api';
import { SystemError } from '../model/system-error';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Service()
export class ErrorHandlerService {

  private messageService = inject(MessageService);

  constructor() { }

   /** Create curried handleError function that already knows the service name aka a factory*/
  createHandleError = (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T) =>
      this.handleError(serviceName, operation, result);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {

      //send a message to the user via the message service
      const systemError:SystemError = this.toSystemError(error);
      const reference = systemError.traceId ? ` (reference: ${systemError.traceId})` : '';

        // TODO: send the error to remote logging infrastructure
      console.error(`${systemError.message}${reference}`, error); // log to console instead

      // a 400 means the request was wrong (the user can fix it); anything else is a failure on our side
      const isInvalidRequest = error.status === 400;
      this.sendMessage(
        isInvalidRequest ? 'warn' : 'error',
        isInvalidRequest ? 'Invalid request' : 'Fatal Error',
        `${serviceName}: ${operation} failed: ${systemError.message}${reference}`,
        // keep the toast open when there is a reference to read out, the global 2 second life is too short for that
        systemError.traceId !== undefined);

      // Let the app keep running by returning a safe result.
      return of( result );
    };

  }

  /**
   * Turns whatever the server (or the network) sent back into a SystemError.
   * Handles our own error body, the ASP.NET ProblemDetails body (automatic model validation errors),
   * an empty body (for example a 404), a plain text body, and no response at all (status 0).
   */
  private toSystemError(error: HttpErrorResponse): SystemError {
    const systemError = new SystemError();
    systemError.exceptionType = '';

    const body = error.error;
    if (body !== null && typeof body === 'object') {
      const candidate = body as Partial<SystemError> & { detail?: string; title?: string };
      const text = candidate.message ?? candidate.detail ?? candidate.title;
      if (text) {
        systemError.message = text;
        systemError.exceptionType = candidate.exceptionType ?? '';
        systemError.traceId = candidate.traceId;
        return systemError;
      }
    }

    systemError.message = error.status === 0
      ? 'Unable to reach the server. Check your connection and try again.'
      : `server returned code ${error.status}` + (typeof body === 'string' && body ? ` with body "${body}"` : '');
    return systemError;
  }

  private sendMessage(severity:string,summary:string,detail:string,sticky:boolean){
    this.messageService.add({severity:severity,summary:summary,detail:detail,sticky:sticky});
  }
}
