import { Configuration } from './configuration';

describe('Configuration', () => {
  it('should create an instance', () => {
    expect(new Configuration()).toBeTruthy();
  });

  it('should default to a safe configuration', () => {
    const config = new Configuration();

    expect(config.disableAddresses).toBe(false);
    expect(config.HideShippingAddress).toBe(false);
    expect(config.EnableCustomProducts).toBe(false);
    expect(config.productApiUrl).toBe('');
    expect(config.oiApiUrl).toBe('');
  });

  it('should keep addresses enabled unless they are explicitly disabled', () => {
    expect(new Configuration().disableAddresses).toBe(false);
    expect(Object.assign(new Configuration(), { disableAddresses: true }).disableAddresses).toBe(true);
  });

  it('should keep the defaults of the settings that a config file leaves out', () => {
    const config = Object.assign(new Configuration(), { disableAddresses: true });

    expect(config.HideShippingAddress).toBe(false);
    expect(config.EnableCustomProducts).toBe(false);
    expect(config.productApiUrl).toBe('');
    expect(config.oiApiUrl).toBe('');
  });
});
