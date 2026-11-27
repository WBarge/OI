/**
 * Where to go after signing in. Only a path inside this app is accepted, so a crafted
 * address cannot send the user to another site. The sign-in plumbing pages (the callback and the signed-out page)
 * are never a place to return to, or signing in could loop.
 */
export function safeReturnUrl(url: string | null | undefined, fallback: string = '/home'): string {
  if (!url) {
    return fallback;
  }
  const isLocalPath = url.startsWith('/') && !url.startsWith('//') && !url.includes('\\');
  const hasControlCharacters = /\p{Cc}/u.test(url);
  const isSignInPlumbing = ['/login', '/auth/callback', '/signed-out'].some(
    (path) => url === path || url.startsWith(path + '?') || url.startsWith(path + '/') || url.startsWith(path + '#'),
  );
  return isLocalPath && !hasControlCharacters && !isSignInPlumbing ? url : fallback;
}
