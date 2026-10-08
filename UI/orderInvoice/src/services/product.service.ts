import { Service,inject } from '@angular/core';
import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { catchError, map, Observable } from 'rxjs';
import { ProductsListResult } from '../model/results/productsListResult';
import { FilterDetail, FilterDictionary } from '../model/requests/filter-detail';
import { ListRequest } from '../model/requests/list-request';
import { Product } from '../model/results/product';
import { ProductCharacteristic } from '../model/results/product-characteristic';
import { ProductOption } from '../model/results/ProductOption';
import { ProductSell } from '../model/results/product-sell';


@Service()
export class ProductService {
  private http=inject(HttpClient);
  private configService = inject(ConfigService);
  private httpErrorHandler=inject( ErrorHandlerService);

  private productsServiceLocation:string = "";
  private productServiceLocation:string = "";
  private productCharacteristicSubLocation:string= "";
  private productOptionSubLocation:string= "";

  private handleError: HandleError;



  constructor() {
    this.configService.getConfiguration()
      .subscribe((config: Configuration) => {
        this.productsServiceLocation = config.productApiUrl + 'Products';
        this.productServiceLocation = config.productApiUrl + 'Product';
        this.productCharacteristicSubLocation = "Characteristic"
        this.productOptionSubLocation = "Option";
      });

    this.handleError = this.httpErrorHandler.createHandleError('ProductService');
  }

  getProducts( currentPage: number =1 ,
                pageSize: number = 10 ,
                filters?:FilterDictionary
              ):Observable<ProductsListResult>{
    var filtersAsObject:any = null;
    if(filters && filters?.size>0){
      filtersAsObject = {};
      filters?.forEach((value:FilterDetail[],key:string)=>{
        var tempObj = {[key]:value};
        filtersAsObject = Object.assign(filtersAsObject,tempObj);
      });
    }

    var request:ListRequest = {
      page: currentPage,
      pageSize: pageSize,
      filters:  filtersAsObject
    };
    return this.http.post<ProductsListResult>(this.productsServiceLocation,request)
      .pipe(
        map((results:any) => {
          const returnValue = new ProductsListResult();
          returnValue.totalRecordSize = results.totalRecordSize;
          returnValue.data = results.data.map((product:any) => {
            const tempProduct = new Product();
            tempProduct.idValue = product.id;
            tempProduct.name = product.name;
            tempProduct.shortDescription = product.shortDescription;
            tempProduct.sku = product.sku;
            tempProduct.price = product.price;
            tempProduct.description = product.description;
            return tempProduct;
          });
          return returnValue;
        }),
        catchError(this.handleError<ProductsListResult>('getProducts'))
      );
  }

  getProductById(productId:string):Observable<Product>{
    var requestURl = this.productServiceLocation+'/'+productId;
    return this.http.get<Product>(requestURl)
    .pipe(
      map((product:any) => {
        const tempProduct = new Product();
        tempProduct.idValue = product.id;
        tempProduct.name = product.name;
        tempProduct.shortDescription = product.shortDescription;
        tempProduct.sku = product.sku;
        tempProduct.price = product.price;
        tempProduct.cost = product.cost;
        tempProduct.estimated = product.estimated;
        tempProduct.description = product.description;
        tempProduct.options = product.options.map((option:any)=>{
          const tempOption = new ProductOption();
          tempOption.idValue =option.id;
          tempOption.optionId = option.optionId;
          tempOption.productId = option.productId;
          tempOption.name = option.name,
          tempOption.price = option.price;
          return tempOption;
        }),
        tempProduct.characteristics = product.characteristics.map((char:any)=>{
          const tempChar = new ProductCharacteristic();
          tempChar.idValue = char.id;
          tempChar.productId = char.productId;
          tempChar.name = char.name;
          tempChar.characteristicValue = char.characteristicValue;
          return tempChar;
        });
        tempProduct.sells = product.sells.map((sell:any)=>{
          const tempSell = new ProductSell();
          tempSell.idValue = sell.id;
          tempSell.productId = sell.productId;
          tempSell.start = new Date(sell.start);
          tempSell.end = new Date(sell.end);
          tempSell.rangeDates = [tempSell.start,tempSell.end];
          tempSell.price = sell.price;
          return tempSell;
        });
        return tempProduct;
      }),
      catchError(this.handleError<Product>('getProductById'))
    )
  }

  quickAdd(newProduct:Product):Observable<any>{
    return this.http.post(this.productServiceLocation+'/QuickAdd',newProduct)
    .pipe(
      catchError(this.handleError<any>('quickAdd'))
    );
  }

  deleteProduct(productToDelete:Product):Observable<any> {
    var requestURl = this.productServiceLocation+'/'+productToDelete.idValue;
    return this.http.delete(requestURl).pipe(catchError(this.handleError<any>('deleteProduct')));
  }

  updateProduct(productToUpdate:Product):Observable<any>{
    const url=this.productServiceLocation;
    const requestObj={
      id: productToUpdate.idValue,
      name: productToUpdate.name,
      shortDescription:productToUpdate.shortDescription,
      sku:productToUpdate.sku,
      price:productToUpdate.price,
      cost:productToUpdate.cost,
      estimated: productToUpdate.estimated,
      description:productToUpdate.description,
      characteristics: productToUpdate.characteristics.map ((prodChar:ProductCharacteristic)=>{
         return {
          id: prodChar.idValue,
          productId:productToUpdate.idValue,
          name:prodChar.name,
          characteristicValue:prodChar.characteristicValue
         }
      }),
      options: productToUpdate.options.map((prodOption:ProductOption)=>{
        return {
          id:prodOption.idValue,
          productId: productToUpdate.idValue,
          optionId: prodOption.optionId,
          price: prodOption.price,
          name: prodOption.name
        }
      }),
      sells: productToUpdate.sells.map((sell:ProductSell)=>{
        return {
          id: sell.idValue,
          productId: sell.productId,
          start: sell.start,
          end: sell.end,
          period: {
            start: sell.start,
            end: sell.end
          },
          price: sell.price
        }
      })
    }
    return this.http.put(url,requestObj)
    .pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  addCharacteristicToProduct(productId:string,prodChar:ProductCharacteristic):Observable<any>{
    const url = this.productServiceLocation+'/'+productId+'/'+ this.productCharacteristicSubLocation;
    const requst = {
      name:prodChar.name,
      value:prodChar.characteristicValue
    };
    return this.http.post(url,requst)
    .pipe(
      catchError(this.handleError<any>('addCharacteristicToProduct'))
    );
  }

  deleteCharacteristicFromProduct(productId:string,productChacacteristicId:string):Observable<any>{
    const url = this.productServiceLocation+'/'+productId+'/'+ this.productCharacteristicSubLocation+'/'+productChacacteristicId;
    return this.http.delete(url).pipe(catchError(this.handleError<any>('deleteCharacteristicFromProduct')));
  }

  addOptionToProduct(productId:string,optionId:string,priceOverride:number):Observable<any>{
    const url = this.productServiceLocation+'/'+productId+'/'+ this.productOptionSubLocation+'/'+optionId;
    return this.http.post(url,priceOverride)
    .pipe(
      catchError(this.handleError<any>('addOptionToProduct'))
    );
  }

  deleteOptionFromProduct(productId:string,productOptionId:string):Observable<any>{
    const url = this.productServiceLocation+'/'+productId+'/'+ this.productOptionSubLocation+'/'+productOptionId;
    return this.http.delete(url).pipe(catchError(this.handleError<any>('deleteOptionFromProduct')));

  }

}
