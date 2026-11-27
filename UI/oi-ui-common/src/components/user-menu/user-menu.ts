import { Component, inject } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { AuthService } from '../../services/auth-service';

/** "Signed in as <name>" and a Sign out button. Put it at the end of an application's menu bar. */
@Component({
  imports: [ButtonDirective],
  selector: 'oi-user-menu',
  styleUrl: './user-menu.css',
  templateUrl: './user-menu.html',
})
export class UserMenu {
  protected readonly auth = inject(AuthService);

  protected signOut(): void {
    void this.auth.logout();
  }
}
