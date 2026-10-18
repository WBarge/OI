import { Service,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';

import { ConfigService } from './config-service';


import { CustomerListResult } from '../model/results/customer-list-result';
import { FilterDetail, FilterDictionary } from '../model/requests/filter-detail';
import { ListRequest } from '../model/requests/list-request';
import { CustomerSearch } from '../model/results/customer-search';
import { Customer } from '../model/results/customer';

@Service()
export class CustomerService {
  private http=inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private customerServiceLocation:string = "";
  private customersServiceLocation:string = "";

  private handleError: HandleError;

  constructor(){
        this.customerServiceLocation = this.configService.config.oiApiUrl + 'Customer';
        this.customersServiceLocation = this.configService.config.oiApiUrl + 'Customers';
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
              const tempCustomer = new CustomerSearch();
              tempCustomer.idValue = customer.id;
              tempCustomer.firstName = customer.firstName;
              tempCustomer.lastName = customer.lastName;
              tempCustomer.phoneNumber = customer.phoneNumber;
              return tempCustomer;
            });
            return returnValue;
          }),
          catchError(this.handleError<CustomerListResult>('getCustomers'))
        );
  }

  getCustomer(idValue:string):Observable<Customer>{
    var requestUrl = this.customerServiceLocation+'/'+idValue;
    return this.http.get<Customer>(requestUrl)
    .pipe(
      map((customer:any)=>{
        const tempCustomer = new Customer();
        tempCustomer.idValue = customer.id;
        tempCustomer.firstName = customer.firstName;
        tempCustomer.lastName = customer.lastName;
        tempCustomer.phoneNumber = customer.phoneNumber;
        tempCustomer.defaultBillingAddress1 = customer.defaultBillingAddress1;
        tempCustomer.defaultBillingAddress2 = customer.defaultBillingAddress2;
        tempCustomer.defaultBillingCity = customer.defaultBillingCity;
        tempCustomer.defaultBillingStateCode = customer.defaultBillingStateCode;
        tempCustomer.defaultBillingZipCode = customer.defaultBillingZipCode;
        tempCustomer.defaultShippingAddress1 = customer.defaultShippingAddress1;
        tempCustomer.defaultShippingAddress2 = customer.defaultShippingAddress2;
        tempCustomer.defaultShippingCity = customer.defaultShippingCity;
        tempCustomer.defaultShippingStateCode = customer.defaultShippingStateCode;
        tempCustomer.defaultShippingZipCode = customer.defaultShippingZipCode;
        return tempCustomer;
      }),
    catchError(this.handleError<Customer>('getCustomer'))
    );
  }

  createCustomer(custToCreate:Customer):Observable<any>{
     return this.http.post(this.customerServiceLocation,custToCreate)
    .pipe(
      catchError(this.handleError<any>('createCustomer'))
    );
  }

  updateCustomer(custToUpdate:Customer):Observable<any>{
    throw new Error("Not Implemented!");
  }

}
