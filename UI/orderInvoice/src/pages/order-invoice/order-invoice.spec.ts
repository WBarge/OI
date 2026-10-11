import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Configuration } from '../../model/configuration';
import { ConfigService } from '../../services/config-service';
import { OrderInvoice } from './order-invoice';

describe('OrderInvoice', () => {
  let component: OrderInvoice;
  let fixture: ComponentFixture<OrderInvoice>;
  let configurationSubject: Subject<Configuration>;

  beforeEach(async () => {
    configurationSubject = new Subject<Configuration>();
    await TestBed.configureTestingModule({
      imports: [OrderInvoice],
      providers: [{
        provide: ConfigService,
        useValue: { getConfiguration: () => configurationSubject.asObservable() }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the shipping panel hidden when configured', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Shipping Address');

    configurationSubject.next({ HideShippingAddress: true, EnableCustomProducts: false, productApiUrl: '' });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Shipping Address');
  });

  it('should show the shipping panel when not configured to hide it', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Shipping Address');

    configurationSubject.next({ HideShippingAddress: false, EnableCustomProducts: false, productApiUrl: '' });
    expect(component.configuration()?.HideShippingAddress).toBe(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Shipping Address');
  });
});
