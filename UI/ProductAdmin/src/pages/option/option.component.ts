import { Component, Input, OnInit, ChangeDetectionStrategy,inject } from '@angular/core';
import { OptionService } from '../../services/option.service';
import { Option } from '../../models/results/option';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitterModule } from 'primeng/splitter';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ScrollAreaModule } from 'primeng/scrollarea';
import { SelectModule } from 'primeng/select';
import { OptionSelection } from '../../models/results/optionSelection';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { IftaLabelModule } from 'primeng/iftalabel';


@Component({
   imports: [InputTextModule,
      InputNumberModule,
      FormsModule,
      SplitterModule,
      TextareaModule,
      ButtonModule,
      ScrollAreaModule,
      SelectModule,
      FieldsetModule,
      ToolbarModule,
      IftaLabelModule
    ],
    providers: [OptionService],
  selector: 'app-option',
  styleUrl: './option.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './option.component.html',
})
export class OptionComponent implements OnInit {
  @Input() set optionId (optionId:string){
      this.oId = optionId;
  }

  private msgService=inject(MessageService);
  private dataService=inject(OptionService);
  private router=inject(Router);

  public oId:string = '';
  public _optionObj:Option | null =  null;

  ngOnInit(): void {
    if (this.oId){
      this.sendMessage('info','System Message','Loading Option')
      this.dataService.getOptionById(this.oId).subscribe({
        next:(option) =>{
          this._optionObj = option;
        }
      });
    }
  }

  private sendMessage(severity:string,summary:string,detail:string){
    this.msgService.add({severity:severity,summary:summary,detail:detail});
  }

  submit(optionToUpdate:Option){
    this.sendMessage('info','System Message','Updating option');
    this.dataService.update(optionToUpdate).subscribe({
      next: () => {
        this.router.navigate(['/options']);
      }
    });

  }

}
