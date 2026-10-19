import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonDirective  } from 'primeng/button';

@Component({
  imports: [    ButtonDirective  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  private router =  inject(Router);

  newOrderClicked(){
    this.router.navigate(['/orderInvoice']);
  }

  findOrderClicked(){
    this.router.navigate(['/orderSelection']);
  }
}
