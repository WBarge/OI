import { TestBed } from '@angular/core/testing';
import { testProviders } from '../testing/test-providers';
import { OptionService } from './option.service';

describe('OptionServiceService', () => {
  let service: OptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(OptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
