import { Component,Input } from '@angular/core';
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
  @Input() interviews: Data.Interviews;
  @Input() type:number;
  constructor(){}
  scores = Data.scores;
  checkPoints = Data.checkPoints;
  score: any[] = [];
  model: any;
  setScore(event){
  }
}
