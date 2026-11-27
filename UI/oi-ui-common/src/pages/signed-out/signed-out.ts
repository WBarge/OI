import { Component, computed, inject, input, signal } from '@angular/core';

import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

import { OI_UI_OPTIONS } from '../../options/oi-ui-options';
import { AuthService } from '../../services/auth-service';

/**
 * Where OI.Auth sends the browser after signing out (the application's signedOutRoute): "You have been signed out" and a
 * Sign in button. It is also where a failed attempt to reach OI.Auth lands (?error=unavailable), with a message.
 * Register it on the signedOutRoute with no guard.
 */
@Component({
  imports: [CardModule, ButtonDirective, MessageModule],
  selector: 'oi-signed-out',
  styleUrl: './signed-out.css',
  templateUrl: './signed-out.html',
})
export class SignedOut {
  private auth = inject(AuthService);
  private options = inject(OI_UI_OPTIONS);

  /** The name of the application (set once per application in provideOiUiCommon). */
  protected readonly title = this.options.appTitle;

  /** From the query string (withComponentInputBinding): /signed-out?error=unavailable */
  readonly error = input<string>();

  protected readonly startFailed = signal(false);
  protected readonly starting = signal(false);
  protected readonly unavailable = computed(() => this.error() === 'unavailable' || this.startFailed());

  protected async signIn(): Promise<void> {
    this.starting.set(true);
    this.startFailed.set(false);
    try {
      await this.auth.signIn(this.options.homeRoute);
    } catch {
      this.startFailed.set(true);
      this.starting.set(false);
    }
  }
}
