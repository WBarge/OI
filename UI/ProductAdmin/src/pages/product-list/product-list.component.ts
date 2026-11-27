import { Component, OnInit, ChangeDetectionStrategy,inject } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { FilterMetadata, MessageService } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { ProductsListResult } from '../../models/results/productsListResult';
import { TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonDirective  } from 'primeng/button';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { Product } from '../../models/results/product';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';


@Component({
    selector: 'app-product-list',
    imports: [TableModule,
        ButtonDirective ,
        CurrencyPipe,
        FieldsetModule,
        ToolbarModule,
        IftaLabelModule,
        InputTextModule,
        FormsModule,
        RouterLink,
        InputNumberModule,
        Trash,
        Pencil],
    providers: [ProductService, FilterTransformerService],
    templateUrl: './product-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit{
  products!:Product[];
  currentPage:number =1;
  pageSize:number = 10;
  totalItems:number = 0;
  filters?: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  private msgService=inject(MessageService);
  private dataService=inject(ProductService);
  private filterTransformer=inject(FilterTransformerService);

  newProduct: Product;

  constructor()  {
      this.newProduct = new Product();
    }

  public ngOnInit(): void {

  }

  loadProducts(){
    this.sendMessage('info','System Message','Loading Products');
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

  submit(productToAdd:Product){
    this.dataService.quickAdd(productToAdd).subscribe((newId:any)=>{
      productToAdd.idValue = newId;
      this.products.push(productToAdd);
    });
    this.newProduct = new Product();
  }

  delete(productToDelete:Product){

    this.dataService?.deleteProduct(productToDelete).subscribe(()=>{
      this.products = this.products.filter(p=>p.idValue!= productToDelete.idValue);
    });
  }

  private sendMessage(severity:string,summary:string,detail:string){
    this.msgService.add({severity:severity,summary:summary,detail:detail});
  }
}
