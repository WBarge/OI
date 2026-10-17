import { Component, signal,ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule} from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';


@Component({
  imports: [RouterOutlet, MenubarModule, ToastModule],
  selector: 'app-root',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('orderInvoice');
  public items: MenuItem[];

  constructor() {
    this.items = [
      {label:'Orders',},
      {label:'Invoices',},
      {label:'About',routerLink:'/about'}
    ];
  }
}
