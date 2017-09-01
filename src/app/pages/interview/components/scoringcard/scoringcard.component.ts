import { Component } from '@angular/core';
import {ScoringCardService} from "./scoringcard.service";
import { FillScoreService } from "../fillscore/fillscore.service"
import * as Global from '../../../global';
import { getScoringCard } from '../../data'
import { CompleterService, CompleterData,CompleterItem } from 'ng2-completer';
import * as Data from '../../data';

@Component({
  selector: 'scoringcard',
  templateUrl: './scoringcard.html',
  styles: [`
    td{
      line-height:normal !important;
    }
    .red-text{
      color:red;
    }`],
})

export class ScoringCardComponent {
  searchStr: string;
  dataService: CompleterData;
  title = 'Scoring Card Overview';
  data = getScoringCard("table");
  candidate_id:number;
  options: any;
  cv:Data.Interview1=new Data.Interview1();
  phone:Data.Interview1=new Data.Interview1();
  group:Data.Interview1=new Data.Interview1();
  onsite1:Data.Interview1=new Data.Interview1();
  onsite2:Data.Interview1=new Data.Interview1();
  onsite3:Data.Interview1=new Data.Interview1();
  common:Data.Interview1=new Data.Interview1();
  interviews:any;
  i:number=0;
  average=[0,0,0,0,0,0,0,0,0,0,0,0];

