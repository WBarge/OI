import { Component, Input, OnInit, ChangeDetectionStrategy,inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { OptionService } from '../../services/option.service';
import { CharacteristicService } from '../../services/characteristic.service';
import { Product } from '../../models/results/product';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitterModule } from 'primeng/splitter';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ScrollAreaModule } from 'primeng/scrollarea';
import { ScrollArea, ScrollAreaViewport, ScrollAreaContent, ScrollAreaScrollbar, ScrollAreaHandle } from 'primeng/scrollarea';
import { SelectModule } from 'primeng/select';
import { OptionSelection } from '../../models/results/optionSelection';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Characteristic } from '../../models/results/characteristic';
import { ProductCharacteristic } from '../../models/results/product-characteristic';
import { CharacteristicValue } from '../../models/results/characteristic-value';
import { ProductSell } from '../../models/results/product-sell';

@Component({
    selector: 'app-product',
    imports: [InputTextModule,
    InputNumberModule,
    FormsModule,
    SplitterModule,
    TextareaModule,
    ButtonModule,
    ScrollAreaModule,
    ScrollArea,
    ScrollAreaViewport,
    ScrollAreaContent,
    ScrollAreaScrollbar,
    ScrollAreaHandle,
    DatePickerModule,
    SelectModule,
    FieldsetModule,
    ToolbarModule,
    IftaLabelModule],
    providers: [ProductService,OptionService],
    templateUrl: './product.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  @Input() set productId (productId:string){
      this.pId = productId;
  }
  private productService=inject(ProductService);
  private optionService=inject(OptionService);
  private characteristicService=inject(CharacteristicService);
  private msgService=inject(MessageService);
  private router=inject(Router);

  private pId:string = '';
  public _productObj:Product | null = null;
  public _optionsList: OptionSelection[] = [];
  public _chararcteristicList:Characteristic[] = [];
  public _characteristicValueList:CharacteristicValue[] = [];
  newProductOption: any ;
  newProductCharacteristic!:ProductCharacteristic;
  newSellProduct!:ProductSell;



constructor() {
    this.newProductOption = {
      optionId: '',
      price: 0,
    };
    this.newProductCharacteristic = new ProductCharacteristic();
    this.newProductCharacteristic.name = "";
    this.newProductCharacteristic.characteristicValue = "";
    this.newSellProduct = new ProductSell();
  }

  ngOnInit(): void {
    this.optionService.getSelectedOptions().subscribe({
      next: (options) => {
        this._optionsList = options;
      }
    });
    this.characteristicService.getCharacteristics().subscribe({
      next: (chars:Characteristic[])=>{
        this._chararcteristicList = chars;
      }
    });
    if (this.pId) {
      this.sendMessage('info','System Message','Loading Product');
      this.loadProduct();
    }
  }

  private loadProduct(){
      this.productService.getProductById(this.pId).subscribe({
        next: (product) => {
          this._productObj = product;
        }
      });

  }

  private sendMessage(severity:string,summary:string,detail:string){
    this.msgService.add({severity:severity,summary:summary,detail:detail});
  }

  submit(productToUpdate:Product){
    this.sendMessage('info','System Message','Updating Product');
    this.productService.updateProduct(productToUpdate)
    .subscribe({
      next:()=>{
        this.router.navigate(['/products']);
      }
    });

  }

  addOptionToProduct(newProductOption: any) {
    this.productService.addOptionToProduct(this.pId,newProductOption.optionId,newProductOption.price)
    .subscribe({
      next:()=>{
        this.loadProduct();
      }
    });
  }

  characteristicNameChange(event:any){
    const characteristicId = event.value;
    this.characteristicService.getCharacteristic(characteristicId)
      .subscribe({
        next:(result:Characteristic)=>{
          this._characteristicValueList = result.values
        }
      });
      var charObj = this._chararcteristicList.find(c=>c.idValue==characteristicId);
      this.newProductCharacteristic.name = charObj?.name ?? '';
  }

  characteristicValueChange(event:any){
    const characteristicValue = event.value;
    this.newProductCharacteristic.characteristicValue = characteristicValue;
  }

  addCharacteristicToProduct(newProductCharacteristic:ProductCharacteristic){
    this.productService.addCharacteristicToProduct(this.pId,newProductCharacteristic)
      .subscribe({
        next:()=>{
          this.loadProduct();
          this.newProductCharacteristic = new ProductCharacteristic();
          this.newProductCharacteristic.name = "";
          this.newProductCharacteristic.characteristicValue = "";
        }

      });
  }

  addSellToProduct(newSell:ProductSell){

    newSell.setStartAndEndFromRange();
    newSell.productId=this.pId;
    this.productService.addSellPeriodToProduct(newSell)
    .subscribe({
      next:()=>{
        this.loadProduct();
      }
    });
  }
}
