import { Component,output,inject,ChangeDetectionStrategy } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NotificationService } from '../../utils/notification-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';

import { FilterMetadata } from 'primeng/api';
import { TableLazyLoadEvent, TableModule, TablePageEvent,TableRowSelectEvent } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  imports: [TableModule,
        CurrencyPipe,
        FieldsetModule,
        ToolbarModule,
        IftaLabelModule,
        InputTextModule,
        FormsModule,
        InputNumberModule],
    providers: [FilterTransformerService],
  selector: 'app-order-selection',
  styleUrl: './order-selection.css',
  templateUrl: './order-selection.html',
})
export class OrderSelection {
  private notify=inject(NotificationService);

    products!:any[];
    currentPage:number =1;
    pageSize:number = 10;
    totalItems:number = 0;
    filters?: {
      [s: string]: FilterMetadata | FilterMetadata[] | undefined;
    };

    //private dataService=inject(ProductService);
    private filterTransformer=inject(FilterTransformerService);

      constructor()  {
      }


      loadOrders(){
        this.notify.info('System Message','Loading Orders');
        // var transFormedFilters = this.filterTransformer?.transformGridFilters(this.filters);
        // this.dataService.getProducts(this.currentPage,this.pageSize,transFormedFilters)
        //   .subscribe((results:ProductsListResult)=>{
        //     this.products = results.data;
        //     this.totalItems = results.totalRecordSize
        //   });
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
          //this.selectedProduct.emit(event.data);
        }

}
