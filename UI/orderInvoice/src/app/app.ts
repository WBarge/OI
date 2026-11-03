import { Component, inject, signal,ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { MenubarModule} from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

import { AuthService } from '../services/auth-service';
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
  public items: MenuItem[];

  constructor() {
    this.items = [
      {label:'Home', routerLink:'/'},
      {label:'Customers', routerLink:'/customers'},
      {label:'About',routerLink:'/about'},
      {label:'Hub Test',routerLink:'/hubTest'}
    ];
    // injecting it is what starts it: connected to the hub while signed in, toasts for what the back end sends
    inject(HubConnectionService);
  }

  protected signOut(): void {
    void this.auth.logout();
  }
}
