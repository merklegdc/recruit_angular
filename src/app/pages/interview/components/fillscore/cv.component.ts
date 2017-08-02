import { Component,Input } from '@angular/core';
import * as Data from '../../data'

@Component({
  selector: 'cv',
  templateUrl: './cv.html',
  styles: [`.buffer-top{
    margin-top:10px;
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
