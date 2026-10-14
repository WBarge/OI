import { TestBed } from '@angular/core/testing';

import { FilterTransformerService } from './filter-transformer.service';
import { FilterMetadata } from 'primeng/api';

describe('FilterTransformerService', () => {
  let service: FilterTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform single Primeng Grid Filter data to internal data structure',()=>{
    const testKey:string = 'name';
    const testFilter:FilterMetadata = {
        value:'test',
        matchMode:'contains',
        operator:'and'
    };
    const testStructure:{[s: string]: FilterMetadata} = {
      [testKey]:testFilter
    }
    var result = service.transformGridFilters(testStructure);
    expect(result.has(testKey)).toBeTrue();
  });
});
