import { signal } from '@angular/core';
import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router, Route, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';
import { Home } from '../pages/home/home';
import { HubTest } from '../pages/hub-test/hub-test';
import { OrderSelection } from '../pages/order-selection/order-selection';
import { CustomerManager } from '../pages/customer-manager/customer-manager';
import { AuthService } from '../services/auth-service';
import { adminGuard, authGuard } from '../services/auth-guard';
import { AuthCallback, SignedOut } from '@oi/ui-common';
import { AdminUsers } from '../pages/admin-users/admin-users';
import { AdminRoles } from '../pages/admin-roles/admin-roles';
import { AdminGroups } from '../pages/admin-groups/admin-groups';

describe('routes', () => {
  // every page except the two OI.Auth sends the browser back to sits inside one parent route that requires a signed-in user
  const callbackRoute = routes.find(route => route.path === 'auth/callback') as Route;
  const signedOutRoute = routes.find(route => route.path === 'signed-out') as Route;
  const protectedParent = routes.find(route => route.children) as Route;
  const pages = protectedParent.children as Route[];
  const find = (path: string) => pages.find(route => route.path === path);

  const signedIn = signal(true);
  const roles = signal<string[]>([]);
  let signIn: ReturnType<typeof vi.fn>;
  const configure = () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: AuthService, useValue: { isAuthenticated: signedIn, roles, signIn } }]
    });
    return TestBed.inject(Router);
  };

  beforeEach(() => {
    signedIn.set(true);
    roles.set([]);
    signIn = vi.fn().mockResolvedValue(undefined);
  });

  it('should redirect the empty path to the home page', () => {
    const root = find('');

    expect(root?.redirectTo).toBe('home');
    expect(root?.pathMatch).toBe('full');
  });

  it('should route home to the Home page', () => {
    expect(find('home')?.component).toBe(Home);
  });

  it('should route orderInvoice to the OrderInvoice page', () => {
    expect(find('orderInvoice')?.component).toBe(OrderInvoice);
  });

  it('should route orderInvoice/:id to the OrderInvoice page so an existing order can be edited', () => {
    expect(find('orderInvoice/:id')?.component).toBe(OrderInvoice);
  });

  it('should route orderInvoice-view/:id to the OrderInvoice page flagged as read only', () => {
    const route = find('orderInvoice-view/:id');

    expect(route?.component).toBe(OrderInvoice);
    expect(route?.data?.['readOnly']).toBe(true);
  });

  it('should not flag the editable order routes as read only', () => {
    expect(find('orderInvoice')?.data?.['readOnly']).toBeUndefined();
    expect(find('orderInvoice/:id')?.data?.['readOnly']).toBeUndefined();
  });

  it('should route orderSelection to the OrderSelection page', () => {
    expect(find('orderSelection')?.component).toBe(OrderSelection);
  });

  it('should route customers to the CustomerManager page', () => {
    expect(find('customers')?.component).toBe(CustomerManager);
  });

  it('should route about to the About page', () => {
    expect(find('about')?.component).toBe(About);
  });

  it('should not define the same path twice', () => {
    const topLevel = routes.map(route => route.path);
    const inside = pages.map(route => route.path);

    expect(new Set(topLevel).size).toBe(topLevel.length);
    expect(new Set(inside).size).toBe(inside.length);
  });

  describe('the admin pages', () => {
    const admin = () => find('admin') as Route;
    const adminPage = (path: string) => admin().children?.find(route => route.path === path);

    it('should group the admin pages under admin', () => {
      expect(admin().children?.map(route => route.path)).toEqual(['hubTest','', 'users', 'roles', 'groups']);
    });

    it('should send admin on its own to the users page', () => {
      expect(adminPage('')?.redirectTo).toBe('users');
      expect(adminPage('')?.pathMatch).toBe('full');
    });

    it('should route users, roles and groups to their pages', () => {
      expect(adminPage('users')?.component).toBe(AdminUsers);
      expect(adminPage('roles')?.component).toBe(AdminRoles);
      expect(adminPage('groups')?.component).toBe(AdminGroups);
    });

    it('should let only administrators in, on the way in and on every move between admin pages', () => {
      expect(admin().canActivate).toEqual([adminGuard]);
      expect(admin().canActivateChild).toEqual([adminGuard]);
    });

    it('should not let an admin page sit outside the guarded group', () => {
      expect(pages.filter(page => page.component && ['AdminUsers', 'AdminRoles', 'AdminGroups'].includes(page.component.name))).toEqual([]);
    });

    describe('as an administrator', () => {
      beforeEach(() => roles.set(['Admin', 'User']));

      it.each(['/admin/users', '/admin/roles', '/admin/groups'])('should navigate to %s', async url => {
        const router = configure();

        await router.navigateByUrl(url);

        expect(router.url).toBe(url);
      });

      it('should send /admin to the users page', async () => {
        const router = configure();

        await router.navigateByUrl('/admin');

        expect(router.url).toBe('/admin/users');
      });
    });

    describe('as an ordinary user', () => {
      beforeEach(() => roles.set(['User']));

      it.each(['/admin', '/admin/users', '/admin/roles', '/admin/groups'])('should send %s to the home page', async url => {
        const router = configure();

        await router.navigateByUrl(url);

        expect(router.url).toBe('/home');
      });

      it('should still reach the ordinary pages', async () => {
        const router = configure();

        await router.navigateByUrl('/customers');

        expect(router.url).toBe('/customers');
      });
    });

    describe('with no roles at all', () => {
      it('should send /admin/users to the home page', async () => {
        const router = configure();

        await router.navigateByUrl('/admin/users');

        expect(router.url).toBe('/home');
      });
    });

    describe('when signed out', () => {
      beforeEach(() => signedIn.set(false));

      it.each(['/admin/users', '/admin/roles', '/admin/groups'])('should send %s to OI.Auth to sign in first, and remember it', async url => {
        roles.set(['Admin']);   // whatever the roles say, nobody is signed in
        const router = configure();

        await router.navigateByUrl(url);

        expect(signIn).toHaveBeenCalledWith(url);
        expect(router.url).not.toBe(url);
      });
    });

    it('should stop an administrator who loses the role between two admin pages', async () => {
      roles.set(['Admin']);
      const router = configure();
      await router.navigateByUrl('/admin/users');
      expect(router.url).toBe('/admin/users');

      roles.set(['User']);
      await router.navigateByUrl('/admin/roles');

      expect(router.url).toBe('/home');
    });
  });

  describe('sign-in', () => {
    it('should route auth/callback to the AuthCallback page, where OI.Auth sends the browser back', () => {
      expect(callbackRoute.component).toBe(AuthCallback);
    });

    it('should route signed-out to the SignedOut page, where OI.Auth sends the browser after signing out', () => {
      expect(signedOutRoute.component).toBe(SignedOut);
    });

    it('should not guard the two pages OI.Auth sends the browser to, or nobody could ever finish signing in', () => {
      expect(callbackRoute.canActivate).toBeUndefined();
      expect(signedOutRoute.canActivate).toBeUndefined();
    });

    it('should have no login page of its own: the password is typed on OI.Auth', () => {
      expect(routes.find(route => route.path === 'login')).toBeUndefined();
    });

    it('should leave nothing outside those two pages and the guarded parent, so no page can be reached without signing in', () => {
      const others = routes.filter(route => route !== callbackRoute && route !== signedOutRoute && route !== protectedParent);

      expect(others).toEqual([]);
    });

    it('should guard the parent both on the way in and on every move between pages', () => {
      expect(protectedParent.canActivate).toEqual([authGuard]);
      expect(protectedParent.canActivateChild).toEqual([authGuard]);
    });

    it('should not put a guard of its own on a page, which would suggest the parent is being bypassed (the admin group is the one exception)', () => {
      expect(pages.filter(page => page.path !== 'admin' && (page.canActivate || page.canActivateChild))).toEqual([]);
    });
  });

  describe('when signed in', () => {
    it('should navigate from the root url to /home', async () => {
      const router = configure();

      await router.navigateByUrl('/');

      expect(router.url).toBe('/home');
    });

    it.each(['/home', '/orderInvoice', '/orderInvoice/abc-123', '/orderInvoice-view/abc-123', '/orderSelection', '/customers', '/about'])(
      'should navigate to %s',
      async url => {
        const router = configure();

        await router.navigateByUrl(url);

        expect(router.url).toBe(url);
      }
    );

    it('should send an unknown address to the home page', async () => {
      const router = configure();

      await router.navigateByUrl('/no/such/page');

      expect(router.url).toBe('/home');
    });

    it.each(['/auth/callback', '/signed-out'])('should still show %s', async url => {
      const router = configure();

      await router.navigateByUrl(url);

      expect(router.url).toBe(url);
    });
  });

  describe('when signed out', () => {
    beforeEach(() => {
      signedIn.set(false);
    });

    it('should send the root url to OI.Auth, remembering the home page it redirects to', async () => {
      const router = configure();

      await router.navigateByUrl('/');

      expect(signIn).toHaveBeenCalledWith('/home');
    });

    it.each(['/home', '/orderInvoice', '/orderInvoice/abc-123', '/orderInvoice-view/abc-123', '/orderSelection', '/customers', '/about'])(
      'should send %s to OI.Auth and remember it',
      async url => {
        const router = configure();

        await router.navigateByUrl(url);

        expect(signIn).toHaveBeenCalledWith(url);
      }
    );

    it('should send an unknown address to OI.Auth too', async () => {
      const router = configure();

      await router.navigateByUrl('/no/such/page');

      expect(signIn).toHaveBeenCalled();
    });

    it.each(['/auth/callback', '/signed-out'])('should show %s without asking anyone to sign in', async url => {
      const router = configure();

      await router.navigateByUrl(url);

      expect(router.url).toBe(url);
      expect(signIn).not.toHaveBeenCalled();
    });

    it('should check again on every move, so signing out mid-session stops the next navigation', async () => {
      const router = configure();
      signedIn.set(true);
      await router.navigateByUrl('/customers');
      expect(router.url).toBe('/customers');

      signedIn.set(false);
      await router.navigateByUrl('/about');

      expect(signIn).toHaveBeenCalledWith('/about');
      expect(router.url).toBe('/customers');
    });
  });
});
