import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Login } from './login';
import { AuthService } from '../../services/auth-service';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let login: ReturnType<typeof vi.fn>;
  let navigateByUrl: ReturnType<typeof vi.fn>;

  const html = () => fixture.nativeElement as HTMLElement;
  const emailInput = () => html().querySelector<HTMLInputElement>('#loginEmail')!;
  const passwordInput = () => html().querySelector<HTMLInputElement>('#loginPassword')!;
  const submitButton = () => html().querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const text = () => html().textContent ?? '';

  // the sign-in is a chain of awaited calls and ngModel writes to the view asynchronously, so give them a tick to finish
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();
  };
  const type = async (input: HTMLInputElement, value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await settle();
  };
  const fillIn = async (email = 'pat@example.com', password = 'a-long-password') => {
    await type(emailInput(), email);
    await type(passwordInput(), password);
  };
  const submit = async () => {
    submitButton().click();
    await settle();
  };

  beforeEach(async () => {
    login = vi.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), { provide: AuthService, useValue: { login } }]
    }).compileComponents();

    navigateByUrl = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true) as unknown as ReturnType<typeof vi.fn>;
    fixture = TestBed.createComponent(Login);
    await settle();
  });

  describe('the form', () => {
    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should ask for an email and a password', () => {
      expect(emailInput().type).toBe('email');
      expect(passwordInput().type).toBe('password');
      expect(text()).toContain('Email');
      expect(text()).toContain('Password');
    });

    it('should let the browser or a password manager fill the fields in', () => {
      expect(emailInput().autocomplete).toBe('username');
      expect(passwordInput().autocomplete).toBe('current-password');
    });

    it('should not offer to sign in until both fields are filled', async () => {
      expect(submitButton().disabled).toBe(true);

      await type(emailInput(), 'pat@example.com');
      expect(submitButton().disabled).toBe(true);

      await type(passwordInput(), 'secret');
      expect(submitButton().disabled).toBe(false);
    });

    it('should not count a blank email as filled in', async () => {
      await fillIn('   ', 'secret');

      expect(submitButton().disabled).toBe(true);
    });

    it('should not show an error or an expiry notice at first', () => {
      expect(text()).not.toContain('incorrect');
      expect(text()).not.toContain('expired');
    });
  });

  describe('signing in', () => {
    it('should send the email and password to the auth service', async () => {
      await fillIn('pat@example.com', 'a-long-password');

      await submit();

      expect(login).toHaveBeenCalledWith('pat@example.com', 'a-long-password');
    });

    it('should trim spaces around the email but leave the password exactly as typed', async () => {
      await fillIn('  pat@example.com  ', '  spaced password  ');

      await submit();

      expect(login).toHaveBeenCalledWith('pat@example.com', '  spaced password  ');
    });

    it('should go to the home page afterwards by default', async () => {
      await fillIn();

      await submit();

      expect(navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('should go back to the page the user was trying to reach', async () => {
      fixture.componentRef.setInput('returnUrl', '/orderInvoice/abc-123');
      await fillIn();

      await submit();

      expect(navigateByUrl).toHaveBeenCalledWith('/orderInvoice/abc-123');
    });

    it.each(['https://evil.example', '//evil.example', '/\\evil.example', 'javascript:alert(1)'])(
      'should refuse to be sent to %s after signing in',
      async destination => {
        fixture.componentRef.setInput('returnUrl', destination);
        await fillIn();

        await submit();

        expect(navigateByUrl).toHaveBeenCalledWith('/home');
      }
    );

    it('should submit when Enter is pressed in a field, which is a form submit', async () => {
      await fillIn();

      html().querySelector('form')!.dispatchEvent(new Event('submit'));
      await settle();

      expect(login).toHaveBeenCalledTimes(1);
    });

    it('should not submit while the form is incomplete', async () => {
      await type(emailInput(), 'pat@example.com');

      html().querySelector('form')!.dispatchEvent(new Event('submit'));
      await settle();

      expect(login).not.toHaveBeenCalled();
    });

    it('should clear the password once signed in', async () => {
      await fillIn();

      await submit();

      expect(passwordInput().value).toBe('');
    });

    it('should show that it is working, and ignore a second click, while the sign-in is in progress', async () => {
      let finish!: () => void;
      login.mockReturnValue(new Promise<void>(resolve => (finish = resolve)));
      await fillIn();

      await submit();
      expect(submitButton().textContent).toContain('Signing in');
      expect(submitButton().disabled).toBe(true);
      submitButton().click();
      await settle();
      expect(login).toHaveBeenCalledTimes(1);

      finish();
      await settle();
      expect(submitButton().textContent).toContain('Sign in');
      expect(submitButton().textContent).not.toContain('Signing in');
    });
  });

  describe('when the sign-in fails', () => {
    const failWith = async (status: number) => {
      login.mockRejectedValue(new HttpErrorResponse({ status, statusText: 'Error' }));
      await fillIn();
      await submit();
    };

    it('should say the email or password is incorrect for a 401, without saying which', async () => {
      await failWith(401);

      expect(text()).toContain('The email or password is incorrect.');
    });

    it('should ask the user to wait when sign-in is being throttled (429)', async () => {
      await failWith(429);

      expect(text()).toContain('Too many attempts');
    });

    it('should say the service cannot be reached when there is no response (0)', async () => {
      await failWith(0);

      expect(text()).toContain('Unable to reach the sign-in service');
    });

    it('should ask for both fields on a 400', async () => {
      await failWith(400);

      expect(text()).toContain('Enter your email and your password.');
    });

    it('should show a general message for anything else', async () => {
      await failWith(500);

      expect(text()).toContain('Something went wrong while signing in.');
    });

    it('should show a general message when the failure is not an http error at all', async () => {
      login.mockRejectedValue(new Error('boom'));
      await fillIn();
      await submit();

      expect(text()).toContain('Something went wrong while signing in.');
    });

    it('should announce the error to assistive technology', async () => {
      await failWith(401);

      expect(html().querySelector('[role="alert"]')).toBeTruthy();
    });

    it('should stay on the page and let the user try again', async () => {
      await failWith(401);

      expect(navigateByUrl).not.toHaveBeenCalled();
      expect(submitButton().disabled).toBe(false);
    });

    it('should keep what was typed so only the mistake needs fixing', async () => {
      await failWith(401);

      expect(emailInput().value).toBe('pat@example.com');
      expect(passwordInput().value).toBe('a-long-password');
    });

    it('should clear the earlier error when trying again', async () => {
      await failWith(401);
      login.mockResolvedValue(undefined);

      await submit();

      expect(text()).not.toContain('The email or password is incorrect.');
    });
  });

  describe('after the session expired', () => {
    it('should explain why the user is seeing the sign-in page', async () => {
      fixture.componentRef.setInput('reason', 'expired');
      await settle();

      expect(text()).toContain('Your session has expired. Please sign in again.');
    });

    it('should not show the notice for any other reason', async () => {
      fixture.componentRef.setInput('reason', 'something-else');
      await settle();

      expect(text()).not.toContain('Your session has expired');
    });
  });
});
