import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { AuthService } from '../services/auth-service';
import { HubConnectionService } from '../services/hub-connection-service';

describe('App', () => {
  const signedIn = signal(true);
  const roles = signal<string[]>([]);
  const userName = signal('Pat Example');
  const logout = vi.fn();

  beforeEach(async () => {
    signedIn.set(true);
    roles.set([]);
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
        { provide: AuthService, useValue: { isAuthenticated: signedIn, userName, roles, logout } },
        // the real one opens a connection to the hub; what it does is covered by its own spec
        { provide: HubConnectionService, useValue: {} }
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

  it('should offer Home, Customers, About and Hub Test in the menu', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items().map(item => item.label)).toEqual(['Home', 'Customers', 'About', 'Hub Test']);
  });

  it('should start the hub connection, which stays connected while someone is signed in', () => {
    const started = vi.fn();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        MessageService,
        { provide: AuthService, useValue: { isAuthenticated: signedIn, userName, roles, logout } },
        { provide: HubConnectionService, useFactory: () => { started(); return {}; } }
      ]
    });

    TestBed.createComponent(App);

    expect(started).toHaveBeenCalledTimes(1);
  });

  it('should hand its menu items to the menubar', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const menubar = fixture.debugElement.query(By.css('p-menubar')).componentInstance;
    expect(menubar.model()).toBe(fixture.componentInstance.items());
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
    roles.set(['Admin']);
    const app = TestBed.createComponent(App).componentInstance;
    // the pages sit inside guarded parent routes, so work out the full path of every route
    const fullPaths = (list: Routes, prefix = ''): string[] => list.flatMap(route => {
      const path = [prefix, route.path].filter(part => !!part).join('/');
      return route.children ? [path, ...fullPaths(route.children, path)] : [path];
    });
    const definedPaths = fullPaths(routes);
    const linked = app.items().flatMap(entry => [entry, ...(entry.items ?? [])] as MenuItem[]).filter(entry => entry.routerLink);

    expect(linked.length).toBeGreaterThan(4);   // the Admin entries are included
    for (const item of linked) {
      expect(definedPaths).toContain((item.routerLink as string).replace(/^\//, ''));
    }
  });

  it('should link Home to the root, which redirects to the home page', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items().find(item => item.label === 'Home')?.routerLink).toBe('/');
  });

  it('should link Customers to the customers page', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items().find(item => item.label === 'Customers')?.routerLink).toBe('/customers');
  });

  it('should link Hub Test to the hub test page', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items().find(item => item.label === 'Hub Test')?.routerLink).toBe('/hubTest');
  });

  it('should link About to the about page', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.items().find(item => item.label === 'About')?.routerLink).toBe('/about');
  });

  describe('the Admin menu', () => {
    const adminEntry = (app: App) => app.items().find(item => item.label === 'Admin');

    it('should not be offered to someone who is not an administrator', () => {
      roles.set(['User']);

      expect(adminEntry(TestBed.createComponent(App).componentInstance)).toBeUndefined();
    });

    it('should not be offered to someone with no roles', () => {
      expect(adminEntry(TestBed.createComponent(App).componentInstance)).toBeUndefined();
    });

    it('should be offered to an administrator, with Users, Roles and Groups', () => {
      roles.set(['User', 'Admin']);

      const admin = adminEntry(TestBed.createComponent(App).componentInstance);

      expect(admin?.items?.map(item => item.label)).toEqual(['Users', 'Roles', 'Groups']);
      expect(admin?.items?.map(item => item.routerLink)).toEqual(['/admin/users', '/admin/roles', '/admin/groups']);
    });

    it('should not match a role that only looks like Admin', () => {
      roles.set(['Administrator', 'admin']);

      expect(adminEntry(TestBed.createComponent(App).componentInstance)).toBeUndefined();
    });

    it('should appear and disappear as the roles change', () => {
      const app = TestBed.createComponent(App).componentInstance;
      expect(adminEntry(app)).toBeUndefined();

      roles.set(['Admin']);
      expect(adminEntry(app)).toBeDefined();

      roles.set(['User']);
      expect(adminEntry(app)).toBeUndefined();
    });

    it('should keep the ordinary entries first, with Admin last', () => {
      roles.set(['Admin']);

      const labels = TestBed.createComponent(App).componentInstance.items().map(item => item.label);

      expect(labels).toEqual(['Home', 'Customers', 'About', 'Hub Test', 'Admin']);
    });

    it('should show the Admin entry in the menu bar for an administrator', async () => {
      roles.set(['Admin']);
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      expect((fixture.nativeElement as HTMLElement).querySelector('p-menubar')?.textContent).toContain('Admin');
    });

    it('should leave the Admin entry out of the menu bar for everyone else', async () => {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      await fixture.whenStable();

      expect((fixture.nativeElement as HTMLElement).querySelector('p-menubar')?.textContent).not.toContain('Admin');
    });
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
