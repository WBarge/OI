import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerSelection } from './customer-selection';

describe('CusomterSelection', () => {
  let component: CustomerSelection;
  let fixture: ComponentFixture<CustomerSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
