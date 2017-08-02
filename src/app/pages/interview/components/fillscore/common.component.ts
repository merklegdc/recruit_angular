import { Component,Input } from '@angular/core';
import * as Data from '../../data'

@Component({
  selector: 'common',
  templateUrl: './common.html',
  styles: [`.buffer-top{
    margin-top:10px;
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
