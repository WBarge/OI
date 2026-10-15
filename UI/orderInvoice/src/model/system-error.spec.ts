import { SystemError } from './system-error';

describe('SystemError', () => {
  it('should create an instance', () => {
    expect(new SystemError()).toBeTruthy();
  });

  it('should not carry a trace id until the server supplies one', () => {
    expect(new SystemError().traceId).toBeUndefined();
  });
});
