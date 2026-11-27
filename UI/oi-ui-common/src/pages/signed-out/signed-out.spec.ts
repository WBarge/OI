import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { provideOiUiCommon } from '../../options/oi-ui-options';
import { AuthService } from '../../services/auth-service';
import { SignedOut } from './signed-out';

describe('SignedOut', () => {
  let signIn: ReturnType<typeof vi.fn>;

  const render = (error?: string) => {
    const fixture = TestBed.createComponent(SignedOut);
    if (error !== undefined) {
      fixture.componentRef.setInput('error', error);
    }
    fixture.detectChanges();
    return fixture;
  };

  beforeEach(() => {
    signIn = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      imports: [SignedOut],
      providers: [
        provideOiUiCommon({ securedUrls: () => [], clientId: 'oi-ui', appTitle: 'Orders', homeRoute: '/home' }),
        { provide: AuthService, useValue: { signIn } },
      ],
    });
  });

  it('should say the user has been signed out, with a Sign in button', () => {
    const element = render().nativeElement as HTMLElement;

    expect(element.textContent).toContain('You have been signed out');
    expect(element.querySelector('button')?.textContent).toContain('Sign in');
    expect(element.querySelector('[role="alert"]')).toBeNull();
  });

  it('should show the name of the application', () => {
    expect((render().nativeElement as HTMLElement).textContent).toContain('Orders');
  });

  it('should send the browser to OI.Auth, then home, when Sign in is pressed', () => {
    (render().nativeElement as HTMLElement).querySelector('button')!.click();

    expect(signIn).toHaveBeenCalledWith('/home');
  });

  it('should say sign-in is not available when the guard could not reach OI.Auth', () => {
    const element = render('unavailable').nativeElement as HTMLElement;

    expect(element.querySelector('[role="alert"]')?.textContent).toContain('not available right now');
    expect(element.textContent).not.toContain('You have been signed out');
  });

  it('should ignore any other error value', () => {
    expect((render('something-else').nativeElement as HTMLElement).textContent).toContain('You have been signed out');
  });

  it('should say sign-in is not available, and allow another try, when pressing Sign in cannot reach OI.Auth', async () => {
    signIn.mockRejectedValue(new Error('Network Error'));
    const fixture = render();
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button')!;

    button.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element.querySelector('[role="alert"]')?.textContent).toContain('not available right now');
    expect(button.disabled).toBe(false);
  });
});
