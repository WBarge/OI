import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './error-handler.service';
import { ConfigService } from './config-service';
import { Observable, of } from 'rxjs';
import { createSpyFromClass, createSpyObj, Spy } from '../testing/spy-helper';

describe('ProductService', () => {
  let service: ProductService;
  let httpSpy = createSpyObj(['post']);
  let errorHandler:Spy<ErrorHandlerService>;
  let testLocation:string = 'someLocation';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:HttpClient, useValue: httpSpy},
        {provide:ErrorHandlerService, useValue: createSpyFromClass(ErrorHandlerService)},
        {provide:MessageService, useValue: createSpyFromClass(MessageService)},
        {provide:ConfigService, useValue: { config: { productApiUrl: testLocation } }},
        ProductService
      ]
    });

    errorHandler = TestBed.inject<any>(ErrorHandlerService);
    errorHandler.createHandleError = MyHandleError as any;
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    service = TestBed.inject(ProductService);
    expect(service).toBeTruthy();
  });
});

function MyHandleError<T>(operation?: string, result?: T): (error: HttpErrorResponse) => Observable<T> {
  return (error: HttpErrorResponse): Observable<T> => {
    return of (result as T);
  };
}
