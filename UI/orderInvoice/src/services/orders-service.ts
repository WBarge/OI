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
import { ProductOrdered } from '../model/results/product-ordered';


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
              tempCustomer.customerName = order.customer  ? `${order.customer.firstName} ${order.customer.lastName}`  : '';
              tempCustomer.phoneNumber = order.customer  ? `${order.customer.phoneNumber}`  : '';
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
              tempCustomer.orderItems = order.orderItems.map((item:any)=>{
                const tempChar = new ProductOrdered();
                tempChar.idValue = item.id;
                tempChar.name = item.name;
                tempChar.description = item.description;
                tempChar.sku = item.sku;
                tempChar.price = item.price;
                tempChar.quantity = item.quantity;
                tempChar.total = item.total;
                tempChar.productId = item.productId;
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

  public createOrder(orderToCreate:Order):Observable<Order>{
    const request = this.toRequest(orderToCreate);

    return this.http.post<any>(this.orderServiceLocation,request)
      .pipe(
        map((created:any)=>this.toOrder(created,orderToCreate)),
        catchError(this.handleError<Order>('createOrder'))
      );
  }

  private toOrder(created:any, submitted:Order):Order{
    const order = new Order();
    order.idValue = created.id;
    order.orderNumber = String(created.orderNumber);
    order.orderDate = new Date(created.orderDate);
    order.completedDate = new Date(created.completedDate);
    order.customerId = created.customerId ?? "";
    order.customerName = created.customer
      ? `${created.customer.firstName ?? ""} ${created.customer.lastName ?? ""}`.trim()
      : submitted.customerName;
    order.phoneNumber = created.customer ? created.customer.phoneNumber : submitted.phoneNumber;
    order.billingAddress1 = created.billingAddress1;
    order.billingAddress2 = created.billingAddress2;
    order.billingCity = created.billingCity;
    order.billingStateCode = created.billingStateCode;
    order.billingZipCode = created.billingZipCode;
    order.shippingAddress1 = created.shippingAddress1;
    order.shippingAddress2 = created.shippingAddress2;
    order.shippingCity = created.shippingCity;
    order.shippingStateCode = created.shippingStateCode;
    order.shippingZipCode = created.shippingZipCode;
    order.orderItems = (created.orderItems ?? []).map((item:any)=>{
      const orderItem = new ProductOrdered();
      orderItem.idValue = item.id;
      orderItem.name = item.name;
      orderItem.description = item.description;
      orderItem.sku = item.sku;
      orderItem.price = item.price;
      orderItem.quantity = item.quantity;
      orderItem.total = item.total;
      return orderItem;
    });
    order.subTotal = created.subTotal;
    order.shipping = created.shipping;
    order.tax = created.tax;
    order.total = created.total;
    order.isPending = created.isPending;
    return order;
  }

  public updateOrder(orderToUpdate:Order):Observable<any>{
    const request = {
      id: orderToUpdate.idValue,
      orderNumber: Number(orderToUpdate.orderNumber),
      ...this.toRequest(orderToUpdate)
    };

    return this.http.put<any>(this.orderServiceLocation,request)
      .pipe(
        catchError(this.handleError<any>('updateOrder'))
      );
  }

  private toRequest(order:Order){
    return {
      customerId: order.customerId || null,
      orderDate: order.orderDate,
      billingAddress1: order.billingAddress1,
      billingAddress2: order.billingAddress2,
      billingCity: order.billingCity,
      billingStateCode: order.billingStateCode,
      billingZipCode: order.billingZipCode,
      shippingAddress1: order.shippingAddress1,
      shippingAddress2: order.shippingAddress2,
      shippingCity: order.shippingCity,
      shippingStateCode: order.shippingStateCode,
      shippingZipCode: order.shippingZipCode,
      subTotal: order.subTotal,
      shipping: order.shipping,
      tax: order.tax,
      total: order.total,
      orderItems: order.orderItems.map((item:ProductOrdered)=>({
        productId: item.productId,
        name: item.name,
        description: item.description,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity,
        total: item.total
      }))
    };
  }
}
