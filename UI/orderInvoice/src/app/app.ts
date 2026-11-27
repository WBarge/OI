import { Component, computed, inject, Injector, signal,ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { MenubarModule} from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '../services/auth-service';
import { ConfigService } from '../services/config-service';
import { HubConnectionService } from '../services/hub-connection-service';


@Component({
  imports: [RouterOutlet, MenubarModule, ToastModule, ButtonDirective],
  selector: 'app-root',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('orderInvoice');
  protected readonly auth = inject(AuthService);
  private readonly injector = inject(Injector);
  /** The menu. The Admin entry is only there for administrators; the server and the route guard enforce it as well. */
  public readonly items = computed<MenuItem[]>(() => {
    const items: MenuItem[] = [
      {label:'Home', routerLink:'/'},
      {label:'Customer', routerLink:'/customers'},
      {label:'About',routerLink:'/about'},
    ];
    if (this.auth.roles().includes('Admin')) {
      // the ProductManager UI is a separate application: it opens in its own window and is already signed in
      items.push({label: 'Products', command: () => this.openProductManager()});
      items.push({
        label: 'Admin',
        items: [
          {label:'Hub Test',routerLink:'/admin/hubTest'},
          {label:'Users', routerLink:'/admin/users'},
          {label:'Roles', routerLink:'/admin/roles'},
          {label:'Groups', routerLink:'/admin/groups'}
        ]
      });
    }
    return items;
  });

  constructor() {    // injecting it is what starts it: connected to the hub while signed in, toasts for what the back end sends
    inject(HubConnectionService);
  }

  /** noopener: the new window gets no handle back to this one. It shares the sign-in through the browser's storage, not through us. */
  private openProductManager(): void {
    window.open(this.injector.get(ConfigService).config.productUiUrl, '_blank', 'noopener');
  }

  protected signOut(): void {
    void this.auth.logout();
  }
}
