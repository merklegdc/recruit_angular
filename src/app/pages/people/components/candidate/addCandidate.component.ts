import { Component } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
// import * as Global from '../../../global';
import { baseUrl } from '../../../../../environments/environment';
import { Candidate, config } from './candidate';
import { CandidateService } from './candidate.service';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../modal/default-modal/default-modal.component';

@Component({
  selector: 'addCandidate',
  templateUrl: './addCandidate.html',
  styleUrls: ['./candidate.scss'],
})

export class AddCandidateComponent {
  myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
  };   
  receiveDate: IMyDateModel;
  assignDate: IMyDateModel;
  positions: any = [{ id: 0, text: '' }];
  config = config;
  searchStr: string;
  nameServiceCN: CompleterData;
  nameServiceEN: CompleterData;
  title = 'Add Candidate';
  candidate: Candidate = new Candidate();

  get diag() {
    return JSON.stringify(this.candidate);
  }
  get serviceLine() {
    for (const sl of config.service_line) {
      if (this.candidate.service_line == sl.id) {
        return sl.name;
      }
    } 
  }
  // fill missing fields
  helper() {
    if (this.candidate.service_line == 2) {
      this.candidate.if_group = 'Y';
    }else {
      this.candidate.if_group = 'N';
    }
    if (this.assignDate) {
      this.candidate.assign_date = this.assignDate.formatted;
    }
    if (this.receiveDate) {
      this.candidate.receive_date = this.receiveDate.formatted;
    }
  }
  onSubmit() {
    this.candidate.candidate_id = 0;
    let content: string = '';
    const cand = this.candidate;
    if (!cand.name_cn) {
      content += 'Chinese name, ';
    }
    if (!cand.name_en) {
      content += 'English name, ';
    }
    if (!cand.degree) {
      content += 'degree, ';
    }
    if (!cand.service_line) {
      content += 'service line, ';
    }
    if (!cand.position) {
      content += 'position, ';
    }
    if (!cand.gender) {
      content += 'gender, ';
    }
    if (!cand.type) {
      content += 'type, ';
    }
    if (content) {
      content = content.substring(0, content.length - 2);
      const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
      activeModal.componentInstance.modalHeader = 'Erro: fields are empty';
      activeModal.componentInstance.modalContent = content;
    }else {
      this.helper();
      this.service.addCandidate(this.candidate)
      .then(data => { if (data) {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = 'Success';
      }})
      .catch(error => {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = 'Error';
      });
    }
  }
  onClear() {
    this.candidate = new Candidate();
    this.assignDate = null;
    this.receiveDate = null;
  }
  onEdit() {
    this.helper();
    if (this.candidate.candidate_id === null || this.candidate.candidate_id === 0) {
      window.alert('Please select a candidate from drop down list first');
    }else {
      this.service.saveCandidate(this.candidate.candidate_id, this.candidate)
      .then(data => { if (data === 1) {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = 'Success';
      }else {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = 'Nothing changed';
      }})
      .catch(error => {
        const activeModal = this.modalService.open(DefaultModal, { size: 'sm' });
        activeModal.componentInstance.modalHeader = 'Nothing changed';
      });
    }
  }

  onSelect(selected) {
    if (selected) {
      this.service.search(selected.originalObject.candidate_id)
        .subscribe(res => {
          this.candidate = res[0];
          if (this.candidate.assign_date) {
            this.assignDate = {
              date: null,
              formatted: this.candidate.assign_date,
              jsdate: null,
              epoc: null,
            };
          }
          if (this.candidate.receive_date) {
            this.receiveDate = {
              date: null,
              formatted: this.candidate.receive_date,
              jsdate: null,
              epoc: null,
            };
          }
          for (const entry of config.service_line) {
            if (entry.id == this.candidate.service_line) {
              this.positions = entry.position;
              return;
            }
          }
        });

    } else {
    }
  }

  onChangeSL(event) {
    for (const entry of config.service_line) {
      if (entry.id == this.candidate.service_line) {
        this.positions = entry.position;
        return;
      }
    }
  }

  get fileUploaderOptions(): NgUploaderOptions {
    return {url: `${baseUrl}upload/name/${this.candidate.name_en}/dept/${this.candidate.service_line}`,};
  }

  /*public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: `${Global.baseUrl}upload/name/${this.candidate.name}/dept/${this.candidate.department}`,
  };*/

  constructor(protected service: CandidateService, private completerService: CompleterService, private modalService: NgbModal) {
    console.log(baseUrl);
    this.nameServiceCN = completerService
    .remote(baseUrl+'searchCandidateCN/name/', 'name', 'name').descriptionField('description');
    this.nameServiceEN = completerService
    .remote(baseUrl+'searchCandidateEN/name/', 'name', 'name').descriptionField('description');
  }
}
