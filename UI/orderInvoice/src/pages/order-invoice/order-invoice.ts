import { Component, inject,OnInit, signal } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Address } from '../../model/address';
import { AddressPanel } from '../../components/address-panel/address-panel';

import { ConfigService } from '../../services/config-service';
import { Configuration } from '../../model/configuration';

import { ProductOrdered } from '../../model/results/product-ordered';
// import { ProductService } from '../../services/product.service';

import { FieldsetModule } from 'primeng/fieldset';
import { DatePickerModule } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { LabelModule } from 'primeng/label';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { Trash } from '@primeicons/angular/trash';


@Component({
  imports: [AddressPanel,
    FieldsetModule,
    DatePickerModule,
    CurrencyPipe,
    PanelModule,
    InputTextModule,
    InputMaskModule,
    LabelModule,
    DividerModule,
    TableModule,
    Trash,
    FormsModule],
  selector: 'app-order-invoice',
  // providers:[ProductService],
  styleUrl: './order-invoice.css',
  templateUrl: './order-invoice.html',
})
export class OrderInvoice implements OnInit {

  private configService = inject(ConfigService);
  // private productService = inject(ProductService);

  public configuration = signal<Configuration | null>(null);
  public oiMode: string = "Order";


  public orderNumber: string = "12323123";
  public orderDate:Date = new Date();
  public customerName: string = "";
  public customerPhone: string = "555-555-5555";
  public billingAddress:Address = new Address();
  public shippingAddress:Address = new Address();
  public items:ProductOrdered[]= [];
  public subtotal: number = 0;
  public shipping: number = 0;
  public tax: number = 0;
  public total: number = 0;

  constructor() {
    this.configService.getConfiguration()
      .subscribe((config) => {this.configuration.set(config);});
  }

  ngOnInit(): void {
    this.loadMockOrder();
  }

  loadMockOrder() {
    this.customerName = "John Doe";
    this.customerPhone = "555-555-5555";

    this.billingAddress.address1 = "123 Main St";
    this.billingAddress.address2 = "Apt 4B";
    this.billingAddress.city = "Anytown";
    this.billingAddress.stateCode = "AZ";
    this.billingAddress.zipCode = "12345";

    this.shippingAddress.address1 = "456 Oak St";
    this.shippingAddress.city = "Othertown";
    this.shippingAddress.stateCode = "AZ";
    this.shippingAddress.zipCode = "67890";

    this.items = [
      {
        idValue: '1', name: 'Product 1', description: 'Description 1', sku: 'SKU1', price: 10.99, quantity: 2,
        total: (10.99 * 2)
      },
      {
        idValue: '2', name: 'Product 2', description: 'Description 2', sku: 'SKU2', price: 5.49, quantity: 1,
        total: (5.49 * 1)
      },
      {
        idValue: '3', name: 'Product 3', description: 'Description 3', sku: 'SKU3', price: 15.75, quantity: 3,
        total: (15.75 * 3)
      }
    ];
    this.calculateTotals();
  };


  delete(productToDelete:ProductOrdered){
      this.items = this.items.filter(p=>p.idValue!= productToDelete.idValue);
      this.calculateTotals();
  }

  public onOrderItemsDoubleClick(event: MouseEvent): void {
    console.log("Double clicked on order items: ", event);
  }

  calculateTotals() {
    this.subtotal = this.items.reduce((acc, item) => acc + item.total, 0);
    this.shipping = 5.00; // Assuming a flat shipping rate
    this.tax = this.subtotal * 0.07; // Assuming a 7% tax rate
    this.total = this.subtotal + this.shipping + this.tax;
  }
}
