import { Service,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';

import { ConfigService } from './config-service';
import { State } from '../model/results/state';


@Service()
export class StateService {

  private http=inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private stateServiceLocation:string = "";
  private handleError: HandleError;

  constructor(){
    this.stateServiceLocation = this.configService.config.oiApiUrl+"States";
    this.handleError = this.httpErrorHandler.createHandleError('StateService');
  }

  getStates():Observable<State[]>
  {
    return this.http.get<State[]>(this.stateServiceLocation)
      .pipe(
        map(states => [...states].sort((a, b) => a.name.localeCompare(b.name))),
        catchError(this.handleError<State[]>('getStates', []))
      );
  }
}
