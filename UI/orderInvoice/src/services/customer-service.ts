import { Service,inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from './error-handler.service';

import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';

import { CustomerListResult } from '../model/results/customer-list-result';
import { FilterDetail, FilterDictionary } from '../model/requests/filter-detail';
import { ListRequest } from '../model/requests/list-request';
import { CustomerSearch } from '../model/results/customer-search';


@Service()
export class CustomerService {
  private http=inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private customerServiceLocation:string = "";
  private customersServiceLocation:string = "";

  private handleError: HandleError;

  constructor(){
    this.configService.getConfiguration().subscribe((config:Configuration) => {
        this.customerServiceLocation = config.customerApiUrl + 'Customer';
        this.customersServiceLocation = config.customerApiUrl + 'Customers';
    });
    this.handleError = this.httpErrorHandler.createHandleError('CustomerService');
  }

  getCustomers(currentPage: number =1 ,
    pageSize: number = 10 ,
    filters?:FilterDictionary ):Observable<CustomerListResult>{

      var filtersAsObject:any = null;
      if(filters && filters?.size>0){
        filtersAsObject = {};
        filters?.forEach((value:FilterDetail[],key:string)=>{
          var tempObj = {[key]:value};
          filtersAsObject = Object.assign(filtersAsObject,tempObj);
        });
      }

      var request:ListRequest = {
        page: currentPage,
        pageSize: pageSize,
        filters:  filtersAsObject
      };
      return this.http.post<CustomerListResult>(this.customersServiceLocation,request)
        .pipe(
          map((results:any) => {
            const returnValue = new CustomerListResult();
            returnValue.totalRecordSize = results.totalRecordSize;
            returnValue.data = results.data.map((customer:any) => {
              const tempProduct = new CustomerSearch();
              tempProduct.idValue = customer.id;
              tempProduct.firstName = customer.firstName;
              tempProduct.lastName = customer.lastName;
              tempProduct.phoneNumber = customer.phoneNumber;
              return tempProduct;
            });
            return returnValue;
          }),
          catchError(this.handleError<CustomerListResult>('getCustomers'))
        );
    }
}
