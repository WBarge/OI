import { PhoneFormatPipe } from './phone-format-pipe';

describe('PhoneFormatPipe', () => {
  let pipe: PhoneFormatPipe;

  beforeEach(() => {
    pipe = new PhoneFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it.each([null, undefined, ''])('should return an empty string for %j', (value) => {
    expect(pipe.transform(value)).toBe('');
  });

  it('should format ten plain digits', () => {
    expect(pipe.transform('5551234567')).toBe('(555) 123-4567');
  });

  it('should format a number input', () => {
    expect(pipe.transform(5551234567)).toBe('(555) 123-4567');
  });

  it.each([
    '555-123-4567',
    '(555) 123-4567',
    '555.123.4567',
    ' 555 123 4567 '
  ])('should ignore punctuation and spaces in %j', (value) => {
    expect(pipe.transform(value)).toBe('(555) 123-4567');
  });

  it.each(['15551234567', '+1 555 123 4567', '1-555-123-4567'])(
    'should drop a leading US country code from %j', (value) => {
      expect(pipe.transform(value)).toBe('(555) 123-4567');
    });

  it('should return the original input when there are too few digits', () => {
    expect(pipe.transform('555-1234')).toBe('555-1234');
  });

  it('should return the original input when there are too many digits', () => {
    expect(pipe.transform('555123456789')).toBe('555123456789');
  });

  it('should not treat an eleven digit number that does not start with 1 as a US number', () => {
    expect(pipe.transform('25551234567')).toBe('25551234567');
  });

  it('should return the original input when it has no digits at all', () => {
    expect(pipe.transform('call me')).toBe('call me');
  });
});
