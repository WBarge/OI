import { Component, inject,OnInit, signal } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
import { OrdersService } from '../../services/orders-service';
import { Order } from '../../model/results/order';
import { NotificationService } from '../../utils/notification-service';


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
  private route = inject(ActivatedRoute);
  private orderService = inject(OrdersService);
  private notify=inject(NotificationService);



  public configuration = signal<Configuration | null>(null);
  public oiMode: string = "Order";
  public showCustomerDialog:boolean = false;
  public showProductDialog:boolean = false;

  public orderId:string|null = null;
  public orderNumber: string = "";
  public orderDate:Date = new Date();
  public orderCompleted:Date = new Date();
  public customerId:string = "";
  public customerName: string = "";
  public customerPhone: string = "555-555-5555";
  public billingAddress:Address = new Address();
  public shippingAddress:Address = new Address();
  public items:ProductOrdered[]= [];
  public subtotal: number = 0;
  public shipping: number = 0;
  public tax: number = 0;
  public total: number = 0;

  public mode: OrderMode = OrderMode.New;

  constructor() {
  }

  ngOnInit() {
    this.configuration.set(this.configService.config);

    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      const isReadOnlyRoute = this.route.snapshot.data['readOnly'];
      // Determine mode based on the presence of the ID
      if (isReadOnlyRoute) {
        this.mode = OrderMode.View
      }else  if (this.orderId) {
        this.mode = OrderMode.Edit;
      } else {
        this.mode = OrderMode.New;
      }
      if (this.orderId != null) {
        this.loadOrder(null);
      }
    });

  }

  public get isReadOnly(): boolean {
    return this.mode === OrderMode.View;
  }

  public get editable():boolean{
    return this.mode === OrderMode.Edit;
  }

  public get canSubmit():boolean{
    return (!this.customerId) === false && this.items.length > 0
  }

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
    if (this.isReadOnly) return;
    this.items = this.items.filter(p=>p.productId != productToDelete.productId);
    this.calculateTotals();
  }

  public onOrderItemsDoubleClick(event: MouseEvent): void {
     if (this.isReadOnly) return;
    this.showProductDialog = true;
  }

  public onCustomerDoubleClick(event: MouseEvent): void {
     if (this.isReadOnly) return;
    this.showCustomerDialog = true;
  }

  public processSelectedCustomer(customer:CustomerSearch){
      this.customerService.getCustomer(customer.idValue)
          .subscribe((result:Customer)=>{
            this.customerId = result.idValue;
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
    const searchProduct = this.items.find(element => element.productId === data.idValue);
    if (searchProduct) {
      searchProduct.quantity += 1;
      searchProduct.total = searchProduct.price * searchProduct.quantity;
      this.calculateTotals();
      return;
    }
    else{
      const tempItem:ProductOrdered = new ProductOrdered();
      tempItem.idValue = "";
      tempItem.productId = data.idValue;
      tempItem.name= data.name;
      tempItem.description= data.shortDescription;
      tempItem.sku= data.sku;
      tempItem.price= data.price;
      tempItem.quantity= 1;
      tempItem.total= (data.price * 1);
      this.items.push(tempItem);
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.subtotal = this.items.reduce((acc, item) => acc + item.total, 0);
    this.shipping = 5.00; // Assuming a flat s hipping rate
    this.tax = this.subtotal * 0.07; // Assuming a 7% tax rate
    this.total = this.subtotal + this.shipping + this.tax;
  }

  loadOrder(orderToLoad:Order|null){

    if (orderToLoad !== null && orderToLoad.idValue) {
        this.orderId = orderToLoad.idValue;
    }
    if (this.orderId === null) {
      return;
    }
    if (!orderToLoad){
      this.orderService.getOrderById(this.orderId)
      .subscribe((order:Order)=>{
        this.populateOrderFields(order);
      });
    }else{
        this.populateOrderFields(orderToLoad);
    }
  }

  produceOrder():Order | null{
    if (!this.customerId)
    {
      this.notify.error("ERROR","A Customer must be selected!");
      return null;
    }
    if (this.items.length <1){
      this.notify.error("ERROR","At least one item must be added to the order")
      return null;
    }
    if (!this.orderDate || isNaN(new Date(this.orderDate).getTime())) {
     this.notify.error("ERROR", "A valid order date is required");
      return null;
    }
    const order:Order = new Order();
    if (this.mode === OrderMode.Edit && this.orderId !== null)
    {
      order.idValue = this.orderId;
      order.orderNumber = this.orderNumber;
    }
    order.orderDate = this.orderDate;
    order.customerId = this.customerId;
    order.orderItems = this.items;
    order.billingAddress1 = this.billingAddress.address1;
    order.billingAddress2 = this.billingAddress.address2;
    order.billingCity = this.billingAddress.city;
    order.billingStateCode =  this.billingAddress.stateCode;
    order.billingZipCode = this.billingAddress.zipCode;
    order.shippingAddress1 = this.shippingAddress.address1;
    order.shippingAddress2 = this.shippingAddress.address2;
    order.shippingCity = this.shippingAddress.city;
    order.shippingStateCode = this.shippingAddress.stateCode;
    order.shippingZipCode = this.shippingAddress.zipCode;
    order.subTotal = this.subtotal;
    order.shipping = this.shipping;
    order.tax = this.tax;
    order.total = this.total;

    return order;
  }

  updateOrder(event:any){
    const orderToCreate:Order|null = this.produceOrder();
    if (orderToCreate !== null)
    {
      this.orderService.updateOrder(orderToCreate).subscribe();
    }
  }

  createOrder(event:any){
    const orderToCreate:Order|null = this.produceOrder();
    if (orderToCreate !== null)
    {
      this.orderService.createOrder(orderToCreate).subscribe((result:Order)=>{
          this.loadOrder(result);
      });
    }
  }

  populateOrderFields(order:Order) {
    this.orderId = order.idValue;
    this.orderNumber = order.orderNumber;
    this.orderDate = order.orderDate;
    this.orderCompleted = order.completedDate;
    this.customerId = order.customerId;
    this.customerName = order.customerName;
    this.customerPhone = order.phoneNumber;
    this.billingAddress = new Address();
    this.billingAddress.address1 = order.billingAddress1;
    this.billingAddress.address2 = order.billingAddress2;
    this.billingAddress.city = order.billingCity;
    this.billingAddress.stateCode = order.billingStateCode;
    this.billingAddress.zipCode = order.billingZipCode;
    this.shippingAddress = new Address();
    this.shippingAddress.address1 = order.shippingAddress1;
    this.shippingAddress.address2 = order.shippingAddress2;
    this.shippingAddress.city = order.shippingCity;
    this.shippingAddress.stateCode = order.shippingStateCode;
    this.shippingAddress.zipCode = order.shippingZipCode;
    this.items = order.orderItems;
    this.subtotal = order.subTotal;
    this.shipping = order.shipping;
    this.tax = order.tax;
    this.total = order.total;
  }

}

enum OrderMode {
  New = 'NEW',
  Edit = 'EDIT',
  View = 'VIEW' // Example of why enums are better than booleans
}
