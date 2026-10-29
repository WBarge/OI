import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FilterMetadata, MessageService } from 'primeng/api';
import { TableLazyLoadEvent, TablePageEvent, TableRowSelectEvent } from 'primeng/table';
import { NEVER, of } from 'rxjs';
import { vi } from 'vitest';
import { CustomerManager } from './customer-manager';
import { AddressPanel } from '../../components/address-panel/address-panel';
import { Address } from '../../model/address';
import { Configuration } from '../../model/configuration';
import { Customer } from '../../model/results/customer';
import { CustomerListResult } from '../../model/results/customer-list-result';
import { CustomerSearch } from '../../model/results/customer-search';
import { ConfigService } from '../../services/config-service';
import { CustomerService } from '../../services/customer-service';
import { StateService } from '../../services/state-service';
import { FilterTransformerService } from '../../services/transformers/filter-transformer.service';

describe('CustomerManager', () => {
  let component: CustomerManager;
  let fixture: ComponentFixture<CustomerManager>;
  let messageService: MessageService;
  let getCustomers: ReturnType<typeof vi.fn>;
  let getCustomer: ReturnType<typeof vi.fn>;
  let createCustomer: ReturnType<typeof vi.fn>;
  let updateCustomer: ReturnType<typeof vi.fn>;
  let navigate: ReturnType<typeof vi.fn>;

  const ada = Object.assign(new CustomerSearch(), { idValue: 'c-1', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567' });
  const alan = Object.assign(new CustomerSearch(), { idValue: 'c-2', firstName: 'Alan', lastName: 'Turing', phoneNumber: '5559876543' });
  const page = Object.assign(new CustomerListResult(), { data: [ada, alan], totalRecordSize: 42 });

  /** the full customer the API returns when one row is opened */
  const fullAda = Object.assign(new Customer(), {
    idValue: 'c-1', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567',
    defaultBillingAddress1: '1 Bill St', defaultBillingAddress2: 'Apt 1', defaultBillingCity: 'Billtown',
    defaultBillingStateCode: 'AZ', defaultBillingZipCode: '85001',
    defaultShippingAddress1: '2 Ship St', defaultShippingAddress2: 'Apt 2', defaultShippingCity: 'Shipville',
    defaultShippingStateCode: 'CA', defaultShippingZipCode: '90001'
  });

  const address = (prefix: string, stateCode: string): Address => Object.assign(new Address(), {
    address1: `1 ${prefix} St`, address2: `${prefix} Apt`, city: `${prefix}town`, stateCode, zipCode: '12345'
  });

  beforeEach(async () => {
    // the table asks for its first page while it renders. Real HTTP answers asynchronously, so until the
    // test is ready to drive the page the service never answers (a synchronous answer would change bound
    // state in the middle of change detection and throw NG0100).
    getCustomers = vi.fn().mockReturnValue(NEVER);
    getCustomer = vi.fn();
    createCustomer = vi.fn();
    updateCustomer = vi.fn();
    navigate = vi.fn();

    await TestBed.configureTestingModule({
      imports: [CustomerManager],
      providers: [
        MessageService,
        { provide: ConfigService, useValue: { config: Object.assign(new Configuration(), {}) } },
        { provide: Router, useValue: { navigate } }
      ]
    })
      // the page declares its own CustomerService provider, so that is the one to replace
      .overrideComponent(CustomerManager, {
        set: {
          providers: [
            { provide: CustomerService, useValue: { getCustomers, getCustomer, createCustomer, updateCustomer } },
            FilterTransformerService
          ]
        }
      })
      // the address panels inside the dialog create their own StateService, keep them away from the network
      .overrideComponent(AddressPanel, {
        set: { providers: [{ provide: StateService, useValue: { getStates: () => of([]) } }] }
      })
      .compileComponents();

    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(CustomerManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(getCustomers).toHaveBeenCalled(); // the table requested its first page
    getCustomers.mockReset();
    getCustomers.mockReturnValue(of(page));
    createCustomer.mockReturnValue(of({}));
    updateCustomer.mockReturnValue(of({}));
    getCustomer.mockReturnValue(of(fullAda));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on the first page with ten rows per page', () => {
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
  });

  it('should start with the dialog closed', () => {
    expect(component.showNewCustomerDialog()).toBe(false);
  });

  it('should take its configuration from the configuration service when it starts', () => {
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

    it('should pass the grid filters on in the format the service expects', () => {
      component.filters = { LastName: { value: 'lo', matchMode: 'contains', operator: 'and' } };

      component.loadCustomers();

      const sentFilters = getCustomers.mock.calls[0][2] as Map<string, unknown>;
      expect(sentFilters.get('LastName')).toEqual([{ searchValue: 'lo', matchMode: 'contains', logicalOperator: 'and' }]);
    });
  });

  describe('refresh', () => {
    it('should tell the user that customers are loading and load them', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      component.refresh();

      expect(addSpy).toHaveBeenCalledWith({ severity: 'info', summary: 'System Message', detail: 'Loading Customers' });
      expect(getCustomers).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadCustomersLazy', () => {
    it('should remember the filters of the event and load the customers', () => {
      const filters: { [s: string]: FilterMetadata } = {
        LastName: { value: 'tu', matchMode: 'startsWith', operator: 'and' }
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

    it('should use the new page size when the user changes the rows per page', () => {
      component.pageChange({ first: 0, rows: 50 } as TablePageEvent);

      expect(component.pageSize).toBe(50);
      expect(component.currentPage).toBe(1);
    });
  });

  describe('newCustomerClicked', () => {
    it('should open the dialog for a new customer', () => {
      component.newCustomerClicked();

      expect(component.showNewCustomerDialog()).toBe(true);
      expect(component.heading).toBe('New Customer');
      expect(component.editMode).toBe(false);
    });

    it('should start with an empty customer, even after another customer was edited', () => {
      component.onSelect({ data: ada } as TableRowSelectEvent);

      component.newCustomerClicked();

      expect(component.customerFirstName).toBe('');
      expect(component.customerLastName).toBe('');
      expect(component.customerPhone).toBe('');
      expect(component.billingAddress).toEqual(new Address());
      expect(component.shippingAddress).toEqual(new Address());
    });

    it('should open the dialog when the New Customer button is pressed', () => {
      const button = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'))
        .find(candidate => candidate.textContent?.trim() === 'New Customer');

      button?.click();

      expect(component.showNewCustomerDialog()).toBe(true);
    });
  });

  describe('onSelect', () => {
    it('should load the full customer by the id of the row that was selected', () => {
      component.onSelect({ data: ada } as TableRowSelectEvent);

      expect(getCustomer).toHaveBeenCalledTimes(1);
      expect(getCustomer).toHaveBeenCalledWith('c-1');
    });

    it('should open the dialog to edit the customer', () => {
      component.onSelect({ data: ada } as TableRowSelectEvent);

      expect(component.showNewCustomerDialog()).toBe(true);
      expect(component.heading).toBe('Edit Customer');
      expect(component.editMode).toBe(true);
    });

    it('should show the name, the phone number and both default addresses of the customer', () => {
      component.onSelect({ data: ada } as TableRowSelectEvent);

      expect(component.customerId).toBe('c-1');
      expect(component.customerFirstName).toBe('Ada');
      expect(component.customerLastName).toBe('Lovelace');
      expect(component.customerPhone).toBe('5551234567');
      expect(component.billingAddress).toEqual(Object.assign(new Address(), {
        address1: '1 Bill St', address2: 'Apt 1', city: 'Billtown', stateCode: 'AZ', zipCode: '85001'
      }));
      expect(component.shippingAddress).toEqual(Object.assign(new Address(), {
        address1: '2 Ship St', address2: 'Apt 2', city: 'Shipville', stateCode: 'CA', zipCode: '90001'
      }));
    });

    it('should open the customer when a row of the table is clicked', async () => {
      component.customers.set([ada, alan]);
      fixture.detectChanges();
      await fixture.whenStable();

      const rows = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('tbody tr');
      rows[1].click();

      expect(getCustomer).toHaveBeenCalledWith('c-2');
    });
  });

  describe('doneWithWithNewCustomerClicked', () => {
    beforeEach(() => {
      component.newCustomerClicked();
      component.customerFirstName = 'Grace';
      component.customerLastName = 'Hopper';
      component.customerPhone = '5550001111';
      component.billingAddress = address('Bill', 'AZ');
      component.shippingAddress = address('Ship', 'CA');
    });

    it('should close the dialog', () => {
      component.doneWithWithNewCustomerClicked();

      expect(component.showNewCustomerDialog()).toBe(false);
    });

    it.each([
      ['last name', () => { component.customerLastName = ''; }],
      ['last name of only spaces', () => { component.customerLastName = '   '; }],
      ['phone number', () => { component.customerPhone = ''; }],
      ['phone number of only spaces', () => { component.customerPhone = '  '; }]
    ])('should warn and save nothing when the %s is missing', (_label, clear) => {
      const addSpy = vi.spyOn(messageService, 'add');
      clear();

      component.doneWithWithNewCustomerClicked();

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ severity: 'warn', summary: 'Invalid Customer' }));
      expect(createCustomer).not.toHaveBeenCalled();
      expect(updateCustomer).not.toHaveBeenCalled();
    });

    it('should not need a first name', () => {
      component.customerFirstName = '';

      component.doneWithWithNewCustomerClicked();

      expect(createCustomer).toHaveBeenCalledTimes(1);
    });

    it('should create a new customer with the values of the dialog', () => {
      component.doneWithWithNewCustomerClicked();

      expect(updateCustomer).not.toHaveBeenCalled();
      expect(createCustomer).toHaveBeenCalledTimes(1);
      const sent: Customer = createCustomer.mock.calls[0][0];
      expect(sent).toBeInstanceOf(Customer);
      expect(sent.firstName).toBe('Grace');
      expect(sent.lastName).toBe('Hopper');
      expect(sent.phoneNumber).toBe('5550001111');
      expect(sent.defaultBillingAddress1).toBe('1 Bill St');
      expect(sent.defaultBillingAddress2).toBe('Bill Apt');
      expect(sent.defaultBillingCity).toBe('Billtown');
      expect(sent.defaultBillingStateCode).toBe('AZ');
      expect(sent.defaultBillingZipCode).toBe('12345');
      expect(sent.defaultShippingAddress1).toBe('1 Ship St');
      expect(sent.defaultShippingStateCode).toBe('CA');
    });

    it('should use the billing address as the shipping address when they are the same', () => {
      component.shippingSameAsBilling = true;

      component.doneWithWithNewCustomerClicked();

      const sent: Customer = createCustomer.mock.calls[0][0];
      expect(sent.defaultShippingAddress1).toBe('1 Bill St');
      expect(sent.defaultShippingAddress2).toBe('Bill Apt');
      expect(sent.defaultShippingCity).toBe('Billtown');
      expect(sent.defaultShippingStateCode).toBe('AZ');
      expect(sent.defaultShippingZipCode).toBe('12345');
    });

    it('should reload the customers after a customer was created', () => {
      component.doneWithWithNewCustomerClicked();

      expect(getCustomers).toHaveBeenCalledTimes(1);
      expect(component.customers()).toEqual([ada, alan]);
    });

    it('should update the customer instead of creating one when an existing customer is being edited', () => {
      component.onSelect({ data: ada } as TableRowSelectEvent);
      component.customerPhone = '5557778888';

      component.doneWithWithNewCustomerClicked();

      expect(createCustomer).not.toHaveBeenCalled();
      expect(updateCustomer).toHaveBeenCalledTimes(1);
      const sent: Customer = updateCustomer.mock.calls[0][0];
      expect(sent.idValue).toBe('c-1');
      expect(sent.lastName).toBe('Lovelace');
      expect(sent.phoneNumber).toBe('5557778888');
    });

    it('should reload the customers after a customer was updated', () => {
      component.onSelect({ data: ada } as TableRowSelectEvent);

      component.doneWithWithNewCustomerClicked();

      expect(getCustomers).toHaveBeenCalledTimes(1);
    });
  });

  describe('done', () => {
    it('should go back to the home page', () => {
      component.done(new Event('click'));

      expect(navigate).toHaveBeenCalledWith(['/home']);
    });
  });
});
