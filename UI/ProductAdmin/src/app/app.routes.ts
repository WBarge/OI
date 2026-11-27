import { Routes } from '@angular/router';
import { adminGuard, authGuard, AuthCallback, SignedOut } from '@oi/ui-common';
import { AccessDeniedComponent } from '../pages/access-denied/access-denied.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductComponent } from '../pages/product/product.component';
import { OptionListComponent } from '../pages/option-list/option-list.component';
import { OptionComponent } from '../pages/option/option.component';
import { CharacteristicListComponent } from '../pages/characteristic-list/characteristic-list.component';
import { CharacteristicComponent } from '../pages/characteristic/characteristic.component';

export const routes: Routes = [
  // the pages anyone may reach: the two OI.Auth sends the browser back to (after signing in, after signing out;
  // the addresses registered for product-admin in OI.Auth's "Clients" settings), and being told this application is for administrators
  { path: 'auth/callback', component: AuthCallback },
  { path: 'signed-out', component: SignedOut },
  { path: 'access-denied', component: AccessDeniedComponent, canActivate: [authGuard] },
  // everything else is for signed-in administrators only
  {
    path: '',
    canActivate: [authGuard, adminGuard],
    children: [
      { path:'',redirectTo:'/products',pathMatch:'full'},
      { path:'products',component: ProductListComponent},
      { path:'product/:productId',component: ProductComponent},
      { path:'options',component: OptionListComponent},
      {path:'option/:optionId',component: OptionComponent},
      {path:'characteristics',component: CharacteristicListComponent},
      {path:'characteristic/:charId',component:CharacteristicComponent}
    ]
  }
];
