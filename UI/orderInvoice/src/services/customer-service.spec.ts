import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { CustomerService } from './customer-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { Customer } from '../model/results/customer';
import { CustomerSearch } from '../model/results/customer-search';
import { CustomerListResult } from '../model/results/customer-list-result';
import { FilterDictionary } from '../model/requests/filter-detail';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  const apiUrl = 'https://customers.test/api/';
  const customersUrl = `${apiUrl}Customers`;
  const customerUrl = `${apiUrl}Customer`;

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { customerApiUrl: apiUrl });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: configuration } }
      ]
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  const serverCustomer = {
    id: 'c-1', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567',
    defaultBillingAddress1: '1 Bill St', defaultBillingAddress2: 'Apt 1', defaultBillingCity: 'Billtown',
    defaultBillingStateCode: 'AZ', defaultBillingZipCode: '85001',
    defaultShippingAddress1: '2 Ship St', defaultShippingAddress2: 'Apt 2', defaultShippingCity: 'Shipville',
    defaultShippingStateCode: 'CA', defaultShippingZipCode: '90001'
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be created until the configuration has been loaded', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        // the real ConfigService throws when it is read before load() has run
        { provide: ConfigService, useValue: { get config(): Configuration { throw new Error('Configuration accessed before it was loaded.'); } } }
      ]
    });

    expect(() => TestBed.inject(CustomerService)).toThrow('Configuration accessed before it was loaded.');
  });

  describe('getCustomers', () => {
    it('should POST to the Customers endpoint from the configuration', () => {
      service.getCustomers().subscribe();

      const request = httpTestingController.expectOne(customersUrl);
      expect(request.request.method).toBe('POST');
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should default to page 1, a page size of 10 and no filters', () => {
      service.getCustomers().subscribe();

      const request = httpTestingController.expectOne(customersUrl);
      expect(request.request.body).toEqual({ page: 1, pageSize: 10, filters: null });
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should send the requested page and page size', () => {
      service.getCustomers(3, 25).subscribe();

      const request = httpTestingController.expectOne(customersUrl);
      expect(request.request.body).toEqual({ page: 3, pageSize: 25, filters: null });
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should send an empty filter dictionary as no filters', () => {
      service.getCustomers(1, 10, new Map() as FilterDictionary).subscribe();

      const request = httpTestingController.expectOne(customersUrl);
      expect(request.request.body.filters).toBeNull();
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should convert the filter dictionary into an object keyed by field name', () => {
      const filters: FilterDictionary = new Map([
        ['FirstName', [{ searchValue: 'jo', matchMode: 'contains', logicalOperator: 'and' }]],
        ['LastName', [
          { searchValue: 'smith', matchMode: 'startsWith', logicalOperator: 'or' },
          { searchValue: 'jones', matchMode: 'startsWith', logicalOperator: 'or' }
        ]]
      ]);

      service.getCustomers(1, 10, filters).subscribe();

      const request = httpTestingController.expectOne(customersUrl);
      expect(request.request.body.filters).toEqual({
        FirstName: [{ searchValue: 'jo', matchMode: 'contains', logicalOperator: 'and' }],
        LastName: [
          { searchValue: 'smith', matchMode: 'startsWith', logicalOperator: 'or' },
          { searchValue: 'jones', matchMode: 'startsWith', logicalOperator: 'or' }
        ]
      });
      request.flush({ totalRecordSize: 0, data: [] });
    });

    it('should map the response to a CustomerListResult of CustomerSearch objects', () => {
      const result = vi.fn();
      service.getCustomers().subscribe(result);

      httpTestingController.expectOne(customersUrl).flush({
        totalRecordSize: 42,
        data: [
          { id: 'c-1', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567', ignored: 'x' },
          { id: 'c-2', firstName: 'Alan', lastName: 'Turing', phoneNumber: '5559876543' }
        ]
      });

      const list: CustomerListResult = result.mock.calls[0][0];
      expect(list).toBeInstanceOf(CustomerListResult);
      expect(list.totalRecordSize).toBe(42);
      expect(list.data).toHaveLength(2);
      expect(list.data[0]).toBeInstanceOf(CustomerSearch);
      expect(list.data[0]).toEqual(Object.assign(new CustomerSearch(), {
        idValue: 'c-1', firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567'
      }));
      expect(list.data[1].idValue).toBe('c-2');
    });

    it('should map an empty page', () => {
      const result = vi.fn();
      service.getCustomers().subscribe(result);

      httpTestingController.expectOne(customersUrl).flush({ totalRecordSize: 0, data: [] });

      expect(result.mock.calls[0][0].data).toEqual([]);
      expect(result.mock.calls[0][0].totalRecordSize).toBe(0);
    });

    it('should show an error toast and emit a safe value when the call fails', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const complete = vi.fn();

      service.getCustomers().subscribe({ next, complete });
      httpTestingController.expectOne(customersUrl)
        .flush({ message: 'database down' }, { status: 500, statusText: 'Internal Server Error' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        severity: 'error',
        detail: 'CustomerService: getCustomers failed: database down'
      }));
      expect(next).toHaveBeenCalledWith({});
      expect(complete).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCustomer', () => {
    it('should GET Customer/{id}', () => {
      service.getCustomer('c-1').subscribe();

      const request = httpTestingController.expectOne(`${customerUrl}/c-1`);
      expect(request.request.method).toBe('GET');
      request.flush(serverCustomer);
    });

    it('should map the response to a Customer with the id, the name, the phone and both default addresses', () => {
      const result = vi.fn();
      service.getCustomer('c-1').subscribe(result);
      httpTestingController.expectOne(`${customerUrl}/c-1`).flush(serverCustomer);

      const customer: Customer = result.mock.calls[0][0];
      expect(customer).toBeInstanceOf(Customer);
      expect(customer.idValue).toBe('c-1');
      expect(customer.firstName).toBe('Ada');
      expect(customer.lastName).toBe('Lovelace');
      expect(customer.phoneNumber).toBe('5551234567');
      expect(customer.defaultBillingAddress1).toBe('1 Bill St');
      expect(customer.defaultBillingAddress2).toBe('Apt 1');
      expect(customer.defaultBillingCity).toBe('Billtown');
      expect(customer.defaultBillingStateCode).toBe('AZ');
      expect(customer.defaultBillingZipCode).toBe('85001');
      expect(customer.defaultShippingAddress1).toBe('2 Ship St');
      expect(customer.defaultShippingAddress2).toBe('Apt 2');
      expect(customer.defaultShippingCity).toBe('Shipville');
      expect(customer.defaultShippingStateCode).toBe('CA');
      expect(customer.defaultShippingZipCode).toBe('90001');
    });

    it('should show an error toast and emit a safe value when the customer is not found', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();

      service.getCustomer('missing').subscribe(next);
      httpTestingController.expectOne(`${customerUrl}/missing`)
        .flush(null, { status: 404, statusText: 'Not Found' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error', summary: 'Fatal Error' }));
      expect(next).toHaveBeenCalledWith({});
    });

    // KNOWN BUG in customer-service.ts: the operation name is the string 'this.getCustomer' (a stray "this."),
    // so the toast reads "CustomerService: this.getCustomer failed: ...".
    // it.fails passes while the bug exists; once it is fixed this test will fail,
    // which is the signal to change `it.fails` to `it`.
    it.fails('should name the operation getCustomer in the error toast', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      service.getCustomer('missing').subscribe();
      httpTestingController.expectOne(`${customerUrl}/missing`)
        .flush({ message: 'nope' }, { status: 500, statusText: 'Internal Server Error' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: 'CustomerService: getCustomer failed: nope'
      }));
    });
  });

  describe('createCustomer', () => {
    it('should POST the customer to the Customer endpoint', () => {
      const customer = Object.assign(new Customer(), { firstName: 'Ada', lastName: 'Lovelace', phoneNumber: '5551234567' });

      service.createCustomer(customer).subscribe();

      const request = httpTestingController.expectOne(customerUrl);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(customer);
      request.flush({});
    });

    it('should show a toast naming the operation and emit a safe value when the call fails', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const complete = vi.fn();

      service.createCustomer(new Customer()).subscribe({ next, complete });
      httpTestingController.expectOne(customerUrl)
        .flush({ message: 'duplicate phone number' }, { status: 400, statusText: 'Bad Request' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        severity: 'warn',
        summary: 'Invalid request',
        detail: 'CustomerService: createCustomer failed: duplicate phone number'
      }));
      expect(next).toHaveBeenCalledWith({});
      expect(complete).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateCustomer', () => {
    it('should not be implemented yet', () => {
      expect(() => service.updateCustomer(new Customer())).toThrow('Not Implemented!');
    });
  });
});
