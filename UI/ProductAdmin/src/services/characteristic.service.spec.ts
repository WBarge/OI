import { TestBed } from '@angular/core/testing';
import { testProviders } from '../testing/test-providers';
import { CharacteristicService } from './characteristic.service';

describe('CharacteristicService', () => {
  let service: CharacteristicService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(CharacteristicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
