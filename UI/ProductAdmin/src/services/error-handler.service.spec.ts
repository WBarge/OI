import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService, HandleError } from './error-handler.service';
import { MessageService } from 'primeng/api';
import { createSpyFromClass } from '../testing/spy-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { SystemError } from '../models/system-error';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let messageService:MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
      {provide:MessageService, useValue: createSpyFromClass(MessageService)},
      ErrorHandlerService
    ]
    });
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    service = TestBed.inject(ErrorHandlerService);
    expect(service).toBeTruthy();
  });

  it('should provide centeralized error handling',()=>{
    service = TestBed.inject(ErrorHandlerService);

    let result:HandleError = service.createHandleError('unitTests');
    expect(result).toBeDefined();
  });

  it('should send an error to the message service',()=>{

    service = TestBed.inject(ErrorHandlerService);

    let errorHandler:HandleError = service.createHandleError('unitTests');

    let errorMessage:SystemError = {message:'This is an expected error message from a unit test',exceptionType:'testException'}
    errorHandler<any>('testing',{})(new HttpErrorResponse({error:errorMessage})).subscribe(
      ()=>{
        expect(messageService.add).toHaveBeenCalled();
      }
    );

  });
});
