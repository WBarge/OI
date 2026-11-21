import { Customer } from './customer';
import { CustomerSearch } from './customer-search';

describe('Customer', () => {
  it('should create an instance', () => {
    expect(new Customer()).toBeTruthy();
  });

  it('should be a CustomerSearch with the extra default address fields', () => {
    expect(new Customer()).toBeInstanceOf(CustomerSearch);
  });

  it('should start with every field set to an empty string', () => {
    expect(new Customer()).toEqual({
      idValue: '', firstName: '', lastName: '', phoneNumber: '',
      defaultBillingAddress1: '', defaultBillingAddress2: '', defaultBillingCity: '',
      defaultBillingStateCode: '', defaultBillingZipCode: '',
      defaultShippingAddress1: '', defaultShippingAddress2: '', defaultShippingCity: '',
      defaultShippingStateCode: '', defaultShippingZipCode: ''
    });
  });
});
