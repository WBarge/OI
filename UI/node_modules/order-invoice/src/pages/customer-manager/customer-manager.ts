import { Component,inject,signal ,output,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConfigService } from '../../services/config-service';
import { NotificationService } from '../../utils/notification-service';
import { CustomerService } from '../../services/customer-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';

import { PhoneFormatPipe } from '../../pipes/phone-format-pipe';
import { isEmpty } from '../../utils/string.utils'

import { AddressPanel } from '../../components/address-panel/address-panel';

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TableLazyLoadEvent, TableModule, TablePageEvent, TableRowSelectEvent } from 'primeng/table';
import { ButtonDirective  } from 'primeng/button';
import { FilterMetadata } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { LabelModule } from 'primeng/label';
import { CheckboxModule } from 'primeng/checkbox';

import { CustomerSearch } from '../../model/results/customer-search';
import { CustomerListResult } from '../../model/results/customer-list-result';
import { Configuration } from '../../model/configuration';
import { Address } from '../../model/address';
import { Customer } from '../../model/results/customer';
import { Router } from '@angular/router';


@Component({
    imports: [FormsModule,
    AddressPanel,
    PhoneFormatPipe,
    DialogModule,
    DividerModule,
    TableModule,
    ButtonDirective,
    FieldsetModule,
    ToolbarModule,
    InputTextModule,
    InputMaskModule,
    LabelModule,
    CheckboxModule],
  providers:[CustomerService,FilterTransformerService],

  selector: 'app-customer-manager',
  styleUrl: './customer-manager.css',
  templateUrl: './customer-manager.html',
})
export class CustomerManager implements OnInit{

  private notify=inject(NotificationService);
  private customerService = inject(CustomerService);
  private filterTransformer=inject(FilterTransformerService);
  private configService = inject(ConfigService);
  private router = inject(Router);

  public configuration = signal<Configuration | null>(null);
  public showNewCustomerDialog = signal<boolean>(false);
  public editMode:boolean = false;


  customers= signal<CustomerSearch[]>([]);
  currentPage:number =1;
  pageSize:number = 10;
  totalItems:number = 0;
  filters?: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  public customerId:string="";
  public customerFirstName: string = "";
  public customerLastName: string = "";
  public customerPhone: string = "";
  public billingAddress:Address = new Address();
  public shippingAddress:Address = new Address();
  public shippingSameAsBilling:boolean = false;
  public heading:string=""


  ngOnInit(): void {
    this.configuration.set(this.configService.config);
  }


  loadCustomers(){
    var transFormedFilters = this.filterTransformer?.transformGridFilters(this.filters);
    this.customerService.getCustomers(this.currentPage,this.pageSize,transFormedFilters)
      .subscribe((results:CustomerListResult)=>{
        this.customers.set(results.data);
        this.totalItems = results.totalRecordSize
      });
  }

  refresh(){
    this.notify.info('System Message','Loading Customers');
    this.loadCustomers();
  }

  onSelect(event:TableRowSelectEvent){
    this.heading = "Edit Customer";
    var selectedCustomer = event.data;
    this.customerService.getCustomer(selectedCustomer.idValue)
    .subscribe((selectedCustomer:Customer)=>{
      this.populateLocalCustomerData(selectedCustomer);
      this.editMode = true;
      this.showNewCustomerDialog.set(true);
    })
  }

  loadCustomersLazy(event: TableLazyLoadEvent) {
    this.filters = event.filters;
    this.loadCustomers();
  }

  pageChange(event:TablePageEvent){
    this.pageSize = event.rows;
    this.currentPage = event.first/this.pageSize + 1;
  }

  newCustomerClicked(){
    this.editMode = false;
    this.heading = "New Customer";
    this.customerFirstName = "";
    this.customerLastName = "";
    this.customerPhone = "";
    this.billingAddress = new Address();
    this.shippingAddress = new Address();
    this.showNewCustomerDialog.set(true);
  }

  doneWithWithNewCustomerClicked(){
    this.showNewCustomerDialog.set(false);
    if (isEmpty(this.customerLastName) || isEmpty(this.customerPhone))    {
      this.notify.warn("Invalid Customer","The customer last name and phone number are both required to create a new customer!")
      return;
    }
    const custToCreate = this.getCustomerData();
    if (this.editMode){
      this.customerService.updateCustomer(custToCreate)
       .subscribe(()=>this.refresh());
    }else{
      this.customerService.createCustomer(custToCreate)
      .subscribe(()=>this.refresh());
    }
  }

  private getCustomerData():Customer {
    const custToPopulate = new Customer();
    custToPopulate.idValue = this.customerId || "";
    custToPopulate.firstName = this.customerFirstName;
    custToPopulate.lastName = this.customerLastName;
    custToPopulate.phoneNumber = this.customerPhone;
    custToPopulate.defaultBillingAddress1 = this.billingAddress.address1;
    custToPopulate.defaultBillingAddress2 = this.billingAddress.address2;
    custToPopulate.defaultBillingCity = this.billingAddress.city;
    custToPopulate.defaultBillingStateCode = this.billingAddress.stateCode;
    custToPopulate.defaultBillingZipCode = this.billingAddress.zipCode;
    if (this.shippingSameAsBilling) { // yea could have just reset the object
      custToPopulate.defaultShippingAddress1 = this.billingAddress.address1;
      custToPopulate.defaultShippingAddress2 = this.billingAddress.address2;
      custToPopulate.defaultShippingCity = this.billingAddress.city;
      custToPopulate.defaultShippingStateCode = this.billingAddress.stateCode;
      custToPopulate.defaultShippingZipCode = this.billingAddress.zipCode;

    } else {
      custToPopulate.defaultShippingAddress1 = this.shippingAddress.address1;
      custToPopulate.defaultShippingAddress2 = this.shippingAddress.address2;
      custToPopulate.defaultShippingCity = this.shippingAddress.city;
      custToPopulate.defaultShippingStateCode = this.shippingAddress.stateCode;
      custToPopulate.defaultShippingZipCode = this.shippingAddress.zipCode;
    }
    return custToPopulate;
  }

  private populateLocalCustomerData(custToPopulate:Customer){
    this.customerId = custToPopulate.idValue;
    this.customerFirstName = custToPopulate.firstName;
    this.customerLastName = custToPopulate.lastName;
    this.customerPhone = custToPopulate.phoneNumber
    this.billingAddress = new Address();
    this.shippingAddress = new Address();
    this.billingAddress.address1 = custToPopulate.defaultBillingAddress1;
    this.billingAddress.address2 = custToPopulate.defaultBillingAddress2;
    this.billingAddress.city = custToPopulate.defaultBillingCity;
    this.billingAddress.stateCode=custToPopulate.defaultBillingStateCode;
    this.billingAddress.zipCode = custToPopulate.defaultBillingZipCode;
    this.shippingAddress.address1 = custToPopulate.defaultShippingAddress1;
    this.shippingAddress.address2 = custToPopulate.defaultShippingAddress2;
    this.shippingAddress.city = custToPopulate.defaultShippingCity;
    this.shippingAddress.stateCode = custToPopulate.defaultShippingStateCode;
    this.shippingAddress.zipCode = custToPopulate.defaultShippingZipCode ;

  }

   done(event:any){
    this.router.navigate(["/home"]);
  }
}

