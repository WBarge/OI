import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService, HubConnectionService } from '@oi/ui-common';
import { vi } from 'vitest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const signedIn = signal(true);
  const roles = signal<string[]>(['Admin']);
  const userName = signal('Pat Admin');

  const render = async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  };

  beforeEach(async () => {
    signedIn.set(true);
    roles.set(['Admin']);

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
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        MessageService,
        { provide: AuthService, useValue: { isAuthenticated: signedIn, userName, roles, logout: vi.fn() } },
        // the real one opens a connection to the hub; what it does is covered by its own spec in the library
        { provide: HubConnectionService, useValue: {} }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have the 'Product Admin' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('Product Admin');
  });

  describe('the menu', () => {
    it('should offer Products, Options, Characteristics and About to an administrator', () => {
      const app = TestBed.createComponent(AppComponent).componentInstance;

      expect(app.items().map(item => item.label)).toEqual(['Products', 'Options', 'Characteristics', 'About']);
      expect(app.items().map(item => item.routerLink)).toEqual([['/products'], ['/options'], ['/characteristics'], ['/about']]);
    });

    it('should offer nothing to someone who is not an administrator', () => {
      roles.set(['User']);

      expect(TestBed.createComponent(AppComponent).componentInstance.items()).toEqual([]);
    });

    it('should not match a role that only looks like Admin', () => {
      roles.set(['Administrator', 'admin']);

      expect(TestBed.createComponent(AppComponent).componentInstance.items()).toEqual([]);
    });
  });

  describe('the menu bar', () => {
    it('should show the menu and who is signed in, with Sign out, when someone is signed in', async () => {
      const fixture = await render();
      const element = fixture.nativeElement as HTMLElement;

      expect(element.querySelector('p-menubar')).toBeTruthy();
      expect(element.querySelector('oi-user-menu')?.textContent).toContain('Pat Admin');
      expect(element.querySelector('oi-user-menu button')?.textContent).toContain('Sign out');
    });

    it('should be hidden when nobody is signed in, so nothing but the sign-in page is on screen', async () => {
      signedIn.set(false);

      const fixture = await render();

      expect((fixture.nativeElement as HTMLElement).querySelector('p-menubar')).toBeNull();
    });

    it('should still offer Sign out to a signed-in non-administrator, with no menu entries', async () => {
      roles.set(['User']);

      const fixture = await render();
      const element = fixture.nativeElement as HTMLElement;

      expect(element.querySelector('oi-user-menu button')).toBeTruthy();
      expect(element.querySelector('p-menubar')?.textContent).not.toContain('Products');
    });
  });

  it('should render the toast and the router outlet', async () => {
    const element = (await render()).nativeElement as HTMLElement;

    expect(element.querySelector('p-toast')).toBeTruthy();
    expect(element.querySelector('router-outlet')).toBeTruthy();
  });
});
