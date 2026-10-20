import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';
import { Configuration } from '../../model/configuration';
import { Customer } from '../../model/results/customer';
import { CustomerListResult } from '../../model/results/customer-list-result';
import { CustomerSearch } from '../../model/results/customer-search';
import { ProductOrdered } from '../../model/results/product-ordered';
import { Product } from '../../model/results/product';
import { Address } from '../../model/address';
import { CustomerSelection } from '../../components/customer-selection/customer-selection';
import { ConfigService } from '../../services/config-service';
import { CustomerService } from '../../services/customer-service';
import { ProductService } from '../../services/product.service';
import { ProductSelection } from '../../components/product-selection/product-selection';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { OrderInvoice } from './order-invoice';
import { AddressPanel } from '../../components/address-panel/address-panel';
import { StateService } from '../../services/state-service';

describe('OrderInvoice', () => {
  let component: OrderInvoice;
  let fixture: ComponentFixture<OrderInvoice>;
  let getCustomer: ReturnType<typeof vi.fn>;
  let getCustomers: ReturnType<typeof vi.fn>;
  let getProducts: ReturnType<typeof vi.fn>;

  const customerPage = Object.assign(new CustomerListResult(), { data: [], totalRecordSize: 0 });

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

  const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

  /** Builds an ordered line. productId is what the page uses to find a line, idValue is only set once it is saved. */
  const line = (productId: string, price: number, quantity: number, extra: Partial<ProductOrdered> = {}): ProductOrdered =>
    Object.assign(new ProductOrdered(), {
      idValue: '', productId, sku: `SKU-${productId}`, name: `Product ${productId}`, description: `Description ${productId}`,
      price, quantity, total: price * quantity, ...extra
    });

  /** Puts three lines on the order (2 x 10.99, 1 x 5.49, 3 x 15.75) and totals them, then renders the page. */
  const seedOrder = () => {
    component.items = [line('1', 10.99, 2), line('2', 5.49, 1), line('3', 15.75, 3)];
    component.calculateTotals();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await setup();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('order mode', () => {
    it('should be a new order when the route has no order id', () => {
      fixture.detectChanges();

      expect(component.mode).toBe('NEW');
      expect(component.orderId).toBeNull();
    });

    it('should be an order being edited when the route has an order id', async () => {
      TestBed.resetTestingModule();
      await setup({}, { id: 'order-123' });

      fixture.detectChanges();

      expect(component.mode).toBe('EDIT');
      expect(component.orderId).toBe('order-123');
    });

    it('should only be viewed on the read-only route', async () => {
      TestBed.resetTestingModule();
      await setup({}, { id: 'order-123', readOnly: true });

      fixture.detectChanges();

      expect(component.mode).toBe('VIEW');
      expect(component.orderId).toBe('order-123');
    });

    it('should be viewed rather than edited when the read-only flag is set, even without an order id', async () => {
      TestBed.resetTestingModule();
      await setup({}, { readOnly: true });

      fixture.detectChanges();

      expect(component.mode).toBe('VIEW');
    });
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

    it('should show both address panels by default', () => {
      fixture.detectChanges();

      expect(component.configuration()?.disableAddresses).toBe(false);
      expect((fixture.nativeElement as HTMLElement).querySelectorAll('address-panel')).toHaveLength(2);
    });

    it('should not show any address panels when addresses are disabled', async () => {
      TestBed.resetTestingModule();
      await setup({ disableAddresses: true });

      fixture.detectChanges();

      expect(component.configuration()?.disableAddresses).toBe(true);
      expect((fixture.nativeElement as HTMLElement).querySelectorAll('address-panel')).toHaveLength(0);
      expect(text()).not.toContain('Billing Address');
      expect(text()).not.toContain('Shipping Address');
      expect((fixture.nativeElement as HTMLElement).querySelector('.address-panels')).toBeNull();
    });

    it('should not show the shipping panel when addresses are disabled, even if shipping is not hidden', async () => {
      TestBed.resetTestingModule();
      await setup({ disableAddresses: true, HideShippingAddress: false });

      fixture.detectChanges();

      expect(text()).not.toContain('Shipping Address');
    });

    it('should still show the customer and the items when addresses are disabled', async () => {
      TestBed.resetTestingModule();
      await setup({ disableAddresses: true });

      fixture.detectChanges();

      expect((fixture.nativeElement as HTMLElement).querySelector('#customerName')).not.toBeNull();
      expect((fixture.nativeElement as HTMLElement).querySelector('#itemsTable')).not.toBeNull();
    });
  });

  describe('a new order', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should be an order', () => {
      expect(component.oiMode).toBe('Order');
      expect(text()).toContain('Order Number:');
      expect(text()).toContain('Order Date:');
    });

    it('should be dated today', () => {
      expect(component.orderDate.toDateString()).toBe(new Date().toDateString());
    });

    it('should not have a customer yet', () => {
      expect(component.customerName).toBe('');
      expect((fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('#customerName')?.value).toBe('');
    });

    it('should start with the placeholder phone number', () => {
      expect(component.customerPhone).toBe('555-555-5555');
    });

    it('should show the customer phone number formatted', async () => {
      await fixture.whenStable();

      const phone = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('#phone');
      expect(phone?.value).toBe('(555) 555-5555');
    });

    it('should start with blank billing and shipping addresses', () => {
      expect(component.billingAddress).toEqual(new Address());
      expect(component.shippingAddress).toEqual(new Address());
      expect(component.billingAddress).not.toBe(component.shippingAddress);
    });

    it('should start without any items', () => {
      expect(component.items).toEqual([]);
    });

    it('should start with zero totals', () => {
      expect(component.subtotal).toBe(0);
      expect(component.shipping).toBe(0);
      expect(component.tax).toBe(0);
      expect(component.total).toBe(0);
    });

    it('should have no rows in the items table', async () => {
      await fixture.whenStable();

      expect((fixture.nativeElement as HTMLElement).querySelectorAll('#itemsTable tbody tr.p-datatable-row')).toHaveLength(0);
    });

    it('should show zero totals on the page', async () => {
      await fixture.whenStable();

      const totals = (fixture.nativeElement as HTMLElement).querySelector('.totals')?.textContent ?? '';
      expect(totals).toContain('Subtotal:');
      expect(totals).toContain('$0.00');
      expect(totals).not.toContain('$5.00');
    });
  });

  describe('calculateTotals', () => {
    it('should add up the items, a flat 5.00 shipping charge and 7% tax', () => {
      component.items = [line('a', 10, 2), line('b', 5, 1)];

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

    it('should total an order of several items', () => {
      seedOrder();

      // 2 x 10.99 + 1 x 5.49 + 3 x 15.75
      expect(component.subtotal).toBeCloseTo(74.72);
      expect(component.tax).toBeCloseTo(5.2304);
      expect(component.total).toBeCloseTo(84.9504);
    });

    it('should use the total of each item rather than price x quantity', () => {
      component.items = [line('a', 10, 2, { total: 12 })];

      component.calculateTotals();

      expect(component.subtotal).toBe(12);
    });

    it('should show the totals on the page', async () => {
      seedOrder();
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
      seedOrder();
    });

    it('should remove the item and recalculate the totals', () => {
      component.delete(component.items[1]);

      expect(component.items.map(item => item.productId)).toEqual(['1', '3']);
      // 2 x 10.99 + 3 x 15.75
      expect(component.subtotal).toBeCloseTo(69.23);
      expect(component.total).toBeCloseTo(69.23 * 1.07 + 5);
    });

    it('should find the item by its product id, not its order line id', () => {
      component.items[0].idValue = 'saved-1';
      component.items[1].idValue = 'saved-2';

      component.delete(line('2', 0, 0, { idValue: 'something-else' }));

      expect(component.items.map(item => item.productId)).toEqual(['1', '3']);
    });

    it('should not remove lines that have not been saved yet when another one is deleted', () => {
      // every line added in the page has a blank idValue, deleting one must not take the others with it
      expect(component.items.every(item => item.idValue === '')).toBe(true);

      component.delete(component.items[0]);

      expect(component.items).toHaveLength(2);
    });

    it('should leave the order alone when the item is not on it', () => {
      component.delete(line('nope', 1, 1));

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

    it('should not open when the order items are double clicked', () => {
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

  describe('product dialog', () => {
    it('should be closed to begin with', () => {
      expect(component.showProductDialog).toBe(false);
    });

    it('should open when the order items are double clicked', () => {
      component.onOrderItemsDoubleClick(new MouseEvent('dblclick'));

      expect(component.showProductDialog).toBe(true);
    });

    it('should open when the items table is double clicked in the page', () => {
      fixture.detectChanges();
      const table = (fixture.nativeElement as HTMLElement).querySelector('#itemsTable') as HTMLElement;

      table.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

      expect(component.showProductDialog).toBe(true);
    });

    it('should not open the customer dialog', () => {
      component.onOrderItemsDoubleClick(new MouseEvent('dblclick'));

      expect(component.showCustomerDialog).toBe(false);
    });

    it('should show the product picker with a Close button once it is open', async () => {
      component.showProductDialog = true;
      fixture.detectChanges();
      await fixture.whenStable();

      const body = document.body.textContent ?? '';
      expect(body).toContain('Please select a product');
      expect(body).toContain('Close');
    });

    it('should close when the Close button is clicked', async () => {
      component.showProductDialog = true;
      fixture.detectChanges();
      await fixture.whenStable();

      const close = Array.from(document.body.querySelectorAll<HTMLButtonElement>('button'))
        .find(button => button.textContent?.trim() === 'Close');
      close?.click();

      expect(component.showProductDialog).toBe(false);
    });
  });

  describe('processSelectedProduct', () => {
    const gadget = Object.assign(new Product(), {
      idValue: '9', sku: 'G-200', name: 'Gadget', shortDescription: 'A large gadget', price: 20
    });

    beforeEach(() => {
      seedOrder();
    });

    it('should add the product to the order with a quantity of one', () => {
      component.processSelectedProduct(gadget);

      expect(component.items).toHaveLength(4);
      expect(component.items[3]).toEqual(Object.assign(new ProductOrdered(), {
        idValue: '', productId: '9', name: 'Gadget', description: 'A large gadget', sku: 'G-200', price: 20, quantity: 1, total: 20
      }));
    });

    it('should keep the product id, and leave the order line id blank until it is saved', () => {
      component.processSelectedProduct(gadget);

      expect(component.items[3].productId).toBe('9');
      expect(component.items[3].idValue).toBe('');
    });

    it('should use the short description as the description of the item', () => {
      component.processSelectedProduct(Object.assign(new Product(), gadget, { description: 'The long one' }));

      expect(component.items[3].description).toBe('A large gadget');
    });

    it('should recalculate the totals', () => {
      component.processSelectedProduct(gadget);

      // 2 x 10.99 + 1 x 5.49 + 3 x 15.75 + 1 x 20
      expect(component.subtotal).toBeCloseTo(94.72);
      expect(component.total).toBeCloseTo(94.72 * 1.07 + 5);
    });

    it('should add a row to the items table', async () => {
      component.processSelectedProduct(gadget);
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('#itemsTable tbody tr');
      expect(rows).toHaveLength(4);
      expect(rows[3].textContent).toContain('G-200');
    });

    it('should add the first item to an order that is empty', () => {
      component.items = [];

      component.processSelectedProduct(gadget);

      expect(component.items.map(item => item.sku)).toEqual(['G-200']);
      expect(component.subtotal).toBe(20);
      expect(component.total).toBeCloseTo(20 * 1.07 + 5);
    });

    describe('when the product is already on the order', () => {
      const existing = Object.assign(new Product(), {
        idValue: '2', sku: 'SKU-2', name: 'Product 2', shortDescription: 'Description 2', price: 5.49
      });

      it('should add one to the quantity instead of adding another line', () => {
        component.processSelectedProduct(existing);

        expect(component.items).toHaveLength(3);
        expect(component.items[1].quantity).toBe(2);
      });

      it('should recalculate the total of that line from its price', () => {
        component.processSelectedProduct(existing);

        expect(component.items[1].total).toBeCloseTo(5.49 * 2);
      });

      it('should recalculate the totals of the order', () => {
        component.processSelectedProduct(existing);

        // 2 x 10.99 + 2 x 5.49 + 3 x 15.75
        expect(component.subtotal).toBeCloseTo(80.21);
        expect(component.total).toBeCloseTo(80.21 * 1.07 + 5);
      });

      it('should keep adding one each time the product is picked', () => {
        component.processSelectedProduct(existing);
        component.processSelectedProduct(existing);
        component.processSelectedProduct(existing);

        expect(component.items).toHaveLength(3);
        expect(component.items[1].quantity).toBe(4);
        expect(component.items[1].total).toBeCloseTo(5.49 * 4);
      });

      it('should use the price already on the order line, not the price of the picked product', () => {
        component.processSelectedProduct(Object.assign(new Product(), existing, { price: 99 }));

        expect(component.items[1].price).toBe(5.49);
        expect(component.items[1].total).toBeCloseTo(5.49 * 2);
      });

      it('should leave the other lines alone', () => {
        component.processSelectedProduct(existing);

        expect(component.items[0].quantity).toBe(2);
        expect(component.items[2].quantity).toBe(3);
      });

      it('should match on the product id and not on the sku', () => {
        component.processSelectedProduct(Object.assign(new Product(), existing, { idValue: 'brand-new', sku: 'SKU-2' }));

        expect(component.items).toHaveLength(4);
      });
    });

    it('should add the product when the product picker emits one', async () => {
      component.showProductDialog = true; // the dialog only creates the picker once it is open
      fixture.detectChanges();
      await fixture.whenStable();
      const picker = fixture.debugElement.query(By.directive(ProductSelection)).componentInstance as ProductSelection;

      picker.selectedProduct.emit(gadget);

      expect(component.items.map(item => item.sku)).toEqual(['SKU-1', 'SKU-2', 'SKU-3', 'G-200']);
    });
  });

  describe('onQuantityChange', () => {
    beforeEach(() => {
      seedOrder();
    });

    it('should work out the total of the item from its price and the new quantity', () => {
      const item = component.items[0];

      component.onQuantityChange(5, item);

      expect(item.total).toBeCloseTo(10.99 * 5);
    });

    it('should recalculate the totals of the order', () => {
      component.onQuantityChange(5, component.items[0]);

      // 5 x 10.99 + 1 x 5.49 + 3 x 15.75
      expect(component.subtotal).toBeCloseTo(107.69);
      expect(component.total).toBeCloseTo(107.69 * 1.07 + 5);
    });

    it('should make the item free when the quantity is zero', () => {
      const item = component.items[0];

      component.onQuantityChange(0, item);

      expect(item.total).toBe(0);
    });

    it('should zero the item when the quantity is cleared', () => {
      const item = component.items[0];

      component.onQuantityChange(null, item);

      expect(item.total).toBe(0);
      expect(component.subtotal).toBeCloseTo(5.49 + 15.75 * 3);
    });

    it('should leave the other items alone', () => {
      component.onQuantityChange(4, component.items[1]);

      expect(component.items[0].total).toBeCloseTo(10.99 * 2);
      expect(component.items[2].total).toBeCloseTo(15.75 * 3);
    });

    it('should show a quantity input for every item', async () => {
      await fixture.whenStable();
      fixture.detectChanges(); // ngModel writes the quantities one tick after the first render
      await fixture.whenStable();

      const inputs = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>('#itemsTable tbody p-inputnumber input');
      expect(Array.from(inputs).map(input => input.value)).toEqual(['2', '1', '3']);
    });
  });

  describe('processSelectedCustomer', () => {
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

    it('should not have loaded anything before a customer is picked', () => {
      expect(getCustomer).not.toHaveBeenCalled();
    });

    it('should load the full customer by the id of the one that was picked', () => {
      component.processSelectedCustomer(picked);

      expect(getCustomer).toHaveBeenCalledTimes(1);
      expect(getCustomer).toHaveBeenCalledWith('c-7');
    });

    it('should show the name and the phone number of the customer', () => {
      component.processSelectedCustomer(picked);

      expect(component.customerName).toBe('Ada Lovelace');
      expect(component.customerPhone).toBe('5551234567');
    });

    it('should fill the billing address from the default billing address', () => {
      component.processSelectedCustomer(picked);

      expect(component.billingAddress).toEqual(Object.assign(new Address(), {
        address1: '1 Bill St', address2: 'Apt 1', city: 'Billtown', stateCode: 'AZ', zipCode: '85001'
      }));
    });

    it('should fill the shipping address from the default shipping address', () => {
      component.processSelectedCustomer(picked);

      expect(component.shippingAddress).toEqual(Object.assign(new Address(), {
        address1: '2 Ship St', address2: 'Apt 2', city: 'Shipville', stateCode: 'CA', zipCode: '90001'
      }));
    });

    it('should replace the addresses with new objects instead of editing the old ones', () => {
      const oldBilling = component.billingAddress;
      const oldShipping = component.shippingAddress;

      component.processSelectedCustomer(picked);

      expect(component.billingAddress).not.toBe(oldBilling);
      expect(component.shippingAddress).not.toBe(oldShipping);
      expect(oldBilling.address1).toBe('');
    });

    it('should show the picked customer on the page', async () => {
      component.processSelectedCustomer(picked);
      fixture.detectChanges();
      await fixture.whenStable();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector<HTMLInputElement>('#customerName')?.value).toBe('Ada Lovelace');
      expect(element.querySelector<HTMLInputElement>('#phone')?.value).toBe('(555) 123-4567');
    });

    it('should leave the order alone when the customer cannot be loaded', () => {
      getCustomer.mockReturnValue(NEVER);

      component.processSelectedCustomer(picked);

      expect(component.customerName).toBe('');
      expect(component.billingAddress.address1).toBe('');
    });
  });
});
