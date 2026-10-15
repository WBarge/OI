import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    // jsdom has no matchMedia and the PrimeNG menubar calls it when it renders its items
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn()
    })));

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), MessageService]
    })
      .compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the toast, the menu and the router outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p-toast')).toBeTruthy();
    expect(compiled.querySelector('p-menubar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should offer Order, Invoice and About in the menu', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items.map(item => item.label)).toEqual(['Order', 'Invoice', 'About']);
  });

  it('should hand its menu items to the menubar', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const menubar = fixture.debugElement.query(By.css('p-menubar')).componentInstance;
    expect(menubar.model()).toBe(fixture.componentInstance.items);
  });

  it('should render a menu entry for every item', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const text = (fixture.nativeElement as HTMLElement).querySelector('p-menubar')?.textContent ?? '';
    expect(text).toContain('Order');
    expect(text).toContain('Invoice');
    expect(text).toContain('About');
  });

  // KNOWN BUG in app.ts: the menu links to '/order' and '/invoice', but app.routes.ts only defines
  // 'orderInvoice' and 'about', so those two menu entries land on a route that does not exist.
  // it.fails passes while the bug exists; once the links or the routes are fixed this test will fail,
  // which is the signal to change `it.fails` to `it`.
  it.fails('should only link to routes that exist', () => {
    const app = TestBed.createComponent(App).componentInstance;
    const definedPaths = routes.map(route => route.path);

    for (const item of app.items) {
      expect(definedPaths).toContain((item.routerLink as string).replace(/^\//, ''));
    }
  });
});
