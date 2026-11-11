import { Service,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';

import { ConfigService } from './config-service';


@Service()
export class TermsService {
  private http=inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private termsServiceLocation:string = "";
  private handleError: HandleError;


  constructor() {
    this.termsServiceLocation = this.configService.config.oiApiUrl+"Terms";
    this.handleError = this.httpErrorHandler.createHandleError('TermsService');

  }

  getTerms():Observable<string[]>
  {
    return this.http.get<string[]>(this.termsServiceLocation)
      .pipe(
        //map(terms => [...terms].sort((a, b) => a.localeCompare(b))),
        catchError(this.handleError<string[]>('getTerms', []))
      );
  }
}
