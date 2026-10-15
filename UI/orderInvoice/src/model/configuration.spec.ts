import { Configuration } from './configuration';

describe('Configuration', () => {
  it('should create an instance', () => {
    expect(new Configuration()).toBeTruthy();
  });

  it('should default to a safe configuration', () => {
    const config = new Configuration();

    expect(config.HideShippingAddress).toBe(false);
    expect(config.EnableCustomProducts).toBe(false);
    expect(config.productApiUrl).toBe('');
    expect(config.customerApiUrl).toBe('');
  });
});
