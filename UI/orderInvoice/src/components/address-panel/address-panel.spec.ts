import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { AddressPanel } from './address-panel';
import { Address } from '../../model/address';
import { State } from '../../model/results/state';
import { ConfigService } from '../../services/config-service';
import { Configuration } from '../../model/configuration';

describe('AddressPanel', () => {
  let component: AddressPanel;
  let fixture: ComponentFixture<AddressPanel>;
  let element: HTMLElement;
  let httpTestingController: HttpTestingController;

  const apiUrl = 'https://oi.test/api/';
  const statesUrl = `${apiUrl}States`;
  // deliberately out of order: the StateService is responsible for sorting them
  const serverStates: State[] = [
    { name: 'Texas', code: 'TX' },
    { name: 'Arizona', code: 'AZ' },
    { name: 'Oregon', code: 'OR' },
  ];

  async function render() {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    const configuration = Object.assign(new Configuration(), { oiApiUrl: apiUrl });

    await TestBed.configureTestingModule({
      imports: [AddressPanel],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        { provide: ConfigService, useValue: { config: configuration } },
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    // the component asks for the states as soon as it is constructed
    fixture = TestBed.createComponent(AddressPanel);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    httpTestingController.expectOne(statesUrl).flush(serverStates);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
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
    it('should request the states from the API when it is created', () => {
      // the request was already answered in beforeEach, so create a second panel to see it
      TestBed.createComponent(AddressPanel);

      const request = httpTestingController.expectOne(statesUrl);
      expect(request.request.method).toBe('GET');
      request.flush([]);
    });

    it('should have no states until the API has answered', () => {
      const pending = TestBed.createComponent(AddressPanel);

      expect(pending.componentInstance.states()).toEqual([]);
      httpTestingController.expectOne(statesUrl).flush(serverStates);
    });

    it('should expose the states returned by the service', () => {
      expect(component.states()).toHaveLength(serverStates.length);
      expect(component.states()).toContainEqual({ name: 'Oregon', code: 'OR' });
    });

    it('should list the states alphabetically by name', () => {
      const names = component.states().map(state => state.name);

      expect(names).toEqual(['Arizona', 'Oregon', 'Texas']);
    });

    it('should have a unique two letter code for every state', () => {
      const codes = component.states().map(state => state.code);

      expect(new Set(codes).size).toBe(codes.length);
      codes.forEach(code => expect(code).toMatch(/^[A-Z]{2}$/));
    });

    it('should show the states once they arrive', () => {
      const pending = TestBed.createComponent(AddressPanel);
      httpTestingController.expectOne(statesUrl).flush(serverStates);

      expect(pending.componentInstance.states().map(state => state.code)).toEqual(['AZ', 'OR', 'TX']);
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
