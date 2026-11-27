import { safeReturnUrl } from './url.utils';

describe('safeReturnUrl', () => {
  it.each(['/customers', '/orders/42?page=2', '/orders#top', '/'])('should accept the path %s inside the application', (url) => {
    expect(safeReturnUrl(url)).toBe(url);
  });

  it.each([null, undefined, ''])('should use the fallback when there is no address (%s)', (url) => {
    expect(safeReturnUrl(url)).toBe('/home');
    expect(safeReturnUrl(url, '/products')).toBe('/products');
  });

  it.each([
    'https://evil.example/steal',
    'http://evil.example',
    '//evil.example',
    '/\\evil.example',
    'javascript:alert(1)',
    'customers',
    '/with\u0000control',
    '/with\ncontrol',
  ])('should refuse %j, which could lead somewhere else', (url) => {
    expect(safeReturnUrl(url)).toBe('/home');
  });

  it.each([
    '/login',
    '/login?reason=expired',
    '/auth/callback',
    '/auth/callback?code=abc&state=xyz',
    '/auth/callback/more',
    '/signed-out',
    '/signed-out?error=unavailable',
    '/signed-out#x',
  ])('should never return to the sign-in plumbing page %s, which would loop', (url) => {
    expect(safeReturnUrl(url, '/orders')).toBe('/orders');
  });

  it('should accept a page whose name only starts like a plumbing page', () => {
    expect(safeReturnUrl('/auth/callbacks')).toBe('/auth/callbacks');
    expect(safeReturnUrl('/signed-outside')).toBe('/signed-outside');
  });
});
