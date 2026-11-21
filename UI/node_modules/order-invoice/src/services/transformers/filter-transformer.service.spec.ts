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

  it('should return an empty dictionary when there are no filters', () => {
    expect(service.transformGridFilters().size).toBe(0);
    expect(service.transformGridFilters(undefined).size).toBe(0);
    expect(service.transformGridFilters({}).size).toBe(0);
  });

  it('should transform single Primeng Grid Filter data to internal data structure', () => {
    const testKey = 'name';
    const testFilter: FilterMetadata = {
      value: 'test',
      matchMode: 'contains',
      operator: 'and'
    };

    const result = service.transformGridFilters({ [testKey]: testFilter });

    expect(result.has(testKey)).toBe(true);
    expect(result.get(testKey)).toEqual([
      { searchValue: 'test', matchMode: 'contains', logicalOperator: 'and' }
    ]);
  });

  it('should transform an array of filters for one column into several details', () => {
    const filters: FilterMetadata[] = [
      { value: 'smith', matchMode: 'startsWith', operator: 'or' },
      { value: 'jones', matchMode: 'endsWith', operator: 'or' }
    ];

    const result = service.transformGridFilters({ LastName: filters });

    expect(result.get('LastName')).toEqual([
      { searchValue: 'smith', matchMode: 'startsWith', logicalOperator: 'or' },
      { searchValue: 'jones', matchMode: 'endsWith', logicalOperator: 'or' }
    ]);
  });

  it('should keep the filters of each column under its own key', () => {
    const result = service.transformGridFilters({
      FirstName: { value: 'a', matchMode: 'contains', operator: 'and' },
      PhoneNumber: { value: '555', matchMode: 'startsWith', operator: 'and' }
    });

    expect(Array.from(result.keys())).toEqual(['FirstName', 'PhoneNumber']);
    expect(result.get('FirstName')?.[0].searchValue).toBe('a');
    expect(result.get('PhoneNumber')?.[0].searchValue).toBe('555');
  });

  it('should skip a column whose filter is undefined', () => {
    const result = service.transformGridFilters({
      FirstName: undefined,
      LastName: { value: 'x', matchMode: 'contains', operator: 'and' }
    });

    expect(result.has('FirstName')).toBe(false);
    expect(result.has('LastName')).toBe(true);
  });

  it('should use empty strings for missing value, match mode and operator', () => {
    const result = service.transformGridFilters({
      FirstName: { value: null, matchMode: undefined, operator: undefined }
    });

    expect(result.get('FirstName')).toEqual([{ searchValue: '', matchMode: '', logicalOperator: '' }]);
  });
});
