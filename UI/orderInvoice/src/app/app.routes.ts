import { Routes } from '@angular/router';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';
import { Home } from '../pages/home/home';

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
  { path:'about',component: About}
];
