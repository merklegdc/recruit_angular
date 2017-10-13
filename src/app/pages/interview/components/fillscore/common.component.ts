import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Data from '../../data'
import { Interview, createInterview } from '../../../people';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'common',
  templateUrl: './common.html',
  styles: [`
  :host /deep/ .completer-dropdown {
    display: block;
    width: 500px !important;
  }
    
  .buffer-top{
    margin-top:10px;
  }
  .ng-invalid:not(ng2-completer)  {
    border-left: 5px solid #a94442; /* red */
  }
  .ng-valid:not(ng2-completer)  {
    border-left: 5px solid #42A948; /* green */
  }`]
})
export class CommonComponent {
  @Input() interview: Interview;
  @Input() type: number;
  questionList = Data.questions;
  scoreList = Data.scores;
  checkPoints = Data.checkPoints;
  dataService: CompleterData[] = [];
  constructor(private completerService: CompleterService) {
    // for (let i = 0; i < 9; i++) {
    //   this.dataService.push(completerService.local([]));
    // }
    for (let item of Data.q) {
      if (item.id !== -1){
        this.dataService[item.id] = completerService.local(item.Q, null, 'q');
      }
    }
  }
}
