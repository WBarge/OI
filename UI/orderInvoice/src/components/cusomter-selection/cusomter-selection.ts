import { Component,inject } from '@angular/core';

import { CustomerService } from '../../services/customer-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { PhoneFormatPipe } from '../../pipes/phone-format-pipe';

import { ButtonDirective  } from 'primeng/button';
import { TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { FilterMetadata, MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';


import { CustomerSearch } from '../../model/results/customer-search';
import { CustomerListResult } from '../../model/results/customer-list-result';

@Component({
  selector: 'app-cusomter-selection',
  imports: [TableModule,
    ButtonDirective,
    PhoneFormatPipe,
    FieldsetModule,
    ToolbarModule],
  providers:[CustomerService,FilterTransformerService],
  styleUrl: './cusomter-selection.css',
  templateUrl: './cusomter-selection.html',
})
export class CusomterSelection {

  private msgService=inject(MessageService);
  private customerService = inject(CustomerService);
  private filterTransformer=inject(FilterTransformerService);

  customers!:CustomerSearch[];
  currentPage:number =1;
  pageSize:number = 10;
  totalItems:number = 0;
  filters?: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  loadCustomers(){
    this.sendMessage('info','System Message','Loading Customers');
    var transFormedFilters = this.filterTransformer?.transformGridFilters(this.filters);
    this.customerService.getCustomers(this.currentPage,this.pageSize,transFormedFilters)
      .subscribe((results:CustomerListResult)=>{
        this.customers = results.data;
        this.totalItems = results.totalRecordSize
      });
  }

  loadCustomersLazy(event: TableLazyLoadEvent) {
    this.filters = event.filters;
    this.loadCustomers();
  }

  pageChange(event:TablePageEvent){
    this.pageSize = event.rows;
    this.currentPage = event.first/this.pageSize + 1;
  }

  private sendMessage(severity:string,summary:string,detail:string){
    this.msgService.add({severity:severity,summary:summary,detail:detail});
  }

}
