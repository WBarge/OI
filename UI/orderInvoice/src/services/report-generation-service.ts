import { Service,inject } from '@angular/core';
import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { catchError, map, Observable } from 'rxjs';
import { ListRequest } from '../model/requests/list-request';


@Service()
export class ReportGenerationService {
  private http=inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private handleError: HandleError;

  constructor() {
    this.handleError = this.httpErrorHandler.createHandleError('ReportGenerationService');
  }

  public generateEstimateReport(orderId:string):Observable<string>{
    var reportUrl = this.configService.config.reportingApiUrl + 'Estimate';

    var request = {
      orderId: orderId
    };

    return this.http.post(reportUrl,request)
      .pipe(
        map((results:any) => {
          return results as string;
        }),
        catchError(this.handleError<string>('generateEstimateReport'))
      );
  }

  // public generateOrderReport(orderId:string):Observable<string>{
  //   var reportUrl = this.configService.config.reportingApiUrl + 'GenerateOrderReport';
  //   var params = new HttpParams().set('orderId', orderId);
  //   return this.http.get(reportUrl,{params,responseType:'text'})
  //     .pipe(
  //       map((results:any) => {
  //         return results as string;
  //       }),
  //       catchError(this.handleError<string>('generateOrderReport'))
  //     );
  // }
}
