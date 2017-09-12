import { Component,Input } from '@angular/core';
import * as Data from '../../data'

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
  @Input() interviews: Data.Interviews;
  @Input() type: number;
  @Input() sum: number[][];
  constructor(){}
  scores = Data.scores;
  checkPoints = Data.checkPoints;
  questions = Data.questions;
  score: any[] = [];
  model: any;
  setScore(event){
  }
}
