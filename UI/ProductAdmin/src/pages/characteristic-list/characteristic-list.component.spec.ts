import { ComponentFixture, TestBed } from '@angular/core/testing';
import { testProviders } from '../../testing/test-providers';
import { CharacteristicListComponent } from './characteristic-list.component';

describe('CharacteristicListComponent', () => {
  let component: CharacteristicListComponent;
  let fixture: ComponentFixture<CharacteristicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicListComponent],
      providers: testProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(CharacteristicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
