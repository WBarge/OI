import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressPanel } from './address-panel';
import { Address } from '../../model/address';

describe('AddressPanel', () => {
  let component: AddressPanel;
  let fixture: ComponentFixture<AddressPanel>;
  let element: HTMLElement;

  async function render() {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressPanel);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty address that is visible', () => {
    expect(component.data).toBeInstanceOf(Address);
    expect(component.data.address1).toBe('');
    expect(component.isHidden()).toBe(false);
  });

  describe('states', () => {
    it('should offer the 50 states plus the District of Columbia', () => {
      expect(component.states).toHaveLength(51);
      expect(component.states).toContainEqual({ name: 'District of Columbia', code: 'DC' });
    });

    it('should have a unique two letter code for every state', () => {
      const codes = component.states.map(state => state.code);

      expect(new Set(codes).size).toBe(codes.length);
      codes.forEach(code => expect(code).toMatch(/^[A-Z]{2}$/));
    });

    it('should list the states alphabetically by name', () => {
      const names = component.states.map(state => state.name);

      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    });
  });

  describe('rendering', () => {
    it('should show the heading passed in through Header as the legend', async () => {
      fixture.componentRef.setInput('Header', 'Billing Address');
      await render();

      expect(element.textContent).toContain('Billing Address');
    });

    it('should render a field for each part of the address', async () => {
      await render();

      expect(element.querySelector('#address1')).toBeTruthy();
      expect(element.querySelector('#address2')).toBeTruthy();
      expect(element.querySelector('#city')).toBeTruthy();
      expect(element.querySelector('#state')).toBeTruthy();
      expect(element.querySelector('#zipCode')).toBeTruthy();
    });

    it('should render nothing when it is hidden', async () => {
      fixture.componentRef.setInput('isHidden', true);
      await render();

      expect(element.querySelector('p-fieldset')).toBeNull();
      expect(element.querySelector('#address1')).toBeNull();
    });

    it('should show the panel again when it stops being hidden', async () => {
      fixture.componentRef.setInput('isHidden', true);
      await render();
      fixture.componentRef.setInput('isHidden', false);
      await render();

      expect(element.querySelector('p-fieldset')).toBeTruthy();
    });
  });

  describe('data binding', () => {
    it('should show the values of the address passed in through AddressData', async () => {
      const address = Object.assign(new Address(), { address1: '1 Main St', address2: 'Suite 2', city: 'Phoenix', zipCode: '85001' });
      fixture.componentRef.setInput('AddressData', address);
      await render();

      expect((element.querySelector('#address1') as HTMLInputElement).value).toBe('1 Main St');
      expect((element.querySelector('#address2') as HTMLInputElement).value).toBe('Suite 2');
      expect((element.querySelector('#city') as HTMLInputElement).value).toBe('Phoenix');
    });

    it('should write what the user types back into the address', async () => {
      const address = new Address();
      fixture.componentRef.setInput('AddressData', address);
      await render();

      const city = element.querySelector('#city') as HTMLInputElement;
      city.value = 'Tempe';
      city.dispatchEvent(new Event('input'));

      expect(address.city).toBe('Tempe');
    });
  });
});
