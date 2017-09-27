import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Data from '../../data'
import { Interview, createInterview } from '../../../people';

@Component({
  selector: 'common',
  templateUrl: './common.html',
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
export class CommonComponent {
  @Input() interview: Interview;
  @Input() type: number;
  questionList = Data.questions;
  scoreList = Data.scores;
  checkPoints = Data.checkPoints;
  constructor(){}
}
