import { Component, OnInit, ChangeDetectionStrategy,inject } from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import { FilterMetadata, MessageService } from 'primeng/api';
import { OptionService } from '../../services/option.service';
import { OptionListResult } from '../../models/results/OptionListResult';
import { Option } from '../../models/results/option';
import { TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonDirective  } from 'primeng/button';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';


@Component({
  selector: 'app-option-list',
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
  providers: [OptionService, FilterTransformerService],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './option-list.component.css',
  templateUrl: './option-list.component.html',
})
export class OptionListComponent implements OnInit {
  options!:Option[];
  currentPage:number =1;
  pageSize:number = 10;
  totalItems:number = 0;
  filters?: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  private msgService=inject(MessageService);
  private dataService=inject(OptionService);
  private filterTransformer=inject(FilterTransformerService);

  newOption: Option;

  constructor(){
    this.newOption = new Option();
  }

  public ngOnInit(): void {

  }

  private sendMessage(severity:string,summary:string,detail:string){
    this.msgService.add({severity:severity,summary:summary,detail:detail});
  }

  submit(optionToAdd:Option){
    this.dataService.add(optionToAdd).subscribe((newId:any) => {
      optionToAdd.idValue = newId;
      this.options = [...this.options,optionToAdd];
      this.newOption = new Option();
    });
  }

  loadOptions(){
    this.sendMessage('info','System Message','Loading Products');
    var transFormedFilters = this.filterTransformer?.transformGridFilters(this.filters);
    this.dataService.getOptions(this.currentPage,this.pageSize,transFormedFilters)
      .subscribe((results:OptionListResult)=>{
        this.options = results.data;
        this.totalItems = results.totalRecordSize;
      });
  }

  loadOptionsLazy(event: TableLazyLoadEvent) {
    this.filters = event.filters;
    this.loadOptions();
  }

  pageChange(event:TablePageEvent){
    this.pageSize = event.rows;
    this.currentPage = event.first/this.pageSize + 1;
  }

  delete(optionToDelete:Option){
      this.dataService?.deleteOption(optionToDelete).subscribe(()=>{
        this.options = this.options.filter(p=>p.idValue!= optionToDelete.idValue);
      });
    }
}
