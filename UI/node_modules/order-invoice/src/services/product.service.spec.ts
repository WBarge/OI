import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { vi } from 'vitest';
import { ProductService } from './product.service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { Product } from '../model/results/product';
import { ProductsListResult } from '../model/results/productsListResult';
import { ProductCharacteristic } from '../model/results/product-characteristic';
import { ProductOption } from '../model/results/ProductOption';
import { ProductSell } from '../model/results/product-sell';
import { FilterDictionary } from '../model/requests/filter-detail';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  const apiUrl = 'https://products.test/api/';
  const productsUrl = `${apiUrl}Products`;
  const productUrl = `${apiUrl}Product`;

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { productApiUrl: apiUrl });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: configuration } }
      ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  function buildProduct(): Product {
    const characteristic = Object.assign(new ProductCharacteristic(), {
      idValue: 'pc-1', productId: 'ignored', name: 'Color', characteristicValue: 'Red'
    });
    const option = Object.assign(new ProductOption(), {
      idValue: 'po-1', optionId: 'opt-1', name: 'Gift wrap', price: 3.5
    });
    const sell = Object.assign(new ProductSell(), {
      idValue: 's-1', productId: 'p-1', start: new Date('2026-01-01'), end: new Date('2026-02-01'), price: 8
    });
    return Object.assign(new Product(), {
      idValue: 'p-1', name: 'Widget', shortDescription: 'short', sku: 'W-1', price: 10, cost: 4,
      estimated: 6, description: 'long', characteristics: [characteristic], options: [option], sells: [sell]
    });
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should POST to the Products endpoint with page 1, page size 10 and no filters by default', () => {
      service.getProducts().subscribe();

      const request = httpTestingController.expectOne(productsUrl);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({ page: 1, pageSize: 10, filters: null });
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should send the requested page, page size and filters', () => {
      const filters: FilterDictionary = new Map([
        ['Name', [{ searchValue: 'wid', matchMode: 'contains', logicalOperator: 'and' }]]
      ]);

      service.getProducts(2, 50, filters).subscribe();

      const request = httpTestingController.expectOne(productsUrl);
      expect(request.request.body).toEqual({
        page: 2,
        pageSize: 50,
        filters: { Name: [{ searchValue: 'wid', matchMode: 'contains', logicalOperator: 'and' }] }
      });
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should send an empty filter dictionary as no filters', () => {
      service.getProducts(1, 10, new Map() as FilterDictionary).subscribe();

      const request = httpTestingController.expectOne(productsUrl);
      expect(request.request.body.filters).toBeNull();
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should map the response to a ProductsListResult of Product objects', () => {
      const result = vi.fn();
      service.getProducts().subscribe(result);

      httpTestingController.expectOne(productsUrl).flush({
        totalRecordSize: 7,
        data: [{ id: 'p-1', name: 'Widget', shortDescription: 'short', sku: 'W-1', price: 10, description: 'long' }]
      });

      const list: ProductsListResult = result.mock.calls[0][0];
      expect(list).toBeInstanceOf(ProductsListResult);
      expect(list.totalRecordSize).toBe(7);
      expect(list.data).toHaveLength(1);
      expect(list.data[0]).toBeInstanceOf(Product);
      expect(list.data[0]).toEqual(expect.objectContaining({
        idValue: 'p-1', name: 'Widget', shortDescription: 'short', sku: 'W-1', price: 10, description: 'long'
      }));
    });

    it('should show an error toast and emit a safe value when the call fails', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();

      service.getProducts().subscribe(next);
      httpTestingController.expectOne(productsUrl)
        .flush({ message: 'boom' }, { status: 500, statusText: 'Internal Server Error' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: 'ProductService: getProducts failed: boom'
      }));
      expect(next).toHaveBeenCalledWith({});
    });
  });

  describe('getProductById', () => {
    const serverProduct = {
      id: 'p-1', name: 'Widget', shortDescription: 'short', sku: 'W-1', price: 10, cost: 4, estimated: 6,
      description: 'long',
      options: [{ id: 'po-1', optionId: 'opt-1', productId: 'p-1', name: 'Gift wrap', price: 3.5 }],
      characteristics: [{ id: 'pc-1', productId: 'p-1', name: 'Color', characteristicValue: 'Red' }],
      sells: [{ id: 's-1', productId: 'p-1', start: '2026-01-01T00:00:00Z', end: '2026-02-01T00:00:00Z', price: 8 }]
    };

    it('should GET the product by id', () => {
      service.getProductById('p-1').subscribe();

      const request = httpTestingController.expectOne(`${productUrl}/p-1`);
      expect(request.request.method).toBe('GET');
      request.flush(serverProduct);
    });

    it('should map the product including cost and estimated', () => {
      const result = vi.fn();
      service.getProductById('p-1').subscribe(result);
      httpTestingController.expectOne(`${productUrl}/p-1`).flush(serverProduct);

      const product: Product = result.mock.calls[0][0];
      expect(product).toBeInstanceOf(Product);
      expect(product).toEqual(expect.objectContaining({
        idValue: 'p-1', name: 'Widget', shortDescription: 'short', sku: 'W-1',
        price: 10, cost: 4, estimated: 6, description: 'long'
      }));
    });

    it('should map the options', () => {
      const result = vi.fn();
      service.getProductById('p-1').subscribe(result);
      httpTestingController.expectOne(`${productUrl}/p-1`).flush(serverProduct);

      const [option] = (result.mock.calls[0][0] as Product).options;
      expect(option).toBeInstanceOf(ProductOption);
      expect(option).toEqual(expect.objectContaining({
        idValue: 'po-1', optionId: 'opt-1', productId: 'p-1', name: 'Gift wrap', price: 3.5
      }));
    });

    it('should map the characteristics', () => {
      const result = vi.fn();
      service.getProductById('p-1').subscribe(result);
      httpTestingController.expectOne(`${productUrl}/p-1`).flush(serverProduct);

      const [characteristic] = (result.mock.calls[0][0] as Product).characteristics;
      expect(characteristic).toBeInstanceOf(ProductCharacteristic);
      expect(characteristic).toEqual(expect.objectContaining({
        idValue: 'pc-1', productId: 'p-1', name: 'Color', characteristicValue: 'Red'
      }));
    });

    it('should map the sells and turn the start and end into dates and a date range', () => {
      const result = vi.fn();
      service.getProductById('p-1').subscribe(result);
      httpTestingController.expectOne(`${productUrl}/p-1`).flush(serverProduct);

      const [sell] = (result.mock.calls[0][0] as Product).sells;
      expect(sell).toBeInstanceOf(ProductSell);
      expect(sell.idValue).toBe('s-1');
      expect(sell.productId).toBe('p-1');
      expect(sell.price).toBe(8);
      expect(sell.start).toEqual(new Date('2026-01-01T00:00:00Z'));
      expect(sell.end).toEqual(new Date('2026-02-01T00:00:00Z'));
      expect(sell.rangeDates).toEqual([sell.start, sell.end]);
    });

    it('should map a product that has no options, characteristics or sells', () => {
      const result = vi.fn();
      service.getProductById('p-1').subscribe(result);
      httpTestingController.expectOne(`${productUrl}/p-1`)
        .flush({ ...serverProduct, options: [], characteristics: [], sells: [] });

      const product: Product = result.mock.calls[0][0];
      expect(product.options).toEqual([]);
      expect(product.characteristics).toEqual([]);
      expect(product.sells).toEqual([]);
    });

    it('should show an error toast and emit a safe value when the product is not found', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();

      service.getProductById('missing').subscribe(next);
      httpTestingController.expectOne(`${productUrl}/missing`)
        .flush(null, { status: 404, statusText: 'Not Found' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        severity: 'error',
        detail: 'ProductService: getProductById failed: server returned code 404'
      }));
      expect(next).toHaveBeenCalledWith({});
    });
  });

  describe('quickAdd', () => {
    it('should POST the product to Product/QuickAdd', () => {
      const product = buildProduct();
      service.quickAdd(product).subscribe();

      const request = httpTestingController.expectOne(`${productUrl}/QuickAdd`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(product);
      request.flush({});
    });
  });

  describe('deleteProduct', () => {
    it('should DELETE Product/{id}', () => {
      service.deleteProduct(buildProduct()).subscribe();

      const request = httpTestingController.expectOne(`${productUrl}/p-1`);
      expect(request.request.method).toBe('DELETE');
      request.flush({});
    });
  });

  describe('updateProduct', () => {
    it('should PUT the product to the Product endpoint', () => {
      service.updateProduct(buildProduct()).subscribe();

      const request = httpTestingController.expectOne(productUrl);
      expect(request.request.method).toBe('PUT');
      request.flush({});
    });

    it('should send the product with its children reshaped for the backend', () => {
      const product = buildProduct();
      service.updateProduct(product).subscribe();

      const request = httpTestingController.expectOne(productUrl);
      expect(request.request.body).toEqual({
        id: 'p-1',
        name: 'Widget',
        shortDescription: 'short',
        sku: 'W-1',
        price: 10,
        cost: 4,
        estimated: 6,
        description: 'long',
        // children always carry the id of the product being saved, not the one stored on the child
        characteristics: [{ id: 'pc-1', productId: 'p-1', name: 'Color', characteristicValue: 'Red' }],
        options: [{ id: 'po-1', productId: 'p-1', optionId: 'opt-1', price: 3.5, name: 'Gift wrap' }],
        sells: [{
          id: 's-1',
          productId: 'p-1',
          start: new Date('2026-01-01'),
          end: new Date('2026-02-01'),
          period: { start: new Date('2026-01-01'), end: new Date('2026-02-01') },
          price: 8
        }]
      });
      request.flush({});
    });

    it('should send empty child collections when the product has none', () => {
      const product = Object.assign(buildProduct(), { characteristics: [], options: [], sells: [] });
      service.updateProduct(product).subscribe();

      const request = httpTestingController.expectOne(productUrl);
      expect(request.request.body.characteristics).toEqual([]);
      expect(request.request.body.options).toEqual([]);
      expect(request.request.body.sells).toEqual([]);
      request.flush({});
    });
  });

  describe('characteristics', () => {
    it('should POST a new characteristic as name and value', () => {
      const characteristic = Object.assign(new ProductCharacteristic(), { name: 'Color', characteristicValue: 'Red' });
      service.addCharacteristicToProduct('p-1', characteristic).subscribe();

      const request = httpTestingController.expectOne(`${productUrl}/p-1/Characteristic`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({ name: 'Color', value: 'Red' });
      request.flush({});
    });

    it('should DELETE a characteristic from a product', () => {
      service.deleteCharacteristicFromProduct('p-1', 'pc-9').subscribe();

      const request = httpTestingController.expectOne(`${productUrl}/p-1/Characteristic/pc-9`);
      expect(request.request.method).toBe('DELETE');
      request.flush({});
    });
  });

  describe('options', () => {
    it('should POST the price override to Product/{id}/Option/{optionId}', () => {
      service.addOptionToProduct('p-1', 'opt-1', 12.5).subscribe();

      const request = httpTestingController.expectOne(`${productUrl}/p-1/Option/opt-1`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(12.5);
      request.flush({});
    });

    it('should DELETE an option from a product', () => {
      service.deleteOptionFromProduct('p-1', 'po-9').subscribe();

      const request = httpTestingController.expectOne(`${productUrl}/p-1/Option/po-9`);
      expect(request.request.method).toBe('DELETE');
      request.flush({});
    });
  });

  describe('error handling for the write operations', () => {
    const product = () => buildProduct();
    const characteristic = () => Object.assign(new ProductCharacteristic(), { name: 'n', characteristicValue: 'v' });

    const cases: { name: string; call: (s: ProductService) => Observable<any>; url: string }[] = [
      { name: 'quickAdd', call: s => s.quickAdd(product()), url: `${productUrl}/QuickAdd` },
      { name: 'deleteProduct', call: s => s.deleteProduct(product()), url: `${productUrl}/p-1` },
      { name: 'updateProduct', call: s => s.updateProduct(product()), url: productUrl },
      { name: 'addCharacteristicToProduct', call: s => s.addCharacteristicToProduct('p-1', characteristic()), url: `${productUrl}/p-1/Characteristic` },
      { name: 'deleteCharacteristicFromProduct', call: s => s.deleteCharacteristicFromProduct('p-1', 'c-1'), url: `${productUrl}/p-1/Characteristic/c-1` },
      { name: 'addOptionToProduct', call: s => s.addOptionToProduct('p-1', 'o-1', 1), url: `${productUrl}/p-1/Option/o-1` },
      { name: 'deleteOptionFromProduct', call: s => s.deleteOptionFromProduct('p-1', 'o-1'), url: `${productUrl}/p-1/Option/o-1` }
    ];

    it.each(cases)('$name should show a toast naming the operation and emit a safe value', ({ name, call, url }) => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const complete = vi.fn();

      call(service).subscribe({ next, complete });
      httpTestingController.expectOne(url)
        .flush({ message: 'nope' }, { status: 500, statusText: 'Internal Server Error' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: `ProductService: ${name} failed: nope`
      }));
      expect(next).toHaveBeenCalledWith({});
      expect(complete).toHaveBeenCalledTimes(1);
    });
  });
});
