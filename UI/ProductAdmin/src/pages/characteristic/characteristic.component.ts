import { Component, Input, OnInit, ChangeDetectionStrategy,inject } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-characteristic',
  styleUrl: './characteristic.component.css',
  templateUrl: './characteristic.component.html',
})
export class CharacteristicComponent {
   @Input() set charId (charId:string){
      this.cId = charId;
  }

  public cId:string = '';
}
