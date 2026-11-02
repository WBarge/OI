import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { AuthService } from '../services/auth-service';

describe('App', () => {
  const signedIn = signal(true);
  const userName = signal('Pat Example');
  const logout = vi.fn();

  beforeEach(async () => {
    signedIn.set(true);
    userName.set('Pat Example');
    logout.mockReset();

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
      providers: [
        provideRouter([]),
        MessageService,
        { provide: AuthService, useValue: { isAuthenticated: signedIn, userName, logout } }
      ]
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
    fixture.detectChanges();
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
    // the pages sit inside a guarded parent route, so look at the children as well
    const definedPaths = routes.flatMap(route => route.children ?? [route]).map(route => route.path);

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

  describe('signed in', () => {
    it('should show who is signed in', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      expect((fixture.nativeElement as HTMLElement).querySelector('.signedInAs')?.textContent).toContain('Pat Example');
    });

    it('should offer to sign out, and do it when clicked', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      const button = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'))
        .find(candidate => candidate.textContent?.includes('Sign out'));
      expect(button).toBeTruthy();
      button!.click();

      expect(logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('signed out', () => {
    it('should hide the menu, so nothing but the sign-in page is on screen', async () => {
      signedIn.set(false);
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();
      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.querySelector('p-menubar')).toBeNull();
      expect(compiled.querySelector('router-outlet')).toBeTruthy();
      expect(compiled.querySelector('p-toast')).toBeTruthy();
    });

    it('should show the menu as soon as someone signs in', async () => {
      signedIn.set(false);
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      signedIn.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect((fixture.nativeElement as HTMLElement).querySelector('p-menubar')).toBeTruthy();
    });

    it('should hide the menu again when the user signs out', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      signedIn.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      expect((fixture.nativeElement as HTMLElement).querySelector('p-menubar')).toBeNull();
    });
  });
});
