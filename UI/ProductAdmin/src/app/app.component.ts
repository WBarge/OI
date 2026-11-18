import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule} from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { AuthService, HubConnectionService, UserMenu } from '@oi/ui-common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenubarModule, ToastModule, UserMenu],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.component.css'
})
export class AppComponent {
  public title: any = "Product Admin";
  protected readonly auth = inject(AuthService);

  /** The menu. Only administrators get one; anyone else is on the access-denied page, where there is nothing to open. */
  public readonly items = computed<MenuItem[]>(() => this.auth.roles().includes('Admin')
    ? [
        { label: 'Products', routerLink: ['/products'] },
        { label: 'Options', routerLink: ['/options'] },
        { label: 'Characteristics',routerLink:['/characteristics']}
      ]
    : []);

  constructor() {   // injecting it is what starts it: connected to the hub while signed in, toasts for what the back end sends
    inject(HubConnectionService);
  }
}
