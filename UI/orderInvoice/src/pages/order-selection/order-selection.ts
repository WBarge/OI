import { Component,inject,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { FilterMetadata } from 'primeng/api';
import { TableLazyLoadEvent, TableModule, TablePageEvent,TableRowSelectEvent } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { NotificationService } from '../../utils/notification-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { OrdersService } from '../../services/orders-service';

import { PhoneFormatPipe } from '../../pipes/phone-format-pipe'

import { OrderSearch } from '../../model/results/order-search';
import { OrderListResult } from '../../model/results/order-list-result';


@Component({
  imports: [TableModule,
        CurrencyPipe,
        DatePipe,
        PhoneFormatPipe,
        FieldsetModule,
        ToolbarModule,
        IftaLabelModule,
        InputTextModule,
        FormsModule,
        InputNumberModule],
  providers: [FilterTransformerService,OrdersService],
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-order-selection',
  styleUrl: './order-selection.css',
  templateUrl: './order-selection.html',
})
export class OrderSelection {
  private notify=inject(NotificationService);
  private router = inject(Router);

  orders!:OrderSearch[];
  currentPage:number =1;
  pageSize:number = 10;
  totalItems:number = 0;
  filters?: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  private dataService=inject(OrdersService);
  private filterTransformer=inject(FilterTransformerService);


  constructor()  {
  }


  loadOrders(){
    this.notify.info('System Message','Loading Orders');
      var transFormedFilters = this.filterTransformer?.transformGridFilters(this.filters);
    this.dataService.getOrders(this.currentPage,this.pageSize,transFormedFilters)
      .subscribe((results:OrderListResult)=>{
        this.orders = results.data;
        this.totalItems = results.totalRecordSize
      });
  }

  loadOrdersLazy(event: TableLazyLoadEvent) {
    this.filters = event.filters;
    this.loadOrders();
  }

  pageChange(event:TablePageEvent){
    this.pageSize = event.rows;
    this.currentPage = event.first/this.pageSize + 1;
  }

  onSelect(event:TableRowSelectEvent){
      var id = event.data.idValue;
      this.router.navigate(["/orderInvoice",id]);
  }

}