  onSelect(selected){
    if (selected) {
      this.service.search(selected.originalObject.candidate_id).subscribe(res => {this.candidate_id=res[0].candidate_id;this.generate()});
    } else {
    }
  }
  generate(){
    this.service.getInterview(this.candidate_id)
      .subscribe(interviews => {
        if(interviews[0][0]!=0){
          this.cv.interviewer_name=interviews[0][0].interview.interviewer_name;
          this.cv.score=interviews[0][0].score;
          this.cv.sum=interviews[0][0].interview.sum;
          this.cv.comment=interviews[0][0].interview.comment;
          this.cv.passed=interviews[0][0].interview.passed;
          for(let i of interviews[0][0].score){
            switch (i.score_cd){
              case "0":
                this.cv.sums[0]+= i.score*i.weight;
                break;
              case "1":
              case "2":
                this.cv.sums[1]+=i.score*i.weight;
                break;
              case "3":
                this.cv.sums[2]+=i.score*i.weight;
                break;
              case "4":
                this.cv.sums[3]+=i.score*i.weight;
                break;
            }
          }
          this.i+=1;
        }
        if(interviews[1][0]!=0){
          this.phone.interviewer_name=interviews[1][0].interview.interviewer_name;
          this.phone.score=interviews[1][0].score;
          this.phone.sum=interviews[1][0].interview.sum;
          this.phone.comment=interviews[1][0].interview.comment;
          this.phone.passed=interviews[1][0].interview.passed;
          for(let i of interviews[1][0].score){
            if(i.score_cd==0||i.score_cd==1||i.score_cd==2){
              this.phone.sums[0]+=+i.score*i.weight;
            }
            if(i.score_cd==3||i.score_cd==4){
              this.phone.sums[1]+=i.score*i.weight;
            }
            if(i.score_cd==5||i.score_cd==6){
              this.phone.sums[2]+=i.score*i.weight;
            }
            if(i.score_cd==7||i.score_cd==8){
              this.phone.sums[3]+=i.score*i.weight;
            }
          }
          this.i+=1;
        }
        if(interviews[2][0]!=0){
          this.group.interviewer_name=interviews[2][0].interview.interviewer_name;
          this.group.score=interviews[2][0].score;
          this.group.sum=interviews[2][0].interview.sum;
          this.group.comment=interviews[2][0].interview.comment;
          this.group.passed=interviews[2][0].interview.passed;
          for(let i of interviews[2][0].score){
            if(i.score_cd==0||i.score_cd==1||i.score_cd==2){
              this.group.sums[0]+=+i.score*i.weight;
            }
            if(i.score_cd==3||i.score_cd==4){
              this.group.sums[1]+=i.score*i.weight;
            }
            if(i.score_cd==5||i.score_cd==6){
              this.group.sums[2]+=i.score*i.weight;
            }
            if(i.score_cd==7||i.score_cd==8){
              this.group.sums[3]+=i.score*i.weight;
            }
          }
          this.i+=1;
        }
        if(interviews[3][0]!=0){
          this.onsite1.interviewer_name=interviews[3][0].interview.interviewer_name;
          this.onsite1.score=interviews[3][0].score;
          this.onsite1.sum=interviews[3][0].interview.sum;
          this.onsite1.comment=interviews[3][0].interview.comment;
          this.onsite1.passed=interviews[3][0].interview.passed;
          for(let i of interviews[3][0].score){
            if(i.score_cd==0||i.score_cd==1||i.score_cd==2){
              this.onsite1.sums[0]+=+i.score*i.weight;
            }
            if(i.score_cd==3||i.score_cd==4){
              this.onsite1.sums[1]+=i.score*i.weight;
            }
            if(i.score_cd==5||i.score_cd==6){
              this.onsite1.sums[2]+=i.score*i.weight;
            }
            if(i.score_cd==7||i.score_cd==8){
              this.onsite1.sums[3]+=i.score*i.weight;
            }
          }
          this.i+=1;
        }
        if(interviews[4][0]!=0){
          this.onsite2.interviewer_name=interviews[4][0].interview.interviewer_name;
          this.onsite2.score=interviews[4][0].score;
          this.onsite2.sum=interviews[4][0].interview.sum;
          this.onsite2.comment=interviews[4][0].interview.comment;
          this.onsite2.passed=interviews[4][0].interview.passed;
          for(let i of interviews[4][0].score){
            if(i.score_cd==0||i.score_cd==1||i.score_cd==2){
              this.onsite2.sums[0]+=+i.score*i.weight;
            }
            if(i.score_cd==3||i.score_cd==4){
              this.onsite2.sums[1]+=i.score*i.weight;
            }
            if(i.score_cd==5||i.score_cd==6){
              this.onsite2.sums[2]+=i.score*i.weight;
            }
            if(i.score_cd==7||i.score_cd==8){
              this.onsite2.sums[3]+=i.score*i.weight;
            }
          }
          this.i+=1;
        }
        if(interviews[5][0]!=0){
          this.onsite3.interviewer_name=interviews[5][0].interview.interviewer_name;
          this.onsite3.score=interviews[5][0].score;
          this.onsite3.sum=interviews[5][0].interview.sum;
          this.onsite3.comment=interviews[5][0].interview.comment;
          this.onsite3.passed=interviews[5][0].interview.passed;
          for(let i of interviews[5][0].score){
            if(i.score_cd==0||i.score_cd==1||i.score_cd==2){
              this.onsite3.sums[0]+=+i.score*i.weight;
            }
            if(i.score_cd==3||i.score_cd==4){
              this.onsite3.sums[1]+=i.score*i.weight;
            }
            if(i.score_cd==5||i.score_cd==6){
              this.onsite3.sums[2]+=i.score*i.weight;
            }
            if(i.score_cd==7||i.score_cd==8){
              this.onsite3.sums[3]+=i.score*i.weight;
            }
          }
          this.i+=1;
        }
        if(interviews[6][0]!=0){
          this.common.interviewer_name=interviews[6][0].interview.interviewer_name;
          this.common.score=interviews[6][0].score;
          this.common.sum=interviews[6][0].interview.sum;
          for(let i of interviews[5][0].score){
            if(i.score_cd==0){
              this.common.sums[0]+=+i.score*i.weight;
            }
            if(i.score_cd==1){
              this.common.sums[1]+=i.score*i.weight;
            }
            if(i.score_cd==2){
              this.common.sums[2]+=i.score*i.weight;
            }
            if(i.score_cd==3){
              this.common.sums[3]+=i.score*i.weight;
            }
          }
        }
      });
  }
  constructor(protected service: ScoringCardService,private completerService: CompleterService,protected service2: FillScoreService) {
    this.dataService = completerService.remote(Global.baseUrl+'searchCandidate/name/', 'name', 'name').descriptionField("description");
  }
}
