import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { testProviders } from '../../testing/test-providers';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    // jsdom has no ResizeObserver and the PrimeNG scroll area asks for one when it renders
    vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });

    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: testProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
