import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() scores: string[];
  @Input() questions: any;
  @Input() comment: any;
  @Input() type: number;
  @Output() scoresChange = new EventEmitter<any>();
  @Output() commentChange = new EventEmitter<any>();
  setScores(event){
    this.scoresChange.emit(this.scores.slice());
  }
  setComment(event){
    this.commentChange.emit(this.comment);
  }
  constructor(){}
  scoreList = Data.scores;
  checkPoints = Data.checkPoints;
  model: any;
}
