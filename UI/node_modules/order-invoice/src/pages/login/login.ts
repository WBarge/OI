import { Component, computed, inject, input, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

import { AuthService } from '../../services/auth-service';
import { safeReturnUrl } from '../../utils/url.utils';

@Component({
  imports: [FormsModule, CardModule, InputTextModule, ButtonDirective, MessageModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  /** Both come from the query string (withComponentInputBinding): /login?returnUrl=/customers&reason=expired */
  readonly returnUrl = input<string>();
  readonly reason = input<string>();

  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly busy = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly sessionExpired = computed(() => this.reason() === 'expired');
  protected readonly canSubmit = computed(
    () => !this.busy() && this.email().trim().length > 0 && this.password().length > 0,
  );

  protected async signIn(): Promise<void> {
    if (!this.canSubmit()) {
      return;
    }

    this.busy.set(true);
    this.error.set(null);
    try {
      await this.auth.login(this.email().trim(), this.password());
      this.password.set('');
      await this.router.navigateByUrl(safeReturnUrl(this.returnUrl()));
    } catch (error) {
      this.error.set(this.describe(error));
    } finally {
      this.busy.set(false);
    }
  }

  private describe(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 0:
          return 'Unable to reach the sign-in service. Check your connection and try again.';
        case 400:
          return 'Enter your email and your password.';
        case 401:
          return 'The email or password is incorrect.';   // never say which one, or whether the account is locked
        case 429:
          return 'Too many attempts. Wait a minute and try again.';
      }
    }
    return 'Something went wrong while signing in. Try again.';
  }
}
