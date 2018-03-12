import { Component, DoCheck, OnInit } from '@angular/core';
import { ScoringCardService } from "./scoringcard.service";
import { FillScoreService } from "../fillscore/fillscore.service"
// import * as Global from '../../../global';
import { environment } from '../../../../../environments/environment';
import { CompleterService, CompleterData,CompleterItem } from 'ng2-completer';
import * as Data from '../../data';
import { Candidate, CandidateService, Interview, createCandidate, createInterview } from '../../../people';
import { DefaultModal } from '../../../modal/default-modal/default-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";

@Component({
  selector: 'scoringcard',
  templateUrl: './scoringcard.html',
  styles: [`
    td{
      line-height:normal !important;
    }
    .red-text{
      color:red;
    }
    button{
      position:absolute;
      top: 23px;
    }
    `],
})

export class ScoringCardComponent implements OnInit {
  searchStr: string;
  dataService: CompleterData;
  title = 'Scoring Card Overview';
  interviews: Interview[] = [];
  cv = createInterview();
  phone = createInterview();
  group = createInterview();
  onsite1 = createInterview();
  onsite2 = createInterview();
  onsite3 = createInterview();
  type = ['cv', 'phone', 'group', 'onsite1', 'onsite12', 'onsite3',];
  candidate_id: number;
  __sums = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  ngOnInit() {
    this.service.ifValidUser()
    .then(data => {
      if (data ===  'access denied') {
        this.openModal('Access Denied', 'you dont have permision, pls contact system admin?');
      }
    })
    for (let i = 0; i<6; i++){
      this.interviews[i] = createInterview();
    }
  }
  onSelect(selected) {
    if (selected) {
      this.candidate_id = selected.originalObject.candidate_id;
      this.service.getInterview(selected.originalObject.candidate_id)
        .subscribe(res => {
          this.interviews = res;
          this.__sums = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
          for (let i = 0; i < 6; i++) {
            let scores = [];
            for (let j =0; j < 13; j++){
              scores[j] = +this.interviews[i][`score${j + 1}`] * +Data.weight[i][j];
            }
            let l = 0;
            for (let j in Data.checkPoints) {
              for (let k = 0; k < Data.checkPoints[j].scoreNo; k++) {
                this.__sums[i][j] += scores[l];
                l++;
              }
            }
          }
        });
    }
  }
  onExport() {
    this.service.downloadScoringCard(this.candidate_id)
    .subscribe(blob => { saveAs(blob, 'Scoring Card.xlsx');
    });
  }
  openModal(header: string, content?: string){
    const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalContent = content;
  }
  constructor(protected service: ScoringCardService,
    private completerService: CompleterService,
    protected service2: FillScoreService, protected modalService: NgbModal) {
    this.dataService = completerService.remote(environment.SearchUrl+'searchCandidate/name/', 'name', 'name').descriptionField("description");
  }
}
