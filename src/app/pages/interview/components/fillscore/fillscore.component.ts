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
  scores = Data.scores;

  sum = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  // questions = Data.questions;
  onSelectType(type) {
    this.selectedTypeID = type.id;
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
      this.candidateService.getCandidate();
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
    if (this.interviews.candidate_id == 0) {
      content += 'candidate, ';
    }
    if (this.interviews.interviews[this.selectedTypeID].interviewer_id == 0) {
      content += 'interviewer, ';
    }
    if (!this.interviewDate && this.selectedTypeID!=0) {
      content += 'date, ';
    }
    if (this.selectedTypeID == 0) {
      for (const s of this.interviews.interviews[this.selectedTypeID].score.slice(0, 5)) {
        if (!s) {
          content += 'score, ';
          break;
        }
      }
    }else {
      for (const s of this.interviews.interviews[this.selectedTypeID].score.slice(0, 9)) {
        if (!s) {
          content += 'score, ';
          break;
        }
      }
    }
    if (content) {
      content = content.substring(0, content.length - 2);
      const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
      activeModal.componentInstance.modalHeader = 'Error: fields are empty';
      activeModal.componentInstance.modalContent = content;
    }else {
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
