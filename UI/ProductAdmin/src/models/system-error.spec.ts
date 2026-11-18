import { SystemError } from './system-error';

describe('SystemError', () => {
  it('should create an instance', () => {
    expect(new SystemError()).toBeTruthy();
  });
});
