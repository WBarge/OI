import { Component, inject, Input, input, signal,ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Address } from '../../model/address';
import { State } from '../../model/results/state';

import { StateService } from '../../services/state-service';

import { FieldsetModule } from 'primeng/fieldset';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { LabelModule } from 'primeng/label';


@Component({
  selector: 'address-panel',
  imports: [FormsModule,
    FieldsetModule,
    SelectModule,
    InputTextModule,
    InputMaskModule,
    LabelModule
  ],
  providers:[StateService],
  styleUrl: './address-panel.css',
  templateUrl: './address-panel.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AddressPanel  {
   @Input('Header') headingTest: string = "";
   @Input('AddressData')data:Address = new Address();

  readonly isHidden = input(false);

  private stateService:StateService = inject(StateService);

  public states = signal<State[]>([]);

  constructor() {
    this.stateService.getStates().subscribe((results: State[]) => this.states.set(results));
  }

}
