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



//currently does not support update functionality
//may want to add it here or in a seperate page that the menu shows


@Component({
  selector: 'app-customer-selection',
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
  styleUrl: './customer-selection.css',
  templateUrl: './customer-selection.html',
})
export class CustomerSelection implements OnInit{

  private notify=inject(NotificationService);
  private customerService = inject(CustomerService);
  private filterTransformer=inject(FilterTransformerService);
  private configService = inject(ConfigService);

  public configuration = signal<Configuration | null>(null);
  public showNewCustomerDialog:boolean = false;


  selectedCustomer = output<CustomerSearch>();

  customers= signal<CustomerSearch[]>([]);
  currentPage:number =1;
  pageSize:number = 10;
  totalItems:number = 0;
  filters?: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  public customerFirstName: string = "";
  public customerLastName: string = "";
  public customerPhone: string = "";
  public billingAddress:Address = new Address();
  public shippingAddress:Address = new Address();
  public shippingSameAsBilling:boolean = false;


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
    this.selectedCustomer.emit(event.data);
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
    this.customerFirstName = "";
    this.customerLastName = "";
    this.customerPhone = "";
    this.billingAddress = new Address();
    this.shippingAddress = new Address();
    this.showNewCustomerDialog = true;
  }

  doneWithWithNewCustomerClicked(){
    this.showNewCustomerDialog = false;
    if (isEmpty(this.customerLastName) || isEmpty(this.customerPhone))    {
      this.notify.warn("Invalid Customer","The customer last name and phone number are both required to create a new customer!")
      return;
    }
    const custToCreate = new Customer();
    custToCreate.firstName = this.customerFirstName;
    custToCreate.lastName = this.customerLastName;
    custToCreate.phoneNumber = this.customerPhone;
    custToCreate.defaultBillingAddress1 = this.billingAddress.address1;
    custToCreate.defaultBillingAddress2 = this.billingAddress.address2;
    custToCreate.defaultBillingCity = this.billingAddress.city;
    custToCreate.defaultBillingStateCode = this.billingAddress.stateCode;
    custToCreate.defaultBillingZipCode = this.billingAddress.zipCode;
    if (this.shippingSameAsBilling){ // yea could have just reset the object
      custToCreate.defaultShippingAddress1 = this.billingAddress.address1;
      custToCreate.defaultShippingAddress2 = this.billingAddress.address2;
      custToCreate.defaultShippingCity = this.billingAddress.city;
      custToCreate.defaultShippingStateCode = this.billingAddress.stateCode;
      custToCreate.defaultShippingZipCode = this.billingAddress.zipCode;

    }else{
      custToCreate.defaultShippingAddress1 = this.shippingAddress.address1;
      custToCreate.defaultShippingAddress2 = this.shippingAddress.address2;
      custToCreate.defaultShippingCity = this.shippingAddress.city;
      custToCreate.defaultShippingStateCode = this.shippingAddress.stateCode;
      custToCreate.defaultShippingZipCode = this.shippingAddress.zipCode;
    }
    this.customerService.createCustomer(custToCreate)
    .subscribe(()=>this.refresh());
  }

}
