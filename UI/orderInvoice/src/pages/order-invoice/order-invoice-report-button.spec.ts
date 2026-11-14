import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';
import { Configuration } from '../../model/configuration';
import { Customer } from '../../model/results/customer';
import { CustomerListResult } from '../../model/results/customer-list-result';
import { CustomerSearch } from '../../model/results/customer-search';
import { Order } from '../../model/results/order';
import { ProductOrdered } from '../../model/results/product-ordered';
import { Product } from '../../model/results/product';
import { Address } from '../../model/address';
import { CustomerSelection } from '../../components/customer-selection/customer-selection';
import { ConfigService } from '../../services/config-service';
import { CustomerService } from '../../services/customer-service';
import { OrdersService } from '../../services/orders-service';
import { ProductService } from '../../services/product.service';
import { ProductSelection } from '../../components/product-selection/product-selection';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { OrderInvoice } from './order-invoice';
import { AddressPanel } from '../../components/address-panel/address-panel';
import { StateService } from '../../services/state-service';
import { ReportGenerationService } from '../../services/report-generation-service';
import { ReportStatusService } from '../../services/report-status-service';

describe('OrderInvoice report download button', () => {
  let component: OrderInvoice;
  let fixture: ComponentFixture<OrderInvoice>;
  let getCustomer: ReturnType<typeof vi.fn>;
  let getCustomers: ReturnType<typeof vi.fn>;
  let getProducts: ReturnType<typeof vi.fn>;

  const reportId = 'b821270a-26b1-45d2-adfc-07e2c2225587';

  /**
   * Builds the page. The configuration is read once when the page starts (ConfigService.config is synchronous
   * now), so every test that needs a different configuration builds its own page.
   * The route decides whether the page is a new order, an order being edited or one that is only viewed.
   */
  async function setup(config: Partial<Configuration> = {}, route: { id?: string; readOnly?: boolean } = {}) {
    getCustomer = vi.fn();
    getCustomers = vi.fn().mockReturnValue(NEVER);
    getProducts = vi.fn().mockReturnValue(NEVER);

    await TestBed.configureTestingModule({
      imports: [OrderInvoice],
      providers: [
        // no real network: requests simply wait, so the order set up below is not replaced by a failed load
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: Object.assign(new Configuration(), config) } },
        // the page reads the order id and the read-only flag from its route, so the tests say which route they are on
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap(route.id ? { id: route.id } : {})),
            snapshot: { data: route.readOnly ? { readOnly: true } : {} }
          }
        }
      ]
    })
      // the page declares its own CustomerService provider
      .overrideComponent(OrderInvoice, {
        set: { providers: [{ provide: CustomerService, useValue: { getCustomer } }] }
      })
      // the customer picker lives inside the (closed) dialog but is still created, keep it away from the network
      .overrideComponent(CustomerSelection, {
        set: { providers: [{ provide: CustomerService, useValue: { getCustomers } }, FilterTransformerService] }
      })
      // same for the product picker in the (closed) product dialog
      .overrideComponent(ProductSelection, {
        set: { providers: [{ provide: ProductService, useValue: { getProducts } }, FilterTransformerService] }
      })
      // the address panels inside create their own StateService, keep them away from the network
      .overrideComponent(AddressPanel, {
        set: { providers: [{ provide: StateService, useValue: { getStates: () => of([]) } }] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(OrderInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }


  const estimateButton = () =>
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.buttonRow button'))
      .find((b) => /Get Estimate|Estimate Generating|Estimate Failed/.test(b.textContent ?? '')) as HTMLButtonElement;

  const ready = (id: string) => ({ type: 'Success', title: 'Estimate Generated', at: '', event: 'report.ready', correlationId: id });

  /** An order being edited, shown for the first time, with no estimate yet, exactly as the person finds it. */
  beforeEach(async () => {
    await setup({}, { id: 'order-123' });
    component.customerId = 'customer-1';
    component.items = [Object.assign(new ProductOrdered(), { productId: '1', price: 10, quantity: 1, total: 10 })];
    fixture.detectChanges();   // first render: there is no report id yet

    vi.spyOn(TestBed.inject(ReportGenerationService), 'generateEstimateReport').mockReturnValue(of(reportId));
    vi.spyOn(TestBed.inject(OrdersService), 'updateOrder').mockReturnValue(of({}));
  });

  it('should start disabled, because there is no estimate yet', () => {
    expect(estimateButton().disabled).toBe(true);
    expect(estimateButton().textContent).toContain('Get Estimate');
  });

  it('should wait while the estimate is generated, and open up when the back end says it is ready', () => {
    component.createEstimateDocument(new Event('click'));
    fixture.detectChanges();

    expect(estimateButton().textContent).toContain('Estimate Generating...');
    expect(estimateButton().disabled).toBe(true);

    TestBed.inject(ReportStatusService).handle(ready(reportId));
    fixture.detectChanges();

    expect(estimateButton().textContent).toContain('Get Estimate');
    expect(estimateButton().disabled).toBe(false);
  });

  it('should open up when the answer arrives before the request was answered', () => {
    // a fast job can finish before the response that carries the report id has been handled
    TestBed.inject(ReportStatusService).handle(ready(reportId));
    fixture.detectChanges();

    component.createEstimateDocument(new Event('click'));
    fixture.detectChanges();

    expect(estimateButton().textContent).toContain('Get Estimate');
    expect(estimateButton().disabled).toBe(false);
  });

  it('should show that the estimate failed, and stay closed', () => {
    component.createEstimateDocument(new Event('click'));
    TestBed.inject(ReportStatusService).handle({ ...ready(reportId), event: 'report.failed' });
    fixture.detectChanges();

    expect(estimateButton().textContent).toContain('Estimate Failed');
    expect(estimateButton().disabled).toBe(true);
  });
});
