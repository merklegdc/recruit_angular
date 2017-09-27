import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Interview, createInterview } from '../../../people';
import * as Data from '../../data'

@Component({
  selector: 'cv',
  templateUrl: './cv.html',
  styles: [`.buffer-top{
    margin-top:10px;
  }
  .ng-invalid  {
    border-left: 5px solid #a94442; /* red */
  }
  .ng-valid  {
    border-left: 5px solid #42A948; /* green */
  }`]
})
export class CVComponent {
  @Input() interview: Interview;
  @Input() type: number;
  scoreList = Data.scores;
  checkPoints = Data.checkPoints;
}
