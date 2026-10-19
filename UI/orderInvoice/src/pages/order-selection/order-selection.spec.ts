import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSelection } from './order-selection';

describe('OrderSelection', () => {
  let component: OrderSelection;
  let fixture: ComponentFixture<OrderSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
