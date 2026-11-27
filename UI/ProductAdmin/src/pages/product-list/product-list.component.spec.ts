import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list.component';
import { createSpyFromClass, createSpyObj, Spy } from '../../testing/spy-helper';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { Product } from '../../models/results/product';
import { ProductsListResult } from '../../models/results/productsListResult';
import { of } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';

describe('ProductListComponent', () => {
  let msgServcie: Spy<MessageService>;
  let routerLink: Spy<ActivatedRoute>;
  let httpClientSpy=  createSpyObj(['post']);// Spy<HttpClient>;
  let productServiceSpy  =  createSpyObj(['getProducts']);
  let filterService: Spy<FilterTransformerService>;
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let fakeProducts:Product[] =[
    {
      idValue:"testId1",
      name:"test name",
      shortDescription:"testshortdescrip",
      sku:"testsku",
      price:23.43,
      description:"TestDescription"
    },
    {
      idValue:"testId2",
      name:"test name",
      shortDescription:"testshortdescrip",
      sku:"testsku",
      price:23.43,
      description:"TestDescription"

    }
  ] as Product[];
  let fakeGetResult :ProductsListResult =
  {
    data:fakeProducts,
    totalRecordSize:2
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers:[provideAnimations(),
        {provide:ActivatedRoute, useValue: createSpyFromClass(ActivatedRoute)},
        {provide:MessageService, useValue: createSpyFromClass(MessageService)},
        {provide:HttpClient, useValue: httpClientSpy},
        {provide:ProductService, useValue: productServiceSpy},
        {provide:FilterTransformerService, useValue: createSpyFromClass(FilterTransformerService)}

      ]
    })
    // the page lists its own ProductService and FilterTransformerService, which would otherwise win over the stand-ins above
    .overrideComponent(ProductListComponent, { set: { providers: [
      {provide:ProductService, useValue: productServiceSpy},
      {provide:FilterTransformerService, useValue: createSpyFromClass(FilterTransformerService)}
    ] } })
    .compileComponents();

    msgServcie = TestBed.inject<any>(MessageService);
    httpClientSpy = TestBed.inject<any>(HttpClient);
    productServiceSpy = TestBed.inject<any>(ProductService);
    filterService = TestBed.inject<any>(FilterTransformerService);
    fixture = TestBed.createComponent(ProductListComponent);
  });


  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load products automatically', async () => {
    httpClientSpy.post.mockReturnValue(of(fakeGetResult));
    productServiceSpy.getProducts.mockReturnValue(of(fakeGetResult));
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products.length).toEqual(fakeGetResult.data.length)
    expect(component.products[0].idValue).toEqual(fakeGetResult.data[0].idValue);
    expect(component.totalItems).toEqual(fakeGetResult.totalRecordSize);
  });
});
