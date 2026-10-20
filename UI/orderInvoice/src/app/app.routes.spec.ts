import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';
import { Home } from '../pages/home/home';
import { OrderSelection } from '../pages/order-selection/order-selection';

describe('routes', () => {
  const find = (path: string) => routes.find(route => route.path === path);

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

  it('should route about to the About page', () => {
    expect(find('about')?.component).toBe(About);
  });

  it('should not define the same path twice', () => {
    const paths = routes.map(route => route.path);

    expect(new Set(paths).size).toBe(paths.length);
  });

  it('should navigate from the root url to /home', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/');

    expect(router.url).toBe('/home');
  });

  it.each(['/home', '/orderInvoice', '/orderInvoice/abc-123', '/orderInvoice-view/abc-123', '/orderSelection', '/about'])(
    'should navigate to %s',
    async url => {
      TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
      const router = TestBed.inject(Router);

      await router.navigateByUrl(url);

      expect(router.url).toBe(url);
    }
  );
});
