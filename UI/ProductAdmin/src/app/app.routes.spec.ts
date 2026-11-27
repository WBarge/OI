import { adminGuard, authGuard, AuthCallback, SignedOut } from '@oi/ui-common';
import { routes } from './app.routes';

/**
 * The ProductManager UI is for administrators only. These read the route table, so they fail the moment a page
 * is added outside the guarded group.
 */
describe('routes', () => {
  const openRoutes = ['auth/callback', 'signed-out', 'access-denied'];

  it('should let anyone reach only the pages OI.Auth sends the browser back to, and the access-denied page', () => {
    const open = routes.filter(route => !route.canActivate?.includes(adminGuard)).map(route => route.path);

    expect(open).toEqual(openRoutes);
  });

  it('should put every real page inside one group that needs a signed-in administrator', () => {
    const guarded = routes.filter(route => route.canActivate?.includes(adminGuard));

    expect(guarded).toHaveLength(1);
    expect(guarded[0].canActivate).toEqual([authGuard, adminGuard]);
    expect(guarded[0].children?.map(route => route.path)).toEqual([
      '', 'products', 'product/:productId', 'options', 'option/:optionId', 'characteristics', 'characteristic/:charId', 'about'
    ]);
  });

  it('should show the callback and signed-out pages, with no guard, or nobody could ever finish signing in', () => {
    const callback = routes.find(route => route.path === 'auth/callback');
    const signedOut = routes.find(route => route.path === 'signed-out');

    expect(callback?.component).toBe(AuthCallback);
    expect(callback?.canActivate).toBeUndefined();
    expect(signedOut?.component).toBe(SignedOut);
    expect(signedOut?.canActivate).toBeUndefined();
  });

  it('should have no login page of its own: the password is typed on OI.Auth', () => {
    expect(routes.find(route => route.path === 'login')).toBeUndefined();
  });

  it('should only show the access-denied page to someone who is signed in', () => {
    expect(routes.find(route => route.path === 'access-denied')?.canActivate).toEqual([authGuard]);
  });
});
