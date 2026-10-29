import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FilterMetadata, MessageService } from 'primeng/api';
import { TableLazyLoadEvent, TablePageEvent, TableRowSelectEvent } from 'primeng/table';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';
import { OrderSelection } from './order-selection';
import { OrdersService } from '../../services/orders-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { OrderListResult } from '../../model/results/order-list-result';
import { OrderSearch } from '../../model/results/order-search';

describe('OrderSelection', () => {
  let component: OrderSelection;
  let fixture: ComponentFixture<OrderSelection>;
  let messageService: MessageService;
  let getOrders: ReturnType<typeof vi.fn>;
  let navigate: ReturnType<typeof vi.fn>;

  const first = Object.assign(new OrderSearch(), {
    idValue: 'order-1', orderNumber: '1001', customerName: 'Ada Lovelace', phoneNumber: '5551234567',
    orderDate: new Date('2026-03-15T10:30:00Z'), total: 32.29
  });
  const second = Object.assign(new OrderSearch(), {
    idValue: 'order-2', orderNumber: '1002', customerName: 'Alan Turing', phoneNumber: '5559876543',
    orderDate: new Date('2026-03-16T10:30:00Z'), total: 10
  });
  const page = Object.assign(new OrderListResult(), { data: [first, second], totalRecordSize: 42 });

  beforeEach(async () => {
    // the table asks for its first page while it renders. Real HTTP answers asynchronously, so until the
    // test is ready to drive the component the service never answers (a synchronous answer would change
    // bound state in the middle of change detection and throw NG0100).
    getOrders = vi.fn().mockReturnValue(NEVER);
    navigate = vi.fn();

    await TestBed.configureTestingModule({
      imports: [OrderSelection],
      providers: [
        MessageService,
        { provide: Router, useValue: { navigate } }
      ]
    })
      // the component declares its own OrdersService provider, so that is the one to replace
      .overrideComponent(OrderSelection, {
        set: { providers: [{ provide: OrdersService, useValue: { getOrders } }, FilterTransformerService] }
      })
      .compileComponents();

    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(OrderSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getOrders).toHaveBeenCalled(); // the table requested its first page
    getOrders.mockReset();
    getOrders.mockReturnValue(of(page));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on the first page with ten rows per page', () => {
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
  });

  describe('loadOrders', () => {
    it('should tell the user that orders are loading', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      component.loadOrders();

      expect(addSpy).toHaveBeenCalledWith({ severity: 'info', summary: 'System Message', detail: 'Loading Orders' });
    });

    it('should ask the order service for the current page and page size', () => {
      component.currentPage = 3;
      component.pageSize = 25;

      component.loadOrders();

      expect(getOrders).toHaveBeenCalledTimes(1);
      expect(getOrders).toHaveBeenCalledWith(3, 25, expect.any(Map));
    });

    it('should store the orders and the total record count that come back', () => {
      component.loadOrders();

      expect(component.orders).toEqual([first, second]);
      expect(component.totalItems).toBe(42);
    });

    it('should pass the grid filters on in the format the service expects', () => {
      component.filters = { CustomerName: { value: 'ad', matchMode: 'contains', operator: 'and' } };

      component.loadOrders();

      const sentFilters = getOrders.mock.calls[0][2] as Map<string, unknown>;
      expect(sentFilters.get('CustomerName')).toEqual([
        { searchValue: 'ad', matchMode: 'contains', logicalOperator: 'and' }
      ]);
    });

    it('should send no filters when none are set', () => {
      component.loadOrders();

      expect((getOrders.mock.calls[0][2] as Map<string, unknown>).size).toBe(0);
    });
  });

  describe('loadOrdersLazy', () => {
    it('should remember the filters of the event and load the orders', () => {
      const filters: { [s: string]: FilterMetadata } = {
        OrderNumber: { value: '10', matchMode: 'startsWith', operator: 'and' }
      };

      component.loadOrdersLazy({ filters } as TableLazyLoadEvent);

      expect(component.filters).toBe(filters);
      expect(getOrders).toHaveBeenCalledTimes(1);
      expect((getOrders.mock.calls[0][2] as Map<string, unknown>).has('OrderNumber')).toBe(true);
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
  });

  describe('onSelect', () => {
    it('should open the selected order on the order invoice page', () => {
      component.onSelect({ data: first } as TableRowSelectEvent);

      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(['/orderInvoice', 'order-1']);
    });

    it('should open the order when a row of the table is clicked', async () => {
      component.orders = [first, second];
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('tbody tr');
      rows[1].click();

      expect(navigate).toHaveBeenCalledWith(['/orderInvoice', 'order-2']);
    });
  });
});
