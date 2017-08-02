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
  @Input() sum: number[][];
  @Input() interviews: Data.Interviews;
  @Input() type: number;
  constructor(){
    // this.sum=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  }
  get getSum(){
    let scores: string[];
    let common=this.interviews.interviews[6].score;
    let i=this.type;
    scores=this.interviews.interviews[i].score;

    if(i==0) {
      this.sum[i][0]=+scores[0]*0.4;
      this.sum[i][1]=+scores[1]*0.1 + +common[0] + +scores[2]*0.15;
      this.sum[i][2]=+scores[3]*0.05;
      this.sum[i][3]=+scores[4]*0.2;
      this.sum[i][4]=+common[1]+ +common[2]+ +common[3];
    }else{
      this.sum[i][0]=+scores[0]*0.1 + +scores[1]*0.2 + +scores[2]*0.1;
      this.sum[i][1]=+scores[3]*0.1 + +common[0] + +scores[4]*0.15;
      this.sum[i][2]=+scores[5]*0.025 + +scores[6]*0.025;
      this.sum[i][3]=+scores[7]*0.1 + +scores[8]*0.1;
      this.sum[i][4]=+common[1]+ +common[2]+ +common[3];
    }
    return this.sum[i];
  }
  get getAvg(){
    let avg=[0,0,0,0,0];
    for(let i in this.sum[0]){
      let k=0;
      for(let j in this.sum){
        if(this.sum[j][i]!=0){
          k+=1;
          avg[i]+=this.sum[j][i];
        }
      }
      if(k!=0) avg[i]/=k;
    }
    return avg;
  }
  get overAll(){
    let overall=0;
    for (let i = 0;i<this.sum[this.type].length;i++ ){
      overall += this.sum[this.type][i];
    }
    return overall;
  }
}
