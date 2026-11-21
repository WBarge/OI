import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address()).toBeTruthy();
  });

  it('should start with every field set to an empty string', () => {
    expect(new Address()).toEqual({
      idValue: '', address1: '', address2: '', city: '', stateCode: '', zipCode: ''
    });
  });

  it('should not share state between instances', () => {
    const first = new Address();
    const second = new Address();

    first.city = 'Phoenix';

    expect(second.city).toBe('');
  });
});
