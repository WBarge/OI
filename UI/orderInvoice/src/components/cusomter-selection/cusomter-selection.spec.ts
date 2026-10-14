import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CusomterSelection } from './cusomter-selection';

describe('CusomterSelection', () => {
  let component: CusomterSelection;
  let fixture: ComponentFixture<CusomterSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CusomterSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(CusomterSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
