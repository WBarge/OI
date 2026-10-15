import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';

describe('routes', () => {
  it('should redirect the empty path to the order invoice page', () => {
    const root = routes.find(route => route.path === '');

    expect(root?.redirectTo).toBe('/orderInvoice');
    expect(root?.pathMatch).toBe('full');
  });

  it('should route orderInvoice to the OrderInvoice page', () => {
    expect(routes.find(route => route.path === 'orderInvoice')?.component).toBe(OrderInvoice);
  });

  it('should route about to the About page', () => {
    expect(routes.find(route => route.path === 'about')?.component).toBe(About);
  });

  it('should navigate from the root url to /orderInvoice', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/');

    expect(router.url).toBe('/orderInvoice');
  });

  it('should navigate to /about', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/about');

    expect(router.url).toBe('/about');
  });
});
