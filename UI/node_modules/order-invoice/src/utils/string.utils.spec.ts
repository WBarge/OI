import { isEmpty } from './string.utils';

describe('isEmpty', () => {
  it.each([null, undefined, '', ' ', '   ', '\t', '\n', ' \t\n '])('should treat %j as empty', (value) => {
    expect(isEmpty(value)).toBe(true);
  });

  it.each(['a', ' a', 'a ', ' a ', '0', 'hello world'])('should treat %j as not empty', (value) => {
    expect(isEmpty(value)).toBe(false);
  });
});
