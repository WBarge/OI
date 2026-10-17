import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';
import { Configuration } from '../../model/configuration';
import { Customer } from '../../model/results/customer';
import { CustomerListResult } from '../../model/results/customer-list-result';
import { CustomerSearch } from '../../model/results/customer-search';
import { ProductOrdered } from '../../model/results/product-ordered';
import { Address } from '../../model/address';
import { CustomerSelection } from '../../components/customer-selection/customer-selection';
import { ConfigService } from '../../services/config-service';
import { CustomerService } from '../../services/customer-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { OrderInvoice } from './order-invoice';
import { AddressPanel } from '../../components/address-panel/address-panel';
import { StateService } from '../../services/state-service';

describe('OrderInvoice', () => {
  let component: OrderInvoice;
  let fixture: ComponentFixture<OrderInvoice>;
  let getCustomer: ReturnType<typeof vi.fn>;
  let getCustomers: ReturnType<typeof vi.fn>;

  const customerPage = Object.assign(new CustomerListResult(), { data: [], totalRecordSize: 0 });

  /**
   * Builds the page. The configuration is read once when the page starts (ConfigService.config is synchronous
   * now), so every test that needs a different configuration builds its own page.
   */
  async function setup(config: Partial<Configuration> = {}) {
    getCustomer = vi.fn();
    getCustomers = vi.fn().mockReturnValue(NEVER);

    await TestBed.configureTestingModule({
      imports: [OrderInvoice],
      providers: [
        MessageService,
        { provide: ConfigService, useValue: { config: Object.assign(new Configuration(), config) } }
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
      // the address panels inside create their own StateService, keep them away from the network
      .overrideComponent(AddressPanel, {
        set: { providers: [{ provide: StateService, useValue: { getStates: () => of([]) } }] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(OrderInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }

  const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

  beforeEach(async () => {
    await setup();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('configuration', () => {
    it('should take the configuration from the ConfigService when it starts', () => {
      fixture.detectChanges();

      expect(component.configuration()).toBeInstanceOf(Configuration);
    });

    it('should keep the shipping panel hidden when configured', async () => {
      TestBed.resetTestingModule();
      await setup({ HideShippingAddress: true });

      fixture.detectChanges();

      expect(component.configuration()?.HideShippingAddress).toBe(true);
      expect(text()).not.toContain('Shipping Address');
    });

    it('should show the shipping panel when not configured to hide it', async () => {
      TestBed.resetTestingModule();
      await setup({ HideShippingAddress: false });

      fixture.detectChanges();

      expect(component.configuration()?.HideShippingAddress).toBe(false);
      expect(text()).toContain('Shipping Address');
    });

    it('should always show the billing panel', async () => {
      TestBed.resetTestingModule();
      await setup({ HideShippingAddress: true });

      fixture.detectChanges();

      expect(text()).toContain('Billing Address');
    });
  });

  describe('the mock order', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should be an order', () => {
      expect(component.oiMode).toBe('Order');
      expect(text()).toContain('Order Number:');
    });

    it('should load the customer', () => {
      expect(component.customerName).toBe('John Doe');
      expect(component.customerPhone).toBe('555-555-5555');
    });

    it('should show the customer phone number formatted', async () => {
      await fixture.whenStable();

      const phone = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('#phone');
      expect(phone?.value).toBe('(555) 555-5555');
    });

    it('should load a billing and a shipping address', () => {
      expect(component.billingAddress.address1).toBe('123 Main St');
      expect(component.billingAddress.stateCode).toBe('AZ');
      expect(component.shippingAddress.address1).toBe('456 Oak St');
      expect(component.shippingAddress.city).toBe('Othertown');
    });

    it('should load three items', () => {
      expect(component.items.map(item => item.sku)).toEqual(['SKU1', 'SKU2', 'SKU3']);
    });

    it('should list the items in the table', async () => {
      await fixture.whenStable();
      const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('#itemsTable tbody tr');

      expect(rows).toHaveLength(3);
      expect(rows[0].textContent).toContain('SKU1');
      expect(rows[0].textContent).toContain('$21.98');
    });
  });

  describe('calculateTotals', () => {
    const item = (price: number, quantity: number): ProductOrdered =>
      Object.assign(new ProductOrdered(), { idValue: String(price), price, quantity, total: price * quantity });

    it('should add up the items, a flat 5.00 shipping charge and 7% tax', () => {
      component.items = [item(10, 2), item(5, 1)];

      component.calculateTotals();

      expect(component.subtotal).toBeCloseTo(25);
      expect(component.shipping).toBe(5);
      expect(component.tax).toBeCloseTo(1.75);
      expect(component.total).toBeCloseTo(31.75);
    });

    it('should still charge shipping when there are no items', () => {
      component.items = [];

      component.calculateTotals();

      expect(component.subtotal).toBe(0);
      expect(component.tax).toBe(0);
      expect(component.total).toBe(5);
    });

    it('should calculate the totals of the mock order', () => {
      component.loadMockOrder();

      // 2 x 10.99 + 1 x 5.49 + 3 x 15.75
      expect(component.subtotal).toBeCloseTo(74.72);
      expect(component.tax).toBeCloseTo(5.2304);
      expect(component.total).toBeCloseTo(84.9504);
    });

    it('should show the totals on the page', async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const totals = (fixture.nativeElement as HTMLElement).querySelector('.totals')?.textContent ?? '';
      expect(totals).toContain('$74.72');
      expect(totals).toContain('$5.00');
      expect(totals).toContain('$5.23');
      expect(totals).toContain('$84.95');
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should remove the item and recalculate the totals', () => {
      component.delete(component.items[1]);

      expect(component.items.map(item => item.idValue)).toEqual(['1', '3']);
      // 2 x 10.99 + 3 x 15.75
      expect(component.subtotal).toBeCloseTo(69.23);
      expect(component.total).toBeCloseTo(69.23 * 1.07 + 5);
    });

    it('should leave the order alone when the item is not on it', () => {
      component.delete(Object.assign(new ProductOrdered(), { idValue: 'nope' }));

      expect(component.items).toHaveLength(3);
      expect(component.subtotal).toBeCloseTo(74.72);
    });

    it('should remove the row when its trash button is clicked', async () => {
      await fixture.whenStable();

      const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('#itemsTable tbody button');
      buttons[0].click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.items).toHaveLength(2);
      expect((fixture.nativeElement as HTMLElement).querySelectorAll('#itemsTable tbody tr')).toHaveLength(2);
    });

    it('should remove everything when every item is deleted', () => {
      [...component.items].forEach(i => component.delete(i));

      expect(component.items).toEqual([]);
      expect(component.subtotal).toBe(0);
      expect(component.total).toBe(5);
    });
  });

  describe('customer dialog', () => {
    beforeEach(() => {
      vi.spyOn(console, 'log').mockImplementation(() => undefined);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should be closed to begin with', () => {
      expect(component.showCustomerDialog).toBe(false);
    });

    it('should open when the customer area is double clicked', () => {
      component.onCustomerDoubleClick(new MouseEvent('dblclick'));

      expect(component.showCustomerDialog).toBe(true);
    });

    it('should open when the customer fieldset is double clicked in the page', () => {
      fixture.detectChanges();
      const fieldset = (fixture.nativeElement as HTMLElement).querySelector('p-fieldset.customerDetails') as HTMLElement;

      fieldset.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

      expect(component.showCustomerDialog).toBe(true);
    });

    it('should not change the dialog when the order items are double clicked', () => {
      component.onOrderItemsDoubleClick(new MouseEvent('dblclick'));

      expect(component.showCustomerDialog).toBe(false);
    });

    it('should show the customer picker with Refresh and Close buttons once it is open', async () => {
      component.showCustomerDialog = true;
      fixture.detectChanges();
      await fixture.whenStable();

      const body = document.body.textContent ?? '';
      expect(body).toContain('Please select a customer');
      expect(body).toContain('Existing Customers');
      expect(body).toContain('Refresh');
      expect(body).toContain('Close');
    });

    it('should close when the Close button is clicked', async () => {
      component.showCustomerDialog = true;
      fixture.detectChanges();
      await fixture.whenStable();

      const close = Array.from(document.body.querySelectorAll<HTMLButtonElement>('button'))
        .find(button => button.textContent?.trim() === 'Close');
      close?.click();

      expect(component.showCustomerDialog).toBe(false);
    });

    it('should reload the customers when the Refresh button is clicked', async () => {
      getCustomers.mockReturnValue(of(customerPage));
      component.showCustomerDialog = true;
      fixture.detectChanges();
      await fixture.whenStable();
      getCustomers.mockClear();

      const refresh = Array.from(document.body.querySelectorAll<HTMLButtonElement>('button'))
        .find(button => button.textContent?.trim() === 'Refresh');
      refresh?.click();

      expect(getCustomers).toHaveBeenCalledTimes(1);
    });
  });

  describe('ProcessSelectedCustomer', () => {
    const picked = Object.assign(new CustomerSearch(), { idValue: 'c-7', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567' });
    const fullCustomer = Object.assign(new Customer(), {
      idValue: 'c-7', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567',
      defaultBillingAddress1: '1 Bill St', defaultBillingAddress2: 'Apt 1', defaultBillingCity: 'Billtown',
      defaultBillingStateCode: 'AZ', defaultBillingZipCode: '85001',
      defaultShippingAddress1: '2 Ship St', defaultShippingAddress2: 'Apt 2', defaultShippingCity: 'Shipville',
      defaultShippingStateCode: 'CA', defaultShippingZipCode: '90001'
    });

    beforeEach(() => {
      fixture.detectChanges();
      getCustomer.mockReturnValue(of(fullCustomer));
    });

    it('should load the full customer by the id of the one that was picked', () => {
      component.ProcessSelectedCustomer(picked);

      expect(getCustomer).toHaveBeenCalledTimes(1);
      expect(getCustomer).toHaveBeenCalledWith('c-7');
    });

    it('should show the name and the phone number of the customer', () => {
      component.ProcessSelectedCustomer(picked);

      expect(component.customerName).toBe('Ada Lovelace');
      expect(component.customerPhone).toBe('5551234567');
    });

    it('should fill the billing address from the default billing address', () => {
      component.ProcessSelectedCustomer(picked);

      expect(component.billingAddress).toEqual(Object.assign(new Address(), {
        address1: '1 Bill St', address2: 'Apt 1', city: 'Billtown', stateCode: 'AZ', zipCode: '85001'
      }));
    });

    it('should fill the shipping address from the default shipping address', () => {
      component.ProcessSelectedCustomer(picked);

      expect(component.shippingAddress).toEqual(Object.assign(new Address(), {
        address1: '2 Ship St', address2: 'Apt 2', city: 'Shipville', stateCode: 'CA', zipCode: '90001'
      }));
    });

    it('should replace the addresses with new objects instead of editing the old ones', () => {
      const oldBilling = component.billingAddress;
      const oldShipping = component.shippingAddress;

      component.ProcessSelectedCustomer(picked);

      expect(component.billingAddress).not.toBe(oldBilling);
      expect(component.shippingAddress).not.toBe(oldShipping);
      expect(oldBilling.address1).toBe('123 Main St');
    });

    it('should show the picked customer on the page', async () => {
      component.ProcessSelectedCustomer(picked);
      fixture.detectChanges();
      await fixture.whenStable();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector<HTMLInputElement>('#customerName')?.value).toBe('Ada Lovelace');
      expect(element.querySelector<HTMLInputElement>('#phone')?.value).toBe('(555) 123-4567');
    });

    it('should leave the order alone when the customer cannot be loaded', () => {
      getCustomer.mockReturnValue(NEVER);

      component.ProcessSelectedCustomer(picked);

      expect(component.customerName).toBe('John Doe');
    });
  });
});
