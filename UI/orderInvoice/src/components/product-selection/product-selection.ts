import { Component,output,inject,ChangeDetectionStrategy } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NotificationService } from '../../utils/notification-service';
import { ProductService } from '../../services/product.service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';

import { FilterMetadata } from 'primeng/api';
import { TableLazyLoadEvent, TableModule, TablePageEvent,TableRowSelectEvent } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { ProductsListResult } from '../../model/results/productsListResult';
import { Product } from '../../model/results/product';


@Component({
  selector: 'app-product-selection',
  styleUrl: './product-selection.css',
  templateUrl: './product-selection.html',
  imports: [TableModule,
        CurrencyPipe,
        FieldsetModule,
        ToolbarModule,
        IftaLabelModule,
        InputTextModule,
        FormsModule,
        InputNumberModule],
    providers: [ProductService, FilterTransformerService],
    changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductSelection {
  selectedProduct = output<Product>();

  private notify=inject(NotificationService);

  products!:Product[];
  currentPage:number =1;
  pageSize:number = 10;
  totalItems:number = 0;
  filters?: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  private dataService=inject(ProductService);
  private filterTransformer=inject(FilterTransformerService);


  constructor()  {
  }


  loadProducts(){
    this.notify.info('System Message','Loading Products');
    var transFormedFilters = this.filterTransformer?.transformGridFilters(this.filters);
    this.dataService.getProducts(this.currentPage,this.pageSize,transFormedFilters)
      .subscribe((results:ProductsListResult)=>{
        this.products = results.data;
        this.totalItems = results.totalRecordSize
      });
  }

  loadProductsLazy(event: TableLazyLoadEvent) {
    this.filters = event.filters;
    this.loadProducts();
  }

  pageChange(event:TablePageEvent){
    this.pageSize = event.rows;
    this.currentPage = event.first/this.pageSize + 1;
  }

  onSelect(event:TableRowSelectEvent){
      this.selectedProduct.emit(event.data);
    }

}
