import { Component } from '@angular/core';
import { FillScoreService } from "./fillscore.service";
import * as Data from '../../data';
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { CVComponent } from './cv.component';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { DefaultModal } from '../../../modal/default-modal/default-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Candidate, CandidateService } from '../../../people';

@Component({
  selector: 'fillscore',
  templateUrl: './fillscore.html',
  styleUrls: ['./fillscore.scss'],
  providers: [FillScoreService]
})
export class FillScoreComponent {
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };
  candidateName = '';
  interviewerName = '';
  interviewDate: IMyDateModel;
  title = 'Fill Score';
  data: any;
  options: any;
  candidate: Candidate = new Candidate();
  interviews = new Data.Interviews();
  selectedTypeID = 0;
  dataService: CompleterData;
  dataService2: CompleterData;
  types = [{ 'name': 'CV Screening', id: 0 }, 
  { 'name': 'Phone Interview', id: 1 }, 
  { 'name': 'Group Interview', id: 2 },
  { 'name': 'Interview 1', id: 3 },
  { 'name': 'Interview 2', id: 4 },
  { 'name': 'Interview 3', id: 5 }];
  scores = ['','','','','','','','',''];
  questions = ['', '', '', '', '', '', '', '', ''];
  comment: string;
  status: string = 'pending';
  sum = 0;
  commonScore = ['', '', '']; 
  sums = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  // questions = Data.questions;
  onSelectType(type) {
    this.selectedTypeID = type.id;
    this.candidateService.getCandidate(this.candidate.candidate_id, type.id).then(
      data => {
        for (let key in data)
          this.candidate[key] = data[key];
      }
    );
    let interview = this.interviews.interviews[type.id];
    let interview2 = this.interviews.interviews[6];
    this.service.getInterviews(this.interviews.candidate_id,type.id).subscribe(
      data => {
        if (data[0][0] == '0') { // no interview_id
          interview = new Data.Interview();
          this.interviewDate = null;
          interview.type = type.id;
        }else {
          interview.interview_id = data[0][0].interview.interview_id;
          interview.interviewer_id = data[0][0].interview.interviewer_id;
          interview.interviewer_name = data[0][0].interview.interviewer_name;
          interview.comment = data[0][0].interview.comment;
          if (data[0][0].interview.date) {
            this.interviewDate = {
              date: null,
              formatted: data[0][0].interview.date,
              jsdate: null,
              epoc: null,
            };
          }else {
            this.interviewDate = null;
          }
          for (const i of data[0][0].score) {
            interview.score[i.score_cd] = i.score;
            interview.q[i.score_cd] = i.question;
          }
        }
        if (data[1][0] == '0') {
          interview2 = new Data.Interview();
          interview2.type = 6;
        }else {
          interview2.interview_id = data[1][0].interview.interview_id;
          interview2.interviewer_id = data[1][0].interview.interviewer_id;
          interview2.interviewer_name = data[1][0].interview.interviewer_name;
          for (const i of data[1][0].score) {
            interview2.score[i.score_cd] = i.score;
            interview2.q[i.score_cd] = i.question;
          }
        }
      }
    );
  }
  onSelectCandidate(selected) {
    if (selected) {
      this.candidate = new Candidate();
      this.candidate.candidate_id = selected.originalObject.candidate_id;
      // this.candidateService.getCandidate(selected.originalObject.candidate_id);
      this.interviews = new Data.Interviews();
      this.selectedTypeID = 0;
      if (selected.originalObject.if_group == 'N') {
        this.types = [{ 'name': 'CV Screening', id: 0 }, 
        { 'name': 'Phone Interview', id: 1 }, 
        { 'name': 'Interview 1', id: 3 },
        { 'name': 'Interview 2', id: 4 },
        { 'name': 'Interview 3', id: 5 }];
      }else {
        this.types = [{ 'name': 'CV Screening', id: 0 }, 
        { 'name': 'Phone Interview', id: 1 }, 
        { 'name': 'Group Interview', id: 2 },
        { 'name': 'Interview 1', id: 3 },
        { 'name': 'Interview 2', id: 4 },
        { 'name': 'Interview 3', id: 5 }];
      }
      this.interviews.candidate_name = selected.originalObject.name;
      this.interviews.candidate_id = selected.originalObject.candidate_id;
      this.onSelectType(this.types[this.selectedTypeID]);
    } 
  }
  onSelectInterviewer(selected) {

    if (selected) {
      this.interviews.interviews[this.selectedTypeID].interviewer_name = selected.originalObject.name;
      this.interviews.interviews[this.selectedTypeID].interviewer_id = selected.originalObject.interviewer_id;
    } else {
    }
  }
  onSubmit() {
    let content: string = '';
    let c = this.candidate;
    if (this.candidate.candidate_id == 0) {
      content += 'candidate, ';
    }
    if (this.interviewerName == '') {
      content += 'interviewer, ';
    }
    if (!this.interviewDate && this.selectedTypeID!=0) {
      content += 'date, ';
    }
    for (let value of this.scores){
      if (value === '0'){
        content += 'score, ';
        break;
      }
    }
    if (content) {
      content = content.substring(0, content.length - 2);
      const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
      activeModal.componentInstance.modalHeader = 'Error: fields are empty';
      activeModal.componentInstance.modalContent = content;
    }else {
      switch (this.selectedTypeID){
        case 0:
        c.cv_interviewer = this.interviewerName;
        c.cv_date = this.interviewDate.formatted;
        c.cv_comment = this.comment;
        c.cv_status = this.status;
        c.cv_score1 = this.scores[0];
        c.cv_score2 = this.scores[1];
        c.cv_score3 = this.scores[2];
        c.cv_score4 = this.scores[3];
        c.cv_score5 = this.scores[4];
        c.cv_score6 = this.scores[5];
        c.cv_score7 = this.scores[6];
        c.cv_score8 = this.scores[7];
        c.cv_score9 = this.scores[8];
        case 1:
        c.phone_interviewer = this.interviewerName;
        c.phone_date = this.interviewDate.formatted;
        c.phone_comment = this.comment;
        c.phone_status = this.status;
        c.phone_sum = this.sum.toString();
        c.phone_score1 = this.scores[0];
        c.phone_score2 = this.scores[1];
        c.phone_score3 = this.scores[2];
        c.phone_score4 = this.scores[3];
        c.phone_score5 = this.scores[4];
        c.phone_score6 = this.scores[5];
        c.phone_score7 = this.scores[6];
        c.phone_score8 = this.scores[7];
        c.phone_score9 = this.scores[8];
        c.phone_question1 = this.questions[0];
        c.phone_question2 = this.questions[1];
        c.phone_question3 = this.questions[2];
        c.phone_question4 = this.questions[3];
        c.phone_question5 = this.questions[4];
        c.phone_question6 = this.questions[5];
        c.phone_question7 = this.questions[6];
        c.phone_question8 = this.questions[7];
        c.phone_question9 = this.questions[8];
        case 2:
        c.group_interviewer = this.interviewerName;
        c.group_date = this.interviewDate.formatted;
        c.group_comment = this.comment;
        c.group_status = this.status;
        c.group_sum = this.sum.toString();
        c.group_score1 = this.scores[0];
        c.group_score2 = this.scores[1];
        c.group_score3 = this.scores[2];
        c.group_score4 = this.scores[3];
        c.group_score5 = this.scores[4];
        c.group_score6 = this.scores[5];
        c.group_score7 = this.scores[6];
        c.group_score8 = this.scores[7];
        c.group_score9 = this.scores[8];
        c.group_question1 = this.questions[0];
        c.group_question2 = this.questions[1];
        c.group_question3 = this.questions[2];
        c.group_question4 = this.questions[3];
        c.group_question5 = this.questions[4];
        c.group_question6 = this.questions[5];
        c.group_question7 = this.questions[6];
        c.group_question8 = this.questions[7];
        c.group_question9 = this.questions[8];
        case 3:
        c.onsite1_interviewer = this.interviewerName;
        c.onsite1_date = this.interviewDate.formatted;
        c.onsite1_comment = this.comment;
        c.onsite1_status = this.status;
        c.onsite1_sum = this.sum.toString();
        c.onsite1_score1 = this.scores[0];
        c.onsite1_score2 = this.scores[1];
        c.onsite1_score3 = this.scores[2];
        c.onsite1_score4 = this.scores[3];
        c.onsite1_score5 = this.scores[4];
        c.onsite1_score6 = this.scores[5];
        c.onsite1_score7 = this.scores[6];
        c.onsite1_score8 = this.scores[7];
        c.onsite1_score9 = this.scores[8];
        c.onsite1_question1 = this.questions[0];
        c.onsite1_question2 = this.questions[1];
        c.onsite1_question3 = this.questions[2];
        c.onsite1_question4 = this.questions[3];
        c.onsite1_question5 = this.questions[4];
        c.onsite1_question6 = this.questions[5];
        c.onsite1_question7 = this.questions[6];
        c.onsite1_question8 = this.questions[7];
        c.onsite1_question9 = this.questions[8];
        case 4:
        c.onsite2_interviewer = this.interviewerName;
        c.onsite2_date = this.interviewDate.formatted;
        c.onsite2_comment = this.comment;
        c.onsite2_score1 = this.scores[0];
        c.onsite2_score2 = this.scores[1];
        c.onsite2_score3 = this.scores[2];
        c.onsite2_score4 = this.scores[3];
        c.onsite2_score5 = this.scores[4];
        c.onsite2_score6 = this.scores[5];
        c.onsite2_score7 = this.scores[6];
        c.onsite2_score8 = this.scores[7];
        c.onsite2_score9 = this.scores[8];
        case 5:
        c.onsite3_interviewer = this.interviewerName;
        c.onsite3_date = this.interviewDate.formatted;
        c.onsite3_comment = this.comment;
        c.onsite3_score1 = this.scores[0];
        c.onsite3_score2 = this.scores[1];
        c.onsite3_score3 = this.scores[2];
        c.onsite3_score4 = this.scores[3];
        c.onsite3_score5 = this.scores[4];
        c.onsite3_score6 = this.scores[5];
        c.onsite3_score7 = this.scores[6];
        c.onsite3_score8 = this.scores[7];
        c.onsite3_score9 = this.scores[8];
      }
      this.candidateService.saveCandidate(this.selectedTypeID, this.candidate, this.selectedTypeID)
      .then(data => { if (data) {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = 'Success';
      }})
      .catch(error => {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = 'Nothing changed';
      });
      this.helper();
      const interview = this.interviews.interviews[this.selectedTypeID];
      const oneInterview = new Data.OneInterview(this.interviews.candidate_id,
        this.interviews.interviews[this.selectedTypeID], this.interviews.interviews[6]);
      if (interview.interview_id == 0) {
        this.service.addInterview(oneInterview).then(data => { 
          interview.interview_id = data;
          if (data) {
            const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
            activeModal.componentInstance.modalHeader = 'Success';
          }
         });
      }else {
        this.service.saveInterview(interview.interview_id, oneInterview)
        .then(data => { if (data) {
          const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
          activeModal.componentInstance.modalHeader = 'Success';
        }})
        .catch(error => {
          const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
          activeModal.componentInstance.modalHeader = 'Nothing changed';
        });
      }
    }
  }
  scoresChange(){
    let scores = this.scores;
    if (!scores){
      scores = ['0','0','0','0','0','0','0','0','0'];
    }
    let i = this.selectedTypeID;
    let common = this.commonScore;

    if (i == 0) {
      this.commonScore[0] = scores[2];
      this.commonScore[1] = scores[6];
      this.commonScore[2] = scores[7];
      this.commonScore[3] = scores[8];
      this.sums[i][0] = +scores[0]*0.4;
      this.sums[i][1] = +scores[1]*0.1 + +common[0] + +scores[3]*0.15;
      this.sums[i][2] = +scores[4]*0.05;
      this.sums[i][3] = +scores[5]*0.2;
      this.sums[i][4] = +common[1] + +common[2] + +common[3];
    }else{
      this.sums[i][0] = +scores[0]*0.1 + +scores[1]*0.2 + +scores[2]*0.1;
      this.sums[i][1] = +scores[3]*0.1 + +common[0] + +scores[4]*0.15;
      this.sums[i][2] = +scores[5]*0.025 + +scores[6]*0.025;
      this.sums[i][3] = +scores[7]*0.1 + +scores[8]*0.1;
      this.sums[i][4] = +common[1] + +common[2] + +common[3];
    }
    let sum = 0;
    for (let j = 0; j < this.sums[i].length; j++){
      sum += this.sums[i][j];
    }
    this.sum = sum;
    switch (i){
      case 0:
      this.status = sum < 2.5? 'failed': 'passed';
      break;
      case 1:
      this.status = sum < 2.5? 'failed': 'passed';
      default:
      this.status = sum < 3.5? 'failed': 'passed';
    }
  }
  helper() {
    if (this.interviewDate) {
      this.interviews.interviews[this.selectedTypeID].date = this.interviewDate.formatted;
    }
  }
  get diagnostic() { return JSON.stringify(this.interviews); }
  // getInterview(){
  //   this.fillscoreService.getInterview().then(interview => this.interview = interview);
  // }
  constructor(private router: Router, private service: FillScoreService, private completerService: CompleterService,
    private modalService: NgbModal, private candidateService: CandidateService) {
    this.dataService = completerService.remote(environment.SearchUrl+'searchCandidate/name/', 'name', 'name').descriptionField("description");
    this.dataService2 = completerService.remote(environment.SearchUrl+'searchInterviewer/name/', 'name', 'name');
    //this.interviews = new Data.Interviews();
  }
}
