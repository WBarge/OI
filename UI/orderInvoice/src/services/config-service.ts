import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Configuration } from '../model/configuration';
import { catchError, map, Observable, shareReplay } from 'rxjs';
import { ErrorHandlerService, HandleError } from './error-handler.service';


// This service is responsible for loading the configuration from the config.json file
// DO NOT include the ConfigService in the providers array of any component,
// as this will create a new instance of the service and the configuration is cached in the service.
// Instead, use the inject function to get the instance of the service.
@Service()
export class ConfigService {

  private http = inject(HttpClient);

  private httpErrorHandler=inject( ErrorHandlerService);

  private configuration$: Observable<Configuration> | null = null;

  constructor(){}

  getConfiguration(): Observable<Configuration> {
    this.configuration$ ??= this.http.get<Configuration>(`/config.json?v=${Date.now()}`)//I don't want to cache the config.json file, so I am adding a timestamp to the url
      .pipe(
        map((config: Configuration) => {
          const returnValue: Configuration = new Configuration();
          returnValue.HideShippingAddress = config.HideShippingAddress;
          returnValue.EnableCustomProducts = config.EnableCustomProducts;
          returnValue.productApiUrl = config.productApiUrl;
          return returnValue;
        }),
        catchError(this.httpErrorHandler.handleError<Configuration>('getConfiguration')),
        shareReplay({ bufferSize: 1, refCount: false })
      );

    return this.configuration$;
  }

}
