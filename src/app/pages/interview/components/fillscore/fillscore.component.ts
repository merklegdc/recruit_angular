import { Component, DoCheck, OnInit } from '@angular/core';
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
import { Candidate, CandidateService, Interview, createCandidate, createInterview } from '../../../people';

@Component({
  selector: 'fillscore',
  templateUrl: './fillscore.html',
  styleUrls: ['./fillscore.scss'],
  providers: [FillScoreService]
})
export class FillScoreComponent implements DoCheck, OnInit {
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };
  candidateName = '';
  interviewerName = '';
  interviewDate: IMyDateModel;
  title = 'Fill Score';
  options: any;
  candidate: Candidate;
  interview: Interview;
  selectedTypeID = 0;
  dataService: CompleterData;
  dataService2: CompleterData;
  types = [{ 'name': 'CV Screening', id: 0 }, 
  { 'name': 'Phone Interview', id: 1 }, 
  { 'name': 'Group Interview', id: 2 },
  { 'name': 'Interview 1', id: 3 },
  { 'name': 'Interview 2', id: 4 },
  { 'name': 'Interview 3', id: 5 }];
  __sums = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  __sum = 0;
  get diag() {
    return JSON.stringify(this.interview);
  }
  ngOnInit(): void {
    this.service.ifValidUser()
    .then(data => {
      if (data ===  'access denied') {
        this.openModal('Access Denied', 'you dont have permision, pls contact system admin?');
      }
    })
  }
  ngDoCheck(){
    this.__sums = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    let j = 0;
    for (let i in Data.checkPoints) {
      for (let k = 0; k < Data.checkPoints[i].scoreNo; k++) {
        this.__sums[this.selectedTypeID][i] += +Data.weight[this.selectedTypeID][j] * +this.interview[`score${j+1}`];
        j++;
      }
    }
    let i = this.selectedTypeID;
    this.__sum = 0;
    for (let j = 0; j < this.__sums[i].length; j++) {
      this.__sum += this.__sums[i][j];
    }
    this.interview.sum = this.__sum.toString();
    switch (i) {
      case 0:
        this.interview.status = this.__sum < 2.5 ? 'failed' : 'passed';
        break;
      case 1:
        this.interview.status = this.__sum < 2.5 ? 'failed' : 'passed';
      default:
        this.interview.status = this.__sum < 3.5 ? 'failed' : 'passed';
    }
  }
  onSelectType(type) {
    this.interview = createInterview();
    this.selectedTypeID = type.id;
    this.interviewDate = null;
    if(!this.candidate.candidate_id){
      return;
    }
    this.service.getInterview(this.candidate.candidate_id, type.id)
    .then(data => {
      if (data)  this.interview = data;
      if (this.interview.date) 
      this.interviewDate = {
        date: null,
        formatted: this.interview.date,
        jsdate: null,
        epoc: null,
      };
    })
    .catch();
  }
  onSelectCandidate(selected) {
    if (selected) {
      this.candidate.candidate_id = selected.originalObject.candidate_id;
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
      this.onSelectType(this.types[this.selectedTypeID]);
    } 
  }
  onSubmit() {
    let content: string = '';
    let cvRequired: string[] = ['interviewer', 'score1', 'score4', 'score5', 'score6', 'score7', 'score9', 'score11', 'score12', 'score13'];
    let commonRequired: string[] = ['interviewer', 'score1', 'score2', 'score3', 'score4', 'score5', 'score6', 'score7', 'score8', 'score9', 'score10', 'score11', 'score12', 'score13'];
    let required = this.selectedTypeID? commonRequired: cvRequired;
    if (!this.candidate.candidate_id) content += 'candidate, ';
    for (let key in this.interview) {
      if (required.indexOf(key) !== -1) {
        if (!this.interview[key]) {
          if (key.indexOf('score') !== -1) {
            content += 'score, ';
            break;
          } else {
            content += `${key}, `;
          }
        }
      }
    }
    if (content) {
      content = content.substring(0, content.length - 2);
      this.openModal('Error: fields are empty', content);
    }else {
      this.interview.candidate_id = this.candidate.candidate_id;
      this.service.saveInterview(this.candidate.candidate_id, this.selectedTypeID, this.interview)
      .then(data => { if (data)  this.openModal('Success'); })
      .catch(error =>  this.openModal('Nothing changed'));
    }
  }
  dateChange(event){
    this.interview.date = this.interviewDate.formatted;
  }
  openModal(header: string, content?: string){
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalContent = content;
  }
  constructor(private router: Router, private service: FillScoreService, private completerService: CompleterService,
    private modalService: NgbModal, private candidateService: CandidateService) {
    this.dataService = completerService.remote(environment.SearchUrl+'searchCandidate/name/', 'name', 'name').descriptionField("description");
    this.dataService2 = completerService.remote(environment.SearchUrl+'searchInterviewer/name/', 'name', 'name');
    this.interview = createInterview();
    this.candidate = createCandidate();
  }
}
