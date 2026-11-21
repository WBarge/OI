import { OptionSelection } from './optionSelection';

describe('OptionSelection', () => {
  it('should create an instance', () => {
    expect(new OptionSelection()).toBeTruthy();
  });

  it('should treat the price as optional', () => {
    expect(new OptionSelection().price).toBeUndefined();
  });
});
