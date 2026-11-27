import { Component, Input, OnInit, ChangeDetectionStrategy,inject } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import {CharacteristicService} from '../../services/characteristic.service'
import { TableModule } from 'primeng/table';
import { Trash } from '@primeicons/angular/trash';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ScrollAreaModule } from 'primeng/scrollarea';
import { SelectModule } from 'primeng/select';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Characteristic } from '../../models/results/characteristic';
import { CharacteristicValue } from '../../models/results/characteristic-value';



@Component({
  imports: [TableModule,
      InputTextModule,
      InputNumberModule,
      FormsModule,
      SplitterModule,
      TextareaModule,
      ButtonModule,
      ScrollAreaModule,
      SelectModule,
      FieldsetModule,
      ToolbarModule,
      IftaLabelModule,
      Trash
    ],
  selector: 'app-characteristic-list',
  styleUrl: './characteristic-list.component.css',
  templateUrl: './characteristic-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CharacteristicListComponent implements OnInit {

  private msgService=inject(MessageService);
  private dataService=inject(CharacteristicService);
  private router=inject(Router);

  public characteristics:Characteristic[] = [];
  public selectedCharacteristic!:Characteristic;
  public newCharacteristic!:Characteristic;
  public newCharacteristicValue!:CharacteristicValue;
  public characteristicValues:CharacteristicValue[] = [];

  loadCharacteristics(){
    this.sendMessage('info','System Message','Loading Characteristics')
    this.dataService.getCharacteristics()
      .subscribe((results:Characteristic[])=>{
      this.characteristics = results;
    });
  }

  loadCharacteristicValues(){
    this.characteristicValues = [];
    this.characteristicValues = this.selectedCharacteristic.values;
  }

  public ngOnInit(): void {
    this.loadCharacteristics();
    this.newCharacteristic = new Characteristic();
    this.newCharacteristicValue = new CharacteristicValue();
  }

  onCharRowSelect(event: any){
    this.selectedCharacteristic = event.data;
    this.loadCharacteristicValues();
    this.newCharacteristicValue = new CharacteristicValue();
  }

  submitCharacteristic(characteristicToAdd:Characteristic){
    this.dataService.addCharacteristic(characteristicToAdd.name)
    .subscribe((newId:string) => {
      characteristicToAdd.idValue = newId;
      this.characteristics.push(characteristicToAdd);
      this.newCharacteristic = new Characteristic();
    });
  }

  submitCharacteristicValue(characteristicValueToAdd:CharacteristicValue){
    if (this.selectedCharacteristic == null || characteristicValueToAdd.value == null || characteristicValueToAdd.value == '')
    {
      return;
    }
    this.dataService.addCharacteristicValue(this.selectedCharacteristic.idValue, characteristicValueToAdd.value)
    .subscribe((newId:string) => {
      characteristicValueToAdd.idValue = newId;
      if (this.selectedCharacteristic.values == null)
      {
        this.selectedCharacteristic.values = [];
      }
      this.selectedCharacteristic.values.push(characteristicValueToAdd);
      this.loadCharacteristicValues();
      this.newCharacteristicValue = new CharacteristicValue();
    });
  }


  deleteCharacteristic(charToDelete:Characteristic){
    this.sendMessage('info','System Message', 'Removing '+charToDelete.name);
    this.dataService.deleteCharacteristic(charToDelete.idValue).subscribe(()=>{
      this.characteristics = this.characteristics.filter(c=>c.idValue != charToDelete.idValue);
      this.characteristicValues = [];
      this.newCharacteristicValue = new CharacteristicValue();
    });
  }

  deleteCharacteristicValue(valueToDelete:CharacteristicValue){
    this.dataService.deleteCharacteristicValue(this.selectedCharacteristic.idValue, valueToDelete.idValue)
      .subscribe(()=>{
        this.selectedCharacteristic.values = this.selectedCharacteristic.values.filter(c=>c.idValue != valueToDelete.idValue);
        this.loadCharacteristicValues();
      });
  }

  private sendMessage(severity:string,summary:string,detail:string){
    this.msgService.add({severity:severity,summary:summary,detail:detail});
  }
}
