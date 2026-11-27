import { Service,inject } from '@angular/core';
import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpClient  } from '@angular/common/http';
import { ConfigService } from './config-service';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { OptionSelection } from '../models/results/optionSelection';
import { OptionListResult } from '../models/results/OptionListResult';
import { Option } from '../models/results/option';
import { FilterDetail, FilterDictionary } from '../models/requests/filter-detail';
import { ListRequest } from '../models/requests/list-request';

@Service()
export class OptionService {

  private http=inject(HttpClient);
  private config=inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private optionsServiceLocation:string;
  private optionServiceLocation:string;
  private handleError: HandleError;

  constructor() {
    this.optionsServiceLocation = this.config.config.productApiUrl+'Options';
    this.optionServiceLocation = this.config.config.productApiUrl+'Option';
    this.handleError = this.httpErrorHandler.createHandleError('OptionService');
  }

  getSelectedOptions():Observable<OptionSelection[]>{
    let body = {};
    return this.http.post<OptionListResult>(this.optionsServiceLocation, body, { responseType: 'json' })
    .pipe(
      map((options: OptionListResult) => {
        return options.data.map((data:any) => ({
          label: data.name,
          idValue: data.id,
          price: data.price
        }));
      }),
      catchError(this.handleError('getSelectedOptions', []))
    );
  }

  getOptions(currentPage: number =1 ,
                  pageSize: number = 10 ,
                  filters?:FilterDictionary):Observable<OptionListResult>{
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
    return this.http.post<OptionListResult>(this.optionsServiceLocation,request)
    .pipe(
      map((results:any)=>{
        const returnValue = new OptionListResult();
        returnValue.totalRecordSize = results.totalRecordSize;
        returnValue.data = results.data.map((option:any)=>{
          const tempOption = new Option();
          tempOption.idValue = option.id;
          tempOption.name = option.name;
          tempOption.description = option.description;
          tempOption.price = option.price;
          tempOption.cost = option.cost;
          tempOption.estimate = option.estimated;
          return tempOption;
        });
        return returnValue;
      }),
      catchError(this.handleError<OptionListResult>('getOptions'))
    );
  }

  add(optionToAdd:Option):Observable<any>{
    return this.http.post(this.optionServiceLocation,optionToAdd)
    .pipe(
      catchError(this.handleError<any>('addOption'))
    );
  }

  deleteOption(optionToDelete: Option):Observable<any> {
        var requestURl = this.optionServiceLocation+'/'+optionToDelete.idValue;
    return this.http.delete(requestURl).pipe(catchError(this.handleError<any>('deleteOption')));
  }

  getOptionById(optionId:string):Observable<Option>{
    var requestUrl = this.optionServiceLocation+'/'+optionId;
    return this.http.get<Option>(requestUrl)
        .pipe(
          map((option:any) => {
            const tempOption = new Option();
            tempOption.idValue = option.id;
            tempOption.name = option.name;
            tempOption.price = option.price;
            tempOption.description = option.description;
            tempOption.cost = option.cost;
            tempOption.estimate = option.estimated;
            return tempOption;
          }),
          catchError(this.handleError<Option>('getProductById'))
        )
  }

  update(optionToUpdate:Option):Observable<any>{
    const requestObj={
      id: optionToUpdate.idValue,
      name: optionToUpdate.name,
      description: optionToUpdate.description,
      price: optionToUpdate.price,
      cost: optionToUpdate.cost,
      estimated: optionToUpdate.estimate
    }
    return this.http.put(this.optionServiceLocation,requestObj)
    .pipe(catchError(this.handleError<any>('update')));
  }
}
