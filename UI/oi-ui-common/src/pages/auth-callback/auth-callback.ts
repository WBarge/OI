import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

import { OI_UI_OPTIONS } from '../../options/oi-ui-options';
import { AuthService } from '../../services/auth-service';

/**
 * Where OI.Auth sends the browser back to after signing in (the application's callbackRoute). It trades the code in the address
 * for tokens and carries on to the page the person was going to. If that fails (sign-in cancelled, a code used twice) it says so
 * and offers to try again. Register it on the callbackRoute with no guard.
 */
@Component({
  imports: [CardModule, ButtonDirective, MessageModule],
  selector: 'oi-auth-callback',
  styleUrl: './auth-callback.css',
  templateUrl: './auth-callback.html',
})
export class AuthCallback implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private options = inject(OI_UI_OPTIONS);

  /** The name of the application (set once per application in provideOiUiCommon). */
  protected readonly title = this.options.appTitle;

  protected readonly failed = signal(false);
  protected readonly starting = signal(false);

  ngOnInit(): void {
    void this.finish();
  }

  protected async tryAgain(): Promise<void> {
    this.starting.set(true);
    try {
      await this.auth.signIn(this.options.homeRoute);
    } catch {
      this.starting.set(false);
    }
  }

  private async finish(): Promise<void> {
    try {
      const target = await this.auth.completeSignIn();
      await this.router.navigateByUrl(target, { replaceUrl: true });
    } catch {
      this.failed.set(true);
    }
  }
}
