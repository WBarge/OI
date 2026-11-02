/**
 * Where to go after signing in. Only a path inside this app is accepted, so a crafted
 * link such as /login?returnUrl=https://evil.example cannot send the user to another site.
 */
export function safeReturnUrl(url: string | null | undefined, fallback: string = '/home'): string {
  if (!url) {
    return fallback;
  }
  const isLocalPath = url.startsWith('/') && !url.startsWith('//') && !url.includes('\\');
  const hasControlCharacters = /\p{Cc}/u.test(url);
  const isLoginPage = url === '/login' || url.startsWith('/login?') || url.startsWith('/login/');
  return isLocalPath && !hasControlCharacters && !isLoginPage ? url : fallback;
}
