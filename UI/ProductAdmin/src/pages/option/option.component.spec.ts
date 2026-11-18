import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testProviders } from '../../testing/test-providers';
import { OptionComponent } from './option.component';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionComponent],
      providers: testProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(OptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
