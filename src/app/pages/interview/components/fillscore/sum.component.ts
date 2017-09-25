import { Component,Input } from '@angular/core';
import * as Data from '../../data';

@Component({
  selector: 'sum',
  templateUrl: './sum.html',
  styles: [`.buffer-top{
    margin-top:10px;
  }
  hr{
    margin-top:0;
    margin-bottom: 10px;
  }
  .red-text{
    color: red;
  }`]
})
export class SumComponent {
  @Input() sums: number[][];
  @Input() status: string;
  @Input() common: string[];
  @Input() scores: string[];
  @Input() type: number;
  overAll: number = 0;
  constructor(){
    // this.sums=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  }
  get getSum(){
    let scores = this.scores;
    if (!scores){
      scores = ['0','0','0','0','0','0','0','0','0'];
    }
    let i = this.type;
    let common = this.common;

    if (i == 0) {
      this.sums[i][0] = +scores[0]*0.4;
      this.sums[i][1] = +scores[1]*0.1 + +common[0] + +scores[2]*0.15;
      this.sums[i][2] = +scores[3]*0.05;
      this.sums[i][3] = +scores[4]*0.2;
      this.sums[i][4] = +common[1] + +common[2] + +common[3];
    }else{
      this.sums[i][0] = +scores[0]*0.1 + +scores[1]*0.2 + +scores[2]*0.1;
      this.sums[i][1] = +scores[3]*0.1 + +common[0] + +scores[4]*0.15;
      this.sums[i][2] = +scores[5]*0.025 + +scores[6]*0.025;
      this.sums[i][3] = +scores[7]*0.1 + +scores[8]*0.1;
      this.sums[i][4] = +common[1] + +common[2] + +common[3];
    }
    let overall = this.overAll;
    for (let j = 0; i < this.sums[i].length; i++){
      overall += this.sums[i][j];
    }
    switch (i){
      case 0:
      this.status = overall < 2.5? 'failed': 'passed';
      break;
      case 1:
      this.status = overall < 2.5? 'failed': 'passed';
      default:
      this.status = overall < 3.5? 'failed': 'passed';
    }
    return this.sums[i];
  }
  get getAvg(){
    let avg=[0,0,0,0,0];
    for(let i in this.sums[0]){
      let k=0;
      for(let j in this.sums){
        if(this.sums[j][i]!=0){
          k+=1;
          avg[i]+=this.sums[j][i];
        }
      }
      if(k!=0) avg[i]/=k;
    }
    return avg;
  }
}
