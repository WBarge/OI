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

  it('should offer Home, Customers and About in the menu', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items.map(item => item.label)).toEqual(['Home', 'Customers', 'About']);
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
    expect(text).toContain('Home');
    expect(text).toContain('Customers');
    expect(text).toContain('About');
  });

  it('should only link to routes that exist', () => {
    const app = TestBed.createComponent(App).componentInstance;
    const definedPaths = routes.map(route => route.path);

    for (const item of app.items.filter(entry => entry.routerLink)) {
      expect(definedPaths).toContain((item.routerLink as string).replace(/^\//, ''));
    }
  });

  it('should link Home to the root, which redirects to the home page', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items.find(item => item.label === 'Home')?.routerLink).toBe('/');
  });

  it('should link Customers to the customers page', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items.find(item => item.label === 'Customers')?.routerLink).toBe('/customers');
  });

  it('should link About to the about page', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items.find(item => item.label === 'About')?.routerLink).toBe('/about');
  });
});
