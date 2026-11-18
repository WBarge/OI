import { Service,inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { MessageService } from 'primeng/api';
import { SystemError } from '../models/system-error';

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
      const convertedError:SystemError = error.error as SystemError;

      const message = (convertedError !== undefined) ?
        convertedError.message :
        `server returned code ${error.status} with body "${error.error}"`;

        // TODO: send the error to remote logging infrastructure
      console.error(message); // log to console instead

      this.sendMessage('error','Fatal Error', `${serviceName}: ${operation} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of( result );
    };

  }

  private sendMessage(severity:string,summary:string,detail:string){
    this.messageService.add({severity:severity,summary:summary,detail:detail});
  }
}
