import { Routes } from '@angular/router';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';

export const routes: Routes = [
  { path: '', redirectTo: '/orderInvoice', pathMatch: 'full' },
  { path:'orderInvoice',component: OrderInvoice},
  { path:'about',component: About}
];
