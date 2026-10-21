import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ConfigService } from './config-service';
import { ErrorHandlerService, HandleError } from '../utils/error-handler.service';

import { FilterDetail, FilterDictionary } from '../model/requests/filter-detail';
import { OrderListResult } from '../model/results/order-list-result';
import { ListRequest } from '../model/requests/list-request';
import { OrderSearch } from '../model/results/order-search';
import { Order } from '../model/results/order';
import { OrderItem } from '../model/results/order-item';

@Service()
export class OrdersService {
  private http=inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private ordersServiceLocation:string = "";
  private orderServiceLocation:string = "";
  private handleError: HandleError;

  constructor(){
    this.orderServiceLocation = this.configService.config.oiApiUrl+"Order";
    this.ordersServiceLocation = this.configService.config.oiApiUrl+"Orders";
    this.handleError = this.httpErrorHandler.createHandleError('OrderService');
  }


  public getOrderById(idValue:string):Observable<Order> {
    var requestUrl = this.orderServiceLocation+'/'+idValue;
        return this.http.get<Order>(requestUrl)
        .pipe(
          map((order:any)=>{
            const tempCustomer = new Order();
            tempCustomer.idValue = order.id;
              tempCustomer.orderNumber= order.orderNumber;
              tempCustomer.orderDate = new Date(order.orderDate);
              tempCustomer.completedDate = new Date(order.completedDate);
              tempCustomer.customerId = order.customerId;
              tempCustomer.customerName = order.customer.Map((c:any)=>c.firstName+""+c.lastName);
              tempCustomer.phoneNumber = order.customer.Map((c:any)=>c.phoneNumber);
              tempCustomer.billingAddress1 = order.billingAddress1;
              tempCustomer.billingAddress2 = order.billingAddress2;
              tempCustomer.billingCity = order.billingCity;
              tempCustomer.billingStateCode = order.billingStateCode;
              tempCustomer.billingZipCode = order.billingZipCode;
              tempCustomer.shippingAddress1 = order.shippingAddress1;
              tempCustomer.shippingAddress2 = order.shippingAddress2;
              tempCustomer.shippingCity = order.shippingCity;
              tempCustomer.shippingStateCode = order.shippingStateCode;
              tempCustomer.shippingZipCode = order.shippingZipCode;
              tempCustomer.orderItems = order.OrderItems.map((item:any)=>{
                const tempChar = new OrderItem();
                tempChar.idValue = item.id;
                tempChar.name = item.name;
                tempChar.description = item.description;
                tempChar.sku = item.sku;
                tempChar.price = item.price;
                tempChar.quantity = item.quantity;
                tempChar.total = item.total;

                return tempChar;
              });
              tempCustomer.subTotal = order.subTotal;
              tempCustomer.shipping = order.shipping;
              tempCustomer.tax = order.tax;
              tempCustomer.total = order.total;
              tempCustomer.isPending = order.isPending;

            return tempCustomer;
          }),
        catchError(this.handleError<Order>('getOrderById'))
        );
  }

  public getOrders(currentPage: number =1 ,
      pageSize: number = 10 ,
      filters?:FilterDictionary ):Observable<OrderListResult>{

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
    return this.http.post<OrderListResult>(this.ordersServiceLocation,request)
      .pipe(
        map((results:any) => {
          const returnValue = new OrderListResult();
          returnValue.totalRecordSize = results.totalRecordSize;
          returnValue.data = results.data.map((order:any) => {
            const tempCustomer = new OrderSearch();
            tempCustomer.idValue = order.id;
            tempCustomer.customerName= order.customerName;
            tempCustomer.phoneNumber= order.phoneNumber;
            tempCustomer.orderNumber= order.orderNumber;
            tempCustomer.orderDate= new Date(order.orderDate);
            tempCustomer.completedDate= new Date(order.completedDate);
            tempCustomer.total= order.total;
            tempCustomer.isPending= order.isPending;
            return tempCustomer;
          });
          return returnValue;
        }),
        catchError(this.handleError<OrderListResult>('getOrders'))
      );
  }

  public CreateOrder(something:Order):Observable<Order>{
    throw Error("not implemented")
  }

  public UpdateOrder(moreThings:Order):Observable<any>{
    throw Error("not implemented")
  }
}
