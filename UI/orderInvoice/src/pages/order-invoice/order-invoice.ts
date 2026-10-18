import { Component, inject,OnInit, signal } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';




import { ConfigService } from '../../services/config-service';




import { AddressPanel } from '../../components/address-panel/address-panel';
import { CustomerSelection } from '../../components/customer-selection/customer-selection';

import { Configuration } from '../../model/configuration';
import { Address } from '../../model/address';
import { CustomerSearch } from '../../model/results/customer-search';
import { Customer } from '../../model/results/customer';
import { ProductOrdered } from '../../model/results/product-ordered';
import { PhoneFormatPipe } from '../../pipes/phone-format-pipe';
import { Product } from '../../model/results/product';


import { CustomerService } from '../../services/customer-service';
// import { ProductService } from '../../services/product.service';

import { FieldsetModule } from 'primeng/fieldset';
import { DatePickerModule } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { LabelModule } from 'primeng/label';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { Trash } from '@primeicons/angular/trash';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProductSelection } from '../../components/product-selection/product-selection';


@Component({
  imports: [AddressPanel,
    CustomerSelection,
    PhoneFormatPipe,
    FieldsetModule,
    DatePickerModule,
    CurrencyPipe,
    PanelModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    LabelModule,
    DividerModule,
    TableModule,
    Trash,
    DialogModule,
    ButtonModule,
    FormsModule, ProductSelection],
  selector: 'app-order-invoice',
  providers:[CustomerService],
  styleUrl: './order-invoice.css',
  templateUrl: './order-invoice.html',
})
export class OrderInvoice implements OnInit {

    private configService = inject(ConfigService);
    private customerService = inject(CustomerService);

  // private productService = inject(ProductService);

  public configuration = signal<Configuration | null>(null);
  public oiMode: string = "Order";
  public showCustomerDialog:boolean = false;
  public showProductDialog:boolean = false;
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
  }

  ngOnInit(): void {
    this.configuration.set(this.configService.config);
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

  onQuantityChange(event:any,item:any){
    if (event != null && event != undefined){
      item.total = item.price * event;
    }
    else{
      item.total = 0;
    }
    this.calculateTotals();
  }

  delete(productToDelete:ProductOrdered){
      this.items = this.items.filter(p=>p.idValue!= productToDelete.idValue);
      this.calculateTotals();
  }

  public onOrderItemsDoubleClick(event: MouseEvent): void {
    this.showProductDialog = true;
  }

  public onCustomerDoubleClick(event: MouseEvent): void {
    this.showCustomerDialog = true;
  }

  public processSelectedCustomer(customer:CustomerSearch){
      this.customerService.getCustomer(customer.idValue)
          .subscribe((result:Customer)=>{
            this.customerName = result.firstName+" "+result.lastName;
            this.customerName = this.customerName.trim();
            this.customerPhone = result.phoneNumber;
            this.billingAddress = new Address();
            this.billingAddress.address1 = result.defaultBillingAddress1;
            this.billingAddress.address2 = result.defaultBillingAddress2;
            this.billingAddress.city = result.defaultBillingCity;
            this.billingAddress.stateCode = result.defaultBillingStateCode;
            this.billingAddress.zipCode = result.defaultBillingZipCode;
            this.shippingAddress = new Address();
            this.shippingAddress.address1 = result.defaultShippingAddress1;
            this.shippingAddress.address2 = result.defaultShippingAddress2;
            this.shippingAddress.city = result.defaultShippingCity;
            this.shippingAddress.stateCode = result.defaultShippingStateCode;
            this.shippingAddress.zipCode = result.defaultShippingZipCode;
          });
  }

  public processSelectedProduct(data:Product){
    this.items.push({
      idValue: data.idValue,
      name: data.name,
      description: data.shortDescription,
      sku: data.sku,
      price: data.price,
      quantity: 1,
      total: (data.price * 1)
    });
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.items.reduce((acc, item) => acc + item.total, 0);
    this.shipping = 5.00; // Assuming a flat s hipping rate
    this.tax = this.subtotal * 0.07; // Assuming a 7% tax rate
    this.total = this.subtotal + this.shipping + this.tax;
  }
}
