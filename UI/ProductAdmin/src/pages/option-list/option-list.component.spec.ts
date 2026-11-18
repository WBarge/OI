import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testProviders } from '../../testing/test-providers';
import { OptionListComponent } from './option-list.component';

describe('OptionListComponent', () => {
  let component: OptionListComponent;
  let fixture: ComponentFixture<OptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionListComponent],
      providers: testProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(OptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
