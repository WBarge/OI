import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterMetadata, MessageService } from 'primeng/api';
import { TableLazyLoadEvent, TablePageEvent, TableRowSelectEvent } from 'primeng/table';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';
import { ProductSelection } from './product-selection';
import { ProductService } from '../../services/product.service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { Product } from '../../model/results/product';
import { ProductsListResult } from '../../model/results/productsListResult';

describe('ProductSelection', () => {
  let component: ProductSelection;
  let fixture: ComponentFixture<ProductSelection>;
  let messageService: MessageService;
  let getProducts: ReturnType<typeof vi.fn>;

  const widget = Object.assign(new Product(), {
    idValue: '1', sku: 'W-100', name: 'Widget', shortDescription: 'A small widget', price: 10.5
  });
  const gadget = Object.assign(new Product(), {
    idValue: '2', sku: 'G-200', name: 'Gadget', shortDescription: 'A large gadget', price: 1234.5
  });
  const page = Object.assign(new ProductsListResult(), { data: [widget, gadget], totalRecordSize: 42 });

  async function setup() {
    // the table asks for its first page while it renders. Real HTTP answers asynchronously, so until the
    // test is ready to drive the component the service never answers (a synchronous answer would change
    // bound state in the middle of change detection and throw NG0100).
    getProducts = vi.fn().mockReturnValue(NEVER);

    await TestBed.configureTestingModule({
      imports: [ProductSelection],
      providers: [MessageService]
    })
      // the component declares its own ProductService provider, so that is the one to replace
      .overrideComponent(ProductSelection, {
        set: { providers: [{ provide: ProductService, useValue: { getProducts } }, FilterTransformerService] }
      })
      .compileComponents();

    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(ProductSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getProducts).toHaveBeenCalled(); // the table requested its first page
    getProducts.mockReset();
    getProducts.mockReturnValue(of(page));
  }

  beforeEach(async () => {
    await setup();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on the first page with ten rows per page and no products', () => {
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(component.totalItems).toBe(0);
  });

  describe('loadProducts', () => {
    it('should ask the product service for the current page and page size', () => {
      component.currentPage = 3;
      component.pageSize = 25;

      component.loadProducts();

      expect(getProducts).toHaveBeenCalledTimes(1);
      expect(getProducts).toHaveBeenCalledWith(3, 25, expect.any(Map));
    });

    it('should store the products and the total record count that come back', () => {
      component.loadProducts();

      expect(component.products).toEqual([widget, gadget]);
      expect(component.totalItems).toBe(42);
    });

    it('should tell the user that products are loading', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      component.loadProducts();

      expect(addSpy).toHaveBeenCalledWith({ severity: 'info', summary: 'System Message', detail: 'Loading Products' });
    });

    it('should pass the grid filters on in the format the service expects', () => {
      component.filters = { sku: { value: 'W-', matchMode: 'startsWith', operator: 'and' } };

      component.loadProducts();

      const sentFilters = getProducts.mock.calls[0][2] as Map<string, unknown>;
      expect(sentFilters.get('sku')).toEqual([
        { searchValue: 'W-', matchMode: 'startsWith', logicalOperator: 'and' }
      ]);
    });

    it('should send no filters when none are set', () => {
      component.loadProducts();

      expect((getProducts.mock.calls[0][2] as Map<string, unknown>).size).toBe(0);
    });

    it('should keep what it had when the service does not answer', () => {
      component.products = [widget];
      getProducts.mockReturnValue(NEVER);

      component.loadProducts();

      expect(component.products).toEqual([widget]);
    });
  });

  describe('loadProductsLazy', () => {
    it('should remember the filters of the event and load the products', () => {
      const filters: { [s: string]: FilterMetadata } = {
        name: { value: 'wid', matchMode: 'contains', operator: 'and' }
      };

      component.loadProductsLazy({ filters } as TableLazyLoadEvent);

      expect(component.filters).toBe(filters);
      expect(getProducts).toHaveBeenCalledTimes(1);
      expect((getProducts.mock.calls[0][2] as Map<string, unknown>).has('name')).toBe(true);
    });

    it('should clear the filters when the event has none', () => {
      component.filters = { name: { value: 'wid', matchMode: 'contains', operator: 'and' } };

      component.loadProductsLazy({} as TableLazyLoadEvent);

      expect(component.filters).toBeUndefined();
      expect((getProducts.mock.calls[0][2] as Map<string, unknown>).size).toBe(0);
    });
  });

  describe('pageChange', () => {
    it('should work out the page number from the first row and the page size', () => {
      component.pageChange({ first: 20, rows: 10 } as TablePageEvent);

      expect(component.currentPage).toBe(3);
      expect(component.pageSize).toBe(10);
    });

    it('should go back to page 1 when the first row is 0', () => {
      component.currentPage = 4;

      component.pageChange({ first: 0, rows: 10 } as TablePageEvent);

      expect(component.currentPage).toBe(1);
    });

    it('should use the new page size when the user changes the rows per page', () => {
      component.pageChange({ first: 0, rows: 50 } as TablePageEvent);

      expect(component.pageSize).toBe(50);
      expect(component.currentPage).toBe(1);
    });

    it('should not load anything itself, the table asks for the data separately', () => {
      component.pageChange({ first: 10, rows: 10 } as TablePageEvent);

      expect(getProducts).not.toHaveBeenCalled();
    });
  });

  describe('onSelect', () => {
    it('should emit the selected product', () => {
      const emitted = vi.fn();
      component.selectedProduct.subscribe(emitted);

      component.onSelect({ data: widget } as TableRowSelectEvent);

      expect(emitted).toHaveBeenCalledTimes(1);
      expect(emitted).toHaveBeenCalledWith(widget);
    });

    it('should emit when a row of the table is clicked', async () => {
      const emitted = vi.fn();
      component.selectedProduct.subscribe(emitted);
      component.products = [widget, gadget];
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('tbody tr');
      rows[1].click();

      expect(emitted).toHaveBeenCalledTimes(1);
      expect(emitted.mock.calls[0][0]).toEqual(gadget);
    });
  });

  describe('the table', () => {
    const element = () => fixture.nativeElement as HTMLElement;

    it('should have SKU, Name, Description and Price columns', () => {
      const headings = Array.from(element().querySelectorAll('thead th')).map(th => th.textContent?.trim());

      expect(headings).toEqual(['SKU', 'Name', 'Description', 'Price']);
    });

    it('should list a row for every product', async () => {
      component.products = [widget, gadget];
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = element().querySelectorAll('tbody tr');
      expect(rows).toHaveLength(2);
      expect(rows[0].textContent).toContain('W-100');
      expect(rows[0].textContent).toContain('Widget');
      expect(rows[0].textContent).toContain('A small widget');
    });

    it('should show the price as currency', async () => {
      component.products = [widget, gadget];
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = element().querySelectorAll('tbody tr');
      expect(rows[0].textContent).toContain('$10.50');
      expect(rows[1].textContent).toContain('$1,234.50');
    });

    it('should show the range and the total record count in the paginator', async () => {
      component.products = [widget, gadget];
      component.totalItems = 42;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(element().querySelector('p-paginator')?.textContent).toContain('1-10 of 42');
    });
  });
});
