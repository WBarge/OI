import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressPanel } from './address-panel';

describe('AddressPanel', () => {
  let component: AddressPanel;
  let fixture: ComponentFixture<AddressPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
