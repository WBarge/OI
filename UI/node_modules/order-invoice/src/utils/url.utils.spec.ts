import { safeReturnUrl } from './url.utils';

describe('safeReturnUrl', () => {
  it.each(['/customers', '/orderInvoice/abc-123', '/orderSelection?page=2', '/home#top'])(
    'should accept the in-app path %s',
    url => {
      expect(safeReturnUrl(url)).toBe(url);
    }
  );

  it.each([undefined, null, ''])('should fall back to /home for %s', url => {
    expect(safeReturnUrl(url)).toBe('/home');
  });

  it.each([
    'https://evil.example',
    'http://evil.example/home',
    '//evil.example',
    '/\\evil.example',
    'javascript:alert(1)',
    'customers',
    '/ok\nwith-newline'
  ])('should refuse %s, which could leave the app or is not a path', url => {
    expect(safeReturnUrl(url)).toBe('/home');
  });

  it.each(['/login', '/login?reason=expired', '/login/extra'])(
    'should not send a freshly signed-in user back to the sign-in page (%s)',
    url => {
      expect(safeReturnUrl(url)).toBe('/home');
    }
  );

  it('should not mistake a page whose name starts with login for the sign-in page', () => {
    expect(safeReturnUrl('/loginHistory')).toBe('/loginHistory');
  });

  it('should use the fallback it is given', () => {
    expect(safeReturnUrl(null, '/start')).toBe('/start');
  });
});
