import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { OrdersService } from './orders-service';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';
import { Order } from '../model/results/order';
import { ProductOrdered } from '../model/results/product-ordered'

describe('OrdersService', () => {
  let service: OrdersService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  const apiUrl = 'https://oi.test/api/';
  const orderUrl = `${apiUrl}Order`;

  beforeEach(() => {
    const configuration = Object.assign(new Configuration(), { oiApiUrl: apiUrl });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: configuration } }
      ]
    });
    service = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const item = (productId: string, price: number, quantity: number) =>
    Object.assign(new ProductOrdered(), {
      idValue: `line-${productId}`, productId, name: `Product ${productId}`, description: `Description ${productId}`,
      sku: `SKU-${productId}`, price, quantity, total: price * quantity
    });

  const newOrder = () =>
    Object.assign(new Order(), {
      // the fields the server owns or the screen only displays, set so the tests can prove they are not sent
      idValue: 'client-id', orderNumber: '999', completedDate: new Date('2026-01-02T00:00:00Z'), isPending: false,
      customerName: 'Jane Smith', phoneNumber: '5125550100',
      customerId: '11111111-1111-1111-1111-111111111111',
      orderDate: new Date('2026-03-15T10:30:00Z'),
      billingAddress1: '1 Bill St', billingAddress2: 'Apt 2', billingCity: 'Austin', billingStateCode: 'TX', billingZipCode: '78701',
      shippingAddress1: '9 Ship Rd', shippingAddress2: '', shippingCity: 'Dallas', shippingStateCode: 'TX', shippingZipCode: '75201',
      orderItems: [item('p1', 10, 2), item('p2', 5.5, 1)],
      subTotal: 25.5, shipping: 5, tax: 1.79, total: 32.29
    });

  describe('createOrder', () => {
    /** What the API sends back (camelCase JSON of IOrder), for the order above once saved. */
    const savedOrder = (overrides: Record<string, unknown> = {}) => ({
      id: '22222222-2222-2222-2222-222222222222',
      orderNumber: 1001,
      orderDate: '2026-03-15T10:30:00Z',
      completedDate: '0001-01-01T00:00:00',
      customerId: '11111111-1111-1111-1111-111111111111',
      customer: null,
      billingAddress1: '1 Bill St', billingAddress2: 'Apt 2', billingCity: 'Austin', billingStateCode: 'TX', billingZipCode: '78701',
      shippingAddress1: '9 Ship Rd', shippingAddress2: '', shippingCity: 'Dallas', shippingStateCode: 'TX', shippingZipCode: '75201',
      orderItems: [
        { id: 'item-1', name: 'Product p1', description: 'Description p1', sku: 'SKU-p1', price: 10, quantity: 2, total: 20 },
        { id: 'item-2', name: 'Product p2', description: 'Description p2', sku: 'SKU-p2', price: 5.5, quantity: 1, total: 5.5 }
      ],
      subTotal: 25.5, shipping: 5, tax: 1.79, total: 32.29, isPending: true,
      ...overrides
    });

    it('should POST the order to the Order endpoint', () => {
      service.createOrder(newOrder()).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      expect(request.request.method).toBe('POST');
      request.flush(savedOrder());
    });

    it('should send the order in the shape the API expects, including the product of every item', () => {
      const order = newOrder();

      service.createOrder(order).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      expect(request.request.body).toEqual({
        customerId: '11111111-1111-1111-1111-111111111111',
        orderDate: order.orderDate,
        billingAddress1: '1 Bill St', billingAddress2: 'Apt 2', billingCity: 'Austin', billingStateCode: 'TX', billingZipCode: '78701',
        shippingAddress1: '9 Ship Rd', shippingAddress2: '', shippingCity: 'Dallas', shippingStateCode: 'TX', shippingZipCode: '75201',
        subTotal: 25.5, shipping: 5, tax: 1.79, total: 32.29,
        orderItems: [
          { productId: 'p1', name: 'Product p1', description: 'Description p1', sku: 'SKU-p1', price: 10, quantity: 2, total: 20 },
          { productId: 'p2', name: 'Product p2', description: 'Description p2', sku: 'SKU-p2', price: 5.5, quantity: 1, total: 5.5 }
        ]
      });
      request.flush(savedOrder());
    });

    it('should not send what the server assigns or the screen only displays', () => {
      service.createOrder(newOrder()).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      for (const key of ['idValue', 'orderNumber', 'completedDate', 'isPending', 'customerName', 'phoneNumber']) {
        expect(request.request.body).not.toHaveProperty(key);
      }
      for (const orderItem of request.request.body.orderItems) {
        expect(orderItem).not.toHaveProperty('idValue');
      }
      request.flush(savedOrder());
    });

    it('should send a null customer when none has been chosen, because an empty string is not a valid id', () => {
      const order = Object.assign(newOrder(), { customerId: '' });

      service.createOrder(order).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      expect(request.request.body.customerId).toBeNull();
      request.flush(savedOrder({ customerId: null }));
    });

    it('should send an order with no items', () => {
      const order = Object.assign(newOrder(), { orderItems: [] });

      service.createOrder(order).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      expect(request.request.body.orderItems).toEqual([]);
      request.flush(savedOrder({ orderItems: [] }));
    });

    it('should emit the saved order with the id and order number the server assigned', () => {
      const next = vi.fn();

      service.createOrder(newOrder()).subscribe(next);
      httpTestingController.expectOne(orderUrl).flush(savedOrder());

      const created: Order = next.mock.calls[0][0];
      expect(created).toBeInstanceOf(Order);
      expect(created.idValue).toBe('22222222-2222-2222-2222-222222222222');
      expect(created.orderNumber).toBe('1001');
      expect(created.orderDate).toEqual(new Date('2026-03-15T10:30:00Z'));
      expect(created.customerId).toBe('11111111-1111-1111-1111-111111111111');
      expect(created.isPending).toBe(true);
    });

    it('should emit the addresses and totals the server saved', () => {
      const next = vi.fn();

      service.createOrder(newOrder()).subscribe(next);
      httpTestingController.expectOne(orderUrl).flush(savedOrder({ total: 40, subTotal: 33.21 }));

      const created: Order = next.mock.calls[0][0];
      expect(created.billingAddress1).toBe('1 Bill St');
      expect(created.billingCity).toBe('Austin');
      expect(created.shippingCity).toBe('Dallas');
      expect(created.shippingZipCode).toBe('75201');
      expect(created.subTotal).toBe(33.21);
      expect(created.shipping).toBe(5);
      expect(created.tax).toBe(1.79);
      expect(created.total).toBe(40);
    });

    it('should emit the saved items with the ids the server assigned', () => {
      const next = vi.fn();

      service.createOrder(newOrder()).subscribe(next);
      httpTestingController.expectOne(orderUrl).flush(savedOrder());

      const created: Order = next.mock.calls[0][0];
      expect(created.orderItems).toHaveLength(2);
      expect(created.orderItems[0]).toBeInstanceOf(ProductOrdered);
      expect(created.orderItems[0]).toEqual(expect.objectContaining({
        idValue: 'item-1', name: 'Product p1', description: 'Description p1', sku: 'SKU-p1', price: 10, quantity: 2, total: 20
      }));
      expect(created.orderItems[1].idValue).toBe('item-2');
    });

    it('should emit no items when the server sends none', () => {
      const next = vi.fn();

      service.createOrder(newOrder()).subscribe(next);
      httpTestingController.expectOne(orderUrl).flush(savedOrder({ orderItems: undefined }));

      expect(next.mock.calls[0][0].orderItems).toEqual([]);
    });

    it('should keep the customer name and phone number from the screen when the server does not send the customer', () => {
      const next = vi.fn();

      service.createOrder(newOrder()).subscribe(next);
      httpTestingController.expectOne(orderUrl).flush(savedOrder({ customer: null }));

      const created: Order = next.mock.calls[0][0];
      expect(created.customerName).toBe('Jane Smith');
      expect(created.phoneNumber).toBe('5125550100');
    });

    it('should use the customer the server sends when there is one', () => {
      const next = vi.fn();

      service.createOrder(newOrder()).subscribe(next);
      httpTestingController.expectOne(orderUrl)
        .flush(savedOrder({ customer: { firstName: 'Janet', lastName: 'Smythe', phoneNumber: '2145550101' } }));

      const created: Order = next.mock.calls[0][0];
      expect(created.customerName).toBe('Janet Smythe');
      expect(created.phoneNumber).toBe('2145550101');
    });

    it('should emit an empty customer id when the order has no customer', () => {
      const next = vi.fn();

      service.createOrder(Object.assign(newOrder(), { customerId: '' })).subscribe(next);
      httpTestingController.expectOne(orderUrl).flush(savedOrder({ customerId: null }));

      expect(next.mock.calls[0][0].customerId).toBe('');
    });

    it('should complete after emitting the created order once', () => {
      const next = vi.fn();
      const complete = vi.fn();

      service.createOrder(newOrder()).subscribe({ next, complete });
      httpTestingController.expectOne(orderUrl).flush(savedOrder());

      expect(next).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should not call the server until it is subscribed to', () => {
      service.createOrder(newOrder());

      httpTestingController.expectNone(orderUrl);
    });

    it('should show a toast naming the operation and emit a safe value when the API rejects the order', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const complete = vi.fn();

      service.createOrder(newOrder()).subscribe({ next, complete });
      httpTestingController.expectOne(orderUrl)
        .flush({ message: 'ProductId is required' }, { status: 400, statusText: 'Bad Request' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        severity: 'warn',
        summary: 'Invalid request',
        detail: 'OrderService: CreateOrder failed: ProductId is required'
      }));
      expect(next).toHaveBeenCalledWith({});
      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should report a server failure as a fatal error', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      service.createOrder(newOrder()).subscribe();
      httpTestingController.expectOne(orderUrl).flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error', summary: 'Fatal Error' }));
    });
  });

  describe('UpdateOrder', () => {
    const savedOrder = () => Object.assign(newOrder(), {
      idValue: '22222222-2222-2222-2222-222222222222', orderNumber: '1001'
    });

    it('should PUT the order to the Order endpoint', () => {
      service.updateOrder(savedOrder()).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      expect(request.request.method).toBe('PUT');
      request.flush(null);
    });

    it('should send the id, the order number as a number and the editable fields the API expects', () => {
      const order = savedOrder();

      service.updateOrder(order).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      expect(request.request.body).toEqual({
        id: '22222222-2222-2222-2222-222222222222',
        orderNumber: 1001,
        customerId: '11111111-1111-1111-1111-111111111111',
        orderDate: order.orderDate,
        billingAddress1: '1 Bill St', billingAddress2: 'Apt 2', billingCity: 'Austin', billingStateCode: 'TX', billingZipCode: '78701',
        shippingAddress1: '9 Ship Rd', shippingAddress2: '', shippingCity: 'Dallas', shippingStateCode: 'TX', shippingZipCode: '75201',
        subTotal: 25.5, shipping: 5, tax: 1.79, total: 32.29,
        orderItems: [
          { productId: 'p1', name: 'Product p1', description: 'Description p1', sku: 'SKU-p1', price: 10, quantity: 2, total: 20 },
          { productId: 'p2', name: 'Product p2', description: 'Description p2', sku: 'SKU-p2', price: 5.5, quantity: 1, total: 5.5 }
        ]
      });
      expect(typeof request.request.body.orderNumber).toBe('number');
      request.flush(null);
    });

    it('should not send what the server owns or the screen only displays', () => {
      service.updateOrder(savedOrder()).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      for (const key of ['idValue', 'completedDate', 'isPending', 'customerName', 'phoneNumber']) {
        expect(request.request.body).not.toHaveProperty(key);
      }
      for (const orderItem of request.request.body.orderItems) {
        expect(orderItem).not.toHaveProperty('idValue');
      }
      request.flush(null);
    });

    it('should send a null customer when the order has none, because an empty string is not a valid id', () => {
      service.updateOrder(Object.assign(savedOrder(), { customerId: '' })).subscribe();

      const request = httpTestingController.expectOne(orderUrl);
      expect(request.request.body.customerId).toBeNull();
      request.flush(null);
    });

    it('should send the order the same way as a create apart from the id and order number', () => {
      const order = savedOrder();
      let createBody: Record<string, unknown> = {};
      let updateBody: Record<string, unknown> = {};

      service.createOrder(order).subscribe();
      const create = httpTestingController.expectOne(request => request.method === 'POST');
      createBody = create.request.body;
      create.flush({});

      service.updateOrder(order).subscribe();
      const update = httpTestingController.expectOne(request => request.method === 'PUT');
      updateBody = update.request.body;
      update.flush(null);

      const { id, orderNumber, ...rest } = updateBody;
      expect(id).toBe(order.idValue);
      expect(orderNumber).toBe(1001);
      expect(rest).toEqual(createBody);
    });

    it('should emit once and complete when the API accepts the update', () => {
      const next = vi.fn();
      const complete = vi.fn();

      service.updateOrder(savedOrder()).subscribe({ next, complete });
      httpTestingController.expectOne(orderUrl).flush(null);

      expect(next).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should not show a toast when the update succeeds', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      service.updateOrder(savedOrder()).subscribe();
      httpTestingController.expectOne(orderUrl).flush(null);

      expect(addSpy).not.toHaveBeenCalled();
    });

    it('should not call the server until it is subscribed to', () => {
      service.updateOrder(savedOrder());

      httpTestingController.expectNone(orderUrl);
    });

    it('should show a toast naming the operation and emit a safe value when the API rejects the update', () => {
      const addSpy = vi.spyOn(messageService, 'add');
      const next = vi.fn();
      const complete = vi.fn();

      service.updateOrder(savedOrder()).subscribe({ next, complete });
      httpTestingController.expectOne(orderUrl)
        .flush({ message: 'The id of the order is required.' }, { status: 400, statusText: 'Bad Request' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
        severity: 'warn',
        summary: 'Invalid request',
        detail: 'OrderService: UpdateOrder failed: The id of the order is required.'
      }));
      expect(next).toHaveBeenCalledWith({});
      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should report a server failure as a fatal error', () => {
      const addSpy = vi.spyOn(messageService, 'add');

      service.updateOrder(savedOrder()).subscribe();
      httpTestingController.expectOne(orderUrl).flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });

      expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error', summary: 'Fatal Error' }));
    });
  });
});
