import { Routes } from '@angular/router';
import { OrderInvoice } from '../pages/order-invoice/order-invoice';
import { About } from '../pages/about/about';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { HubTest } from '../pages/hub-test/hub-test';
import { AdminUsers } from '../pages/admin-users/admin-users';
import { AdminRoles } from '../pages/admin-roles/admin-roles';
import { AdminGroups } from '../pages/admin-groups/admin-groups';
import { OrderSelection } from '../pages/order-selection/order-selection';
import { CustomerManager } from '../pages/customer-manager/customer-manager';
import { adminGuard, authGuard, guestGuard } from '../services/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [guestGuard] },
  {
    // Everything in here needs a signed-in user. A page added to this list is protected automatically.
    // canActivateChild is what re-checks on every move between pages; canActivate alone only runs on the way in.
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
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
      {path:'customers',component: CustomerManager},
      { path:'about',component: About},
      { path:'hubTest',component: HubTest},
      {
        // user, role and group management: administrators only (the server refuses everyone else as well)
        path: 'admin',
        canActivate: [adminGuard],
        canActivateChild: [adminGuard],
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          { path: 'users', component: AdminUsers },
          { path: 'roles', component: AdminRoles },
          { path: 'groups', component: AdminGroups },
        ]
      },
      // anything else: back to the start, which signs in first if needed
      { path: '**', redirectTo: 'home' }
    ]
  }
];
