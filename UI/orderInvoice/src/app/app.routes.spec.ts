import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, Route, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { HubTest } from '../pages/hub-test/hub-test';
import { OrderSelection } from '../pages/order-selection/order-selection';
import { CustomerManager } from '../pages/customer-manager/customer-manager';
import { AuthService } from '../services/auth-service';
import { authGuard, guestGuard } from '../services/auth-guard';

describe('routes', () => {
  // every page except the sign-in page sits inside one parent route that requires a signed-in user
  const loginRoute = routes.find(route => route.path === 'login') as Route;
  const protectedParent = routes.find(route => route.children) as Route;
  const pages = protectedParent.children as Route[];
  const find = (path: string) => pages.find(route => route.path === path);

  const signedIn = signal(true);
  const configure = () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: AuthService, useValue: { isAuthenticated: signedIn, roles: signal([]) } }]
    });
    return TestBed.inject(Router);
  };

  beforeEach(() => {
    signedIn.set(true);
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

  it('should route hubTest to the HubTest page', () => {
    expect(find('hubTest')?.component).toBe(HubTest);
  });

  it('should not define the same path twice', () => {
    const topLevel = routes.map(route => route.path);
    const inside = pages.map(route => route.path);

    expect(new Set(topLevel).size).toBe(topLevel.length);
    expect(new Set(inside).size).toBe(inside.length);
  });

  describe('sign-in', () => {
    it('should route login to the Login page', () => {
      expect(loginRoute.component).toBe(Login);
    });

    it('should keep signed-in users off the sign-in page', () => {
      expect(loginRoute.canActivate).toEqual([guestGuard]);
    });

    it('should leave nothing outside the sign-in page and the guarded parent, so no page can be reached without signing in', () => {
      const others = routes.filter(route => route !== loginRoute && route !== protectedParent);

      expect(others).toEqual([]);
    });

    it('should guard the parent both on the way in and on every move between pages', () => {
      expect(protectedParent.canActivate).toEqual([authGuard]);
      expect(protectedParent.canActivateChild).toEqual([authGuard]);
    });

    it('should not put a guard of its own on a page, which would suggest the parent is being bypassed', () => {
      expect(pages.filter(page => page.canActivate || page.canActivateChild)).toEqual([]);
    });
  });

  describe('when signed in', () => {
    it('should navigate from the root url to /home', async () => {
      const router = configure();

      await router.navigateByUrl('/');

      expect(router.url).toBe('/home');
    });

    it.each(['/home', '/orderInvoice', '/orderInvoice/abc-123', '/orderInvoice-view/abc-123', '/orderSelection', '/customers', '/about', '/hubTest'])(
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

    it('should not show the sign-in page, and go home instead', async () => {
      const router = configure();

      await router.navigateByUrl('/login');

      expect(router.url).toBe('/home');
    });
  });

  describe('when signed out', () => {
    beforeEach(() => {
      signedIn.set(false);
    });

    it('should send the root url to the sign-in page, remembering the home page it redirects to', async () => {
      const router = configure();

      await router.navigateByUrl('/');

      expect(router.url).toBe('/login?returnUrl=%2Fhome');
    });

    it.each(['/home', '/orderInvoice', '/orderInvoice/abc-123', '/orderInvoice-view/abc-123', '/orderSelection', '/customers', '/about', '/hubTest'])(
      'should send %s to the sign-in page and remember it',
      async url => {
        const router = configure();

        await router.navigateByUrl(url);

        expect(router.url).toBe(`/login?returnUrl=${encodeURIComponent(url)}`);
      }
    );

    it('should send an unknown address to the sign-in page too', async () => {
      const router = configure();

      await router.navigateByUrl('/no/such/page');

      expect(router.url.startsWith('/login')).toBe(true);
    });

    it('should show the sign-in page itself', async () => {
      const router = configure();

      await router.navigateByUrl('/login');

      expect(router.url).toBe('/login');
    });

    it('should check again on every move, so signing out mid-session stops the next navigation', async () => {
      const router = configure();
      signedIn.set(true);
      await router.navigateByUrl('/customers');
      expect(router.url).toBe('/customers');

      signedIn.set(false);
      await router.navigateByUrl('/about');

      expect(router.url).toBe('/login?returnUrl=%2Fabout');
    });
  });
});
