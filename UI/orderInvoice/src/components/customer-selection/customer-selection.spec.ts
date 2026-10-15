import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterMetadata, MessageService } from 'primeng/api';
import { TableLazyLoadEvent, TablePageEvent, TableRowSelectEvent } from 'primeng/table';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';
import { CustomerSelection } from './customer-selection';
import { ConfigService } from '../../services/config-service';
import { CustomerService } from '../../services/customer-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';
import { Configuration } from '../../model/configuration';
import { Customer } from '../../model/results/customer';
import { CustomerListResult } from '../../model/results/customer-list-result';
import { CustomerSearch } from '../../model/results/customer-search';
import { Address } from '../../model/address';

describe('CustomerSelection', () => {
  let component: CustomerSelection;
  let fixture: ComponentFixture<CustomerSelection>;
  let messageService: MessageService;
  let getCustomers: ReturnType<typeof vi.fn>;
  let createCustomer: ReturnType<typeof vi.fn>;

  const ada = Object.assign(new CustomerSearch(), { idValue: '1', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567' });
  const alan = Object.assign(new CustomerSearch(), { idValue: '2', firstName: 'Alan', lastName: 'Turing', phoneNumber: '5559876543' });
  const page = Object.assign(new CustomerListResult(), { data: [ada, alan], totalRecordSize: 42 });

  async function setup(config: Partial<Configuration> = {}) {
    // the table asks for its first page while it renders. Real HTTP answers asynchronously, so until the
    // test is ready to drive the component the service never answers (a synchronous answer would change
    // bound state in the middle of change detection and throw NG0100).
    getCustomers = vi.fn().mockReturnValue(NEVER);
    createCustomer = vi.fn().mockReturnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [CustomerSelection],
      providers: [
        MessageService,
        { provide: ConfigService, useValue: { config: Object.assign(new Configuration(), config) } }
      ]
    })
      // the component declares its own CustomerService provider, so that is the one to replace
      .overrideComponent(CustomerSelection, {
        set: { providers: [{ provide: CustomerService, useValue: { getCustomers, createCustomer } }, FilterTransformerService] }
      })
      .compileComponents();

    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(CustomerSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getCustomers).toHaveBeenCalled(); // the table requested its first page
    getCustomers.mockReset();
    getCustomers.mockReturnValue(of(page));
  }

  beforeEach(async () => {
    await setup();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on the first page with ten rows per page and no customers', () => {
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(component.customers()).toEqual([]);
    expect(component.showNewCustomerDialog).toBe(false);
  });

  it('should take the configuration from the ConfigService when it starts', () => {
    expect(component.configuration()).toBeInstanceOf(Configuration);
  });

  describe('loadCustomers', () => {
    it('should ask the customer service for the current page and page size', () => {
      component.currentPage = 3;
      component.pageSize = 25;

      component.loadCustomers();

      expect(getCustomers).toHaveBeenCalledTimes(1);
      expect(getCustomers).toHaveBeenCalledWith(3, 25, expect.any(Map));
    });

    it('should store the customers and the total record count that come back', () => {
      component.loadCustomers();

      expect(component.customers()).toEqual([ada, alan]);
      expect(component.totalItems).toBe(42);
    });

    it('should not show a toast, only refresh does that', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      component.loadCustomers();

      expect(addSpy).not.toHaveBeenCalled();
    });

    it('should pass the grid filters on in the format the service expects', () => {
      component.filters = { FirstName: { value: 'ad', matchMode: 'contains', operator: 'and' } };

      component.loadCustomers();

      const sentFilters = getCustomers.mock.calls[0][2] as Map<string, unknown>;
      expect(sentFilters.get('FirstName')).toEqual([
        { searchValue: 'ad', matchMode: 'contains', logicalOperator: 'and' }
      ]);
    });

    it('should send no filters when none are set', () => {
      component.loadCustomers();

      expect((getCustomers.mock.calls[0][2] as Map<string, unknown>).size).toBe(0);
    });
  });

  describe('refresh', () => {
    it('should tell the user that customers are loading and then load them', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      component.refresh();

      expect(addSpy).toHaveBeenCalledWith({ severity: 'info', summary: 'System Message', detail: 'Loading Customers' });
      expect(getCustomers).toHaveBeenCalledTimes(1);
      expect(component.customers()).toEqual([ada, alan]);
    });
  });

  describe('loadCustomersLazy', () => {
    it('should remember the filters of the event and load the customers', () => {
      const filters: { [s: string]: FilterMetadata } = {
        LastName: { value: 'tur', matchMode: 'startsWith', operator: 'and' }
      };

      component.loadCustomersLazy({ filters } as TableLazyLoadEvent);

      expect(component.filters).toBe(filters);
      expect(getCustomers).toHaveBeenCalledTimes(1);
      expect((getCustomers.mock.calls[0][2] as Map<string, unknown>).has('LastName')).toBe(true);
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
    it('should emit the selected customer', () => {
      const emitted = vi.fn();
      component.selectedCustomer.subscribe(emitted);

      component.onSelect({ data: ada } as TableRowSelectEvent);

      expect(emitted).toHaveBeenCalledTimes(1);
      expect(emitted).toHaveBeenCalledWith(ada);
    });

    it('should emit when a row of the table is clicked', async () => {
      const emitted = vi.fn();
      component.selectedCustomer.subscribe(emitted);
      component.customers.set([ada, alan]);
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('tbody tr');
      rows[1].click();

      expect(emitted).toHaveBeenCalledTimes(1);
      expect(emitted.mock.calls[0][0]).toEqual(alan);
    });
  });

  describe('newCustomerClicked', () => {
    it('should open the new customer dialog', () => {
      component.newCustomerClicked();

      expect(component.showNewCustomerDialog).toBe(true);
    });

    it('should clear whatever was typed the last time', () => {
      component.customerFirstName = 'Old';
      component.customerLastName = 'Name';
      component.customerPhone = '5550000000';
      component.billingAddress.city = 'Old City';
      component.shippingAddress.city = 'Old Ship City';

      component.newCustomerClicked();

      expect(component.customerFirstName).toBe('');
      expect(component.customerLastName).toBe('');
      expect(component.customerPhone).toBe('');
      expect(component.billingAddress).toEqual(new Address());
      expect(component.shippingAddress).toEqual(new Address());
    });

    it('should open when the New Customer button is clicked', () => {
      const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button');

      expect(button?.textContent).toContain('New Customer');
      button?.click();

      expect(component.showNewCustomerDialog).toBe(true);
    });
  });

  describe('doneWithWithNewCustomerClicked', () => {
    const fillIn = () => {
      component.newCustomerClicked();
      component.customerFirstName = 'Ada';
      component.customerLastName = 'Lovelace';
      component.customerPhone = '(555) 123-4567';
      Object.assign(component.billingAddress, { address1: '1 Bill St', address2: 'Apt 1', city: 'Billtown', stateCode: 'AZ', zipCode: '85001' });
      Object.assign(component.shippingAddress, { address1: '2 Ship St', address2: 'Apt 2', city: 'Shipville', stateCode: 'CA', zipCode: '90001' });
    };

    describe('with a last name and a phone number', () => {
      it('should close the dialog and create the customer', () => {
        fillIn();

        component.doneWithWithNewCustomerClicked();

        expect(component.showNewCustomerDialog).toBe(false);
        expect(createCustomer).toHaveBeenCalledTimes(1);
      });

      it('should create a Customer with the name, phone and billing address that were typed', () => {
        fillIn();

        component.doneWithWithNewCustomerClicked();

        const created: Customer = createCustomer.mock.calls[0][0];
        expect(created).toBeInstanceOf(Customer);
        expect(created.firstName).toBe('Ada');
        expect(created.lastName).toBe('Lovelace');
        expect(created.phoneNumber).toBe('(555) 123-4567');
        expect(created.defaultBillingAddress1).toBe('1 Bill St');
        expect(created.defaultBillingAddress2).toBe('Apt 1');
        expect(created.defaultBillingCity).toBe('Billtown');
        expect(created.defaultBillingStateCode).toBe('AZ');
        expect(created.defaultBillingZipCode).toBe('85001');
      });

      it('should use the shipping address that was typed when shipping is not the same as billing', () => {
        fillIn();
        component.shippingSameAsBilling = false;

        component.doneWithWithNewCustomerClicked();

        const created: Customer = createCustomer.mock.calls[0][0];
        expect(created.defaultShippingAddress1).toBe('2 Ship St');
        expect(created.defaultShippingAddress2).toBe('Apt 2');
        expect(created.defaultShippingCity).toBe('Shipville');
        expect(created.defaultShippingStateCode).toBe('CA');
        expect(created.defaultShippingZipCode).toBe('90001');
      });

      it('should copy the billing address into shipping when shipping is the same as billing', () => {
        fillIn();
        component.shippingSameAsBilling = true;

        component.doneWithWithNewCustomerClicked();

        const created: Customer = createCustomer.mock.calls[0][0];
        expect(created.defaultShippingAddress1).toBe('1 Bill St');
        expect(created.defaultShippingAddress2).toBe('Apt 1');
        expect(created.defaultShippingCity).toBe('Billtown');
        expect(created.defaultShippingStateCode).toBe('AZ');
        expect(created.defaultShippingZipCode).toBe('85001');
      });

      it('should not need a first name', () => {
        fillIn();
        component.customerFirstName = '';

        component.doneWithWithNewCustomerClicked();

        expect(createCustomer).toHaveBeenCalledTimes(1);
      });

      it('should refresh the customer list once the customer has been created', () => {
        fillIn();
        const addSpy = vi.spyOn(messageService, 'add');

        component.doneWithWithNewCustomerClicked();

        expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Loading Customers' }));
        expect(getCustomers).toHaveBeenCalledTimes(1);
      });

      it('should not refresh the list before the server has answered', () => {
        fillIn();
        createCustomer.mockReturnValue(NEVER);

        component.doneWithWithNewCustomerClicked();

        expect(getCustomers).not.toHaveBeenCalled();
      });
    });

    describe('without a last name or a phone number', () => {
      const expectRejected = () => {
        expect(createCustomer).not.toHaveBeenCalled();
        expect(getCustomers).not.toHaveBeenCalled();
      };

      it.each([
        ['an empty last name', { customerLastName: '' }],
        ['a blank last name', { customerLastName: '   ' }],
        ['an empty phone number', { customerPhone: '' }],
        ['a blank phone number', { customerPhone: '   ' }]
      ])('should refuse to create a customer with %s', (_label, overrides) => {
        fillIn();
        Object.assign(component, overrides);
        const addSpy = vi.spyOn(messageService, 'add');

        component.doneWithWithNewCustomerClicked();

        expectRejected();
        expect(addSpy).toHaveBeenCalledWith({
          severity: 'error',
          summary: 'Invalid Customer',
          detail: 'The customer last name and phone number are both required to create a new customer!'
        });
      });

      it('should refuse a customer that has neither', () => {
        component.newCustomerClicked();

        component.doneWithWithNewCustomerClicked();

        expectRejected();
      });

      // By design: the dialog's only button is Done, so it always closes. When the customer is invalid the
      // user is told why with an error toast and decides for themselves whether to try again.
      it('should still close the dialog, because Done is its only way out', () => {
        fillIn();
        component.customerLastName = '';

        component.doneWithWithNewCustomerClicked();

        expect(component.showNewCustomerDialog).toBe(false);
      });
    });
  });

  describe('shipping configuration', () => {
    it('should show the shipping address in the new customer dialog when it is not hidden', async () => {
      TestBed.resetTestingModule();
      await setup({ HideShippingAddress: false });
      component.showNewCustomerDialog = true;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(document.body.textContent).toContain('Shipping Address');
      expect(document.body.textContent).toContain('Shipping is the same Billing');
    });

    it('should not show the shipping address in the new customer dialog when it is hidden', async () => {
      TestBed.resetTestingModule();
      await setup({ HideShippingAddress: true });
      component.showNewCustomerDialog = true;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(document.body.textContent).toContain('Billing Address');
      expect(document.body.textContent).not.toContain('Shipping Address');
    });
  });

  describe('rendering', () => {
    it('should list the loaded customers with a formatted phone number', async () => {
      component.loadCustomers();
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr'));
      const text = rows.map(row => row.textContent).join(' ');
      expect(text).toContain('Ada');
      expect(text).toContain('Lovelace');
      expect(text).toContain('(555) 123-4567');
      expect(text).toContain('Turing');
      expect(text).toContain('(555) 987-6543');
    });

    it('should show the existing customers heading', () => {
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Existing Customers');
    });
  });
});
