import { Injectable } from '@angular/core';
import { FilterMetadata } from 'primeng/api';
import { FilterDetail, FilterDictionary } from '../../models/requests/filter-detail';

@Injectable({
  providedIn: 'root'
})
export class FilterTransformerService {

  constructor() { }

  transformGridFilters(filters?: { [s: string]: FilterMetadata | FilterMetadata[] | undefined }):FilterDictionary{
    const returnValue:FilterDictionary = new Map<string,FilterDetail[]>();
    if (filters != undefined)
    {
      Object.keys(filters).forEach((key)=>{
        var tempFDA:FilterDetail[] = new Array() as Array<FilterDetail>;
        if (returnValue.has(key)){
          tempFDA = returnValue.get(key)??[];
        }
        var ngFilter = filters[key];
        if (ngFilter != undefined)
        {
          if (Array.isArray(ngFilter))
          {
            for (const filter of ngFilter){
              var transformedFilter:FilterDetail = this.transformFilterMetadataToFilterDetail(filter);
              tempFDA.push(transformedFilter);
            };
          }
          else
          {
            var transformedFilter:FilterDetail = this.transformFilterMetadataToFilterDetail(ngFilter);
            tempFDA.push(transformedFilter);
          }
          returnValue.set(key,tempFDA);
        }
      })

    }

    return returnValue;
  }

  private transformFilterMetadataToFilterDetail(incoming:FilterMetadata):FilterDetail{
      let returnValue:FilterDetail = {
        searchValue: incoming.value? incoming.value : "",
        matchMode: incoming.matchMode ? incoming.matchMode: "",
        logicalOperator : incoming.operator ? incoming.operator : ""

      };
    return returnValue;
  }
}
