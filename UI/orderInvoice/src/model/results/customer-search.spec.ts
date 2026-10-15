import { CustomerSearch } from './customer-search';

describe('CustomerSearch', () => {
  it('should create an instance', () => {
    expect(new CustomerSearch()).toBeTruthy();
  });

  it('should start with every field set to an empty string', () => {
    expect(new CustomerSearch()).toEqual({ idValue: '', firstName: '', lastName: '', phoneNumber: '' });
  });
});
