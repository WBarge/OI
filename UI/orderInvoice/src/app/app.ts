import { Component, signal,ChangeDetectionStrategy,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule} from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { ConfigService } from '../services/config-service';
import { Configuration } from '../model/configuration';


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
  private configService = inject(ConfigService);
  public configuration!:Configuration;

  constructor() {
    this.items = [
      {label:'Order',routerLink:'/order'},
      {label:'Invoice',routerLink:'/invoice'},
      {label:'About',routerLink:'/about'}
    ];
    // Load the configuration from the config.json file
    this.configService.getConfiguration()
      .subscribe((config) => {this.configuration = config;});
  }
}
