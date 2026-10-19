import { Routes } from '@angular/router';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';
import { Home } from '../pages/home/home';
import { OrderSelection } from '../pages/order-selection/order-selection';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'home',component: Home},
  { path:'orderInvoice',component: OrderInvoice},
  { path:'orderInvoice/:id',component: OrderInvoice},
  {
    path: 'orderInvoice-view/:id',
    component: OrderInvoice,
    data: { readOnly: true }
  },
  {path:'orderSelection',component: OrderSelection},
  { path:'about',component: About}
];
