import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { provideOiUiCommon } from '../../options/oi-ui-options';
import { AuthService } from '../../services/auth-service';
import { AuthCallback } from './auth-callback';

describe('AuthCallback', () => {
  let completeSignIn: ReturnType<typeof vi.fn>;
  let signIn: ReturnType<typeof vi.fn>;
  let navigateByUrl: ReturnType<typeof vi.fn>;

  const render = async () => {
    const fixture = TestBed.createComponent(AuthCallback);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  beforeEach(() => {
    completeSignIn = vi.fn().mockResolvedValue('/customers');
    signIn = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      imports: [AuthCallback],
      providers: [
        provideRouter([]),
        provideOiUiCommon({ securedUrls: () => [], clientId: 'oi-ui', appTitle: 'Orders', homeRoute: '/home' }),
        { provide: AuthService, useValue: { completeSignIn, signIn } },
      ],
    });
    navigateByUrl = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true) as unknown as ReturnType<typeof vi.fn>;
  });

  it('should finish the sign-in and carry on to the page the user was going to', async () => {
    await render();

    expect(completeSignIn).toHaveBeenCalledOnce();
    expect(navigateByUrl).toHaveBeenCalledWith('/customers', { replaceUrl: true });
  });

  it('should say it is signing the user in while it works', () => {
    completeSignIn.mockReturnValue(new Promise(() => undefined));

    const fixture = TestBed.createComponent(AuthCallback);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Signing you in');
    expect(navigateByUrl).not.toHaveBeenCalled();
  });

  it('should show the name of the application', async () => {
    expect((await render()).textContent).toContain('Orders');
  });

  describe('when the sign-in cannot be finished', () => {
    beforeEach(() => {
      completeSignIn.mockRejectedValue(new Error('access_denied'));
    });

    it('should say so, with a Try again button, and not move on', async () => {
      const element = await render();

      expect(element.querySelector('[role="alert"]')?.textContent).toContain('could not finish signing you in');
      expect(element.querySelector('button')?.textContent).toContain('Try again');
      expect(navigateByUrl).not.toHaveBeenCalled();
    });

    it('should start the sign-in again when Try again is pressed', async () => {
      const element = await render();

      element.querySelector('button')!.click();

      expect(signIn).toHaveBeenCalledWith('/home');
    });

    it('should allow another try when OI.Auth could not be reached', async () => {
      signIn.mockRejectedValue(new Error('Network Error'));
      const fixture = TestBed.createComponent(AuthCallback);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;

      button.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(button.disabled).toBe(false);
    });
  });
});
